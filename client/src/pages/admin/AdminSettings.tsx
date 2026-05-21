import { useState } from "react";
import {
  Settings,
  Key,
  Bell,
  Shield,
  Globe,
  Database,
  Zap,
  Save,
  RefreshCw,
  Eye,
  EyeOff,
  Copy,
  CheckCircle,
  Plus,
  Trash2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const API_KEYS = [
  {
    name: "Stripe Production",
    key: "sk_live_••••••••••••••••••••••••",
    scope: "payments",
    created: "2024-01-15",
    active: true,
  },
  {
    name: "Coinbase Commerce",
    key: "cc_••••••••••••••••••••••••••••",
    scope: "crypto-payments",
    created: "2024-02-01",
    active: true,
  },
  {
    name: "OpenAI GPT-4",
    key: "sk-••••••••••••••••••••••••••••••••",
    scope: "ai-copilot",
    created: "2024-02-14",
    active: true,
  },
  {
    name: "Alibaba Cloud CDN",
    key: "LTAI5t••••••••••••••••••••••••",
    scope: "china-cdn",
    created: "2024-03-01",
    active: true,
  },
  {
    name: "SendGrid Email",
    key: "SG.••••••••••••••••••••••••••••••",
    scope: "email",
    created: "2024-03-10",
    active: false,
  },
];

const PLATFORM_SETTINGS = [
  {
    key: "maintenance_mode",
    label: "Maintenance Mode",
    desc: "Take platform offline for updates",
    value: false,
    type: "toggle",
  },
  {
    key: "new_registrations",
    label: "New Registrations",
    desc: "Allow new user sign-ups",
    value: true,
    type: "toggle",
  },
  {
    key: "trading_enabled",
    label: "Trading Enabled",
    desc: "Allow crypto trading globally",
    value: true,
    type: "toggle",
  },
  {
    key: "nft_minting",
    label: "NFT Minting",
    desc: "Allow users to mint new NFTs",
    value: true,
    type: "toggle",
  },
  {
    key: "dao_voting",
    label: "DAO Voting",
    desc: "Enable governance voting",
    value: true,
    type: "toggle",
  },
  {
    key: "kyc_required",
    label: "KYC Required",
    desc: "Require KYC for trading >$1000",
    value: true,
    type: "toggle",
  },
  {
    key: "china_mode",
    label: "China Compliance Mode",
    desc: "Enable MIIT/CAC compliance layer",
    value: true,
    type: "toggle",
  },
  {
    key: "ai_moderation",
    label: "AI Content Moderation",
    desc: "Auto-flag content with AI",
    value: true,
    type: "toggle",
  },
];

export default function AdminSettings() {
  const [settings, setSettings] = useState(PLATFORM_SETTINGS);
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const [platformName, setPlatformName] = useState("ShadowChat");
  const [supportEmail, setSupportEmail] = useState("skylerblue4444@gmail.com");
  const [supportPhone, setSupportPhone] = useState("479-406-7123");

  const toggleSetting = (key: string) => {
    setSettings(prev =>
      prev.map(s => (s.key === key ? { ...s, value: !s.value } : s))
    );
    const setting = settings.find(s => s.key === key);
    toast.success(
      `${setting?.label} ${setting?.value ? "disabled" : "enabled"}`
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black flex items-center gap-2">
          <Settings className="h-6 w-6 text-gray-400" />
          Admin Settings
        </h1>
        <p className="text-sm text-muted-foreground">
          Platform configuration, API keys, and system controls
        </p>
      </div>

      {/* Platform Info */}
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <Globe className="h-4 w-4 text-blue-400" />
            Platform Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">
                Platform Name
              </label>
              <Input
                value={platformName}
                onChange={e => setPlatformName(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">
                Support Email
              </label>
              <Input
                value={supportEmail}
                onChange={e => setSupportEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">
                Support Phone
              </label>
              <Input
                value={supportPhone}
                onChange={e => setSupportPhone(e.target.value)}
              />
            </div>
          </div>
          <Button
            className="bg-blue-600 text-white border-0"
            onClick={() => toast.success("Platform settings saved")}
          >
            <Save className="h-3.5 w-3.5 mr-1.5" />
            Save Changes
          </Button>
        </CardContent>
      </Card>

      {/* Feature Toggles */}
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <Zap className="h-4 w-4 text-yellow-400" />
            Platform Feature Toggles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {settings.map(setting => (
              <div
                key={setting.key}
                className="flex items-center gap-3 p-3 rounded-xl bg-muted/20 border border-border/30"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium">{setting.label}</p>
                  <p className="text-xs text-muted-foreground">
                    {setting.desc}
                  </p>
                </div>
                <button
                  onClick={() => toggleSetting(setting.key)}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${setting.value ? "bg-green-500" : "bg-muted"}`}
                >
                  <span
                    className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${setting.value ? "translate-x-4" : "translate-x-1"}`}
                  />
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* API Keys */}
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <Key className="h-4 w-4 text-yellow-400" />
              API Keys
            </CardTitle>
            <Button
              size="sm"
              className="h-7 text-xs bg-yellow-500 text-black border-0"
              onClick={() => toast.info("Add API key modal")}
            >
              <Plus className="h-3.5 w-3.5 mr-1" />
              Add Key
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {API_KEYS.map(apiKey => (
              <div
                key={apiKey.name}
                className="flex items-center gap-3 p-3 rounded-xl bg-muted/20 border border-border/30"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-medium">{apiKey.name}</p>
                    <Badge variant="outline" className="text-xs">
                      {apiKey.scope}
                    </Badge>
                    <Badge
                      className={`text-xs ${apiKey.active ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-muted text-muted-foreground"}`}
                    >
                      {apiKey.active ? "active" : "inactive"}
                    </Badge>
                  </div>
                  <p className="text-xs font-mono text-muted-foreground">
                    {showKeys[apiKey.name]
                      ? apiKey.key.replace(/•/g, "x")
                      : apiKey.key}
                  </p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button
                    className="h-7 w-7 rounded flex items-center justify-center text-muted-foreground hover:text-blue-400 hover:bg-blue-500/10 transition-colors"
                    onClick={() =>
                      setShowKeys(prev => ({
                        ...prev,
                        [apiKey.name]: !prev[apiKey.name],
                      }))
                    }
                  >
                    {showKeys[apiKey.name] ? (
                      <EyeOff className="h-3.5 w-3.5" />
                    ) : (
                      <Eye className="h-3.5 w-3.5" />
                    )}
                  </button>
                  <button
                    className="h-7 w-7 rounded flex items-center justify-center text-muted-foreground hover:text-green-400 hover:bg-green-500/10 transition-colors"
                    onClick={() => toast.success("Key copied!")}
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </button>
                  <button
                    className="h-7 w-7 rounded flex items-center justify-center text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    onClick={() => toast.success("Key revoked")}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-500/20 bg-red-500/3">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-bold text-red-400 flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Danger Zone
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              {
                label: "Clear All Caches",
                desc: "Flush Redis and CDN caches",
                action: "Clear Cache",
              },
              {
                label: "Reset Rate Limits",
                desc: "Reset all API rate limit counters",
                action: "Reset Limits",
              },
              {
                label: "Emergency Shutdown",
                desc: "Immediately halt all platform services",
                action: "SHUTDOWN",
              },
            ].map(({ label, desc, action }) => (
              <div
                key={label}
                className="p-3 rounded-xl border border-red-500/20 bg-red-500/5"
              >
                <p className="text-sm font-bold text-red-300">{label}</p>
                <p className="text-xs text-muted-foreground mt-0.5 mb-2">
                  {desc}
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 text-xs border-red-500/30 text-red-400 hover:bg-red-500/10"
                  onClick={() =>
                    toast.error(`${action} — confirm in production!`)
                  }
                >
                  {action}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
