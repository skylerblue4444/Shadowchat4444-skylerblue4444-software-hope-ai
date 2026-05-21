import { useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Activity,
  Eye,
  Lock,
  Wifi,
  Server,
  Globe,
  Zap,
  RefreshCw,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const THREATS = [
  {
    id: 1,
    type: "DDoS Attack",
    severity: "critical",
    source: "185.220.101.44 (Russia)",
    target: "API Gateway",
    time: "2 min ago",
    status: "blocked",
    icon: "⚡",
  },
  {
    id: 2,
    type: "SQL Injection Attempt",
    severity: "high",
    source: "103.21.244.0 (China)",
    target: "/api/users",
    time: "8 min ago",
    status: "blocked",
    icon: "💉",
  },
  {
    id: 3,
    type: "Brute Force Login",
    severity: "medium",
    source: "45.33.32.156 (US)",
    target: "Admin Panel",
    time: "15 min ago",
    status: "blocked",
    icon: "🔑",
  },
  {
    id: 4,
    type: "Port Scan",
    severity: "low",
    source: "Unknown",
    target: "All Ports",
    time: "1 hr ago",
    status: "monitoring",
    icon: "🔍",
  },
  {
    id: 5,
    type: "Phishing Email",
    severity: "high",
    source: "fake@shadowchat.ru",
    target: "User Emails",
    time: "2 hr ago",
    status: "quarantined",
    icon: "📧",
  },
];

const SERVICES = [
  {
    name: "Web Application Firewall",
    status: "active",
    uptime: "99.99%",
    icon: Shield,
  },
  { name: "DDoS Protection", status: "active", uptime: "100%", icon: Wifi },
  {
    name: "Intrusion Detection",
    status: "active",
    uptime: "99.97%",
    icon: Eye,
  },
  { name: "SSL/TLS Encryption", status: "active", uptime: "100%", icon: Lock },
  { name: "API Rate Limiting", status: "active", uptime: "99.99%", icon: Zap },
  {
    name: "Database Encryption",
    status: "warning",
    uptime: "99.44%",
    icon: Server,
  },
];

const SEVERITY_CONFIG: Record<string, { color: string; bg: string }> = {
  critical: { color: "text-red-400", bg: "bg-red-500/10 border-red-500/20" },
  high: {
    color: "text-orange-400",
    bg: "bg-orange-500/10 border-orange-500/20",
  },
  medium: {
    color: "text-yellow-400",
    bg: "bg-yellow-500/10 border-yellow-500/20",
  },
  low: { color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
};

export default function ShadowSentinel() {
  const [tab, setTab] = useState<"overview" | "threats" | "services" | "scan">(
    "overview"
  );
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  const runScan = async () => {
    setScanning(true);
    setScanProgress(0);
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(r => setTimeout(r, 200));
      setScanProgress(i);
    }
    setScanning(false);
    toast.success(
      "✅ Security scan complete! 0 critical vulnerabilities found."
    );
  };

  const threatsByLevel = {
    critical: THREATS.filter(t => t.severity === "critical").length,
    high: THREATS.filter(t => t.severity === "high").length,
    blocked: THREATS.filter(t => t.status === "blocked").length,
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Shield className="h-6 w-6 text-green-400" />
            ShadowSentinel
          </h1>
          <p className="text-sm text-muted-foreground">
            AI-powered cybersecurity threat detection and response
          </p>
        </div>
        <Badge className="bg-green-500/10 text-green-400 border-green-500/20 font-bold">
          🟢 Protected
        </Badge>
      </div>

      {/* Security Score */}
      <Card className="border-green-500/20 bg-gradient-to-br from-green-900/10 to-blue-900/5">
        <CardContent className="py-4 px-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Security Score</p>
              <p className="font-black text-4xl text-green-400">
                94<span className="text-xl">/100</span>
              </p>
              <p className="text-xs text-green-400 font-bold">
                Excellent — Enterprise Grade
              </p>
            </div>
            <div className="h-20 w-20 rounded-full border-4 border-green-500/30 flex items-center justify-center relative">
              <Shield className="h-10 w-10 text-green-400" />
              <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-green-500 flex items-center justify-center">
                <CheckCircle className="h-3 w-3 text-white" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-2">
        {[
          {
            label: "Threats Today",
            value: THREATS.length.toString(),
            icon: AlertTriangle,
            color: "text-red-400",
          },
          {
            label: "Blocked",
            value: threatsByLevel.blocked.toString(),
            icon: XCircle,
            color: "text-orange-400",
          },
          {
            label: "Services Up",
            value: `${SERVICES.filter(s => s.status === "active").length}/${SERVICES.length}`,
            icon: Activity,
            color: "text-green-400",
          },
        ].map(s => (
          <Card key={s.label} className="border-border/50 text-center">
            <CardContent className="py-2.5 px-2">
              <s.icon className={`h-5 w-5 mx-auto mb-1 ${s.color}`} />
              <p className={`font-black text-sm ${s.color}`}>{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-2">
        {(["overview", "threats", "services", "scan"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-green-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {[
              {
                label: "Requests Blocked",
                value: "44,444",
                sub: "Last 24h",
                color: "text-red-400",
              },
              {
                label: "Clean Requests",
                value: "4.4M",
                sub: "Last 24h",
                color: "text-green-400",
              },
              {
                label: "Avg Response",
                value: "12ms",
                sub: "API latency",
                color: "text-blue-400",
              },
              {
                label: "Uptime",
                value: "99.97%",
                sub: "Last 30 days",
                color: "text-purple-400",
              },
            ].map(s => (
              <Card key={s.label} className="border-border/50">
                <CardContent className="py-3 px-3 text-center">
                  <p className={`font-black text-lg ${s.color}`}>{s.value}</p>
                  <p className="text-xs font-bold">{s.label}</p>
                  <p className="text-xs text-muted-foreground">{s.sub}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card className="border-red-500/20 bg-red-900/5">
            <CardContent className="py-3 px-4">
              <p className="font-bold text-sm mb-2">Recent Critical Events</p>
              {THREATS.filter(
                t => t.severity === "critical" || t.severity === "high"
              ).map(threat => (
                <div
                  key={threat.id}
                  className="flex items-center gap-2 py-1.5 border-b border-border/30 last:border-0"
                >
                  <span className="text-base">{threat.icon}</span>
                  <div className="flex-1">
                    <p className="text-xs font-bold">{threat.type}</p>
                    <p className="text-xs text-muted-foreground">
                      {threat.source}
                    </p>
                  </div>
                  <Badge
                    className={`text-xs ${SEVERITY_CONFIG[threat.severity].bg} ${SEVERITY_CONFIG[threat.severity].color}`}
                  >
                    {threat.severity}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "threats" && (
        <div className="space-y-2">
          {THREATS.map((threat, i) => (
            <motion.div
              key={threat.id}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <Card className={`border ${SEVERITY_CONFIG[threat.severity].bg}`}>
                <CardContent className="py-3 px-4">
                  <div className="flex items-start gap-2">
                    <span className="text-xl shrink-0">{threat.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-bold text-sm">{threat.type}</p>
                        <Badge
                          className={`text-xs ${SEVERITY_CONFIG[threat.severity].bg} ${SEVERITY_CONFIG[threat.severity].color}`}
                        >
                          {threat.severity}
                        </Badge>
                        <Badge
                          className={`text-xs ${threat.status === "blocked" ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"}`}
                        >
                          {threat.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Source: {threat.source}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Target: {threat.target} · {threat.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 text-xs font-bold flex-1"
                      onClick={() =>
                        toast.success(`Investigating ${threat.type}...`)
                      }
                    >
                      Investigate
                    </Button>
                    <Button
                      size="sm"
                      className="h-7 text-xs font-bold flex-1 bg-red-600 text-white border-0"
                      onClick={() =>
                        toast.success(
                          `IP ${threat.source.split(" ")[0]} permanently banned!`
                        )
                      }
                    >
                      Ban IP
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "services" && (
        <div className="space-y-2">
          {SERVICES.map((service, i) => (
            <Card key={service.name} className="border-border/50">
              <CardContent className="py-3 px-4 flex items-center gap-3">
                <div
                  className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 ${service.status === "active" ? "bg-green-500/10" : "bg-yellow-500/10"}`}
                >
                  <service.icon
                    className={`h-4 w-4 ${service.status === "active" ? "text-green-400" : "text-yellow-400"}`}
                  />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm">{service.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Uptime: {service.uptime}
                  </p>
                </div>
                <Badge
                  className={`text-xs ${service.status === "active" ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"}`}
                >
                  {service.status === "active" ? "🟢 Active" : "⚠️ Warning"}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "scan" && (
        <Card className="border-green-500/20 bg-green-900/5">
          <CardContent className="py-6 px-4 text-center space-y-4">
            <Shield className="h-16 w-16 text-green-400 mx-auto" />
            <p className="font-bold text-lg">Full Security Scan</p>
            <p className="text-sm text-muted-foreground">
              Scan all systems, APIs, databases, and network configurations for
              vulnerabilities
            </p>
            {scanning && (
              <div className="space-y-2">
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: `${scanProgress}%` }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
                <p className="text-xs text-green-400 font-bold">
                  Scanning... {scanProgress}%
                </p>
              </div>
            )}
            <Button
              className="w-full h-12 text-sm bg-green-600 text-white border-0 font-bold"
              onClick={runScan}
              disabled={scanning}
            >
              {scanning ? (
                <>
                  <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  <Shield className="h-5 w-5 mr-2" />
                  Run Full Security Scan
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
