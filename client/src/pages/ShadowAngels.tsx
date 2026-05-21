import { useState } from "react";
import { motion } from "framer-motion";
import {
  Star,
  Users,
  DollarSign,
  Globe,
  CheckCircle,
  ArrowRight,
  Zap,
  Shield,
  Award,
  TrendingUp,
  MessageSquare,
  Heart,
  Building2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const ANGELS = [
  {
    id: 1,
    name: "Skyler Blue Spiller",
    handle: "@skylerblue",
    location: "Arkansas, USA",
    focus: ["IT SaaS", "Web3", "AI"],
    checkSize: "$10K–$100K",
    portfolio: 12,
    totalInvested: "$480K",
    bio: "Founder of Skyler Blue IT Resolutions. Angel investor in Web3, IT, and AI startups. 15+ years in managed IT.",
    verified: true,
    active: true,
    tags: ["IT Expert", "Web3", "Mentor"],
  },
  {
    id: 2,
    name: "Alex K.",
    handle: "@alexk_crypto",
    location: "Miami, FL",
    focus: ["DeFi", "NFT", "Gaming"],
    checkSize: "$25K–$250K",
    portfolio: 28,
    totalInvested: "$1.2M",
    bio: "Early Bitcoin investor. DeFi protocol advisor. 3 successful exits in crypto gaming space.",
    verified: true,
    active: true,
    tags: ["DeFi", "NFT", "Early Backer"],
  },
  {
    id: 3,
    name: "Maria C.",
    handle: "@mariac_vc",
    location: "New York, NY",
    focus: ["AI/ML", "SaaS", "Fintech"],
    checkSize: "$50K–$500K",
    portfolio: 41,
    totalInvested: "$3.8M",
    bio: "Partner at a top-10 crypto VC. Former Goldman Sachs. Focuses on AI-crypto convergence plays.",
    verified: true,
    active: true,
    tags: ["VC", "AI", "Fintech"],
  },
  {
    id: 4,
    name: "Dev T.",
    handle: "@devt_web3",
    location: "Austin, TX",
    focus: ["Infrastructure", "Security", "DAO"],
    checkSize: "$5K–$50K",
    portfolio: 19,
    totalInvested: "$320K",
    bio: "Smart contract auditor and security researcher. Invests in projects with strong security posture.",
    verified: true,
    active: false,
    tags: ["Security", "Auditor", "DAO"],
  },
  {
    id: 5,
    name: "Sarah W.",
    handle: "@sarahw_impact",
    location: "London, UK",
    focus: ["Impact", "Charity", "Social"],
    checkSize: "$10K–$75K",
    portfolio: 15,
    totalInvested: "$580K",
    bio: "Impact investor focused on Web3 projects with social good components. Charity DAO advisor.",
    verified: true,
    active: true,
    tags: ["Impact", "ESG", "Charity"],
  },
];

const DEALS = [
  {
    name: "SkyIT Token",
    stage: "Seed",
    ask: "$500K",
    equity: "5%",
    category: "IT SaaS",
    status: "open",
    match: 94,
  },
  {
    name: "ShadowSwarm AI",
    stage: "Series A",
    ask: "$2M",
    equity: "8%",
    category: "AI/ML",
    status: "open",
    match: 88,
  },
  {
    name: "NFTForge v2",
    stage: "Seed",
    ask: "$300K",
    equity: "6%",
    category: "NFT",
    status: "closed",
    match: 76,
  },
  {
    name: "CharityDAO",
    stage: "Pre-Seed",
    ask: "$150K",
    equity: "10%",
    category: "Impact",
    status: "open",
    match: 82,
  },
  {
    name: "ShadowMeta Land",
    stage: "Seed",
    ask: "$800K",
    equity: "7%",
    category: "Metaverse",
    status: "open",
    match: 71,
  },
];

export default function ShadowAngels() {
  const [tab, setTab] = useState<"angels" | "deals" | "apply">("angels");

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Star className="h-6 w-6 text-amber-400" />
            ShadowAngels
          </h1>
          <p className="text-sm text-muted-foreground">
            Angel investor network — connect founders with capital and
            mentorship
          </p>
        </div>
        <Button
          className="bg-amber-500 text-black border-0 font-bold h-9 text-sm"
          onClick={() => setTab("apply")}
        >
          <Zap className="h-4 w-4 mr-2" />
          Get Funded
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: "Angels", value: "142", color: "text-amber-400" },
          { label: "Total Deployed", value: "$6.4M", color: "text-green-400" },
          { label: "Active Deals", value: "18", color: "text-cyan-400" },
          { label: "Avg Check", value: "$85K", color: "text-purple-400" },
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
            ["angels", "👼 Angels"],
            ["deals", "💼 Deal Flow"],
            ["apply", "📝 Apply"],
          ] as const
        ).map(([t, label]) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${tab === t ? "bg-amber-500 text-black" : "bg-muted text-muted-foreground"}`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Angels */}
      {tab === "angels" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ANGELS.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <Card className="border-border/50 hover:border-amber-500/20 transition-all">
                <CardContent className="py-4 px-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-black text-base shrink-0">
                      {a.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-black text-sm">{a.name}</p>
                        {a.verified && (
                          <CheckCircle className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                        )}
                        {!a.active && (
                          <Badge className="text-xs bg-muted text-muted-foreground border-0">
                            Inactive
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {a.handle} · {a.location}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {a.bio}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {a.tags.map(t => (
                      <Badge
                        key={t}
                        className="text-xs bg-amber-500/5 text-amber-400 border-amber-500/20"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 text-xs">
                    <div className="bg-muted/50 rounded-lg px-1.5 py-1.5 text-center">
                      <p className="text-muted-foreground text-[10px]">Check</p>
                      <p className="font-bold text-[11px]">{a.checkSize}</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg px-1.5 py-1.5 text-center">
                      <p className="text-muted-foreground text-[10px]">
                        Portfolio
                      </p>
                      <p className="font-bold">{a.portfolio}</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg px-1.5 py-1.5 text-center">
                      <p className="text-muted-foreground text-[10px]">
                        Deployed
                      </p>
                      <p className="font-bold text-[11px]">{a.totalInvested}</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="w-full h-7 text-xs bg-amber-500/10 text-amber-400 border-amber-500/20"
                    onClick={() =>
                      toast.info(`Connection request sent to ${a.name}!`)
                    }
                  >
                    <MessageSquare className="h-3 w-3 mr-1" />
                    Connect
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Deal Flow */}
      {tab === "deals" && (
        <div className="space-y-3">
          {DEALS.map((d, i) => (
            <motion.div
              key={d.name}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Card
                className={`border-border/50 hover:border-amber-500/20 transition-all ${d.status === "closed" ? "opacity-60" : ""}`}
              >
                <CardContent className="py-3 px-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                    <Building2 className="h-5 w-5 text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-sm">{d.name}</p>
                      <Badge className="text-xs bg-muted text-muted-foreground border-0">
                        {d.stage}
                      </Badge>
                      <Badge className="text-xs bg-muted text-muted-foreground border-0">
                        {d.category}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Asking {d.ask} for {d.equity} equity
                    </p>
                  </div>
                  <div className="text-right shrink-0 space-y-1">
                    <p
                      className={`text-xs font-black ${d.match >= 85 ? "text-green-400" : d.match >= 75 ? "text-yellow-400" : "text-orange-400"}`}
                    >
                      {d.match}% match
                    </p>
                    {d.status === "open" ? (
                      <Button
                        size="sm"
                        className="h-7 px-3 text-xs bg-amber-500 text-black border-0 font-bold"
                        onClick={() =>
                          toast.success(`Expressed interest in ${d.name}!`)
                        }
                      >
                        Invest
                      </Button>
                    ) : (
                      <Badge className="text-xs bg-muted text-muted-foreground border-0">
                        Closed
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Apply */}
      {tab === "apply" && (
        <Card className="border-amber-500/20 bg-amber-900/5">
          <CardContent className="py-6 px-5 space-y-4">
            <p className="font-black text-base flex items-center gap-2">
              <Star className="h-5 w-5 text-amber-400" />
              Apply for Angel Funding
            </p>
            <p className="text-sm text-muted-foreground">
              We match founders with the right angels based on sector, stage,
              and check size. Fast 2-week review process.
            </p>
            <div className="space-y-3">
              {[
                "Company Name",
                "Founder Name & Email",
                "Website / Deck URL",
                "Funding Ask (e.g. $150K)",
              ].map((p, i) => (
                <input
                  key={i}
                  placeholder={p}
                  className="w-full h-10 px-4 rounded-xl bg-muted text-sm border border-border/50 focus:outline-none focus:border-amber-500/40"
                />
              ))}
              <select className="w-full h-10 px-4 rounded-xl bg-muted text-sm border border-border/50 focus:outline-none">
                <option>Select stage</option>
                <option>Pre-Seed</option>
                <option>Seed</option>
                <option>Series A</option>
              </select>
              <textarea
                placeholder="30-second pitch: what you build, traction, and why now..."
                className="w-full h-20 px-4 py-3 rounded-xl bg-muted text-sm border border-border/50 focus:outline-none focus:border-amber-500/40 resize-none"
              />
            </div>
            <Button
              className="w-full h-10 bg-amber-500 text-black border-0 font-bold text-sm"
              onClick={() =>
                toast.success(
                  "Application submitted! Angels will review within 2 weeks."
                )
              }
            >
              Submit to ShadowAngels
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
