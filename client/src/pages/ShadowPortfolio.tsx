import { useState } from "react";
import { motion } from "framer-motion";
import {
  PieChart,
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Eye,
  EyeOff,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const HOLDINGS = [
  {
    asset: "SKY4444",
    amount: "444,444",
    value: 19555,
    pct: 35.2,
    change24h: 12.4,
    allocation: "#6366f1",
  },
  {
    asset: "BTC",
    amount: "0.184",
    value: 19217,
    pct: 34.6,
    change24h: 2.1,
    allocation: "#f59e0b",
  },
  {
    asset: "TRUMP",
    amount: "88,888",
    value: 8889,
    pct: 16.0,
    change24h: 44.4,
    allocation: "#ef4444",
  },
  {
    asset: "ETH",
    amount: "1.44",
    value: 5486,
    pct: 9.9,
    change24h: 3.2,
    allocation: "#8b5cf6",
  },
  {
    asset: "USDT",
    amount: "2,444",
    value: 2444,
    pct: 4.4,
    change24h: 0,
    allocation: "#22c55e",
  },
];

const HISTORY = [
  { date: "May 15", value: 55591 },
  { date: "May 14", value: 52000 },
  { date: "May 13", value: 48000 },
  { date: "May 12", value: 51000 },
  { date: "May 11", value: 47000 },
  { date: "May 10", value: 44000 },
  { date: "May 9", value: 42000 },
];

const TRANSACTIONS = [
  {
    type: "buy",
    asset: "SKY4444",
    amount: "44,444",
    price: "$0.040",
    total: "$1,777",
    date: "May 14, 2026",
    status: "completed",
  },
  {
    type: "sell",
    asset: "BTC",
    amount: "0.02",
    price: "$104,200",
    total: "$2,084",
    date: "May 12, 2026",
    status: "completed",
  },
  {
    type: "buy",
    asset: "TRUMP",
    amount: "10,000",
    price: "$0.068",
    total: "$680",
    date: "May 10, 2026",
    status: "completed",
  },
  {
    type: "stake",
    asset: "SKY4444",
    amount: "100,000",
    price: "—",
    total: "Staking",
    date: "May 8, 2026",
    status: "staking",
  },
];

export default function ShadowPortfolio() {
  const [tab, setTab] = useState<
    "overview" | "holdings" | "history" | "transactions"
  >("overview");
  const [hideBalance, setHideBalance] = useState(false);
  const totalValue = HOLDINGS.reduce((sum, h) => sum + h.value, 0);
  const totalChange = 8.4;

  const maxVal = Math.max(...HISTORY.map(h => h.value));

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <PieChart className="h-6 w-6 text-indigo-400" />
            My Portfolio
          </h1>
          <p className="text-sm text-muted-foreground">
            Full crypto portfolio analytics and tracking
          </p>
        </div>
        <Button
          size="sm"
          variant="ghost"
          className="h-8 w-8 p-0"
          onClick={() => setHideBalance(h => !h)}
        >
          {hideBalance ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Total Value Card */}
      <Card className="border-indigo-500/20 bg-gradient-to-br from-indigo-900/20 to-purple-900/10">
        <CardContent className="py-4 px-4">
          <p className="text-xs text-muted-foreground mb-1">
            Total Portfolio Value
          </p>
          <p className="font-black text-3xl">
            {hideBalance ? "••••••" : `$${totalValue.toLocaleString()}`}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <ArrowUpRight className="h-4 w-4 text-green-400" />
            <p className="text-sm font-bold text-green-400">
              +{totalChange}% (+$4,318) this week
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-3">
            {[
              { label: "24h PnL", value: "+$1,244", color: "text-green-400" },
              { label: "7d PnL", value: "+$4,318", color: "text-green-400" },
              { label: "All-Time", value: "+$22,591", color: "text-green-400" },
            ].map(s => (
              <div
                key={s.label}
                className="text-center p-2 rounded-xl bg-black/10"
              >
                <p className={`font-black text-xs ${s.color}`}>
                  {hideBalance ? "••••" : s.value}
                </p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-2">
        {(["overview", "holdings", "history", "transactions"] as const).map(
          t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-indigo-600 text-white" : "bg-muted text-muted-foreground"}`}
            >
              {t}
            </button>
          )
        )}
      </div>

      {tab === "overview" && (
        <div className="space-y-3">
          {/* Allocation Bars */}
          <Card className="border-border/50">
            <CardContent className="py-4 px-4">
              <p className="font-bold text-sm mb-3">Asset Allocation</p>
              <div className="h-4 rounded-full overflow-hidden flex mb-3">
                {HOLDINGS.map(h => (
                  <motion.div
                    key={h.asset}
                    className="h-full"
                    style={{
                      backgroundColor: h.allocation,
                      width: `${h.pct}%`,
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${h.pct}%` }}
                    transition={{ duration: 0.8 }}
                  />
                ))}
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {HOLDINGS.map(h => (
                  <div key={h.asset} className="flex items-center gap-2">
                    <div
                      className="h-2.5 w-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: h.allocation }}
                    />
                    <span className="text-xs text-muted-foreground">
                      {h.asset}
                    </span>
                    <span className="text-xs font-bold ml-auto">{h.pct}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          {/* Mini Chart */}
          <Card className="border-border/50">
            <CardContent className="py-4 px-4">
              <p className="font-bold text-sm mb-3">7-Day Performance</p>
              <div className="flex items-end gap-1 h-16">
                {HISTORY.map((h, i) => (
                  <div
                    key={h.date}
                    className="flex-1 flex flex-col items-center gap-1"
                  >
                    <motion.div
                      className="w-full rounded-t-sm bg-indigo-500"
                      style={{ height: `${(h.value / maxVal) * 100}%` }}
                      initial={{ height: 0 }}
                      animate={{ height: `${(h.value / maxVal) * 100}%` }}
                      transition={{ delay: i * 0.08, duration: 0.5 }}
                    />
                    <p
                      className="text-xs text-muted-foreground"
                      style={{ fontSize: "9px" }}
                    >
                      {h.date.split(" ")[1]}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "holdings" && (
        <div className="space-y-2">
          {HOLDINGS.map((h, i) => (
            <motion.div
              key={h.asset}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Card className="border-border/50">
                <CardContent className="py-3 px-4 flex items-center gap-3">
                  <div
                    className="h-10 w-10 rounded-full flex items-center justify-center font-black text-xs shrink-0"
                    style={{
                      backgroundColor: h.allocation + "20",
                      color: h.allocation,
                    }}
                  >
                    {h.asset.slice(0, 3)}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{h.asset}</p>
                    <p className="text-xs text-muted-foreground">
                      {hideBalance ? "••••" : h.amount}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-sm">
                      {hideBalance ? "••••" : `$${h.value.toLocaleString()}`}
                    </p>
                    <p
                      className={`text-xs font-bold flex items-center justify-end gap-0.5 ${h.change24h >= 0 ? "text-green-400" : "text-red-400"}`}
                    >
                      {h.change24h >= 0 ? (
                        <ArrowUpRight className="h-3 w-3" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3" />
                      )}
                      {h.change24h >= 0 ? "+" : ""}
                      {h.change24h}%
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "history" && (
        <div className="space-y-2">
          {HISTORY.map((h, i) => (
            <Card key={h.date} className="border-border/50">
              <CardContent className="py-3 px-4 flex items-center justify-between">
                <p className="text-sm font-medium">{h.date}</p>
                <div className="text-right">
                  <p className="font-black text-sm">
                    {hideBalance ? "••••" : `$${h.value.toLocaleString()}`}
                  </p>
                  {i < HISTORY.length - 1 && (
                    <p
                      className={`text-xs font-bold ${h.value > HISTORY[i + 1].value ? "text-green-400" : "text-red-400"}`}
                    >
                      {h.value > HISTORY[i + 1].value ? "+" : ""}
                      {Math.round(
                        ((h.value - HISTORY[i + 1].value) /
                          HISTORY[i + 1].value) *
                          100
                      )}
                      %
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "transactions" && (
        <div className="space-y-2">
          {TRANSACTIONS.map((tx, i) => (
            <Card key={i} className="border-border/50">
              <CardContent className="py-3 px-4 flex items-center gap-3">
                <div
                  className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 font-bold text-xs ${tx.type === "buy" ? "bg-green-500/10 text-green-400" : tx.type === "sell" ? "bg-red-500/10 text-red-400" : "bg-blue-500/10 text-blue-400"}`}
                >
                  {tx.type.toUpperCase().slice(0, 3)}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm">
                    {tx.asset}{" "}
                    {tx.type === "stake"
                      ? "Staked"
                      : tx.type === "buy"
                        ? "Bought"
                        : "Sold"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {tx.amount} @ {tx.price} · {tx.date}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-black text-sm">
                    {hideBalance ? "••••" : tx.total}
                  </p>
                  <Badge className="text-xs bg-green-500/10 text-green-400 border-green-500/20">
                    ✓ {tx.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
