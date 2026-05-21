import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  Eye,
  Lock,
  Zap,
  Activity,
  Globe,
  Server,
  Wifi,
  Key,
  Bug,
  RefreshCw,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const THREATS = [
  {
    id: 1,
    type: "Brute Force Attack",
    severity: "high",
    source: "185.220.101.44 (Russia)",
    target: "SSH Port 22",
    time: "2 min ago",
    blocked: true,
  },
  {
    id: 2,
    type: "SQL Injection Attempt",
    severity: "medium",
    source: "103.21.244.0 (China)",
    target: "/api/users",
    time: "8 min ago",
    blocked: true,
  },
  {
    id: 3,
    type: "DDoS Probe",
    severity: "low",
    source: "Multiple IPs",
    target: "Port 80/443",
    time: "15 min ago",
    blocked: true,
  },
  {
    id: 4,
    type: "Suspicious Login",
    severity: "medium",
    source: "Unknown Device",
    target: "Admin Account",
    time: "1 hr ago",
    blocked: false,
  },
];

const SERVICES = [
  { name: "Web Server", status: "secure", uptime: "99.99%", emoji: "🌐" },
  { name: "Database", status: "secure", uptime: "99.97%", emoji: "🗄️" },
  { name: "API Gateway", status: "warning", uptime: "99.80%", emoji: "⚡" },
  { name: "Email Server", status: "secure", uptime: "99.95%", emoji: "📧" },
  { name: "Firewall", status: "secure", uptime: "100%", emoji: "🔥" },
  { name: "VPN", status: "secure", uptime: "99.99%", emoji: "🔐" },
];

export default function ShadowSecurity() {
  const [tab, setTab] = useState<"overview" | "threats" | "services" | "audit">(
    "overview"
  );
  const [score, setScore] = useState(88);
  const [scanning, setScanning] = useState(false);

  const runScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setScore(92);
      toast.success("✅ Security scan complete! Score improved to 92/100");
    }, 3000);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Shield className="h-6 w-6 text-green-400" />
            ShadowSecurity
          </h1>
          <p className="text-sm text-muted-foreground">
            Real-time cybersecurity monitoring and threat response
          </p>
        </div>
        <Badge
          className={`font-bold ${score >= 90 ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"}`}
        >
          {score >= 90 ? "🛡️ Secure" : "⚠️ Review"}
        </Badge>
      </div>

      {/* Security Score */}
      <Card className="border-green-500/20 bg-gradient-to-br from-green-900/10 to-teal-900/10">
        <CardContent className="py-4 px-4">
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 shrink-0">
              <svg className="h-16 w-16 -rotate-90" viewBox="0 0 64 64">
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  className="text-muted/20"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeDasharray={`${score * 1.76} 176`}
                  className="text-green-400"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="font-black text-sm text-green-400">{score}</p>
              </div>
            </div>
            <div className="flex-1">
              <p className="font-black text-sm">Security Score</p>
              <p className="text-xs text-muted-foreground mb-2">
                Based on 44 security checks
              </p>
              <div className="grid grid-cols-3 gap-1 text-xs">
                <div className="text-center">
                  <p className="font-bold text-green-400">4</p>
                  <p className="text-muted-foreground">Blocked</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-yellow-400">1</p>
                  <p className="text-muted-foreground">Warning</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-blue-400">39</p>
                  <p className="text-muted-foreground">Passed</p>
                </div>
              </div>
            </div>
            <Button
              size="sm"
              className="h-9 text-xs bg-green-600 text-white border-0 shrink-0"
              onClick={runScan}
              disabled={scanning}
            >
              {scanning ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Zap className="h-3.5 w-3.5 mr-1" />
                  Scan
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-2">
        {(["overview", "threats", "services", "audit"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-green-600 text-white" : "bg-muted text-muted-foreground"}`}
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
                label: "Threats Blocked",
                value: "1,244",
                emoji: "🛡️",
                color: "text-green-400",
              },
              {
                label: "Active Alerts",
                value: "1",
                emoji: "⚠️",
                color: "text-yellow-400",
              },
              {
                label: "Uptime",
                value: "99.97%",
                emoji: "⏱️",
                color: "text-blue-400",
              },
              {
                label: "Last Scan",
                value: "2 min ago",
                emoji: "🔍",
                color: "text-purple-400",
              },
            ].map(s => (
              <Card key={s.label} className="border-border/50">
                <CardContent className="py-3 px-3">
                  <p className="text-xl mb-1">{s.emoji}</p>
                  <p className={`font-black text-sm ${s.color}`}>{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card className="border-border/50">
            <CardContent className="py-3 px-4">
              <p className="font-bold text-sm mb-2">Security Checklist</p>
              {[
                { item: "SSL/TLS Certificate", status: true },
                { item: "2FA Enabled", status: true },
                { item: "Firewall Active", status: true },
                { item: "DDoS Protection", status: true },
                { item: "Backup Encryption", status: true },
                { item: "Suspicious Login Review", status: false },
              ].map(check => (
                <div
                  key={check.item}
                  className="flex items-center gap-2 py-1.5 border-b border-border/20 last:border-0"
                >
                  {check.status ? (
                    <CheckCircle className="h-4 w-4 text-green-400 shrink-0" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-yellow-400 shrink-0" />
                  )}
                  <p className="text-xs flex-1">{check.item}</p>
                  <Badge
                    className={`text-xs ${check.status ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"}`}
                  >
                    {check.status ? "✓ OK" : "Review"}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "threats" && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-muted-foreground">
              RECENT THREATS ({THREATS.length})
            </p>
            <Button
              size="sm"
              variant="outline"
              className="h-7 text-xs"
              onClick={() => toast.info("Exporting threat report...")}
            >
              Export
            </Button>
          </div>
          {THREATS.map((threat, i) => (
            <motion.div
              key={threat.id}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <Card
                className={`border ${threat.severity === "high" ? "border-red-500/20 bg-red-900/5" : threat.severity === "medium" ? "border-yellow-500/20 bg-yellow-900/5" : "border-border/50"}`}
              >
                <CardContent className="py-3 px-4">
                  <div className="flex items-start gap-3">
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${threat.severity === "high" ? "bg-red-500/10" : threat.severity === "medium" ? "bg-yellow-500/10" : "bg-muted"}`}
                    >
                      <Bug
                        className={`h-4 w-4 ${threat.severity === "high" ? "text-red-400" : threat.severity === "medium" ? "text-yellow-400" : "text-muted-foreground"}`}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="font-bold text-sm">{threat.type}</p>
                        <Badge
                          className={`text-xs ${threat.severity === "high" ? "bg-red-500/10 text-red-400 border-red-500/20" : threat.severity === "medium" ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" : "bg-muted text-muted-foreground"}`}
                        >
                          {threat.severity}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Source: {threat.source}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Target: {threat.target} · {threat.time}
                      </p>
                    </div>
                    <Badge
                      className={`text-xs shrink-0 ${threat.blocked ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-red-500/10 text-red-400 border-red-500/20"}`}
                    >
                      {threat.blocked ? "✓ Blocked" : "⚠️ Active"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "services" && (
        <div className="space-y-2">
          {SERVICES.map((svc, i) => (
            <Card
              key={svc.name}
              className={`border ${svc.status === "warning" ? "border-yellow-500/20 bg-yellow-900/5" : "border-border/50"}`}
            >
              <CardContent className="py-3 px-4 flex items-center gap-3">
                <span className="text-xl">{svc.emoji}</span>
                <div className="flex-1">
                  <p className="font-bold text-sm">{svc.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Uptime: {svc.uptime}
                  </p>
                </div>
                <Badge
                  className={`text-xs ${svc.status === "secure" ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"}`}
                >
                  {svc.status === "secure" ? "🛡️ Secure" : "⚠️ Warning"}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "audit" && (
        <div className="space-y-3">
          <Card className="border-green-500/20 bg-green-900/5">
            <CardContent className="py-4 px-4">
              <p className="font-bold text-sm mb-2">Security Audit Report</p>
              <p className="text-xs text-muted-foreground mb-3">
                Last full audit: May 14, 2026 · Next scheduled: Jun 14, 2026
              </p>
              {[
                {
                  category: "Network Security",
                  score: 95,
                  color: "bg-green-500",
                },
                {
                  category: "Application Security",
                  score: 88,
                  color: "bg-blue-500",
                },
                {
                  category: "Data Encryption",
                  score: 92,
                  color: "bg-purple-500",
                },
                {
                  category: "Access Control",
                  score: 85,
                  color: "bg-yellow-500",
                },
                {
                  category: "Incident Response",
                  score: 78,
                  color: "bg-orange-500",
                },
              ].map(cat => (
                <div key={cat.category} className="mb-2">
                  <div className="flex justify-between text-xs mb-0.5">
                    <span>{cat.category}</span>
                    <span className="font-bold">{cat.score}/100</span>
                  </div>
                  <Progress value={cat.score} className="h-1.5" />
                </div>
              ))}
              <Button
                className="w-full h-9 text-xs mt-2 bg-green-600 text-white border-0"
                onClick={() => toast.info("Downloading full audit PDF...")}
              >
                Download Full Report
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
