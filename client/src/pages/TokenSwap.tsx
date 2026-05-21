import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpDown,
  RefreshCw,
  Settings,
  Info,
  ChevronDown,
  Zap,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart2,
  Coins,
  Shield,
  Star,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const TOKENS = [
  {
    symbol: "TRUMP",
    name: "TRUMP Token",
    price: 0.0234,
    icon: "🇺🇸",
    balance: 12450,
    change24h: +8.42,
  },
  {
    symbol: "SKY4444",
    name: "SkyBlue Token",
    price: 0.025,
    icon: "⚡",
    balance: 85000,
    change24h: +15.21,
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    price: 3398.2,
    icon: "Ξ",
    balance: 1.245,
    change24h: -1.23,
  },
  {
    symbol: "BTC",
    name: "Bitcoin",
    price: 100012.4,
    icon: "₿",
    balance: 0.00842,
    change24h: +2.14,
  },
  {
    symbol: "DOGE",
    name: "Dogecoin",
    price: 0.1501,
    icon: "🐕",
    balance: 15420,
    change24h: +5.67,
  },
  {
    symbol: "XMR",
    name: "Monero",
    price: 150.0,
    icon: "🔒",
    balance: 4.21,
    change24h: -0.89,
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    price: 1.0,
    icon: "💵",
    balance: 2840,
    change24h: 0.0,
  },
  {
    symbol: "USDT",
    name: "Tether",
    price: 1.0,
    icon: "💲",
    balance: 1200,
    change24h: 0.0,
  },
];

const RECENT_SWAPS = [
  {
    from: "ETH",
    to: "TRUMP",
    fromAmt: 0.1,
    toAmt: 14521,
    time: "2 min ago",
    status: "success",
  },
  {
    from: "USDC",
    to: "SKY4444",
    fromAmt: 500,
    toAmt: 20000,
    time: "18 min ago",
    status: "success",
  },
  {
    from: "TRUMP",
    to: "DOGE",
    fromAmt: 5000,
    toAmt: 780,
    time: "1 hr ago",
    status: "success",
  },
];

const DEX_ROUTES = [
  { name: "ShadowSwap", fee: "0.25%", liquidity: "$48.2M", best: true },
  { name: "Uniswap V3", fee: "0.30%", liquidity: "$2.1B", best: false },
  { name: "1inch", fee: "0.20%", liquidity: "$890M", best: false },
];

export default function TokenSwap() {
  const [fromToken, setFromToken] = useState(TOKENS[2]); // ETH
  const [toToken, setToToken] = useState(TOKENS[0]); // TRUMP
  const [fromAmount, setFromAmount] = useState("");
  const [slippage, setSlippage] = useState("0.5");
  const [showSettings, setShowSettings] = useState(false);
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  const [swapping, setSwapping] = useState(false);

  const toAmount = fromAmount
    ? ((parseFloat(fromAmount) * fromToken.price) / toToken.price).toFixed(6)
    : "";

  const priceImpact = fromAmount ? Math.random() * 2 : 0;
  const minReceived = toAmount
    ? (parseFloat(toAmount) * (1 - parseFloat(slippage) / 100)).toFixed(6)
    : "0";
  const fee = fromAmount
    ? (parseFloat(fromAmount) * fromToken.price * 0.0025).toFixed(4)
    : "0";

  const handleSwap = async () => {
    if (!fromAmount || parseFloat(fromAmount) <= 0) {
      toast.error("Enter an amount");
      return;
    }
    setSwapping(true);
    await new Promise(r => setTimeout(r, 2000));
    setSwapping(false);
    toast.success(
      `✅ Swapped ${fromAmount} ${fromToken.symbol} → ${toAmount} ${toToken.symbol}`
    );
    setFromAmount("");
  };

  const flipTokens = () => {
    const tmp = fromToken;
    setFromToken(toToken);
    setToToken(tmp);
    setFromAmount(toAmount);
  };

  return (
    <div className="max-w-xl mx-auto space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black flex items-center gap-2">
          <ArrowUpDown className="h-6 w-6 text-blue-400" />
          Token Swap
        </h1>
        <p className="text-sm text-muted-foreground">
          Instant DEX swap across all supported tokens
        </p>
      </div>

      {/* Swap Card */}
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-bold">Swap</CardTitle>
            <div className="flex gap-2">
              <button
                className="h-8 w-8 rounded-lg bg-muted/30 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => toast.info("Refreshing rates...")}
              >
                <RefreshCw className="h-3.5 w-3.5" />
              </button>
              <button
                className="h-8 w-8 rounded-lg bg-muted/30 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setShowSettings(!showSettings)}
              >
                <Settings className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {/* Settings Panel */}
          <AnimatePresence>
            {showSettings && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="p-3 rounded-xl bg-muted/20 border border-border/30 mb-2">
                  <p className="text-xs font-bold mb-2">Slippage Tolerance</p>
                  <div className="flex gap-2">
                    {["0.1", "0.5", "1.0", "3.0"].map(s => (
                      <button
                        key={s}
                        onClick={() => setSlippage(s)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${slippage === s ? "bg-blue-600 text-white" : "bg-muted text-muted-foreground"}`}
                      >
                        {s}%
                      </button>
                    ))}
                    <Input
                      className="h-7 w-20 text-xs"
                      placeholder="Custom"
                      value={slippage}
                      onChange={e => setSlippage(e.target.value)}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* From Token */}
          <div className="p-4 rounded-2xl bg-muted/20 border border-border/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">From</span>
              <span className="text-xs text-muted-foreground">
                Balance: {fromToken.balance.toLocaleString()} {fromToken.symbol}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFromPicker(!showFromPicker)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-background border border-border/40 hover:border-border/80 transition-colors shrink-0"
              >
                <span className="text-xl">{fromToken.icon}</span>
                <span className="font-bold">{fromToken.symbol}</span>
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
              <div className="flex-1">
                <Input
                  className="border-0 bg-transparent text-2xl font-black p-0 h-auto focus-visible:ring-0 text-right"
                  placeholder="0.0"
                  value={fromAmount}
                  onChange={e => setFromAmount(e.target.value)}
                />
                <p className="text-xs text-muted-foreground text-right mt-0.5">
                  $
                  {fromAmount
                    ? (parseFloat(fromAmount) * fromToken.price).toFixed(2)
                    : "0.00"}
                </p>
              </div>
            </div>
            <div className="flex gap-2 mt-2">
              {["25%", "50%", "75%", "MAX"].map(pct => (
                <button
                  key={pct}
                  className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                  onClick={() =>
                    setFromAmount(
                      String(
                        fromToken.balance *
                          (pct === "MAX" ? 1 : parseInt(pct) / 100)
                      )
                    )
                  }
                >
                  {pct}
                </button>
              ))}
            </div>
          </div>

          {/* Flip Button */}
          <div className="flex justify-center">
            <button
              onClick={flipTokens}
              className="h-10 w-10 rounded-xl bg-muted/40 border border-border/40 flex items-center justify-center hover:bg-muted/60 hover:rotate-180 transition-all duration-300"
            >
              <ArrowUpDown className="h-4 w-4" />
            </button>
          </div>

          {/* To Token */}
          <div className="p-4 rounded-2xl bg-muted/20 border border-border/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">To</span>
              <span className="text-xs text-muted-foreground">
                Balance: {toToken.balance.toLocaleString()} {toToken.symbol}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowToPicker(!showToPicker)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-background border border-border/40 hover:border-border/80 transition-colors shrink-0"
              >
                <span className="text-xl">{toToken.icon}</span>
                <span className="font-bold">{toToken.symbol}</span>
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
              <div className="flex-1">
                <p className="text-2xl font-black text-right text-green-400">
                  {toAmount || "0.0"}
                </p>
                <p className="text-xs text-muted-foreground text-right mt-0.5">
                  $
                  {toAmount
                    ? (parseFloat(toAmount) * toToken.price).toFixed(2)
                    : "0.00"}
                </p>
              </div>
            </div>
          </div>

          {/* Token Picker Dropdown */}
          <AnimatePresence>
            {(showFromPicker || showToPicker) && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
              >
                <Card className="border-border/50">
                  <CardContent className="py-2 px-0">
                    <p className="text-xs text-muted-foreground px-3 py-1">
                      Select token
                    </p>
                    {TOKENS.map(token => (
                      <button
                        key={token.symbol}
                        className="w-full flex items-center gap-3 px-3 py-2 hover:bg-muted/30 transition-colors"
                        onClick={() => {
                          if (showFromPicker) {
                            setFromToken(token);
                            setShowFromPicker(false);
                          } else {
                            setToToken(token);
                            setShowToPicker(false);
                          }
                        }}
                      >
                        <span className="text-xl">{token.icon}</span>
                        <div className="flex-1 text-left">
                          <p className="text-sm font-bold">{token.symbol}</p>
                          <p className="text-xs text-muted-foreground">
                            {token.name}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-mono">
                            {token.balance.toLocaleString()}
                          </p>
                          <p
                            className={`text-xs ${token.change24h >= 0 ? "text-green-400" : "text-red-400"}`}
                          >
                            {token.change24h >= 0 ? "+" : ""}
                            {token.change24h}%
                          </p>
                        </div>
                      </button>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Swap Details */}
          {fromAmount && (
            <div className="p-3 rounded-xl bg-muted/20 border border-border/30 space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Rate</span>
                <span className="font-mono">
                  1 {fromToken.symbol} ={" "}
                  {(fromToken.price / toToken.price).toFixed(4)}{" "}
                  {toToken.symbol}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Price Impact</span>
                <span
                  className={
                    priceImpact > 1 ? "text-red-400" : "text-green-400"
                  }
                >
                  {priceImpact.toFixed(2)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Min Received</span>
                <span className="font-mono">
                  {minReceived} {toToken.symbol}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Swap Fee (0.25%)</span>
                <span className="font-mono">${fee}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Route</span>
                <span className="text-blue-400">ShadowSwap ✓ Best</span>
              </div>
            </div>
          )}

          {/* Swap Button */}
          <Button
            className="w-full h-12 text-base font-black bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-0"
            onClick={handleSwap}
            disabled={swapping || !fromAmount}
          >
            {swapping ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Swapping...
              </div>
            ) : (
              <>
                <Zap className="h-5 w-5 mr-2" />
                Swap {fromToken.symbol} → {toToken.symbol}
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* DEX Routes */}
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-bold">Available Routes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {DEX_ROUTES.map(route => (
            <div
              key={route.name}
              className={`flex items-center gap-3 p-3 rounded-xl border transition-colors ${route.best ? "border-green-500/30 bg-green-500/5" : "border-border/30"}`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold">{route.name}</p>
                  {route.best && (
                    <Badge className="text-xs bg-green-500/10 text-green-400 border-green-500/20">
                      Best Price
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Fee: {route.fee} · Liquidity: {route.liquidity}
                </p>
              </div>
              {route.best && (
                <CheckCircle className="h-5 w-5 text-green-400 shrink-0" />
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Swaps */}
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-bold">Recent Swaps</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {RECENT_SWAPS.map((swap, i) => (
            <div
              key={i}
              className="flex items-center gap-3 py-2 border-b border-border/20 last:border-0"
            >
              <div className="flex-1">
                <p className="text-sm font-medium">
                  {swap.fromAmt} {swap.from} → {swap.toAmt} {swap.to}
                </p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {swap.time}
                </p>
              </div>
              <Badge className="text-xs bg-green-500/10 text-green-400 border-green-500/20">
                ✓ {swap.status}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
