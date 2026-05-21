import { useState } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Search,
  Filter,
  Star,
  Building,
  Users,
  Zap,
  CheckCircle,
  BookOpen,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const JOBS = [
  {
    id: 1,
    title: "Senior Full-Stack Developer",
    company: "ShadowChat Inc.",
    location: "Remote",
    salary: "$120K–$180K + SKY4444",
    type: "Full-time",
    posted: "1 day ago",
    skills: ["React", "TypeScript", "Node.js", "Web3"],
    logo: "🖤",
    featured: true,
    applied: false,
  },
  {
    id: 2,
    title: "Blockchain Engineer",
    company: "Skyler Blue IT Resolutions",
    location: "Fort Smith, AR / Remote",
    salary: "$100K–$150K + SKY4444",
    type: "Full-time",
    posted: "2 days ago",
    skills: ["Solidity", "Ethereum", "Web3.js", "DeFi"],
    logo: "💙",
    featured: true,
    applied: false,
  },
  {
    id: 3,
    title: "Managed IT Support Specialist",
    company: "Skyler Blue IT Resolutions",
    location: "Fort Smith, AR",
    salary: "$45K–$65K",
    type: "Full-time",
    posted: "3 days ago",
    skills: ["Windows Server", "Azure", "Networking", "Help Desk"],
    logo: "💙",
    featured: false,
    applied: false,
  },
  {
    id: 4,
    title: "Crypto Marketing Manager",
    company: "TRUMP Coin Foundation",
    location: "Remote",
    salary: "$80K–$120K + TRUMP",
    type: "Full-time",
    posted: "4 days ago",
    skills: ["Marketing", "Crypto", "Social Media", "Community"],
    logo: "🇺🇸",
    featured: false,
    applied: false,
  },
  {
    id: 5,
    title: "AI/ML Engineer",
    company: "ShadowSwarm Labs",
    location: "Remote",
    salary: "$140K–$200K + SKY4444",
    type: "Full-time",
    posted: "5 days ago",
    skills: ["Python", "TensorFlow", "LLMs", "MLOps"],
    logo: "🤖",
    featured: false,
    applied: false,
  },
  {
    id: 6,
    title: "NFT Artist & Designer",
    company: "ShadowNFT Studio",
    location: "Remote",
    salary: "$60K–$90K + Royalties",
    type: "Contract",
    posted: "1 week ago",
    skills: ["Illustrator", "Blender", "NFT", "Web3"],
    logo: "🎨",
    featured: false,
    applied: false,
  },
];

export default function ShadowJobs() {
  const [tab, setTab] = useState<"browse" | "applied" | "post" | "profile">(
    "browse"
  );
  const [search, setSearch] = useState("");
  const [applied, setApplied] = useState<number[]>([]);
  const [filterType, setFilterType] = useState("All");

  const filtered = JOBS.filter(j => {
    const matchSearch =
      search === "" ||
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.company.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === "All" || j.type === filterType;
    return matchSearch && matchType;
  });

  const applyJob = (job: (typeof JOBS)[0]) => {
    if (!applied.includes(job.id)) {
      setApplied(a => [...a, job.id]);
      toast.success(`✅ Applied to ${job.title} at ${job.company}!`);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-teal-400" />
            ShadowJobs
          </h1>
          <p className="text-sm text-muted-foreground">
            Find IT, crypto, and remote jobs — paid in SKY4444
          </p>
        </div>
        <Badge className="bg-teal-500/10 text-teal-400 border-teal-500/20 font-bold">
          {JOBS.length} Open Roles
        </Badge>
      </div>

      <div className="flex gap-2">
        {(["browse", "applied", "post", "profile"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-teal-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t === "applied" ? `Applied (${applied.length})` : t}
          </button>
        ))}
      </div>

      {tab === "browse" && (
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search jobs, companies, skills..."
              className="pl-9 h-9 text-xs"
            />
          </div>
          <div className="flex gap-2">
            {["All", "Full-time", "Contract", "Part-time"].map(type => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${filterType === type ? "bg-teal-600 text-white" : "bg-muted text-muted-foreground"}`}
              >
                {type}
              </button>
            ))}
          </div>
          {filtered.map((job, i) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Card
                className={`border ${job.featured ? "border-teal-500/20 bg-teal-900/5" : "border-border/50"}`}
              >
                <CardContent className="py-3 px-4">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center text-xl shrink-0">
                      {job.logo}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="font-black text-sm">{job.title}</p>
                        {job.featured && (
                          <Badge className="text-xs bg-teal-500/10 text-teal-400 border-teal-500/20">
                            ⭐ Featured
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {job.company}
                      </p>
                      <div className="flex gap-3 text-xs text-muted-foreground mt-0.5">
                        <span>
                          <MapPin className="h-3 w-3 inline mr-0.5" />
                          {job.location}
                        </span>
                        <span>
                          <Clock className="h-3 w-3 inline mr-0.5" />
                          {job.posted}
                        </span>
                      </div>
                      <p className="text-xs text-teal-400 font-bold mt-0.5">
                        {job.salary}
                      </p>
                      <div className="flex gap-1 flex-wrap mt-1.5">
                        {job.skills.map(s => (
                          <Badge
                            key={s}
                            className="text-xs bg-muted text-muted-foreground"
                          >
                            {s}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="shrink-0">
                      <Badge className="text-xs bg-muted text-muted-foreground mb-2 block text-center">
                        {job.type}
                      </Badge>
                      {applied.includes(job.id) ? (
                        <Badge className="text-xs bg-green-500/10 text-green-400 border-green-500/20 block text-center">
                          ✓ Applied
                        </Badge>
                      ) : (
                        <Button
                          size="sm"
                          className="h-8 text-xs bg-teal-600 text-white border-0"
                          onClick={() => applyJob(job)}
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

      {tab === "applied" && (
        <div className="space-y-3">
          {applied.length === 0 ? (
            <Card className="border-border/50 text-center py-8">
              <p className="text-muted-foreground text-sm">
                No applications yet
              </p>
              <Button
                size="sm"
                className="mt-2 h-8 text-xs bg-teal-600 text-white border-0"
                onClick={() => setTab("browse")}
              >
                Browse Jobs
              </Button>
            </Card>
          ) : (
            JOBS.filter(j => applied.includes(j.id)).map((job, i) => (
              <Card key={job.id} className="border-teal-500/20 bg-teal-900/5">
                <CardContent className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{job.logo}</span>
                    <div className="flex-1">
                      <p className="font-bold text-sm">{job.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {job.company} · {job.location}
                      </p>
                      <p className="text-xs text-teal-400 font-bold">
                        {job.salary}
                      </p>
                    </div>
                    <Badge className="text-xs bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
                      Under Review
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}

      {tab === "post" && (
        <Card className="border-teal-500/20 bg-teal-900/5">
          <CardContent className="py-4 px-4 space-y-3">
            <p className="font-bold text-sm">Post a Job</p>
            {[
              { label: "Job Title", placeholder: "e.g. Senior Developer" },
              {
                label: "Company Name",
                placeholder: "e.g. Skyler Blue IT Resolutions",
              },
              {
                label: "Location",
                placeholder: "e.g. Remote / Fort Smith, AR",
              },
              {
                label: "Salary Range",
                placeholder: "e.g. $80K–$120K + SKY4444",
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
              className="w-full h-10 text-xs bg-teal-600 text-white border-0 font-bold"
              onClick={() =>
                toast.success("✅ Job posted! 44 SKY4444 posting fee charged.")
              }
            >
              <Zap className="h-4 w-4 mr-2" />
              Post Job — 44 SKY4444
            </Button>
          </CardContent>
        </Card>
      )}

      {tab === "profile" && (
        <div className="space-y-3">
          <Card className="border-teal-500/20 bg-teal-900/5">
            <CardContent className="py-4 px-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center text-white font-black text-lg">
                  SB
                </div>
                <div>
                  <p className="font-black text-sm">Skyler Blue Spiller</p>
                  <p className="text-xs text-muted-foreground">
                    Full-Stack Developer · Fort Smith, AR
                  </p>
                  <Badge className="text-xs bg-teal-500/10 text-teal-400 border-teal-500/20 mt-1">
                    ⭐ Top Candidate
                  </Badge>
                </div>
              </div>
              <div className="flex gap-1 flex-wrap mb-3">
                {[
                  "React",
                  "TypeScript",
                  "Node.js",
                  "Web3",
                  "Solidity",
                  "Python",
                  "AWS",
                ].map(s => (
                  <Badge
                    key={s}
                    className="text-xs bg-muted text-muted-foreground"
                  >
                    {s}
                  </Badge>
                ))}
              </div>
              <Button
                className="w-full h-9 text-xs bg-teal-600 text-white border-0"
                onClick={() => toast.info("Opening profile editor...")}
              >
                Edit Profile
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
