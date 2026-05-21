import { useState } from "react";
import { motion } from "framer-motion";
import {
  Rocket,
  Star,
  Clock,
  Users,
  Coins,
  CheckCircle,
  TrendingUp,
  Lock,
  Zap,
  Globe,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const ACTIVE_IDO = {
  name: "SKY4444 Token — Phase 2",
  symbol: "SKY4444",
  description:
    "The premier utility token for the ShadowChat super-platform. Governance, staking, payments, and access to exclusive features.",
  hardCap: "$4,444,444",
  raised: "$2,888,000",
  raisedPct: 65,
  price: "$0.0044",
  listingPrice: "$0.0088",
  roi: "2x at listing",
  participants: 4444,
  endsIn: "14 days",
  network: "Ethereum + BSC",
  vesting: "20% TGE, 80% over 12 months",
  icon: "🌌",
};

const TIERS = [
  {
    name: "Shadow Bronze",
    min: "$44",
    max: "$444",
    allocation: "Base",
    multiplier: "1x",
    requirement: "Hold 1,000 SKY4444",
    color: "#cd7f32",
  },
  {
    name: "Shadow Silver",
    min: "$444",
    max: "$4,444",
    allocation: "2x",
    multiplier: "2x",
    requirement: "Hold 10,000 SKY4444",
    color: "#c0c0c0",
  },
  {
    name: "Shadow Gold",
    min: "$4,444",
    max: "$44,444",
    allocation: "5x",
    multiplier: "5x",
    requirement: "Hold 100,000 SKY4444",
    color: "#ffd700",
  },
  {
    name: "Shadow Diamond",
    min: "$44,444",
    max: "Unlimited",
    allocation: "10x",
    multiplier: "10x",
    requirement: "Hold 1,000,000 SKY4444",
    color: "#b9f2ff",
  },
];

const UPCOMING = [
  {
    name: "ShadowDEX Token",
    symbol: "SDEX",
    raise: "$888,888",
    date: "Jun 15, 2026",
    icon: "⚡",
  },
  {
    name: "ShadowNFT Platform",
    symbol: "SNFT",
    raise: "$444,444",
    date: "Jul 4, 2026",
    icon: "🎨",
  },
  {
    name: "ShadowAI Token",
    symbol: "SAI",
    raise: "$2,222,222",
    date: "Aug 1, 2026",
    icon: "🤖",
  },
];

export default function ShadowIDO() {
  const [tab, setTab] = useState<"active" | "tiers" | "upcoming" | "portfolio">(
    "active"
  );
  const [investAmount, setInvestAmount] = useState("444");

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Rocket className="h-6 w-6 text-orange-400" />
            ShadowIDO
          </h1>
          <p className="text-sm text-muted-foreground">
            Initial DEX Offerings — early access to the best crypto projects
          </p>
        </div>
        <Badge className="bg-green-500/10 text-green-400 border-green-500/20 text-xs">
          🟢 1 Active IDO
        </Badge>
      </div>

      <div className="flex gap-2">
        {(["active", "tiers", "upcoming", "portfolio"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-orange-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "active" && (
        <div className="space-y-3">
          <Card className="border-orange-500/20 bg-orange-900/5">
            <CardContent className="py-4 px-4 space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-4xl">{ACTIVE_IDO.icon}</span>
                <div className="flex-1">
                  <p className="font-black text-base">{ACTIVE_IDO.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {ACTIVE_IDO.description}
                  </p>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-bold">Raised: {ACTIVE_IDO.raised}</span>
                  <span className="font-bold text-orange-400">
                    {ACTIVE_IDO.raisedPct}% of {ACTIVE_IDO.hardCap}
                  </span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-orange-500 to-yellow-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${ACTIVE_IDO.raisedPct}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { label: "Token Price", value: ACTIVE_IDO.price },
                  { label: "Listing Price", value: ACTIVE_IDO.listingPrice },
                  { label: "Expected ROI", value: ACTIVE_IDO.roi },
                  {
                    label: "Participants",
                    value: ACTIVE_IDO.participants.toLocaleString(),
                  },
                  { label: "Ends In", value: ACTIVE_IDO.endsIn },
                  { label: "Network", value: ACTIVE_IDO.network },
                ].map(s => (
                  <div key={s.label} className="bg-muted/50 rounded-lg p-2">
                    <p className="text-muted-foreground">{s.label}</p>
                    <p className="font-bold">{s.value}</p>
                  </div>
                ))}
              </div>

              <div className="bg-muted/50 rounded-lg p-2 text-xs">
                <p className="text-muted-foreground">Vesting Schedule</p>
                <p className="font-bold">
                  <Lock className="h-3 w-3 inline mr-1" />
                  {ACTIVE_IDO.vesting}
                </p>
              </div>

              <div className="flex gap-2">
                <input
                  type="number"
                  value={investAmount}
                  onChange={e => setInvestAmount(e.target.value)}
                  className="flex-1 h-10 px-3 rounded-xl bg-muted text-sm border border-border/50 focus:outline-none focus:border-orange-500/40"
                  placeholder="Amount in USD"
                />
                <Button
                  className="h-10 px-4 text-sm bg-orange-600 text-white border-0 font-bold"
                  onClick={() =>
                    toast.success(
                      `Investing $${investAmount} in SKY4444 IDO! You'll receive ${(parseFloat(investAmount) / 0.0044).toFixed(0)} SKY4444`
                    )
                  }
                >
                  <Rocket className="h-4 w-4 mr-2" />
                  Invest
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "tiers" && (
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">
            Your tier determines your allocation multiplier. Stake more SKY4444
            to unlock higher tiers.
          </p>
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <Card
                className="border-border/50"
                style={{ borderColor: tier.color + "30" }}
              >
                <CardContent className="py-3 px-4 flex items-start gap-3">
                  <div
                    className="h-10 w-10 rounded-xl flex items-center justify-center font-black text-lg shrink-0"
                    style={{
                      backgroundColor: tier.color + "20",
                      color: tier.color,
                    }}
                  >
                    {i === 3 ? "💎" : i === 2 ? "🥇" : i === 1 ? "🥈" : "🥉"}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{tier.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {tier.requirement}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Investment: {tier.min} – {tier.max}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p
                      className="font-black text-lg"
                      style={{ color: tier.color }}
                    >
                      {tier.multiplier}
                    </p>
                    <p className="text-xs text-muted-foreground">multiplier</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "upcoming" && (
        <div className="space-y-2">
          {UPCOMING.map((ido, i) => (
            <Card key={ido.name} className="border-border/50">
              <CardContent className="py-3 px-4 flex items-center gap-3">
                <span className="text-2xl shrink-0">{ido.icon}</span>
                <div className="flex-1">
                  <p className="font-bold text-sm">{ido.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {ido.symbol} · Opens {ido.date}
                  </p>
                  <p className="text-xs text-green-400 font-bold">
                    Target: {ido.raise}
                  </p>
                </div>
                <Button
                  size="sm"
                  className="h-8 text-xs bg-orange-600 text-white border-0 font-bold shrink-0"
                  onClick={() =>
                    toast.success(`Whitelisted for ${ido.name} IDO!`)
                  }
                >
                  Whitelist
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "portfolio" && (
        <div className="space-y-2">
          <Card className="border-green-500/20 bg-green-900/5">
            <CardContent className="py-3 px-4">
              <p className="font-bold text-sm">My IDO Portfolio</p>
              <p className="font-black text-2xl text-green-400">$44,444</p>
              <p className="text-xs text-green-400 font-bold">
                +$22,222 unrealized profit (+100%)
              </p>
            </CardContent>
          </Card>
          {[
            {
              name: "SKY4444 Phase 1",
              invested: "$4,444",
              current: "$8,888",
              tokens: "1,010,101",
              status: "vesting",
            },
            {
              name: "ShadowPunk IDO",
              invested: "$888",
              current: "$4,444",
              tokens: "44,444",
              status: "unlocked",
            },
          ].map(p => (
            <Card key={p.name} className="border-border/50">
              <CardContent className="py-3 px-4">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-bold text-sm">{p.name}</p>
                  <Badge
                    className={`text-xs ${p.status === "unlocked" ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"}`}
                  >
                    {p.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs text-center">
                  <div>
                    <p className="text-muted-foreground">Invested</p>
                    <p className="font-bold">{p.invested}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Current</p>
                    <p className="font-bold text-green-400">{p.current}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Tokens</p>
                    <p className="font-bold">{p.tokens}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
