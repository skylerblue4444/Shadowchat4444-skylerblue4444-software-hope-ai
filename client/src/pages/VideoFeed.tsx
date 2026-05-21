import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Volume2,
  VolumeX,
  Play,
  Pause,
  ChevronUp,
  ChevronDown,
  Plus,
  Search,
  TrendingUp,
  Star,
  Zap,
  Gift,
  Coins,
  MoreHorizontal,
  Flag,
  UserPlus,
  Download,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const VIDEOS = [
  {
    id: "v1",
    user: "CryptoKing_99",
    avatar: "C",
    title: "TRUMP token just 10x'd — here's why 🚀",
    views: "2.4M",
    likes: 184200,
    comments: 8420,
    shares: 12300,
    duration: "0:47",
    tags: ["crypto", "trump", "defi"],
    verified: true,
    coins: 420,
    thumbnail:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=700&fit=crop",
  },
  {
    id: "v2",
    user: "SkylerBlue_IT",
    avatar: "S",
    title: "Managed IT services explained in 60 seconds ⚡",
    views: "890K",
    likes: 42100,
    comments: 2100,
    shares: 5400,
    duration: "1:02",
    tags: ["tech", "it", "business"],
    verified: true,
    coins: 210,
    thumbnail:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=700&fit=crop",
  },
  {
    id: "v3",
    user: "NFT_Artist_Pro",
    avatar: "N",
    title: "I made $50K flipping NFTs this week 🎨",
    views: "1.2M",
    likes: 98400,
    comments: 5200,
    shares: 8900,
    duration: "2:14",
    tags: ["nft", "art", "web3"],
    verified: false,
    coins: 840,
    thumbnail:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=700&fit=crop",
  },
  {
    id: "v4",
    user: "DeFi_Degen_42",
    avatar: "D",
    title: "SKY4444 ICO is the next 100x gem 💎",
    views: "3.1M",
    likes: 241000,
    comments: 14200,
    shares: 28000,
    duration: "3:22",
    tags: ["ico", "sky4444", "altcoin"],
    verified: true,
    coins: 1200,
    thumbnail:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=700&fit=crop",
  },
  {
    id: "v5",
    user: "TechReview_Hub",
    avatar: "T",
    title: "Best cybersecurity tools for small business 🛡️",
    views: "445K",
    likes: 28900,
    comments: 1840,
    shares: 3200,
    duration: "4:18",
    tags: ["cybersecurity", "tech", "business"],
    verified: false,
    coins: 180,
    thumbnail:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=700&fit=crop",
  },
];

const CATEGORIES = [
  "For You",
  "Trending",
  "Crypto",
  "Tech",
  "NFT",
  "Gaming",
  "IT Services",
  "Music",
  "Sports",
];

export default function VideoFeed() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [category, setCategory] = useState("For You");
  const [showComments, setShowComments] = useState(false);

  const current = VIDEOS[currentIdx];

  const handleLike = (id: string) => {
    setLiked(prev => ({ ...prev, [id]: !prev[id] }));
    if (!liked[id]) toast.success("❤️ Liked! +2 SKY4444 earned");
  };

  const handleSave = (id: string) => {
    setSaved(prev => ({ ...prev, [id]: !prev[id] }));
    toast.success(saved[id] ? "Removed from saved" : "📌 Saved to collection");
  };

  return (
    <div className="flex flex-col h-full -mt-4 -mx-4 md:-mx-6">
      {/* Category Tabs */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto scrollbar-hide border-b border-border/30 bg-background/80 backdrop-blur-sm sticky top-0 z-20">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${category === cat ? "bg-red-600 text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Video Area */}
        <div
          className="flex-1 relative bg-black overflow-hidden"
          style={{ maxHeight: "calc(100vh - 120px)" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="relative w-full h-full"
            >
              {/* Video Thumbnail */}
              <img
                src={current.thumbnail}
                alt={current.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

              {/* Top Bar */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-white" />
                </div>
                <div className="flex gap-2">
                  {["Live", "Following", "For You"].map(tab => (
                    <button
                      key={tab}
                      className={`text-sm font-medium px-3 py-1 rounded-full ${tab === "For You" ? "text-white border-b-2 border-white" : "text-white/60"}`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <button onClick={() => setMuted(!muted)} className="text-white">
                  {muted ? (
                    <VolumeX className="h-5 w-5" />
                  ) : (
                    <Volume2 className="h-5 w-5" />
                  )}
                </button>
              </div>

              {/* Bottom Info */}
              <div className="absolute bottom-4 left-4 right-16">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white text-sm font-bold">
                    {current.avatar}
                  </div>
                  <span className="text-white font-bold text-sm">
                    @{current.user}
                  </span>
                  {current.verified && (
                    <Badge className="text-xs bg-blue-500 text-white border-0">
                      ✓
                    </Badge>
                  )}
                  <button
                    className="ml-1 px-3 py-0.5 rounded-full border border-white text-white text-xs font-medium hover:bg-white hover:text-black transition-colors"
                    onClick={() => toast.success("Following!")}
                  >
                    Follow
                  </button>
                </div>
                <p className="text-white text-sm font-medium mb-2 line-clamp-2">
                  {current.title}
                </p>
                <div className="flex flex-wrap gap-1">
                  {current.tags.map(tag => (
                    <span key={tag} className="text-xs text-blue-300">
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-white/60 text-xs">
                    {current.views} views
                  </span>
                  <span className="text-yellow-400 text-xs flex items-center gap-1">
                    <Coins className="h-3 w-3" />
                    {current.coins} SKY4444 earned
                  </span>
                </div>
              </div>

              {/* Play/Pause overlay */}
              <button
                className="absolute inset-0 flex items-center justify-center"
                onClick={() => setPlaying(!playing)}
              >
                <AnimatePresence>
                  {!playing && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="h-16 w-16 rounded-full bg-black/50 flex items-center justify-center"
                    >
                      <Play className="h-8 w-8 text-white ml-1" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 -mt-8 h-10 w-10 rounded-full bg-black/40 flex items-center justify-center text-white hover:bg-black/60 transition-colors"
            onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
          >
            <ChevronUp className="h-5 w-5" />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 mt-8 h-10 w-10 rounded-full bg-black/40 flex items-center justify-center text-white hover:bg-black/60 transition-colors"
            onClick={() =>
              setCurrentIdx(prev => Math.min(VIDEOS.length - 1, prev + 1))
            }
          >
            <ChevronDown className="h-5 w-5" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col items-center justify-end gap-5 px-3 pb-8 bg-black">
          {[
            {
              icon: Heart,
              label: liked[current.id]
                ? String(current.likes + 1)
                : String(current.likes),
              action: () => handleLike(current.id),
              active: liked[current.id],
              activeColor: "text-red-500",
            },
            {
              icon: MessageCircle,
              label: String(current.comments),
              action: () => setShowComments(!showComments),
              active: false,
              activeColor: "text-blue-400",
            },
            {
              icon: Share2,
              label: String(current.shares),
              action: () => toast.success("Share link copied!"),
              active: false,
              activeColor: "text-green-400",
            },
            {
              icon: Bookmark,
              label: "Save",
              action: () => handleSave(current.id),
              active: saved[current.id],
              activeColor: "text-yellow-400",
            },
            {
              icon: Gift,
              label: "Gift",
              action: () => toast.success("Sending SKY4444 gift!"),
              active: false,
              activeColor: "text-pink-400",
            },
          ].map(({ icon: Icon, label, action, active, activeColor }) => (
            <button
              key={label}
              onClick={action}
              className="flex flex-col items-center gap-1"
            >
              <div
                className={`h-11 w-11 rounded-full bg-white/10 flex items-center justify-center transition-colors ${active ? activeColor : "text-white"}`}
              >
                <Icon
                  className={`h-5 w-5 ${active ? activeColor : ""}`}
                  fill={active ? "currentColor" : "none"}
                />
              </div>
              <span className="text-white text-xs">
                {parseInt(label) > 999
                  ? `${(parseInt(label) / 1000).toFixed(1)}K`
                  : label}
              </span>
            </button>
          ))}

          {/* Creator Avatar */}
          <div className="relative mt-2">
            <div className="h-11 w-11 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white font-bold border-2 border-white">
              {current.avatar}
            </div>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-5 w-5 rounded-full bg-red-600 flex items-center justify-center border-2 border-black">
              <Plus className="h-3 w-3 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Video List Sidebar */}
      <div className="hidden lg:block w-80 border-l border-border/30 overflow-y-auto p-3 space-y-2">
        <h3 className="font-bold text-sm mb-3">Up Next</h3>
        {VIDEOS.map((v, i) => (
          <button
            key={v.id}
            onClick={() => setCurrentIdx(i)}
            className={`w-full flex gap-3 p-2 rounded-xl hover:bg-muted/30 transition-colors text-left ${i === currentIdx ? "bg-muted/40 border border-border/40" : ""}`}
          >
            <div className="h-16 w-10 rounded-lg overflow-hidden shrink-0 relative">
              <img
                src={v.thumbnail}
                alt={v.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0.5 right-0.5 text-xs text-white bg-black/70 px-0.5 rounded">
                {v.duration}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium line-clamp-2">{v.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">@{v.user}</p>
              <p className="text-xs text-muted-foreground">{v.views} views</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
