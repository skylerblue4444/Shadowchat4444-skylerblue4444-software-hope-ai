import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  Zap,
  RefreshCw,
  Globe,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface CoinEntry {
  rank: number;
  symbol: string;
  name: string;
  price: number;
  change1h: number;
  change24h: number;
  change7d: number;
  marketCap: string;
  volume: string;
  sector: string;
  watchlisted: boolean;
}

const INITIAL_COINS: CoinEntry[] = [
  {
    rank: 1,
    symbol: "BTC",
    name: "Bitcoin",
    price: 67_420,
    change1h: 0.3,
    change24h: 2.1,
    change7d: 8.4,
    marketCap: "$1.33T",
    volume: "$42.1B",
    sector: "Store of Value",
    watchlisted: true,
  },
  {
    rank: 2,
    symbol: "ETH",
    name: "Ethereum",
    price: 3_540,
    change1h: -0.2,
    change24h: 1.8,
    change7d: 6.2,
    marketCap: "$425B",
    volume: "$18.4B",
    sector: "Smart Contracts",
    watchlisted: true,
  },
  {
    rank: 3,
    symbol: "BNB",
    name: "BNB",
    price: 612,
    change1h: 0.1,
    change24h: 0.9,
    change7d: 3.1,
    marketCap: "$89B",
    volume: "$2.1B",
    sector: "Exchange",
    watchlisted: false,
  },
  {
    rank: 4,
    symbol: "SOL",
    name: "Solana",
    price: 172.4,
    change1h: 0.8,
    change24h: 4.2,
    change7d: 12.8,
    marketCap: "$81B",
    volume: "$4.8B",
    sector: "Smart Contracts",
    watchlisted: true,
  },
  {
    rank: 5,
    symbol: "TRUMP",
    name: "TRUMP",
    price: 14.2,
    change1h: 1.2,
    change24h: 6.8,
    change7d: 22.4,
    marketCap: "$28B",
    volume: "$1.9B",
    sector: "Meme",
    watchlisted: true,
  },
  {
    rank: 6,
    symbol: "SKY4444",
    name: "SkyBlue4444",
    price: 0.0842,
    change1h: 2.1,
    change24h: 8.4,
    change7d: 34.2,
    marketCap: "$8.4M",
    volume: "$420K",
    sector: "Platform",
    watchlisted: true,
  },
  {
    rank: 7,
    symbol: "DOGE",
    name: "Dogecoin",
    price: 0.162,
    change1h: -0.4,
    change24h: -1.2,
    change7d: 4.8,
    marketCap: "$24B",
    volume: "$1.2B",
    sector: "Meme",
    watchlisted: false,
  },
  {
    rank: 8,
    symbol: "AVAX",
    name: "Avalanche",
    price: 38.4,
    change1h: 0.6,
    change24h: 3.1,
    change7d: 9.2,
    marketCap: "$16B",
    volume: "$680M",
    sector: "Smart Contracts",
    watchlisted: false,
  },
  {
    rank: 9,
    symbol: "MATIC",
    name: "Polygon",
    price: 0.94,
    change1h: -0.1,
    change24h: 1.4,
    change7d: 5.6,
    marketCap: "$9.2B",
    volume: "$420M",
    sector: "L2",
    watchlisted: false,
  },
  {
    rank: 10,
    symbol: "UNI",
    name: "Uniswap",
    price: 12.8,
    change1h: 0.9,
    change24h: 5.2,
    change7d: 18.4,
    marketCap: "$7.7B",
    volume: "$380M",
    sector: "DeFi",
    watchlisted: false,
  },
  {
    rank: 11,
    symbol: "AAVE",
    name: "Aave",
    price: 184.0,
    change1h: 1.1,
    change24h: 4.8,
    change7d: 14.2,
    marketCap: "$2.7B",
    volume: "$210M",
    sector: "DeFi",
    watchlisted: false,
  },
  {
    rank: 12,
    symbol: "XMR",
    name: "Monero",
    price: 168.0,
    change1h: -0.3,
    change24h: -0.8,
    change7d: 2.1,
    marketCap: "$3.1B",
    volume: "$92M",
    sector: "Privacy",
    watchlisted: true,
  },
  {
    rank: 13,
    symbol: "LINK",
    name: "Chainlink",
    price: 18.4,
    change1h: 0.4,
    change24h: 2.8,
    change7d: 7.4,
    marketCap: "$11B",
    volume: "$520M",
    sector: "Oracle",
    watchlisted: false,
  },
  {
    rank: 14,
    symbol: "FET",
    name: "Fetch.ai",
    price: 2.84,
    change1h: 1.8,
    change24h: 9.2,
    change7d: 28.4,
    marketCap: "$2.4B",
    volume: "$180M",
    sector: "AI",
    watchlisted: false,
  },
  {
    rank: 15,
    symbol: "PEPE",
    name: "Pepe",
    price: 0.0000142,
    change1h: 3.2,
    change24h: 12.4,
    change7d: 42.8,
    marketCap: "$6.0B",
    volume: "$840M",
    sector: "Meme",
    watchlisted: false,
  },
];

const SECTORS = [
  "All",
  "Store of Value",
  "Smart Contracts",
  "DeFi",
  "Meme",
  "AI",
  "L2",
  "Privacy",
  "Oracle",
  "Exchange",
  "Platform",
];

export default function ShadowIndex() {
  const [coins, setCoins] = useState(INITIAL_COINS);
  const [search, setSearch] = useState("");
  const [sector, setSector] = useState("All");
  const [sortBy, setSortBy] = useState<
    "rank" | "change24h" | "change7d" | "marketCap"
  >("rank");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCoins(prev =>
        prev.map(c => ({
          ...c,
          price: c.price * (1 + (Math.random() - 0.498) * 0.002),
          change1h: c.change1h + (Math.random() - 0.5) * 0.1,
        }))
      );
      setLastUpdate(new Date());
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const toggleWatchlist = (symbol: string) => {
    setCoins(prev =>
      prev.map(c =>
        c.symbol === symbol ? { ...c, watchlisted: !c.watchlisted } : c
      )
    );
    toast.success(
      `${coins.find(c => c.symbol === symbol)?.watchlisted ? "Removed from" : "Added to"} watchlist!`
    );
  };

  const handleSort = (col: typeof sortBy) => {
    if (sortBy === col) setSortDir(d => (d === "asc" ? "desc" : "asc"));
    else {
      setSortBy(col);
      setSortDir("desc");
    }
  };

  const filtered = coins
    .filter(
      c =>
        (sector === "All" || c.sector === sector) &&
        (c.symbol.toLowerCase().includes(search.toLowerCase()) ||
          c.name.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) => {
      const mult = sortDir === "asc" ? 1 : -1;
      if (sortBy === "rank") return (a.rank - b.rank) * mult;
      if (sortBy === "change24h") return (a.change24h - b.change24h) * mult;
      if (sortBy === "change7d") return (a.change7d - b.change7d) * mult;
      return 0;
    });

  const totalMktCap = "$2.18T";
  const totalVol = "$84.2B";
  const btcDom = "61.0%";

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Globe className="h-6 w-6 text-teal-400" />
            ShadowIndex
          </h1>
          <p className="text-sm text-muted-foreground">
            Live crypto market index — {filtered.length} assets tracked
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <RefreshCw className="h-3.5 w-3.5 animate-spin text-teal-400" />
          Live · {lastUpdate.toLocaleTimeString()}
        </div>
      </div>

      {/* Market Overview */}
      <div className="grid grid-cols-3 gap-2">
        {[
          {
            label: "Total Market Cap",
            value: totalMktCap,
            color: "text-teal-400",
          },
          { label: "24H Volume", value: totalVol, color: "text-cyan-400" },
          { label: "BTC Dominance", value: btcDom, color: "text-yellow-400" },
        ].map(s => (
          <Card key={s.label} className="border-border/50 text-center">
            <CardContent className="py-3 px-2">
              <p className={`font-black text-base ${s.color}`}>{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search + Sector Filter */}
      <div className="space-y-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or symbol..."
            className="w-full h-10 pl-10 pr-4 rounded-xl bg-muted text-sm border border-border/50 focus:outline-none focus:border-teal-500/40"
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {SECTORS.map(s => (
            <button
              key={s}
              onClick={() => setSector(s)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${sector === s ? "bg-teal-600 text-white" : "bg-muted text-muted-foreground"}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <Card className="border-border/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border/50 bg-muted/30">
                <th className="text-left px-4 py-2.5 text-muted-foreground font-medium w-8">
                  #
                </th>
                <th className="text-left px-4 py-2.5 text-muted-foreground font-medium">
                  Asset
                </th>
                <th className="text-right px-4 py-2.5 text-muted-foreground font-medium">
                  Price
                </th>
                <th
                  className="text-right px-4 py-2.5 text-muted-foreground font-medium cursor-pointer hover:text-foreground"
                  onClick={() => handleSort("change24h")}
                >
                  24H{" "}
                  {sortBy === "change24h"
                    ? sortDir === "desc"
                      ? "↓"
                      : "↑"
                    : ""}
                </th>
                <th
                  className="text-right px-4 py-2.5 text-muted-foreground font-medium cursor-pointer hover:text-foreground hidden sm:table-cell"
                  onClick={() => handleSort("change7d")}
                >
                  7D{" "}
                  {sortBy === "change7d"
                    ? sortDir === "desc"
                      ? "↓"
                      : "↑"
                    : ""}
                </th>
                <th className="text-right px-4 py-2.5 text-muted-foreground font-medium hidden md:table-cell">
                  Market Cap
                </th>
                <th className="text-right px-4 py-2.5 text-muted-foreground font-medium hidden lg:table-cell">
                  Volume
                </th>
                <th className="px-4 py-2.5 w-8"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((coin, i) => (
                <motion.tr
                  key={coin.symbol}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.02 }}
                  className="border-b border-border/30 hover:bg-muted/20 transition-colors"
                >
                  <td className="px-4 py-2.5 text-muted-foreground">
                    {coin.rank}
                  </td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-full bg-gradient-to-br from-teal-500/20 to-cyan-500/20 flex items-center justify-center shrink-0">
                        <span className="text-[9px] font-black text-teal-400">
                          {coin.symbol.slice(0, 3)}
                        </span>
                      </div>
                      <div>
                        <p className="font-bold">{coin.symbol}</p>
                        <p className="text-muted-foreground text-[10px]">
                          {coin.name}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-right font-bold">
                    $
                    {coin.price < 0.001
                      ? coin.price.toFixed(8)
                      : coin.price < 1
                        ? coin.price.toFixed(4)
                        : coin.price.toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                          })}
                  </td>
                  <td
                    className={`px-4 py-2.5 text-right font-bold ${coin.change24h >= 0 ? "text-green-400" : "text-red-400"}`}
                  >
                    {coin.change24h >= 0 ? "+" : ""}
                    {coin.change24h.toFixed(1)}%
                  </td>
                  <td
                    className={`px-4 py-2.5 text-right font-bold hidden sm:table-cell ${coin.change7d >= 0 ? "text-green-400" : "text-red-400"}`}
                  >
                    {coin.change7d >= 0 ? "+" : ""}
                    {coin.change7d.toFixed(1)}%
                  </td>
                  <td className="px-4 py-2.5 text-right text-muted-foreground hidden md:table-cell">
                    {coin.marketCap}
                  </td>
                  <td className="px-4 py-2.5 text-right text-muted-foreground hidden lg:table-cell">
                    {coin.volume}
                  </td>
                  <td className="px-4 py-2.5">
                    <button
                      onClick={() => toggleWatchlist(coin.symbol)}
                      className={`transition-colors ${coin.watchlisted ? "text-yellow-400" : "text-muted-foreground hover:text-yellow-400"}`}
                    >
                      <Star
                        className="h-4 w-4"
                        fill={coin.watchlisted ? "currentColor" : "none"}
                      />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
