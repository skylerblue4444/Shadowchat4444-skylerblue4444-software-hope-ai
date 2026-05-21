import { useState } from "react";
import { motion } from "framer-motion";
import {
  Layers,
  TrendingUp,
  Droplets,
  Zap,
  Lock,
  Coins,
  BarChart2,
  ArrowRight,
  Plus,
  RefreshCw,
  Star,
  Shield,
  Globe,
  Award,
  ChevronRight,
  ExternalLink,
  Info,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const TVL_DATA = [
  { date: "May 8", tvl: 42100000 },
  { date: "May 9", tvl: 48200000 },
  { date: "May 10", tvl: 45800000 },
  { date: "May 11", tvl: 52400000 },
  { date: "May 12", tvl: 58900000 },
  { date: "May 13", tvl: 64200000 },
  { date: "May 14", tvl: 71800000 },
];

const PROTOCOLS = [
  {
    name: "ShadowSwap",
    category: "DEX",
    tvl: 48200000,
    apy: 24.5,
    myPosition: 2840,
    icon: "⚡",
    chain: "ETH",
    audited: true,
    risk: "low",
  },
  {
    name: "SkyLend",
    category: "Lending",
    tvl: 12800000,
    apy: 18.2,
    myPosition: 1200,
    icon: "🏦",
    chain: "ETH",
    audited: true,
    risk: "low",
  },
  {
    name: "TRUMP Farm",
    category: "Yield Farm",
    tvl: 8400000,
    apy: 124.8,
    myPosition: 0,
    icon: "🇺🇸",
    chain: "ETH",
    audited: false,
    risk: "high",
  },
  {
    name: "SKY4444 Pool",
    category: "Liquidity",
    tvl: 4200000,
    apy: 88.4,
    myPosition: 5000,
    icon: "⚡",
    chain: "ETH",
    audited: true,
    risk: "medium",
  },
  {
    name: "DogeFarm",
    category: "Yield Farm",
    tvl: 2100000,
    apy: 64.2,
    myPosition: 0,
    icon: "🐕",
    chain: "DOGE",
    audited: false,
    risk: "high",
  },
];

const LIQUIDITY_POOLS = [
  {
    pair: "TRUMP/ETH",
    apy: 48.2,
    tvl: 12400000,
    myLiquidity: 1840,
    volume24h: 2840000,
    fees24h: 7100,
    token0: "🇺🇸",
    token1: "Ξ",
  },
  {
    pair: "SKY4444/USDC",
    apy: 88.4,
    tvl: 4200000,
    myLiquidity: 5000,
    volume24h: 1200000,
    fees24h: 3000,
    token0: "⚡",
    token1: "💵",
  },
  {
    pair: "ETH/USDC",
    apy: 12.4,
    tvl: 28400000,
    myLiquidity: 0,
    volume24h: 8400000,
    fees24h: 21000,
    token0: "Ξ",
    token1: "💵",
  },
  {
    pair: "BTC/ETH",
    apy: 8.2,
    tvl: 42100000,
    myLiquidity: 0,
    volume24h: 12800000,
    fees24h: 32000,
    token0: "₿",
    token1: "Ξ",
  },
];

const RISK_COLORS: Record<string, string> = {
  low: "bg-green-500/10 text-green-400 border-green-500/20",
  medium: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  high: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function DeFiDashboard() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "pools" | "farms" | "positions"
  >("overview");
  const totalTVL = 71800000;
  const myTotalValue =
    PROTOCOLS.reduce((s, p) => s + p.myPosition, 0) +
    LIQUIDITY_POOLS.reduce((s, p) => s + p.myLiquidity, 0);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black flex items-center gap-2">
          <Layers className="h-6 w-6 text-purple-400" />
          DeFi Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
          Yield farming, liquidity pools, lending, and protocol analytics
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          {
            label: "Platform TVL",
            value: `$${(totalTVL / 1000000).toFixed(1)}M`,
            icon: Layers,
            color: "text-purple-400",
          },
          {
            label: "My DeFi Value",
            value: `$${myTotalValue.toLocaleString()}`,
            icon: Coins,
            color: "text-green-400",
          },
          {
            label: "Best APY",
            value: "124.8%",
            icon: TrendingUp,
            color: "text-yellow-400",
          },
          {
            label: "Active Positions",
            value: "4",
            icon: Star,
            color: "text-blue-400",
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

      {/* Tabs */}
      <div className="flex gap-2">
        {(["overview", "pools", "farms", "positions"] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${activeTab === tab ? "bg-purple-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="space-y-4">
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold">
                Total Value Locked (TVL)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-black text-purple-400 mb-2">
                ${(totalTVL / 1000000).toFixed(1)}M
              </p>
              <ResponsiveContainer width="100%" height={150}>
                <AreaChart data={TVL_DATA}>
                  <defs>
                    <linearGradient id="tvlGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 10, fill: "#6b7280" }}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: "#6b7280" }}
                    tickFormatter={v => `$${(v / 1000000).toFixed(0)}M`}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#1a1a2e",
                      border: "1px solid #333",
                      borderRadius: 8,
                      fontSize: 11,
                    }}
                    formatter={(v: any) => `$${(v / 1000000).toFixed(2)}M`}
                  />
                  <Area
                    type="monotone"
                    dataKey="tvl"
                    stroke="#8b5cf6"
                    fill="url(#tvlGrad)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {PROTOCOLS.map((p, i) => (
              <Card
                key={p.name}
                className="border-border/50 hover:border-purple-500/20 transition-colors cursor-pointer"
                onClick={() => toast.info(`Opening ${p.name}`)}
              >
                <CardContent className="pt-4">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{p.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-bold">{p.name}</p>
                        {p.audited && (
                          <Badge className="text-xs bg-green-500/10 text-green-400 border-green-500/20">
                            Audited
                          </Badge>
                        )}
                        <Badge
                          className={`text-xs capitalize ${RISK_COLORS[p.risk]}`}
                        >
                          {p.risk} risk
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {p.category} · {p.chain}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-black text-green-400">
                        {p.apy}%
                      </p>
                      <p className="text-xs text-muted-foreground">APY</p>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      TVL: ${(p.tvl / 1000000).toFixed(1)}M
                    </span>
                    {p.myPosition > 0 && (
                      <span className="text-green-400 font-medium">
                        My: ${p.myPosition.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <Button
                    className="w-full mt-3 h-8 text-xs bg-purple-600 text-white border-0"
                    onClick={e => {
                      e.stopPropagation();
                      toast.success(`Entering ${p.name} position`);
                    }}
                  >
                    {p.myPosition > 0 ? "Manage Position" : "Enter Position"}{" "}
                    <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === "pools" && (
        <div className="space-y-3">
          {LIQUIDITY_POOLS.map((pool, i) => (
            <motion.div
              key={pool.pair}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="border-border/50">
                <CardContent className="py-4 px-4">
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-2 shrink-0">
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-xl border-2 border-background">
                        {pool.token0}
                      </div>
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-xl border-2 border-background">
                        {pool.token1}
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="font-black">{pool.pair}</p>
                      <div className="flex gap-4 text-xs text-muted-foreground mt-0.5">
                        <span>TVL: ${(pool.tvl / 1000000).toFixed(1)}M</span>
                        <span>
                          24h Vol: ${(pool.volume24h / 1000000).toFixed(1)}M
                        </span>
                        <span>24h Fees: ${pool.fees24h.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-black text-green-400">
                        {pool.apy}%
                      </p>
                      <p className="text-xs text-muted-foreground">APY</p>
                    </div>
                    <div className="text-right">
                      {pool.myLiquidity > 0 ? (
                        <div>
                          <p className="text-sm font-bold text-blue-400">
                            ${pool.myLiquidity.toLocaleString()}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            My liquidity
                          </p>
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          className="h-8 text-xs bg-purple-600 text-white border-0"
                          onClick={() =>
                            toast.success(`Adding liquidity to ${pool.pair}`)
                          }
                        >
                          <Plus className="h-3.5 w-3.5 mr-1" />
                          Add
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === "farms" && (
        <div className="space-y-3">
          {PROTOCOLS.filter(p => p.category === "Yield Farm").map((farm, i) => (
            <Card key={farm.name} className="border-border/50">
              <CardContent className="py-4 px-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{farm.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-black">{farm.name}</p>
                      <Badge
                        className={`text-xs capitalize ${RISK_COLORS[farm.risk]}`}
                      >
                        {farm.risk} risk
                      </Badge>
                      {!farm.audited && (
                        <Badge className="text-xs bg-red-500/10 text-red-400 border-red-500/20">
                          Unaudited
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      TVL: ${(farm.tvl / 1000000).toFixed(1)}M · {farm.chain}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-yellow-400">
                      {farm.apy}%
                    </p>
                    <p className="text-xs text-muted-foreground">APY</p>
                  </div>
                  <Button
                    className="bg-yellow-500 text-black border-0 font-bold"
                    size="sm"
                    onClick={() => toast.success(`Entering ${farm.name} farm`)}
                  >
                    Farm Now
                  </Button>
                </div>
                {!farm.audited && (
                  <div className="mt-2 p-2 rounded-lg bg-red-500/5 border border-red-500/20 flex items-center gap-2 text-xs text-red-400">
                    <Info className="h-3.5 w-3.5 shrink-0" />
                    High risk: unaudited contract. Only invest what you can
                    afford to lose.
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "positions" && (
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-gradient-to-r from-purple-950/40 to-blue-950/40 border border-purple-500/20">
            <p className="text-sm text-muted-foreground">
              Total DeFi Portfolio Value
            </p>
            <p className="text-3xl font-black text-purple-400">
              ${myTotalValue.toLocaleString()}
            </p>
            <p className="text-sm text-green-400 mt-1">
              ▲ +$842.20 (+12.4%) this week
            </p>
          </div>
          {[
            ...PROTOCOLS.filter(p => p.myPosition > 0),
            ...LIQUIDITY_POOLS.filter(p => p.myLiquidity > 0).map(p => ({
              name: p.pair,
              category: "LP",
              myPosition: p.myLiquidity,
              apy: p.apy,
              icon: `${p.token0}${p.token1}`,
              risk: "low" as const,
              audited: true,
              tvl: p.tvl,
              chain: "ETH",
            })),
          ].map((pos, i) => (
            <Card key={pos.name} className="border-border/50">
              <CardContent className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{pos.icon}</span>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{pos.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {pos.category} · {pos.apy}% APY
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-green-400">
                      ${pos.myPosition.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      +${((pos.myPosition * pos.apy) / 100 / 365).toFixed(2)}
                      /day
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 text-xs"
                    onClick={() => toast.info(`Managing ${pos.name}`)}
                  >
                    Manage
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
