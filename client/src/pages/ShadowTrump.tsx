import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Flame,
  Star,
  Share2,
  Heart,
  MessageCircle,
  Coins,
  Zap,
  Trophy,
  BarChart3,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const MEMES = [
  {
    id: 1,
    title: "TRUMP to the Moon 🚀",
    img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&q=80",
    likes: 4444,
    comments: 144,
    shares: 88,
  },
  {
    id: 2,
    title: "We're All Gonna Make It 🇺🇸",
    img: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=400&q=80",
    likes: 8888,
    comments: 244,
    shares: 144,
  },
  {
    id: 3,
    title: "TRUMP Coin Holders Be Like",
    img: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&q=80",
    likes: 2222,
    comments: 88,
    shares: 44,
  },
];

const NEWS = [
  {
    title: "TRUMP Coin Surges 44% on Political Rally News",
    time: "1 hr ago",
    source: "CryptoNews",
    sentiment: "bullish",
  },
  {
    title: "Major Exchange Lists TRUMP/SKY4444 Trading Pair",
    time: "3 hr ago",
    source: "ShadowNews",
    sentiment: "bullish",
  },
  {
    title: "TRUMP Coin Community Reaches 4.4M Holders",
    time: "6 hr ago",
    source: "CoinDesk",
    sentiment: "bullish",
  },
  {
    title: "Analysts Set $0.44 Price Target for TRUMP",
    time: "1 day ago",
    source: "TradingView",
    sentiment: "neutral",
  },
];

export default function ShadowTrump() {
  const [price, setPrice] = useState(0.2847);
  const [change, setChange] = useState(+12.4);
  const [tab, setTab] = useState<"overview" | "memes" | "news" | "trade">(
    "overview"
  );
  const [liked, setLiked] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrice(p =>
        parseFloat((p + (Math.random() - 0.48) * 0.002).toFixed(4))
      );
      setChange(c => parseFloat((c + (Math.random() - 0.48) * 0.2).toFixed(2)));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            🇺🇸 TRUMP Hub
          </h1>
          <p className="text-sm text-muted-foreground">
            Official TRUMP coin community, trading, and memes
          </p>
        </div>
        <Badge
          className={`font-bold ${change >= 0 ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-red-500/10 text-red-400 border-red-500/20"}`}
        >
          {change >= 0 ? "🚀" : "📉"} {change >= 0 ? "+" : ""}
          {change}%
        </Badge>
      </div>

      {/* Price Card */}
      <Card className="border-yellow-500/20 bg-gradient-to-br from-yellow-900/10 to-red-900/10">
        <CardContent className="py-4 px-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground mb-1">TRUMP/USDT</p>
              <motion.p
                key={price}
                initial={{ scale: 1.05 }}
                animate={{ scale: 1 }}
                className="text-3xl font-black text-yellow-400"
              >
                ${price.toFixed(4)}
              </motion.p>
              <p
                className={`text-sm font-bold mt-0.5 ${change >= 0 ? "text-green-400" : "text-red-400"}`}
              >
                {change >= 0 ? (
                  <TrendingUp className="h-4 w-4 inline mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 inline mr-1" />
                )}
                {change >= 0 ? "+" : ""}
                {change}% (24h)
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Market Cap</p>
              <p className="font-black text-sm">$2.84B</p>
              <p className="text-xs text-muted-foreground mt-1">Volume 24h</p>
              <p className="font-bold text-sm text-yellow-400">$444M</p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 mt-3">
            {[
              { label: "24h High", value: "$0.3120" },
              { label: "24h Low", value: "$0.2544" },
              { label: "ATH", value: "$0.7344" },
              { label: "Holders", value: "4.4M" },
            ].map(s => (
              <div key={s.label} className="text-center">
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="font-bold text-xs">{s.value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-2">
        {(["overview", "memes", "news", "trade"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-yellow-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {[
              {
                label: "SKY4444 Pair",
                value: "1 TRUMP = 0.064 SKY",
                emoji: "⚡",
              },
              {
                label: "BTC Pair",
                value: "1 TRUMP = 0.0000027 BTC",
                emoji: "₿",
              },
              { label: "Staking APY", value: "44.4%", emoji: "🏦" },
              { label: "Community", value: "4.4M members", emoji: "👥" },
            ].map(s => (
              <Card key={s.label} className="border-border/50">
                <CardContent className="py-3 px-3">
                  <p className="text-xl mb-1">{s.emoji}</p>
                  <p className="font-black text-xs text-yellow-400">
                    {s.value}
                  </p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card className="border-yellow-500/20 bg-yellow-900/5">
            <CardContent className="py-3 px-4">
              <p className="font-bold text-sm mb-2">Community Sentiment</p>
              <div className="flex gap-2 mb-2">
                <div className="flex-1">
                  <p className="text-xs text-green-400 font-bold mb-1">
                    Bullish 78%
                  </p>
                  <Progress value={78} className="h-2 bg-red-900/30" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-red-400 font-bold mb-1">
                    Bearish 22%
                  </p>
                  <Progress value={22} className="h-2 bg-green-900/30" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Based on 44,444 community votes
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "memes" && (
        <div className="space-y-3">
          <Button
            className="w-full h-9 text-xs bg-yellow-600 text-white border-0"
            onClick={() => toast.info("Opening meme creator...")}
          >
            <Flame className="h-3.5 w-3.5 mr-1.5" />
            Create Meme — Earn SKY4444
          </Button>
          {MEMES.map((meme, i) => (
            <Card key={meme.id} className="border-border/50 overflow-hidden">
              <img
                src={meme.img}
                alt={meme.title}
                className="w-full h-40 object-cover"
              />
              <CardContent className="py-3 px-4">
                <p className="font-bold text-sm mb-2">{meme.title}</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setLiked(l =>
                        l.includes(meme.id)
                          ? l.filter(x => x !== meme.id)
                          : [...l, meme.id]
                      );
                    }}
                    className={`flex items-center gap-1 text-xs ${liked.includes(meme.id) ? "text-rose-400" : "text-muted-foreground"}`}
                  >
                    <Heart
                      className={`h-4 w-4 ${liked.includes(meme.id) ? "fill-rose-400" : ""}`}
                    />
                    {meme.likes + (liked.includes(meme.id) ? 1 : 0)}
                  </button>
                  <button
                    className="flex items-center gap-1 text-xs text-muted-foreground"
                    onClick={() => toast.info("Opening comments...")}
                  >
                    <MessageCircle className="h-4 w-4" />
                    {meme.comments}
                  </button>
                  <button
                    className="flex items-center gap-1 text-xs text-muted-foreground"
                    onClick={() => toast.success("Meme link copied!")}
                  >
                    <Share2 className="h-4 w-4" />
                    {meme.shares}
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "news" && (
        <div className="space-y-2">
          {NEWS.map((item, i) => (
            <Card key={i} className="border-border/50">
              <CardContent className="py-3 px-4">
                <div className="flex items-start gap-3">
                  <Badge
                    className={`text-xs shrink-0 mt-0.5 ${item.sentiment === "bullish" ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-muted text-muted-foreground"}`}
                  >
                    {item.sentiment === "bullish" ? "🚀 Bullish" : "📊 Neutral"}
                  </Badge>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{item.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.source} · {item.time}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "trade" && (
        <div className="space-y-3">
          <Card className="border-yellow-500/20 bg-yellow-900/5">
            <CardContent className="py-4 px-4 space-y-3">
              <p className="font-bold text-sm">Quick Trade TRUMP</p>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  className="h-10 text-xs bg-green-600 text-white border-0 font-bold"
                  onClick={() => toast.success("Buy order placed for TRUMP!")}
                >
                  <TrendingUp className="h-4 w-4 mr-1.5" />
                  Buy TRUMP
                </Button>
                <Button
                  className="h-10 text-xs bg-red-600 text-white border-0 font-bold"
                  onClick={() => toast.success("Sell order placed for TRUMP!")}
                >
                  <TrendingDown className="h-4 w-4 mr-1.5" />
                  Sell TRUMP
                </Button>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {["$10", "$50", "$100", "$500"].map(amt => (
                  <button
                    key={amt}
                    className="py-2 rounded-xl bg-muted text-xs font-bold hover:bg-muted/80 transition-colors"
                    onClick={() => toast.info(`Buying ${amt} of TRUMP...`)}
                  >
                    {amt}
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Current price:{" "}
                <span className="text-yellow-400 font-bold">
                  ${price.toFixed(4)}
                </span>
              </p>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="py-3 px-4">
              <p className="font-bold text-sm mb-2">TRUMP/SKY4444 Pair</p>
              <p className="text-xs text-muted-foreground mb-2">
                Exclusive pair — trade TRUMP directly for SKY4444 with 0% fees
              </p>
              <Button
                className="w-full h-9 text-xs bg-gradient-to-r from-yellow-600 to-purple-600 text-white border-0"
                onClick={() => toast.info("Opening TRUMP/SKY4444 pair...")}
              >
                <Zap className="h-3.5 w-3.5 mr-1.5" />
                Trade TRUMP/SKY4444 — 0% Fee
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
