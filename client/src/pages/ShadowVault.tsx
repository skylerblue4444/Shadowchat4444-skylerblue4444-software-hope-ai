import { useState } from "react";
import { motion } from "framer-motion";
import {
  Lock,
  Shield,
  Key,
  Users,
  Clock,
  AlertTriangle,
  CheckCircle,
  Eye,
  EyeOff,
  Copy,
  Download,
  Plus,
  Zap,
  Star,
  ChevronRight,
  Fingerprint,
  RefreshCw,
  FileText,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const VAULT_ASSETS = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    amount: 2.84,
    value: 295845,
    emoji: "₿",
    locked: true,
    coldStorage: true,
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    amount: 44.4,
    value: 170673,
    emoji: "Ξ",
    locked: true,
    coldStorage: false,
  },
  {
    symbol: "SKY4444",
    name: "SkyBlue Token",
    amount: 444444,
    value: 53333,
    emoji: "⚡",
    locked: false,
    coldStorage: false,
  },
  {
    symbol: "TRUMP",
    name: "Trump Token",
    amount: 2844,
    value: 80883,
    emoji: "🇺🇸",
    locked: false,
    coldStorage: false,
  },
];

const MULTISIG_SIGNERS = [
  {
    name: "Skyler Blue (You)",
    address: "0xSKY...4444",
    role: "Owner",
    signed: true,
    emoji: "⚡",
  },
  {
    name: "Hardware Key #1",
    address: "0xHW1...A1B2",
    role: "Co-signer",
    signed: true,
    emoji: "🔑",
  },
  {
    name: "Trusted Contact",
    address: "0xTC1...C3D4",
    role: "Co-signer",
    signed: false,
    emoji: "👤",
  },
];

const VAULT_HISTORY = [
  {
    type: "deposit",
    asset: "BTC",
    amount: "+0.5 BTC",
    time: "2 days ago",
    status: "confirmed",
  },
  {
    type: "lock",
    asset: "ETH",
    amount: "44.4 ETH locked",
    time: "1 week ago",
    status: "active",
  },
  {
    type: "withdrawal",
    asset: "SKY4444",
    amount: "-10,000 SKY4444",
    time: "2 weeks ago",
    status: "confirmed",
  },
];

export default function ShadowVault() {
  const [showKey, setShowKey] = useState(false);
  const [tab, setTab] = useState<
    "assets" | "multisig" | "inheritance" | "history"
  >("assets");
  const totalValue = VAULT_ASSETS.reduce((s, a) => s + a.value, 0);
  const lockedValue = VAULT_ASSETS.filter(a => a.locked).reduce(
    (s, a) => s + a.value,
    0
  );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Lock className="h-6 w-6 text-yellow-400" />
            ShadowVault
          </h1>
          <p className="text-sm text-muted-foreground">
            Institutional-grade crypto security & cold storage
          </p>
        </div>
        <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20 font-bold">
          🔒 2-of-3 Multi-Sig
        </Badge>
      </div>

      {/* Vault Overview */}
      <Card className="border-yellow-500/20 bg-gradient-to-br from-yellow-900/10 to-orange-900/10">
        <CardContent className="pt-5 pb-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-14 w-14 rounded-2xl bg-yellow-500/10 flex items-center justify-center">
              <Lock className="h-7 w-7 text-yellow-400" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Vault Value</p>
              <p className="font-black text-3xl">
                ${totalValue.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">
                ${lockedValue.toLocaleString()} in cold storage
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="p-2.5 rounded-xl bg-muted/20 text-center">
              <p className="font-black text-sm text-green-400">
                {VAULT_ASSETS.length}
              </p>
              <p className="text-xs text-muted-foreground">Assets</p>
            </div>
            <div className="p-2.5 rounded-xl bg-muted/20 text-center">
              <p className="font-black text-sm text-blue-400">2-of-3</p>
              <p className="text-xs text-muted-foreground">Multi-Sig</p>
            </div>
            <div className="p-2.5 rounded-xl bg-muted/20 text-center">
              <p className="font-black text-sm text-yellow-400">A+</p>
              <p className="text-xs text-muted-foreground">Security Score</p>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Button
              size="sm"
              className="h-8 text-xs bg-yellow-600 text-white border-0 flex-1"
              onClick={() => toast.success("Opening deposit flow...")}
            >
              <Plus className="h-3.5 w-3.5 mr-1.5" />
              Deposit
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-8 text-xs flex-1"
              onClick={() =>
                toast.info("Multi-sig withdrawal requires 2 signatures")
              }
            >
              <Download className="h-3.5 w-3.5 mr-1.5" />
              Withdraw
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="flex gap-2">
        {(["assets", "multisig", "inheritance", "history"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-yellow-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "assets" && (
        <div className="space-y-3">
          {VAULT_ASSETS.map((asset, i) => (
            <motion.div
              key={asset.symbol}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Card className="border-border/50">
                <CardContent className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-xl bg-muted/30 flex items-center justify-center text-2xl shrink-0">
                      {asset.emoji}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-black text-sm">{asset.symbol}</p>
                        {asset.coldStorage && (
                          <Badge className="text-xs bg-blue-500/10 text-blue-400 border-blue-500/20">
                            ❄️ Cold
                          </Badge>
                        )}
                        {asset.locked && (
                          <Badge className="text-xs bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
                            🔒 Locked
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {asset.amount.toLocaleString()} {asset.symbol}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-sm">
                        ${asset.value.toLocaleString()}
                      </p>
                      <button
                        onClick={() =>
                          toast.info(
                            asset.locked
                              ? "Unlock requires multi-sig"
                              : `Managing ${asset.symbol}...`
                          )
                        }
                        className="text-xs text-muted-foreground hover:text-white"
                      >
                        {asset.locked ? "🔒 Locked" : "Manage →"}
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
          <Button
            variant="outline"
            className="w-full h-9 text-xs"
            onClick={() => toast.info("Add asset to vault...")}
          >
            <Plus className="h-3.5 w-3.5 mr-1.5" />
            Add Asset to Vault
          </Button>
        </div>
      )}

      {tab === "multisig" && (
        <div className="space-y-3">
          <Card className="border-border/50">
            <CardContent className="py-3 px-4">
              <p className="font-bold text-sm mb-1">
                2-of-3 Multi-Signature Setup
              </p>
              <p className="text-xs text-muted-foreground mb-3">
                Any transaction requires 2 out of 3 signers to approve. This
                protects against single points of failure.
              </p>
              <div className="space-y-2">
                {MULTISIG_SIGNERS.map(signer => (
                  <div
                    key={signer.name}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-muted/20"
                  >
                    <span className="text-xl">{signer.emoji}</span>
                    <div className="flex-1">
                      <p className="font-bold text-xs">{signer.name}</p>
                      <p className="font-mono text-xs text-muted-foreground">
                        {signer.address}
                      </p>
                      <Badge className="text-xs mt-0.5">{signer.role}</Badge>
                    </div>
                    {signer.signed ? (
                      <CheckCircle className="h-5 w-5 text-green-400 shrink-0" />
                    ) : (
                      <Clock className="h-5 w-5 text-muted-foreground shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Button
            variant="outline"
            className="w-full h-9 text-xs"
            onClick={() => toast.info("Adding new signer...")}
          >
            <Plus className="h-3.5 w-3.5 mr-1.5" />
            Add Signer
          </Button>
        </div>
      )}

      {tab === "inheritance" && (
        <div className="space-y-3">
          <Card className="border-border/50">
            <CardContent className="py-4 px-4">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="h-5 w-5 text-purple-400" />
                <p className="font-bold text-sm">Crypto Inheritance Plan</p>
                <Badge className="text-xs bg-purple-500/10 text-purple-400 border-purple-500/20">
                  Active
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                If your account is inactive for 365 days, your vault will be
                distributed to your designated beneficiaries.
              </p>
              <div className="space-y-2">
                {[
                  {
                    name: "Primary Beneficiary",
                    share: "70%",
                    contact: "Family Member",
                    status: "Verified",
                  },
                  {
                    name: "Secondary Beneficiary",
                    share: "20%",
                    contact: "Trusted Friend",
                    status: "Pending",
                  },
                  {
                    name: "Charity (ShadowCharity)",
                    share: "10%",
                    contact: "ShadowChat DAO",
                    status: "Verified",
                  },
                ].map(b => (
                  <div
                    key={b.name}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-muted/20"
                  >
                    <div className="flex-1">
                      <p className="font-bold text-xs">{b.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {b.contact}
                      </p>
                    </div>
                    <p className="font-black text-sm text-green-400">
                      {b.share}
                    </p>
                    <Badge
                      className={`text-xs ${b.status === "Verified" ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"}`}
                    >
                      {b.status}
                    </Badge>
                  </div>
                ))}
              </div>
              <div className="mt-3 p-2.5 rounded-xl bg-muted/10 border border-border/30">
                <p className="text-xs text-muted-foreground">
                  Inactivity timer:{" "}
                  <span className="font-bold text-white">
                    342 days remaining
                  </span>
                </p>
                <Progress value={6} className="h-1 mt-1.5" />
              </div>
            </CardContent>
          </Card>
          <Button
            className="w-full h-9 text-xs bg-purple-600 text-white border-0"
            onClick={() => toast.success("Updating inheritance plan...")}
          >
            Update Inheritance Plan
          </Button>
        </div>
      )}

      {tab === "history" && (
        <div className="space-y-2">
          {VAULT_HISTORY.map((tx, i) => (
            <Card key={i} className="border-border/50">
              <CardContent className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 ${tx.type === "deposit" ? "bg-green-500/10" : tx.type === "withdrawal" ? "bg-red-500/10" : "bg-yellow-500/10"}`}
                  >
                    {tx.type === "deposit" ? (
                      <Plus className="h-4 w-4 text-green-400" />
                    ) : tx.type === "withdrawal" ? (
                      <Download className="h-4 w-4 text-red-400" />
                    ) : (
                      <Lock className="h-4 w-4 text-yellow-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm capitalize">
                      {tx.type} — {tx.asset}
                    </p>
                    <p className="text-xs text-muted-foreground">{tx.time}</p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-bold text-sm ${tx.type === "deposit" ? "text-green-400" : tx.type === "withdrawal" ? "text-red-400" : "text-yellow-400"}`}
                    >
                      {tx.amount}
                    </p>
                    <Badge className="text-xs bg-green-500/10 text-green-400 border-green-500/20">
                      {tx.status}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
