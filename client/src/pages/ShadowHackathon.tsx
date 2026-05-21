import { useState } from "react";
import { motion } from "framer-motion";
import {
  Code,
  Trophy,
  Users,
  Clock,
  Zap,
  Star,
  CheckCircle,
  ArrowRight,
  Globe,
  Shield,
  Brain,
  Plus,
  GitBranch,
  Award,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const HACKATHONS = [
  {
    id: 1,
    title: "SKY4444 DeFi Innovation Sprint",
    status: "live",
    prize: "$50,000 SKY4444",
    deadline: "6 days left",
    participants: 342,
    teams: 87,
    category: "DeFi",
    description:
      "Build the next generation of DeFi protocols on the SKY4444 chain. Best yield optimizer, lending protocol, or DEX innovation wins.",
    tags: ["DeFi", "Smart Contracts", "Solidity"],
    sponsor: "ShadowChat Foundation",
    tracks: ["Best DeFi Protocol", "Best UX", "Best Security"],
  },
  {
    id: 2,
    title: "ShadowChat Mini-App Challenge",
    status: "live",
    prize: "$25,000 TRUMP",
    deadline: "12 days left",
    participants: 218,
    teams: 54,
    category: "Mini-Apps",
    description:
      "Create the most innovative mini-application for the ShadowChat ecosystem. Games, utilities, social tools — all welcome.",
    tags: ["React", "TypeScript", "Web3"],
    sponsor: "Skyler Blue IT Resolutions",
    tracks: ["Most Innovative", "Best Game", "Best Utility"],
  },
  {
    id: 3,
    title: "AI x Crypto Hackathon",
    status: "upcoming",
    prize: "$75,000 Mixed",
    deadline: "Starts in 3 days",
    participants: 0,
    teams: 0,
    category: "AI",
    description:
      "Combine AI and blockchain to build tools that change how people interact with crypto. Trading bots, prediction markets, AI wallets.",
    tags: ["AI/ML", "Python", "Web3"],
    sponsor: "ShadowSwarm Labs",
    tracks: [
      "Best AI Trading Tool",
      "Best Prediction Market",
      "Best AI Wallet",
    ],
  },
  {
    id: 4,
    title: "IT Resolutions Automation Hackathon",
    status: "upcoming",
    prize: "$15,000 Cash",
    deadline: "Starts in 7 days",
    participants: 0,
    teams: 0,
    category: "IT",
    description:
      "Build automation tools for managed IT services. RMM integrations, ticketing automation, network monitoring solutions.",
    tags: ["Python", "APIs", "Automation"],
    sponsor: "Skyler Blue IT Resolutions",
    tracks: [
      "Best RMM Tool",
      "Best Ticketing Integration",
      "Best Monitoring Dashboard",
    ],
  },
  {
    id: 5,
    title: "Global Charity Gaming Jam",
    status: "ended",
    prize: "Distributed",
    deadline: "Ended",
    participants: 567,
    teams: 142,
    category: "Gaming",
    description:
      "Build games where proceeds go to charity. 100% of entry fees and in-game purchases donated to verified causes.",
    tags: ["Game Dev", "Unity", "Web3"],
    sponsor: "CharityHub DAO",
    tracks: ["Best Game", "Most Charitable", "Best Web3 Integration"],
  },
];

const MY_TEAM = {
  name: "ShadowBuilders",
  members: ["Skyler B.", "Alex K.", "Maria C.", "Dev T."],
  hackathon: "SKY4444 DeFi Innovation Sprint",
  project: "ShadowYield — Auto-compounding vault with AI rebalancing",
  progress: 65,
  submissions: 1,
};

export default function ShadowHackathon() {
  const [tab, setTab] = useState<"active" | "upcoming" | "ended" | "my-team">(
    "active"
  );

  const filtered =
    tab === "my-team"
      ? []
      : HACKATHONS.filter(h =>
          tab === "active"
            ? h.status === "live"
            : tab === "upcoming"
              ? h.status === "upcoming"
              : h.status === "ended"
        );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Code className="h-6 w-6 text-green-400" />
            ShadowHackathon
          </h1>
          <p className="text-sm text-muted-foreground">
            Build, compete, and win in the ShadowChat ecosystem
          </p>
        </div>
        <Button
          className="bg-green-600 text-white border-0 font-bold h-9 text-sm"
          onClick={() => toast.success("Team registration opened!")}
        >
          <Plus className="h-4 w-4 mr-2" />
          Register Team
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2">
        {[
          {
            label: "Total Prize Pool",
            value: "$165K+",
            color: "text-yellow-400",
          },
          { label: "Active Hackers", value: "560", color: "text-green-400" },
          { label: "Teams", value: "141", color: "text-cyan-400" },
          { label: "Hackathons", value: "5", color: "text-purple-400" },
        ].map(s => (
          <Card key={s.label} className="border-border/50 text-center">
            <CardContent className="py-3 px-2">
              <p className={`font-black text-lg ${s.color}`}>{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {(
          [
            ["active", "🔥 Live"],
            ["upcoming", "⏳ Upcoming"],
            ["ended", "✅ Ended"],
            ["my-team", "👥 My Team"],
          ] as const
        ).map(([t, label]) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${tab === t ? "bg-green-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* My Team Tab */}
      {tab === "my-team" && (
        <div className="space-y-4">
          <Card className="border-green-500/20 bg-green-900/5">
            <CardContent className="py-5 px-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <p className="font-black text-base">{MY_TEAM.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {MY_TEAM.hackathon}
                  </p>
                </div>
                <Badge className="ml-auto bg-green-500/10 text-green-400 border-green-500/20">
                  Active
                </Badge>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span>Project Progress</span>
                  <span className="text-green-400">{MY_TEAM.progress}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-green-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${MY_TEAM.progress}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </div>
              <p className="text-sm font-medium">{MY_TEAM.project}</p>
              <div className="flex flex-wrap gap-2">
                {MY_TEAM.members.map(m => (
                  <Badge
                    key={m}
                    className="bg-muted text-muted-foreground border-0 text-xs"
                  >
                    {m}
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="flex-1 bg-green-600 text-white border-0 text-xs"
                  onClick={() => toast.success("Submission portal opened!")}
                >
                  <GitBranch className="h-3.5 w-3.5 mr-1" />
                  Submit Project
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs"
                  onClick={() => toast.info("Team chat opened!")}
                >
                  Team Chat
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Hackathon Cards */}
      {tab !== "my-team" && (
        <div className="space-y-4">
          {filtered.map((h, i) => (
            <motion.div
              key={h.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <Card
                className={`border-border/50 hover:border-green-500/20 transition-all ${h.status === "ended" ? "opacity-70" : ""}`}
              >
                <CardContent className="py-5 px-5">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <p className="font-black text-base">{h.title}</p>
                        <Badge
                          className={`text-xs border-0 ${h.status === "live" ? "bg-green-500/10 text-green-400" : h.status === "upcoming" ? "bg-yellow-500/10 text-yellow-400" : "bg-muted text-muted-foreground"}`}
                        >
                          {h.status === "live"
                            ? "🔴 Live"
                            : h.status === "upcoming"
                              ? "⏳ Upcoming"
                              : "✅ Ended"}
                        </Badge>
                        <Badge className="text-xs bg-muted text-muted-foreground border-0">
                          {h.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {h.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {h.tags.map(t => (
                          <Badge
                            key={t}
                            className="text-xs bg-muted text-muted-foreground border-0"
                          >
                            {t}
                          </Badge>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                        <div className="bg-muted/50 rounded-lg px-2 py-1.5 text-center">
                          <p className="text-muted-foreground">Prize</p>
                          <p className="font-bold text-yellow-400">{h.prize}</p>
                        </div>
                        <div className="bg-muted/50 rounded-lg px-2 py-1.5 text-center">
                          <p className="text-muted-foreground">Deadline</p>
                          <p className="font-bold">{h.deadline}</p>
                        </div>
                        <div className="bg-muted/50 rounded-lg px-2 py-1.5 text-center">
                          <p className="text-muted-foreground">Participants</p>
                          <p className="font-bold">{h.participants}</p>
                        </div>
                        <div className="bg-muted/50 rounded-lg px-2 py-1.5 text-center">
                          <p className="text-muted-foreground">Teams</p>
                          <p className="font-bold">{h.teams}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <p className="text-xs font-bold text-muted-foreground">
                      Tracks
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {h.tracks.map(t => (
                        <Badge
                          key={t}
                          className="text-xs bg-green-500/5 text-green-400 border-green-500/20"
                        >
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  {h.status !== "ended" && (
                    <div className="flex gap-2 mt-4">
                      <Button
                        size="sm"
                        className="flex-1 bg-green-600 text-white border-0 text-xs font-bold"
                        onClick={() =>
                          toast.success(`Registered for ${h.title}!`)
                        }
                      >
                        <Zap className="h-3.5 w-3.5 mr-1" />
                        Join Hackathon
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs"
                        onClick={() => toast.info("Sponsor: " + h.sponsor)}
                      >
                        Details
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
