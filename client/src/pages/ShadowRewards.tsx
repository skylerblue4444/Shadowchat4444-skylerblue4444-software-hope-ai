import { useState } from "react";
import { motion } from "framer-motion";
import {
  Gift,
  Star,
  Zap,
  Trophy,
  CheckCircle,
  Clock,
  Coins,
  TrendingUp,
  Users,
  Lock,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const DAILY_TASKS = [
  {
    id: 1,
    title: "Daily Check-In",
    reward: 44,
    xp: 10,
    completed: true,
    icon: "📅",
  },
  {
    id: 2,
    title: "Make 1 Trade",
    reward: 88,
    xp: 20,
    completed: true,
    icon: "📈",
  },
  {
    id: 3,
    title: "Post in Community",
    reward: 44,
    xp: 15,
    completed: false,
    icon: "💬",
  },
  {
    id: 4,
    title: "Vote on a Proposal",
    reward: 100,
    xp: 25,
    completed: false,
    icon: "🗳️",
  },
  {
    id: 5,
    title: "Refer a Friend",
    reward: 444,
    xp: 50,
    completed: false,
    icon: "👥",
  },
];

const WEEKLY_MISSIONS = [
  {
    id: 1,
    title: "Trade $1,000+ volume",
    reward: 1000,
    progress: 650,
    total: 1000,
    icon: "💹",
  },
  {
    id: 2,
    title: "Stake for 7 days",
    reward: 500,
    progress: 5,
    total: 7,
    icon: "⚡",
  },
  {
    id: 3,
    title: "Invite 3 friends",
    reward: 1500,
    progress: 1,
    total: 3,
    icon: "🤝",
  },
  {
    id: 4,
    title: "Mint an NFT",
    reward: 750,
    progress: 0,
    total: 1,
    icon: "🎨",
  },
];

const LEVELS = [
  { level: 1, name: "Shadow Rookie", xp: 0, color: "text-gray-400" },
  { level: 2, name: "Shadow Trader", xp: 500, color: "text-green-400" },
  { level: 3, name: "Shadow Knight", xp: 2000, color: "text-blue-400" },
  { level: 4, name: "Shadow Master", xp: 5000, color: "text-purple-400" },
  { level: 5, name: "Shadow Legend", xp: 10000, color: "text-yellow-400" },
  { level: 6, name: "Shadow God", xp: 25000, color: "text-orange-400" },
];

const REWARDS_STORE = [
  {
    id: 1,
    name: "Trading Fee Discount (50%)",
    cost: 5000,
    category: "Trading",
    emoji: "💸",
  },
  {
    id: 2,
    name: "NFT Mint (1 free)",
    cost: 2500,
    category: "NFT",
    emoji: "🎨",
  },
  {
    id: 3,
    name: "IT Service Consult (1hr)",
    cost: 10000,
    category: "IT",
    emoji: "💼",
  },
  {
    id: 4,
    name: "Exclusive Shadow Badge",
    cost: 1000,
    category: "Social",
    emoji: "🏅",
  },
  {
    id: 5,
    name: "VIP Staking Pool Access",
    cost: 20000,
    category: "DeFi",
    emoji: "⚡",
  },
  {
    id: 6,
    name: "OTC Trading Access",
    cost: 50000,
    category: "Trading",
    emoji: "🏛️",
  },
];

export default function ShadowRewards() {
  const [tab, setTab] = useState<"daily" | "missions" | "store" | "levels">(
    "daily"
  );
  const [claimed, setClaimed] = useState<Set<number>>(new Set([1, 2]));
  const currentXP = 1850;
  const currentLevel = LEVELS.filter(l => l.xp <= currentXP).pop()!;
  const nextLevel = LEVELS.find(l => l.xp > currentXP);
  const xpProgress = nextLevel
    ? Math.round(
        ((currentXP - currentLevel.xp) / (nextLevel.xp - currentLevel.xp)) * 100
      )
    : 100;

  const claim = (taskId: number, reward: number) => {
    setClaimed(prev => new Set(Array.from(prev).concat([taskId])));
    toast.success(`🎉 Claimed ${reward} SKY4444!`);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Gift className="h-6 w-6 text-pink-400" />
            Shadow Rewards
          </h1>
          <p className="text-sm text-muted-foreground">
            Earn SKY4444 for every action you take
          </p>
        </div>
        <Badge className="bg-pink-500/10 text-pink-400 border-pink-500/20 font-bold">
          🎁 Active
        </Badge>
      </div>

      {/* Level Card */}
      <Card className="border-pink-500/20 bg-gradient-to-br from-pink-900/20 to-purple-900/10">
        <CardContent className="py-4 px-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs text-muted-foreground">Current Level</p>
              <p className={`font-black text-lg ${currentLevel.color}`}>
                Lv.{currentLevel.level} {currentLevel.name}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Total Earned</p>
              <p className="font-black text-lg text-pink-400">44,444 SKY4444</p>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">
                {currentXP.toLocaleString()} XP
              </span>
              <span className="font-bold">
                {nextLevel
                  ? `${nextLevel.xp.toLocaleString()} XP to ${nextLevel.name}`
                  : "MAX LEVEL"}
              </span>
            </div>
            <div className="h-2.5 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${xpProgress}%` }}
                transition={{ duration: 1 }}
              />
            </div>
            <p className="text-xs text-muted-foreground text-right">
              {xpProgress}% to next level
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-2">
        {(["daily", "missions", "store", "levels"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-pink-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "daily" && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-muted-foreground">
              DAILY TASKS — Resets in 14:22:33
            </p>
            <p className="text-xs font-bold text-pink-400">
              {claimed.size}/{DAILY_TASKS.length} done
            </p>
          </div>
          {DAILY_TASKS.map((task, i) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Card
                className={`border ${claimed.has(task.id) ? "border-green-500/20 opacity-60" : "border-border/50"}`}
              >
                <CardContent className="py-3 px-4 flex items-center gap-3">
                  <span className="text-xl shrink-0">{task.icon}</span>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{task.title}</p>
                    <p className="text-xs text-muted-foreground">
                      +{task.reward} SKY4444 · +{task.xp} XP
                    </p>
                  </div>
                  {claimed.has(task.id) ? (
                    <Badge className="bg-green-500/10 text-green-400 border-green-500/20 text-xs">
                      ✓ Claimed
                    </Badge>
                  ) : (
                    <Button
                      size="sm"
                      className="h-8 text-xs bg-pink-600 text-white border-0 font-bold shrink-0"
                      onClick={() => claim(task.id, task.reward)}
                    >
                      Claim
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "missions" && (
        <div className="space-y-2">
          <p className="text-xs font-bold text-muted-foreground">
            WEEKLY MISSIONS — Resets in 4 days
          </p>
          {WEEKLY_MISSIONS.map((mission, i) => (
            <Card key={mission.id} className="border-border/50">
              <CardContent className="py-3 px-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xl shrink-0">{mission.icon}</span>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{mission.title}</p>
                    <p className="text-xs text-muted-foreground">
                      Reward: {mission.reward.toLocaleString()} SKY4444
                    </p>
                  </div>
                  <p className="text-xs font-bold text-pink-400 shrink-0">
                    {mission.progress}/{mission.total}
                  </p>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${Math.min(100, (mission.progress / mission.total) * 100)}%`,
                    }}
                    transition={{ delay: i * 0.1, duration: 0.8 }}
                  />
                </div>
                {mission.progress >= mission.total && (
                  <Button
                    size="sm"
                    className="w-full h-8 text-xs bg-pink-600 text-white border-0 font-bold mt-2"
                    onClick={() =>
                      toast.success(
                        `🎉 Mission complete! +${mission.reward} SKY4444`
                      )
                    }
                  >
                    Claim Reward
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "store" && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-muted-foreground">
              REWARDS STORE
            </p>
            <p className="text-xs font-bold text-pink-400">
              Balance: 44,444 SKY4444
            </p>
          </div>
          {REWARDS_STORE.map((item, i) => (
            <Card key={item.id} className="border-border/50">
              <CardContent className="py-3 px-4 flex items-center gap-3">
                <span className="text-2xl shrink-0">{item.emoji}</span>
                <div className="flex-1">
                  <p className="font-bold text-sm">{item.name}</p>
                  <Badge className="text-xs bg-muted text-muted-foreground mt-0.5">
                    {item.category}
                  </Badge>
                </div>
                <Button
                  size="sm"
                  className={`h-8 text-xs font-bold shrink-0 ${44444 >= item.cost ? "bg-pink-600 text-white border-0" : "bg-muted text-muted-foreground"}`}
                  onClick={() => {
                    if (44444 < item.cost) {
                      toast.error("Not enough SKY4444");
                      return;
                    }
                    toast.success(`✅ Redeemed: ${item.name}`);
                  }}
                >
                  {item.cost.toLocaleString()}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "levels" && (
        <div className="space-y-2">
          {LEVELS.map((level, i) => (
            <Card
              key={level.level}
              className={`border ${currentLevel.level === level.level ? "border-pink-500/20 bg-pink-900/5" : "border-border/50"}`}
            >
              <CardContent className="py-3 px-4 flex items-center gap-3">
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center font-black text-sm shrink-0 ${currentLevel.level === level.level ? "bg-pink-500/20" : "bg-muted"}`}
                >
                  <span className={level.color}>{level.level}</span>
                </div>
                <div className="flex-1">
                  <p className={`font-black text-sm ${level.color}`}>
                    {level.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {level.xp.toLocaleString()} XP required
                  </p>
                </div>
                {currentLevel.level === level.level && (
                  <Badge className="bg-pink-500/10 text-pink-400 border-pink-500/20 text-xs">
                    Current
                  </Badge>
                )}
                {currentLevel.level > level.level && (
                  <CheckCircle className="h-5 w-5 text-green-400" />
                )}
                {currentLevel.level < level.level && (
                  <Lock className="h-4 w-4 text-muted-foreground" />
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
