import { useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  Plus,
  Key,
  AlertTriangle,
  Wallet,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const WALLETS = [
  {
    id: 1,
    name: "ShadowChat DAO Treasury",
    address: "0x4444...Sky4",
    balance: "$3,857,521",
    required: 3,
    total: 5,
    owners: [
      "SkylerBlue.eth",
      "DevDAO.eth",
      "CryptoWhale.eth",
      "ShadowAdmin.eth",
      "Trustee.eth",
    ],
  },
  {
    id: 2,
    name: "Team Operations Fund",
    address: "0x8888...Ops1",
    balance: "$444,444",
    required: 2,
    total: 3,
    owners: ["SkylerBlue.eth", "DevDAO.eth", "CFO.eth"],
  },
];

const PENDING_TXS = [
  {
    id: 1,
    wallet: "ShadowChat DAO Treasury",
    to: "0xDev...Grant",
    amount: "100,000 SKY4444",
    purpose: "Developer Grant Q2",
    approvals: ["SkylerBlue.eth", "DevDAO.eth"],
    required: 3,
    total: 5,
    status: "pending",
  },
  {
    id: 2,
    wallet: "Team Operations Fund",
    to: "0xOps...Payroll",
    amount: "$44,444 USDT",
    purpose: "May 2026 Payroll",
    approvals: ["SkylerBlue.eth"],
    required: 2,
    total: 3,
    status: "pending",
  },
];

export default function ShadowMultiSig() {
  const [tab, setTab] = useState<"wallets" | "pending" | "history" | "create">(
    "wallets"
  );
  const [approvals, setApprovals] = useState<Record<number, string[]>>(
    Object.fromEntries(PENDING_TXS.map(tx => [tx.id, tx.approvals]))
  );

  const approve = (txId: number, required: number) => {
    setApprovals(prev => {
      const current = prev[txId] || [];
      if (current.includes("You.eth")) return prev;
      const updated = [...current, "You.eth"];
      if (updated.length >= required) {
        toast.success(
          "✅ Transaction executed! All required signatures collected."
        );
      } else {
        toast.success(
          `✅ Signature added! ${updated.length}/${required} approvals`
        );
      }
      return { ...prev, [txId]: updated };
    });
  };

  const reject = (txId: number) => {
    toast.error("❌ Transaction rejected and removed from queue.");
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Shield className="h-6 w-6 text-cyan-400" />
            Multi-Sig Wallets
          </h1>
          <p className="text-sm text-muted-foreground">
            Secure multi-signature treasury management
          </p>
        </div>
        <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20 font-bold">
          🔐 Secure
        </Badge>
      </div>

      <div className="flex gap-2">
        {(["wallets", "pending", "history", "create"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-cyan-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "wallets" && (
        <div className="space-y-3">
          {WALLETS.map((wallet, i) => (
            <motion.div
              key={wallet.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="border-cyan-500/20 bg-cyan-900/5">
                <CardContent className="py-4 px-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-black text-sm">{wallet.name}</p>
                      <p className="text-xs text-muted-foreground font-mono">
                        {wallet.address}
                      </p>
                    </div>
                    <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20 text-xs">
                      {wallet.required}-of-{wallet.total}
                    </Badge>
                  </div>
                  <div className="p-3 rounded-xl bg-black/10 text-center">
                    <p className="text-xs text-muted-foreground">Balance</p>
                    <p className="font-black text-lg text-cyan-400">
                      {wallet.balance}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground mb-2">
                      SIGNERS ({wallet.total})
                    </p>
                    <div className="space-y-1">
                      {wallet.owners.map(owner => (
                        <div
                          key={owner}
                          className="flex items-center gap-2 text-xs"
                        >
                          <div className="h-5 w-5 rounded-full bg-cyan-500/10 flex items-center justify-center shrink-0">
                            <Key className="h-3 w-3 text-cyan-400" />
                          </div>
                          <span className="font-mono text-muted-foreground">
                            {owner}
                          </span>
                          {owner === "SkylerBlue.eth" && (
                            <Badge className="text-xs bg-yellow-500/10 text-yellow-400 border-yellow-500/20 ml-auto">
                              Owner
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "pending" && (
        <div className="space-y-3">
          {PENDING_TXS.map((tx, i) => {
            const currentApprovals = approvals[tx.id] || [];
            const approved = currentApprovals.length >= tx.required;
            return (
              <Card
                key={tx.id}
                className={`border ${approved ? "border-green-500/20" : "border-orange-500/20"}`}
              >
                <CardContent className="py-4 px-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-black text-sm">{tx.purpose}</p>
                      <p className="text-xs text-muted-foreground">
                        {tx.wallet}
                      </p>
                    </div>
                    <Badge
                      className={`text-xs ${approved ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-orange-500/10 text-orange-400 border-orange-500/20"}`}
                    >
                      {approved ? "Ready to Execute" : "Pending"}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 rounded-xl bg-muted/50 text-center">
                      <p className="text-xs text-muted-foreground">Amount</p>
                      <p className="font-black text-xs text-cyan-400">
                        {tx.amount}
                      </p>
                    </div>
                    <div className="p-2 rounded-xl bg-muted/50 text-center">
                      <p className="text-xs text-muted-foreground">To</p>
                      <p className="font-black text-xs font-mono">{tx.to}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1.5">
                      Approvals: {currentApprovals.length}/{tx.required}{" "}
                      required
                    </p>
                    <div className="flex gap-1">
                      {Array.from({ length: tx.total }).map((_, j) => (
                        <div
                          key={j}
                          className={`flex-1 h-2 rounded-full ${j < currentApprovals.length ? "bg-green-500" : "bg-muted"}`}
                        />
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {currentApprovals.map(a => (
                        <Badge
                          key={a}
                          className="text-xs bg-green-500/10 text-green-400 border-green-500/20"
                        >
                          ✓ {a}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  {!approved && !currentApprovals.includes("You.eth") && (
                    <div className="flex gap-2">
                      <Button
                        className="flex-1 h-9 text-xs bg-green-600 text-white border-0 font-bold"
                        onClick={() => approve(tx.id, tx.required)}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 h-9 text-xs border-red-500/20 text-red-400 font-bold"
                        onClick={() => reject(tx.id)}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  )}
                  {approved && (
                    <Button
                      className="w-full h-9 text-xs bg-cyan-600 text-white border-0 font-bold"
                      onClick={() =>
                        toast.success("✅ Transaction executed on-chain!")
                      }
                    >
                      <Wallet className="h-4 w-4 mr-2" />
                      Execute Transaction
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {tab === "history" && (
        <Card className="border-border/50">
          <CardContent className="py-8 text-center">
            <Clock className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
            <p className="font-bold text-sm">No transaction history</p>
            <p className="text-xs text-muted-foreground">
              Executed transactions will appear here
            </p>
          </CardContent>
        </Card>
      )}

      {tab === "create" && (
        <Card className="border-cyan-500/20 bg-cyan-900/5">
          <CardContent className="py-4 px-4 space-y-3">
            <p className="font-bold text-sm">Create New Multi-Sig Wallet</p>
            <Input
              placeholder="Wallet Name (e.g., Marketing Fund)"
              className="h-9 text-xs"
            />
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-xs text-muted-foreground mb-1">
                  Required Signatures
                </p>
                <select className="w-full h-9 rounded-xl border border-border bg-background px-3 text-xs focus:outline-none">
                  {[2, 3, 4, 5].map(n => (
                    <option key={n}>{n}</option>
                  ))}
                </select>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">
                  Total Signers
                </p>
                <select className="w-full h-9 rounded-xl border border-border bg-background px-3 text-xs focus:outline-none">
                  {[3, 4, 5, 7, 9].map(n => (
                    <option key={n}>{n}</option>
                  ))}
                </select>
              </div>
            </div>
            <Input
              placeholder="Signer 1 address (0x... or ENS)"
              className="h-9 text-xs"
            />
            <Input
              placeholder="Signer 2 address (0x... or ENS)"
              className="h-9 text-xs"
            />
            <Input
              placeholder="Signer 3 address (0x... or ENS)"
              className="h-9 text-xs"
            />
            <Button
              className="w-full h-10 text-xs bg-cyan-600 text-white border-0 font-bold"
              onClick={() =>
                toast.success("✅ Multi-sig wallet deployed on-chain!")
              }
            >
              <Shield className="h-4 w-4 mr-2" />
              Deploy Multi-Sig Wallet
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
