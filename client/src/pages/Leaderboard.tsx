import { useState } from "react";
import { motion } from "framer-motion";
import {
  Trophy,
  Crown,
  Star,
  Zap,
  TrendingUp,
  Award,
  Medal,
  Flame,
  Users,
  ArrowUp,
  ArrowDown,
  Minus,
  ChevronRight,
  Bitcoin,
  Shield,
  Heart,
  BarChart2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const MOCK_LEADERS = [
  {
    rank: 1,
    username: "CryptoWhale_88",
    avatar: "C",
    gradient: "from-yellow-500 to-orange-500",
    xp: 98432,
    trading: 45231,
    staking: 32100,
    referrals: 8901,
    change: "up",
    badge: "👑",
    title: "Diamond Whale",
  },
  {
    rank: 2,
    username: "SkylerBlue_Official",
    avatar: "S",
    gradient: "from-blue-500 to-cyan-500",
    xp: 87654,
    trading: 38921,
    staking: 28432,
    referrals: 12043,
    change: "up",
    badge: "⭐",
    title: "Platform Founder",
  },
  {
    rank: 3,
    username: "DeFi_Wizard",
    avatar: "D",
    gradient: "from-green-500 to-teal-500",
    xp: 76543,
    trading: 52103,
    staking: 18432,
    referrals: 4321,
    change: "same",
    badge: "🏦",
    title: "DeFi Master",
  },
  {
    rank: 4,
    username: "NFT_Artist_Pro",
    avatar: "N",
    gradient: "from-purple-500 to-pink-500",
    xp: 65432,
    trading: 12043,
    staking: 8921,
    referrals: 21043,
    change: "up",
    badge: "🎨",
    title: "NFT Creator",
  },
  {
    rank: 5,
    username: "TrumpArmy_Leader",
    avatar: "T",
    gradient: "from-red-500 to-orange-500",
    xp: 54321,
    trading: 43210,
    staking: 9876,
    referrals: 3210,
    change: "down",
    badge: "🇺🇸",
    title: "TRUMP Holder",
  },
  {
    rank: 6,
    username: "GameFi_Master",
    avatar: "G",
    gradient: "from-yellow-500 to-green-500",
    xp: 43210,
    trading: 8765,
    staking: 21043,
    referrals: 5432,
    change: "up",
    badge: "🎮",
    title: "GameFi Pro",
  },
  {
    rank: 7,
    username: "BlockchainDev",
    avatar: "B",
    gradient: "from-indigo-500 to-blue-500",
    xp: 38765,
    trading: 9876,
    staking: 18432,
    referrals: 2345,
    change: "down",
    badge: "💻",
    title: "Dev Legend",
  },
  {
    rank: 8,
    username: "IT_Pro_Arkansas",
    avatar: "I",
    gradient: "from-gray-500 to-slate-500",
    xp: 32109,
    trading: 4321,
    staking: 12043,
    referrals: 8765,
    change: "up",
    badge: "🔧",
    title: "IT Expert",
  },
  {
    rank: 9,
    username: "PrivacyFirst_XMR",
    avatar: "P",
    gradient: "from-gray-600 to-gray-500",
    xp: 28765,
    trading: 18432,
    staking: 6543,
    referrals: 1234,
    change: "same",
    badge: "🛡️",
    title: "Privacy Advocate",
  },
  {
    rank: 10,
    username: "CharityChampion",
    avatar: "C",
    gradient: "from-pink-500 to-rose-500",
    xp: 24321,
    trading: 2109,
    staking: 9876,
    referrals: 10987,
    change: "up",
    badge: "❤️",
    title: "Charity Hero",
  },
];

const CATEGORIES = [
  { id: "xp", label: "XP Score", icon: Star, color: "text-yellow-400" },
  {
    id: "trading",
    label: "Trading",
    icon: TrendingUp,
    color: "text-green-400",
  },
  { id: "staking", label: "Staking", icon: Zap, color: "text-blue-400" },
  {
    id: "referrals",
    label: "Referrals",
    icon: Users,
    color: "text-purple-400",
  },
];

export default function Leaderboard() {
  const [category, setCategory] = useState<
    "xp" | "trading" | "staking" | "referrals"
  >("xp");

  // Correct tRPC hook pattern
  const { data: serverLeaders } = trpc.leaderboard.get.useQuery({
    category,
    limit: 20,
  });

  const sorted = [...MOCK_LEADERS]
    .sort((a, b) => {
      const key = category as keyof typeof a;
      return (b[key] as number) - (a[key] as number);
    })
    .map((l, i) => ({ ...l, rank: i + 1 }));

  const top3 = sorted.slice(0, 3);
  const rest = sorted.slice(3);

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="h-5 w-5 text-yellow-400" />;
    if (rank === 2) return <Medal className="h-5 w-5 text-gray-300" />;
    if (rank === 3) return <Award className="h-5 w-5 text-orange-400" />;
    return (
      <span className="text-sm font-bold text-muted-foreground">#{rank}</span>
    );
  };

  const getChangeIcon = (change: string) => {
    if (change === "up") return <ArrowUp className="h-3 w-3 text-green-400" />;
    if (change === "down")
      return <ArrowDown className="h-3 w-3 text-red-400" />;
    return <Minus className="h-3 w-3 text-muted-foreground" />;
  };

  const formatScore = (score: number) => {
    if (score >= 1000000) return `${(score / 1000000).toFixed(1)}M`;
    if (score >= 1000) return `${(score / 1000).toFixed(1)}K`;
    return score.toString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black flex items-center gap-2">
          <Trophy className="h-6 w-6 text-yellow-400" />
          Global Leaderboard
        </h1>
        <p className="text-sm text-muted-foreground">
          Top performers across trading, staking, and community
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${category === cat.id ? "bg-yellow-500 text-black" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
          >
            <cat.icon
              className={`h-4 w-4 ${category === cat.id ? "text-black" : cat.color}`}
            />
            {cat.label}
          </button>
        ))}
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-3 gap-3">
        {[top3[1], top3[0], top3[2]].map((leader, i) => {
          if (!leader) return null;
          const podiumPos = i === 0 ? 2 : i === 1 ? 1 : 3;
          const heights = ["h-28", "h-36", "h-24"];
          return (
            <motion.div
              key={leader.username}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center gap-2"
            >
              <div
                className={`h-14 w-14 rounded-full bg-gradient-to-br ${leader.gradient} flex items-center justify-center text-white font-black text-lg shadow-lg`}
              >
                {leader.avatar}
              </div>
              <div className="text-center">
                <p className="text-xs font-bold line-clamp-1">
                  {leader.username}
                </p>
                <p className="text-xs text-muted-foreground">
                  {leader.badge} {leader.title}
                </p>
                <p className="text-sm font-black text-yellow-400">
                  {formatScore(leader[category])}
                </p>
              </div>
              <div
                className={`w-full ${heights[i]} rounded-t-xl flex items-center justify-center text-2xl font-black ${podiumPos === 1 ? "bg-gradient-to-t from-yellow-600/30 to-yellow-500/10 border border-yellow-500/30" : podiumPos === 2 ? "bg-gradient-to-t from-gray-600/30 to-gray-500/10 border border-gray-500/30" : "bg-gradient-to-t from-orange-700/30 to-orange-600/10 border border-orange-600/30"}`}
              >
                {getRankIcon(podiumPos)}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Full Table */}
      <Card className="border-border/50">
        <CardContent className="p-0">
          <div className="divide-y divide-border/40">
            {rest.map((leader, i) => (
              <motion.div
                key={leader.username}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                className="flex items-center gap-3 px-4 py-3 hover:bg-muted/30 transition-colors"
              >
                <div className="w-8 flex items-center justify-center">
                  {getRankIcon(leader.rank)}
                </div>
                <div
                  className={`h-9 w-9 rounded-full bg-gradient-to-br ${leader.gradient} flex items-center justify-center text-white font-bold text-sm shrink-0`}
                >
                  {leader.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-sm">
                      {leader.username}
                    </span>
                    <span className="text-xs">{leader.badge}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {leader.title}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm">
                    {formatScore(leader[category])}
                  </p>
                  <div className="flex items-center justify-end gap-0.5">
                    {getChangeIcon(leader.change)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Your Rank */}
      <Card className="border-blue-500/20 bg-gradient-to-r from-blue-950/20 to-cyan-950/20">
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                Y
              </div>
              <div>
                <p className="font-bold text-sm">Your Ranking</p>
                <p className="text-xs text-muted-foreground">
                  Keep trading and staking to climb!
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-black text-blue-400">#247</p>
              <p className="text-xs text-green-400 flex items-center gap-1 justify-end">
                <ArrowUp className="h-3 w-3" />
                +12 this week
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
