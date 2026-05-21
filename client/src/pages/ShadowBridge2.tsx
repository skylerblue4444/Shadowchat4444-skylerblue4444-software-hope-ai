import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeftRight,
  Zap,
  Clock,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Shield,
  TrendingUp,
  DollarSign,
  Globe,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const CHAINS = [
  {
    id: "eth",
    name: "Ethereum",
    symbol: "ETH",
    color: "#627EEA",
    fee: "$4.20",
    time: "~5 min",
  },
  {
    id: "bsc",
    name: "BNB Chain",
    symbol: "BNB",
    color: "#F3BA2F",
    fee: "$0.15",
    time: "~1 min",
  },
  {
    id: "sol",
    name: "Solana",
    symbol: "SOL",
    color: "#9945FF",
    fee: "$0.01",
    time: "~30 sec",
  },
  {
    id: "avax",
    name: "Avalanche",
    symbol: "AVAX",
    color: "#E84142",
    fee: "$0.80",
    time: "~2 min",
  },
  {
    id: "matic",
    name: "Polygon",
    symbol: "MATIC",
    color: "#8247E5",
    fee: "$0.05",
    time: "~2 min",
  },
  {
    id: "sky",
    name: "SkyChain",
    symbol: "SKY",
    color: "#3B82F6",
    fee: "$0.001",
    time: "~10 sec",
  },
  {
    id: "arb",
    name: "Arbitrum",
    symbol: "ARB",
    color: "#28A0F0",
    fee: "$0.30",
    time: "~1 min",
  },
  {
    id: "op",
    name: "Optimism",
    symbol: "OP",
    color: "#FF0420",
    fee: "$0.25",
    time: "~1 min",
  },
];

const TOKENS = [
  "SKY4444",
  "TRUMP",
  "ETH",
  "BTC",
  "USDT",
  "USDC",
  "DOGE",
  "BNB",
  "SOL",
];

const TX_HISTORY = [
  {
    from: "Ethereum",
    to: "SkyChain",
    token: "ETH",
    amount: "0.5",
    status: "completed",
    time: "5 min ago",
    hash: "0x7f3a...2b9c",
  },
  {
    from: "BNB Chain",
    to: "Ethereum",
    token: "USDT",
    amount: "500",
    status: "completed",
    time: "2 hr ago",
    hash: "0x4e1b...8a2f",
  },
  {
    from: "SkyChain",
    to: "Polygon",
    token: "SKY4444",
    amount: "10000",
    status: "pending",
    time: "10 min ago",
    hash: "0x9c2d...1e4a",
  },
  {
    from: "Solana",
    to: "Ethereum",
    token: "USDC",
    amount: "1000",
    status: "completed",
    time: "1 day ago",
    hash: "0x2a8f...7d3e",
  },
];

export default function ShadowBridge2() {
  const [fromChain, setFromChain] = useState(CHAINS[0]);
  const [toChain, setToChain] = useState(CHAINS[5]);
  const [token, setToken] = useState("SKY4444");
  const [amount, setAmount] = useState("");
  const [bridging, setBridging] = useState(false);
  const [tab, setTab] = useState<"bridge" | "history" | "liquidity">("bridge");

  const swap = () => {
    const tmp = fromChain;
    setFromChain(toChain);
    setToChain(tmp);
  };

  const handleBridge = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Enter a valid amount");
      return;
    }
    setBridging(true);
    await new Promise(r => setTimeout(r, 2000));
    setBridging(false);
    toast.success(
      `Bridge initiated! ${amount} ${token} from ${fromChain.name} → ${toChain.name}. ETA: ${toChain.time}`
    );
    setAmount("");
  };

  const estimatedFee =
    parseFloat(fromChain.fee.replace("$", "")) +
    parseFloat(toChain.fee.replace("$", ""));
  const estimatedReceive = amount
    ? (parseFloat(amount) * 0.9985).toFixed(4)
    : "0";

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <ArrowLeftRight className="h-6 w-6 text-sky-400" />
            ShadowBridge
          </h1>
          <p className="text-sm text-muted-foreground">
            Cross-chain bridge — move assets between 8 chains instantly
          </p>
        </div>
        <Badge className="bg-green-500/10 text-green-400 border-green-500/20 text-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-green-400 inline-block mr-1.5 animate-pulse" />
          All chains operational
        </Badge>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: "Total Bridged", value: "$84.2M", color: "text-sky-400" },
          { label: "Chains", value: "8", color: "text-cyan-400" },
          { label: "Avg Time", value: "2 min", color: "text-green-400" },
          { label: "Lowest Fee", value: "$0.001", color: "text-yellow-400" },
        ].map(s => (
          <Card key={s.label} className="border-border/50 text-center">
            <CardContent className="py-3 px-2">
              <p className={`font-black text-lg ${s.color}`}>{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {(
          [
            ["bridge", "🌉 Bridge"],
            ["history", "📋 History"],
            ["liquidity", "💧 Liquidity"],
          ] as const
        ).map(([t, label]) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${tab === t ? "bg-sky-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Bridge UI */}
      {tab === "bridge" && (
        <div className="max-w-md mx-auto space-y-4">
          <Card className="border-sky-500/20 bg-sky-900/5">
            <CardContent className="py-5 px-5 space-y-4">
              {/* From Chain */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-muted-foreground">FROM</p>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={fromChain.id}
                    onChange={e =>
                      setFromChain(
                        CHAINS.find(c => c.id === e.target.value) || CHAINS[0]
                      )
                    }
                    className="h-10 px-3 rounded-xl bg-muted text-sm border border-border/50 focus:outline-none"
                  >
                    {CHAINS.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  <select
                    value={token}
                    onChange={e => setToken(e.target.value)}
                    className="h-10 px-3 rounded-xl bg-muted text-sm border border-border/50 focus:outline-none"
                  >
                    {TOKENS.map(t => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <input
                  type="number"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full h-12 px-4 rounded-xl bg-muted text-lg font-bold border border-border/50 focus:outline-none focus:border-sky-500/40"
                />
              </div>

              {/* Swap Button */}
              <div className="flex justify-center">
                <button
                  onClick={swap}
                  className="h-10 w-10 rounded-full bg-sky-500/10 border border-sky-500/20 flex items-center justify-center hover:bg-sky-500/20 transition-colors"
                >
                  <ArrowLeftRight className="h-4 w-4 text-sky-400" />
                </button>
              </div>

              {/* To Chain */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-muted-foreground">TO</p>
                <select
                  value={toChain.id}
                  onChange={e =>
                    setToChain(
                      CHAINS.find(c => c.id === e.target.value) || CHAINS[5]
                    )
                  }
                  className="w-full h-10 px-3 rounded-xl bg-muted text-sm border border-border/50 focus:outline-none"
                >
                  {CHAINS.filter(c => c.id !== fromChain.id).map(c => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                {amount && (
                  <div className="h-12 px-4 rounded-xl bg-muted/50 border border-border/30 flex items-center">
                    <span className="text-lg font-black text-sky-400">
                      {estimatedReceive} {token}
                    </span>
                  </div>
                )}
              </div>

              {/* Fee Estimate */}
              {amount && (
                <div className="bg-muted/50 rounded-xl px-4 py-3 space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Bridge fee</span>
                    <span className="font-bold">
                      ${estimatedFee.toFixed(3)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Estimated time
                    </span>
                    <span className="font-bold">{toChain.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">You receive</span>
                    <span className="font-bold text-sky-400">
                      {estimatedReceive} {token}
                    </span>
                  </div>
                </div>
              )}

              <Button
                className="w-full h-11 bg-sky-600 text-white border-0 font-bold text-sm"
                onClick={handleBridge}
                disabled={bridging}
              >
                {bridging ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Bridging...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Bridge {token}
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Chain Cards */}
          <div className="grid grid-cols-4 gap-2">
            {CHAINS.map(c => (
              <Card
                key={c.id}
                className={`border-border/50 cursor-pointer transition-all text-center ${fromChain.id === c.id || toChain.id === c.id ? "border-sky-500/40" : "hover:border-sky-500/20"}`}
                onClick={() => (fromChain.id === c.id ? null : setToChain(c))}
              >
                <CardContent className="py-2 px-1">
                  <div
                    className="h-6 w-6 rounded-full mx-auto mb-1"
                    style={{
                      backgroundColor: c.color + "30",
                      border: `1px solid ${c.color}50`,
                    }}
                  >
                    <span
                      className="text-[8px] font-black flex items-center justify-center h-full"
                      style={{ color: c.color }}
                    >
                      {c.symbol.slice(0, 3)}
                    </span>
                  </div>
                  <p className="text-[10px] font-bold truncate">
                    {c.name.split(" ")[0]}
                  </p>
                  <p className="text-[9px] text-muted-foreground">{c.fee}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* History */}
      {tab === "history" && (
        <div className="space-y-3">
          {TX_HISTORY.map((tx, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Card className="border-border/50">
                <CardContent className="py-3 px-4 flex items-center gap-3">
                  <div
                    className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 ${tx.status === "completed" ? "bg-green-500/10" : "bg-yellow-500/10"}`}
                  >
                    {tx.status === "completed" ? (
                      <CheckCircle className="h-4.5 w-4.5 text-green-400" />
                    ) : (
                      <RefreshCw className="h-4.5 w-4.5 text-yellow-400 animate-spin" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm">
                      {tx.amount} {tx.token}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {tx.from} → {tx.to} · {tx.time}
                    </p>
                    <p className="text-xs text-muted-foreground font-mono">
                      {tx.hash}
                    </p>
                  </div>
                  <Badge
                    className={`text-xs border-0 ${tx.status === "completed" ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"}`}
                  >
                    {tx.status}
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Liquidity */}
      {tab === "liquidity" && (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Provide liquidity to bridge pools and earn fees from every
            cross-chain transfer.
          </p>
          {CHAINS.map((chain, i) => (
            <Card
              key={chain.id}
              className="border-border/50 hover:border-sky-500/20 transition-all"
            >
              <CardContent className="py-3 px-4 flex items-center gap-3">
                <div
                  className="h-9 w-9 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: chain.color + "20",
                    border: `1px solid ${chain.color}40`,
                  }}
                >
                  <span
                    className="text-xs font-black"
                    style={{ color: chain.color }}
                  >
                    {chain.symbol.slice(0, 3)}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm">{chain.name} Pool</p>
                  <p className="text-xs text-muted-foreground">
                    Fee: {chain.fee} per tx · {chain.time} avg
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-black text-sm text-sky-400">
                    {(8 + i * 2.4).toFixed(1)}% APY
                  </p>
                  <Button
                    size="sm"
                    className="h-7 px-3 text-xs bg-sky-600 text-white border-0 font-bold mt-1"
                    onClick={() =>
                      toast.success(`Added liquidity to ${chain.name} pool!`)
                    }
                  >
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
