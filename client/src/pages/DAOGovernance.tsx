import { useState } from "react";
import { motion } from "framer-motion";
import {
  Vote,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  Users,
  Zap,
  Shield,
  Award,
  ChevronRight,
  Plus,
  BarChart2,
  AlertCircle,
  Lock,
  Unlock,
  Globe,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const MOCK_PROPOSALS = [
  {
    id: "p1",
    title: "Increase TRUMP Staking APY to 18%",
    description:
      "Proposal to increase the base staking APY for TRUMP coin holders from 12% to 18% to incentivize long-term holding and reduce sell pressure. This will be funded by 2% of all platform trading fees.",
    votesFor: 8432,
    votesAgainst: 1243,
    endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    status: "active" as const,
    category: "Finance",
    quorum: 10000,
    proposer: "CryptoWhale_88",
    impact: "High",
    userVoted: null as "for" | "against" | null,
  },
  {
    id: "p2",
    title: "Launch SKY4444 Charity Gaming Tournament",
    description:
      "Allocate 50,000 TRUMP tokens from the charity reserve to fund a 7-day gaming tournament where all proceeds go to verified charitable causes. Winners receive NFT trophies.",
    votesFor: 12043,
    votesAgainst: 892,
    endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    status: "active" as const,
    category: "Charity",
    quorum: 10000,
    proposer: "SkylerBlue_Official",
    impact: "High",
    userVoted: null as "for" | "against" | null,
  },
  {
    id: "p3",
    title: "Add Monero (XMR) as Payment Option",
    description:
      "Integrate Monero as a payment option across the marketplace and IT services booking system to provide privacy-focused payment for users who require it.",
    votesFor: 5821,
    votesAgainst: 4103,
    endTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    status: "active" as const,
    category: "Technical",
    quorum: 10000,
    proposer: "PrivacyFirst_XMR",
    impact: "Medium",
    userVoted: null as "for" | "against" | null,
  },
  {
    id: "p4",
    title: "Skyler Blue IT Resolutions Partnership Tier",
    description:
      "Create a dedicated DAO partnership tier for Skyler Blue IT Resolutions to offer discounted managed IT services to all SKY4444 token holders. 20% discount for holders of 1000+ SKY4444.",
    votesFor: 9234,
    votesAgainst: 432,
    endTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    status: "passed" as const,
    category: "Partnership",
    quorum: 10000,
    proposer: "SkylerBlue_Official",
    impact: "High",
    userVoted: "for" as "for" | "against" | null,
  },
];

const STATS = [
  { label: "Total Proposals", value: "47", icon: Vote, color: "text-blue-400" },
  { label: "Active Votes", value: "3", icon: Clock, color: "text-orange-400" },
  { label: "Passed", value: "38", icon: CheckCircle, color: "text-green-400" },
  {
    label: "Total Voters",
    value: "12.4K",
    icon: Users,
    color: "text-purple-400",
  },
];

export default function DAOGovernance() {
  const [proposals, setProposals] = useState(MOCK_PROPOSALS);
  const [filter, setFilter] = useState<"all" | "active" | "passed" | "failed">(
    "all"
  );

  // Use correct tRPC hook pattern
  const { data: serverProposals } = trpc.dao.listProposals.useQuery();
  const voteMutation = trpc.dao.vote.useMutation({
    onSuccess: () => toast.success("Vote recorded on-chain!"),
    onError: () => toast.error("Failed to submit vote"),
  });

  const handleVote = (proposalId: string, vote: "for" | "against") => {
    const proposal = proposals.find(p => p.id === proposalId);
    if (proposal?.userVoted) {
      toast.error("You already voted on this proposal");
      return;
    }
    if (proposal?.status !== "active") {
      toast.error("This proposal is no longer active");
      return;
    }

    setProposals(prev =>
      prev.map(p =>
        p.id === proposalId
          ? {
              ...p,
              votesFor: vote === "for" ? p.votesFor + 1 : p.votesFor,
              votesAgainst:
                vote === "against" ? p.votesAgainst + 1 : p.votesAgainst,
              userVoted: vote,
            }
          : p
      )
    );

    voteMutation.mutate({ proposalId, vote });
  };

  const filtered = proposals.filter(
    p => filter === "all" || p.status === filter
  );

  const formatTimeLeft = (endTime: Date) => {
    const diff = endTime.getTime() - Date.now();
    if (diff < 0) return "Ended";
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    if (days > 0) return `${days}d ${hours}h left`;
    return `${hours}h left`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Vote className="h-6 w-6 text-purple-400" />
            DAO Governance
          </h1>
          <p className="text-sm text-muted-foreground">
            Vote with TRUMP & SKY4444 tokens · On-chain democracy
          </p>
        </div>
        <Button
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0"
          onClick={() =>
            toast.info("Proposal creation requires 1000 TRUMP tokens")
          }
        >
          <Plus className="h-4 w-4 mr-2" />
          New Proposal
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {STATS.map(({ label, value, icon: Icon, color }) => (
          <Card key={label} className="border-border/50">
            <CardContent className="pt-4 pb-3">
              <div className="flex items-center gap-2 mb-1">
                <Icon className={`h-4 w-4 ${color}`} />
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
              <p className="text-2xl font-black">{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Voting Power */}
      <Card className="border-purple-500/20 bg-gradient-to-r from-purple-950/20 to-blue-950/20">
        <CardContent className="py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                Your Voting Power
              </p>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <Zap className="h-4 w-4 text-red-400" />
                  <span className="font-bold">2,450 TRUMP</span>
                  <Badge className="bg-red-500/10 text-red-400 border-red-500/20 text-xs">
                    2,450 votes
                  </Badge>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="h-4 w-4 text-cyan-400" />
                  <span className="font-bold">5,000 SKY4444</span>
                  <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20 text-xs">
                    500 votes
                  </Badge>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">
                Total Voting Power
              </p>
              <p className="text-2xl font-black text-purple-400">2,950</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filter */}
      <div className="flex gap-2">
        {(["all", "active", "passed", "failed"] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-colors ${filter === f ? "bg-purple-600 text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Proposals */}
      <div className="space-y-4">
        {filtered.map((proposal, i) => {
          const total = proposal.votesFor + proposal.votesAgainst;
          const forPct =
            total > 0 ? Math.round((proposal.votesFor / total) * 100) : 0;
          const againstPct = 100 - forPct;
          const quorumPct = Math.min(
            100,
            Math.round((total / proposal.quorum) * 100)
          );

          return (
            <motion.div
              key={proposal.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card
                className={`border-border/50 ${proposal.status === "active" ? "hover:border-purple-500/30" : ""} transition-colors`}
              >
                <CardContent className="pt-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <Badge
                          className={`text-xs ${
                            proposal.status === "active"
                              ? "bg-green-500/10 text-green-400 border-green-500/20"
                              : proposal.status === "passed"
                                ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                                : "bg-red-500/10 text-red-400 border-red-500/20"
                          }`}
                        >
                          {proposal.status === "active" ? (
                            <Clock className="h-3 w-3 mr-1" />
                          ) : proposal.status === "passed" ? (
                            <CheckCircle className="h-3 w-3 mr-1" />
                          ) : (
                            <XCircle className="h-3 w-3 mr-1" />
                          )}
                          {proposal.status.charAt(0).toUpperCase() +
                            proposal.status.slice(1)}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {proposal.category}
                        </Badge>
                        <Badge
                          className={`text-xs ${proposal.impact === "High" ? "bg-orange-500/10 text-orange-400 border-orange-500/20" : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"}`}
                        >
                          {proposal.impact} Impact
                        </Badge>
                      </div>
                      <h3 className="font-bold text-base mb-1">
                        {proposal.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {proposal.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Proposed by{" "}
                        <span className="text-foreground">
                          {proposal.proposer}
                        </span>{" "}
                        · {formatTimeLeft(proposal.endTime)}
                      </p>
                    </div>
                  </div>

                  {/* Vote Bars */}
                  <div className="space-y-2 my-4">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-green-400 font-medium">
                          For — {forPct}%
                        </span>
                        <span className="text-muted-foreground">
                          {proposal.votesFor.toLocaleString()} votes
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${forPct}%` }}
                          transition={{ duration: 0.8, delay: i * 0.05 }}
                          className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-red-400 font-medium">
                          Against — {againstPct}%
                        </span>
                        <span className="text-muted-foreground">
                          {proposal.votesAgainst.toLocaleString()} votes
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${againstPct}%` }}
                          transition={{ duration: 0.8, delay: i * 0.05 }}
                          className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Quorum */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">
                        Quorum: {quorumPct}%
                      </span>
                      <span className="text-muted-foreground">
                        {total.toLocaleString()} /{" "}
                        {proposal.quorum.toLocaleString()} votes
                      </span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${quorumPct}%` }}
                        transition={{ duration: 0.8 }}
                        className={`h-full rounded-full ${quorumPct >= 100 ? "bg-green-500" : "bg-blue-500"}`}
                      />
                    </div>
                  </div>

                  {/* Vote Buttons */}
                  {proposal.status === "active" && (
                    <div className="flex gap-3">
                      {proposal.userVoted ? (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          You voted{" "}
                          <span
                            className={
                              proposal.userVoted === "for"
                                ? "text-green-400 font-bold"
                                : "text-red-400 font-bold"
                            }
                          >
                            {proposal.userVoted}
                          </span>
                        </div>
                      ) : (
                        <>
                          <Button
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white border-0"
                            onClick={() => handleVote(proposal.id, "for")}
                            disabled={voteMutation.isPending}
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Vote For
                          </Button>
                          <Button
                            variant="outline"
                            className="flex-1 border-red-500/30 text-red-400 hover:bg-red-500/10"
                            onClick={() => handleVote(proposal.id, "against")}
                            disabled={voteMutation.isPending}
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Vote Against
                          </Button>
                        </>
                      )}
                    </div>
                  )}
                  {proposal.status === "passed" && (
                    <div className="flex items-center gap-2 text-sm text-blue-400">
                      <CheckCircle className="h-4 w-4" />
                      Proposal passed and is being implemented
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
