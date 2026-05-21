import { useState } from "react";
import { motion } from "framer-motion";
import {
  Rocket,
  Users,
  DollarSign,
  Star,
  CheckCircle,
  Clock,
  ArrowRight,
  Brain,
  Globe,
  Shield,
  Zap,
  Award,
  TrendingUp,
  Building2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const COHORTS = [
  {
    id: 1,
    name: "Cohort 7 — DeFi & AI",
    status: "accepting",
    startDate: "June 1, 2026",
    duration: "12 weeks",
    funding: "$50K SKY4444 + $25K TRUMP",
    equity: "2–5%",
    spots: 10,
    applied: 87,
    accepted: 3,
    perks: [
      "$75K in funding",
      "Office space (virtual)",
      "Legal support",
      "VC introductions",
      "SKY4444 grants",
    ],
    focus: ["DeFi Protocols", "AI Trading", "Web3 Social", "IT Automation"],
  },
  {
    id: 2,
    name: "Cohort 6 — IT & SaaS",
    status: "active",
    startDate: "March 1, 2026",
    duration: "12 weeks",
    funding: "$40K Cash + $20K SKY4444",
    equity: "3–6%",
    spots: 8,
    applied: 124,
    accepted: 8,
    perks: [
      "$60K in funding",
      "Skyler Blue IT mentorship",
      "AWS credits",
      "Sales pipeline access",
    ],
    focus: ["Managed IT", "SaaS Tools", "Cybersecurity", "Cloud"],
  },
  {
    id: 3,
    name: "Cohort 5 — NFT & Gaming",
    status: "graduated",
    startDate: "Dec 1, 2025",
    duration: "12 weeks",
    funding: "$35K Mixed",
    equity: "2–4%",
    spots: 10,
    applied: 203,
    accepted: 10,
    perks: ["$35K in funding", "NFT launchpad access", "Gaming partnerships"],
    focus: ["NFT Platforms", "Play-to-Earn", "Metaverse", "GameFi"],
  },
];

const PORTFOLIO = [
  {
    name: "ShadowYield",
    raise: "$2.1M",
    valuation: "$12M",
    category: "DeFi",
    status: "Series A",
  },
  {
    name: "CryptoShield",
    raise: "$850K",
    valuation: "$4.2M",
    category: "Security",
    status: "Seed",
  },
  {
    name: "NFTForge",
    raise: "$1.4M",
    valuation: "$7.8M",
    category: "NFT",
    status: "Seed",
  },
  {
    name: "AITradeDesk",
    raise: "$3.2M",
    valuation: "$18M",
    category: "AI",
    status: "Series A",
  },
  {
    name: "SkyIT Tools",
    raise: "$600K",
    valuation: "$3.1M",
    category: "IT SaaS",
    status: "Seed",
  },
];

const MENTORS = [
  {
    name: "Skyler Blue Spiller",
    role: "IT & Business Strategy",
    expertise: "Managed IT, Startups, Web3",
  },
  {
    name: "Dr. A. Chen",
    role: "DeFi Protocol Design",
    expertise: "Smart Contracts, Tokenomics",
  },
  {
    name: "M. Rodriguez",
    role: "Growth & Marketing",
    expertise: "Web3 GTM, Community Building",
  },
  {
    name: "K. Williams",
    role: "Venture Capital",
    expertise: "Early-stage investing, Term sheets",
  },
];

export default function ShadowIncubator() {
  const [tab, setTab] = useState<"cohorts" | "portfolio" | "mentors" | "apply">(
    "cohorts"
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Rocket className="h-6 w-6 text-orange-400" />
            ShadowIncubator
          </h1>
          <p className="text-sm text-muted-foreground">
            Web3 startup incubator — funding, mentorship, and community
          </p>
        </div>
        <Button
          className="bg-orange-500 text-white border-0 font-bold h-9 text-sm"
          onClick={() => setTab("apply")}
        >
          <Rocket className="h-4 w-4 mr-2" />
          Apply Now
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2">
        {[
          {
            label: "Portfolio Companies",
            value: "23",
            color: "text-orange-400",
          },
          { label: "Total Funding", value: "$8.2M", color: "text-green-400" },
          { label: "Avg Valuation", value: "$9.1M", color: "text-cyan-400" },
          { label: "Success Rate", value: "84%", color: "text-yellow-400" },
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
            ["cohorts", "🚀 Cohorts"],
            ["portfolio", "💼 Portfolio"],
            ["mentors", "🧠 Mentors"],
            ["apply", "📝 Apply"],
          ] as const
        ).map(([t, label]) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${tab === t ? "bg-orange-500 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Cohorts */}
      {tab === "cohorts" && (
        <div className="space-y-4">
          {COHORTS.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Card
                className={`border-border/50 hover:border-orange-500/20 transition-all ${c.status === "graduated" ? "opacity-70" : ""}`}
              >
                <CardContent className="py-5 px-5 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-black text-base">{c.name}</p>
                        <Badge
                          className={`text-xs border-0 ${c.status === "accepting" ? "bg-green-500/10 text-green-400" : c.status === "active" ? "bg-blue-500/10 text-blue-400" : "bg-muted text-muted-foreground"}`}
                        >
                          {c.status === "accepting"
                            ? "✅ Accepting Apps"
                            : c.status === "active"
                              ? "🔵 In Progress"
                              : "🎓 Graduated"}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {c.duration} · Starts {c.startDate}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-black text-sm text-yellow-400">
                        {c.funding}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {c.equity} equity
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {c.focus.map(f => (
                      <Badge
                        key={f}
                        className="text-xs bg-orange-500/5 text-orange-400 border-orange-500/20"
                      >
                        {f}
                      </Badge>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="bg-muted/50 rounded-lg px-2 py-1.5 text-center">
                      <p className="text-muted-foreground">Spots</p>
                      <p className="font-bold">{c.spots}</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg px-2 py-1.5 text-center">
                      <p className="text-muted-foreground">Applied</p>
                      <p className="font-bold">{c.applied}</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg px-2 py-1.5 text-center">
                      <p className="text-muted-foreground">Accepted</p>
                      <p className="font-bold text-green-400">{c.accepted}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {c.perks.map(p => (
                      <Badge
                        key={p}
                        className="text-xs bg-muted text-muted-foreground border-0"
                      >
                        ✓ {p}
                      </Badge>
                    ))}
                  </div>
                  {c.status === "accepting" && (
                    <Button
                      size="sm"
                      className="w-full bg-orange-500 text-white border-0 text-xs font-bold"
                      onClick={() => {
                        setTab("apply");
                        toast.success("Application form opened!");
                      }}
                    >
                      Apply to {c.name}{" "}
                      <ArrowRight className="h-3.5 w-3.5 ml-1" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Portfolio */}
      {tab === "portfolio" && (
        <div className="space-y-3">
          {PORTFOLIO.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Card className="border-border/50">
                <CardContent className="py-3 px-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0">
                    <Building2 className="h-5 w-5 text-orange-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{p.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {p.category} · {p.status}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-sm text-green-400">
                      {p.raise} raised
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Val: {p.valuation}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Mentors */}
      {tab === "mentors" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {MENTORS.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="border-border/50">
                <CardContent className="py-4 px-4 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center text-white font-bold shrink-0">
                      {m.name[0]}
                    </div>
                    <div>
                      <p className="font-bold text-sm">{m.name}</p>
                      <p className="text-xs text-muted-foreground">{m.role}</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{m.expertise}</p>
                  <Button
                    size="sm"
                    className="w-full h-7 text-xs bg-orange-500/10 text-orange-400 border-orange-500/20"
                    onClick={() =>
                      toast.info(`Booking session with ${m.name}...`)
                    }
                  >
                    Book Session
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Apply */}
      {tab === "apply" && (
        <Card className="border-orange-500/20 bg-orange-900/5">
          <CardContent className="py-6 px-5 space-y-4">
            <p className="font-black text-base flex items-center gap-2">
              <Rocket className="h-5 w-5 text-orange-400" />
              Apply to ShadowIncubator
            </p>
            <p className="text-sm text-muted-foreground">
              Tell us about your startup. We accept Web3, IT, AI, and SaaS
              projects at all stages.
            </p>
            <div className="space-y-3">
              {[
                { placeholder: "Startup / Project Name", type: "text" },
                { placeholder: "Your Name & Email", type: "text" },
                { placeholder: "Website or GitHub (optional)", type: "text" },
              ].map((f, i) => (
                <input
                  key={i}
                  type={f.type}
                  placeholder={f.placeholder}
                  className="w-full h-10 px-4 rounded-xl bg-muted text-sm border border-border/50 focus:outline-none focus:border-orange-500/40"
                />
              ))}
              <textarea
                placeholder="Describe your project, traction, and what you're building in 2–3 sentences..."
                className="w-full h-24 px-4 py-3 rounded-xl bg-muted text-sm border border-border/50 focus:outline-none focus:border-orange-500/40 resize-none"
              />
              <select className="w-full h-10 px-4 rounded-xl bg-muted text-sm border border-border/50 focus:outline-none">
                <option>Select cohort focus area</option>
                <option>DeFi & AI</option>
                <option>IT & SaaS</option>
                <option>NFT & Gaming</option>
                <option>Other</option>
              </select>
            </div>
            <Button
              className="w-full h-10 bg-orange-500 text-white border-0 font-bold text-sm"
              onClick={() =>
                toast.success(
                  "Application submitted! We'll review within 5 business days."
                )
              }
            >
              <Rocket className="h-4 w-4 mr-2" />
              Submit Application
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
