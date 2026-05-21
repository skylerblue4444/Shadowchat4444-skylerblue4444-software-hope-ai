import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bot,
  Zap,
  TrendingUp,
  TrendingDown,
  Play,
  Pause,
  Square,
  Settings,
  BarChart2,
  Shield,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  DollarSign,
  Activity,
  Brain,
  Cpu,
  Target,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const STRATEGIES = [
  {
    id: "dca",
    name: "DCA Bot",
    desc: "Dollar-cost average into SKY4444 every 24h",
    roi: "+284%",
    trades: 840,
    winRate: 100,
    risk: "Low",
    active: true,
    icon: "💰",
  },
  {
    id: "grid",
    name: "Grid Trading",
    desc: "Buy low sell high within a price range",
    roi: "+142%",
    trades: 2840,
    winRate: 68,
    risk: "Medium",
    active: false,
    icon: "📊",
  },
  {
    id: "macd",
    name: "MACD Strategy",
    desc: "Trade BTC on MACD crossover signals",
    roi: "+98%",
    trades: 284,
    winRate: 72,
    risk: "Medium",
    active: false,
    icon: "📈",
  },
  {
    id: "arb",
    name: "Arbitrage Bot",
    desc: "Exploit price differences across exchanges",
    roi: "+48%",
    trades: 12840,
    winRate: 94,
    risk: "Low",
    active: false,
    icon: "⚡",
  },
  {
    id: "ai",
    name: "AI Momentum",
    desc: "GPT-4 powered sentiment + technical analysis",
    roi: "+384%",
    trades: 484,
    winRate: 78,
    risk: "High",
    active: false,
    icon: "🤖",
  },
];

const PERFORMANCE_DATA = [
  { date: "Nov", value: 10000 },
  { date: "Dec", value: 11200 },
  { date: "Jan", value: 10800 },
  { date: "Feb", value: 13400 },
  { date: "Mar", value: 16800 },
  { date: "Apr", value: 21200 },
  { date: "May", value: 28400 },
];

const RECENT_TRADES = [
  {
    pair: "SKY4444/USDC",
    side: "buy",
    amount: 10000,
    price: 0.0248,
    pnl: +124.0,
    time: "2m ago",
  },
  {
    pair: "BTC/USDC",
    side: "sell",
    amount: 0.05,
    price: 100012,
    pnl: +84.2,
    time: "15m ago",
  },
  {
    pair: "ETH/USDC",
    side: "buy",
    amount: 0.5,
    price: 3398,
    pnl: -24.4,
    time: "1h ago",
  },
  {
    pair: "TRUMP/USDC",
    side: "buy",
    amount: 50000,
    price: 0.0234,
    pnl: +48.0,
    time: "2h ago",
  },
];

const RISK_COLORS: Record<string, string> = {
  Low: "bg-green-500/10 text-green-400 border-green-500/20",
  Medium: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  High: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function AITradingBot() {
  const [strategies, setStrategies] = useState(STRATEGIES);
  const [tab, setTab] = useState<"bots" | "performance" | "builder" | "logs">(
    "bots"
  );
  const [buildStep, setBuildStep] = useState(0);
  const [botConfig, setBotConfig] = useState({
    pair: "SKY4444/USDC",
    budget: "1000",
    strategy: "dca",
    interval: "24h",
    stopLoss: "10",
    takeProfit: "50",
  });

  const toggleBot = (id: string) => {
    setStrategies(prev =>
      prev.map(s => (s.id === id ? { ...s, active: !s.active } : s))
    );
    const bot = strategies.find(s => s.id === id);
    toast.success(bot?.active ? `${bot.name} paused` : `${bot?.name} started!`);
  };

  const activeBot = strategies.find(s => s.active);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black flex items-center gap-2">
          <Bot className="h-6 w-6 text-cyan-400" />
          AI Trading Bot
        </h1>
        <p className="text-sm text-muted-foreground">
          Automated crypto trading powered by GPT-4 and technical analysis
        </p>
      </div>

      {/* Status Banner */}
      {activeBot && (
        <div className="p-3 rounded-xl bg-green-500/5 border border-green-500/20 flex items-center gap-3">
          <div className="h-3 w-3 rounded-full bg-green-400 animate-pulse" />
          <div className="flex-1">
            <p className="text-sm font-bold text-green-400">
              {activeBot.name} is running
            </p>
            <p className="text-xs text-muted-foreground">{activeBot.desc}</p>
          </div>
          <Button
            size="sm"
            className="h-7 text-xs bg-red-600 text-white border-0"
            onClick={() => toggleBot(activeBot.id)}
          >
            <Square className="h-3.5 w-3.5 mr-1.5" />
            Stop
          </Button>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: "Total PnL", value: "+$18,400", color: "text-green-400" },
          { label: "Win Rate", value: "78.4%", color: "text-blue-400" },
          { label: "Total Trades", value: "2,840", color: "text-purple-400" },
          {
            label: "Active Bots",
            value: String(strategies.filter(s => s.active).length),
            color: "text-cyan-400",
          },
        ].map(({ label, value, color }) => (
          <Card key={label} className="border-border/50">
            <CardContent className="pt-2 pb-2 text-center">
              <p className={`font-black text-sm ${color}`}>{value}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {(["bots", "performance", "builder", "logs"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${tab === t ? "bg-cyan-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "bots" && (
        <div className="space-y-3">
          {strategies.map((strategy, i) => (
            <motion.div
              key={strategy.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card
                className={`border-border/50 ${strategy.active ? "border-green-500/20 bg-green-500/3" : ""}`}
              >
                <CardContent className="py-4 px-4">
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{strategy.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <p className="font-black">{strategy.name}</p>
                        <Badge
                          className={`text-xs ${RISK_COLORS[strategy.risk]}`}
                        >
                          {strategy.risk} Risk
                        </Badge>
                        {strategy.active && (
                          <Badge className="text-xs bg-green-500/10 text-green-400 border-green-500/20">
                            ● Running
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {strategy.desc}
                      </p>
                      <div className="grid grid-cols-3 gap-2 mt-2 text-xs">
                        <div>
                          <p className="text-muted-foreground">ROI</p>
                          <p className="font-black text-green-400">
                            {strategy.roi}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Win Rate</p>
                          <p className="font-black text-blue-400">
                            {strategy.winRate}%
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Trades</p>
                          <p className="font-black">
                            {strategy.trades.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className={`shrink-0 ${strategy.active ? "bg-red-600 text-white" : "bg-cyan-600 text-white"} border-0 text-xs`}
                      onClick={() => toggleBot(strategy.id)}
                    >
                      {strategy.active ? (
                        <>
                          <Pause className="h-3.5 w-3.5 mr-1" />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play className="h-3.5 w-3.5 mr-1" />
                          Start
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "performance" && (
        <div className="space-y-4">
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold">
                Portfolio Value Over Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={PERFORMANCE_DATA}>
                  <defs>
                    <linearGradient id="botGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 10, fill: "#6b7280" }}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: "#6b7280" }}
                    tickFormatter={v => `$${(v / 1000).toFixed(0)}K`}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#1a1a2e",
                      border: "1px solid #333",
                      borderRadius: 8,
                      fontSize: 11,
                    }}
                    formatter={(v: any) => `$${v.toLocaleString()}`}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#06b6d4"
                    fill="url(#botGrad)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <h3 className="font-bold text-sm">Recent Trades</h3>
          {RECENT_TRADES.map((trade, i) => (
            <Card key={i} className="border-border/50">
              <CardContent className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`h-8 w-8 rounded-xl flex items-center justify-center shrink-0 ${trade.side === "buy" ? "bg-green-500/10" : "bg-red-500/10"}`}
                  >
                    {trade.side === "buy" ? (
                      <TrendingUp className="h-4 w-4 text-green-400" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{trade.pair}</p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {trade.side} {trade.amount.toLocaleString()} @ $
                      {trade.price.toLocaleString()} · {trade.time}
                    </p>
                  </div>
                  <p
                    className={`font-black ${trade.pnl >= 0 ? "text-green-400" : "text-red-400"}`}
                  >
                    {trade.pnl >= 0 ? "+" : ""}${trade.pnl.toFixed(2)}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "builder" && (
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold">
              Custom Bot Builder
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-muted-foreground">
                  Trading Pair
                </label>
                <select
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-muted border border-border/50 text-sm"
                  value={botConfig.pair}
                  onChange={e =>
                    setBotConfig(p => ({ ...p, pair: e.target.value }))
                  }
                >
                  {[
                    "SKY4444/USDC",
                    "BTC/USDC",
                    "ETH/USDC",
                    "TRUMP/USDC",
                    "DOGE/USDC",
                  ].map(p => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">
                  Budget (USDC)
                </label>
                <Input
                  placeholder="1000"
                  value={botConfig.budget}
                  onChange={e =>
                    setBotConfig(p => ({ ...p, budget: e.target.value }))
                  }
                  className="mt-1"
                  type="number"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-muted-foreground">
                  Strategy
                </label>
                <select
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-muted border border-border/50 text-sm"
                  value={botConfig.strategy}
                  onChange={e =>
                    setBotConfig(p => ({ ...p, strategy: e.target.value }))
                  }
                >
                  {STRATEGIES.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">
                  Interval
                </label>
                <select
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-muted border border-border/50 text-sm"
                  value={botConfig.interval}
                  onChange={e =>
                    setBotConfig(p => ({ ...p, interval: e.target.value }))
                  }
                >
                  {["1h", "4h", "12h", "24h", "7d"].map(i => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-muted-foreground">
                  Stop Loss (%)
                </label>
                <Input
                  placeholder="10"
                  value={botConfig.stopLoss}
                  onChange={e =>
                    setBotConfig(p => ({ ...p, stopLoss: e.target.value }))
                  }
                  className="mt-1"
                  type="number"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">
                  Take Profit (%)
                </label>
                <Input
                  placeholder="50"
                  value={botConfig.takeProfit}
                  onChange={e =>
                    setBotConfig(p => ({ ...p, takeProfit: e.target.value }))
                  }
                  className="mt-1"
                  type="number"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                className="flex-1 bg-cyan-600 text-white border-0 font-bold"
                onClick={() =>
                  toast.success("Bot deployed! Running backtests...")
                }
              >
                <Play className="h-4 w-4 mr-2" />
                Deploy Bot
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() =>
                  toast.info("Running backtest on 90 days of data...")
                }
              >
                <BarChart2 className="h-4 w-4 mr-2" />
                Backtest
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {tab === "logs" && (
        <div className="space-y-2">
          <Card className="border-border/50 bg-black/40">
            <CardContent className="pt-3 pb-3 font-mono text-xs space-y-1">
              {[
                {
                  time: "14:32:01",
                  level: "INFO",
                  msg: "DCA Bot: Buying 10,000 SKY4444 @ $0.0248",
                },
                {
                  time: "14:32:03",
                  level: "SUCCESS",
                  msg: "Order filled: 10,000 SKY4444 purchased",
                },
                {
                  time: "14:31:55",
                  level: "INFO",
                  msg: "Price check: BTC = $100,012.40 (+0.24%)",
                },
                {
                  time: "14:30:00",
                  level: "INFO",
                  msg: "MACD Signal: Bullish crossover on ETH/USDC 4H",
                },
                {
                  time: "14:28:42",
                  level: "WARNING",
                  msg: "TRUMP/USDC: High volatility detected (±8.4%)",
                },
                {
                  time: "14:25:00",
                  level: "INFO",
                  msg: "Grid Bot: Placing 12 limit orders between $0.020-$0.030",
                },
                {
                  time: "14:20:00",
                  level: "SUCCESS",
                  msg: "Arbitrage: +$12.40 profit on SKY4444 price diff",
                },
                {
                  time: "14:15:00",
                  level: "INFO",
                  msg: "AI Model: Analyzing 48 sentiment signals...",
                },
                {
                  time: "14:10:00",
                  level: "INFO",
                  msg: "Portfolio rebalanced: BTC 40%, ETH 30%, SKY4444 30%",
                },
              ].map((log, i) => (
                <div
                  key={i}
                  className={`flex gap-3 ${log.level === "SUCCESS" ? "text-green-400" : log.level === "WARNING" ? "text-yellow-400" : "text-muted-foreground"}`}
                >
                  <span className="shrink-0 text-gray-600">[{log.time}]</span>
                  <span className="shrink-0">[{log.level}]</span>
                  <span>{log.msg}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
