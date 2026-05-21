/**
 * ShadowChat Social Feed
 * Live auto-posting feed: shop deals, crypto signals, block finds, referrals
 * Global appeal: USA 🇺🇸 China 🇨🇳 EU 🇪🇺 content
 */

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Heart,
  Share2,
  MessageCircle,
  ShoppingCart,
  TrendingUp,
  Zap,
  Globe2,
  Filter,
} from "lucide-react";
import {
  autoPostScheduler,
  type AutoPost,
} from "../lib/autoPost/autoPostEngine";

const TYPE_COLORS: Record<string, string> = {
  shop_item: "bg-green-500/20 text-green-400 border-green-500/30",
  deal: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  crypto_signal: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  block_found: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  referral: "bg-pink-500/20 text-pink-400 border-pink-500/30",
  trending: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  news: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
};

const TYPE_LABELS: Record<string, string> = {
  shop_item: "🛒 Shop Deal",
  deal: "⚡ Flash Deal",
  crypto_signal: "📊 Signal",
  block_found: "⛏️ Block Found",
  referral: "🎁 Referral",
  trending: "🔥 Trending",
  news: "📰 News",
};

const REGION_FLAGS: Record<string, string> = {
  USA: "🇺🇸",
  China: "🇨🇳",
  EU: "🇪🇺",
  Global: "🌍",
};

function timeAgo(ts: number): string {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

function PostCard({
  post,
  onLike,
  onShare,
}: {
  post: AutoPost;
  onLike: (id: string) => void;
  onShare: (id: string) => void;
}) {
  const [liked, setLiked] = useState(false);

  return (
    <Card className="border-border/50 hover:border-primary/30 transition-all duration-200 hover:shadow-lg hover:shadow-primary/5">
      <CardContent className="py-3 px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xl">{post.authorAvatar}</span>
            <div>
              <p className="font-bold text-xs text-foreground">{post.author}</p>
              <p className="text-xs text-muted-foreground">
                {timeAgo(post.timestamp)}
              </p>
            </div>
            {post.verified && <span className="text-blue-400 text-xs">✓</span>}
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs">{REGION_FLAGS[post.region]}</span>
            <Badge
              variant="outline"
              className={`text-xs px-1.5 py-0 ${TYPE_COLORS[post.type] ?? ""}`}
            >
              {TYPE_LABELS[post.type] ?? post.type}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <p className="text-sm font-bold mb-1">{post.title}</p>
        <p className="text-xs text-muted-foreground leading-relaxed mb-2">
          {post.body}
        </p>

        {/* Price badge for shop items */}
        {post.price && (
          <div className="flex items-center gap-2 mb-2">
            <span className="text-green-400 font-black text-sm">
              ${post.price}
            </span>
            {post.discount && (
              <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs px-1.5 py-0">
                -{post.discount}% OFF
              </Badge>
            )}
            <Badge className="bg-indigo-500/20 text-indigo-400 border-indigo-500/30 text-xs px-1.5 py-0">
              Pay SKY4444 ✦
            </Badge>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-2">
          {post.tags.slice(0, 4).map(tag => (
            <span
              key={tag}
              className="text-xs text-muted-foreground bg-muted/50 rounded px-1.5 py-0.5"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-1 border-t border-border/30">
          <button
            onClick={() => {
              setLiked(v => !v);
              onLike(post.id);
            }}
            className={`flex items-center gap-1 text-xs transition-colors ${liked ? "text-red-400" : "text-muted-foreground hover:text-red-400"}`}
          >
            <Heart className={`h-3.5 w-3.5 ${liked ? "fill-red-400" : ""}`} />
            {post.likes + (liked ? 1 : 0)}
          </button>
          <button
            onClick={() => {
              onShare(post.id);
              toast.success("Shared! +1 SKY4444 earned ✦");
            }}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-blue-400 transition-colors"
          >
            <Share2 className="h-3.5 w-3.5" />
            {post.shares}
          </button>
          <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-green-400 transition-colors">
            <MessageCircle className="h-3.5 w-3.5" />
            {post.comments}
          </button>
          {post.shopUrl && (
            <a href={post.shopUrl} className="ml-auto">
              <Button
                size="sm"
                className="h-6 text-xs bg-green-600 hover:bg-green-500 text-white border-0 px-2"
              >
                <ShoppingCart className="h-3 w-3 mr-1" /> Buy
              </Button>
            </a>
          )}
          {post.type === "crypto_signal" && (
            <a
              href="/dashboard/shadow/day-trade-scream-room"
              className="ml-auto"
            >
              <Button
                size="sm"
                className="h-6 text-xs bg-blue-600 hover:bg-blue-500 text-white border-0 px-2"
              >
                <TrendingUp className="h-3 w-3 mr-1" /> Trade
              </Button>
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

const FILTERS = ["All", "Shop", "Crypto", "Mining", "USA", "China", "EU"];

export default function ShadowSocialFeed() {
  const [posts, setPosts] = useState<AutoPost[]>([]);
  const [filter, setFilter] = useState("All");
  const [liveCount, setLiveCount] = useState(0);

  useEffect(() => {
    autoPostScheduler.start();
    const unsub = autoPostScheduler.subscribe(p => {
      setPosts(p);
      setLiveCount(v => v + 1);
    });
    return () => {
      unsub();
      autoPostScheduler.stop();
    };
  }, []);

  const filtered = posts.filter(p => {
    if (filter === "All") return true;
    if (filter === "Shop") return p.type === "shop_item" || p.type === "deal";
    if (filter === "Crypto") return p.type === "crypto_signal";
    if (filter === "Mining") return p.type === "block_found";
    if (filter === "USA") return p.region === "USA";
    if (filter === "China") return p.region === "China";
    if (filter === "EU") return p.region === "EU";
    return true;
  });

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Globe2 className="h-6 w-6 text-primary" />
            Live Feed
          </h1>
          <p className="text-xs text-muted-foreground">
            Auto-posts every 45s · Shop deals · Crypto signals · Mining wins
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs text-green-400 font-bold">LIVE</span>
          <span className="text-xs text-muted-foreground">
            {posts.length} posts
          </span>
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: "Posts Today", value: posts.length, icon: "📝" },
          {
            label: "Shop Deals",
            value: posts.filter(p => p.type === "shop_item").length,
            icon: "🛒",
          },
          {
            label: "Signals",
            value: posts.filter(p => p.type === "crypto_signal").length,
            icon: "📊",
          },
          {
            label: "Blocks Found",
            value: posts.filter(p => p.type === "block_found").length,
            icon: "⛏️",
          },
        ].map(stat => (
          <Card key={stat.label} className="border-border/50">
            <CardContent className="py-2 px-2 text-center">
              <p className="text-lg">{stat.icon}</p>
              <p className="font-black text-sm">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        <Filter className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`shrink-0 text-xs px-3 py-1 rounded-full border transition-all ${
              filter === f
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border/50 text-muted-foreground hover:border-primary/50"
            }`}
          >
            {f === "USA"
              ? "🇺🇸 USA"
              : f === "China"
                ? "🇨🇳 China"
                : f === "EU"
                  ? "🇪🇺 EU"
                  : f}
          </button>
        ))}
      </div>

      {/* Auto-post notice */}
      <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-lg px-3 py-2">
        <Zap className="h-3.5 w-3.5 text-yellow-400 shrink-0" />
        <p className="text-xs text-muted-foreground">
          <span className="font-bold text-foreground">
            Auto-Post Engine Active
          </span>{" "}
          — Shop items, crypto signals, and mining wins post automatically every
          45 seconds. Share a post to earn{" "}
          <span className="text-indigo-400 font-bold">+1 SKY4444 ✦</span>
        </p>
      </div>

      {/* Feed */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-2xl mb-2">📭</p>
            <p className="text-sm">No posts match this filter yet</p>
          </div>
        ) : (
          filtered.map(post => (
            <PostCard
              key={post.id}
              post={post}
              onLike={id => autoPostScheduler.likePost(id)}
              onShare={id => autoPostScheduler.sharePost(id)}
            />
          ))
        )}
      </div>

      <div className="text-center py-4">
        <p className="text-xs text-muted-foreground">
          ShadowChat Auto-Feed · Skyler Blue IT Resolutions · 479-406-7123
        </p>
        <p className="text-xs text-muted-foreground">
          🇺🇸 USA · 🇨🇳 China · 🇪🇺 EU · 🌍 Global
        </p>
      </div>
    </div>
  );
}
