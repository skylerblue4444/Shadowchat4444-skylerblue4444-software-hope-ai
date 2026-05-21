import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Sprout,
  Zap,
  TrendingUp,
  DollarSign,
  RefreshCw,
  Clock,
  CheckCircle,
  ArrowRight,
  Star,
  Shield,
  BarChart3,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Farm {
  id: number;
  pair: string;
  token0: string;
  token1: string;
  apy: number;
  tvl: string;
  earned: number;
  staked: number;
  multiplier: string;
  risk: "low" | "medium" | "high";
  protocol: string;
  autoCompound: boolean;
  hot: boolean;
}

const FARMS: Farm[] = [
  {
    id: 1,
    pair: "SKY4444/USDT",
    token0: "SKY",
    token1: "USDT",
    apy: 124.5,
    tvl: "$2.4M",
    earned: 0,
    staked: 0,
    multiplier: "40x",
    risk: "medium",
    protocol: "ShadowDEX",
    autoCompound: true,
    hot: true,
  },
  {
    id: 2,
    pair: "SKY4444/BNB",
    token0: "SKY",
    token1: "BNB",
    apy: 98.2,
    tvl: "$1.1M",
    earned: 0,
    staked: 0,
    multiplier: "30x",
    risk: "medium",
    protocol: "ShadowDEX",
    autoCompound: true,
    hot: true,
  },
  {
    id: 3,
    pair: "TRUMP/USDT",
    token0: "TRP",
    token1: "USDT",
    apy: 84.6,
    tvl: "$3.8M",
    earned: 0,
    staked: 0,
    multiplier: "25x",
    risk: "high",
    protocol: "ShadowDEX",
    autoCompound: false,
    hot: true,
  },
  {
    id: 4,
    pair: "ETH/USDT",
    token0: "ETH",
    token1: "USDT",
    apy: 18.4,
    tvl: "$12.2M",
    earned: 0,
    staked: 0,
    multiplier: "5x",
    risk: "low",
    protocol: "ShadowDEX",
    autoCompound: true,
    hot: false,
  },
  {
    id: 5,
    pair: "BTC/USDT",
    token0: "BTC",
    token1: "USDT",
    apy: 12.8,
    tvl: "$24.8M",
    earned: 0,
    staked: 0,
    multiplier: "3x",
    risk: "low",
    protocol: "ShadowDEX",
    autoCompound: true,
    hot: false,
  },
  {
    id: 6,
    pair: "DOGE/USDT",
    token0: "DGE",
    token1: "USDT",
    apy: 62.4,
    tvl: "$880K",
    earned: 0,
    staked: 0,
    multiplier: "18x",
    risk: "high",
    protocol: "ShadowDEX",
    autoCompound: false,
    hot: false,
  },
  {
    id: 7,
    pair: "SOL/USDT",
    token0: "SOL",
    token1: "USDT",
    apy: 34.8,
    tvl: "$4.2M",
    earned: 0,
    staked: 0,
    multiplier: "10x",
    risk: "medium",
    protocol: "ShadowDEX",
    autoCompound: true,
    hot: false,
  },
  {
    id: 8,
    pair: "XMR/USDT",
    token0: "XMR",
    token1: "USDT",
    apy: 28.2,
    tvl: "$620K",
    earned: 0,
    staked: 0,
    multiplier: "8x",
    risk: "medium",
    protocol: "ShadowDEX",
    autoCompound: false,
    hot: false,
  },
];

const RISK_COLORS = {
  low: "text-green-400 bg-green-500/10",
  medium: "text-yellow-400 bg-yellow-500/10",
  high: "text-red-400 bg-red-500/10",
};

export default function ShadowFarm() {
  const [farms, setFarms] = useState(FARMS);
  const [filter, setFilter] = useState<"all" | "hot" | "low" | "autocompound">(
    "all"
  );
  const [stakeModal, setStakeModal] = useState<Farm | null>(null);
  const [stakeAmt, setStakeAmt] = useState("");
  const [totalEarned, setTotalEarned] = useState(0);

  // Simulate earning rewards for staked farms
  useEffect(() => {
    const interval = setInterval(() => {
      setFarms(prev =>
        prev.map(f => {
          if (f.staked > 0) {
            const earned = ((f.staked * (f.apy / 100)) / (365 * 24 * 3600)) * 5;
            return { ...f, earned: f.earned + earned };
          }
          return f;
        })
      );
      setTotalEarned(prev => prev + 0.0001);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const filtered = farms.filter(f => {
    if (filter === "hot") return f.hot;
    if (filter === "low") return f.risk === "low";
    if (filter === "autocompound") return f.autoCompound;
    return true;
  });

  const handleStake = (farm: Farm) => {
    if (!stakeAmt || parseFloat(stakeAmt) <= 0) {
      toast.error("Enter a valid amount");
      return;
    }
    setFarms(prev =>
      prev.map(f =>
        f.id === farm.id ? { ...f, staked: f.staked + parseFloat(stakeAmt) } : f
      )
    );
    toast.success(
      `Staked $${stakeAmt} in ${farm.pair} farm! Earning ${farm.apy}% APY`
    );
    setStakeAmt("");
    setStakeModal(null);
  };

  const handleHarvest = (farm: Farm) => {
    if (farm.earned <= 0) {
      toast.error("Nothing to harvest yet");
      return;
    }
    toast.success(
      `Harvested ${farm.earned.toFixed(4)} SKY4444 from ${farm.pair}!`
    );
    setFarms(prev =>
      prev.map(f => (f.id === farm.id ? { ...f, earned: 0 } : f))
    );
  };

  const totalStaked = farms.reduce((s, f) => s + f.staked, 0);
  const totalEarnedDisplay = farms.reduce((s, f) => s + f.earned, 0);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Sprout className="h-6 w-6 text-green-400" />
            ShadowFarm
          </h1>
          <p className="text-sm text-muted-foreground">
            DeFi yield farming — stake LP tokens and earn SKY4444 rewards
          </p>
        </div>
        <Button
          className="bg-green-600 text-white border-0 font-bold h-9 text-sm"
          onClick={() => toast.info("Add liquidity to create LP tokens first!")}
        >
          <Zap className="h-4 w-4 mr-2" />
          Add Liquidity
        </Button>
      </div>

      {/* My Stats */}
      <div className="grid grid-cols-3 gap-2">
        {[
          {
            label: "Total Staked",
            value: `$${totalStaked.toFixed(2)}`,
            color: "text-green-400",
          },
          {
            label: "Total Earned",
            value: `${totalEarnedDisplay.toFixed(4)} SKY`,
            color: "text-yellow-400",
          },
          { label: "Platform TVL", value: "$49.3M", color: "text-cyan-400" },
        ].map(s => (
          <Card key={s.label} className="border-border/50 text-center">
            <CardContent className="py-3 px-2">
              <p className={`font-black text-base ${s.color}`}>{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {(
          [
            ["all", "All Farms"],
            ["hot", "🔥 Hot"],
            ["low", "🛡 Low Risk"],
            ["autocompound", "⚡ Auto-Compound"],
          ] as const
        ).map(([f, label]) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${filter === f ? "bg-green-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Farm Cards */}
      <div className="space-y-3">
        {filtered.map((farm, i) => (
          <motion.div
            key={farm.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="border-border/50 hover:border-green-500/20 transition-all">
              <CardContent className="py-4 px-4">
                <div className="flex items-center gap-3 flex-wrap">
                  {/* Pair */}
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <div className="flex -space-x-2 shrink-0">
                      {[farm.token0, farm.token1].map(t => (
                        <div
                          key={t}
                          className="h-8 w-8 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-2 border-background flex items-center justify-center"
                        >
                          <span className="text-[9px] font-black text-green-400">
                            {t.slice(0, 3)}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <p className="font-black text-sm">{farm.pair}</p>
                        {farm.hot && (
                          <Badge className="text-xs bg-orange-500/10 text-orange-400 border-0">
                            🔥 Hot
                          </Badge>
                        )}
                        {farm.autoCompound && (
                          <Badge className="text-xs bg-blue-500/10 text-blue-400 border-0">
                            ⚡ Auto
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span
                          className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${RISK_COLORS[farm.risk]}`}
                        >
                          {farm.risk} risk
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {farm.multiplier}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          TVL: {farm.tvl}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* APY */}
                  <div className="text-center shrink-0">
                    <p className="text-xs text-muted-foreground">APY</p>
                    <p className="font-black text-base text-green-400">
                      {farm.apy.toFixed(1)}%
                    </p>
                  </div>

                  {/* Earned */}
                  <div className="text-center shrink-0">
                    <p className="text-xs text-muted-foreground">Earned</p>
                    <p className="font-black text-sm text-yellow-400">
                      {farm.earned.toFixed(4)}
                    </p>
                    <p className="text-[10px] text-muted-foreground">SKY4444</p>
                  </div>

                  {/* Staked */}
                  <div className="text-center shrink-0">
                    <p className="text-xs text-muted-foreground">Staked</p>
                    <p className="font-black text-sm">
                      ${farm.staked.toFixed(2)}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 shrink-0">
                    <Button
                      size="sm"
                      className="h-8 px-3 text-xs bg-green-600 text-white border-0 font-bold"
                      onClick={() => setStakeModal(farm)}
                    >
                      Stake
                    </Button>
                    <Button
                      size="sm"
                      className="h-8 px-3 text-xs bg-yellow-500/10 text-yellow-400 border-yellow-500/20 font-bold"
                      onClick={() => handleHarvest(farm)}
                    >
                      Harvest
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Stake Modal */}
      {stakeModal && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setStakeModal(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={e => e.stopPropagation()}
          >
            <Card className="border-green-500/20 bg-background w-full max-w-sm">
              <CardContent className="py-6 px-5 space-y-4">
                <p className="font-black text-base">Stake {stakeModal.pair}</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-muted/50 rounded-lg px-2 py-1.5 text-center">
                    <p className="text-muted-foreground">APY</p>
                    <p className="font-black text-green-400">
                      {stakeModal.apy}%
                    </p>
                  </div>
                  <div className="bg-muted/50 rounded-lg px-2 py-1.5 text-center">
                    <p className="text-muted-foreground">TVL</p>
                    <p className="font-bold">{stakeModal.tvl}</p>
                  </div>
                </div>
                <input
                  type="number"
                  placeholder="Amount in USD"
                  value={stakeAmt}
                  onChange={e => setStakeAmt(e.target.value)}
                  className="w-full h-10 px-4 rounded-xl bg-muted text-sm border border-border/50 focus:outline-none focus:border-green-500/40"
                />
                {stakeAmt && (
                  <p className="text-xs text-center text-muted-foreground">
                    Daily earnings: ~$
                    {(
                      (parseFloat(stakeAmt) * stakeModal.apy) /
                      100 /
                      365
                    ).toFixed(4)}
                  </p>
                )}
                <div className="flex gap-2">
                  <Button
                    className="flex-1 h-10 bg-muted text-muted-foreground border-0"
                    onClick={() => setStakeModal(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 h-10 bg-green-600 text-white border-0 font-bold"
                    onClick={() => handleStake(stakeModal)}
                  >
                    <Sprout className="h-4 w-4 mr-2" />
                    Stake
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )}
    </div>
  );
}
