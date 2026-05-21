import { useState } from "react";
import {
  Brain,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Target,
  AlertTriangle,
  Zap,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const HOLDINGS = [
  {
    token: "SKY4444",
    alloc: 35,
    value: "$29,400",
    change: "+12.4%",
    rec: "HOLD",
    reason: "Strong momentum, ICO upcoming",
  },
  {
    token: "BTC",
    alloc: 25,
    value: "$21,000",
    change: "+3.2%",
    rec: "BUY",
    reason: "Institutional accumulation detected",
  },
  {
    token: "ETH",
    alloc: 20,
    value: "$16,800",
    change: "-1.8%",
    rec: "HOLD",
    reason: "Awaiting ETF approval catalyst",
  },
  {
    token: "TRUMP",
    alloc: 10,
    value: "$8,400",
    change: "+28.4%",
    rec: "TAKE PROFIT",
    reason: "Overbought, reduce 30% position",
  },
  {
    token: "DOGE",
    alloc: 5,
    value: "$4,200",
    change: "+5.6%",
    rec: "BUY",
    reason: "Elon tweet catalyst incoming",
  },
  {
    token: "USDT",
    alloc: 5,
    value: "$4,200",
    change: "0.0%",
    rec: "DEPLOY",
    reason: "Deploy idle cash to SKY4444 staking",
  },
];

const RECS: Record<string, string> = {
  HOLD: "bg-blue-500/10 text-blue-400",
  BUY: "bg-green-500/10 text-green-400",
  "TAKE PROFIT": "bg-yellow-500/10 text-yellow-400",
  DEPLOY: "bg-purple-500/10 text-purple-400",
};

export default function ShadowAIPortfolio() {
  const [analyzing, setAnalyzing] = useState(false);
  const analyze = async () => {
    setAnalyzing(true);
    await new Promise(r => setTimeout(r, 2000));
    setAnalyzing(false);
    toast.success("AI analysis complete — 3 rebalancing opportunities found");
  };
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black flex items-center gap-2">
          <Brain className="h-6 w-6 text-violet-400" />
          AI Portfolio Manager
        </h1>
        <p className="text-sm text-muted-foreground">
          AI-powered portfolio analysis, rebalancing, and optimization
        </p>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: "Total Value", value: "$84,000", color: "text-violet-400" },
          { label: "24h PnL", value: "+$4,284", color: "text-green-400" },
          { label: "AI Score", value: "87/100", color: "text-blue-400" },
          { label: "Risk Level", value: "Medium", color: "text-yellow-400" },
        ].map(s => (
          <Card key={s.label} className="border-border/50 text-center">
            <CardContent className="py-3 px-2">
              <p className={"font-black text-lg " + s.color}>{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Button
        className="w-full h-10 bg-violet-600 text-white border-0 font-bold"
        onClick={analyze}
        disabled={analyzing}
      >
        {analyzing ? (
          <>
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            Analyzing Portfolio...
          </>
        ) : (
          <>
            <Brain className="h-4 w-4 mr-2" />
            Run AI Analysis
          </>
        )}
      </Button>
      <div className="space-y-2">
        <p className="text-sm font-bold">AI Recommendations</p>
        {HOLDINGS.map((h, i) => (
          <Card key={i} className="border-border/50">
            <CardContent className="py-3 px-4">
              <div className="flex items-center gap-3 mb-1">
                <div className="h-8 w-8 rounded-xl bg-violet-500/10 flex items-center justify-center shrink-0">
                  <span className="text-xs font-black text-violet-400">
                    {h.token.slice(0, 3)}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-sm">{h.token}</p>
                    <Badge className={"text-xs border-0 " + RECS[h.rec]}>
                      {h.rec}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{h.reason}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-black text-sm">{h.value}</p>
                  <p
                    className={
                      "text-xs font-bold " +
                      (h.change.startsWith("+")
                        ? "text-green-400"
                        : h.change === "0.0%"
                          ? "text-muted-foreground"
                          : "text-red-400")
                    }
                  >
                    {h.change}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-violet-500 rounded-full"
                    style={{ width: h.alloc + "%" }}
                  />
                </div>
                <span className="text-xs text-muted-foreground w-8 text-right">
                  {h.alloc}%
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
