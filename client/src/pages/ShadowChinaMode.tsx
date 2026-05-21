import { useState } from "react";
import { motion } from "framer-motion";
import {
  Globe,
  Shield,
  CheckCircle,
  AlertTriangle,
  FileText,
  Building,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const COMPLIANCE_ITEMS = [
  {
    id: "miit",
    label: "MIIT ICP License",
    status: "pending",
    desc: "Ministry of Industry and Information Technology registration",
    required: true,
  },
  {
    id: "cac",
    label: "CAC Content Review",
    status: "approved",
    desc: "Cyberspace Administration of China content compliance",
    required: true,
  },
  {
    id: "mlps",
    label: "MLPS Level 3 Certification",
    status: "pending",
    desc: "Multi-Level Protection Scheme cybersecurity certification",
    required: true,
  },
  {
    id: "realname",
    label: "Real-Name Registration",
    status: "approved",
    desc: "All users must verify identity with Chinese ID",
    required: true,
  },
  {
    id: "datalocal",
    label: "Data Localization",
    status: "approved",
    desc: "All user data stored on servers within China",
    required: true,
  },
  {
    id: "wechatpay",
    label: "WeChat Pay Integration",
    status: "approved",
    desc: "Official WeChat Pay merchant account",
    required: false,
  },
  {
    id: "alipay",
    label: "Alipay Integration",
    status: "approved",
    desc: "Official Alipay merchant account",
    required: false,
  },
  {
    id: "unionpay",
    label: "UnionPay Integration",
    status: "pending",
    desc: "China UnionPay card processing",
    required: false,
  },
];

const APPROVED_FEATURES = [
  { name: "ShadowChat Messaging", status: "approved", emoji: "💬" },
  { name: "ShadowTV (Licensed Content)", status: "approved", emoji: "📺" },
  { name: "ShadowLearn", status: "approved", emoji: "📚" },
  { name: "ShadowHealth", status: "approved", emoji: "🏥" },
  { name: "ShadowMaps", status: "approved", emoji: "🗺️" },
  { name: "ShadowFood", status: "approved", emoji: "🍜" },
  { name: "ShadowPay (CNY only)", status: "approved", emoji: "💴" },
  { name: "Crypto Trading", status: "restricted", emoji: "📈" },
  { name: "NFT Marketplace", status: "restricted", emoji: "🎨" },
  { name: "DAO Governance", status: "restricted", emoji: "🗳️" },
  { name: "VPN Features", status: "blocked", emoji: "🔒" },
];

const STATUS_CONFIG: Record<
  string,
  { color: string; bg: string; label: string }
> = {
  approved: {
    color: "text-green-400",
    bg: "bg-green-500/10 border-green-500/20",
    label: "Approved",
  },
  pending: {
    color: "text-yellow-400",
    bg: "bg-yellow-500/10 border-yellow-500/20",
    label: "Pending",
  },
  restricted: {
    color: "text-orange-400",
    bg: "bg-orange-500/10 border-orange-500/20",
    label: "Restricted",
  },
  blocked: {
    color: "text-red-400",
    bg: "bg-red-500/10 border-red-500/20",
    label: "Blocked",
  },
};

export default function ShadowChinaMode() {
  const [tab, setTab] = useState<"compliance" | "features" | "registration">(
    "compliance"
  );

  const approved = COMPLIANCE_ITEMS.filter(i => i.status === "approved").length;
  const total = COMPLIANCE_ITEMS.length;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Globe className="h-6 w-6 text-red-400" />
            China Compliance
          </h1>
          <p className="text-sm text-muted-foreground">
            MIIT/CAC compliant deployment for China market
          </p>
        </div>
        <Badge className="bg-red-500/10 text-red-400 border-red-500/20 font-bold">
          {approved}/{total} Approved
        </Badge>
      </div>

      <Card className="border-red-500/20 bg-red-900/5">
        <CardContent className="py-4 px-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full border-4 border-red-500 flex items-center justify-center shrink-0">
              <p className="font-black text-lg text-red-400">
                {Math.round((approved / total) * 100)}%
              </p>
            </div>
            <div className="flex-1">
              <p className="font-black text-sm">China Market Readiness</p>
              <p className="text-xs text-muted-foreground mb-2">
                Complete MIIT ICP and MLPS certifications to launch in China
              </p>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-red-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(approved / total) * 100}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-2">
        {(["compliance", "features", "registration"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-red-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "compliance" && (
        <div className="space-y-2">
          {COMPLIANCE_ITEMS.map((item, i) => {
            const config = STATUS_CONFIG[item.status];
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card
                  className={`border ${item.status === "approved" ? "border-green-500/20" : "border-border/50"}`}
                >
                  <CardContent className="py-3 px-4 flex items-center gap-3">
                    <div
                      className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 ${item.status === "approved" ? "bg-green-500/10" : "bg-yellow-500/10"}`}
                    >
                      {item.status === "approved" ? (
                        <CheckCircle className="h-5 w-5 text-green-400" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-yellow-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-sm">{item.label}</p>
                        {item.required && (
                          <Badge className="text-xs bg-red-500/10 text-red-400 border-red-500/20">
                            Required
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {item.desc}
                      </p>
                    </div>
                    <Badge
                      className={`text-xs ${config.bg} ${config.color} shrink-0`}
                    >
                      {config.label}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
          <Button
            className="w-full h-10 text-xs bg-red-600 text-white border-0 font-bold"
            onClick={() => toast.info("Opening MIIT ICP application portal...")}
          >
            <FileText className="h-4 w-4 mr-2" />
            Apply for ICP License
          </Button>
        </div>
      )}

      {tab === "features" && (
        <div className="space-y-2">
          {APPROVED_FEATURES.map(feature => {
            const config = STATUS_CONFIG[feature.status];
            return (
              <Card key={feature.name} className="border-border/50">
                <CardContent className="py-3 px-4 flex items-center gap-3">
                  <span className="text-xl shrink-0">{feature.emoji}</span>
                  <p className="font-bold text-sm flex-1">{feature.name}</p>
                  <Badge className={`text-xs ${config.bg} ${config.color}`}>
                    {config.label}
                  </Badge>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {tab === "registration" && (
        <Card className="border-red-500/20 bg-red-900/5">
          <CardContent className="py-4 px-4 space-y-3">
            <p className="font-bold text-sm">China Business Registration</p>
            <p className="text-xs text-muted-foreground">
              Required for operating in China. Must have a registered Chinese
              business entity.
            </p>
            <Input
              placeholder="Company Name (Chinese)"
              className="h-9 text-xs"
            />
            <Input
              placeholder="Unified Social Credit Code"
              className="h-9 text-xs"
            />
            <Input
              placeholder="Legal Representative Name"
              className="h-9 text-xs"
            />
            <Input
              placeholder="Registered Address in China"
              className="h-9 text-xs"
            />
            <Input
              placeholder="Contact Phone (China)"
              className="h-9 text-xs"
            />
            <div className="grid grid-cols-2 gap-2">
              <Button
                className="h-10 text-xs bg-red-600 text-white border-0 font-bold"
                onClick={() =>
                  toast.success("Registration submitted for review")
                }
              >
                <Building className="h-4 w-4 mr-1" />
                Submit
              </Button>
              <Button
                variant="outline"
                className="h-10 text-xs font-bold"
                onClick={() => toast.info("Opening China compliance guide...")}
              >
                <FileText className="h-4 w-4 mr-1" />
                Guide
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
