import { useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Activity,
  Zap,
  Trophy,
  Coins,
  TrendingUp,
  CheckCircle,
  Clock,
  Plus,
  Star,
  Flame,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const CHALLENGES = [
  {
    id: 1,
    title: "10,000 Steps Daily",
    emoji: "🚶",
    reward: "44 SKY4444",
    progress: 7200,
    goal: 10000,
    unit: "steps",
    streak: 7,
    completed: false,
  },
  {
    id: 2,
    title: "8 Hours Sleep",
    emoji: "😴",
    reward: "20 SKY4444",
    progress: 8,
    goal: 8,
    unit: "hours",
    streak: 3,
    completed: true,
  },
  {
    id: 3,
    title: "Drink 8 Glasses Water",
    emoji: "💧",
    reward: "15 SKY4444",
    progress: 6,
    goal: 8,
    unit: "glasses",
    streak: 5,
    completed: false,
  },
  {
    id: 4,
    title: "30 Min Exercise",
    emoji: "💪",
    reward: "50 SKY4444",
    progress: 30,
    goal: 30,
    unit: "minutes",
    streak: 12,
    completed: true,
  },
  {
    id: 5,
    title: "Meditate 10 Minutes",
    emoji: "🧘",
    reward: "25 SKY4444",
    progress: 0,
    goal: 10,
    unit: "minutes",
    streak: 0,
    completed: false,
  },
];

const VITALS = [
  {
    label: "Heart Rate",
    value: "72 bpm",
    status: "normal",
    emoji: "❤️",
    trend: "stable",
  },
  {
    label: "Steps Today",
    value: "7,200",
    status: "good",
    emoji: "🚶",
    trend: "up",
  },
  {
    label: "Calories",
    value: "1,840 kcal",
    status: "normal",
    emoji: "🔥",
    trend: "stable",
  },
  {
    label: "Sleep Score",
    value: "88/100",
    status: "great",
    emoji: "😴",
    trend: "up",
  },
  {
    label: "Stress Level",
    value: "Low",
    status: "great",
    emoji: "🧘",
    trend: "down",
  },
  {
    label: "Hydration",
    value: "75%",
    status: "good",
    emoji: "💧",
    trend: "up",
  },
];

export default function ShadowHealth() {
  const [tab, setTab] = useState<
    "today" | "challenges" | "rewards" | "community"
  >("today");
  const [completed, setCompleted] = useState<number[]>([2, 4]);

  const totalEarned = CHALLENGES.filter(c => completed.includes(c.id)).reduce(
    (s, c) => s + parseInt(c.reward),
    0
  );

  const complete = (challenge: (typeof CHALLENGES)[0]) => {
    if (!completed.includes(challenge.id)) {
      setCompleted(c => [...c, challenge.id]);
      toast.success(`🎉 Challenge complete! +${challenge.reward} earned!`);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Heart className="h-6 w-6 text-rose-400" />
            ShadowHealth
          </h1>
          <p className="text-sm text-muted-foreground">
            Earn SKY4444 for healthy habits — move to earn
          </p>
        </div>
        <Badge className="bg-rose-500/10 text-rose-400 border-rose-500/20 font-bold">
          🔥 12 Day Streak
        </Badge>
      </div>

      {/* Today Summary */}
      <Card className="border-rose-500/20 bg-gradient-to-br from-rose-900/10 to-orange-900/10">
        <CardContent className="py-4 px-4">
          <div className="flex items-center justify-between mb-3">
            <p className="font-black text-sm">Today's Progress</p>
            <p className="text-xs text-rose-400 font-bold">
              +{totalEarned} SKY4444 earned
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <p className="text-2xl font-black text-rose-400">7,200</p>
              <p className="text-xs text-muted-foreground">Steps</p>
              <Progress value={72} className="h-1.5 mt-1" />
            </div>
            <div className="text-center">
              <p className="text-2xl font-black text-orange-400">1,840</p>
              <p className="text-xs text-muted-foreground">Calories</p>
              <Progress value={82} className="h-1.5 mt-1" />
            </div>
            <div className="text-center">
              <p className="text-2xl font-black text-blue-400">6/8</p>
              <p className="text-xs text-muted-foreground">Water</p>
              <Progress value={75} className="h-1.5 mt-1" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-2">
        {(["today", "challenges", "rewards", "community"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-rose-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "today" && (
        <div className="space-y-3">
          <p className="text-xs font-bold text-muted-foreground">VITALS</p>
          <div className="grid grid-cols-2 gap-2">
            {VITALS.map(vital => (
              <Card key={vital.label} className="border-border/50">
                <CardContent className="py-3 px-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{vital.emoji}</span>
                    <div>
                      <p className="font-black text-sm">{vital.value}</p>
                      <p className="text-xs text-muted-foreground">
                        {vital.label}
                      </p>
                    </div>
                    <Badge
                      className={`text-xs ml-auto ${vital.status === "great" ? "bg-green-500/10 text-green-400 border-green-500/20" : vital.status === "good" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" : "bg-muted text-muted-foreground"}`}
                    >
                      {vital.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {tab === "challenges" && (
        <div className="space-y-3">
          {CHALLENGES.map((challenge, i) => {
            const isDone = completed.includes(challenge.id);
            const pct = Math.min(
              100,
              Math.round((challenge.progress / challenge.goal) * 100)
            );
            return (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <Card
                  className={`border ${isDone ? "border-green-500/20 bg-green-900/5" : "border-border/50"}`}
                >
                  <CardContent className="py-3 px-4">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{challenge.emoji}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="font-bold text-sm">{challenge.title}</p>
                          {challenge.streak > 0 && (
                            <Badge className="text-xs bg-orange-500/10 text-orange-400 border-orange-500/20">
                              <Flame className="h-2.5 w-2.5 mr-0.5" />
                              {challenge.streak}d
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">
                          {challenge.progress}/{challenge.goal} {challenge.unit}
                        </p>
                        <Progress value={pct} className="h-1.5" />
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-xs text-yellow-400 font-bold">
                          +{challenge.reward}
                        </p>
                        {isDone ? (
                          <Badge className="text-xs bg-green-500/10 text-green-400 border-green-500/20 mt-1">
                            ✓ Done
                          </Badge>
                        ) : (
                          <Button
                            size="sm"
                            className="h-7 text-xs mt-1 bg-rose-600 text-white border-0"
                            onClick={() => complete(challenge)}
                          >
                            Log
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}

      {tab === "rewards" && (
        <div className="space-y-3">
          <Card className="border-yellow-500/20 bg-yellow-900/5">
            <CardContent className="py-4 px-4 text-center">
              <p className="text-3xl font-black text-yellow-400">
                {totalEarned + 244} SKY4444
              </p>
              <p className="text-xs text-muted-foreground">
                Total Health Rewards Earned
              </p>
              <Button
                size="sm"
                className="mt-2 h-8 text-xs bg-yellow-600 text-white border-0"
                onClick={() => toast.success("Rewards claimed to wallet!")}
              >
                Claim to Wallet
              </Button>
            </CardContent>
          </Card>
          {[
            {
              title: "7-Day Streak Bonus",
              amount: "100 SKY4444",
              date: "May 14, 2026",
              emoji: "🔥",
            },
            {
              title: "Daily Challenges (x3)",
              amount: "79 SKY4444",
              date: "May 14, 2026",
              emoji: "✅",
            },
            {
              title: "Monthly Fitness Goal",
              amount: "500 SKY4444",
              date: "May 1, 2026",
              emoji: "🏆",
            },
          ].map(r => (
            <Card key={r.title} className="border-border/50">
              <CardContent className="py-3 px-4 flex items-center gap-3">
                <span className="text-xl">{r.emoji}</span>
                <div className="flex-1">
                  <p className="font-bold text-sm">{r.title}</p>
                  <p className="text-xs text-muted-foreground">{r.date}</p>
                </div>
                <p className="font-black text-sm text-yellow-400">
                  +{r.amount}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "community" && (
        <div className="space-y-3">
          <p className="text-xs font-bold text-muted-foreground">
            HEALTH LEADERBOARD
          </p>
          {[
            {
              rank: 1,
              name: "SkylerBlue",
              steps: "12,400",
              earned: "244 SKY",
              emoji: "🥇",
            },
            {
              rank: 2,
              name: "ShadowRunner",
              steps: "11,800",
              earned: "220 SKY",
              emoji: "🥈",
            },
            {
              rank: 3,
              name: "CryptoFit",
              steps: "10,900",
              earned: "200 SKY",
              emoji: "🥉",
            },
            {
              rank: 4,
              name: "HealthDAO",
              steps: "9,400",
              earned: "180 SKY",
              emoji: "4️⃣",
            },
            {
              rank: 5,
              name: "Web3Walker",
              steps: "8,800",
              earned: "160 SKY",
              emoji: "5️⃣",
            },
          ].map(entry => (
            <Card
              key={entry.rank}
              className={`border ${entry.rank === 1 ? "border-yellow-500/20 bg-yellow-900/5" : "border-border/50"}`}
            >
              <CardContent className="py-3 px-4 flex items-center gap-3">
                <span className="text-xl">{entry.emoji}</span>
                <p className="font-bold text-sm flex-1">{entry.name}</p>
                <p className="text-xs text-muted-foreground">
                  {entry.steps} steps
                </p>
                <p className="font-black text-xs text-yellow-400">
                  {entry.earned}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
