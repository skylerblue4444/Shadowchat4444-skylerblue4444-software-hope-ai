import { useState } from "react";
import { motion } from "framer-motion";
import {
  Flame,
  TrendingUp,
  Rocket,
  Star,
  Users,
  Zap,
  Plus,
  Share2,
  Heart,
  BarChart3,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const MEME_COINS = [
  {
    id: 1,
    name: "TRUMP",
    symbol: "TRUMP",
    price: "$44.44",
    change: "+444%",
    mcap: "$44.4B",
    holders: 444444,
    emoji: "🇺🇸",
    hot: true,
    desc: "The official TRUMP meme coin — Make Crypto Great Again",
    volume: "$4.4B",
  },
  {
    id: 2,
    name: "SKY4444",
    symbol: "SKY4444",
    price: "$0.044",
    change: "+1,444%",
    mcap: "$44M",
    holders: 44444,
    emoji: "🌌",
    hot: true,
    desc: "The ShadowChat ecosystem token — sky is the limit",
    volume: "$444M",
  },
  {
    id: 3,
    name: "DOGE",
    symbol: "DOGE",
    price: "$0.44",
    change: "+44%",
    mcap: "$64B",
    holders: 6400000,
    emoji: "🐕",
    hot: false,
    desc: "The original meme coin — much wow, very crypto",
    volume: "$2.2B",
  },
  {
    id: 4,
    name: "SHIB",
    symbol: "SHIB",
    price: "$0.000044",
    change: "+144%",
    mcap: "$26B",
    holders: 1200000,
    emoji: "🔥",
    hot: true,
    desc: "Shiba Inu — the DOGE killer with DeFi ecosystem",
    volume: "$1.1B",
  },
  {
    id: 5,
    name: "PEPE",
    symbol: "PEPE",
    price: "$0.0000144",
    change: "+888%",
    mcap: "$6B",
    holders: 444000,
    emoji: "🐸",
    hot: true,
    desc: "Pepe the Frog — the internet's favorite meme",
    volume: "$888M",
  },
  {
    id: 6,
    name: "WIF",
    symbol: "WIF",
    price: "$4.44",
    change: "+44%",
    mcap: "$4.4B",
    holders: 88000,
    emoji: "🐕‍🦺",
    hot: false,
    desc: "Dogwifhat — the hat stays on",
    volume: "$444M",
  },
];

const TRENDING = [
  { name: "SHADOW", change: "+4,444%", emoji: "👻", age: "2h old" },
  { name: "SKYBLUE", change: "+888%", emoji: "🔵", age: "4h old" },
  { name: "ARKANSAS", change: "+444%", emoji: "🌾", age: "6h old" },
  { name: "SPILLER", change: "+188%", emoji: "💫", age: "12h old" },
];

export default function ShadowMemeCoins() {
  const [tab, setTab] = useState<"trending" | "launch" | "portfolio">(
    "trending"
  );
  const [holdings, setHoldings] = useState<Record<string, number>>({
    SKY4444: 444444,
    TRUMP: 4444,
  });
  const [newCoin, setNewCoin] = useState({
    name: "",
    symbol: "",
    supply: "",
    desc: "",
  });

  const buy = (coin: (typeof MEME_COINS)[0]) => {
    setHoldings(prev => ({
      ...prev,
      [coin.symbol]: (prev[coin.symbol] || 0) + 1000,
    }));
    toast.success(`Bought 1,000 ${coin.symbol}! ${coin.emoji}`);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Flame className="h-6 w-6 text-orange-400" />
            Meme Coins
          </h1>
          <p className="text-sm text-muted-foreground">
            Launch, trade, and moon with the hottest meme coins
          </p>
        </div>
        <Badge className="bg-orange-500/10 text-orange-400 border-orange-500/20 font-bold">
          🔥 Hot
        </Badge>
      </div>

      {/* Trending Now Banner */}
      <Card className="border-orange-500/20 bg-gradient-to-r from-orange-900/20 to-red-900/10 overflow-hidden">
        <CardContent className="py-3 px-4">
          <p className="text-xs font-bold text-orange-400 mb-2">
            🚀 JUST LAUNCHED — TRENDING NOW
          </p>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {TRENDING.map(coin => (
              <div
                key={coin.name}
                className="shrink-0 p-2 rounded-xl bg-background/50 border border-orange-500/20 text-center min-w-[80px]"
              >
                <p className="text-lg">{coin.emoji}</p>
                <p className="font-black text-xs">{coin.name}</p>
                <p className="text-xs text-green-400 font-bold">
                  {coin.change}
                </p>
                <p className="text-xs text-muted-foreground">{coin.age}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-2">
        {(["trending", "launch", "portfolio"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-orange-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "trending" && (
        <div className="space-y-3">
          {MEME_COINS.map((coin, i) => (
            <motion.div
              key={coin.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Card
                className={`border transition-all ${coin.hot ? "border-orange-500/20 bg-orange-900/5" : "border-border/50"}`}
              >
                <CardContent className="py-3 px-4">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-2xl shrink-0">
                      {coin.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-black text-sm">{coin.name}</p>
                        <Badge className="text-xs bg-muted text-muted-foreground">
                          {coin.symbol}
                        </Badge>
                        {coin.hot && (
                          <Badge className="text-xs bg-orange-500/10 text-orange-400 border-orange-500/20">
                            🔥 Hot
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {coin.desc}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-muted-foreground">
                          MCap: {coin.mcap}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Vol: {coin.volume}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          <Users className="h-3 w-3 inline" />{" "}
                          {coin.holders.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-black text-sm">{coin.price}</p>
                      <p className="text-xs font-bold text-green-400">
                        {coin.change}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Button
                      size="sm"
                      className="flex-1 h-8 text-xs bg-green-600 text-white border-0 font-bold"
                      onClick={() => buy(coin)}
                    >
                      <Rocket className="h-3.5 w-3.5 mr-1" />
                      Buy
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 text-xs font-bold"
                      onClick={() => toast.success(`Shared ${coin.name}!`)}
                    >
                      <Share2 className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 text-xs font-bold"
                      onClick={() =>
                        toast.success(`Added ${coin.name} to watchlist!`)
                      }
                    >
                      <Heart className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "launch" && (
        <Card className="border-orange-500/20 bg-orange-900/5">
          <CardContent className="py-4 px-4 space-y-3">
            <p className="font-bold text-sm">🚀 Launch Your Meme Coin</p>
            <p className="text-xs text-muted-foreground">
              Deploy your own meme coin in 60 seconds. Cost: 0.1 ETH + gas
            </p>
            <Input
              value={newCoin.name}
              onChange={e => setNewCoin(p => ({ ...p, name: e.target.value }))}
              placeholder="Coin Name (e.g. SHADOWDOG)"
              className="h-9 text-xs"
            />
            <Input
              value={newCoin.symbol}
              onChange={e =>
                setNewCoin(p => ({ ...p, symbol: e.target.value }))
              }
              placeholder="Symbol (e.g. SDOG)"
              className="h-9 text-xs"
            />
            <Input
              value={newCoin.supply}
              onChange={e =>
                setNewCoin(p => ({ ...p, supply: e.target.value }))
              }
              placeholder="Total Supply (e.g. 1,000,000,000)"
              className="h-9 text-xs"
              type="number"
            />
            <textarea
              value={newCoin.desc}
              onChange={e => setNewCoin(p => ({ ...p, desc: e.target.value }))}
              placeholder="Coin description / meme story"
              className="w-full h-16 rounded-xl border border-border bg-background px-3 py-2 text-xs resize-none focus:outline-none"
            />
            <div className="grid grid-cols-3 gap-2 text-center">
              {[
                { label: "Liquidity Lock", value: "6 months" },
                { label: "Tax", value: "0% buy/sell" },
                { label: "Renounced", value: "Yes" },
              ].map(f => (
                <div
                  key={f.label}
                  className="p-2 rounded-xl bg-green-500/10 border border-green-500/20"
                >
                  <p className="text-xs font-bold text-green-400">{f.value}</p>
                  <p className="text-xs text-muted-foreground">{f.label}</p>
                </div>
              ))}
            </div>
            <Button
              className="w-full h-10 text-xs bg-orange-600 text-white border-0 font-bold"
              onClick={() => {
                if (!newCoin.name) {
                  toast.error("Enter a coin name");
                  return;
                }
                toast.success(
                  `🚀 ${newCoin.name} (${newCoin.symbol}) launched on ShadowDEX! Liquidity added.`
                );
                setNewCoin({ name: "", symbol: "", supply: "", desc: "" });
              }}
            >
              <Rocket className="h-4 w-4 mr-2" />
              Launch Meme Coin — 0.1 ETH
            </Button>
          </CardContent>
        </Card>
      )}

      {tab === "portfolio" && (
        <div className="space-y-2">
          <p className="text-xs font-bold text-muted-foreground">
            YOUR MEME COIN HOLDINGS
          </p>
          {Object.entries(holdings).map(([symbol, amount]) => {
            const coin = MEME_COINS.find(c => c.symbol === symbol);
            return (
              <Card key={symbol} className="border-border/50">
                <CardContent className="py-3 px-4 flex items-center gap-3">
                  <span className="text-2xl">{coin?.emoji || "🪙"}</span>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{symbol}</p>
                    <p className="text-xs text-muted-foreground">
                      {amount.toLocaleString()} tokens
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-sm text-green-400">
                      {coin?.change || "+0%"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {coin?.price || "$0"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          {Object.keys(holdings).length === 0 && (
            <Card className="border-border/50">
              <CardContent className="py-8 text-center">
                <p className="text-sm text-muted-foreground">
                  No meme coins yet. Buy some!
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
