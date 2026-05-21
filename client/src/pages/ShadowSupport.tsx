import { useState } from "react";
import { motion } from "framer-motion";
import {
  HeadphonesIcon,
  MessageCircle,
  FileText,
  Search,
  ChevronDown,
  ChevronRight,
  Star,
  Send,
  Clock,
  CheckCircle,
  Zap,
  Phone,
  Mail,
  Globe,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const FAQ_CATEGORIES = [
  { label: "Getting Started", count: 12, emoji: "🚀" },
  { label: "Trading & Exchange", count: 18, emoji: "📈" },
  { label: "Wallet & Payments", count: 15, emoji: "💳" },
  { label: "KYC & Verification", count: 8, emoji: "🪪" },
  { label: "IT Services", count: 10, emoji: "💼" },
  { label: "SKY4444 Token", count: 14, emoji: "🌟" },
];

const FAQS = [
  {
    q: "How do I buy SKY4444 tokens?",
    a: "You can buy SKY4444 directly on the ICO Hub page, or trade for it on the ShadowExchange. We accept BTC, ETH, USDT, and Stripe (credit/debit card).",
    open: false,
  },
  {
    q: "What is the minimum investment for the ICO?",
    a: "The minimum investment is $44 USD equivalent. You can participate with any supported cryptocurrency.",
    open: false,
  },
  {
    q: "How do I complete KYC verification?",
    a: "Go to Identity Verification in your settings. Level 1 requires email + phone. Level 2 requires a government ID and selfie. Higher levels require additional documentation.",
    open: false,
  },
  {
    q: "What IT services does Skyler Blue IT Resolutions offer?",
    a: "We offer Managed IT Support, Cybersecurity, Cloud Services, IT Helpdesk, Network Management, and custom enterprise solutions. Call 479-406-7123 or email skylerblue4444@gmail.com.",
    open: false,
  },
  {
    q: "How do staking rewards work?",
    a: "Lock your SKY4444 tokens for 30, 90, or 365 days to earn APY rewards ranging from 12% to 124.5%. Rewards are distributed daily and can be claimed anytime.",
    open: false,
  },
];

const TICKETS = [
  {
    id: "TKT-4444",
    subject: "SKY4444 withdrawal not received",
    status: "open",
    priority: "high",
    created: "May 14, 2026",
    lastUpdate: "2 hrs ago",
  },
  {
    id: "TKT-4443",
    subject: "KYC Level 3 review status",
    status: "in-progress",
    priority: "medium",
    created: "May 12, 2026",
    lastUpdate: "1 day ago",
  },
  {
    id: "TKT-4442",
    subject: "IT Support — Server monitoring setup",
    status: "resolved",
    priority: "low",
    created: "May 5, 2026",
    lastUpdate: "May 8, 2026",
  },
];

const CHAT_MESSAGES = [
  {
    from: "bot",
    text: "Hi! I'm ShadowBot, your AI support assistant. How can I help you today?",
    time: "Just now",
  },
  {
    from: "bot",
    text: "I can help with: trading issues, wallet questions, KYC verification, IT services, or general platform questions.",
    time: "Just now",
  },
];

export default function ShadowSupport() {
  const [tab, setTab] = useState<"chat" | "tickets" | "faq" | "contact">(
    "chat"
  );
  const [faqs, setFaqs] = useState(FAQS);
  const [messages, setMessages] = useState(CHAT_MESSAGES);
  const [chatInput, setChatInput] = useState("");
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketBody, setTicketBody] = useState("");
  const [submittingTicket, setSubmittingTicket] = useState(false);

  const sendMessage = async () => {
    if (!chatInput.trim()) return;
    const userMsg = { from: "user", text: chatInput, time: "Just now" };
    setMessages(prev => [...prev, userMsg]);
    setChatInput("");
    await new Promise(r => setTimeout(r, 1200));
    const botResponses: Record<string, string> = {
      sky4444:
        "SKY4444 is our platform token! You can buy it on the ICO Hub page. Current price: $0.044. The ICO is live now!",
      kyc: "For KYC, go to Identity Verification in your settings. Level 2 requires a government ID and selfie. Review takes 1-2 business days.",
      staking:
        "Staking rewards range from 12% to 124.5% APY! Go to the Staking Center to lock your tokens and start earning.",
      it: "Skyler Blue IT Resolutions offers Managed IT, Cybersecurity, Cloud Services, and more. Call 479-406-7123 or visit the IT Services section.",
    };
    const lower = chatInput.toLowerCase();
    const response =
      Object.entries(botResponses).find(([k]) => lower.includes(k))?.[1] ||
      "I understand your question. Let me connect you with a human support agent for more detailed assistance. Average wait time: 5 minutes.";
    setMessages(prev => [
      ...prev,
      { from: "bot", text: response, time: "Just now" },
    ]);
  };

  const submitTicket = async () => {
    if (!ticketSubject || !ticketBody) {
      toast.error("Fill in all fields");
      return;
    }
    setSubmittingTicket(true);
    await new Promise(r => setTimeout(r, 1500));
    setSubmittingTicket(false);
    toast.success("✅ Ticket TKT-4445 created! We'll respond within 24 hours.");
    setTicketSubject("");
    setTicketBody("");
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <HeadphonesIcon className="h-6 w-6 text-sky-400" />
            Support Center
          </h1>
          <p className="text-sm text-muted-foreground">
            24/7 AI + human support for all your needs
          </p>
        </div>
        <Badge className="bg-green-500/10 text-green-400 border-green-500/20 font-bold">
          🟢 Online
        </Badge>
      </div>

      <div className="flex gap-2">
        {(["chat", "tickets", "faq", "contact"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-sky-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "chat" && (
        <div className="space-y-3">
          <Card className="border-sky-500/20 bg-sky-900/5">
            <CardContent className="py-3 px-4">
              <div className="space-y-3 max-h-80 overflow-y-auto mb-3">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] p-2.5 rounded-2xl text-xs ${msg.from === "user" ? "bg-sky-600 text-white" : "bg-muted"}`}
                    >
                      {msg.from === "bot" && (
                        <p className="font-bold text-sky-400 mb-0.5 text-xs">
                          ShadowBot 🤖
                        </p>
                      )}
                      <p>{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && sendMessage()}
                  placeholder="Ask anything..."
                  className="h-9 text-xs flex-1"
                />
                <Button
                  size="sm"
                  className="h-9 bg-sky-600 text-white border-0 shrink-0"
                  onClick={sendMessage}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex gap-1.5 mt-2 flex-wrap">
                {[
                  "SKY4444 price",
                  "KYC help",
                  "Staking rewards",
                  "IT services",
                ].map(q => (
                  <button
                    key={q}
                    onClick={() => {
                      setChatInput(q);
                    }}
                    className="px-2.5 py-1 rounded-full bg-sky-500/10 text-sky-400 text-xs hover:bg-sky-500/20 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
          <Button
            className="w-full h-10 text-xs bg-sky-600 text-white border-0 font-bold"
            onClick={() =>
              toast.info("Connecting to human agent... Est. wait: 5 min")
            }
          >
            <HeadphonesIcon className="h-4 w-4 mr-2" />
            Connect to Human Agent
          </Button>
        </div>
      )}

      {tab === "tickets" && (
        <div className="space-y-3">
          <div className="space-y-2">
            {TICKETS.map((ticket, i) => (
              <Card key={ticket.id} className="border-border/50">
                <CardContent className="py-3 px-4 flex items-center gap-3">
                  <div
                    className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 ${ticket.status === "open" ? "bg-red-500/10" : ticket.status === "in-progress" ? "bg-yellow-500/10" : "bg-green-500/10"}`}
                  >
                    {ticket.status === "resolved" ? (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    ) : (
                      <Clock className="h-5 w-5 text-yellow-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{ticket.subject}</p>
                    <p className="text-xs text-muted-foreground">
                      {ticket.id} · Updated {ticket.lastUpdate}
                    </p>
                  </div>
                  <Badge
                    className={`text-xs ${ticket.status === "open" ? "bg-red-500/10 text-red-400 border-red-500/20" : ticket.status === "in-progress" ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" : "bg-green-500/10 text-green-400 border-green-500/20"}`}
                  >
                    {ticket.status}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card className="border-sky-500/20 bg-sky-900/5">
            <CardContent className="py-4 px-4 space-y-3">
              <p className="font-bold text-sm">Submit New Ticket</p>
              <Input
                value={ticketSubject}
                onChange={e => setTicketSubject(e.target.value)}
                placeholder="Subject"
                className="h-9 text-xs"
              />
              <textarea
                value={ticketBody}
                onChange={e => setTicketBody(e.target.value)}
                placeholder="Describe your issue in detail..."
                className="w-full h-20 rounded-xl border border-border bg-background px-3 py-2 text-xs resize-none focus:outline-none"
              />
              <Button
                className="w-full h-9 text-xs bg-sky-600 text-white border-0 font-bold"
                onClick={submitTicket}
                disabled={submittingTicket}
              >
                {submittingTicket ? (
                  "Submitting..."
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Submit Ticket
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "faq" && (
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-2">
            {FAQ_CATEGORIES.map(cat => (
              <Card
                key={cat.label}
                className="border-border/50 cursor-pointer hover:border-sky-500/20 transition-all text-center"
              >
                <CardContent className="py-3 px-2">
                  <p className="text-xl mb-1">{cat.emoji}</p>
                  <p className="text-xs font-bold leading-tight">{cat.label}</p>
                  <p className="text-xs text-muted-foreground">
                    {cat.count} articles
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <Card key={i} className="border-border/50">
                <CardContent className="py-3 px-4">
                  <button
                    className="w-full flex items-center justify-between text-left"
                    onClick={() =>
                      setFaqs(prev =>
                        prev.map((f, idx) =>
                          idx === i ? { ...f, open: !f.open } : f
                        )
                      )
                    }
                  >
                    <p className="font-bold text-sm pr-4">{faq.q}</p>
                    {faq.open ? (
                      <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                    )}
                  </button>
                  {faq.open && (
                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                      {faq.a}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {tab === "contact" && (
        <div className="space-y-3">
          {[
            {
              icon: Phone,
              label: "Phone Support",
              value: "479-406-7123",
              sub: "Mon-Fri 9AM-6PM CST",
              color: "text-green-400",
              bg: "bg-green-500/10",
            },
            {
              icon: Mail,
              label: "Email Support",
              value: "skylerblue4444@gmail.com",
              sub: "Response within 24 hours",
              color: "text-blue-400",
              bg: "bg-blue-500/10",
            },
            {
              icon: Globe,
              label: "IT Services Website",
              value: "shadowchat.app/it",
              sub: "Book a consultation online",
              color: "text-purple-400",
              bg: "bg-purple-500/10",
            },
            {
              icon: MessageCircle,
              label: "Live Chat",
              value: "Available 24/7",
              sub: "AI + human agents",
              color: "text-sky-400",
              bg: "bg-sky-500/10",
            },
          ].map(c => (
            <Card
              key={c.label}
              className="border-border/50 cursor-pointer hover:border-sky-500/20 transition-all"
              onClick={() => toast.info(`Opening ${c.label}...`)}
            >
              <CardContent className="py-3 px-4 flex items-center gap-3">
                <div
                  className={`h-10 w-10 rounded-full ${c.bg} flex items-center justify-center shrink-0`}
                >
                  <c.icon className={`h-5 w-5 ${c.color}`} />
                </div>
                <div>
                  <p className="font-bold text-sm">{c.label}</p>
                  <p className={`text-xs font-bold ${c.color}`}>{c.value}</p>
                  <p className="text-xs text-muted-foreground">{c.sub}</p>
                </div>
              </CardContent>
            </Card>
          ))}
          <Card className="border-sky-500/20 bg-sky-900/5">
            <CardContent className="py-3 px-4 text-center">
              <p className="font-black text-sm mb-1">
                Skyler Blue Spiller's Innovative IT Resolutions
              </p>
              <p className="text-xs text-muted-foreground">
                Fort Smith, AR · 479-406-7123 · skylerblue4444@gmail.com
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Providing world-class IT services and the ShadowChat platform
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
