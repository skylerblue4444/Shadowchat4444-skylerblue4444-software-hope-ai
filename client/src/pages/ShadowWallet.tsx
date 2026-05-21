import { useState } from "react";
import { motion } from "framer-motion";
import {
  Wallet,
  Send,
  Download,
  ArrowUpDown,
  Eye,
  EyeOff,
  Copy,
  QrCode,
  TrendingUp,
  TrendingDown,
  Coins,
  Shield,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const BALANCES = [
  {
    symbol: "SKY4444",
    name: "SkyBlue Token",
    balance: "44,444",
    usd: "$1,955.54",
    change: "+12.4%",
    up: true,
    icon: "🌌",
  },
  {
    symbol: "BTC",
    name: "Bitcoin",
    balance: "0.0444",
    usd: "$4,440.00",
    change: "+2.1%",
    up: true,
    icon: "₿",
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    balance: "1.44",
    usd: "$4,320.00",
    change: "-1.2%",
    up: false,
    icon: "Ξ",
  },
  {
    symbol: "TRUMP",
    name: "TRUMP Coin",
    balance: "8,888",
    usd: "$888.80",
    change: "+44.4%",
    up: true,
    icon: "🇺🇸",
  },
  {
    symbol: "DOGE",
    name: "Dogecoin",
    balance: "44,444",
    usd: "$666.66",
    change: "+8.8%",
    up: true,
    icon: "🐕",
  },
  {
    symbol: "USDT",
    name: "Tether USD",
    balance: "444.00",
    usd: "$444.00",
    change: "0.0%",
    up: true,
    icon: "💵",
  },
];

const TXS = [
  {
    type: "receive",
    symbol: "SKY4444",
    amount: "+4,444",
    usd: "+$195.54",
    from: "0x44...4444",
    time: "2 hrs ago",
  },
  {
    type: "send",
    symbol: "BTC",
    amount: "-0.004",
    usd: "-$400.00",
    to: "0x88...8888",
    time: "1 day ago",
  },
  {
    type: "swap",
    symbol: "ETH→SKY",
    amount: "0.1 ETH",
    usd: "$300.00",
    time: "2 days ago",
  },
  {
    type: "receive",
    symbol: "TRUMP",
    amount: "+1,000",
    usd: "+$100.00",
    from: "0x11...1111",
    time: "3 days ago",
  },
  {
    type: "send",
    symbol: "USDT",
    amount: "-100.00",
    usd: "-$100.00",
    to: "0x22...2222",
    time: "4 days ago",
  },
];

export default function ShadowWallet() {
  const [tab, setTab] = useState<"portfolio" | "send" | "receive" | "history">(
    "portfolio"
  );
  const [hideBalance, setHideBalance] = useState(false);
  const [sendToken, setSendToken] = useState("SKY4444");
  const [sendAmount, setSendAmount] = useState("");
  const [sendTo, setSendTo] = useState("");
  const [sending, setSending] = useState(false);

  const totalUSD = "$12,715.00";

  const sendTx = async () => {
    if (!sendAmount || !sendTo) {
      toast.error("Fill in all fields");
      return;
    }
    setSending(true);
    await new Promise(r => setTimeout(r, 2000));
    setSending(false);
    toast.success(
      `✅ Sent ${sendAmount} ${sendToken} to ${sendTo.slice(0, 8)}...`
    );
    setSendAmount("");
    setSendTo("");
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Wallet className="h-6 w-6 text-violet-400" />
            ShadowWallet
          </h1>
          <p className="text-sm text-muted-foreground">
            Multi-chain crypto wallet
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setHideBalance(!hideBalance)}
            className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
          >
            {hideBalance ? (
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Eye className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
          <Badge className="bg-violet-500/10 text-violet-400 border-violet-500/20 font-bold">
            <Shield className="h-3 w-3 mr-1 inline" />
            Secured
          </Badge>
        </div>
      </div>

      {/* Total Balance Card */}
      <Card className="border-violet-500/20 bg-gradient-to-br from-violet-900/20 to-purple-900/10">
        <CardContent className="py-5 px-5 text-center">
          <p className="text-xs text-muted-foreground mb-1">
            Total Portfolio Value
          </p>
          <p className="text-4xl font-black text-violet-400">
            {hideBalance ? "••••••" : totalUSD}
          </p>
          <p className="text-xs text-green-400 font-bold mt-1">
            +$1,244.00 (10.8%) this week
          </p>
          <div className="flex justify-center gap-3 mt-4">
            <Button
              size="sm"
              className="h-9 px-5 bg-violet-600 text-white border-0 text-xs font-bold"
              onClick={() => setTab("send")}
            >
              <Send className="h-3.5 w-3.5 mr-1.5" />
              Send
            </Button>
            <Button
              size="sm"
              className="h-9 px-5 bg-violet-600 text-white border-0 text-xs font-bold"
              onClick={() => setTab("receive")}
            >
              <Download className="h-3.5 w-3.5 mr-1.5" />
              Receive
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-9 px-5 text-xs font-bold border-violet-500/30"
              onClick={() => toast.info("Opening swap...")}
            >
              <ArrowUpDown className="h-3.5 w-3.5 mr-1.5" />
              Swap
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-2">
        {(["portfolio", "send", "receive", "history"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-violet-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "portfolio" && (
        <div className="space-y-2">
          {BALANCES.map((token, i) => (
            <motion.div
              key={token.symbol}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Card
                className="border-border/50 hover:border-violet-500/20 transition-all cursor-pointer"
                onClick={() => toast.info(`Opening ${token.symbol} details...`)}
              >
                <CardContent className="py-3 px-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-lg shrink-0">
                    {token.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-black text-sm">{token.symbol}</p>
                    <p className="text-xs text-muted-foreground">
                      {token.name}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-sm">
                      {hideBalance ? "••••" : token.balance}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {hideBalance ? "••••" : token.usd}
                    </p>
                  </div>
                  <Badge
                    className={`text-xs shrink-0 ${token.up ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-red-500/10 text-red-400 border-red-500/20"}`}
                  >
                    {token.up ? (
                      <TrendingUp className="h-3 w-3 mr-0.5 inline" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-0.5 inline" />
                    )}
                    {token.change}
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "send" && (
        <Card className="border-violet-500/20 bg-violet-900/5">
          <CardContent className="py-4 px-4 space-y-3">
            <p className="font-bold text-sm">Send Crypto</p>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Token</p>
              <select
                value={sendToken}
                onChange={e => setSendToken(e.target.value)}
                className="w-full h-9 rounded-xl border border-border bg-background px-3 text-xs font-bold focus:outline-none"
              >
                {BALANCES.map(b => (
                  <option key={b.symbol}>{b.symbol}</option>
                ))}
              </select>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                Recipient Address
              </p>
              <Input
                value={sendTo}
                onChange={e => setSendTo(e.target.value)}
                placeholder="0x... or ENS name"
                className="h-9 text-xs font-mono"
              />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Amount</p>
              <div className="flex gap-2">
                <Input
                  value={sendAmount}
                  onChange={e => setSendAmount(e.target.value)}
                  type="number"
                  placeholder="0.00"
                  className="flex-1 h-9 text-xs"
                />
                <Button
                  size="sm"
                  variant="outline"
                  className="h-9 text-xs shrink-0"
                  onClick={() => setSendAmount("44444")}
                >
                  MAX
                </Button>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-black/10 text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Network Fee</span>
                <span>~0.001 ETH ($3.00)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated Time</span>
                <span>~30 seconds</span>
              </div>
            </div>
            <Button
              className="w-full h-10 text-xs bg-violet-600 text-white border-0 font-bold"
              onClick={sendTx}
              disabled={sending}
            >
              {sending ? (
                "Sending..."
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send {sendToken}
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {tab === "receive" && (
        <Card className="border-violet-500/20 bg-violet-900/5">
          <CardContent className="py-4 px-4 text-center space-y-3">
            <p className="font-bold text-sm">Receive Crypto</p>
            <div className="h-40 w-40 mx-auto bg-white rounded-2xl flex items-center justify-center">
              <QrCode className="h-32 w-32 text-black" />
            </div>
            <div className="p-2.5 rounded-xl bg-black/10">
              <p className="text-xs font-mono text-muted-foreground break-all">
                0x4444...4444...SKY...BLUE
              </p>
            </div>
            <Button
              className="w-full h-9 text-xs bg-violet-600 text-white border-0"
              onClick={() => {
                navigator.clipboard?.writeText("0x44444444444444444444");
                toast.success("Address copied!");
              }}
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy Address
            </Button>
            <p className="text-xs text-muted-foreground">
              Send only supported tokens to this address. Wrong network = lost
              funds.
            </p>
          </CardContent>
        </Card>
      )}

      {tab === "history" && (
        <div className="space-y-2">
          {TXS.map((tx, i) => (
            <Card key={i} className="border-border/50">
              <CardContent className="py-3 px-4 flex items-center gap-3">
                <div
                  className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 ${tx.type === "receive" ? "bg-green-500/10" : tx.type === "send" ? "bg-red-500/10" : "bg-blue-500/10"}`}
                >
                  {tx.type === "receive" ? (
                    <Download className="h-4 w-4 text-green-400" />
                  ) : tx.type === "send" ? (
                    <Send className="h-4 w-4 text-red-400" />
                  ) : (
                    <ArrowUpDown className="h-4 w-4 text-blue-400" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm capitalize">
                    {tx.type} {tx.symbol}
                  </p>
                  <p className="text-xs text-muted-foreground">{tx.time}</p>
                </div>
                <div className="text-right">
                  <p
                    className={`font-black text-sm ${tx.type === "receive" ? "text-green-400" : tx.type === "send" ? "text-red-400" : "text-blue-400"}`}
                  >
                    {tx.amount}
                  </p>
                  <p className="text-xs text-muted-foreground">{tx.usd}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
