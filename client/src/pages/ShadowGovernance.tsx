import { useState } from "react";
import { motion } from "framer-motion";
import {
  Vote,
  Users,
  TrendingUp,
  DollarSign,
  Plus,
  ChevronRight,
  Clock,
  CheckCircle,
  XCircle,
  BarChart3,
  Coins,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const PROPOSALS = [
  {
    id: "SIP-044",
    title: "Increase Staking APY to 150% for SKY4444 Long-Term Holders",
    status: "active",
    votes: { for: 4444444, against: 888888, abstain: 111111 },
    quorum: 75,
    ends: "May 20, 2026",
    proposer: "SkylerBlue.eth",
    category: "Tokenomics",
  },
  {
    id: "SIP-043",
    title: "Add TRUMP/SKY4444 Trading Pair to ShadowDEX",
    status: "active",
    votes: { for: 3333333, against: 444444, abstain: 222222 },
    quorum: 60,
    ends: "May 18, 2026",
    proposer: "CryptoWhale.eth",
    category: "Exchange",
  },
  {
    id: "SIP-042",
    title: "Allocate 100,000 SKY4444 for Community Developer Grants",
    status: "passed",
    votes: { for: 5555555, against: 333333, abstain: 111111 },
    quorum: 90,
    ends: "May 10, 2026",
    proposer: "DevDAO.eth",
    category: "Treasury",
  },
  {
    id: "SIP-041",
    title: "Integrate Monero (XMR) Privacy Features into ShadowPay",
    status: "failed",
    votes: { for: 1111111, against: 4444444, abstain: 222222 },
    quorum: 25,
    ends: "May 5, 2026",
    proposer: "PrivacyMax.eth",
    category: "Privacy",
  },
];

const TREASURY = [
  {
    asset: "SKY4444",
    balance: "44,444,444",
    value: "$1,955,555",
    change: "+12.4%",
  },
  { asset: "USDT", balance: "888,888", value: "$888,888", change: "0%" },
  { asset: "ETH", balance: "144", value: "$549,360", change: "+3.2%" },
  { asset: "BTC", balance: "4.44", value: "$463,718", change: "+2.1%" },
];

const STATUS_CONFIG: Record<
  string,
  { color: string; bg: string; icon: React.ElementType }
> = {
  active: {
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
    icon: Clock,
  },
  passed: {
    color: "text-green-400",
    bg: "bg-green-500/10 border-green-500/20",
    icon: CheckCircle,
  },
  failed: {
    color: "text-red-400",
    bg: "bg-red-500/10 border-red-500/20",
    icon: XCircle,
  },
};

export default function ShadowGovernance() {
  const [tab, setTab] = useState<
    "proposals" | "treasury" | "delegate" | "create"
  >("proposals");
  const [filter, setFilter] = useState("All");
  const [voted, setVoted] = useState<
    Record<string, "for" | "against" | "abstain">
  >({});
  const [delegateTo, setDelegateTo] = useState("");

  const vote = (proposalId: string, choice: "for" | "against" | "abstain") => {
    setVoted(prev => ({ ...prev, [proposalId]: choice }));
    toast.success(`✅ Vote cast: ${choice.toUpperCase()} on ${proposalId}`);
  };

  const filtered =
    filter === "All"
      ? PROPOSALS
      : PROPOSALS.filter(
          p => p.status === filter.toLowerCase() || p.category === filter
        );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Vote className="h-6 w-6 text-violet-400" />
            ShadowGovernance
          </h1>
          <p className="text-sm text-muted-foreground">
            SKY4444 DAO — Shape the future of ShadowChat
          </p>
        </div>
        <Badge className="bg-violet-500/10 text-violet-400 border-violet-500/20 font-bold">
          DAO
        </Badge>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: "Proposals", value: "44", emoji: "📋" },
          { label: "Voters", value: "8,888", emoji: "👥" },
          { label: "Quorum", value: "10%", emoji: "🎯" },
          { label: "Treasury", value: "$3.86M", emoji: "💰" },
        ].map(s => (
          <Card key={s.label} className="border-border/50 text-center">
            <CardContent className="pt-2 pb-2">
              <p className="text-base">{s.emoji}</p>
              <p className="font-black text-xs text-violet-400">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-2">
        {(["proposals", "treasury", "delegate", "create"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-violet-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "proposals" && (
        <div className="space-y-3">
          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {[
              "All",
              "Active",
              "Passed",
              "Failed",
              "Tokenomics",
              "Treasury",
              "Exchange",
            ].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${filter === f ? "bg-violet-600 text-white" : "bg-muted text-muted-foreground"}`}
              >
                {f}
              </button>
            ))}
          </div>
          {filtered.map((proposal, i) => {
            const total =
              proposal.votes.for +
              proposal.votes.against +
              proposal.votes.abstain;
            const forPct = Math.round((proposal.votes.for / total) * 100);
            const againstPct = Math.round(
              (proposal.votes.against / total) * 100
            );
            const config = STATUS_CONFIG[proposal.status];
            const StatusIcon = config.icon;
            const userVote = voted[proposal.id];
            return (
              <motion.div
                key={proposal.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Card
                  className={`border ${proposal.status === "active" ? "border-violet-500/20" : "border-border/50"}`}
                >
                  <CardContent className="py-4 px-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className={`text-xs ${config.bg}`}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {proposal.status}
                          </Badge>
                          <Badge className="text-xs bg-muted text-muted-foreground">
                            {proposal.category}
                          </Badge>
                        </div>
                        <p className="font-bold text-sm leading-tight">
                          {proposal.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {proposal.id} · by {proposal.proposer} · Ends{" "}
                          {proposal.ends}
                        </p>
                      </div>
                    </div>
                    {/* Vote bars */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs mb-0.5">
                        <span className="text-green-400 font-bold">
                          For {forPct}%
                        </span>
                        <span className="text-red-400 font-bold">
                          Against {againstPct}%
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden flex">
                        <div
                          className="h-full bg-green-500 transition-all"
                          style={{ width: `${forPct}%` }}
                        />
                        <div
                          className="h-full bg-red-500 transition-all"
                          style={{ width: `${againstPct}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>
                          {proposal.votes.for.toLocaleString()} SKY4444
                        </span>
                        <span>Quorum: {proposal.quorum}%</span>
                      </div>
                    </div>
                    {proposal.status === "active" && (
                      <div className="flex gap-2">
                        {(["for", "against", "abstain"] as const).map(
                          choice => (
                            <button
                              key={choice}
                              onClick={() => vote(proposal.id, choice)}
                              className={`flex-1 py-2 rounded-xl text-xs font-bold uppercase transition-colors ${userVote === choice ? (choice === "for" ? "bg-green-600 text-white" : choice === "against" ? "bg-red-600 text-white" : "bg-muted-foreground text-background") : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
                            >
                              {userVote === choice ? "✓ " : ""}
                              {choice}
                            </button>
                          )
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}

      {tab === "treasury" && (
        <div className="space-y-3">
          <Card className="border-violet-500/20 bg-violet-900/5">
            <CardContent className="py-3 px-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">
                Total Treasury Value
              </p>
              <p className="font-black text-2xl text-violet-400">$3,857,521</p>
              <p className="text-xs text-green-400 font-bold">
                +8.4% this month
              </p>
            </CardContent>
          </Card>
          <div className="space-y-2">
            {TREASURY.map(asset => (
              <Card key={asset.asset} className="border-border/50">
                <CardContent className="py-3 px-4 flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-violet-500/10 flex items-center justify-center font-black text-xs text-violet-400 shrink-0">
                    {asset.asset.slice(0, 3)}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{asset.asset}</p>
                    <p className="text-xs text-muted-foreground">
                      {asset.balance}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-sm">{asset.value}</p>
                    <p
                      className={`text-xs font-bold ${asset.change.startsWith("+") ? "text-green-400" : "text-muted-foreground"}`}
                    >
                      {asset.change}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button
            className="w-full h-10 text-xs bg-violet-600 text-white border-0 font-bold"
            onClick={() => toast.info("Opening treasury proposal form...")}
          >
            <Plus className="h-4 w-4 mr-2" />
            Propose Treasury Allocation
          </Button>
        </div>
      )}

      {tab === "delegate" && (
        <div className="space-y-3">
          <Card className="border-border/50">
            <CardContent className="py-4 px-4 space-y-3">
              <p className="font-bold text-sm">Delegate Your Voting Power</p>
              <p className="text-xs text-muted-foreground">
                Delegate your SKY4444 voting power to a trusted address. You can
                undelegate at any time.
              </p>
              <div>
                <p className="text-xs text-muted-foreground mb-1">
                  Your Voting Power
                </p>
                <div className="p-3 rounded-xl bg-violet-900/10 border border-violet-500/10 text-center">
                  <p className="font-black text-lg text-violet-400">
                    44,444 SKY4444
                  </p>
                  <p className="text-xs text-muted-foreground">
                    = 44,444 votes
                  </p>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">
                  Delegate To (address or ENS)
                </p>
                <Input
                  value={delegateTo}
                  onChange={e => setDelegateTo(e.target.value)}
                  placeholder="0x... or name.eth"
                  className="h-9 text-xs"
                />
              </div>
              <Button
                className="w-full h-10 text-xs bg-violet-600 text-white border-0 font-bold"
                onClick={() => {
                  if (!delegateTo) {
                    toast.error("Enter an address");
                    return;
                  }
                  toast.success(`✅ Voting power delegated to ${delegateTo}`);
                  setDelegateTo("");
                }}
              >
                <Users className="h-4 w-4 mr-2" />
                Delegate Votes
              </Button>
            </CardContent>
          </Card>
          <div>
            <p className="text-xs font-bold text-muted-foreground mb-2">
              TOP DELEGATES
            </p>
            {[
              { name: "SkylerBlue.eth", votes: "4,444,444", proposals: 12 },
              { name: "CryptoWhale.eth", votes: "2,222,222", proposals: 8 },
              { name: "DevDAO.eth", votes: "1,111,111", proposals: 15 },
            ].map(d => (
              <Card key={d.name} className="border-border/50 mb-2">
                <CardContent className="py-3 px-4 flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-violet-500/10 flex items-center justify-center text-sm shrink-0">
                    👤
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{d.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {d.proposals} proposals voted
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-xs text-violet-400">
                      {d.votes}
                    </p>
                    <p className="text-xs text-muted-foreground">votes</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {tab === "create" && (
        <Card className="border-violet-500/20 bg-violet-900/5">
          <CardContent className="py-4 px-4 space-y-3">
            <p className="font-bold text-sm">Create New Proposal</p>
            <p className="text-xs text-muted-foreground">
              Requires 10,000 SKY4444 to submit a governance proposal.
            </p>
            <Input placeholder="Proposal Title" className="h-9 text-xs" />
            <select className="w-full h-9 rounded-xl border border-border bg-background px-3 text-xs focus:outline-none">
              {[
                "Tokenomics",
                "Treasury",
                "Exchange",
                "Features",
                "Compliance",
                "Partnerships",
              ].map(c => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <textarea
              placeholder="Describe your proposal in detail. Include rationale, implementation plan, and expected outcomes..."
              className="w-full h-28 rounded-xl border border-border bg-background px-3 py-2 text-xs resize-none focus:outline-none"
            />
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-xs text-muted-foreground mb-1">
                  Voting Period
                </p>
                <select className="w-full h-9 rounded-xl border border-border bg-background px-3 text-xs focus:outline-none">
                  {["3 days", "5 days", "7 days", "14 days"].map(d => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">
                  Quorum Required
                </p>
                <select className="w-full h-9 rounded-xl border border-border bg-background px-3 text-xs focus:outline-none">
                  {["10%", "25%", "50%", "67%"].map(q => (
                    <option key={q}>{q}</option>
                  ))}
                </select>
              </div>
            </div>
            <Button
              className="w-full h-10 text-xs bg-violet-600 text-white border-0 font-bold"
              onClick={() =>
                toast.success("✅ Proposal SIP-045 submitted for review!")
              }
            >
              <Plus className="h-4 w-4 mr-2" />
              Submit Proposal (10,000 SKY4444)
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
