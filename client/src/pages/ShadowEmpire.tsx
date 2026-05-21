import { useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  TrendingUp,
  Globe,
  Users,
  DollarSign,
  Zap,
  Plus,
  BarChart3,
  Crown,
  Star,
  ArrowUpRight,
  Rocket,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const DIVISIONS = [
  {
    id: 1,
    name: "ShadowChat Platform",
    revenue: "$4.4M/mo",
    growth: "+44%",
    employees: 44,
    status: "thriving",
    icon: "💬",
    color: "#6366f1",
  },
  {
    id: 2,
    name: "SKY4444 ICO",
    revenue: "$44M raised",
    growth: "+444%",
    employees: 12,
    status: "launching",
    icon: "🌌",
    color: "#8b5cf6",
  },
  {
    id: 3,
    name: "Skyler Blue IT",
    revenue: "$444K/mo",
    growth: "+44%",
    employees: 8,
    status: "growing",
    icon: "💻",
    color: "#06b6d4",
  },
  {
    id: 4,
    name: "ShadowDEX",
    revenue: "$1.4M/mo",
    growth: "+188%",
    employees: 6,
    status: "thriving",
    icon: "📈",
    color: "#22c55e",
  },
  {
    id: 5,
    name: "Shadow NFT Studio",
    revenue: "$888K/mo",
    growth: "+88%",
    employees: 4,
    status: "growing",
    icon: "🎨",
    color: "#f59e0b",
  },
  {
    id: 6,
    name: "ShadowBank",
    revenue: "$2.2M/mo",
    growth: "+22%",
    employees: 18,
    status: "stable",
    icon: "🏦",
    color: "#ef4444",
  },
];

const MILESTONES = [
  {
    title: "1,000 Users",
    achieved: true,
    date: "Jan 2025",
    reward: "10,000 SKY4444",
  },
  {
    title: "10,000 Users",
    achieved: true,
    date: "Mar 2025",
    reward: "100,000 SKY4444",
  },
  {
    title: "100,000 Users",
    achieved: false,
    date: "Target: Q3 2025",
    reward: "1,000,000 SKY4444",
  },
  {
    title: "$1M Monthly Revenue",
    achieved: false,
    date: "Target: Q4 2025",
    reward: "Legendary NFT",
  },
  {
    title: "1,000,000 Users",
    achieved: false,
    date: "Target: 2026",
    reward: "ShadowCEO Title",
  },
];

const STATUS_COLOR: Record<string, string> = {
  thriving: "text-green-400",
  launching: "text-purple-400",
  growing: "text-blue-400",
  stable: "text-yellow-400",
};

export default function ShadowEmpire() {
  const [tab, setTab] = useState<
    "overview" | "divisions" | "milestones" | "expand"
  >("overview");

  const totalRevenue = "$13.4M/mo";
  const totalEmployees = DIVISIONS.reduce((a, d) => a + d.employees, 0);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Crown className="h-6 w-6 text-yellow-400" />
            Shadow Empire
          </h1>
          <p className="text-sm text-muted-foreground">
            Build and manage your global crypto business empire
          </p>
        </div>
        <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20 font-bold">
          👑 CEO
        </Badge>
      </div>

      {/* Empire Overview Card */}
      <Card className="border-yellow-500/20 bg-gradient-to-br from-yellow-900/10 to-orange-900/5 overflow-hidden">
        <CardContent className="py-4 px-4">
          <p className="text-xs text-muted-foreground mb-1">
            Total Empire Revenue
          </p>
          <p className="font-black text-3xl text-yellow-400">{totalRevenue}</p>
          <div className="grid grid-cols-3 gap-3 mt-3">
            {[
              {
                label: "Divisions",
                value: DIVISIONS.length.toString(),
                icon: Building2,
              },
              {
                label: "Employees",
                value: totalEmployees.toString(),
                icon: Users,
              },
              { label: "Countries", value: "44", icon: Globe },
            ].map(s => (
              <div key={s.label} className="text-center">
                <s.icon className="h-4 w-4 mx-auto mb-0.5 text-yellow-400" />
                <p className="font-black text-sm text-yellow-400">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-2">
        {(["overview", "divisions", "milestones", "expand"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-yellow-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {[
              {
                label: "Total Valuation",
                value: "$444M",
                color: "text-yellow-400",
              },
              { label: "YoY Growth", value: "+444%", color: "text-green-400" },
              {
                label: "SKY4444 Treasury",
                value: "44.4M SKY",
                color: "text-purple-400",
              },
              { label: "Profit Margin", value: "44%", color: "text-blue-400" },
            ].map(s => (
              <Card key={s.label} className="border-border/50 text-center">
                <CardContent className="py-3 px-3">
                  <p className={`font-black text-lg ${s.color}`}>{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card className="border-border/50">
            <CardContent className="py-3 px-4">
              <p className="font-bold text-sm mb-2">Revenue by Division</p>
              {DIVISIONS.map(div => (
                <div key={div.id} className="mb-2">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="text-xs font-bold">
                      {div.icon} {div.name}
                    </p>
                    <p className="text-xs font-bold text-green-400">
                      {div.growth}
                    </p>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${Math.random() * 60 + 20}%`,
                        backgroundColor: div.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "divisions" && (
        <div className="space-y-2">
          {DIVISIONS.map((div, i) => (
            <motion.div
              key={div.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <Card className="border-border/50 hover:border-yellow-500/20 transition-all">
                <CardContent className="py-3 px-4 flex items-start gap-3">
                  <div
                    className="h-10 w-10 rounded-xl flex items-center justify-center text-2xl shrink-0"
                    style={{ backgroundColor: div.color + "20" }}
                  >
                    {div.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-sm">{div.name}</p>
                      <span
                        className={`text-xs font-bold ${STATUS_COLOR[div.status]}`}
                      >
                        {div.status}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {div.employees} employees
                    </p>
                    <p className="text-xs text-green-400 font-bold">
                      {div.growth} growth
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p
                      className="font-black text-sm"
                      style={{ color: div.color }}
                    >
                      {div.revenue}
                    </p>
                    <Button
                      size="sm"
                      className="h-6 text-xs px-2 mt-1 font-bold text-white border-0"
                      style={{ backgroundColor: div.color }}
                      onClick={() =>
                        toast.success(`Opening ${div.name} dashboard...`)
                      }
                    >
                      Manage <ArrowUpRight className="h-3 w-3 ml-0.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "milestones" && (
        <div className="space-y-2">
          {MILESTONES.map((m, i) => (
            <Card
              key={m.title}
              className={`border ${m.achieved ? "border-green-500/20 bg-green-900/5" : "border-border/50"}`}
            >
              <CardContent className="py-3 px-4 flex items-center gap-3">
                <div
                  className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 ${m.achieved ? "bg-green-500/20" : "bg-muted"}`}
                >
                  {m.achieved ? (
                    <Star className="h-4 w-4 text-green-400 fill-green-400" />
                  ) : (
                    <Star className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm">{m.title}</p>
                  <p className="text-xs text-muted-foreground">{m.date}</p>
                  <p className="text-xs text-yellow-400 font-bold">
                    Reward: {m.reward}
                  </p>
                </div>
                {m.achieved && (
                  <Badge className="bg-green-500/10 text-green-400 border-green-500/20 text-xs">
                    ✓ Done
                  </Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "expand" && (
        <div className="space-y-3">
          <p className="text-xs font-bold text-muted-foreground">
            EXPANSION OPPORTUNITIES
          </p>
          {[
            {
              name: "ShadowAI Division",
              cost: "1M SKY4444",
              roi: "+200% revenue",
              icon: "🤖",
              desc: "Launch dedicated AI products and services division",
            },
            {
              name: "Shadow Gaming Studio",
              cost: "500K SKY4444",
              roi: "+150% revenue",
              icon: "🎮",
              desc: "Build AAA crypto games with play-to-earn mechanics",
            },
            {
              name: "ShadowMedia Network",
              cost: "2M SKY4444",
              roi: "+300% revenue",
              icon: "📺",
              desc: "Launch streaming platform to compete with Netflix",
            },
            {
              name: "Shadow Aerospace",
              cost: "10M SKY4444",
              roi: "+1000% revenue",
              icon: "🚀",
              desc: "Tokenize space exploration and satellite internet",
            },
          ].map(opp => (
            <Card
              key={opp.name}
              className="border-purple-500/20 bg-purple-900/5"
            >
              <CardContent className="py-3 px-4 flex items-start gap-3">
                <span className="text-2xl shrink-0">{opp.icon}</span>
                <div className="flex-1">
                  <p className="font-bold text-sm">{opp.name}</p>
                  <p className="text-xs text-muted-foreground">{opp.desc}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-red-400 font-bold">
                      Cost: {opp.cost}
                    </span>
                    <span className="text-xs text-green-400 font-bold">
                      {opp.roi}
                    </span>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="h-8 text-xs bg-purple-600 text-white border-0 font-bold shrink-0"
                  onClick={() =>
                    toast.success(`Investing in ${opp.name}! Treasury updated.`)
                  }
                >
                  <Rocket className="h-3.5 w-3.5 mr-1" />
                  Invest
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
