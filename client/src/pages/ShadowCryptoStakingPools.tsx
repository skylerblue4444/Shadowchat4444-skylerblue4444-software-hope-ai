import { useState } from "react";
import {
  Server,
  Layers,
  TrendingUp,
  Shield,
  ClipboardCheck,
  Lock,
  Coins,
  Cloud,
  Droplets,
  DollarSign,
  CheckCircle,
  Zap,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
    progress?: { label: string; value: number; color: string }[];
  }
> = {
  ShadowSkylerBlueDataCenter: {
    icon: "🏗️",
    title: "Data Center Services",
    accent: "text-slate-400",
    desc: "Colocation, managed hosting, and data center consulting for Arkansas businesses — Tier III facilities with 99.999% uptime",
    stats: [
      { label: "Colo Racks", value: "247", color: "text-slate-400" },
      { label: "Power Density", value: "20kW", color: "text-blue-400" },
      { label: "PUE", value: "1.2", color: "text-green-400" },
      { label: "Uptime", value: "99.999%", color: "text-emerald-400" },
    ],
    features: [
      "Tier III colocation",
      "Managed hosting",
      "Remote hands",
      "Power redundancy",
      "Physical security",
      "24/7 NOC",
    ],
    progress: [
      { label: "Power Capacity", value: 67, color: "bg-blue-500" },
      { label: "Cooling Capacity", value: 54, color: "bg-cyan-500" },
      { label: "Network Capacity", value: 43, color: "bg-green-500" },
    ],
  },
  ShadowSkylerBlueVirtualization: {
    icon: "⚙️",
    title: "Virtualization Services",
    accent: "text-purple-400",
    desc: "VMware, Hyper-V, and Proxmox virtualization — consolidate servers, reduce costs, and improve resilience",
    stats: [
      { label: "VMs Managed", value: "4,247", color: "text-purple-400" },
      { label: "Consolidation", value: "8:1", color: "text-green-400" },
      { label: "Cost Savings", value: "67%", color: "text-blue-400" },
      { label: "vMotion Events", value: "847/mo", color: "text-orange-400" },
    ],
    features: [
      "VMware vSphere",
      "Hyper-V/Proxmox",
      "vSAN storage",
      "High availability",
      "Live migration",
      "Capacity planning",
    ],
    progress: [
      { label: "CPU Utilization", value: 34, color: "bg-purple-500" },
      { label: "Memory Usage", value: 61, color: "bg-blue-500" },
      { label: "Storage Used", value: 48, color: "bg-green-500" },
    ],
  },
  ShadowCryptoDerivatives: {
    icon: "📊",
    title: "Crypto Derivatives Hub",
    accent: "text-orange-400",
    desc: "Trade all crypto derivatives in one place — futures, options, perpetuals, and structured products",
    stats: [
      { label: "Open Interest", value: "2.4B", color: "text-orange-400" },
      { label: "24h Volume", value: ".7B", color: "text-green-400" },
      { label: "Products", value: "247", color: "text-blue-400" },
      { label: "Liquidations/24h", value: "4M", color: "text-red-400" },
    ],
    features: [
      "Perpetual futures",
      "Options chains",
      "Structured products",
      "Delta hedging",
      "Portfolio margin",
      "Greeks analytics",
    ],
    progress: [
      { label: "BTC Dominance", value: 47, color: "bg-orange-500" },
      { label: "ETH Dominance", value: 28, color: "bg-blue-500" },
      { label: "SKY4444 Dominance", value: 12, color: "bg-purple-500" },
    ],
  },
  ShadowCryptoInsurance2: {
    icon: "🛡️",
    title: "Crypto Insurance 2.0",
    accent: "text-green-400",
    desc: "Next-gen decentralized insurance for crypto assets — smart contract coverage, hack protection, and stablecoin depeg insurance",
    stats: [
      { label: "Total Coverage", value: ".4B", color: "text-green-400" },
      { label: "Policies Active", value: "84,247", color: "text-blue-400" },
      { label: "Claims Paid", value: "7M", color: "text-orange-400" },
      { label: "Avg Premium", value: "1.2%", color: "text-purple-400" },
    ],
    features: [
      "Smart contract coverage",
      "Exchange hack protection",
      "Stablecoin depeg",
      "Wallet theft",
      "DeFi protocol failure",
      "Instant claims",
    ],
    progress: [
      { label: "Coverage Ratio", value: 94, color: "bg-green-500" },
      { label: "Claims Reserve", value: 87, color: "bg-blue-500" },
      { label: "Solvency Ratio", value: 98, color: "bg-emerald-500" },
    ],
  },
  ShadowSkylerBlueCompliance2: {
    icon: "📋",
    title: "Compliance Automation",
    accent: "text-yellow-400",
    desc: "Automate HIPAA, PCI-DSS, SOC 2, and NIST compliance — continuous monitoring, evidence collection, and audit prep",
    stats: [
      { label: "Frameworks", value: "8", color: "text-yellow-400" },
      { label: "Controls", value: "1,247", color: "text-blue-400" },
      { label: "Auto-collected", value: "94%", color: "text-green-400" },
      { label: "Audit Ready", value: "Yes", color: "text-emerald-400" },
    ],
    features: [
      "HIPAA/PCI/SOC2/NIST",
      "Continuous monitoring",
      "Auto evidence collection",
      "Policy management",
      "Risk register",
      "Audit-ready reports",
    ],
    progress: [
      { label: "HIPAA Compliance", value: 97, color: "bg-yellow-500" },
      { label: "PCI-DSS", value: 94, color: "bg-orange-500" },
      { label: "SOC 2 Type II", value: 89, color: "bg-blue-500" },
    ],
  },
  ShadowSkylerBlueDLP: {
    icon: "🔏",
    title: "Data Loss Prevention",
    accent: "text-red-400",
    desc: "Enterprise DLP to prevent sensitive data from leaving your organization — email, endpoint, and cloud DLP",
    stats: [
      { label: "Policies Active", value: "247", color: "text-red-400" },
      { label: "Incidents Blocked", value: "4,847", color: "text-orange-400" },
      { label: "Data Scanned", value: "847TB", color: "text-blue-400" },
      { label: "False Positives", value: "0.3%", color: "text-green-400" },
    ],
    features: [
      "Email DLP",
      "Endpoint DLP",
      "Cloud DLP",
      "PII detection",
      "Credit card detection",
      "Incident reporting",
    ],
    progress: [
      { label: "Email Coverage", value: 100, color: "bg-red-500" },
      { label: "Endpoint Coverage", value: 97, color: "bg-orange-500" },
      { label: "Cloud Coverage", value: 94, color: "bg-blue-500" },
    ],
  },
  ShadowCryptoStakingPools: {
    icon: "🏊",
    title: "Staking Pools",
    accent: "text-cyan-400",
    desc: "Join community staking pools for higher yields — pool your SKY4444, ETH, and SOL for maximum staking rewards",
    stats: [
      { label: "Total Staked", value: "47M", color: "text-cyan-400" },
      { label: "Pool APY", value: "18.4%", color: "text-green-400" },
      { label: "Validators", value: "247", color: "text-blue-400" },
      { label: "Stakers", value: "84,247", color: "text-purple-400" },
    ],
    features: [
      "ETH liquid staking",
      "SKY4444 staking pools",
      "SOL delegation",
      "Auto-compound",
      "Instant unstaking",
      "Validator selection",
    ],
    progress: [
      { label: "Pool Capacity", value: 67, color: "bg-cyan-500" },
      { label: "Validator Health", value: 99, color: "bg-green-500" },
      { label: "Reward Rate", value: 84, color: "bg-blue-500" },
    ],
  },
  ShadowSkylerBlueHybridCloud: {
    icon: "🌤️",
    title: "Hybrid Cloud Solutions",
    accent: "text-sky-400",
    desc: "Seamlessly connect on-premise infrastructure with public cloud — best of both worlds for Arkansas enterprises",
    stats: [
      { label: "Hybrid Clients", value: "34", color: "text-sky-400" },
      { label: "Cloud Savings", value: "41%", color: "text-green-400" },
      { label: "Latency", value: "<5ms", color: "text-blue-400" },
      { label: "Workloads", value: "847", color: "text-orange-400" },
    ],
    features: [
      "AWS/Azure/GCP hybrid",
      "SD-WAN connectivity",
      "Workload migration",
      "Unified management",
      "Cost optimization",
      "Disaster recovery",
    ],
    progress: [
      { label: "Cloud Workloads", value: 54, color: "bg-sky-500" },
      { label: "On-Prem Workloads", value: 46, color: "bg-slate-500" },
      { label: "Hybrid Efficiency", value: 89, color: "bg-green-500" },
    ],
  },
  ShadowCryptoLiquidityMining: {
    icon: "⛏️",
    title: "Liquidity Mining Hub",
    accent: "text-amber-400",
    desc: "Earn SKY4444 and other tokens by providing liquidity to ShadowDEX pools — optimized for maximum mining rewards",
    stats: [
      { label: "Total Liquidity", value: ".1B", color: "text-amber-400" },
      { label: "Mining APY", value: "47.2%", color: "text-green-400" },
      { label: "Active Miners", value: "24,847", color: "text-blue-400" },
      { label: "SKY4444 Mined", value: "4.7M/day", color: "text-purple-400" },
    ],
    features: [
      "LP token mining",
      "Boosted rewards",
      "Auto-harvest",
      "IL protection",
      "Dual rewards",
      "Governance voting",
    ],
    progress: [
      { label: "SKY4444/ETH Pool", value: 87, color: "bg-amber-500" },
      { label: "SKY4444/BTC Pool", value: 73, color: "bg-orange-500" },
      { label: "SKY4444/USDC Pool", value: 94, color: "bg-yellow-500" },
    ],
  },
  ShadowSkylerBlueITBudget: {
    icon: "💰",
    title: "IT Budget Planning",
    accent: "text-emerald-400",
    desc: "Strategic IT budget planning and cost optimization — reduce IT spend by 20-40% while improving capabilities",
    stats: [
      { label: "Avg Savings", value: "34%", color: "text-emerald-400" },
      { label: "Budgets Managed", value: "94", color: "text-blue-400" },
      { label: "Total IT Spend", value: "4M", color: "text-orange-400" },
      { label: "ROI Delivered", value: "340%", color: "text-green-400" },
    ],
    features: [
      "3-year budget modeling",
      "Vendor negotiation",
      "License optimization",
      "CapEx vs OpEx planning",
      "Cost allocation",
      "Executive reporting",
    ],
    progress: [
      { label: "Hardware Budget", value: 34, color: "bg-blue-500" },
      { label: "Software Budget", value: 28, color: "bg-purple-500" },
      { label: "Services Budget", value: 38, color: "bg-green-500" },
    ],
  },
};

export default function ShadowCryptoStakingPools() {
  const d = DATA["ShadowCryptoStakingPools"];
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
      {d.progress && (
        <Card className="border-border/50">
          <CardContent className="py-3 px-4 space-y-2">
            {d.progress.map(
              (p: { label: string; value: number; color: string }) => (
                <div key={p.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">{p.label}</span>
                    <span className="font-bold">{p.value}%</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className={"h-full rounded-full " + p.color}
                      style={{ width: p.value + "%" }}
                    />
                  </div>
                </div>
              )
            )}
          </CardContent>
        </Card>
      )}
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
