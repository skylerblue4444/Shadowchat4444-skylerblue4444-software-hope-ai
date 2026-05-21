import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Zap,
  TrendingUp,
  TrendingDown,
  Users,
  MessageCircle,
  ShoppingBag,
  BarChart2,
  Star,
  Bell,
  Globe,
  Shield,
  Play,
  BookOpen,
  Lock,
  Coins,
  ChevronRight,
  Flame,
  Award,
  Heart,
  Newspaper,
  Fingerprint,
  ArrowUpRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { useLocation } from "wouter";

const QUICK_STATS = [
  {
    label: "SKY4444 Price",
    value: "$0.1244",
    change: "+44.4%",
    up: true,
    emoji: "⚡",
  },
  {
    label: "Portfolio Value",
    value: "$600,734",
    change: "+12.8%",
    up: true,
    emoji: "💼",
  },
  {
    label: "Staking APY",
    value: "124.5%",
    change: "Active",
    up: true,
    emoji: "🌾",
  },
  {
    label: "SKY4444 Balance",
    value: "444,444",
    change: "Earned",
    up: true,
    emoji: "🏆",
  },
];

const QUICK_ACTIONS = [
  {
    label: "Trade",
    emoji: "📈",
    route: "/dashboard/exchange",
    color: "bg-green-600",
  },
  { label: "Send", emoji: "⚡", route: "/dashboard/pay", color: "bg-blue-600" },
  {
    label: "Stake",
    emoji: "🌾",
    route: "/dashboard/staking",
    color: "bg-yellow-600",
  },
  {
    label: "NFTs",
    emoji: "🎨",
    route: "/dashboard/nft-marketplace",
    color: "bg-purple-600",
  },
  {
    label: "Learn",
    emoji: "📚",
    route: "/dashboard/learn",
    color: "bg-indigo-600",
  },
  {
    label: "Market",
    emoji: "🛍️",
    route: "/dashboard/market",
    color: "bg-orange-600",
  },
  { label: "IT Help", emoji: "💻", route: "/it", color: "bg-cyan-600" },
  {
    label: "DAO Vote",
    emoji: "🏛️",
    route: "/dashboard/dao",
    color: "bg-pink-600",
  },
];

const TRENDING_NOW = [
  { label: "SKY4444 ICO — Phase 2 Live!", emoji: "🚀", type: "ico", hot: true },
  { label: "BTC breaks $104K — new ATH", emoji: "₿", type: "news", hot: true },
  {
    label: "ShadowTV: Skyler Blue Live Now",
    emoji: "📺",
    type: "live",
    hot: false,
  },
  {
    label: "NFT Drop: ShadowGenesis #001",
    emoji: "🎨",
    type: "nft",
    hot: true,
  },
  {
    label: "Charity Game: $44K raised today",
    emoji: "❤️",
    type: "charity",
    hot: false,
  },
];

const ACTIVITY_FEED = [
  {
    user: "CryptoKing",
    action: "staked 10,000 SKY4444",
    time: "2 min ago",
    emoji: "🌾",
  },
  {
    user: "ShadowWhale",
    action: "bought 2 BTC on ShadowExchange",
    time: "5 min ago",
    emoji: "₿",
  },
  {
    user: "NFTArtist",
    action: "minted ShadowGenesis #002",
    time: "12 min ago",
    emoji: "🎨",
  },
  {
    user: "DeFiDegen",
    action: "added $50K to ETH/SKY4444 pool",
    time: "18 min ago",
    emoji: "🌾",
  },
  {
    user: "Skyler Blue",
    action: "posted in IT Resolutions",
    time: "24 min ago",
    emoji: "💻",
  },
];

const PLATFORM_MODULES = [
  {
    name: "ShadowExchange",
    desc: "Pro crypto trading",
    emoji: "📈",
    route: "/dashboard/exchange",
    users: "284K",
  },
  {
    name: "ShadowPay",
    desc: "Send & receive crypto",
    emoji: "⚡",
    route: "/dashboard/pay",
    users: "128K",
  },
  {
    name: "ShadowTV",
    desc: "Live streaming",
    emoji: "📺",
    route: "/dashboard/tv",
    users: "44K",
  },
  {
    name: "ShadowMarket",
    desc: "Shop with crypto",
    emoji: "🛍️",
    route: "/dashboard/market",
    users: "84K",
  },
  {
    name: "ShadowLearn",
    desc: "Earn while learning",
    emoji: "📚",
    route: "/dashboard/learn",
    users: "28K",
  },
  {
    name: "ShadowVault",
    desc: "Cold storage security",
    emoji: "🔒",
    route: "/dashboard/vault",
    users: "12K",
  },
  {
    name: "ShadowID",
    desc: "Web3 identity",
    emoji: "🪪",
    route: "/dashboard/identity",
    users: "184K",
  },
  {
    name: "ShadowGov",
    desc: "Government portal",
    emoji: "🌐",
    route: "/dashboard/gov",
    users: "4",
  },
];

export default function ShadowHub() {
  const [, setLocation] = useLocation();
  const [livePrice, setLivePrice] = useState(0.1244);
  const [notifications, setNotifications] = useState(7);

  useEffect(() => {
    const interval = setInterval(() => {
      setLivePrice(prev =>
        Math.max(
          0.01,
          parseFloat((prev + (Math.random() - 0.47) * 0.001).toFixed(6))
        )
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Zap className="h-6 w-6 text-yellow-400" />
            ShadowHub
          </h1>
          <p className="text-sm text-muted-foreground">
            Your command center — everything in one place
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="relative h-9 w-9 rounded-xl bg-muted flex items-center justify-center"
            onClick={() => {
              setNotifications(0);
              toast.info("All notifications cleared");
            }}
          >
            <Bell className="h-4 w-4" />
            {notifications > 0 && (
              <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs bg-red-600 text-white border-0 rounded-full flex items-center justify-center">
                {notifications}
              </Badge>
            )}
          </button>
          <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20 font-bold">
            ⚡ ${livePrice.toFixed(4)}
          </Badge>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {QUICK_STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.06 }}
          >
            <Card className="border-border/50 hover:border-yellow-500/20 transition-all cursor-pointer">
              <CardContent className="pt-3 pb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xl">{stat.emoji}</span>
                  <Badge
                    className={`text-xs ${stat.up ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-red-500/10 text-red-400 border-red-500/20"}`}
                  >
                    {stat.up ? (
                      <TrendingUp className="h-3 w-3 mr-0.5" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-0.5" />
                    )}
                    {stat.change}
                  </Badge>
                </div>
                <p className="font-black text-base">
                  {stat.label === "SKY4444 Price"
                    ? `$${livePrice.toFixed(4)}`
                    : stat.value}
                </p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <p className="text-xs font-bold text-muted-foreground mb-2">
          QUICK ACTIONS
        </p>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
          {QUICK_ACTIONS.map((action, i) => (
            <motion.button
              key={action.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => setLocation(action.route)}
              className="flex flex-col items-center gap-1.5 p-2.5 rounded-2xl bg-muted/20 hover:bg-muted/40 transition-colors"
            >
              <div
                className={`h-10 w-10 rounded-xl ${action.color} flex items-center justify-center text-xl`}
              >
                {action.emoji}
              </div>
              <span className="text-xs font-medium">{action.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Trending + Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Trending */}
        <Card className="border-border/50">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-2 mb-3">
              <Flame className="h-4 w-4 text-orange-400" />
              <p className="font-black text-sm">Trending Now</p>
            </div>
            <div className="space-y-2">
              {TRENDING_NOW.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 cursor-pointer hover:bg-muted/20 p-1.5 rounded-lg transition-colors"
                  onClick={() => toast.info(item.label)}
                >
                  <span className="text-lg shrink-0">{item.emoji}</span>
                  <p className="text-xs font-medium flex-1">{item.label}</p>
                  {item.hot && (
                    <Badge className="text-xs bg-red-500/10 text-red-400 border-red-500/20 shrink-0">
                      🔥 Hot
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <Card className="border-border/50">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-2 mb-3">
              <Users className="h-4 w-4 text-blue-400" />
              <p className="font-black text-sm">Live Activity</p>
              <Badge className="text-xs bg-green-500/10 text-green-400 border-green-500/20 ml-auto">
                ● Live
              </Badge>
            </div>
            <div className="space-y-2">
              {ACTIVITY_FEED.map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-base shrink-0 mt-0.5">
                    {item.emoji}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs">
                      <span className="font-bold">{item.user}</span>{" "}
                      <span className="text-muted-foreground">
                        {item.action}
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Platform Modules */}
      <div>
        <p className="text-xs font-bold text-muted-foreground mb-2">
          PLATFORM MODULES
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {PLATFORM_MODULES.map((mod, i) => (
            <motion.div
              key={mod.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <Card
                className="border-border/50 hover:border-yellow-500/20 transition-all cursor-pointer"
                onClick={() => setLocation(mod.route)}
              >
                <CardContent className="pt-3 pb-3">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-2xl">{mod.emoji}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                  <p className="font-black text-sm">{mod.name}</p>
                  <p className="text-xs text-muted-foreground">{mod.desc}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    👥 {mod.users} users
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ICO Banner */}
      <Card className="border-yellow-500/20 bg-gradient-to-r from-yellow-900/20 to-orange-900/20">
        <CardContent className="py-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🚀</span>
            <div className="flex-1">
              <p className="font-black text-sm">
                SKY4444 ICO — Phase 2 Now Live!
              </p>
              <p className="text-xs text-muted-foreground">
                $0.1244 per token · 44M tokens remaining · Ends in 14 days
              </p>
              <Progress value={68} className="h-1.5 mt-2" />
              <p className="text-xs text-muted-foreground mt-1">
                68% sold — $28.4M raised of $44M goal
              </p>
            </div>
            <Button
              size="sm"
              className="bg-yellow-600 text-white border-0 shrink-0"
              onClick={() => setLocation("/dashboard/ico")}
            >
              Buy SKY4444
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
