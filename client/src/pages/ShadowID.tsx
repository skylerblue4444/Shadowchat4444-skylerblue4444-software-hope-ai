import { useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  CheckCircle,
  AlertTriangle,
  Lock,
  Globe,
  User,
  Fingerprint,
  Key,
  QrCode,
  Download,
  Upload,
  Zap,
  Star,
  ChevronRight,
  Eye,
  EyeOff,
  Copy,
  RefreshCw,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const VERIFICATION_LEVELS = [
  {
    level: 1,
    name: "Email Verified",
    emoji: "📧",
    completed: true,
    reward: "10 SKY4444",
    desc: "Basic account verification",
  },
  {
    level: 2,
    name: "Phone Verified",
    emoji: "📱",
    completed: true,
    reward: "25 SKY4444",
    desc: "SMS verification completed",
  },
  {
    level: 3,
    name: "KYC Basic",
    emoji: "🪪",
    completed: true,
    reward: "100 SKY4444",
    desc: "Government ID verified",
  },
  {
    level: 4,
    name: "KYC Advanced",
    emoji: "🤳",
    completed: false,
    reward: "500 SKY4444",
    desc: "Facial recognition + liveness check",
  },
  {
    level: 5,
    name: "Accredited Investor",
    emoji: "💼",
    completed: false,
    reward: "2000 SKY4444",
    desc: "Financial verification for premium features",
  },
];

const CONNECTED_APPS = [
  {
    name: "ShadowExchange",
    emoji: "📈",
    permissions: ["Trade", "View Balance"],
    connected: true,
    lastUsed: "2 min ago",
  },
  {
    name: "ShadowPay",
    emoji: "⚡",
    permissions: ["Send", "Receive", "View"],
    connected: true,
    lastUsed: "1 hour ago",
  },
  {
    name: "ShadowMarket",
    emoji: "🛍️",
    permissions: ["Purchase", "View Orders"],
    connected: true,
    lastUsed: "3 days ago",
  },
  {
    name: "ShadowDAO",
    emoji: "🏛️",
    permissions: ["Vote", "Propose"],
    connected: false,
    lastUsed: "Never",
  },
];

const DID_CREDENTIALS = [
  {
    name: "ShadowChat Member",
    issuer: "ShadowChat DAO",
    issued: "Jan 1, 2025",
    emoji: "⚡",
    verified: true,
  },
  {
    name: "KYC Verified",
    issuer: "SkyBlue IT Resolutions",
    issued: "Feb 15, 2025",
    emoji: "🛡️",
    verified: true,
  },
  {
    name: "SKY4444 ICO Participant",
    issuer: "ShadowPad",
    issued: "Mar 1, 2025",
    emoji: "🚀",
    verified: true,
  },
  {
    name: "Charity Champion",
    issuer: "ShadowCharity",
    issued: "Apr 1, 2025",
    emoji: "❤️",
    verified: true,
  },
];

export default function ShadowID() {
  const [showDID, setShowDID] = useState(false);
  const [tab, setTab] = useState<
    "identity" | "credentials" | "apps" | "security"
  >("identity");
  const completedLevels = VERIFICATION_LEVELS.filter(v => v.completed).length;
  const verificationScore = Math.round(
    (completedLevels / VERIFICATION_LEVELS.length) * 100
  );

  const DID = "did:shadow:0xSKY4444BLUE2025INNOVATIVE";

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Fingerprint className="h-6 w-6 text-green-400" />
            ShadowID
          </h1>
          <p className="text-sm text-muted-foreground">
            Decentralized identity & Web3 passport
          </p>
        </div>
        <Badge className="bg-green-500/10 text-green-400 border-green-500/20 font-bold">
          Level {completedLevels} Verified
        </Badge>
      </div>

      {/* Identity Card */}
      <Card className="border-green-500/20 bg-gradient-to-br from-green-900/10 to-blue-900/10 overflow-hidden">
        <CardContent className="pt-5 pb-5">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-green-600 to-blue-600 flex items-center justify-center text-4xl shrink-0">
              ⚡
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-black text-xl">Skyler Blue</p>
                <Shield className="h-5 w-5 text-green-400" />
                <Badge className="bg-green-500/10 text-green-400 border-green-500/20 text-xs">
                  KYC Verified
                </Badge>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-xs font-mono text-muted-foreground">
                  {showDID ? DID : "did:shadow:0x••••••••••••••••"}
                </p>
                <button
                  onClick={() => setShowDID(!showDID)}
                  className="text-muted-foreground hover:text-white"
                >
                  {showDID ? (
                    <EyeOff className="h-3.5 w-3.5" />
                  ) : (
                    <Eye className="h-3.5 w-3.5" />
                  )}
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(DID);
                    toast.success("DID copied!");
                  }}
                  className="text-muted-foreground hover:text-white"
                >
                  <Copy className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="mt-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">
                    Verification Score
                  </span>
                  <span className="font-bold text-green-400">
                    {verificationScore}%
                  </span>
                </div>
                <Progress value={verificationScore} className="h-1.5" />
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Button
              size="sm"
              className="h-8 text-xs bg-green-600 text-white border-0"
              onClick={() => toast.info("Generating QR code...")}
            >
              <QrCode className="h-3.5 w-3.5 mr-1.5" />
              Show QR
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-8 text-xs"
              onClick={() => toast.success("Identity exported!")}
            >
              <Download className="h-3.5 w-3.5 mr-1.5" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="flex gap-2">
        {(["identity", "credentials", "apps", "security"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-green-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "identity" && (
        <div className="space-y-3">
          <p className="text-xs font-bold text-muted-foreground">
            VERIFICATION LEVELS
          </p>
          {VERIFICATION_LEVELS.map((level, i) => (
            <motion.div
              key={level.level}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Card
                className={`border-border/50 ${level.completed ? "border-green-500/20" : ""}`}
              >
                <CardContent className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-10 w-10 rounded-xl flex items-center justify-center text-2xl shrink-0 ${level.completed ? "bg-green-500/10" : "bg-muted/20"}`}
                    >
                      {level.emoji}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-sm">{level.name}</p>
                        {level.completed && (
                          <CheckCircle className="h-4 w-4 text-green-400" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {level.desc}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <Badge
                        className={`text-xs ${level.completed ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"}`}
                      >
                        {level.completed ? "✓ Earned" : `🎁 ${level.reward}`}
                      </Badge>
                    </div>
                    {!level.completed && (
                      <Button
                        size="sm"
                        className="h-7 text-xs bg-green-600 text-white border-0 shrink-0 ml-2"
                        onClick={() =>
                          toast.success(
                            `Starting ${level.name} verification...`
                          )
                        }
                      >
                        Verify
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "credentials" && (
        <div className="space-y-3">
          <p className="text-xs font-bold text-muted-foreground">
            VERIFIABLE CREDENTIALS (W3C DID)
          </p>
          {DID_CREDENTIALS.map((cred, i) => (
            <Card key={cred.name} className="border-border/50">
              <CardContent className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{cred.emoji}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-sm">{cred.name}</p>
                      {cred.verified && (
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Issued by {cred.issuer} · {cred.issued}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 text-xs shrink-0"
                    onClick={() => toast.success("Credential shared!")}
                  >
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          <Button
            variant="outline"
            className="w-full h-9 text-xs"
            onClick={() => toast.info("Import credential...")}
          >
            <Upload className="h-3.5 w-3.5 mr-1.5" />
            Import Credential
          </Button>
        </div>
      )}

      {tab === "apps" && (
        <div className="space-y-3">
          <p className="text-xs font-bold text-muted-foreground">
            CONNECTED APPLICATIONS
          </p>
          {CONNECTED_APPS.map(app => (
            <Card key={app.name} className="border-border/50">
              <CardContent className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{app.emoji}</span>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{app.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Permissions: {app.permissions.join(", ")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Last used: {app.lastUsed}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      toast.success(
                        app.connected
                          ? `Disconnected ${app.name}`
                          : `Connected ${app.name}!`
                      )
                    }
                    className={`h-6 w-11 rounded-full transition-colors shrink-0 ${app.connected ? "bg-green-600" : "bg-muted"} relative`}
                  >
                    <div
                      className={`h-4 w-4 rounded-full bg-white absolute top-1 transition-all ${app.connected ? "right-1" : "left-1"}`}
                    />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "security" && (
        <div className="space-y-3">
          {[
            {
              label: "Two-Factor Authentication",
              desc: "TOTP authenticator app enabled",
              enabled: true,
              icon: Key,
            },
            {
              label: "Biometric Login",
              desc: "Face ID / fingerprint enabled",
              enabled: true,
              icon: Fingerprint,
            },
            {
              label: "Hardware Key (FIDO2)",
              desc: "YubiKey registered",
              enabled: false,
              icon: Lock,
            },
            {
              label: "Login Notifications",
              desc: "Email alerts for new logins",
              enabled: true,
              icon: Shield,
            },
            {
              label: "Session Timeout",
              desc: "Auto-logout after 30 minutes",
              enabled: true,
              icon: RefreshCw,
            },
          ].map(item => (
            <Card key={item.label} className="border-border/50">
              <CardContent className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <item.icon
                    className={`h-5 w-5 shrink-0 ${item.enabled ? "text-green-400" : "text-muted-foreground"}`}
                  />
                  <div className="flex-1">
                    <p className="font-bold text-sm">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <button
                    onClick={() =>
                      toast.success(
                        `${item.label} ${item.enabled ? "disabled" : "enabled"}!`
                      )
                    }
                    className={`h-6 w-11 rounded-full transition-colors shrink-0 ${item.enabled ? "bg-green-600" : "bg-muted"} relative`}
                  >
                    <div
                      className={`h-4 w-4 rounded-full bg-white absolute top-1 transition-all ${item.enabled ? "right-1" : "left-1"}`}
                    />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
