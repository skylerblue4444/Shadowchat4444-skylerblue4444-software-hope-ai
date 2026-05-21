import { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart2,
  TrendingUp,
  Users,
  DollarSign,
  Download,
  Calendar,
  Filter,
  Globe,
  Zap,
  Activity,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const DAILY_DATA = [
  { date: "May 1", users: 38200, revenue: 92400, trades: 14200, nfts: 320 },
  { date: "May 2", users: 41000, revenue: 98100, trades: 15800, nfts: 410 },
  { date: "May 3", users: 39800, revenue: 94200, trades: 14900, nfts: 380 },
  { date: "May 4", users: 43200, revenue: 108000, trades: 17200, nfts: 520 },
  { date: "May 5", users: 45100, revenue: 112400, trades: 18400, nfts: 490 },
  { date: "May 6", users: 44800, revenue: 109800, trades: 17900, nfts: 460 },
  { date: "May 7", users: 48300, revenue: 124200, trades: 19800, nfts: 580 },
  { date: "May 8", users: 47200, revenue: 118900, trades: 18700, nfts: 540 },
  { date: "May 9", users: 49800, revenue: 131000, trades: 21200, nfts: 620 },
  { date: "May 10", users: 51200, revenue: 138400, trades: 22400, nfts: 680 },
  { date: "May 11", users: 50100, revenue: 134200, trades: 21800, nfts: 650 },
  { date: "May 12", users: 52400, revenue: 142800, trades: 23100, nfts: 710 },
  { date: "May 13", users: 53800, revenue: 148200, trades: 24200, nfts: 760 },
  { date: "May 14", users: 55200, revenue: 154100, trades: 25400, nfts: 820 },
];

const REVENUE_BY_SOURCE = [
  { name: "Trading Fees", value: 42, color: "#3b82f6" },
  { name: "NFT Sales", value: 18, color: "#8b5cf6" },
  { name: "IT Services", value: 15, color: "#10b981" },
  { name: "ICO/Staking", value: 12, color: "#f59e0b" },
  { name: "Subscriptions", value: 8, color: "#ef4444" },
  { name: "Marketplace", value: 5, color: "#06b6d4" },
];

const TOP_COUNTRIES = [
  { country: "🇺🇸 United States", users: 89420, revenue: 58200, pct: 31.4 },
  { country: "🇨🇳 China", users: 72180, revenue: 41100, pct: 25.3 },
  { country: "🇪🇺 Europe", users: 54320, revenue: 32800, pct: 19.1 },
  { country: "🇮🇳 India", users: 28940, revenue: 12400, pct: 10.2 },
  { country: "🇦🇪 UAE", users: 18200, revenue: 18900, pct: 6.4 },
];

const KPIS = [
  {
    label: "Monthly Active Users",
    value: "284,921",
    change: "+12.4%",
    up: true,
  },
  { label: "Monthly Revenue", value: "$2.84M", change: "+23.1%", up: true },
  {
    label: "Avg Session Duration",
    value: "24m 18s",
    change: "+8.7%",
    up: true,
  },
  { label: "Churn Rate", value: "2.1%", change: "-0.4%", up: true },
  { label: "TRUMP Volume (30d)", value: "248M", change: "+31.2%", up: true },
  { label: "NFTs Minted (30d)", value: "18,420", change: "+44.8%", up: true },
  { label: "IT Bookings (30d)", value: "1,243", change: "+18.3%", up: true },
  { label: "ICO Raised", value: "$5.7M", change: "+100%", up: true },
];

export default function AdminAnalytics() {
  const [range, setRange] = useState("14d");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <BarChart2 className="h-6 w-6 text-blue-400" />
            Platform Analytics
          </h1>
          <p className="text-sm text-muted-foreground">
            Real-time KPIs, revenue, and growth metrics
          </p>
        </div>
        <div className="flex gap-2">
          {["7d", "14d", "30d", "90d"].map(r => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${range === r ? "bg-blue-600 text-white" : "bg-muted text-muted-foreground"}`}
            >
              {r}
            </button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => toast.success("Report exported")}
          >
            <Download className="h-3.5 w-3.5 mr-1.5" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {KPIS.map(({ label, value, change, up }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <Card className="border-border/50">
              <CardContent className="pt-4 pb-3">
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-xl font-black mt-0.5">{value}</p>
                <p
                  className={`text-xs mt-0.5 ${up ? "text-green-400" : "text-red-400"}`}
                >
                  {change} vs prev period
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold">
              Daily Active Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={DAILY_DATA}>
                <defs>
                  <linearGradient id="usersGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="date" tick={{ fontSize: 9, fill: "#6b7280" }} />
                <YAxis
                  tick={{ fontSize: 9, fill: "#6b7280" }}
                  tickFormatter={v => `${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{
                    background: "#1a1a2e",
                    border: "1px solid #333",
                    borderRadius: 8,
                    fontSize: 11,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#3b82f6"
                  fill="url(#usersGrad)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold">
              Daily Revenue ($)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={DAILY_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="date" tick={{ fontSize: 9, fill: "#6b7280" }} />
                <YAxis
                  tick={{ fontSize: 9, fill: "#6b7280" }}
                  tickFormatter={v => `$${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{
                    background: "#1a1a2e",
                    border: "1px solid #333",
                    borderRadius: 8,
                    fontSize: 11,
                  }}
                  formatter={(v: any) => `$${v.toLocaleString()}`}
                />
                <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold">
              Revenue by Source
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <ResponsiveContainer width={160} height={160}>
                <PieChart>
                  <Pie
                    data={REVENUE_BY_SOURCE}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    dataKey="value"
                  >
                    {REVENUE_BY_SOURCE.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(v: any) => `${v}%`}
                    contentStyle={{
                      background: "#1a1a2e",
                      border: "1px solid #333",
                      borderRadius: 8,
                      fontSize: 11,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-1.5 flex-1">
                {REVENUE_BY_SOURCE.map(s => (
                  <div key={s.name} className="flex items-center gap-2">
                    <div
                      className="h-2.5 w-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: s.color }}
                    />
                    <span className="text-xs flex-1">{s.name}</span>
                    <span className="text-xs font-bold">{s.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold">
              Top Countries by Users & Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {TOP_COUNTRIES.map(({ country, users, revenue, pct }) => (
                <div key={country}>
                  <div className="flex justify-between text-xs mb-1">
                    <span>{country}</span>
                    <span className="text-muted-foreground">
                      {users.toLocaleString()} users · $
                      {(revenue / 1000).toFixed(0)}k rev
                    </span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8 }}
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* NFT + Trades Chart */}
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-bold">
            Trading Volume & NFT Mints (Daily)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={DAILY_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="date" tick={{ fontSize: 9, fill: "#6b7280" }} />
              <YAxis tick={{ fontSize: 9, fill: "#6b7280" }} />
              <Tooltip
                contentStyle={{
                  background: "#1a1a2e",
                  border: "1px solid #333",
                  borderRadius: 8,
                  fontSize: 11,
                }}
              />
              <Line
                type="monotone"
                dataKey="trades"
                stroke="#f59e0b"
                strokeWidth={2}
                dot={false}
                name="Trades"
              />
              <Line
                type="monotone"
                dataKey="nfts"
                stroke="#8b5cf6"
                strokeWidth={2}
                dot={false}
                name="NFT Mints"
              />
              <Legend />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
