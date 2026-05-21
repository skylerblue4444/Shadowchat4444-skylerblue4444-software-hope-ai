import { useState } from "react";
import { motion } from "framer-motion";
import {
  Monitor,
  Server,
  Shield,
  Wifi,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  HardDrive,
  Cpu,
  Activity,
  TrendingUp,
  Phone,
  Mail,
  MapPin,
  Zap,
  BarChart2,
  FileText,
  Settings,
  ChevronRight,
  RefreshCw,
  Bell,
  Download,
  Plus,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const CLIENTS = [
  {
    name: "Skyler Blue IT Resolutions",
    devices: 48,
    tickets: 3,
    health: 98,
    status: "healthy",
  },
  {
    name: "CryptoKing Enterprises",
    devices: 124,
    tickets: 8,
    health: 84,
    status: "warning",
  },
  {
    name: "NFT Gallery LLC",
    devices: 12,
    tickets: 1,
    health: 99,
    status: "healthy",
  },
  {
    name: "DeFi Capital Group",
    devices: 84,
    tickets: 12,
    health: 72,
    status: "critical",
  },
  {
    name: "Moon Mission Media",
    devices: 28,
    tickets: 2,
    health: 96,
    status: "healthy",
  },
];

const TICKETS = [
  {
    id: "TKT-001",
    client: "CryptoKing Enterprises",
    issue: "Email server down — 24 users affected",
    priority: "critical",
    age: "2h",
    assignee: "Skyler Blue",
  },
  {
    id: "TKT-002",
    client: "DeFi Capital Group",
    issue: "VPN connectivity issues for remote workers",
    priority: "high",
    age: "4h",
    assignee: "Tech Team",
  },
  {
    id: "TKT-003",
    client: "DeFi Capital Group",
    issue: "Ransomware alert — endpoint quarantined",
    priority: "critical",
    age: "1h",
    assignee: "Skyler Blue",
  },
  {
    id: "TKT-004",
    client: "Skyler Blue IT Resolutions",
    issue: "Printer offline in Building A",
    priority: "low",
    age: "1d",
    assignee: "Tech Team",
  },
  {
    id: "TKT-005",
    client: "Moon Mission Media",
    issue: "New employee onboarding — 3 accounts needed",
    priority: "medium",
    age: "6h",
    assignee: "Tech Team",
  },
];

const DEVICES = [
  {
    name: "PROD-SERVER-01",
    type: "Server",
    os: "Windows Server 2022",
    status: "online",
    cpu: 24,
    ram: 48,
    disk: 62,
  },
  {
    name: "FIREWALL-01",
    type: "Firewall",
    os: "pfSense 2.7",
    status: "online",
    cpu: 8,
    ram: 12,
    disk: 18,
  },
  {
    name: "NAS-BACKUP-01",
    type: "Storage",
    os: "TrueNAS",
    status: "online",
    cpu: 4,
    ram: 8,
    disk: 84,
  },
  {
    name: "WORKSTATION-CEO",
    type: "Workstation",
    os: "Windows 11 Pro",
    status: "online",
    cpu: 12,
    ram: 28,
    disk: 44,
  },
  {
    name: "SWITCH-CORE-01",
    type: "Network",
    os: "Cisco IOS",
    status: "online",
    cpu: 2,
    ram: 4,
    disk: 8,
  },
];

const PRIORITY_COLORS: Record<string, string> = {
  critical: "bg-red-500/10 text-red-400 border-red-500/20",
  high: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  medium: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  low: "bg-green-500/10 text-green-400 border-green-500/20",
};

const STATUS_COLORS: Record<string, string> = {
  healthy: "text-green-400",
  warning: "text-yellow-400",
  critical: "text-red-400",
};

export default function SkyBlueITDashboard() {
  const [tab, setTab] = useState<
    "overview" | "tickets" | "devices" | "clients" | "reports"
  >("overview");

  const criticalTickets = TICKETS.filter(t => t.priority === "critical").length;
  const totalDevices = DEVICES.length;
  const avgHealth = Math.round(
    CLIENTS.reduce((s, c) => s + c.health, 0) / CLIENTS.length
  );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Monitor className="h-6 w-6 text-blue-400" />
            Skyler Blue IT Operations
          </h1>
          <p className="text-sm text-muted-foreground">
            Innovative Information Technology Resolutions · 479-406-7123
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="h-8 text-xs"
            onClick={() => toast.info("Refreshing all data...")}
          >
            <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
            Refresh
          </Button>
          <Button
            size="sm"
            className="h-8 text-xs bg-blue-600 text-white border-0"
            onClick={() => toast.success("New ticket created!")}
          >
            <Plus className="h-3.5 w-3.5 mr-1.5" />
            New Ticket
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {[
          {
            label: "Active Clients",
            value: String(CLIENTS.length),
            icon: Users,
            color: "text-blue-400",
            bg: "bg-blue-500/10",
          },
          {
            label: "Open Tickets",
            value: String(TICKETS.length),
            icon: FileText,
            color: "text-yellow-400",
            bg: "bg-yellow-500/10",
          },
          {
            label: "Critical Alerts",
            value: String(criticalTickets),
            icon: AlertTriangle,
            color: "text-red-400",
            bg: "bg-red-500/10",
          },
          {
            label: "Avg Health",
            value: `${avgHealth}%`,
            icon: Activity,
            color: "text-green-400",
            bg: "bg-green-500/10",
          },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <Card key={label} className="border-border/50">
            <CardContent className="pt-3 pb-3">
              <div
                className={`h-8 w-8 rounded-xl ${bg} flex items-center justify-center mb-2`}
              >
                <Icon className={`h-4 w-4 ${color}`} />
              </div>
              <p className={`font-black text-xl ${color}`}>{value}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {(
          ["overview", "tickets", "devices", "clients", "reports"] as const
        ).map(t => (
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
          {/* Critical Alerts */}
          {criticalTickets > 0 && (
            <div className="p-3 rounded-xl bg-red-500/5 border border-red-500/20">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-red-400" />
                <p className="text-sm font-bold text-red-400">
                  {criticalTickets} Critical Issues Require Immediate Attention
                </p>
              </div>
              {TICKETS.filter(t => t.priority === "critical").map(ticket => (
                <div
                  key={ticket.id}
                  className="flex items-center justify-between py-1.5 border-t border-red-500/10"
                >
                  <div>
                    <p className="text-xs font-bold">
                      {ticket.id} — {ticket.client}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {ticket.issue}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    className="h-6 text-xs bg-red-600 text-white border-0 ml-2 shrink-0"
                    onClick={() => toast.info(`Opening ${ticket.id}...`)}
                  >
                    Resolve
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Client Health */}
          <h3 className="font-bold text-sm">Client Health Overview</h3>
          {CLIENTS.map((client, i) => (
            <Card key={client.name} className="border-border/50">
              <CardContent className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`h-3 w-3 rounded-full shrink-0 ${client.status === "healthy" ? "bg-green-400" : client.status === "warning" ? "bg-yellow-400" : "bg-red-400"}`}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-bold text-sm">{client.name}</p>
                      <span
                        className={`text-xs font-bold ${STATUS_COLORS[client.status]}`}
                      >
                        {client.health}%
                      </span>
                    </div>
                    <Progress value={client.health} className="h-1.5" />
                    <div className="flex gap-3 mt-1 text-xs text-muted-foreground">
                      <span>{client.devices} devices</span>
                      <span>{client.tickets} open tickets</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "tickets" && (
        <div className="space-y-3">
          {TICKETS.map((ticket, i) => (
            <motion.div
              key={ticket.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="border-border/50">
                <CardContent className="py-3 px-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-xs font-mono text-muted-foreground">
                          {ticket.id}
                        </span>
                        <Badge
                          className={`text-xs ${PRIORITY_COLORS[ticket.priority]}`}
                        >
                          {ticket.priority.toUpperCase()}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {ticket.age} ago
                        </span>
                      </div>
                      <p className="font-bold text-sm">{ticket.issue}</p>
                      <p className="text-xs text-muted-foreground">
                        {ticket.client} · Assigned: {ticket.assignee}
                      </p>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 text-xs"
                        onClick={() => toast.info(`Opening ${ticket.id}...`)}
                      >
                        View
                      </Button>
                      <Button
                        size="sm"
                        className="h-7 text-xs bg-green-600 text-white border-0"
                        onClick={() => toast.success(`${ticket.id} resolved!`)}
                      >
                        Resolve
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "devices" && (
        <div className="space-y-3">
          {DEVICES.map((device, i) => (
            <Card key={device.name} className="border-border/50">
              <CardContent className="py-3 px-4">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                    {device.type === "Server" ? (
                      <Server className="h-5 w-5 text-blue-400" />
                    ) : device.type === "Firewall" ? (
                      <Shield className="h-5 w-5 text-green-400" />
                    ) : device.type === "Network" ? (
                      <Wifi className="h-5 w-5 text-purple-400" />
                    ) : (
                      <Monitor className="h-5 w-5 text-yellow-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-black text-sm">{device.name}</p>
                      <Badge className="text-xs bg-green-500/10 text-green-400 border-green-500/20">
                        ● {device.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {device.type} · {device.os}
                    </p>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {[
                        { label: "CPU", value: device.cpu, icon: Cpu },
                        { label: "RAM", value: device.ram, icon: Activity },
                        { label: "Disk", value: device.disk, icon: HardDrive },
                      ].map(({ label, value, icon: Icon }) => (
                        <div key={label}>
                          <div className="flex items-center justify-between text-xs mb-0.5">
                            <span className="text-muted-foreground">
                              {label}
                            </span>
                            <span
                              className={`font-bold ${value > 80 ? "text-red-400" : value > 60 ? "text-yellow-400" : "text-green-400"}`}
                            >
                              {value}%
                            </span>
                          </div>
                          <Progress value={value} className="h-1" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "clients" && (
        <div className="space-y-3">
          {CLIENTS.map((client, i) => (
            <Card key={client.name} className="border-border/50">
              <CardContent className="py-4 px-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-2xl shrink-0">
                    🏢
                  </div>
                  <div className="flex-1">
                    <p className="font-black text-sm">{client.name}</p>
                    <div className="flex gap-3 text-xs text-muted-foreground mt-0.5">
                      <span>{client.devices} devices</span>
                      <span>{client.tickets} tickets</span>
                      <span className={STATUS_COLORS[client.status]}>
                        {client.health}% health
                      </span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 text-xs shrink-0"
                    onClick={() =>
                      toast.info(`Opening ${client.name} portal...`)
                    }
                  >
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          <Button
            className="w-full bg-blue-600 text-white border-0 font-bold"
            onClick={() => toast.success("Opening new client onboarding...")}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Client
          </Button>
        </div>
      )}

      {tab === "reports" && (
        <div className="space-y-3">
          {[
            {
              title: "Monthly SLA Report — April 2025",
              type: "SLA",
              date: "May 1, 2025",
              size: "2.4 MB",
            },
            {
              title: "Security Audit Report — Q1 2025",
              type: "Security",
              date: "Apr 1, 2025",
              size: "8.8 MB",
            },
            {
              title: "Network Performance Report — March 2025",
              type: "Performance",
              date: "Apr 1, 2025",
              size: "4.2 MB",
            },
            {
              title: "Incident Report — DeFi Capital Breach",
              type: "Incident",
              date: "Mar 15, 2025",
              size: "1.8 MB",
            },
          ].map((report, i) => (
            <Card key={report.title} className="border-border/50">
              <CardContent className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-blue-400 shrink-0" />
                  <div className="flex-1">
                    <p className="font-bold text-sm">{report.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {report.type} · {report.date} · {report.size}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 text-xs shrink-0"
                    onClick={() => toast.success("Downloading report...")}
                  >
                    <Download className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          <Button
            className="w-full bg-blue-600 text-white border-0 font-bold"
            onClick={() => toast.success("Generating new report...")}
          >
            <BarChart2 className="h-4 w-4 mr-2" />
            Generate New Report
          </Button>
        </div>
      )}

      {/* Contact Footer */}
      <Card className="border-blue-500/20 bg-blue-500/3">
        <CardContent className="py-4 px-4">
          <p className="font-black text-sm mb-2">
            Skyler Blue Spiller's Innovative IT Resolutions
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 text-blue-400" />
              479-406-7123
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 text-blue-400" />
              skylerblue4444@gmail.com
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-blue-400" />
              Arkansas, USA
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
