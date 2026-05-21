import { useState } from "react";
import { motion } from "framer-motion";
import {
  Copy,
  TrendingUp,
  Users,
  Star,
  DollarSign,
  Shield,
  CheckCircle,
  ChevronRight,
  BarChart2,
  Zap,
  Award,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Search,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const TRADERS = [
  {
    id: "t1",
    name: "CryptoWhale_Pro",
    avatar: "🐋",
    followers: 8420,
    winRate: 78.4,
    roi30d: +142.8,
    roi90d: +284.2,
    aum: "$2.4M",
    trades: 1284,
    style: "Aggressive",
    risk: "High",
    fee: "8%",
    verified: true,
    copying: false,
    specialties: ["BTC", "ETH", "Futures"],
  },
  {
    id: "t2",
    name: "SkyBlue_Trader",
    avatar: "⚡",
    followers: 4200,
    winRate: 84.2,
    roi30d: +68.4,
    roi90d: +198.4,
    aum: "$840K",
    trades: 2840,
    style: "Conservative",
    risk: "Low",
    fee: "5%",
    verified: true,
    copying: true,
    specialties: ["SKY4444", "TRUMP", "Spot"],
  },
  {
    id: "t3",
    name: "DeFi_Legend",
    avatar: "🦁",
    followers: 6800,
    winRate: 71.2,
    roi30d: +98.4,
    roi90d: +248.0,
    aum: "$1.8M",
    trades: 984,
    style: "Moderate",
    risk: "Medium",
    fee: "6%",
    verified: true,
    copying: false,
    specialties: ["DeFi", "Altcoins", "NFTs"],
  },
  {
    id: "t4",
    name: "NFT_King_X",
    avatar: "👑",
    followers: 2100,
    winRate: 68.8,
    roi30d: +52.4,
    roi90d: +124.8,
    aum: "$420K",
    trades: 480,
    style: "Moderate",
    risk: "Medium",
    fee: "7%",
    verified: false,
    copying: false,
    specialties: ["NFTs", "ETH", "Metaverse"],
  },
  {
    id: "t5",
    name: "QuantBot_Alpha",
    avatar: "🤖",
    followers: 12400,
    winRate: 91.2,
    roi30d: +38.4,
    roi90d: +148.8,
    aum: "$8.4M",
    trades: 48200,
    style: "Algorithmic",
    risk: "Low",
    fee: "10%",
    verified: true,
    copying: false,
    specialties: ["BTC", "ETH", "Arbitrage"],
  },
  {
    id: "t6",
    name: "TRUMP_Maxi_88",
    avatar: "🇺🇸",
    followers: 3400,
    winRate: 72.8,
    roi30d: +184.2,
    roi90d: +420.0,
    aum: "$280K",
    trades: 240,
    style: "Aggressive",
    risk: "Very High",
    fee: "5%",
    verified: false,
    copying: false,
    specialties: ["TRUMP", "Memecoins", "Futures"],
  },
];

const RISK_COLORS: Record<string, string> = {
  Low: "bg-green-500/10 text-green-400 border-green-500/20",
  Medium: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  High: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  "Very High": "bg-red-500/10 text-red-400 border-red-500/20",
};

const MY_COPIES = [
  {
    trader: "SkyBlue_Trader",
    allocated: 500,
    pnl: +84.2,
    pnlPct: +16.84,
    since: "May 1",
    status: "active",
  },
];

export default function CopyTrading() {
  const [tab, setTab] = useState<"discover" | "my-copies" | "leaderboard">(
    "discover"
  );
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("roi30d");
  const [copyingId, setCopyingId] = useState<string | null>(null);

  const filtered = TRADERS.filter(
    t =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.specialties.some(s => s.toLowerCase().includes(search.toLowerCase()))
  ).sort((a, b) => {
    if (sortBy === "roi30d") return b.roi30d - a.roi30d;
    if (sortBy === "winRate") return b.winRate - a.winRate;
    if (sortBy === "followers") return b.followers - a.followers;
    return 0;
  });

  const startCopy = (trader: (typeof TRADERS)[0]) => {
    setCopyingId(trader.id);
    setTimeout(() => {
      setCopyingId(null);
      toast.success(`Now copying ${trader.name}! Allocate funds to start.`);
    }, 1500);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black flex items-center gap-2">
          <Copy className="h-6 w-6 text-purple-400" />
          Copy Trading
        </h1>
        <p className="text-sm text-muted-foreground">
          Follow top traders and automatically mirror their trades
        </p>
      </div>

      {/* My Copy Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          {
            label: "Copying",
            value: "1 Trader",
            icon: Users,
            color: "text-purple-400",
          },
          {
            label: "Allocated",
            value: "$500",
            icon: DollarSign,
            color: "text-blue-400",
          },
          {
            label: "Copy PnL",
            value: "+$84.20",
            icon: TrendingUp,
            color: "text-green-400",
          },
        ].map(({ label, value, icon: Icon, color }) => (
          <Card key={label} className="border-border/50">
            <CardContent className="pt-3 pb-2 text-center">
              <Icon className={`h-4 w-4 ${color} mx-auto mb-1`} />
              <p className="font-black">{value}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {(["discover", "my-copies", "leaderboard"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${tab === t ? "bg-purple-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t.replace("-", " ")}
          </button>
        ))}
      </div>

      {tab === "discover" && (
        <div className="space-y-4">
          {/* Search & Sort */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search traders or tokens..."
                className="pl-9"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <select
              className="px-3 py-2 rounded-xl bg-muted border border-border/50 text-sm"
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
            >
              <option value="roi30d">30D ROI</option>
              <option value="winRate">Win Rate</option>
              <option value="followers">Followers</option>
            </select>
          </div>

          {/* Trader Cards */}
          <div className="space-y-3">
            {filtered.map((trader, i) => (
              <motion.div
                key={trader.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card
                  className={`border-border/50 hover:border-purple-500/20 transition-all ${trader.copying ? "border-purple-500/30 bg-purple-500/3" : ""}`}
                >
                  <CardContent className="py-4 px-4">
                    <div className="flex items-start gap-3">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-2xl shrink-0">
                        {trader.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-black">{trader.name}</p>
                          {trader.verified && (
                            <Badge className="text-xs bg-blue-500/10 text-blue-400 border-blue-500/20">
                              ✓ Verified
                            </Badge>
                          )}
                          {trader.copying && (
                            <Badge className="text-xs bg-purple-500/10 text-purple-400 border-purple-500/20">
                              Copying
                            </Badge>
                          )}
                          <Badge
                            className={`text-xs ${RISK_COLORS[trader.risk]}`}
                          >
                            {trader.risk} Risk
                          </Badge>
                        </div>
                        <div className="flex gap-1 mt-1 flex-wrap">
                          {trader.specialties.map(s => (
                            <span
                              key={s}
                              className="text-xs px-2 py-0.5 rounded-full bg-muted/40 text-muted-foreground"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                        <div className="grid grid-cols-4 gap-2 mt-2 text-xs">
                          <div>
                            <p className="text-muted-foreground">30D ROI</p>
                            <p
                              className={`font-black ${trader.roi30d >= 0 ? "text-green-400" : "text-red-400"}`}
                            >
                              {trader.roi30d >= 0 ? "+" : ""}
                              {trader.roi30d}%
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Win Rate</p>
                            <p className="font-black text-blue-400">
                              {trader.winRate}%
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Followers</p>
                            <p className="font-black">
                              {trader.followers.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Fee</p>
                            <p className="font-black text-yellow-400">
                              {trader.fee}
                            </p>
                          </div>
                        </div>
                      </div>
                      <Button
                        className={`shrink-0 ${trader.copying ? "bg-muted text-muted-foreground" : "bg-purple-600 text-white"} border-0 text-xs`}
                        size="sm"
                        disabled={copyingId === trader.id}
                        onClick={() => !trader.copying && startCopy(trader)}
                      >
                        {copyingId === trader.id
                          ? "Starting..."
                          : trader.copying
                            ? "Copying ✓"
                            : "Copy"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {tab === "my-copies" && (
        <div className="space-y-3">
          {MY_COPIES.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Copy className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p>You're not copying any traders yet</p>
              <Button
                className="mt-3 bg-purple-600 text-white border-0"
                size="sm"
                onClick={() => setTab("discover")}
              >
                Discover Traders
              </Button>
            </div>
          ) : (
            MY_COPIES.map((copy, i) => (
              <Card
                key={copy.trader}
                className="border-purple-500/20 bg-purple-500/3"
              >
                <CardContent className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-2xl">
                      ⚡
                    </div>
                    <div className="flex-1">
                      <p className="font-black">{copy.trader}</p>
                      <p className="text-xs text-muted-foreground">
                        Copying since {copy.since} · ${copy.allocated} allocated
                      </p>
                      <p
                        className={`text-sm font-black mt-1 ${copy.pnl >= 0 ? "text-green-400" : "text-red-400"}`}
                      >
                        {copy.pnl >= 0 ? "+" : ""}${copy.pnl.toFixed(2)} (
                        {copy.pnlPct >= 0 ? "+" : ""}
                        {copy.pnlPct}%)
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 text-xs"
                        onClick={() => toast.info("Adjusting allocation")}
                      >
                        Adjust
                      </Button>
                      <Button
                        size="sm"
                        className="h-7 text-xs bg-red-600 text-white border-0"
                        onClick={() => toast.success("Stopped copying")}
                      >
                        Stop
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}

      {tab === "leaderboard" && (
        <div className="space-y-3">
          {TRADERS.sort((a, b) => b.roi30d - a.roi30d).map((trader, i) => (
            <Card key={trader.id} className="border-border/50">
              <CardContent className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center font-black text-sm shrink-0 ${i < 3 ? "bg-yellow-500/10 text-yellow-400" : "bg-muted text-muted-foreground"}`}
                  >
                    #{i + 1}
                  </div>
                  <span className="text-2xl">{trader.avatar}</span>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{trader.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {trader.followers.toLocaleString()} followers ·{" "}
                      {trader.winRate}% win rate
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-black ${trader.roi30d >= 0 ? "text-green-400" : "text-red-400"}`}
                    >
                      {trader.roi30d >= 0 ? "+" : ""}
                      {trader.roi30d}%
                    </p>
                    <p className="text-xs text-muted-foreground">30D ROI</p>
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
