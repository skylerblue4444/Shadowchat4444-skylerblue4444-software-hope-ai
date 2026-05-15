import { useState } from "react";
import { Newspaper, TrendingUp, TrendingDown, RefreshCw, ExternalLink, Bookmark } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const NEWS = [
  { title: "SKY4444 ICO Raises $2.4M in First 48 Hours", source: "CoinDesk", time: "2h ago", sentiment: "bullish", category: "SKY4444", summary: "The SKY4444 token sale has exceeded all expectations, raising over $2.4M in the first 48 hours with 12,000+ investors participating from 87 countries." },
  { title: "Bitcoin ETF Inflows Hit Record $1.2B in Single Day", source: "Bloomberg", time: "4h ago", sentiment: "bullish", category: "BTC", summary: "Institutional investors poured a record $1.2 billion into Bitcoin ETFs yesterday, signaling growing mainstream adoption." },
  { title: "TRUMP Coin Surges 45% After Political Rally", source: "Reuters", time: "6h ago", sentiment: "bullish", category: "TRUMP", summary: "The TRUMP meme coin saw explosive gains following a major political rally, with trading volume up 800%." },
  { title: "SEC Approves New Crypto Custody Rules for Banks", source: "WSJ", time: "8h ago", sentiment: "neutral", category: "Regulation", summary: "The SEC has approved new rules allowing banks to custody crypto assets, a major step toward institutional adoption." },
  { title: "Ethereum Gas Fees Drop to 6-Month Low", source: "The Block", time: "10h ago", sentiment: "bullish", category: "ETH", summary: "Ethereum gas fees have fallen to their lowest levels in 6 months following the latest network upgrade." },
  { title: "China Announces Blockchain Integration in State Banks", source: "SCMP", time: "12h ago", sentiment: "bullish", category: "China", summary: "China's central bank has announced a major blockchain integration across all state-owned banks, boosting crypto sentiment in Asia." },
];

const SENTIMENT_COLORS: Record<string, string> = {
  bullish: "bg-green-500/10 text-green-400",
  bearish: "bg-red-500/10 text-red-400",
  neutral: "bg-blue-500/10 text-blue-400",
};

export default function ShadowCryptoNews() {
  const [filter, setFilter] = useState("all");
  const [saved, setSaved] = useState<Set<number>>(new Set());
  const filtered = filter === "all" ? NEWS : NEWS.filter(n => n.sentiment === filter || n.category.toLowerCase() === filter);
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><Newspaper className="h-6 w-6 text-blue-400" />Crypto News</h1>
          <p className="text-sm text-muted-foreground">AI-curated news with sentiment analysis</p>
        </div>
        <Button size="sm" variant="outline" className="h-8 text-xs" onClick={() => toast.success("News refreshed!")}>
          <RefreshCw className="h-3.5 w-3.5 mr-1.5" />Refresh
        </Button>
      </div>
      <div className="flex gap-2 flex-wrap">
        {["all","bullish","bearish","neutral","SKY4444","BTC","ETH"].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={"px-3 py-1 rounded-full text-xs font-medium transition-colors " + (filter === f ? "bg-blue-600 text-white" : "bg-muted text-muted-foreground")}>
            {f}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {[
          { label: "Bullish",  value: "68%",  icon: <TrendingUp className="h-4 w-4 text-green-400" />  },
          { label: "Bearish",  value: "12%",  icon: <TrendingDown className="h-4 w-4 text-red-400" />  },
          { label: "Neutral",  value: "20%",  icon: <Newspaper className="h-4 w-4 text-blue-400" />    },
          { label: "Articles", value: "247",  icon: <Newspaper className="h-4 w-4 text-purple-400" />  },
        ].map(s => (
          <Card key={s.label} className="border-border/50">
            <CardContent className="py-2.5 px-3 flex items-center gap-2">
              {s.icon}
              <div><p className="font-black text-sm">{s.value}</p><p className="text-xs text-muted-foreground">{s.label}</p></div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="space-y-3">
        {filtered.map((article, i) => (
          <Card key={i} className="border-border/50 hover:border-blue-500/20 transition-all cursor-pointer">
            <CardContent className="py-3 px-4">
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className="font-bold text-sm leading-snug flex-1">{article.title}</p>
                <button onClick={() => { setSaved(s => { const n = new Set(s); n.has(i) ? n.delete(i) : n.add(i); return n; }); toast.success(saved.has(i) ? "Removed from saved" : "Saved!"); }}>
                  <Bookmark className={"h-4 w-4 shrink-0 " + (saved.has(i) ? "text-blue-400 fill-blue-400" : "text-muted-foreground")} />
                </button>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{article.summary}</p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{article.source} · {article.time}</span>
                <Badge className={"text-xs border-0 " + SENTIMENT_COLORS[article.sentiment]}>{article.sentiment}</Badge>
                <Badge className="text-xs border-0 bg-muted text-muted-foreground">{article.category}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
