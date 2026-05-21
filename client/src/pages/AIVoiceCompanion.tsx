import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Brain,
  Star,
  TrendingUp,
  Heart,
  Calendar,
  Coins,
  Zap,
  Settings,
  MessageCircle,
  ChevronRight,
  Sparkles,
  Bot,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const COMPANION_PERSONAS = [
  {
    id: "shadow",
    name: "Shadow",
    emoji: "🌑",
    desc: "Your default crypto-savvy AI companion",
    personality: "Direct, analytical, crypto-native",
  },
  {
    id: "aria",
    name: "Aria",
    emoji: "✨",
    desc: "Warm, empathetic life coach companion",
    personality: "Supportive, motivating, holistic",
  },
  {
    id: "rex",
    name: "Rex",
    emoji: "🦁",
    desc: "Bold trading strategist companion",
    personality: "Aggressive, confident, risk-tolerant",
  },
  {
    id: "luna",
    name: "Luna",
    emoji: "🌙",
    desc: "Calm, mindful wellness companion",
    personality: "Peaceful, balanced, health-focused",
  },
];

const QUICK_TOPICS = [
  {
    label: "Portfolio Update",
    emoji: "📊",
    prompt: "Give me a quick update on my portfolio",
  },
  {
    label: "Trading Advice",
    emoji: "📈",
    prompt: "What should I trade today?",
  },
  {
    label: "Dating Tips",
    emoji: "💘",
    prompt: "Help me write a great dating profile bio",
  },
  { label: "Daily Plan", emoji: "📅", prompt: "Help me plan my day" },
  {
    label: "Crypto News",
    emoji: "📰",
    prompt: "What's happening in crypto today?",
  },
  { label: "Motivation", emoji: "🔥", prompt: "Motivate me to reach my goals" },
];

const RESPONSES: Record<string, string[]> = {
  portfolio: [
    "Your portfolio is up 12.4% this week! SKY4444 is leading with +44%, TRUMP is up 18%. Your staking rewards added 444 SKY4444 today. Overall looking very bullish — I'd recommend holding your positions.",
    "Great news! Your total portfolio value is $47,832. BTC allocation is 35%, SKY4444 is 40%, TRUMP is 15%, and stablecoins are 10%. The AI rebalancer suggests increasing SKY4444 by 5%.",
  ],
  trading: [
    "Based on the 4H chart, BTC is forming a bullish flag pattern. SKY4444 just broke resistance at $0.044 — this could be a strong entry point. I'd suggest a small position with a stop-loss at $0.038.",
    "TRUMP coin is showing strong momentum after the latest news. Volume is up 300% and sentiment is extremely bullish. Consider a small position — but always manage your risk!",
  ],
  dating: [
    "Here's a great bio: 'Crypto trader by day, adventure seeker by night. I believe in building real wealth and real connections. SKY4444 holder 🚀 Looking for someone who matches my energy and ambition.'",
    "For your opening message, try: 'I noticed you're into DeFi too! What's your take on the latest yield farming opportunities? Also, your smile is worth more than any NFT 😄'",
  ],
  plan: [
    "Here's your optimized day: 7AM - Check portfolio & morning routine. 9AM - Focus work block (2 hrs). 12PM - Lunch + crypto news. 2PM - Trading session. 5PM - Exercise. 7PM - Social/dating. 9PM - Review day & plan tomorrow. Sleep by 11PM.",
    "I've analyzed your habits. Your most productive hours are 9AM-12PM. I'd schedule your most important tasks then. Also, you have 3 staking rewards to claim — I can do that automatically for you.",
  ],
  news: [
    "Today's top crypto news: BTC hit a new ATH at $108,000. SKY4444 is trending on Twitter after a major partnership announcement. TRUMP coin surged 25% after political news. The Fed held rates steady — bullish for crypto overall.",
    "Breaking: A major exchange just listed SKY4444 — volume is up 500%! Also, the ShadowChat DAO passed a proposal to increase staking rewards to 20% APY. Great day to be a holder!",
  ],
  motivation: [
    "You're building something incredible. Every SKY4444 you hold, every trade you make, every connection you build — it's all compounding. The people who succeed are the ones who keep going when it gets hard. You've got this! 🔥",
    "Remember why you started. Financial freedom isn't just a dream — it's a plan. You're already ahead of 95% of people just by being here. Keep stacking, keep building, keep growing. The best is yet to come! ⚡",
  ],
};

const getResponse = (prompt: string): string => {
  const p = prompt.toLowerCase();
  if (p.includes("portfolio"))
    return RESPONSES.portfolio[Math.floor(Math.random() * 2)];
  if (p.includes("trade") || p.includes("trading"))
    return RESPONSES.trading[Math.floor(Math.random() * 2)];
  if (p.includes("dating") || p.includes("bio"))
    return RESPONSES.dating[Math.floor(Math.random() * 2)];
  if (p.includes("plan") || p.includes("day"))
    return RESPONSES.plan[Math.floor(Math.random() * 2)];
  if (p.includes("news")) return RESPONSES.news[Math.floor(Math.random() * 2)];
  if (p.includes("motivat"))
    return RESPONSES.motivation[Math.floor(Math.random() * 2)];
  return "I'm here for you! Ask me about your portfolio, trading ideas, dating advice, daily planning, or anything else on your mind. I'm your 24/7 AI companion powered by ShadowChat.";
};

type Message = { role: "user" | "companion"; text: string; time: string };

export default function AIVoiceCompanion() {
  const [persona, setPersona] = useState(COMPANION_PERSONAS[0]);
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [muted, setMuted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "companion",
      text: `Hey! I'm ${COMPANION_PERSONAS[0].name}, your AI companion. I'm here 24/7 to help with trading, dating, planning, and anything else. What's on your mind?`,
      time: "Just now",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", text, time: "Just now" };
    setMessages(m => [...m, userMsg]);
    setInputText("");
    setTyping(true);
    setTimeout(() => {
      const response = getResponse(text);
      setMessages(m => [
        ...m,
        { role: "companion", text: response, time: "Just now" },
      ]);
      setTyping(false);
      if (!muted) setSpeaking(true);
      setTimeout(() => setSpeaking(false), 3000);
    }, 1200);
  };

  const toggleListening = () => {
    if (listening) {
      setListening(false);
      const prompts = [
        "What's my portfolio looking like today?",
        "Give me trading advice for SKY4444",
        "Help me plan my day",
        "What's the latest crypto news?",
      ];
      const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
      sendMessage(randomPrompt);
    } else {
      setListening(true);
      toast.info(`🎙️ ${persona.name} is listening...`);
    }
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Bot className="h-6 w-6 text-cyan-400" />
            AI Voice Companion
          </h1>
          <p className="text-sm text-muted-foreground">
            Your 24/7 personal AI — trading, dating, planning, and more
          </p>
        </div>
        <Badge
          className={`font-bold ${speaking ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20 animate-pulse" : "bg-muted text-muted-foreground"}`}
        >
          {speaking ? "🔊 Speaking..." : "● Ready"}
        </Badge>
      </div>

      {/* Persona Selector */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {COMPANION_PERSONAS.map(p => (
          <button
            key={p.id}
            onClick={() => {
              setPersona(p);
              toast.info(`Switched to ${p.name}`);
            }}
            className={`shrink-0 px-3 py-2 rounded-xl border text-center transition-all ${persona.id === p.id ? "border-cyan-500/50 bg-cyan-900/10" : "border-border/50"}`}
          >
            <p className="text-xl mb-0.5">{p.emoji}</p>
            <p className="font-bold text-xs">{p.name}</p>
          </button>
        ))}
      </div>

      {/* Companion Avatar */}
      <Card className="border-cyan-500/20 bg-gradient-to-br from-cyan-900/10 to-purple-900/10">
        <CardContent className="py-5 text-center">
          <motion.div
            animate={
              speaking
                ? { scale: [1, 1.1, 1], opacity: [1, 0.8, 1] }
                : listening
                  ? { scale: [1, 1.05, 1] }
                  : {}
            }
            transition={{ repeat: Infinity, duration: 1 }}
            className="h-24 w-24 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border-2 border-cyan-500/30 flex items-center justify-center text-5xl mx-auto mb-3"
          >
            {persona.emoji}
          </motion.div>
          <p className="font-black text-lg">{persona.name}</p>
          <p className="text-xs text-muted-foreground mb-1">
            {persona.personality}
          </p>
          {speaking && (
            <p className="text-xs text-cyan-400 animate-pulse">Speaking...</p>
          )}
          {listening && (
            <p className="text-xs text-green-400 animate-pulse">Listening...</p>
          )}
          {typing && (
            <p className="text-xs text-yellow-400 animate-pulse">Thinking...</p>
          )}
        </CardContent>
      </Card>

      {/* Quick Topics */}
      <div className="grid grid-cols-3 gap-2">
        {QUICK_TOPICS.map(topic => (
          <button
            key={topic.label}
            onClick={() => sendMessage(topic.prompt)}
            className="p-2.5 rounded-xl bg-muted/30 border border-border/50 hover:border-cyan-500/20 transition-all text-center"
          >
            <p className="text-xl mb-0.5">{topic.emoji}</p>
            <p className="text-xs font-medium">{topic.label}</p>
          </button>
        ))}
      </div>

      {/* Chat Messages */}
      <Card className="border-border/50">
        <CardContent className="py-3 px-3">
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-3 py-2 rounded-2xl text-xs ${msg.role === "user" ? "bg-cyan-600 text-white" : "bg-muted/50 text-foreground"}`}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="px-3 py-2 rounded-2xl bg-muted/50 text-xs flex gap-1">
                  <span className="animate-bounce">●</span>
                  <span
                    className="animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  >
                    ●
                  </span>
                  <span
                    className="animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  >
                    ●
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
      </Card>

      {/* Input */}
      <div className="flex gap-2">
        <input
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage(inputText)}
          placeholder={`Message ${persona.name}...`}
          className="flex-1 h-10 px-3 rounded-xl bg-muted/30 border border-border/50 text-sm focus:outline-none focus:border-cyan-500/50"
        />
        <Button
          className={`h-10 w-10 p-0 ${listening ? "bg-red-600 animate-pulse" : "bg-cyan-600"} text-white border-0`}
          onClick={toggleListening}
        >
          {listening ? (
            <MicOff className="h-4 w-4" />
          ) : (
            <Mic className="h-4 w-4" />
          )}
        </Button>
        <Button
          variant="outline"
          className="h-10 w-10 p-0"
          onClick={() => {
            setMuted(!muted);
            toast.info(muted ? "Voice enabled" : "Voice muted");
          }}
        >
          {muted ? (
            <VolumeX className="h-4 w-4" />
          ) : (
            <Volume2 className="h-4 w-4" />
          )}
        </Button>
        <Button
          className="h-10 px-4 bg-cyan-600 text-white border-0 text-xs"
          onClick={() => sendMessage(inputText)}
        >
          Send
        </Button>
      </div>
    </div>
  );
}
