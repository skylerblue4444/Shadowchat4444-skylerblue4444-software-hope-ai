import { useState } from "react";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart2,
  Plus,
  RefreshCw,
  Download,
  Eye,
  EyeOff,
  ArrowUpRight,
  ArrowDownRight,
  Coins,
  Star,
  Shield,
  Clock,
  ChevronRight,
  Filter,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const PORTFOLIO = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    amount: 0.00842,
    price: 100012,
    value: 842.1,
    cost: 680.0,
    icon: "₿",
    color: "#f97316",
    change24h: +2.14,
    allocation: 28.4,
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    amount: 0.248,
    price: 3398,
    value: 843.1,
    cost: 920.0,
    icon: "Ξ",
    color: "#8b5cf6",
    change24h: -1.23,
    allocation: 28.4,
  },
  {
    symbol: "TRUMP",
    name: "TRUMP Token",
    amount: 12450,
    price: 0.0234,
    value: 291.33,
    cost: 180.0,
    icon: "🇺🇸",
    color: "#ef4444",
    change24h: +8.42,
    allocation: 9.8,
  },
  {
    symbol: "SKY4444",
    name: "SkyBlue Token",
    amount: 85000,
    price: 0.025,
    value: 2125.0,
    cost: 1200.0,
    icon: "⚡",
    color: "#06b6d4",
    change24h: +15.21,
    allocation: 71.6,
  },
  {
    symbol: "DOGE",
    name: "Dogecoin",
    amount: 2840,
    price: 0.1501,
    value: 426.28,
    cost: 380.0,
    icon: "🐕",
    color: "#eab308",
    change24h: +5.67,
    allocation: 14.4,
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    amount: 420,
    price: 1.0,
    value: 420.0,
    cost: 420.0,
    icon: "💵",
    color: "#22c55e",
    change24h: 0.0,
    allocation: 14.2,
  },
];

const HISTORY_DATA = [
  { date: "May 8", value: 3800 },
  { date: "May 9", value: 4100 },
  { date: "May 10", value: 3950 },
  { date: "May 11", value: 4400 },
  { date: "May 12", value: 4280 },
  { date: "May 13", value: 4680 },
  { date: "May 14", value: 4947 },
];

const TRANSACTIONS = [
  {
    type: "buy",
    symbol: "SKY4444",
    amount: 50000,
    price: 0.02,
    total: 1000,
    date: "May 10",
    status: "completed",
  },
  {
    type: "sell",
    symbol: "ETH",
    amount: 0.1,
    price: 3420,
    total: 342,
    date: "May 9",
    status: "completed",
  },
  {
    type: "buy",
    symbol: "TRUMP",
    amount: 5000,
    price: 0.0215,
    total: 107.5,
    date: "May 8",
    status: "completed",
  },
  {
    type: "buy",
    symbol: "BTC",
    amount: 0.00842,
    price: 80750,
    total: 680,
    date: "Apr 28",
    status: "completed",
  },
];

export default function PortfolioTracker() {
  const [tab, setTab] = useState<"overview" | "assets" | "history" | "tax">(
    "overview"
  );
  const [hideBalance, setHideBalance] = useState(false);
  const [timeframe, setTimeframe] = useState("7D");

  const totalValue = PORTFOLIO.reduce((s, p) => s + p.value, 0);
  const totalCost = PORTFOLIO.reduce((s, p) => s + p.cost, 0);
  const totalPnL = totalValue - totalCost;
  const totalPnLPct = ((totalPnL / totalCost) * 100).toFixed(2);

  const pieData = PORTFOLIO.map(p => ({
    name: p.symbol,
    value: p.value,
    color: p.color,
  }));

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <BarChart2 className="h-6 w-6 text-blue-400" />
            Portfolio Tracker
          </h1>
          <p className="text-sm text-muted-foreground">
            Real-time multi-chain portfolio analytics
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setHideBalance(!hideBalance)}
            className="h-9 w-9 rounded-xl bg-muted/30 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          >
            {hideBalance ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => toast.success("Syncing portfolio...")}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Sync
          </Button>
          <Button
            className="bg-blue-600 text-white border-0"
            size="sm"
            onClick={() => toast.info("Add asset")}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Asset
          </Button>
        </div>
      </div>

      {/* Total Value Card */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950/40 to-violet-950/40 border border-blue-500/20">
        <p className="text-sm text-muted-foreground mb-1">
          Total Portfolio Value
        </p>
        <p className="text-4xl font-black">
          {hideBalance ? "••••••" : `$${totalValue.toFixed(2)}`}
        </p>
        <div className="flex items-center gap-3 mt-2">
          <div
            className={`flex items-center gap-1 text-sm font-bold ${totalPnL >= 0 ? "text-green-400" : "text-red-400"}`}
          >
            {totalPnL >= 0 ? (
              <ArrowUpRight className="h-4 w-4" />
            ) : (
              <ArrowDownRight className="h-4 w-4" />
            )}
            {hideBalance
              ? "••••"
              : `${totalPnL >= 0 ? "+" : ""}$${totalPnL.toFixed(2)} (${totalPnLPct}%)`}
          </div>
          <span className="text-xs text-muted-foreground">All time P&L</span>
        </div>
        <div className="flex gap-2 mt-3">
          {["1D", "7D", "1M", "3M", "1Y", "ALL"].map(tf => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${timeframe === tf ? "bg-blue-600 text-white" : "bg-white/10 text-white/60"}`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {(["overview", "assets", "history", "tax"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${tab === t ? "bg-blue-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="space-y-4">
          {/* Chart */}
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold">
                Portfolio Value — {timeframe}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={HISTORY_DATA}>
                  <defs>
                    <linearGradient id="portGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 10, fill: "#6b7280" }}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: "#6b7280" }}
                    tickFormatter={v => `$${v}`}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#1a1a2e",
                      border: "1px solid #333",
                      borderRadius: 8,
                      fontSize: 11,
                    }}
                    formatter={(v: any) => `$${v.toFixed(2)}`}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#3b82f6"
                    fill="url(#portGrad)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Allocation Pie */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold">Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {pieData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: "#1a1a2e",
                        border: "1px solid #333",
                        borderRadius: 8,
                        fontSize: 11,
                      }}
                      formatter={(v: any) => `$${v.toFixed(2)}`}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-1 mt-2">
                  {PORTFOLIO.map(p => (
                    <div
                      key={p.symbol}
                      className="flex items-center gap-1.5 text-xs"
                    >
                      <div
                        className="h-2.5 w-2.5 rounded-full shrink-0"
                        style={{ background: p.color }}
                      />
                      <span className="text-muted-foreground">{p.symbol}</span>
                      <span className="font-medium ml-auto">
                        {((p.value / totalValue) * 100).toFixed(1)}%
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold">
                  Top Performers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[...PORTFOLIO]
                  .sort((a, b) => b.change24h - a.change24h)
                  .slice(0, 5)
                  .map(asset => (
                    <div key={asset.symbol} className="flex items-center gap-2">
                      <span className="text-lg">{asset.icon}</span>
                      <div className="flex-1">
                        <p className="text-sm font-bold">{asset.symbol}</p>
                        <p className="text-xs text-muted-foreground">
                          ${hideBalance ? "••••" : asset.value.toFixed(2)}
                        </p>
                      </div>
                      <span
                        className={`text-sm font-bold ${asset.change24h >= 0 ? "text-green-400" : "text-red-400"}`}
                      >
                        {asset.change24h >= 0 ? "+" : ""}
                        {asset.change24h}%
                      </span>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {tab === "assets" && (
        <div className="space-y-2">
          {PORTFOLIO.map((asset, i) => {
            const pnl = asset.value - asset.cost;
            const pnlPct = ((pnl / asset.cost) * 100).toFixed(2);
            return (
              <motion.div
                key={asset.symbol}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="border-border/50">
                  <CardContent className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="h-10 w-10 rounded-full flex items-center justify-center text-2xl shrink-0"
                        style={{ background: `${asset.color}20` }}
                      >
                        {asset.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-black">{asset.symbol}</p>
                          <span className="text-xs text-muted-foreground">
                            {asset.name}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {asset.amount} @ ${asset.price.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-black">
                          {hideBalance ? "••••" : `$${asset.value.toFixed(2)}`}
                        </p>
                        <p
                          className={`text-xs font-bold ${pnl >= 0 ? "text-green-400" : "text-red-400"}`}
                        >
                          {pnl >= 0 ? "+" : ""}
                          {hideBalance ? "••" : `$${pnl.toFixed(2)}`} ({pnlPct}
                          %)
                        </p>
                      </div>
                      <div
                        className={`text-sm font-bold ${asset.change24h >= 0 ? "text-green-400" : "text-red-400"} shrink-0`}
                      >
                        {asset.change24h >= 0 ? "▲" : "▼"}{" "}
                        {Math.abs(asset.change24h)}%
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}

      {tab === "history" && (
        <div className="space-y-3">
          {TRANSACTIONS.map((tx, i) => (
            <Card key={i} className="border-border/50">
              <CardContent className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 ${tx.type === "buy" ? "bg-green-500/10" : "bg-red-500/10"}`}
                  >
                    {tx.type === "buy" ? (
                      <TrendingUp className="h-4 w-4 text-green-400" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm capitalize">
                      {tx.type} {tx.amount} {tx.symbol}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      @ ${tx.price.toLocaleString()} · {tx.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-black">${tx.total.toFixed(2)}</p>
                    <Badge className="text-xs bg-green-500/10 text-green-400 border-green-500/20">
                      ✓ {tx.status}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "tax" && (
        <div className="space-y-4">
          <Card className="border-yellow-500/20 bg-yellow-500/3">
            <CardContent className="py-4 px-4">
              <div className="flex items-center gap-3">
                <Shield className="h-8 w-8 text-yellow-400 shrink-0" />
                <div>
                  <p className="font-black">2025 Tax Report</p>
                  <p className="text-sm text-muted-foreground">
                    Estimated capital gains:{" "}
                    <span className="text-yellow-400 font-bold">
                      ${totalPnL.toFixed(2)}
                    </span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Consult a tax professional. This is not tax advice.
                  </p>
                </div>
                <Button
                  className="ml-auto bg-yellow-500 text-black border-0 font-bold shrink-0"
                  size="sm"
                  onClick={() => toast.success("Downloading tax report CSV")}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </CardContent>
          </Card>
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                label: "Short-term Gains",
                value: `$${(totalPnL * 0.6).toFixed(2)}`,
                sub: "Held < 1 year",
              },
              {
                label: "Long-term Gains",
                value: `$${(totalPnL * 0.4).toFixed(2)}`,
                sub: "Held > 1 year",
              },
              {
                label: "Est. Tax Owed",
                value: `$${(totalPnL * 0.22).toFixed(2)}`,
                sub: "22% rate estimate",
              },
              {
                label: "Transactions",
                value: String(TRANSACTIONS.length),
                sub: "This tax year",
              },
            ].map(({ label, value, sub }) => (
              <Card key={label} className="border-border/50">
                <CardContent className="pt-4 pb-3">
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="text-xl font-black">{value}</p>
                  <p className="text-xs text-muted-foreground">{sub}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
