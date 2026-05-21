import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Command,
  Zap,
  TrendingUp,
  Users,
  DollarSign,
  Shield,
  Globe,
  Activity,
  Brain,
  Star,
} from "lucide-react";
import { toast } from "sonner";

const quickActions = [
  {
    icon: "💱",
    label: "Trade",
    route: "/dashboard/shadow-exchange",
    color: "bg-blue-600",
  },
  {
    icon: "💎",
    label: "Stake",
    route: "/dashboard/staking",
    color: "bg-violet-600",
  },
  {
    icon: "🎨",
    label: "Mint NFT",
    route: "/dashboard/nft-creator",
    color: "bg-pink-600",
  },
  {
    icon: "🏛️",
    label: "Vote DAO",
    route: "/dashboard/dao-governance",
    color: "bg-orange-600",
  },
  {
    icon: "🤖",
    label: "AI Trade",
    route: "/dashboard/shadow-ai-trader",
    color: "bg-green-600",
  },
  {
    icon: "📱",
    label: "Pay",
    route: "/dashboard/shadow-pay",
    color: "bg-cyan-600",
  },
  {
    icon: "🎮",
    label: "GameFi",
    route: "/dashboard/shadow-game-fi",
    color: "bg-yellow-600",
  },
  {
    icon: "📊",
    label: "Analytics",
    route: "/dashboard/shadow-analytics",
    color: "bg-red-600",
  },
];

const liveMetrics = [
  {
    label: "Platform Users",
    value: "847,293",
    change: "+2,847 today",
    color: "text-blue-400",
  },
  {
    label: "24H Volume",
    value: "$12.7B",
    change: "+18.4%",
    color: "text-green-400",
  },
  {
    label: "SKY4444 Price",
    value: "$0.047",
    change: "+12.3%",
    color: "text-violet-400",
  },
  {
    label: "TVL",
    value: "$847M",
    change: "+$24M today",
    color: "text-orange-400",
  },
  {
    label: "NFTs Minted",
    value: "2.4M",
    change: "+8,247 today",
    color: "text-pink-400",
  },
  {
    label: "Active Nodes",
    value: "8,247",
    change: "All healthy",
    color: "text-cyan-400",
  },
];

const recentActivity = [
  {
    user: "whale_0x847f",
    action: "Bought 847,000 SKY4444",
    time: "2s ago",
    type: "buy",
  },
  {
    user: "SkylerBlue_IT",
    action: "Deployed new IT automation",
    time: "14s ago",
    type: "deploy",
  },
  {
    user: "nft_collector_99",
    action: "Minted ShadowApe #8247",
    time: "31s ago",
    type: "mint",
  },
  {
    user: "dao_voter_x",
    action: "Voted YES on Proposal #47",
    time: "1m ago",
    type: "vote",
  },
  {
    user: "defi_farmer_z",
    action: "Added $247K to SKY/ETH pool",
    time: "2m ago",
    type: "defi",
  },
  {
    user: "trader_alpha",
    action: "AI bot profit: +$8,247",
    time: "3m ago",
    type: "profit",
  },
];

export default function ShadowCommand() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick(p => p + 1), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Command className="h-6 w-6 text-indigo-400" /> ShadowCommand
          </h1>
          <p className="text-sm text-muted-foreground">
            The ultimate command center — 500 pages, one platform, infinite
            possibilities
          </p>
        </div>
        <Badge className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white">
          500th Page 🎉
        </Badge>
      </div>

      {/* Milestone Banner */}
      <div className="rounded-xl bg-gradient-to-r from-indigo-900/50 via-violet-900/50 to-pink-900/50 border border-indigo-500/30 p-4 text-center">
        <p className="text-3xl font-black bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
          500 PAGES MILESTONE 🏆
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          ShadowChat is now the world's most comprehensive Web3 super-platform
        </p>
        <div className="grid grid-cols-4 gap-2 mt-3">
          {[
            ["500+", "Pages"],
            ["532+", "TS Files"],
            ["470+", "Commits"],
            ["100+", "Features"],
          ].map(([v, l], i) => (
            <div key={i} className="rounded-lg bg-black/30 p-2">
              <p className="font-black text-lg text-white">{v}</p>
              <p className="text-xs text-muted-foreground">{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Live Metrics */}
      <div className="grid grid-cols-3 gap-2">
        {liveMetrics.map((m, i) => (
          <Card key={i} className="border-border/50">
            <CardContent className="py-2 px-3">
              <p className={`font-black text-sm ${m.color}`}>{m.value}</p>
              <p className="text-xs text-muted-foreground">{m.label}</p>
              <p className="text-xs text-green-400">{m.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Zap className="h-4 w-4 text-yellow-400" /> Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-2">
            {quickActions.map((a, i) => (
              <button
                key={i}
                onClick={() => toast.success(`Opening ${a.label}...`)}
                className={`${a.color} rounded-xl p-3 text-center text-white hover:opacity-90 transition-opacity`}
              >
                <div className="text-xl">{a.icon}</div>
                <div className="text-xs font-bold mt-1">{a.label}</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Live Activity */}
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Activity className="h-4 w-4 text-green-400" /> Live Platform
            Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {recentActivity.map((a, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-1.5 border-b border-border/30 last:border-0"
            >
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${a.type === "buy" ? "bg-green-400" : a.type === "profit" ? "bg-violet-400" : a.type === "mint" ? "bg-pink-400" : "bg-blue-400"}`}
                />
                <div>
                  <p className="text-xs font-bold">{a.user}</p>
                  <p className="text-xs text-muted-foreground">{a.action}</p>
                </div>
              </div>
              <span className="text-xs text-muted-foreground shrink-0">
                {a.time}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Platform Health */}
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Shield className="h-4 w-4 text-green-400" /> Platform Health
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {[
            ["API Response", "12ms", "99.99%", 99],
            ["Database", "Healthy", "847K QPS", 97],
            ["CDN", "Global", "47 Nodes", 100],
            ["Security", "No Threats", "24/7 Monitor", 100],
          ].map(([s, v, d, p], i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-24 text-xs font-bold shrink-0">{s}</div>
              <Progress value={Number(p)} className="h-1.5 flex-1" />
              <div className="text-right shrink-0">
                <p className="text-xs font-bold text-green-400">{v}</p>
                <p className="text-xs text-muted-foreground">{d}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Skyler Blue CTA */}
      <div className="rounded-xl bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border border-cyan-500/20 p-4 text-center">
        <p className="font-black text-sm">🌟 Skyler Blue IT Resolutions</p>
        <p className="text-xl font-black text-cyan-400 mt-1">479-406-7123</p>
        <p className="text-xs text-muted-foreground mb-3">
          skylerblue4444@gmail.com • Arkansas's Premier IT Partner
        </p>
        <Button
          className="w-full bg-cyan-600 text-white border-0 font-black"
          onClick={() =>
            toast.success("Connecting you to Skyler Blue IT Resolutions!")
          }
        >
          <Zap className="h-4 w-4 mr-2" /> Contact Skyler Blue IT Now
        </Button>
      </div>
    </div>
  );
}
