import { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Zap,
  AlertTriangle,
  DollarSign,
  BarChart2,
  ArrowUpRight,
  ArrowDownRight,
  Settings,
  RefreshCw,
  ChevronUp,
  ChevronDown,
  Target,
  Shield,
  Flame,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

const PAIRS = [
  {
    symbol: "BTC/USDT",
    price: 100012.4,
    change: +2.14,
    funding: 0.01,
    oi: "2.4B",
    volume: "8.2B",
  },
  {
    symbol: "ETH/USDT",
    price: 3398.2,
    change: -1.23,
    funding: -0.005,
    oi: "1.1B",
    volume: "3.4B",
  },
  {
    symbol: "TRUMP/USDT",
    price: 0.0234,
    change: +8.42,
    funding: 0.025,
    oi: "84M",
    volume: "240M",
  },
  {
    symbol: "SKY4444/USDT",
    price: 0.025,
    change: +15.21,
    funding: 0.05,
    oi: "12M",
    volume: "48M",
  },
  {
    symbol: "DOGE/USDT",
    price: 0.1501,
    change: +5.67,
    funding: 0.01,
    oi: "420M",
    volume: "1.2B",
  },
  {
    symbol: "SOL/USDT",
    price: 184.2,
    change: -0.84,
    funding: 0.005,
    oi: "680M",
    volume: "2.1B",
  },
];

const POSITIONS = [
  {
    symbol: "BTC/USDT",
    side: "long",
    size: 0.1,
    entry: 98400,
    mark: 100012,
    leverage: 10,
    pnl: +161.2,
    pnlPct: +16.38,
    liq: 89450,
    margin: 984,
  },
  {
    symbol: "ETH/USDT",
    side: "short",
    size: 1.0,
    entry: 3450,
    mark: 3398,
    leverage: 5,
    pnl: +52.0,
    pnlPct: +7.54,
    liq: 3795,
    margin: 690,
  },
];

const LEVERAGE_MARKS = [1, 2, 5, 10, 20, 50, 100, 125];

export default function FuturesTrading() {
  const [selectedPair, setSelectedPair] = useState(PAIRS[0]);
  const [side, setSide] = useState<"long" | "short">("long");
  const [leverage, setLeverage] = useState(10);
  const [size, setSize] = useState("");
  const [orderType, setOrderType] = useState<"market" | "limit">("market");
  const [limitPrice, setLimitPrice] = useState("");

  const margin = size ? (parseFloat(size) * selectedPair.price) / leverage : 0;
  const liqPrice =
    side === "long"
      ? selectedPair.price * (1 - (1 / leverage) * 0.9)
      : selectedPair.price * (1 + (1 / leverage) * 0.9);

  const placeOrder = () => {
    if (!size) {
      toast.error("Enter position size");
      return;
    }
    toast.success(
      `${side.toUpperCase()} ${size} ${selectedPair.symbol} @ ${leverage}x leverage placed!`
    );
    setSize("");
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Flame className="h-6 w-6 text-orange-400" />
            Futures Trading
          </h1>
          <p className="text-sm text-muted-foreground">
            Up to 125x leverage · Perpetual contracts
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-orange-500/10 text-orange-400 border-orange-500/20">
            Margin: $1,674.00
          </Badge>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Risk Warning */}
      <div className="flex items-center gap-2 p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/20 text-xs text-yellow-400">
        <AlertTriangle className="h-4 w-4 shrink-0" />
        <span>
          Futures trading involves significant risk. You can lose more than your
          initial investment. Trade responsibly.
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Pair Selector */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold">Markets</h3>
          <div className="space-y-1 max-h-80 overflow-y-auto">
            {PAIRS.map(pair => (
              <button
                key={pair.symbol}
                onClick={() => setSelectedPair(pair)}
                className={`w-full flex items-center gap-2 p-2.5 rounded-xl text-left transition-colors ${selectedPair.symbol === pair.symbol ? "bg-orange-500/10 border border-orange-500/20" : "hover:bg-muted/30"}`}
              >
                <div className="flex-1">
                  <p className="text-sm font-bold">{pair.symbol}</p>
                  <p className="text-xs text-muted-foreground">
                    Vol: {pair.volume}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">
                    ${pair.price.toLocaleString()}
                  </p>
                  <p
                    className={`text-xs font-bold ${pair.change >= 0 ? "text-green-400" : "text-red-400"}`}
                  >
                    {pair.change >= 0 ? "+" : ""}
                    {pair.change}%
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Order Form */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold">{selectedPair.symbol}</h3>
            <div className="text-right">
              <p className="font-black text-lg">
                ${selectedPair.price.toLocaleString()}
              </p>
              <p
                className={`text-xs font-bold ${selectedPair.change >= 0 ? "text-green-400" : "text-red-400"}`}
              >
                {selectedPair.change >= 0 ? "+" : ""}
                {selectedPair.change}%
              </p>
            </div>
          </div>

          {/* Funding Rate */}
          <div className="flex gap-3 text-xs">
            <div className="flex-1 p-2 rounded-lg bg-muted/20 text-center">
              <p className="text-muted-foreground">Funding Rate</p>
              <p
                className={`font-bold ${selectedPair.funding >= 0 ? "text-green-400" : "text-red-400"}`}
              >
                {selectedPair.funding >= 0 ? "+" : ""}
                {selectedPair.funding}%
              </p>
            </div>
            <div className="flex-1 p-2 rounded-lg bg-muted/20 text-center">
              <p className="text-muted-foreground">Open Interest</p>
              <p className="font-bold">${selectedPair.oi}</p>
            </div>
          </div>

          {/* Long/Short Toggle */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setSide("long")}
              className={`py-2.5 rounded-xl font-black text-sm transition-colors ${side === "long" ? "bg-green-600 text-white" : "bg-muted text-muted-foreground"}`}
            >
              <TrendingUp className="h-4 w-4 inline mr-1.5" />
              Long
            </button>
            <button
              onClick={() => setSide("short")}
              className={`py-2.5 rounded-xl font-black text-sm transition-colors ${side === "short" ? "bg-red-600 text-white" : "bg-muted text-muted-foreground"}`}
            >
              <TrendingDown className="h-4 w-4 inline mr-1.5" />
              Short
            </button>
          </div>

          {/* Order Type */}
          <div className="flex gap-2">
            {(["market", "limit"] as const).map(ot => (
              <button
                key={ot}
                onClick={() => setOrderType(ot)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${orderType === ot ? "bg-orange-600 text-white" : "bg-muted text-muted-foreground"}`}
              >
                {ot}
              </button>
            ))}
          </div>

          {orderType === "limit" && (
            <div>
              <label className="text-xs text-muted-foreground">
                Limit Price (USDT)
              </label>
              <Input
                placeholder={selectedPair.price.toString()}
                value={limitPrice}
                onChange={e => setLimitPrice(e.target.value)}
                className="mt-1"
              />
            </div>
          )}

          {/* Size */}
          <div>
            <label className="text-xs text-muted-foreground">
              Size (Contracts)
            </label>
            <Input
              placeholder="0.00"
              value={size}
              onChange={e => setSize(e.target.value)}
              className="mt-1"
            />
          </div>

          {/* Leverage */}
          <div>
            <div className="flex justify-between text-xs mb-2">
              <span className="text-muted-foreground">Leverage</span>
              <span className="font-black text-orange-400">{leverage}x</span>
            </div>
            <Slider
              value={[leverage]}
              min={1}
              max={125}
              step={1}
              onValueChange={([v]) => setLeverage(v)}
              className="mb-2"
            />
            <div className="flex gap-1">
              {LEVERAGE_MARKS.map(m => (
                <button
                  key={m}
                  onClick={() => setLeverage(m)}
                  className={`flex-1 text-xs py-1 rounded transition-colors ${leverage === m ? "bg-orange-600 text-white" : "bg-muted text-muted-foreground"}`}
                >
                  {m}x
                </button>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          {size && (
            <div className="space-y-1 text-xs p-3 rounded-xl bg-muted/20 border border-border/30">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Margin Required</span>
                <span className="font-bold">${margin.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Liquidation Price</span>
                <span
                  className={`font-bold ${side === "long" ? "text-red-400" : "text-green-400"}`}
                >
                  ${liqPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Notional Value</span>
                <span className="font-bold">
                  ${(parseFloat(size) * selectedPair.price).toFixed(2)}
                </span>
              </div>
            </div>
          )}

          <Button
            className={`w-full font-black ${side === "long" ? "bg-green-600" : "bg-red-600"} text-white border-0`}
            onClick={placeOrder}
          >
            {side === "long" ? (
              <TrendingUp className="h-4 w-4 mr-2" />
            ) : (
              <TrendingDown className="h-4 w-4 mr-2" />
            )}
            {side === "long" ? "Open Long" : "Open Short"} @ {leverage}x
          </Button>
        </div>

        {/* Positions */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold">Open Positions</h3>
          {POSITIONS.map((pos, i) => (
            <Card
              key={i}
              className={`border-border/50 ${pos.side === "long" ? "border-green-500/20" : "border-red-500/20"}`}
            >
              <CardContent className="pt-3 pb-3 px-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge
                      className={`text-xs ${pos.side === "long" ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-red-500/10 text-red-400 border-red-500/20"}`}
                    >
                      {pos.side.toUpperCase()} {pos.leverage}x
                    </Badge>
                    <span className="text-sm font-bold">{pos.symbol}</span>
                  </div>
                  <span
                    className={`text-sm font-black ${pos.pnl >= 0 ? "text-green-400" : "text-red-400"}`}
                  >
                    {pos.pnl >= 0 ? "+" : ""}${pos.pnl.toFixed(2)}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-1 text-xs">
                  <div>
                    <span className="text-muted-foreground">Size: </span>
                    <span className="font-medium">{pos.size}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Entry: </span>
                    <span className="font-medium">
                      ${pos.entry.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Mark: </span>
                    <span className="font-medium">
                      ${pos.mark.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Liq: </span>
                    <span className="font-medium text-red-400">
                      ${pos.liq.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Margin: </span>
                    <span className="font-medium">${pos.margin}</span>
                  </div>
                  <div>
                    <span
                      className={`font-bold ${pos.pnlPct >= 0 ? "text-green-400" : "text-red-400"}`}
                    >
                      {pos.pnlPct >= 0 ? "+" : ""}
                      {pos.pnlPct}%
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 mt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 h-6 text-xs"
                    onClick={() => toast.info("Setting TP/SL")}
                  >
                    TP/SL
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 h-6 text-xs bg-red-600 text-white border-0"
                    onClick={() =>
                      toast.success(`Closed ${pos.symbol} position`)
                    }
                  >
                    Close
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Account Summary */}
          <Card className="border-border/50">
            <CardContent className="pt-3 pb-3 px-3 space-y-1 text-xs">
              <p className="font-bold text-sm mb-2">Account Summary</p>
              {[
                { label: "Total Margin", value: "$1,674.00" },
                { label: "Available Margin", value: "$690.00" },
                {
                  label: "Unrealized PnL",
                  value: "+$213.20",
                  color: "text-green-400",
                },
                { label: "Margin Ratio", value: "12.4%" },
              ].map(({ label, value, color }) => (
                <div key={label} className="flex justify-between">
                  <span className="text-muted-foreground">{label}</span>
                  <span className={`font-bold ${color || ""}`}>{value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
