import { useState } from "react";
import { motion } from "framer-motion";
import {
  Coins,
  TrendingUp,
  Zap,
  Heart,
  Star,
  Users,
  Briefcase,
  Camera,
  MessageCircle,
  Vote,
  Gift,
  Crown,
  ChevronRight,
  CheckCircle,
  Clock,
  Flame,
  Trophy,
  ArrowUpRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const EARN_METHODS = [
  {
    id: "staking",
    name: "Staking",
    emoji: "🌾",
    earning: "Up to 124.5% APY",
    desc: "Stake SKY4444, TRUMP, or LP tokens for passive income",
    category: "passive",
    difficulty: "easy",
    claimed: false,
  },
  {
    id: "trading",
    name: "Trading Rewards",
    emoji: "📈",
    earning: "0.1% of every trade",
    desc: "Earn SKY4444 on every trade you execute on ShadowExchange",
    category: "passive",
    difficulty: "easy",
    claimed: false,
  },
  {
    id: "content",
    name: "Content Creation",
    emoji: "🎨",
    earning: "Up to 10,000 SKY/post",
    desc: "Earn based on engagement, views, and tips on your content",
    category: "active",
    difficulty: "medium",
    claimed: false,
  },
  {
    id: "referral",
    name: "Referrals",
    emoji: "👥",
    earning: "444 SKY per referral",
    desc: "Invite friends and earn when they join and trade",
    category: "active",
    difficulty: "easy",
    claimed: false,
  },
  {
    id: "freelance",
    name: "Freelance Gigs",
    emoji: "💼",
    earning: "Market rate in SKY4444",
    desc: "Complete IT, design, dev, or marketing gigs in the Talent Marketplace",
    category: "active",
    difficulty: "hard",
    claimed: false,
  },
  {
    id: "charity",
    name: "Charity Gaming",
    emoji: "❤️",
    earning: "Up to 5,000 SKY/game",
    desc: "Play charity games and earn rewards while donating",
    category: "active",
    difficulty: "easy",
    claimed: false,
  },
  {
    id: "dao",
    name: "DAO Participation",
    emoji: "🏛️",
    earning: "100 SKY per vote",
    desc: "Vote on governance proposals and earn participation rewards",
    category: "passive",
    difficulty: "easy",
    claimed: false,
  },
  {
    id: "mining",
    name: "Browser Mining",
    emoji: "⛏️",
    earning: "~50 SKY/day",
    desc: "Mine SKY4444 using your browser's idle CPU power",
    category: "passive",
    difficulty: "easy",
    claimed: false,
  },
  {
    id: "dating",
    name: "Dating Rewards",
    emoji: "💘",
    earning: "44 SKY per match",
    desc: "Earn SKY4444 for quality matches and positive interactions",
    category: "active",
    difficulty: "medium",
    claimed: false,
  },
  {
    id: "nft",
    name: "NFT Royalties",
    emoji: "🖼️",
    earning: "2.5-10% royalties",
    desc: "Create and sell NFTs, earn royalties on every resale forever",
    category: "passive",
    difficulty: "hard",
    claimed: false,
  },
  {
    id: "streaming",
    name: "Live Streaming",
    emoji: "📡",
    earning: "Tips + subscriptions",
    desc: "Stream on ShadowTV and earn tips, subscriptions, and ad revenue",
    category: "active",
    difficulty: "medium",
    claimed: false,
  },
  {
    id: "tasks",
    name: "Daily Tasks",
    emoji: "✅",
    earning: "Up to 444 SKY/day",
    desc: "Complete daily tasks and challenges for guaranteed rewards",
    category: "active",
    difficulty: "easy",
    claimed: true,
  },
];

const DAILY_TASKS = [
  { task: "Log in today", reward: "10 SKY4444", completed: true },
  { task: "Make a trade", reward: "50 SKY4444", completed: true },
  { task: "Post content", reward: "100 SKY4444", completed: false },
  { task: "Vote on a DAO proposal", reward: "100 SKY4444", completed: false },
  { task: "Send a message", reward: "20 SKY4444", completed: true },
  { task: "Refer a friend", reward: "444 SKY4444", completed: false },
  { task: "Stake tokens", reward: "50 SKY4444", completed: false },
  { task: "Complete a gig", reward: "500 SKY4444", completed: false },
];

const LEADERBOARD = [
  { rank: 1, name: "SkyMaximalist", earned: "1,244,444 SKY", emoji: "👑" },
  { rank: 2, name: "TrumpTrader", earned: "987,654 SKY", emoji: "🥈" },
  { rank: 3, name: "CryptoKing_44", earned: "876,543 SKY", emoji: "🥉" },
  { rank: 4, name: "ShadowBuilder", earned: "654,321 SKY", emoji: "⚡" },
  { rank: 5, name: "You", earned: "444,444 SKY", emoji: "🌟", isUser: true },
];

export default function ShadowEarn() {
  const [tab, setTab] = useState<"all" | "tasks" | "leaderboard" | "history">(
    "all"
  );
  const [filter, setFilter] = useState<"all" | "passive" | "active">("all");
  const [claimed, setClaimed] = useState<string[]>(["tasks"]);

  const filtered = EARN_METHODS.filter(
    m => filter === "all" || m.category === filter
  );
  const completedTasks = DAILY_TASKS.filter(t => t.completed).length;
  const totalTaskReward = DAILY_TASKS.filter(t => t.completed).reduce(
    (s, t) => s + parseInt(t.reward.split(" ")[0]),
    0
  );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Coins className="h-6 w-6 text-yellow-400" />
            ShadowEarn
          </h1>
          <p className="text-sm text-muted-foreground">
            12 ways to earn SKY4444 and TRUMP on the platform
          </p>
        </div>
        <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20 font-black text-base px-3">
          444,444 SKY
        </Badge>
      </div>

      {/* Earnings Summary */}
      <div className="grid grid-cols-3 gap-2">
        {[
          {
            label: "Today",
            value: "+1,244 SKY",
            emoji: "📅",
            color: "text-green-400",
          },
          {
            label: "This Week",
            value: "+8,888 SKY",
            emoji: "📊",
            color: "text-blue-400",
          },
          {
            label: "All Time",
            value: "444,444 SKY",
            emoji: "🏆",
            color: "text-yellow-400",
          },
        ].map(stat => (
          <Card key={stat.label} className="border-border/50 text-center">
            <CardContent className="pt-3 pb-3">
              <p className="text-xl mb-1">{stat.emoji}</p>
              <p className={`font-black text-xs ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {(["all", "tasks", "leaderboard", "history"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-yellow-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "all" && (
        <div className="space-y-3">
          <div className="flex gap-2">
            {(["all", "passive", "active"] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded-full text-xs font-medium capitalize transition-colors ${filter === f ? "bg-yellow-600 text-white" : "bg-muted text-muted-foreground"}`}
              >
                {f}
              </button>
            ))}
          </div>
          {filtered.map((method, i) => (
            <motion.div
              key={method.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="border-border/50 hover:border-yellow-500/20 transition-all">
                <CardContent className="py-3 px-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl shrink-0">{method.emoji}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="font-bold text-sm">{method.name}</p>
                        <Badge
                          className={`text-xs ${method.category === "passive" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" : "bg-purple-500/10 text-purple-400 border-purple-500/20"}`}
                        >
                          {method.category}
                        </Badge>
                        <Badge
                          className={`text-xs ${method.difficulty === "easy" ? "bg-green-500/10 text-green-400 border-green-500/20" : method.difficulty === "medium" ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" : "bg-red-500/10 text-red-400 border-red-500/20"}`}
                        >
                          {method.difficulty}
                        </Badge>
                      </div>
                      <p className="text-xs font-bold text-yellow-400 mb-0.5">
                        {method.earning}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {method.desc}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      className={`h-8 text-xs shrink-0 ${claimed.includes(method.id) ? "bg-muted text-muted-foreground" : "bg-yellow-600 text-white border-0"}`}
                      onClick={() => {
                        if (!claimed.includes(method.id)) {
                          setClaimed(c => [...c, method.id]);
                          toast.success(`✅ ${method.name} activated!`);
                        }
                      }}
                    >
                      {claimed.includes(method.id) ? "Active" : "Start"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "tasks" && (
        <div className="space-y-3">
          <Card className="border-yellow-500/20 bg-yellow-900/10">
            <CardContent className="py-3 px-4">
              <div className="flex items-center justify-between mb-2">
                <p className="font-bold text-sm">Daily Tasks</p>
                <p className="text-xs font-bold text-yellow-400">
                  {completedTasks}/{DAILY_TASKS.length} Complete
                </p>
              </div>
              <Progress
                value={(completedTasks / DAILY_TASKS.length) * 100}
                className="h-2 mb-2"
              />
              <p className="text-xs text-muted-foreground">
                Earned today:{" "}
                <span className="text-yellow-400 font-bold">
                  {totalTaskReward} SKY4444
                </span>
              </p>
            </CardContent>
          </Card>
          {DAILY_TASKS.map((task, i) => (
            <Card
              key={i}
              className={`border ${task.completed ? "border-green-500/20 bg-green-900/5" : "border-border/50"}`}
            >
              <CardContent className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`h-7 w-7 rounded-full flex items-center justify-center shrink-0 ${task.completed ? "bg-green-600" : "bg-muted"}`}
                  >
                    {task.completed ? (
                      <CheckCircle className="h-4 w-4 text-white" />
                    ) : (
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p
                      className={`text-sm font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}
                    >
                      {task.task}
                    </p>
                  </div>
                  <Badge
                    className={`text-xs ${task.completed ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"}`}
                  >
                    {task.reward}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "leaderboard" && (
        <div className="space-y-2">
          <p className="text-xs font-bold text-muted-foreground">
            TOP EARNERS THIS MONTH
          </p>
          {LEADERBOARD.map((entry, i) => (
            <Card
              key={entry.rank}
              className={`border ${entry.isUser ? "border-yellow-500/30 bg-yellow-900/10" : "border-border/50"}`}
            >
              <CardContent className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <p className="font-black text-xl w-8 text-center">
                    {entry.emoji}
                  </p>
                  <div className="flex-1">
                    <p className="font-bold text-sm">
                      {entry.name}
                      {entry.isUser && " (You)"}
                    </p>
                    <p className="text-xs text-yellow-400 font-bold">
                      {entry.earned}
                    </p>
                  </div>
                  <Badge className="text-xs bg-muted text-muted-foreground">
                    #{entry.rank}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "history" && (
        <div className="space-y-2">
          <p className="text-xs font-bold text-muted-foreground">
            EARNING HISTORY
          </p>
          {[
            {
              source: "Staking Reward",
              amount: "+444 SKY",
              time: "2 min ago",
              emoji: "🌾",
            },
            {
              source: "Trading Reward",
              amount: "+22 SKY",
              time: "1 hr ago",
              emoji: "📈",
            },
            {
              source: "DAO Vote",
              amount: "+100 SKY",
              time: "3 hr ago",
              emoji: "🏛️",
            },
            {
              source: "Content Tip",
              amount: "+250 SKY",
              time: "5 hr ago",
              emoji: "🎨",
            },
            {
              source: "Referral Bonus",
              amount: "+444 SKY",
              time: "Yesterday",
              emoji: "👥",
            },
            {
              source: "Daily Login",
              amount: "+10 SKY",
              time: "Yesterday",
              emoji: "✅",
            },
          ].map((entry, i) => (
            <Card key={i} className="border-border/50">
              <CardContent className="py-2.5 px-4">
                <div className="flex items-center gap-3">
                  <span className="text-lg">{entry.emoji}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{entry.source}</p>
                    <p className="text-xs text-muted-foreground">
                      {entry.time}
                    </p>
                  </div>
                  <p className="font-black text-sm text-green-400">
                    {entry.amount}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
