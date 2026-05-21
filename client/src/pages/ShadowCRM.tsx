import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Phone,
  Mail,
  Star,
  TrendingUp,
  Plus,
  Search,
  Filter,
  ChevronRight,
  CheckCircle,
  Clock,
  Coins,
  Briefcase,
  MessageCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const CONTACTS = [
  {
    id: 1,
    name: "John Smith",
    company: "Smith Enterprises",
    email: "john@smith.com",
    phone: "479-555-0101",
    value: "$12,000",
    status: "active",
    stage: "Client",
    tags: ["IT", "Managed Services"],
    lastContact: "Today",
    avatar: "JS",
    score: 95,
  },
  {
    id: 2,
    name: "Maria Garcia",
    company: "Garcia Tech",
    email: "maria@garcia.com",
    phone: "479-555-0102",
    value: "$8,500",
    status: "lead",
    stage: "Proposal",
    tags: ["Cloud", "Security"],
    lastContact: "Yesterday",
    avatar: "MG",
    score: 78,
  },
  {
    id: 3,
    name: "David Lee",
    company: "Lee Manufacturing",
    email: "david@lee.com",
    phone: "479-555-0103",
    value: "$25,000",
    status: "active",
    stage: "Client",
    tags: ["Enterprise", "IT"],
    lastContact: "2 days ago",
    avatar: "DL",
    score: 92,
  },
  {
    id: 4,
    name: "Sarah Johnson",
    company: "Johnson Retail",
    email: "sarah@johnson.com",
    phone: "479-555-0104",
    value: "$3,200",
    status: "prospect",
    stage: "Discovery",
    tags: ["Small Biz", "Support"],
    lastContact: "1 week ago",
    avatar: "SJ",
    score: 45,
  },
  {
    id: 5,
    name: "Mike Williams",
    company: "Williams Law",
    email: "mike@williams.com",
    phone: "479-555-0105",
    value: "$15,000",
    status: "active",
    stage: "Client",
    tags: ["Legal", "Compliance"],
    lastContact: "3 days ago",
    avatar: "MW",
    score: 88,
  },
];

const PIPELINE = [
  { stage: "Discovery", count: 3, value: "$9,600", color: "bg-blue-500" },
  { stage: "Proposal", count: 2, value: "$17,000", color: "bg-yellow-500" },
  { stage: "Negotiation", count: 1, value: "$8,500", color: "bg-orange-500" },
  { stage: "Closed Won", count: 8, value: "$124,000", color: "bg-green-500" },
  { stage: "Closed Lost", count: 2, value: "$12,000", color: "bg-red-500" },
];

const ACTIVITIES = [
  {
    type: "call",
    contact: "John Smith",
    desc: "Discussed Q3 IT upgrade plan",
    time: "30 min ago",
    emoji: "📞",
  },
  {
    type: "email",
    contact: "Maria Garcia",
    desc: "Sent cloud migration proposal",
    time: "2 hr ago",
    emoji: "📧",
  },
  {
    type: "meeting",
    contact: "David Lee",
    desc: "Quarterly review completed",
    time: "Yesterday",
    emoji: "🤝",
  },
  {
    type: "deal",
    contact: "Mike Williams",
    desc: "Contract signed — $15,000",
    time: "2 days ago",
    emoji: "🎉",
  },
];

export default function ShadowCRM() {
  const [tab, setTab] = useState<
    "contacts" | "pipeline" | "activities" | "reports"
  >("contacts");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<(typeof CONTACTS)[0] | null>(null);

  const filtered = CONTACTS.filter(
    c =>
      search === "" ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.company.toLowerCase().includes(search.toLowerCase())
  );

  const totalPipelineValue = PIPELINE.reduce(
    (s, p) => s + parseInt(p.value.replace(/[$,]/g, "")),
    0
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Users className="h-6 w-6 text-cyan-400" />
            ShadowCRM
          </h1>
          <p className="text-sm text-muted-foreground">
            Customer management for Skyler Blue IT Resolutions
          </p>
        </div>
        <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20 font-bold">
          {CONTACTS.length} Contacts
        </Badge>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-4 gap-2">
        {[
          {
            label: "Total Clients",
            value: "3",
            emoji: "👥",
            color: "text-cyan-400",
          },
          {
            label: "Pipeline",
            value: "$170K",
            emoji: "💰",
            color: "text-green-400",
          },
          {
            label: "This Month",
            value: "$15K",
            emoji: "📈",
            color: "text-yellow-400",
          },
          {
            label: "Avg Score",
            value: "79.6",
            emoji: "⭐",
            color: "text-purple-400",
          },
        ].map(s => (
          <Card key={s.label} className="border-border/50 text-center">
            <CardContent className="pt-2.5 pb-2.5">
              <p className="text-lg mb-0.5">{s.emoji}</p>
              <p className={`font-black text-xs ${s.color}`}>{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-2">
        {(["contacts", "pipeline", "activities", "reports"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-cyan-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "contacts" && (
        <div className="space-y-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search contacts..."
                className="pl-9 h-9 text-xs"
              />
            </div>
            <Button
              className="h-9 text-xs bg-cyan-600 text-white border-0"
              onClick={() => toast.info("Opening new contact form...")}
            >
              <Plus className="h-3.5 w-3.5 mr-1" />
              Add
            </Button>
          </div>
          {filtered.map((contact, i) => (
            <motion.div
              key={contact.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card
                className={`border cursor-pointer transition-all ${selected?.id === contact.id ? "border-cyan-500/30" : "border-border/50 hover:border-cyan-500/20"}`}
                onClick={() =>
                  setSelected(selected?.id === contact.id ? null : contact)
                }
              >
                <CardContent className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/20 flex items-center justify-center font-black text-sm shrink-0">
                      {contact.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-sm">{contact.name}</p>
                        <Badge
                          className={`text-xs ${contact.status === "active" ? "bg-green-500/10 text-green-400 border-green-500/20" : contact.status === "lead" ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" : "bg-blue-500/10 text-blue-400 border-blue-500/20"}`}
                        >
                          {contact.stage}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {contact.company} · {contact.lastContact}
                      </p>
                      <div className="flex gap-1 mt-0.5">
                        {contact.tags.map(tag => (
                          <Badge
                            key={tag}
                            className="text-xs bg-muted text-muted-foreground"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-black text-sm text-green-400">
                        {contact.value}
                      </p>
                      <div className="flex items-center gap-1 justify-end">
                        <Star className="h-3 w-3 text-yellow-400" />
                        <p className="text-xs">{contact.score}</p>
                      </div>
                    </div>
                  </div>
                  {selected?.id === contact.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-3 pt-3 border-t border-border/30"
                    >
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="flex-1 h-8 text-xs bg-cyan-600 text-white border-0"
                          onClick={() =>
                            toast.info(`Calling ${contact.phone}...`)
                          }
                        >
                          <Phone className="h-3 w-3 mr-1" />
                          Call
                        </Button>
                        <Button
                          size="sm"
                          className="flex-1 h-8 text-xs"
                          variant="outline"
                          onClick={() =>
                            toast.info(`Emailing ${contact.email}...`)
                          }
                        >
                          <Mail className="h-3 w-3 mr-1" />
                          Email
                        </Button>
                        <Button
                          size="sm"
                          className="flex-1 h-8 text-xs"
                          variant="outline"
                          onClick={() => toast.info("Opening chat...")}
                        >
                          <MessageCircle className="h-3 w-3 mr-1" />
                          Chat
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "pipeline" && (
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground">
            Total Pipeline:{" "}
            <span className="font-black text-green-400">
              ${totalPipelineValue.toLocaleString()}
            </span>
          </p>
          {PIPELINE.map((stage, i) => (
            <Card key={stage.stage} className="border-border/50">
              <CardContent className="py-3 px-4">
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className={`h-3 w-3 rounded-full ${stage.color} shrink-0`}
                  />
                  <p className="font-bold text-sm flex-1">{stage.stage}</p>
                  <p className="font-black text-sm text-green-400">
                    {stage.value}
                  </p>
                  <Badge className="text-xs bg-muted text-muted-foreground">
                    {stage.count}
                  </Badge>
                </div>
                <Progress value={(stage.count / 16) * 100} className="h-1.5" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "activities" && (
        <div className="space-y-2">
          <Button
            className="w-full h-9 text-xs bg-cyan-600 text-white border-0"
            onClick={() => toast.info("Logging new activity...")}
          >
            <Plus className="h-3.5 w-3.5 mr-1.5" />
            Log Activity
          </Button>
          {ACTIVITIES.map((act, i) => (
            <Card key={i} className="border-border/50">
              <CardContent className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{act.emoji}</span>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{act.contact}</p>
                    <p className="text-xs text-muted-foreground">{act.desc}</p>
                  </div>
                  <p className="text-xs text-muted-foreground shrink-0">
                    {act.time}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "reports" && (
        <div className="space-y-3">
          {[
            {
              title: "Revenue by Client",
              value: "$52,500",
              change: "+18%",
              emoji: "💰",
            },
            {
              title: "New Leads This Month",
              value: "12",
              change: "+4",
              emoji: "🎯",
            },
            {
              title: "Avg Deal Size",
              value: "$10,500",
              change: "+5%",
              emoji: "📊",
            },
            { title: "Win Rate", value: "80%", change: "+10%", emoji: "🏆" },
            {
              title: "Avg Sales Cycle",
              value: "14 days",
              change: "-3 days",
              emoji: "⏱️",
            },
          ].map(report => (
            <Card key={report.title} className="border-border/50">
              <CardContent className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{report.emoji}</span>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{report.title}</p>
                    <p className="text-xl font-black text-cyan-400">
                      {report.value}
                    </p>
                  </div>
                  <Badge className="text-xs bg-green-500/10 text-green-400 border-green-500/20">
                    {report.change}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
