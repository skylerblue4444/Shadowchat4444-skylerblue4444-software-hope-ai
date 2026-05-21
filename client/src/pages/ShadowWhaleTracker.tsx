import { useState } from "react";
import { motion } from "framer-motion";
import { Waves, TrendingUp, TrendingDown, Eye, Bell, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const WHALE_MOVES = [
  {
    wallet: "0x7f3a...2b9c",
    label: "Binance Hot Wallet",
    action: "BUY",
    asset: "SKY4444",
    amount: "42,000,000 SKY",
    value: "$3.53M",
    time: "3 min ago",
    impact: "HIGH",
  },
  {
    wallet: "0x4e1b...8a2f",
    label: "Unknown Whale",
    action: "SELL",
    asset: "TRUMP",
    amount: "8,400,000 TRUMP",
    value: "$840K",
    time: "12 min ago",
    impact: "MEDIUM",
  },
  {
    wallet: "0x9c2d...1e4a",
    label: "Coinbase Custody",
    action: "TRANSFER",
    asset: "BTC",
    amount: "420 BTC",
    value: "$39.9M",
    time: "28 min ago",
    impact: "HIGH",
  },
  {
    wallet: "0x2a8f...7d3e",
    label: "DeFi Whale",
    action: "BUY",
    asset: "ETH",
    amount: "2,800 ETH",
    value: "$8.4M",
    time: "45 min ago",
    impact: "MEDIUM",
  },
  {
    wallet: "0x5b1c...9f2a",
    label: "ICO Investor",
    action: "BUY",
    asset: "SKY4444",
    amount: "10,000,000 SKY",
    value: "$840K",
    time: "1 hr ago",
    impact: "MEDIUM",
  },
  {
    wallet: "0x8d4e...3c1b",
    label: "OTC Desk",
    action: "SELL",
    asset: "DOGE",
    amount: "50,000,000 DOGE",
    value: "$4.2M",
    time: "2 hr ago",
    impact: "HIGH",
  },
];

const TOP_WHALES = [
  {
    rank: 1,
    label: "SkyWhale Alpha",
    balance: "$142M SKY4444",
    pct: "14.2%",
    moves30d: 8,
  },
  {
    rank: 2,
    label: "CryptoKing",
    balance: "$84M SKY4444",
    pct: "8.4%",
    moves30d: 14,
  },
  {
    rank: 3,
    label: "ShadowFund",
    balance: "$42M SKY4444",
    pct: "4.2%",
    moves30d: 22,
  },
  {
    rank: 4,
    label: "ICO Reserve",
    balance: "$28M SKY4444",
    pct: "2.8%",
    moves30d: 3,
  },
  {
    rank: 5,
    label: "Team Wallet",
    balance: "$20M SKY4444",
    pct: "2.0%",
    moves30d: 1,
  },
];

export default function ShadowWhaleTracker() {
  const [tab, setTab] = useState("moves");
  const [alerts, setAlerts] = useState<string[]>([]);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Waves className="h-6 w-6 text-blue-400" />
            Whale Tracker
          </h1>
          <p className="text-sm text-muted-foreground">
            Monitor large wallet movements and get alerts for whale activity
          </p>
        </div>
        <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-xs">
          Live Monitoring
        </Badge>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {[
          { label: "Whale Moves (24h)", value: "142", color: "text-blue-400" },
          { label: "Volume Moved", value: "$284M", color: "text-green-400" },
          { label: "Buy/Sell Ratio", value: "2.4:1", color: "text-yellow-400" },
          { label: "Wallets Tracked", value: "8,420", color: "text-cyan-400" },
        ].map(s => (
          <Card key={s.label} className="border-border/50 text-center">
            <CardContent className="py-3 px-2">
              <p className={"font-black text-lg " + s.color}>{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-2">
        {["moves", "whales", "alerts"].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={
              "px-3 py-1.5 rounded-full text-xs font-medium transition-colors " +
              (tab === t
                ? "bg-blue-600 text-white"
                : "bg-muted text-muted-foreground")
            }
          >
            {t === "moves"
              ? "🐋 Moves"
              : t === "whales"
                ? "👑 Top Whales"
                : "🔔 Alerts"}
          </button>
        ))}
      </div>

      {tab === "moves" && (
        <div className="space-y-2">
          {WHALE_MOVES.map((move, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="border-border/50 hover:border-blue-500/20 transition-all">
                <CardContent className="py-3 px-4 flex items-center gap-3">
                  <div
                    className={
                      "h-9 w-9 rounded-xl flex items-center justify-center shrink-0 " +
                      (move.action === "BUY"
                        ? "bg-green-500/10"
                        : move.action === "SELL"
                          ? "bg-red-500/10"
                          : "bg-muted")
                    }
                  >
                    {move.action === "BUY" ? (
                      <TrendingUp className="h-4 w-4 text-green-400" />
                    ) : move.action === "SELL" ? (
                      <TrendingDown className="h-4 w-4 text-red-400" />
                    ) : (
                      <Waves className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Badge
                        className={
                          "text-xs border-0 " +
                          (move.action === "BUY"
                            ? "bg-green-500/10 text-green-400"
                            : move.action === "SELL"
                              ? "bg-red-500/10 text-red-400"
                              : "bg-muted text-muted-foreground")
                        }
                      >
                        {move.action}
                      </Badge>
                      <p className="font-bold text-sm">{move.asset}</p>
                      <Badge
                        className={
                          "text-xs border-0 " +
                          (move.impact === "HIGH"
                            ? "bg-orange-500/10 text-orange-400"
                            : "bg-muted text-muted-foreground")
                        }
                      >
                        {move.impact}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {move.label} · {move.time}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-black text-sm">{move.value}</p>
                    <p className="text-xs text-muted-foreground">
                      {move.amount}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "whales" && (
        <div className="space-y-2">
          {TOP_WHALES.map((whale, i) => (
            <Card key={whale.rank} className="border-border/50">
              <CardContent className="py-3 px-4 flex items-center gap-3">
                <div
                  className={
                    "h-8 w-8 rounded-full flex items-center justify-center shrink-0 font-black text-sm " +
                    (whale.rank === 1
                      ? "bg-yellow-500/20 text-yellow-400"
                      : whale.rank === 2
                        ? "bg-gray-500/20 text-gray-400"
                        : "bg-orange-500/20 text-orange-400")
                  }
                >
                  {whale.rank}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm">{whale.label}</p>
                  <p className="text-xs text-muted-foreground">
                    {whale.pct} of supply · {whale.moves30d} moves (30d)
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-black text-sm text-blue-400">
                    {whale.balance}
                  </p>
                  <button
                    onClick={() => {
                      setAlerts(prev => [...prev, whale.label]);
                      toast.success("Alert set for " + whale.label);
                    }}
                    className="text-xs text-muted-foreground hover:text-yellow-400 transition-colors"
                  >
                    <Bell className="h-3.5 w-3.5 inline mr-0.5" />
                    Watch
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "alerts" && (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Set custom alerts for whale movements above your threshold.
          </p>
          {["$100K+", "$500K+", "$1M+", "$10M+"].map(threshold => (
            <Card key={threshold} className="border-border/50">
              <CardContent className="py-3 px-4 flex items-center gap-3">
                <Bell className="h-4 w-4 text-muted-foreground shrink-0" />
                <div className="flex-1">
                  <p className="font-bold text-sm">Moves over {threshold}</p>
                  <p className="text-xs text-muted-foreground">
                    Push + email notification
                  </p>
                </div>
                <Button
                  size="sm"
                  className="h-7 px-3 text-xs bg-blue-600 text-white border-0 font-bold"
                  onClick={() =>
                    toast.success("Alert set for " + threshold + " moves!")
                  }
                >
                  Set Alert
                </Button>
              </CardContent>
            </Card>
          ))}
          {alerts.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-bold text-muted-foreground">
                Active Wallet Alerts:
              </p>
              {alerts.map(a => (
                <Badge
                  key={a}
                  className="bg-blue-500/10 text-blue-400 border-0 text-xs mr-2"
                >
                  {a}
                </Badge>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
