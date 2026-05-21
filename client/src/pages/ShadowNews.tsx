import { useState } from "react";
import { motion } from "framer-motion";
import {
  Newspaper,
  TrendingUp,
  TrendingDown,
  Zap,
  Search,
  Clock,
  Globe,
  Share2,
  Bookmark,
  ThumbsUp,
  Filter,
  Bell,
  ChevronRight,
  Star,
  Hash,
  BarChart2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const CATEGORIES = [
  "All",
  "Bitcoin",
  "Ethereum",
  "DeFi",
  "NFT",
  "Regulation",
  "SKY4444",
  "Altcoins",
  "Web3",
  "AI",
];

const NEWS = [
  {
    id: "n1",
    title: "SKY4444 Token Surges 444% Following ShadowChat Platform Launch",
    summary:
      "The native token of the ShadowChat ecosystem has exploded following the platform's official launch, with trading volume hitting $28.4M in 24 hours. Analysts cite the unique social-fi model and IT services integration as key drivers.",
    source: "CoinDesk",
    time: "5 min ago",
    category: "SKY4444",
    sentiment: "bullish",
    sentimentScore: 94,
    emoji: "⚡",
    featured: true,
    bookmarked: false,
  },
  {
    id: "n2",
    title: "Bitcoin Breaks $104,000 — Institutional Demand Hits All-Time High",
    summary:
      "Bitcoin has surpassed $104,000 for the first time, driven by record institutional inflows and ETF demand. BlackRock's Bitcoin ETF alone saw $2.84B in single-day inflows.",
    source: "Bloomberg Crypto",
    time: "28 min ago",
    category: "Bitcoin",
    sentiment: "bullish",
    sentimentScore: 88,
    emoji: "₿",
    featured: false,
    bookmarked: true,
  },
  {
    id: "n3",
    title: "SEC Approves First Spot Ethereum ETF with Staking — Market Reacts",
    summary:
      "The SEC has approved the first spot Ethereum ETF that includes staking rewards, a landmark decision that could unlock billions in institutional capital for the Ethereum ecosystem.",
    source: "Reuters",
    time: "1 hour ago",
    category: "Ethereum",
    sentiment: "bullish",
    sentimentScore: 82,
    emoji: "Ξ",
    featured: false,
    bookmarked: false,
  },
  {
    id: "n4",
    title:
      "China Launches Digital Yuan Integration with Major Crypto Platforms",
    summary:
      "The People's Bank of China has announced a pilot program allowing select crypto platforms to integrate the digital yuan (e-CNY) for cross-border settlements, signaling a shift in regulatory stance.",
    source: "South China Morning Post",
    time: "2 hours ago",
    category: "Regulation",
    sentiment: "neutral",
    sentimentScore: 55,
    emoji: "🇨🇳",
    featured: false,
    bookmarked: false,
  },
  {
    id: "n5",
    title: "DeFi Total Value Locked Hits $284 Billion — New All-Time High",
    summary:
      "Decentralized finance protocols have reached a new TVL record of $284 billion, with Uniswap, Aave, and ShadowChain's new DeFi suite leading the charge.",
    source: "The Block",
    time: "3 hours ago",
    category: "DeFi",
    sentiment: "bullish",
    sentimentScore: 91,
    emoji: "🌾",
    featured: false,
    bookmarked: false,
  },
  {
    id: "n6",
    title: "NFT Market Rebounds — Blue-Chip Collections Up 84% in Q2 2025",
    summary:
      "The NFT market is showing strong recovery signals with blue-chip collections like CryptoPunks and Bored Apes seeing significant price appreciation, fueled by metaverse integration and real-world utility.",
    source: "NFT Now",
    time: "5 hours ago",
    category: "NFT",
    sentiment: "bullish",
    sentimentScore: 76,
    emoji: "🎨",
    featured: false,
    bookmarked: false,
  },
  {
    id: "n7",
    title: "TRUMP Token Faces Regulatory Scrutiny — SEC Issues Warning",
    summary:
      "The SEC has issued a formal warning regarding the TRUMP memecoin, citing potential securities law violations. The token dropped 12% on the news before recovering.",
    source: "CoinTelegraph",
    time: "6 hours ago",
    category: "Regulation",
    sentiment: "bearish",
    sentimentScore: 28,
    emoji: "🇺🇸",
    featured: false,
    bookmarked: false,
  },
];

const MARKET_SENTIMENT = {
  overall: 72,
  label: "Greed",
  color: "text-green-400",
};

export default function ShadowNews() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [bookmarked, setBookmarked] = useState<string[]>(["n2"]);
  const [tab, setTab] = useState<"latest" | "trending" | "bookmarked">(
    "latest"
  );

  const toggleBookmark = (id: string) => {
    setBookmarked(prev =>
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    );
    toast.success(
      bookmarked.includes(id) ? "Removed from bookmarks" : "Bookmarked!"
    );
  };

  let displayNews = NEWS.filter(
    n =>
      (activeCategory === "All" || n.category === activeCategory) &&
      n.title.toLowerCase().includes(search.toLowerCase())
  );

  if (tab === "bookmarked")
    displayNews = displayNews.filter(n => bookmarked.includes(n.id));
  if (tab === "trending")
    displayNews = [...displayNews].sort(
      (a, b) => b.sentimentScore - a.sentimentScore
    );

  const featuredNews = displayNews.find(n => n.featured);
  const regularNews = displayNews.filter(n => !n.featured || tab !== "latest");

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Newspaper className="h-6 w-6 text-blue-400" />
            ShadowNews
          </h1>
          <p className="text-sm text-muted-foreground">
            AI-curated crypto news with sentiment analysis
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div
            className={`px-3 py-1.5 rounded-full border text-xs font-bold ${MARKET_SENTIMENT.color} bg-green-500/10 border-green-500/20`}
          >
            Fear & Greed: {MARKET_SENTIMENT.overall} — {MARKET_SENTIMENT.label}
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search crypto news..."
          className="pl-10 h-10"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {(["latest", "trending", "bookmarked"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-blue-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors shrink-0 ${activeCategory === cat ? "bg-blue-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Featured Article */}
      {featuredNews && tab === "latest" && (
        <Card className="border-blue-500/20 bg-gradient-to-br from-blue-900/10 to-purple-900/10">
          <CardContent className="pt-4 pb-4">
            <Badge className="mb-2 bg-blue-600 text-white border-0 text-xs">
              ⚡ FEATURED
            </Badge>
            <h2 className="font-black text-lg leading-tight mb-2">
              {featuredNews.title}
            </h2>
            <p className="text-sm text-muted-foreground mb-3">
              {featuredNews.summary}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge className="text-xs bg-green-500/10 text-green-400 border-green-500/20">
                  🐂 Bullish {featuredNews.sentimentScore}%
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {featuredNews.source} · {featuredNews.time}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleBookmark(featuredNews.id)}
                  className={`text-xs ${bookmarked.includes(featuredNews.id) ? "text-yellow-400" : "text-muted-foreground"}`}
                >
                  <Bookmark className="h-4 w-4" />
                </button>
                <button
                  onClick={() => toast.success("Link copied!")}
                  className="text-muted-foreground"
                >
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* News List */}
      <div className="space-y-3">
        {regularNews.map((article, i) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card
              className="border-border/50 hover:border-blue-500/20 transition-all cursor-pointer"
              onClick={() => toast.info(`Opening: ${article.title}`)}
            >
              <CardContent className="py-3 px-4">
                <div className="flex gap-3">
                  <div className="h-12 w-12 rounded-xl bg-muted/30 flex items-center justify-center text-2xl shrink-0">
                    {article.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-sm leading-tight line-clamp-2">
                        {article.title}
                      </h3>
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          toggleBookmark(article.id);
                        }}
                        className={`shrink-0 ${bookmarked.includes(article.id) ? "text-yellow-400" : "text-muted-foreground"}`}
                      >
                        <Bookmark className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                      {article.summary}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      <span className="text-xs text-muted-foreground">
                        {article.source}
                      </span>
                      <span className="text-xs text-muted-foreground">·</span>
                      <span className="text-xs text-muted-foreground flex items-center gap-0.5">
                        <Clock className="h-3 w-3" />
                        {article.time}
                      </span>
                      <Badge
                        className={`text-xs h-4 px-1.5 ${article.sentiment === "bullish" ? "bg-green-500/10 text-green-400 border-green-500/20" : article.sentiment === "bearish" ? "bg-red-500/10 text-red-400 border-red-500/20" : "bg-muted text-muted-foreground border-border/30"}`}
                      >
                        {article.sentiment === "bullish"
                          ? "🐂"
                          : article.sentiment === "bearish"
                            ? "🐻"
                            : "😐"}{" "}
                        {article.sentimentScore}%
                      </Badge>
                      <Badge variant="outline" className="text-xs h-4 px-1.5">
                        {article.category}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
        {displayNews.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Newspaper className="h-8 w-8 mx-auto mb-2 opacity-30" />
            <p className="text-sm">No articles found</p>
          </div>
        )}
      </div>

      {/* Newsletter CTA */}
      <Card className="border-blue-500/20">
        <CardContent className="py-4 text-center">
          <p className="font-black text-sm mb-1">
            📰 Get Daily Crypto Briefing
          </p>
          <p className="text-xs text-muted-foreground mb-3">
            AI-curated news digest delivered to your inbox. Earn 10 SKY4444 per
            day for reading.
          </p>
          <Button
            size="sm"
            className="bg-blue-600 text-white border-0"
            onClick={() =>
              toast.success("Subscribed to daily briefing! +10 SKY4444 ⚡")
            }
          >
            Subscribe Free
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
