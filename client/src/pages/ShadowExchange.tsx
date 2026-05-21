import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  BarChart2,
  ArrowUpDown,
  Zap,
  Star,
  Search,
  ChevronDown,
  RefreshCw,
  Plus,
  Minus,
  Settings,
  Bell,
  Shield,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const PAIRS = [
  {
    pair: "SKY4444/USDT",
    price: 0.12,
    change: +44.4,
    volume: "28.4M",
    high: 0.128,
    low: 0.084,
    emoji: "⚡",
  },
  {
    pair: "BTC/USDT",
    price: 104284,
    change: +2.84,
    volume: "2.84B",
    high: 105000,
    low: 102000,
    emoji: "₿",
  },
  {
    pair: "ETH/USDT",
    price: 3844,
    change: +4.24,
    volume: "844M",
    high: 3900,
    low: 3750,
    emoji: "Ξ",
  },
  {
    pair: "TRUMP/USDT",
    price: 28.44,
    change: +28.4,
    volume: "284M",
    high: 30,
    low: 24,
    emoji: "🇺🇸",
  },
  {
    pair: "DOGE/USDT",
    price: 0.2844,
    change: +8.4,
    volume: "128M",
    high: 0.3,
    low: 0.26,
    emoji: "🐕",
  },
  {
    pair: "XMR/USDT",
    price: 184.44,
    change: -2.84,
    volume: "44M",
    high: 190,
    low: 180,
    emoji: "🔒",
  },
  {
    pair: "BNB/USDT",
    price: 584,
    change: +1.84,
    volume: "184M",
    high: 600,
    low: 570,
    emoji: "🟡",
  },
  {
    pair: "SOL/USDT",
    price: 184,
    change: +5.44,
    volume: "284M",
    high: 190,
    low: 175,
    emoji: "☀️",
  },
];

const ORDER_BOOK_ASKS = [
  { price: 0.1228, amount: 44000, total: 5403.2 },
  { price: 0.1224, amount: 28400, total: 3476.2 },
  { price: 0.122, amount: 84000, total: 10248 },
  { price: 0.1218, amount: 12800, total: 1559 },
  { price: 0.1215, amount: 44400, total: 5394.6 },
];

const ORDER_BOOK_BIDS = [
  { price: 0.121, amount: 84400, total: 10212.4 },
  { price: 0.1208, amount: 28000, total: 3382.4 },
  { price: 0.1205, amount: 44000, total: 5302 },
  { price: 0.12, amount: 128000, total: 15360 },
  { price: 0.1195, amount: 44444, total: 5311.1 },
];

const RECENT_TRADES = [
  { price: 0.121, amount: 4400, time: "14:28:44", type: "buy" },
  { price: 0.1208, amount: 8400, time: "14:28:42", type: "sell" },
  { price: 0.1212, amount: 2844, time: "14:28:40", type: "buy" },
  { price: 0.1209, amount: 12800, time: "14:28:38", type: "sell" },
  { price: 0.1215, amount: 4444, time: "14:28:35", type: "buy" },
];

export default function ShadowExchange() {
  const [activePair, setActivePair] = useState(PAIRS[0]);
  const [orderType, setOrderType] = useState<"limit" | "market" | "stop">(
    "limit"
  );
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [price, setPrice] = useState("0.1210");
  const [amount, setAmount] = useState("");
  const [pctSlider, setPctSlider] = useState(0);
  const [searchPair, setSearchPair] = useState("");
  const [starredPairs, setStarredPairs] = useState<string[]>(["SKY4444/USDT"]);
  const [livePrice, setLivePrice] = useState(activePair.price);

  useEffect(() => {
    const interval = setInterval(() => {
      setLivePrice(prev => {
        const delta = (Math.random() - 0.48) * 0.0002;
        return Math.max(0.001, parseFloat((prev + delta).toFixed(6)));
      });
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const total = parseFloat(price) * parseFloat(amount || "0");
  const filteredPairs = PAIRS.filter(p =>
    p.pair.toLowerCase().includes(searchPair.toLowerCase())
  );

  const placeOrder = () => {
    if (!amount) {
      toast.error("Enter amount");
      return;
    }
    toast.success(
      `${side === "buy" ? "Buy" : "Sell"} order placed! ${amount} ${activePair.pair.split("/")[0]} @ $${price} ⚡`
    );
    setAmount("");
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <BarChart2 className="h-6 w-6 text-green-400" />
            ShadowExchange
          </h1>
          <p className="text-sm text-muted-foreground">
            Professional crypto trading — 0% fees for SKY4444 holders
          </p>
        </div>
        <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
          Live Markets
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Pairs List */}
        <div className="lg:col-span-1">
          <Card className="border-border/50 h-full">
            <CardContent className="pt-3 pb-3 px-3">
              <div className="relative mb-2">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input
                  placeholder="Search pairs..."
                  className="pl-8 h-7 text-xs"
                  value={searchPair}
                  onChange={e => setSearchPair(e.target.value)}
                />
              </div>
              <div className="space-y-0.5 max-h-80 overflow-y-auto">
                {filteredPairs.map(pair => (
                  <button
                    key={pair.pair}
                    onClick={() => {
                      setActivePair(pair);
                      setLivePrice(pair.price);
                      setPrice(pair.price.toString());
                    }}
                    className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-left transition-colors ${activePair.pair === pair.pair ? "bg-green-500/10 border border-green-500/20" : "hover:bg-muted/30"}`}
                  >
                    <span className="text-sm shrink-0">{pair.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold truncate">{pair.pair}</p>
                      <p className="text-xs text-muted-foreground">
                        {pair.price < 1
                          ? pair.price.toFixed(4)
                          : pair.price.toLocaleString()}
                      </p>
                    </div>
                    <p
                      className={`text-xs font-bold shrink-0 ${pair.change >= 0 ? "text-green-400" : "text-red-400"}`}
                    >
                      {pair.change >= 0 ? "+" : ""}
                      {pair.change}%
                    </p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chart + Order Book */}
        <div className="lg:col-span-2 space-y-4">
          {/* Price Header */}
          <Card className="border-border/50">
            <CardContent className="py-3 px-4">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-3xl">{activePair.emoji}</span>
                <div>
                  <p className="font-black text-xl">{activePair.pair}</p>
                  <div className="flex items-center gap-2">
                    <p
                      className={`font-black text-2xl ${activePair.change >= 0 ? "text-green-400" : "text-red-400"}`}
                    >
                      {livePrice < 1
                        ? livePrice.toFixed(6)
                        : livePrice.toLocaleString()}
                    </p>
                    <Badge
                      className={`${activePair.change >= 0 ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-red-500/10 text-red-400 border-red-500/20"}`}
                    >
                      {activePair.change >= 0 ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      )}
                      {activePair.change >= 0 ? "+" : ""}
                      {activePair.change}%
                    </Badge>
                  </div>
                </div>
                <div className="ml-auto grid grid-cols-3 gap-4 text-right">
                  <div>
                    <p className="text-xs text-muted-foreground">24h High</p>
                    <p className="font-bold text-xs text-green-400">
                      {activePair.high < 1
                        ? activePair.high.toFixed(4)
                        : activePair.high.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">24h Low</p>
                    <p className="font-bold text-xs text-red-400">
                      {activePair.low < 1
                        ? activePair.low.toFixed(4)
                        : activePair.low.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">24h Vol</p>
                    <p className="font-bold text-xs">{activePair.volume}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Chart Placeholder */}
          <Card className="border-border/50">
            <CardContent className="pt-0 pb-0">
              <div className="h-48 bg-gradient-to-br from-green-900/10 to-blue-900/10 rounded-xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 flex items-end px-4 pb-4 gap-0.5">
                  {[...Array(60)].map((_, i) => {
                    const h = 20 + Math.sin(i * 0.3) * 15 + Math.random() * 20;
                    const isUp = Math.random() > 0.45;
                    return (
                      <div
                        key={i}
                        className={`flex-1 rounded-sm ${isUp ? "bg-green-500/40" : "bg-red-500/40"}`}
                        style={{ height: `${h}%` }}
                      />
                    );
                  })}
                </div>
                <div className="relative z-10 text-center">
                  <BarChart2 className="h-8 w-8 text-green-400/50 mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">
                    Live Chart — TradingView Integration
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Book */}
          <Card className="border-border/50">
            <CardHeader className="pb-2 pt-3">
              <CardTitle className="text-sm font-black">Order Book</CardTitle>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="grid grid-cols-3 text-xs text-muted-foreground mb-1 px-1">
                <span>Price (USDT)</span>
                <span className="text-center">Amount</span>
                <span className="text-right">Total</span>
              </div>
              {ORDER_BOOK_ASKS.slice()
                .reverse()
                .map((ask, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-3 text-xs py-0.5 px-1 hover:bg-red-500/5 cursor-pointer relative"
                  >
                    <div
                      className="absolute inset-0 bg-red-500/5"
                      style={{ width: `${(ask.total / 15000) * 100}%` }}
                    />
                    <span className="text-red-400 font-mono relative">
                      {ask.price.toFixed(4)}
                    </span>
                    <span className="text-center font-mono relative">
                      {ask.amount.toLocaleString()}
                    </span>
                    <span className="text-right font-mono relative">
                      {ask.total.toLocaleString()}
                    </span>
                  </div>
                ))}
              <div className="py-1.5 px-1 border-y border-border/30 my-1">
                <p
                  className={`font-black text-sm ${activePair.change >= 0 ? "text-green-400" : "text-red-400"}`}
                >
                  {livePrice.toFixed(6)} USDT
                </p>
              </div>
              {ORDER_BOOK_BIDS.map((bid, i) => (
                <div
                  key={i}
                  className="grid grid-cols-3 text-xs py-0.5 px-1 hover:bg-green-500/5 cursor-pointer relative"
                >
                  <div
                    className="absolute inset-0 bg-green-500/5"
                    style={{ width: `${(bid.total / 15000) * 100}%` }}
                  />
                  <span className="text-green-400 font-mono relative">
                    {bid.price.toFixed(4)}
                  </span>
                  <span className="text-center font-mono relative">
                    {bid.amount.toLocaleString()}
                  </span>
                  <span className="text-right font-mono relative">
                    {bid.total.toLocaleString()}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Order Form */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="border-border/50">
            <CardContent className="pt-3 pb-4">
              {/* Order Type */}
              <div className="flex gap-1 mb-3">
                {(["limit", "market", "stop"] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => setOrderType(t)}
                    className={`flex-1 py-1 rounded-lg text-xs font-medium capitalize transition-colors ${orderType === t ? "bg-muted text-white" : "text-muted-foreground"}`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {/* Buy/Sell */}
              <div className="flex gap-1 mb-3">
                <button
                  onClick={() => setSide("buy")}
                  className={`flex-1 py-2 rounded-xl text-xs font-black transition-colors ${side === "buy" ? "bg-green-600 text-white" : "bg-muted text-muted-foreground"}`}
                >
                  Buy
                </button>
                <button
                  onClick={() => setSide("sell")}
                  className={`flex-1 py-2 rounded-xl text-xs font-black transition-colors ${side === "sell" ? "bg-red-600 text-white" : "bg-muted text-muted-foreground"}`}
                >
                  Sell
                </button>
              </div>

              <div className="space-y-2">
                {orderType !== "market" && (
                  <div>
                    <label className="text-xs text-muted-foreground">
                      Price (USDT)
                    </label>
                    <Input
                      value={price}
                      onChange={e => setPrice(e.target.value)}
                      className="h-8 text-xs mt-0.5 font-mono"
                    />
                  </div>
                )}
                <div>
                  <label className="text-xs text-muted-foreground">
                    Amount ({activePair.pair.split("/")[0]})
                  </label>
                  <Input
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="h-8 text-xs mt-0.5 font-mono"
                    type="number"
                  />
                </div>

                {/* Percent Buttons */}
                <div className="flex gap-1">
                  {[25, 50, 75, 100].map(pct => (
                    <button
                      key={pct}
                      onClick={() => {
                        setPctSlider(pct);
                        setAmount(((1000 * pct) / 100).toFixed(2));
                      }}
                      className={`flex-1 py-1 rounded-lg text-xs transition-colors ${pctSlider === pct ? "bg-blue-600 text-white" : "bg-muted text-muted-foreground"}`}
                    >
                      {pct}%
                    </button>
                  ))}
                </div>

                {amount && (
                  <div className="p-2 rounded-xl bg-muted/20 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total</span>
                      <span className="font-bold">
                        {isNaN(total) ? "0.00" : total.toFixed(2)} USDT
                      </span>
                    </div>
                    <div className="flex justify-between mt-0.5">
                      <span className="text-muted-foreground">Fee</span>
                      <span className="text-green-400">0.00% (SKY4444)</span>
                    </div>
                  </div>
                )}

                <Button
                  className={`w-full font-black text-sm ${side === "buy" ? "bg-green-600 text-white border-0" : "bg-red-600 text-white border-0"}`}
                  onClick={placeOrder}
                >
                  {side === "buy" ? "Buy" : "Sell"}{" "}
                  {activePair.pair.split("/")[0]}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Trades */}
          <Card className="border-border/50">
            <CardHeader className="pb-2 pt-3">
              <CardTitle className="text-xs font-black">
                Recent Trades
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="grid grid-cols-3 text-xs text-muted-foreground mb-1">
                <span>Price</span>
                <span className="text-center">Amount</span>
                <span className="text-right">Time</span>
              </div>
              {RECENT_TRADES.map((trade, i) => (
                <div key={i} className="grid grid-cols-3 text-xs py-0.5">
                  <span
                    className={`font-mono ${trade.type === "buy" ? "text-green-400" : "text-red-400"}`}
                  >
                    {trade.price.toFixed(4)}
                  </span>
                  <span className="text-center font-mono">
                    {trade.amount.toLocaleString()}
                  </span>
                  <span className="text-right text-muted-foreground font-mono">
                    {trade.time}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
