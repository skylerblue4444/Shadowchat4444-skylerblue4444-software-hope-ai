import { useState } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Search,
  Star,
  BarChart2,
  RefreshCw,
  ChevronUp,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const COINS = [
  {
    rank: 1,
    symbol: "BTC",
    name: "Bitcoin",
    price: 104284,
    change24h: +2.84,
    change7d: +12.4,
    marketCap: 2060000000000,
    volume: 48400000000,
    emoji: "₿",
    color: "text-orange-400",
  },
  {
    rank: 2,
    symbol: "ETH",
    name: "Ethereum",
    price: 3842,
    change24h: +4.24,
    change7d: +18.4,
    marketCap: 462000000000,
    volume: 24200000000,
    emoji: "Ξ",
    color: "text-blue-400",
  },
  {
    rank: 3,
    symbol: "TRUMP",
    name: "TRUMP Coin",
    price: 28.44,
    change24h: +84.2,
    change7d: +284.0,
    marketCap: 28400000000,
    volume: 8400000000,
    emoji: "🇺🇸",
    color: "text-red-400",
  },
  {
    rank: 4,
    symbol: "SKY4444",
    name: "SkyBlue Token",
    price: 0.12,
    change24h: +44.4,
    change7d: +124.0,
    marketCap: 53280000,
    volume: 4440000,
    emoji: "⚡",
    color: "text-yellow-400",
  },
  {
    rank: 5,
    symbol: "DOGE",
    name: "Dogecoin",
    price: 0.284,
    change24h: +8.4,
    change7d: +28.4,
    marketCap: 41200000000,
    volume: 4820000000,
    emoji: "🐕",
    color: "text-yellow-300",
  },
  {
    rank: 6,
    symbol: "SOL",
    name: "Solana",
    price: 248,
    change24h: +6.2,
    change7d: +22.4,
    marketCap: 116000000000,
    volume: 8240000000,
    emoji: "◎",
    color: "text-purple-400",
  },
  {
    rank: 7,
    symbol: "BNB",
    name: "BNB",
    price: 684,
    change24h: -1.2,
    change7d: +4.8,
    marketCap: 99200000000,
    volume: 2840000000,
    emoji: "⬡",
    color: "text-yellow-500",
  },
  {
    rank: 8,
    symbol: "XMR",
    name: "Monero",
    price: 284,
    change24h: +2.4,
    change7d: +8.4,
    marketCap: 5240000000,
    volume: 284000000,
    emoji: "ɱ",
    color: "text-orange-500",
  },
  {
    rank: 9,
    symbol: "ADA",
    name: "Cardano",
    price: 0.84,
    change24h: -2.4,
    change7d: -8.4,
    marketCap: 29800000000,
    volume: 1240000000,
    emoji: "₳",
    color: "text-blue-300",
  },
  {
    rank: 10,
    symbol: "AVAX",
    name: "Avalanche",
    price: 42.8,
    change24h: +12.4,
    change7d: +28.4,
    marketCap: 17600000000,
    volume: 1840000000,
    emoji: "🔺",
    color: "text-red-500",
  },
];

const TRENDING = [
  { symbol: "TRUMP", change: +284.0, emoji: "🇺🇸" },
  { symbol: "SKY4444", change: +124.0, emoji: "⚡" },
  { symbol: "PEPE", change: +84.4, emoji: "🐸" },
  { symbol: "DOGE", change: +28.4, emoji: "🐕" },
  { symbol: "AVAX", change: +28.4, emoji: "🔺" },
];

const CHART_DATA = [
  { time: "00:00", btc: 101200, eth: 3680 },
  { time: "04:00", btc: 102400, eth: 3720 },
  { time: "08:00", btc: 103100, eth: 3780 },
  { time: "12:00", btc: 102800, eth: 3750 },
  { time: "16:00", btc: 103900, eth: 3810 },
  { time: "20:00", btc: 104284, eth: 3842 },
];

const formatNum = (n: number) => {
  if (n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`;
  if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
  return `$${n.toLocaleString()}`;
};

export default function MarketData() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<
    "rank" | "price" | "change24h" | "marketCap" | "volume"
  >("rank");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [tab, setTab] = useState<"all" | "gainers" | "losers" | "watchlist">(
    "all"
  );
  const [watchlist, setWatchlist] = useState<string[]>([
    "BTC",
    "SKY4444",
    "TRUMP",
  ]);

  const toggleSort = (col: typeof sortBy) => {
    if (sortBy === col) setSortDir(d => (d === "asc" ? "desc" : "asc"));
    else {
      setSortBy(col);
      setSortDir("desc");
    }
  };

  const toggleWatchlist = (symbol: string) => {
    setWatchlist(prev =>
      prev.includes(symbol) ? prev.filter(s => s !== symbol) : [...prev, symbol]
    );
    toast.success(
      watchlist.includes(symbol)
        ? `Removed ${symbol} from watchlist`
        : `Added ${symbol} to watchlist ⭐`
    );
  };

  let displayCoins = [...COINS].filter(
    c =>
      c.symbol.toLowerCase().includes(search.toLowerCase()) ||
      c.name.toLowerCase().includes(search.toLowerCase())
  );

  if (tab === "gainers")
    displayCoins = displayCoins
      .filter(c => c.change24h > 0)
      .sort((a, b) => b.change24h - a.change24h);
  else if (tab === "losers")
    displayCoins = displayCoins
      .filter(c => c.change24h < 0)
      .sort((a, b) => a.change24h - b.change24h);
  else if (tab === "watchlist")
    displayCoins = displayCoins.filter(c => watchlist.includes(c.symbol));
  else
    displayCoins.sort((a, b) => {
      const dir = sortDir === "asc" ? 1 : -1;
      if (sortBy === "rank") return (a.rank - b.rank) * dir;
      if (sortBy === "price") return (a.price - b.price) * dir;
      if (sortBy === "change24h") return (a.change24h - b.change24h) * dir;
      if (sortBy === "marketCap") return (a.marketCap - b.marketCap) * dir;
      return (a.volume - b.volume) * dir;
    });

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <BarChart2 className="h-6 w-6 text-green-400" />
            Market Data
          </h1>
          <p className="text-sm text-muted-foreground">
            Live crypto prices, market cap, and volume
          </p>
        </div>
        <button
          className="text-muted-foreground hover:text-white transition-colors"
          onClick={() => toast.success("Prices refreshed!")}
        >
          <RefreshCw className="h-5 w-5" />
        </button>
      </div>

      {/* Global Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {[
          {
            label: "Total Market Cap",
            value: "$3.84T",
            change: "+4.2%",
            up: true,
          },
          { label: "24h Volume", value: "$284B", change: "+28.4%", up: true },
          { label: "BTC Dominance", value: "53.6%", change: "+0.8%", up: true },
          {
            label: "Fear & Greed",
            value: "78 — Greed",
            change: "↑ Extreme",
            up: true,
          },
        ].map(({ label, value, change, up }) => (
          <Card key={label} className="border-border/50">
            <CardContent className="pt-3 pb-3">
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className="font-black text-sm">{value}</p>
              <p
                className={`text-xs font-bold ${up ? "text-green-400" : "text-red-400"}`}
              >
                {change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mini Chart */}
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-bold">BTC/ETH 24h Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={120}>
            <AreaChart data={CHART_DATA}>
              <defs>
                <linearGradient id="btcGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="time" stroke="#4b5563" tick={{ fontSize: 10 }} />
              <YAxis
                stroke="#4b5563"
                tick={{ fontSize: 10 }}
                domain={["auto", "auto"]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#111827",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Area
                type="monotone"
                dataKey="btc"
                stroke="#f97316"
                fill="url(#btcGrad)"
                name="BTC"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Trending */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        <span className="text-xs text-muted-foreground shrink-0 flex items-center gap-1">
          <TrendingUp className="h-3.5 w-3.5" />
          Trending:
        </span>
        {TRENDING.map(t => (
          <Badge
            key={t.symbol}
            className="shrink-0 bg-green-500/10 text-green-400 border-green-500/20 text-xs cursor-pointer"
            onClick={() => toast.info(`Opening ${t.symbol} chart...`)}
          >
            {t.emoji} {t.symbol} +{t.change}%
          </Badge>
        ))}
      </div>

      {/* Tabs & Search */}
      <div className="flex gap-2 flex-wrap">
        {(["all", "gainers", "losers", "watchlist"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-green-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
        <div className="relative flex-1 min-w-32">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="pl-8 h-8 text-xs"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Market Sentiment */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Bullish", value: 72, color: "bg-green-500" },
          { label: "Neutral", value: 18, color: "bg-yellow-500" },
          { label: "Bearish", value: 10, color: "bg-red-500" },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className="p-2 rounded-xl bg-muted/20 border border-border/30 text-center"
          >
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="font-black text-sm">{value}%</p>
            <div className="h-1 rounded-full bg-muted mt-1">
              <div
                className={`h-full rounded-full ${color}`}
                style={{ width: `${value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Coin List */}
      <div className="space-y-1">
        {displayCoins.map((coin, i) => (
          <motion.div
            key={coin.symbol}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
          >
            <Card
              className="border-border/50 hover:border-border/80 transition-colors cursor-pointer"
              onClick={() => toast.info(`Opening ${coin.name} chart...`)}
            >
              <CardContent className="py-2.5 px-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-4 shrink-0">
                    {coin.rank}
                  </span>
                  <span className={`text-lg font-black ${coin.color} shrink-0`}>
                    {coin.emoji}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-sm">{coin.symbol}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {coin.name}
                    </p>
                  </div>
                  <p className="font-bold text-sm shrink-0">
                    $
                    {coin.price < 1
                      ? coin.price.toFixed(4)
                      : coin.price.toLocaleString()}
                  </p>
                  <div
                    className={`flex items-center gap-0.5 text-xs font-bold shrink-0 ${coin.change24h >= 0 ? "text-green-400" : "text-red-400"}`}
                  >
                    {coin.change24h >= 0 ? (
                      <ArrowUpRight className="h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3" />
                    )}
                    {Math.abs(coin.change24h)}%
                  </div>
                  <p className="text-xs text-muted-foreground hidden md:block shrink-0">
                    {formatNum(coin.marketCap)}
                  </p>
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      toggleWatchlist(coin.symbol);
                    }}
                    className={`shrink-0 ${watchlist.includes(coin.symbol) ? "text-yellow-400" : "text-muted-foreground"}`}
                  >
                    <Star className="h-4 w-4" />
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
        {displayCoins.length === 0 && (
          <div className="text-center py-8 text-muted-foreground text-sm">
            No coins found
          </div>
        )}
      </div>

      {/* Alerts */}
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <Zap className="h-4 w-4 text-yellow-400" />
            Market Alerts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {[
            {
              color: "green",
              text: "✓ Bitcoin broke above $100K resistance — historic milestone",
            },
            {
              color: "yellow",
              text: "⚠ TRUMP Coin up +284% in 7 days — extreme volatility",
            },
            {
              color: "blue",
              text: "📈 SKY4444 showing strong momentum ahead of exchange listing",
            },
          ].map(({ color, text }) => (
            <div
              key={text}
              className={`p-2.5 rounded-xl border border-${color}-700/30 bg-${color}-900/10`}
            >
              <p className={`text-xs text-${color}-300`}>{text}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
