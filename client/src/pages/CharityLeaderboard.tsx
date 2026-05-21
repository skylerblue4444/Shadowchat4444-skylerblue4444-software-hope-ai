import { useState } from "react";
import { motion } from "framer-motion";
import {
  Trophy,
  Heart,
  Star,
  Crown,
  Flame,
  Zap,
  Gift,
  TrendingUp,
  Users,
  DollarSign,
  Award,
  ChevronRight,
  Coins,
  Globe,
  Shield,
  BarChart2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const LEADERBOARD = [
  {
    rank: 1,
    name: "CryptoPhilanthropist",
    avatar: "🐋",
    donated: 48420,
    cause: "Children's Education",
    streak: 84,
    badge: "💎 Diamond Donor",
    country: "USA",
    tokens: 484200,
  },
  {
    rank: 2,
    name: "SkyBlue_Gives",
    avatar: "⚡",
    donated: 28400,
    cause: "Clean Water",
    streak: 62,
    badge: "🥇 Gold Donor",
    country: "USA",
    tokens: 284000,
  },
  {
    rank: 3,
    name: "TRUMP_Charity",
    avatar: "🇺🇸",
    donated: 18200,
    cause: "Veterans",
    streak: 42,
    badge: "🥈 Silver Donor",
    country: "USA",
    tokens: 182000,
  },
  {
    rank: 4,
    name: "DeFi_Angel",
    avatar: "😇",
    donated: 12840,
    cause: "Hunger Relief",
    streak: 28,
    badge: "🥉 Bronze Donor",
    country: "UK",
    tokens: 128400,
  },
  {
    rank: 5,
    name: "NFT_Giver",
    avatar: "🎨",
    donated: 8420,
    cause: "Ocean Cleanup",
    streak: 21,
    badge: "⭐ Star Donor",
    country: "Japan",
    tokens: 84200,
  },
  {
    rank: 6,
    name: "CryptoMom_88",
    avatar: "💜",
    donated: 4840,
    cause: "Mental Health",
    streak: 14,
    badge: "⭐ Star Donor",
    country: "Canada",
    tokens: 48400,
  },
  {
    rank: 7,
    name: "You",
    avatar: "🧑‍💻",
    donated: 1240,
    cause: "Children's Education",
    streak: 7,
    badge: "🌱 Rising Donor",
    country: "USA",
    tokens: 12400,
    isMe: true,
  },
];

const CAUSES = [
  {
    name: "Children's Education",
    raised: 284000,
    goal: 500000,
    donors: 2840,
    icon: "📚",
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Clean Water Access",
    raised: 184000,
    goal: 250000,
    donors: 1840,
    icon: "💧",
    color: "from-cyan-500 to-teal-500",
  },
  {
    name: "Hunger Relief",
    raised: 124000,
    goal: 200000,
    donors: 1240,
    icon: "🍽️",
    color: "from-orange-500 to-amber-500",
  },
  {
    name: "Ocean Cleanup",
    raised: 84000,
    goal: 150000,
    donors: 840,
    icon: "🌊",
    color: "from-blue-500 to-indigo-500",
  },
  {
    name: "Veterans Support",
    raised: 64000,
    goal: 100000,
    donors: 640,
    icon: "🎖️",
    color: "from-red-500 to-rose-500",
  },
  {
    name: "Mental Health",
    raised: 42000,
    goal: 100000,
    donors: 420,
    icon: "💜",
    color: "from-purple-500 to-violet-500",
  },
];

const MILESTONES = [
  { label: "First Donation", icon: "🌱", earned: true },
  { label: "7-Day Streak", icon: "🔥", earned: true },
  { label: "30-Day Streak", icon: "💪", earned: false },
  { label: "$100 Donated", icon: "💯", earned: true },
  { label: "$1,000 Donated", icon: "🏆", earned: true },
  { label: "$10,000 Donated", icon: "💎", earned: false },
  { label: "Top 100 Donor", icon: "⭐", earned: false },
  { label: "Top 10 Donor", icon: "👑", earned: false },
];

export default function CharityLeaderboard() {
  const [tab, setTab] = useState<"leaderboard" | "causes" | "milestones">(
    "leaderboard"
  );
  const [period, setPeriod] = useState("all-time");

  const myEntry = LEADERBOARD.find(e => e.isMe)!;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black flex items-center gap-2">
          <Trophy className="h-6 w-6 text-yellow-400" />
          Charity Leaderboard
        </h1>
        <p className="text-sm text-muted-foreground">
          Compete for good — top donors earn SKY4444 rewards and exclusive
          badges
        </p>
      </div>

      {/* My Stats */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/30 to-blue-950/30 border border-purple-500/20">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{myEntry.avatar}</span>
          <div className="flex-1">
            <p className="font-black text-lg">{myEntry.name}</p>
            <p className="text-sm text-muted-foreground">
              {myEntry.badge} · Rank #{myEntry.rank}
            </p>
            <div className="flex gap-3 mt-1 text-xs">
              <span className="text-green-400 font-bold">
                ${myEntry.donated.toLocaleString()} donated
              </span>
              <span className="text-orange-400 font-bold">
                <Flame className="h-3 w-3 inline" /> {myEntry.streak}-day streak
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Earned</p>
            <p className="font-black text-cyan-400">
              {myEntry.tokens.toLocaleString()} SKY4444
            </p>
          </div>
        </div>
        <div className="mt-3">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-muted-foreground">Progress to Rank #6</span>
            <span className="text-purple-400">
              ${(4840 - 1240).toLocaleString()} more needed
            </span>
          </div>
          <Progress value={(1240 / 4840) * 100} className="h-2" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {(["leaderboard", "causes", "milestones"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${tab === t ? "bg-yellow-500 text-black" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "leaderboard" && (
        <div className="space-y-3">
          {/* Period Filter */}
          <div className="flex gap-2">
            {["all-time", "this-month", "this-week"].map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${period === p ? "bg-yellow-500 text-black" : "bg-muted text-muted-foreground"}`}
              >
                {p.replace("-", " ")}
              </button>
            ))}
          </div>

          {/* Top 3 Podium */}
          <div className="grid grid-cols-3 gap-3">
            {[LEADERBOARD[1], LEADERBOARD[0], LEADERBOARD[2]].map(
              (entry, i) => {
                const positions = [2, 1, 3];
                const heights = ["h-24", "h-32", "h-20"];
                const pos = positions[i];
                return (
                  <div
                    key={entry.rank}
                    className="flex flex-col items-center gap-2"
                  >
                    <span className="text-3xl">{entry.avatar}</span>
                    <p className="text-xs font-bold text-center truncate w-full text-center">
                      {entry.name}
                    </p>
                    <p className="text-xs text-green-400 font-bold">
                      ${entry.donated.toLocaleString()}
                    </p>
                    <div
                      className={`w-full ${heights[i]} rounded-t-xl flex items-end justify-center pb-2 ${pos === 1 ? "bg-gradient-to-t from-yellow-500/30 to-yellow-500/10" : pos === 2 ? "bg-gradient-to-t from-gray-400/30 to-gray-400/10" : "bg-gradient-to-t from-amber-600/30 to-amber-600/10"}`}
                    >
                      <span className="text-2xl font-black">
                        {pos === 1 ? "🥇" : pos === 2 ? "🥈" : "🥉"}
                      </span>
                    </div>
                  </div>
                );
              }
            )}
          </div>

          {/* Full List */}
          {LEADERBOARD.map((entry, i) => (
            <motion.div
              key={entry.rank}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <Card
                className={`border-border/50 ${entry.isMe ? "border-purple-500/30 bg-purple-500/3" : ""}`}
              >
                <CardContent className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center font-black text-sm shrink-0 ${entry.rank <= 3 ? "bg-yellow-500/10 text-yellow-400" : "bg-muted text-muted-foreground"}`}
                    >
                      #{entry.rank}
                    </div>
                    <span className="text-2xl">{entry.avatar}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p
                          className={`font-bold text-sm ${entry.isMe ? "text-purple-400" : ""}`}
                        >
                          {entry.name}
                          {entry.isMe && " (You)"}
                        </p>
                        <span className="text-xs">{entry.badge}</span>
                      </div>
                      <div className="flex gap-2 text-xs text-muted-foreground">
                        <span>{entry.cause}</span>
                        <span>·</span>
                        <span className="text-orange-400">
                          <Flame className="h-3 w-3 inline" /> {entry.streak}d
                        </span>
                        <span>·</span>
                        <span>{entry.country}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-green-400">
                        ${entry.donated.toLocaleString()}
                      </p>
                      <p className="text-xs text-cyan-400">
                        {entry.tokens.toLocaleString()} SKY4444
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "causes" && (
        <div className="space-y-3">
          {CAUSES.map((cause, i) => (
            <Card key={cause.name} className="border-border/50">
              <CardContent className="py-4 px-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{cause.icon}</span>
                  <div className="flex-1">
                    <p className="font-black">{cause.name}</p>
                    <p className="text-xs text-muted-foreground">
                      <Users className="h-3 w-3 inline mr-0.5" />
                      {cause.donors.toLocaleString()} donors
                    </p>
                  </div>
                  <Button
                    size="sm"
                    className={`h-7 text-xs bg-gradient-to-r ${cause.color} text-white border-0`}
                    onClick={() => toast.success(`Donating to ${cause.name}`)}
                  >
                    <Heart className="h-3.5 w-3.5 mr-1.5" />
                    Donate
                  </Button>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-green-400 font-bold">
                      ${cause.raised.toLocaleString()} raised
                    </span>
                    <span className="text-muted-foreground">
                      Goal: ${cause.goal.toLocaleString()}
                    </span>
                  </div>
                  <Progress
                    value={(cause.raised / cause.goal) * 100}
                    className="h-2"
                  />
                  <p className="text-xs text-muted-foreground text-right">
                    {((cause.raised / cause.goal) * 100).toFixed(1)}% funded
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "milestones" && (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Earn SKY4444 tokens and exclusive badges by reaching donation
            milestones
          </p>
          <div className="grid grid-cols-2 gap-3">
            {MILESTONES.map((m, i) => (
              <Card
                key={m.label}
                className={`border-border/50 ${m.earned ? "border-yellow-500/20 bg-yellow-500/3" : "opacity-60"}`}
              >
                <CardContent className="py-4 text-center">
                  <span className="text-4xl">{m.icon}</span>
                  <p className="text-sm font-bold mt-2">{m.label}</p>
                  {m.earned ? (
                    <Badge className="mt-1 text-xs bg-green-500/10 text-green-400 border-green-500/20">
                      ✓ Earned
                    </Badge>
                  ) : (
                    <Badge className="mt-1 text-xs bg-muted text-muted-foreground">
                      Locked
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
