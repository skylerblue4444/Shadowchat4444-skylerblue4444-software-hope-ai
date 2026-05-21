import { useState } from "react";
import { motion } from "framer-motion";
import {
  AppWindow,
  Play,
  Star,
  Zap,
  TrendingUp,
  Heart,
  Award,
  Users,
  Shield,
  Globe,
  ChevronRight,
  Plus,
  Search,
  Grid3X3,
  Sparkles,
  Lock,
  Crown,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const MINI_PROGRAMS = [
  {
    id: "mp-trading-001",
    name: "TRUMP Sniper Bot",
    icon: "🎯",
    description:
      "AI-powered trading bot that automatically buys TRUMP dips and sells peaks. Set your parameters and let it run.",
    category: "trading" as const,
    entryFeeTrump: 50,
    isActive: true,
    developer: "SkylerBlue_Official",
    users: 8432,
    rating: 4.8,
    badge: "Hot",
  },
  {
    id: "mp-charity-001",
    name: "Charity Slots",
    icon: "🎰",
    description:
      "Play slots where 70% of entry fees go directly to verified charities. Win NFTs and TRUMP rewards!",
    category: "charity" as const,
    entryFeeTrump: 10,
    isActive: true,
    developer: "CharityDAO",
    users: 21043,
    rating: 4.9,
    badge: "Top Rated",
  },
  {
    id: "mp-nft-001",
    name: "NFT Minter Pro",
    icon: "🎨",
    description:
      "Create, mint, and list NFTs in minutes. Supports impact stories, art, and utility tokens.",
    category: "nft" as const,
    entryFeeTrump: 25,
    isActive: true,
    developer: "NFT_Artist_Pro",
    users: 5821,
    rating: 4.6,
    badge: "New",
  },
  {
    id: "mp-game-001",
    name: "Crypto Trivia Live",
    icon: "🧠",
    description:
      "Live trivia game with TRUMP prizes. 10 questions, 30 seconds each. Top 3 win TRUMP tokens!",
    category: "game" as const,
    entryFeeTrump: 5,
    isActive: true,
    developer: "GameFi_Master",
    users: 34821,
    rating: 4.7,
    badge: "Popular",
  },
  {
    id: "mp-utility-001",
    name: "Portfolio Analyzer AI",
    icon: "📊",
    description:
      "AI-powered portfolio analysis with rebalancing suggestions, risk scoring, and yield optimization.",
    category: "utility" as const,
    entryFeeTrump: 100,
    isActive: true,
    developer: "DeFi_Wizard",
    users: 12043,
    rating: 4.5,
    badge: null,
  },
  {
    id: "mp-trading-002",
    name: "DeFi Yield Optimizer",
    icon: "🏦",
    description:
      "Automatically move your funds between DeFi protocols to maximize APY. Supports TRUMP, USDC, and SKY4444.",
    category: "trading" as const,
    entryFeeTrump: 200,
    isActive: true,
    developer: "DeFi_Wizard",
    users: 4321,
    rating: 4.4,
    badge: null,
  },
  {
    id: "mp-social-001",
    name: "Prediction Markets",
    icon: "🔮",
    description:
      "Bet TRUMP on real-world outcomes: crypto prices, sports, politics. Powered by decentralized oracles.",
    category: "social" as const,
    entryFeeTrump: 20,
    isActive: true,
    developer: "CryptoWhale_88",
    users: 9876,
    rating: 4.6,
    badge: "Beta",
  },
  {
    id: "mp-utility-002",
    name: "IT Helpdesk Bot",
    icon: "🔧",
    description:
      "AI-powered IT support bot. Get instant answers to tech questions, troubleshoot issues, and book consultations.",
    category: "utility" as const,
    entryFeeTrump: 0,
    isActive: true,
    developer: "SkylerBlue_Official",
    users: 3241,
    rating: 4.9,
    badge: "Free",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  trading: "bg-green-500/10 text-green-400 border-green-500/20",
  charity: "bg-red-500/10 text-red-400 border-red-500/20",
  nft: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  game: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  utility: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  social: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
};

export default function MiniPrograms() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [launching, setLaunching] = useState<string | null>(null);

  // Correct tRPC React hook pattern
  const { data: serverPrograms } = trpc.miniPrograms.list.useQuery();
  const launchMutation = trpc.miniPrograms.launch.useMutation({
    onSuccess: data => {
      toast.success(data.message || `${data.program.name} launched!`);
      setLaunching(null);
    },
    onError: () => {
      toast.error("Failed to launch. Please try again.");
      setLaunching(null);
    },
  });

  const handleLaunch = (program: (typeof MINI_PROGRAMS)[0]) => {
    setLaunching(program.id);
    toast.success(`🚀 Launching ${program.name}...`);
    setTimeout(() => {
      setLaunching(null);
      toast.success(`${program.name} is running! Session started.`);
    }, 1500);
  };

  const filtered = MINI_PROGRAMS.filter(p => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "all" || p.category === category;
    return matchSearch && matchCat;
  });

  const STATS = [
    {
      label: "Total Programs",
      value: "47",
      icon: AppWindow,
      color: "text-blue-400",
    },
    {
      label: "Active Users",
      value: "89.4K",
      icon: Users,
      color: "text-green-400",
    },
    {
      label: "TRUMP Distributed",
      value: "1.2M",
      icon: Zap,
      color: "text-yellow-400",
    },
    {
      label: "Charity Raised",
      value: "$89K",
      icon: Heart,
      color: "text-red-400",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black flex items-center gap-2">
          <AppWindow className="h-6 w-6 text-blue-400" />
          Mini Programs
        </h1>
        <p className="text-sm text-muted-foreground">
          WeChat-style mini apps — trading bots, games, charity, and utilities
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {STATS.map(({ label, value, icon: Icon, color }) => (
          <Card key={label} className="border-border/50">
            <CardContent className="pt-4 pb-3">
              <div className="flex items-center gap-2 mb-1">
                <Icon className={`h-4 w-4 ${color}`} />
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
              <p className="text-xl font-black">{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search programs..."
            className="pl-9 h-10"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {["all", "trading", "charity", "nft", "game", "utility", "social"].map(
          cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${category === cat ? "bg-blue-600 text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
            >
              {cat}
            </button>
          )
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((program, i) => (
          <motion.div
            key={program.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            whileHover={{ y: -3 }}
          >
            <Card className="border-border/50 hover:border-blue-500/30 transition-all h-full flex flex-col">
              <CardContent className="pt-4 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/20 flex items-center justify-center text-2xl">
                    {program.icon}
                  </div>
                  {program.badge && (
                    <Badge
                      className={`text-xs ${program.badge === "Hot" ? "bg-red-500/10 text-red-400 border-red-500/20" : program.badge === "Free" ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-blue-500/10 text-blue-400 border-blue-500/20"}`}
                    >
                      {program.badge}
                    </Badge>
                  )}
                </div>
                <h3 className="font-bold text-sm mb-1">{program.name}</h3>
                <p className="text-xs text-muted-foreground line-clamp-3 flex-1 mb-3">
                  {program.description}
                </p>
                <div className="flex items-center gap-2 mb-3">
                  <Badge
                    className={`text-xs capitalize ${CATEGORY_COLORS[program.category]}`}
                  >
                    {program.category}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    {program.rating}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {program.users.toLocaleString()} users
                  </span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Entry Fee</p>
                    <p className="font-bold text-sm">
                      {program.entryFeeTrump === 0 ? (
                        <span className="text-green-400">Free</span>
                      ) : (
                        <span className="text-yellow-400">
                          {program.entryFeeTrump} TRUMP
                        </span>
                      )}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    by {program.developer.slice(0, 12)}
                  </p>
                </div>
                <Button
                  size="sm"
                  className="w-full h-8 text-xs bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-0"
                  onClick={() => handleLaunch(program)}
                  disabled={launching === program.id}
                >
                  {launching === program.id ? (
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 animate-spin" />
                      Launching...
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      <Play className="h-3.5 w-3.5" />
                      Launch
                    </span>
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="border-blue-500/20 bg-gradient-to-r from-blue-950/20 to-cyan-950/20">
        <CardContent className="py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="font-bold">Build Your Own Mini Program</h3>
              <p className="text-sm text-muted-foreground">
                Earn TRUMP tokens every time users launch your program. SDK
                available for all developers.
              </p>
            </div>
            <Button
              className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-0"
              onClick={() => toast.info("Developer SDK coming soon!")}
            >
              <Plus className="h-4 w-4 mr-2" />
              Submit Program
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
