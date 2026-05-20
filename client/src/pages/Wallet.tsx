import { SafeCryptoCompliancePanel } from "@/components/SafeCryptoCompliancePanel";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wallet, Send, Download, ArrowUpRight, ArrowDownLeft,
  Copy, CheckCircle, QrCode, RefreshCw, Eye, EyeOff,
  TrendingUp, TrendingDown, Plus, ChevronRight, Shield,
  Zap, Bitcoin, Coins, DollarSign, Clock, Filter
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const ASSETS = [
  { symbol: "TRUMP", name: "TRUMP Token", balance: 12450.5, usdValue: 291.34, change24h: +8.42, icon: "TR", color: "text-red-400", chain: "ETH" },
  { symbol: "SKY4444", name: "SkyCoin444 Token", balance: 85000, usdValue: 2125.00, change24h: +15.21, icon: "SK", color: "text-cyan-400", chain: "ETH" },
  { symbol: "BTC", name: "Bitcoin", balance: 0.00842, usdValue: 842.10, change24h: +2.14, icon: "₿", color: "text-yellow-400", chain: "BTC" },
  { symbol: "ETH", name: "Ethereum", balance: 1.245, usdValue: 4231.50, change24h: -1.23, icon: "Ξ", color: "text-blue-400", chain: "ETH" },
  { symbol: "DOGE", name: "Dogecoin", balance: 15420, usdValue: 2313.00, change24h: +5.67, icon: "DG", color: "text-yellow-300", chain: "DOGE" },
  { symbol: "XMR", name: "Monero", balance: 4.21, usdValue: 631.50, change24h: -0.89, icon: "XM", color: "text-orange-400", chain: "XMR" },
  { symbol: "USDT", name: "Tether", balance: 2840.00, usdValue: 2840.00, change24h: 0.00, icon: "US", color: "text-green-400", chain: "ETH" },
  { symbol: "SHADOW", name: "Shadow Coin", balance: 4444, usdValue: 444.40, change24h: +4.44, icon: "SH", color: "text-purple-400", chain: "SHADOW" },
];

const TRANSACTIONS = [
  { id: "tx1", type: "receive", asset: "TRUMP", amount: 500, usd: 11.70, from: "0xABC...123", time: "2 hours ago", status: "confirmed" },
  { id: "tx2", type: "send", asset: "USDC", amount: 100, usd: 100.00, to: "0xDEF...456", time: "5 hours ago", status: "confirmed" },
  { id: "tx3", type: "swap", asset: "ETH → TRUMP", amount: 0.1, usd: 339.80, time: "1 day ago", status: "confirmed" },
  { id: "tx4", type: "stake", asset: "SKY4444", amount: 10000, usd: 250.00, time: "2 days ago", status: "confirmed" },
  { id: "tx5", type: "receive", asset: "BTC", amount: 0.001, usd: 100.10, from: "0xGHI...789", time: "3 days ago", status: "confirmed" },
  { id: "tx6", type: "nft", asset: "NFT Mint", amount: 1, usd: 50.00, time: "4 days ago", status: "confirmed" },
];

const TX_ICONS: Record<string, any> = {
  receive: ArrowDownLeft, send: ArrowUpRight, swap: RefreshCw, stake: Zap, nft: Coins,
};

const TX_COLORS: Record<string, string> = {
  receive: "text-green-400 bg-green-500/10", send: "text-red-400 bg-red-500/10",
  swap: "text-blue-400 bg-blue-500/10", stake: "text-cyan-400 bg-cyan-500/10", nft: "text-purple-400 bg-purple-500/10",
};

export default function WalletPage() {
  const [showBalance, setShowBalance] = useState(true);
  const [activeModal, setActiveModal] = useState<"send" | "receive" | null>(null);
  const [sendAsset, setSendAsset] = useState("TRUMP");
  const [sendAmount, setSendAmount] = useState("");
  const [sendAddress, setSendAddress] = useState("");

  const totalUSD = ASSETS.reduce((sum, a) => sum + a.usdValue, 0);

  return (
    <div className="space-y-6">
      <SafeCryptoCompliancePanel focus="wallet" compact />
      {/* Wallet Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 border border-blue-500/20 p-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-blue-400" />
              <span className="text-sm text-blue-300">Total Portfolio Value</span>
            </div>
            <button onClick={() => setShowBalance(!showBalance)} className="text-blue-300 hover:text-white transition-colors">
              {showBalance ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </button>
          </div>
          <div className="mb-4">
            <p className="text-4xl font-black text-white">
              {showBalance ? `$${totalUSD.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "••••••••"}
            </p>
            <p className="text-green-400 text-sm mt-1">▲ +$342.18 (+3.24%) today</p>
          </div>
          <div className="flex gap-3">
            <Button className="bg-blue-600 text-white border-0 flex-1" onClick={() => setActiveModal("send")}>
              <ArrowUpRight className="h-4 w-4 mr-2" />Send
            </Button>
            <Button className="bg-green-600 text-white border-0 flex-1" onClick={() => setActiveModal("receive")}>
              <ArrowDownLeft className="h-4 w-4 mr-2" />Receive
            </Button>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10" onClick={() => toast.info("Opening swap")}>
              <RefreshCw className="h-4 w-4 mr-2" />Swap
            </Button>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10" onClick={() => toast.info("Opening buy")}>
              <Plus className="h-4 w-4 mr-2" />Buy
            </Button>
          </div>
        </div>
      </div>

      {/* Send Modal */}
      <AnimatePresence>
        {activeModal === "send" && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <Card className="border-blue-500/30 bg-blue-500/5">
              <CardHeader className="pb-2"><CardTitle className="text-sm font-bold flex items-center gap-2"><ArrowUpRight className="h-4 w-4 text-blue-400" />Send Crypto</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Asset</label>
                    <select className="w-full h-9 rounded-md border border-border bg-background px-3 text-sm" value={sendAsset} onChange={e => setSendAsset(e.target.value)}>
                      {ASSETS.map(a => <option key={a.symbol} value={a.symbol}>{a.symbol}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Amount</label>
                    <Input placeholder="0.00" value={sendAmount} onChange={e => setSendAmount(e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Recipient Address</label>
                  <Input placeholder="0x... or ENS name" value={sendAddress} onChange={e => setSendAddress(e.target.value)} />
                </div>
                <div className="flex gap-2">
                  <Button className="bg-blue-600 text-white border-0" onClick={() => { toast.success(`Sending ${sendAmount} ${sendAsset}`); setActiveModal(null); }}>
                    <Send className="h-3.5 w-3.5 mr-1.5" />Confirm Send
                  </Button>
                  <Button variant="outline" onClick={() => setActiveModal(null)}>Cancel</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
        {activeModal === "receive" && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <Card className="border-green-500/30 bg-green-500/5">
              <CardHeader className="pb-2"><CardTitle className="text-sm font-bold flex items-center gap-2"><ArrowDownLeft className="h-4 w-4 text-green-400" />Receive Crypto</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-4">
                  <div className="h-24 w-24 bg-white rounded-xl flex items-center justify-center shrink-0">
                    <QrCode className="h-16 w-16 text-black" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Your Wallet Address</p>
                    <p className="font-mono text-sm break-all">0xSKY4444ABCDEF1234567890ABCDEF</p>
                    <Button size="sm" className="mt-2 h-7 text-xs" variant="outline" onClick={() => { navigator.clipboard.writeText("0xSKY4444ABCDEF1234567890ABCDEF"); toast.success("Address copied!"); }}>
                      <Copy className="h-3 w-3 mr-1" />Copy Address
                    </Button>
                  </div>
                </div>
                <Button variant="outline" onClick={() => setActiveModal(null)}>Close</Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Assets */}
      <Card className="border-border/50">
        <CardHeader className="pb-2"><CardTitle className="text-sm font-bold">Assets ({ASSETS.length})</CardTitle></CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border/30">
            {ASSETS.map((asset, i) => (
              <motion.div key={asset.symbol} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }} className="flex items-center gap-3 px-4 py-3 hover:bg-muted/20 cursor-pointer" onClick={() => toast.info(`${asset.symbol} details`)}>
                <div className={`h-10 w-10 rounded-xl flex items-center justify-center text-xl shrink-0 bg-muted/30`}>{asset.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm">{asset.symbol}</span>
                    <Badge variant="outline" className="text-xs h-4 px-1">{asset.chain}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{asset.name}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono font-bold text-sm">{showBalance ? asset.balance.toLocaleString() : "••••"}</p>
                  <p className="text-xs text-muted-foreground">{showBalance ? `$${asset.usdValue.toLocaleString()}` : "••••"}</p>
                </div>
                <div className={`text-right text-xs font-medium ${asset.change24h >= 0 ? "text-green-400" : "text-red-400"}`}>
                  {asset.change24h >= 0 ? "▲" : "▼"} {Math.abs(asset.change24h)}%
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-bold">Transaction History</CardTitle>
            <Button variant="outline" size="sm" className="h-7 text-xs"><Filter className="h-3 w-3 mr-1" />Filter</Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border/30">
            {TRANSACTIONS.map((tx, i) => {
              const TxIcon = TX_ICONS[tx.type] || ArrowUpRight;
              return (
                <div key={tx.id} className="flex items-center gap-3 px-4 py-3 hover:bg-muted/20 cursor-pointer">
                  <div className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 ${TX_COLORS[tx.type]}`}>
                    <TxIcon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium capitalize">{tx.type} {tx.asset}</p>
                    <p className="text-xs text-muted-foreground">{tx.time}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-mono font-bold text-sm ${tx.type === "receive" ? "text-green-400" : tx.type === "send" ? "text-red-400" : "text-foreground"}`}>
                      {tx.type === "receive" ? "+" : tx.type === "send" ? "-" : ""}{tx.amount} {tx.asset.split(" ")[0]}
                    </p>
                    <p className="text-xs text-muted-foreground">${tx.usd.toFixed(2)}</p>
                  </div>
                  <Badge className="text-xs bg-green-500/10 text-green-400 border-green-500/20">{tx.status}</Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
