import { useState } from "react";
import {
  Monitor,
  Package,
  ShoppingBag,
  BarChart3,
  Share2,
  User,
  Printer,
  ShieldCheck,
  CheckCircle,
  Zap,
  TrendingUp,
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
  ShadowSkylerBlueNOC: {
    icon: "🖥️",
    title: "Network Operations Center",
    accent: "text-blue-400",
    desc: "24/7 NOC monitoring for all managed networks — proactive alerts, incident response, and performance optimization",
    stats: [
      { label: "Monitored Devices", value: "2,847", color: "text-blue-400" },
      { label: "Alerts Today", value: "14", color: "text-orange-400" },
      { label: "MTTR", value: "12min", color: "text-green-400" },
      { label: "Uptime SLA", value: "99.99%", color: "text-emerald-400" },
    ],
    features: [
      "24/7 network monitoring",
      "Proactive alerting",
      "Bandwidth analysis",
      "Device health tracking",
      "Incident ticketing",
      "Monthly NOC reports",
    ],
  },
  ShadowSkylerBlueAssetMgmt: {
    icon: "📦",
    title: "IT Asset Management",
    accent: "text-amber-400",
    desc: "Track every laptop, server, switch, and license across your entire IT estate — from procurement to disposal",
    stats: [
      { label: "Assets Tracked", value: "4,847", color: "text-amber-400" },
      { label: "Warranties Active", value: "94%", color: "text-green-400" },
      { label: "Licenses", value: "1,247", color: "text-blue-400" },
      { label: "Expiring Soon", value: "23", color: "text-red-400" },
    ],
    features: [
      "Hardware inventory",
      "Software license tracking",
      "Warranty management",
      "Depreciation tracking",
      "Disposal workflow",
      "Audit-ready reports",
    ],
  },
  ShadowSkylerBlueProcurement: {
    icon: "🛒",
    title: "IT Procurement",
    accent: "text-green-400",
    desc: "Managed IT procurement — we source, negotiate, and deliver the best hardware and software deals for your business",
    stats: [
      { label: "Vendors", value: "47", color: "text-green-400" },
      { label: "Avg Savings", value: "23%", color: "text-emerald-400" },
      { label: "Orders/Month", value: "84", color: "text-blue-400" },
      { label: "Delivery Time", value: "2.3 days", color: "text-orange-400" },
    ],
    features: [
      "Multi-vendor sourcing",
      "Volume discount negotiation",
      "Purchase order management",
      "Vendor relationship mgmt",
      "Budget tracking",
      "Lifecycle planning",
    ],
  },
  ShadowSkylerBluePowerBI: {
    icon: "📊",
    title: "IT Analytics & Reporting",
    accent: "text-purple-400",
    desc: "Business intelligence dashboards for IT metrics — uptime, ticket trends, cost analysis, and executive reporting",
    stats: [
      { label: "Dashboards", value: "24", color: "text-purple-400" },
      { label: "Data Sources", value: "12", color: "text-blue-400" },
      { label: "Reports/Month", value: "847", color: "text-green-400" },
      { label: "Automation", value: "94%", color: "text-orange-400" },
    ],
    features: [
      "Real-time dashboards",
      "Automated reports",
      "Cost allocation",
      "Trend analysis",
      "Executive summaries",
      "Custom KPI tracking",
    ],
  },
  ShadowCryptoSocial: {
    icon: "🌐",
    title: "Crypto Social Network",
    accent: "text-cyan-400",
    desc: "The first social network where every like, share, and post earns you SKY4444 tokens — Web3 social-fi at its finest",
    stats: [
      { label: "Users", value: "847K", color: "text-cyan-400" },
      { label: "Posts Today", value: "124K", color: "text-green-400" },
      { label: "SKY4444 Earned", value: "2.4M", color: "text-yellow-400" },
      { label: "Trending Tags", value: "247", color: "text-purple-400" },
    ],
    features: [
      "Earn tokens for posting",
      "Tip creators in crypto",
      "NFT profile pictures",
      "Decentralized feed",
      "DAO content moderation",
      "Cross-chain identity",
    ],
  },
  ShadowWeb3Profile: {
    icon: "👤",
    title: "Web3 Identity Profile",
    accent: "text-violet-400",
    desc: "Your on-chain identity — ENS name, verified credentials, reputation score, and cross-platform Web3 passport",
    stats: [
      { label: "Credentials", value: "12", color: "text-violet-400" },
      { label: "Reputation", value: "94/100", color: "text-green-400" },
      { label: "Chains", value: "8", color: "text-blue-400" },
      { label: "NFTs Owned", value: "47", color: "text-orange-400" },
    ],
    features: [
      "ENS/Unstoppable domains",
      "Verifiable credentials",
      "Cross-chain portfolio",
      "On-chain reputation",
      "SBT soul-bound tokens",
      "Privacy controls",
    ],
  },
  ShadowSkylerBluePrint: {
    icon: "🖨️",
    title: "Managed Print Services",
    accent: "text-slate-400",
    desc: "Managed print for Arkansas businesses — printer fleet management, toner delivery, and cost-per-page billing",
    stats: [
      { label: "Printers Managed", value: "284", color: "text-slate-400" },
      { label: "Pages/Month", value: "847K", color: "text-blue-400" },
      {
        label: "Cost/Page",
        value: "/usr/bin/bash.008",
        color: "text-green-400",
      },
      { label: "Toner Deliveries", value: "Auto", color: "text-orange-400" },
    ],
    features: [
      "Fleet management",
      "Auto toner delivery",
      "Cost-per-page billing",
      "Print security",
      "Usage reporting",
      "Remote diagnostics",
    ],
  },
  ShadowSkylerBlueSecurity2: {
    icon: "🔒",
    title: "Cybersecurity Services",
    accent: "text-red-400",
    desc: "Comprehensive cybersecurity for Arkansas businesses — from phishing training to penetration testing and incident response",
    stats: [
      { label: "Threats Blocked", value: "847K", color: "text-red-400" },
      { label: "Pen Tests Done", value: "94", color: "text-orange-400" },
      { label: "Phishing Pass", value: "97.2%", color: "text-green-400" },
      { label: "Incidents/Mo", value: "0.3", color: "text-blue-400" },
    ],
    features: [
      "Penetration testing",
      "Phishing simulation",
      "Security awareness training",
      "Incident response",
      "Dark web monitoring",
      "Cyber insurance consulting",
    ],
  },
};

export default function ShadowWeb3Profile() {
  const d = DATA["ShadowWeb3Profile"];
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
          <p className="font-bold text-sm mb-2">What's Included</p>
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
            toast.success("Request sent — we'll contact you within 1 hour!")
          }
        >
          <Zap className="h-4 w-4 mr-2" />
          Get Started Free
        </Button>
      </div>
    </div>
  );
}
