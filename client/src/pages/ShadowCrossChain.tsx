import { useState } from "react";
import {
  ArrowRight,
  Layers,
  Clock,
  CheckCircle,
  Zap,
  RefreshCw,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const CHAINS = [
  {
    name: "SKY Chain",
    icon: "🌌",
    native: "SKY4444",
    tvl: "$42M",
    tps: 50000,
    finality: "1s",
  },
  {
    name: "Ethereum",
    icon: "⟠",
    native: "ETH",
    tvl: "$180B",
    tps: 15,
    finality: "12s",
  },
  {
    name: "BSC",
    icon: "🟡",
    native: "BNB",
    tvl: "$8B",
    tps: 300,
    finality: "3s",
  },
  {
    name: "Solana",
    icon: "◎",
    native: "SOL",
    tvl: "$12B",
    tps: 65000,
    finality: "0.4s",
  },
  {
    name: "Polygon",
    icon: "🟣",
    native: "MATIC",
    tvl: "$2B",
    tps: 7000,
    finality: "2s",
  },
  {
    name: "Avalanche",
    icon: "🔺",
    native: "AVAX",
    tvl: "$3B",
    tps: 4500,
    finality: "1s",
  },
];

const RECENT_BRIDGES = [
  {
    from: "Ethereum",
    to: "SKY Chain",
    token: "ETH",
    amount: "2.5",
    status: "completed",
    time: "12s ago",
  },
  {
    from: "BSC",
    to: "Ethereum",
    token: "BNB",
    amount: "10",
    status: "pending",
    time: "45s ago",
  },
  {
    from: "SKY Chain",
    to: "Solana",
    token: "SKY",
    amount: "5000",
    status: "completed",
    time: "2m ago",
  },
];

export default function ShadowCrossChain() {
  const [fromChain, setFromChain] = useState("Ethereum");
  const [toChain, setToChain] = useState("SKY Chain");
  const [bridging, setBridging] = useState(false);

  const bridge = async () => {
    setBridging(true);
    await new Promise(r => setTimeout(r, 2000));
    setBridging(false);
    toast.success(
      "Bridge initiated — funds arrive in ~12 seconds on SKY Chain"
    );
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black flex items-center gap-2">
          <Layers className="h-6 w-6 text-cyan-400" />
          Cross-Chain Hub
        </h1>
        <p className="text-sm text-muted-foreground">
          Bridge assets across 6 networks with sub-second finality on SKY Chain
        </p>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Networks", value: "6", color: "text-cyan-400" },
          { label: "Total TVL", value: "$247B", color: "text-green-400" },
          { label: "Avg Bridge", value: "8s", color: "text-blue-400" },
        ].map(s => (
          <Card key={s.label} className="border-border/50 text-center">
            <CardContent className="py-3 px-2">
              <p className={"font-black text-xl " + s.color}>{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="border-border/50">
        <CardContent className="py-4 px-4 space-y-3">
          <p className="font-bold text-sm">Bridge Tokens</p>
          <div className="flex items-center gap-2">
            <select
              value={fromChain}
              onChange={e => setFromChain(e.target.value)}
              className="flex-1 h-10 px-3 rounded-xl bg-muted text-sm border border-border/50 focus:outline-none"
            >
              {CHAINS.map(c => (
                <option key={c.name}>
                  {c.icon} {c.name}
                </option>
              ))}
            </select>
            <ArrowRight className="h-4 w-4 text-cyan-400 shrink-0" />
            <select
              value={toChain}
              onChange={e => setToChain(e.target.value)}
              className="flex-1 h-10 px-3 rounded-xl bg-muted text-sm border border-border/50 focus:outline-none"
            >
              {CHAINS.map(c => (
                <option key={c.name}>
                  {c.icon} {c.name}
                </option>
              ))}
            </select>
          </div>
          <input
            placeholder="Amount to bridge"
            className="w-full h-10 px-3 rounded-xl bg-muted text-sm border border-border/50 focus:outline-none"
          />
          <Button
            className="w-full h-10 bg-cyan-600 text-white border-0 font-bold"
            onClick={bridge}
            disabled={bridging}
          >
            {bridging ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Bridging...
              </>
            ) : (
              <>
                <Zap className="h-4 w-4 mr-2" />
                Bridge Now
              </>
            )}
          </Button>
        </CardContent>
      </Card>
      <div className="space-y-2">
        <p className="text-sm font-bold">Supported Networks</p>
        <div className="grid grid-cols-2 gap-2">
          {CHAINS.map(chain => (
            <Card key={chain.name} className="border-border/50">
              <CardContent className="py-2.5 px-3 flex items-center gap-2">
                <span className="text-lg">{chain.icon}</span>
                <div className="flex-1">
                  <p className="font-bold text-xs">{chain.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {chain.tps.toLocaleString()} TPS · {chain.finality}
                  </p>
                </div>
                <p className="text-xs font-bold text-cyan-400">{chain.tvl}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-sm font-bold">Recent Bridges</p>
        {RECENT_BRIDGES.map((b, i) => (
          <Card key={i} className="border-border/50">
            <CardContent className="py-2.5 px-4 flex items-center gap-3">
              <div
                className={
                  "h-7 w-7 rounded-full flex items-center justify-center shrink-0 " +
                  (b.status === "completed"
                    ? "bg-green-500/10"
                    : "bg-yellow-500/10")
                }
              >
                {b.status === "completed" ? (
                  <CheckCircle className="h-3.5 w-3.5 text-green-400" />
                ) : (
                  <Clock className="h-3.5 w-3.5 text-yellow-400" />
                )}
              </div>
              <div className="flex-1 text-xs">
                <p className="font-bold">
                  {b.amount} {b.token}: {b.from} → {b.to}
                </p>
                <p className="text-muted-foreground">{b.time}</p>
              </div>
              <Badge
                className={
                  "text-xs border-0 " +
                  (b.status === "completed"
                    ? "bg-green-500/10 text-green-400"
                    : "bg-yellow-500/10 text-yellow-400")
                }
              >
                {b.status}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
