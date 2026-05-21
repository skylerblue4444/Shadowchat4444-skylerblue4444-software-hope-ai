/**
 * ShadowChat Trending Board
 * Real-time trending: coins, shop items, posts, traders
 */
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Flame, Star, Zap } from "lucide-react";

const TRENDING_COINS = [
  {
    rank: 1,
    coin: "SKY4444",
    change: "+44.4%",
    price: "$0.047",
    volume: "$847K",
    emoji: "✦",
    hot: true,
  },
  {
    rank: 2,
    coin: "TRUMP",
    change: "+12.3%",
    price: "$14.20",
    volume: "$284M",
    emoji: "🇺🇸",
    hot: true,
  },
  {
    rank: 3,
    coin: "DOGE",
    change: "+8.7%",
    price: "$0.184",
    volume: "$1.2B",
    emoji: "🐕",
    hot: true,
  },
  {
    rank: 4,
    coin: "BTC",
    change: "+3.2%",
    price: "$67,420",
    volume: "$28B",
    emoji: "₿",
    hot: false,
  },
  {
    rank: 5,
    coin: "XMR",
    change: "+2.4%",
    price: "$178.40",
    volume: "$84M",
    emoji: "ɱ",
    hot: false,
  },
  {
    rank: 6,
    coin: "USDT",
    change: "0.0%",
    price: "$1.00",
    volume: "$47B",
    emoji: "₮",
    hot: false,
  },
];

const TRENDING_ITEMS = [
  {
    rank: 1,
    name: "SKY4444 Crypto Hoodie",
    sales: 847,
    price: "$44.44",
    emoji: "👕",
    region: "🇺🇸",
  },
  {
    rank: 2,
    name: "RGB Gaming Keyboard",
    sales: 624,
    price: "$34.99",
    emoji: "⌨️",
    region: "🇨🇳",
  },
  {
    rank: 3,
    name: "TRUMP Collector Coin",
    sales: 512,
    price: "$49.99",
    emoji: "🇺🇸",
    region: "🇺🇸",
  },
  {
    rank: 4,
    name: "Smart LED Strip 10M",
    sales: 487,
    price: "$18.99",
    emoji: "💡",
    region: "🇨🇳",
  },
  {
    rank: 5,
    name: "Smart Watch Pro",
    sales: 421,
    price: "$29.99",
    emoji: "⌚",
    region: "🇨🇳",
  },
];

const TRENDING_TRADERS = [
  {
    rank: 1,
    name: "SkylerBlue",
    pnl: "+$4,444",
    trades: 47,
    emoji: "👑",
    region: "🇺🇸",
  },
  {
    rank: 2,
    name: "CryptoKing_CN",
    pnl: "+$2,847",
    trades: 38,
    emoji: "🐉",
    region: "🇨🇳",
  },
  {
    rank: 3,
    name: "EuroHodler",
    pnl: "+$1,984",
    trades: 29,
    emoji: "🦅",
    region: "🇪🇺",
  },
  {
    rank: 4,
    name: "TrumpTrader",
    pnl: "+$1,472",
    trades: 24,
    emoji: "🦁",
    region: "🇺🇸",
  },
  {
    rank: 5,
    name: "DogeArmy_TX",
    pnl: "+$984",
    trades: 18,
    emoji: "🐕",
    region: "🇺🇸",
  },
];

type Tab = "coins" | "shop" | "traders";

export default function ShadowTrendingBoard() {
  const [tab, setTab] = useState<Tab>("coins");
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick(v => v + 1), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Flame className="h-6 w-6 text-orange-400" />
            Trending
          </h1>
          <p className="text-xs text-muted-foreground">
            Live updates · 🇺🇸 USA · 🇨🇳 China · 🇪🇺 EU
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs text-green-400 font-bold">LIVE</span>
        </div>
      </div>

      <div className="flex gap-1.5">
        {(["coins", "shop", "traders"] as Tab[]).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 text-xs py-1.5 rounded-lg border transition-all font-bold capitalize ${tab === t ? "bg-primary text-primary-foreground border-primary" : "border-border/50 text-muted-foreground"}`}
          >
            {t === "coins"
              ? "📊 Coins"
              : t === "shop"
                ? "🛒 Shop"
                : "📈 Traders"}
          </button>
        ))}
      </div>

      {tab === "coins" && (
        <div className="space-y-2">
          {TRENDING_COINS.map(c => (
            <Card
              key={c.coin}
              className={`border-border/50 ${c.hot ? "ring-1 ring-orange-500/20" : ""}`}
            >
              <CardContent className="py-2.5 px-3 flex items-center gap-3">
                <span className="text-xs font-mono text-muted-foreground w-4">
                  #{c.rank}
                </span>
                <span className="text-xl">{c.emoji}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-black text-sm">{c.coin}</span>
                    {c.hot && <Flame className="h-3 w-3 text-orange-400" />}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Vol: {c.volume}
                  </span>
                </div>
                <div className="text-right">
                  <p className="font-mono text-xs font-bold">{c.price}</p>
                  <span
                    className={`text-xs font-bold ${c.change.startsWith("+") ? "text-green-400" : c.change === "0.0%" ? "text-muted-foreground" : "text-red-400"}`}
                  >
                    {c.change}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "shop" && (
        <div className="space-y-2">
          {TRENDING_ITEMS.map(item => (
            <Card key={item.rank} className="border-border/50">
              <CardContent className="py-2.5 px-3 flex items-center gap-3">
                <span className="text-xs font-mono text-muted-foreground w-4">
                  #{item.rank}
                </span>
                <span className="text-xl">{item.emoji}</span>
                <div className="flex-1">
                  <p className="font-bold text-xs">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.sales} sold today {item.region}
                  </p>
                </div>
                <span className="text-green-400 font-black text-sm">
                  {item.price}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "traders" && (
        <div className="space-y-2">
          {TRENDING_TRADERS.map(t => (
            <Card key={t.rank} className="border-border/50">
              <CardContent className="py-2.5 px-3 flex items-center gap-3">
                <span className="text-xs font-mono text-muted-foreground w-4">
                  #{t.rank}
                </span>
                <span className="text-xl">{t.emoji}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-xs">{t.name}</span>
                    <span className="text-xs">{t.region}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {t.trades} trades today
                  </p>
                </div>
                <span className="text-green-400 font-black text-sm">
                  {t.pnl}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
