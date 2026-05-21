import { useState } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  TrendingUp,
  DollarSign,
  Target,
  Shield,
  Zap,
  BarChart3,
  PieChart,
  ArrowUpRight,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const PORTFOLIO = [
  {
    asset: "SKY4444",
    allocation: 35,
    value: "$15,554",
    change: "+444%",
    color: "#6366f1",
  },
  {
    asset: "TRUMP",
    allocation: 20,
    value: "$8,888",
    change: "+188%",
    color: "#ef4444",
  },
  {
    asset: "Bitcoin",
    allocation: 25,
    value: "$11,110",
    change: "+44%",
    color: "#f59e0b",
  },
  {
    asset: "Ethereum",
    allocation: 10,
    value: "$4,444",
    change: "+22%",
    color: "#6366f1",
  },
  {
    asset: "Stablecoins",
    allocation: 10,
    value: "$4,444",
    change: "+5%",
    color: "#22c55e",
  },
];

const AI_INSIGHTS = [
  {
    title: "Rebalance Opportunity",
    desc: "SKY4444 is overweight by 5%. Consider taking profits and adding to BTC.",
    action: "Rebalance",
    priority: "high",
    icon: "⚖️",
  },
  {
    title: "Tax Loss Harvest",
    desc: "DOGE position has $444 unrealized loss. Harvest before Dec 31 to offset gains.",
    action: "Harvest",
    priority: "medium",
    icon: "💰",
  },
  {
    title: "Yield Opportunity",
    desc: "Your stablecoins are idle. Deploy to ShadowDeFiYield for 18.4% APY.",
    action: "Deploy",
    priority: "high",
    icon: "⚡",
  },
  {
    title: "Dollar Cost Average",
    desc: "BTC is down 8% this week. AI recommends DCA $500 now.",
    action: "DCA Now",
    priority: "medium",
    icon: "📈",
  },
];

const GOALS = [
  {
    name: "Retire at 40",
    target: "$1,000,000",
    current: "$44,440",
    pct: 4.4,
    color: "#6366f1",
  },
  {
    name: "Buy a House",
    target: "$100,000",
    current: "$44,440",
    pct: 44.4,
    color: "#22c55e",
  },
  {
    name: "SKY4444 Millionaire",
    target: "1,000,000 SKY",
    current: "444,444 SKY",
    pct: 44.4,
    color: "#f59e0b",
  },
];

export default function ShadowAIWealth() {
  const [tab, setTab] = useState<"overview" | "insights" | "goals" | "advisor">(
    "overview"
  );
  const [chatMessages, setChatMessages] = useState([
    {
      role: "ai",
      text: "Hello! I'm your ShadowAI Wealth Advisor. I've analyzed your portfolio and have 4 actionable insights ready. What would you like to discuss?",
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setChatInput("");
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    const responses: Record<string, string> = {
      default:
        "Based on your current portfolio, I recommend maintaining your SKY4444 position while diversifying into BTC. Your risk score is 7.2/10 — consider reducing to 6.5 by adding more stablecoins.",
      sky4444:
        "SKY4444 is your best performer at +444%. I recommend holding 30-35% allocation. The ICO is still early — price target of $0.444 by Q4 2026 based on tokenomics.",
      bitcoin:
        "BTC is in a bull cycle. Your 25% allocation is optimal. Consider adding on dips below $90K. Long-term target: $250K by 2027.",
      tax: "You have $2,444 in harvestable losses this year. Harvesting now would save approximately $611 in taxes at 25% rate. Shall I execute the harvest?",
    };
    const key =
      Object.keys(responses).find(k => userMsg.toLowerCase().includes(k)) ||
      "default";
    setChatMessages(prev => [...prev, { role: "ai", text: responses[key] }]);
    setLoading(false);
  };

  const totalValue = 44440;
  const totalGain = 18888;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Brain className="h-6 w-6 text-purple-400" />
            AI Wealth Manager
          </h1>
          <p className="text-sm text-muted-foreground">
            AI-powered portfolio optimization and financial planning
          </p>
        </div>
        <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20 font-bold">
          AI Pro
        </Badge>
      </div>

      <Card className="border-purple-500/20 bg-gradient-to-br from-purple-900/10 to-blue-900/5">
        <CardContent className="py-4 px-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs text-muted-foreground">
                Total Portfolio Value
              </p>
              <p className="font-black text-2xl text-purple-400">
                ${totalValue.toLocaleString()}
              </p>
              <p className="text-xs text-green-400 font-bold">
                +${totalGain.toLocaleString()} (+73.8%) all time
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">AI Risk Score</p>
              <p className="font-black text-2xl text-yellow-400">7.2/10</p>
              <p className="text-xs text-muted-foreground">Moderate-High</p>
            </div>
          </div>
          <div className="flex gap-1 h-3 rounded-full overflow-hidden">
            {PORTFOLIO.map(p => (
              <div
                key={p.asset}
                className="h-full rounded-sm"
                style={{ width: `${p.allocation}%`, backgroundColor: p.color }}
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {PORTFOLIO.map(p => (
              <div key={p.asset} className="flex items-center gap-1">
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: p.color }}
                />
                <span className="text-xs text-muted-foreground">
                  {p.asset} {p.allocation}%
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-2">
        {(["overview", "insights", "goals", "advisor"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-purple-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="space-y-2">
          {PORTFOLIO.map((asset, i) => (
            <motion.div
              key={asset.asset}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <Card className="border-border/50">
                <CardContent className="py-3 px-4 flex items-center gap-3">
                  <div
                    className="h-9 w-9 rounded-full flex items-center justify-center shrink-0 font-black text-xs text-white"
                    style={{ backgroundColor: asset.color }}
                  >
                    {asset.asset.slice(0, 2)}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{asset.asset}</p>
                    <div className="h-1.5 bg-muted rounded-full mt-1 overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${asset.allocation}%`,
                          backgroundColor: asset.color,
                        }}
                      />
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-sm">{asset.value}</p>
                    <p className="text-xs font-bold text-green-400">
                      {asset.change}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "insights" && (
        <div className="space-y-3">
          {AI_INSIGHTS.map((insight, i) => (
            <motion.div
              key={insight.title}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Card
                className={`border ${insight.priority === "high" ? "border-orange-500/20 bg-orange-900/5" : "border-border/50"}`}
              >
                <CardContent className="py-3 px-4 space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-xl shrink-0">{insight.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-sm">{insight.title}</p>
                        <Badge
                          className={`text-xs ${insight.priority === "high" ? "bg-orange-500/10 text-orange-400 border-orange-500/20" : "bg-blue-500/10 text-blue-400 border-blue-500/20"}`}
                        >
                          {insight.priority}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {insight.desc}
                      </p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="w-full h-8 text-xs font-bold bg-purple-600 text-white border-0"
                    onClick={() =>
                      toast.success(`Executing: ${insight.action}...`)
                    }
                  >
                    <Sparkles className="h-3.5 w-3.5 mr-1" />
                    {insight.action}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "goals" && (
        <div className="space-y-3">
          {GOALS.map((goal, i) => (
            <Card key={goal.name} className="border-border/50">
              <CardContent className="py-3 px-4 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-sm">{goal.name}</p>
                  <p
                    className="text-xs font-bold"
                    style={{ color: goal.color }}
                  >
                    {goal.pct}%
                  </p>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: goal.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${goal.pct}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{goal.current}</span>
                  <span>Target: {goal.target}</span>
                </div>
              </CardContent>
            </Card>
          ))}
          <Button
            className="w-full h-10 text-xs bg-purple-600 text-white border-0 font-bold"
            onClick={() => toast.success("Opening goal creator...")}
          >
            <Target className="h-4 w-4 mr-2" />
            Add Financial Goal
          </Button>
        </div>
      )}

      {tab === "advisor" && (
        <Card className="border-purple-500/20 bg-purple-900/5">
          <CardContent className="py-3 px-4 space-y-3">
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3 py-2 text-xs ${msg.role === "user" ? "bg-purple-600 text-white" : "bg-muted text-foreground"}`}
                  >
                    {msg.role === "ai" && (
                      <p className="font-bold text-purple-400 text-xs mb-0.5">
                        ShadowAI Advisor
                      </p>
                    )}
                    {msg.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-2xl px-3 py-2 text-xs">
                    <motion.span
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                    >
                      Analyzing your portfolio...
                    </motion.span>
                  </div>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <input
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && sendMessage()}
                placeholder="Ask about SKY4444, taxes, rebalancing..."
                className="flex-1 h-9 rounded-xl border border-border bg-background px-3 text-xs focus:outline-none"
              />
              <Button
                className="h-9 px-3 text-xs bg-purple-600 text-white border-0 font-bold"
                onClick={sendMessage}
                disabled={loading}
              >
                {loading ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <ArrowUpRight className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
