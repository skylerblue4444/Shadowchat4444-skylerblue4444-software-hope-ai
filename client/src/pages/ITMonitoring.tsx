import { useState } from "react";
import { motion } from "framer-motion";
import {
  Monitor,
  Server,
  Wifi,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Cpu,
  HardDrive,
  Activity,
  TrendingUp,
  Bell,
  RefreshCw,
  Globe,
  Database,
  Zap,
  Eye,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const SERVERS = [
  {
    id: "srv1",
    name: "ShadowChat API Server",
    ip: "10.0.1.1",
    status: "online",
    cpu: 42,
    ram: 68,
    disk: 54,
    uptime: "99.98%",
    location: "US-East",
    type: "API",
  },
  {
    id: "srv2",
    name: "Database Primary",
    ip: "10.0.1.2",
    status: "online",
    cpu: 28,
    ram: 84,
    disk: 72,
    uptime: "99.99%",
    location: "US-East",
    type: "DB",
  },
  {
    id: "srv3",
    name: "CDN Edge Node — EU",
    ip: "10.0.2.1",
    status: "online",
    cpu: 18,
    ram: 42,
    disk: 38,
    uptime: "100%",
    location: "EU-West",
    type: "CDN",
  },
  {
    id: "srv4",
    name: "Blockchain Node",
    ip: "10.0.1.3",
    status: "warning",
    cpu: 88,
    ram: 92,
    disk: 84,
    uptime: "99.84%",
    location: "US-West",
    type: "Node",
  },
  {
    id: "srv5",
    name: "Media Server",
    ip: "10.0.1.4",
    status: "online",
    cpu: 54,
    ram: 62,
    disk: 48,
    uptime: "99.92%",
    location: "US-East",
    type: "Media",
  },
  {
    id: "srv6",
    name: "AI Inference Server",
    ip: "10.0.3.1",
    status: "offline",
    cpu: 0,
    ram: 0,
    disk: 62,
    uptime: "98.40%",
    location: "US-West",
    type: "AI",
  },
];

const UPTIME_DATA = [
  { time: "00:00", api: 99.9, db: 100, cdn: 100 },
  { time: "04:00", api: 100, db: 100, cdn: 100 },
  { time: "08:00", api: 99.8, db: 100, cdn: 100 },
  { time: "12:00", api: 99.9, db: 99.9, cdn: 100 },
  { time: "16:00", api: 100, db: 100, cdn: 100 },
  { time: "20:00", api: 99.7, db: 100, cdn: 100 },
  { time: "Now", api: 100, db: 100, cdn: 100 },
];

const ALERTS = [
  {
    id: "al1",
    severity: "critical",
    server: "Blockchain Node",
    message: "CPU usage at 88% — above 85% threshold",
    time: "5m ago",
    resolved: false,
  },
  {
    id: "al2",
    severity: "critical",
    server: "AI Inference Server",
    message: "Server offline — health check failed",
    time: "12m ago",
    resolved: false,
  },
  {
    id: "al3",
    severity: "warning",
    server: "Database Primary",
    message: "RAM usage at 84% — approaching limit",
    time: "28m ago",
    resolved: false,
  },
  {
    id: "al4",
    severity: "info",
    server: "ShadowChat API",
    message: "Deployment completed successfully",
    time: "1h ago",
    resolved: true,
  },
];

const SERVICES = [
  {
    name: "ShadowChat Web App",
    url: "shadowchat.app",
    status: "operational",
    responseTime: 124,
    uptime: "99.98%",
  },
  {
    name: "API Gateway",
    url: "api.shadowchat.app",
    status: "operational",
    responseTime: 48,
    uptime: "99.99%",
  },
  {
    name: "WebSocket Server",
    url: "ws.shadowchat.app",
    status: "operational",
    responseTime: 12,
    uptime: "99.97%",
  },
  {
    name: "Blockchain RPC",
    url: "rpc.shadowchain.io",
    status: "degraded",
    responseTime: 840,
    uptime: "99.84%",
  },
  {
    name: "AI Services",
    url: "ai.shadowchat.app",
    status: "outage",
    responseTime: 0,
    uptime: "98.40%",
  },
  {
    name: "CDN",
    url: "cdn.shadowchat.app",
    status: "operational",
    responseTime: 18,
    uptime: "100%",
  },
];

const STATUS_COLORS: Record<string, string> = {
  operational: "bg-green-500/10 text-green-400 border-green-500/20",
  degraded: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  outage: "bg-red-500/10 text-red-400 border-red-500/20",
  online: "bg-green-500/10 text-green-400 border-green-500/20",
  warning: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  offline: "bg-red-500/10 text-red-400 border-red-500/20",
};

const SEVERITY_COLORS: Record<string, string> = {
  critical: "border-red-500/20 bg-red-500/5",
  warning: "border-yellow-500/20 bg-yellow-500/5",
  info: "border-blue-500/20 bg-blue-500/5",
};

export default function ITMonitoring() {
  const [tab, setTab] = useState<"servers" | "services" | "alerts" | "uptime">(
    "servers"
  );
  const [lastRefresh] = useState("Just now");

  const onlineCount = SERVERS.filter(s => s.status === "online").length;
  const warningCount = SERVERS.filter(s => s.status === "warning").length;
  const offlineCount = SERVERS.filter(s => s.status === "offline").length;
  const unresolvedAlerts = ALERTS.filter(a => !a.resolved).length;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Monitor className="h-6 w-6 text-blue-400" />
            IT Monitoring
          </h1>
          <p className="text-sm text-muted-foreground">
            Real-time infrastructure monitoring — Skyler Blue IT Resolutions
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="h-8 text-xs"
          onClick={() => toast.success("Refreshing all monitors...")}
        >
          <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
          Refresh
        </Button>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-4 gap-2">
        {[
          {
            label: "Online",
            value: String(onlineCount),
            icon: CheckCircle,
            color: "text-green-400",
          },
          {
            label: "Warning",
            value: String(warningCount),
            icon: AlertTriangle,
            color: "text-yellow-400",
          },
          {
            label: "Offline",
            value: String(offlineCount),
            icon: XCircle,
            color: "text-red-400",
          },
          {
            label: "Alerts",
            value: String(unresolvedAlerts),
            icon: Bell,
            color: "text-orange-400",
          },
        ].map(({ label, value, icon: Icon, color }) => (
          <Card key={label} className="border-border/50">
            <CardContent className="pt-2 pb-2 text-center">
              <Icon className={`h-4 w-4 ${color} mx-auto mb-1`} />
              <p className={`text-xl font-black ${color}`}>{value}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {(["servers", "services", "alerts", "uptime"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${tab === t ? "bg-blue-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "servers" && (
        <div className="space-y-3">
          {SERVERS.map((server, i) => (
            <motion.div
              key={server.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card
                className={`border-border/50 ${server.status === "offline" ? "border-red-500/20" : server.status === "warning" ? "border-yellow-500/20" : ""}`}
              >
                <CardContent className="py-4 px-4">
                  <div className="flex items-start gap-3 mb-3">
                    <Server
                      className={`h-5 w-5 shrink-0 mt-0.5 ${server.status === "online" ? "text-green-400" : server.status === "warning" ? "text-yellow-400" : "text-red-400"}`}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-black text-sm">{server.name}</p>
                        <Badge
                          className={`text-xs capitalize ${STATUS_COLORS[server.status]}`}
                        >
                          {server.status}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {server.type}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {server.ip} · {server.location} · Uptime:{" "}
                        {server.uptime}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 text-xs shrink-0"
                      onClick={() =>
                        toast.info(`Viewing ${server.name} details`)
                      }
                    >
                      Details
                    </Button>
                  </div>
                  {server.status !== "offline" && (
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        {
                          label: "CPU",
                          value: server.cpu,
                          icon: Cpu,
                          color:
                            server.cpu > 80
                              ? "text-red-400"
                              : server.cpu > 60
                                ? "text-yellow-400"
                                : "text-green-400",
                        },
                        {
                          label: "RAM",
                          value: server.ram,
                          icon: Activity,
                          color:
                            server.ram > 80
                              ? "text-red-400"
                              : server.ram > 60
                                ? "text-yellow-400"
                                : "text-green-400",
                        },
                        {
                          label: "Disk",
                          value: server.disk,
                          icon: HardDrive,
                          color:
                            server.disk > 80
                              ? "text-red-400"
                              : server.disk > 60
                                ? "text-yellow-400"
                                : "text-green-400",
                        },
                      ].map(({ label, value, icon: Icon, color }) => (
                        <div key={label}>
                          <div className="flex items-center gap-1 mb-1">
                            <Icon className={`h-3 w-3 ${color}`} />
                            <span className="text-xs text-muted-foreground">
                              {label}
                            </span>
                            <span
                              className={`text-xs font-bold ml-auto ${color}`}
                            >
                              {value}%
                            </span>
                          </div>
                          <Progress value={value} className="h-1.5" />
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "services" && (
        <div className="space-y-3">
          {SERVICES.map((service, i) => (
            <Card key={service.name} className="border-border/50">
              <CardContent className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <Globe
                    className={`h-5 w-5 shrink-0 ${service.status === "operational" ? "text-green-400" : service.status === "degraded" ? "text-yellow-400" : "text-red-400"}`}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-sm">{service.name}</p>
                      <Badge
                        className={`text-xs capitalize ${STATUS_COLORS[service.status]}`}
                      >
                        {service.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {service.url} · Uptime: {service.uptime}
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-black text-sm ${service.responseTime < 100 ? "text-green-400" : service.responseTime < 500 ? "text-yellow-400" : "text-red-400"}`}
                    >
                      {service.responseTime}ms
                    </p>
                    <p className="text-xs text-muted-foreground">response</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "alerts" && (
        <div className="space-y-3">
          {ALERTS.map((alert, i) => (
            <Card
              key={alert.id}
              className={`border ${SEVERITY_COLORS[alert.severity]} ${alert.resolved ? "opacity-50" : ""}`}
            >
              <CardContent className="py-3 px-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle
                    className={`h-5 w-5 shrink-0 mt-0.5 ${alert.severity === "critical" ? "text-red-400" : alert.severity === "warning" ? "text-yellow-400" : "text-blue-400"}`}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <Badge
                        className={`text-xs capitalize ${alert.severity === "critical" ? "bg-red-500/10 text-red-400 border-red-500/20" : alert.severity === "warning" ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" : "bg-blue-500/10 text-blue-400 border-blue-500/20"}`}
                      >
                        {alert.severity}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {alert.server}
                      </span>
                    </div>
                    <p className="text-sm font-medium">{alert.message}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {alert.time}
                    </p>
                  </div>
                  {!alert.resolved && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 text-xs shrink-0"
                      onClick={() => toast.success("Alert acknowledged")}
                    >
                      Ack
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "uptime" && (
        <div className="space-y-4">
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold">
                24-Hour Uptime
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={UPTIME_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis
                    dataKey="time"
                    tick={{ fontSize: 10, fill: "#6b7280" }}
                  />
                  <YAxis
                    domain={[99, 100]}
                    tick={{ fontSize: 10, fill: "#6b7280" }}
                    tickFormatter={v => `${v}%`}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#1a1a2e",
                      border: "1px solid #333",
                      borderRadius: 8,
                      fontSize: 11,
                    }}
                    formatter={(v: any) => `${v}%`}
                  />
                  <Line
                    type="monotone"
                    dataKey="api"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={false}
                    name="API"
                  />
                  <Line
                    type="monotone"
                    dataKey="db"
                    stroke="#22c55e"
                    strokeWidth={2}
                    dot={false}
                    name="DB"
                  />
                  <Line
                    type="monotone"
                    dataKey="cdn"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    dot={false}
                    name="CDN"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "API Server", uptime: "99.98%", color: "text-blue-400" },
              { label: "Database", uptime: "99.99%", color: "text-green-400" },
              { label: "CDN", uptime: "100%", color: "text-purple-400" },
            ].map(({ label, uptime, color }) => (
              <Card key={label} className="border-border/50 text-center">
                <CardContent className="pt-3 pb-3">
                  <p className={`text-xl font-black ${color}`}>{uptime}</p>
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="text-xs text-muted-foreground">30-day avg</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
