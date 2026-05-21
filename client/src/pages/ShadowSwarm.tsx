import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Zap,
  Bot,
  Network,
  Play,
  Pause,
  Plus,
  CheckCircle,
  Clock,
  TrendingUp,
  Shield,
  Code,
  MessageCircle,
  Coins,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const AGENTS = [
  {
    id: "alpha",
    name: "Alpha",
    role: "Market Analyst",
    emoji: "📊",
    status: "active",
    tasks: 144,
    accuracy: 94.4,
    specialty: "Price prediction & trend analysis",
  },
  {
    id: "beta",
    name: "Beta",
    role: "Risk Manager",
    emoji: "🛡️",
    status: "active",
    tasks: 88,
    accuracy: 97.2,
    specialty: "Portfolio risk assessment & hedging",
  },
  {
    id: "gamma",
    name: "Gamma",
    role: "News Scanner",
    emoji: "📰",
    status: "active",
    tasks: 2400,
    accuracy: 91.0,
    specialty: "Real-time news sentiment analysis",
  },
  {
    id: "delta",
    name: "Delta",
    role: "Code Auditor",
    emoji: "🔍",
    status: "idle",
    tasks: 34,
    accuracy: 99.1,
    specialty: "Smart contract security auditing",
  },
  {
    id: "epsilon",
    name: "Epsilon",
    role: "Social Monitor",
    emoji: "👥",
    status: "active",
    tasks: 8800,
    accuracy: 88.5,
    specialty: "Social media sentiment & whale tracking",
  },
  {
    id: "zeta",
    name: "Zeta",
    role: "Trade Executor",
    emoji: "⚡",
    status: "active",
    tasks: 444,
    accuracy: 96.8,
    specialty: "Automated trade execution & optimization",
  },
];

const SWARM_TASKS = [
  {
    id: 1,
    title: "Analyze SKY4444 price action for next 24hrs",
    agents: ["alpha", "gamma", "epsilon"],
    status: "running",
    progress: 67,
    result: null,
  },
  {
    id: 2,
    title: "Audit new DeFi protocol smart contract",
    agents: ["delta", "beta"],
    status: "completed",
    progress: 100,
    result: "✅ No critical vulnerabilities found. 2 minor issues flagged.",
  },
  {
    id: 3,
    title: "Monitor TRUMP coin whale movements",
    agents: ["epsilon", "alpha"],
    status: "running",
    progress: 45,
    result: null,
  },
  {
    id: 4,
    title: "Optimize portfolio allocation for max APY",
    agents: ["alpha", "beta", "zeta"],
    status: "queued",
    progress: 0,
    result: null,
  },
];

const LOG_MESSAGES = [
  "Alpha: SKY4444 RSI at 67 — approaching overbought territory",
  "Gamma: Detected 3 bullish news articles in last hour",
  "Epsilon: Whale wallet 0x4444 accumulated 2.4M SKY4444",
  "Beta: Portfolio risk score: 42/100 — moderate risk",
  "Zeta: Executed limit order BTC/USDT at $107,444",
  "Alpha: TRUMP coin forming ascending triangle pattern",
  "Gamma: Negative sentiment spike detected on Twitter",
  "Delta: Smart contract audit complete — deploying report",
];

export default function ShadowSwarm() {
  const [tab, setTab] = useState<"swarm" | "agents" | "tasks" | "logs">(
    "swarm"
  );
  const [swarmActive, setSwarmActive] = useState(true);
  const [logs, setLogs] = useState(LOG_MESSAGES.slice(0, 4));
  const [logIdx, setLogIdx] = useState(4);

  useEffect(() => {
    if (!swarmActive) return;
    const interval = setInterval(() => {
      setLogs(l => [
        LOG_MESSAGES[logIdx % LOG_MESSAGES.length],
        ...l.slice(0, 7),
      ]);
      setLogIdx(i => i + 1);
    }, 2500);
    return () => clearInterval(interval);
  }, [swarmActive, logIdx]);

  const activeAgents = AGENTS.filter(a => a.status === "active").length;
  const runningTasks = SWARM_TASKS.filter(t => t.status === "running").length;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Network className="h-6 w-6 text-fuchsia-400" />
            ShadowSwarm
          </h1>
          <p className="text-sm text-muted-foreground">
            AI swarm intelligence — 6 agents collaborating in real-time
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            className={`font-bold ${swarmActive ? "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20 animate-pulse" : "bg-muted text-muted-foreground"}`}
          >
            {swarmActive ? `⚡ ${activeAgents} Active` : "● Paused"}
          </Badge>
          <Button
            size="sm"
            className={`h-8 text-xs ${swarmActive ? "bg-red-600" : "bg-fuchsia-600"} text-white border-0`}
            onClick={() => {
              setSwarmActive(!swarmActive);
              toast.info(swarmActive ? "Swarm paused" : "Swarm activated!");
            }}
          >
            {swarmActive ? (
              <>
                <Pause className="h-3.5 w-3.5 mr-1" />
                Pause
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 mr-1" />
                Start
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Swarm Visualization */}
      <Card className="border-fuchsia-500/20 bg-gradient-to-br from-fuchsia-900/10 to-purple-900/10 overflow-hidden">
        <CardContent className="py-5 px-4">
          <div className="relative h-40 flex items-center justify-center">
            {/* Central brain */}
            <motion.div
              animate={swarmActive ? { scale: [1, 1.05, 1] } : {}}
              transition={{ repeat: Infinity, duration: 2 }}
              className="h-16 w-16 rounded-full bg-fuchsia-600/20 border-2 border-fuchsia-500/40 flex items-center justify-center z-10"
            >
              <Brain className="h-8 w-8 text-fuchsia-400" />
            </motion.div>
            {/* Agent nodes */}
            {AGENTS.map((agent, i) => {
              const angle = (i / AGENTS.length) * 2 * Math.PI - Math.PI / 2;
              const r = 65;
              const x = Math.cos(angle) * r;
              const y = Math.sin(angle) * r;
              return (
                <motion.div
                  key={agent.id}
                  animate={
                    swarmActive && agent.status === "active"
                      ? { scale: [1, 1.1, 1], opacity: [1, 0.8, 1] }
                      : {}
                  }
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    delay: i * 0.25,
                  }}
                  className="absolute"
                  style={{
                    left: `calc(50% + ${x}px - 18px)`,
                    top: `calc(50% + ${y}px - 18px)`,
                  }}
                >
                  <div
                    className={`h-9 w-9 rounded-full flex items-center justify-center text-base border-2 ${agent.status === "active" ? "border-fuchsia-500/50 bg-fuchsia-900/30" : "border-border/50 bg-muted/30"}`}
                  >
                    {agent.emoji}
                  </div>
                </motion.div>
              );
            })}
            {/* Connection lines (SVG) */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ opacity: swarmActive ? 0.3 : 0.1 }}
            >
              {AGENTS.map((agent, i) => {
                const angle = (i / AGENTS.length) * 2 * Math.PI - Math.PI / 2;
                const r = 65;
                const x = 50 + (Math.cos(angle) * r) / 2.4;
                const y = 50 + (Math.sin(angle) * r) / 1.6;
                return (
                  <line
                    key={i}
                    x1="50%"
                    y1="50%"
                    x2={`${x}%`}
                    y2={`${y}%`}
                    stroke="#d946ef"
                    strokeWidth="1"
                    strokeDasharray="4,4"
                  />
                );
              })}
            </svg>
          </div>
          <div className="flex justify-center gap-4 text-xs text-muted-foreground mt-2">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-fuchsia-400 inline-block" />
              {activeAgents} Active
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-yellow-400 inline-block" />
              {runningTasks} Running Tasks
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-green-400 inline-block" />
              1 Completed
            </span>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-2">
        {(["swarm", "agents", "tasks", "logs"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-fuchsia-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "swarm" && (
        <div className="space-y-3">
          <p className="text-xs font-bold text-muted-foreground">
            LIVE AGENT ACTIVITY
          </p>
          <AnimatePresence>
            {logs.map((log, i) => (
              <motion.div
                key={log + i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
              >
                <div className="flex items-start gap-2 py-1.5 border-b border-border/20 last:border-0">
                  <div className="h-1.5 w-1.5 rounded-full bg-fuchsia-400 mt-1.5 shrink-0 animate-pulse" />
                  <p className="text-xs text-muted-foreground font-mono">
                    {log}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {tab === "agents" && (
        <div className="space-y-2">
          {AGENTS.map((agent, i) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Card className="border-border/50">
                <CardContent className="py-3 px-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{agent.emoji}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="font-bold text-sm">
                          {agent.name} — {agent.role}
                        </p>
                        <Badge
                          className={`text-xs ${agent.status === "active" ? "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20" : "bg-muted text-muted-foreground"}`}
                        >
                          {agent.status === "active" ? "● Active" : "○ Idle"}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">
                        {agent.specialty}
                      </p>
                      <div className="flex gap-3 text-xs">
                        <span className="text-muted-foreground">
                          Tasks:{" "}
                          <span className="text-fuchsia-400 font-bold">
                            {agent.tasks}
                          </span>
                        </span>
                        <span className="text-muted-foreground">
                          Accuracy:{" "}
                          <span className="text-green-400 font-bold">
                            {agent.accuracy}%
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "tasks" && (
        <div className="space-y-3">
          <Button
            className="w-full h-9 text-xs bg-fuchsia-600 text-white border-0"
            onClick={() => toast.info("Creating new swarm task...")}
          >
            <Plus className="h-3.5 w-3.5 mr-1.5" />
            New Swarm Task
          </Button>
          {SWARM_TASKS.map((task, i) => (
            <Card key={task.id} className="border-border/50">
              <CardContent className="py-3 px-4">
                <div className="flex items-start justify-between mb-2">
                  <p className="font-bold text-sm flex-1 pr-2">{task.title}</p>
                  <Badge
                    className={`text-xs shrink-0 ${task.status === "running" ? "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20 animate-pulse" : task.status === "completed" ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-muted text-muted-foreground"}`}
                  >
                    {task.status === "running"
                      ? "⚡ Running"
                      : task.status === "completed"
                        ? "✓ Done"
                        : "⏳ Queued"}
                  </Badge>
                </div>
                <div className="flex gap-1 mb-2">
                  {task.agents.map(agentId => {
                    const agent = AGENTS.find(a => a.id === agentId)!;
                    return (
                      <Badge
                        key={agentId}
                        className="text-xs bg-muted text-muted-foreground"
                      >
                        {agent.emoji} {agent.name}
                      </Badge>
                    );
                  })}
                </div>
                {task.status !== "queued" && (
                  <Progress value={task.progress} className="h-1.5 mb-1" />
                )}
                {task.result && (
                  <p className="text-xs text-green-400 mt-1">{task.result}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "logs" && (
        <div className="space-y-1">
          <p className="text-xs font-bold text-muted-foreground">
            FULL SWARM LOG
          </p>
          <Card className="border-border/50 bg-black/20">
            <CardContent className="py-3 px-3">
              <div className="space-y-1 font-mono text-xs max-h-80 overflow-y-auto">
                {[...logs, ...LOG_MESSAGES].map((log, i) => (
                  <p key={i} className="text-muted-foreground">
                    <span className="text-fuchsia-400/60">
                      [{new Date().toLocaleTimeString()}]
                    </span>{" "}
                    {log}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
