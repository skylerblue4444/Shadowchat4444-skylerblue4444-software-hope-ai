import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Zap, Target, Star } from "lucide-react";

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  xpReward: number;
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  unlockedDate?: string;
}

export default function Achievements() {
  const [achievements] = useState<Achievement[]>([
    {
      id: "1",
      name: "First Trade",
      description: "Execute your first trade",
      icon: "🎯",
      rarity: "common",
      xpReward: 100,
      progress: 1,
      maxProgress: 1,
      unlocked: true,
      unlockedDate: "2 weeks ago",
    },
    {
      id: "2",
      name: "Day Trader",
      description: "Complete 10 trades in a single day",
      icon: "📈",
      rarity: "rare",
      xpReward: 500,
      progress: 8,
      maxProgress: 10,
      unlocked: false,
    },
    {
      id: "3",
      name: "Millionaire",
      description: "Reach $1M portfolio value",
      icon: "💰",
      rarity: "epic",
      xpReward: 2000,
      progress: 750000,
      maxProgress: 1000000,
      unlocked: false,
    },
    {
      id: "4",
      name: "Social Butterfly",
      description: "Get 100 likes on your posts",
      icon: "🦋",
      rarity: "rare",
      xpReward: 750,
      progress: 87,
      maxProgress: 100,
      unlocked: false,
    },
    {
      id: "5",
      name: "Vault Master",
      description: "Lock $100K in cold storage",
      icon: "🔐",
      rarity: "epic",
      xpReward: 1500,
      progress: 100000,
      maxProgress: 100000,
      unlocked: true,
      unlockedDate: "1 week ago",
    },
    {
      id: "6",
      name: "DAO Voter",
      description: "Vote on 5 governance proposals",
      icon: "🗳️",
      rarity: "rare",
      xpReward: 600,
      progress: 3,
      maxProgress: 5,
      unlocked: false,
    },
    {
      id: "7",
      name: "Referral King",
      description: "Refer 50 friends to the platform",
      icon: "👑",
      rarity: "legendary",
      xpReward: 5000,
      progress: 12,
      maxProgress: 50,
      unlocked: false,
    },
    {
      id: "8",
      name: "Quantum Guardian",
      description: "Secure $500K in Quantum Vault",
      icon: "🛡️",
      rarity: "legendary",
      xpReward: 3000,
      progress: 250000,
      maxProgress: 500000,
      unlocked: false,
    },
  ]);

  const totalXP = achievements.filter((a) => a.unlocked).reduce((sum, a) => sum + a.xpReward, 0);
  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalXPPossible = achievements.reduce((sum, a) => sum + a.xpReward, 0);

  const rarityColors: Record<string, string> = {
    common: "bg-gray-600",
    rare: "bg-blue-600",
    epic: "bg-purple-600",
    legendary: "bg-yellow-600",
  };

  const rarityBorderColors: Record<string, string> = {
    common: "border-gray-500",
    rare: "border-blue-500",
    epic: "border-purple-500",
    legendary: "border-yellow-500",
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total XP</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-400">{totalXP.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">
              {((totalXP / totalXPPossible) * 100).toFixed(0)}% of max
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-400">
              {unlockedCount}/{achievements.length}
            </div>
            <p className="text-xs text-gray-500 mt-1">Unlocked</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-400">12</div>
            <p className="text-xs text-gray-500 mt-1">Elite Trader</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Next Milestone</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-400">5000</div>
            <p className="text-xs text-gray-500 mt-1">XP to Level 13</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Progress value={75} className="h-2 flex-1" />
            <span className="text-sm">75% to Level 13</span>
          </CardTitle>
        </CardHeader>
      </Card>

      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Achievements</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement) => (
            <Card
              key={achievement.id}
              className={`overflow-hidden ${
                achievement.unlocked ? "border-green-500/30" : "border-gray-700"
              }`}
            >
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div
                    className={`text-4xl w-16 h-16 rounded-lg flex items-center justify-center ${
                      achievement.unlocked
                        ? "bg-gradient-to-br " + rarityColors[achievement.rarity]
                        : "bg-gray-800"
                    }`}
                  >
                    {achievement.icon}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-sm">{achievement.name}</h3>
                      <Badge
                        className={`text-xs text-white ${rarityColors[achievement.rarity]}`}
                      >
                        {achievement.rarity.toUpperCase()}
                      </Badge>
                      {achievement.unlocked && (
                        <Star className="w-4 h-4 text-yellow-400" />
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mb-2">{achievement.description}</p>

                    {!achievement.unlocked && (
                      <div className="mb-2">
                        <div className="flex justify-between mb-1">
                          <span className="text-xs text-gray-400">Progress</span>
                          <span className="text-xs text-gray-400">
                            {achievement.progress}/{achievement.maxProgress}
                          </span>
                        </div>
                        <Progress
                          value={(achievement.progress / achievement.maxProgress) * 100}
                          className="h-1"
                        />
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Zap className="w-3 h-3 text-yellow-400" />
                        <span className="text-xs font-semibold text-yellow-400">
                          +{achievement.xpReward} XP
                        </span>
                      </div>
                      {achievement.unlocked && (
                        <span className="text-xs text-gray-500">
                          Unlocked {achievement.unlockedDate}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-400" />
            Leaderboard
          </CardTitle>
          <CardDescription>Top achievers this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { rank: 1, name: "CryptoKing", xp: 25000, achievements: 8 },
              { rank: 2, name: "TradeMaster", xp: 23500, achievements: 7 },
              { rank: 3, name: "You", xp: 21000, achievements: 5 },
              { rank: 4, name: "SkyWalker", xp: 19800, achievements: 6 },
              { rank: 5, name: "VaultKeeper", xp: 18500, achievements: 4 },
            ].map((entry) => (
              <div
                key={entry.rank}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  entry.name === "You"
                    ? "bg-purple-600/20 border border-purple-500"
                    : "bg-gray-900/50 border border-gray-700"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center font-bold text-sm">
                    {entry.rank}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{entry.name}</p>
                    <p className="text-xs text-gray-400">{entry.achievements} achievements</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-yellow-400">{entry.xp.toLocaleString()} XP</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
