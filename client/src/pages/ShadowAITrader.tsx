import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Bot,
  TrendingUp,
  TrendingDown,
  Zap,
  Brain,
  Target,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Activity,
} from "lucide-react";
import { toast } from "sonner";

const signals = [
  {
    pair: "BTC/USDT",
    action: "BUY",
    confidence: 94,
    price: "67,420",
    target: "72,000",
    stop: "65,000",
    timeframe: "4H",
    reason: "Golden cross + RSI oversold + volume surge",
    profit: "+6.8%",
  },
  {
    pair: "ETH/USDT",
    action: "BUY",
    confidence: 87,
    price: "3,847",
    target: "4,200",
    stop: "3,600",
    timeframe: "1D",
    reason: "Support bounce + MACD bullish divergence",
    profit: "+9.2%",
  },
  {
    pair: "SKY4444/USDT",
    action: "BUY",
    confidence: 96,
    price: "0.047",
    target: "0.12",
    stop: "0.038",
    timeframe: "1W",
    reason: "ICO momentum + ecosystem growth + whale accumulation",
    profit: "+155%",
  },
  {
    pair: "TRUMP/USDT",
    action: "HOLD",
    confidence: 72,
    price: "14.20",
    target: "18.00",
    stop: "12.00",
    timeframe: "1D",
    reason: "Consolidation phase — wait for breakout confirmation",
    profit: "+26.8%",
  },
  {
    pair: "SOL/USDT",
    action: "SELL",
    confidence: 81,
    price: "178.50",
    target: "155.00",
    stop: "185.00",
    timeframe: "4H",
    reason: "Bearish engulfing + overbought RSI + resistance rejection",
    profit: "-13.2%",
  },
  {
    pair: "DOGE/USDT",
    action: "BUY",
    confidence: 78,
    price: "0.1847",
    target: "0.22",
    stop: "0.165",
    timeframe: "1D",
    reason: "Social sentiment spike + Musk tweet pattern",
    profit: "+19.1%",
  },
];

const strategies = [
  {
    name: "Momentum Scalper",
    status: "active",
    pnl: "+$12,847",
    trades: 247,
    winRate: 73,
    drawdown: 4.2,
  },
  {
    name: "DCA Bot SKY4444",
    status: "active",
    pnl: "+$8,420",
    trades: 84,
    winRate: 91,
    drawdown: 1.8,
  },
  {
    name: "Grid Trading ETH",
    status: "paused",
    pnl: "+$3,247",
    trades: 1247,
    winRate: 68,
    drawdown: 6.1,
  },
  {
    name: "Arbitrage Hunter",
    status: "active",
    pnl: "+$24,847",
    trades: 8247,
    winRate: 94,
    drawdown: 0.8,
  },
];

export default function ShadowAITrader() {
  const [activeTab, setActiveTab] = useState<
    "signals" | "strategies" | "backtest"
  >("signals");
  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Bot className="h-6 w-6 text-violet-400" /> ShadowAI Trader
          </h1>
          <p className="text-sm text-muted-foreground">
            AI-powered trading intelligence — signals, bots, and backtesting
          </p>
        </div>
        <Badge className="bg-violet-600 text-white">Live AI</Badge>
      </div>
      <div className="grid grid-cols-4 gap-2">
        <Card className="border-border/50 text-center">
          <CardContent className="py-3">
            <p className="font-black text-lg text-green-400">+$49,361</p>
            <p className="text-xs text-muted-foreground">Total AI PnL</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 text-center">
          <CardContent className="py-3">
            <p className="font-black text-lg text-blue-400">81.5%</p>
            <p className="text-xs text-muted-foreground">Win Rate</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 text-center">
          <CardContent className="py-3">
            <p className="font-black text-lg text-violet-400">9,825</p>
            <p className="text-xs text-muted-foreground">Total Trades</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 text-center">
          <CardContent className="py-3">
            <p className="font-black text-lg text-orange-400">2.8%</p>
            <p className="text-xs text-muted-foreground">Max Drawdown</p>
          </CardContent>
        </Card>
      </div>
      <div className="flex gap-2">
        {(["signals", "strategies", "backtest"] as const).map(t => (
          <Button
            key={t}
            size="sm"
            variant={activeTab === t ? "default" : "outline"}
            onClick={() => setActiveTab(t)}
            className="capitalize"
          >
            {t}
          </Button>
        ))}
      </div>
      {activeTab === "signals" && (
        <div className="space-y-2">
          {signals.map((s, i) => (
            <Card key={i} className="border-border/50">
              <CardContent className="py-3 px-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-sm">{s.pair}</span>
                    <Badge
                      className={
                        s.action === "BUY"
                          ? "bg-green-600 text-white"
                          : s.action === "SELL"
                            ? "bg-red-600 text-white"
                            : "bg-yellow-600 text-white"
                      }
                    >
                      {s.action}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {s.timeframe}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      Confidence
                    </span>
                    <span
                      className={`font-black text-sm ${s.confidence >= 90 ? "text-green-400" : s.confidence >= 75 ? "text-yellow-400" : "text-orange-400"}`}
                    >
                      {s.confidence}%
                    </span>
                  </div>
                </div>
                <Progress value={s.confidence} className="h-1.5 mb-2" />
                <div className="grid grid-cols-4 gap-2 text-xs mb-1">
                  <div>
                    <p className="text-muted-foreground">Entry</p>
                    <p className="font-bold">${s.price}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Target</p>
                    <p className="font-bold text-green-400">${s.target}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Stop</p>
                    <p className="font-bold text-red-400">${s.stop}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Potential</p>
                    <p
                      className={`font-bold ${s.profit.startsWith("+") ? "text-green-400" : "text-red-400"}`}
                    >
                      {s.profit}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{s.reason}</p>
                <Button
                  size="sm"
                  className="mt-2 h-7 text-xs bg-violet-600 text-white border-0"
                  onClick={() =>
                    toast.success(`Auto-trade ${s.action} ${s.pair} queued!`)
                  }
                >
                  <Zap className="h-3 w-3 mr-1" /> Auto-Trade
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      {activeTab === "strategies" && (
        <div className="space-y-2">
          {strategies.map((s, i) => (
            <Card key={i} className="border-border/50">
              <CardContent className="py-3 px-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Brain className="h-4 w-4 text-violet-400" />
                    <span className="font-bold text-sm">{s.name}</span>
                    <Badge
                      className={
                        s.status === "active"
                          ? "bg-green-600 text-white"
                          : "bg-yellow-600 text-white"
                      }
                    >
                      {s.status}
                    </Badge>
                  </div>
                  <span className="font-black text-green-400">{s.pnl}</span>
                </div>
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div>
                    <p className="text-muted-foreground">Trades</p>
                    <p className="font-bold">{s.trades.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Win Rate</p>
                    <p className="font-bold text-green-400">{s.winRate}%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Max DD</p>
                    <p className="font-bold text-orange-400">{s.drawdown}%</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 text-xs flex-1"
                    onClick={() => toast.success("Strategy settings opened")}
                  >
                    Configure
                  </Button>
                  <Button
                    size="sm"
                    className="h-7 text-xs flex-1 bg-violet-600 text-white border-0"
                    onClick={() =>
                      toast.success(
                        s.status === "active"
                          ? "Strategy paused"
                          : "Strategy activated!"
                      )
                    }
                  >
                    {s.status === "active" ? "Pause" : "Activate"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          <Button
            className="w-full bg-violet-600 text-white border-0"
            onClick={() => toast.success("Strategy builder opened!")}
          >
            <Bot className="h-4 w-4 mr-2" /> Create New AI Strategy
          </Button>
        </div>
      )}
      {activeTab === "backtest" && (
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <BarChart3 className="h-4 w-4" /> Backtest Engine
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              {[
                ["Strategy", "Momentum Scalper"],
                ["Pair", "BTC/USDT"],
                ["Period", "Jan 2024 – May 2026"],
                ["Initial Capital", "$10,000"],
              ].map(([l, v], i) => (
                <div key={i} className="rounded-lg bg-muted/50 p-2">
                  <p className="text-xs text-muted-foreground">{l}</p>
                  <p className="text-sm font-bold">{v}</p>
                </div>
              ))}
            </div>
            <div className="rounded-xl bg-gradient-to-br from-violet-900/30 to-indigo-900/30 border border-violet-500/20 p-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">
                Backtest Result
              </p>
              <p className="text-3xl font-black text-green-400">+847%</p>
              <p className="text-xs text-muted-foreground">
                $10,000 → $94,700 over 16 months
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              {[
                ["Sharpe Ratio", "3.47", "text-green-400"],
                ["Max Drawdown", "8.2%", "text-orange-400"],
                ["Total Trades", "2,847", "text-blue-400"],
              ].map(([l, v, c], i) => (
                <div key={i} className="rounded-lg bg-muted/50 p-2">
                  <p className={`font-black ${c}`}>{v}</p>
                  <p className="text-muted-foreground">{l}</p>
                </div>
              ))}
            </div>
            <Button
              className="w-full bg-violet-600 text-white border-0"
              onClick={() => toast.success("Running backtest...")}
            >
              <Activity className="h-4 w-4 mr-2" /> Run New Backtest
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
