import { useState } from "react";
import { motion } from "framer-motion";
import {
  Globe,
  Users,
  Shield,
  CheckCircle,
  XCircle,
  AlertTriangle,
  TrendingUp,
  MapPin,
  Zap,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const REGIONS = [
  {
    id: "us",
    name: "United States",
    flag: "🇺🇸",
    users: 188888,
    status: "full",
    revenue: "$4.4M/mo",
    features: [
      "All Features",
      "Crypto Trading",
      "NFT Marketplace",
      "ICO Access",
    ],
    compliance: "FinCEN Registered",
    color: "#22c55e",
  },
  {
    id: "cn",
    name: "China",
    flag: "🇨🇳",
    users: 444444,
    status: "restricted",
    revenue: "$8.8M/mo",
    features: ["Social Feed", "Messaging", "Mini Programs", "WeChat Pay"],
    compliance: "MIIT Registered, ICP License",
    color: "#f59e0b",
  },
  {
    id: "eu",
    name: "European Union",
    flag: "🇪🇺",
    users: 88888,
    status: "full",
    revenue: "$2.2M/mo",
    features: [
      "All Features",
      "GDPR Compliant",
      "MiCA Regulated",
      "SEPA Payments",
    ],
    compliance: "GDPR + MiCA Compliant",
    color: "#22c55e",
  },
  {
    id: "jp",
    name: "Japan",
    flag: "🇯🇵",
    users: 44444,
    status: "full",
    revenue: "$1.1M/mo",
    features: ["All Features", "JPY Pairs", "FSA Licensed"],
    compliance: "FSA Registered",
    color: "#22c55e",
  },
  {
    id: "ae",
    name: "UAE",
    flag: "🇦🇪",
    users: 22222,
    status: "full",
    revenue: "$888K/mo",
    features: ["All Features", "VARA Licensed", "AED Pairs"],
    compliance: "VARA Licensed",
    color: "#22c55e",
  },
  {
    id: "ru",
    name: "Russia",
    flag: "🇷🇺",
    users: 8888,
    status: "limited",
    revenue: "$44K/mo",
    features: ["Basic Social", "Messaging Only"],
    compliance: "Partial Compliance",
    color: "#ef4444",
  },
  {
    id: "in",
    name: "India",
    flag: "🇮🇳",
    users: 66666,
    status: "full",
    revenue: "$1.6M/mo",
    features: ["All Features", "UPI Payments", "INR Pairs"],
    compliance: "SEBI Registered",
    color: "#22c55e",
  },
  {
    id: "br",
    name: "Brazil",
    flag: "🇧🇷",
    users: 33333,
    status: "full",
    revenue: "$444K/mo",
    features: ["All Features", "PIX Payments", "BRL Pairs"],
    compliance: "CVM Registered",
    color: "#22c55e",
  },
  {
    id: "kr",
    name: "South Korea",
    flag: "🇰🇷",
    users: 28888,
    status: "full",
    revenue: "$666K/mo",
    features: ["All Features", "KRW Pairs", "FSC Licensed"],
    compliance: "FSC Licensed",
    color: "#22c55e",
  },
  {
    id: "ng",
    name: "Nigeria",
    flag: "🇳🇬",
    users: 44444,
    status: "full",
    revenue: "$222K/mo",
    features: ["All Features", "NGN Pairs", "P2P Trading"],
    compliance: "SEC Nigeria Registered",
    color: "#22c55e",
  },
];

const STATUS_CONFIG: Record<
  string,
  { label: string; color: string; bg: string; icon: typeof CheckCircle }
> = {
  full: {
    label: "Full Access",
    color: "text-green-400",
    bg: "bg-green-500/10 border-green-500/20",
    icon: CheckCircle,
  },
  restricted: {
    label: "Restricted",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10 border-yellow-500/20",
    icon: AlertTriangle,
  },
  limited: {
    label: "Limited",
    color: "text-red-400",
    bg: "bg-red-500/10 border-red-500/20",
    icon: XCircle,
  },
};

const GLOBAL_STATS = [
  {
    label: "Total Countries",
    value: "44",
    icon: Globe,
    color: "text-blue-400",
  },
  {
    label: "Global Users",
    value: "1.1M+",
    icon: Users,
    color: "text-green-400",
  },
  {
    label: "Compliant Markets",
    value: "38/44",
    icon: Shield,
    color: "text-purple-400",
  },
  {
    label: "Global Revenue",
    value: "$20M/mo",
    icon: TrendingUp,
    color: "text-yellow-400",
  },
];

export default function ShadowWorldMap() {
  const [selected, setSelected] = useState<string | null>(null);
  const [tab, setTab] = useState<"regions" | "compliance" | "expansion">(
    "regions"
  );

  const selectedRegion = REGIONS.find(r => r.id === selected);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Globe className="h-6 w-6 text-blue-400" />
            World Map
          </h1>
          <p className="text-sm text-muted-foreground">
            Global user distribution, compliance status, and regional features
          </p>
        </div>
        <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 font-bold">
          44 Countries
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {GLOBAL_STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
          >
            <Card className="border-border/50 text-center">
              <CardContent className="py-2.5 px-2">
                <s.icon className={`h-5 w-5 mx-auto mb-1 ${s.color}`} />
                <p className={`font-black text-sm ${s.color}`}>{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Visual World Map Placeholder */}
      <Card className="border-blue-500/20 bg-blue-900/5 overflow-hidden">
        <CardContent className="py-4 px-4">
          <p className="text-xs font-bold text-muted-foreground mb-3">
            GLOBAL PRESENCE — CLICK A REGION
          </p>
          <div className="grid grid-cols-5 gap-2">
            {REGIONS.map(region => (
              <button
                key={region.id}
                onClick={() =>
                  setSelected(region.id === selected ? null : region.id)
                }
                className={`p-2 rounded-xl border text-center transition-all ${selected === region.id ? "ring-2 ring-blue-400" : ""}`}
                style={{
                  borderColor: region.color + "40",
                  backgroundColor: region.color + "10",
                }}
              >
                <p className="text-2xl">{region.flag}</p>
                <p className="text-xs font-bold truncate">
                  {region.name.split(" ")[0]}
                </p>
                <p className="text-xs" style={{ color: region.color }}>
                  {(region.users / 1000).toFixed(0)}K
                </p>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedRegion && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="border-blue-500/20 bg-blue-900/5">
            <CardContent className="py-4 px-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{selectedRegion.flag}</span>
                  <div>
                    <p className="font-black text-lg">{selectedRegion.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {selectedRegion.users.toLocaleString()} users ·{" "}
                      {selectedRegion.revenue}
                    </p>
                  </div>
                </div>
                <Badge
                  className={`text-xs ${STATUS_CONFIG[selectedRegion.status].bg} ${STATUS_CONFIG[selectedRegion.status].color}`}
                >
                  {STATUS_CONFIG[selectedRegion.status].label}
                </Badge>
              </div>
              <div>
                <p className="text-xs font-bold text-muted-foreground mb-1">
                  AVAILABLE FEATURES
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedRegion.features.map(f => (
                    <Badge
                      key={f}
                      className="text-xs bg-muted text-muted-foreground"
                    >
                      {f}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-muted/50">
                <Shield className="h-4 w-4 text-green-400 shrink-0" />
                <p className="text-xs text-muted-foreground">
                  {selectedRegion.compliance}
                </p>
              </div>
              <Button
                size="sm"
                className="w-full h-8 text-xs bg-blue-600 text-white border-0 font-bold"
                onClick={() =>
                  toast.success(`Opening ${selectedRegion.name} admin panel...`)
                }
              >
                <MapPin className="h-3.5 w-3.5 mr-1" />
                Manage {selectedRegion.name} Region
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <div className="flex gap-2">
        {(["regions", "compliance", "expansion"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-blue-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "regions" && (
        <div className="space-y-2">
          {REGIONS.sort((a, b) => b.users - a.users).map((region, i) => {
            const StatusIcon = STATUS_CONFIG[region.status].icon;
            return (
              <motion.div
                key={region.id}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card
                  className="border-border/50 cursor-pointer hover:border-blue-500/20 transition-all"
                  onClick={() =>
                    setSelected(region.id === selected ? null : region.id)
                  }
                >
                  <CardContent className="py-2.5 px-4 flex items-center gap-3">
                    <span className="text-2xl shrink-0">{region.flag}</span>
                    <div className="flex-1">
                      <p className="font-bold text-sm">{region.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {region.users.toLocaleString()} users
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sm text-green-400">
                        {region.revenue}
                      </p>
                      <Badge
                        className={`text-xs ${STATUS_CONFIG[region.status].bg} ${STATUS_CONFIG[region.status].color}`}
                      >
                        {STATUS_CONFIG[region.status].label}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}

      {tab === "compliance" && (
        <div className="space-y-2">
          {REGIONS.map(region => (
            <Card key={region.id} className="border-border/50">
              <CardContent className="py-2.5 px-4 flex items-center gap-3">
                <span className="text-xl shrink-0">{region.flag}</span>
                <div className="flex-1">
                  <p className="font-bold text-sm">{region.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {region.compliance}
                  </p>
                </div>
                <Badge
                  className={`text-xs ${STATUS_CONFIG[region.status].bg} ${STATUS_CONFIG[region.status].color}`}
                >
                  {STATUS_CONFIG[region.status].label}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "expansion" && (
        <div className="space-y-2">
          <p className="text-xs font-bold text-muted-foreground">
            NEXT EXPANSION TARGETS
          </p>
          {[
            {
              country: "Indonesia",
              flag: "🇮🇩",
              potential: "270M users",
              priority: "High",
              cost: "500K SKY",
            },
            {
              country: "Pakistan",
              flag: "🇵🇰",
              potential: "220M users",
              priority: "High",
              cost: "400K SKY",
            },
            {
              country: "Mexico",
              flag: "🇲🇽",
              potential: "130M users",
              priority: "Medium",
              cost: "300K SKY",
            },
            {
              country: "Turkey",
              flag: "🇹🇷",
              potential: "85M users",
              priority: "Medium",
              cost: "250K SKY",
            },
            {
              country: "Vietnam",
              flag: "🇻🇳",
              potential: "97M users",
              priority: "High",
              cost: "350K SKY",
            },
          ].map(target => (
            <Card key={target.country} className="border-border/50">
              <CardContent className="py-2.5 px-4 flex items-center gap-3">
                <span className="text-2xl shrink-0">{target.flag}</span>
                <div className="flex-1">
                  <p className="font-bold text-sm">{target.country}</p>
                  <p className="text-xs text-muted-foreground">
                    Potential: {target.potential}
                  </p>
                </div>
                <div className="text-right">
                  <Badge
                    className={`text-xs mb-1 ${target.priority === "High" ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"}`}
                  >
                    {target.priority}
                  </Badge>
                  <p className="text-xs text-muted-foreground">{target.cost}</p>
                </div>
                <Button
                  size="sm"
                  className="h-8 text-xs bg-blue-600 text-white border-0 font-bold ml-2"
                  onClick={() =>
                    toast.success(`Launching expansion into ${target.country}!`)
                  }
                >
                  <Zap className="h-3.5 w-3.5" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
