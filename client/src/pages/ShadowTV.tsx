import { useState } from "react";
import { motion } from "framer-motion";
import {
  Play,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Bookmark,
  Bell,
  Eye,
  Clock,
  ChevronRight,
  Search,
  Filter,
  Coins,
  Star,
  TrendingUp,
  Zap,
  Users,
  MoreVertical,
  Gift,
  Radio,
  Film,
  Music,
  Gamepad2,
  BarChart2,
  Globe,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const CATEGORIES = [
  { id: "all", label: "All", emoji: "🎬" },
  { id: "crypto", label: "Crypto", emoji: "₿" },
  { id: "trading", label: "Trading", emoji: "📈" },
  { id: "gaming", label: "Gaming", emoji: "🎮" },
  { id: "music", label: "Music", emoji: "🎵" },
  { id: "tech", label: "Tech", emoji: "💻" },
  { id: "nft", label: "NFT Art", emoji: "🎨" },
  { id: "live", label: "Live", emoji: "🔴" },
];

const VIDEOS = [
  {
    id: "v1",
    title: "SKY4444 ICO Deep Dive — Why This Could Be the Next 100x",
    channel: "CryptoKing",
    channelEmoji: "👑",
    views: "284K",
    likes: 12400,
    duration: "24:44",
    category: "crypto",
    thumbnail: "📈",
    thumbnailBg: "from-yellow-900/40 to-orange-900/40",
    timeAgo: "2 days ago",
    verified: true,
    live: false,
    nftContent: true,
    reward: "44 SKY4444",
  },
  {
    id: "v2",
    title: "🔴 LIVE — Bitcoin $100K Reaction + Trading Session",
    channel: "ShadowTrader",
    channelEmoji: "⚡",
    views: "18.4K",
    likes: 4284,
    duration: "LIVE",
    category: "live",
    thumbnail: "🔴",
    thumbnailBg: "from-red-900/40 to-pink-900/40",
    timeAgo: "Live now",
    verified: true,
    live: true,
    nftContent: false,
    reward: null,
  },
  {
    id: "v3",
    title: "I Built a DeFi Protocol in 24 Hours — Full Tutorial",
    channel: "Web3Dev",
    channelEmoji: "🤖",
    views: "128K",
    likes: 8400,
    duration: "1:44:28",
    category: "tech",
    thumbnail: "💻",
    thumbnailBg: "from-blue-900/40 to-purple-900/40",
    timeAgo: "1 week ago",
    verified: false,
    live: false,
    nftContent: false,
    reward: null,
  },
  {
    id: "v4",
    title: "NFT Art Speed Paint — Minting Live on ShadowChain",
    channel: "CryptoArtist",
    channelEmoji: "🎨",
    views: "44K",
    likes: 6284,
    duration: "18:44",
    category: "nft",
    thumbnail: "🎨",
    thumbnailBg: "from-pink-900/40 to-purple-900/40",
    timeAgo: "3 days ago",
    verified: true,
    live: false,
    nftContent: true,
    reward: "1 NFT",
  },
  {
    id: "v5",
    title: "Play-to-Earn Gaming — Earning $500/day with ShadowGames",
    channel: "GameFiPro",
    channelEmoji: "🎮",
    views: "892K",
    likes: 44000,
    duration: "32:18",
    category: "gaming",
    thumbnail: "🎮",
    thumbnailBg: "from-green-900/40 to-teal-900/40",
    timeAgo: "5 days ago",
    verified: true,
    live: false,
    nftContent: false,
    reward: null,
  },
  {
    id: "v6",
    title: "SkyBlue IT — How to Set Up a Zero-Trust Network",
    channel: "SkylerBlueIT",
    channelEmoji: "🛡️",
    views: "28K",
    likes: 2840,
    duration: "44:12",
    category: "tech",
    thumbnail: "🔒",
    thumbnailBg: "from-blue-900/40 to-cyan-900/40",
    timeAgo: "1 week ago",
    verified: true,
    live: false,
    nftContent: false,
    reward: null,
  },
];

const TRENDING_CREATORS = [
  { name: "CryptoKing", emoji: "👑", subscribers: "284K", category: "Crypto" },
  {
    name: "ShadowTrader",
    emoji: "⚡",
    subscribers: "128K",
    category: "Trading",
  },
  {
    name: "CryptoArtist",
    emoji: "🎨",
    subscribers: "84K",
    category: "NFT Art",
  },
  {
    name: "SkylerBlueIT",
    emoji: "🛡️",
    subscribers: "44K",
    category: "IT/Tech",
  },
];

export default function ShadowTV() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [likedVideos, setLikedVideos] = useState<string[]>([]);
  const [savedVideos, setSavedVideos] = useState<string[]>([]);

  const displayVideos = VIDEOS.filter(
    v =>
      (activeCategory === "all" ||
        v.category === activeCategory ||
        (activeCategory === "live" && v.live)) &&
      v.title.toLowerCase().includes(search.toLowerCase())
  );

  const toggleLike = (id: string) => {
    setLikedVideos(prev =>
      prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]
    );
  };

  const toggleSave = (id: string) => {
    setSavedVideos(prev =>
      prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]
    );
    toast.success(
      savedVideos.includes(id) ? "Removed from saved" : "Saved to Watch Later!"
    );
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Film className="h-6 w-6 text-red-400" />
            ShadowTV
          </h1>
          <p className="text-sm text-muted-foreground">
            Web3-native video platform with crypto rewards
          </p>
        </div>
        <Button
          size="sm"
          className="h-8 text-xs bg-red-600 text-white border-0"
          onClick={() => toast.success("Opening upload studio...")}
        >
          <Play className="h-3.5 w-3.5 mr-1.5" />
          Upload
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search ShadowTV..."
          className="pl-10 h-10"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors shrink-0 ${activeCategory === cat.id ? "bg-red-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            <span>{cat.emoji}</span>
            {cat.label}
            {cat.id === "live" && (
              <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse" />
            )}
          </button>
        ))}
      </div>

      {/* Featured/Playing Video */}
      {playingVideo && (
        <Card className="border-red-500/20">
          <CardContent className="pt-0 pb-0">
            <div className="aspect-video rounded-xl bg-gradient-to-br from-gray-900 to-black flex items-center justify-center relative overflow-hidden">
              <div className="text-8xl">
                {VIDEOS.find(v => v.id === playingVideo)?.thumbnail}
              </div>
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <button
                  className="h-16 w-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center"
                  onClick={() => setPlayingVideo(null)}
                >
                  <Play className="h-8 w-8 text-white fill-white" />
                </button>
              </div>
              {VIDEOS.find(v => v.id === playingVideo)?.live && (
                <Badge className="absolute top-3 left-3 bg-red-600 text-white border-0 animate-pulse">
                  🔴 LIVE
                </Badge>
              )}
            </div>
            <div className="py-3">
              <p className="font-black text-base">
                {VIDEOS.find(v => v.id === playingVideo)?.title}
              </p>
              <div className="flex items-center gap-3 mt-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 text-xs"
                  onClick={() => toggleLike(playingVideo)}
                >
                  <ThumbsUp
                    className={`h-3.5 w-3.5 mr-1.5 ${likedVideos.includes(playingVideo) ? "text-blue-400 fill-blue-400" : ""}`}
                  />
                  {VIDEOS.find(
                    v => v.id === playingVideo
                  )?.likes.toLocaleString()}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 text-xs"
                  onClick={() => toast.info("Share link copied!")}
                >
                  <Share2 className="h-3.5 w-3.5 mr-1.5" />
                  Share
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 text-xs"
                  onClick={() => toggleSave(playingVideo)}
                >
                  <Bookmark
                    className={`h-3.5 w-3.5 mr-1.5 ${savedVideos.includes(playingVideo) ? "text-yellow-400 fill-yellow-400" : ""}`}
                  />
                  Save
                </Button>
                <Button
                  size="sm"
                  className="h-7 text-xs bg-yellow-600 text-white border-0 ml-auto"
                  onClick={() => toast.success("Sent 10 SKY4444 tip! ⚡")}
                >
                  <Coins className="h-3.5 w-3.5 mr-1.5" />
                  Tip Creator
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Trending Creators */}
      <div>
        <h3 className="font-bold text-sm mb-2 flex items-center gap-2">
          <Star className="h-4 w-4 text-yellow-400" />
          Trending Creators
        </h3>
        <div className="flex gap-3 overflow-x-auto pb-1">
          {TRENDING_CREATORS.map(creator => (
            <button
              key={creator.name}
              className="flex flex-col items-center gap-1.5 shrink-0"
              onClick={() => toast.info(`Opening ${creator.name}'s channel...`)}
            >
              <div className="h-14 w-14 rounded-full bg-gradient-to-br from-red-600/30 to-purple-600/30 flex items-center justify-center text-2xl">
                {creator.emoji}
              </div>
              <p className="text-xs font-bold">{creator.name}</p>
              <p className="text-xs text-muted-foreground">
                {creator.subscribers}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Video Grid */}
      <div>
        <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-red-400" />
          {activeCategory === "live"
            ? "Live Now"
            : activeCategory === "all"
              ? "Recommended"
              : CATEGORIES.find(c => c.id === activeCategory)?.label}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayVideos.map((video, i) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Card
                className="border-border/50 hover:border-red-500/20 transition-all cursor-pointer"
                onClick={() => setPlayingVideo(video.id)}
              >
                <CardContent className="pt-0 pb-3">
                  {/* Thumbnail */}
                  <div
                    className={`aspect-video rounded-t-xl bg-gradient-to-br ${video.thumbnailBg} flex items-center justify-center relative overflow-hidden mb-3`}
                  >
                    <span className="text-6xl">{video.thumbnail}</span>
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                        <Play className="h-6 w-6 text-white fill-white" />
                      </div>
                    </div>
                    <Badge
                      className={`absolute bottom-2 right-2 text-xs ${video.live ? "bg-red-600 text-white border-0 animate-pulse" : "bg-black/70 text-white border-0"}`}
                    >
                      {video.live ? "🔴 LIVE" : video.duration}
                    </Badge>
                    {video.nftContent && (
                      <Badge className="absolute top-2 left-2 text-xs bg-purple-600/80 text-white border-0">
                        NFT
                      </Badge>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-red-600/30 to-purple-600/30 flex items-center justify-center text-lg shrink-0">
                      {video.channelEmoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm leading-tight line-clamp-2">
                        {video.title}
                      </p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <p className="text-xs text-muted-foreground">
                          {video.channel}
                        </p>
                        {video.verified && (
                          <span className="text-blue-400 text-xs">✓</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-0.5">
                          <Eye className="h-3 w-3" />
                          {video.views}
                        </span>
                        <span>·</span>
                        <span>{video.timeAgo}</span>
                        {video.reward && (
                          <Badge className="text-xs bg-yellow-500/10 text-yellow-400 border-yellow-500/20 ml-auto">
                            🎁 {video.reward}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <button
                      className="text-muted-foreground hover:text-white shrink-0"
                      onClick={e => {
                        e.stopPropagation();
                        toast.info("More options...");
                      }}
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Creator CTA */}
      <Card className="border-red-500/20 bg-red-500/3">
        <CardContent className="py-4 text-center">
          <p className="font-black text-sm mb-1">
            🎬 Become a ShadowTV Creator
          </p>
          <p className="text-xs text-muted-foreground mb-3">
            Earn SKY4444 tokens for every view, like, and tip. Mint your best
            content as NFTs.
          </p>
          <Button
            size="sm"
            className="bg-red-600 text-white border-0"
            onClick={() => toast.success("Opening Creator Studio...")}
          >
            Start Creating
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
