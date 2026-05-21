import { useState } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  Plus,
  CheckCircle,
  Clock,
  Zap,
  Users,
  Calendar,
  Target,
  TrendingUp,
  Circle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const PROJECTS = [
  {
    id: 1,
    name: "ShadowChat v12 Launch",
    status: "active",
    progress: 78,
    team: 5,
    deadline: "Jun 1, 2026",
    tasks: [
      { name: "Complete 200+ pages", done: true },
      { name: "TypeScript zero errors", done: true },
      { name: "Production build passing", done: true },
      { name: "Deploy to mainnet", done: false },
      { name: "Marketing campaign", done: false },
    ],
    bounty: "100,000 SKY4444",
    color: "#6366f1",
  },
  {
    id: 2,
    name: "Skyler Blue IT — Q3 Growth",
    status: "active",
    progress: 45,
    team: 3,
    deadline: "Sep 30, 2026",
    tasks: [
      { name: "Onboard 10 new clients", done: false },
      { name: "Launch referral program", done: true },
      { name: "Hire 2 technicians", done: false },
      { name: "Reach $100K MRR", done: false },
    ],
    bounty: "50,000 SKY4444",
    color: "#06b6d4",
  },
  {
    id: 3,
    name: "SKY4444 ICO Phase 2",
    status: "planning",
    progress: 22,
    team: 4,
    deadline: "Jul 4, 2026",
    tasks: [
      { name: "Whitepaper v4 complete", done: true },
      { name: "Exchange listings (3)", done: false },
      { name: "Influencer partnerships", done: false },
      { name: "Raise $4.4M target", done: false },
    ],
    bounty: "500,000 SKY4444",
    color: "#8b5cf6",
  },
  {
    id: 4,
    name: "NFT Collection — ShadowPunks S2",
    status: "completed",
    progress: 100,
    team: 2,
    deadline: "May 1, 2026",
    tasks: [
      { name: "Generate 4,444 NFTs", done: true },
      { name: "Smart contract deploy", done: true },
      { name: "Marketplace listing", done: true },
      { name: "Community reveal", done: true },
    ],
    bounty: "Completed",
    color: "#22c55e",
  },
];

const STATUS_CONFIG: Record<string, { color: string; label: string }> = {
  active: {
    color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    label: "🔵 Active",
  },
  planning: {
    color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    label: "📋 Planning",
  },
  completed: {
    color: "bg-green-500/10 text-green-400 border-green-500/20",
    label: "✅ Completed",
  },
};

export default function ShadowProjects() {
  const [selected, setSelected] = useState<number | null>(1);
  const [tab, setTab] = useState<"board" | "detail">("board");

  const selectedProject = PROJECTS.find(p => p.id === selected);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-indigo-400" />
            ShadowProjects
          </h1>
          <p className="text-sm text-muted-foreground">
            Project management with tasks, milestones, and crypto bounties
          </p>
        </div>
        <Button
          size="sm"
          className="h-8 text-xs bg-indigo-600 text-white border-0 font-bold"
          onClick={() => toast.success("Creating new project...")}
        >
          <Plus className="h-3.5 w-3.5 mr-1" />
          New Project
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2">
        {[
          {
            label: "Active",
            value: PROJECTS.filter(p => p.status === "active").length,
            color: "text-blue-400",
          },
          {
            label: "Planning",
            value: PROJECTS.filter(p => p.status === "planning").length,
            color: "text-yellow-400",
          },
          {
            label: "Done",
            value: PROJECTS.filter(p => p.status === "completed").length,
            color: "text-green-400",
          },
          { label: "Team", value: "5", color: "text-purple-400" },
        ].map(s => (
          <Card key={s.label} className="border-border/50 text-center">
            <CardContent className="py-2 px-1">
              <p className={`font-black text-xl ${s.color}`}>{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-2">
        {(["board", "detail"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-indigo-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "board" && (
        <div className="space-y-2">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <Card
                className={`border cursor-pointer transition-all ${selected === project.id ? "border-indigo-500/40 bg-indigo-900/5" : "border-border/50 hover:border-indigo-500/20"}`}
                onClick={() => {
                  setSelected(project.id);
                  setTab("detail");
                }}
              >
                <CardContent className="py-3 px-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-bold text-sm">{project.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Badge
                          className={`text-xs ${STATUS_CONFIG[project.status]?.color}`}
                        >
                          {STATUS_CONFIG[project.status]?.label}
                        </Badge>
                        <p className="text-xs text-muted-foreground">
                          <Users className="h-3 w-3 inline mr-0.5" />
                          {project.team} members
                        </p>
                        <p className="text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3 inline mr-0.5" />
                          {project.deadline}
                        </p>
                      </div>
                    </div>
                    <p
                      className="font-black text-sm shrink-0"
                      style={{ color: project.color }}
                    >
                      {project.progress}%
                    </p>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: project.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${project.progress}%` }}
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                    />
                  </div>
                  <p className="text-xs text-yellow-400 font-bold">
                    Bounty: {project.bounty}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "detail" && selectedProject && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <Card className="border-indigo-500/20 bg-indigo-900/5">
            <CardContent className="py-4 px-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-black text-base">{selectedProject.name}</p>
                  <Badge
                    className={`text-xs mt-1 ${STATUS_CONFIG[selectedProject.status]?.color}`}
                  >
                    {STATUS_CONFIG[selectedProject.status]?.label}
                  </Badge>
                </div>
                <p
                  className="font-black text-2xl"
                  style={{ color: selectedProject.color }}
                >
                  {selectedProject.progress}%
                </p>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: selectedProject.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${selectedProject.progress}%` }}
                  transition={{ duration: 0.8 }}
                />
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div>
                  <p className="font-bold text-muted-foreground">Team</p>
                  <p className="font-black">{selectedProject.team}</p>
                </div>
                <div>
                  <p className="font-bold text-muted-foreground">Deadline</p>
                  <p className="font-black">{selectedProject.deadline}</p>
                </div>
                <div>
                  <p className="font-bold text-muted-foreground">Bounty</p>
                  <p className="font-black text-yellow-400">
                    {selectedProject.bounty}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <p className="text-xs font-bold text-muted-foreground">
            TASKS ({selectedProject.tasks.filter(t => t.done).length}/
            {selectedProject.tasks.length} completed)
          </p>
          <div className="space-y-1.5">
            {selectedProject.tasks.map((task, i) => (
              <Card
                key={task.name}
                className={`border ${task.done ? "border-green-500/20 bg-green-900/5" : "border-border/50"}`}
              >
                <CardContent className="py-2 px-4 flex items-center gap-3">
                  {task.done ? (
                    <CheckCircle className="h-4 w-4 text-green-400 shrink-0" />
                  ) : (
                    <Circle className="h-4 w-4 text-muted-foreground shrink-0" />
                  )}
                  <p
                    className={`text-sm flex-1 ${task.done ? "line-through text-muted-foreground" : "font-medium"}`}
                  >
                    {task.name}
                  </p>
                  {!task.done && (
                    <Button
                      size="sm"
                      className="h-6 text-xs px-2 bg-indigo-600 text-white border-0 font-bold"
                      onClick={() =>
                        toast.success(`Marking "${task.name}" as done!`)
                      }
                    >
                      Done
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          <Button
            className="w-full h-9 text-xs bg-indigo-600 text-white border-0 font-bold"
            onClick={() => toast.success("Adding new task...")}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </motion.div>
      )}
    </div>
  );
}
