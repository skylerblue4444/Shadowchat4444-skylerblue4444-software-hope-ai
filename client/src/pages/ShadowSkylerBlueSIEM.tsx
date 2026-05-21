import { useState } from "react";
import {
  Network,
  Headphones,
  RefreshCw,
  ClipboardCheck,
  Lock,
  Smartphone,
  Shield,
  Activity,
  CheckCircle,
  Zap,
  AlertTriangle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const PAGE_DATA: Record<
  string,
  {
    icon: string;
    title: string;
    desc: string;
    stats: { label: string; value: string; color: string }[];
    features: string[];
    color: string;
  }
> = {
  ShadowSkylerBlueSDWAN: {
    icon: "🌐",
    title: "SD-WAN Solutions",
    color: "text-cyan-400",
    desc: "Software-Defined WAN for multi-site businesses — intelligent traffic routing, failover, and centralized management",
    stats: [
      { label: "Sites Managed", value: "34", color: "text-cyan-400" },
      { label: "Uptime", value: "99.99%", color: "text-green-400" },
      { label: "Bandwidth Saved", value: "42%", color: "text-blue-400" },
      { label: "Failovers/Mo", value: "0", color: "text-orange-400" },
    ],
    features: [
      "Multi-WAN failover",
      "QoS traffic shaping",
      "Zero-trust segmentation",
      "Centralized dashboard",
      "Cloud breakout",
      "Real-time analytics",
    ],
  },
  ShadowSkylerBlueHelpDesk2: {
    icon: "🎧",
    title: "Help Desk Pro",
    color: "text-purple-400",
    desc: "24/7 IT help desk with live agents, AI triage, and sub-15-minute response SLA for Arkansas businesses",
    stats: [
      { label: "Open Tickets", value: "12", color: "text-purple-400" },
      { label: "Avg Response", value: "8min", color: "text-green-400" },
      { label: "CSAT", value: "4.9/5", color: "text-yellow-400" },
      { label: "Resolved Today", value: "47", color: "text-blue-400" },
    ],
    features: [
      "24/7/365 live agents",
      "AI ticket triage",
      "Remote desktop support",
      "Knowledge base",
      "Escalation workflows",
      "SLA reporting",
    ],
  },
  ShadowSkylerBluePatch: {
    icon: "🔧",
    title: "Patch Management",
    color: "text-orange-400",
    desc: "Automated patch management for Windows, macOS, Linux, and third-party apps across all managed endpoints",
    stats: [
      { label: "Endpoints", value: "847", color: "text-orange-400" },
      { label: "Patch Rate", value: "99.2%", color: "text-green-400" },
      { label: "Critical Patches", value: "0", color: "text-red-400" },
      { label: "Last Cycle", value: "2 days", color: "text-blue-400" },
    ],
    features: [
      "Automated patching",
      "Third-party app updates",
      "Patch compliance reports",
      "Rollback capability",
      "Maintenance windows",
      "CVE tracking",
    ],
  },
  ShadowSkylerBlueAudit: {
    icon: "📋",
    title: "IT Audit & Assessment",
    color: "text-yellow-400",
    desc: "Comprehensive IT audits and security assessments — identify vulnerabilities, compliance gaps, and optimization opportunities",
    stats: [
      { label: "Audits Done", value: "127", color: "text-yellow-400" },
      { label: "Avg Score", value: "74/100", color: "text-orange-400" },
      { label: "Issues Found", value: "2,847", color: "text-red-400" },
      { label: "Issues Fixed", value: "2,791", color: "text-green-400" },
    ],
    features: [
      "Network vulnerability scan",
      "Security posture assessment",
      "Compliance gap analysis",
      "Hardware inventory",
      "Software license audit",
      "Executive summary report",
    ],
  },
  ShadowSkylerBlueVPN: {
    icon: "🔐",
    title: "Business VPN",
    color: "text-green-400",
    desc: "Enterprise VPN solutions for secure remote access — WireGuard, OpenVPN, and Cisco AnyConnect deployment",
    stats: [
      { label: "VPN Users", value: "384", color: "text-green-400" },
      { label: "Protocols", value: "3", color: "text-blue-400" },
      { label: "Encryption", value: "AES-256", color: "text-purple-400" },
      { label: "Uptime", value: "99.99%", color: "text-emerald-400" },
    ],
    features: [
      "WireGuard/OpenVPN/AnyConnect",
      "Split tunneling",
      "MFA integration",
      "Kill switch",
      "DNS leak protection",
      "Zero-log policy",
    ],
  },
  ShadowSkylerBlueMDM: {
    icon: "📱",
    title: "Mobile Device Management",
    color: "text-blue-400",
    desc: "MDM for iOS, Android, and Windows devices — enroll, secure, and manage all company devices remotely",
    stats: [
      { label: "Managed Devices", value: "1,247", color: "text-blue-400" },
      { label: "Compliance", value: "98.4%", color: "text-green-400" },
      { label: "Remote Wipes", value: "3", color: "text-red-400" },
      { label: "Platforms", value: "3", color: "text-purple-400" },
    ],
    features: [
      "iOS/Android/Windows MDM",
      "Remote wipe & lock",
      "App deployment",
      "Policy enforcement",
      "Certificate management",
      "Geo-fencing",
    ],
  },
  ShadowSkylerBlueComplianceMgr: {
    icon: "⚖️",
    title: "IT Compliance Manager",
    color: "text-indigo-400",
    desc: "Achieve and maintain HIPAA, PCI-DSS, SOC 2, and CMMC compliance with automated controls and reporting",
    stats: [
      { label: "Frameworks", value: "6", color: "text-indigo-400" },
      { label: "Controls", value: "847", color: "text-blue-400" },
      { label: "Pass Rate", value: "94.2%", color: "text-green-400" },
      { label: "Audit Ready", value: "Yes", color: "text-emerald-400" },
    ],
    features: [
      "HIPAA compliance",
      "PCI-DSS controls",
      "SOC 2 Type II",
      "CMMC Level 2",
      "Automated evidence collection",
      "Audit-ready reports",
    ],
  },
  ShadowSkylerBlueSIEM: {
    icon: "🛡️",
    title: "SIEM & Log Management",
    color: "text-red-400",
    desc: "Security Information and Event Management — real-time threat detection, log aggregation, and incident response",
    stats: [
      { label: "Events/Day", value: "2.4M", color: "text-red-400" },
      { label: "Threats Blocked", value: "847", color: "text-orange-400" },
      { label: "MTTD", value: "4.2min", color: "text-blue-400" },
      { label: "Log Retention", value: "1yr", color: "text-green-400" },
    ],
    features: [
      "Real-time log aggregation",
      "AI threat detection",
      "Automated alerting",
      "Incident response playbooks",
      "Compliance reporting",
      "Forensic investigation",
    ],
  },
};

export default function ShadowSkylerBlueSIEM() {
  const d = PAGE_DATA["ShadowSkylerBlueSIEM"];
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black">
          {d.icon} {d.title}
        </h1>
        <p className="text-sm text-muted-foreground">{d.desc}</p>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {d.stats.map((s: { label: string; value: string; color: string }) => (
          <Card key={s.label} className="border-border/50 text-center">
            <CardContent className="py-3 px-2">
              <p className={"font-black text-lg " + s.color}>{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="border-border/50">
        <CardContent className="py-3 px-4">
          <p className="font-bold text-sm mb-2">Features Included</p>
          <div className="grid grid-cols-2 gap-1.5">
            {d.features.map((f: string) => (
              <div
                key={f}
                className="flex items-center gap-1.5 text-xs text-muted-foreground"
              >
                <CheckCircle className="h-3 w-3 text-green-400 shrink-0" />
                {f}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <div className="rounded-xl bg-muted/50 border border-border/50 p-4 text-center">
        <p className="font-bold text-sm">Skyler Blue IT Resolutions</p>
        <p className={"text-2xl font-black mt-1 " + d.color}>479-406-7123</p>
        <p className="text-xs text-muted-foreground mb-3">
          skylerblue4444@gmail.com
        </p>
        <Button
          className="w-full h-10 bg-indigo-600 text-white border-0 font-black"
          onClick={() =>
            toast.success(
              "Request sent — we'll call you within 1 business hour!"
            )
          }
        >
          <Zap className="h-4 w-4 mr-2" />
          Get Free Assessment
        </Button>
      </div>
    </div>
  );
}
