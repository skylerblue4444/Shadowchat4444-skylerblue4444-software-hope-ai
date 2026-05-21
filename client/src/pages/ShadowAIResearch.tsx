import { useState } from "react";
import {
  Search,
  Brain,
  FileText,
  TrendingUp,
  Zap,
  RefreshCw,
  BookOpen,
  Star,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const REPORTS = [
  {
    title: "SKY4444 Token Analysis Q2 2026",
    type: "Token Report",
    date: "May 15",
    score: 94,
    summary: "Bullish fundamentals, strong ICO momentum, 2.4M raised",
  },
  {
    title: "DeFi Market Overview May 2026",
    type: "Market Report",
    date: "May 14",
    score: 87,
    summary: "TVL up 34% MoM, yield farming APYs stabilizing at 12-18%",
  },
  {
    title: "TRUMP Coin Sentiment Analysis",
    type: "Sentiment",
    date: "May 13",
    score: 78,
    summary: "Community sentiment 82% bullish, social volume up 340%",
  },
  {
    title: "NFT Market Rarity Prediction Model",
    type: "AI Prediction",
    date: "May 12",
    score: 91,
    summary: "AI model predicts 23% floor price increase in top 10 collections",
  },
];

export default function ShadowAIResearch() {
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [result, setResult] = useState("");

  const search = async () => {
    if (!query.trim()) return;
    setSearching(true);
    await new Promise(r => setTimeout(r, 1800));
    setResult(
      'AI Research Summary for "' +
        query +
        '": Based on 847 data sources, on-chain analytics, and social sentiment — the outlook is cautiously bullish with key resistance at current ATH. Recommended action: accumulate on dips with 15% portfolio allocation. Confidence: 84%.'
    );
    setSearching(false);
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black flex items-center gap-2">
          <Brain className="h-6 w-6 text-fuchsia-400" />
          AI Research Hub
        </h1>
        <p className="text-sm text-muted-foreground">
          Deep AI-powered crypto research, token analysis, and market
          intelligence
        </p>
      </div>
      <Card className="border-border/50">
        <CardContent className="py-3 px-4">
          <div className="flex gap-2">
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Ask AI anything: 'Is SKY4444 a good investment?' or 'Analyze TRUMP coin...'"
              className="flex-1 h-9 px-3 rounded-xl bg-muted text-sm border border-border/50 focus:outline-none"
              onKeyDown={e => e.key === "Enter" && search()}
            />
            <Button
              className="h-9 bg-fuchsia-600 text-white border-0 font-bold"
              onClick={search}
              disabled={searching || !query.trim()}
            >
              {searching ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
            </Button>
          </div>
          {result && (
            <div className="mt-3 p-3 rounded-xl bg-fuchsia-500/5 border border-fuchsia-500/20 text-sm">
              {result}
            </div>
          )}
        </CardContent>
      </Card>
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: "Reports", value: "1,247", color: "text-fuchsia-400" },
          { label: "Data Sources", value: "847", color: "text-green-400" },
          { label: "Accuracy", value: "89.4%", color: "text-blue-400" },
          { label: "Signals", value: "24", color: "text-orange-400" },
        ].map(s => (
          <Card key={s.label} className="border-border/50 text-center">
            <CardContent className="py-3 px-2">
              <p className={"font-black text-lg " + s.color}>{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="space-y-2">
        <p className="text-sm font-bold">Latest Research Reports</p>
        {REPORTS.map((r, i) => (
          <Card key={i} className="border-border/50">
            <CardContent className="py-3 px-4">
              <div className="flex items-start justify-between mb-1">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <Badge className="bg-fuchsia-500/10 text-fuchsia-400 border-0 text-xs">
                      {r.type}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {r.date}
                    </span>
                  </div>
                  <p className="font-bold text-sm">{r.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {r.summary}
                  </p>
                </div>
                <div className="text-right shrink-0 ml-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                    <span className="font-black text-sm text-yellow-400">
                      {r.score}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">score</p>
                </div>
              </div>
              <Button
                size="sm"
                className="w-full h-7 mt-1 bg-muted font-bold text-xs"
                onClick={() => toast.success("Opening full report: " + r.title)}
              >
                <BookOpen className="h-3 w-3 mr-1" />
                Read Full Report
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
