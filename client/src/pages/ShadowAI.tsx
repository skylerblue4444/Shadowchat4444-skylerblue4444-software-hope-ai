import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Send,
  Image,
  Code,
  Music,
  Video,
  Mic,
  Sparkles,
  Zap,
  Copy,
  RefreshCw,
  Star,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

type Message = { role: "user" | "assistant"; content: string; timestamp: Date };

const AI_TOOLS = [
  {
    id: "chat",
    name: "ShadowGPT",
    desc: "Crypto-aware AI assistant",
    emoji: "🤖",
    color: "purple",
  },
  {
    id: "image",
    name: "ShadowArt",
    desc: "AI image generation",
    emoji: "🎨",
    color: "pink",
  },
  {
    id: "code",
    name: "ShadowCode",
    desc: "Smart contract & code gen",
    emoji: "💻",
    color: "blue",
  },
  {
    id: "trade",
    name: "ShadowSignal",
    desc: "AI trading signals & analysis",
    emoji: "📈",
    color: "green",
  },
  {
    id: "music",
    name: "ShadowBeat",
    desc: "AI music & audio generation",
    emoji: "🎵",
    color: "orange",
  },
  {
    id: "voice",
    name: "ShadowVoice",
    desc: "AI voice cloning & TTS",
    emoji: "🎙️",
    color: "red",
  },
];

const QUICK_PROMPTS = [
  "What's the best entry point for SKY4444 right now?",
  "Write a Solidity ERC-20 token contract",
  "Summarize the latest crypto market news",
  "Create a DeFi yield farming strategy",
  "Generate a professional IT proposal for managed services",
];

const MOCK_RESPONSES: Record<string, string> = {
  "What's the best entry point for SKY4444 right now?":
    "Based on current market analysis, SKY4444 is showing strong support at $0.044 with RSI at 42 (oversold territory). The 50-day MA is acting as resistance at $0.052. A good entry strategy would be to DCA between $0.040–$0.046, with a stop-loss at $0.035 and a target of $0.088 (2x) based on the current bull cycle. Volume has increased 44% in the last 24 hours, suggesting accumulation. Remember: this is not financial advice — always DYOR.",
  "Write a Solidity ERC-20 token contract":
    '```solidity\n// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\nimport "@openzeppelin/contracts/token/ERC20/ERC20.sol";\nimport "@openzeppelin/contracts/access/Ownable.sol";\n\ncontract SKY4444Token is ERC20, Ownable {\n    uint256 public constant MAX_SUPPLY = 444_444_444 * 10**18;\n    \n    constructor() ERC20("SKY4444", "SKY") Ownable(msg.sender) {\n        _mint(msg.sender, MAX_SUPPLY);\n    }\n    \n    function burn(uint256 amount) external {\n        _burn(msg.sender, amount);\n    }\n}\n```\nThis is a production-ready ERC-20 token with a fixed supply of 444,444,444 SKY4444 tokens, burn functionality, and OpenZeppelin\'s battle-tested security.',
};

export default function ShadowAI() {
  const [activeTool, setActiveTool] = useState("chat");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "👋 I'm ShadowGPT — your crypto-aware AI assistant. I can help with trading analysis, smart contracts, DeFi strategies, IT proposals, and anything else. What can I help you with today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [imagePrompt, setImagePrompt] = useState("");
  const [codePrompt, setCodePrompt] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text?: string) => {
    const msg = text || input;
    if (!msg.trim()) return;
    setInput("");
    const userMsg: Message = {
      role: "user",
      content: msg,
      timestamp: new Date(),
    };
    setMessages(m => [...m, userMsg]);
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    const response =
      MOCK_RESPONSES[msg] ||
      `Great question about "${msg}"! As your crypto AI assistant, I can analyze this in depth. Based on current market conditions and the ShadowChat ecosystem, here's my analysis:\n\n1. **Market Context**: The current macro environment is favorable for crypto assets, with institutional adoption accelerating.\n\n2. **SKY4444 Specific**: Our token is positioned uniquely at the intersection of social-fi, DeFi, and IT services — a rare combination.\n\n3. **Recommendation**: Consider diversifying across SKY4444, TRUMP, and BTC for a balanced crypto portfolio.\n\nWould you like me to dive deeper into any specific aspect?`;
    setMessages(m => [
      ...m,
      { role: "assistant", content: response, timestamp: new Date() },
    ]);
    setLoading(false);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-purple-400" />
            ShadowAI
          </h1>
          <p className="text-sm text-muted-foreground">
            Your crypto-aware AI suite — chat, create, trade, code
          </p>
        </div>
        <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20 font-bold">
          ⚡ GPT-4.1 Powered
        </Badge>
      </div>

      {/* Tool Selector */}
      <div className="grid grid-cols-3 gap-2">
        {AI_TOOLS.map(tool => (
          <motion.button
            key={tool.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTool(tool.id)}
            className={`p-2.5 rounded-xl border text-left transition-all ${activeTool === tool.id ? "border-purple-500/50 bg-purple-900/10" : "border-border/50 bg-muted/30"}`}
          >
            <p className="text-xl mb-0.5">{tool.emoji}</p>
            <p className="font-bold text-xs">{tool.name}</p>
            <p className="text-xs text-muted-foreground leading-tight">
              {tool.desc}
            </p>
          </motion.button>
        ))}
      </div>

      {activeTool === "chat" && (
        <div className="space-y-3">
          {/* Quick Prompts */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {QUICK_PROMPTS.map(p => (
              <button
                key={p}
                onClick={() => sendMessage(p)}
                className="shrink-0 px-3 py-1.5 rounded-full bg-muted text-xs text-muted-foreground hover:bg-muted/80 transition-colors whitespace-nowrap"
              >
                {p.length > 30 ? p.slice(0, 30) + "..." : p}
              </button>
            ))}
          </div>

          {/* Chat Messages */}
          <Card className="border-border/50">
            <CardContent className="py-3 px-3">
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                    <div
                      className={`h-7 w-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${msg.role === "assistant" ? "bg-purple-600 text-white" : "bg-blue-600 text-white"}`}
                    >
                      {msg.role === "assistant" ? "AI" : "SB"}
                    </div>
                    <div
                      className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs ${msg.role === "assistant" ? "bg-muted" : "bg-blue-600 text-white"}`}
                    >
                      <pre className="whitespace-pre-wrap font-sans">
                        {msg.content}
                      </pre>
                    </div>
                  </motion.div>
                ))}
                {loading && (
                  <div className="flex gap-2">
                    <div className="h-7 w-7 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                      AI
                    </div>
                    <div className="bg-muted rounded-2xl px-3 py-2">
                      <div className="flex gap-1">
                        {[0, 1, 2].map(i => (
                          <div
                            key={i}
                            className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-bounce"
                            style={{ animationDelay: `${i * 0.15}s` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </CardContent>
          </Card>

          {/* Input */}
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              placeholder="Ask ShadowGPT anything..."
              className="flex-1 h-10 text-xs"
            />
            <Button
              className="h-10 w-10 p-0 bg-purple-600 text-white border-0 shrink-0"
              onClick={() => sendMessage()}
              disabled={loading}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {activeTool === "image" && (
        <div className="space-y-3">
          <Card className="border-pink-500/20 bg-pink-900/5">
            <CardContent className="py-4 px-4 space-y-3">
              <p className="font-bold text-sm">
                🎨 ShadowArt — AI Image Generator
              </p>
              <Input
                value={imagePrompt}
                onChange={e => setImagePrompt(e.target.value)}
                placeholder="Describe your image... e.g. 'SKY4444 coin flying to moon, cyberpunk style'"
                className="h-9 text-xs"
              />
              <div className="flex gap-2 flex-wrap">
                {["Cyberpunk", "Anime", "Realistic", "NFT Art", "Logo"].map(
                  style => (
                    <button
                      key={style}
                      onClick={() => setImagePrompt(p => p + ` ${style} style`)}
                      className="px-3 py-1 rounded-full bg-muted text-xs hover:bg-muted/80 transition-colors"
                    >
                      {style}
                    </button>
                  )
                )}
              </div>
              <Button
                className="w-full h-10 text-xs bg-pink-600 text-white border-0 font-bold"
                onClick={() =>
                  toast.success("🎨 Generating image... (2 SKY4444 charged)")
                }
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Generate Image — 2 SKY4444
              </Button>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "https://images.unsplash.com/photo-1634193295627-1cdddf751ebf?w=200&q=80",
                  "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=200&q=80",
                ].map((img, i) => (
                  <div key={i} className="relative rounded-xl overflow-hidden">
                    <img
                      src={img}
                      alt="AI Generated"
                      className="w-full h-28 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-1.5 flex gap-1">
                      <Button
                        size="sm"
                        className="flex-1 h-6 text-xs bg-pink-600 text-white border-0 p-0"
                        onClick={() => toast.success("Image downloaded!")}
                      >
                        Save
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 h-6 text-xs bg-purple-600 text-white border-0 p-0"
                        onClick={() => toast.success("Minting as NFT...")}
                      >
                        Mint NFT
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTool === "code" && (
        <div className="space-y-3">
          <Card className="border-blue-500/20 bg-blue-900/5">
            <CardContent className="py-4 px-4 space-y-3">
              <p className="font-bold text-sm">
                💻 ShadowCode — Smart Contract Generator
              </p>
              <Input
                value={codePrompt}
                onChange={e => setCodePrompt(e.target.value)}
                placeholder="Describe your smart contract... e.g. 'ERC-20 token with staking'"
                className="h-9 text-xs"
              />
              <div className="flex gap-2 flex-wrap">
                {[
                  "ERC-20 Token",
                  "NFT Contract",
                  "Staking Pool",
                  "DAO Voting",
                  "DEX Pair",
                ].map(template => (
                  <button
                    key={template}
                    onClick={() => setCodePrompt(template)}
                    className="px-3 py-1 rounded-full bg-muted text-xs hover:bg-muted/80 transition-colors"
                  >
                    {template}
                  </button>
                ))}
              </div>
              <Button
                className="w-full h-10 text-xs bg-blue-600 text-white border-0 font-bold"
                onClick={() =>
                  sendMessage(
                    `Write a Solidity ${codePrompt || "ERC-20 token"} contract`
                  )
                }
              >
                <Code className="h-4 w-4 mr-2" />
                Generate Contract
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {(activeTool === "trade" ||
        activeTool === "music" ||
        activeTool === "voice") && (
        <Card className="border-border/50 text-center py-10">
          <p className="text-3xl mb-2">
            {AI_TOOLS.find(t => t.id === activeTool)?.emoji}
          </p>
          <p className="font-bold text-sm">
            {AI_TOOLS.find(t => t.id === activeTool)?.name}
          </p>
          <p className="text-xs text-muted-foreground mb-3">
            {AI_TOOLS.find(t => t.id === activeTool)?.desc}
          </p>
          <Button
            size="sm"
            className="h-9 text-xs bg-purple-600 text-white border-0"
            onClick={() => toast.info("Launching tool...")}
          >
            <Zap className="h-3.5 w-3.5 mr-1.5" />
            Launch Tool
          </Button>
        </Card>
      )}
    </div>
  );
}
