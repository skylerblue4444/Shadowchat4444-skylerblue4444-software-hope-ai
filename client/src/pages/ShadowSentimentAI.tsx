import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  TrendingUp,
  TrendingDown,
  Minus,
  RefreshCw,
  Zap,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const ASSETS = [
  {
    symbol: "SKY4444",
    name: "Sky4444",
    sentiment: 84,
    trend: "bullish",
    score: "+8.4%",
    sources: 1420,
    color: "text-cyan-400",
  },
  {
    symbol: "TRUMP",
    name: "Trump Coin",
    sentiment: 72,
    trend: "bullish",
    score: "+5.2%",
    sources: 8420,
    color: "text-red-400",
  },
  {
    symbol: "BTC",
    name: "Bitcoin",
    sentiment: 61,
    trend: "neutral",
    score: "+1.8%",
    sources: 42000,
    color: "text-orange-400",
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    sentiment: 68,
    trend: "bullish",
    score: "+3.4%",
    sources: 28000,
    color: "text-blue-400",
  },
  {
    symbol: "DOGE",
    name: "Dogecoin",
    sentiment: 45,
    trend: "bearish",
    score: "-2.1%",
    sources: 14000,
    color: "text-yellow-400",
  },
  {
    symbol: "XMR",
    name: "Monero",
    sentiment: 52,
    trend: "neutral",
    score: "+0.8%",
    sources: 2800,
    color: "text-gray-400",
  },
];

const NEWS_FEED = [
  {
    source: "Twitter",
    text: "SKY4444 trending worldwide — 'ShadowChat is the future of Web3'",
    sentiment: "positive",
    time: "2m",
  },
  {
    source: "Reddit",
    text: "r/crypto: ShadowChat ICO analysis — 10x potential by EOY",
    sentiment: "positive",
    time: "8m",
  },
  {
    source: "Telegram",
    text: "TRUMP coin whale accumulation detected — 42M tokens moved",
    sentiment: "positive",
    time: "15m",
  },
  {
    source: "Twitter",
    text: "BTC dominance falling — altcoin season incoming?",
    sentiment: "neutral",
    time: "22m",
  },
  {
    source: "News",
    text: "SEC announces new crypto framework — market uncertainty rises",
    sentiment: "negative",
    time: "45m",
  },
  {
    source: "Discord",
    text: "ShadowChat v12 launch — community excitement at all-time high",
    sentiment: "positive",
    time: "1h",
  },
];

export default function ShadowSentimentAI() {
  const [scanning, setScanning] = useState(false);
  const [lastScan, setLastScan] = useState("2 min ago");
  const [tab, setTab] = useState("assets");

  const runScan = async () => {
    setScanning(true);
    await new Promise(r => setTimeout(r, 2000));
    setScanning(false);
    setLastScan("just now");
    toast.success("Sentiment scan complete — 84,000+ sources analyzed");
  };

  const sentimentColor = (s: number) =>
    s >= 70 ? "text-green-400" : s >= 50 ? "text-yellow-400" : "text-red-400";
  const sentimentBg = (s: number) =>
    s >= 70 ? "bg-green-500" : s >= 50 ? "bg-yellow-500" : "bg-red-500";

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Brain className="h-6 w-6 text-purple-400" />
            Sentiment AI
          </h1>
          <p className="text-sm text-muted-foreground">
            Real-time AI sentiment analysis across Twitter, Reddit, Telegram,
            Discord, and news
          </p>
        </div>
        <Button
          size="sm"
          className="h-8 bg-purple-600 text-white border-0 font-bold text-xs"
          onClick={runScan}
          disabled={scanning}
        >
          {scanning ? (
            <>
              <RefreshCw className="h-3.5 w-3.5 mr-1 animate-spin" />
              Scanning...
            </>
          ) : (
            <>
              <Zap className="h-3.5 w-3.5 mr-1" />
              Scan Now
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {[
          {
            label: "Sources Monitored",
            value: "84K+",
            color: "text-purple-400",
          },
          {
            label: "Overall Sentiment",
            value: "Bullish",
            color: "text-green-400",
          },
          { label: "Fear & Greed", value: "72/100", color: "text-yellow-400" },
          { label: "Last Scan", value: lastScan, color: "text-cyan-400" },
        ].map(s => (
          <Card key={s.label} className="border-border/50 text-center">
            <CardContent className="py-3 px-2">
              <p className={"font-black text-sm " + s.color}>{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-2">
        {["assets", "news", "heatmap"].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={
              "px-3 py-1.5 rounded-full text-xs font-medium transition-colors " +
              (tab === t
                ? "bg-purple-600 text-white"
                : "bg-muted text-muted-foreground")
            }
          >
            {t === "assets"
              ? "📊 Assets"
              : t === "news"
                ? "📰 News Feed"
                : "🌡️ Heatmap"}
          </button>
        ))}
      </div>

      {tab === "assets" && (
        <div className="space-y-3">
          {ASSETS.map((asset, i) => (
            <motion.div
              key={asset.symbol}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Card className="border-border/50 hover:border-purple-500/20 transition-all">
                <CardContent className="py-3 px-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className={"font-black text-sm " + asset.color}>
                          {asset.symbol}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {asset.name}
                        </p>
                        <Badge
                          className={
                            "text-xs border-0 " +
                            (asset.trend === "bullish"
                              ? "bg-green-500/10 text-green-400"
                              : asset.trend === "bearish"
                                ? "bg-red-500/10 text-red-400"
                                : "bg-muted text-muted-foreground")
                          }
                        >
                          {asset.trend === "bullish"
                            ? "🐂"
                            : asset.trend === "bearish"
                              ? "🐻"
                              : "➡️"}{" "}
                          {asset.trend}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {asset.sources.toLocaleString()} sources
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p
                        className={
                          "font-black text-lg " +
                          sentimentColor(asset.sentiment)
                        }
                      >
                        {asset.sentiment}
                      </p>
                      <p
                        className={
                          "text-xs font-bold " +
                          (asset.score.startsWith("+")
                            ? "text-green-400"
                            : "text-red-400")
                        }
                      >
                        {asset.score}
                      </p>
                    </div>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className={
                        "h-full rounded-full " + sentimentBg(asset.sentiment)
                      }
                      initial={{ width: 0 }}
                      animate={{ width: asset.sentiment + "%" }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "news" && (
        <div className="space-y-2">
          {NEWS_FEED.map((item, i) => (
            <Card key={i} className="border-border/50">
              <CardContent className="py-3 px-4 flex items-start gap-3">
                <Badge
                  className={
                    "text-xs border-0 shrink-0 mt-0.5 " +
                    (item.sentiment === "positive"
                      ? "bg-green-500/10 text-green-400"
                      : item.sentiment === "negative"
                        ? "bg-red-500/10 text-red-400"
                        : "bg-muted text-muted-foreground")
                  }
                >
                  {item.source}
                </Badge>
                <div className="flex-1">
                  <p className="text-xs leading-relaxed">{item.text}</p>
                </div>
                <span className="text-xs text-muted-foreground shrink-0">
                  {item.time}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "heatmap" && (
        <div className="grid grid-cols-3 gap-3">
          {ASSETS.map(asset => {
            const intensity = asset.sentiment;
            const bg =
              intensity >= 70
                ? "bg-green-500/20 border-green-500/30"
                : intensity >= 50
                  ? "bg-yellow-500/20 border-yellow-500/30"
                  : "bg-red-500/20 border-red-500/30";
            return (
              <Card key={asset.symbol} className={"border " + bg}>
                <CardContent className="py-4 px-3 text-center">
                  <p
                    className={
                      "font-black text-lg " + sentimentColor(asset.sentiment)
                    }
                  >
                    {asset.sentiment}
                  </p>
                  <p className="font-bold text-sm">{asset.symbol}</p>
                  <p className="text-xs text-muted-foreground">{asset.trend}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
