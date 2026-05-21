import { useState } from "react";
import { motion } from "framer-motion";
import {
  Monitor,
  Ticket,
  FileText,
  DollarSign,
  Shield,
  Wifi,
  CheckCircle,
  AlertTriangle,
  Clock,
  Plus,
  Download,
  Server,
  Cpu,
  HardDrive,
  Activity,
  Phone,
  Mail,
  ChevronRight,
  BarChart2,
  Users,
  Star,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const TICKETS = [
  {
    id: "TK-1042",
    title: "Email server not syncing on mobile devices",
    priority: "high",
    status: "in-progress",
    created: "May 14",
    updated: "2 hrs ago",
    assignee: "Skyler Blue",
  },
  {
    id: "TK-1038",
    title: "VPN connection dropping intermittently",
    priority: "medium",
    status: "open",
    created: "May 12",
    updated: "1 day ago",
    assignee: "Unassigned",
  },
  {
    id: "TK-1031",
    title: "New employee workstation setup — John Smith",
    priority: "low",
    status: "resolved",
    created: "May 10",
    updated: "May 11",
    assignee: "Tech Team",
  },
  {
    id: "TK-1028",
    title: "Ransomware alert on accounting PC",
    priority: "critical",
    status: "resolved",
    created: "May 8",
    updated: "May 8",
    assignee: "Skyler Blue",
  },
];

const INVOICES = [
  {
    id: "INV-2024-042",
    desc: "Managed IT Services — May 2025",
    amount: 1299,
    status: "paid",
    date: "May 1",
    due: "May 15",
  },
  {
    id: "INV-2024-041",
    desc: "Emergency On-site Support (4hrs)",
    amount: 480,
    status: "paid",
    date: "Apr 28",
    due: "May 12",
  },
  {
    id: "INV-2024-040",
    desc: "Network Infrastructure Upgrade",
    amount: 3840,
    status: "pending",
    date: "Apr 15",
    due: "May 15",
  },
  {
    id: "INV-2024-039",
    desc: "Managed IT Services — Apr 2025",
    amount: 1299,
    status: "paid",
    date: "Apr 1",
    due: "Apr 15",
  },
];

const DEVICES = [
  {
    name: "SKYLER-MAIN-PC",
    type: "Workstation",
    os: "Windows 11 Pro",
    status: "online",
    cpu: 24,
    ram: 68,
    disk: 42,
    lastSeen: "Now",
  },
  {
    name: "SERVER-01",
    type: "Server",
    os: "Ubuntu 22.04",
    status: "online",
    cpu: 12,
    ram: 45,
    disk: 78,
    lastSeen: "Now",
  },
  {
    name: "LAPTOP-JOHN",
    type: "Laptop",
    os: "Windows 11",
    status: "offline",
    cpu: 0,
    ram: 0,
    disk: 55,
    lastSeen: "3 hrs ago",
  },
  {
    name: "NAS-BACKUP",
    type: "NAS",
    os: "TrueNAS",
    status: "online",
    cpu: 8,
    ram: 32,
    disk: 91,
    lastSeen: "Now",
  },
];

const PRIORITY_COLORS: Record<string, string> = {
  critical: "bg-red-500/10 text-red-400 border-red-500/20",
  high: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  medium: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  low: "bg-blue-500/10 text-blue-400 border-blue-500/20",
};

const STATUS_COLORS: Record<string, string> = {
  "in-progress": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  open: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  resolved: "bg-green-500/10 text-green-400 border-green-500/20",
  closed: "bg-muted text-muted-foreground",
};

export default function ITClientPortal() {
  const [tab, setTab] = useState<
    "overview" | "tickets" | "invoices" | "devices"
  >("overview");

  const openTickets = TICKETS.filter(
    t => t.status !== "resolved" && t.status !== "closed"
  ).length;
  const pendingAmount = INVOICES.filter(i => i.status === "pending").reduce(
    (s, i) => s + i.amount,
    0
  );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Monitor className="h-6 w-6 text-blue-400" />
            IT Client Portal
          </h1>
          <p className="text-sm text-muted-foreground">
            Skyler Blue IT Resolutions — Client Dashboard
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => toast.info("Calling support: 479-406-7123")}
          >
            <Phone className="h-4 w-4 mr-2" />
            Call Support
          </Button>
          <Button
            className="bg-blue-600 text-white border-0"
            size="sm"
            onClick={() => setTab("tickets")}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Ticket
          </Button>
        </div>
      </div>

      {/* SLA Status Banner */}
      <div className="flex items-center gap-3 p-3 rounded-xl bg-green-500/5 border border-green-500/20">
        <CheckCircle className="h-5 w-5 text-green-400 shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-bold text-green-300">
            All Systems Operational
          </p>
          <p className="text-xs text-muted-foreground">
            SLA Uptime: 99.97% this month · Response time: &lt;2 hrs avg
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Contract: Managed Pro</p>
          <p className="text-xs text-green-400">Renews Jun 1, 2025</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {(["overview", "tickets", "invoices", "devices"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${tab === t ? "bg-blue-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="space-y-4">
          {/* KPIs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              {
                label: "Open Tickets",
                value: String(openTickets),
                icon: Ticket,
                color: "text-orange-400",
                sub: "2 in progress",
              },
              {
                label: "Devices Monitored",
                value: String(DEVICES.length),
                icon: Monitor,
                color: "text-blue-400",
                sub: `${DEVICES.filter(d => d.status === "online").length} online`,
              },
              {
                label: "Pending Invoice",
                value: `$${pendingAmount.toLocaleString()}`,
                icon: DollarSign,
                color: "text-red-400",
                sub: "Due May 15",
              },
              {
                label: "SLA Uptime",
                value: "99.97%",
                icon: Activity,
                color: "text-green-400",
                sub: "This month",
              },
            ].map(({ label, value, icon: Icon, color, sub }) => (
              <Card key={label} className="border-border/50">
                <CardContent className="pt-4 pb-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className={`h-4 w-4 ${color}`} />
                    <span className="text-xs text-muted-foreground">
                      {label}
                    </span>
                  </div>
                  <p className="text-xl font-black">{value}</p>
                  <p className="text-xs text-muted-foreground">{sub}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Tickets */}
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-bold">
                  Recent Tickets
                </CardTitle>
                <button
                  className="text-xs text-blue-400 hover:text-blue-300"
                  onClick={() => setTab("tickets")}
                >
                  View all <ChevronRight className="h-3 w-3 inline" />
                </button>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {TICKETS.slice(0, 3).map(ticket => (
                <div
                  key={ticket.id}
                  className="flex items-center gap-3 py-2 border-b border-border/20 last:border-0"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-mono text-muted-foreground">
                        {ticket.id}
                      </span>
                      <Badge
                        className={`text-xs capitalize ${PRIORITY_COLORS[ticket.priority]}`}
                      >
                        {ticket.priority}
                      </Badge>
                    </div>
                    <p className="text-sm font-medium line-clamp-1">
                      {ticket.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Updated {ticket.updated}
                    </p>
                  </div>
                  <Badge
                    className={`text-xs capitalize shrink-0 ${STATUS_COLORS[ticket.status]}`}
                  >
                    {ticket.status.replace("-", " ")}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Device Health */}
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-bold">
                  Device Health
                </CardTitle>
                <button
                  className="text-xs text-blue-400 hover:text-blue-300"
                  onClick={() => setTab("devices")}
                >
                  View all <ChevronRight className="h-3 w-3 inline" />
                </button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {DEVICES.filter(d => d.status === "online").map(device => (
                <div key={device.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium">{device.name}</span>
                    <span className="text-muted-foreground">{device.type}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    {[
                      { label: "CPU", value: device.cpu },
                      { label: "RAM", value: device.ram },
                      { label: "Disk", value: device.disk },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <div className="flex justify-between mb-0.5">
                          <span className="text-muted-foreground">{label}</span>
                          <span
                            className={
                              value > 80
                                ? "text-red-400"
                                : value > 60
                                  ? "text-yellow-400"
                                  : "text-green-400"
                            }
                          >
                            {value}%
                          </span>
                        </div>
                        <Progress value={value} className="h-1" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="border-blue-500/20 bg-blue-500/3">
            <CardContent className="py-4 px-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-black text-lg">
                  SB
                </div>
                <div>
                  <p className="font-black">Skyler Blue IT Resolutions</p>
                  <p className="text-sm text-muted-foreground">
                    Your dedicated IT partner
                  </p>
                </div>
                <div className="ml-auto flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 text-xs"
                    onClick={() => toast.info("Calling 479-406-7123")}
                  >
                    <Phone className="h-3.5 w-3.5 mr-1.5" />
                    479-406-7123
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 text-xs"
                    onClick={() => toast.info("Opening email")}
                  >
                    <Mail className="h-3.5 w-3.5 mr-1.5" />
                    Email
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "tickets" && (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-sm">
              All Tickets ({TICKETS.length})
            </h3>
            <Button
              className="bg-blue-600 text-white border-0 h-8 text-xs"
              onClick={() => toast.success("New ticket form opened")}
            >
              <Plus className="h-3.5 w-3.5 mr-1.5" />
              New Ticket
            </Button>
          </div>
          {TICKETS.map((ticket, i) => (
            <motion.div
              key={ticket.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card
                className="border-border/50 hover:border-blue-500/20 transition-colors cursor-pointer"
                onClick={() => toast.info(`Opening ticket ${ticket.id}`)}
              >
                <CardContent className="py-3 px-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-muted-foreground">
                          {ticket.id}
                        </span>
                        <Badge
                          className={`text-xs capitalize ${PRIORITY_COLORS[ticket.priority]}`}
                        >
                          {ticket.priority}
                        </Badge>
                        <Badge
                          className={`text-xs capitalize ${STATUS_COLORS[ticket.status]}`}
                        >
                          {ticket.status.replace("-", " ")}
                        </Badge>
                      </div>
                      <p className="font-bold text-sm">{ticket.title}</p>
                      <div className="flex gap-3 mt-1 text-xs text-muted-foreground">
                        <span>Created: {ticket.created}</span>
                        <span>Updated: {ticket.updated}</span>
                        <span>Assignee: {ticket.assignee}</span>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "invoices" && (
        <div className="space-y-3">
          {INVOICES.map((inv, i) => (
            <Card key={inv.id} className="border-border/50">
              <CardContent className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-muted/30 flex items-center justify-center shrink-0">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{inv.desc}</p>
                    <div className="flex gap-3 text-xs text-muted-foreground mt-0.5">
                      <span>{inv.id}</span>
                      <span>Issued: {inv.date}</span>
                      <span>Due: {inv.due}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-lg">
                      ${inv.amount.toLocaleString()}
                    </p>
                    <Badge
                      className={`text-xs ${inv.status === "paid" ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-red-500/10 text-red-400 border-red-500/20"}`}
                    >
                      {inv.status}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 text-xs"
                      onClick={() => toast.success("Downloading invoice")}
                    >
                      <Download className="h-3.5 w-3.5" />
                    </Button>
                    {inv.status === "pending" && (
                      <Button
                        size="sm"
                        className="h-7 text-xs bg-green-600 text-white border-0"
                        onClick={() => toast.success("Opening payment portal")}
                      >
                        Pay Now
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "devices" && (
        <div className="space-y-3">
          {DEVICES.map((device, i) => (
            <Card key={device.name} className="border-border/50">
              <CardContent className="py-4 px-4">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`h-3 w-3 rounded-full ${device.status === "online" ? "bg-green-400" : "bg-muted-foreground"}`}
                  />
                  <div className="flex-1">
                    <p className="font-bold text-sm">{device.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {device.type} · {device.os} · Last seen: {device.lastSeen}
                    </p>
                  </div>
                  <Badge
                    className={`text-xs ${device.status === "online" ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-muted text-muted-foreground"}`}
                  >
                    {device.status}
                  </Badge>
                </div>
                {device.status === "online" && (
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "CPU", value: device.cpu, icon: Cpu },
                      { label: "RAM", value: device.ram, icon: Activity },
                      { label: "Disk", value: device.disk, icon: HardDrive },
                    ].map(({ label, value, icon: Icon }) => (
                      <div key={label} className="p-2 rounded-lg bg-muted/20">
                        <div className="flex items-center gap-1 mb-1">
                          <Icon className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {label}
                          </span>
                        </div>
                        <p
                          className={`text-sm font-black ${value > 80 ? "text-red-400" : value > 60 ? "text-yellow-400" : "text-green-400"}`}
                        >
                          {value}%
                        </p>
                        <Progress value={value} className="h-1 mt-1" />
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
