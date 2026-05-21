import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Download,
  BookOpen,
  Coins,
  Globe,
  Shield,
  TrendingUp,
  Users,
  Zap,
  ChevronDown,
  ChevronRight,
  Star,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const SECTIONS = [
  { id: "abstract", title: "Abstract", icon: BookOpen },
  { id: "problem", title: "Problem Statement", icon: Globe },
  { id: "solution", title: "Solution: ShadowChat", icon: Zap },
  { id: "tokenomics", title: "SKY4444 Tokenomics", icon: Coins },
  { id: "roadmap", title: "Roadmap", icon: TrendingUp },
  { id: "team", title: "Team", icon: Users },
  { id: "legal", title: "Legal Disclaimer", icon: Shield },
];

const TOKENOMICS = [
  {
    label: "ICO Public Sale",
    pct: 30,
    amount: "444,444,444",
    color: "#6366f1",
  },
  {
    label: "Team & Advisors",
    pct: 15,
    amount: "222,222,222",
    color: "#8b5cf6",
  },
  { label: "Ecosystem Fund", pct: 20, amount: "296,296,296", color: "#a78bfa" },
  {
    label: "Staking Rewards",
    pct: 20,
    amount: "296,296,296",
    color: "#c4b5fd",
  },
  { label: "Treasury", pct: 10, amount: "148,148,148", color: "#ddd6fe" },
  { label: "Liquidity", pct: 5, amount: "74,074,074", color: "#ede9fe" },
];

const ROADMAP = [
  {
    phase: "Phase 1",
    title: "Foundation",
    date: "Q1 2026",
    status: "completed",
    items: [
      "Platform launch",
      "SKY4444 ICO",
      "Core trading features",
      "Community boards",
      "IT Resolutions website",
    ],
  },
  {
    phase: "Phase 2",
    title: "Expansion",
    date: "Q2 2026",
    status: "active",
    items: [
      "Mobile apps (iOS/Android)",
      "NFT marketplace v2",
      "DeFi lending",
      "100+ platform pages",
      "Government compliance layer",
    ],
  },
  {
    phase: "Phase 3",
    title: "Scale",
    date: "Q3 2026",
    status: "upcoming",
    items: [
      "Metaverse integration",
      "AI trading bots",
      "Cross-chain bridge",
      "Institutional tools",
      "10M users target",
    ],
  },
  {
    phase: "Phase 4",
    title: "Dominance",
    date: "Q4 2026",
    status: "upcoming",
    items: [
      "SKY4444 DEX listing",
      "Fiat banking integration",
      "Global compliance (50+ countries)",
      "Enterprise IT contracts",
      "IPO preparation",
    ],
  },
];

const TEAM = [
  {
    name: "Skyler Blue Spiller",
    role: "Founder & CEO",
    bio: "Innovative IT entrepreneur from Fort Smith, AR. 10+ years in managed IT services and blockchain development.",
    emoji: "👨‍💻",
  },
  {
    name: "ShadowDev Lead",
    role: "CTO",
    bio: "Full-stack blockchain engineer with expertise in Solidity, React, and distributed systems.",
    emoji: "⚡",
  },
  {
    name: "CryptoAdvisor.eth",
    role: "DeFi Advisor",
    bio: "Former Binance engineer with deep expertise in DEX architecture and tokenomics design.",
    emoji: "🔮",
  },
  {
    name: "LegalEagle",
    role: "Chief Compliance Officer",
    bio: "Crypto regulatory expert with experience across US, EU, and APAC jurisdictions.",
    emoji: "⚖️",
  },
];

export default function ShadowWhitepaper() {
  const [activeSection, setActiveSection] = useState("abstract");
  const [expandedPhase, setExpandedPhase] = useState<string | null>("Phase 2");

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <FileText className="h-6 w-6 text-indigo-400" />
            ShadowChat Whitepaper
          </h1>
          <p className="text-sm text-muted-foreground">
            SKY4444 Token & Platform Technical Documentation v4.2
          </p>
        </div>
        <Button
          size="sm"
          className="h-9 text-xs bg-indigo-600 text-white border-0 font-bold"
          onClick={() => toast.success("📄 Downloading whitepaper PDF...")}
        >
          <Download className="h-4 w-4 mr-1" />
          PDF
        </Button>
      </div>

      {/* Cover Card */}
      <Card className="border-indigo-500/20 bg-gradient-to-br from-indigo-900/30 to-purple-900/20">
        <CardContent className="py-5 px-5 text-center">
          <p className="text-3xl font-black mb-1">🌟 ShadowChat</p>
          <p className="text-lg font-bold text-indigo-300 mb-1">
            The World's First Web3 Super-Platform
          </p>
          <p className="text-xs text-muted-foreground mb-3">
            Powered by SKY4444 Token · Built by Skyler Blue Spiller's Innovative
            IT Resolutions
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Badge className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20">
              v4.2
            </Badge>
            <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">
              May 2026
            </Badge>
            <Badge className="bg-muted text-muted-foreground">
              Fort Smith, AR
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {SECTIONS.map(s => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeSection === s.id ? "bg-indigo-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {s.title}
          </button>
        ))}
      </div>

      {activeSection === "abstract" && (
        <Card className="border-border/50">
          <CardContent className="py-4 px-4 space-y-3">
            <p className="font-black text-base">Abstract</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              ShadowChat is a revolutionary Web3 super-platform that combines
              the best features of social media, cryptocurrency trading,
              decentralized finance, NFT marketplace, AI tools, and enterprise
              IT services into a single unified ecosystem.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Powered by the SKY4444 token, ShadowChat enables users to trade,
              communicate, earn, create, and govern — all while maintaining full
              ownership of their digital assets and identity through
              decentralized protocols.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Founded by Skyler Blue Spiller, CEO of Innovative Information
              Technology Resolutions (Fort Smith, AR), ShadowChat bridges the
              gap between traditional IT services and the decentralized future
              of the internet.
            </p>
            <div className="grid grid-cols-3 gap-2 pt-2">
              {[
                { label: "Total Supply", value: "1.48B SKY4444" },
                { label: "Initial Price", value: "$0.044" },
                { label: "Target Market Cap", value: "$65M" },
              ].map(s => (
                <div
                  key={s.label}
                  className="text-center p-2 rounded-xl bg-indigo-900/10 border border-indigo-500/10"
                >
                  <p className="font-black text-sm text-indigo-400">
                    {s.value}
                  </p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeSection === "tokenomics" && (
        <div className="space-y-3">
          <Card className="border-border/50">
            <CardContent className="py-4 px-4">
              <p className="font-black text-base mb-3">
                SKY4444 Token Distribution
              </p>
              <p className="text-xs text-muted-foreground mb-3">
                Total Supply: 1,481,481,481 SKY4444 tokens
              </p>
              <div className="space-y-2">
                {TOKENOMICS.map((item, i) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-xs mb-0.5">
                      <span className="font-medium">{item.label}</span>
                      <span className="font-bold" style={{ color: item.color }}>
                        {item.pct}% · {parseInt(item.amount).toLocaleString()}
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: item.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${item.pct}%` }}
                        transition={{ delay: i * 0.1, duration: 0.6 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="py-4 px-4">
              <p className="font-black text-sm mb-2">Token Utility</p>
              <div className="space-y-1.5">
                {[
                  "Platform governance voting",
                  "Trading fee discounts (up to 50%)",
                  "Staking rewards (up to 124.5% APY)",
                  "ICO participation tiers",
                  "NFT minting fee payment",
                  "IT services payment discount (20%)",
                  "Casino and gaming credits",
                  "Escrow fee payment",
                ].map(u => (
                  <p
                    key={u}
                    className="text-xs text-muted-foreground flex items-center gap-2"
                  >
                    <Star className="h-3 w-3 text-indigo-400 shrink-0" />
                    {u}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeSection === "roadmap" && (
        <div className="space-y-2">
          {ROADMAP.map((phase, i) => (
            <Card
              key={phase.phase}
              className={`border ${phase.status === "completed" ? "border-green-500/20" : phase.status === "active" ? "border-indigo-500/20" : "border-border/30"}`}
            >
              <CardContent className="py-3 px-4">
                <button
                  className="w-full flex items-center justify-between"
                  onClick={() =>
                    setExpandedPhase(
                      expandedPhase === phase.phase ? null : phase.phase
                    )
                  }
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-9 w-9 rounded-full flex items-center justify-center font-black text-sm shrink-0 ${phase.status === "completed" ? "bg-green-500/10 text-green-400" : phase.status === "active" ? "bg-indigo-500/10 text-indigo-400" : "bg-muted text-muted-foreground"}`}
                    >
                      {i + 1}
                    </div>
                    <div className="text-left">
                      <p className="font-black text-sm">
                        {phase.phase}: {phase.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {phase.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      className={`text-xs ${phase.status === "completed" ? "bg-green-500/10 text-green-400 border-green-500/20" : phase.status === "active" ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" : "bg-muted text-muted-foreground"}`}
                    >
                      {phase.status === "completed"
                        ? "✓ Done"
                        : phase.status === "active"
                          ? "🔵 Active"
                          : "⏳ Upcoming"}
                    </Badge>
                    {expandedPhase === phase.phase ? (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                </button>
                {expandedPhase === phase.phase && (
                  <div className="mt-2 pl-12 space-y-1">
                    {phase.items.map(item => (
                      <p
                        key={item}
                        className="text-xs text-muted-foreground flex items-center gap-2"
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full shrink-0 ${phase.status === "completed" ? "bg-green-400" : phase.status === "active" ? "bg-indigo-400" : "bg-muted-foreground"}`}
                        />
                        {item}
                      </p>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeSection === "team" && (
        <div className="space-y-3">
          {TEAM.map((member, i) => (
            <Card key={member.name} className="border-border/50">
              <CardContent className="py-3 px-4 flex items-start gap-3">
                <div className="h-12 w-12 rounded-full bg-indigo-500/10 flex items-center justify-center text-2xl shrink-0">
                  {member.emoji}
                </div>
                <div>
                  <p className="font-black text-sm">{member.name}</p>
                  <p className="text-xs text-indigo-400 font-bold mb-1">
                    {member.role}
                  </p>
                  <p className="text-xs text-muted-foreground">{member.bio}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeSection === "problem" && (
        <Card className="border-border/50">
          <CardContent className="py-4 px-4 space-y-3">
            <p className="font-black text-base">The Problem</p>
            {[
              "Fragmented digital experience — users need 10+ apps for trading, social, payments, and IT services.",
              "Web2 platforms extract value from users without giving them ownership or rewards.",
              "Traditional IT services are expensive, opaque, and inaccessible to small businesses.",
              "Crypto platforms are complex, intimidating, and lack real-world utility.",
              "No single platform combines social media, DeFi, NFTs, AI, and enterprise IT services.",
            ].map((p, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-red-400 font-black shrink-0">✗</span>
                <p className="text-sm text-muted-foreground">{p}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {activeSection === "solution" && (
        <Card className="border-border/50">
          <CardContent className="py-4 px-4 space-y-3">
            <p className="font-black text-base">The ShadowChat Solution</p>
            {[
              "One platform for everything — 100+ features, zero app-switching.",
              "Users own their data, earn SKY4444 for every action, and govern the platform.",
              "Affordable managed IT services powered by blockchain transparency and automation.",
              "AI-powered onboarding makes crypto accessible to everyone.",
              "Skyler Blue IT Resolutions provides real-world enterprise IT services to fund platform development.",
            ].map((p, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-green-400 font-black shrink-0">✓</span>
                <p className="text-sm text-muted-foreground">{p}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {activeSection === "legal" && (
        <Card className="border-border/50">
          <CardContent className="py-4 px-4 space-y-2">
            <p className="font-black text-base">Legal Disclaimer</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              This whitepaper is for informational purposes only and does not
              constitute financial, investment, legal, or tax advice. SKY4444
              tokens are utility tokens and do not represent equity, debt, or
              ownership in any entity.
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Cryptocurrency investments carry significant risk. Past
              performance is not indicative of future results. Participants
              should conduct their own due diligence and consult qualified
              advisors before participating in any token sale.
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              ShadowChat and Skyler Blue Spiller's Innovative IT Resolutions
              comply with all applicable laws and regulations in the
              jurisdictions where they operate. Users are responsible for
              compliance with their local laws.
            </p>
            <p className="text-xs text-muted-foreground">
              Contact: skylerblue4444@gmail.com · 479-406-7123 · Fort Smith, AR
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
