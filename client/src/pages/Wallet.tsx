import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wallet,
  Send,
  ArrowUpRight,
  ArrowDownLeft,
  Copy,
  QrCode,
  RefreshCw,
  Eye,
  EyeOff,
  Plus,
  Shield,
  Zap,
  Coins,
  Clock,
  Filter,
  HeartHandshake,
  LockKeyhole,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

type Modal = "send" | "receive" | "tip" | "swap" | "escrow" | null;

type PaymentReadiness = {
  stripe?: { secretKey?: string; publishableKey?: string; usableMode?: string; rawSecretsExposed?: boolean };
  plaid?: { publicToken?: string; mode?: string };
  killSwitches?: Record<string, boolean>;
  labels?: string[];
  generatedAt?: string;
};

const TX_ICONS: Record<string, typeof ArrowUpRight> = {
  transfer: ArrowUpRight,
  tip: HeartHandshake,
  swap: RefreshCw,
  staking: Zap,
  mining: Coins,
  reward: ArrowDownLeft,
  fee: Shield,
  burn: RefreshCw,
  charity: HeartHandshake,
  escrow: LockKeyhole,
};

const TX_COLORS: Record<string, string> = {
  transfer: "text-blue-400 bg-blue-500/10",
  tip: "text-pink-400 bg-pink-500/10",
  swap: "text-cyan-400 bg-cyan-500/10",
  staking: "text-purple-400 bg-purple-500/10",
  mining: "text-amber-400 bg-amber-500/10",
  reward: "text-green-400 bg-green-500/10",
  fee: "text-orange-400 bg-orange-500/10",
  burn: "text-red-400 bg-red-500/10",
  charity: "text-emerald-400 bg-emerald-500/10",
  escrow: "text-indigo-400 bg-indigo-500/10",
};

function numberFromInput(value: string) {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function parseOptionalUserId(value: string) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined;
}

export default function WalletPage() {
  const utils = trpc.useUtils();
  const [showBalance, setShowBalance] = useState(true);
  const [activeModal, setActiveModal] = useState<Modal>(null);
  const [sendAsset, setSendAsset] = useState("SKY4444");
  const [sendAmount, setSendAmount] = useState("");
  const [sendAddress, setSendAddress] = useState("");
  const [recipientId, setRecipientId] = useState("");
  const [swapToAsset, setSwapToAsset] = useState("USDT");
  const [memo, setMemo] = useState("");
  const [paymentReadiness, setPaymentReadiness] = useState<PaymentReadiness | null>(null);

  const wallet = trpc.web3.getWalletSummary.useQuery(undefined, { refetchInterval: 30000 });

  useEffect(() => {
    let mounted = true;
    fetch("/api/payments/readiness")
      .then((response) => (response.ok ? response.json() : null))
      .then((data: PaymentReadiness | null) => {
        if (mounted) setPaymentReadiness(data);
      })
      .catch(() => {
        if (mounted) setPaymentReadiness(null);
      });
    return () => {
      mounted = false;
    };
  }, []);
  const sendCoin = trpc.web3.sendCoin.useMutation({
    onSuccess: async () => {
      toast.success("Beta wallet transfer recorded.");
      await utils.web3.getWalletSummary.invalidate();
      closeModal();
    },
    onError: (error) => toast.error(error.message),
  });
  const tipCreator = trpc.web3.tipCreator.useMutation({
    onSuccess: async (result) => {
      toast.success(`Tip recorded. Creator receives ${result.recipientAmount} ${result.coin}.`);
      await utils.web3.getWalletSummary.invalidate();
      closeModal();
    },
    onError: (error) => toast.error(error.message),
  });
  const executeSwap = trpc.web3.executeSwap.useMutation({
    onSuccess: async (result) => {
      toast.success(`Swap complete. Received ${result.received} ${result.toCoin}.`);
      await utils.web3.getWalletSummary.invalidate();
      closeModal();
    },
    onError: (error) => toast.error(error.message),
  });
  const createEscrow = trpc.web3.createEscrowHold.useMutation({
    onSuccess: async () => {
      toast.success("Escrow hold created on the beta ledger.");
      await utils.web3.getWalletSummary.invalidate();
      closeModal();
    },
    onError: (error) => toast.error(error.message),
  });

  const balances = wallet.data?.balances ?? [];
  const transactions = wallet.data?.transactions ?? [];
  const settlementHistory = wallet.data?.settlementHistory ?? [];
  const totalUSD = wallet.data?.totalUsdValue ?? 0;
  const selectedBalance = useMemo(() => balances.find((item) => item.coin === sendAsset), [balances, sendAsset]);
  const walletAddress = "beta:sky4444:wallet:user-session";

  const assetOptions = balances.length ? balances.map((item) => item.coin) : ["SKY4444", "TRUMP", "DOGE", "USDT", "BTC", "MONERO", "SHADOW"];

  function closeModal() {
    setActiveModal(null);
    setSendAmount("");
    setSendAddress("");
    setRecipientId("");
    setMemo("");
  }

  function requireAmount() {
    const amount = numberFromInput(sendAmount);
    if (amount <= 0) {
      toast.error("Enter a positive amount.");
      return null;
    }
    return amount;
  }

  function submitSend() {
    const amount = requireAmount();
    if (!amount) return;
    if (!sendAddress.trim() && !parseOptionalUserId(recipientId)) {
      toast.error("Enter a recipient user ID or beta wallet address.");
      return;
    }
    sendCoin.mutate({
      coin: sendAsset as any,
      amount,
      recipientId: parseOptionalUserId(recipientId),
      recipientAddress: sendAddress.trim() || undefined,
    });
  }

  function submitTip() {
    const amount = requireAmount();
    const toUserId = parseOptionalUserId(recipientId);
    if (!amount || !toUserId) {
      toast.error("Creator tipping requires a numeric recipient user ID.");
      return;
    }
    tipCreator.mutate({ recipientId: toUserId, coin: sendAsset as any, amount, memo: memo || "Social creator tip" });
  }

  function submitSwap() {
    const amount = requireAmount();
    if (!amount) return;
    if (sendAsset === swapToAsset) {
      toast.error("Choose two different coins.");
      return;
    }
    executeSwap.mutate({ fromCoin: sendAsset as any, toCoin: swapToAsset as any, amount, slippage: 0.5 });
  }

  function submitEscrow() {
    const amount = requireAmount();
    if (!amount) return;
    createEscrow.mutate({ sellerId: parseOptionalUserId(recipientId), coin: sendAsset as any, amount, memo: memo || "Marketplace or P2P beta escrow hold" });
  }

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-2xl border border-blue-500/20 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 p-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.18),transparent_50%)]" />
        <div className="relative z-10 space-y-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <Wallet className="h-5 w-5 text-blue-300" />
                <span className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-200">SKY4444 Beta Wallet</span>
              </div>
              <p className="text-sm text-slate-300">Database-backed playground ledger for multi-coin balances, social tips, swaps, and escrow-ready transaction records.</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="border-cyan-400/30 bg-cyan-500/10 text-cyan-200">Beta ledger</Badge>
              <button onClick={() => setShowBalance(!showBalance)} className="rounded-lg border border-white/10 p-2 text-blue-200 transition hover:bg-white/10 hover:text-white">
                {showBalance ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div>
            <p className="text-4xl font-black text-white md:text-5xl">
              {showBalance ? `$${totalUSD.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "••••••••"}
            </p>
            <p className="mt-2 flex items-center gap-2 text-sm text-emerald-300">
              <Shield className="h-4 w-4" /> {wallet.data?.betaNotice ?? "Beta ledger loading. Real custody and withdrawals are not enabled."}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <Button className="bg-blue-600 text-white" onClick={() => setActiveModal("send")}><ArrowUpRight className="mr-2 h-4 w-4" />Send</Button>
            <Button className="bg-pink-600 text-white" onClick={() => setActiveModal("tip")}><HeartHandshake className="mr-2 h-4 w-4" />Tip</Button>
            <Button className="bg-cyan-600 text-white" onClick={() => setActiveModal("swap")}><RefreshCw className="mr-2 h-4 w-4" />Swap</Button>
            <Button className="bg-indigo-600 text-white" onClick={() => setActiveModal("escrow")}><LockKeyhole className="mr-2 h-4 w-4" />Escrow</Button>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10" onClick={() => setActiveModal("receive")}><ArrowDownLeft className="mr-2 h-4 w-4" />Receive</Button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-emerald-500/20 bg-emerald-500/5 md:col-span-2">
          <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-sm font-bold"><Shield className="h-4 w-4 text-emerald-300" /> Provider Readiness</CardTitle></CardHeader>
          <CardContent className="grid gap-3 text-xs text-muted-foreground sm:grid-cols-2">
            <div className="rounded-xl border border-border/50 p-3"><p className="mb-1 font-semibold text-foreground">Stripe</p><p>Secret: {paymentReadiness?.stripe?.secretKey ?? "checking"}</p><p>Publishable: {paymentReadiness?.stripe?.publishableKey ?? "checking"}</p><Badge variant="outline" className="mt-2">{paymentReadiness?.stripe?.usableMode ?? "provider-gated"}</Badge></div>
            <div className="rounded-xl border border-border/50 p-3"><p className="mb-1 font-semibold text-foreground">Plaid / banking</p><p>Token: {paymentReadiness?.plaid?.publicToken ?? "checking"}</p><p>Mode: {paymentReadiness?.plaid?.mode ?? "provider-gated"}</p><Badge variant="outline" className="mt-2">No raw secrets displayed</Badge></div>
          </CardContent>
        </Card>
        <Card className="border-amber-500/20 bg-amber-500/5 md:col-span-2">
          <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-sm font-bold"><LockKeyhole className="h-4 w-4 text-amber-300" /> Money Kill Switches</CardTitle></CardHeader>
          <CardContent className="grid gap-2 text-xs text-muted-foreground sm:grid-cols-2">
            {Object.entries(paymentReadiness?.killSwitches ?? { moneyMovementDisabled: true, livePaymentConfirmationsDisabled: true, casinoPublicGamblingDisabled: true, tradingLiveOrdersDisabled: true }).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between rounded-xl border border-border/50 p-2"><span>{key}</span><Badge className={value ? "border-red-500/30 bg-red-500/10 text-red-300" : "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"}>{value ? "ON" : "OFF"}</Badge></div>
            ))}
          </CardContent>
        </Card>
      </div>

      <AnimatePresence>
        {activeModal && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <Card className="border-blue-500/30 bg-blue-500/5">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm font-bold capitalize">
                  {activeModal === "receive" ? <QrCode className="h-4 w-4 text-green-400" /> : <Send className="h-4 w-4 text-blue-400" />}
                  {activeModal} beta wallet action
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {activeModal === "receive" ? (
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-xl bg-white"><QrCode className="h-20 w-20 text-black" /></div>
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground">Your beta wallet address</p>
                      <p className="break-all font-mono text-sm">{walletAddress}</p>
                      <Button size="sm" variant="outline" onClick={() => { navigator.clipboard.writeText(walletAddress); toast.success("Beta address copied."); }}><Copy className="mr-1 h-3 w-3" />Copy Address</Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="grid gap-3 md:grid-cols-3">
                      <div>
                        <label className="mb-1 block text-xs text-muted-foreground">Asset</label>
                        <select className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm" value={sendAsset} onChange={(event) => setSendAsset(event.target.value)}>
                          {assetOptions.map((symbol) => <option key={symbol} value={symbol}>{symbol}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="mb-1 block text-xs text-muted-foreground">Amount</label>
                        <Input placeholder="0.00" value={sendAmount} onChange={(event) => setSendAmount(event.target.value)} />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs text-muted-foreground">Available</label>
                        <div className="flex h-10 items-center rounded-md border border-border bg-muted/20 px-3 font-mono text-sm">
                          {selectedBalance ? `${showBalance ? selectedBalance.amount : "••••"} ${selectedBalance.coin}` : "Loading"}
                        </div>
                      </div>
                    </div>

                    {(activeModal === "send" || activeModal === "tip" || activeModal === "escrow") && (
                      <div className="grid gap-3 md:grid-cols-2">
                        <div>
                          <label className="mb-1 block text-xs text-muted-foreground">Recipient user ID</label>
                          <Input placeholder="Internal user ID" value={recipientId} onChange={(event) => setRecipientId(event.target.value)} />
                        </div>
                        <div>
                          <label className="mb-1 block text-xs text-muted-foreground">External beta address</label>
                          <Input placeholder="beta:sky4444:..." value={sendAddress} onChange={(event) => setSendAddress(event.target.value)} disabled={activeModal !== "send"} />
                        </div>
                      </div>
                    )}

                    {activeModal === "swap" && (
                      <div>
                        <label className="mb-1 block text-xs text-muted-foreground">Swap into</label>
                        <select className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm" value={swapToAsset} onChange={(event) => setSwapToAsset(event.target.value)}>
                          {assetOptions.map((symbol) => <option key={symbol} value={symbol}>{symbol}</option>)}
                        </select>
                      </div>
                    )}

                    {(activeModal === "tip" || activeModal === "escrow") && (
                      <div>
                        <label className="mb-1 block text-xs text-muted-foreground">Memo</label>
                        <Input placeholder="Creator support, marketplace hold, or P2P note" value={memo} onChange={(event) => setMemo(event.target.value)} />
                      </div>
                    )}

                    <div className="rounded-xl border border-amber-400/20 bg-amber-500/10 p-3 text-xs text-amber-100">
                      Tips reserve a 15% platform fee with charity and burn accounting. Escrow creates a beta ledger hold. No real withdrawals, custody, fiat payment, or on-chain submission occurs from this screen.
                    </div>
                  </>
                )}

                <div className="flex flex-wrap gap-2">
                  {activeModal === "send" && <Button className="bg-blue-600 text-white" onClick={submitSend} disabled={sendCoin.isPending}><Send className="mr-1.5 h-3.5 w-3.5" />Confirm Send</Button>}
                  {activeModal === "tip" && <Button className="bg-pink-600 text-white" onClick={submitTip} disabled={tipCreator.isPending}><HeartHandshake className="mr-1.5 h-3.5 w-3.5" />Confirm Tip</Button>}
                  {activeModal === "swap" && <Button className="bg-cyan-600 text-white" onClick={submitSwap} disabled={executeSwap.isPending}><RefreshCw className="mr-1.5 h-3.5 w-3.5" />Execute Swap</Button>}
                  {activeModal === "escrow" && <Button className="bg-indigo-600 text-white" onClick={submitEscrow} disabled={createEscrow.isPending}><LockKeyhole className="mr-1.5 h-3.5 w-3.5" />Create Hold</Button>}
                  <Button variant="outline" onClick={closeModal}>Close</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <Card className="border-border/50">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-bold">Assets ({balances.length || assetOptions.length})</CardTitle></CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/30">
              {(balances.length ? balances : []).map((asset, index) => (
                <motion.div key={asset.coin} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.04 }} className="flex items-center gap-3 px-4 py-3 hover:bg-muted/20">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted/30 text-sm font-black">{asset.icon}</div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2"><span className="text-sm font-bold">{asset.coin}</span><Badge variant="outline" className="h-4 px-1 text-xs">{asset.chain}</Badge></div>
                    <p className="text-xs text-muted-foreground">{asset.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-sm font-bold">{showBalance ? Number.parseFloat(asset.amount).toLocaleString(undefined, { maximumFractionDigits: 8 }) : "••••"}</p>
                    <p className="text-xs text-muted-foreground">{showBalance ? `$${asset.usdValue.toLocaleString()}` : "••••"}</p>
                  </div>
                  <div className={`w-16 text-right text-xs font-medium ${asset.change24h >= 0 ? "text-green-400" : "text-red-400"}`}>{asset.change24h >= 0 ? "▲" : "▼"} {Math.abs(asset.change24h)}%</div>
                </motion.div>
              ))}
              {!balances.length && <div className="px-4 py-8 text-center text-sm text-muted-foreground">{wallet.isLoading ? "Loading beta wallet ledger..." : "No wallet balances available."}</div>}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between text-sm font-bold">Beta Controls <Badge variant="outline">Production path</Badge></CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <div className="rounded-xl border border-border/50 p-3"><Shield className="mb-2 h-4 w-4 text-cyan-300" /> Balances and transaction records persist through the backend ledger when the database is configured.</div>
            <div className="rounded-xl border border-border/50 p-3"><HeartHandshake className="mb-2 h-4 w-4 text-pink-300" /> Creator tips, 15% platform fee, charity split, and burn accounting are recorded as auditable transaction rows.</div>
            <div className="rounded-xl border border-border/50 p-3"><LockKeyhole className="mb-2 h-4 w-4 text-indigo-300" /> Escrow holds are modeled for future marketplace and P2P releases, refunds, and dispute workflows.</div>
            <div className="rounded-xl border border-border/50 p-3"><Shield className="mb-2 h-4 w-4 text-emerald-300" /> Stripe/Plaid readiness is checked at runtime through environment flags. Raw keys never render in the browser.</div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-blue-500/20 bg-blue-500/5">
        <CardHeader className="pb-2">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="flex items-center gap-2 text-sm font-bold"><Shield className="h-4 w-4 text-blue-300" /> Settlement Audit History</CardTitle>
            <Badge variant="outline">Idempotent beta ledger</Badge>
          </div>
          <p className="text-xs text-muted-foreground">Every financial flow is mirrored into a shared settlement ledger with source, provider, status, and admin-review metadata. Live withdrawals and provider settlement remain gated.</p>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border/30">
            {settlementHistory.map((entry: any) => (
              <div key={entry.id} className="grid gap-3 px-4 py-3 hover:bg-muted/20 md:grid-cols-[1.2fr_0.9fr_0.9fr_1fr] md:items-center">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold capitalize">{entry.source} settlement</p>
                    <Badge className={entry.direction === "credit" ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300" : entry.direction === "debit" ? "border-red-500/30 bg-red-500/10 text-red-300" : "border-slate-500/30 bg-slate-500/10 text-slate-300"}>{entry.direction}</Badge>
                  </div>
                  <p className="truncate text-xs text-muted-foreground">{entry.memo ?? entry.idempotencyKey}</p>
                </div>
                <div className="font-mono text-sm font-bold">{entry.amount} {entry.token}</div>
                <div className="flex flex-wrap gap-2 text-xs">
                  <Badge variant="outline">{entry.providerStatus}</Badge>
                  <Badge variant="outline">{entry.settlementStatus}</Badge>
                </div>
                <div className="flex flex-col gap-1 text-xs text-muted-foreground md:text-right">
                  <span>Review: <span className="font-semibold text-foreground">{entry.reviewStatus}</span></span>
                  <span>{new Date(entry.createdAt).toLocaleString()}</span>
                </div>
              </div>
            ))}
            {!settlementHistory.length && <div className="px-4 py-8 text-center text-sm text-muted-foreground">No settlement audit entries yet. New mining, staking, casino, tip, trading, and wallet flows will appear here.</div>}
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between"><CardTitle className="text-sm font-bold">Transaction History</CardTitle><Button variant="outline" size="sm" className="h-7 text-xs"><Filter className="mr-1 h-3 w-3" />Filter</Button></div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border/30">
            {transactions.map((tx) => {
              const TxIcon = TX_ICONS[tx.type] || Clock;
              return (
                <div key={tx.id} className="flex items-center gap-3 px-4 py-3 hover:bg-muted/20">
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${TX_COLORS[tx.type] ?? "text-slate-300 bg-slate-500/10"}`}><TxIcon className="h-4 w-4" /></div>
                  <div className="min-w-0 flex-1"><p className="text-sm font-medium capitalize">{tx.type} {tx.token}</p><p className="truncate text-xs text-muted-foreground">{tx.memo ?? "Beta ledger record"}</p></div>
                  <div className="text-right"><p className="font-mono text-sm font-bold">{tx.amount} {tx.token}</p><p className="text-xs text-muted-foreground">{new Date(tx.createdAt).toLocaleString()}</p></div>
                  <Badge className="border-green-500/20 bg-green-500/10 text-xs text-green-400">{tx.status}</Badge>
                </div>
              );
            })}
            {!transactions.length && <div className="px-4 py-8 text-center text-sm text-muted-foreground">No beta ledger transactions yet. Try a tip, swap, transfer, mining claim, or staking action.</div>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
