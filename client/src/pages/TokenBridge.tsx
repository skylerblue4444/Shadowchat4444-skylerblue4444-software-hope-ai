import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeftRight,
  Zap,
  Shield,
  Clock,
  ChevronDown,
  CheckCircle,
  AlertTriangle,
  ExternalLink,
  RefreshCw,
  Coins,
  TrendingUp,
  Globe,
  Lock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const CHAINS = [
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    icon: "Ξ",
    color: "#8b5cf6",
    gasPrice: "24 gwei",
  },
  {
    id: "bsc",
    name: "BNB Chain",
    symbol: "BNB",
    icon: "🟡",
    color: "#eab308",
    gasPrice: "3 gwei",
  },
  {
    id: "polygon",
    name: "Polygon",
    symbol: "MATIC",
    icon: "🟣",
    color: "#8b5cf6",
    gasPrice: "30 gwei",
  },
  {
    id: "solana",
    name: "Solana",
    symbol: "SOL",
    icon: "◎",
    color: "#06b6d4",
    gasPrice: "0.000005 SOL",
  },
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    icon: "₿",
    color: "#f97316",
    gasPrice: "12 sat/vB",
  },
  {
    id: "avalanche",
    name: "Avalanche",
    symbol: "AVAX",
    icon: "🔺",
    color: "#ef4444",
    gasPrice: "25 nAVAX",
  },
  {
    id: "arbitrum",
    name: "Arbitrum",
    symbol: "ARB",
    icon: "🔵",
    color: "#3b82f6",
    gasPrice: "0.1 gwei",
  },
  {
    id: "shadowchain",
    name: "ShadowChain",
    symbol: "SKY4444",
    icon: "⚡",
    color: "#06b6d4",
    gasPrice: "0 fees",
  },
];

const TOKENS_BY_CHAIN: Record<string, string[]> = {
  ethereum: ["ETH", "USDC", "USDT", "SKY4444", "TRUMP"],
  bsc: ["BNB", "USDC", "USDT", "SKY4444"],
  polygon: ["MATIC", "USDC", "USDT", "SKY4444"],
  solana: ["SOL", "USDC", "USDT"],
  bitcoin: ["BTC"],
  avalanche: ["AVAX", "USDC", "USDT"],
  arbitrum: ["ETH", "USDC", "USDT", "ARB", "SKY4444"],
  shadowchain: ["SKY4444", "TRUMP", "USDC", "BTC", "ETH"],
};

const BRIDGE_HISTORY = [
  {
    from: "Ethereum",
    to: "ShadowChain",
    token: "SKY4444",
    amount: 50000,
    status: "completed",
    time: "May 14 2:30PM",
    txHash: "0x1a2b...3c4d",
  },
  {
    from: "BNB Chain",
    to: "Ethereum",
    token: "USDC",
    amount: 500,
    status: "completed",
    time: "May 12 11:00AM",
    txHash: "0x5e6f...7g8h",
  },
  {
    from: "ShadowChain",
    to: "Polygon",
    token: "SKY4444",
    amount: 10000,
    status: "pending",
    time: "May 14 4:15PM",
    txHash: "0x9i0j...1k2l",
  },
];

export default function TokenBridge() {
  const [fromChain, setFromChain] = useState(CHAINS[0]);
  const [toChain, setToChain] = useState(CHAINS[7]);
  const [token, setToken] = useState("SKY4444");
  const [amount, setAmount] = useState("");
  const [tab, setTab] = useState<"bridge" | "history">("bridge");
  const [bridging, setBridging] = useState(false);

  const availableTokens =
    TOKENS_BY_CHAIN[fromChain.id]?.filter(t =>
      TOKENS_BY_CHAIN[toChain.id]?.includes(t)
    ) || [];

  const swapChains = () => {
    const temp = fromChain;
    setFromChain(toChain);
    setToChain(temp);
  };

  const executeBridge = () => {
    if (!amount) {
      toast.error("Enter amount to bridge");
      return;
    }
    setBridging(true);
    setTimeout(() => {
      setBridging(false);
      toast.success(
        `Bridging ${amount} ${token} from ${fromChain.name} to ${toChain.name}! ETA: ~5 minutes`
      );
      setAmount("");
    }, 2000);
  };

  const estimatedReceive = amount
    ? (parseFloat(amount) * 0.998).toFixed(4)
    : "0";
  const bridgeFee = amount ? (parseFloat(amount) * 0.002).toFixed(4) : "0";

  return (
    <div className="space-y-5 max-w-2xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black flex items-center gap-2">
          <ArrowLeftRight className="h-6 w-6 text-cyan-400" />
          Token Bridge
        </h1>
        <p className="text-sm text-muted-foreground">
          Move tokens across 8 blockchains securely and instantly
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          {
            label: "Total Bridged",
            value: "$284M",
            icon: Coins,
            color: "text-cyan-400",
          },
          {
            label: "Avg. Time",
            value: "~5 min",
            icon: Clock,
            color: "text-blue-400",
          },
          {
            label: "Chains Supported",
            value: "8",
            icon: Globe,
            color: "text-purple-400",
          },
        ].map(({ label, value, icon: Icon, color }) => (
          <Card key={label} className="border-border/50">
            <CardContent className="pt-3 pb-2 text-center">
              <Icon className={`h-4 w-4 ${color} mx-auto mb-1`} />
              <p className="font-black">{value}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {(["bridge", "history"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${tab === t ? "bg-cyan-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "bridge" && (
        <div className="space-y-4">
          {/* Bridge Form */}
          <Card className="border-border/50">
            <CardContent className="pt-5 pb-5 space-y-4">
              {/* From Chain */}
              <div>
                <label className="text-xs text-muted-foreground font-medium">
                  From Chain
                </label>
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {CHAINS.slice(0, 4).map(chain => (
                    <button
                      key={chain.id}
                      onClick={() => {
                        setFromChain(chain);
                        if (chain.id === toChain.id) setToChain(CHAINS[7]);
                      }}
                      className={`flex flex-col items-center gap-1 p-2 rounded-xl border transition-all text-xs ${fromChain.id === chain.id ? "border-cyan-500 bg-cyan-500/10" : "border-border/30 hover:border-border/60"}`}
                    >
                      <span className="text-xl">{chain.icon}</span>
                      <span className="font-medium">{chain.symbol}</span>
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {CHAINS.slice(4).map(chain => (
                    <button
                      key={chain.id}
                      onClick={() => {
                        setFromChain(chain);
                        if (chain.id === toChain.id) setToChain(CHAINS[0]);
                      }}
                      className={`flex flex-col items-center gap-1 p-2 rounded-xl border transition-all text-xs ${fromChain.id === chain.id ? "border-cyan-500 bg-cyan-500/10" : "border-border/30 hover:border-border/60"}`}
                    >
                      <span className="text-xl">{chain.icon}</span>
                      <span className="font-medium">{chain.symbol}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center">
                <button
                  onClick={swapChains}
                  className="h-10 w-10 rounded-full bg-muted border border-border/50 flex items-center justify-center hover:bg-muted/80 transition-colors"
                >
                  <ArrowLeftRight className="h-4 w-4" />
                </button>
              </div>

              {/* To Chain */}
              <div>
                <label className="text-xs text-muted-foreground font-medium">
                  To Chain
                </label>
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {CHAINS.slice(0, 4).map(chain => (
                    <button
                      key={chain.id}
                      onClick={() => {
                        setToChain(chain);
                        if (chain.id === fromChain.id) setFromChain(CHAINS[0]);
                      }}
                      className={`flex flex-col items-center gap-1 p-2 rounded-xl border transition-all text-xs ${toChain.id === chain.id ? "border-cyan-500 bg-cyan-500/10" : "border-border/30 hover:border-border/60"} ${chain.id === fromChain.id ? "opacity-30 cursor-not-allowed" : ""}`}
                      disabled={chain.id === fromChain.id}
                    >
                      <span className="text-xl">{chain.icon}</span>
                      <span className="font-medium">{chain.symbol}</span>
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {CHAINS.slice(4).map(chain => (
                    <button
                      key={chain.id}
                      onClick={() => {
                        setToChain(chain);
                        if (chain.id === fromChain.id) setFromChain(CHAINS[0]);
                      }}
                      className={`flex flex-col items-center gap-1 p-2 rounded-xl border transition-all text-xs ${toChain.id === chain.id ? "border-cyan-500 bg-cyan-500/10" : "border-border/30 hover:border-border/60"} ${chain.id === fromChain.id ? "opacity-30 cursor-not-allowed" : ""}`}
                      disabled={chain.id === fromChain.id}
                    >
                      <span className="text-xl">{chain.icon}</span>
                      <span className="font-medium">{chain.symbol}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Token & Amount */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground">Token</label>
                  <select
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-muted border border-border/50 text-sm"
                    value={token}
                    onChange={e => setToken(e.target.value)}
                  >
                    {availableTokens.length > 0 ? (
                      availableTokens.map(t => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))
                    ) : (
                      <option>No common tokens</option>
                    )}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">
                    Amount
                  </label>
                  <Input
                    placeholder="0.00"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    className="mt-1"
                    type="number"
                  />
                </div>
              </div>

              {/* Summary */}
              {amount && (
                <div className="space-y-1.5 p-3 rounded-xl bg-muted/20 border border-border/30 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Route</span>
                    <span className="font-medium">
                      {fromChain.name} → {toChain.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Bridge Fee (0.2%)
                    </span>
                    <span className="font-medium">
                      {bridgeFee} {token}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Gas Fee</span>
                    <span className="font-medium">{fromChain.gasPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Estimated Time
                    </span>
                    <span className="font-medium">~5 minutes</span>
                  </div>
                  <div className="flex justify-between border-t border-border/30 pt-1.5">
                    <span className="font-bold">You Receive</span>
                    <span className="font-black text-cyan-400">
                      {estimatedReceive} {token}
                    </span>
                  </div>
                </div>
              )}

              <Button
                className="w-full bg-cyan-600 text-white border-0 font-black py-6"
                onClick={executeBridge}
                disabled={bridging}
              >
                {bridging ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Bridging...
                  </>
                ) : (
                  <>
                    <ArrowLeftRight className="h-4 w-4 mr-2" />
                    Bridge {token || "Tokens"}
                  </>
                )}
              </Button>

              <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center">
                <Shield className="h-3.5 w-3.5 text-green-400" />
                <span>
                  Secured by multi-party computation · Audited by Trail of Bits
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "history" && (
        <div className="space-y-3">
          {BRIDGE_HISTORY.map((tx, i) => (
            <Card key={i} className="border-border/50">
              <CardContent className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 ${tx.status === "completed" ? "bg-green-500/10" : "bg-yellow-500/10"}`}
                  >
                    {tx.status === "completed" ? (
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    ) : (
                      <Clock className="h-4 w-4 text-yellow-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold">
                      {tx.from} → {tx.to}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {tx.amount.toLocaleString()} {tx.token} · {tx.time}
                    </p>
                    <p className="text-xs font-mono text-muted-foreground">
                      {tx.txHash}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge
                      className={`text-xs capitalize ${tx.status === "completed" ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"}`}
                    >
                      {tx.status}
                    </Badge>
                    <button
                      className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-0.5"
                      onClick={() => toast.info("Opening block explorer")}
                    >
                      <ExternalLink className="h-3 w-3" />
                      Explorer
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
