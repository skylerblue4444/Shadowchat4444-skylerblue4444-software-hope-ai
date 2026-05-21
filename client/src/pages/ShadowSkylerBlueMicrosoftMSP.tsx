import { useState } from "react";
import {
  Shield,
  Phone,
  Server,
  Monitor,
  TrendingUp,
  Layers,
  Building2,
  Globe,
  Zap,
  Map,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const DATA: Record<
  string,
  {
    icon: string;
    title: string;
    desc: string;
    stats: { label: string; value: string; color: string }[];
    features: string[];
    accent: string;
  }
> = {
  ShadowSkylerBlueFirewall: {
    icon: "🔥",
    title: "Firewall Management",
    accent: "text-red-400",
    desc: "Next-gen firewall deployment and management — Fortinet, Palo Alto, and SonicWall for Arkansas businesses",
    stats: [
      { label: "Firewalls Managed", value: "127", color: "text-red-400" },
      { label: "Threats Blocked", value: "2.4M", color: "text-orange-400" },
      { label: "Rules Managed", value: "8,847", color: "text-blue-400" },
      { label: "Uptime", value: "100%", color: "text-green-400" },
    ],
    features: [
      "Fortinet/Palo Alto/SonicWall",
      "IDS/IPS",
      "Application control",
      "URL filtering",
      "VPN gateway",
      "Zero-day protection",
    ],
  },
  ShadowSkylerBlueVoIP2: {
    icon: "📞",
    title: "VoIP Phone Systems",
    accent: "text-teal-400",
    desc: "Business VoIP phone systems — crystal-clear calls, auto-attendant, call recording, and mobile apps",
    stats: [
      { label: "VoIP Lines", value: "2,847", color: "text-teal-400" },
      { label: "Call Quality", value: "4.9/5", color: "text-green-400" },
      { label: "Cost Savings", value: "72%", color: "text-blue-400" },
      { label: "Uptime", value: "99.99%", color: "text-emerald-400" },
    ],
    features: [
      "HD voice calls",
      "Auto-attendant",
      "Call recording",
      "Mobile softphone",
      "Conference bridge",
      "CRM integration",
    ],
  },
  ShadowSkylerBlueServer: {
    icon: "🖥️",
    title: "Server Management",
    accent: "text-slate-400",
    desc: "Physical and virtual server management — Windows Server, Linux, VMware, and Hyper-V for Arkansas businesses",
    stats: [
      { label: "Servers Managed", value: "847", color: "text-slate-400" },
      { label: "Virtualization", value: "94%", color: "text-blue-400" },
      { label: "Avg CPU Load", value: "34%", color: "text-green-400" },
      { label: "Uptime", value: "99.97%", color: "text-emerald-400" },
    ],
    features: [
      "Windows/Linux servers",
      "VMware/Hyper-V",
      "Performance tuning",
      "Capacity planning",
      "Patch management",
      "24/7 monitoring",
    ],
  },
  ShadowSkylerBlueWorkstation: {
    icon: "💻",
    title: "Workstation Management",
    accent: "text-purple-400",
    desc: "Managed workstations for your entire team — deployment, patching, security, and helpdesk support",
    stats: [
      { label: "Workstations", value: "4,247", color: "text-purple-400" },
      { label: "Patch Compliance", value: "99.1%", color: "text-green-400" },
      { label: "Avg Ticket/User", value: "0.3/mo", color: "text-blue-400" },
      { label: "Deployment Time", value: "2hrs", color: "text-orange-400" },
    ],
    features: [
      "Windows/Mac/Linux",
      "Automated deployment",
      "Software management",
      "Security hardening",
      "Remote support",
      "Hardware refresh planning",
    ],
  },
  ShadowCryptoLending2: {
    icon: "🏦",
    title: "Crypto Lending 2.0",
    accent: "text-amber-400",
    desc: "Next-gen crypto lending with AI-powered risk scoring, flash loans, and undercollateralized credit lines",
    stats: [
      { label: "Total Lent", value: "47M", color: "text-amber-400" },
      { label: "Avg APY", value: "12.4%", color: "text-green-400" },
      { label: "Default Rate", value: "0.02%", color: "text-blue-400" },
      { label: "Active Loans", value: "24,847", color: "text-purple-400" },
    ],
    features: [
      "Flash loans",
      "Undercollateralized loans",
      "AI credit scoring",
      "Multi-asset collateral",
      "Auto-liquidation",
      "Credit delegation",
    ],
  },
  ShadowCryptoDeFiAggregator: {
    icon: "🔗",
    title: "DeFi Aggregator",
    accent: "text-cyan-400",
    desc: "Best-rate DeFi aggregator — find the optimal swap route, yield, and lending rates across 50+ protocols",
    stats: [
      { label: "Protocols", value: "50+", color: "text-cyan-400" },
      { label: "Avg Savings", value: "2.4%", color: "text-green-400" },
      { label: "24h Volume", value: ".1B", color: "text-blue-400" },
      { label: "Chains", value: "12", color: "text-purple-400" },
    ],
    features: [
      "Best-rate routing",
      "Gas optimization",
      "Multi-chain",
      "Slippage protection",
      "MEV protection",
      "One-click rebalancing",
    ],
  },
  ShadowSkylerBlueMicrosoftMSP: {
    icon: "🪟",
    title: "Microsoft 365 MSP",
    accent: "text-blue-400",
    desc: "Microsoft 365 deployment, management, and support — Teams, Exchange, SharePoint, and Azure AD for Arkansas businesses",
    stats: [
      { label: "M365 Seats", value: "8,247", color: "text-blue-400" },
      { label: "Tenants Managed", value: "94", color: "text-green-400" },
      { label: "Security Score", value: "847/1000", color: "text-orange-400" },
      { label: "Support SLA", value: "<15min", color: "text-emerald-400" },
    ],
    features: [
      "M365 deployment",
      "Exchange Online",
      "Teams setup",
      "SharePoint",
      "Azure AD",
      "Security & compliance",
    ],
  },
  ShadowSkylerBlueGoogleWorkspace: {
    icon: "🔵",
    title: "Google Workspace MSP",
    accent: "text-green-400",
    desc: "Google Workspace deployment and management — Gmail, Drive, Meet, and admin support for Arkansas businesses",
    stats: [
      { label: "Workspace Users", value: "4,847", color: "text-green-400" },
      { label: "Tenants", value: "47", color: "text-blue-400" },
      { label: "Storage Used", value: "24TB", color: "text-orange-400" },
      { label: "Uptime", value: "99.99%", color: "text-emerald-400" },
    ],
    features: [
      "Gmail/Drive/Meet",
      "Admin console",
      "Security policies",
      "Data migration",
      "Training",
      "24/7 support",
    ],
  },
  ShadowCryptoYieldAggregator: {
    icon: "🌾",
    title: "Yield Aggregator Pro",
    accent: "text-yellow-400",
    desc: "Auto-compound your DeFi yields across 50+ protocols — maximize APY with AI-powered strategy optimization",
    stats: [
      { label: "TVL", value: "47M", color: "text-yellow-400" },
      { label: "Avg APY", value: "24.7%", color: "text-green-400" },
      { label: "Strategies", value: "247", color: "text-blue-400" },
      { label: "Auto-compounds", value: "Every 4hr", color: "text-orange-400" },
    ],
    features: [
      "Auto-compounding",
      "AI strategy selection",
      "Gas optimization",
      "Risk scoring",
      "Multi-chain",
      "Harvest automation",
    ],
  },
  ShadowSkylerBlueITRoadmap: {
    icon: "🗺️",
    title: "IT Strategic Roadmap",
    accent: "text-indigo-400",
    desc: "3-5 year IT strategic roadmap planning — align technology investments with business goals and budget",
    stats: [
      { label: "Roadmaps Created", value: "94", color: "text-indigo-400" },
      { label: "Avg ROI", value: "340%", color: "text-green-400" },
      { label: "Budget Accuracy", value: "97.2%", color: "text-blue-400" },
      { label: "Client Retention", value: "98%", color: "text-emerald-400" },
    ],
    features: [
      "Technology assessment",
      "3-5 year planning",
      "Budget modeling",
      "Vendor selection",
      "Risk assessment",
      "Quarterly reviews",
    ],
  },
};

export default function ShadowSkylerBlueMicrosoftMSP() {
  const d = DATA["ShadowSkylerBlueMicrosoftMSP"];
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
          <p className="font-bold text-sm mb-2">Features</p>
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
        <p className="font-bold">Skyler Blue IT Resolutions</p>
        <p className={"text-2xl font-black mt-1 " + d.accent}>479-406-7123</p>
        <p className="text-xs text-muted-foreground mb-3">
          skylerblue4444@gmail.com
        </p>
        <Button
          className="w-full h-10 bg-indigo-600 text-white border-0 font-black"
          onClick={() =>
            toast.success(
              "Request submitted — we'll contact you within 1 hour!"
            )
          }
        >
          <Zap className="h-4 w-4 mr-2" />
          Get Started Free
        </Button>
      </div>
    </div>
  );
}
