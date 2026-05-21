import { useState } from "react";
import {
  Brain,
  TrendingUp,
  TrendingDown,
  Zap,
  RefreshCw,
  Target,
  BarChart3,
  AlertTriangle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const HOLDINGS = [
  {
    coin: "SKY4444",
    alloc: 35,
    value: "$12,450",
    change: "+24.7%",
    rec: "HOLD",
    risk: "low",
    aiNote: "Strong fundamentals, ICO momentum",
  },
  {
    coin: "BTC",
    alloc: 25,
    value: "$8,890",
    change: "+8.2%",
    rec: "BUY",
    risk: "low",
    aiNote: "Institutional accumulation detected",
  },
  {
    coin: "ETH",
    alloc: 20,
    value: "$7,112",
    change: "+12.4%",
    rec: "HOLD",
    risk: "medium",
    aiNote: "DeFi TVL growing, bullish signal",
  },
  {
    coin: "TRUMP",
    alloc: 12,
    value: "$4,267",
    change: "+45.1%",
    rec: "SELL 20%",
    risk: "high",
    aiNote: "Overextended — take partial profits",
  },
  {
    coin: "DOGE",
    alloc: 8,
    value: "$2,845",
    change: "-3.2%",
    rec: "BUY",
    risk: "medium",
    aiNote: "Oversold RSI — accumulation zone",
  },
];

const REC_COLORS: Record<string, string> = {
  BUY: "bg-green-500/10 text-green-400",
  HOLD: "bg-blue-500/10 text-blue-400",
  "SELL 20%": "bg-red-500/10 text-red-400",
};

export default function ShadowAIPortfolioV2() {
  const [rebalancing, setRebalancing] = useState(false);
  const [score, setScore] = useState(78);

  const rebalance = () => {
    setRebalancing(true);
    toast.success(
      "AI rebalancing in progress — optimizing for max Sharpe ratio..."
    );
    setTimeout(() => {
      setRebalancing(false);
      setScore(92);
      toast.success("Portfolio rebalanced! Risk score improved to 92/100");
    }, 2000);
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black flex items-center gap-2">
          <Brain className="h-6 w-6 text-violet-400" />
          AI Portfolio V2
        </h1>
        <p className="text-sm text-muted-foreground">
          AI-powered portfolio optimization with predictive rebalancing and risk
          scoring
        </p>
      </div>
      <div className="rounded-2xl bg-gradient-to-br from-violet-900/30 to-purple-900/20 border border-violet-500/20 p-4">
        <div className="grid grid-cols-4 gap-2 mb-3">
          {[
            {
              label: "Total Value",
              value: "$35,564",
              color: "text-violet-400",
            },
            { label: "24h PnL", value: "+$2,847", color: "text-green-400" },
            {
              label: "AI Score",
              value: score + "/100",
              color: score > 85 ? "text-green-400" : "text-yellow-400",
            },
            { label: "Sharpe Ratio", value: "1.84", color: "text-blue-400" },
          ].map(s => (
            <div key={s.label} className="text-center">
              <p className={"font-black text-lg " + s.color}>{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
        <Button
          className="w-full h-9 bg-violet-600 text-white border-0 font-bold"
          onClick={rebalance}
          disabled={rebalancing}
        >
          {rebalancing ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Rebalancing...
            </>
          ) : (
            <>
              <Zap className="h-4 w-4 mr-2" />
              AI Auto-Rebalance
            </>
          )}
        </Button>
      </div>
      <div className="space-y-2">
        {HOLDINGS.map((h, i) => (
          <Card key={i} className="border-border/50">
            <CardContent className="py-3 px-4">
              <div className="flex items-start justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-violet-500/10 flex items-center justify-center">
                    <span className="font-black text-xs text-violet-400">
                      {h.coin.slice(0, 2)}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-sm">{h.coin}</p>
                      <Badge
                        className={"text-xs border-0 " + REC_COLORS[h.rec]}
                      >
                        {h.rec}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {h.alloc}% allocation
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-sm">{h.value}</p>
                  <p
                    className={
                      "text-xs font-bold " +
                      (h.change.startsWith("+")
                        ? "text-green-400"
                        : "text-red-400")
                    }
                  >
                    {h.change}
                  </p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground bg-muted/50 rounded-lg px-2 py-1 mt-1">
                <Brain className="h-3 w-3 inline mr-1 text-violet-400" />
                {h.aiNote}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
