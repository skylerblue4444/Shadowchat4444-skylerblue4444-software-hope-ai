import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Flame, Clock, TrendingDown, Zap, RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const NETWORKS = [
  {
    name: "Ethereum",
    symbol: "ETH",
    slow: "12",
    standard: "18",
    fast: "28",
    rapid: "42",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    name: "BSC",
    symbol: "BNB",
    slow: "3",
    standard: "5",
    fast: "8",
    rapid: "12",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
  },
  {
    name: "Polygon",
    symbol: "MATIC",
    slow: "30",
    standard: "45",
    fast: "60",
    rapid: "80",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
  {
    name: "Arbitrum",
    symbol: "ARB",
    slow: "0.1",
    standard: "0.2",
    fast: "0.3",
    rapid: "0.5",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    name: "SKY Chain",
    symbol: "SKY",
    slow: "0.001",
    standard: "0.002",
    fast: "0.003",
    rapid: "0.005",
    color: "text-green-400",
    bg: "bg-green-500/10",
  },
];

const GAS_HISTORY = [
  { time: "00:00", gwei: 18 },
  { time: "04:00", gwei: 12 },
  { time: "08:00", gwei: 42 },
  { time: "12:00", gwei: 68 },
  { time: "16:00", gwei: 84 },
  { time: "20:00", gwei: 52 },
  { time: "Now", gwei: 18 },
];

export default function ShadowGasTracker() {
  const [selected, setSelected] = useState("Ethereum");
  const [refreshing, setRefreshing] = useState(false);
  const net = NETWORKS.find(n => n.name === selected) || NETWORKS[0];
  const maxGwei = Math.max(...GAS_HISTORY.map(h => h.gwei));

  const refresh = async () => {
    setRefreshing(true);
    await new Promise(r => setTimeout(r, 1200));
    setRefreshing(false);
    toast.success("Gas prices updated");
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Flame className="h-6 w-6 text-orange-400" />
            Gas Tracker
          </h1>
          <p className="text-sm text-muted-foreground">
            Real-time gas prices across all supported networks
          </p>
        </div>
        <Button
          size="sm"
          className="h-8 bg-orange-600 text-white border-0 font-bold text-xs"
          onClick={refresh}
          disabled={refreshing}
        >
          {refreshing ? (
            <>
              <RefreshCw className="h-3.5 w-3.5 mr-1 animate-spin" />
              Updating...
            </>
          ) : (
            <>
              <RefreshCw className="h-3.5 w-3.5 mr-1" />
              Refresh
            </>
          )}
        </Button>
      </div>

      <div className="flex gap-2 flex-wrap">
        {NETWORKS.map(n => (
          <button
            key={n.name}
            onClick={() => setSelected(n.name)}
            className={
              "px-3 py-1.5 rounded-full text-xs font-medium transition-colors " +
              (selected === n.name
                ? "bg-orange-600 text-white"
                : "bg-muted text-muted-foreground")
            }
          >
            {n.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-2">
        {[
          {
            label: "🐢 Slow",
            value: net.slow + " Gwei",
            sub: "~5 min",
            color: "text-muted-foreground",
          },
          {
            label: "⚡ Standard",
            value: net.standard + " Gwei",
            sub: "~1 min",
            color: "text-yellow-400",
          },
          {
            label: "🚀 Fast",
            value: net.fast + " Gwei",
            sub: "~30 sec",
            color: "text-orange-400",
          },
          {
            label: "⚡⚡ Rapid",
            value: net.rapid + " Gwei",
            sub: "~10 sec",
            color: "text-red-400",
          },
        ].map(s => (
          <Card key={s.label} className="border-border/50 text-center">
            <CardContent className="py-3 px-2">
              <p className={"font-black text-lg " + s.color}>{s.value}</p>
              <p className="text-xs font-medium">{s.label}</p>
              <p className="text-xs text-muted-foreground">{s.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border/50">
        <CardContent className="py-4 px-4">
          <p className="text-sm font-bold mb-3">ETH Gas History (24h)</p>
          <div className="flex items-end gap-1 h-24">
            {GAS_HISTORY.map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <motion.div
                  className="w-full rounded-t bg-orange-500/60"
                  style={{ height: (h.gwei / maxGwei) * 80 + "px" }}
                  initial={{ height: 0 }}
                  animate={{ height: (h.gwei / maxGwei) * 80 + "px" }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                />
                <p className="text-xs text-muted-foreground">{h.time}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-2">
        <p className="text-sm font-bold">Transaction Cost Estimator</p>
        {[
          {
            action: "Token Transfer",
            gasUnits: "21,000",
            costSlow: "$0.42",
            costFast: "$0.84",
          },
          {
            action: "NFT Mint",
            gasUnits: "120,000",
            costSlow: "$2.40",
            costFast: "$4.80",
          },
          {
            action: "DEX Swap",
            gasUnits: "180,000",
            costSlow: "$3.60",
            costFast: "$7.20",
          },
          {
            action: "Contract Deploy",
            gasUnits: "500,000",
            costSlow: "$10.00",
            costFast: "$20.00",
          },
        ].map(tx => (
          <Card key={tx.action} className="border-border/50">
            <CardContent className="py-2.5 px-4 flex items-center gap-3">
              <div className="flex-1">
                <p className="font-bold text-sm">{tx.action}</p>
                <p className="text-xs text-muted-foreground">
                  {tx.gasUnits} gas units
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs text-muted-foreground">
                  Slow:{" "}
                  <span className="text-yellow-400 font-bold">
                    {tx.costSlow}
                  </span>
                </p>
                <p className="text-xs text-muted-foreground">
                  Fast:{" "}
                  <span className="text-orange-400 font-bold">
                    {tx.costFast}
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
