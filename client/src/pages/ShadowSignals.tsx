import { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Zap,
  Brain,
  Bell,
  CheckCircle,
  Clock,
  BarChart3,
  Target,
  Shield,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Signal {
  id: number;
  pair: string;
  direction: "BUY" | "SELL";
  confidence: number;
  entry: number;
  target: number;
  stopLoss: number;
  timeframe: string;
  strategy: string;
  status: "active" | "hit" | "stopped";
  pnl?: number;
  timestamp: string;
  tags: string[];
}

const SIGNALS: Signal[] = [
  {
    id: 1,
    pair: "SKY4444/USDT",
    direction: "BUY",
    confidence: 94,
    entry: 0.0842,
    target: 0.105,
    stopLoss: 0.078,
    timeframe: "4H",
    strategy: "AI Momentum + RSI Divergence",
    status: "active",
    timestamp: "2 min ago",
    tags: ["AI Pick", "High Confidence", "Trending"],
  },
  {
    id: 2,
    pair: "TRUMP/USDT",
    direction: "BUY",
    confidence: 88,
    entry: 14.2,
    target: 17.5,
    stopLoss: 12.8,
    timeframe: "1D",
    strategy: "Breakout + Volume Surge",
    status: "active",
    timestamp: "15 min ago",
    tags: ["Breakout", "Volume"],
  },
  {
    id: 3,
    pair: "BTC/USDT",
    direction: "BUY",
    confidence: 82,
    entry: 67_420,
    target: 72_000,
    stopLoss: 64_000,
    timeframe: "1D",
    strategy: "Support Bounce + Whale Accumulation",
    status: "active",
    timestamp: "1 hr ago",
    tags: ["Whale Alert", "Support"],
  },
  {
    id: 4,
    pair: "ETH/USDT",
    direction: "SELL",
    confidence: 76,
    entry: 3_540,
    target: 3_200,
    stopLoss: 3_680,
    timeframe: "4H",
    strategy: "Resistance Rejection + Bearish Divergence",
    status: "active",
    timestamp: "2 hr ago",
    tags: ["Resistance", "Bearish"],
  },
  {
    id: 5,
    pair: "DOGE/USDT",
    direction: "BUY",
    confidence: 91,
    entry: 0.162,
    target: 0.21,
    stopLoss: 0.145,
    timeframe: "1H",
    strategy: "Meme Momentum + Social Spike",
    status: "hit",
    pnl: 29.6,
    timestamp: "5 hr ago",
    tags: ["Meme", "Social"],
  },
  {
    id: 6,
    pair: "SOL/USDT",
    direction: "BUY",
    confidence: 85,
    entry: 172.4,
    target: 195.0,
    stopLoss: 160.0,
    timeframe: "4H",
    strategy: "Accumulation Zone + AI Pattern",
    status: "hit",
    pnl: 13.1,
    timestamp: "8 hr ago",
    tags: ["AI Pick", "Accumulation"],
  },
  {
    id: 7,
    pair: "XMR/USDT",
    direction: "SELL",
    confidence: 71,
    entry: 168.0,
    target: 145.0,
    stopLoss: 178.0,
    timeframe: "1D",
    strategy: "Regulatory Pressure + Breakdown",
    status: "stopped",
    pnl: -5.9,
    timestamp: "12 hr ago",
    tags: ["Regulatory"],
  },
];

const STATS = [
  { label: "Win Rate", value: "78.4%", color: "text-green-400" },
  { label: "Avg Return", value: "+18.2%", color: "text-cyan-400" },
  { label: "Active", value: "4", color: "text-yellow-400" },
  { label: "Total Signals", value: "1,247", color: "text-purple-400" },
];

const STRATEGIES = [
  { name: "AI Momentum", accuracy: 82, trades: 342, color: "bg-cyan-500" },
  { name: "Whale Tracker", accuracy: 79, trades: 218, color: "bg-purple-500" },
  { name: "Social Sentiment", accuracy: 74, trades: 189, color: "bg-pink-500" },
  {
    name: "Technical Breakout",
    accuracy: 71,
    trades: 156,
    color: "bg-blue-500",
  },
  {
    name: "On-Chain Analytics",
    accuracy: 85,
    trades: 124,
    color: "bg-green-500",
  },
];

export default function ShadowSignals() {
  const [filter, setFilter] = useState<"all" | "active" | "hit" | "stopped">(
    "all"
  );
  const [scanning, setScanning] = useState(false);

  const filtered = SIGNALS.filter(s => filter === "all" || s.status === filter);

  const runScan = async () => {
    setScanning(true);
    await new Promise(r => setTimeout(r, 1800));
    setScanning(false);
    toast.success(
      "🧠 AI scan complete! 3 new high-confidence signals detected."
    );
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Zap className="h-6 w-6 text-yellow-400" />
            ShadowSignals
          </h1>
          <p className="text-sm text-muted-foreground">
            AI-powered crypto trading signals with 78%+ win rate
          </p>
        </div>
        <Button
          className="bg-yellow-500 text-black border-0 font-bold h-9 text-sm"
          onClick={runScan}
          disabled={scanning}
        >
          <Brain className="h-4 w-4 mr-2" />
          {scanning ? "Scanning…" : "Run AI Scan"}
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2">
        {STATS.map(s => (
          <Card key={s.label} className="border-border/50 text-center">
            <CardContent className="py-3 px-2">
              <p className={`font-black text-lg ${s.color}`}>{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Strategy Performance */}
      <Card className="border-border/50">
        <CardContent className="py-4 px-4 space-y-3">
          <p className="font-bold text-sm flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-cyan-400" />
            Strategy Performance
          </p>
          {STRATEGIES.map(s => (
            <div key={s.name} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-medium">{s.name}</span>
                <span className="text-muted-foreground">
                  {s.accuracy}% accuracy · {s.trades} trades
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full ${s.color} rounded-full`}
                  style={{ width: `${s.accuracy}%` }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        {(["all", "active", "hit", "stopped"] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${filter === f ? "bg-yellow-500 text-black" : "bg-muted text-muted-foreground"}`}
          >
            {f === "all"
              ? "All Signals"
              : f === "hit"
                ? "✅ Hit Target"
                : f === "stopped"
                  ? "❌ Stopped"
                  : "🔥 Active"}
          </button>
        ))}
      </div>

      {/* Signal Cards */}
      <div className="space-y-3">
        {filtered.map((sig, i) => {
          const isBuy = sig.direction === "BUY";
          const rr = (
            Math.abs(sig.target - sig.entry) /
            Math.abs(sig.entry - sig.stopLoss)
          ).toFixed(1);
          return (
            <motion.div
              key={sig.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card
                className={`border-border/50 hover:border-yellow-500/20 transition-all ${sig.status === "hit" ? "opacity-80" : ""}`}
              >
                <CardContent className="py-4 px-4">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${isBuy ? "bg-green-500/10" : "bg-red-500/10"}`}
                      >
                        {isBuy ? (
                          <ArrowUpRight className="h-5 w-5 text-green-400" />
                        ) : (
                          <ArrowDownRight className="h-5 w-5 text-red-400" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-black text-sm">{sig.pair}</p>
                          <Badge
                            className={`text-xs font-bold border-0 ${isBuy ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}
                          >
                            {sig.direction}
                          </Badge>
                          {sig.status === "hit" && (
                            <Badge className="text-xs bg-green-500/10 text-green-400 border-0">
                              ✅ Target Hit
                            </Badge>
                          )}
                          {sig.status === "stopped" && (
                            <Badge className="text-xs bg-red-500/10 text-red-400 border-0">
                              ❌ Stopped
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {sig.strategy} · {sig.timeframe} · {sig.timestamp}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">
                          Confidence
                        </p>
                        <p
                          className={`font-black text-sm ${sig.confidence >= 85 ? "text-green-400" : sig.confidence >= 75 ? "text-yellow-400" : "text-orange-400"}`}
                        >
                          {sig.confidence}%
                        </p>
                      </div>
                      {sig.pnl !== undefined && (
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">PnL</p>
                          <p
                            className={`font-black text-sm ${sig.pnl >= 0 ? "text-green-400" : "text-red-400"}`}
                          >
                            {sig.pnl >= 0 ? "+" : ""}
                            {sig.pnl}%
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                    <div className="bg-muted/50 rounded-lg px-2 py-1.5 text-center">
                      <p className="text-muted-foreground">Entry</p>
                      <p className="font-bold">${sig.entry.toLocaleString()}</p>
                    </div>
                    <div className="bg-green-500/5 rounded-lg px-2 py-1.5 text-center">
                      <p className="text-muted-foreground">Target</p>
                      <p className="font-bold text-green-400">
                        ${sig.target.toLocaleString()}
                      </p>
                    </div>
                    <div className="bg-red-500/5 rounded-lg px-2 py-1.5 text-center">
                      <p className="text-muted-foreground">Stop Loss</p>
                      <p className="font-bold text-red-400">
                        ${sig.stopLoss.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex gap-1 flex-wrap">
                      {sig.tags.map(t => (
                        <Badge
                          key={t}
                          className="text-xs bg-muted text-muted-foreground border-0"
                        >
                          {t}
                        </Badge>
                      ))}
                      <Badge className="text-xs bg-muted text-muted-foreground border-0">
                        R:R {rr}x
                      </Badge>
                    </div>
                    {sig.status === "active" && (
                      <Button
                        size="sm"
                        className="h-7 px-3 text-xs bg-yellow-500 text-black border-0 font-bold"
                        onClick={() =>
                          toast.success(
                            `Alert set for ${sig.pair} ${sig.direction} signal!`
                          )
                        }
                      >
                        <Bell className="h-3 w-3 mr-1" />
                        Alert Me
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
