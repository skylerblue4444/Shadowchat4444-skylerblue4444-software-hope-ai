import { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Zap,
  Globe,
  Download,
  RefreshCw,
  Activity,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const METRICS = [
  {
    label: "Total Revenue",
    value: "$88,888",
    change: "+144%",
    up: true,
    icon: DollarSign,
    color: "text-green-400",
  },
  {
    label: "Active Users",
    value: "44,444",
    change: "+88%",
    up: true,
    icon: Users,
    color: "text-blue-400",
  },
  {
    label: "SKY4444 Price",
    value: "$0.0444",
    change: "+44.4%",
    up: true,
    icon: TrendingUp,
    color: "text-purple-400",
  },
  {
    label: "IT Clients",
    value: "44",
    change: "+22%",
    up: true,
    icon: Activity,
    color: "text-cyan-400",
  },
];

const REVENUE_DATA = [
  { month: "Jan", it: 12000, crypto: 8000, nft: 3000 },
  { month: "Feb", it: 14000, crypto: 12000, nft: 5000 },
  { month: "Mar", it: 16000, crypto: 18000, nft: 8000 },
  { month: "Apr", it: 18000, crypto: 22000, nft: 12000 },
  { month: "May", it: 22000, crypto: 44000, nft: 22000 },
];

const TOP_COUNTRIES = [
  { country: "United States", users: "18,444", pct: 41, flag: "🇺🇸" },
  { country: "China", users: "8,888", pct: 20, flag: "🇨🇳" },
  { country: "United Kingdom", users: "4,444", pct: 10, flag: "🇬🇧" },
  { country: "Germany", users: "2,222", pct: 5, flag: "🇩🇪" },
  { country: "Japan", users: "1,888", pct: 4, flag: "🇯🇵" },
];

const CHANNEL_DATA = [
  { channel: "Organic Search", users: 14222, pct: 32, color: "#6366f1" },
  { channel: "Social Media", users: 11111, pct: 25, color: "#ec4899" },
  { channel: "Referral", users: 8888, pct: 20, color: "#22c55e" },
  { channel: "Direct", users: 6666, pct: 15, color: "#f59e0b" },
  { channel: "Paid Ads", users: 3557, pct: 8, color: "#06b6d4" },
];

export default function ShadowAnalyticsPro() {
  const [period, setPeriod] = useState("30d");
  const [tab, setTab] = useState<"overview" | "revenue" | "users" | "crypto">(
    "overview"
  );

  const maxRevenue = Math.max(
    ...REVENUE_DATA.map(d => d.it + d.crypto + d.nft)
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-violet-400" />
            Analytics Pro
          </h1>
          <p className="text-sm text-muted-foreground">
            Business intelligence, revenue, users, and crypto performance
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="h-8 text-xs font-bold"
            onClick={() => toast.success("Refreshing data...")}
          >
            <RefreshCw className="h-3.5 w-3.5 mr-1" />
            Refresh
          </Button>
          <Button
            size="sm"
            className="h-8 text-xs bg-violet-600 text-white border-0 font-bold"
            onClick={() => toast.success("Exporting analytics report...")}
          >
            <Download className="h-3.5 w-3.5 mr-1" />
            Export
          </Button>
        </div>
      </div>

      {/* Period Selector */}
      <div className="flex gap-1.5">
        {["7d", "30d", "90d", "1y", "all"].map(p => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${period === p ? "bg-violet-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-2">
        {METRICS.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.07 }}
          >
            <Card className="border-border/50">
              <CardContent className="py-3 px-4">
                <div className="flex items-center justify-between mb-1">
                  <m.icon className={`h-4 w-4 ${m.color}`} />
                  <Badge
                    className={`text-xs ${m.up ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-red-500/10 text-red-400 border-red-500/20"}`}
                  >
                    {m.change}
                  </Badge>
                </div>
                <p className={`font-black text-xl ${m.color}`}>{m.value}</p>
                <p className="text-xs text-muted-foreground">{m.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="flex gap-2">
        {(["overview", "revenue", "users", "crypto"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-violet-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="space-y-3">
          {/* Revenue Bar Chart */}
          <Card className="border-border/50">
            <CardContent className="py-4 px-4">
              <p className="font-bold text-sm mb-3">
                Monthly Revenue Breakdown
              </p>
              <div className="flex items-end gap-2 h-32">
                {REVENUE_DATA.map((d, i) => {
                  const total = d.it + d.crypto + d.nft;
                  const pct = (total / maxRevenue) * 100;
                  return (
                    <div
                      key={d.month}
                      className="flex-1 flex flex-col items-center gap-1"
                    >
                      <div
                        className="w-full flex flex-col-reverse rounded-t overflow-hidden"
                        style={{ height: `${pct}%`, minHeight: 8 }}
                      >
                        <motion.div
                          className="bg-violet-500"
                          style={{ height: `${(d.it / total) * 100}%` }}
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          transition={{ delay: i * 0.1 }}
                        />
                        <motion.div
                          className="bg-green-500"
                          style={{ height: `${(d.crypto / total) * 100}%` }}
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          transition={{ delay: i * 0.1 + 0.05 }}
                        />
                        <motion.div
                          className="bg-pink-500"
                          style={{ height: `${(d.nft / total) * 100}%` }}
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          transition={{ delay: i * 0.1 + 0.1 }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">{d.month}</p>
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-3 mt-2 text-xs">
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-violet-500 inline-block" />
                  IT Services
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-green-500 inline-block" />
                  Crypto
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-pink-500 inline-block" />
                  NFT
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Top Countries */}
          <Card className="border-border/50">
            <CardContent className="py-4 px-4">
              <p className="font-bold text-sm mb-3">Top Countries</p>
              <div className="space-y-2">
                {TOP_COUNTRIES.map(c => (
                  <div key={c.country} className="flex items-center gap-2">
                    <span className="text-base shrink-0">{c.flag}</span>
                    <div className="flex-1">
                      <div className="flex justify-between text-xs mb-0.5">
                        <span className="font-medium">{c.country}</span>
                        <span className="text-muted-foreground">{c.users}</span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-violet-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${c.pct}%` }}
                          transition={{ duration: 0.6 }}
                        />
                      </div>
                    </div>
                    <p className="text-xs font-bold text-violet-400 w-8 text-right">
                      {c.pct}%
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "revenue" && (
        <div className="space-y-2">
          {[
            {
              label: "IT Services MRR",
              value: "$22,000",
              change: "+22%",
              up: true,
            },
            {
              label: "Crypto Trading Fees",
              value: "$44,000",
              change: "+88%",
              up: true,
            },
            {
              label: "NFT Royalties",
              value: "$22,000",
              change: "+144%",
              up: true,
            },
            {
              label: "ICO Raise (Phase 1)",
              value: "$444,444",
              change: "Completed",
              up: true,
            },
            {
              label: "Marketplace Fees",
              value: "$8,888",
              change: "+44%",
              up: true,
            },
          ].map(r => (
            <Card key={r.label} className="border-border/50">
              <CardContent className="py-2.5 px-4 flex items-center justify-between">
                <p className="font-bold text-sm">{r.label}</p>
                <div className="text-right">
                  <p className="font-black text-sm text-green-400">{r.value}</p>
                  <p
                    className={`text-xs font-bold ${r.up ? "text-green-400" : "text-red-400"}`}
                  >
                    {r.change}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "users" && (
        <div className="space-y-3">
          <div className="space-y-2">
            <p className="text-xs font-bold text-muted-foreground">
              ACQUISITION CHANNELS
            </p>
            {CHANNEL_DATA.map(c => (
              <div key={c.channel} className="flex items-center gap-2">
                <p className="text-xs font-medium w-28 shrink-0">{c.channel}</p>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: c.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${c.pct}%` }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
                <p className="text-xs font-bold w-8 text-right">{c.pct}%</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "DAU", value: "12,444" },
              { label: "WAU", value: "28,888" },
              { label: "MAU", value: "44,444" },
              { label: "Churn Rate", value: "0.4%" },
            ].map(s => (
              <Card key={s.label} className="border-border/50 text-center">
                <CardContent className="py-2.5 px-2">
                  <p className="font-black text-base text-violet-400">
                    {s.value}
                  </p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {tab === "crypto" && (
        <div className="space-y-2">
          {[
            {
              token: "SKY4444",
              price: "$0.0444",
              mcap: "$4.44M",
              vol: "$444K",
              holders: "44,444",
            },
            {
              token: "TRUMP",
              price: "$44.22",
              mcap: "$44.2B",
              vol: "$4.4B",
              holders: "888,888",
            },
            {
              token: "BTC",
              price: "$104,444",
              mcap: "$2.1T",
              vol: "$44B",
              holders: "∞",
            },
          ].map(t => (
            <Card key={t.token} className="border-border/50">
              <CardContent className="py-3 px-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-black text-sm">{t.token}</p>
                  <p className="font-black text-sm text-green-400">{t.price}</p>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div>
                    <p className="text-muted-foreground">Market Cap</p>
                    <p className="font-bold">{t.mcap}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">24h Volume</p>
                    <p className="font-bold">{t.vol}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Holders</p>
                    <p className="font-bold">{t.holders}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
