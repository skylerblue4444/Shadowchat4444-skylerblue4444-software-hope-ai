import { useState, useCallback } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  Clock,
  DollarSign,
  Briefcase,
  Filter,
  Star,
  CheckCircle,
  ArrowRight,
  Users,
  Building2,
  Zap,
  Code,
  Shield,
  Server,
  Cloud,
  Database,
  Monitor,
  ChevronRight,
  BookOpen,
  Award,
  TrendingUp,
  Eye,
  Heart,
  Share2,
  Plus,
  Brain,
  Sparkles,
  Target,
  BarChart3,
  Zap as ZapIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const JOB_LISTINGS = [
  {
    id: 1,
    title: "Senior Full-Stack Developer",
    company: "TechVentures LLC",
    location: "Fayetteville, AR",
    type: "Full-Time",
    remote: "Hybrid",
    salary: "$95K–$130K/yr",
    posted: "2 days ago",
    category: "Development",
    skills: ["React", "Node.js", "TypeScript", "PostgreSQL"],
    description:
      "Join a fast-growing SaaS company building enterprise tools. You'll lead frontend architecture and collaborate with a small, high-impact team.",
    urgent: true,
    featured: true,
    views: 342,
    saved: 28,
  },
  {
    id: 2,
    title: "Cybersecurity Analyst",
    company: "MidSouth Medical Group",
    location: "Rogers, AR",
    type: "Full-Time",
    remote: "On-Site",
    salary: "$75K–$95K/yr",
    posted: "1 day ago",
    category: "Security",
    skills: ["SIEM", "Splunk", "HIPAA", "Incident Response"],
    description:
      "Protect patient data and ensure HIPAA compliance for a 12-location healthcare network. Excellent benefits and growth path to CISO.",
    urgent: false,
    featured: true,
    views: 218,
    saved: 19,
  },
  {
    id: 3,
    title: "Cloud Infrastructure Engineer",
    company: "Retail Chain Group",
    location: "Bentonville, AR",
    type: "Contract",
    remote: "Remote",
    salary: "$85–$110/hr",
    posted: "3 days ago",
    category: "Cloud",
    skills: ["AWS", "Terraform", "Kubernetes", "CI/CD"],
    description:
      "6-month contract to migrate on-prem infrastructure to AWS. Strong Terraform and Kubernetes experience required. Potential for extension.",
    urgent: true,
    featured: false,
    views: 189,
    saved: 14,
  },
  {
    id: 4,
    title: "IT Help Desk Technician",
    company: "Skyler Blue IT Resolutions",
    location: "Springdale, AR",
    type: "Full-Time",
    remote: "Hybrid",
    salary: "$38K–$52K/yr",
    posted: "Today",
    category: "Support",
    skills: ["Windows", "Active Directory", "Office 365", "Ticketing"],
    description:
      "Join our growing managed services team. You'll handle Tier 1–2 support tickets, on-site visits, and client onboarding. Great entry-level role.",
    urgent: false,
    featured: false,
    views: 156,
    saved: 22,
  },
  {
    id: 5,
    title: "Network Engineer",
    company: "Ozark Manufacturing Co.",
    location: "Fort Smith, AR",
    type: "Full-Time",
    remote: "On-Site",
    salary: "$70K–$90K/yr",
    posted: "5 days ago",
    category: "Networking",
    skills: ["Cisco", "Juniper", "BGP", "MPLS", "Firewall"],
    description:
      "Design and maintain network infrastructure for a 3-facility manufacturing operation. CCNP preferred. Excellent stability and benefits.",
    urgent: false,
    featured: false,
    views: 124,
    saved: 11,
  },
  {
    id: 6,
    title: "DevOps Engineer",
    company: "FinTech Startup (Stealth)",
    location: "Remote",
    type: "Full-Time",
    remote: "Remote",
    salary: "$100K–$140K/yr",
    posted: "1 week ago",
    category: "Development",
    skills: ["Docker", "Kubernetes", "GitHub Actions", "Python", "AWS"],
    description:
      "Build and maintain CI/CD pipelines, infrastructure-as-code, and monitoring for a Series A fintech startup. Equity included.",
    urgent: false,
    featured: true,
    views: 445,
    saved: 67,
  },
  {
    id: 7,
    title: "IT Project Manager",
    company: "Healthcare Network Inc.",
    location: "Little Rock, AR",
    type: "Full-Time",
    remote: "Hybrid",
    salary: "$80K–$105K/yr",
    posted: "4 days ago",
    category: "Management",
    skills: ["PMP", "Agile", "ITIL", "Stakeholder Management"],
    description:
      "Lead IT modernization projects across a 20-hospital network. PMP certification required. Manage vendors, timelines, and $2M+ budgets.",
    urgent: false,
    featured: false,
    views: 203,
    saved: 31,
  },
  {
    id: 8,
    title: "Data Engineer / BI Developer",
    company: "Retail Analytics Co.",
    location: "Bentonville, AR",
    type: "Full-Time",
    remote: "Hybrid",
    salary: "$85K–$115K/yr",
    posted: "2 days ago",
    category: "Data",
    skills: ["Python", "SQL", "Spark", "Tableau", "dbt"],
    description:
      "Build data pipelines and dashboards for a retail analytics platform serving Fortune 500 clients. Strong SQL and Python required.",
    urgent: false,
    featured: false,
    views: 178,
    saved: 24,
  },
];

const CATEGORIES = [
  "All",
  "Development",
  "Security",
  "Cloud",
  "Support",
  "Networking",
  "Management",
  "Data",
];
const JOB_TYPES = ["All Types", "Full-Time", "Contract", "Part-Time"];
const REMOTE_OPTIONS = ["All", "Remote", "Hybrid", "On-Site"];

const TALENT_PROFILES = [
  {
    name: "Alex R.",
    title: "Senior React Developer",
    skills: ["React", "TypeScript", "Node.js"],
    rate: "$85/hr",
    available: "Immediately",
    rating: 4.9,
    jobs: 23,
  },
  {
    name: "Maria S.",
    title: "Cybersecurity Specialist",
    skills: ["Penetration Testing", "SIEM", "CISSP"],
    rate: "$95/hr",
    available: "2 weeks",
    rating: 5.0,
    jobs: 18,
  },
  {
    name: "James T.",
    title: "AWS Cloud Architect",
    skills: ["AWS", "Terraform", "Kubernetes"],
    rate: "$110/hr",
    available: "Immediately",
    rating: 4.8,
    jobs: 31,
  },
  {
    name: "Lisa K.",
    title: "IT Project Manager",
    skills: ["PMP", "Agile", "ITIL"],
    rate: "$75/hr",
    available: "1 week",
    rating: 4.9,
    jobs: 27,
  },
];

function ApplyModal({
  job,
  onClose,
}: {
  job: (typeof JOB_LISTINGS)[0];
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    cover: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast.error("Name and email required.");
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
    toast.success("Application submitted successfully!");
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-background border border-border rounded-2xl p-6 max-w-lg w-full shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {submitted ? (
          <div className="text-center py-8">
            <CheckCircle className="h-14 w-14 text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Application Submitted!</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Your application for <strong>{job.title}</strong> at{" "}
              <strong>{job.company}</strong> has been received. We'll be in
              touch within 48 hours.
            </p>
            <Button onClick={onClose}>Close</Button>
          </div>
        ) : (
          <>
            <div className="mb-5">
              <h3 className="text-lg font-bold">Apply for {job.title}</h3>
              <p className="text-sm text-muted-foreground">
                {job.company} · {job.location}
              </p>
            </div>
            <form onSubmit={handleApply} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">
                    Full Name *
                  </label>
                  <Input
                    placeholder="John Smith"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">
                    Email *
                  </label>
                  <Input
                    type="email"
                    placeholder="john@email.com"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">
                    Phone
                  </label>
                  <Input
                    type="tel"
                    placeholder="(479) 555-0100"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">
                    LinkedIn / Portfolio
                  </label>
                  <Input
                    placeholder="linkedin.com/in/..."
                    value={form.linkedin}
                    onChange={e =>
                      setForm({ ...form, linkedin: e.target.value })
                    }
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">
                  Cover Letter / Message
                </label>
                <textarea
                  className="w-full h-24 rounded-md border border-input bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Why are you a great fit for this role?"
                  value={form.cover}
                  onChange={e => setForm({ ...form, cover: e.target.value })}
                />
              </div>
              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-0"
                >
                  {loading ? "Submitting..." : "Submit Application"}
                </Button>
              </div>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
}

export default function ITTalent() {
  const [, setLocation] = useLocation();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [jobType, setJobType] = useState("All Types");
  const [remote, setRemote] = useState("All");
  const [applyJob, setApplyJob] = useState<(typeof JOB_LISTINGS)[0] | null>(
    null
  );
  const [savedJobs, setSavedJobs] = useState<number[]>([]);

  const filtered = JOB_LISTINGS.filter(j => {
    const matchSearch =
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.company.toLowerCase().includes(search.toLowerCase()) ||
      j.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
    const matchCat = category === "All" || j.category === category;
    const matchType = jobType === "All Types" || j.type === jobType;
    const matchRemote = remote === "All" || j.remote === remote;
    return matchSearch && matchCat && matchType && matchRemote;
  });

  const toggleSave = (id: number) => {
    setSavedJobs(prev =>
      prev.includes(id) ? prev.filter(j => j !== id) : [...prev, id]
    );
    toast.success(
      savedJobs.includes(id) ? "Job removed from saved" : "Job saved!"
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {applyJob && (
        <ApplyModal job={applyJob} onClose={() => setApplyJob(null)} />
      )}

      {/* Header */}
      <div className="border-b border-border/40 bg-gradient-to-br from-cyan-950/30 to-background py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <button
              onClick={() => setLocation("/it")}
              className="hover:text-foreground"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-foreground">IT Talent Marketplace</span>
          </div>
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <Badge className="mb-3 bg-cyan-500/10 text-cyan-400 border-cyan-500/20">
                <Zap className="h-3 w-3 mr-1" /> {JOB_LISTINGS.length} Active
                Opportunities
              </Badge>
              <h1 className="text-4xl font-bold mb-2">IT Talent Marketplace</h1>
              <p className="text-muted-foreground max-w-xl">
                Connect top IT talent with leading businesses across Arkansas
                and beyond. Find your next role or hire your next star employee.
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <Button
                variant="outline"
                onClick={() => toast.info("Employer portal coming soon!")}
              >
                <Building2 className="mr-2 h-4 w-4" /> Post a Job
              </Button>
              <Button
                className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white border-0"
                onClick={() =>
                  toast.info("Talent profile creation coming soon!")
                }
              >
                <Plus className="mr-2 h-4 w-4" /> Create Profile
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-8 flex gap-3">
            <div className="relative flex-1 max-w-2xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search jobs, skills, companies..."
                className="pl-12 h-12 text-base"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-0 px-8"
            >
              Search
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Tabs defaultValue="jobs">
          <TabsList className="mb-8">
            <TabsTrigger value="jobs" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" /> Job Listings
            </TabsTrigger>
            <TabsTrigger value="talent" className="flex items-center gap-2">
              <Users className="h-4 w-4" /> Browse Talent
            </TabsTrigger>
            <TabsTrigger value="ai-match" className="flex items-center gap-2">
              <Brain className="h-4 w-4" /> AI Match
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" /> Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="jobs">
            {/* Filters */}
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="flex gap-1 flex-wrap">
                {CATEGORIES.map(c => (
                  <Button
                    key={c}
                    size="sm"
                    variant={category === c ? "default" : "outline"}
                    onClick={() => setCategory(c)}
                    className="text-xs h-8"
                  >
                    {c}
                  </Button>
                ))}
              </div>
              <div className="flex gap-1 flex-wrap">
                {JOB_TYPES.map(t => (
                  <Button
                    key={t}
                    size="sm"
                    variant={jobType === t ? "default" : "outline"}
                    onClick={() => setJobType(t)}
                    className="text-xs h-8"
                  >
                    {t}
                  </Button>
                ))}
              </div>
              <div className="flex gap-1 flex-wrap">
                {REMOTE_OPTIONS.map(r => (
                  <Button
                    key={r}
                    size="sm"
                    variant={remote === r ? "default" : "outline"}
                    onClick={() => setRemote(r)}
                    className="text-xs h-8"
                  >
                    {r}
                  </Button>
                ))}
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-5">
              {filtered.length} positions found
            </p>

            <div className="space-y-4">
              {filtered.map((job, i) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card
                    className={`border-border/50 hover:border-blue-500/30 transition-all ${job.featured ? "ring-1 ring-blue-500/20" : ""}`}
                  >
                    <CardContent className="pt-5 pb-5">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <h3 className="font-bold text-base">{job.title}</h3>
                            {job.urgent && (
                              <Badge className="bg-red-500/10 text-red-400 border-red-500/20 text-xs">
                                Urgent
                              </Badge>
                            )}
                            {job.featured && (
                              <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20 text-xs">
                                Featured
                              </Badge>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
                            <span className="flex items-center gap-1">
                              <Building2 className="h-3.5 w-3.5" />
                              {job.company}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3.5 w-3.5" />
                              {job.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <DollarSign className="h-3.5 w-3.5" />
                              {job.salary}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" />
                              {job.posted}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                            {job.description}
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            <Badge variant="outline" className="text-xs">
                              {job.type}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {job.remote}
                            </Badge>
                            {job.skills.map(s => (
                              <Badge
                                key={s}
                                className="text-xs bg-muted text-muted-foreground border-0"
                              >
                                {s}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex sm:flex-col gap-2 shrink-0">
                          <Button
                            size="sm"
                            onClick={() => setApplyJob(job)}
                            className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-0"
                          >
                            Apply Now
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => toggleSave(job.id)}
                            className={
                              savedJobs.includes(job.id)
                                ? "text-red-400 border-red-400/30"
                                : ""
                            }
                          >
                            <Heart
                              className={`h-3.5 w-3.5 ${savedJobs.includes(job.id) ? "fill-red-400" : ""}`}
                            />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border/30 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {job.views} views
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          {job.saved} saved
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
              {filtered.length === 0 && (
                <div className="text-center py-16 text-muted-foreground">
                  <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-30" />
                  <p>No jobs match your current filters.</p>
                  <Button
                    variant="link"
                    onClick={() => {
                      setSearch("");
                      setCategory("All");
                      setJobType("All Types");
                      setRemote("All");
                    }}
                  >
                    Clear all filters
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="talent">
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-2">
                Available IT Professionals
              </h2>
              <p className="text-muted-foreground text-sm">
                All candidates are pre-vetted and background-checked by our
                team.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {TALENT_PROFILES.map((p, i) => (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="border-border/50 hover:border-cyan-500/30 transition-all">
                    <CardContent className="pt-5">
                      <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg shrink-0">
                          {p.name[0]}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-bold">{p.name}</h3>
                            <div className="flex items-center gap-1 text-xs">
                              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                              <span className="font-medium">{p.rating}</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {p.title}
                          </p>
                          <div className="flex flex-wrap gap-1.5 mt-2 mb-3">
                            {p.skills.map(s => (
                              <Badge
                                key={s}
                                className="text-xs bg-muted text-muted-foreground border-0"
                              >
                                {s}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <DollarSign className="h-3 w-3" />
                              {p.rate}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              Available {p.available}
                            </span>
                            <span className="flex items-center gap-1">
                              <Briefcase className="h-3 w-3" />
                              {p.jobs} jobs completed
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button
                          size="sm"
                          className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 text-white border-0"
                          onClick={() =>
                            toast.info("Contact feature coming soon!")
                          }
                        >
                          Contact
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            toast.info("Profile view coming soon!")
                          }
                        >
                          View Profile
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <p className="text-muted-foreground text-sm mb-4">
                Looking for a specific skill set? We have 200+ vetted IT
                professionals in our network.
              </p>
              <Button
                onClick={() => setLocation("/it/contact")}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-0"
              >
                Request Custom Talent Search{" "}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </TabsContent>

          {/* ── AI MATCH TAB ── */}
          <TabsContent value="ai-match" className="space-y-5">
            <Card className="border-cyan-500/20 bg-cyan-900/5">
              <CardContent className="py-5 px-5 space-y-4">
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-cyan-400" />
                  <p className="font-black text-base">
                    AI Job Matching Engine v3.1
                  </p>
                  <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20 text-xs ml-auto">
                    Powered by SKY4444 AI
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Paste your resume or describe your skills and our AI will rank
                  all open positions by match score, salary fit, and career
                  growth potential.
                </p>
                <textarea
                  placeholder="Paste resume text or describe your skills, experience, and goals..."
                  className="w-full h-28 px-4 py-3 rounded-xl bg-muted text-sm border border-border/50 focus:outline-none focus:border-cyan-500/40 resize-none"
                />
                <Button
                  className="w-full h-10 text-sm bg-cyan-600 text-white border-0 font-bold"
                  onClick={() =>
                    toast.success(
                      "AI analyzing your profile... Match results ready in 3 seconds!"
                    )
                  }
                >
                  <Brain className="h-4 w-4 mr-2" />
                  Run AI Job Match
                </Button>
              </CardContent>
            </Card>

            <p className="text-sm font-bold text-muted-foreground">
              AI-Ranked Matches for Your Profile
            </p>
            {JOB_LISTINGS.map((job, i) => {
              const matchScore = Math.max(60, 98 - i * 7);
              const matchColor =
                matchScore >= 90
                  ? "text-green-400"
                  : matchScore >= 75
                    ? "text-yellow-400"
                    : "text-orange-400";
              return (
                <Card
                  key={job.id}
                  className="border-border/50 hover:border-cyan-500/20 transition-all"
                >
                  <CardContent className="py-3 px-4 flex items-center gap-3">
                    <div className="h-12 w-12 rounded-xl bg-muted flex flex-col items-center justify-center shrink-0">
                      <p className={`font-black text-sm ${matchColor}`}>
                        {matchScore}%
                      </p>
                      <p className="text-xs text-muted-foreground">match</p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm truncate">{job.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {job.company} · {job.location}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-cyan-500 rounded-full"
                            style={{ width: `${matchScore}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-bold text-xs text-green-400">
                        {job.salary}
                      </p>
                      <Button
                        size="sm"
                        className="h-7 px-2 text-xs bg-cyan-600 text-white border-0 mt-1 font-bold"
                        onClick={() =>
                          toast.success(`Applied to ${job.title}!`)
                        }
                      >
                        Apply
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>

          {/* ── ANALYTICS TAB ── */}
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                {
                  label: "Active Jobs",
                  value: JOB_LISTINGS.length.toString(),
                  color: "text-blue-400",
                },
                {
                  label: "Applications",
                  value: "1,247",
                  color: "text-green-400",
                },
                {
                  label: "Avg. Salary",
                  value: "$82K",
                  color: "text-yellow-400",
                },
                { label: "Placements", value: "89", color: "text-cyan-400" },
              ].map(s => (
                <Card key={s.label} className="border-border/50 text-center">
                  <CardContent className="py-3 px-2">
                    <p className={`font-black text-lg ${s.color}`}>{s.value}</p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card className="border-border/50">
              <CardContent className="py-4 px-4 space-y-3">
                <p className="font-bold text-sm">Top Skills in Demand</p>
                {[
                  {
                    skill: "React / TypeScript",
                    demand: 94,
                    color: "bg-blue-500",
                  },
                  { skill: "AWS / Cloud", demand: 88, color: "bg-orange-500" },
                  { skill: "Cybersecurity", demand: 82, color: "bg-red-500" },
                  {
                    skill: "DevOps / Kubernetes",
                    demand: 79,
                    color: "bg-purple-500",
                  },
                  {
                    skill: "Python / AI/ML",
                    demand: 76,
                    color: "bg-green-500",
                  },
                ].map(s => (
                  <div key={s.skill} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium">{s.skill}</span>
                      <span className="text-muted-foreground">
                        {s.demand}% demand
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full ${s.color} rounded-full`}
                        style={{ width: `${s.demand}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
