import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, TrendingUp, Zap, Users, Gift } from "lucide-react";

interface Rank {
  rank: number;
  user: string;
  avatar: string;
  value: number;
  change: number;
  badge?: string;
}

export default function Leaderboard() {
  const [category, setCategory] = useState("xp");

  const rankings: Record<string, Rank[]> = {
    xp: [
      { rank: 1, user: "TradeMaster", avatar: "TM", value: 45230, change: 2150, badge: "🏆" },
      { rank: 2, user: "CryptoAnalyst", avatar: "CA", value: 42890, change: 1890, badge: "🥈" },
      { rank: 3, user: "RiskManager", avatar: "RM", value: 38450, change: 1230, badge: "🥉" },
      { rank: 4, user: "VolumeTrader", avatar: "VT", value: 35670, change: 890 },
      { rank: 5, user: "SentimentPro", avatar: "SP", value: 32100, change: 450 },
    ],
    trading: [
      { rank: 1, user: "TradeMaster", avatar: "TM", value: 2340, change: 234, badge: "🏆" },
      { rank: 2, user: "VolumeTrader", avatar: "VT", value: 2100, change: 189, badge: "🥈" },
      { rank: 3, user: "SwingKing", avatar: "SK", value: 1890, change: 145, badge: "🥉" },
      { rank: 4, user: "DayTrader", avatar: "DT", value: 1670, change: 98 },
      { rank: 5, user: "ScalpMaster", avatar: "SM", value: 1450, change: 67 },
    ],
    mining: [
      { rank: 1, user: "MinerKing", avatar: "MK", value: 15670, change: 890, badge: "🏆" },
      { rank: 2, user: "HashPower", avatar: "HP", value: 14230, change: 756, badge: "🥈" },
      { rank: 3, user: "BlockChain", avatar: "BC", value: 12890, change: 645, badge: "🥉" },
      { rank: 4, user: "CoinDigger", avatar: "CD", value: 11450, change: 523 },
      { rank: 5, user: "PoolMaster", avatar: "PM", value: 10120, change: 412 },
    ],
    staking: [
      { rank: 1, user: "StakeKing", avatar: "SK", value: 89000, change: 4500, badge: "🏆" },
      { rank: 2, user: "YieldFarmer", avatar: "YF", value: 76500, change: 3800, badge: "🥈" },
      { rank: 3, user: "CompoundPro", avatar: "CP", value: 65200, change: 3100, badge: "🥉" },
      { rank: 4, user: "APYHunter", avatar: "AH", value: 54800, change: 2400 },
      { rank: 5, user: "LPProvider", avatar: "LP", value: 43900, change: 1900 },
    ],
    referrals: [
      { rank: 1, user: "RefMaster", avatar: "RM", value: 234, change: 12, badge: "🏆" },
      { rank: 2, user: "NetworkPro", avatar: "NP", value: 189, change: 9, badge: "🥈" },
      { rank: 3, user: "CommunityKing", avatar: "CK", value: 156, change: 7, badge: "🥉" },
      { rank: 4, user: "GrowthHacker", avatar: "GH", value: 123, change: 5 },
      { rank: 5, user: "InfluencerPro", avatar: "IP", value: 98, change: 3 },
    ],
  };

  const categoryInfo: Record<string, { icon: React.ReactNode; label: string; unit: string }> = {
    xp: { icon: <Zap className="w-5 h-5" />, label: "Experience Points", unit: "XP" },
    trading: { icon: <TrendingUp className="w-5 h-5" />, label: "Trading Volume", unit: "Trades" },
    mining: { icon: <Gift className="w-5 h-5" />, label: "Mining Rewards", unit: "Blocks" },
    staking: { icon: <Users className="w-5 h-5" />, label: "Staking Rewards", unit: "SKY" },
    referrals: { icon: <Trophy className="w-5 h-5" />, label: "Referral Count", unit: "Refs" },
  };

  const currentRankings = rankings[category];
  const info = categoryInfo[category];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
        {Object.entries(categoryInfo).map(([key, { icon, label }]) => (
          <Button
            key={key}
            onClick={() => setCategory(key)}
            variant={category === key ? "default" : "outline"}
            className={`flex flex-col items-center gap-2 h-auto py-4 ${
              category === key ? "bg-purple-600" : ""
            }`}
          >
            {icon}
            <span className="text-xs">{label}</span>
          </Button>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {info.icon}
              <div>
                <CardTitle>{info.label}</CardTitle>
                <CardDescription>Top performers this season</CardDescription>
              </div>
            </div>
            <Badge variant="outline">Season 1</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {currentRankings.map((entry) => (
              <div
                key={entry.rank}
                className={`flex items-center gap-4 p-4 rounded-lg border transition-colors ${
                  entry.rank <= 3
                    ? "bg-gradient-to-r from-yellow-900/20 to-transparent border-yellow-500/30"
                    : "border-gray-700 hover:border-purple-500/50"
                }`}
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-600 font-bold text-sm flex-shrink-0">
                  {entry.badge ? entry.badge : `#${entry.rank}`}
                </div>

                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center font-semibold text-xs flex-shrink-0">
                  {entry.avatar}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">{entry.user}</p>
                  <p className="text-xs text-gray-500">Rank #{entry.rank}</p>
                </div>

                <div className="text-right flex-shrink-0">
                  <p className="font-bold text-lg text-purple-400">{entry.value.toLocaleString()}</p>
                  <p className="text-xs text-green-400">+{entry.change.toLocaleString()} this week</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-400">Your Rank</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-purple-400">#42</div>
            <p className="text-xs text-gray-500 mt-1">Out of 5,234 players</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-400">Your Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-green-400">12,450</div>
            <p className="text-xs text-gray-500 mt-1">+234 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-400">Next Reward</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-400">Top 10</div>
            <p className="text-xs text-gray-500 mt-1">5,000 XP to go</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
