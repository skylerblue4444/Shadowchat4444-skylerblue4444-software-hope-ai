import { useState } from "react";
import { motion } from "framer-motion";
import {
  Zap,
  TrendingUp,
  Lock,
  Unlock,
  Clock,
  DollarSign,
  ArrowRight,
  CheckCircle,
  Star,
  Flame,
  Award,
  Coins,
  BarChart2,
  RefreshCw,
  Plus,
  Minus,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const STAKING_POOLS = [
  {
    id: "trump-flex",
    token: "TRUMP",
    name: "Flexible Stake",
    apy: 12.5,
    lockDays: 0,
    minStake: 100,
    totalStaked: 8420000,
    myStake: 5000,
    rewards: 52.08,
    icon: "🇺🇸",
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
  },
  {
    id: "trump-30",
    token: "TRUMP",
    name: "30-Day Lock",
    apy: 28.4,
    lockDays: 30,
    minStake: 500,
    totalStaked: 12800000,
    myStake: 10000,
    rewards: 233.42,
    icon: "🇺🇸",
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
  },
  {
    id: "sky-flex",
    token: "SKY4444",
    name: "Flexible Stake",
    apy: 18.2,
    lockDays: 0,
    minStake: 1000,
    totalStaked: 44400000,
    myStake: 25000,
    rewards: 1240.55,
    icon: "⚡",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
  },
  {
    id: "sky-90",
    token: "SKY4444",
    name: "90-Day Lock",
    apy: 48.8,
    lockDays: 90,
    minStake: 5000,
    totalStaked: 88800000,
    myStake: 50000,
    rewards: 6684.93,
    icon: "⚡",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
  },
  {
    id: "doge-flex",
    token: "DOGE",
    name: "Flexible Stake",
    apy: 8.4,
    lockDays: 0,
    minStake: 1000,
    totalStaked: 5200000,
    myStake: 0,
    rewards: 0,
    icon: "🐕",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
  },
  {
    id: "lp-trump-sky",
    token: "TRUMP/SKY4444 LP",
    name: "Liquidity Pool",
    apy: 124.5,
    lockDays: 7,
    minStake: 100,
    totalStaked: 2100000,
    myStake: 0,
    rewards: 0,
    icon: "💧",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
];

const REWARD_HISTORY = [
  { date: "Today", amount: 127.43, token: "TRUMP" },
  { date: "Yesterday", amount: 124.21, token: "TRUMP" },
  { date: "2 days ago", amount: 118.9, token: "TRUMP" },
  { date: "3 days ago", amount: 121.33, token: "TRUMP" },
  { date: "4 days ago", amount: 115.67, token: "TRUMP" },
];

export default function Staking() {
  const [selectedPool, setSelectedPool] = useState(STAKING_POOLS[0]);
  const [stakeAmount, setStakeAmount] = useState("");
  const [activeTab, setActiveTab] = useState<"stake" | "unstake">("stake");

  const totalStakedValue = 85000;
  const totalRewardsEarned = 8210.98;
  const dailyRewards = 127.43;

  const estimatedReward = stakeAmount
    ? ((parseFloat(stakeAmount) * selectedPool.apy) / 100 / 365).toFixed(4)
    : "0";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black flex items-center gap-2">
          <Zap className="h-6 w-6 text-cyan-400" />
          Staking Center
        </h1>
        <p className="text-sm text-muted-foreground">
          Earn passive rewards on TRUMP, SKY4444, DOGE, and LP tokens
        </p>
      </div>

      {/* Portfolio Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          {
            label: "Total Staked",
            value: `$${totalStakedValue.toLocaleString()}`,
            icon: Lock,
            color: "text-blue-400",
          },
          {
            label: "Total Earned",
            value: `$${totalRewardsEarned.toLocaleString()}`,
            icon: Award,
            color: "text-green-400",
          },
          {
            label: "Daily Rewards",
            value: `$${dailyRewards}`,
            icon: TrendingUp,
            color: "text-yellow-400",
          },
          {
            label: "Avg APY",
            value: "32.4%",
            icon: Flame,
            color: "text-red-400",
          },
        ].map(({ label, value, icon: Icon, color }) => (
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Pool List */}
        <div className="space-y-2">
          <h3 className="font-bold text-sm">Staking Pools</h3>
          {STAKING_POOLS.map(pool => (
            <button
              key={pool.id}
              onClick={() => setSelectedPool(pool)}
              className={`w-full text-left p-3 rounded-xl border transition-colors ${selectedPool.id === pool.id ? `${pool.border} ${pool.bg}` : "border-border/30 hover:border-border/60 bg-muted/10"}`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{pool.icon}</span>
                <span className="font-bold text-sm">{pool.token}</span>
                <span className="text-xs text-muted-foreground">
                  {pool.name}
                </span>
                {pool.lockDays === 0 && (
                  <Badge className="text-xs bg-green-500/10 text-green-400 border-green-500/20">
                    Flexible
                  </Badge>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-lg font-black ${pool.color}`}>
                  {pool.apy}% APY
                </span>
                {pool.myStake > 0 && (
                  <span className="text-xs text-muted-foreground">
                    Staked: {pool.myStake.toLocaleString()}
                  </span>
                )}
              </div>
              {pool.lockDays > 0 && (
                <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                  <Lock className="h-3 w-3" />
                  {pool.lockDays}-day lock
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Stake Widget */}
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold">
              {selectedPool.icon} {selectedPool.token} — {selectedPool.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div
              className={`p-3 rounded-xl ${selectedPool.bg} border ${selectedPool.border}`}
            >
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">APY</span>
                <span className={`font-black text-lg ${selectedPool.color}`}>
                  {selectedPool.apy}%
                </span>
              </div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">Lock Period</span>
                <span className="font-medium">
                  {selectedPool.lockDays === 0
                    ? "Flexible"
                    : `${selectedPool.lockDays} days`}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Min Stake</span>
                <span className="font-medium">
                  {selectedPool.minStake.toLocaleString()} {selectedPool.token}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab("stake")}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === "stake" ? "bg-blue-600 text-white" : "bg-muted text-muted-foreground"}`}
              >
                Stake
              </button>
              <button
                onClick={() => setActiveTab("unstake")}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === "unstake" ? "bg-red-600 text-white" : "bg-muted text-muted-foreground"}`}
              >
                Unstake
              </button>
            </div>

            <div>
              <label className="text-xs text-muted-foreground mb-1 block">
                Amount ({selectedPool.token})
              </label>
              <div className="relative">
                <Input
                  placeholder={`Min ${selectedPool.minStake}`}
                  value={stakeAmount}
                  onChange={e => setStakeAmount(e.target.value)}
                  className="pr-16"
                />
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-blue-400 font-medium hover:text-blue-300"
                  onClick={() => setStakeAmount("10000")}
                >
                  MAX
                </button>
              </div>
            </div>

            {stakeAmount && (
              <div className="p-3 rounded-xl bg-muted/30 border border-border/30 text-sm space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Daily reward</span>
                  <span className="text-green-400 font-medium">
                    +{estimatedReward} {selectedPool.token}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monthly reward</span>
                  <span className="text-green-400 font-medium">
                    +{(parseFloat(estimatedReward) * 30).toFixed(2)}{" "}
                    {selectedPool.token}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Yearly reward</span>
                  <span className="text-green-400 font-bold">
                    +{(parseFloat(estimatedReward) * 365).toFixed(0)}{" "}
                    {selectedPool.token}
                  </span>
                </div>
              </div>
            )}

            <Button
              className={`w-full font-bold border-0 ${activeTab === "stake" ? "bg-blue-600 text-white" : "bg-red-600 text-white"}`}
              onClick={() =>
                toast.success(
                  `${activeTab === "stake" ? "Staked" : "Unstaked"} ${stakeAmount || "0"} ${selectedPool.token}`
                )
              }
            >
              {activeTab === "stake" ? (
                <>
                  <Lock className="h-4 w-4 mr-2" />
                  Stake Now
                </>
              ) : (
                <>
                  <Unlock className="h-4 w-4 mr-2" />
                  Unstake
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Rewards History */}
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-bold">
                Recent Rewards
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs"
                onClick={() => toast.success("Claiming all rewards...")}
              >
                Claim All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 mb-4">
              {REWARD_HISTORY.map((r, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-2 border-b border-border/20 last:border-0"
                >
                  <span className="text-sm text-muted-foreground">
                    {r.date}
                  </span>
                  <span className="text-sm font-bold text-green-400">
                    +{r.amount} {r.token}
                  </span>
                </div>
              ))}
            </div>
            <div className="p-3 rounded-xl bg-green-500/5 border border-green-500/20">
              <p className="text-xs text-muted-foreground">Unclaimed Rewards</p>
              <p className="text-2xl font-black text-green-400">$1,525.83</p>
              <Button
                className="w-full mt-2 bg-green-600 text-white border-0 h-8 text-sm"
                onClick={() => toast.success("All rewards claimed!")}
              >
                <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
                Claim Rewards
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pool Overview */}
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-bold">
            All Pools Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/40">
                  {[
                    "Pool",
                    "APY",
                    "Lock",
                    "Total Staked",
                    "My Stake",
                    "My Rewards",
                    "Action",
                  ].map(h => (
                    <th
                      key={h}
                      className="text-left p-2 text-xs text-muted-foreground font-medium"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {STAKING_POOLS.map(pool => (
                  <tr
                    key={pool.id}
                    className="border-b border-border/20 hover:bg-muted/10"
                  >
                    <td className="p-2">
                      <div className="flex items-center gap-2">
                        <span>{pool.icon}</span>
                        <div>
                          <p className="text-sm font-medium">{pool.token}</p>
                          <p className="text-xs text-muted-foreground">
                            {pool.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-2">
                      <span className={`font-black ${pool.color}`}>
                        {pool.apy}%
                      </span>
                    </td>
                    <td className="p-2 text-sm">
                      {pool.lockDays === 0 ? "Flexible" : `${pool.lockDays}d`}
                    </td>
                    <td className="p-2 text-sm font-mono">
                      {(pool.totalStaked / 1000000).toFixed(1)}M
                    </td>
                    <td className="p-2 text-sm font-mono">
                      {pool.myStake.toLocaleString()}
                    </td>
                    <td className="p-2 text-sm font-mono text-green-400">
                      {pool.rewards.toFixed(2)}
                    </td>
                    <td className="p-2">
                      <Button
                        size="sm"
                        className="h-7 text-xs bg-blue-600 text-white border-0"
                        onClick={() => {
                          setSelectedPool(pool);
                          toast.info(`Selected ${pool.token} ${pool.name}`);
                        }}
                      >
                        Stake
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
