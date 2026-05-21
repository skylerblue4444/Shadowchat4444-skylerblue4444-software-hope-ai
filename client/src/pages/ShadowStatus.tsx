import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  RefreshCw,
  Globe,
  Zap,
  Shield,
  Database,
  Server,
  Wifi,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

type ComponentStatus = "operational" | "degraded" | "outage" | "maintenance";
type Component = {
  name: string;
  status: ComponentStatus;
  uptime: string;
  icon: React.ElementType;
};

const COMPONENTS: Component[] = [
  {
    name: "Trading Engine",
    status: "operational",
    uptime: "99.99%",
    icon: Activity,
  },
  { name: "API Gateway", status: "operational", uptime: "99.98%", icon: Globe },
  {
    name: "WebSocket (Live Data)",
    status: "operational",
    uptime: "99.95%",
    icon: Wifi,
  },
  {
    name: "Database Cluster",
    status: "operational",
    uptime: "99.99%",
    icon: Database,
  },
  {
    name: "Blockchain Node",
    status: "degraded",
    uptime: "99.44%",
    icon: Server,
  },
  { name: "CDN / Media", status: "operational", uptime: "99.97%", icon: Zap },
  {
    name: "Authentication",
    status: "operational",
    uptime: "100%",
    icon: Shield,
  },
  {
    name: "Payment Processing",
    status: "operational",
    uptime: "99.96%",
    icon: CheckCircle,
  },
  {
    name: "IT Services Portal",
    status: "operational",
    uptime: "99.90%",
    icon: Globe,
  },
  {
    name: "Email Notifications",
    status: "maintenance",
    uptime: "99.80%",
    icon: Clock,
  },
];

const INCIDENTS = [
  {
    id: "INC-044",
    title: "Blockchain Node Sync Delay",
    status: "investigating",
    severity: "minor",
    started: "May 15, 2026 10:30 AM CDT",
    updates: [
      "10:30 AM — Investigating increased latency on blockchain node sync.",
      "10:45 AM — Identified root cause: network congestion on Ethereum mainnet.",
      "11:00 AM — Mitigation in progress. Fallback nodes activated.",
    ],
  },
  {
    id: "INC-043",
    title: "Email Notification Maintenance",
    status: "scheduled",
    severity: "none",
    started: "May 16, 2026 2:00 AM CDT",
    updates: [
      "Scheduled maintenance window: May 16, 2:00-4:00 AM CDT. Email notifications will be queued and delivered after maintenance.",
    ],
  },
];

const PAST_INCIDENTS = [
  {
    title: "API Rate Limiting Issue",
    date: "May 10, 2026",
    duration: "22 min",
    severity: "minor",
  },
  {
    title: "Trading Engine Latency",
    date: "May 3, 2026",
    duration: "8 min",
    severity: "minor",
  },
  {
    title: "Scheduled DB Maintenance",
    date: "Apr 28, 2026",
    duration: "45 min",
    severity: "none",
  },
];

const STATUS_CONFIG: Record<
  ComponentStatus,
  { color: string; bg: string; label: string; icon: React.ElementType }
> = {
  operational: {
    color: "text-green-400",
    bg: "bg-green-500/10",
    label: "Operational",
    icon: CheckCircle,
  },
  degraded: {
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    label: "Degraded",
    icon: AlertTriangle,
  },
  outage: {
    color: "text-red-400",
    bg: "bg-red-500/10",
    label: "Outage",
    icon: XCircle,
  },
  maintenance: {
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    label: "Maintenance",
    icon: Clock,
  },
};

const SEVERITY_COLORS: Record<string, string> = {
  none: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  minor: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  major: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function ShadowStatus() {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);

  const overallStatus = COMPONENTS.some(c => c.status === "outage")
    ? "outage"
    : COMPONENTS.some(c => c.status === "degraded")
      ? "degraded"
      : COMPONENTS.some(c => c.status === "maintenance")
        ? "maintenance"
        : "operational";

  const refresh = async () => {
    setRefreshing(true);
    await new Promise(r => setTimeout(r, 1000));
    setLastUpdated(new Date());
    setRefreshing(false);
    toast.success("Status refreshed");
  };

  const OVERALL_CONFIG = {
    operational: {
      color: "text-green-400",
      bg: "from-green-900/20 to-emerald-900/10 border-green-500/20",
      label: "All Systems Operational",
      emoji: "✅",
    },
    degraded: {
      color: "text-yellow-400",
      bg: "from-yellow-900/20 to-amber-900/10 border-yellow-500/20",
      label: "Partial System Degradation",
      emoji: "⚠️",
    },
    outage: {
      color: "text-red-400",
      bg: "from-red-900/20 to-rose-900/10 border-red-500/20",
      label: "System Outage",
      emoji: "🔴",
    },
    maintenance: {
      color: "text-blue-400",
      bg: "from-blue-900/20 to-indigo-900/10 border-blue-500/20",
      label: "Scheduled Maintenance",
      emoji: "🔧",
    },
  };

  const overall = OVERALL_CONFIG[overallStatus];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Activity className="h-6 w-6 text-green-400" />
            Platform Status
          </h1>
          <p className="text-sm text-muted-foreground">
            Real-time system health and incident tracking
          </p>
        </div>
        <Button
          size="sm"
          variant="outline"
          className="h-8 text-xs"
          onClick={refresh}
          disabled={refreshing}
        >
          <RefreshCw
            className={`h-3.5 w-3.5 mr-1 ${refreshing ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>

      {/* Overall Status Banner */}
      <Card className={`border bg-gradient-to-br ${overall.bg}`}>
        <CardContent className="py-4 px-4 text-center">
          <p className="text-3xl mb-1">{overall.emoji}</p>
          <p className={`font-black text-lg ${overall.color}`}>
            {overall.label}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        </CardContent>
      </Card>

      {/* Uptime Stats */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "30-Day Uptime", value: "99.96%" },
          { label: "Incidents (30d)", value: "3" },
          { label: "Avg Response", value: "44ms" },
        ].map(s => (
          <Card key={s.label} className="border-border/50 text-center">
            <CardContent className="pt-2 pb-2">
              <p className="font-black text-sm text-green-400">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Component Status */}
      <div>
        <p className="text-xs font-bold text-muted-foreground mb-2">
          SYSTEM COMPONENTS
        </p>
        <div className="space-y-1.5">
          {COMPONENTS.map((comp, i) => {
            const config = STATUS_CONFIG[comp.status];
            const Icon = config.icon;
            return (
              <motion.div
                key={comp.name}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <Card className="border-border/50">
                  <CardContent className="py-2.5 px-4 flex items-center gap-3">
                    <comp.icon className="h-4 w-4 text-muted-foreground shrink-0" />
                    <p className="flex-1 text-sm font-medium">{comp.name}</p>
                    <p className="text-xs text-muted-foreground mr-2">
                      {comp.uptime}
                    </p>
                    <div
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${config.bg}`}
                    >
                      <Icon className={`h-3 w-3 ${config.color}`} />
                      <span className={`text-xs font-bold ${config.color}`}>
                        {config.label}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Active Incidents */}
      {INCIDENTS.length > 0 && (
        <div>
          <p className="text-xs font-bold text-muted-foreground mb-2">
            ACTIVE INCIDENTS
          </p>
          <div className="space-y-2">
            {INCIDENTS.map(inc => (
              <Card
                key={inc.id}
                className={`border ${inc.severity === "minor" ? "border-yellow-500/20 bg-yellow-900/5" : "border-blue-500/20 bg-blue-900/5"}`}
              >
                <CardContent className="py-3 px-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-bold text-sm">{inc.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {inc.id} · Started: {inc.started}
                      </p>
                    </div>
                    <div className="flex gap-1.5">
                      <Badge
                        className={`text-xs ${SEVERITY_COLORS[inc.severity]}`}
                      >
                        {inc.severity === "none" ? "Scheduled" : inc.severity}
                      </Badge>
                      <Badge className="text-xs bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
                        {inc.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-1">
                    {inc.updates.map((u, i) => (
                      <p
                        key={i}
                        className="text-xs text-muted-foreground flex items-start gap-1.5"
                      >
                        <span className="text-yellow-400 shrink-0">•</span>
                        {u}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Past Incidents */}
      <div>
        <p className="text-xs font-bold text-muted-foreground mb-2">
          PAST INCIDENTS (30 DAYS)
        </p>
        <div className="space-y-1.5">
          {PAST_INCIDENTS.map((inc, i) => (
            <Card key={inc.title} className="border-border/50 opacity-70">
              <CardContent className="py-2.5 px-4 flex items-center gap-3">
                <CheckCircle className="h-4 w-4 text-green-400 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{inc.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {inc.date} · Duration: {inc.duration}
                  </p>
                </div>
                <Badge className={`text-xs ${SEVERITY_COLORS[inc.severity]}`}>
                  {inc.severity === "none" ? "Maintenance" : inc.severity}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Button
        className="w-full h-10 text-xs bg-green-600 text-white border-0 font-bold"
        onClick={() => toast.info("Subscribing to status updates...")}
      >
        <Activity className="h-4 w-4 mr-2" />
        Subscribe to Status Updates
      </Button>
    </div>
  );
}
