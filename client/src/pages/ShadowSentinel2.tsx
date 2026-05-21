import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Lock,
  Globe,
  Zap,
  Activity,
  Server,
  Wifi,
  Database,
  RefreshCw,
  TrendingUp,
  Bug,
  FileWarning,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Threat {
  id: number;
  severity: "critical" | "high" | "medium" | "low";
  type: string;
  source: string;
  target: string;
  description: string;
  time: string;
  status: "active" | "mitigated" | "investigating";
  country: string;
}

const THREATS: Threat[] = [
  {
    id: 1,
    severity: "critical",
    type: "DDoS Attack",
    source: "185.220.101.x",
    target: "API Gateway",
    description:
      "Volumetric DDoS attack — 2.4M req/s detected. Auto-mitigation engaged.",
    time: "2 min ago",
    status: "investigating",
    country: "RU",
  },
  {
    id: 2,
    severity: "high",
    type: "SQL Injection",
    source: "103.45.67.x",
    target: "User Database",
    description:
      "Attempted SQL injection on /api/users endpoint. Blocked by WAF.",
    time: "8 min ago",
    status: "mitigated",
    country: "CN",
  },
  {
    id: 3,
    severity: "high",
    type: "Brute Force",
    source: "Multiple IPs",
    target: "Admin Panel",
    description:
      "1,240 failed login attempts in 5 minutes from distributed botnet.",
    time: "15 min ago",
    status: "mitigated",
    country: "XX",
  },
  {
    id: 4,
    severity: "medium",
    type: "Port Scan",
    source: "45.33.32.x",
    target: "Infrastructure",
    description:
      "Full port scan detected. Firewall rules updated to block source range.",
    time: "32 min ago",
    status: "mitigated",
    country: "US",
  },
  {
    id: 5,
    severity: "medium",
    type: "Suspicious Login",
    source: "Unknown",
    target: "User Account",
    description:
      "Login from new country (North Korea) for user 0x7f3a. MFA challenge sent.",
    time: "1 hr ago",
    status: "investigating",
    country: "KP",
  },
  {
    id: 6,
    severity: "low",
    type: "Rate Limit Exceeded",
    source: "192.168.x.x",
    target: "Trading API",
    description:
      "API rate limit exceeded 10x. Throttling applied. No data breach.",
    time: "2 hr ago",
    status: "mitigated",
    country: "DE",
  },
];

const SEVERITY_CONFIG = {
  critical: {
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
  },
  high: {
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
  },
  medium: {
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
  },
  low: {
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
};

const SYSTEMS = [
  {
    name: "API Gateway",
    status: "operational",
    uptime: "99.98%",
    latency: "12ms",
  },
  {
    name: "User Database",
    status: "operational",
    uptime: "99.99%",
    latency: "4ms",
  },
  {
    name: "Trading Engine",
    status: "operational",
    uptime: "99.97%",
    latency: "8ms",
  },
  { name: "CDN / WAF", status: "degraded", uptime: "99.82%", latency: "28ms" },
  {
    name: "Auth Service",
    status: "operational",
    uptime: "100%",
    latency: "6ms",
  },
  {
    name: "Blockchain Node",
    status: "operational",
    uptime: "99.95%",
    latency: "45ms",
  },
];

export default function ShadowSentinel2() {
  const [tab, setTab] = useState<"threats" | "systems" | "intel" | "response">(
    "threats"
  );
  const [threatCount, setThreatCount] = useState(6);
  const [scanning, setScanning] = useState(false);

  const runScan = async () => {
    setScanning(true);
    await new Promise(r => setTimeout(r, 2500));
    setScanning(false);
    toast.success(
      "Security scan complete — 2 new threats detected and auto-mitigated"
    );
    setThreatCount(prev => prev + 2);
  };

  const activeCritical = THREATS.filter(
    t => t.severity === "critical" && t.status === "active"
  ).length;
  const activeHigh = THREATS.filter(
    t => t.severity === "high" && t.status !== "mitigated"
  ).length;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Shield className="h-6 w-6 text-red-400" />
            ShadowSentinel
          </h1>
          <p className="text-sm text-muted-foreground">
            AI-powered cybersecurity — real-time threat detection, incident
            response, and infrastructure monitoring
          </p>
        </div>
        <div className="flex gap-2">
          <Badge
            className={`text-xs border-0 ${activeCritical > 0 ? "bg-red-500/10 text-red-400" : "bg-green-500/10 text-green-400"}`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full inline-block mr-1.5 ${activeCritical > 0 ? "bg-red-400 animate-pulse" : "bg-green-400"}`}
            />
            {activeCritical > 0 ? `${activeCritical} Critical` : "All Clear"}
          </Badge>
          <Button
            size="sm"
            className="h-8 px-3 text-xs bg-red-600 text-white border-0 font-bold"
            onClick={runScan}
            disabled={scanning}
          >
            {scanning ? (
              <RefreshCw className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <>
                <Zap className="h-3.5 w-3.5 mr-1" />
                Scan
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2">
        {[
          {
            label: "Threats Today",
            value: threatCount.toString(),
            color: "text-red-400",
          },
          { label: "Auto-Mitigated", value: "94%", color: "text-green-400" },
          { label: "Uptime", value: "99.97%", color: "text-cyan-400" },
          { label: "IPs Blocked", value: "12,840", color: "text-orange-400" },
        ].map(s => (
          <Card key={s.label} className="border-border/50 text-center">
            <CardContent className="py-3 px-2">
              <p className={`font-black text-lg ${s.color}`}>{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {(
          [
            ["threats", "⚠️ Threats"],
            ["systems", "🖥️ Systems"],
            ["intel", "🔍 Intel"],
            ["response", "🛡️ Response"],
          ] as const
        ).map(([t, label]) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${tab === t ? "bg-red-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Threats */}
      {tab === "threats" && (
        <div className="space-y-3">
          {THREATS.map((threat, i) => {
            const cfg = SEVERITY_CONFIG[threat.severity];
            return (
              <motion.div
                key={threat.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Card
                  className={`border-border/50 hover:${cfg.border} transition-all`}
                >
                  <CardContent className="py-3 px-4 space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge
                        className={`text-xs border-0 ${cfg.bg} ${cfg.color} uppercase font-black`}
                      >
                        {threat.severity}
                      </Badge>
                      <span className="font-bold text-sm">{threat.type}</span>
                      <Badge
                        className={`text-xs border-0 ml-auto ${threat.status === "mitigated" ? "bg-green-500/10 text-green-400" : threat.status === "investigating" ? "bg-yellow-500/10 text-yellow-400" : "bg-red-500/10 text-red-400"}`}
                      >
                        {threat.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {threat.description}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
                      <span>
                        Source:{" "}
                        <span className="font-mono text-foreground">
                          {threat.source}
                        </span>
                      </span>
                      <span>
                        Target:{" "}
                        <span className="font-bold text-foreground">
                          {threat.target}
                        </span>
                      </span>
                      <span className="ml-auto">{threat.time}</span>
                    </div>
                    {threat.status !== "mitigated" && (
                      <Button
                        size="sm"
                        className="h-7 px-3 text-xs bg-red-600 text-white border-0 font-bold"
                        onClick={() =>
                          toast.success(`Mitigating ${threat.type}...`)
                        }
                      >
                        Mitigate
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Systems */}
      {tab === "systems" && (
        <div className="space-y-3">
          {SYSTEMS.map((sys, i) => (
            <motion.div
              key={sys.name}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Card className="border-border/50">
                <CardContent className="py-3 px-4 flex items-center gap-3">
                  <div
                    className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 ${sys.status === "operational" ? "bg-green-500/10" : "bg-yellow-500/10"}`}
                  >
                    <Server
                      className={`h-4.5 w-4.5 ${sys.status === "operational" ? "text-green-400" : "text-yellow-400"}`}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{sys.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Uptime: {sys.uptime} · Latency: {sys.latency}
                    </p>
                  </div>
                  <Badge
                    className={`text-xs border-0 ${sys.status === "operational" ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"}`}
                  >
                    {sys.status}
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Intel */}
      {tab === "intel" && (
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground">
            Threat intelligence feed — updated every 60 seconds from global
            honeypot network
          </p>
          {[
            { region: "Russia", threats: 2840, trend: "+12%", risk: "High" },
            { region: "China", threats: 1920, trend: "+8%", risk: "High" },
            {
              region: "North Korea",
              threats: 480,
              trend: "+24%",
              risk: "Critical",
            },
            { region: "Iran", threats: 320, trend: "-4%", risk: "Medium" },
            { region: "Unknown", threats: 1240, trend: "+18%", risk: "High" },
          ].map((item, i) => (
            <Card key={item.region} className="border-border/50">
              <CardContent className="py-3 px-4 flex items-center gap-3">
                <Globe className="h-4.5 w-4.5 text-muted-foreground shrink-0" />
                <div className="flex-1">
                  <p className="font-bold text-sm">{item.region}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.threats.toLocaleString()} threats today
                  </p>
                </div>
                <div className="text-right shrink-0 space-y-1">
                  <Badge
                    className={`text-xs border-0 ${item.risk === "Critical" ? "bg-red-500/10 text-red-400" : item.risk === "High" ? "bg-orange-500/10 text-orange-400" : "bg-yellow-500/10 text-yellow-400"}`}
                  >
                    {item.risk}
                  </Badge>
                  <p
                    className={`text-xs font-bold ${item.trend.startsWith("+") ? "text-red-400" : "text-green-400"}`}
                  >
                    {item.trend}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Response */}
      {tab === "response" && (
        <div className="space-y-3">
          {[
            {
              title: "Auto-Block Malicious IPs",
              desc: "Automatically block IPs with 3+ failed attempts",
              enabled: true,
            },
            {
              title: "DDoS Auto-Mitigation",
              desc: "Route traffic through Cloudflare during attacks",
              enabled: true,
            },
            {
              title: "Anomaly Detection AI",
              desc: "ML model detects unusual patterns in real-time",
              enabled: true,
            },
            {
              title: "Geo-Blocking (High Risk)",
              desc: "Block traffic from sanctioned countries",
              enabled: false,
            },
            {
              title: "Two-Factor Enforcement",
              desc: "Force 2FA for all admin and high-value accounts",
              enabled: true,
            },
            {
              title: "Incident Auto-Report",
              desc: "Auto-generate incident reports for compliance",
              enabled: false,
            },
          ].map((item, i) => (
            <Card key={item.title} className="border-border/50">
              <CardContent className="py-3 px-4 flex items-center gap-3">
                <div className="flex-1">
                  <p className="font-bold text-sm">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <button
                  onClick={() =>
                    toast.success(
                      `${item.enabled ? "Disabled" : "Enabled"} ${item.title}`
                    )
                  }
                  className={`h-6 w-11 rounded-full transition-colors shrink-0 ${item.enabled ? "bg-green-500" : "bg-muted"}`}
                >
                  <div
                    className={`h-5 w-5 rounded-full bg-white transition-transform mx-0.5 ${item.enabled ? "translate-x-5" : "translate-x-0"}`}
                  />
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
