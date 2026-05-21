import { SafeCryptoCompliancePanel } from "@/components/SafeCryptoCompliancePanel";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Globe,
  Shield,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Lock,
  FileText,
  Users,
  Zap,
  ChevronDown,
  ChevronRight,
  Flag,
  Scale,
  Eye,
  EyeOff,
  Settings,
  Download,
  RefreshCw,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const REGIONS = [
  {
    region: "China (PRC)",
    flag: "🇨🇳",
    status: "compliant",
    score: 94,
    authority: "MIIT / CAC / PBOC",
    requirements: [
      {
        name: "ICP License",
        status: "active",
        desc: "Internet Content Provider license for China operations",
      },
      {
        name: "Real-name Verification",
        status: "active",
        desc: "All users must verify identity with Chinese ID",
      },
      {
        name: "Content Filtering",
        status: "active",
        desc: "Sensitive content filtered per CAC guidelines",
      },
      {
        name: "Data Localization",
        status: "active",
        desc: "Chinese user data stored on mainland servers",
      },
      {
        name: "VPN Blocking",
        status: "active",
        desc: "Platform accessible without VPN on China network",
      },
      {
        name: "Crypto Trading",
        status: "restricted",
        desc: "Crypto trading disabled for mainland users per PBOC",
      },
    ],
    features: {
      trading: false,
      crypto: false,
      vpn: false,
      messaging: true,
      content: true,
      payments: false,
    },
  },
  {
    region: "European Union",
    flag: "🇪🇺",
    status: "compliant",
    score: 98,
    authority: "GDPR / MiCA / DORA",
    requirements: [
      {
        name: "GDPR Compliance",
        status: "active",
        desc: "Full data protection and right to erasure",
      },
      {
        name: "MiCA Registration",
        status: "active",
        desc: "Markets in Crypto-Assets regulation compliance",
      },
      {
        name: "Cookie Consent",
        status: "active",
        desc: "Explicit consent for all tracking cookies",
      },
      {
        name: "Data Portability",
        status: "active",
        desc: "Users can export all their data",
      },
      {
        name: "KYC/AML",
        status: "active",
        desc: "Know Your Customer and Anti-Money Laundering",
      },
      {
        name: "DORA",
        status: "pending",
        desc: "Digital Operational Resilience Act — in progress",
      },
    ],
    features: {
      trading: true,
      crypto: true,
      vpn: true,
      messaging: true,
      content: true,
      payments: true,
    },
  },
  {
    region: "United States",
    flag: "🇺🇸",
    status: "compliant",
    score: 96,
    authority: "FinCEN / SEC / CFTC",
    requirements: [
      {
        name: "FinCEN MSB Registration",
        status: "active",
        desc: "Money Services Business registration",
      },
      {
        name: "BSA/AML Program",
        status: "active",
        desc: "Bank Secrecy Act compliance program",
      },
      {
        name: "OFAC Screening",
        status: "active",
        desc: "Sanctions screening against OFAC lists",
      },
      {
        name: "SAR Filing",
        status: "active",
        desc: "Suspicious Activity Report filing system",
      },
      {
        name: "State Licenses",
        status: "active",
        desc: "Money transmitter licenses in 48 states",
      },
      {
        name: "SEC Compliance",
        status: "active",
        desc: "Securities law compliance for token offerings",
      },
    ],
    features: {
      trading: true,
      crypto: true,
      vpn: true,
      messaging: true,
      content: true,
      payments: true,
    },
  },
  {
    region: "United Arab Emirates",
    flag: "🇦🇪",
    status: "compliant",
    score: 92,
    authority: "VARA / CBUAE / TRA",
    requirements: [
      {
        name: "VARA License",
        status: "active",
        desc: "Virtual Assets Regulatory Authority license",
      },
      {
        name: "CBUAE Registration",
        status: "active",
        desc: "Central Bank of UAE payment service registration",
      },
      {
        name: "Content Compliance",
        status: "active",
        desc: "TRA content guidelines compliance",
      },
      {
        name: "Arabic Language",
        status: "active",
        desc: "Platform available in Arabic",
      },
      {
        name: "VoIP Restrictions",
        status: "restricted",
        desc: "Some VoIP features restricted per TRA",
      },
    ],
    features: {
      trading: true,
      crypto: true,
      vpn: false,
      messaging: true,
      content: true,
      payments: true,
    },
  },
  {
    region: "India",
    flag: "🇮🇳",
    status: "warning",
    score: 78,
    authority: "RBI / SEBI / IT Act",
    requirements: [
      {
        name: "TDS Compliance",
        status: "active",
        desc: "1% TDS on crypto transactions per Finance Act 2022",
      },
      {
        name: "IT Act Compliance",
        status: "active",
        desc: "Information Technology Act compliance",
      },
      {
        name: "RBI Guidelines",
        status: "active",
        desc: "Reserve Bank of India payment guidelines",
      },
      {
        name: "PMLA Compliance",
        status: "pending",
        desc: "Prevention of Money Laundering Act — in review",
      },
      {
        name: "SEBI Registration",
        status: "pending",
        desc: "Securities and Exchange Board registration pending",
      },
    ],
    features: {
      trading: true,
      crypto: true,
      vpn: true,
      messaging: true,
      content: true,
      payments: true,
    },
  },
  {
    region: "Russia",
    flag: "🇷🇺",
    status: "restricted",
    score: 45,
    authority: "Roskomnadzor / CBR",
    requirements: [
      {
        name: "Roskomnadzor Registration",
        status: "inactive",
        desc: "Federal media regulator registration required",
      },
      {
        name: "Data Localization",
        status: "inactive",
        desc: "Russian user data must be stored in Russia",
      },
      {
        name: "OFAC Sanctions",
        status: "active",
        desc: "OFAC sanctions screening active — many users blocked",
      },
    ],
    features: {
      trading: false,
      crypto: false,
      vpn: false,
      messaging: false,
      content: false,
      payments: false,
    },
  },
];

const STATUS_CONFIG: Record<
  string,
  { color: string; icon: typeof CheckCircle; bg: string }
> = {
  compliant: {
    color: "text-green-400",
    icon: CheckCircle,
    bg: "bg-green-500/10 border-green-500/20",
  },
  warning: {
    color: "text-yellow-400",
    icon: AlertTriangle,
    bg: "bg-yellow-500/10 border-yellow-500/20",
  },
  restricted: {
    color: "text-red-400",
    icon: XCircle,
    bg: "bg-red-500/10 border-red-500/20",
  },
};

const REQ_STATUS: Record<string, { color: string; label: string }> = {
  active: { color: "text-green-400", label: "Active" },
  pending: { color: "text-yellow-400", label: "Pending" },
  restricted: { color: "text-orange-400", label: "Restricted" },
  inactive: { color: "text-red-400", label: "Inactive" },
};

export default function GlobalCompliance() {
  const [expanded, setExpanded] = useState<string | null>("China (PRC)");
  const [tab, setTab] = useState<"overview" | "controls" | "reports" | "audit">(
    "overview"
  );

  const compliantCount = REGIONS.filter(r => r.status === "compliant").length;
  const avgScore = Math.round(
    REGIONS.reduce((s, r) => s + r.score, 0) / REGIONS.length
  );

  return (
    <div className="space-y-5">
      <SafeCryptoCompliancePanel focus="compliance" compact />
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Globe className="h-6 w-6 text-blue-400" />
            Global Compliance Center
          </h1>
          <p className="text-sm text-muted-foreground">
            Worldwide regulatory compliance and regional controls
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="h-8 text-xs"
            onClick={() => toast.success("Compliance report generated!")}
          >
            <Download className="h-3.5 w-3.5 mr-1.5" />
            Export Report
          </Button>
          <Button
            size="sm"
            className="h-8 text-xs bg-blue-600 text-white border-0"
            onClick={() => toast.info("Running compliance audit...")}
          >
            <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
            Run Audit
          </Button>
        </div>
      </div>

      {/* Global Score */}
      <Card className="border-blue-500/20 bg-gradient-to-r from-blue-900/10 to-purple-900/10">
        <CardContent className="pt-4 pb-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-blue-500/20 flex items-center justify-center shrink-0">
              <Shield className="h-8 w-8 text-blue-400" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">
                Global Compliance Score
              </p>
              <p className="font-black text-3xl text-blue-400">
                {avgScore}/100
              </p>
              <Progress value={avgScore} className="h-2 mt-1" />
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="font-black text-xl text-green-400">
                  {compliantCount}
                </p>
                <p className="text-xs text-muted-foreground">Compliant</p>
              </div>
              <div>
                <p className="font-black text-xl text-yellow-400">
                  {REGIONS.filter(r => r.status === "warning").length}
                </p>
                <p className="text-xs text-muted-foreground">Warning</p>
              </div>
              <div>
                <p className="font-black text-xl text-red-400">
                  {REGIONS.filter(r => r.status === "restricted").length}
                </p>
                <p className="text-xs text-muted-foreground">Restricted</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="flex gap-2">
        {(["overview", "controls", "reports", "audit"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-blue-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="space-y-3">
          {REGIONS.map((region, i) => {
            const cfg = STATUS_CONFIG[region.status];
            const StatusIcon = cfg.icon;
            const isExpanded = expanded === region.region;
            return (
              <motion.div
                key={region.region}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card
                  className={`border-border/50 ${region.status === "restricted" ? "border-red-500/20" : ""}`}
                >
                  <CardContent className="pt-0 pb-0">
                    <button
                      className="w-full flex items-center gap-3 py-3 px-1 text-left"
                      onClick={() =>
                        setExpanded(isExpanded ? null : region.region)
                      }
                    >
                      <span className="text-2xl shrink-0">{region.flag}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-black text-sm">{region.region}</p>
                          <Badge className={`text-xs ${cfg.bg} ${cfg.color}`}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {region.status.charAt(0).toUpperCase() +
                              region.status.slice(1)}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {region.authority}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className={`font-black text-lg ${cfg.color}`}>
                          {region.score}
                        </p>
                        <p className="text-xs text-muted-foreground">score</p>
                      </div>
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                      )}
                    </button>

                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="border-t border-border/30 pt-3 pb-3 space-y-3"
                      >
                        {/* Feature Toggles */}
                        <div>
                          <p className="text-xs font-bold text-muted-foreground mb-2">
                            FEATURE AVAILABILITY
                          </p>
                          <div className="grid grid-cols-3 gap-1.5">
                            {Object.entries(region.features).map(
                              ([feature, enabled]) => (
                                <div
                                  key={feature}
                                  className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs ${enabled ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}
                                >
                                  {enabled ? (
                                    <CheckCircle className="h-3 w-3 shrink-0" />
                                  ) : (
                                    <XCircle className="h-3 w-3 shrink-0" />
                                  )}
                                  <span className="capitalize">{feature}</span>
                                </div>
                              )
                            )}
                          </div>
                        </div>

                        {/* Requirements */}
                        <div>
                          <p className="text-xs font-bold text-muted-foreground mb-2">
                            COMPLIANCE REQUIREMENTS
                          </p>
                          <div className="space-y-1.5">
                            {region.requirements.map(req => (
                              <div
                                key={req.name}
                                className="flex items-start gap-2"
                              >
                                <span
                                  className={`text-xs font-bold shrink-0 mt-0.5 ${REQ_STATUS[req.status].color}`}
                                >
                                  ●
                                </span>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <p className="text-xs font-bold">
                                      {req.name}
                                    </p>
                                    <Badge
                                      className={`text-xs h-4 px-1.5 ${REQ_STATUS[req.status].color} bg-transparent border-current`}
                                    >
                                      {REQ_STATUS[req.status].label}
                                    </Badge>
                                  </div>
                                  <p className="text-xs text-muted-foreground">
                                    {req.desc}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs w-full"
                          onClick={() =>
                            toast.info(
                              `Opening ${region.region} compliance settings...`
                            )
                          }
                        >
                          <Settings className="h-3.5 w-3.5 mr-1.5" />
                          Manage {region.region} Settings
                        </Button>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}

      {tab === "controls" && (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Global platform controls — changes apply immediately to all users in
            affected regions.
          </p>
          {[
            {
              label: "Real-name Verification",
              desc: "Require government ID for all new registrations",
              enabled: true,
              regions: ["China", "UAE", "Russia"],
            },
            {
              label: "Content Moderation AI",
              desc: "AI-powered content filtering for sensitive topics",
              enabled: true,
              regions: ["All regions"],
            },
            {
              label: "Crypto Trading",
              desc: "Enable/disable crypto trading globally",
              enabled: true,
              regions: ["US", "EU", "UAE", "India"],
            },
            {
              label: "VPN Detection",
              desc: "Detect and log VPN usage for compliance",
              enabled: true,
              regions: ["China", "Russia"],
            },
            {
              label: "Data Localization",
              desc: "Store user data in their country of residence",
              enabled: true,
              regions: ["China", "EU", "Russia"],
            },
            {
              label: "OFAC Sanctions Screening",
              desc: "Real-time screening against OFAC sanctions list",
              enabled: true,
              regions: ["All regions"],
            },
            {
              label: "Transaction Monitoring",
              desc: "AML transaction monitoring and reporting",
              enabled: true,
              regions: ["US", "EU", "UAE"],
            },
            {
              label: "Emergency Shutdown",
              desc: "Instantly disable platform in specific regions",
              enabled: false,
              regions: ["Admin only"],
            },
          ].map(control => (
            <Card key={control.label} className="border-border/50">
              <CardContent className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <p className="font-bold text-sm">{control.label}</p>
                    <p className="text-xs text-muted-foreground">
                      {control.desc}
                    </p>
                    <div className="flex gap-1 mt-1 flex-wrap">
                      {control.regions.map(r => (
                        <Badge
                          key={r}
                          variant="outline"
                          className="text-xs h-4 px-1.5"
                        >
                          {r}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      toast.success(
                        `${control.label} ${control.enabled ? "disabled" : "enabled"}!`
                      )
                    }
                    className={`h-6 w-11 rounded-full transition-colors shrink-0 ${control.enabled ? "bg-blue-600" : "bg-muted"} relative`}
                  >
                    <div
                      className={`h-4 w-4 rounded-full bg-white absolute top-1 transition-all ${control.enabled ? "right-1" : "left-1"}`}
                    />
                  </button>
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
              title: "Q1 2025 Global Compliance Report",
              date: "Apr 1, 2025",
              regions: 6,
              score: 88,
            },
            {
              title: "GDPR Annual Data Protection Report",
              date: "Jan 1, 2025",
              regions: 27,
              score: 98,
            },
            {
              title: "FinCEN SAR Filing Summary — March 2025",
              date: "Apr 5, 2025",
              regions: 1,
              score: 100,
            },
            {
              title: "VARA UAE Quarterly Compliance",
              date: "Apr 1, 2025",
              regions: 1,
              score: 92,
            },
          ].map((report, i) => (
            <Card key={report.title} className="border-border/50">
              <CardContent className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-blue-400 shrink-0" />
                  <div className="flex-1">
                    <p className="font-bold text-sm">{report.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {report.date} · {report.regions} region
                      {report.regions > 1 ? "s" : ""} · Score: {report.score}
                      /100
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
        </div>
      )}

      {tab === "audit" && (
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/20">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <p className="font-bold text-sm text-green-400">
                Last Audit: May 14, 2025 — PASSED
              </p>
            </div>
            <p className="text-xs text-muted-foreground">
              All critical compliance controls verified. 2 minor findings
              resolved.
            </p>
          </div>
          {[
            {
              check: "OFAC Sanctions List Updated",
              status: "pass",
              time: "2 hours ago",
            },
            { check: "KYC Database Sync", status: "pass", time: "4 hours ago" },
            {
              check: "Data Encryption at Rest",
              status: "pass",
              time: "1 day ago",
            },
            { check: "Penetration Test", status: "pass", time: "7 days ago" },
            {
              check: "GDPR Data Deletion Requests",
              status: "warning",
              time: "3 days ago",
            },
            {
              check: "China ICP License Renewal",
              status: "pass",
              time: "30 days ago",
            },
          ].map(item => (
            <Card key={item.check} className="border-border/50">
              <CardContent className="py-2.5 px-4">
                <div className="flex items-center gap-3">
                  {item.status === "pass" ? (
                    <CheckCircle className="h-4 w-4 text-green-400 shrink-0" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-yellow-400 shrink-0" />
                  )}
                  <p className="flex-1 text-sm font-medium">{item.check}</p>
                  <span className="text-xs text-muted-foreground">
                    {item.time}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
