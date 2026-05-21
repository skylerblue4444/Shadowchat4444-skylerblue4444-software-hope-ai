import { useState } from "react";
import { motion } from "framer-motion";
import {
  Rocket,
  Star,
  Clock,
  Users,
  Coins,
  Shield,
  TrendingUp,
  CheckCircle,
  Lock,
  Zap,
  Globe,
  ChevronRight,
  Timer,
  BarChart2,
  Gift,
  ArrowUpRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const TIERS = [
  {
    name: "Satellite",
    min: 1000,
    allocation: "$100",
    emoji: "🛸",
    color: "text-gray-400",
    bg: "bg-gray-500/10",
  },
  {
    name: "Explorer",
    min: 5000,
    allocation: "$500",
    emoji: "🌙",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    name: "Astronaut",
    min: 25000,
    allocation: "$2,500",
    emoji: "👨‍🚀",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
  {
    name: "Commander",
    min: 100000,
    allocation: "$10,000",
    emoji: "🚀",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
  },
  {
    name: "Galaxy",
    min: 444444,
    allocation: "Guaranteed",
    emoji: "⚡",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
  },
];

const PROJECTS = [
  {
    id: "p1",
    name: "ShadowChain",
    symbol: "SHDW",
    desc: "Layer-1 blockchain powering the ShadowChat ecosystem with 100k TPS and sub-second finality",
    status: "live",
    raise: 2000000,
    raised: 1680000,
    price: "$0.008",
    fdv: "$80M",
    startDate: "May 15, 2025",
    endDate: "May 20, 2025",
    participants: 4284,
    emoji: "🌑",
    tags: ["L1", "Infrastructure", "Featured"],
    audit: true,
    kyc: true,
  },
  {
    id: "p2",
    name: "CharityDAO",
    symbol: "CDAO",
    desc: "Decentralized charity governance platform powered by SKY4444, enabling transparent fund allocation",
    status: "upcoming",
    raise: 500000,
    raised: 0,
    price: "$0.04",
    fdv: "$20M",
    startDate: "May 25, 2025",
    endDate: "May 30, 2025",
    participants: 0,
    emoji: "❤️",
    tags: ["DAO", "Charity", "Social Impact"],
    audit: true,
    kyc: false,
  },
  {
    id: "p3",
    name: "MetaShadow",
    symbol: "MSHD",
    desc: "Virtual metaverse land and avatar platform built on ShadowChain with play-to-earn mechanics",
    status: "upcoming",
    raise: 1000000,
    raised: 0,
    price: "$0.02",
    fdv: "$40M",
    startDate: "Jun 5, 2025",
    endDate: "Jun 10, 2025",
    participants: 0,
    emoji: "🌐",
    tags: ["Metaverse", "GameFi", "NFT"],
    audit: false,
    kyc: true,
  },
  {
    id: "p4",
    name: "SkyAI",
    symbol: "SKAI",
    desc: "AI-powered trading and content creation platform with on-chain model ownership and revenue sharing",
    status: "completed",
    raise: 800000,
    raised: 800000,
    price: "$0.015",
    fdv: "$30M",
    startDate: "Apr 1, 2025",
    endDate: "Apr 5, 2025",
    participants: 8284,
    emoji: "🤖",
    tags: ["AI", "Trading", "Completed"],
    audit: true,
    kyc: true,
  },
];

const STATUS_CONFIG: Record<
  string,
  { label: string; color: string; bg: string }
> = {
  live: {
    label: "LIVE NOW",
    color: "text-green-400",
    bg: "bg-green-500/10 border-green-500/20",
  },
  upcoming: {
    label: "UPCOMING",
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
  },
  completed: {
    label: "COMPLETED",
    color: "text-gray-400",
    bg: "bg-gray-500/10 border-gray-500/20",
  },
};

export default function Launchpad() {
  const [tab, setTab] = useState<"all" | "live" | "upcoming" | "completed">(
    "all"
  );
  const [stakedSKY, setStakedSKY] = useState(25000);
  const userTier =
    TIERS.slice()
      .reverse()
      .find(t => stakedSKY >= t.min) || TIERS[0];

  const displayProjects =
    tab === "all" ? PROJECTS : PROJECTS.filter(p => p.status === tab);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Rocket className="h-6 w-6 text-orange-400" />
            ShadowPad Launchpad
          </h1>
          <p className="text-sm text-muted-foreground">
            Stake SKY4444 to access exclusive IDO allocations
          </p>
        </div>
        <Badge className="bg-orange-500/10 text-orange-400 border-orange-500/20 text-sm font-bold px-3 py-1">
          {userTier.emoji} {userTier.name} Tier
        </Badge>
      </div>

      {/* Your Tier */}
      <Card className="border-orange-500/20 bg-gradient-to-r from-orange-900/10 to-yellow-900/10">
        <CardContent className="pt-4 pb-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs text-muted-foreground">
                Your Staked SKY4444
              </p>
              <p className="font-black text-xl text-yellow-400">
                {stakedSKY.toLocaleString()} SKY4444
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Current Tier</p>
              <p className={`font-black text-lg ${userTier.color}`}>
                {userTier.emoji} {userTier.name}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-1">
            {TIERS.map((tier, i) => (
              <div
                key={tier.name}
                className={`p-2 rounded-xl border text-center transition-all ${stakedSKY >= tier.min ? `${tier.bg} border-current` : "bg-muted/10 border-border/20"}`}
              >
                <p className="text-lg">{tier.emoji}</p>
                <p
                  className={`text-xs font-bold ${stakedSKY >= tier.min ? tier.color : "text-muted-foreground"}`}
                >
                  {tier.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {(tier.min / 1000).toFixed(0)}K
                </p>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-3">
            <Button
              size="sm"
              className="flex-1 h-8 text-xs bg-orange-600 text-white border-0"
              onClick={() => toast.success("Opening staking page...")}
            >
              <Zap className="h-3.5 w-3.5 mr-1.5" />
              Stake More SKY4444
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-8 text-xs"
              onClick={() => toast.info("Allocation: " + userTier.allocation)}
            >
              My Allocation: {userTier.allocation}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        {[
          {
            label: "Total Raised",
            value: "$4.98M",
            icon: Coins,
            color: "text-green-400",
          },
          {
            label: "Projects Launched",
            value: "12",
            icon: Rocket,
            color: "text-orange-400",
          },
          {
            label: "Avg ROI",
            value: "+284%",
            icon: TrendingUp,
            color: "text-blue-400",
          },
        ].map(({ label, value, icon: Icon, color }) => (
          <Card key={label} className="border-border/50">
            <CardContent className="pt-3 pb-3 text-center">
              <Icon className={`h-5 w-5 ${color} mx-auto mb-1`} />
              <p className={`font-black text-lg ${color}`}>{value}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {(["all", "live", "upcoming", "completed"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-orange-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Projects */}
      <div className="space-y-4">
        {displayProjects.map((project, i) => {
          const statusCfg = STATUS_CONFIG[project.status];
          const pct =
            project.raise > 0
              ? Math.round((project.raised / project.raise) * 100)
              : 0;
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Card
                className={`border-border/50 ${project.status === "live" ? "border-green-500/20" : ""}`}
              >
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="h-12 w-12 rounded-2xl bg-muted/30 flex items-center justify-center text-3xl shrink-0">
                      {project.emoji}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-black text-base">{project.name}</h3>
                        <span className="text-xs text-muted-foreground font-mono">
                          ${project.symbol}
                        </span>
                        <Badge
                          className={`text-xs ${statusCfg.bg} ${statusCfg.color}`}
                        >
                          {statusCfg.label}
                        </Badge>
                        {project.audit && (
                          <Badge className="text-xs bg-green-500/10 text-green-400 border-green-500/20">
                            ✓ Audited
                          </Badge>
                        )}
                        {project.kyc && (
                          <Badge className="text-xs bg-blue-500/10 text-blue-400 border-blue-500/20">
                            ✓ KYC
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {project.desc}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-1 flex-wrap mb-3">
                    {project.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
                    {[
                      { label: "Price", value: project.price },
                      { label: "FDV", value: project.fdv },
                      {
                        label: "Hard Cap",
                        value: `$${(project.raise / 1000).toFixed(0)}K`,
                      },
                      {
                        label: "Participants",
                        value: project.participants.toLocaleString(),
                      },
                    ].map(({ label, value }) => (
                      <div
                        key={label}
                        className="p-2 rounded-xl bg-muted/20 text-center"
                      >
                        <p className="text-xs text-muted-foreground">{label}</p>
                        <p className="font-black text-sm">{value}</p>
                      </div>
                    ))}
                  </div>

                  {project.status !== "upcoming" && (
                    <div className="mb-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-bold text-green-400">
                          {pct}% filled
                        </span>
                      </div>
                      <Progress value={pct} className="h-2" />
                      <div className="flex justify-between text-xs mt-1 text-muted-foreground">
                        <span>
                          ${(project.raised / 1000).toFixed(0)}K raised
                        </span>
                        <span>${(project.raise / 1000).toFixed(0)}K goal</span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      <span>
                        {project.status === "completed"
                          ? `Ended ${project.endDate}`
                          : `${project.startDate} — ${project.endDate}`}
                      </span>
                    </div>
                    <Button
                      size="sm"
                      className={`h-8 text-xs ${project.status === "live" ? "bg-green-600 text-white border-0" : project.status === "upcoming" ? "bg-blue-600 text-white border-0" : "bg-muted text-muted-foreground"}`}
                      onClick={() =>
                        project.status === "live"
                          ? toast.success("Opening participation modal...")
                          : project.status === "upcoming"
                            ? toast.success("Registered for whitelist!")
                            : toast.info("Project completed")
                      }
                    >
                      {project.status === "live"
                        ? "Participate Now"
                        : project.status === "upcoming"
                          ? "Join Whitelist"
                          : "View Results"}
                      <ChevronRight className="h-3.5 w-3.5 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Submit Project */}
      <Card className="border-border/50 border-dashed">
        <CardContent className="py-6 text-center">
          <Rocket className="h-8 w-8 text-orange-400 mx-auto mb-2" />
          <p className="font-black text-sm mb-1">
            Launch Your Project on ShadowPad
          </p>
          <p className="text-xs text-muted-foreground mb-3">
            Apply to list your IDO and reach 100K+ crypto investors
          </p>
          <Button
            size="sm"
            className="bg-orange-600 text-white border-0"
            onClick={() => toast.success("Opening project submission form...")}
          >
            Apply to Launch
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
