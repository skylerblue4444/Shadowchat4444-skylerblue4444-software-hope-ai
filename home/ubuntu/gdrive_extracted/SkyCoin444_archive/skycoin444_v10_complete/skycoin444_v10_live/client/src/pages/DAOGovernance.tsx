import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Vote, Users, TrendingUp, Zap } from "lucide-react";

interface Proposal {
  id: number;
  title: string;
  description: string;
  status: "active" | "passed" | "failed" | "pending";
  votesFor: number;
  votesAgainst: number;
  votesAbstain: number;
  endsIn: string;
  category: string;
}

export default function DAOGovernance() {
  const [proposals, setProposals] = useState<Proposal[]>([
    {
      id: 1,
      title: "Increase Staking Rewards to 15% APY",
      description: "Proposal to increase annual percentage yield for staking positions from 12% to 15%",
      status: "active",
      votesFor: 8450,
      votesAgainst: 1230,
      votesAbstain: 320,
      endsIn: "2 days",
      category: "Tokenomics",
    },
    {
      id: 2,
      title: "Launch Cross-Chain Bridge to Ethereum",
      description: "Enable SKY token transfers between Solana and Ethereum networks",
      status: "active",
      votesFor: 6780,
      votesAgainst: 890,
      votesAbstain: 450,
      endsIn: "3 days",
      category: "Infrastructure",
    },
    {
      id: 3,
      title: "Reduce Trading Fees to 0.05%",
      description: "Lower trading fees from 0.1% to 0.05% to increase platform volume",
      status: "passed",
      votesFor: 9200,
      votesAgainst: 1100,
      votesAbstain: 200,
      endsIn: "Passed",
      category: "Economics",
    },
    {
      id: 4,
      title: "Add BTC/EUR Trading Pair",
      description: "Add new Bitcoin to Euro trading pair for European traders",
      status: "pending",
      votesFor: 0,
      votesAgainst: 0,
      votesAbstain: 0,
      endsIn: "Voting starts in 1 day",
      category: "Trading",
    },
  ]);

  const [userVotes, setUserVotes] = useState<Record<number, "for" | "against" | "abstain">>({});

  const handleVote = (proposalId: number, vote: "for" | "against" | "abstain") => {
    setUserVotes({ ...userVotes, [proposalId]: vote });
  };

  const totalVotingPower = 10000;
  const userVotingPower = 2500;

  const calculatePercentage = (votes: number, total: number) => {
    return total === 0 ? 0 : Math.round((votes / total) * 100);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Your Voting Power</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-400">{userVotingPower.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">
              {((userVotingPower / totalVotingPower) * 100).toFixed(1)}% of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Active Proposals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-400">
              {proposals.filter((p) => p.status === "active").length}
            </div>
            <p className="text-xs text-gray-500 mt-1">Voting now</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Your Votes Cast</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-400">{Object.keys(userVotes).length}</div>
            <p className="text-xs text-gray-500 mt-1">This season</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Proposals Passed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-400">
              {proposals.filter((p) => p.status === "passed").length}
            </div>
            <p className="text-xs text-gray-500 mt-1">This season</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Active Proposals</h3>
        {proposals.map((proposal) => {
          const total = proposal.votesFor + proposal.votesAgainst + proposal.votesAbstain;
          const forPercent = calculatePercentage(proposal.votesFor, total);
          const againstPercent = calculatePercentage(proposal.votesAgainst, total);

          return (
            <Card key={proposal.id} className="overflow-hidden">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-sm">{proposal.title}</h3>
                      <Badge
                        className={`text-xs ${
                          proposal.status === "active"
                            ? "bg-blue-600 text-white"
                            : proposal.status === "passed"
                              ? "bg-green-600 text-white"
                              : proposal.status === "failed"
                                ? "bg-red-600 text-white"
                                : "bg-gray-600 text-white"
                        }`}
                      >
                        {proposal.status.toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {proposal.category}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-400">{proposal.description}</p>
                  </div>
                  <div className="text-right text-xs text-gray-500 flex-shrink-0 ml-4">
                    <p>{proposal.endsIn}</p>
                  </div>
                </div>

                {proposal.status === "active" && (
                  <>
                    <div className="space-y-2 mb-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs font-semibold text-green-400">For</span>
                          <span className="text-xs text-gray-400">
                            {proposal.votesFor.toLocaleString()} ({forPercent}%)
                          </span>
                        </div>
                        <Progress value={forPercent} className="h-2" />
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs font-semibold text-red-400">Against</span>
                          <span className="text-xs text-gray-400">
                            {proposal.votesAgainst.toLocaleString()} ({againstPercent}%)
                          </span>
                        </div>
                        <Progress value={againstPercent} className="h-2" />
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs font-semibold text-gray-400">Abstain</span>
                          <span className="text-xs text-gray-400">
                            {proposal.votesAbstain.toLocaleString()} ({calculatePercentage(proposal.votesAbstain, total)}%)
                          </span>
                        </div>
                        <Progress value={calculatePercentage(proposal.votesAbstain, total)} className="h-2" />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleVote(proposal.id, "for")}
                        variant={userVotes[proposal.id] === "for" ? "default" : "outline"}
                        size="sm"
                        className={`flex-1 ${userVotes[proposal.id] === "for" ? "bg-green-600" : ""}`}
                      >
                        <Vote className="w-3 h-3 mr-1" />
                        For
                      </Button>
                      <Button
                        onClick={() => handleVote(proposal.id, "against")}
                        variant={userVotes[proposal.id] === "against" ? "default" : "outline"}
                        size="sm"
                        className={`flex-1 ${userVotes[proposal.id] === "against" ? "bg-red-600" : ""}`}
                      >
                        <Vote className="w-3 h-3 mr-1" />
                        Against
                      </Button>
                      <Button
                        onClick={() => handleVote(proposal.id, "abstain")}
                        variant={userVotes[proposal.id] === "abstain" ? "default" : "outline"}
                        size="sm"
                        className={`flex-1 ${userVotes[proposal.id] === "abstain" ? "bg-gray-600" : ""}`}
                      >
                        <Vote className="w-3 h-3 mr-1" />
                        Abstain
                      </Button>
                    </div>
                  </>
                )}

                {proposal.status !== "active" && (
                  <div className="p-3 bg-gray-900/50 rounded border border-gray-700">
                    <p className="text-xs text-gray-400">
                      {proposal.status === "passed"
                        ? "✓ This proposal has been approved and will be implemented"
                        : "✗ This proposal did not reach consensus"}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            How DAO Voting Works
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center font-bold text-sm flex-shrink-0">
              1
            </div>
            <div>
              <p className="font-semibold text-sm">Earn Voting Power</p>
              <p className="text-xs text-gray-400">Hold SKY tokens to earn voting power</p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center font-bold text-sm flex-shrink-0">
              2
            </div>
            <div>
              <p className="font-semibold text-sm">Review Proposals</p>
              <p className="text-xs text-gray-400">Read and analyze community proposals</p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center font-bold text-sm flex-shrink-0">
              3
            </div>
            <div>
              <p className="font-semibold text-sm">Cast Your Vote</p>
              <p className="text-xs text-gray-400">Vote for, against, or abstain on proposals</p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center font-bold text-sm flex-shrink-0">
              4
            </div>
            <div>
              <p className="font-semibold text-sm">Earn Rewards</p>
              <p className="text-xs text-gray-400">Earn governance tokens for participating</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
