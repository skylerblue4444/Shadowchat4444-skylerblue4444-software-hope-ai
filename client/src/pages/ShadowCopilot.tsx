import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Send,
  Zap,
  TrendingUp,
  TrendingDown,
  Shield,
  BarChart3,
  DollarSign,
  Star,
  RefreshCw,
  ChevronRight,
  Brain,
  Target,
  AlertTriangle,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Message {
  id: number;
  role: "user" | "copilot";
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 1,
    role: "copilot",
    timestamp: new Date(),
    content:
      "👋 Hello! I'm ShadowCopilot — your AI trading and platform assistant. I can analyze your portfolio, suggest trades, explain DeFi strategies, and help you navigate the entire ShadowChat ecosystem. What would you like to explore today?",
    suggestions: [
      "Analyze my portfolio",
      "Best farms right now",
      "SKY4444 price prediction",
      "How to earn more rewards",
    ],
  },
];

const COPILOT_RESPONSES: Record<string, string> = {
  "analyze my portfolio":
    "📊 **Portfolio Analysis**\n\nBased on your holdings:\n- **SKY4444**: 42% allocation — Strong conviction play. Consider taking 10% profits above $0.12\n- **BTC**: 28% — Healthy core holding. BTC dominance at 61% suggests altcoin season may be near\n- **ETH**: 18% — Underweight vs market. Consider increasing to 25%\n- **TRUMP**: 12% — High volatility meme position. Set stop-loss at -20%\n\n**Overall Score: 78/100** — Well-diversified with growth bias. Reduce meme exposure slightly for better risk-adjusted returns.",
  "best farms right now":
    "🌾 **Top Yield Opportunities**\n\n1. **SKY4444/USDT Farm** — 124.5% APY 🔥 Best risk/reward on platform\n2. **TRUMP/USDT Farm** — 84.6% APY — High yield but volatile pair\n3. **SOL/USDT Farm** — 34.8% APY — Solid mid-risk option\n4. **ETH/USDT Farm** — 18.4% APY — Safest option with good yield\n\n**Recommendation**: Split 60/40 between SKY4444/USDT and ETH/USDT for balanced yield with manageable risk.",
  "sky4444 price prediction":
    "🔮 **SKY4444 Price Analysis**\n\nCurrent: $0.0842\n\n**Short-term (7 days)**: Bullish — ICO momentum + 3 upcoming exchange listings\n**Medium-term (30 days)**: $0.12–$0.18 target range (+42% to +114%)\n**Long-term (90 days)**: $0.25–$0.40 if platform growth continues\n\n**Key Catalysts**:\n- Binance listing rumored for Q3 2026\n- ShadowChat user growth +340% YoY\n- DAO treasury buyback program starting June\n\n⚠️ This is not financial advice. Always DYOR.",
  "how to earn more rewards":
    "💰 **Maximize Your Earnings**\n\n**Daily Actions** (est. +$12/day):\n1. ✅ Daily check-in — 50 SKY4444\n2. 📝 Post content — 0.001 SKY/view\n3. 🎮 Play charity games — up to 200 SKY/day\n4. 💬 Engage in community — 10 SKY/interaction\n\n**Passive Income** (est. +$84/month):\n1. 🌾 Stake in SKY4444/USDT farm — 124.5% APY\n2. 🔒 Lock SKY4444 for 12 months — 18% APY\n3. 🎯 Referral program — 5% of referee earnings forever\n\n**Total potential**: $2,500+/month with $10K invested",
};

const QUICK_PROMPTS = [
  "What should I buy today?",
  "Explain DeFi yield farming",
  "How do I mint an NFT?",
  "Best staking options",
  "How to use the P2P exchange",
  "Explain SKY4444 tokenomics",
  "How to join a DAO",
  "IT services pricing",
  "How to list my project on IPO",
];

const AI_INSIGHTS = [
  {
    type: "buy",
    asset: "SKY4444",
    signal: "Strong Buy",
    confidence: 94,
    reason: "ICO momentum + exchange listing rumors",
  },
  {
    type: "hold",
    asset: "ETH",
    signal: "Hold",
    confidence: 78,
    reason: "Consolidating above $3,400 support",
  },
  {
    type: "sell",
    asset: "PEPE",
    signal: "Take Profit",
    confidence: 82,
    reason: "Up 42% in 7 days — reduce exposure",
  },
  {
    type: "buy",
    asset: "SOL",
    signal: "Buy Dip",
    confidence: 71,
    reason: "Pulled back to key support at $168",
  },
];

export default function ShadowCopilot() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<"chat" | "signals" | "alerts">("chat");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;
    const userMsg: Message = {
      id: Date.now(),
      role: "user",
      content: msg,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    await new Promise(r => setTimeout(r, 1200));

    const key = Object.keys(COPILOT_RESPONSES).find(k =>
      msg.toLowerCase().includes(k.toLowerCase())
    );
    const response = key
      ? COPILOT_RESPONSES[key]
      : `I understand you're asking about "${msg}". Let me analyze that...\n\nBased on current market conditions and your portfolio, I recommend staying diversified across SKY4444, BTC, and ETH while exploring the yield farming opportunities in ShadowFarm. Would you like me to dive deeper into any specific aspect?`;

    const botMsg: Message = {
      id: Date.now() + 1,
      role: "copilot",
      content: response,
      timestamp: new Date(),
      suggestions: ["Tell me more", "Show me how", "What are the risks?"],
    };
    setMessages(prev => [...prev, botMsg]);
    setLoading(false);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Brain className="h-6 w-6 text-violet-400" />
            ShadowCopilot
          </h1>
          <p className="text-sm text-muted-foreground">
            AI trading assistant — portfolio analysis, signals, and smart
            recommendations
          </p>
        </div>
        <Badge className="bg-green-500/10 text-green-400 border-green-500/20 text-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-green-400 inline-block mr-1.5 animate-pulse" />
          AI Online
        </Badge>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {(
          [
            ["chat", "💬 Chat"],
            ["signals", "📡 Signals"],
            ["alerts", "🔔 Alerts"],
          ] as const
        ).map(([t, label]) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${tab === t ? "bg-violet-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Chat */}
      {tab === "chat" && (
        <div className="space-y-3">
          {/* Quick Prompts */}
          <div className="flex gap-2 flex-wrap">
            {QUICK_PROMPTS.slice(0, 5).map(p => (
              <button
                key={p}
                onClick={() => sendMessage(p)}
                className="px-2.5 py-1 rounded-full text-xs bg-violet-500/10 text-violet-400 border border-violet-500/20 hover:bg-violet-500/20 transition-colors"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Messages */}
          <Card className="border-border/50">
            <CardContent className="p-0">
              <div className="h-96 overflow-y-auto p-4 space-y-4">
                <AnimatePresence>
                  {messages.map(msg => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                    >
                      <div
                        className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === "copilot" ? "bg-violet-500/20" : "bg-blue-500/20"}`}
                      >
                        {msg.role === "copilot" ? (
                          <Bot className="h-4 w-4 text-violet-400" />
                        ) : (
                          <span className="text-xs font-black text-blue-400">
                            U
                          </span>
                        )}
                      </div>
                      <div
                        className={`max-w-[80%] space-y-2 ${msg.role === "user" ? "items-end" : ""}`}
                      >
                        <div
                          className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${msg.role === "copilot" ? "bg-muted text-foreground" : "bg-violet-600 text-white"}`}
                        >
                          {msg.content}
                        </div>
                        {msg.suggestions && (
                          <div className="flex gap-1.5 flex-wrap">
                            {msg.suggestions.map(s => (
                              <button
                                key={s}
                                onClick={() => sendMessage(s)}
                                className="px-2.5 py-1 rounded-full text-xs bg-violet-500/10 text-violet-400 border border-violet-500/20 hover:bg-violet-500/20 transition-colors"
                              >
                                {s}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {loading && (
                  <div className="flex gap-2.5">
                    <div className="h-8 w-8 rounded-full bg-violet-500/20 flex items-center justify-center shrink-0">
                      <Bot className="h-4 w-4 text-violet-400" />
                    </div>
                    <div className="px-4 py-3 rounded-2xl bg-muted">
                      <div className="flex gap-1">
                        {[0, 1, 2].map(i => (
                          <div
                            key={i}
                            className="h-2 w-2 rounded-full bg-violet-400 animate-bounce"
                            style={{ animationDelay: `${i * 0.15}s` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>
              <div className="border-t border-border/50 p-3 flex gap-2">
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && sendMessage()}
                  placeholder="Ask ShadowCopilot anything..."
                  className="flex-1 h-10 px-4 rounded-xl bg-muted text-sm border border-border/50 focus:outline-none focus:border-violet-500/40"
                />
                <Button
                  className="h-10 w-10 p-0 bg-violet-600 text-white border-0"
                  onClick={() => sendMessage()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Signals */}
      {tab === "signals" && (
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground">
            AI-generated trading signals — updated every 15 minutes
          </p>
          {AI_INSIGHTS.map((insight, i) => (
            <motion.div
              key={insight.asset}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <Card className="border-border/50 hover:border-violet-500/20 transition-all">
                <CardContent className="py-3 px-4 flex items-center gap-3">
                  <div
                    className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${insight.type === "buy" ? "bg-green-500/10" : insight.type === "sell" ? "bg-red-500/10" : "bg-yellow-500/10"}`}
                  >
                    {insight.type === "buy" ? (
                      <TrendingUp className="h-5 w-5 text-green-400" />
                    ) : insight.type === "sell" ? (
                      <TrendingDown className="h-5 w-5 text-red-400" />
                    ) : (
                      <Target className="h-5 w-5 text-yellow-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-black text-sm">{insight.asset}</p>
                      <Badge
                        className={`text-xs border-0 ${insight.type === "buy" ? "bg-green-500/10 text-green-400" : insight.type === "sell" ? "bg-red-500/10 text-red-400" : "bg-yellow-500/10 text-yellow-400"}`}
                      >
                        {insight.signal}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {insight.reason}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-black text-sm text-violet-400">
                      {insight.confidence}%
                    </p>
                    <p className="text-xs text-muted-foreground">confidence</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Alerts */}
      {tab === "alerts" && (
        <div className="space-y-3">
          {[
            {
              icon: AlertTriangle,
              color: "text-yellow-400",
              bg: "bg-yellow-500/10",
              title: "SKY4444 approaching resistance",
              desc: "Price at $0.0842 — key resistance at $0.09. Consider taking partial profits.",
              time: "2 min ago",
            },
            {
              icon: TrendingUp,
              color: "text-green-400",
              bg: "bg-green-500/10",
              title: "Farm APY increased",
              desc: "SKY4444/USDT farm APY jumped from 98% to 124.5% — great time to add liquidity.",
              time: "15 min ago",
            },
            {
              icon: CheckCircle,
              color: "text-blue-400",
              bg: "bg-blue-500/10",
              title: "Portfolio rebalance suggested",
              desc: "Your ETH allocation is below target. Consider buying $200 worth to rebalance.",
              time: "1 hr ago",
            },
            {
              icon: Star,
              color: "text-purple-400",
              bg: "bg-purple-500/10",
              title: "New ICO: SkyIT Token",
              desc: "SkyIT Token ICO is live — 71% funded. Early investors get 2x allocation bonus.",
              time: "3 hr ago",
            },
            {
              icon: Zap,
              color: "text-cyan-400",
              bg: "bg-cyan-500/10",
              title: "Staking rewards available",
              desc: "You have 142.8 SKY4444 in unclaimed staking rewards. Claim now to compound.",
              time: "6 hr ago",
            },
          ].map((alert, i) => {
            const Icon = alert.icon;
            return (
              <motion.div
                key={alert.title}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Card className="border-border/50 hover:border-violet-500/20 transition-all">
                  <CardContent className="py-3 px-4 flex items-start gap-3">
                    <div
                      className={`h-9 w-9 rounded-xl ${alert.bg} flex items-center justify-center shrink-0 mt-0.5`}
                    >
                      <Icon className={`h-4.5 w-4.5 ${alert.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-sm">{alert.title}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {alert.desc}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {alert.time}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      className="h-7 px-3 text-xs bg-muted text-muted-foreground border-0 shrink-0"
                      onClick={() => toast.info("Alert dismissed")}
                    >
                      Dismiss
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
