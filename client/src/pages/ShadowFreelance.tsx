import { useState } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  Star,
  Search,
  Plus,
  Clock,
  CheckCircle,
  Coins,
  Shield,
  ChevronRight,
  Users,
  Award,
  Filter,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const JOBS = [
  {
    id: 1,
    title: "Smart Contract Developer — SKY4444 DeFi Protocol",
    budget: "5,000 SKY4444",
    type: "Fixed",
    duration: "2 weeks",
    skills: ["Solidity", "Web3", "DeFi"],
    bids: 12,
    level: "Expert",
    posted: "2 hr ago",
    client: "ShadowDAO",
    rating: 4.9,
  },
  {
    id: 2,
    title: "IT Network Setup — Fort Smith AR Office",
    budget: "2,500 USDT",
    type: "Fixed",
    duration: "3 days",
    skills: ["Networking", "Cisco", "IT Support"],
    bids: 5,
    level: "Intermediate",
    posted: "5 hr ago",
    client: "SkylerBlue IT",
    rating: 5.0,
  },
  {
    id: 3,
    title: "React/TypeScript Frontend Developer",
    budget: "80-120 SKY4444/hr",
    type: "Hourly",
    duration: "3 months",
    skills: ["React", "TypeScript", "TailwindCSS"],
    bids: 28,
    level: "Expert",
    posted: "1 day ago",
    client: "ShadowChat",
    rating: 4.8,
  },
  {
    id: 4,
    title: "Cybersecurity Audit — Managed IT Client",
    budget: "1,800 USDT",
    type: "Fixed",
    duration: "1 week",
    skills: ["Security", "Penetration Testing", "SIEM"],
    bids: 7,
    level: "Expert",
    posted: "2 days ago",
    client: "SkylerBlue IT",
    rating: 5.0,
  },
  {
    id: 5,
    title: "NFT Artist — ShadowChat Collection 2.0",
    budget: "200 SKY4444/piece",
    type: "Per Item",
    duration: "Ongoing",
    skills: ["Digital Art", "NFT", "Illustrator"],
    bids: 44,
    level: "Intermediate",
    posted: "3 days ago",
    client: "ShadowNFT",
    rating: 4.7,
  },
  {
    id: 6,
    title: "AI/ML Engineer — Trading Bot Enhancement",
    budget: "150-200 SKY4444/hr",
    type: "Hourly",
    duration: "2 months",
    skills: ["Python", "ML", "Crypto Trading"],
    bids: 19,
    level: "Expert",
    posted: "4 days ago",
    client: "ShadowTrade",
    rating: 4.9,
  },
];

const MY_CONTRACTS = [
  {
    title: "ShadowChat UI Components",
    client: "ShadowDev",
    status: "active",
    earned: "1,200 SKY4444",
    milestone: 60,
    due: "May 20, 2026",
  },
  {
    title: "IT Network Documentation",
    client: "SkylerBlue IT",
    status: "completed",
    earned: "800 USDT",
    milestone: 100,
    due: "May 10, 2026",
  },
];

const CATEGORIES = [
  "All",
  "IT Services",
  "Dev",
  "Design",
  "Security",
  "AI/ML",
  "NFT",
  "Marketing",
];

export default function ShadowFreelance() {
  const [tab, setTab] = useState<"browse" | "mywork" | "post" | "profile">(
    "browse"
  );
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = JOBS.filter(
    j =>
      (search === "" || j.title.toLowerCase().includes(search.toLowerCase())) &&
      (category === "All" ||
        j.skills.some(s => s.toLowerCase().includes(category.toLowerCase())))
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-indigo-400" />
            ShadowFreelance
          </h1>
          <p className="text-sm text-muted-foreground">
            Decentralized freelance marketplace with SKY4444 escrow
          </p>
        </div>
        <Badge className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20 font-bold">
          🔒 Escrow Protected
        </Badge>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: "Active Jobs", value: JOBS.length, emoji: "💼" },
          { label: "Freelancers", value: "4,444", emoji: "👥" },
          { label: "Paid Out", value: "$2.4M", emoji: "💰" },
          { label: "Avg Rating", value: "4.9⭐", emoji: "🏆" },
        ].map(s => (
          <Card key={s.label} className="border-border/50 text-center">
            <CardContent className="pt-2.5 pb-2.5">
              <p className="text-lg mb-0.5">{s.emoji}</p>
              <p className="font-black text-xs text-indigo-400">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-2">
        {(["browse", "mywork", "post", "profile"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-indigo-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t === "mywork" ? "My Work" : t}
          </button>
        ))}
      </div>

      {tab === "browse" && (
        <div className="space-y-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search jobs..."
                className="pl-9 h-9 text-xs"
              />
            </div>
          </div>
          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium transition-colors ${category === cat ? "bg-indigo-600 text-white" : "bg-muted text-muted-foreground"}`}
              >
                {cat}
              </button>
            ))}
          </div>
          {filtered.map((job, i) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="border-border/50 hover:border-indigo-500/20 transition-all">
                <CardContent className="py-3 px-4">
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-bold text-sm flex-1 pr-2">{job.title}</p>
                    <Badge
                      className={`text-xs shrink-0 ${job.level === "Expert" ? "bg-purple-500/10 text-purple-400 border-purple-500/20" : "bg-blue-500/10 text-blue-400 border-blue-500/20"}`}
                    >
                      {job.level}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                    <span className="text-indigo-400 font-bold">
                      {job.budget}
                    </span>
                    <span>{job.type}</span>
                    <span>
                      <Clock className="h-3 w-3 inline mr-0.5" />
                      {job.duration}
                    </span>
                    <span>
                      <Users className="h-3 w-3 inline mr-0.5" />
                      {job.bids} bids
                    </span>
                  </div>
                  <div className="flex gap-1 mb-2">
                    {job.skills.map(skill => (
                      <Badge
                        key={skill}
                        className="text-xs bg-muted text-muted-foreground"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <span className="font-medium">{job.client}</span>
                      <Star className="h-3 w-3 text-yellow-400" />
                      <span>{job.rating}</span>
                      <span>· {job.posted}</span>
                    </div>
                    <Button
                      size="sm"
                      className="h-7 text-xs bg-indigo-600 text-white border-0"
                      onClick={() =>
                        toast.success(
                          `✅ Proposal submitted for "${job.title}"!`
                        )
                      }
                    >
                      Apply
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "mywork" && (
        <div className="space-y-3">
          <p className="text-xs font-bold text-muted-foreground">
            ACTIVE CONTRACTS
          </p>
          {MY_CONTRACTS.map((contract, i) => (
            <Card
              key={i}
              className={`border ${contract.status === "active" ? "border-indigo-500/20 bg-indigo-900/5" : "border-green-500/20 bg-green-900/5"}`}
            >
              <CardContent className="py-3 px-4">
                <div className="flex items-start gap-3">
                  <div
                    className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 ${contract.status === "active" ? "bg-indigo-500/10" : "bg-green-500/10"}`}
                  >
                    {contract.status === "active" ? (
                      <Briefcase className="h-5 w-5 text-indigo-400" />
                    ) : (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{contract.title}</p>
                    <p className="text-xs text-muted-foreground">
                      Client: {contract.client} · Due: {contract.due}
                    </p>
                    <p className="text-xs text-indigo-400 font-bold mt-0.5">
                      Earned: {contract.earned}
                    </p>
                    <div className="mt-1.5">
                      <Progress value={contract.milestone} className="h-1.5" />
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {contract.milestone}% complete
                      </p>
                    </div>
                  </div>
                  <Badge
                    className={`text-xs ${contract.status === "active" ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" : "bg-green-500/10 text-green-400 border-green-500/20"}`}
                  >
                    {contract.status === "active" ? "Active" : "✓ Done"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
          <Card className="border-border/50">
            <CardContent className="py-3 px-4 text-center">
              <p className="font-black text-lg text-indigo-400">
                2,000 SKY4444
              </p>
              <p className="text-xs text-muted-foreground">
                Total Lifetime Earnings
              </p>
              <Button
                size="sm"
                className="mt-2 h-8 text-xs bg-indigo-600 text-white border-0"
                onClick={() => toast.info("Withdrawing earnings...")}
              >
                <Coins className="h-3.5 w-3.5 mr-1" />
                Withdraw Earnings
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "post" && (
        <Card className="border-indigo-500/20 bg-indigo-900/5">
          <CardContent className="py-4 px-4 space-y-3">
            <p className="font-bold text-sm">Post a Job</p>
            {[
              {
                label: "Job Title",
                placeholder: "e.g., Smart Contract Developer",
              },
              {
                label: "Budget (SKY4444 or USDT)",
                placeholder: "e.g., 1000 SKY4444",
              },
              { label: "Duration", placeholder: "e.g., 2 weeks" },
              {
                label: "Required Skills",
                placeholder: "e.g., Solidity, React, IT Support",
              },
            ].map(field => (
              <div key={field.label}>
                <p className="text-xs text-muted-foreground mb-1">
                  {field.label}
                </p>
                <Input
                  placeholder={field.placeholder}
                  className="h-9 text-xs"
                />
              </div>
            ))}
            <Button
              className="w-full h-10 text-xs bg-indigo-600 text-white border-0 font-bold"
              onClick={() =>
                toast.success("✅ Job posted! Escrow funded with SKY4444.")
              }
            >
              <Shield className="h-4 w-4 mr-2" />
              Post Job with Escrow
            </Button>
          </CardContent>
        </Card>
      )}

      {tab === "profile" && (
        <div className="space-y-3">
          <Card className="border-indigo-500/20 bg-indigo-900/5">
            <CardContent className="py-4 px-4 text-center">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border-2 border-indigo-500/30 flex items-center justify-center text-2xl font-black mx-auto mb-2">
                SB
              </div>
              <p className="font-black text-sm">SkylerBlue_Dev</p>
              <div className="flex items-center justify-center gap-1 text-xs mt-0.5">
                <Star className="h-3.5 w-3.5 text-yellow-400" />
                <span className="font-bold">5.0</span>
                <span className="text-muted-foreground">(44 reviews)</span>
              </div>
              <div className="flex gap-2 justify-center mt-2">
                <Badge className="text-xs bg-indigo-500/10 text-indigo-400 border-indigo-500/20">
                  Top Rated
                </Badge>
                <Badge className="text-xs bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
                  IT Expert
                </Badge>
              </div>
            </CardContent>
          </Card>
          {[
            { label: "Jobs Completed", value: "12", emoji: "✅" },
            { label: "Total Earned", value: "2,000 SKY4444", emoji: "💰" },
            { label: "On-Time Rate", value: "100%", emoji: "⏱️" },
            { label: "Repeat Clients", value: "8", emoji: "🔄" },
          ].map(s => (
            <Card key={s.label} className="border-border/50">
              <CardContent className="py-2.5 px-4 flex items-center gap-3">
                <span className="text-xl">{s.emoji}</span>
                <p className="text-sm flex-1">{s.label}</p>
                <p className="font-black text-sm text-indigo-400">{s.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
