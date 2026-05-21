import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Plus,
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  Share2,
  Shield,
  Zap,
  Edit3,
  Eye,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const CONTRACTS = [
  {
    id: 1,
    title: "TechCorp Managed IT Agreement",
    type: "Service",
    value: "$4,444/mo",
    parties: ["Skyler Blue IT", "TechCorp Inc."],
    status: "active",
    signed: "May 1, 2026",
    expires: "Apr 30, 2027",
    hash: "0x4444...abc1",
  },
  {
    id: 2,
    title: "ShadowChat Developer NDA",
    type: "NDA",
    value: "N/A",
    parties: ["ShadowChat LLC", "Alex Johnson"],
    status: "active",
    signed: "Apr 15, 2026",
    expires: "Apr 14, 2028",
    hash: "0x4444...abc2",
  },
  {
    id: 3,
    title: "SKY4444 Token Sale Agreement",
    type: "Investment",
    value: "$44,000",
    parties: ["ShadowChat LLC", "CryptoFund DAO"],
    status: "pending",
    signed: "—",
    expires: "Jun 1, 2026",
    hash: "0x4444...abc3",
  },
  {
    id: 4,
    title: "NFT Royalty Agreement",
    type: "Royalty",
    value: "10% perpetual",
    parties: ["ShadowChat LLC", "ArtistDAO.eth"],
    status: "active",
    signed: "Mar 1, 2026",
    expires: "Perpetual",
    hash: "0x4444...abc4",
  },
  {
    id: 5,
    title: "IT Hardware Lease — Dell",
    type: "Lease",
    value: "$888/mo",
    parties: ["Skyler Blue IT", "Dell Financial"],
    status: "expired",
    signed: "May 1, 2025",
    expires: "May 1, 2026",
    hash: "0x4444...abc5",
  },
];

const TEMPLATES = [
  {
    name: "Service Agreement",
    icon: "🔧",
    desc: "Standard IT service contract",
  },
  { name: "NDA", icon: "🔒", desc: "Non-disclosure agreement" },
  { name: "Investment Agreement", icon: "💰", desc: "Token/equity investment" },
  { name: "Employment Contract", icon: "👤", desc: "Full-time or contractor" },
  { name: "Royalty Agreement", icon: "🎨", desc: "NFT or IP royalties" },
  { name: "Smart Contract", icon: "⚡", desc: "On-chain Solidity contract" },
];

const STATUS_CONFIG: Record<string, { color: string; icon: React.ReactNode }> =
  {
    active: {
      color: "bg-green-500/10 text-green-400 border-green-500/20",
      icon: <CheckCircle className="h-3 w-3" />,
    },
    pending: {
      color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
      icon: <Clock className="h-3 w-3" />,
    },
    expired: {
      color: "bg-red-500/10 text-red-400 border-red-500/20",
      icon: <AlertCircle className="h-3 w-3" />,
    },
  };

export default function ShadowContracts() {
  const [tab, setTab] = useState<"contracts" | "templates" | "create">(
    "contracts"
  );
  const [filter, setFilter] = useState("all");

  const filtered = CONTRACTS.filter(
    c => filter === "all" || c.status === filter
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <FileText className="h-6 w-6 text-blue-400" />
            ShadowContracts
          </h1>
          <p className="text-sm text-muted-foreground">
            Smart contracts, legal agreements, and blockchain notarization
          </p>
        </div>
        <Button
          size="sm"
          className="h-8 text-xs bg-blue-600 text-white border-0 font-bold"
          onClick={() => setTab("create")}
        >
          <Plus className="h-3.5 w-3.5 mr-1" />
          New Contract
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        {[
          {
            label: "Active",
            value: CONTRACTS.filter(c => c.status === "active").length,
            color: "text-green-400",
          },
          {
            label: "Pending",
            value: CONTRACTS.filter(c => c.status === "pending").length,
            color: "text-yellow-400",
          },
          {
            label: "Expired",
            value: CONTRACTS.filter(c => c.status === "expired").length,
            color: "text-red-400",
          },
        ].map(s => (
          <Card key={s.label} className="border-border/50 text-center">
            <CardContent className="py-2.5 px-2">
              <p className={`font-black text-2xl ${s.color}`}>{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-2">
        {(["contracts", "templates", "create"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-blue-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "contracts" && (
        <div className="space-y-3">
          <div className="flex gap-1.5">
            {["all", "active", "pending", "expired"].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded-full text-xs font-medium capitalize transition-colors ${filter === f ? "bg-muted-foreground/20 text-foreground" : "text-muted-foreground"}`}
              >
                {f}
              </button>
            ))}
          </div>
          {filtered.map((contract, i) => (
            <motion.div
              key={contract.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <Card className="border-border/50 hover:border-blue-500/20 transition-all">
                <CardContent className="py-3 px-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="font-bold text-sm">{contract.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {contract.parties.join(" ↔ ")}
                      </p>
                    </div>
                    <Badge
                      className={`text-xs flex items-center gap-1 shrink-0 ${STATUS_CONFIG[contract.status]?.color}`}
                    >
                      {STATUS_CONFIG[contract.status]?.icon}
                      {contract.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>
                      Type:{" "}
                      <span className="text-foreground font-bold">
                        {contract.type}
                      </span>
                    </span>
                    <span>
                      Value:{" "}
                      <span className="text-green-400 font-bold">
                        {contract.value}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>Signed: {contract.signed}</span>
                    <span>Expires: {contract.expires}</span>
                  </div>
                  <div className="flex gap-1.5">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 text-xs font-bold flex-1"
                      onClick={() =>
                        toast.success(`Viewing ${contract.title}...`)
                      }
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 text-xs font-bold flex-1"
                      onClick={() => toast.success("Downloading PDF...")}
                    >
                      <Download className="h-3 w-3 mr-1" />
                      PDF
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 text-xs font-bold flex-1"
                      onClick={() => toast.success("Share link copied!")}
                    >
                      <Share2 className="h-3 w-3 mr-1" />
                      Share
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground font-mono">
                    🔗 {contract.hash}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "templates" && (
        <div className="grid grid-cols-2 gap-2">
          {TEMPLATES.map((tmpl, i) => (
            <motion.div
              key={tmpl.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.07 }}
            >
              <Card
                className="border-border/50 cursor-pointer hover:border-blue-500/20 transition-all"
                onClick={() =>
                  toast.success(`Loading ${tmpl.name} template...`)
                }
              >
                <CardContent className="py-3 px-3 text-center">
                  <span className="text-3xl">{tmpl.icon}</span>
                  <p className="font-bold text-sm mt-1">{tmpl.name}</p>
                  <p className="text-xs text-muted-foreground">{tmpl.desc}</p>
                  <Button
                    size="sm"
                    className="mt-2 h-7 text-xs w-full bg-blue-600 text-white border-0 font-bold"
                  >
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "create" && (
        <Card className="border-blue-500/20 bg-blue-900/5">
          <CardContent className="py-4 px-4 space-y-3">
            <p className="font-black text-base flex items-center gap-2">
              <Zap className="h-5 w-5 text-blue-400" />
              AI Contract Generator
            </p>
            <p className="text-xs text-muted-foreground">
              Describe your contract in plain English and our AI will generate a
              legally sound agreement, notarize it on-chain, and send it for
              signatures.
            </p>
            <textarea
              className="w-full h-28 p-3 rounded-xl bg-muted text-sm resize-none border border-border/50 focus:outline-none focus:border-blue-500/40"
              placeholder="e.g. 'I need a 12-month managed IT service agreement for $4,444/month with TechCorp Inc. for network monitoring, helpdesk, and cybersecurity...'"
            />
            <Button
              className="w-full h-10 text-sm bg-blue-600 text-white border-0 font-bold"
              onClick={() =>
                toast.success("AI generating contract... Ready in 30 seconds!")
              }
            >
              <Zap className="h-4 w-4 mr-2" />
              Generate with AI
            </Button>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Shield className="h-3.5 w-3.5 text-green-400" />
              <span>
                All contracts are notarized on-chain and legally binding in 180+
                jurisdictions
              </span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
