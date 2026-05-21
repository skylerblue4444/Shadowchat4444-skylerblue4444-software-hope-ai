import { useState } from "react";
import { motion } from "framer-motion";
import {
  Handshake,
  DollarSign,
  TrendingUp,
  Users,
  Star,
  Zap,
  CheckCircle,
  ChevronRight,
  Globe,
  Shield,
  Award,
  Gift,
  Building,
  Code,
  Megaphone,
  BarChart2,
  Plus,
  Mail,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const PARTNER_TIERS = [
  {
    tier: "Affiliate",
    icon: "🌱",
    commission: "15%",
    minVolume: "$0",
    perks: ["Custom referral link", "Marketing materials", "Monthly payouts"],
    color: "from-green-600 to-emerald-600",
  },
  {
    tier: "Silver Partner",
    icon: "🥈",
    commission: "20%",
    minVolume: "$10K/mo",
    perks: [
      "Dedicated account manager",
      "Co-branded landing page",
      "Priority support",
      "Quarterly bonuses",
    ],
    color: "from-gray-400 to-gray-300",
  },
  {
    tier: "Gold Partner",
    icon: "🥇",
    commission: "25%",
    minVolume: "$50K/mo",
    perks: [
      "Revenue share on IT services",
      "Joint marketing campaigns",
      "API white-label access",
      "Monthly strategy calls",
    ],
    color: "from-yellow-500 to-amber-400",
  },
  {
    tier: "Platinum Partner",
    icon: "💎",
    commission: "30%",
    minVolume: "$200K/mo",
    perks: [
      "Full white-label platform",
      "Custom integrations",
      "Equity participation",
      "Board advisory role",
    ],
    color: "from-cyan-400 to-blue-400",
  },
];

const PARTNER_TYPES = [
  {
    type: "Technology",
    icon: Code,
    desc: "API integrations, plugin developers, and tech companies",
    examples: ["Payment processors", "KYC providers", "Data analytics"],
  },
  {
    type: "Marketing",
    icon: Megaphone,
    desc: "Influencers, agencies, and content creators",
    examples: ["Crypto YouTubers", "Twitter/X influencers", "PR agencies"],
  },
  {
    type: "Enterprise",
    icon: Building,
    desc: "Corporations and institutional clients",
    examples: ["Banks", "Hedge funds", "Fortune 500 companies"],
  },
  {
    type: "IT Services",
    icon: Shield,
    desc: "IT service providers and MSPs",
    examples: [
      "Managed IT providers",
      "Cybersecurity firms",
      "Cloud consultants",
    ],
  },
];

const CURRENT_PARTNERS = [
  {
    name: "CryptoNews.io",
    type: "Marketing",
    tier: "Gold",
    volume: "$84K/mo",
    commission: "$21K/mo",
    status: "active",
  },
  {
    name: "TechSolutions LLC",
    type: "IT Services",
    tier: "Silver",
    volume: "$24K/mo",
    commission: "$4.8K/mo",
    status: "active",
  },
  {
    name: "BlockchainMedia",
    type: "Marketing",
    tier: "Affiliate",
    volume: "$8K/mo",
    commission: "$1.2K/mo",
    status: "active",
  },
];

export default function PartnerPortal() {
  const [tab, setTab] = useState<
    "overview" | "apply" | "partners" | "resources"
  >("overview");
  const [formData, setFormData] = useState({
    company: "",
    website: "",
    type: "Technology",
    tier: "Affiliate",
    email: "",
    volume: "",
  });

  const submitApplication = () => {
    if (!formData.company || !formData.email) {
      toast.error("Fill in required fields");
      return;
    }
    toast.success(
      "Partnership application submitted! We'll contact you within 48 hours."
    );
    setFormData({
      company: "",
      website: "",
      type: "Technology",
      tier: "Affiliate",
      email: "",
      volume: "",
    });
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Handshake className="h-6 w-6 text-blue-400" />
            Partner Portal
          </h1>
          <p className="text-sm text-muted-foreground">
            Grow your business with ShadowChat — earn up to 30% commission
          </p>
        </div>
        <Button
          className="bg-blue-600 text-white border-0"
          size="sm"
          onClick={() => setTab("apply")}
        >
          <Plus className="h-4 w-4 mr-2" />
          Apply Now
        </Button>
      </div>

      {/* Stats Banner */}
      <div className="grid grid-cols-3 gap-3">
        {[
          {
            label: "Active Partners",
            value: "284",
            icon: Users,
            color: "text-blue-400",
          },
          {
            label: "Paid Out (All Time)",
            value: "$2.4M",
            icon: DollarSign,
            color: "text-green-400",
          },
          {
            label: "Avg. Commission",
            value: "$8,400/mo",
            icon: TrendingUp,
            color: "text-yellow-400",
          },
        ].map(({ label, value, icon: Icon, color }) => (
          <Card key={label} className="border-border/50">
            <CardContent className="pt-3 pb-2 text-center">
              <Icon className={`h-4 w-4 ${color} mx-auto mb-1`} />
              <p className="font-black">{value}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {(["overview", "apply", "partners", "resources"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${tab === t ? "bg-blue-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="space-y-4">
          {/* Tiers */}
          <h3 className="font-bold text-sm">Partnership Tiers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {PARTNER_TIERS.map((tier, i) => (
              <Card key={tier.tier} className="border-border/50">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{tier.icon}</span>
                    <div>
                      <p className="font-black">{tier.tier}</p>
                      <p className="text-xs text-muted-foreground">
                        Min volume: {tier.minVolume}
                      </p>
                    </div>
                    <div className="ml-auto text-right">
                      <p className="text-2xl font-black text-green-400">
                        {tier.commission}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        commission
                      </p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    {tier.perks.map(perk => (
                      <div
                        key={perk}
                        className="flex items-center gap-2 text-xs"
                      >
                        <CheckCircle className="h-3.5 w-3.5 text-green-400 shrink-0" />
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>
                  <Button
                    className={`w-full mt-3 h-8 text-xs bg-gradient-to-r ${tier.color} text-white border-0 font-bold`}
                    onClick={() => setTab("apply")}
                  >
                    Apply for {tier.tier}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Partner Types */}
          <h3 className="font-bold text-sm">Partner Types</h3>
          <div className="grid grid-cols-2 gap-3">
            {PARTNER_TYPES.map(({ type, icon: Icon, desc, examples }) => (
              <Card key={type} className="border-border/50">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="h-5 w-5 text-blue-400" />
                    <p className="font-bold text-sm">{type}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{desc}</p>
                  <div className="flex flex-wrap gap-1">
                    {examples.map(ex => (
                      <span
                        key={ex}
                        className="text-xs px-2 py-0.5 rounded-full bg-muted/40 text-muted-foreground"
                      >
                        {ex}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {tab === "apply" && (
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold">
              Partnership Application
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-muted-foreground">
                  Company Name *
                </label>
                <Input
                  placeholder="Acme Corp"
                  value={formData.company}
                  onChange={e =>
                    setFormData(p => ({ ...p, company: e.target.value }))
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Website</label>
                <Input
                  placeholder="https://acme.com"
                  value={formData.website}
                  onChange={e =>
                    setFormData(p => ({ ...p, website: e.target.value }))
                  }
                  className="mt-1"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-muted-foreground">
                  Partner Type
                </label>
                <select
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-muted border border-border/50 text-sm"
                  value={formData.type}
                  onChange={e =>
                    setFormData(p => ({ ...p, type: e.target.value }))
                  }
                >
                  {PARTNER_TYPES.map(t => (
                    <option key={t.type} value={t.type}>
                      {t.type}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">
                  Desired Tier
                </label>
                <select
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-muted border border-border/50 text-sm"
                  value={formData.tier}
                  onChange={e =>
                    setFormData(p => ({ ...p, tier: e.target.value }))
                  }
                >
                  {PARTNER_TIERS.map(t => (
                    <option key={t.tier} value={t.tier}>
                      {t.tier}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-muted-foreground">
                  Contact Email *
                </label>
                <Input
                  placeholder="partner@company.com"
                  value={formData.email}
                  onChange={e =>
                    setFormData(p => ({ ...p, email: e.target.value }))
                  }
                  className="mt-1"
                  type="email"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">
                  Expected Monthly Volume
                </label>
                <Input
                  placeholder="$50,000"
                  value={formData.volume}
                  onChange={e =>
                    setFormData(p => ({ ...p, volume: e.target.value }))
                  }
                  className="mt-1"
                />
              </div>
            </div>
            <div className="p-3 rounded-xl bg-blue-500/5 border border-blue-500/20 text-xs text-muted-foreground">
              <p>
                Applications are reviewed within 48 hours. For urgent inquiries
                contact{" "}
                <span className="text-blue-400">skylerblue4444@gmail.com</span>{" "}
                or call <span className="text-blue-400">479-406-7123</span>.
              </p>
            </div>
            <Button
              className="w-full bg-blue-600 text-white border-0 font-bold"
              onClick={submitApplication}
            >
              Submit Application
            </Button>
          </CardContent>
        </Card>
      )}

      {tab === "partners" && (
        <div className="space-y-3">
          {CURRENT_PARTNERS.map((partner, i) => (
            <Card key={partner.name} className="border-border/50">
              <CardContent className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                    <Building className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-sm">{partner.name}</p>
                      <Badge variant="outline" className="text-xs">
                        {partner.type}
                      </Badge>
                      <Badge className="text-xs bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
                        {partner.tier}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Volume: {partner.volume}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-green-400">
                      {partner.commission}
                    </p>
                    <p className="text-xs text-muted-foreground">commission</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "resources" && (
        <div className="space-y-3">
          {[
            { name: "Partner Onboarding Guide", type: "PDF", size: "2.4 MB" },
            { name: "API Documentation", type: "Docs", size: "Online" },
            { name: "Brand Assets & Logos", type: "ZIP", size: "48 MB" },
            { name: "Marketing Templates", type: "ZIP", size: "24 MB" },
            { name: "Commission Calculator", type: "Tool", size: "Online" },
            { name: "Partner Agreement Template", type: "PDF", size: "840 KB" },
          ].map((resource, i) => (
            <Card key={resource.name} className="border-border/50">
              <CardContent className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-muted/30 flex items-center justify-center shrink-0">
                    <Gift className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{resource.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {resource.type} · {resource.size}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 text-xs"
                    onClick={() =>
                      toast.success(`Downloading ${resource.name}`)
                    }
                  >
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
