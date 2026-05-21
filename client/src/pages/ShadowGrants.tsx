import { useState } from "react";
import { motion } from "framer-motion";
import {
  Award,
  Coins,
  Users,
  CheckCircle,
  Clock,
  TrendingUp,
  Zap,
  FileText,
  Star,
  Globe,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const GRANTS = [
  {
    id: 1,
    title: "DeFi Protocol Integration Grant",
    amount: "44,444 SKY4444",
    category: "Development",
    deadline: "Jun 1, 2026",
    applicants: 12,
    status: "open",
    desc: "Build a new DeFi protocol that integrates with the ShadowChat ecosystem and SKY4444 token.",
    emoji: "⚡",
  },
  {
    id: 2,
    title: "NFT Artist Residency",
    amount: "10,000 SKY4444",
    category: "Art",
    deadline: "May 30, 2026",
    applicants: 44,
    status: "open",
    desc: "Create an exclusive NFT collection representing the ShadowChat brand and community.",
    emoji: "🎨",
  },
  {
    id: 3,
    title: "IT Education Content Grant",
    amount: "5,000 SKY4444",
    category: "Education",
    deadline: "Jun 15, 2026",
    applicants: 8,
    status: "open",
    desc: "Produce educational content about managed IT services and cybersecurity for Skyler Blue IT Resolutions.",
    emoji: "📚",
  },
  {
    id: 4,
    title: "Community Growth Initiative",
    amount: "20,000 SKY4444",
    category: "Marketing",
    deadline: "May 25, 2026",
    applicants: 22,
    status: "open",
    desc: "Grow the ShadowChat community to 100K members through creative marketing campaigns.",
    emoji: "📣",
  },
  {
    id: 5,
    title: "Charity Gaming Module",
    amount: "15,000 SKY4444",
    category: "Development",
    deadline: "Jul 1, 2026",
    applicants: 6,
    status: "open",
    desc: "Build new charity gaming features that donate a percentage of winnings to verified nonprofits.",
    emoji: "🎮",
  },
];

const PAST_WINNERS = [
  {
    name: "ShadowDev_01",
    grant: "Web3 Bridge Protocol",
    amount: "44,444 SKY4444",
    emoji: "🏆",
  },
  {
    name: "Web3_Sarah",
    grant: "ShadowNFT Genesis Collection",
    amount: "10,000 SKY4444",
    emoji: "🥈",
  },
  {
    name: "CryptoTeacher",
    grant: "Blockchain 101 Course",
    amount: "5,000 SKY4444",
    emoji: "🥉",
  },
];

export default function ShadowGrants() {
  const [tab, setTab] = useState<"open" | "apply" | "winners" | "mygrants">(
    "open"
  );
  const [applied, setApplied] = useState<number[]>([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Award className="h-6 w-6 text-yellow-400" />
            ShadowGrants
          </h1>
          <p className="text-sm text-muted-foreground">
            DAO-funded grants for builders, artists, and educators
          </p>
        </div>
        <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20 font-bold">
          💰 94,444 SKY Pool
        </Badge>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Total Pool", value: "94,444 SKY", emoji: "💰" },
          { label: "Open Grants", value: GRANTS.length, emoji: "📋" },
          { label: "Funded", value: "12 projects", emoji: "✅" },
        ].map(s => (
          <Card key={s.label} className="border-border/50 text-center">
            <CardContent className="pt-2.5 pb-2.5">
              <p className="text-lg">{s.emoji}</p>
              <p className="font-black text-xs text-yellow-400">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-2">
        {(["open", "apply", "winners", "mygrants"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-yellow-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t === "mygrants" ? "My Grants" : t}
          </button>
        ))}
      </div>

      {tab === "open" && (
        <div className="space-y-3">
          {GRANTS.map((grant, i) => (
            <motion.div
              key={grant.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <Card className="border-border/50 hover:border-yellow-500/20 transition-all">
                <CardContent className="py-3 px-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl shrink-0">{grant.emoji}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="font-black text-sm">{grant.title}</p>
                        <Badge className="text-xs bg-muted text-muted-foreground">
                          {grant.category}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">
                        {grant.desc}
                      </p>
                      <div className="flex gap-3 text-xs text-muted-foreground">
                        <span>
                          <Clock className="h-3 w-3 inline mr-0.5" />
                          Due {grant.deadline}
                        </span>
                        <span>
                          <Users className="h-3 w-3 inline mr-0.5" />
                          {grant.applicants} applicants
                        </span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-black text-sm text-yellow-400">
                        {grant.amount}
                      </p>
                      {applied.includes(grant.id) ? (
                        <Badge className="text-xs bg-green-500/10 text-green-400 border-green-500/20 mt-1">
                          ✓ Applied
                        </Badge>
                      ) : (
                        <Button
                          size="sm"
                          className="h-8 text-xs mt-1 bg-yellow-600 text-white border-0"
                          onClick={() => {
                            setApplied(a => [...a, grant.id]);
                            toast.success(`✅ Applied for ${grant.title}!`);
                          }}
                        >
                          Apply
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "apply" && (
        <Card className="border-yellow-500/20 bg-yellow-900/5">
          <CardContent className="py-4 px-4 space-y-3">
            <p className="font-bold text-sm">Submit a Grant Proposal</p>
            <p className="text-xs text-muted-foreground">
              Proposals are reviewed by the ShadowChat DAO. Voting takes 7 days.
              Winners receive SKY4444 in milestone-based tranches.
            </p>
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                Project Title
              </p>
              <Input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. ShadowChat Mobile App"
                className="h-9 text-xs"
              />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                Project Description
              </p>
              <textarea
                value={desc}
                onChange={e => setDesc(e.target.value)}
                placeholder="Describe your project, goals, and how it benefits the ShadowChat ecosystem..."
                className="w-full h-24 rounded-xl border border-border bg-background px-3 py-2 text-xs resize-none focus:outline-none focus:ring-1 focus:ring-yellow-500"
              />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                Requested Amount (SKY4444)
              </p>
              <Input
                type="number"
                placeholder="e.g. 10000"
                className="h-9 text-xs"
              />
            </div>
            <Button
              className="w-full h-10 text-xs bg-yellow-600 text-white border-0 font-bold"
              onClick={() => {
                if (!title || !desc) {
                  toast.error("Please fill in all fields");
                  return;
                }
                toast.success("✅ Proposal submitted to DAO for voting!");
                setTitle("");
                setDesc("");
              }}
            >
              <FileText className="h-4 w-4 mr-2" />
              Submit Proposal to DAO
            </Button>
          </CardContent>
        </Card>
      )}

      {tab === "winners" && (
        <div className="space-y-3">
          <p className="text-xs font-bold text-muted-foreground">
            PAST GRANT WINNERS
          </p>
          {PAST_WINNERS.map((winner, i) => (
            <Card
              key={i}
              className={`border ${i === 0 ? "border-yellow-500/20 bg-yellow-900/5" : "border-border/50"}`}
            >
              <CardContent className="py-3 px-4 flex items-center gap-3">
                <span className="text-2xl">{winner.emoji}</span>
                <div className="flex-1">
                  <p className="font-bold text-sm">{winner.grant}</p>
                  <p className="text-xs text-muted-foreground">
                    by {winner.name}
                  </p>
                </div>
                <p className="font-black text-sm text-yellow-400">
                  {winner.amount}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "mygrants" && (
        <div className="space-y-3">
          {applied.length === 0 ? (
            <Card className="border-border/50 text-center py-8">
              <p className="text-muted-foreground text-sm">
                No grant applications yet
              </p>
              <Button
                size="sm"
                className="mt-2 h-8 text-xs bg-yellow-600 text-white border-0"
                onClick={() => setTab("open")}
              >
                Browse Grants
              </Button>
            </Card>
          ) : (
            GRANTS.filter(g => applied.includes(g.id)).map(grant => (
              <Card
                key={grant.id}
                className="border-yellow-500/20 bg-yellow-900/5"
              >
                <CardContent className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{grant.emoji}</span>
                    <div className="flex-1">
                      <p className="font-bold text-sm">{grant.title}</p>
                      <p className="text-xs text-muted-foreground">
                        Applied · Under DAO Review
                      </p>
                      <Progress value={33} className="h-1.5 mt-1" />
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Voting: 3 of 7 days
                      </p>
                    </div>
                    <p className="font-black text-sm text-yellow-400 shrink-0">
                      {grant.amount}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
}
