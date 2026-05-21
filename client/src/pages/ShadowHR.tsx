import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Star,
  TrendingUp,
  Plus,
  CheckCircle,
  Clock,
  Award,
  Briefcase,
  Heart,
  Zap,
  BarChart3,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const TEAM = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Lead Developer",
    dept: "Engineering",
    rating: 4.9,
    status: "active",
    hired: "Jan 2026",
    salary: "$8,000",
    crypto: "50% SKY4444",
    avatar: "AJ",
    mood: "😊",
  },
  {
    id: 2,
    name: "Maria Garcia",
    role: "UI/UX Designer",
    dept: "Design",
    rating: 4.7,
    status: "active",
    hired: "Feb 2026",
    salary: "$5,500",
    crypto: "100% SKY4444",
    avatar: "MG",
    mood: "🔥",
  },
  {
    id: 3,
    name: "David Chen",
    role: "IT Technician",
    dept: "IT Ops",
    rating: 4.5,
    status: "active",
    hired: "Mar 2026",
    salary: "$4,400",
    crypto: "25% TRUMP",
    avatar: "DC",
    mood: "😊",
  },
  {
    id: 4,
    name: "Sarah Williams",
    role: "Marketing Lead",
    dept: "Marketing",
    rating: 4.8,
    status: "active",
    hired: "Jan 2026",
    salary: "$4,000",
    crypto: "75% BTC",
    avatar: "SW",
    mood: "🚀",
  },
  {
    id: 5,
    name: "James Brown",
    role: "Support Lead",
    dept: "Support",
    rating: 4.6,
    status: "on-leave",
    hired: "Feb 2026",
    salary: "$3,800",
    crypto: "USD only",
    avatar: "JB",
    mood: "😴",
  },
];

const OPEN_ROLES = [
  {
    title: "Senior Blockchain Developer",
    dept: "Engineering",
    salary: "$10K-$15K/mo",
    applicants: 44,
    posted: "3 days ago",
  },
  {
    title: "Crypto Marketing Specialist",
    dept: "Marketing",
    salary: "$5K-$7K/mo",
    applicants: 28,
    posted: "1 week ago",
  },
  {
    title: "IT Support Technician",
    dept: "IT Ops",
    salary: "$3.5K-$4.5K/mo",
    applicants: 16,
    posted: "2 weeks ago",
  },
];

const BENEFITS = [
  { name: "SKY4444 Token Grants", value: "10,000 SKY4444/yr", icon: "🌌" },
  { name: "Health Insurance", value: "100% covered", icon: "❤️" },
  { name: "Remote Work", value: "100% remote", icon: "🏠" },
  { name: "Crypto Education", value: "$1,000/yr budget", icon: "📚" },
  { name: "Hardware Allowance", value: "$2,000 one-time", icon: "💻" },
  { name: "Profit Sharing", value: "5% of net revenue", icon: "💰" },
];

export default function ShadowHR() {
  const [tab, setTab] = useState<"team" | "hiring" | "benefits" | "reviews">(
    "team"
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Users className="h-6 w-6 text-pink-400" />
            ShadowHR
          </h1>
          <p className="text-sm text-muted-foreground">
            Human resources, hiring, performance, and crypto benefits
          </p>
        </div>
        <Button
          size="sm"
          className="h-8 text-xs bg-pink-600 text-white border-0 font-bold"
          onClick={() => toast.success("Opening job posting wizard...")}
        >
          <Plus className="h-3.5 w-3.5 mr-1" />
          Post Job
        </Button>
      </div>

      {/* HR Stats */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: "Headcount", value: "5", color: "text-blue-400" },
          { label: "Open Roles", value: "3", color: "text-yellow-400" },
          { label: "Avg Rating", value: "4.7★", color: "text-green-400" },
          { label: "Retention", value: "100%", color: "text-purple-400" },
        ].map(s => (
          <Card key={s.label} className="border-border/50 text-center">
            <CardContent className="py-2 px-1">
              <p className={`font-black text-base ${s.color}`}>{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-2">
        {(["team", "hiring", "benefits", "reviews"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-pink-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "team" && (
        <div className="space-y-2">
          {TEAM.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <Card className="border-border/50 hover:border-pink-500/20 transition-all">
                <CardContent className="py-3 px-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-pink-500/10 flex items-center justify-center font-black text-xs text-pink-400 shrink-0 relative">
                    {member.avatar}
                    <span className="absolute -bottom-1 -right-1 text-sm">
                      {member.mood}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{member.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {member.role} · {member.dept}
                    </p>
                    <p className="text-xs text-green-400 font-bold">
                      {member.salary}/mo · {member.crypto}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-sm text-yellow-400">
                      ⭐ {member.rating}
                    </p>
                    <Badge
                      className={`text-xs ${member.status === "active" ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"}`}
                    >
                      {member.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "hiring" && (
        <div className="space-y-2">
          {OPEN_ROLES.map((role, i) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <Card className="border-border/50">
                <CardContent className="py-3 px-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-bold text-sm">{role.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {role.dept} · {role.posted}
                      </p>
                      <p className="text-xs text-green-400 font-bold">
                        {role.salary}
                      </p>
                    </div>
                    <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-xs shrink-0">
                      {role.applicants} applicants
                    </Badge>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 h-7 text-xs font-bold"
                      onClick={() =>
                        toast.success(
                          `Viewing ${role.applicants} applicants...`
                        )
                      }
                    >
                      View Applicants
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 h-7 text-xs bg-pink-600 text-white border-0 font-bold"
                      onClick={() => toast.success("Opening job editor...")}
                    >
                      Edit Job
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
          <Button
            className="w-full h-10 text-xs bg-pink-600 text-white border-0 font-bold"
            onClick={() => toast.success("Opening job posting wizard...")}
          >
            <Plus className="h-4 w-4 mr-2" />
            Post New Job Opening
          </Button>
        </div>
      )}

      {tab === "benefits" && (
        <div className="space-y-2">
          {BENEFITS.map((b, i) => (
            <Card key={b.name} className="border-border/50">
              <CardContent className="py-2.5 px-4 flex items-center gap-3">
                <span className="text-xl shrink-0">{b.icon}</span>
                <div className="flex-1">
                  <p className="font-bold text-sm">{b.name}</p>
                </div>
                <p className="text-xs text-green-400 font-bold">{b.value}</p>
              </CardContent>
            </Card>
          ))}
          <Card className="border-pink-500/20 bg-pink-900/5">
            <CardContent className="py-3 px-4 flex items-center gap-3">
              <Heart className="h-5 w-5 text-pink-400 shrink-0" />
              <div>
                <p className="font-bold text-sm">Best-in-Class Benefits</p>
                <p className="text-xs text-muted-foreground">
                  ShadowChat offers crypto-native benefits that grow with the
                  company. SKY4444 grants vest over 4 years with 1-year cliff.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "reviews" && (
        <div className="space-y-2">
          {TEAM.map((member, i) => (
            <Card key={member.id} className="border-border/50">
              <CardContent className="py-3 px-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-bold text-sm">{member.name}</p>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map(s => (
                      <Star
                        key={s}
                        className={`h-3.5 w-3.5 ${s <= Math.floor(member.rating) ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}`}
                      />
                    ))}
                    <span className="text-xs font-bold ml-1">
                      {member.rating}
                    </span>
                  </div>
                </div>
                <div className="space-y-1">
                  {[
                    ["Performance", 95],
                    ["Communication", 88],
                    ["Teamwork", 92],
                  ].map(([label, val]) => (
                    <div
                      key={label as string}
                      className="flex items-center gap-2"
                    >
                      <p className="text-xs text-muted-foreground w-24">
                        {label}
                      </p>
                      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-pink-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${val}%` }}
                          transition={{ duration: 0.6, delay: i * 0.1 }}
                        />
                      </div>
                      <p className="text-xs font-bold w-8 text-right">{val}%</p>
                    </div>
                  ))}
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full h-7 text-xs font-bold mt-2"
                  onClick={() =>
                    toast.success(`Opening review for ${member.name}...`)
                  }
                >
                  Write Review
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
