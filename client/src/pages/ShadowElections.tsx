import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Vote,
  Users,
  Clock,
  CheckCircle,
  BarChart3,
  Shield,
  Globe,
  Plus,
  Trophy,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const ELECTIONS = [
  {
    id: 1,
    title: "ShadowChat CEO Election 2026",
    type: "Platform",
    status: "live",
    ends: "2 days left",
    totalVotes: 44444,
    candidates: [
      {
        name: "Skyler Blue Spiller",
        votes: 18888,
        pct: 42.5,
        color: "#6366f1",
      },
      { name: "CryptoDevDAO.eth", votes: 12222, pct: 27.5, color: "#22c55e" },
      { name: "ShadowBuilder.eth", votes: 8888, pct: 20.0, color: "#f59e0b" },
      { name: "Web3Pioneer.eth", votes: 4444, pct: 10.0, color: "#ec4899" },
    ],
  },
  {
    id: 2,
    title: "SKY4444 Fee Structure Vote",
    type: "DAO",
    status: "live",
    ends: "5 days left",
    totalVotes: 8888,
    candidates: [
      { name: "0.1% trading fee", votes: 4888, pct: 55.0, color: "#22c55e" },
      { name: "0.25% trading fee", votes: 2444, pct: 27.5, color: "#6366f1" },
      { name: "0.5% trading fee", votes: 1556, pct: 17.5, color: "#f59e0b" },
    ],
  },
  {
    id: 3,
    title: "Community Charity Partner Q3",
    type: "Community",
    status: "ended",
    ends: "Ended May 1",
    totalVotes: 22222,
    candidates: [
      { name: "Red Cross", votes: 11111, pct: 50.0, color: "#ef4444" },
      { name: "UNICEF", votes: 6666, pct: 30.0, color: "#06b6d4" },
      {
        name: "Doctors Without Borders",
        votes: 4444,
        pct: 20.0,
        color: "#22c55e",
      },
    ],
  },
];

const STATUS_CONFIG: Record<
  string,
  { color: string; bg: string; label: string }
> = {
  live: {
    color: "text-green-400",
    bg: "bg-green-500/10 border-green-500/20",
    label: "🔴 Live",
  },
  upcoming: {
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
    label: "⏳ Upcoming",
  },
  ended: {
    color: "text-muted-foreground",
    bg: "bg-muted border-border",
    label: "✓ Ended",
  },
};

export default function ShadowElections() {
  const [tab, setTab] = useState<"active" | "history" | "create">("active");
  const [voted, setVoted] = useState<Record<number, string>>({});

  const vote = (electionId: number, candidate: string) => {
    if (voted[electionId]) {
      toast.error("You already voted in this election");
      return;
    }
    setVoted(prev => ({ ...prev, [electionId]: candidate }));
    toast.success(`✅ Vote cast for "${candidate}" — recorded on-chain!`);
  };

  const active = ELECTIONS.filter(e => e.status === "live");
  const history = ELECTIONS.filter(e => e.status === "ended");

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Vote className="h-6 w-6 text-purple-400" />
            Elections
          </h1>
          <p className="text-sm text-muted-foreground">
            Decentralized on-chain voting for platform and DAO governance
          </p>
        </div>
        <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20 font-bold">
          On-Chain
        </Badge>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[
          {
            label: "Active Elections",
            value: active.length.toString(),
            icon: Vote,
            color: "text-green-400",
          },
          {
            label: "Total Votes Cast",
            value: "75,554",
            icon: Users,
            color: "text-blue-400",
          },
          {
            label: "Your Voting Power",
            value: "4,444 SKY",
            icon: Shield,
            color: "text-purple-400",
          },
        ].map(s => (
          <Card key={s.label} className="border-border/50 text-center">
            <CardContent className="py-2.5 px-2">
              <s.icon className={`h-5 w-5 mx-auto mb-1 ${s.color}`} />
              <p className={`font-black text-sm ${s.color}`}>{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-2">
        {(["active", "history", "create"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-purple-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "active" && (
        <div className="space-y-4">
          {active.map((election, i) => {
            const hasVoted = !!voted[election.id];
            const winner = [...election.candidates].sort(
              (a, b) => b.votes - a.votes
            )[0];
            return (
              <motion.div
                key={election.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="border-purple-500/20 bg-purple-900/5">
                  <CardContent className="py-4 px-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-black text-sm">{election.title}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Badge className="text-xs bg-muted text-muted-foreground">
                            {election.type}
                          </Badge>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {election.ends}
                          </span>
                        </div>
                      </div>
                      <Badge
                        className={`text-xs ${STATUS_CONFIG[election.status].bg} ${STATUS_CONFIG[election.status].color}`}
                      >
                        {STATUS_CONFIG[election.status].label}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {election.totalVotes.toLocaleString()} total votes
                    </p>
                    <div className="space-y-2">
                      {election.candidates.map(candidate => (
                        <div key={candidate.name}>
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              {voted[election.id] === candidate.name && (
                                <CheckCircle className="h-3.5 w-3.5 text-green-400 shrink-0" />
                              )}
                              <p className="text-xs font-bold">
                                {candidate.name}
                              </p>
                            </div>
                            <p
                              className="text-xs font-bold"
                              style={{ color: candidate.color }}
                            >
                              {candidate.pct}%
                            </p>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <motion.div
                              className="h-full rounded-full"
                              style={{ backgroundColor: candidate.color }}
                              initial={{ width: 0 }}
                              animate={{ width: `${candidate.pct}%` }}
                              transition={{ duration: 0.8, delay: 0.2 }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    {!hasVoted ? (
                      <div className="grid grid-cols-2 gap-1.5">
                        {election.candidates.map(candidate => (
                          <Button
                            key={candidate.name}
                            size="sm"
                            variant="outline"
                            className="h-8 text-xs font-bold truncate"
                            style={{
                              borderColor: candidate.color + "40",
                              color: candidate.color,
                            }}
                            onClick={() => vote(election.id, candidate.name)}
                          >
                            Vote: {candidate.name.split(" ")[0]}
                          </Button>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 p-2 rounded-xl bg-green-500/10 border border-green-500/20">
                        <CheckCircle className="h-4 w-4 text-green-400 shrink-0" />
                        <p className="text-xs text-green-400 font-bold">
                          Vote recorded on-chain for: {voted[election.id]}
                        </p>
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
          {history.map(election => {
            const winner = [...election.candidates].sort(
              (a, b) => b.votes - a.votes
            )[0];
            return (
              <Card key={election.id} className="border-border/50">
                <CardContent className="py-3 px-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-sm">{election.title}</p>
                    <Badge className="text-xs bg-muted text-muted-foreground">
                      {election.ends}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                    <Trophy className="h-4 w-4 text-yellow-400 shrink-0" />
                    <p className="text-xs font-bold text-yellow-400">
                      Winner: {winner.name} ({winner.pct}%)
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {election.totalVotes.toLocaleString()} total votes cast
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {tab === "create" && (
        <Card className="border-purple-500/20 bg-purple-900/5">
          <CardContent className="py-4 px-4 space-y-3">
            <p className="font-bold text-sm">Create New Election</p>
            <p className="text-xs text-muted-foreground">
              Requires 10,000 SKY4444 to create a platform-wide election
            </p>
            <input
              placeholder="Election Title"
              className="w-full h-9 rounded-xl border border-border bg-background px-3 text-xs focus:outline-none"
            />
            <select className="w-full h-9 rounded-xl border border-border bg-background px-3 text-xs focus:outline-none">
              <option>Platform Election</option>
              <option>DAO Vote</option>
              <option>Community Poll</option>
              <option>World Governance</option>
            </select>
            <input
              placeholder="Duration (days)"
              type="number"
              className="w-full h-9 rounded-xl border border-border bg-background px-3 text-xs focus:outline-none"
            />
            <input
              placeholder="Candidate 1"
              className="w-full h-9 rounded-xl border border-border bg-background px-3 text-xs focus:outline-none"
            />
            <input
              placeholder="Candidate 2"
              className="w-full h-9 rounded-xl border border-border bg-background px-3 text-xs focus:outline-none"
            />
            <input
              placeholder="Candidate 3 (optional)"
              className="w-full h-9 rounded-xl border border-border bg-background px-3 text-xs focus:outline-none"
            />
            <Button
              className="w-full h-10 text-xs bg-purple-600 text-white border-0 font-bold"
              onClick={() =>
                toast.success(
                  "Election deployed on-chain! Cost: 10,000 SKY4444"
                )
              }
            >
              <Globe className="h-4 w-4 mr-2" />
              Deploy Election On-Chain
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
