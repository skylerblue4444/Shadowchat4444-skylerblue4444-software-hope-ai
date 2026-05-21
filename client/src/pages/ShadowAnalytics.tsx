import { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Globe,
  Zap,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const METRICS = [
  {
    label: "Total Users",
    value: "44,444",
    change: "+12.4%",
    up: true,
    emoji: "👥",
  },
  {
    label: "Daily Active",
    value: "8,888",
    change: "+8.2%",
    up: true,
    emoji: "⚡",
  },
  {
    label: "Revenue (MTD)",
    value: "$444K",
    change: "+22.1%",
    up: true,
    emoji: "💰",
  },
  {
    label: "SKY4444 Volume",
    value: "1.2M",
    change: "+44.4%",
    up: true,
    emoji: "📈",
  },
  {
    label: "NFTs Minted",
    value: "12,444",
    change: "+5.8%",
    up: true,
    emoji: "🖼️",
  },
  {
    label: "Churn Rate",
    value: "2.1%",
    change: "-0.4%",
    up: false,
    emoji: "📉",
  },
];

const COUNTRIES = [
  { name: "United States", users: "18,244", pct: 41, flag: "🇺🇸" },
  { name: "China", users: "8,888", pct: 20, flag: "🇨🇳" },
  { name: "Germany", users: "4,444", pct: 10, flag: "🇩🇪" },
  { name: "Japan", users: "3,333", pct: 7.5, flag: "🇯🇵" },
  { name: "India", users: "2,222", pct: 5, flag: "🇮🇳" },
  { name: "Other", users: "7,313", pct: 16.5, flag: "🌍" },
];

const CONTENT_METRICS = [
  { type: "Posts", count: "244K", engagement: "8.4%", emoji: "📝" },
  { type: "Videos", count: "44K", engagement: "14.2%", emoji: "🎬" },
  { type: "NFTs", count: "12K", engagement: "22.1%", emoji: "🖼️" },
  { type: "Streams", count: "1,244", engagement: "31.4%", emoji: "📡" },
];

const REVENUE_BREAKDOWN = [
  { source: "Trading Fees", amount: "$188K", pct: 42 },
  { source: "NFT Marketplace", amount: "$88K", pct: 20 },
  { source: "IT Services", amount: "$66K", pct: 15 },
  { source: "Premium Subs", amount: "$44K", pct: 10 },
  { source: "Advertising", amount: "$33K", pct: 7.5 },
  { source: "Other", amount: "$25K", pct: 5.5 },
];

export default function ShadowAnalytics() {
  const [tab, setTab] = useState<"overview" | "users" | "revenue" | "content">(
    "overview"
  );
  const [period, setPeriod] = useState("30d");

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-cyan-400" />
            ShadowAnalytics
          </h1>
          <p className="text-sm text-muted-foreground">
            Platform-wide analytics and business intelligence
          </p>
        </div>
        <div className="flex gap-1">
          {["7d", "30d", "90d", "1y"].map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${period === p ? "bg-cyan-600 text-white" : "bg-muted text-muted-foreground"}`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        {(["overview", "users", "revenue", "content"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-cyan-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {METRICS.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Card className="border-border/50">
                  <CardContent className="py-3 px-3">
                    <p className="text-xl mb-1">{m.emoji}</p>
                    <p className="font-black text-sm text-cyan-400">
                      {m.value}
                    </p>
                    <p className="text-xs text-muted-foreground">{m.label}</p>
                    <div
                      className={`flex items-center gap-0.5 text-xs font-bold mt-0.5 ${m.up ? "text-green-400" : "text-red-400"}`}
                    >
                      {m.up ? (
                        <ArrowUpRight className="h-3 w-3" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3" />
                      )}
                      {m.change}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Simulated chart bars */}
          <Card className="border-border/50">
            <CardContent className="py-4 px-4">
              <p className="font-bold text-sm mb-3">
                Daily Active Users — Last 14 Days
              </p>
              <div className="flex items-end gap-1 h-20">
                {[55, 62, 58, 70, 75, 68, 80, 77, 85, 82, 88, 84, 92, 89].map(
                  (h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: i * 0.04, duration: 0.4 }}
                      className="flex-1 bg-cyan-500/40 rounded-t-sm hover:bg-cyan-500/60 transition-colors cursor-pointer"
                      onClick={() =>
                        toast.info(
                          `Day ${i + 1}: ${Math.round(h * 88.88)} users`
                        )
                      }
                    />
                  )
                )}
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>May 1</span>
                <span>May 7</span>
                <span>May 14</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "users" && (
        <div className="space-y-3">
          <Card className="border-border/50">
            <CardContent className="py-4 px-4">
              <p className="font-bold text-sm mb-3">Users by Country</p>
              {COUNTRIES.map((c, i) => (
                <div key={c.name} className="mb-2">
                  <div className="flex items-center justify-between text-xs mb-0.5">
                    <span>
                      {c.flag} {c.name}
                    </span>
                    <span className="font-bold text-cyan-400">
                      {c.users} ({c.pct}%)
                    </span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${c.pct}%` }}
                      transition={{ delay: i * 0.08, duration: 0.5 }}
                      className="h-full bg-cyan-500 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "Avg Session", value: "8.4 min", emoji: "⏱️" },
              { label: "Retention (D7)", value: "64%", emoji: "🔄" },
              { label: "New Users/Day", value: "+244", emoji: "🆕" },
              { label: "Premium Users", value: "4,444", emoji: "⭐" },
            ].map(s => (
              <Card key={s.label} className="border-border/50 text-center">
                <CardContent className="pt-2.5 pb-2.5">
                  <p className="text-lg">{s.emoji}</p>
                  <p className="font-black text-xs text-cyan-400">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {tab === "revenue" && (
        <div className="space-y-3">
          <Card className="border-cyan-500/20 bg-cyan-900/5">
            <CardContent className="py-4 px-4">
              <p className="text-xs text-muted-foreground">
                Total Revenue (MTD)
              </p>
              <p className="text-3xl font-black text-cyan-400">$444,000</p>
              <p className="text-xs text-green-400 font-bold">
                +22.1% vs last month
              </p>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="py-4 px-4">
              <p className="font-bold text-sm mb-3">Revenue by Source</p>
              {REVENUE_BREAKDOWN.map((r, i) => (
                <div key={r.source} className="mb-2">
                  <div className="flex items-center justify-between text-xs mb-0.5">
                    <span>{r.source}</span>
                    <span className="font-bold text-cyan-400">
                      {r.amount} ({r.pct}%)
                    </span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${r.pct}%` }}
                      transition={{ delay: i * 0.08, duration: 0.5 }}
                      className="h-full bg-cyan-500 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          <Button
            className="w-full h-10 text-xs bg-cyan-600 text-white border-0"
            onClick={() => toast.info("Downloading revenue report CSV...")}
          >
            Export Revenue Report
          </Button>
        </div>
      )}

      {tab === "content" && (
        <div className="space-y-3">
          {CONTENT_METRICS.map((c, i) => (
            <Card key={c.type} className="border-border/50">
              <CardContent className="py-3 px-4 flex items-center gap-3">
                <span className="text-2xl">{c.emoji}</span>
                <div className="flex-1">
                  <p className="font-bold text-sm">{c.type}</p>
                  <p className="text-xs text-muted-foreground">
                    {c.count} total pieces
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-black text-sm text-cyan-400">
                    {c.engagement}
                  </p>
                  <p className="text-xs text-muted-foreground">Engagement</p>
                </div>
              </CardContent>
            </Card>
          ))}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "Total Likes", value: "2.4M", emoji: "❤️" },
              { label: "Comments", value: "444K", emoji: "💬" },
              { label: "Shares", value: "188K", emoji: "🔗" },
            ].map(s => (
              <Card key={s.label} className="border-border/50 text-center">
                <CardContent className="pt-2.5 pb-2.5">
                  <p className="text-lg">{s.emoji}</p>
                  <p className="font-black text-xs text-cyan-400">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
