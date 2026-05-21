import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpDown,
  Droplets,
  TrendingUp,
  Coins,
  Zap,
  Plus,
  Minus,
  Info,
  RefreshCw,
  Settings,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const POOLS = [
  {
    pair: "SKY4444/USDT",
    tvl: "$2.4M",
    apy: "44.4%",
    vol24h: "$444K",
    myLiquidity: "$1,244",
    fee: "0.3%",
  },
  {
    pair: "TRUMP/USDT",
    tvl: "$8.8M",
    apy: "22.2%",
    vol24h: "$1.2M",
    myLiquidity: "$0",
    fee: "0.3%",
  },
  {
    pair: "SKY4444/ETH",
    tvl: "$1.2M",
    apy: "88.8%",
    vol24h: "$188K",
    myLiquidity: "$444",
    fee: "0.5%",
  },
  {
    pair: "BTC/USDT",
    tvl: "$44M",
    apy: "8.4%",
    vol24h: "$12M",
    myLiquidity: "$0",
    fee: "0.1%",
  },
  {
    pair: "DOGE/USDT",
    tvl: "$888K",
    apy: "33.3%",
    vol24h: "$88K",
    myLiquidity: "$0",
    fee: "0.3%",
  },
];

const TOKENS = ["SKY4444", "TRUMP", "ETH", "BTC", "USDT", "DOGE", "XMR", "BNB"];

export default function ShadowDEX() {
  const [tab, setTab] = useState<"swap" | "pools" | "farm" | "analytics">(
    "swap"
  );
  const [fromToken, setFromToken] = useState("SKY4444");
  const [toToken, setToToken] = useState("USDT");
  const [fromAmount, setFromAmount] = useState("");
  const [slippage, setSlippage] = useState("0.5");
  const [swapping, setSwapping] = useState(false);

  const toAmount = fromAmount
    ? (parseFloat(fromAmount) * 0.044).toFixed(4)
    : "";

  const swap = async () => {
    if (!fromAmount) {
      toast.error("Enter an amount");
      return;
    }
    setSwapping(true);
    await new Promise(r => setTimeout(r, 1800));
    setSwapping(false);
    toast.success(
      `✅ Swapped ${fromAmount} ${fromToken} → ${toAmount} ${toToken}!`
    );
    setFromAmount("");
  };

  const flipTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <ArrowUpDown className="h-6 w-6 text-emerald-400" />
            ShadowDEX
          </h1>
          <p className="text-sm text-muted-foreground">
            Decentralized exchange — swap, pool, and farm
          </p>
        </div>
        <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 font-bold">
          💧 $57M TVL
        </Badge>
      </div>

      <div className="flex gap-2">
        {(["swap", "pools", "farm", "analytics"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-emerald-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "swap" && (
        <div className="space-y-3">
          <Card className="border-emerald-500/20 bg-emerald-900/5">
            <CardContent className="py-4 px-4 space-y-3">
              <div className="flex items-center justify-between">
                <p className="font-bold text-sm">Swap Tokens</p>
                <button
                  className="p-1.5 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                  onClick={() => toast.info("Opening settings...")}
                >
                  <Settings className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>

              {/* From */}
              <div className="p-3 rounded-xl bg-black/20 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">From</p>
                  <p className="text-xs text-muted-foreground">
                    Balance: 44,444 SKY4444
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    value={fromAmount}
                    onChange={e => setFromAmount(e.target.value)}
                    type="number"
                    placeholder="0.00"
                    className="flex-1 h-10 text-lg font-black border-0 bg-transparent p-0 focus-visible:ring-0"
                  />
                  <select
                    value={fromToken}
                    onChange={e => setFromToken(e.target.value)}
                    className="h-10 rounded-xl border border-border bg-background px-3 text-sm font-bold focus:outline-none"
                  >
                    {TOKENS.map(t => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Flip */}
              <div className="flex justify-center">
                <button
                  onClick={flipTokens}
                  className="h-9 w-9 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
                >
                  <ArrowUpDown className="h-4 w-4 text-emerald-400" />
                </button>
              </div>

              {/* To */}
              <div className="p-3 rounded-xl bg-black/20 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    To (estimated)
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Balance: 0 USDT
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    value={toAmount}
                    readOnly
                    placeholder="0.00"
                    className="flex-1 h-10 text-lg font-black border-0 bg-transparent p-0 focus-visible:ring-0 text-emerald-400"
                  />
                  <select
                    value={toToken}
                    onChange={e => setToToken(e.target.value)}
                    className="h-10 rounded-xl border border-border bg-background px-3 text-sm font-bold focus:outline-none"
                  >
                    {TOKENS.map(t => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Info */}
              {fromAmount && (
                <div className="p-2.5 rounded-xl bg-black/10 space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rate</span>
                    <span>
                      1 {fromToken} = 0.044 {toToken}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price Impact</span>
                    <span className="text-green-400">&lt;0.1%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fee (0.3%)</span>
                    <span>
                      {(parseFloat(fromAmount) * 0.003).toFixed(4)} {fromToken}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Slippage</span>
                    <span>{slippage}%</span>
                  </div>
                </div>
              )}

              <Button
                className="w-full h-11 text-sm font-black bg-emerald-600 text-white border-0"
                onClick={swap}
                disabled={swapping || !fromAmount}
              >
                {swapping ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Swapping...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Swap Now
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "pools" && (
        <div className="space-y-3">
          <Button
            className="w-full h-10 text-xs bg-emerald-600 text-white border-0 font-bold"
            onClick={() => toast.info("Opening add liquidity flow...")}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Liquidity
          </Button>
          {POOLS.map((pool, i) => (
            <motion.div
              key={pool.pair}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <Card className="border-border/50 hover:border-emerald-500/20 transition-all">
                <CardContent className="py-3 px-4">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                      <Droplets className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="font-black text-sm">{pool.pair}</p>
                        <Badge className="text-xs bg-muted text-muted-foreground">
                          Fee {pool.fee}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs mt-1">
                        <div>
                          <p className="text-muted-foreground">TVL</p>
                          <p className="font-bold text-emerald-400">
                            {pool.tvl}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">APY</p>
                          <p className="font-bold text-green-400">{pool.apy}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">24h Vol</p>
                          <p className="font-bold">{pool.vol24h}</p>
                        </div>
                      </div>
                      {pool.myLiquidity !== "$0" && (
                        <p className="text-xs text-emerald-400 font-bold mt-1">
                          My Liquidity: {pool.myLiquidity}
                        </p>
                      )}
                    </div>
                    <Button
                      size="sm"
                      className="h-8 text-xs bg-emerald-600 text-white border-0 shrink-0"
                      onClick={() =>
                        toast.info(`Adding liquidity to ${pool.pair}...`)
                      }
                    >
                      Add
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "farm" && (
        <div className="space-y-3">
          <Card className="border-emerald-500/20 bg-emerald-900/5">
            <CardContent className="py-4 px-4">
              <p className="font-bold text-sm mb-1">🌾 Yield Farming</p>
              <p className="text-xs text-muted-foreground mb-3">
                Stake LP tokens to earn additional SKY4444 rewards on top of
                trading fees.
              </p>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {[
                  { label: "Total Farmed", value: "244 SKY4444" },
                  { label: "Pending Rewards", value: "44 SKY4444" },
                  { label: "Best APY", value: "88.8%" },
                  { label: "Your Farms", value: "2 active" },
                ].map(s => (
                  <div
                    key={s.label}
                    className="p-2 rounded-xl bg-black/20 text-center"
                  >
                    <p className="font-black text-xs text-emerald-400">
                      {s.value}
                    </p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>
              <Button
                className="w-full h-9 text-xs bg-emerald-600 text-white border-0 font-bold"
                onClick={() =>
                  toast.success("✅ Harvested 44 SKY4444 rewards!")
                }
              >
                <Zap className="h-4 w-4 mr-2" />
                Harvest All Rewards
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "analytics" && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "Total TVL", value: "$57M", emoji: "💧" },
              { label: "24h Volume", value: "$13.9M", emoji: "📊" },
              { label: "Total Swaps", value: "444K", emoji: "🔄" },
              { label: "Unique LPs", value: "8,888", emoji: "👥" },
            ].map(s => (
              <Card key={s.label} className="border-border/50 text-center">
                <CardContent className="pt-2.5 pb-2.5">
                  <p className="text-lg">{s.emoji}</p>
                  <p className="font-black text-sm text-emerald-400">
                    {s.value}
                  </p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card className="border-border/50">
            <CardContent className="py-4 px-4">
              <p className="font-bold text-sm mb-3">Top Pools by TVL</p>
              {POOLS.slice(0, 3).map((pool, i) => (
                <div
                  key={pool.pair}
                  className="flex items-center gap-3 py-2 border-b border-border/20 last:border-0"
                >
                  <p className="text-xs text-muted-foreground w-4">{i + 1}</p>
                  <p className="font-bold text-xs flex-1">{pool.pair}</p>
                  <p className="text-xs text-emerald-400 font-bold">
                    {pool.tvl}
                  </p>
                  <Badge className="text-xs bg-green-500/10 text-green-400 border-green-500/20">
                    {pool.apy} APY
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
