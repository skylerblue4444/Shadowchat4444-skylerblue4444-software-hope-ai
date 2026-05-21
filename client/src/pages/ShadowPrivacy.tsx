import { useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Eye,
  EyeOff,
  Lock,
  Globe,
  Database,
  Download,
  Trash2,
  CheckCircle,
  AlertTriangle,
  Key,
  UserX,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

type ToggleSetting = {
  id: string;
  label: string;
  desc: string;
  enabled: boolean;
  category: string;
};

const PRIVACY_SETTINGS: ToggleSetting[] = [
  {
    id: "profile_public",
    label: "Public Profile",
    desc: "Allow anyone to view your profile",
    enabled: true,
    category: "Profile",
  },
  {
    id: "show_portfolio",
    label: "Show Portfolio Value",
    desc: "Display your portfolio to followers",
    enabled: false,
    category: "Profile",
  },
  {
    id: "show_trades",
    label: "Show Trade History",
    desc: "Allow others to see your trading activity",
    enabled: false,
    category: "Trading",
  },
  {
    id: "copy_trading",
    label: "Allow Copy Trading",
    desc: "Let others automatically copy your trades",
    enabled: true,
    category: "Trading",
  },
  {
    id: "data_analytics",
    label: "Platform Analytics",
    desc: "Help improve ShadowChat with usage data",
    enabled: true,
    category: "Data",
  },
  {
    id: "personalized_ads",
    label: "Personalized Ads",
    desc: "Show ads based on your activity",
    enabled: false,
    category: "Data",
  },
  {
    id: "location_services",
    label: "Location Services",
    desc: "Use location for ShadowMaps and nearby events",
    enabled: false,
    category: "Location",
  },
  {
    id: "two_factor",
    label: "Two-Factor Auth",
    desc: "Require 2FA for all logins",
    enabled: true,
    category: "Security",
  },
  {
    id: "biometric",
    label: "Biometric Login",
    desc: "Use fingerprint or Face ID to log in",
    enabled: true,
    category: "Security",
  },
  {
    id: "session_alerts",
    label: "New Session Alerts",
    desc: "Get notified of new login sessions",
    enabled: true,
    category: "Security",
  },
];

const DATA_CATEGORIES = [
  {
    name: "Account Data",
    size: "2.4 MB",
    items: "Profile, settings, preferences",
  },
  {
    name: "Trading History",
    size: "8.1 MB",
    items: "All orders, trades, and positions",
  },
  { name: "Messages", size: "44.4 MB", items: "All chat messages and media" },
  {
    name: "Social Activity",
    size: "12.8 MB",
    items: "Posts, likes, comments, follows",
  },
  {
    name: "NFT & Wallet",
    size: "3.2 MB",
    items: "Wallet addresses, NFT metadata",
  },
];

export default function ShadowPrivacy() {
  const [settings, setSettings] = useState(PRIVACY_SETTINGS);
  const [tab, setTab] = useState<"controls" | "data" | "sessions" | "gdpr">(
    "controls"
  );
  const [filter, setFilter] = useState("All");

  const toggle = (id: string) => {
    setSettings(prev =>
      prev.map(s => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
    const setting = settings.find(s => s.id === id);
    toast.success(
      `${setting?.label} ${setting?.enabled ? "disabled" : "enabled"}`
    );
  };

  const categories = [
    "All",
    ...Array.from(new Set(settings.map(s => s.category))),
  ];
  const filtered =
    filter === "All" ? settings : settings.filter(s => s.category === filter);

  const SESSIONS = [
    {
      device: "Chrome · Windows 11",
      location: "Fort Smith, AR",
      time: "Active now",
      current: true,
    },
    {
      device: "Safari · iPhone 15",
      location: "Fort Smith, AR",
      time: "2 hours ago",
      current: false,
    },
    {
      device: "ShadowChat App · Android",
      location: "Fayetteville, AR",
      time: "Yesterday",
      current: false,
    },
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Shield className="h-6 w-6 text-emerald-400" />
            Privacy Center
          </h1>
          <p className="text-sm text-muted-foreground">
            Control your data, privacy, and security settings
          </p>
        </div>
        <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 font-bold">
          🔒 Secure
        </Badge>
      </div>

      {/* Privacy Score */}
      <Card className="border-emerald-500/20 bg-emerald-900/5">
        <CardContent className="py-4 px-4 flex items-center gap-4">
          <div className="h-16 w-16 rounded-full border-4 border-emerald-500 flex items-center justify-center shrink-0">
            <p className="font-black text-lg text-emerald-400">84</p>
          </div>
          <div className="flex-1">
            <p className="font-black text-sm">Privacy Score: Good</p>
            <p className="text-xs text-muted-foreground mb-2">
              Enable 2FA and disable personalized ads to reach 100
            </p>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-emerald-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "84%" }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-2">
        {(["controls", "data", "sessions", "gdpr"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-emerald-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t === "gdpr" ? "GDPR" : t}
          </button>
        ))}
      </div>

      {tab === "controls" && (
        <div className="space-y-3">
          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${filter === c ? "bg-emerald-600 text-white" : "bg-muted text-muted-foreground"}`}
              >
                {c}
              </button>
            ))}
          </div>
          {filtered.map((setting, i) => (
            <motion.div
              key={setting.id}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <Card className="border-border/50">
                <CardContent className="py-3 px-4 flex items-center gap-3">
                  <div className="flex-1">
                    <p className="font-bold text-sm">{setting.label}</p>
                    <p className="text-xs text-muted-foreground">
                      {setting.desc}
                    </p>
                    <Badge className="text-xs bg-muted text-muted-foreground mt-0.5">
                      {setting.category}
                    </Badge>
                  </div>
                  <button
                    onClick={() => toggle(setting.id)}
                    className={`relative h-6 w-11 rounded-full transition-colors shrink-0 ${setting.enabled ? "bg-emerald-500" : "bg-muted"}`}
                  >
                    <motion.div
                      className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow"
                      animate={{
                        left: setting.enabled ? "calc(100% - 22px)" : "2px",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  </button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "data" && (
        <div className="space-y-3">
          <div className="space-y-2">
            {DATA_CATEGORIES.map(cat => (
              <Card key={cat.name} className="border-border/50">
                <CardContent className="py-3 px-4 flex items-center gap-3">
                  <Database className="h-5 w-5 text-emerald-400 shrink-0" />
                  <div className="flex-1">
                    <p className="font-bold text-sm">{cat.name}</p>
                    <p className="text-xs text-muted-foreground">{cat.items}</p>
                  </div>
                  <p className="text-xs font-bold text-muted-foreground shrink-0">
                    {cat.size}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button
              className="h-10 text-xs bg-emerald-600 text-white border-0 font-bold"
              onClick={() =>
                toast.success(
                  "📦 Preparing data export... You'll receive an email when ready."
                )
              }
            >
              <Download className="h-4 w-4 mr-1" />
              Export My Data
            </Button>
            <Button
              variant="outline"
              className="h-10 text-xs border-red-500/20 text-red-400 font-bold"
              onClick={() =>
                toast.error(
                  "⚠️ Account deletion requires email confirmation. Check your inbox."
                )
              }
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Delete Account
            </Button>
          </div>
        </div>
      )}

      {tab === "sessions" && (
        <div className="space-y-2">
          {SESSIONS.map((session, i) => (
            <Card
              key={i}
              className={`border ${session.current ? "border-emerald-500/20 bg-emerald-900/5" : "border-border/50"}`}
            >
              <CardContent className="py-3 px-4 flex items-center gap-3">
                <div
                  className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 ${session.current ? "bg-emerald-500/10" : "bg-muted"}`}
                >
                  {session.current ? (
                    <CheckCircle className="h-5 w-5 text-emerald-400" />
                  ) : (
                    <Globe className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm">{session.device}</p>
                  <p className="text-xs text-muted-foreground">
                    {session.location} · {session.time}
                  </p>
                </div>
                {session.current ? (
                  <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-xs">
                    Current
                  </Badge>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 text-xs border-red-500/20 text-red-400"
                    onClick={() => toast.success("Session terminated")}
                  >
                    <UserX className="h-3.5 w-3.5 mr-1" />
                    End
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
          <Button
            className="w-full h-10 text-xs border-red-500/20 text-red-400 font-bold"
            variant="outline"
            onClick={() => toast.success("All other sessions terminated")}
          >
            <UserX className="h-4 w-4 mr-2" />
            End All Other Sessions
          </Button>
        </div>
      )}

      {tab === "gdpr" && (
        <div className="space-y-3">
          <Card className="border-blue-500/20 bg-blue-900/5">
            <CardContent className="py-3 px-4">
              <p className="font-bold text-sm mb-1">Your GDPR Rights</p>
              <p className="text-xs text-muted-foreground">
                As an EU resident, you have the following rights under GDPR:
              </p>
            </CardContent>
          </Card>
          {[
            {
              right: "Right to Access",
              desc: "Request a copy of all personal data we hold about you",
              action: "Request Data",
              icon: Eye,
            },
            {
              right: "Right to Rectification",
              desc: "Correct inaccurate personal data in your account",
              action: "Edit Profile",
              icon: Key,
            },
            {
              right: "Right to Erasure",
              desc: "Request deletion of your personal data (Right to be Forgotten)",
              action: "Request Deletion",
              icon: Trash2,
            },
            {
              right: "Right to Portability",
              desc: "Export your data in a machine-readable format",
              action: "Export Data",
              icon: Download,
            },
            {
              right: "Right to Object",
              desc: "Object to processing of your data for direct marketing",
              action: "Opt Out",
              icon: EyeOff,
            },
          ].map(item => (
            <Card key={item.right} className="border-border/50">
              <CardContent className="py-3 px-4 flex items-center gap-3">
                <item.icon className="h-5 w-5 text-blue-400 shrink-0" />
                <div className="flex-1">
                  <p className="font-bold text-sm">{item.right}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 text-xs shrink-0"
                  onClick={() => toast.info(`Processing: ${item.right}`)}
                >
                  {item.action}
                </Button>
              </CardContent>
            </Card>
          ))}
          <p className="text-xs text-muted-foreground text-center">
            For privacy inquiries: skylerblue4444@gmail.com · 479-406-7123
          </p>
        </div>
      )}
    </div>
  );
}
