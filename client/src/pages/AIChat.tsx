import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Send,
  Plus,
  Trash2,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Zap,
  Coins,
  Star,
  RefreshCw,
  Mic,
  Paperclip,
  ChevronDown,
  Settings,
  Sparkles,
  Code,
  BarChart2,
  Globe,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  liked?: boolean;
}

const STARTER_PROMPTS = [
  {
    icon: "📈",
    text: "Analyze SKY4444 tokenomics and give me a price prediction",
  },
  { icon: "🔐", text: "How do I secure my crypto wallet from hackers?" },
  { icon: "💎", text: "Explain DeFi yield farming in simple terms" },
  { icon: "🤖", text: "Write a Solidity smart contract for an NFT collection" },
  { icon: "🌍", text: "What are the best countries for crypto regulation?" },
  {
    icon: "📊",
    text: "Create a crypto portfolio allocation strategy for $10,000",
  },
];

const MODELS = [
  {
    id: "shadow-ai",
    name: "ShadowAI Pro",
    desc: "Crypto-specialized, fastest",
    emoji: "⚡",
  },
  {
    id: "gpt4",
    name: "GPT-4.1",
    desc: "General purpose, powerful",
    emoji: "🤖",
  },
  {
    id: "gemini",
    name: "Gemini Ultra",
    desc: "Multimodal, research-focused",
    emoji: "🌟",
  },
  {
    id: "claude",
    name: "Claude 3.5",
    desc: "Analytical, long context",
    emoji: "🧠",
  },
];

const MOCK_RESPONSES: Record<string, string> = {
  default: `I'm **ShadowAI Pro**, your crypto-native AI assistant! I'm specialized in:

- **Crypto & DeFi** — tokenomics, yield strategies, protocol analysis
- **Web3 Development** — Solidity, smart contracts, dApp architecture
- **SKY4444 & ShadowChat** — platform features, ICO details, roadmap
- **Trading** — technical analysis, risk management, portfolio optimization
- **IT Solutions** — Skyler Blue's managed IT services, cybersecurity

What would you like to explore today? 🚀`,
  sky4444: `## SKY4444 Token Analysis

**Current Status:** ICO Phase 2 Active
**Token Price:** $0.044 (ICO) | $0.12 (Market)
**Total Supply:** 444,444,444 SKY4444

### Tokenomics Breakdown:
| Allocation | % | Vesting |
|---|---|---|
| Public Sale | 40% | Immediate |
| Team | 15% | 2yr cliff, 4yr vest |
| Ecosystem | 25% | 4yr linear |
| Treasury | 10% | DAO controlled |
| Marketing | 10% | 1yr linear |

### Price Prediction (Not Financial Advice):
- **Q3 2025:** $0.25–$0.40 (exchange listings)
- **Q4 2025:** $0.80–$1.20 (platform launch)
- **2026:** $2.00–$5.00 (ecosystem growth)

The key catalysts are the ShadowChat platform launch, DEX listings, and the charity gaming viral loop. 🚀`,
};

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: MOCK_RESPONSES.default,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState("shadow-ai");
  const [showModels, setShowModels] = useState(false);
  const [conversations, setConversations] = useState([
    { id: "c1", title: "SKY4444 Analysis", date: "Today" },
    { id: "c2", title: "DeFi Strategy", date: "Yesterday" },
    { id: "c3", title: "Smart Contract Help", date: "May 12" },
  ]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    // Simulate streaming response
    const responseKey =
      input.toLowerCase().includes("sky4444") ||
      input.toLowerCase().includes("token")
        ? "sky4444"
        : "default";
    const fullResponse = MOCK_RESPONSES[responseKey] || MOCK_RESPONSES.default;

    await new Promise(r => setTimeout(r, 800));
    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: fullResponse,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, aiMsg]);
    setLoading(false);
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success("Copied to clipboard!");
  };

  const selectedModel = MODELS.find(m => m.id === model)!;

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-4">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "w-56" : "w-0 overflow-hidden"} transition-all duration-300 shrink-0`}
      >
        <Card className="border-border/50 h-full">
          <CardContent className="p-3 flex flex-col h-full">
            <Button
              size="sm"
              className="w-full bg-blue-600 text-white border-0 mb-3 h-8 text-xs"
              onClick={() => {
                setMessages([
                  {
                    id: "new",
                    role: "assistant",
                    content: MOCK_RESPONSES.default,
                    timestamp: new Date(),
                  },
                ]);
                toast.success("New conversation started");
              }}
            >
              <Plus className="h-3.5 w-3.5 mr-1.5" />
              New Chat
            </Button>
            <div className="space-y-1 flex-1 overflow-y-auto">
              {conversations.map(conv => (
                <button
                  key={conv.id}
                  className="w-full text-left px-2 py-2 rounded-lg hover:bg-muted/40 transition-colors"
                >
                  <p className="text-xs font-medium truncate">{conv.title}</p>
                  <p className="text-xs text-muted-foreground">{conv.date}</p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Chat */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="flex items-center gap-2 mb-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="h-8 w-8 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:text-white transition-colors"
          >
            <Bot className="h-4 w-4" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-black flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-blue-400" />
              ShadowAI Assistant
            </h1>
          </div>
          {/* Model Selector */}
          <div className="relative">
            <button
              onClick={() => setShowModels(!showModels)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-muted border border-border/30 text-xs font-medium hover:border-blue-500/30 transition-colors"
            >
              <span>{selectedModel.emoji}</span>
              <span>{selectedModel.name}</span>
              <ChevronDown className="h-3 w-3" />
            </button>
            {showModels && (
              <div className="absolute right-0 top-full mt-1 w-56 bg-card border border-border/50 rounded-xl shadow-xl z-50 overflow-hidden">
                {MODELS.map(m => (
                  <button
                    key={m.id}
                    onClick={() => {
                      setModel(m.id);
                      setShowModels(false);
                    }}
                    className={`w-full flex items-center gap-2 px-3 py-2.5 text-left hover:bg-muted/40 transition-colors ${model === m.id ? "bg-blue-500/10" : ""}`}
                  >
                    <span className="text-lg">{m.emoji}</span>
                    <div>
                      <p className="text-xs font-bold">{m.name}</p>
                      <p className="text-xs text-muted-foreground">{m.desc}</p>
                    </div>
                    {model === m.id && (
                      <span className="ml-auto text-blue-400 text-xs">✓</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-1">
          {messages.length === 1 && (
            <div className="grid grid-cols-2 gap-2 mb-4">
              {STARTER_PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setInput(prompt.text);
                  }}
                  className="p-3 rounded-xl bg-muted/20 border border-border/30 text-left hover:bg-muted/40 hover:border-blue-500/20 transition-all"
                >
                  <span className="text-xl">{prompt.icon}</span>
                  <p className="text-xs text-muted-foreground mt-1">
                    {prompt.text}
                  </p>
                </button>
              ))}
            </div>
          )}

          {messages.map((msg, i) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center text-sm shrink-0 ${msg.role === "assistant" ? "bg-blue-600" : "bg-gradient-to-br from-purple-600 to-blue-600"}`}
              >
                {msg.role === "assistant" ? (
                  <Bot className="h-4 w-4 text-white" />
                ) : (
                  "⚡"
                )}
              </div>
              <div
                className={`flex-1 max-w-[80%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}
              >
                <div
                  className={`px-4 py-3 rounded-2xl text-sm ${msg.role === "user" ? "bg-blue-600 text-white rounded-tr-sm" : "bg-muted/40 border border-border/30 rounded-tl-sm"}`}
                >
                  <div
                    className="whitespace-pre-wrap leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: msg.content
                        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                        .replace(/\n/g, "<br/>"),
                    }}
                  />
                </div>
                {msg.role === "assistant" && (
                  <div className="flex gap-1">
                    <button
                      onClick={() => copyMessage(msg.content)}
                      className="h-6 w-6 rounded-lg bg-muted/20 flex items-center justify-center text-muted-foreground hover:text-white transition-colors"
                    >
                      <Copy className="h-3 w-3" />
                    </button>
                    <button className="h-6 w-6 rounded-lg bg-muted/20 flex items-center justify-center text-muted-foreground hover:text-green-400 transition-colors">
                      <ThumbsUp className="h-3 w-3" />
                    </button>
                    <button className="h-6 w-6 rounded-lg bg-muted/20 flex items-center justify-center text-muted-foreground hover:text-red-400 transition-colors">
                      <ThumbsDown className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => toast.info("Regenerating...")}
                      className="h-6 w-6 rounded-lg bg-muted/20 flex items-center justify-center text-muted-foreground hover:text-white transition-colors"
                    >
                      <RefreshCw className="h-3 w-3" />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {loading && (
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="px-4 py-3 rounded-2xl bg-muted/40 border border-border/30 rounded-tl-sm">
                <div className="flex gap-1">
                  {[0, 1, 2].map(i => (
                    <motion.div
                      key={i}
                      className="h-2 w-2 rounded-full bg-blue-400"
                      animate={{ y: [0, -6, 0] }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: i * 0.15,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="relative">
          <div className="flex items-end gap-2 p-3 rounded-2xl bg-muted/30 border border-border/50">
            <button
              className="text-muted-foreground hover:text-white transition-colors mb-1"
              onClick={() => toast.info("Voice input coming soon...")}
            >
              <Mic className="h-5 w-5" />
            </button>
            <button
              className="text-muted-foreground hover:text-white transition-colors mb-1"
              onClick={() => toast.info("File upload coming soon...")}
            >
              <Paperclip className="h-5 w-5" />
            </button>
            <textarea
              className="flex-1 bg-transparent text-sm resize-none focus:outline-none max-h-32 min-h-[24px]"
              placeholder="Ask ShadowAI anything about crypto, Web3, IT, or SKY4444..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              rows={1}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              className={`h-8 w-8 rounded-xl flex items-center justify-center transition-colors ${input.trim() && !loading ? "bg-blue-600 text-white" : "bg-muted text-muted-foreground"}`}
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
          <p className="text-xs text-center text-muted-foreground mt-1">
            ShadowAI may make mistakes. Verify important information. Not
            financial advice.
          </p>
        </div>
      </div>
    </div>
  );
}
