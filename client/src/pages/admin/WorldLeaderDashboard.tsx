import { useState } from "react";
import { motion } from "framer-motion";
import {
  Crown,
  Globe,
  Palette,
  Settings,
  Shield,
  Users,
  Flag,
  Edit,
  Save,
  Eye,
  RefreshCw,
  Download,
  Upload,
  Check,
  ChevronRight,
  Star,
  Zap,
  Lock,
  Building,
  Map,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const WORLD_REGIONS = [
  {
    code: "US",
    name: "United States",
    flag: "🇺🇸",
    leader: "Federal Administration",
    theme: "blue-red",
    users: 89420,
    active: true,
  },
  {
    code: "CN",
    name: "China",
    flag: "🇨🇳",
    leader: "State Council",
    theme: "red-gold",
    users: 72180,
    active: true,
  },
  {
    code: "EU",
    name: "European Union",
    flag: "🇪🇺",
    leader: "European Commission",
    theme: "blue-gold",
    users: 54320,
    active: true,
  },
  {
    code: "IN",
    name: "India",
    flag: "🇮🇳",
    leader: "Government of India",
    theme: "orange-green",
    users: 28940,
    active: true,
  },
  {
    code: "AE",
    name: "UAE",
    flag: "🇦🇪",
    leader: "UAE Federal Government",
    theme: "green-red",
    users: 18200,
    active: true,
  },
  {
    code: "JP",
    name: "Japan",
    flag: "🇯🇵",
    leader: "Cabinet Office",
    theme: "red-white",
    users: 14320,
    active: false,
  },
  {
    code: "BR",
    name: "Brazil",
    flag: "🇧🇷",
    leader: "Federal Government",
    theme: "green-yellow",
    users: 12100,
    active: false,
  },
  {
    code: "KR",
    name: "South Korea",
    flag: "🇰🇷",
    leader: "Government of Korea",
    theme: "blue-red",
    users: 9800,
    active: false,
  },
];

const THEME_PRESETS = [
  {
    name: "Midnight Blue",
    primary: "#1e40af",
    secondary: "#3b82f6",
    bg: "#0f172a",
  },
  {
    name: "Royal Gold",
    primary: "#d97706",
    secondary: "#f59e0b",
    bg: "#1c1917",
  },
  {
    name: "Dragon Red",
    primary: "#dc2626",
    secondary: "#ef4444",
    bg: "#1a0a0a",
  },
  { name: "Emerald", primary: "#059669", secondary: "#10b981", bg: "#0a1a12" },
  {
    name: "Imperial Purple",
    primary: "#7c3aed",
    secondary: "#8b5cf6",
    bg: "#0f0a1a",
  },
  {
    name: "Arctic White",
    primary: "#0ea5e9",
    secondary: "#38bdf8",
    bg: "#0c1a2e",
  },
];

const CUSTOMIZATION_MODULES = [
  {
    id: "branding",
    label: "Logo & Branding",
    icon: Star,
    desc: "Custom logo, app name, splash screen",
  },
  {
    id: "colors",
    label: "Color Theme",
    icon: Palette,
    desc: "Primary, secondary, background colors",
  },
  {
    id: "language",
    label: "Language & Locale",
    icon: Globe,
    desc: "Default language, currency, date format",
  },
  {
    id: "content",
    label: "Content Rules",
    icon: Shield,
    desc: "Allowed categories, age restrictions",
  },
  {
    id: "features",
    label: "Feature Toggles",
    icon: Zap,
    desc: "Enable/disable platform features",
  },
  {
    id: "compliance",
    label: "Compliance Layer",
    icon: Lock,
    desc: "Regional laws, KYC requirements",
  },
];

const FEATURE_TOGGLES = [
  { id: "trading", label: "Crypto Trading", enabled: true, restricted: ["CN"] },
  { id: "nft", label: "NFT Marketplace", enabled: true, restricted: [] },
  {
    id: "dao",
    label: "DAO Governance",
    enabled: true,
    restricted: ["CN", "AE"],
  },
  { id: "social", label: "Social Feed", enabled: true, restricted: [] },
  { id: "livestream", label: "Live Streaming", enabled: true, restricted: [] },
  {
    id: "gambling",
    label: "Charity Gaming",
    enabled: true,
    restricted: ["AE"],
  },
  {
    id: "messaging",
    label: "Encrypted Messaging",
    enabled: true,
    restricted: ["CN"],
  },
  {
    id: "vpn",
    label: "VPN Promotion",
    enabled: false,
    restricted: ["CN", "RU", "AE"],
  },
];

export default function WorldLeaderDashboard() {
  const [selectedRegion, setSelectedRegion] = useState(WORLD_REGIONS[0]);
  const [selectedTheme, setSelectedTheme] = useState(THEME_PRESETS[0]);
  const [features, setFeatures] = useState(FEATURE_TOGGLES);
  const [appName, setAppName] = useState("ShadowChat");
  const [tagline, setTagline] = useState(
    "The Future of Decentralized Communication"
  );

  const toggleFeature = (id: string) => {
    setFeatures(prev =>
      prev.map(f => (f.id === id ? { ...f, enabled: !f.enabled } : f))
    );
    const feat = features.find(f => f.id === id);
    toast.success(
      `${feat?.label} ${feat?.enabled ? "disabled" : "enabled"} for ${selectedRegion.name}`
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Crown className="h-6 w-6 text-yellow-400" />
            World Leader Customization
          </h1>
          <p className="text-sm text-muted-foreground">
            White-label controls, regional branding, and per-country feature
            management
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => toast.success("Configuration exported")}
          >
            <Download className="h-3.5 w-3.5 mr-1.5" />
            Export Config
          </Button>
          <Button
            size="sm"
            className="bg-yellow-500 text-black border-0 font-bold"
            onClick={() =>
              toast.success("Changes deployed to " + selectedRegion.name)
            }
          >
            <Save className="h-3.5 w-3.5 mr-1.5" />
            Deploy Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Region Selector */}
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <Map className="h-4 w-4 text-blue-400" />
              Regions
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/30">
              {WORLD_REGIONS.map(region => (
                <button
                  key={region.code}
                  onClick={() => setSelectedRegion(region)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-muted/30 transition-colors text-left ${selectedRegion.code === region.code ? "bg-muted/40" : ""}`}
                >
                  <span className="text-lg">{region.flag}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{region.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {region.users.toLocaleString()} users
                    </p>
                  </div>
                  <div
                    className={`h-2 w-2 rounded-full ${region.active ? "bg-green-400" : "bg-muted-foreground"}`}
                  />
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Customization Panel */}
        <div className="lg:col-span-3 space-y-4">
          {/* Region Header */}
          <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-yellow-950/30 to-orange-950/30 border border-yellow-500/20">
            <span className="text-4xl">{selectedRegion.flag}</span>
            <div>
              <h2 className="font-black text-lg">{selectedRegion.name}</h2>
              <p className="text-sm text-muted-foreground">
                {selectedRegion.leader}
              </p>
            </div>
            <Badge
              className={`ml-auto ${selectedRegion.active ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-muted text-muted-foreground"}`}
            >
              {selectedRegion.active ? "Active" : "Inactive"}
            </Badge>
          </div>

          {/* App Branding */}
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-400" />
                App Branding for {selectedRegion.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">
                    App Name
                  </label>
                  <Input
                    value={appName}
                    onChange={e => setAppName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">
                    Tagline
                  </label>
                  <Input
                    value={tagline}
                    onChange={e => setTagline(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-2 block">
                  Color Theme
                </label>
                <div className="flex flex-wrap gap-2">
                  {THEME_PRESETS.map(theme => (
                    <button
                      key={theme.name}
                      onClick={() => {
                        setSelectedTheme(theme);
                        toast.success(`Theme: ${theme.name}`);
                      }}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${selectedTheme.name === theme.name ? "border-white/40 bg-white/10" : "border-border/30 hover:border-border/60"}`}
                    >
                      <div className="flex gap-0.5">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: theme.primary }}
                        />
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: theme.secondary }}
                        />
                      </div>
                      {theme.name}
                      {selectedTheme.name === theme.name && (
                        <Check className="h-3 w-3 text-green-400" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feature Toggles */}
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <Zap className="h-4 w-4 text-cyan-400" />
                Feature Toggles — {selectedRegion.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {features.map(feat => {
                  const isRestricted = feat.restricted.includes(
                    selectedRegion.code
                  );
                  return (
                    <div
                      key={feat.id}
                      className={`flex items-center gap-3 p-3 rounded-xl border transition-colors ${isRestricted ? "border-red-500/20 bg-red-500/5" : "border-border/30 bg-muted/20"}`}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium">{feat.label}</p>
                          {isRestricted && (
                            <Badge className="text-xs bg-red-500/10 text-red-400 border-red-500/20">
                              Restricted
                            </Badge>
                          )}
                        </div>
                        {isRestricted && (
                          <p className="text-xs text-red-400/70 mt-0.5">
                            Blocked in {selectedRegion.name} by regulation
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => !isRestricted && toggleFeature(feat.id)}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${isRestricted ? "opacity-40 cursor-not-allowed" : "cursor-pointer"} ${feat.enabled && !isRestricted ? "bg-green-500" : "bg-muted"}`}
                      >
                        <span
                          className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${feat.enabled && !isRestricted ? "translate-x-4" : "translate-x-1"}`}
                        />
                      </button>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Customization Modules */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {CUSTOMIZATION_MODULES.map(mod => (
              <Card
                key={mod.id}
                className="border-border/50 hover:border-yellow-500/30 cursor-pointer transition-colors"
                onClick={() => toast.info(`Opening ${mod.label} editor`)}
              >
                <CardContent className="pt-4">
                  <mod.icon className="h-6 w-6 text-yellow-400 mb-2" />
                  <p className="font-bold text-sm">{mod.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {mod.desc}
                  </p>
                  <div className="flex items-center gap-1 mt-2 text-xs text-yellow-400">
                    Edit <ChevronRight className="h-3 w-3" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
