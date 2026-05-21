import { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  DollarSign,
  Building2,
  Star,
  Users,
  Globe,
  ArrowRight,
  CheckCircle,
  Zap,
  Brain,
  Award,
  BarChart3,
  Shield,
  Rocket,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const PORTFOLIO_COMPANIES = [
  {
    name: "ShadowYield",
    stage: "Series A",
    invested: "$500K",
    currentVal: "$2.8M",
    roi: "+460%",
    sector: "DeFi",
    status: "active",
  },
  {
    name: "CryptoShield",
    stage: "Seed",
    invested: "$250K",
    currentVal: "$1.1M",
    roi: "+340%",
    sector: "Security",
    status: "active",
  },
  {
    name: "NFTForge",
    stage: "Seed",
    invested: "$300K",
    currentVal: "$1.8M",
    roi: "+500%",
    sector: "NFT",
    status: "active",
  },
  {
    name: "AITradeDesk",
    stage: "Series A",
    invested: "$750K",
    currentVal: "$4.2M",
    roi: "+460%",
    sector: "AI/ML",
    status: "active",
  },
  {
    name: "SkyIT Tools",
    stage: "Seed",
    invested: "$150K",
    currentVal: "$620K",
    roi: "+313%",
    sector: "IT SaaS",
    status: "active",
  },
  {
    name: "ChainBridge Pro",
    stage: "Seed",
    invested: "$200K",
    currentVal: "$890K",
    roi: "+345%",
    sector: "Web3",
    status: "active",
  },
  {
    name: "MetaSpaces",
    stage: "Pre-Seed",
    invested: "$100K",
    currentVal: "$180K",
    roi: "+80%",
    sector: "Metaverse",
    status: "active",
  },
  {
    name: "DeFiLend",
    stage: "Acquired",
    invested: "$400K",
    currentVal: "$2.1M",
    roi: "+425%",
    sector: "DeFi",
    status: "exited",
  },
];

const FUND_STATS = [
  { label: "AUM", value: "$12.4M", color: "text-green-400" },
  { label: "Portfolio Cos", value: "23", color: "text-cyan-400" },
  { label: "Avg ROI", value: "+384%", color: "text-yellow-400" },
  { label: "Exits", value: "4", color: "text-purple-400" },
];

const THESIS = [
  {
    title: "DeFi Infrastructure",
    desc: "Protocols that power the next generation of decentralized finance",
    check: "$50K–$500K",
  },
  {
    title: "AI × Crypto",
    desc: "AI-powered trading, prediction, and portfolio management tools",
    check: "$100K–$750K",
  },
  {
    title: "IT Automation",
    desc: "Managed IT, RMM, and enterprise automation for SMBs",
    check: "$50K–$300K",
  },
  {
    title: "Web3 Social",
    desc: "Decentralized social platforms with crypto-native monetization",
    check: "$100K–$500K",
  },
  {
    title: "NFT & Digital Goods",
    desc: "NFT infrastructure, marketplaces, and digital ownership platforms",
    check: "$50K–$250K",
  },
];

export default function ShadowVentures() {
  const [tab, setTab] = useState<"portfolio" | "thesis" | "lp" | "pitch">(
    "portfolio"
  );

  const activePortfolio = PORTFOLIO_COMPANIES.filter(
    c => c.status === "active"
  );
  const totalInvested = PORTFOLIO_COMPANIES.reduce(
    (s, c) =>
      s + parseFloat(c.invested.replace("$", "").replace("K", "")) * 1000,
    0
  );
  const totalValue = PORTFOLIO_COMPANIES.reduce(
    (s, c) =>
      s +
      parseFloat(
        c.currentVal.replace("$", "").replace("M", "").replace("K", "")
      ) *
        (c.currentVal.includes("M") ? 1_000_000 : 1_000),
    0
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-green-400" />
            ShadowVentures
          </h1>
          <p className="text-sm text-muted-foreground">
            The venture arm of ShadowChat — backing the future of Web3 and IT
          </p>
        </div>
        <Button
          className="bg-green-600 text-white border-0 font-bold h-9 text-sm"
          onClick={() => setTab("pitch")}
        >
          <Rocket className="h-4 w-4 mr-2" />
          Pitch Us
        </Button>
      </div>

      {/* Fund Stats */}
      <div className="grid grid-cols-4 gap-2">
        {FUND_STATS.map(s => (
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
            ["portfolio", "💼 Portfolio"],
            ["thesis", "🎯 Thesis"],
            ["lp", "📊 LP Dashboard"],
            ["pitch", "🚀 Pitch"],
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

      {/* Portfolio */}
      {tab === "portfolio" && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Card className="border-green-500/20 bg-green-900/5">
              <CardContent className="py-3 px-4 text-center">
                <p className="text-xs text-muted-foreground">Total Invested</p>
                <p className="font-black text-xl text-green-400">
                  ${(totalInvested / 1_000_000).toFixed(1)}M
                </p>
              </CardContent>
            </Card>
            <Card className="border-cyan-500/20 bg-cyan-900/5">
              <CardContent className="py-3 px-4 text-center">
                <p className="text-xs text-muted-foreground">Portfolio Value</p>
                <p className="font-black text-xl text-cyan-400">
                  ${(totalValue / 1_000_000).toFixed(1)}M
                </p>
              </CardContent>
            </Card>
          </div>
          {PORTFOLIO_COMPANIES.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card
                className={`border-border/50 hover:border-green-500/20 transition-all ${c.status === "exited" ? "opacity-70" : ""}`}
              >
                <CardContent className="py-3 px-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0">
                    <Building2 className="h-5 w-5 text-green-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-sm">{c.name}</p>
                      <Badge className="text-xs bg-muted text-muted-foreground border-0">
                        {c.stage}
                      </Badge>
                      {c.status === "exited" && (
                        <Badge className="text-xs bg-purple-500/10 text-purple-400 border-0">
                          Exited
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {c.sector} · Invested: {c.invested}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-black text-sm text-green-400">{c.roi}</p>
                    <p className="text-xs text-muted-foreground">
                      {c.currentVal}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Thesis */}
      {tab === "thesis" && (
        <div className="space-y-3">
          <Card className="border-green-500/20 bg-green-900/5">
            <CardContent className="py-4 px-4">
              <p className="font-black text-sm mb-2">Investment Thesis</p>
              <p className="text-sm text-muted-foreground">
                ShadowVentures backs early-stage Web3, AI, and IT companies that
                align with the ShadowChat ecosystem. We invest $50K–$750K at
                pre-seed to Series A, taking 2–8% equity with pro-rata rights.
              </p>
            </CardContent>
          </Card>
          {THESIS.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <Card className="border-border/50">
                <CardContent className="py-4 px-4 flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-bold text-sm">{t.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {t.desc}
                    </p>
                  </div>
                  <Badge className="text-xs bg-green-500/10 text-green-400 border-green-500/20 shrink-0">
                    {t.check}
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* LP Dashboard */}
      {tab === "lp" && (
        <div className="space-y-4">
          <Card className="border-cyan-500/20 bg-cyan-900/5">
            <CardContent className="py-4 px-4 space-y-3">
              <p className="font-black text-sm">Your LP Position</p>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {[
                  { label: "Committed", value: "$50,000" },
                  { label: "Called", value: "$35,000" },
                  { label: "Unrealized", value: "$142,000" },
                ].map(s => (
                  <div
                    key={s.label}
                    className="bg-muted/50 rounded-lg px-2 py-2 text-center"
                  >
                    <p className="text-muted-foreground">{s.label}</p>
                    <p className="font-bold text-sm">{s.value}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span>Capital Called</span>
                  <span className="text-cyan-400">70%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-cyan-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "70%" }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </div>
              <Button
                size="sm"
                className="w-full h-8 text-xs bg-cyan-600 text-white border-0 font-bold"
                onClick={() => toast.info("LP statement download initiated!")}
              >
                Download Q1 2026 Statement
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Pitch */}
      {tab === "pitch" && (
        <Card className="border-green-500/20 bg-green-900/5">
          <CardContent className="py-6 px-5 space-y-4">
            <p className="font-black text-base flex items-center gap-2">
              <Rocket className="h-5 w-5 text-green-400" />
              Submit Your Pitch
            </p>
            <p className="text-sm text-muted-foreground">
              We review all pitches within 2 weeks. We invest in pre-seed to
              Series A Web3, AI, and IT companies.
            </p>
            <div className="space-y-3">
              {[
                "Company / Project Name",
                "Founder Name & Email",
                "Website or Deck URL",
              ].map((p, i) => (
                <input
                  key={i}
                  placeholder={p}
                  className="w-full h-10 px-4 rounded-xl bg-muted text-sm border border-border/50 focus:outline-none focus:border-green-500/40"
                />
              ))}
              <select className="w-full h-10 px-4 rounded-xl bg-muted text-sm border border-border/50 focus:outline-none">
                <option>Select sector</option>
                <option>DeFi Infrastructure</option>
                <option>AI × Crypto</option>
                <option>IT Automation</option>
                <option>Web3 Social</option>
                <option>NFT & Digital Goods</option>
                <option>Other</option>
              </select>
              <textarea
                placeholder="2-minute pitch: What do you build, who is it for, and what traction do you have?"
                className="w-full h-24 px-4 py-3 rounded-xl bg-muted text-sm border border-border/50 focus:outline-none focus:border-green-500/40 resize-none"
              />
            </div>
            <Button
              className="w-full h-10 bg-green-600 text-white border-0 font-bold text-sm"
              onClick={() =>
                toast.success("Pitch submitted! We'll respond within 2 weeks.")
              }
            >
              Submit Pitch to ShadowVentures
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
