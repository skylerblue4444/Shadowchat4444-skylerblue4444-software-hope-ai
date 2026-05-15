import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, TrendingUp, DollarSign, RefreshCw, Plus, ArrowUpRight, BarChart3, Layers, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const VAULTS = [
  { id: 1, name: "SKY4444-ETH LP Vault", protocol: "ShadowDEX", apy: 124.5, tvl: "$4.44M", risk: "Medium", token: "SKY4444-ETH LP", deposited: 1000, earned: 124.5, strategy: "Auto-compound LP fees + SKY4444 rewards", color: "#6366f1" },
  { id: 2, name: "TRUMP-USDT Yield Farm", protocol: "ShadowFarm", apy: 444.4, tvl: "$888K", risk: "High", token: "TRUMP-USDT LP", deposited: 500, earned: 222.2, strategy: "TRUMP staking + USDT yield boost", color: "#ef4444" },
  { id: 3, name: "BTC Lending Vault", protocol: "ShadowLend", apy: 8.8, tvl: "$12.2M", risk: "Low", token: "wBTC", deposited: 0.05, earned: 0.0044, strategy: "Lend BTC to borrowers, earn interest", color: "#f59e0b" },
  { id: 4, name: "Stablecoin Optimizer", protocol: "ShadowStable", apy: 18.4, tvl: "$22.2M", risk: "Low", token: "USDT/USDC/DAI", deposited: 2000, earned: 184, strategy: "Auto-rotate between highest-yield stable pools", color: "#22c55e" },
];

const RISK_COLORS: Record<string, string> = {
  Low: "text-green-400 bg-green-500/10 border-green-500/20",
  Medium: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  High: "text-red-400 bg-red-500/10 border-red-500/20",
};

export default function ShadowDeFiYield() {
  const [tab, setTab] = useState<"vaults" | "positions" | "history">("vaults");
  const [depositAmounts, setDepositAmounts] = useState<Record<number, string>>({});
  const [deposited, setDeposited] = useState<Set<number>>(new Set([1, 2, 3, 4]));

  const totalDeposited = VAULTS.reduce((sum, v) => sum + v.deposited, 0);
  const totalEarned = VAULTS.reduce((sum, v) => sum + v.earned, 0);

  const deposit = (vault: typeof VAULTS[0]) => {
    const amount = depositAmounts[vault.id];
    if (!amount || parseFloat(amount) <= 0) { toast.error("Enter a valid amount"); return; }
    setDeposited(prev => new Set(Array.from(prev).concat([vault.id])));
    toast.success(`✅ Deposited ${amount} ${vault.token} into ${vault.name}!`);
    setDepositAmounts(prev => ({ ...prev, [vault.id]: "" }));
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><Zap className="h-6 w-6 text-yellow-400" />DeFi Yield Optimizer</h1>
          <p className="text-sm text-muted-foreground">Auto-compounding vaults — maximize your yield</p>
        </div>
        <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20 font-bold">⚡ Auto</Badge>
      </div>

      {/* Portfolio Summary */}
      <Card className="border-yellow-500/20 bg-gradient-to-br from-yellow-900/10 to-green-900/5">
        <CardContent className="py-4 px-4">
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Total Deposited", value: `$${(totalDeposited + 2000).toLocaleString()}`, icon: DollarSign, color: "text-yellow-400" },
              { label: "Total Earned", value: `$${totalEarned.toFixed(2)}`, icon: TrendingUp, color: "text-green-400" },
              { label: "Avg APY", value: "149%", icon: BarChart3, color: "text-blue-400" },
            ].map(s => (
              <div key={s.label} className="text-center">
                <s.icon className={`h-5 w-5 mx-auto mb-1 ${s.color}`} />
                <p className={`font-black text-sm ${s.color}`}>{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-2">
        {(["vaults", "positions", "history"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-yellow-600 text-white" : "bg-muted text-muted-foreground"}`}>{t}</button>
        ))}
      </div>

      {tab === "vaults" && (
        <div className="space-y-3">
          {VAULTS.map((vault, i) => (
            <motion.div key={vault.id} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <Card className="border-border/50 hover:border-yellow-500/20 transition-all">
                <CardContent className="py-4 px-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-9 w-9 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: vault.color + "20" }}>
                        <Layers className="h-4 w-4" style={{ color: vault.color }} />
                      </div>
                      <div>
                        <p className="font-black text-sm">{vault.name}</p>
                        <p className="text-xs text-muted-foreground">{vault.protocol} · TVL: {vault.tvl}</p>
                      </div>
                    </div>
                    <Badge className={`text-xs ${RISK_COLORS[vault.risk]}`}>{vault.risk}</Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-2 rounded-xl bg-green-500/5 border border-green-500/10 text-center">
                      <p className="text-xs text-muted-foreground">APY</p>
                      <p className="font-black text-sm text-green-400">{vault.apy}%</p>
                    </div>
                    <div className="p-2 rounded-xl bg-blue-500/5 border border-blue-500/10 text-center">
                      <p className="text-xs text-muted-foreground">Deposited</p>
                      <p className="font-black text-xs text-blue-400">{vault.deposited}</p>
                    </div>
                    <div className="p-2 rounded-xl bg-yellow-500/5 border border-yellow-500/10 text-center">
                      <p className="text-xs text-muted-foreground">Earned</p>
                      <p className="font-black text-xs text-yellow-400">{vault.earned}</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground bg-muted/30 rounded-lg px-3 py-2">⚡ {vault.strategy}</p>
                  <div className="flex gap-2">
                    <Input
                      value={depositAmounts[vault.id] || ""}
                      onChange={e => setDepositAmounts(prev => ({ ...prev, [vault.id]: e.target.value }))}
                      placeholder={`Amount in ${vault.token}`}
                      className="h-9 text-xs flex-1"
                      type="number"
                    />
                    <Button size="sm" className="h-9 text-xs font-bold text-white border-0 px-4 shrink-0" style={{ backgroundColor: vault.color }} onClick={() => deposit(vault)}>
                      Deposit
                    </Button>
                    <Button size="sm" variant="outline" className="h-9 text-xs font-bold shrink-0" onClick={() => toast.success(`✅ Harvested ${vault.earned} from ${vault.name}!`)}>
                      <RefreshCw className="h-3.5 w-3.5 mr-1" />Harvest
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "positions" && (
        <div className="space-y-2">
          {VAULTS.filter(v => deposited.has(v.id)).map(vault => (
            <Card key={vault.id} className="border-border/50">
              <CardContent className="py-3 px-4 flex items-center gap-3">
                <div className="h-9 w-9 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: vault.color + "20" }}>
                  <Zap className="h-4 w-4" style={{ color: vault.color }} />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm">{vault.name}</p>
                  <p className="text-xs text-muted-foreground">{vault.apy}% APY · {vault.protocol}</p>
                </div>
                <div className="text-right">
                  <p className="font-black text-sm text-green-400">+{vault.earned}</p>
                  <p className="text-xs text-muted-foreground">earned</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "history" && (
        <div className="space-y-2">
          {[
            { action: "Deposit", vault: "SKY4444-ETH LP Vault", amount: "1,000 LP", date: "May 10, 2026", type: "deposit" },
            { action: "Harvest", vault: "Stablecoin Optimizer", amount: "+$184 USDT", date: "May 12, 2026", type: "harvest" },
            { action: "Deposit", vault: "BTC Lending Vault", amount: "0.05 wBTC", date: "May 8, 2026", type: "deposit" },
          ].map((tx, i) => (
            <Card key={i} className="border-border/50">
              <CardContent className="py-3 px-4 flex items-center gap-3">
                <div className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 font-bold text-xs ${tx.type === "deposit" ? "bg-blue-500/10 text-blue-400" : "bg-green-500/10 text-green-400"}`}>
                  {tx.type === "deposit" ? "DEP" : "HRV"}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm">{tx.action} · {tx.vault}</p>
                  <p className="text-xs text-muted-foreground">{tx.date}</p>
                </div>
                <p className="font-black text-sm text-green-400">{tx.amount}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
