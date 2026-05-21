import { useState } from "react";
import {
  Cpu,
  Bot,
  HardDrive,
  Cloud,
  TrendingUp,
  BarChart3,
  Building2,
  Monitor,
  ArrowLeftRight,
  ShieldAlert,
  CheckCircle,
  Zap,
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
  ShadowSkylerBlueIoT: {
    icon: "🔌",
    title: "IoT Device Management",
    accent: "text-teal-400",
    desc: "Manage, monitor, and secure all IoT devices across your business — from smart thermostats to industrial sensors",
    stats: [
      { label: "IoT Devices", value: "4,847", color: "text-teal-400" },
      { label: "Online", value: "99.2%", color: "text-green-400" },
      { label: "Security Alerts", value: "3", color: "text-red-400" },
      { label: "Data Points/hr", value: "2.4M", color: "text-blue-400" },
    ],
    features: [
      "Device onboarding",
      "Firmware management",
      "Security hardening",
      "Real-time monitoring",
      "Anomaly detection",
      "API integrations",
    ],
  },
  ShadowSkylerBlueAIAssistant: {
    icon: "🤖",
    title: "AI IT Assistant",
    accent: "text-violet-400",
    desc: "AI-powered IT assistant for Skyler Blue clients — instant answers, automated troubleshooting, and smart ticket routing",
    stats: [
      { label: "Tickets Resolved", value: "67%", color: "text-violet-400" },
      { label: "Avg Resolution", value: "3min", color: "text-green-400" },
      { label: "Languages", value: "12", color: "text-blue-400" },
      { label: "Satisfaction", value: "4.8/5", color: "text-yellow-400" },
    ],
    features: [
      "Natural language support",
      "Auto ticket creation",
      "Knowledge base search",
      "Escalation to human",
      "Multi-language support",
      "Learning from feedback",
    ],
  },
  ShadowSkylerBlueBackup2: {
    icon: "💾",
    title: "Cloud Backup Pro",
    accent: "text-orange-400",
    desc: "Enterprise cloud backup with immutable storage, ransomware protection, and instant recovery for all business data",
    stats: [
      { label: "Data Protected", value: "847TB", color: "text-orange-400" },
      { label: "Backup Jobs/Day", value: "2,847", color: "text-blue-400" },
      { label: "Recovery Time", value: "<5min", color: "text-green-400" },
      { label: "Retention", value: "7yrs", color: "text-purple-400" },
    ],
    features: [
      "Immutable backups",
      "Ransomware protection",
      "Instant recovery",
      "Offsite replication",
      "Compliance retention",
      "Encryption at rest",
    ],
  },
  ShadowSkylerBlueCloud2: {
    icon: "☁️",
    title: "Cloud Infrastructure",
    accent: "text-sky-400",
    desc: "AWS, Azure, and Google Cloud management — migration, optimization, and ongoing management for Arkansas businesses",
    stats: [
      { label: "Cloud Clients", value: "47", color: "text-sky-400" },
      { label: "Cost Savings", value: "34%", color: "text-green-400" },
      { label: "Uptime", value: "99.99%", color: "text-emerald-400" },
      { label: "Regions", value: "8", color: "text-blue-400" },
    ],
    features: [
      "AWS/Azure/GCP management",
      "Cloud migration",
      "Cost optimization",
      "Auto-scaling",
      "Security hardening",
      "24/7 monitoring",
    ],
  },
  ShadowCryptoOptions: {
    icon: "📈",
    title: "Crypto Options Trading",
    accent: "text-emerald-400",
    desc: "Trade crypto options on BTC, ETH, SKY4444, and TRUMP — calls, puts, spreads, and advanced strategies",
    stats: [
      { label: "Open Interest", value: ".4B", color: "text-emerald-400" },
      { label: "24h Volume", value: "47M", color: "text-green-400" },
      { label: "Implied Vol", value: "84%", color: "text-orange-400" },
      { label: "Expiries", value: "12", color: "text-blue-400" },
    ],
    features: [
      "Calls & puts",
      "Covered calls",
      "Cash-secured puts",
      "Iron condors",
      "Delta hedging",
      "Greeks dashboard",
    ],
  },
  ShadowCryptoFutures2: {
    icon: "⚡",
    title: "Perpetual Futures",
    accent: "text-yellow-400",
    desc: "Trade perpetual futures on 50+ crypto pairs with up to 100x leverage, cross-margin, and advanced order types",
    stats: [
      { label: "Open Interest", value: ".7B", color: "text-yellow-400" },
      { label: "Funding Rate", value: "0.01%", color: "text-green-400" },
      { label: "Max Leverage", value: "100x", color: "text-red-400" },
      { label: "Trading Pairs", value: "50+", color: "text-blue-400" },
    ],
    features: [
      "Up to 100x leverage",
      "Cross & isolated margin",
      "Liquidation protection",
      "Advanced order types",
      "Auto-deleveraging",
      "Insurance fund",
    ],
  },
  ShadowSkylerBlueMSP2: {
    icon: "🏢",
    title: "MSP Enterprise Tier",
    accent: "text-indigo-400",
    desc: "Enterprise managed services for large organizations — dedicated team, custom SLAs, and white-glove IT support",
    stats: [
      { label: "Enterprise Clients", value: "12", color: "text-indigo-400" },
      { label: "Dedicated Engineers", value: "8", color: "text-blue-400" },
      { label: "Response SLA", value: "<5min", color: "text-green-400" },
      { label: "NPS Score", value: "94", color: "text-yellow-400" },
    ],
    features: [
      "Dedicated account team",
      "Custom SLA agreements",
      "On-site engineers",
      "Executive business reviews",
      "Strategic IT roadmap",
      "Budget planning",
    ],
  },
  ShadowSkylerBlueRemote: {
    icon: "🖥️",
    title: "Remote IT Support",
    accent: "text-cyan-400",
    desc: "Instant remote IT support for any device, anywhere — screen sharing, remote control, and live troubleshooting",
    stats: [
      { label: "Remote Sessions", value: "4,847", color: "text-cyan-400" },
      { label: "First Call Res.", value: "87%", color: "text-green-400" },
      { label: "Avg Session", value: "14min", color: "text-blue-400" },
      { label: "CSAT", value: "4.9/5", color: "text-yellow-400" },
    ],
    features: [
      "Instant remote access",
      "Screen sharing",
      "File transfer",
      "Multi-platform support",
      "Session recording",
      "Unattended access",
    ],
  },
  ShadowCryptoArbitrage: {
    icon: "🔄",
    title: "Crypto Arbitrage Bot",
    accent: "text-pink-400",
    desc: "Automated arbitrage trading across 15+ exchanges — capture price discrepancies and earn risk-free profits",
    stats: [
      { label: "Exchanges", value: "15", color: "text-pink-400" },
      { label: "Daily Profit", value: "+0.8%", color: "text-green-400" },
      { label: "Trades/Day", value: "2,847", color: "text-blue-400" },
      { label: "Win Rate", value: "94.2%", color: "text-emerald-400" },
    ],
    features: [
      "Cross-exchange arbitrage",
      "Flash loan arbitrage",
      "Triangular arbitrage",
      "Gas optimization",
      "Risk management",
      "Real-time execution",
    ],
  },
  ShadowSkylerBluePenetration: {
    icon: "🎯",
    title: "Penetration Testing",
    accent: "text-red-400",
    desc: "Professional ethical hacking and penetration testing — find vulnerabilities before attackers do",
    stats: [
      { label: "Pen Tests Done", value: "247", color: "text-red-400" },
      { label: "Vulns Found", value: "4,847", color: "text-orange-400" },
      { label: "Critical Findings", value: "12%", color: "text-yellow-400" },
      { label: "Remediation Rate", value: "98.4%", color: "text-green-400" },
    ],
    features: [
      "Network pen testing",
      "Web app testing",
      "Social engineering",
      "Physical security",
      "Red team exercises",
      "Detailed remediation report",
    ],
  },
};

export default function ShadowSkylerBluePenetration() {
  const d = DATA["ShadowSkylerBluePenetration"];
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
          Get Started
        </Button>
      </div>
    </div>
  );
}
