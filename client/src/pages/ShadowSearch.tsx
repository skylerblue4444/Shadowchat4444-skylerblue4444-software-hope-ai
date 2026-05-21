import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  TrendingUp,
  Users,
  Hash,
  Package,
  FileText,
  Coins,
  Globe,
  Clock,
  X,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

type ResultType = "token" | "user" | "board" | "product" | "post" | "page";
type SearchResult = {
  id: number;
  type: ResultType;
  title: string;
  subtitle: string;
  meta: string;
  emoji: string;
  route: string;
};

const ALL_RESULTS: SearchResult[] = [
  {
    id: 1,
    type: "token",
    title: "SKY4444",
    subtitle: "ShadowChat Platform Token",
    meta: "$0.044 · +12.4%",
    emoji: "🌟",
    route: "/dashboard/ico",
  },
  {
    id: 2,
    type: "token",
    title: "TRUMP",
    subtitle: "Official TRUMP Meme Coin",
    meta: "$0.10 · +44.4%",
    emoji: "🇺🇸",
    route: "/dashboard/shadow-trump",
  },
  {
    id: 3,
    type: "token",
    title: "Bitcoin",
    subtitle: "BTC · Digital Gold",
    meta: "$104,444 · +2.1%",
    emoji: "₿",
    route: "/dashboard/trading",
  },
  {
    id: 4,
    type: "user",
    title: "SkylerBlue",
    subtitle: "Skyler Blue Spiller · IT Resolutions CEO",
    meta: "44,444 followers",
    emoji: "👤",
    route: "/dashboard/profile",
  },
  {
    id: 5,
    type: "user",
    title: "CryptoWhale.eth",
    subtitle: "Top Trader · Level 5 KYC",
    meta: "888,888 followers",
    emoji: "🐋",
    route: "/dashboard/profile",
  },
  {
    id: 6,
    type: "board",
    title: "#CryptoGeneral",
    subtitle: "Community Board · 44,444 members",
    meta: "Active now",
    emoji: "#️⃣",
    route: "/dashboard/community",
  },
  {
    id: 7,
    type: "board",
    title: "#ShadowChat",
    subtitle: "Official ShadowChat Board",
    meta: "88,888 members",
    emoji: "#️⃣",
    route: "/dashboard/community",
  },
  {
    id: 8,
    type: "product",
    title: "Managed IT Support Package",
    subtitle: "Skyler Blue IT Resolutions",
    meta: "$299/mo",
    emoji: "💼",
    route: "/it/products",
  },
  {
    id: 9,
    type: "product",
    title: "Cybersecurity Audit",
    subtitle: "Skyler Blue IT Resolutions",
    meta: "$1,499 one-time",
    emoji: "🔒",
    route: "/it/services",
  },
  {
    id: 10,
    type: "post",
    title: "SKY4444 ICO is LIVE — Join Now!",
    subtitle: "Posted by SkylerBlue · 2 hrs ago",
    meta: "444 likes · 88 comments",
    emoji: "📢",
    route: "/dashboard/social",
  },
  {
    id: 11,
    type: "page",
    title: "Staking Center",
    subtitle: "Earn up to 124.5% APY on your crypto",
    meta: "Platform Page",
    emoji: "⚡",
    route: "/dashboard/staking",
  },
  {
    id: 12,
    type: "page",
    title: "NFT Marketplace",
    subtitle: "Buy, sell, and trade NFTs",
    meta: "Platform Page",
    emoji: "🎨",
    route: "/dashboard/nft-marketplace",
  },
];

const TRENDING = [
  "SKY4444",
  "TRUMP",
  "Bitcoin halving",
  "ShadowChat ICO",
  "NFT drops",
  "Staking APY",
];
const RECENT = [
  "SKY4444 price",
  "Staking rewards",
  "KYC verification",
  "Managed IT",
];

const TYPE_COLORS: Record<ResultType, string> = {
  token: "bg-yellow-500/10 text-yellow-400",
  user: "bg-blue-500/10 text-blue-400",
  board: "bg-purple-500/10 text-purple-400",
  product: "bg-green-500/10 text-green-400",
  post: "bg-orange-500/10 text-orange-400",
  page: "bg-muted text-muted-foreground",
};

export default function ShadowSearch() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<ResultType | "all">("all");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const results = ALL_RESULTS.filter(r => {
    const matchesQuery =
      !query ||
      r.title.toLowerCase().includes(query.toLowerCase()) ||
      r.subtitle.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter === "all" || r.type === filter;
    return matchesQuery && matchesFilter;
  });

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black flex items-center gap-2">
          <Search className="h-6 w-6 text-violet-400" />
          ShadowSearch
        </h1>
        <p className="text-sm text-muted-foreground">
          Search everything — tokens, users, boards, products, and more
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          placeholder="Search tokens, users, boards, products..."
          className="h-12 pl-10 pr-10 text-sm rounded-2xl border-violet-500/20 focus:border-violet-500/40"
        />
        {query && (
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2"
            onClick={() => setQuery("")}
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
      </div>

      {/* Filter Pills */}
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {(
          ["all", "token", "user", "board", "product", "post", "page"] as const
        ).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${filter === f ? "bg-violet-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {f}
          </button>
        ))}
      </div>

      {!query ? (
        <div className="space-y-4">
          {/* Trending */}
          <div>
            <p className="text-xs font-bold text-muted-foreground mb-2 flex items-center gap-1.5">
              <TrendingUp className="h-3.5 w-3.5" />
              TRENDING NOW
            </p>
            <div className="flex flex-wrap gap-2">
              {TRENDING.map(t => (
                <button
                  key={t}
                  onClick={() => setQuery(t)}
                  className="px-3 py-1.5 rounded-full bg-violet-500/10 text-violet-400 text-xs font-medium hover:bg-violet-500/20 transition-colors"
                >
                  🔥 {t}
                </button>
              ))}
            </div>
          </div>
          {/* Recent */}
          <div>
            <p className="text-xs font-bold text-muted-foreground mb-2 flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              RECENT SEARCHES
            </p>
            <div className="space-y-1">
              {RECENT.map(r => (
                <button
                  key={r}
                  onClick={() => setQuery(r)}
                  className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-muted/50 transition-colors text-left"
                >
                  <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-sm">{r}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground ml-auto" />
                </button>
              ))}
            </div>
          </div>
          {/* Quick Links */}
          <div>
            <p className="text-xs font-bold text-muted-foreground mb-2">
              QUICK LINKS
            </p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "ICO Hub", emoji: "🚀", route: "/dashboard/ico" },
                { label: "Staking", emoji: "⚡", route: "/dashboard/staking" },
                {
                  label: "NFT Market",
                  emoji: "🎨",
                  route: "/dashboard/nft-marketplace",
                },
                { label: "IT Services", emoji: "💼", route: "/it/services" },
              ].map(link => (
                <Card
                  key={link.label}
                  className="border-border/50 cursor-pointer hover:border-violet-500/20 transition-all"
                  onClick={() => toast.info(`Navigating to ${link.label}...`)}
                >
                  <CardContent className="py-3 px-3 flex items-center gap-2">
                    <span className="text-lg">{link.emoji}</span>
                    <span className="text-sm font-bold">{link.label}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">
            {results.length} results for "{query}"
          </p>
          <AnimatePresence>
            {results.map((result, i) => (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <Card
                  className="border-border/50 hover:border-violet-500/20 cursor-pointer transition-all"
                  onClick={() => toast.info(`Opening ${result.title}...`)}
                >
                  <CardContent className="py-3 px-4 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-lg shrink-0">
                      {result.emoji}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="font-bold text-sm">{result.title}</p>
                        <Badge
                          className={`text-xs capitalize ${TYPE_COLORS[result.type]}`}
                        >
                          {result.type}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {result.subtitle}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs font-bold text-violet-400">
                        {result.meta}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
          {results.length === 0 && (
            <Card className="border-border/50">
              <CardContent className="py-8 text-center">
                <Search className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm font-bold">No results found</p>
                <p className="text-xs text-muted-foreground">
                  Try a different search term
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
