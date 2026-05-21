import { useState } from "react";
import { motion } from "framer-motion";
import {
  Globe,
  Shield,
  Settings,
  Users,
  BarChart2,
  Flag,
  CheckCircle,
  AlertTriangle,
  Lock,
  Zap,
  Download,
  ChevronRight,
  Eye,
  Sliders,
  Database,
  Bell,
  FileText,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const GOVERNMENT_PORTALS = [
  {
    country: "China (PRC)",
    flag: "🇨🇳",
    tier: "Enterprise",
    users: "284M",
    revenue: "$28.4M/mo",
    status: "active",
    contact: "Ministry of Industry and IT",
    features: [
      "Real-name auth",
      "Content filtering",
      "Data localization",
      "e-CNY payments",
    ],
    customizations: {
      language: "Chinese (Simplified)",
      currency: "CNY / e-CNY",
      contentFilter: "Strict",
      dataRegion: "Beijing, Shanghai",
    },
  },
  {
    country: "United States",
    flag: "🇺🇸",
    tier: "Government",
    users: "84M",
    revenue: "$12.8M/mo",
    status: "active",
    contact: "Department of Commerce",
    features: [
      "FinCEN compliance",
      "OFAC screening",
      "SEC reporting",
      "Full crypto access",
    ],
    customizations: {
      language: "English",
      currency: "USD / All Crypto",
      contentFilter: "Standard",
      dataRegion: "AWS US-East",
    },
  },
  {
    country: "European Union",
    flag: "🇪🇺",
    tier: "Enterprise",
    users: "128M",
    revenue: "$18.4M/mo",
    status: "active",
    contact: "European Commission",
    features: [
      "GDPR compliance",
      "MiCA registration",
      "Data portability",
      "Cookie consent",
    ],
    customizations: {
      language: "Multi-language",
      currency: "EUR / Crypto",
      contentFilter: "GDPR",
      dataRegion: "Frankfurt, Dublin",
    },
  },
  {
    country: "United Arab Emirates",
    flag: "🇦🇪",
    tier: "Premium",
    users: "12M",
    revenue: "$4.4M/mo",
    status: "active",
    contact: "VARA / CBUAE",
    features: ["VARA license", "Arabic UI", "Halal finance", "Crypto trading"],
    customizations: {
      language: "Arabic / English",
      currency: "AED / Crypto",
      contentFilter: "TRA Guidelines",
      dataRegion: "Dubai",
    },
  },
];

const PLATFORM_CONTROLS = [
  {
    label: "Content Moderation Level",
    options: ["Off", "Light", "Standard", "Strict", "Government"],
    current: "Standard",
  },
  {
    label: "Crypto Features",
    options: ["Disabled", "View Only", "Trading", "Full DeFi"],
    current: "Full DeFi",
  },
  {
    label: "User Verification",
    options: ["None", "Email", "Phone", "KYC Basic", "KYC Advanced"],
    current: "KYC Basic",
  },
  {
    label: "Data Residency",
    options: ["Global", "Regional", "Country", "Government DC"],
    current: "Regional",
  },
  {
    label: "Payment Methods",
    options: ["Crypto Only", "Fiat Only", "Both", "CBDC + Crypto"],
    current: "Both",
  },
];

export default function ShadowGov() {
  const [activePortal, setActivePortal] = useState(GOVERNMENT_PORTALS[0]);
  const [tab, setTab] = useState<"portals" | "controls" | "analytics" | "api">(
    "portals"
  );
  const [controls, setControls] = useState(
    Object.fromEntries(PLATFORM_CONTROLS.map(c => [c.label, c.current]))
  );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Globe className="h-6 w-6 text-blue-400" />
            ShadowGov Portal
          </h1>
          <p className="text-sm text-muted-foreground">
            Government & enterprise platform customization center
          </p>
        </div>
        <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 font-bold">
          🔒 Restricted Access
        </Badge>
      </div>

      {/* Global Stats */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: "Gov Partners", value: "4", color: "text-blue-400" },
          { label: "Total Users", value: "508M", color: "text-green-400" },
          { label: "Monthly Revenue", value: "$64M", color: "text-yellow-400" },
          { label: "Compliance Score", value: "94%", color: "text-purple-400" },
        ].map(({ label, value, color }) => (
          <Card key={label} className="border-border/50">
            <CardContent className="pt-3 pb-3 text-center">
              <p className={`font-black text-xl ${color}`}>{value}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {(["portals", "controls", "analytics", "api"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-blue-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "portals" && (
        <div className="space-y-3">
          {GOVERNMENT_PORTALS.map((portal, i) => (
            <motion.div
              key={portal.country}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Card
                className={`border-border/50 cursor-pointer transition-all ${activePortal.country === portal.country ? "border-blue-500/30 bg-blue-500/3" : ""}`}
                onClick={() => setActivePortal(portal)}
              >
                <CardContent className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl shrink-0">{portal.flag}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-black text-sm">{portal.country}</p>
                        <Badge className="text-xs bg-blue-500/10 text-blue-400 border-blue-500/20">
                          {portal.tier}
                        </Badge>
                        <Badge className="text-xs bg-green-500/10 text-green-400 border-green-500/20">
                          ● Active
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {portal.contact}
                      </p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                        <span>👥 {portal.users} users</span>
                        <span>💰 {portal.revenue}</span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 text-xs shrink-0"
                      onClick={e => {
                        e.stopPropagation();
                        toast.info(`Managing ${portal.country} portal...`);
                      }}
                    >
                      <Settings className="h-3.5 w-3.5" />
                    </Button>
                  </div>

                  {activePortal.country === portal.country && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-3 pt-3 border-t border-border/30 space-y-2"
                    >
                      <p className="text-xs font-bold text-muted-foreground">
                        ACTIVE FEATURES
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {portal.features.map(f => (
                          <Badge key={f} variant="outline" className="text-xs">
                            {f}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-xs font-bold text-muted-foreground mt-2">
                        CUSTOMIZATIONS
                      </p>
                      <div className="grid grid-cols-2 gap-1.5">
                        {Object.entries(portal.customizations).map(
                          ([key, val]) => (
                            <div
                              key={key}
                              className="p-1.5 rounded-lg bg-muted/20 text-xs"
                            >
                              <p className="text-muted-foreground capitalize">
                                {key.replace(/([A-Z])/g, " $1")}
                              </p>
                              <p className="font-bold">{val}</p>
                            </div>
                          )
                        )}
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
          <Button
            variant="outline"
            className="w-full h-9 text-xs"
            onClick={() => toast.info("Opening government onboarding...")}
          >
            + Add Government Partner
          </Button>
        </div>
      )}

      {tab === "controls" && (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Global platform controls — changes apply to all regions unless
            overridden per country.
          </p>
          {PLATFORM_CONTROLS.map(control => (
            <Card key={control.label} className="border-border/50">
              <CardContent className="py-3 px-4">
                <p className="font-bold text-sm mb-2">{control.label}</p>
                <div className="flex gap-1.5 flex-wrap">
                  {control.options.map(opt => (
                    <button
                      key={opt}
                      onClick={() => {
                        setControls(prev => ({
                          ...prev,
                          [control.label]: opt,
                        }));
                        toast.success(`${control.label} set to ${opt}`);
                      }}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${controls[control.label] === opt ? "bg-blue-600 text-white" : "bg-muted text-muted-foreground"}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "analytics" && (
        <div className="space-y-3">
          {GOVERNMENT_PORTALS.map(portal => (
            <Card key={portal.country} className="border-border/50">
              <CardContent className="py-3 px-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{portal.flag}</span>
                  <p className="font-bold text-sm">{portal.country}</p>
                  <p className="ml-auto font-black text-sm text-green-400">
                    {portal.revenue}
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-1.5 rounded-lg bg-muted/20">
                    <p className="font-bold text-sm">{portal.users}</p>
                    <p className="text-xs text-muted-foreground">Users</p>
                  </div>
                  <div className="p-1.5 rounded-lg bg-muted/20">
                    <p className="font-bold text-sm text-green-400">
                      +{Math.floor(Math.random() * 20 + 5)}%
                    </p>
                    <p className="text-xs text-muted-foreground">Growth</p>
                  </div>
                  <div className="p-1.5 rounded-lg bg-muted/20">
                    <p className="font-bold text-sm">
                      {Math.floor(Math.random() * 30 + 70)}%
                    </p>
                    <p className="text-xs text-muted-foreground">Retention</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "api" && (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Government API access for regulatory reporting and data requests.
          </p>
          {[
            {
              name: "User Data Export API",
              endpoint: "/api/gov/users/export",
              method: "POST",
              auth: "OAuth2 + MFA",
            },
            {
              name: "Transaction Monitoring API",
              endpoint: "/api/gov/transactions",
              method: "GET",
              auth: "API Key + IP Whitelist",
            },
            {
              name: "Content Moderation API",
              endpoint: "/api/gov/moderation",
              method: "POST",
              auth: "OAuth2",
            },
            {
              name: "Compliance Report API",
              endpoint: "/api/gov/compliance/report",
              method: "GET",
              auth: "API Key",
            },
          ].map(api => (
            <Card key={api.name} className="border-border/50">
              <CardContent className="py-3 px-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-bold text-sm">{api.name}</p>
                    <p className="font-mono text-xs text-muted-foreground mt-0.5">
                      {api.method} {api.endpoint}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Auth: {api.auth}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 text-xs shrink-0"
                    onClick={() => toast.success("API docs opened!")}
                  >
                    Docs
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
