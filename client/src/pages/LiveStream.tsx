import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tv,
  Users,
  Heart,
  MessageSquare,
  Share2,
  Settings,
  Volume2,
  VolumeX,
  Maximize2,
  Gift,
  Star,
  Zap,
  Crown,
  ChevronRight,
  Eye,
  Clock,
  TrendingUp,
  Play,
  Radio,
  DollarSign,
  Award,
  Flame,
  Send,
  Smile,
  Plus,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

const LIVE_CHANNELS = [
  {
    id: 1,
    streamer: "CryptoKing_AR",
    title: "🚀 TRUMP coin to the moon! Live trading + giveaway",
    category: "Crypto Trading",
    viewers: 12847,
    thumbnail:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=320&h=180&fit=crop",
    avatar: "C",
    gradient: "from-orange-500 to-red-500",
    live: true,
    tags: ["TRUMP", "Trading", "Giveaway"],
  },
  {
    id: 2,
    streamer: "SkylerBlue_IT",
    title: "🔧 Live IT Support & Tech Talk — Ask Me Anything",
    category: "Technology",
    viewers: 3241,
    thumbnail:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=320&h=180&fit=crop",
    avatar: "S",
    gradient: "from-blue-500 to-cyan-500",
    live: true,
    tags: ["IT", "Tech", "Support"],
  },
  {
    id: 3,
    streamer: "NFT_Artist_Pro",
    title: "🎨 Creating NFT collection live — minting in 1 hour",
    category: "Art & NFT",
    viewers: 8932,
    thumbnail:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=320&h=180&fit=crop",
    avatar: "N",
    gradient: "from-purple-500 to-pink-500",
    live: true,
    tags: ["NFT", "Art", "Minting"],
  },
  {
    id: 4,
    streamer: "DeFi_Wizard",
    title: "📊 DeFi yield farming strategies — 200% APY explained",
    category: "DeFi",
    viewers: 6543,
    thumbnail:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=320&h=180&fit=crop",
    avatar: "D",
    gradient: "from-green-500 to-teal-500",
    live: true,
    tags: ["DeFi", "Yield", "Strategy"],
  },
  {
    id: 5,
    streamer: "GameFi_Master",
    title: "🎮 Play-to-earn gaming marathon — $500 prize pool",
    category: "Gaming",
    viewers: 21043,
    thumbnail:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=320&h=180&fit=crop",
    avatar: "G",
    gradient: "from-yellow-500 to-orange-500",
    live: true,
    tags: ["Gaming", "P2E", "Prize"],
  },
  {
    id: 6,
    streamer: "BlockchainDev",
    title: "💻 Building a DApp from scratch — Solidity tutorial",
    category: "Development",
    viewers: 4821,
    thumbnail:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=320&h=180&fit=crop",
    avatar: "B",
    gradient: "from-indigo-500 to-blue-500",
    live: true,
    tags: ["Dev", "Solidity", "Tutorial"],
  },
];

type LiveChannel = (typeof LIVE_CHANNELS)[number] & {
  providerLabel?: string;
  topic?: string;
};

const CHAT_MESSAGES_INIT = [
  {
    id: 1,
    user: "CryptoWhale",
    msg: "LFG! TRUMP to $1 🚀🚀🚀",
    badge: "👑",
    color: "text-yellow-400",
    time: "12:34:01",
  },
  {
    id: 2,
    user: "SkyFan2024",
    msg: "Amazing stream! First time here",
    badge: null,
    color: "text-blue-400",
    time: "12:34:05",
  },
  {
    id: 3,
    user: "TrumpArmy",
    msg: "Just bought 10k TRUMP 💪",
    badge: "⭐",
    color: "text-orange-400",
    time: "12:34:08",
  },
  {
    id: 4,
    user: "DeFiKing",
    msg: "What's the target price?",
    badge: null,
    color: "text-green-400",
    time: "12:34:12",
  },
  {
    id: 5,
    user: "ModeratorBot",
    msg: "Welcome to the stream! Follow the rules 📋",
    badge: "🛡️",
    color: "text-purple-400",
    time: "12:34:15",
  },
  {
    id: 6,
    user: "NFT_Collector",
    msg: "Gifted 5 subs! ❤️",
    badge: "💎",
    color: "text-cyan-400",
    time: "12:34:20",
  },
  {
    id: 7,
    user: "BlockchainBro",
    msg: "Chart looking bullish af",
    badge: null,
    color: "text-pink-400",
    time: "12:34:25",
  },
];

const EMOTES = [
  "🚀",
  "💎",
  "🔥",
  "❤️",
  "👑",
  "⭐",
  "💰",
  "🎯",
  "🌙",
  "💪",
  "🤝",
  "🎉",
];

const DONATION_AMOUNTS = [
  { amount: 1, label: "$1", tokens: 10 },
  { amount: 5, label: "$5", tokens: 55 },
  { amount: 10, label: "$10", tokens: 120 },
  { amount: 50, label: "$50", tokens: 650 },
  { amount: 100, label: "$100", tokens: 1400 },
];

const LIVE_ACTIVITY_PULSES = [
  {
    label: "Video rooms",
    value: "24/7",
    detail: "Backend streams plus labeled seed rooms keep discovery active",
    icon: Radio,
    color: "text-red-400",
  },
  {
    label: "Shop drops",
    value: "11",
    detail:
      "Profit-stream commerce hooks: fees, margin, ads, memberships, tips",
    icon: DollarSign,
    color: "text-green-400",
  },
  {
    label: "Quest energy",
    value: "+444",
    detail:
      "Space Quest missions reward watching, sharing, cart review, and creator tips",
    icon: Award,
    color: "text-cyan-400",
  },
];

const SHOPPING_DROPS = [
  {
    title: "Creator Livestream Starter Kit",
    tag: "Supplier-import ready",
    price: "$44 service fee + quote",
    cta: "Send cart to admin review",
  },
  {
    title: "Space Quest Gaming Desk Drop",
    tag: "Video shopping",
    price: "Admin-reviewed supplier cost",
    cta: "Bundle with quest reward",
  },
  {
    title: "Always-Live Creator Power Pack",
    tag: "DHgate / Alibaba adapter",
    price: "Live API when configured",
    cta: "Sync supplier catalog",
  },
];

const SPACE_QUEST_MISSIONS = [
  {
    title: "Watch Party Orbit",
    reward: "+44 SKY XP",
    status: "Always-on seed mission",
    detail: "Watch any live or backend stream and post a feed recap.",
  },
  {
    title: "Shop Scout Run",
    reward: "+144 SKY XP",
    status: "Admin-reviewed commerce",
    detail: "Add a supplier product and send the cart for quote review.",
  },
  {
    title: "Creator Boost Beam",
    reward: "+444 SKY XP",
    status: "Tip economy",
    detail:
      "Support a creator with gated beta tip rails; external money movement remains provider-approved.",
  },
];

export default function LiveStream() {
  const backendStreams = trpc.liveSocial.listStreams.useQuery(
    { status: "all", limit: 12 },
    { refetchInterval: 45000 }
  );
  const liveChannels = useMemo<LiveChannel[]>(() => {
    const mappedBackendStreams = (backendStreams.data ?? []).map(
      (stream, index) => ({
        id: 10000 + Number(stream.id ?? index),
        streamer: `Host #${stream.hostId ?? "live"}`,
        title: String(stream.title ?? "SKY4444 Live Room"),
        category: String(stream.channelType ?? "Livestream"),
        viewers: Math.max(1, Number(stream.viewerCount ?? 0)),
        thumbnail:
          stream.thumbnailUrl ||
          "https://images.unsplash.com/photo-1616587896595-7a1d4f1d4906?w=320&h=180&fit=crop",
        avatar: "S",
        gradient: "from-cyan-500 to-blue-500",
        live: stream.status === "live",
        tags: [String(stream.status ?? "live"), "Backend", "Creator"],
        providerLabel: "Live backend",
        topic: String(stream.topic ?? "Creator live room"),
      })
    );
    return mappedBackendStreams.length
      ? [...mappedBackendStreams, ...LIVE_CHANNELS]
      : LIVE_CHANNELS;
  }, [backendStreams.data]);
  const [activeChannel, setActiveChannel] = useState<LiveChannel>(
    LIVE_CHANNELS[0]
  );
  const [chatMessages, setChatMessages] = useState(CHAT_MESSAGES_INIT);
  const [chatInput, setChatInput] = useState("");
  const [muted, setMuted] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(48291);
  const [showEmotes, setShowEmotes] = useState(false);
  const [showDonate, setShowDonate] = useState(false);
  const [viewerCount, setViewerCount] = useState(activeChannel.viewers);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Transparent seeded chat pulse for demo/entertainment mode; real chat can replace this stream when the provider is connected.
  useEffect(() => {
    const BOTS = [
      {
        user: "QuestGuide",
        msgs: [
          "Space Quest watch mission is active",
          "Earn XP by sharing a recap",
          "Admin-reviewed shop run unlocked",
        ],
        badge: null,
        color: "text-blue-400",
      },
      {
        user: "ShopScout",
        msgs: [
          "Supplier drop is ready for quote review",
          "No payment until admin approval",
        ],
        badge: "🐋",
        color: "text-cyan-400",
      },
      {
        user: "TechGuru",
        msgs: [
          "Backend live rooms refresh every 45s",
          "Provider status is transparent",
          "Seed pulse is labeled demo activity",
        ],
        badge: null,
        color: "text-green-400",
      },
      {
        user: "SKY4444Holder",
        msgs: [
          "Creator tips stay gated",
          "Quest rewards are beta ledger entries",
        ],
        badge: "⭐",
        color: "text-yellow-400",
      },
    ];
    const t = setInterval(() => {
      const bot = BOTS[Math.floor(Math.random() * BOTS.length)];
      const msg = bot.msgs[Math.floor(Math.random() * bot.msgs.length)];
      const now = new Date();
      setChatMessages(prev => [
        ...prev.slice(-80),
        {
          id: Date.now(),
          user: bot.user,
          msg,
          badge: bot.badge,
          color: bot.color,
          time: `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`,
        },
      ]);
      setViewerCount(v => Math.max(1, v + Math.floor(Math.random() * 10 - 3)));
    }, 1800);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const sendChat = () => {
    if (!chatInput.trim()) return;
    const now = new Date();
    setChatMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        user: "You",
        msg: chatInput,
        badge: null,
        color: "text-white",
        time: `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`,
      },
    ]);
    setChatInput("");
  };

  const handleLike = () => {
    setLiked(l => !l);
    setLikeCount(c => (liked ? c - 1 : c + 1));
  };

  const handleDonate = (amount: number, tokens: number) => {
    toast.success(`Donated $${amount}!`, {
      description: `You earned ${tokens} SKY tokens! 🎉`,
    });
    setShowDonate(false);
  };

  return (
    <div className="space-y-4">
      {/* Channel Browser */}
      <div className="flex gap-3 overflow-x-auto pb-1">
        {liveChannels.map(ch => (
          <button
            key={ch.id}
            onClick={() => {
              setActiveChannel(ch);
              setViewerCount(ch.viewers);
            }}
            className={`shrink-0 relative rounded-xl overflow-hidden border-2 transition-all ${activeChannel.id === ch.id ? "border-red-500" : "border-border/50 hover:border-red-500/30"}`}
            style={{ width: 140 }}
          >
            <img
              src={ch.thumbnail}
              alt={ch.streamer}
              className="w-full h-20 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute top-1.5 left-1.5">
              <Badge className="bg-red-600 text-white border-0 text-xs px-1.5 py-0.5 flex items-center gap-1">
                <div className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />{" "}
                LIVE
              </Badge>
            </div>
            <div className="absolute bottom-1.5 left-1.5 right-1.5">
              <p className="text-white text-xs font-medium truncate">
                {ch.streamer}
              </p>
              <div className="flex items-center gap-1 text-white/70 text-xs">
                <Eye className="h-2.5 w-2.5" />
                {ch.viewers.toLocaleString()}
              </div>
              {ch.providerLabel && (
                <p className="text-[10px] text-cyan-200 truncate">
                  {ch.providerLabel}
                </p>
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {LIVE_ACTIVITY_PULSES.map(pulse => (
          <Card
            key={pulse.label}
            className="border-border/50 bg-gradient-to-br from-muted/40 to-background"
          >
            <CardContent className="pt-4">
              <div className="flex items-start gap-3">
                <pulse.icon className={`h-5 w-5 ${pulse.color}`} />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black">{pulse.value}</span>
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      {pulse.label}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {pulse.detail}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
        {/* Main Stream */}
        <div className="xl:col-span-3 space-y-3">
          {/* Video Player */}
          <div className="relative rounded-2xl overflow-hidden bg-black aspect-video">
            <img
              src={activeChannel.thumbnail}
              alt=""
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-16 w-16 rounded-full bg-red-600/80 flex items-center justify-center">
                <Play className="h-8 w-8 text-white ml-1" />
              </div>
            </div>
            {/* Overlay controls */}
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <Badge className="bg-red-600 text-white border-0 flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-white animate-pulse" />{" "}
                LIVE
              </Badge>
              <Badge className="bg-black/60 text-white border-0 flex items-center gap-1.5">
                <Eye className="h-3 w-3" /> {viewerCount.toLocaleString()}
              </Badge>
            </div>
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMuted(m => !m)}
                  className="h-8 w-8 bg-black/60 rounded-lg flex items-center justify-center hover:bg-black/80 transition-colors"
                >
                  {muted ? (
                    <VolumeX className="h-4 w-4 text-white" />
                  ) : (
                    <Volume2 className="h-4 w-4 text-white" />
                  )}
                </button>
              </div>
              <button className="h-8 w-8 bg-black/60 rounded-lg flex items-center justify-center hover:bg-black/80 transition-colors">
                <Maximize2 className="h-4 w-4 text-white" />
              </button>
            </div>
          </div>

          {/* Stream Info */}
          <Card className="border-border/50">
            <CardContent className="py-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div
                    className={`h-11 w-11 rounded-full bg-gradient-to-br ${activeChannel.gradient} flex items-center justify-center text-white font-bold shrink-0`}
                  >
                    {activeChannel.avatar}
                  </div>
                  <div>
                    <h2 className="font-bold text-base line-clamp-1">
                      {activeChannel.title}
                    </h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm font-medium text-blue-400">
                        {activeChannel.streamer}
                      </span>
                      <Badge className="bg-muted text-muted-foreground border-0 text-xs">
                        {activeChannel.category}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {activeChannel.tags.map(tag => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="text-xs px-2 py-0"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleLike}
                    className={liked ? "text-red-400 border-red-400/30" : ""}
                  >
                    <Heart
                      className={`h-4 w-4 mr-1.5 ${liked ? "fill-red-400" : ""}`}
                    />
                    {likeCount.toLocaleString()}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      toast.success("Stream link copied!");
                    }}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0"
                    onClick={() => setShowDonate(true)}
                  >
                    <Gift className="h-4 w-4 mr-1.5" /> Donate
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-500/20 bg-orange-500/5">
            <CardContent className="pt-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <h3 className="font-bold flex items-center gap-2">
                  <Flame className="h-4 w-4 text-orange-400" /> Video Shopping
                  Drops
                </h3>
                <Badge className="bg-orange-500/10 text-orange-300 border-orange-500/20">
                  Supplier-reviewed commerce
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {SHOPPING_DROPS.map(drop => (
                  <div
                    key={drop.title}
                    className="rounded-xl border border-border/60 bg-background/70 p-3"
                  >
                    <p className="text-sm font-semibold line-clamp-1">
                      {drop.title}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {drop.tag}
                    </p>
                    <p className="mt-2 text-xs font-bold text-green-400">
                      {drop.price}
                    </p>
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      {drop.cta}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                These drops connect the livestream surface to the real supplier
                API/admin-import marketplace. They are not auto-submitted to
                suppliers and remain admin-reviewed.
              </p>
            </CardContent>
          </Card>

          {/* Donate Modal */}
          <AnimatePresence>
            {showDonate && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                <Card className="border-purple-500/30 bg-purple-500/5">
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold flex items-center gap-2">
                        <Gift className="h-4 w-4 text-purple-400" /> Support{" "}
                        {activeChannel.streamer}
                      </h3>
                      <button onClick={() => setShowDonate(false)}>
                        <X className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </div>
                    <div className="grid grid-cols-5 gap-2 mb-3">
                      {DONATION_AMOUNTS.map(d => (
                        <button
                          key={d.amount}
                          onClick={() => handleDonate(d.amount, d.tokens)}
                          className="p-2 rounded-xl border border-border hover:border-purple-500 hover:bg-purple-500/10 transition-all text-center"
                        >
                          <p className="font-bold text-sm">{d.label}</p>
                          <p className="text-xs text-muted-foreground">
                            {d.tokens} SKY
                          </p>
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground text-center">
                      Earn SKY4444 tokens for every donation! Pay with any
                      crypto.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* More Streams */}
          <div>
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-red-400" /> Trending Streams
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {liveChannels
                .filter(c => c.id !== activeChannel.id)
                .slice(0, 3)
                .map(ch => (
                  <Card
                    key={ch.id}
                    className="border-border/50 hover:border-red-500/30 transition-all cursor-pointer overflow-hidden"
                    onClick={() => {
                      setActiveChannel(ch);
                      setViewerCount(ch.viewers);
                    }}
                  >
                    <div className="relative aspect-video">
                      <img
                        src={ch.thumbnail}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <Badge className="absolute top-1.5 left-1.5 bg-red-600 text-white border-0 text-xs px-1.5 py-0.5 flex items-center gap-1">
                        <div className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />{" "}
                        LIVE
                      </Badge>
                      <div className="absolute bottom-1.5 left-1.5 right-1.5">
                        <p className="text-white text-xs font-medium truncate">
                          {ch.streamer}
                        </p>
                        <div className="flex items-center gap-1 text-white/70 text-xs">
                          <Eye className="h-2.5 w-2.5" />
                          {ch.viewers.toLocaleString()} · {ch.category}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        </div>

        {/* Live Chat */}
        <div className="xl:col-span-1 space-y-3">
          <Card className="border-cyan-500/20 bg-cyan-500/5">
            <CardContent className="pt-4">
              <h3 className="font-bold flex items-center gap-2 mb-3">
                <Award className="h-4 w-4 text-cyan-400" /> Space Quest Missions
              </h3>
              <div className="space-y-2">
                {SPACE_QUEST_MISSIONS.map(mission => (
                  <div
                    key={mission.title}
                    className="rounded-xl border border-border/60 bg-background/70 p-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-semibold">{mission.title}</p>
                      <Badge className="bg-cyan-500/10 text-cyan-300 border-cyan-500/20 text-[10px]">
                        {mission.reward}
                      </Badge>
                    </div>
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      {mission.status}
                    </p>
                    <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                      {mission.detail}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card
            className="border-border/50 h-full flex flex-col"
            style={{ maxHeight: "80vh" }}
          >
            <div className="flex items-center justify-between p-3 border-b border-border">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-blue-400" />
                <span className="font-semibold text-sm">Live Chat</span>
                <Badge className="bg-green-500/10 text-green-400 border-green-500/20 text-xs">
                  {viewerCount.toLocaleString()}
                </Badge>
              </div>
              <button className="text-xs text-muted-foreground hover:text-foreground">
                <Settings className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-2 min-h-0">
              <AnimatePresence initial={false}>
                {chatMessages.map(msg => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs"
                  >
                    <span className="text-muted-foreground mr-1">
                      {msg.badge}
                    </span>
                    <span className={`font-semibold mr-1 ${msg.color}`}>
                      {msg.user}:
                    </span>
                    <span className="text-muted-foreground">{msg.msg}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={chatEndRef} />
            </div>
            <div className="p-3 border-t border-border space-y-2">
              <div className="relative">
                <Input
                  placeholder="Send a message..."
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && sendChat()}
                  className="pr-16 text-xs h-9"
                />
                <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <button
                    onClick={() => setShowEmotes(s => !s)}
                    className="h-7 w-7 flex items-center justify-center rounded hover:bg-muted transition-colors"
                  >
                    <Smile className="h-3.5 w-3.5 text-muted-foreground" />
                  </button>
                  <button
                    onClick={sendChat}
                    className="h-7 w-7 flex items-center justify-center rounded hover:bg-muted transition-colors"
                  >
                    <Send className="h-3.5 w-3.5 text-blue-400" />
                  </button>
                </div>
              </div>
              {showEmotes && (
                <div className="grid grid-cols-6 gap-1 p-2 bg-muted/30 rounded-lg">
                  {EMOTES.map(e => (
                    <button
                      key={e}
                      onClick={() => {
                        setChatInput(i => i + e);
                        setShowEmotes(false);
                      }}
                      className="h-8 w-8 flex items-center justify-center rounded hover:bg-muted transition-colors text-base"
                    >
                      {e}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
