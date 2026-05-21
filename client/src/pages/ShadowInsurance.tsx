import { useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  CheckCircle,
  AlertTriangle,
  Coins,
  Zap,
  FileText,
  Clock,
  ChevronRight,
  Plus,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const PLANS = [
  {
    id: "wallet",
    name: "Wallet Guard",
    emoji: "🔐",
    coverage: "$10,000",
    premium: "44 SKY/month",
    desc: "Covers wallet hacks, phishing, and unauthorized transfers",
    features: [
      "Hack protection",
      "Phishing coverage",
      "24hr claim payout",
      "Multi-wallet support",
    ],
    popular: false,
  },
  {
    id: "trade",
    name: "Trade Shield",
    emoji: "📈",
    coverage: "$50,000",
    premium: "200 SKY/month",
    desc: "Covers trading losses from exchange hacks and smart contract bugs",
    features: [
      "Exchange hack coverage",
      "Smart contract bugs",
      "Flash loan attacks",
      "Rug pull protection",
    ],
    popular: true,
  },
  {
    id: "nft",
    name: "NFT Protect",
    emoji: "🖼️",
    coverage: "$25,000",
    premium: "100 SKY/month",
    desc: "Insure your NFT collection against theft, platform collapse, and fraud",
    features: [
      "Theft coverage",
      "Platform collapse",
      "Fraud protection",
      "Floor price guarantee",
    ],
    popular: false,
  },
  {
    id: "enterprise",
    name: "Enterprise Vault",
    emoji: "🏦",
    coverage: "$1,000,000",
    premium: "2,000 SKY/month",
    desc: "Full enterprise-grade coverage for businesses and large holders",
    features: [
      "Full portfolio coverage",
      "Business continuity",
      "Legal assistance",
      "Dedicated claims agent",
    ],
    popular: false,
  },
];

const MY_POLICIES = [
  {
    plan: "Wallet Guard",
    coverage: "$10,000",
    premium: "44 SKY/month",
    status: "active",
    expires: "May 15, 2027",
    emoji: "🔐",
    policyId: "POL-4441",
  },
  {
    plan: "NFT Protect",
    coverage: "$25,000",
    premium: "100 SKY/month",
    status: "active",
    expires: "Dec 31, 2026",
    emoji: "🖼️",
    policyId: "POL-4442",
  },
];

const CLAIMS = [
  {
    id: "CLM-001",
    type: "Wallet Guard",
    amount: "$2,400",
    status: "approved",
    date: "May 10, 2026",
    desc: "Unauthorized transfer due to phishing attack",
  },
  {
    id: "CLM-002",
    type: "NFT Protect",
    amount: "$8,000",
    status: "under_review",
    date: "May 13, 2026",
    desc: "NFT stolen from compromised marketplace",
  },
];

export default function ShadowInsurance() {
  const [tab, setTab] = useState<"plans" | "mypolicies" | "claims" | "pool">(
    "plans"
  );
  const [activePolicies, setActivePolicies] = useState<string[]>([
    "wallet",
    "nft",
  ]);

  const purchasePlan = (planId: string, planName: string) => {
    setActivePolicies(p => [...p, planId]);
    toast.success(`✅ ${planName} policy activated! You're now protected.`);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Shield className="h-6 w-6 text-emerald-400" />
            ShadowInsure
          </h1>
          <p className="text-sm text-muted-foreground">
            Decentralized crypto insurance — protect your assets on-chain
          </p>
        </div>
        <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 font-bold">
          🛡️ {activePolicies.length} Active
        </Badge>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        {[
          {
            label: "Total Coverage",
            value: "$35,000",
            emoji: "🛡️",
            color: "text-emerald-400",
          },
          {
            label: "Monthly Premium",
            value: "144 SKY",
            emoji: "💰",
            color: "text-yellow-400",
          },
          {
            label: "Claims Paid",
            value: "$2,400",
            emoji: "✅",
            color: "text-green-400",
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
        {(["plans", "mypolicies", "claims", "pool"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-emerald-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t === "mypolicies" ? "My Policies" : t}
          </button>
        ))}
      </div>

      {tab === "plans" && (
        <div className="space-y-3">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Card
                className={`border ${plan.popular ? "border-emerald-500/30 bg-emerald-900/5" : "border-border/50"}`}
              >
                <CardContent className="py-4 px-4">
                  {plan.popular && (
                    <Badge className="text-xs bg-emerald-500/10 text-emerald-400 border-emerald-500/20 mb-2">
                      ⭐ Most Popular
                    </Badge>
                  )}
                  <div className="flex items-start gap-3">
                    <span className="text-3xl shrink-0">{plan.emoji}</span>
                    <div className="flex-1">
                      <p className="font-black text-sm mb-0.5">{plan.name}</p>
                      <p className="text-xs text-muted-foreground mb-1">
                        {plan.desc}
                      </p>
                      <div className="flex gap-3 text-xs mb-2">
                        <span className="text-emerald-400 font-bold">
                          Coverage: {plan.coverage}
                        </span>
                        <span className="text-yellow-400 font-bold">
                          {plan.premium}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {plan.features.map(f => (
                          <Badge
                            key={f}
                            className="text-xs bg-muted text-muted-foreground"
                          >
                            <CheckCircle className="h-2.5 w-2.5 mr-1 text-green-400" />
                            {f}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Button
                    className={`w-full mt-3 h-9 text-xs font-bold ${activePolicies.includes(plan.id) ? "bg-muted text-muted-foreground" : "bg-emerald-600 text-white border-0"}`}
                    onClick={() =>
                      !activePolicies.includes(plan.id) &&
                      purchasePlan(plan.id, plan.name)
                    }
                  >
                    {activePolicies.includes(plan.id)
                      ? "✓ Already Active"
                      : `Get ${plan.name} — ${plan.premium}`}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "mypolicies" && (
        <div className="space-y-3">
          {MY_POLICIES.map((policy, i) => (
            <Card key={i} className="border-emerald-500/20 bg-emerald-900/5">
              <CardContent className="py-3 px-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{policy.emoji}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-bold text-sm">{policy.plan}</p>
                      <Badge className="text-xs bg-green-500/10 text-green-400 border-green-500/20">
                        ● Active
                      </Badge>
                    </div>
                    <div className="flex gap-3 text-xs text-muted-foreground">
                      <span>
                        Coverage:{" "}
                        <span className="text-emerald-400 font-bold">
                          {policy.coverage}
                        </span>
                      </span>
                      <span>
                        Premium:{" "}
                        <span className="text-yellow-400 font-bold">
                          {policy.premium}
                        </span>
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Expires: {policy.expires} · {policy.policyId}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-xs"
                    onClick={() =>
                      toast.info(`Filing claim for ${policy.plan}...`)
                    }
                  >
                    File Claim
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "claims" && (
        <div className="space-y-3">
          <Button
            className="w-full h-9 text-xs bg-emerald-600 text-white border-0"
            onClick={() => toast.info("Opening claim submission form...")}
          >
            <Plus className="h-3.5 w-3.5 mr-1.5" />
            Submit New Claim
          </Button>
          {CLAIMS.map((claim, i) => (
            <Card key={claim.id} className="border-border/50">
              <CardContent className="py-3 px-4">
                <div className="flex items-start gap-3">
                  <div
                    className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 ${claim.status === "approved" ? "bg-green-500/10" : "bg-yellow-500/10"}`}
                  >
                    {claim.status === "approved" ? (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    ) : (
                      <Clock className="h-5 w-5 text-yellow-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="font-bold text-sm">{claim.id}</p>
                      <Badge
                        className={`text-xs ${claim.status === "approved" ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"}`}
                      >
                        {claim.status === "approved"
                          ? "✓ Approved"
                          : "⏳ Under Review"}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {claim.desc}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {claim.type} · {claim.date}
                    </p>
                  </div>
                  <p
                    className={`font-black text-sm shrink-0 ${claim.status === "approved" ? "text-green-400" : "text-yellow-400"}`}
                  >
                    {claim.amount}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "pool" && (
        <div className="space-y-3">
          <Card className="border-emerald-500/20 bg-emerald-900/10">
            <CardContent className="py-4 px-4">
              <p className="font-black text-sm mb-2 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-emerald-400" />
                Insurance Pool
              </p>
              <p className="text-xs text-muted-foreground mb-3">
                Provide liquidity to the insurance pool and earn 8.5% APY in
                SKY4444. Pool funds are used to pay claims.
              </p>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {[
                  { label: "Pool Size", value: "$4.4M", emoji: "🏦" },
                  { label: "APY", value: "8.5%", emoji: "📈" },
                  { label: "Your Share", value: "$0", emoji: "💰" },
                  { label: "Claims Ratio", value: "2.1%", emoji: "📊" },
                ].map(s => (
                  <div
                    key={s.label}
                    className="p-2.5 rounded-xl bg-black/20 text-center"
                  >
                    <p className="text-lg">{s.emoji}</p>
                    <p className="font-black text-sm text-emerald-400">
                      {s.value}
                    </p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>
              <Button
                className="w-full h-9 text-xs bg-emerald-600 text-white border-0"
                onClick={() => toast.info("Opening pool deposit flow...")}
              >
                <Coins className="h-3.5 w-3.5 mr-1.5" />
                Provide Liquidity — Earn 8.5% APY
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
