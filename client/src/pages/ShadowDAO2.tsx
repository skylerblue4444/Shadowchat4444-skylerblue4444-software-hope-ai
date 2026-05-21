import { useState } from "react";
import { motion } from "framer-motion";
import {
  Vote,
  Users,
  DollarSign,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  Zap,
  Shield,
  Star,
  Plus,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Proposal {
  id: number;
  title: string;
  description: string;
  proposer: string;
  status: "active" | "passed" | "failed" | "pending";
  votesFor: number;
  votesAgainst: number;
  totalVotes: number;
  quorum: number;
  deadline: string;
  category: string;
  impact: string;
}

const PROPOSALS: Proposal[] = [
  {
    id: 1,
    title: "Increase SKY4444 Staking APY to 22%",
    description:
      "Proposal to increase the base staking APY from 18% to 22% to attract more long-term holders and reduce circulating supply.",
    proposer: "0x7f3a...2b9c",
    status: "active",
    votesFor: 8420000,
    votesAgainst: 2100000,
    totalVotes: 10520000,
    quorum: 10000000,
    deadline: "3 days",
    category: "Tokenomics",
    impact: "High",
  },
  {
    id: 2,
    title: "Add Solana Chain Support to ShadowBridge",
    description:
      "Expand the cross-chain bridge to support Solana, enabling SOL and SPL token transfers to/from SkyChain.",
    proposer: "0x4e1b...8a2f",
    status: "active",
    votesFor: 12800000,
    votesAgainst: 800000,
    totalVotes: 13600000,
    quorum: 10000000,
    deadline: "5 days",
    category: "Technical",
    impact: "Medium",
  },
  {
    id: 3,
    title: "Allocate $500K Treasury to Marketing",
    description:
      "Release $500,000 from the DAO treasury for a global marketing campaign targeting 10M new users in Q3 2026.",
    proposer: "0x9c2d...1e4a",
    status: "passed",
    votesFor: 18200000,
    votesAgainst: 3400000,
    totalVotes: 21600000,
    quorum: 10000000,
    deadline: "Ended",
    category: "Treasury",
    impact: "High",
  },
  {
    id: 4,
    title: "Enable China Compliance Mode by Default",
    description:
      "Activate China-compliant content filters and MIIT registration flow for all users with Chinese IP addresses.",
    proposer: "0x2a8f...7d3e",
    status: "failed",
    votesFor: 4100000,
    votesAgainst: 9800000,
    totalVotes: 13900000,
    quorum: 10000000,
    deadline: "Ended",
    category: "Compliance",
    impact: "High",
  },
];

const DELEGATES = [
  {
    address: "0x7f3a...2b9c",
    name: "CryptoWhale",
    power: "4.2M SKY",
    delegators: 142,
    track: "98%",
  },
  {
    address: "0x4e1b...8a2f",
    name: "SkyBuilder",
    power: "2.8M SKY",
    delegators: 89,
    track: "94%",
  },
  {
    address: "0x9c2d...1e4a",
    name: "ShadowVoter",
    power: "1.9M SKY",
    delegators: 67,
    track: "87%",
  },
  {
    address: "0x2a8f...7d3e",
    name: "DeFiMaximalist",
    power: "1.4M SKY",
    delegators: 45,
    track: "91%",
  },
];

export default function ShadowDAO2() {
  const [tab, setTab] = useState<
    "proposals" | "delegate" | "treasury" | "create"
  >("proposals");
  const [votes, setVotes] = useState<Record<number, "for" | "against">>({});
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");

  const castVote = (proposalId: number, vote: "for" | "against") => {
    if (votes[proposalId]) {
      toast.error("Already voted on this proposal");
      return;
    }
    setVotes(prev => ({ ...prev, [proposalId]: vote }));
    toast.success(
      `Vote cast: ${vote === "for" ? "✅ For" : "❌ Against"} proposal #${proposalId}`
    );
  };

  const myVotingPower = "42,840 SKY4444";

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Vote className="h-6 w-6 text-violet-400" />
            ShadowDAO
          </h1>
          <p className="text-sm text-muted-foreground">
            Decentralized governance — vote on platform decisions, manage
            treasury, and delegate power
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">My Voting Power</p>
          <p className="font-black text-sm text-violet-400">{myVotingPower}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: "Active Proposals", value: "2", color: "text-violet-400" },
          { label: "Total Proposals", value: "48", color: "text-cyan-400" },
          { label: "Treasury", value: "$4.2M", color: "text-green-400" },
          { label: "Participation", value: "68.4%", color: "text-yellow-400" },
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
            ["proposals", "📋 Proposals"],
            ["delegate", "🤝 Delegate"],
            ["treasury", "💰 Treasury"],
            ["create", "✏️ Create"],
          ] as const
        ).map(([t, label]) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${tab === t ? "bg-violet-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Proposals */}
      {tab === "proposals" && (
        <div className="space-y-4">
          {PROPOSALS.map((p, i) => {
            const forPct = (p.votesFor / p.totalVotes) * 100;
            const againstPct = (p.votesAgainst / p.totalVotes) * 100;
            const quorumPct = Math.min((p.totalVotes / p.quorum) * 100, 100);
            const myVote = votes[p.id];
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <Card className="border-border/50 hover:border-violet-500/20 transition-all">
                  <CardContent className="py-4 px-4 space-y-3">
                    <div className="flex items-start gap-2 flex-wrap">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <Badge
                            className={`text-xs border-0 ${p.status === "active" ? "bg-green-500/10 text-green-400" : p.status === "passed" ? "bg-blue-500/10 text-blue-400" : "bg-red-500/10 text-red-400"}`}
                          >
                            {p.status}
                          </Badge>
                          <Badge className="text-xs bg-muted text-muted-foreground border-0">
                            {p.category}
                          </Badge>
                          <Badge
                            className={`text-xs border-0 ${p.impact === "High" ? "bg-orange-500/10 text-orange-400" : "bg-yellow-500/10 text-yellow-400"}`}
                          >
                            {p.impact} Impact
                          </Badge>
                        </div>
                        <p className="font-black text-sm">{p.title}</p>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                          {p.description}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-green-400 font-bold">
                          For: {(p.votesFor / 1e6).toFixed(1)}M (
                          {forPct.toFixed(0)}%)
                        </span>
                        <span className="text-red-400 font-bold">
                          Against: {(p.votesAgainst / 1e6).toFixed(1)}M (
                          {againstPct.toFixed(0)}%)
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden flex">
                        <motion.div
                          className="h-full bg-green-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${forPct}%` }}
                          transition={{ duration: 1 }}
                        />
                        <motion.div
                          className="h-full bg-red-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${againstPct}%` }}
                          transition={{ duration: 1, delay: 0.1 }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Quorum: {quorumPct.toFixed(0)}%</span>
                        <span>Deadline: {p.deadline}</span>
                      </div>
                    </div>
                    {p.status === "active" && !myVote && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="flex-1 h-8 text-xs bg-green-600 text-white border-0 font-bold"
                          onClick={() => castVote(p.id, "for")}
                        >
                          <CheckCircle className="h-3.5 w-3.5 mr-1" />
                          Vote For
                        </Button>
                        <Button
                          size="sm"
                          className="flex-1 h-8 text-xs bg-red-600 text-white border-0 font-bold"
                          onClick={() => castVote(p.id, "against")}
                        >
                          <XCircle className="h-3.5 w-3.5 mr-1" />
                          Vote Against
                        </Button>
                      </div>
                    )}
                    {myVote && (
                      <Badge
                        className={`text-xs border-0 ${myVote === "for" ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}
                      >
                        You voted: {myVote === "for" ? "✅ For" : "❌ Against"}
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Delegate */}
      {tab === "delegate" && (
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground">
            Delegate your voting power to trusted community members
          </p>
          {DELEGATES.map((d, i) => (
            <motion.div
              key={d.address}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Card className="border-border/50 hover:border-violet-500/20 transition-all">
                <CardContent className="py-3 px-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-violet-500/20 flex items-center justify-center shrink-0">
                    <span className="font-black text-sm text-violet-400">
                      {d.name[0]}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{d.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {d.address} · {d.delegators} delegators
                    </p>
                  </div>
                  <div className="text-right shrink-0 space-y-1">
                    <p className="font-black text-xs text-violet-400">
                      {d.power}
                    </p>
                    <p className="text-xs text-green-400">{d.track} track</p>
                    <Button
                      size="sm"
                      className="h-7 px-3 text-xs bg-violet-600 text-white border-0 font-bold"
                      onClick={() => toast.success(`Delegated to ${d.name}!`)}
                    >
                      Delegate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Treasury */}
      {tab === "treasury" && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                label: "Total Treasury",
                value: "$4.2M",
                color: "text-green-400",
              },
              {
                label: "Monthly Inflow",
                value: "$84K",
                color: "text-cyan-400",
              },
              {
                label: "Monthly Outflow",
                value: "$42K",
                color: "text-red-400",
              },
              { label: "Runway", value: "8.4 yrs", color: "text-yellow-400" },
            ].map(s => (
              <Card key={s.label} className="border-border/50">
                <CardContent className="py-4 px-4 text-center">
                  <p className={`font-black text-2xl ${s.color}`}>{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-sm font-bold">Treasury Allocations</p>
          {[
            {
              category: "Development",
              amount: "$1.68M",
              pct: 40,
              color: "bg-blue-500",
            },
            {
              category: "Marketing",
              amount: "$840K",
              pct: 20,
              color: "bg-purple-500",
            },
            {
              category: "Operations",
              amount: "$630K",
              pct: 15,
              color: "bg-green-500",
            },
            {
              category: "Reserves",
              amount: "$840K",
              pct: 20,
              color: "bg-yellow-500",
            },
            {
              category: "Charity",
              amount: "$210K",
              pct: 5,
              color: "bg-pink-500",
            },
          ].map(item => (
            <div key={item.category} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-medium">{item.category}</span>
                <span className="font-bold">
                  {item.amount} ({item.pct}%)
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className={`h-full ${item.color} rounded-full`}
                  initial={{ width: 0 }}
                  animate={{ width: `${item.pct}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create */}
      {tab === "create" && (
        <Card className="border-violet-500/20 bg-violet-900/5">
          <CardContent className="py-5 px-5 space-y-4">
            <p className="font-bold text-sm">Submit New Proposal</p>
            <p className="text-xs text-muted-foreground">
              Requires 10,000 SKY4444 to submit. Proposals are on-chain and
              immutable once submitted.
            </p>
            <input
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              placeholder="Proposal title..."
              className="w-full h-10 px-4 rounded-xl bg-muted text-sm border border-border/50 focus:outline-none focus:border-violet-500/40"
            />
            <textarea
              value={newDesc}
              onChange={e => setNewDesc(e.target.value)}
              placeholder="Detailed description of the proposal, expected impact, and implementation plan..."
              className="w-full h-32 px-4 py-3 rounded-xl bg-muted text-sm border border-border/50 focus:outline-none focus:border-violet-500/40 resize-none"
            />
            <select className="w-full h-10 px-3 rounded-xl bg-muted text-sm border border-border/50 focus:outline-none">
              {[
                "Tokenomics",
                "Technical",
                "Treasury",
                "Compliance",
                "Governance",
                "Marketing",
              ].map(c => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <Button
              className="w-full h-10 bg-violet-600 text-white border-0 font-bold text-sm"
              onClick={() => {
                if (!newTitle || !newDesc) {
                  toast.error("Fill in all fields");
                  return;
                }
                toast.success("Proposal submitted on-chain!");
                setNewTitle("");
                setNewDesc("");
              }}
            >
              <Zap className="h-4 w-4 mr-2" />
              Submit Proposal (10,000 SKY4444)
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
