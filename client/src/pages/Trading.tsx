import { useState, useEffect, useRef } from "react";
import { trpc } from "@/lib/trpc";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { toast } from "sonner";

const PAIRS = ["TRUMP/USDC", "TRUMP/ETH", "TRUMP/BTC", "SKY/USDC"];

function generatePriceHistory(base: number, points = 60) {
  const data = [];
  let price = base;
  for (let i = points; i >= 0; i--) {
    price += (Math.random() - 0.49) * (base * 0.012);
    price = Math.max(price, base * 0.5);
    const time = new Date(Date.now() - i * 60000);
    data.push({
      time: `${time.getHours().toString().padStart(2, "0")}:${time.getMinutes().toString().padStart(2, "0")}`,
      price: parseFloat(price.toFixed(4)),
    });
  }
  return data;
}

function generateOrderBook(midPrice: number) {
  const asks = Array.from({ length: 8 }, (_, i) => ({
    price: (midPrice + (i + 1) * 0.0012).toFixed(4),
    size: (Math.random() * 5000 + 500).toFixed(0),
  })).reverse();
  const bids = Array.from({ length: 8 }, (_, i) => ({
    price: (midPrice - (i + 1) * 0.0012).toFixed(4),
    size: (Math.random() * 5000 + 500).toFixed(0),
  }));
  return { asks, bids };
}

const MARKET_TICKER = [
  { pair: "TRUMP/USDC", price: 0.4821, change: +3.42 },
  { pair: "TRUMP/ETH", price: 0.000142, change: +1.87 },
  { pair: "BTC/USDC", price: 67420, change: -0.82 },
  { pair: "ETH/USDC", price: 3241, change: +2.15 },
];

export default function Trading() {
  const [pair, setPair] = useState("TRUMP/USDC");
  const [orderType, setOrderType] = useState<"buy" | "sell">("buy");
  const [orderMode, setOrderMode] = useState<"market" | "limit">("market");
  const [amount, setAmount] = useState("");
  const [limitPrice, setLimitPrice] = useState("");
  const [priceHistory, setPriceHistory] = useState(() =>
    generatePriceHistory(0.4821)
  );
  const [orderBook, setOrderBook] = useState(() => generateOrderBook(0.4821));
  const [recentTrades, setRecentTrades] = useState<
    { price: string; size: string; side: "buy" | "sell"; time: string }[]
  >([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(
    undefined
  );

  const createOrder = trpc.trading.createOrder.useMutation({
    onSuccess: () => {
      toast.success(`${orderType.toUpperCase()} order filled!`, {
        description: `${amount} ${pair.split("/")[0]} @ ${orderMode === "market" ? currentPrice.toFixed(4) : limitPrice} USDC`,
      });
      setAmount("");
      setLimitPrice("");
    },
    onError: e => toast.error("Order failed: " + e.message),
  });

  const currentPrice = priceHistory[priceHistory.length - 1]?.price ?? 0.4821;
  const prevPrice =
    priceHistory[priceHistory.length - 2]?.price ?? currentPrice;
  const priceChange = (
    ((currentPrice - priceHistory[0]?.price) / priceHistory[0]?.price) *
    100
  ).toFixed(2);
  const isUp = currentPrice >= prevPrice;

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setPriceHistory(prev => {
        const last = prev[prev.length - 1].price;
        const newPrice = Math.max(
          last + (Math.random() - 0.49) * last * 0.008,
          0.1
        );
        const now = new Date();
        return [
          ...prev.slice(-60),
          {
            time: `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`,
            price: parseFloat(newPrice.toFixed(4)),
          },
        ];
      });
      setOrderBook(generateOrderBook(currentPrice));
      setRecentTrades(prev => {
        const side = Math.random() > 0.5 ? "buy" : "sell";
        const now = new Date();
        return [
          {
            price: currentPrice.toFixed(4),
            size: (Math.random() * 2000 + 100).toFixed(0),
            side,
            time: `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`,
          },
          ...prev.slice(0, 19),
        ];
      });
    }, 2000);
    return () => clearInterval(intervalRef.current);
  }, [currentPrice]);

  const handleOrder = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Enter a valid amount");
      return;
    }
    const effectivePrice =
      orderMode === "market" ? currentPrice.toFixed(4) : limitPrice;
    if (!effectivePrice) {
      toast.error("Enter a limit price");
      return;
    }
    createOrder.mutate({
      pair,
      type: orderType,
      amount,
      price: effectivePrice,
    });
  };

  const total =
    amount &&
    (orderMode === "market" ? currentPrice : parseFloat(limitPrice || "0"))
      ? (
          parseFloat(amount) *
          (orderMode === "market"
            ? currentPrice
            : parseFloat(limitPrice || "0"))
        ).toFixed(2)
      : "0.00";

  return (
    <div className="space-y-4">
      <Card className="border-amber-500/30 bg-amber-500/5">
        <CardContent className="flex flex-col gap-3 py-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="border-cyan-500/30 bg-cyan-500/10 text-cyan-300">
                Hope AI voice-addressable
              </Badge>
              <Badge className="border-amber-500/30 bg-amber-500/10 text-amber-300">
                Paper / beta trade ledger
              </Badge>
              <Badge className="border-red-500/30 bg-red-500/10 text-red-300">
                Live broker kill switch on
              </Badge>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              This terminal is wired to the backend order mutation for audited
              beta orders. External broker execution, live settlement, leverage,
              and real money movement remain provider-gated until intentionally
              configured.
            </p>
          </div>
          <Button
            variant="outline"
            className="border-cyan-500/30 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20"
            onClick={() =>
              toast.info(
                "Hope AI can open and narrate this terminal; live broker execution remains behind provider and kill-switch checks."
              )
            }
          >
            Hands-free status
          </Button>
        </CardContent>
      </Card>

      {/* Market Ticker */}
      <div className="flex gap-3 overflow-x-auto pb-1">
        {MARKET_TICKER.map(m => (
          <Card
            key={m.pair}
            className={`shrink-0 cursor-pointer border transition-colors ${pair === m.pair ? "border-blue-500 bg-blue-500/5" : "border-border/50 hover:border-blue-500/30"}`}
            onClick={() => setPair(m.pair)}
          >
            <CardContent className="py-3 px-4">
              <p className="text-xs text-muted-foreground">{m.pair}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <p className="font-bold text-sm">
                  {m.price < 1 ? m.price.toFixed(4) : m.price.toLocaleString()}
                </p>
                <span
                  className={`text-xs font-medium ${m.change >= 0 ? "text-green-400" : "text-red-400"}`}
                >
                  {m.change >= 0 ? "+" : ""}
                  {m.change}%
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
        {/* Chart + Order Book */}
        <div className="xl:col-span-3 space-y-4">
          {/* Price Header */}
          <Card className="border-border/50">
            <CardContent className="py-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold">
                      {currentPrice.toFixed(4)}
                    </span>
                    <Badge
                      className={`${isUp ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-red-500/10 text-red-400 border-red-500/20"}`}
                    >
                      {isUp ? (
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3 mr-1" />
                      )}
                      {priceChange}%
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {pair} · Live · Updates every 2s
                  </p>
                </div>
                <div className="flex gap-6 text-sm">
                  {[
                    {
                      label: "24h High",
                      value: "0.4950",
                      color: "text-green-400",
                    },
                    {
                      label: "24h Low",
                      value: "0.4612",
                      color: "text-red-400",
                    },
                    {
                      label: "24h Vol",
                      value: "2.4M",
                      color: "text-foreground",
                    },
                  ].map(stat => (
                    <div key={stat.label}>
                      <p className="text-xs text-muted-foreground">
                        {stat.label}
                      </p>
                      <p className={`font-semibold ${stat.color}`}>
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Price Chart */}
          <Card className="border-border/50">
            <CardContent className="pt-4 pb-2">
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={priceHistory}>
                  <XAxis
                    dataKey="time"
                    tick={{ fontSize: 10, fill: "#6b7280" }}
                    tickLine={false}
                    axisLine={false}
                    interval={9}
                  />
                  <YAxis
                    domain={["auto", "auto"]}
                    tick={{ fontSize: 10, fill: "#6b7280" }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={v => v.toFixed(3)}
                    width={55}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                    formatter={(v: number) => [v.toFixed(4), "Price"]}
                  />
                  <ReferenceLine
                    y={priceHistory[0]?.price}
                    stroke="#374151"
                    strokeDasharray="3 3"
                  />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke={
                      parseFloat(priceChange) >= 0 ? "#22c55e" : "#ef4444"
                    }
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Order Book + Recent Trades */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Order Book</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-1 text-xs text-muted-foreground mb-2 px-1">
                  <span>Price (USDC)</span>
                  <span className="text-right">Size</span>
                </div>
                {orderBook.asks.map((ask, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-2 gap-1 text-xs py-0.5 px-1 hover:bg-red-500/5 rounded"
                  >
                    <span className="text-red-400 font-mono">{ask.price}</span>
                    <span className="text-right text-muted-foreground font-mono">
                      {parseInt(ask.size).toLocaleString()}
                    </span>
                  </div>
                ))}
                <div className="my-2 py-2 px-1 bg-muted/30 rounded text-center">
                  <span
                    className={`text-sm font-bold ${isUp ? "text-green-400" : "text-red-400"}`}
                  >
                    {currentPrice.toFixed(4)}
                  </span>
                </div>
                {orderBook.bids.map((bid, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-2 gap-1 text-xs py-0.5 px-1 hover:bg-green-500/5 rounded"
                  >
                    <span className="text-green-400 font-mono">
                      {bid.price}
                    </span>
                    <span className="text-right text-muted-foreground font-mono">
                      {parseInt(bid.size).toLocaleString()}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Recent Trades</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-1 text-xs text-muted-foreground mb-2 px-1">
                  <span>Price</span>
                  <span className="text-center">Size</span>
                  <span className="text-right">Time</span>
                </div>
                <AnimatePresence initial={false}>
                  {recentTrades.slice(0, 12).map((trade, i) => (
                    <motion.div
                      key={`${trade.time}-${i}`}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="grid grid-cols-3 gap-1 text-xs py-0.5 px-1"
                    >
                      <span
                        className={`font-mono ${trade.side === "buy" ? "text-green-400" : "text-red-400"}`}
                      >
                        {trade.price}
                      </span>
                      <span className="text-center text-muted-foreground font-mono">
                        {parseInt(trade.size).toLocaleString()}
                      </span>
                      <span className="text-right text-muted-foreground font-mono">
                        {trade.time}
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {recentTrades.length === 0 && (
                  <p className="text-xs text-muted-foreground text-center py-4">
                    Waiting for trades...
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Order Panel */}
        <div className="xl:col-span-1">
          <Card className="border-border/50 sticky top-4">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between gap-2 text-sm">
                Place Order{" "}
                <Badge className="border-amber-500/30 bg-amber-500/10 text-amber-300">
                  Paper
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3 text-xs leading-5 text-amber-200">
                Orders submitted here are beta/paper orders through the app
                backend. Live broker routing is disabled by default and must
                pass provider, risk, and kill-switch checks before any real
                execution.
              </div>
              <div className="grid grid-cols-2 gap-1 p-1 bg-muted rounded-lg">
                <button
                  onClick={() => setOrderType("buy")}
                  className={`py-2 rounded-md text-sm font-semibold transition-colors ${orderType === "buy" ? "bg-green-600 text-white" : "text-muted-foreground hover:text-foreground"}`}
                >
                  Buy
                </button>
                <button
                  onClick={() => setOrderType("sell")}
                  className={`py-2 rounded-md text-sm font-semibold transition-colors ${orderType === "sell" ? "bg-red-600 text-white" : "text-muted-foreground hover:text-foreground"}`}
                >
                  Sell
                </button>
              </div>
              <div className="flex gap-2">
                {(["market", "limit"] as const).map(mode => (
                  <button
                    key={mode}
                    onClick={() => setOrderMode(mode)}
                    className={`flex-1 py-1.5 text-xs rounded-md border transition-colors capitalize ${orderMode === mode ? "border-blue-500 text-blue-400 bg-blue-500/10" : "border-border text-muted-foreground hover:border-blue-500/30"}`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">
                  Pair
                </label>
                <select
                  className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  value={pair}
                  onChange={e => setPair(e.target.value)}
                >
                  {PAIRS.map(p => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">
                  Amount ({pair.split("/")[0]})
                </label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  className="font-mono"
                />
                <div className="flex gap-1 mt-1.5">
                  {["25%", "50%", "75%", "100%"].map(pct => (
                    <button
                      key={pct}
                      className="flex-1 text-xs py-1 rounded bg-muted hover:bg-muted/80 text-muted-foreground transition-colors"
                    >
                      {pct}
                    </button>
                  ))}
                </div>
              </div>
              {orderMode === "limit" && (
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">
                    Limit Price (USDC)
                  </label>
                  <Input
                    type="number"
                    placeholder={currentPrice.toFixed(4)}
                    value={limitPrice}
                    onChange={e => setLimitPrice(e.target.value)}
                    className="font-mono"
                  />
                </div>
              )}
              {orderMode === "market" && (
                <div className="flex items-center justify-between text-xs p-2 bg-muted/30 rounded-lg">
                  <span className="text-muted-foreground">Market Price</span>
                  <span
                    className={`font-mono font-semibold ${isUp ? "text-green-400" : "text-red-400"}`}
                  >
                    {currentPrice.toFixed(4)} USDC
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between text-sm p-3 bg-muted/30 rounded-lg border border-border/50">
                <span className="text-muted-foreground">Total</span>
                <span className="font-bold font-mono">{total} USDC</span>
              </div>
              <Button
                className={`w-full font-semibold ${orderType === "buy" ? "bg-green-600 hover:bg-green-700 text-white border-0" : "bg-red-600 hover:bg-red-700 text-white border-0"}`}
                onClick={handleOrder}
                disabled={createOrder.isPending}
              >
                {createOrder.isPending
                  ? "Processing paper order..."
                  : `${orderType === "buy" ? "Buy" : "Sell"} ${pair.split("/")[0]} Paper`}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Trading involves risk. This build keeps live execution
                provider-gated and labels current activity as beta/paper order
                flow.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
