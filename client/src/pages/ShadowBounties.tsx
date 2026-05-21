import { useState } from "react";
import { motion } from "framer-motion";
import {
  Target,
  Shield,
  Code,
  DollarSign,
  Clock,
  CheckCircle,
  Star,
  Zap,
  Users,
  ArrowRight,
  Brain,
  Award,
  Bug,
  Plus,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

type Severity = "Critical" | "High" | "Medium" | "Low";
type BountyType = "Bug" | "Feature" | "Content" | "Security" | "Research";

interface Bounty {
  id: number;
  title: string;
  type: BountyType;
  severity?: Severity;
  reward: string;
  rewardUSD: string;
  deadline: string;
  status: "open" | "claimed" | "completed";
  submissions: number;
  description: string;
  tags: string[];
  sponsor: string;
}

const BOUNTIES: Bounty[] = [
  {
    id: 1,
    title: "Critical: Smart Contract Reentrancy Vulnerability",
    type: "Security",
    severity: "Critical",
    reward: "50,000 SKY4444",
    rewardUSD: "$4,200",
    deadline: "Rolling",
    status: "open",
    submissions: 0,
    description:
      "Find and responsibly disclose any reentrancy vulnerabilities in the SKY4444 staking or DEX smart contracts. Full proof-of-concept required.",
    tags: ["Solidity", "Smart Contracts", "Security"],
    sponsor: "ShadowChat Foundation",
  },
  {
    id: 2,
    title: "AI Trading Bot Accuracy Improvement",
    type: "Feature",
    severity: undefined,
    reward: "15,000 SKY4444 + $500",
    rewardUSD: "$1,760",
    deadline: "14 days",
    status: "open",
    submissions: 7,
    description:
      "Improve the AI trading bot's win rate by at least 5% on backtested data. Submit a PR with benchmarks and methodology.",
    tags: ["Python", "ML", "Trading"],
    sponsor: "ShadowSwarm Labs",
  },
  {
    id: 3,
    title: "NFT Rarity Algorithm Enhancement",
    type: "Feature",
    severity: undefined,
    reward: "8,000 SKY4444",
    rewardUSD: "$672",
    deadline: "7 days",
    status: "open",
    submissions: 12,
    description:
      "Improve the NFT rarity scoring algorithm to account for trait combinations, not just individual trait rarity. Must pass all existing tests.",
    tags: ["TypeScript", "Algorithms", "NFT"],
    sponsor: "Impact Story NFT",
  },
  {
    id: 4,
    title: "High: Authentication Bypass in Admin Panel",
    type: "Bug",
    severity: "High",
    reward: "20,000 SKY4444",
    rewardUSD: "$1,680",
    deadline: "Rolling",
    status: "open",
    submissions: 2,
    description:
      "Find any authentication bypass or privilege escalation vulnerabilities in the admin panel. Responsible disclosure required.",
    tags: ["Security", "Auth", "Admin"],
    sponsor: "ShadowChat Foundation",
  },
  {
    id: 5,
    title: "Write SKY4444 Tokenomics Research Report",
    type: "Research",
    severity: undefined,
    reward: "5,000 SKY4444 + $200",
    rewardUSD: "$620",
    deadline: "21 days",
    status: "open",
    submissions: 4,
    description:
      "Write a comprehensive 3,000+ word research report comparing SKY4444 tokenomics to top 10 DeFi tokens. Must include charts and citations.",
    tags: ["Research", "Tokenomics", "Writing"],
    sponsor: "ShadowChat Marketing",
  },
  {
    id: 6,
    title: "Mobile Responsive Bug — Checkout Flow",
    type: "Bug",
    severity: "Medium",
    reward: "2,500 SKY4444",
    rewardUSD: "$210",
    deadline: "5 days",
    status: "claimed",
    submissions: 1,
    description:
      "Fix the checkout flow on mobile viewports < 375px. Payment method selection overlaps with order summary on iPhone SE.",
    tags: ["CSS", "React", "Mobile"],
    sponsor: "ShadowMarket Team",
  },
  {
    id: 7,
    title: "Translate Platform to Mandarin Chinese",
    type: "Content",
    severity: undefined,
    reward: "12,000 SKY4444 + $300",
    rewardUSD: "$1,308",
    deadline: "30 days",
    status: "open",
    submissions: 3,
    description:
      "Full platform translation to Simplified Mandarin Chinese. Must include all UI strings, error messages, and help text. Native speaker preferred.",
    tags: ["i18n", "Chinese", "Translation"],
    sponsor: "ShadowChinaMode Team",
  },
  {
    id: 8,
    title: "Gas Optimization — SKY4444 Staking Contract",
    type: "Feature",
    severity: undefined,
    reward: "10,000 SKY4444",
    rewardUSD: "$840",
    deadline: "10 days",
    status: "completed",
    submissions: 8,
    description:
      "Reduce gas costs for staking operations by at least 20%. Completed by @0xDev_Shadow — saved 34% gas.",
    tags: ["Solidity", "Gas", "Optimization"],
    sponsor: "ShadowDEX Team",
  },
];

const SEVERITY_COLORS: Record<Severity, string> = {
  Critical: "bg-red-500/10 text-red-400 border-red-500/20",
  High: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  Medium: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Low: "bg-blue-500/10 text-blue-400 border-blue-500/20",
};

const TYPE_ICONS: Record<BountyType, React.ElementType> = {
  Bug: Bug,
  Feature: Code,
  Content: Star,
  Security: Shield,
  Research: Brain,
};

export default function ShadowBounties() {
  const [typeFilter, setTypeFilter] = useState<BountyType | "All">("All");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "open" | "claimed" | "completed"
  >("open");

  const filtered = BOUNTIES.filter(
    b =>
      (typeFilter === "All" || b.type === typeFilter) &&
      (statusFilter === "all" || b.status === statusFilter)
  );

  const totalPool = BOUNTIES.filter(b => b.status !== "completed").reduce(
    (sum, b) => {
      const usd = parseFloat(b.rewardUSD.replace("$", "").replace(",", ""));
      return sum + usd;
    },
    0
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Target className="h-6 w-6 text-red-400" />
            ShadowBounties
          </h1>
          <p className="text-sm text-muted-foreground">
            Earn SKY4444 by fixing bugs, building features, and securing the
            platform
          </p>
        </div>
        <Button
          className="bg-red-600 text-white border-0 font-bold h-9 text-sm"
          onClick={() =>
            toast.info("Bounty posting requires admin approval. Contact team.")
          }
        >
          <Plus className="h-4 w-4 mr-2" />
          Post Bounty
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2">
        {[
          {
            label: "Open Bounties",
            value: BOUNTIES.filter(b => b.status === "open").length.toString(),
            color: "text-red-400",
          },
          {
            label: "Total Pool",
            value: `$${totalPool.toLocaleString()}`,
            color: "text-yellow-400",
          },
          {
            label: "Completed",
            value: BOUNTIES.filter(
              b => b.status === "completed"
            ).length.toString(),
            color: "text-green-400",
          },
          { label: "Avg Reward", value: "$840", color: "text-cyan-400" },
        ].map(s => (
          <Card key={s.label} className="border-border/50 text-center">
            <CardContent className="py-3 px-2">
              <p className={`font-black text-lg ${s.color}`}>{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="space-y-2">
        <div className="flex gap-1.5 flex-wrap">
          {(
            [
              "All",
              "Bug",
              "Feature",
              "Security",
              "Content",
              "Research",
            ] as const
          ).map(t => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${typeFilter === t ? "bg-red-600 text-white" : "bg-muted text-muted-foreground"}`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {(
            [
              ["all", "All"],
              ["open", "Open"],
              ["claimed", "Claimed"],
              ["completed", "Completed"],
            ] as const
          ).map(([v, label]) => (
            <button
              key={v}
              onClick={() => setStatusFilter(v)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${statusFilter === v ? "bg-muted-foreground text-background" : "bg-muted text-muted-foreground"}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        {filtered.length} bounties shown
      </p>

      {/* Bounty Cards */}
      <div className="space-y-3">
        {filtered.map((b, i) => {
          const Icon = TYPE_ICONS[b.type];
          return (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card
                className={`border-border/50 hover:border-red-500/20 transition-all ${b.status === "completed" ? "opacity-70" : ""}`}
              >
                <CardContent className="py-4 px-4 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className="h-9 w-9 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="h-4 w-4 text-red-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm leading-tight">
                          {b.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <Badge className="text-xs bg-muted text-muted-foreground border-0">
                            {b.type}
                          </Badge>
                          {b.severity && (
                            <Badge
                              className={`text-xs ${SEVERITY_COLORS[b.severity]}`}
                            >
                              {b.severity}
                            </Badge>
                          )}
                          <Badge
                            className={`text-xs border-0 ${b.status === "open" ? "bg-green-500/10 text-green-400" : b.status === "claimed" ? "bg-yellow-500/10 text-yellow-400" : "bg-muted text-muted-foreground"}`}
                          >
                            {b.status === "open"
                              ? "Open"
                              : b.status === "claimed"
                                ? "Claimed"
                                : "✅ Completed"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-black text-sm text-yellow-400">
                        {b.rewardUSD}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {b.reward}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {b.description}
                  </p>

                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex gap-1.5 flex-wrap">
                      {b.tags.map(t => (
                        <Badge
                          key={t}
                          className="text-xs bg-muted text-muted-foreground border-0"
                        >
                          {t}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {b.deadline}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {b.submissions} submissions
                      </span>
                    </div>
                  </div>

                  {b.status === "open" && (
                    <Button
                      size="sm"
                      className="w-full h-8 text-xs bg-red-600 text-white border-0 font-bold"
                      onClick={() =>
                        toast.success(
                          `Claimed bounty: ${b.title}! Check your dashboard for details.`
                        )
                      }
                    >
                      <Target className="h-3.5 w-3.5 mr-1" />
                      Claim Bounty — {b.rewardUSD}
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
