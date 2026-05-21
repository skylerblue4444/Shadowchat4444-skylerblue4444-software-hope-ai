import { useState } from "react";
import {
  Heart,
  Vote,
  DollarSign,
  Users,
  CheckCircle,
  Clock,
  Zap,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const PROPOSALS = [
  {
    id: "CDP-001",
    title: "Fund 500 Meals for Arkansas Food Bank",
    ask: "$2,500",
    votes: 847,
    for: 92,
    status: "active",
    category: "Food",
  },
  {
    id: "CDP-002",
    title: "Sponsor 10 Kids' STEM Education",
    ask: "$5,000",
    votes: 623,
    for: 88,
    status: "active",
    category: "Education",
  },
  {
    id: "CDP-003",
    title: "Clean Water Wells in Rural Communities",
    ask: "$12,000",
    votes: 1204,
    for: 96,
    status: "passed",
    category: "Water",
  },
  {
    id: "CDP-004",
    title: "Animal Shelter Emergency Fund",
    ask: "$1,800",
    votes: 412,
    for: 79,
    status: "active",
    category: "Animals",
  },
];

export default function ShadowCharityDAO() {
  const [voted, setVoted] = useState<Set<string>>(new Set());
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black flex items-center gap-2">
          <Heart className="h-6 w-6 text-rose-400" />
          Charity DAO
        </h1>
        <p className="text-sm text-muted-foreground">
          Community-governed charity fund — vote with SKY4444 to direct
          donations
        </p>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: "Total Donated", value: "$84K", color: "text-rose-400" },
          { label: "Active Causes", value: "12", color: "text-green-400" },
          { label: "DAO Members", value: "4,847", color: "text-blue-400" },
          { label: "SKY Staked", value: "2.4M", color: "text-purple-400" },
        ].map(s => (
          <Card key={s.label} className="border-border/50 text-center">
            <CardContent className="py-3 px-2">
              <p className={"font-black text-lg " + s.color}>{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="space-y-3">
        {PROPOSALS.map((p, i) => (
          <Card
            key={i}
            className={
              "border-border/50 " +
              (p.status === "passed" ? "border-green-500/20" : "")
            }
          >
            <CardContent className="py-3 px-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-xs text-muted-foreground">{p.id}</p>
                    <Badge
                      className={
                        "text-xs border-0 " +
                        (p.status === "passed"
                          ? "bg-green-500/10 text-green-400"
                          : "bg-blue-500/10 text-blue-400")
                      }
                    >
                      {p.status}
                    </Badge>
                    <Badge className="text-xs border-0 bg-rose-500/10 text-rose-400">
                      {p.category}
                    </Badge>
                  </div>
                  <p className="font-bold text-sm">{p.title}</p>
                </div>
                <p className="font-black text-sm text-green-400 shrink-0 ml-2">
                  {p.ask}
                </p>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: p.for + "%" }}
                  />
                </div>
                <span className="text-xs font-bold text-green-400 w-10">
                  {p.for}% For
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {p.votes} votes
                </span>
                {p.status === "active" && !voted.has(p.id) ? (
                  <Button
                    size="sm"
                    className="ml-auto h-7 bg-rose-600 text-white border-0 font-bold text-xs"
                    onClick={() => {
                      setVoted(v => new Set(Array.from(v).concat([p.id])));
                      toast.success("Vote cast for: " + p.title);
                    }}
                  >
                    <Vote className="h-3 w-3 mr-1" />
                    Vote For
                  </Button>
                ) : voted.has(p.id) ? (
                  <span className="ml-auto flex items-center gap-1 text-xs text-green-400 font-bold">
                    <CheckCircle className="h-3 w-3" />
                    Voted
                  </span>
                ) : (
                  <span className="ml-auto flex items-center gap-1 text-xs text-green-400 font-bold">
                    <CheckCircle className="h-3 w-3" />
                    Funded
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Button
        className="w-full h-10 bg-rose-600 text-white border-0 font-bold"
        onClick={() =>
          toast.success("Charity proposal submitted for DAO vote!")
        }
      >
        <Heart className="h-4 w-4 mr-2" />
        Submit New Charity Proposal
      </Button>
    </div>
  );
}
