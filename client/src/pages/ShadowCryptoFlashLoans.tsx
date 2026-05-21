import { useState } from "react";
import {
  Building2,
  Brain,
  Lock,
  Zap,
  GraduationCap,
  Coins,
  Briefcase,
  Rocket,
  Shield,
  Gamepad2,
  Headphones,
  Star,
  CheckCircle,
  TrendingUp,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    highlight?: string;
  }
> = {
  ShadowSkylerBlueMSP3: {
    icon: "🏆",
    title: "MSP Platinum Tier",
    accent: "text-yellow-400",
    highlight: "Best Value",
    desc: "The ultimate managed IT package — unlimited support, dedicated CIO, vCISO, and complete IT ownership for your business",
    stats: [
      { label: "Platinum Clients", value: "8", color: "text-yellow-400" },
      { label: "Dedicated Staff", value: "12", color: "text-blue-400" },
      { label: "Response SLA", value: "<2min", color: "text-green-400" },
      { label: "Client NPS", value: "98", color: "text-emerald-400" },
    ],
    features: [
      "Dedicated CIO/vCISO",
      "Unlimited support",
      "On-site engineers",
      "24/7/365 coverage",
      "Strategic IT planning",
      "Custom SLA",
    ],
  },
  ShadowCryptoSentiment: {
    icon: "🧠",
    title: "Crypto Sentiment AI",
    accent: "text-violet-400",
    highlight: "AI Powered",
    desc: "Real-time AI sentiment analysis across Twitter, Reddit, Telegram, and news — predict price movements before they happen",
    stats: [
      { label: "Sources Monitored", value: "2,847", color: "text-violet-400" },
      { label: "Accuracy", value: "87.4%", color: "text-green-400" },
      { label: "Signals/Day", value: "4,247", color: "text-blue-400" },
      { label: "Languages", value: "24", color: "text-orange-400" },
    ],
    features: [
      "Twitter/Reddit/Telegram",
      "News sentiment",
      "Fear & Greed index",
      "Whale wallet tracking",
      "On-chain signals",
      "Price prediction",
    ],
  },
  ShadowSkylerBlueZeroTrust: {
    icon: "🔐",
    title: "Zero Trust Security",
    accent: "text-red-400",
    highlight: "Enterprise",
    desc: "Zero Trust Network Access — never trust, always verify. Complete identity-based access control for modern businesses",
    stats: [
      { label: "Users Protected", value: "8,247", color: "text-red-400" },
      { label: "Access Policies", value: "4,847", color: "text-orange-400" },
      { label: "Auth Attempts/Day", value: "84K", color: "text-blue-400" },
      { label: "Blocked", value: "2.4%", color: "text-green-400" },
    ],
    features: [
      "Identity verification",
      "Micro-segmentation",
      "Continuous validation",
      "MFA everywhere",
      "Privileged access mgmt",
      "Lateral movement prevention",
    ],
  },
  ShadowCryptoFlashLoans: {
    icon: "⚡",
    title: "Flash Loan Center",
    accent: "text-yellow-400",
    highlight: "DeFi Native",
    desc: "Execute uncollateralized flash loans for arbitrage, liquidations, and collateral swaps — all in a single transaction",
    stats: [
      { label: "Available Liquidity", value: "47M", color: "text-yellow-400" },
      { label: "Fee", value: "0.09%", color: "text-green-400" },
      { label: "Flash Loans Today", value: "4,247", color: "text-blue-400" },
      { label: "Success Rate", value: "99.7%", color: "text-emerald-400" },
    ],
    features: [
      "Uncollateralized loans",
      "Single-tx execution",
      "Arbitrage templates",
      "Liquidation bots",
      "Collateral swap",
      "Custom strategies",
    ],
  },
  ShadowSkylerBlueITTraining: {
    icon: "🎓",
    title: "IT Training & Certification",
    accent: "text-blue-400",
    highlight: "Upskill Team",
    desc: "CompTIA, Microsoft, Cisco, and cybersecurity training for your IT team — instructor-led and self-paced courses",
    stats: [
      { label: "Courses Available", value: "247", color: "text-blue-400" },
      { label: "Certifications", value: "84", color: "text-green-400" },
      { label: "Students Trained", value: "4,847", color: "text-orange-400" },
      { label: "Pass Rate", value: "94.2%", color: "text-emerald-400" },
    ],
    features: [
      "CompTIA A+/Network+/Security+",
      "Microsoft certifications",
      "Cisco CCNA/CCNP",
      "Cybersecurity training",
      "Hands-on labs",
      "Exam vouchers",
    ],
  },
  ShadowCryptoNFTFi: {
    icon: "🖼️",
    title: "NFTFi — NFT Finance",
    accent: "text-pink-400",
    highlight: "New",
    desc: "Use your NFTs as collateral for loans, earn yield on NFT collections, and trade NFT derivatives",
    stats: [
      { label: "NFT Collateral", value: "47M", color: "text-pink-400" },
      { label: "Active Loans", value: "8,247", color: "text-blue-400" },
      { label: "Avg LTV", value: "47%", color: "text-orange-400" },
      { label: "Collections", value: "847", color: "text-green-400" },
    ],
    features: [
      "NFT-backed loans",
      "Buy now pay later",
      "NFT rental",
      "Fractionalization",
      "Collection floor loans",
      "Instant liquidity",
    ],
  },
  ShadowSkylerBlueITConsulting: {
    icon: "💼",
    title: "IT Consulting",
    accent: "text-indigo-400",
    highlight: "Strategic",
    desc: "Strategic IT consulting for Arkansas businesses — technology assessments, digital transformation, and IT strategy",
    stats: [
      {
        label: "Consulting Engagements",
        value: "247",
        color: "text-indigo-400",
      },
      { label: "Avg Project Value", value: "4K", color: "text-green-400" },
      {
        label: "Client Satisfaction",
        value: "4.9/5",
        color: "text-yellow-400",
      },
      { label: "ROI Delivered", value: "340%", color: "text-blue-400" },
    ],
    features: [
      "Technology assessment",
      "Digital transformation",
      "IT strategy roadmap",
      "Vendor selection",
      "Change management",
      "Project management",
    ],
  },
  ShadowCryptoSkyBlueICO: {
    icon: "🚀",
    title: "SKY4444 ICO Dashboard",
    accent: "text-cyan-400",
    highlight: "Live Now",
    desc: "Invest in the SKY4444 token ICO — the native currency of the ShadowChat ecosystem and Skyler Blue IT Resolutions",
    stats: [
      { label: "Raised", value: ".7M", color: "text-cyan-400" },
      { label: "Target", value: "0M", color: "text-blue-400" },
      {
        label: "Token Price",
        value: "/usr/bin/bash.047",
        color: "text-green-400",
      },
      { label: "Days Left", value: "47", color: "text-orange-400" },
    ],
    features: [
      "3 investment tiers",
      "Vesting schedule",
      "Whitelist priority",
      "Referral bonuses",
      "DAO governance rights",
      "Staking rewards",
    ],
  },
  ShadowSkylerBlueManagedSOC: {
    icon: "🛡️",
    title: "Managed SOC",
    accent: "text-red-400",
    highlight: "24/7",
    desc: "Managed Security Operations Center — 24/7 threat detection, incident response, and security monitoring for Arkansas businesses",
    stats: [
      { label: "SOC Clients", value: "47", color: "text-red-400" },
      { label: "Events/Day", value: "4.7M", color: "text-orange-400" },
      { label: "MTTD", value: "4min", color: "text-blue-400" },
      { label: "MTTR", value: "18min", color: "text-green-400" },
    ],
    features: [
      "24/7 SOC analysts",
      "SIEM management",
      "Threat hunting",
      "Incident response",
      "Forensic investigation",
      "Monthly SOC reports",
    ],
  },
  ShadowCryptoWeb3Gaming: {
    icon: "🎮",
    title: "Web3 Gaming Hub",
    accent: "text-purple-400",
    highlight: "Play to Earn",
    desc: "Play-to-earn games, NFT gaming assets, and tournament prizes paid in SKY4444 and TRUMP tokens",
    stats: [
      { label: "Active Games", value: "47", color: "text-purple-400" },
      { label: "Players", value: "847K", color: "text-green-400" },
      { label: "Prizes Paid", value: ".4M", color: "text-yellow-400" },
      { label: "NFT Assets", value: "2.4M", color: "text-blue-400" },
    ],
    features: [
      "Play-to-earn mechanics",
      "NFT game items",
      "Tournament system",
      "Guild management",
      "Scholarship program",
      "Cross-game assets",
    ],
  },
  ShadowSkylerBlueTechSupport: {
    icon: "🔧",
    title: "Tech Support Center",
    accent: "text-orange-400",
    highlight: "Instant Help",
    desc: "Instant tech support for individuals and businesses — computer repair, virus removal, and IT troubleshooting",
    stats: [
      { label: "Issues Resolved", value: "24,847", color: "text-orange-400" },
      { label: "Avg Fix Time", value: "47min", color: "text-green-400" },
      { label: "Remote Sessions", value: "8,247", color: "text-blue-400" },
      { label: "CSAT", value: "4.9/5", color: "text-yellow-400" },
    ],
    features: [
      "Computer repair",
      "Virus/malware removal",
      "Data recovery",
      "Network setup",
      "Software installation",
      "Remote support",
    ],
  },
  ShadowCryptoSkyBlueToken: {
    icon: "💎",
    title: "SKY4444 Token Hub",
    accent: "text-sky-400",
    highlight: "Native Token",
    desc: "Everything about the SKY4444 token — price, tokenomics, utility, staking, governance, and how to earn",
    stats: [
      { label: "Price", value: "/usr/bin/bash.047", color: "text-sky-400" },
      { label: "Market Cap", value: "7M", color: "text-green-400" },
      { label: "Total Supply", value: "1B", color: "text-blue-400" },
      { label: "Circulating", value: "247M", color: "text-orange-400" },
    ],
    features: [
      "Platform utility token",
      "Governance voting",
      "Staking rewards",
      "Fee discounts",
      "ICO participation",
      "Charity allocation",
    ],
  },
};

export default function ShadowCryptoFlashLoans() {
  const d = DATA["ShadowCryptoFlashLoans"];
  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-black">
            {d.icon} {d.title}
          </h1>
          <p className="text-sm text-muted-foreground">{d.desc}</p>
        </div>
        {d.highlight && (
          <Badge className="bg-indigo-600 text-white shrink-0">
            {d.highlight}
          </Badge>
        )}
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
