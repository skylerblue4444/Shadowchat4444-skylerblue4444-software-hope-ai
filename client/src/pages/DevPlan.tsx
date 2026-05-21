import { useState } from "react";
import { motion } from "framer-motion";
import {
  Zap,
  CheckCircle,
  Clock,
  Rocket,
  Globe,
  Shield,
  Brain,
  Heart,
  Dice1,
  Users,
  Star,
  ChevronRight,
  Code,
  Coins,
  Lock,
  Flame,
  Target,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const PHASES = [
  {
    id: 1,
    title: "Foundation & Multi-Coin Economy",
    status: "complete",
    progress: 100,
    items: [
      "SkyCoin4444, TRUMP, DOGE, BTC, USDT, Monero",
      "Mining, Staking (18% APY), Burning, Live ICO",
      "Unified multi-coin wallet & dashboard",
    ],
    icon: "💰",
    color: "text-green-400",
    bg: "bg-green-500/10 border-green-500/20",
  },
  {
    id: 2,
    title: "Core UX & Marketplaces",
    status: "complete",
    progress: 95,
    items: [
      "Sky444 General Marketplace (DHgate/Alibaba style)",
      "NFT Marketplace (Impact Story NFTs)",
      "Talent Marketplace",
      "Improved UI/UX + Progress Dashboard",
    ],
    icon: "🛍️",
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
  },
  {
    id: 3,
    title: "AI Capabilities",
    status: "active",
    progress: 60,
    items: [
      "AI Day Trading Assistant (voice + text)",
      "Hands-Free Voice Control",
      "AI Auto-Poster & Tipper",
      "AI Financial Advisor",
      "AI Content Creator",
      "AI Dating Assistant",
    ],
    icon: "🤖",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10 border-yellow-500/20",
  },
  {
    id: 4,
    title: "Lifestyle & Entertainment",
    status: "active",
    progress: 40,
    items: [
      "Dating Section (NSFW Toggle + AI matching)",
      "Live Gambling (Blackjack, Roulette, Slots, Poker)",
      "Advanced Charity System",
      "Booking System (appointments, travel, events)",
    ],
    icon: "🎰",
    color: "text-purple-400",
    bg: "bg-purple-500/10 border-purple-500/20",
  },
  {
    id: 5,
    title: "IT Services & Business Tools",
    status: "active",
    progress: 70,
    items: [
      "Managed IT Services",
      "Innovative IT Resolutions",
      "Enterprise Treasury & DAO tools",
      "Cybersecurity & Cloud Hosting",
    ],
    icon: "💻",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10 border-cyan-500/20",
  },
  {
    id: 6,
    title: "Profit Models & Sustainability",
    status: "planned",
    progress: 20,
    items: [
      "Platform transaction fees",
      "Premium Mini-Program hosting",
      "Enterprise SaaS subscriptions",
      "NFT Marketplace royalties",
      "Dating premium features",
      "Decentralized advertising revenue",
    ],
    icon: "📈",
    color: "text-orange-400",
    bg: "bg-orange-500/10 border-orange-500/20",
  },
  {
    id: 7,
    title: "Scale & Polish — 444 Files",
    status: "planned",
    progress: 25,
    items: [
      "Reach 444 rich production-grade files",
      "Full mobile app (iOS + Android)",
      "Advanced security audit",
      "Complete documentation & onboarding",
      "Open-source smart contracts",
    ],
    icon: "🚀",
    color: "text-pink-400",
    bg: "bg-pink-500/10 border-pink-500/20",
  },
  {
    id: 8,
    title: "Full Decentralization & Governance",
    status: "planned",
    progress: 10,
    items: [
      "Complete on-chain DAO with smart contract voting",
      "Treasury fully controlled by token holders",
      "Community-driven feature roadmap",
      "Gradual removal of centralized control",
    ],
    icon: "🏛️",
    color: "text-indigo-400",
    bg: "bg-indigo-500/10 border-indigo-500/20",
  },
];

const MIND_BLOWING = [
  {
    title: "Hands-Free AI Agent",
    desc: "Autonomous AI that operates the entire platform on your behalf — trades, posts, books, dates, and manages your portfolio.",
    emoji: "🤖",
    status: "Building",
  },
  {
    title: "AI Swarm Intelligence",
    desc: "Multiple specialized AI agents (Trading + Content + Dating + Financial) collaborating for best outcomes.",
    emoji: "🧠",
    status: "Planned",
  },
  {
    title: "Predictive Economy Engine",
    desc: "AI that predicts market movements, staking rewards, and personal earning potential with personalized profit forecasts.",
    emoji: "🔮",
    status: "Planned",
  },
  {
    title: "Decentralized Reputation System",
    desc: "On-chain reputation following you across Talent Marketplace, Dating, Creator Studio, and community.",
    emoji: "⭐",
    status: "Building",
  },
  {
    title: "Impact Score",
    desc: "Public/private score showing real-world positive impact through charity, content, and community contributions.",
    emoji: "❤️",
    status: "Building",
  },
  {
    title: "Private Group DAOs",
    desc: "Users create private communities with their own token economy, governance, and mini-apps.",
    emoji: "🏘️",
    status: "Planned",
  },
  {
    title: "Real-World QR Integration",
    desc: "Pay in physical stores, restaurants, and events using SkyCoin4444 or TRUMP with simple QR scanning.",
    emoji: "📱",
    status: "Building",
  },
  {
    title: "Cross-App Mini-Program SDK",
    desc: "External developers build and publish their own mini-apps inside ShadowChat — like an App Store for Web3.",
    emoji: "🔧",
    status: "Planned",
  },
  {
    title: "AI Voice Companion",
    desc: "A persistent AI companion for natural conversations about trading, dating, content ideas, or daily planning.",
    emoji: "🎙️",
    status: "Building",
  },
  {
    title: "AI Portfolio Rebalancing",
    desc: "Automatically moves assets between coins (SKY, TRUMP, BTC, etc.) to maximize returns based on your goals.",
    emoji: "⚖️",
    status: "Planned",
  },
];

const STATS = [
  { label: "Pages Built", value: "100+", emoji: "📄" },
  { label: "TypeScript Files", value: "163", emoji: "💻" },
  { label: "Est. Platform Value", value: "$1.1M+", emoji: "💰" },
  { label: "Target Files", value: "444", emoji: "🎯" },
  { label: "Coins Supported", value: "7+", emoji: "🪙" },
  { label: "Countries Supported", value: "195", emoji: "🌍" },
];

export default function DevPlan() {
  const [tab, setTab] = useState<
    "roadmap" | "features" | "stats" | "continuation"
  >("roadmap");

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Rocket className="h-6 w-6 text-yellow-400" />
            ShadowChat Blueprint v4.2
          </h1>
          <p className="text-sm text-muted-foreground">
            Official development plan — May 15, 2026
          </p>
        </div>
        <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20 font-bold">
          🚀 Active Dev
        </Badge>
      </div>

      {/* Tagline */}
      <Card className="border-yellow-500/20 bg-gradient-to-r from-yellow-900/10 to-orange-900/10">
        <CardContent className="py-4">
          <p className="text-center font-black text-base text-yellow-300">
            "ShadowChat using SkyCoin4444 and TRUMP Official Cryptocurrency –
            Enjoy where the stars are."
          </p>
          <p className="text-center text-xs text-muted-foreground mt-1">
            The world's most advanced privacy-first Web3 super-app
          </p>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
        {STATS.map(s => (
          <Card key={s.label} className="border-border/50 text-center">
            <CardContent className="pt-3 pb-3">
              <p className="text-xl mb-1">{s.emoji}</p>
              <p className="font-black text-sm text-yellow-400">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {(["roadmap", "features", "stats", "continuation"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-yellow-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "roadmap" && (
        <div className="space-y-3">
          {PHASES.map((phase, i) => (
            <motion.div
              key={phase.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className={`border ${phase.bg}`}>
                <CardContent className="py-3 px-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl mt-0.5 shrink-0">
                      {phase.icon}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-black text-sm">
                          Phase {phase.id}: {phase.title}
                        </p>
                        <Badge
                          className={`text-xs shrink-0 ${phase.status === "complete" ? "bg-green-500/10 text-green-400 border-green-500/20" : phase.status === "active" ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" : "bg-muted text-muted-foreground"}`}
                        >
                          {phase.status === "complete"
                            ? "✓ Complete"
                            : phase.status === "active"
                              ? "⚡ Active"
                              : "📋 Planned"}
                        </Badge>
                      </div>
                      <Progress value={phase.progress} className="h-1.5 mb-2" />
                      <div className="space-y-0.5">
                        {phase.items.map(item => (
                          <p
                            key={item}
                            className="text-xs text-muted-foreground flex items-center gap-1.5"
                          >
                            <CheckCircle
                              className={`h-3 w-3 shrink-0 ${phase.progress === 100 ? "text-green-400" : "text-muted-foreground"}`}
                            />
                            {item}
                          </p>
                        ))}
                      </div>
                    </div>
                    <p className={`font-black text-sm shrink-0 ${phase.color}`}>
                      {phase.progress}%
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "features" && (
        <div className="space-y-3">
          <p className="text-xs font-bold text-muted-foreground">
            MIND-BLOWING FUTURE UPGRADES (Phase 8+)
          </p>
          {MIND_BLOWING.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="border-border/50">
                <CardContent className="py-3 px-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl shrink-0">{f.emoji}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-black text-sm">{f.title}</p>
                        <Badge
                          className={`text-xs shrink-0 ${f.status === "Building" ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" : "bg-muted text-muted-foreground"}`}
                        >
                          {f.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{f.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "stats" && (
        <div className="space-y-3">
          {[
            {
              title: "Core Principles",
              items: [
                "Privacy First (Zero-knowledge ready)",
                "User Profit First (90% revenue share)",
                "True Ownership + On-Chain Governance",
                "Global Legal Flexibility (feature toggles per region)",
                "High-Velocity Autonomous Development",
                "Multi-Coin Support (7+ coins)",
              ],
              emoji: "🏛️",
            },
            {
              title: "Profit Models — Users",
              items: [
                "Staking up to 18% APY",
                "Mining rewards",
                "Creator earnings (~100%)",
                "Affiliate income",
                "Freelance income",
                "Dating perks & discounts",
                "Gambling winnings",
              ],
              emoji: "💰",
            },
            {
              title: "Profit Models — Platform",
              items: [
                "Transaction fees",
                "Premium Mini-Program hosting",
                "Enterprise SaaS subscriptions",
                "NFT Marketplace royalties",
                "Dating premium features",
                "Future decentralized advertising",
                "Token appreciation (SKY4444 & TRUMP)",
              ],
              emoji: "📈",
            },
            {
              title: "Global Compliance",
              items: [
                "China (MIIT/CAC/ICP)",
                "EU (GDPR/MiCA)",
                "US (FinCEN/SEC)",
                "UAE (VARA)",
                "India (SEBI)",
                "Russia (CBR)",
                "195 countries supported",
              ],
              emoji: "🌍",
            },
          ].map(section => (
            <Card key={section.title} className="border-border/50">
              <CardContent className="py-3 px-4">
                <p className="font-black text-sm mb-2 flex items-center gap-2">
                  <span>{section.emoji}</span>
                  {section.title}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                  {section.items.map(item => (
                    <p
                      key={item}
                      className="text-xs text-muted-foreground flex items-center gap-1.5"
                    >
                      <CheckCircle className="h-3 w-3 text-green-400 shrink-0" />
                      {item}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "continuation" && (
        <div className="space-y-3">
          <Card className="border-yellow-500/20 bg-yellow-900/10">
            <CardContent className="py-4 px-4">
              <p className="font-black text-sm mb-3 flex items-center gap-2">
                <Brain className="h-4 w-4 text-yellow-400" />
                For Any AI or Developer Continuing This Project
              </p>
              {[
                {
                  step: "1",
                  title: "Start Here",
                  desc: "Review this Blueprint v4.2 (this page)",
                },
                {
                  step: "2",
                  title: "Check Status",
                  desc: "Look at the Progress Dashboard in the app for current state",
                },
                {
                  step: "3",
                  title: "Priority Order",
                  desc: "AI features (Hands-Free Agent) → Dating Section → Live Gambling → Mini-Programs 20+ → On-chain DAO → Mobile app",
                },
                {
                  step: "4",
                  title: "Key Files",
                  desc: "server/routers/ → new routers | client/src/pages/ → new pages | shared/ → new schemas",
                },
                {
                  step: "5",
                  title: "Style Guide",
                  desc: "Thick, production-grade, privacy-first, user-friendly, multi-coin support, global legal compliance",
                },
                {
                  step: "6",
                  title: "Target",
                  desc: "444 rich production-grade files — we are at 163 TypeScript files now",
                },
              ].map(item => (
                <div key={item.step} className="flex gap-3 mb-3">
                  <div className="h-6 w-6 rounded-full bg-yellow-600 flex items-center justify-center text-xs font-black text-white shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="py-3 px-4">
              <p className="font-black text-sm mb-2">Long-Term Vision</p>
              {[
                "Become the default Web3 super-app globally",
                "Achieve full decentralization with community governance",
                "Successfully integrate official Trump Coin + Barron Trump personal coin",
                "Expand into the Chinese market with proper regional controls",
                "Reach 444+ rich production-grade files with exceptional quality",
              ].map(item => (
                <p
                  key={item}
                  className="text-xs text-muted-foreground flex items-center gap-1.5 mb-1"
                >
                  <Star className="h-3 w-3 text-yellow-400 shrink-0" />
                  {item}
                </p>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
