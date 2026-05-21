import { useState } from "react";
import { motion } from "framer-motion";
import {
  Coins,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  ArrowUpRight,
  ArrowDownLeft,
  Zap,
  Shield,
  BarChart3,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const MARKETS = [
  {
    asset: "SKY4444",
    emoji: "⚡",
    supplyAPY: "12.4%",
    borrowAPY: "18.2%",
    totalSupply: "$4.4M",
    totalBorrow: "$2.1M",
    utilization: 48,
    mySupply: "44,444",
    myBorrow: "0",
  },
  {
    asset: "TRUMP",
    emoji: "🇺🇸",
    supplyAPY: "8.8%",
    borrowAPY: "14.4%",
    totalSupply: "$8.8M",
    totalBorrow: "$3.3M",
    utilization: 38,
    mySupply: "0",
    myBorrow: "0",
  },
  {
    asset: "BTC",
    emoji: "₿",
    supplyAPY: "2.1%",
    borrowAPY: "5.5%",
    totalSupply: "$22M",
    totalBorrow: "$8.8M",
    utilization: 40,
    mySupply: "0.024",
    myBorrow: "0",
  },
  {
    asset: "ETH",
    emoji: "Ξ",
    supplyAPY: "3.4%",
    borrowAPY: "7.2%",
    totalSupply: "$15M",
    totalBorrow: "$6.6M",
    utilization: 44,
    mySupply: "0",
    myBorrow: "0",
  },
  {
    asset: "USDT",
    emoji: "💵",
    supplyAPY: "9.5%",
    borrowAPY: "12.0%",
    totalSupply: "$11M",
    totalBorrow: "$7.7M",
    utilization: 70,
    mySupply: "2,500",
    myBorrow: "0",
  },
  {
    asset: "DOGE",
    emoji: "🐕",
    supplyAPY: "5.5%",
    borrowAPY: "9.9%",
    totalSupply: "$3.3M",
    totalBorrow: "$1.1M",
    utilization: 33,
    mySupply: "0",
    myBorrow: "0",
  },
];

export default function ShadowLending() {
  const [tab, setTab] = useState<"markets" | "supply" | "borrow" | "positions">(
    "markets"
  );
  const [selectedAsset, setSelectedAsset] = useState(MARKETS[0]);
  const [amount, setAmount] = useState("");
  const [mode, setMode] = useState<"supply" | "borrow">("supply");

  const healthFactor = 2.44;

  const execute = () => {
    if (!amount) {
      toast.error("Enter an amount");
      return;
    }
    toast.success(
      `✅ ${mode === "supply" ? "Supplied" : "Borrowed"} ${amount} ${selectedAsset.asset}!`
    );
    setAmount("");
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Coins className="h-6 w-6 text-violet-400" />
            ShadowLend
          </h1>
          <p className="text-sm text-muted-foreground">
            Supply assets to earn yield or borrow against your crypto
          </p>
        </div>
        <Badge className="bg-violet-500/10 text-violet-400 border-violet-500/20 font-bold">
          Health: {healthFactor}x ✅
        </Badge>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-2">
        {[
          {
            label: "Net APY",
            value: "+10.2%",
            emoji: "📈",
            color: "text-green-400",
          },
          {
            label: "Supplied",
            value: "$4,892",
            emoji: "💰",
            color: "text-violet-400",
          },
          {
            label: "Borrowed",
            value: "$0",
            emoji: "📤",
            color: "text-yellow-400",
          },
        ].map(s => (
          <Card key={s.label} className="border-border/50 text-center">
            <CardContent className="pt-3 pb-3">
              <p className="text-xl mb-1">{s.emoji}</p>
              <p className={`font-black text-xs ${s.color}`}>{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-2">
        {(["markets", "supply", "borrow", "positions"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-violet-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "markets" && (
        <div className="space-y-2">
          <div className="grid grid-cols-4 gap-2 px-1 text-xs text-muted-foreground font-medium">
            <span>Asset</span>
            <span className="text-right">Supply APY</span>
            <span className="text-right">Borrow APY</span>
            <span className="text-right">Utilization</span>
          </div>
          {MARKETS.map((market, i) => (
            <motion.div
              key={market.asset}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card
                className="border-border/50 cursor-pointer hover:border-violet-500/20 transition-all"
                onClick={() => {
                  setSelectedAsset(market);
                  setTab("supply");
                }}
              >
                <CardContent className="py-3 px-4">
                  <div className="grid grid-cols-4 gap-2 items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{market.emoji}</span>
                      <span className="font-bold text-sm">{market.asset}</span>
                    </div>
                    <p className="text-right text-xs font-bold text-green-400">
                      {market.supplyAPY}
                    </p>
                    <p className="text-right text-xs font-bold text-orange-400">
                      {market.borrowAPY}
                    </p>
                    <div className="text-right">
                      <p className="text-xs font-bold">{market.utilization}%</p>
                      <Progress
                        value={market.utilization}
                        className="h-1 mt-1"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {(tab === "supply" || tab === "borrow") && (
        <div className="space-y-3">
          <div className="flex gap-2">
            {MARKETS.map(m => (
              <button
                key={m.asset}
                onClick={() => setSelectedAsset(m)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${selectedAsset.asset === m.asset ? "bg-violet-600 text-white" : "bg-muted text-muted-foreground"}`}
              >
                {m.emoji} {m.asset}
              </button>
            ))}
          </div>
          <Card className="border-violet-500/20 bg-violet-900/10">
            <CardContent className="py-4 px-4 space-y-3">
              <div className="flex gap-2">
                <button
                  onClick={() => setMode("supply")}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${mode === "supply" ? "bg-green-600 text-white" : "bg-muted text-muted-foreground"}`}
                >
                  Supply {selectedAsset.emoji}
                </button>
                <button
                  onClick={() => setMode("borrow")}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${mode === "borrow" ? "bg-orange-600 text-white" : "bg-muted text-muted-foreground"}`}
                >
                  Borrow {selectedAsset.emoji}
                </button>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{mode === "supply" ? "Supply APY" : "Borrow APY"}</span>
                <span
                  className={`font-bold ${mode === "supply" ? "text-green-400" : "text-orange-400"}`}
                >
                  {mode === "supply"
                    ? selectedAsset.supplyAPY
                    : selectedAsset.borrowAPY}
                </span>
              </div>
              <Input
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder={`Amount of ${selectedAsset.asset}`}
                className="h-9 text-xs"
                type="number"
              />
              <div className="flex gap-1.5">
                {["25%", "50%", "75%", "Max"].map(pct => (
                  <button
                    key={pct}
                    onClick={() =>
                      setAmount(
                        pct === "Max"
                          ? "44444"
                          : String(Math.round((44444 * parseInt(pct)) / 100))
                      )
                    }
                    className="flex-1 py-1 rounded-lg bg-muted text-xs font-medium hover:bg-muted/80 transition-colors"
                  >
                    {pct}
                  </button>
                ))}
              </div>
              <Button
                className={`w-full h-10 font-bold text-xs border-0 ${mode === "supply" ? "bg-green-600" : "bg-orange-600"} text-white`}
                onClick={execute}
              >
                {mode === "supply" ? (
                  <>
                    <ArrowDownLeft className="h-4 w-4 mr-2" />
                    Supply {amount || "0"} {selectedAsset.asset}
                  </>
                ) : (
                  <>
                    <ArrowUpRight className="h-4 w-4 mr-2" />
                    Borrow {amount || "0"} {selectedAsset.asset}
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "positions" && (
        <div className="space-y-3">
          <Card className="border-green-500/20 bg-green-900/5">
            <CardContent className="py-3 px-4">
              <p className="font-bold text-sm mb-2 text-green-400">
                Supplied Positions
              </p>
              {MARKETS.filter(m => m.mySupply !== "0").map(m => (
                <div
                  key={m.asset}
                  className="flex items-center justify-between py-1.5 border-b border-border/30 last:border-0"
                >
                  <div className="flex items-center gap-2">
                    <span>{m.emoji}</span>
                    <span className="font-medium text-sm">{m.asset}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm">{m.mySupply}</p>
                    <p className="text-xs text-green-400">{m.supplyAPY} APY</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="py-3 px-4">
              <p className="font-bold text-sm mb-2 text-muted-foreground">
                Borrowed Positions
              </p>
              <p className="text-xs text-muted-foreground text-center py-4">
                No active borrows — your collateral is safe
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
