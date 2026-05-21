import { useState } from "react";
import { motion } from "framer-motion";
import {
  Globe,
  Shield,
  Flag,
  Lock,
  Unlock,
  AlertTriangle,
  CheckCircle,
  Settings,
  Filter,
  Eye,
  EyeOff,
  Map,
  FileText,
  Zap,
  ChevronRight,
  Plus,
  Trash2,
  Edit,
  Save,
  RefreshCw,
  Building,
  Users,
  Ban,
  Clock,
  Database,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const REGIONS = [
  {
    code: "CN",
    name: "China (PRC)",
    flag: "🇨🇳",
    status: "restricted",
    rules: [
      "No VPN promotion",
      "No political content",
      "ICP license required",
      "Real-name verification mandatory",
      "Content pre-approval for news",
      "No crypto trading (read-only mode)",
      "Alibaba CDN routing required",
    ],
    activeUsers: 72180,
    complianceScore: 94,
    contacts: ["MIIT Compliance", "Cyberspace Administration of China (CAC)"],
  },
  {
    code: "US",
    name: "United States",
    flag: "🇺🇸",
    status: "open",
    rules: [
      "FINRA compliance for trading",
      "KYC/AML required for $10K+ transactions",
      "COPPA compliance (no users under 13)",
      "GDPR-equivalent (CCPA) for CA users",
    ],
    activeUsers: 89420,
    complianceScore: 98,
    contacts: ["SEC", "FinCEN", "FTC"],
  },
  {
    code: "EU",
    name: "European Union",
    flag: "🇪🇺",
    status: "restricted",
    rules: [
      "GDPR full compliance",
      "Right to erasure enforced",
      "Cookie consent required",
      "Data residency in EU",
      "MiCA crypto regulations",
      "No anonymous wallets >€1000",
    ],
    activeUsers: 54320,
    complianceScore: 91,
    contacts: ["EDPB", "EBA", "ESMA"],
  },
  {
    code: "RU",
    name: "Russia",
    flag: "🇷🇺",
    status: "blocked",
    rules: [
      "Platform access blocked per OFAC sanctions",
      "No financial transactions",
      "Emergency contact only",
    ],
    activeUsers: 0,
    complianceScore: 100,
    contacts: ["OFAC", "Treasury Department"],
  },
  {
    code: "IN",
    name: "India",
    flag: "🇮🇳",
    status: "open",
    rules: [
      "IT Act 2000 compliance",
      "RBI crypto guidelines",
      "GST on digital services",
      "Local data storage for user data",
    ],
    activeUsers: 28940,
    complianceScore: 87,
    contacts: ["MEITY", "RBI", "SEBI"],
  },
  {
    code: "AE",
    name: "UAE / Middle East",
    flag: "🇦🇪",
    status: "open",
    rules: [
      "VARA crypto license required",
      "Arabic language support",
      "No alcohol/gambling content",
      "Halal finance options",
    ],
    activeUsers: 18200,
    complianceScore: 89,
    contacts: ["VARA", "CBUAE", "SCA"],
  },
];

const CONTENT_FILTERS = [
  {
    id: "cf1",
    name: "Political Content Filter",
    regions: ["CN", "AE"],
    enabled: true,
    hits24h: 1243,
  },
  {
    id: "cf2",
    name: "Crypto Trading Block (CN)",
    regions: ["CN"],
    enabled: true,
    hits24h: 8921,
  },
  {
    id: "cf3",
    name: "Adult Content Filter",
    regions: ["CN", "AE", "IN"],
    enabled: true,
    hits24h: 432,
  },
  {
    id: "cf4",
    name: "VPN Detection",
    regions: ["CN"],
    enabled: true,
    hits24h: 3241,
  },
  {
    id: "cf5",
    name: "Sanctions Screening (OFAC)",
    regions: ["RU", "KP", "IR"],
    enabled: true,
    hits24h: 89,
  },
  {
    id: "cf6",
    name: "GDPR Data Erasure Queue",
    regions: ["EU"],
    enabled: true,
    hits24h: 23,
  },
  {
    id: "cf7",
    name: "Real-Name Verification Gate",
    regions: ["CN"],
    enabled: true,
    hits24h: 2109,
  },
  {
    id: "cf8",
    name: "Gambling Content Block",
    regions: ["AE", "IN"],
    enabled: false,
    hits24h: 0,
  },
];

const STATUS_COLORS: Record<string, string> = {
  open: "bg-green-500/10 text-green-400 border-green-500/20",
  restricted: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  blocked: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function AdminCompliance() {
  const [filters, setFilters] = useState(CONTENT_FILTERS);
  const [selectedRegion, setSelectedRegion] = useState(REGIONS[0]);

  const toggleFilter = (id: string) => {
    setFilters(prev =>
      prev.map(f => (f.id === id ? { ...f, enabled: !f.enabled } : f))
    );
    const filter = filters.find(f => f.id === id);
    toast.success(
      `${filter?.name} ${filter?.enabled ? "disabled" : "enabled"}`
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black flex items-center gap-2">
          <Globe className="h-6 w-6 text-blue-400" />
          Government Compliance & Regional Controls
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage content rules, geo-restrictions, and regulatory compliance per
          region
        </p>
      </div>

      {/* Compliance Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          {
            label: "Regions Covered",
            value: "47",
            icon: Globe,
            color: "text-blue-400",
          },
          {
            label: "Active Filters",
            value: filters.filter(f => f.enabled).length.toString(),
            icon: Filter,
            color: "text-green-400",
          },
          {
            label: "Blocks Today",
            value: "16,258",
            icon: Shield,
            color: "text-red-400",
          },
          {
            label: "Avg Compliance",
            value: "93.2%",
            icon: CheckCircle,
            color: "text-yellow-400",
          },
        ].map(({ label, value, icon: Icon, color }) => (
          <Card key={label} className="border-border/50">
            <CardContent className="pt-4 pb-3">
              <div className="flex items-center gap-2 mb-1">
                <Icon className={`h-4 w-4 ${color}`} />
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
              <p className="text-2xl font-black">{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Region Grid + Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Region List */}
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold">Regions</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/30">
              {REGIONS.map(region => (
                <button
                  key={region.code}
                  onClick={() => setSelectedRegion(region)}
                  className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/30 transition-colors text-left ${selectedRegion.code === region.code ? "bg-muted/40" : ""}`}
                >
                  <span className="text-xl">{region.flag}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{region.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {region.activeUsers.toLocaleString()} users
                    </p>
                  </div>
                  <Badge
                    className={`text-xs capitalize ${STATUS_COLORS[region.status]}`}
                  >
                    {region.status}
                  </Badge>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Region Detail */}
        <Card className="lg:col-span-2 border-border/50">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <span className="text-xl">{selectedRegion.flag}</span>
                {selectedRegion.name} — Compliance Rules
              </CardTitle>
              <div className="flex gap-2">
                <Badge
                  className={`text-xs capitalize ${STATUS_COLORS[selectedRegion.status]}`}
                >
                  {selectedRegion.status}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  Score:{" "}
                  <span className="text-green-400 font-bold">
                    {selectedRegion.complianceScore}%
                  </span>
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Active Rules
              </p>
              <div className="space-y-2">
                {selectedRegion.rules.map((rule, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 p-2.5 rounded-lg bg-muted/30 border border-border/30"
                  >
                    <CheckCircle className="h-3.5 w-3.5 text-green-400 shrink-0" />
                    <span className="text-sm">{rule}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Regulatory Contacts
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedRegion.contacts.map(contact => (
                  <Badge key={contact} variant="outline" className="text-xs">
                    {contact}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                className="bg-blue-600 text-white border-0"
                onClick={() => toast.info("Opening rule editor")}
              >
                <Edit className="h-3.5 w-3.5 mr-1.5" />
                Edit Rules
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => toast.success("Compliance report generated")}
              >
                <FileText className="h-3.5 w-3.5 mr-1.5" />
                Generate Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Filters */}
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <Filter className="h-4 w-4 text-purple-400" />
              Content Filters
            </CardTitle>
            <Button
              size="sm"
              className="h-7 text-xs bg-purple-600 text-white border-0"
              onClick={() => toast.info("Add filter modal")}
            >
              <Plus className="h-3.5 w-3.5 mr-1" />
              Add Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {filters.map(filter => (
              <div
                key={filter.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-muted/20 border border-border/30"
              >
                <div
                  className={`h-2 w-2 rounded-full shrink-0 ${filter.enabled ? "bg-green-400" : "bg-muted-foreground"}`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{filter.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    {filter.regions.map(r => (
                      <Badge
                        key={r}
                        variant="outline"
                        className="text-xs h-4 px-1"
                      >
                        {r}
                      </Badge>
                    ))}
                    <span className="text-xs text-muted-foreground">
                      {filter.hits24h.toLocaleString()} hits today
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => toggleFilter(filter.id)}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${filter.enabled ? "bg-green-500" : "bg-muted"}`}
                >
                  <span
                    className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${filter.enabled ? "translate-x-4" : "translate-x-1"}`}
                  />
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* China-Specific Controls */}
      <Card className="border-red-500/20 bg-gradient-to-r from-red-950/10 to-orange-950/10">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            🇨🇳 China-Specific Controls (MIIT / CAC Compliance)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              {
                label: "ICP License",
                value: "ICP备2024XXXXXX号",
                status: "active",
              },
              {
                label: "Real-Name Verification",
                value: "Enabled (WeChat/Alipay)",
                status: "active",
              },
              {
                label: "Content Pre-Review",
                value: "AI + Human Review",
                status: "active",
              },
              {
                label: "Data Localization",
                value: "Alibaba Cloud CN-North",
                status: "active",
              },
              {
                label: "CDN Provider",
                value: "Alibaba Cloud CDN",
                status: "active",
              },
              {
                label: "Crypto Mode",
                value: "Read-Only (No Trading)",
                status: "restricted",
              },
            ].map(item => (
              <div
                key={item.label}
                className="p-3 rounded-xl bg-muted/20 border border-border/30"
              >
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="text-sm font-medium mt-0.5">{item.value}</p>
                <Badge
                  className={`text-xs mt-1 ${item.status === "active" ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"}`}
                >
                  {item.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
