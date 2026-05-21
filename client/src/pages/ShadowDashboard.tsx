import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  TrendingUp,
  TrendingDown,
  Zap,
  Bell,
  Users,
  Coins,
  MessageSquare,
  Star,
  ArrowUpRight,
  Activity,
  Globe,
  Shield,
  Flame,
  Crown,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const PRICES = [
  {
    symbol: "SKY4444",
    price: "$0.0444",
    change: "+44.4%",
    up: true,
    icon: "🌌",
  },
  { symbol: "TRUMP", price: "$44.22", change: "+8.8%", up: true, icon: "🇺🇸" },
  { symbol: "BTC", price: "$104,444", change: "+2.1%", up: true, icon: "₿" },
  { symbol: "ETH", price: "$4,444", change: "-1.4%", up: false, icon: "Ξ" },
  { symbol: "DOGE", price: "$0.444", change: "+14.4%", up: true, icon: "🐕" },
];

const QUICK_ACTIONS = [
  { label: "Buy SKY4444", icon: "🌌", color: "#6366f1", route: "/ico" },
  { label: "Send Crypto", icon: "💸", color: "#22c55e", route: "/wallet" },
  { label: "Trade", icon: "📈", color: "#f59e0b", route: "/trading" },
  { label: "Stake", icon: "🔒", color: "#8b5cf6", route: "/staking" },
  {
    label: "NFT Market",
    icon: "🎨",
    color: "#ec4899",
    route: "/nft-marketplace",
  },
  { label: "IT Services", icon: "💻", color: "#06b6d4", route: "/it" },
  { label: "AI Tools", icon: "🤖", color: "#ef4444", route: "/ai-tools" },
  { label: "DAO Vote", icon: "🗳️", color: "#84cc16", route: "/dao" },
];

const ACTIVITY = [
  {
    text: "You earned 444 SKY4444 staking rewards",
    time: "2m ago",
    icon: "🔒",
  },
  { text: "ShadowPunk #4444 listed for 44 ETH", time: "8m ago", icon: "🎨" },
  { text: "New IT client inquiry from TechCorp", time: "15m ago", icon: "💻" },
  { text: "DAO Proposal #44 voting started", time: "1h ago", icon: "🗳️" },
  { text: "SKY4444 hit all-time high $0.0444", time: "2h ago", icon: "🌌" },
];

const PORTFOLIO_ITEMS = [
  {
    name: "SKY4444",
    amount: "444,444",
    value: "$19,733",
    change: "+44.4%",
    up: true,
  },
  {
    name: "TRUMP",
    amount: "4,444",
    value: "$196,514",
    change: "+8.8%",
    up: true,
  },
  { name: "BTC", amount: "0.444", value: "$46,373", change: "+2.1%", up: true },
  { name: "ETH", amount: "4.44", value: "$19,731", change: "-1.4%", up: false },
];

export default function ShadowDashboard() {
  const [greeting] = useState(() => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  });

  const totalPortfolio = "$282,351";

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{greeting},</p>
          <h1 className="text-2xl font-black flex items-center gap-2">
            SkylerBlue.eth <Crown className="h-5 w-5 text-yellow-400" />
          </h1>
          <p className="text-xs text-muted-foreground">
            CEO · ShadowChat Empire · SKY4444 Founder
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Portfolio Value</p>
          <p className="font-black text-xl text-green-400">{totalPortfolio}</p>
          <p className="text-xs text-green-400 font-bold">+$44,444 today</p>
        </div>
      </div>

      {/* Live Price Ticker */}
      <Card className="border-border/50 overflow-hidden">
        <CardContent className="py-2 px-0">
          <div className="flex gap-4 overflow-x-auto px-4 pb-1">
            {PRICES.map(p => (
              <div key={p.symbol} className="shrink-0 text-center">
                <p className="text-xs font-bold">
                  {p.icon} {p.symbol}
                </p>
                <p className="text-xs font-black">{p.price}</p>
                <p
                  className={`text-xs font-bold ${p.up ? "text-green-400" : "text-red-400"}`}
                >
                  {p.change}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div>
        <p className="text-xs font-bold text-muted-foreground mb-2">
          QUICK ACTIONS
        </p>
        <div className="grid grid-cols-4 gap-2">
          {QUICK_ACTIONS.map((action, i) => (
            <motion.button
              key={action.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="p-2 rounded-xl border border-border/50 text-center hover:border-opacity-50 transition-all"
              style={{
                borderColor: action.color + "30",
                backgroundColor: action.color + "10",
              }}
              onClick={() => toast.success(`Opening ${action.label}...`)}
            >
              <p className="text-2xl">{action.icon}</p>
              <p className="text-xs font-bold mt-0.5 leading-tight">
                {action.label}
              </p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Portfolio Snapshot */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-bold text-muted-foreground">PORTFOLIO</p>
          <Button
            size="sm"
            variant="ghost"
            className="h-6 text-xs text-blue-400 font-bold p-0"
            onClick={() => toast.success("Opening full portfolio...")}
          >
            View All <ArrowUpRight className="h-3 w-3 ml-0.5" />
          </Button>
        </div>
        <div className="space-y-1.5">
          {PORTFOLIO_ITEMS.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <Card className="border-border/50">
                <CardContent className="py-2 px-4 flex items-center gap-3">
                  <div className="flex-1">
                    <p className="font-bold text-sm">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.amount}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-sm">{item.value}</p>
                    <p
                      className={`text-xs font-bold ${item.up ? "text-green-400" : "text-red-400"}`}
                    >
                      {item.change}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-2">
        {[
          {
            label: "IT Clients",
            value: "44",
            icon: Users,
            color: "text-blue-400",
          },
          {
            label: "Staked SKY",
            value: "44.4K",
            icon: Coins,
            color: "text-purple-400",
          },
          { label: "Unread", value: "8", icon: Bell, color: "text-red-400" },
        ].map(s => (
          <Card key={s.label} className="border-border/50 text-center">
            <CardContent className="py-2.5 px-2">
              <s.icon className={`h-5 w-5 mx-auto mb-1 ${s.color}`} />
              <p className={`font-black text-sm ${s.color}`}>{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Activity Feed */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-bold text-muted-foreground">
            LIVE ACTIVITY
          </p>
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            <p className="text-xs text-green-400 font-bold">Live</p>
          </div>
        </div>
        <div className="space-y-1.5">
          {ACTIVITY.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Card className="border-border/50">
                <CardContent className="py-2 px-4 flex items-center gap-3">
                  <span className="text-base shrink-0">{item.icon}</span>
                  <p className="text-xs flex-1">{item.text}</p>
                  <p className="text-xs text-muted-foreground shrink-0">
                    {item.time}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Platform Health */}
      <Card className="border-green-500/20 bg-green-900/5">
        <CardContent className="py-3 px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-green-400" />
              <p className="font-bold text-sm">Platform Status</p>
            </div>
            <Badge className="bg-green-500/10 text-green-400 border-green-500/20 text-xs">
              🟢 All Systems Operational
            </Badge>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {[
              { label: "API", value: "99.99%", color: "text-green-400" },
              { label: "DEX", value: "99.97%", color: "text-green-400" },
              { label: "CDN", value: "100%", color: "text-green-400" },
            ].map(s => (
              <div key={s.label} className="text-center">
                <p className={`font-black text-xs ${s.color}`}>{s.value}</p>
                <p className="text-xs text-muted-foreground">
                  {s.label} uptime
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
