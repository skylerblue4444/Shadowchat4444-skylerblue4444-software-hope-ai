import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Mic,
  MicOff,
  Play,
  Pause,
  Settings,
  Zap,
  TrendingUp,
  MessageCircle,
  Heart,
  Briefcase,
  Calendar,
  Shield,
  CheckCircle,
  Clock,
  AlertTriangle,
  ChevronRight,
  Volume2,
  VolumeX,
  Brain,
  Cpu,
  Activity,
  Star,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const AGENT_CAPABILITIES = [
  {
    id: "trading",
    name: "Auto Trading",
    desc: "Executes trades based on your risk profile",
    emoji: "📈",
    enabled: true,
    status: "active",
  },
  {
    id: "staking",
    name: "Auto Staking",
    desc: "Moves assets to highest yield pools automatically",
    emoji: "🌾",
    enabled: true,
    status: "active",
  },
  {
    id: "posting",
    name: "Auto Poster",
    desc: "Posts content and engages with your audience",
    emoji: "📝",
    enabled: false,
    status: "idle",
  },
  {
    id: "dating",
    name: "Dating Assistant",
    desc: "Manages your dating profile and suggests matches",
    emoji: "💘",
    enabled: false,
    status: "idle",
  },
  {
    id: "booking",
    name: "Auto Booking",
    desc: "Books travel, appointments, and events for you",
    emoji: "📅",
    enabled: false,
    status: "idle",
  },
  {
    id: "portfolio",
    name: "Portfolio Rebalancer",
    desc: "Rebalances your portfolio to maximize returns",
    emoji: "⚖️",
    enabled: true,
    status: "running",
  },
  {
    id: "charity",
    name: "Charity Giver",
    desc: "Automatically donates to causes you care about",
    emoji: "❤️",
    enabled: true,
    status: "active",
  },
  {
    id: "freelance",
    name: "Gig Finder",
    desc: "Finds and applies to gigs in the Talent Marketplace",
    emoji: "💼",
    enabled: false,
    status: "idle",
  },
];

const AGENT_LOG = [
  {
    time: "2 min ago",
    action: "Staked 1,000 SKY4444 in 124.5% APY pool",
    type: "success",
    emoji: "🌾",
  },
  {
    time: "8 min ago",
    action: "Executed BUY order: 0.01 BTC at $104,200",
    type: "success",
    emoji: "📈",
  },
  {
    time: "15 min ago",
    action: "Portfolio rebalanced: +2.3% allocation to SKY4444",
    type: "info",
    emoji: "⚖️",
  },
  {
    time: "22 min ago",
    action: "Donated 44 SKY4444 to ShadowCharity DAO",
    type: "success",
    emoji: "❤️",
  },
  {
    time: "1 hr ago",
    action: "Price alert triggered: ETH crossed $3,800",
    type: "warning",
    emoji: "🔔",
  },
  {
    time: "2 hr ago",
    action: "Auto-staked 500 TRUMP tokens at 18% APY",
    type: "success",
    emoji: "🇺🇸",
  },
];

const SWARM_AGENTS = [
  {
    name: "Trading Agent",
    status: "active",
    task: "Monitoring BTC/SKY4444 pair for entry signal",
    emoji: "📈",
    load: 78,
  },
  {
    name: "Content Agent",
    status: "idle",
    task: "Waiting for scheduled post time (3:00 PM)",
    emoji: "📝",
    load: 12,
  },
  {
    name: "Dating Agent",
    status: "idle",
    task: "Profile optimization queued",
    emoji: "💘",
    load: 5,
  },
  {
    name: "Financial Agent",
    status: "active",
    task: "Analyzing portfolio rebalancing opportunity",
    emoji: "💰",
    load: 65,
  },
  {
    name: "Security Agent",
    status: "active",
    task: "Monitoring for suspicious login attempts",
    emoji: "🛡️",
    load: 30,
  },
];

export default function AIAgent() {
  const [agentActive, setAgentActive] = useState(true);
  const [listening, setListening] = useState(false);
  const [tab, setTab] = useState<"agent" | "swarm" | "log" | "settings">(
    "agent"
  );
  const [capabilities, setCapabilities] = useState(AGENT_CAPABILITIES);
  const [voiceText, setVoiceText] = useState("");
  const [agentResponse, setAgentResponse] = useState("");
  const [typing, setTyping] = useState(false);
  const pulseRef = useRef<NodeJS.Timeout | null>(null);

  const RESPONSES = [
    "I've analyzed your portfolio. SKY4444 is up 44% this week — I recommend increasing your position by 5%.",
    "Your staking rewards are compounding nicely. Current APY across all pools: 89.3% blended.",
    "I found 3 new gig opportunities in the Talent Marketplace matching your skills. Want me to apply?",
    "Your dating profile has 12 new matches today. I've drafted personalized opening messages for each.",
    "BTC is showing a bullish divergence on the 4H chart. Your risk profile allows a small position.",
    "I've booked your appointment with Skyler Blue IT Resolutions for tomorrow at 2 PM.",
  ];

  const toggleListening = () => {
    if (listening) {
      setListening(false);
      setVoiceText("Stake my SKY4444 for maximum yield");
      setTyping(true);
      setTimeout(() => {
        setAgentResponse(
          RESPONSES[Math.floor(Math.random() * RESPONSES.length)]
        );
        setTyping(false);
      }, 1500);
    } else {
      setListening(true);
      setVoiceText("");
      setAgentResponse("");
      toast.info("🎙️ Listening... speak your command");
    }
  };

  const toggleCapability = (id: string) => {
    setCapabilities(caps =>
      caps.map(c =>
        c.id === id
          ? {
              ...c,
              enabled: !c.enabled,
              status: !c.enabled ? "active" : "idle",
            }
          : c
      )
    );
    const cap = capabilities.find(c => c.id === id);
    if (cap) toast.info(`${cap.name} ${cap.enabled ? "disabled" : "enabled"}`);
  };

  const activeCount = capabilities.filter(c => c.enabled).length;
  const runningCount = capabilities.filter(
    c => c.status === "running" || c.status === "active"
  ).length;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Bot className="h-6 w-6 text-purple-400" />
            Hands-Free AI Agent
          </h1>
          <p className="text-sm text-muted-foreground">
            Autonomous AI operating ShadowChat on your behalf
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            checked={agentActive}
            onCheckedChange={v => {
              setAgentActive(v);
              toast.info(v ? "🤖 AI Agent activated" : "AI Agent paused");
            }}
          />
          <Badge
            className={`font-bold ${agentActive ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-muted text-muted-foreground"}`}
          >
            {agentActive ? "● Active" : "○ Paused"}
          </Badge>
        </div>
      </div>

      {/* Agent Status Card */}
      <Card className="border-purple-500/20 bg-gradient-to-br from-purple-900/10 to-blue-900/10">
        <CardContent className="pt-4 pb-4">
          <div className="flex items-center gap-4 mb-4">
            <motion.div
              animate={agentActive ? { scale: [1, 1.1, 1] } : {}}
              transition={{ repeat: Infinity, duration: 2 }}
              className="h-16 w-16 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center"
            >
              <Bot className="h-8 w-8 text-purple-400" />
            </motion.div>
            <div className="flex-1">
              <p className="font-black text-lg">ShadowAgent v1.0</p>
              <p className="text-xs text-muted-foreground">
                {activeCount} capabilities active · {runningCount} tasks running
              </p>
              <div className="flex gap-2 mt-1">
                <Badge className="text-xs bg-purple-500/10 text-purple-400 border-purple-500/20">
                  🧠 GPT-4.1
                </Badge>
                <Badge className="text-xs bg-blue-500/10 text-blue-400 border-blue-500/20">
                  ⚡ Real-time
                </Badge>
                <Badge className="text-xs bg-green-500/10 text-green-400 border-green-500/20">
                  🔒 Private
                </Badge>
              </div>
            </div>
          </div>

          {/* Voice Interface */}
          <div className="p-3 rounded-xl bg-black/20 border border-purple-500/20 mb-3">
            {voiceText && (
              <p className="text-xs text-purple-300 mb-1">You: "{voiceText}"</p>
            )}
            {typing && (
              <p className="text-xs text-muted-foreground animate-pulse">
                Agent is thinking...
              </p>
            )}
            {agentResponse && !typing && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-green-300"
              >
                Agent: {agentResponse}
              </motion.p>
            )}
            {!voiceText && !agentResponse && (
              <p className="text-xs text-muted-foreground">
                Press the mic and speak a command...
              </p>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              className={`flex-1 h-10 font-bold ${listening ? "bg-red-600 animate-pulse" : "bg-purple-600"} text-white border-0`}
              onClick={toggleListening}
            >
              {listening ? (
                <>
                  <MicOff className="h-4 w-4 mr-2" />
                  Stop Listening
                </>
              ) : (
                <>
                  <Mic className="h-4 w-4 mr-2" />
                  Voice Command
                </>
              )}
            </Button>
            <Button
              variant="outline"
              className="h-10 px-4"
              onClick={() => {
                setVoiceText("What's my portfolio status?");
                setTyping(true);
                setTimeout(() => {
                  setAgentResponse(RESPONSES[1]);
                  setTyping(false);
                }, 1200);
              }}
            >
              <Brain className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="flex gap-2">
        {(["agent", "swarm", "log", "settings"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-purple-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "agent" && (
        <div className="space-y-2">
          <p className="text-xs font-bold text-muted-foreground">
            AGENT CAPABILITIES
          </p>
          {capabilities.map(cap => (
            <Card key={cap.id} className="border-border/50">
              <CardContent className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <span className="text-xl shrink-0">{cap.emoji}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-sm">{cap.name}</p>
                      <Badge
                        className={`text-xs shrink-0 ${cap.status === "active" || cap.status === "running" ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-muted text-muted-foreground"}`}
                      >
                        {cap.status === "running"
                          ? "⚡ Running"
                          : cap.status === "active"
                            ? "● Active"
                            : "○ Idle"}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{cap.desc}</p>
                  </div>
                  <Switch
                    checked={cap.enabled}
                    onCheckedChange={() => toggleCapability(cap.id)}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "swarm" && (
        <div className="space-y-3">
          <p className="text-xs font-bold text-muted-foreground">
            AI SWARM INTELLIGENCE — 5 SPECIALIZED AGENTS
          </p>
          {SWARM_AGENTS.map((agent, i) => (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="border-border/50">
                <CardContent className="py-3 px-4">
                  <div className="flex items-start gap-3">
                    <span className="text-xl shrink-0">{agent.emoji}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-bold text-sm">{agent.name}</p>
                        <Badge
                          className={`text-xs ${agent.status === "active" ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-muted text-muted-foreground"}`}
                        >
                          {agent.status === "active" ? "● Active" : "○ Idle"}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {agent.task}
                      </p>
                      <div className="flex items-center gap-2">
                        <Progress value={agent.load} className="h-1.5 flex-1" />
                        <p className="text-xs text-muted-foreground shrink-0">
                          {agent.load}% CPU
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "log" && (
        <div className="space-y-2">
          <p className="text-xs font-bold text-muted-foreground">
            AGENT ACTIVITY LOG
          </p>
          {AGENT_LOG.map((entry, i) => (
            <Card key={i} className="border-border/50">
              <CardContent className="py-2.5 px-4">
                <div className="flex items-center gap-3">
                  <span className="text-lg shrink-0">{entry.emoji}</span>
                  <div className="flex-1">
                    <p className="text-xs font-medium">{entry.action}</p>
                    <p className="text-xs text-muted-foreground">
                      {entry.time}
                    </p>
                  </div>
                  <Badge
                    className={`text-xs shrink-0 ${entry.type === "success" ? "bg-green-500/10 text-green-400 border-green-500/20" : entry.type === "warning" ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" : "bg-blue-500/10 text-blue-400 border-blue-500/20"}`}
                  >
                    {entry.type === "success"
                      ? "✓"
                      : entry.type === "warning"
                        ? "⚠"
                        : "ℹ"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "settings" && (
        <div className="space-y-3">
          {[
            {
              label: "Risk Level",
              desc: "Conservative — max 2% portfolio per trade",
              value: "Conservative",
            },
            {
              label: "Auto-stake threshold",
              desc: "Stake when idle balance exceeds 1,000 SKY4444",
              value: "1,000 SKY4444",
            },
            {
              label: "Charity auto-donate",
              desc: "Donate 1% of staking rewards to charity",
              value: "1% of rewards",
            },
            {
              label: "Voice wake word",
              desc: "Say 'Hey Shadow' to activate voice commands",
              value: "Hey Shadow",
            },
            {
              label: "Agent permissions",
              desc: "Trading, Staking, Portfolio — no social/dating",
              value: "Custom",
            },
          ].map(setting => (
            <Card
              key={setting.label}
              className="border-border/50 cursor-pointer hover:border-purple-500/20 transition-all"
              onClick={() => toast.info(`Editing ${setting.label}...`)}
            >
              <CardContent className="py-3 px-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-sm">{setting.label}</p>
                    <p className="text-xs text-muted-foreground">
                      {setting.desc}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="text-xs bg-purple-500/10 text-purple-400 border-purple-500/20">
                      {setting.value}
                    </Badge>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
