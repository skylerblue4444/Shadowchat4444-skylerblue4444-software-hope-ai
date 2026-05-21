import { useState } from "react";
import { motion } from "framer-motion";
import {
  Ticket,
  Plus,
  Clock,
  CheckCircle,
  AlertTriangle,
  MessageCircle,
  Paperclip,
  Send,
  User,
  Zap,
  Filter,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

type TicketItem = {
  id: string;
  title: string;
  category: string;
  priority: "high" | "medium" | "low";
  status: "open" | "in-progress" | "resolved";
  created: string;
  lastUpdate: string;
  messages: number;
};

const TICKETS: TicketItem[] = [
  {
    id: "TKT-4444",
    title: "Server not responding after Windows Update",
    category: "Server",
    priority: "high",
    status: "in-progress",
    created: "May 14, 2026",
    lastUpdate: "1 hr ago",
    messages: 4,
  },
  {
    id: "TKT-4443",
    title: "Email not syncing on mobile devices",
    category: "Email",
    priority: "medium",
    status: "open",
    created: "May 13, 2026",
    lastUpdate: "3 hrs ago",
    messages: 2,
  },
  {
    id: "TKT-4442",
    title: "VPN connection dropping frequently",
    category: "Network",
    priority: "medium",
    status: "in-progress",
    created: "May 12, 2026",
    lastUpdate: "1 day ago",
    messages: 6,
  },
  {
    id: "TKT-4441",
    title: "New employee workstation setup",
    category: "Hardware",
    priority: "low",
    status: "open",
    created: "May 11, 2026",
    lastUpdate: "2 days ago",
    messages: 1,
  },
  {
    id: "TKT-4440",
    title: "Backup failure on ShadowDB-01",
    category: "Backup",
    priority: "high",
    status: "resolved",
    created: "May 10, 2026",
    lastUpdate: "3 days ago",
    messages: 8,
  },
];

const PRIORITY_COLORS = {
  high: "text-red-400 bg-red-500/10 border-red-500/20",
  medium: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  low: "text-green-400 bg-green-500/10 border-green-500/20",
};
const STATUS_COLORS = {
  open: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  "in-progress": "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  resolved: "text-green-400 bg-green-500/10 border-green-500/20",
};

export default function ShadowTickets() {
  const [tab, setTab] = useState<"all" | "open" | "create" | "resolved">("all");
  const [selected, setSelected] = useState<TicketItem | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [reply, setReply] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = TICKETS.filter(t => {
    if (tab === "open") return t.status !== "resolved";
    if (tab === "resolved") return t.status === "resolved";
    return true;
  }).filter(t => filter === "All" || t.category === filter);

  if (selected) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Button
            size="sm"
            variant="outline"
            className="h-8 text-xs"
            onClick={() => setSelected(null)}
          >
            ← Back
          </Button>
          <div>
            <p className="font-black text-sm">{selected.id}</p>
            <p className="text-xs text-muted-foreground">{selected.title}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Badge className={`text-xs ${PRIORITY_COLORS[selected.priority]}`}>
            {selected.priority} priority
          </Badge>
          <Badge className={`text-xs ${STATUS_COLORS[selected.status]}`}>
            {selected.status}
          </Badge>
          <Badge className="text-xs bg-muted text-muted-foreground">
            {selected.category}
          </Badge>
        </div>
        <Card className="border-border/50">
          <CardContent className="py-3 px-4 space-y-3">
            {[
              {
                role: "client",
                msg: "The server stopped responding after the latest Windows Update was applied. All users are affected.",
                time: "May 14, 9:00 AM",
              },
              {
                role: "tech",
                msg: "Hi! I've received your ticket. I'm investigating the issue now. Can you confirm which Windows Update version was applied?",
                time: "May 14, 9:15 AM",
              },
              {
                role: "client",
                msg: "It was KB5034441. Applied automatically last night.",
                time: "May 14, 9:22 AM",
              },
              {
                role: "tech",
                msg: "Known issue with that update. I'm rolling it back now. Server should be back online in 10-15 minutes.",
                time: "May 14, 9:30 AM",
              },
            ]
              .slice(0, selected.messages)
              .map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-2 ${msg.role === "client" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`h-7 w-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${msg.role === "tech" ? "bg-blue-600 text-white" : "bg-muted"}`}
                  >
                    {msg.role === "tech" ? "IT" : "U"}
                  </div>
                  <div
                    className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs ${msg.role === "tech" ? "bg-muted" : "bg-blue-600 text-white"}`}
                  >
                    <p>{msg.msg}</p>
                    <p
                      className={`text-xs mt-0.5 ${msg.role === "tech" ? "text-muted-foreground" : "text-blue-200"}`}
                    >
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>
        <div className="flex gap-2">
          <Input
            value={reply}
            onChange={e => setReply(e.target.value)}
            placeholder="Type a reply..."
            className="flex-1 h-10 text-xs"
            onKeyDown={e =>
              e.key === "Enter" &&
              reply &&
              (toast.success("Reply sent!"), setReply(""))
            }
          />
          <Button
            className="h-10 w-10 p-0 bg-blue-600 text-white border-0 shrink-0"
            onClick={() => {
              if (reply) {
                toast.success("Reply sent!");
                setReply("");
              }
            }}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Ticket className="h-6 w-6 text-blue-400" />
            IT Support Tickets
          </h1>
          <p className="text-sm text-muted-foreground">
            Skyler Blue IT Resolutions — managed support
          </p>
        </div>
        <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 font-bold">
          {TICKETS.filter(t => t.status !== "resolved").length} Open
        </Badge>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2">
        {[
          {
            label: "Open",
            value: TICKETS.filter(t => t.status === "open").length,
            emoji: "🔵",
          },
          {
            label: "In Progress",
            value: TICKETS.filter(t => t.status === "in-progress").length,
            emoji: "🟡",
          },
          {
            label: "Resolved",
            value: TICKETS.filter(t => t.status === "resolved").length,
            emoji: "✅",
          },
          { label: "Avg Response", value: "< 1hr", emoji: "⚡" },
        ].map(s => (
          <Card key={s.label} className="border-border/50 text-center">
            <CardContent className="pt-2 pb-2">
              <p className="text-base">{s.emoji}</p>
              <p className="font-black text-xs text-blue-400">{s.value}</p>
              <p className="text-xs text-muted-foreground leading-tight">
                {s.label}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-2">
        {(["all", "open", "create", "resolved"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-blue-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "create" ? (
        <Card className="border-blue-500/20 bg-blue-900/5">
          <CardContent className="py-4 px-4 space-y-3">
            <p className="font-bold text-sm">Create New Ticket</p>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Issue Title</p>
              <Input
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                placeholder="Brief description of the issue"
                className="h-9 text-xs"
              />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                Detailed Description
              </p>
              <textarea
                value={newDesc}
                onChange={e => setNewDesc(e.target.value)}
                placeholder="Describe the issue in detail, including any error messages..."
                className="w-full h-24 rounded-xl border border-border bg-background px-3 py-2 text-xs resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Category</p>
                <select className="w-full h-9 rounded-xl border border-border bg-background px-3 text-xs focus:outline-none">
                  {[
                    "Server",
                    "Network",
                    "Email",
                    "Hardware",
                    "Software",
                    "Security",
                    "Backup",
                    "Other",
                  ].map(c => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Priority</p>
                <select className="w-full h-9 rounded-xl border border-border bg-background px-3 text-xs focus:outline-none">
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Critical</option>
                </select>
              </div>
            </div>
            <Button
              className="w-full h-10 text-xs bg-blue-600 text-white border-0 font-bold"
              onClick={() => {
                if (!newTitle) {
                  toast.error("Please enter a title");
                  return;
                }
                toast.success(
                  `✅ Ticket TKT-4445 created! Our team will respond within 1 hour.`
                );
                setNewTitle("");
                setNewDesc("");
                setTab("all");
              }}
            >
              <Zap className="h-4 w-4 mr-2" />
              Submit Ticket
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {["All", "Server", "Network", "Email", "Hardware", "Backup"].map(
              f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium transition-colors ${filter === f ? "bg-blue-600 text-white" : "bg-muted text-muted-foreground"}`}
                >
                  {f}
                </button>
              )
            )}
          </div>
          {filtered.map((ticket, i) => (
            <motion.div
              key={ticket.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Card
                className={`border cursor-pointer hover:border-blue-500/20 transition-all ${ticket.status === "resolved" ? "border-border/30 opacity-70" : "border-border/50"}`}
                onClick={() => setSelected(ticket)}
              >
                <CardContent className="py-3 px-4">
                  <div className="flex items-start gap-3">
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${ticket.status === "resolved" ? "bg-green-500/10" : ticket.status === "in-progress" ? "bg-yellow-500/10" : "bg-blue-500/10"}`}
                    >
                      {ticket.status === "resolved" ? (
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      ) : ticket.status === "in-progress" ? (
                        <Clock className="h-4 w-4 text-yellow-400" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-blue-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="font-bold text-xs text-muted-foreground">
                          {ticket.id}
                        </p>
                        <Badge
                          className={`text-xs ${PRIORITY_COLORS[ticket.priority]}`}
                        >
                          {ticket.priority}
                        </Badge>
                      </div>
                      <p className="font-bold text-sm">{ticket.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {ticket.category} · Updated {ticket.lastUpdate}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <Badge
                        className={`text-xs ${STATUS_COLORS[ticket.status]}`}
                      >
                        {ticket.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        <MessageCircle className="h-3 w-3 inline mr-0.5" />
                        {ticket.messages}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
