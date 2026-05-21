import { useState } from "react";
import { motion } from "framer-motion";
import {
  Rocket,
  TrendingUp,
  Users,
  DollarSign,
  Clock,
  Star,
  CheckCircle,
  ArrowRight,
  Zap,
  Shield,
  Globe,
  BarChart3,
  Award,
  Lock,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface IPOListing {
  id: number;
  name: string;
  ticker: string;
  status: "upcoming" | "live" | "ended";
  raise: string;
  valuation: string;
  price: string;
  minBuy: string;
  deadline: string;
  raised: number;
  goal: number;
  description: string;
  category: string;
  whitelist: boolean;
  highlights: string[];
  team: string;
  audited: boolean;
}

const IPO_LISTINGS: IPOListing[] = [
  {
    id: 1,
    name: "SkyIT Token",
    ticker: "SKYIT",
    status: "live",
    raise: "$2M",
    valuation: "$10M",
    price: "$0.05",
    minBuy: "$50",
    deadline: "8 days left",
    raised: 1_420_000,
    goal: 2_000_000,
    description:
      "The utility token powering Skyler Blue IT Resolutions' managed IT platform. Holders get discounts on IT services, priority support, and revenue sharing.",
    category: "IT SaaS",
    whitelist: false,
    audited: true,
    highlights: [
      "IT services discount (up to 40%)",
      "Revenue sharing Q4 2026",
      "Priority support access",
      "DAO governance rights",
    ],
    team: "Skyler Blue Spiller + 8 engineers",
  },
  {
    id: 2,
    name: "ShadowSwarm AI",
    ticker: "SWARM",
    status: "live",
    raise: "$5M",
    valuation: "$25M",
    price: "$0.12",
    minBuy: "$100",
    deadline: "14 days left",
    raised: 2_840_000,
    goal: 5_000_000,
    description:
      "AI swarm intelligence network token. Powers the ShadowSwarm multi-agent system for automated trading, research, and platform optimization.",
    category: "AI/ML",
    whitelist: true,
    audited: true,
    highlights: [
      "AI agent access",
      "Swarm task rewards",
      "Trading signal priority",
      "Governance over AI models",
    ],
    team: "ShadowSwarm Labs — 12 engineers",
  },
  {
    id: 3,
    name: "ShadowMeta Land",
    ticker: "SLAND",
    status: "upcoming",
    raise: "$3M",
    valuation: "$15M",
    price: "$0.08",
    minBuy: "$25",
    deadline: "Starts in 5 days",
    raised: 0,
    goal: 3_000_000,
    description:
      "Virtual land ownership token for the ShadowChat metaverse. Each SLAND token represents a parcel of virtual real estate with building rights.",
    category: "Metaverse",
    whitelist: true,
    audited: false,
    highlights: [
      "Virtual land ownership",
      "Building rights",
      "Rental income",
      "Metaverse governance",
    ],
    team: "MetaSpaces Inc — 7 engineers",
  },
  {
    id: 4,
    name: "CharityDAO Token",
    ticker: "CDAO",
    status: "upcoming",
    raise: "$1M",
    valuation: "$5M",
    price: "$0.02",
    minBuy: "$10",
    deadline: "Starts in 12 days",
    raised: 0,
    goal: 1_000_000,
    description:
      "Governance token for the ShadowChat CharityHub DAO. Vote on which charities receive funding and how gaming proceeds are distributed.",
    category: "Charity/DAO",
    whitelist: false,
    audited: false,
    highlights: [
      "Charity governance",
      "Gaming revenue share",
      "Impact NFT rewards",
      "Tax-deductible contributions",
    ],
    team: "CharityHub Foundation",
  },
  {
    id: 5,
    name: "ShadowDEX Protocol",
    ticker: "SDEX",
    status: "ended",
    raise: "$4M",
    valuation: "$20M",
    price: "$0.10",
    minBuy: "$50",
    deadline: "Ended",
    raised: 4_000_000,
    goal: 4_000_000,
    description:
      "The governance and fee-sharing token for ShadowDEX. Fully subscribed in 72 hours. Now trading at $0.34 (+240% from IPO price).",
    category: "DeFi",
    whitelist: false,
    audited: true,
    highlights: [
      "100% subscribed in 72hrs",
      "Now trading +240% from IPO",
      "DEX fee sharing",
      "Governance rights",
    ],
    team: "ShadowDEX Core — 9 engineers",
  },
];

export default function ShadowIPO() {
  const [filter, setFilter] = useState<"all" | "upcoming" | "live" | "ended">(
    "live"
  );
  const [selected, setSelected] = useState<IPOListing | null>(null);
  const [buyAmount, setBuyAmount] = useState("");

  const filtered = IPO_LISTINGS.filter(
    l => filter === "all" || l.status === filter
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Rocket className="h-6 w-6 text-pink-400" />
            ShadowIPO
          </h1>
          <p className="text-sm text-muted-foreground">
            Token IPO and initial listing platform — get in early on the next
            big project
          </p>
        </div>
        <Button
          className="bg-pink-600 text-white border-0 font-bold h-9 text-sm"
          onClick={() =>
            toast.info("Project listing applications open! Contact the team.")
          }
        >
          List Your Project
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: "Total Raised", value: "$16M", color: "text-pink-400" },
          { label: "Live IPOs", value: "2", color: "text-green-400" },
          { label: "Avg ROI", value: "+184%", color: "text-yellow-400" },
          { label: "Investors", value: "12,400", color: "text-cyan-400" },
        ].map(s => (
          <Card key={s.label} className="border-border/50 text-center">
            <CardContent className="py-3 px-2">
              <p className={`font-black text-lg ${s.color}`}>{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        {(
          [
            ["all", "All"],
            ["live", "🔴 Live"],
            ["upcoming", "⏳ Upcoming"],
            ["ended", "✅ Ended"],
          ] as const
        ).map(([f, label]) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${filter === f ? "bg-pink-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* IPO Cards */}
        <div className="lg:col-span-2 space-y-4">
          {filtered.map((ipo, i) => (
            <motion.div
              key={ipo.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <Card
                className={`border-border/50 hover:border-pink-500/20 transition-all cursor-pointer ${selected?.id === ipo.id ? "border-pink-500/40 bg-pink-900/5" : ""} ${ipo.status === "ended" ? "opacity-70" : ""}`}
                onClick={() => setSelected(ipo)}
              >
                <CardContent className="py-5 px-5 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-black text-base">{ipo.name}</p>
                        <Badge className="text-xs bg-muted text-muted-foreground border-0 font-mono">
                          {ipo.ticker}
                        </Badge>
                        <Badge
                          className={`text-xs border-0 ${ipo.status === "live" ? "bg-green-500/10 text-green-400" : ipo.status === "upcoming" ? "bg-yellow-500/10 text-yellow-400" : "bg-muted text-muted-foreground"}`}
                        >
                          {ipo.status === "live"
                            ? "🔴 Live"
                            : ipo.status === "upcoming"
                              ? "⏳ Upcoming"
                              : "✅ Ended"}
                        </Badge>
                        {ipo.audited && (
                          <Badge className="text-xs bg-green-500/5 text-green-400 border-green-500/20">
                            ✓ Audited
                          </Badge>
                        )}
                        <Badge className="text-xs bg-muted text-muted-foreground border-0">
                          {ipo.category}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {ipo.team}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-black text-sm text-pink-400">
                        {ipo.price}
                      </p>
                      <p className="text-xs text-muted-foreground">per token</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {ipo.description}
                  </p>
                  {ipo.status !== "upcoming" && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-bold">
                        <span>
                          Raised: ${(ipo.raised / 1_000_000).toFixed(2)}M
                        </span>
                        <span className="text-pink-400">
                          {Math.round((ipo.raised / ipo.goal) * 100)}% of{" "}
                          {ipo.raise}
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-pink-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{
                            width: `${Math.min((ipo.raised / ipo.goal) * 100, 100)}%`,
                          }}
                          transition={{ duration: 1 }}
                        />
                      </div>
                    </div>
                  )}
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="bg-muted/50 rounded-lg px-2 py-1.5 text-center">
                      <p className="text-muted-foreground">Raise</p>
                      <p className="font-bold">{ipo.raise}</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg px-2 py-1.5 text-center">
                      <p className="text-muted-foreground">Valuation</p>
                      <p className="font-bold">{ipo.valuation}</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg px-2 py-1.5 text-center">
                      <p className="text-muted-foreground">Min Buy</p>
                      <p className="font-bold">{ipo.minBuy}</p>
                    </div>
                  </div>
                  {ipo.whitelist && (
                    <div className="flex items-center gap-2 text-xs text-yellow-400 bg-yellow-500/5 border border-yellow-500/20 rounded-lg px-3 py-2">
                      <Lock className="h-3.5 w-3.5 shrink-0" />
                      <span>
                        Whitelist required — stake 1,000 SKY4444 to qualify
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Buy Panel */}
        <div>
          {selected && selected.status !== "ended" ? (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="border-pink-500/20 bg-pink-900/5 sticky top-4">
                <CardContent className="py-5 px-4 space-y-4">
                  <p className="font-black text-base">
                    {selected.name} ({selected.ticker})
                  </p>
                  <div className="space-y-1.5">
                    <p className="text-xs font-bold text-muted-foreground">
                      Highlights
                    </p>
                    {selected.highlights.map(h => (
                      <div key={h} className="flex items-center gap-2 text-xs">
                        <CheckCircle className="h-3.5 w-3.5 text-green-400 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    {selected.deadline}
                  </div>
                  <input
                    type="number"
                    placeholder={`Min ${selected.minBuy}`}
                    value={buyAmount}
                    onChange={e => setBuyAmount(e.target.value)}
                    className="w-full h-10 px-4 rounded-xl bg-muted text-sm border border-border/50 focus:outline-none focus:border-pink-500/40"
                  />
                  {buyAmount && parseFloat(buyAmount) > 0 && (
                    <p className="text-xs text-center text-muted-foreground">
                      ≈{" "}
                      {(
                        parseFloat(buyAmount) /
                        parseFloat(selected.price.replace("$", ""))
                      ).toLocaleString()}{" "}
                      {selected.ticker} tokens
                    </p>
                  )}
                  <Button
                    className="w-full h-10 bg-pink-600 text-white border-0 font-bold text-sm"
                    onClick={() => {
                      toast.success(
                        `IPO purchase confirmed! ${selected.ticker} — $${buyAmount || "0"}`
                      );
                      setBuyAmount("");
                    }}
                  >
                    <Rocket className="h-4 w-4 mr-2" />
                    Buy {selected.ticker}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <Card className="border-border/50">
              <CardContent className="py-8 px-4 text-center text-muted-foreground">
                <Rocket className="h-8 w-8 mx-auto mb-2 opacity-40" />
                <p className="text-sm">Select a live IPO to invest</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
