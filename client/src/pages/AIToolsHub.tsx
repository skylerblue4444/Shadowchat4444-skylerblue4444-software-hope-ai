import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bot,
  Image,
  Code,
  Music,
  Video,
  Globe,
  Mic,
  FileText,
  TrendingUp,
  Zap,
  Star,
  ChevronRight,
  Sparkles,
  Brain,
  MessageSquare,
  Camera,
  Wand2,
  Shield,
  BarChart2,
  Coins,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const AI_TOOLS = [
  {
    id: "chat",
    name: "ShadowAI Chat",
    desc: "GPT-4 powered assistant for crypto, IT, and business questions",
    icon: MessageSquare,
    color: "from-blue-500 to-cyan-500",
    category: "Chat",
    free: true,
    uses: "2.4M",
    rating: 4.9,
    badge: "Popular",
  },
  {
    id: "image",
    name: "AI Image Generator",
    desc: "Create stunning NFT art, logos, and marketing visuals from text",
    icon: Image,
    color: "from-pink-500 to-purple-500",
    category: "Creative",
    free: false,
    uses: "840K",
    rating: 4.8,
    badge: "Pro",
  },
  {
    id: "code",
    name: "AI Code Assistant",
    desc: "Write, debug, and optimize smart contracts and web3 code",
    icon: Code,
    color: "from-green-500 to-emerald-500",
    category: "Dev",
    free: true,
    uses: "1.2M",
    rating: 4.7,
    badge: null,
  },
  {
    id: "trading",
    name: "AI Trading Bot",
    desc: "Automated trading signals for TRUMP, SKY4444, BTC, ETH",
    icon: TrendingUp,
    color: "from-yellow-500 to-orange-500",
    category: "Finance",
    free: false,
    uses: "320K",
    rating: 4.6,
    badge: "New",
  },
  {
    id: "translate",
    name: "AI Translator",
    desc: "Real-time translation for 100+ languages including Chinese, Arabic",
    icon: Globe,
    color: "from-indigo-500 to-blue-500",
    category: "Language",
    free: true,
    uses: "1.8M",
    rating: 4.8,
    badge: null,
  },
  {
    id: "voice",
    name: "AI Voice Clone",
    desc: "Clone any voice for content creation and accessibility",
    icon: Mic,
    color: "from-red-500 to-pink-500",
    category: "Audio",
    free: false,
    uses: "180K",
    rating: 4.5,
    badge: "Pro",
  },
  {
    id: "music",
    name: "AI Music Composer",
    desc: "Generate original music tracks for videos and streams",
    icon: Music,
    color: "from-purple-500 to-pink-500",
    category: "Creative",
    free: false,
    uses: "240K",
    rating: 4.7,
    badge: null,
  },
  {
    id: "summarize",
    name: "AI Document Summarizer",
    desc: "Summarize whitepapers, contracts, and reports instantly",
    icon: FileText,
    color: "from-teal-500 to-green-500",
    category: "Productivity",
    free: true,
    uses: "920K",
    rating: 4.6,
    badge: null,
  },
  {
    id: "avatar",
    name: "AI Avatar Builder",
    desc: "Create your personalized Web3 avatar and profile picture",
    icon: Camera,
    color: "from-orange-500 to-red-500",
    category: "Creative",
    free: false,
    uses: "560K",
    rating: 4.9,
    badge: "Popular",
  },
  {
    id: "security",
    name: "AI Security Scanner",
    desc: "Scan smart contracts and wallets for vulnerabilities",
    icon: Shield,
    color: "from-gray-500 to-slate-500",
    category: "Security",
    free: true,
    uses: "480K",
    rating: 4.8,
    badge: null,
  },
  {
    id: "analytics",
    name: "AI Market Analyst",
    desc: "Deep market analysis and price predictions for any token",
    icon: BarChart2,
    color: "from-cyan-500 to-blue-500",
    category: "Finance",
    free: false,
    uses: "720K",
    rating: 4.7,
    badge: "Pro",
  },
  {
    id: "video",
    name: "AI Video Generator",
    desc: "Create short-form videos and reels from text prompts",
    icon: Video,
    color: "from-violet-500 to-purple-500",
    category: "Creative",
    free: false,
    uses: "290K",
    rating: 4.6,
    badge: "Beta",
  },
];

const CATEGORIES = [
  "All",
  "Chat",
  "Creative",
  "Dev",
  "Finance",
  "Language",
  "Audio",
  "Productivity",
  "Security",
];

const QUICK_PROMPTS = [
  "Analyze TRUMP token price trend",
  "Write a Solidity ERC-20 contract",
  "Create NFT art: cyberpunk city",
  "Translate to Chinese: Hello World",
  "Summarize Bitcoin whitepaper",
  "Generate trading signals for ETH",
];

export default function AIToolsHub() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [activeChat, setActiveChat] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "👋 Hi! I'm ShadowAI — your crypto, IT, and Web3 assistant. Ask me anything about trading, smart contracts, NFTs, or IT services!",
    },
  ]);

  const filtered = AI_TOOLS.filter(
    t =>
      (category === "All" || t.category === category) &&
      (t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.desc.toLowerCase().includes(search.toLowerCase()))
  );

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatInput("");
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          text: `Great question about "${userMsg}"! Based on my analysis of current market conditions and blockchain data, here's what I recommend: [AI response would be generated here using GPT-4 with real-time crypto data integration]. Would you like me to go deeper on any specific aspect?`,
        },
      ]);
    }, 1200);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Brain className="h-6 w-6 text-violet-400" />
            AI Tools Hub
          </h1>
          <p className="text-sm text-muted-foreground">
            12 AI-powered tools for crypto, creative, and business tasks
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-violet-500/10 text-violet-400 border-violet-500/20">
            <Coins className="h-3 w-3 mr-1" />
            SKY4444 credits: 8,400
          </Badge>
        </div>
      </div>

      {/* Quick Chat */}
      {!activeChat ? (
        <div
          className="p-4 rounded-2xl bg-gradient-to-r from-violet-950/40 to-blue-950/40 border border-violet-500/20 cursor-pointer"
          onClick={() => setActiveChat(true)}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-bold">ShadowAI Chat</p>
              <p className="text-xs text-muted-foreground">
                Powered by GPT-4 + Real-time crypto data
              </p>
            </div>
            <Badge className="ml-auto bg-green-500/10 text-green-400 border-green-500/20 text-xs">
              Online
            </Badge>
          </div>
          <div className="flex gap-2 flex-wrap">
            {QUICK_PROMPTS.slice(0, 4).map(p => (
              <button
                key={p}
                className="text-xs px-3 py-1.5 rounded-full bg-muted/40 border border-border/30 hover:border-violet-500/30 transition-colors text-left"
                onClick={e => {
                  e.stopPropagation();
                  setActiveChat(true);
                  setChatInput(p);
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <Card className="border-violet-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Bot className="h-5 w-5 text-violet-400" />
              <span className="font-bold text-sm">ShadowAI Chat</span>
              <button
                className="ml-auto text-xs text-muted-foreground hover:text-foreground"
                onClick={() => setActiveChat(false)}
              >
                Minimize
              </button>
            </div>
            <div className="space-y-3 max-h-64 overflow-y-auto mb-3">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-2xl text-sm ${msg.role === "user" ? "bg-violet-600 text-white" : "bg-muted/40 border border-border/30"}`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Ask ShadowAI anything..."
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && sendMessage()}
                className="flex-1"
              />
              <Button
                className="bg-violet-600 text-white border-0"
                size="sm"
                onClick={sendMessage}
              >
                <Zap className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search */}
      <div className="relative">
        <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-violet-400" />
        <Input
          placeholder="Search AI tools..."
          className="pl-9"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${category === cat ? "bg-violet-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((tool, i) => {
          const Icon = tool.icon;
          return (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
            >
              <Card
                className="border-border/50 hover:border-violet-500/20 transition-all hover:-translate-y-0.5 cursor-pointer group"
                onClick={() => toast.info(`Opening ${tool.name}`)}
              >
                <CardContent className="pt-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div
                      className={`h-11 w-11 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center shrink-0`}
                    >
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-sm">{tool.name}</p>
                        {tool.badge && (
                          <Badge
                            className={`text-xs shrink-0 ${tool.badge === "Pro" ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" : tool.badge === "Popular" ? "bg-red-500/10 text-red-400 border-red-500/20" : tool.badge === "New" ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-blue-500/10 text-blue-400 border-blue-500/20"}`}
                          >
                            {tool.badge}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                        {tool.desc}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-400" />
                      {tool.rating}
                    </span>
                    <span>{tool.uses} uses</span>
                    <Badge
                      className={`text-xs ${tool.free ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-muted text-muted-foreground"}`}
                    >
                      {tool.free ? "Free" : "SKY4444"}
                    </Badge>
                  </div>
                  <Button
                    className={`w-full h-8 text-xs bg-gradient-to-r ${tool.color} text-white border-0 font-bold group-hover:opacity-90 transition-opacity`}
                  >
                    <Wand2 className="h-3.5 w-3.5 mr-1.5" />
                    Launch Tool
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* AI Credits Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-yellow-950/30 to-orange-950/30 border border-yellow-500/20">
        <div className="flex items-center gap-3">
          <Coins className="h-8 w-8 text-yellow-400 shrink-0" />
          <div className="flex-1">
            <p className="font-bold">AI Credits System</p>
            <p className="text-sm text-muted-foreground">
              Use SKY4444 tokens to access premium AI tools. Earn credits by
              staking, trading, and creating content.
            </p>
          </div>
          <Button
            className="bg-yellow-500 text-black border-0 font-bold shrink-0"
            size="sm"
            onClick={() => toast.info("Opening staking to earn credits")}
          >
            Earn Credits
          </Button>
        </div>
      </div>
    </div>
  );
}
