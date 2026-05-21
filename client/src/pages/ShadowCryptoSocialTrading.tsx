import { useState } from "react";
import {
  CheckCircle,
  Zap,
  TrendingUp,
  Shield,
  Users,
  Star,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
export default function ShadowCryptoSocialTrading() {
  const pageData: Record<
    string,
    {
      icon: string;
      title: string;
      desc: string;
      accent: string;
      highlight: string;
      stats: { label: string; value: string; color: string }[];
      features: string[];
    }
  > = {
    ShadowSkylerBlueITGovernance: {
      icon: "🏛️",
      title: "IT Governance",
      accent: "text-indigo-400",
      highlight: "Framework",
      desc: "ITIL, COBIT, and ISO 27001 IT governance frameworks for Arkansas enterprises — align IT with business objectives",
      stats: [
        { label: "Frameworks", value: "4", color: "text-indigo-400" },
        { label: "Policies", value: "247", color: "text-blue-400" },
        { label: "Controls", value: "1,247", color: "text-green-400" },
        { label: "Maturity Level", value: "4/5", color: "text-emerald-400" },
      ],
      features: [
        "ITIL v4 implementation",
        "COBIT framework",
        "ISO 27001",
        "Change management",
        "Service catalog",
        "KPI dashboards",
      ],
    },
    ShadowCryptoSocialTrading: {
      icon: "👥",
      title: "Social Trading",
      accent: "text-pink-400",
      highlight: "Copy Pros",
      desc: "Follow and copy the best crypto traders on ShadowChat — real-time portfolio mirroring with risk controls",
      stats: [
        { label: "Top Traders", value: "4,247", color: "text-pink-400" },
        { label: "Copiers", value: "84,247", color: "text-green-400" },
        { label: "Avg Return", value: "+127%", color: "text-blue-400" },
        { label: "Win Rate", value: "71%", color: "text-orange-400" },
      ],
      features: [
        "1-click copy trading",
        "Risk limits",
        "Performance analytics",
        "Trader leaderboard",
        "Auto-stop loss",
        "Portfolio diversification",
      ],
    },
    ShadowSkylerBlueITRisk: {
      icon: "⚠️",
      title: "IT Risk Management",
      accent: "text-orange-400",
      highlight: "Proactive",
      desc: "Identify, assess, and mitigate IT risks before they impact your business — continuous risk monitoring and reporting",
      stats: [
        { label: "Risks Identified", value: "847", color: "text-orange-400" },
        { label: "Mitigated", value: "94%", color: "text-green-400" },
        { label: "Risk Score", value: "Low", color: "text-blue-400" },
        { label: "Incidents/Year", value: "2", color: "text-emerald-400" },
      ],
      features: [
        "Risk register",
        "Threat modeling",
        "Business impact analysis",
        "Mitigation planning",
        "Risk reporting",
        "Board-level dashboards",
      ],
    },
    ShadowCryptoEarnCenter: {
      icon: "💰",
      title: "Earn Center",
      accent: "text-yellow-400",
      highlight: "Earn Daily",
      desc: "All the ways to earn SKY4444 and crypto on ShadowChat — staking, trading, referrals, content creation, and more",
      stats: [
        { label: "Earning Methods", value: "24", color: "text-yellow-400" },
        { label: "Daily Earners", value: "84,247", color: "text-green-400" },
        { label: "Avg Daily Earn", value: "7", color: "text-blue-400" },
        { label: "Top Earner", value: ",247/day", color: "text-orange-400" },
      ],
      features: [
        "Staking rewards",
        "Trading rebates",
        "Referral program",
        "Content monetization",
        "Task bounties",
        "Charity gaming rewards",
      ],
    },
    ShadowSkylerBlueITVendor: {
      icon: "🤝",
      title: "IT Vendor Management",
      accent: "text-teal-400",
      highlight: "Save 30%",
      desc: "Manage all your IT vendors in one place — contracts, renewals, SLAs, and cost optimization for Arkansas businesses",
      stats: [
        { label: "Vendors Managed", value: "247", color: "text-teal-400" },
        { label: "Contracts", value: "847", color: "text-blue-400" },
        { label: "Annual Savings", value: "47K", color: "text-green-400" },
        { label: "Renewals Tracked", value: "94", color: "text-orange-400" },
      ],
      features: [
        "Vendor database",
        "Contract management",
        "SLA tracking",
        "Cost benchmarking",
        "Renewal alerts",
        "Performance scoring",
      ],
    },
    ShadowCryptoPrivacy: {
      icon: "🔒",
      title: "Privacy Coins Hub",
      accent: "text-gray-400",
      highlight: "Anonymous",
      desc: "Trade and manage privacy coins — Monero (XMR), Zcash, Dash, and other privacy-focused cryptocurrencies",
      stats: [
        { label: "Privacy Coins", value: "12", color: "text-gray-400" },
        { label: "XMR Price", value: "47", color: "text-green-400" },
        { label: "24h Volume", value: "47M", color: "text-blue-400" },
        { label: "Anonymity Set", value: "99.9%", color: "text-emerald-400" },
      ],
      features: [
        "Monero (XMR) trading",
        "Zcash shielded txs",
        "Ring signatures",
        "Zero-knowledge proofs",
        "Stealth addresses",
        "Privacy analytics",
      ],
    },
    ShadowSkylerBlueITProjectMgmt: {
      icon: "📊",
      title: "IT Project Management",
      accent: "text-blue-400",
      highlight: "On Time",
      desc: "Deliver IT projects on time and on budget — Agile, Scrum, and waterfall project management for Arkansas businesses",
      stats: [
        { label: "Projects Delivered", value: "247", color: "text-blue-400" },
        { label: "On-Time Rate", value: "94%", color: "text-green-400" },
        { label: "On-Budget Rate", value: "97%", color: "text-orange-400" },
        {
          label: "Client Satisfaction",
          value: "4.9/5",
          color: "text-emerald-400",
        },
      ],
      features: [
        "Agile/Scrum/Waterfall",
        "Project dashboards",
        "Resource management",
        "Risk tracking",
        "Stakeholder reporting",
        "Change control",
      ],
    },
    ShadowCryptoTrumpHub: {
      icon: "🇺🇸",
      title: "TRUMP Coin Hub",
      accent: "text-red-400",
      highlight: "MAGA Crypto",
      desc: "Everything about TRUMP coin — price, news, memes, community, trading, and ShadowChat TRUMP integration",
      stats: [
        { label: "TRUMP Price", value: "4.72", color: "text-red-400" },
        { label: "Market Cap", value: ".9B", color: "text-green-400" },
        { label: "24h Volume", value: "47M", color: "text-blue-400" },
        { label: "Holders", value: "847K", color: "text-orange-400" },
      ],
      features: [
        "TRUMP price tracker",
        "TRUMP/SKY4444 pair",
        "TRUMP news feed",
        "Meme gallery",
        "Community board",
        "TRUMP staking",
      ],
    },
    ShadowSkylerBlueITAssetMgmt: {
      icon: "💻",
      title: "IT Asset Management",
      accent: "text-purple-400",
      highlight: "Full Visibility",
      desc: "Track every IT asset across your organization — hardware, software, licenses, and end-of-life planning",
      stats: [
        { label: "Assets Tracked", value: "24,847", color: "text-purple-400" },
        {
          label: "License Compliance",
          value: "99.1%",
          color: "text-green-400",
        },
        { label: "Asset Value", value: ".7M", color: "text-blue-400" },
        { label: "EOL Alerts", value: "47", color: "text-orange-400" },
      ],
      features: [
        "Hardware inventory",
        "Software licenses",
        "CMDB integration",
        "EOL/EOS tracking",
        "Procurement workflow",
        "Disposal management",
      ],
    },
    ShadowCryptoSkyBlueEcosystem: {
      icon: "🌐",
      title: "SKY4444 Ecosystem",
      accent: "text-cyan-400",
      highlight: "Full Ecosystem",
      desc: "The complete SKY4444 and ShadowChat ecosystem — all products, services, partnerships, and integrations in one view",
      stats: [
        { label: "Ecosystem Products", value: "24", color: "text-cyan-400" },
        { label: "Integrations", value: "847", color: "text-green-400" },
        { label: "Partners", value: "247", color: "text-blue-400" },
        { label: "Users", value: "847K", color: "text-orange-400" },
      ],
      features: [
        "ShadowChat platform",
        "SKY4444 token",
        "Skyler Blue IT",
        "ShadowDEX",
        "ShadowPay",
        "ShadowID",
      ],
    },
  };
  const d = pageData["ShadowCryptoSocialTrading"] || {
    icon: "⚡",
    title: "ShadowCryptoSocialTrading",
    accent: "text-blue-400",
    highlight: "New",
    desc: "Production-grade ShadowChat module",
    stats: [],
    features: [],
  };
  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-black">
            {d.icon} {d.title}
          </h1>
          <p className="text-sm text-muted-foreground">{d.desc}</p>
        </div>
        <Badge className="bg-indigo-600 text-white shrink-0">
          {d.highlight}
        </Badge>
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
          onClick={() => toast.success("Request submitted!")}
        >
          <Zap className="h-4 w-4 mr-2" />
          Get Started
        </Button>
      </div>
    </div>
  );
}
