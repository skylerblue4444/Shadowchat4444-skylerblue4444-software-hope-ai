import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Headphones,
  MessageSquare,
  BookOpen,
  Activity,
  CreditCard,
  ChevronRight,
  Search,
  Plus,
  CheckCircle,
  Clock,
  AlertTriangle,
  XCircle,
  Star,
  ArrowRight,
  Phone,
  Mail,
  Globe,
  Zap,
  FileText,
  Video,
  Users,
  Shield,
  TrendingUp,
  Award,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Send,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const SUPPORT_TICKETS = [
  {
    id: "TKT-001",
    title: "Cannot withdraw TRUMP tokens",
    priority: "high",
    status: "open",
    created: "2 hours ago",
    category: "Trading",
  },
  {
    id: "TKT-002",
    title: "NFT mint failed but gas was charged",
    priority: "high",
    status: "in-progress",
    created: "5 hours ago",
    category: "NFT",
  },
  {
    id: "TKT-003",
    title: "Referral bonus not credited",
    priority: "medium",
    status: "open",
    created: "1 day ago",
    category: "Rewards",
  },
  {
    id: "TKT-004",
    title: "IT consultation booking not confirmed",
    priority: "medium",
    status: "resolved",
    created: "2 days ago",
    category: "IT Services",
  },
  {
    id: "TKT-005",
    title: "Account verification stuck",
    priority: "low",
    status: "resolved",
    created: "3 days ago",
    category: "Account",
  },
];

const KB_ARTICLES = [
  {
    id: "kb1",
    title: "How to buy SKY4444 tokens in the ICO",
    views: 12430,
    category: "ICO",
    helpful: 98,
  },
  {
    id: "kb2",
    title: "Setting up your crypto wallet for TRUMP trading",
    views: 8921,
    category: "Trading",
    helpful: 95,
  },
  {
    id: "kb3",
    title: "China region access guide (WeChat login)",
    views: 7432,
    category: "Access",
    helpful: 92,
  },
  {
    id: "kb4",
    title: "How to mint an Impact Story NFT",
    views: 6210,
    category: "NFT",
    helpful: 97,
  },
  {
    id: "kb5",
    title: "Booking IT consultation with Skyler Blue",
    views: 4321,
    category: "IT Services",
    helpful: 99,
  },
  {
    id: "kb6",
    title: "Understanding DAO governance voting",
    views: 3890,
    category: "DAO",
    helpful: 94,
  },
  {
    id: "kb7",
    title: "KYC verification process explained",
    views: 3210,
    category: "Account",
    helpful: 88,
  },
  {
    id: "kb8",
    title: "Staking TRUMP for maximum APY",
    views: 2980,
    category: "DeFi",
    helpful: 96,
  },
];

const SYSTEM_STATUS = [
  {
    name: "Trading Engine",
    status: "operational",
    uptime: "99.99%",
    latency: "12ms",
  },
  {
    name: "Payment Processing",
    status: "operational",
    uptime: "99.95%",
    latency: "89ms",
  },
  {
    name: "NFT Marketplace",
    status: "operational",
    uptime: "99.97%",
    latency: "45ms",
  },
  {
    name: "ShadowChat Messaging",
    status: "operational",
    uptime: "99.98%",
    latency: "8ms",
  },
  {
    name: "IT Services Booking",
    status: "operational",
    uptime: "100%",
    latency: "120ms",
  },
  { name: "China CDN", status: "degraded", uptime: "98.2%", latency: "340ms" },
  {
    name: "ICO Smart Contract",
    status: "operational",
    uptime: "100%",
    latency: "2.1s",
  },
  {
    name: "DAO Voting",
    status: "operational",
    uptime: "99.91%",
    latency: "180ms",
  },
];

const PLANS = [
  {
    name: "Free",
    price: 0,
    period: "forever",
    features: [
      "Basic trading",
      "5 NFT mints/month",
      "Community access",
      "IT Helpdesk Bot",
      "1 mini program",
    ],
    color: "border-border/50",
    badge: null,
  },
  {
    name: "Pro",
    price: 29,
    period: "month",
    features: [
      "Unlimited trading",
      "50 NFT mints/month",
      "Priority support",
      "IT consultation (1/month)",
      "All mini programs",
      "Advanced analytics",
      "DAO voting power x2",
    ],
    color: "border-blue-500/30 bg-blue-500/5",
    badge: "Most Popular",
  },
  {
    name: "Enterprise",
    price: 299,
    period: "month",
    features: [
      "White-label platform",
      "Unlimited everything",
      "Dedicated support",
      "IT managed services",
      "Custom compliance rules",
      "World leader dashboard",
      "API access",
      "SLA 99.99%",
    ],
    color: "border-yellow-500/30 bg-yellow-500/5",
    badge: "Best Value",
  },
];

const FAQS = [
  {
    q: "Is SKY4444 available in China?",
    a: "Yes! We have full ICP compliance, real-name verification via WeChat/Alipay, and Alibaba CDN routing. Note: crypto trading is in read-only mode per Chinese regulations.",
  },
  {
    q: "How do I contact Skyler Blue IT Resolutions?",
    a: "Call 479-406-7123, email skylerblue4444@gmail.com, or use the Book Consultation feature in the IT Services section.",
  },
  {
    q: "What cryptocurrencies are supported?",
    a: "TRUMP, SKY4444, BTC, ETH, DOGE, XMR (Monero), USDC, and USDT. More being added based on DAO votes.",
  },
  {
    q: "Is the platform regulated?",
    a: "We comply with SEC/FINRA (US), GDPR (EU), MIIT/CAC (China), VARA (UAE), and other regional regulations. See our Compliance page for details.",
  },
  {
    q: "How do I get a refund?",
    a: "Contact support within 48 hours. Trading fees are non-refundable. ICO purchases have a 7-day cooling-off period per applicable regulations.",
  },
];

export default function ServiceCenter() {
  const [activeTab, setActiveTab] = useState<
    "support" | "kb" | "status" | "billing" | "contact"
  >("support");
  const [ticketTitle, setTicketTitle] = useState("");
  const [ticketDesc, setTicketDesc] = useState("");
  const [kbSearch, setKbSearch] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filteredKB = KB_ARTICLES.filter(
    a =>
      a.title.toLowerCase().includes(kbSearch.toLowerCase()) ||
      a.category.toLowerCase().includes(kbSearch.toLowerCase())
  );

  const submitTicket = () => {
    if (!ticketTitle) {
      toast.error("Please enter a title");
      return;
    }
    toast.success("Ticket submitted! We'll respond within 2 hours.");
    setTicketTitle("");
    setTicketDesc("");
  };

  const TABS = [
    { id: "support", label: "Support", icon: Headphones },
    { id: "kb", label: "Knowledge Base", icon: BookOpen },
    { id: "status", label: "System Status", icon: Activity },
    { id: "billing", label: "Plans & Billing", icon: CreditCard },
    { id: "contact", label: "Contact Us", icon: Phone },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black flex items-center gap-2">
          <Headphones className="h-6 w-6 text-blue-400" />
          ShadowChat Service Center
        </h1>
        <p className="text-sm text-muted-foreground">
          Support · Knowledge Base · System Status · Billing · Contact
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          {
            label: "Avg Response",
            value: "< 2 hrs",
            icon: Clock,
            color: "text-green-400",
          },
          {
            label: "Satisfaction",
            value: "98.4%",
            icon: Star,
            color: "text-yellow-400",
          },
          {
            label: "Open Tickets",
            value: "127",
            icon: MessageSquare,
            color: "text-blue-400",
          },
          {
            label: "System Uptime",
            value: "99.97%",
            icon: Activity,
            color: "text-cyan-400",
          },
        ].map(({ label, value, icon: Icon, color }) => (
          <Card key={label} className="border-border/50">
            <CardContent className="pt-4 pb-3">
              <div className="flex items-center gap-2 mb-1">
                <Icon className={`h-4 w-4 ${color}`} />
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
              <p className="text-xl font-black">{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === tab.id ? "bg-blue-600 text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
          >
            <tab.icon className="h-3.5 w-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.15 }}
        >
          {activeTab === "support" && (
            <div className="space-y-4">
              {/* Submit Ticket */}
              <Card className="border-border/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-bold flex items-center gap-2">
                    <Plus className="h-4 w-4 text-blue-400" />
                    Submit New Ticket
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Input
                    placeholder="Describe your issue briefly..."
                    value={ticketTitle}
                    onChange={e => setTicketTitle(e.target.value)}
                  />
                  <Textarea
                    placeholder="Provide more details, steps to reproduce, screenshots..."
                    rows={3}
                    value={ticketDesc}
                    onChange={e => setTicketDesc(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <Button
                      className="bg-blue-600 text-white border-0"
                      onClick={submitTicket}
                    >
                      <Send className="h-3.5 w-3.5 mr-1.5" />
                      Submit Ticket
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => toast.info("Live chat opening...")}
                    >
                      💬 Live Chat
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Existing Tickets */}
              <Card className="border-border/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-bold">
                    Your Tickets
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-border/30">
                    {SUPPORT_TICKETS.map(ticket => (
                      <div
                        key={ticket.id}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-muted/20 cursor-pointer"
                        onClick={() =>
                          toast.info(`Opening ticket ${ticket.id}`)
                        }
                      >
                        <div
                          className={`h-2 w-2 rounded-full shrink-0 ${ticket.status === "open" ? "bg-red-400" : ticket.status === "in-progress" ? "bg-yellow-400" : "bg-green-400"}`}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{ticket.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {ticket.id} · {ticket.category} · {ticket.created}
                          </p>
                        </div>
                        <Badge
                          className={`text-xs ${ticket.priority === "high" ? "bg-red-500/10 text-red-400 border-red-500/20" : ticket.priority === "medium" ? "bg-orange-500/10 text-orange-400 border-orange-500/20" : "bg-blue-500/10 text-blue-400 border-blue-500/20"}`}
                        >
                          {ticket.priority}
                        </Badge>
                        <Badge
                          className={`text-xs ${ticket.status === "resolved" ? "bg-green-500/10 text-green-400 border-green-500/20" : ticket.status === "in-progress" ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" : "bg-red-500/10 text-red-400 border-red-500/20"}`}
                        >
                          {ticket.status}
                        </Badge>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "kb" && (
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search knowledge base..."
                  className="pl-9 h-11"
                  value={kbSearch}
                  onChange={e => setKbSearch(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredKB.map(article => (
                  <Card
                    key={article.id}
                    className="border-border/50 hover:border-blue-500/30 cursor-pointer transition-colors"
                    onClick={() => toast.info(`Opening: ${article.title}`)}
                  >
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <Badge variant="outline" className="text-xs mb-2">
                            {article.category}
                          </Badge>
                          <p className="font-medium text-sm">{article.title}</p>
                          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                            <span>{article.views.toLocaleString()} views</span>
                            <span className="text-green-400">
                              👍 {article.helpful}% helpful
                            </span>
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* FAQs */}
              <h3 className="font-bold mt-6">Frequently Asked Questions</h3>
              <div className="space-y-2">
                {FAQS.map((faq, i) => (
                  <Card
                    key={i}
                    className="border-border/50 cursor-pointer"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <CardContent className="py-3 px-4">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-medium text-sm">{faq.q}</p>
                        {openFaq === i ? (
                          <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                        )}
                      </div>
                      <AnimatePresence>
                        {openFaq === i && (
                          <motion.p
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="text-sm text-muted-foreground mt-2"
                          >
                            {faq.a}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "status" && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <div>
                  <p className="font-bold text-green-400">
                    All Systems Operational
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Last updated: just now · 1 degraded service
                  </p>
                </div>
              </div>
              <Card className="border-border/50">
                <CardContent className="p-0">
                  <div className="divide-y divide-border/30">
                    {SYSTEM_STATUS.map(svc => (
                      <div
                        key={svc.name}
                        className="flex items-center gap-3 px-4 py-3"
                      >
                        <div
                          className={`h-2.5 w-2.5 rounded-full shrink-0 ${svc.status === "operational" ? "bg-green-400" : svc.status === "degraded" ? "bg-yellow-400 animate-pulse" : "bg-red-400"}`}
                        />
                        <span className="flex-1 text-sm">{svc.name}</span>
                        <span className="text-xs text-muted-foreground font-mono">
                          {svc.latency}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {svc.uptime}
                        </span>
                        <Badge
                          className={`text-xs ${svc.status === "operational" ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"}`}
                        >
                          {svc.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "billing" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {PLANS.map(plan => (
                  <Card
                    key={plan.name}
                    className={`border ${plan.color} relative`}
                  >
                    {plan.badge && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <Badge className="bg-blue-600 text-white border-0 text-xs">
                          {plan.badge}
                        </Badge>
                      </div>
                    )}
                    <CardContent className="pt-6">
                      <p className="font-black text-lg">{plan.name}</p>
                      <div className="flex items-baseline gap-1 my-2">
                        <span className="text-3xl font-black">
                          ${plan.price}
                        </span>
                        <span className="text-muted-foreground text-sm">
                          /{plan.period}
                        </span>
                      </div>
                      <ul className="space-y-2 mb-4">
                        {plan.features.map(f => (
                          <li
                            key={f}
                            className="flex items-center gap-2 text-sm"
                          >
                            <CheckCircle className="h-3.5 w-3.5 text-green-400 shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                      <Button
                        className={`w-full ${plan.name === "Pro" ? "bg-blue-600 text-white border-0" : plan.name === "Enterprise" ? "bg-yellow-500 text-black border-0" : ""}`}
                        variant={plan.name === "Free" ? "outline" : "default"}
                        onClick={() =>
                          toast.success(`${plan.name} plan selected`)
                        }
                      >
                        {plan.price === 0
                          ? "Current Plan"
                          : `Upgrade to ${plan.name}`}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "contact" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-bold">Skyler Blue IT Resolutions</h3>
                {[
                  {
                    icon: Phone,
                    label: "Phone",
                    value: "479-406-7123",
                    action: "tel:4794067123",
                  },
                  {
                    icon: Mail,
                    label: "Email",
                    value: "skylerblue4444@gmail.com",
                    action: "mailto:skylerblue4444@gmail.com",
                  },
                  {
                    icon: Globe,
                    label: "Platform",
                    value: "ShadowChat / SKY4444",
                    action: "#",
                  },
                  {
                    icon: Clock,
                    label: "Hours",
                    value: "Mon-Fri 9AM-6PM CST",
                    action: null,
                  },
                ].map(({ icon: Icon, label, value, action }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 p-3 rounded-xl bg-muted/20 border border-border/30"
                  >
                    <Icon className="h-5 w-5 text-blue-400 shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">{label}</p>
                      <p className="font-medium text-sm">{value}</p>
                    </div>
                    {action && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="ml-auto h-7 text-xs"
                        onClick={() => toast.info(`Opening ${label}`)}
                      >
                        Open
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              <Card className="border-border/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-bold">
                    Send a Message
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Input placeholder="Your name" />
                  <Input placeholder="Your email" />
                  <Input placeholder="Subject" />
                  <Textarea placeholder="Your message..." rows={4} />
                  <Button
                    className="w-full bg-blue-600 text-white border-0"
                    onClick={() =>
                      toast.success("Message sent! We'll reply within 2 hours.")
                    }
                  >
                    <Send className="h-3.5 w-3.5 mr-1.5" />
                    Send Message
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
