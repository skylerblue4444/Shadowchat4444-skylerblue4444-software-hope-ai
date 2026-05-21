import { useState } from "react";
import { motion } from "framer-motion";
import {
  Vote,
  CheckCircle,
  Clock,
  TrendingUp,
  Users,
  Zap,
  BarChart3,
  Globe,
  Coins,
  Shield,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

type ProposalStatus = "active" | "passed" | "failed" | "pending";
type Proposal = {
  id: string;
  title: string;
  description: string;
  category: string;
  status: ProposalStatus;
  votesFor: number;
  votesAgainst: number;
  totalVotes: number;
  deadline: string;
  quorum: number;
  myVote?: "for" | "against";
};

const PROPOSALS: Proposal[] = [
  {
    id: "SIP-044",
    title: "Reduce Trading Fees to 0.1% for SKY4444 Pairs",
    description:
      "Proposal to reduce trading fees on all SKY4444 trading pairs from 0.3% to 0.1% to increase volume and attract more traders.",
    category: "Trading",
    status: "active",
    votesFor: 44444,
    votesAgainst: 8888,
    totalVotes: 53332,
    deadline: "May 20, 2026",
    quorum: 80,
  },
  {
    id: "SIP-043",
    title: "Add China WeChat Pay Integration",
    description:
      "Integrate WeChat Pay as a fiat on-ramp for Chinese users, enabling CNY deposits and withdrawals.",
    category: "Payments",
    status: "active",
    votesFor: 33333,
    votesAgainst: 11111,
    totalVotes: 44444,
    deadline: "May 22, 2026",
    quorum: 60,
  },
  {
    id: "SIP-042",
    title: "Launch SKY4444 Mobile App (iOS + Android)",
    description:
      "Allocate 500,000 SKY4444 from treasury to fund native mobile app development.",
    category: "Development",
    status: "passed",
    votesFor: 88888,
    votesAgainst: 4444,
    totalVotes: 93332,
    deadline: "May 10, 2026",
    quorum: 100,
    myVote: "for",
  },
  {
    id: "SIP-041",
    title: "Burn 10% of Treasury SKY4444 Tokens",
    description:
      "Permanently burn 44,444,444 SKY4444 tokens from the treasury to reduce supply and increase scarcity.",
    category: "Tokenomics",
    status: "failed",
    votesFor: 22222,
    votesAgainst: 44444,
    totalVotes: 66666,
    deadline: "May 5, 2026",
    quorum: 100,
  },
];

export default function ShadowVote() {
  const [tab, setTab] = useState<"active" | "history" | "create">("active");
  const [votes, setVotes] = useState<Record<string, "for" | "against">>({});
  const [proposalTitle, setProposalTitle] = useState("");
  const [proposalDesc, setProposalDesc] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const vote = (id: string, choice: "for" | "against") => {
    if (votes[id]) {
      toast.info("You already voted on this proposal");
      return;
    }
    setVotes(prev => ({ ...prev, [id]: choice }));
    toast.success(
      `✅ Voted ${choice === "for" ? "FOR" : "AGAINST"} ${id}! Your 44,444 SKY4444 voting power applied.`
    );
  };

  const activeProposals = PROPOSALS.filter(p => p.status === "active");
  const historyProposals = PROPOSALS.filter(p => p.status !== "active");

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Vote className="h-6 w-6 text-cyan-400" />
            ShadowVote
          </h1>
          <p className="text-sm text-muted-foreground">
            On-chain governance — your voice, your platform
          </p>
        </div>
        <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20 font-bold">
          44,444 VP
        </Badge>
      </div>

      {/* Voting Power Card */}
      <Card className="border-cyan-500/20 bg-cyan-900/5">
        <CardContent className="py-3 px-4 flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-cyan-500/10 flex items-center justify-center shrink-0">
            <Coins className="h-6 w-6 text-cyan-400" />
          </div>
          <div className="flex-1">
            <p className="font-black text-lg text-cyan-400">
              44,444 Voting Power
            </p>
            <p className="text-xs text-muted-foreground">
              Based on your SKY4444 balance · Top 5% of voters
            </p>
          </div>
          <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20 text-xs">
            Top 5%
          </Badge>
        </CardContent>
      </Card>

      <div className="flex gap-2">
        {(["active", "history", "create"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-cyan-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "active" && (
        <div className="space-y-3">
          {activeProposals.map((prop, i) => {
            const forPct = Math.round((prop.votesFor / prop.totalVotes) * 100);
            const myVote = votes[prop.id];
            return (
              <motion.div
                key={prop.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Card className="border-border/50 hover:border-cyan-500/20 transition-all">
                  <CardContent className="py-3 px-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="font-bold text-xs text-muted-foreground">
                            {prop.id}
                          </p>
                          <Badge className="text-xs bg-muted text-muted-foreground">
                            {prop.category}
                          </Badge>
                        </div>
                        <p className="font-black text-sm">{prop.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                          {prop.description}
                        </p>
                      </div>
                    </div>
                    <div className="mb-2">
                      <div className="flex justify-between text-xs mb-0.5">
                        <span className="text-green-400 font-bold">
                          For: {forPct}%
                        </span>
                        <span className="text-red-400 font-bold">
                          Against: {100 - forPct}%
                        </span>
                      </div>
                      <div className="h-2 bg-red-500/20 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 rounded-full transition-all"
                          style={{ width: `${forPct}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs mt-0.5 text-muted-foreground">
                        <span>{prop.votesFor.toLocaleString()} SKY</span>
                        <span>Deadline: {prop.deadline}</span>
                        <span>{prop.votesAgainst.toLocaleString()} SKY</span>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-muted-foreground">
                        Quorum: {Math.round((prop.totalVotes / 100000) * 100)}%
                        / {prop.quorum}% needed
                      </span>
                      <span className="text-muted-foreground">
                        {prop.totalVotes.toLocaleString()} total votes
                      </span>
                    </div>
                    {myVote ? (
                      <div
                        className={`p-2 rounded-xl text-center text-xs font-bold ${myVote === "for" ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}
                      >
                        ✓ You voted {myVote === "for" ? "FOR" : "AGAINST"} this
                        proposal
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <Button
                          className="flex-1 h-9 text-xs bg-green-600 text-white border-0 font-bold"
                          onClick={() => vote(prop.id, "for")}
                        >
                          ✓ Vote For
                        </Button>
                        <Button
                          className="flex-1 h-9 text-xs bg-red-600 text-white border-0 font-bold"
                          onClick={() => vote(prop.id, "against")}
                        >
                          ✗ Vote Against
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}

      {tab === "history" && (
        <div className="space-y-3">
          {historyProposals.map((prop, i) => {
            const forPct = Math.round((prop.votesFor / prop.totalVotes) * 100);
            return (
              <Card
                key={prop.id}
                className={`border ${prop.status === "passed" ? "border-green-500/20" : "border-red-500/20"} opacity-80`}
              >
                <CardContent className="py-3 px-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-bold text-xs text-muted-foreground">
                        {prop.id}
                      </p>
                      <p className="font-black text-sm">{prop.title}</p>
                    </div>
                    <Badge
                      className={`text-xs ${prop.status === "passed" ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-red-500/10 text-red-400 border-red-500/20"}`}
                    >
                      {prop.status === "passed" ? "✓ Passed" : "✗ Failed"}
                    </Badge>
                  </div>
                  <div className="h-1.5 bg-red-500/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${forPct}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs mt-1 text-muted-foreground">
                    <span>For: {forPct}%</span>
                    <span>{prop.totalVotes.toLocaleString()} votes</span>
                    <span>Against: {100 - forPct}%</span>
                  </div>
                  {prop.myVote && (
                    <p className="text-xs text-cyan-400 font-bold mt-1">
                      You voted {prop.myVote === "for" ? "FOR" : "AGAINST"}
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {tab === "create" && (
        <Card className="border-cyan-500/20 bg-cyan-900/5">
          <CardContent className="py-4 px-4 space-y-3">
            <p className="font-bold text-sm">Create Governance Proposal</p>
            <p className="text-xs text-muted-foreground">
              Requires 100,000 SKY4444 to submit a proposal. Proposals are voted
              on for 7 days.
            </p>
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                Proposal Title
              </p>
              <Input
                value={proposalTitle}
                onChange={e => setProposalTitle(e.target.value)}
                placeholder="e.g. Add New Trading Pair"
                className="h-9 text-xs"
              />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Description</p>
              <textarea
                value={proposalDesc}
                onChange={e => setProposalDesc(e.target.value)}
                placeholder="Detailed description of your proposal and its benefits..."
                className="w-full h-24 rounded-xl border border-border bg-background px-3 py-2 text-xs resize-none focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Category</p>
              <select className="w-full h-9 rounded-xl border border-border bg-background px-3 text-xs focus:outline-none">
                {[
                  "Trading",
                  "Tokenomics",
                  "Development",
                  "Payments",
                  "Governance",
                  "Marketing",
                  "Community",
                ].map(c => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <Button
              className="w-full h-10 text-xs bg-cyan-600 text-white border-0 font-bold"
              onClick={async () => {
                if (!proposalTitle || !proposalDesc) {
                  toast.error("Fill in all fields");
                  return;
                }
                setSubmitting(true);
                await new Promise(r => setTimeout(r, 1500));
                setSubmitting(false);
                toast.success(
                  "✅ Proposal submitted! 100,000 SKY4444 locked for 7 days."
                );
                setProposalTitle("");
                setProposalDesc("");
              }}
              disabled={submitting}
            >
              {submitting ? (
                "Submitting..."
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  Submit Proposal — 100,000 SKY4444
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
