import { useState } from "react";
import { motion } from "framer-motion";
import {
  Cloud,
  Server,
  Database,
  HardDrive,
  Cpu,
  Wifi,
  Zap,
  CheckCircle,
  AlertTriangle,
  Plus,
  RefreshCw,
  Globe,
  Lock,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const SERVERS = [
  {
    id: 1,
    name: "ShadowWeb-01",
    type: "Web Server",
    region: "US-East",
    cpu: 44,
    ram: 62,
    disk: 38,
    status: "running",
    ip: "44.44.44.44",
    os: "Ubuntu 22.04",
  },
  {
    id: 2,
    name: "ShadowDB-01",
    type: "Database",
    region: "US-East",
    cpu: 22,
    ram: 78,
    disk: 55,
    status: "running",
    ip: "44.44.44.45",
    os: "Ubuntu 22.04",
  },
  {
    id: 3,
    name: "ShadowAPI-01",
    type: "API Server",
    region: "EU-West",
    cpu: 33,
    ram: 45,
    disk: 22,
    status: "running",
    ip: "88.88.88.88",
    os: "Ubuntu 22.04",
  },
  {
    id: 4,
    name: "ShadowBackup-01",
    type: "Backup",
    region: "US-West",
    cpu: 8,
    ram: 12,
    disk: 88,
    status: "idle",
    ip: "55.55.55.55",
    os: "Ubuntu 22.04",
  },
];

const STORAGE_BUCKETS = [
  { name: "shadow-media", size: "244 GB", files: "44,444", public: false },
  { name: "shadow-backups", size: "888 GB", files: "1,244", public: false },
  { name: "shadow-nft-assets", size: "44 GB", files: "12,444", public: true },
];

export default function ShadowCloud() {
  const [tab, setTab] = useState<
    "servers" | "storage" | "deployments" | "billing"
  >("servers");
  const [restarting, setRestarting] = useState<number | null>(null);

  const restartServer = async (id: number, name: string) => {
    setRestarting(id);
    await new Promise(r => setTimeout(r, 2000));
    setRestarting(null);
    toast.success(`✅ ${name} restarted successfully!`);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Cloud className="h-6 w-6 text-sky-400" />
            ShadowCloud
          </h1>
          <p className="text-sm text-muted-foreground">
            Managed cloud infrastructure for IT clients
          </p>
        </div>
        <Badge className="bg-sky-500/10 text-sky-400 border-sky-500/20 font-bold">
          ☁️ 4 Servers
        </Badge>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: "Servers", value: SERVERS.length, emoji: "🖥️" },
          { label: "Storage", value: "1.2 TB", emoji: "💾" },
          { label: "Uptime", value: "99.97%", emoji: "⏱️" },
          { label: "Monthly Cost", value: "$444", emoji: "💰" },
        ].map(s => (
          <Card key={s.label} className="border-border/50 text-center">
            <CardContent className="pt-2 pb-2">
              <p className="text-base">{s.emoji}</p>
              <p className="font-black text-xs text-sky-400">{s.value}</p>
              <p className="text-xs text-muted-foreground leading-tight">
                {s.label}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-2">
        {(["servers", "storage", "deployments", "billing"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-sky-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "servers" && (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <p className="text-xs font-bold text-muted-foreground">
              VIRTUAL MACHINES ({SERVERS.length})
            </p>
            <Button
              size="sm"
              className="h-7 text-xs bg-sky-600 text-white border-0"
              onClick={() => toast.info("Launching server wizard...")}
            >
              <Plus className="h-3.5 w-3.5 mr-1" />
              New Server
            </Button>
          </div>
          {SERVERS.map((srv, i) => (
            <motion.div
              key={srv.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <Card className="border-border/50">
                <CardContent className="py-3 px-4">
                  <div className="flex items-start gap-3">
                    <div
                      className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${srv.status === "running" ? "bg-green-500/10" : "bg-muted"}`}
                    >
                      <Server
                        className={`h-5 w-5 ${srv.status === "running" ? "text-green-400" : "text-muted-foreground"}`}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="font-black text-sm">{srv.name}</p>
                        <Badge
                          className={`text-xs ${srv.status === "running" ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-muted text-muted-foreground"}`}
                        >
                          {srv.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {srv.type} · {srv.region} · {srv.ip}
                      </p>
                      <div className="space-y-1 mt-1.5">
                        <div className="flex items-center gap-2">
                          <p className="text-xs text-muted-foreground w-8">
                            CPU
                          </p>
                          <Progress value={srv.cpu} className="flex-1 h-1.5" />
                          <p className="text-xs font-bold w-8 text-right">
                            {srv.cpu}%
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <p className="text-xs text-muted-foreground w-8">
                            RAM
                          </p>
                          <Progress value={srv.ram} className="flex-1 h-1.5" />
                          <p className="text-xs font-bold w-8 text-right">
                            {srv.ram}%
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <p className="text-xs text-muted-foreground w-8">
                            Disk
                          </p>
                          <Progress value={srv.disk} className="flex-1 h-1.5" />
                          <p className="text-xs font-bold w-8 text-right">
                            {srv.disk}%
                          </p>
                        </div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 text-xs shrink-0"
                      onClick={() => restartServer(srv.id, srv.name)}
                      disabled={restarting === srv.id}
                    >
                      <RefreshCw
                        className={`h-3.5 w-3.5 ${restarting === srv.id ? "animate-spin" : ""}`}
                      />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "storage" && (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <p className="text-xs font-bold text-muted-foreground">
              STORAGE BUCKETS
            </p>
            <Button
              size="sm"
              className="h-7 text-xs bg-sky-600 text-white border-0"
              onClick={() => toast.info("Creating new bucket...")}
            >
              <Plus className="h-3.5 w-3.5 mr-1" />
              New Bucket
            </Button>
          </div>
          {STORAGE_BUCKETS.map((bucket, i) => (
            <Card key={bucket.name} className="border-border/50">
              <CardContent className="py-3 px-4 flex items-center gap-3">
                <HardDrive className="h-8 w-8 text-sky-400 shrink-0" />
                <div className="flex-1">
                  <p className="font-bold text-sm">{bucket.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {bucket.size} · {bucket.files} files
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    className={`text-xs ${bucket.public ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" : "bg-green-500/10 text-green-400 border-green-500/20"}`}
                  >
                    {bucket.public ? (
                      <>
                        <Globe className="h-3 w-3 mr-0.5 inline" />
                        Public
                      </>
                    ) : (
                      <>
                        <Lock className="h-3 w-3 mr-0.5 inline" />
                        Private
                      </>
                    )}
                  </Badge>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 text-xs"
                    onClick={() => toast.info(`Opening ${bucket.name}...`)}
                  >
                    Open
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          <Card className="border-sky-500/20 bg-sky-900/5">
            <CardContent className="py-3 px-4">
              <p className="font-bold text-sm mb-2">Storage Usage</p>
              <div className="flex items-center gap-2">
                <Progress value={64} className="flex-1 h-2" />
                <p className="text-xs font-bold text-sky-400">1.2 / 2 TB</p>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                64% used · 800 GB available
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "deployments" && (
        <div className="space-y-3">
          {[
            {
              name: "ShadowChat v11.0",
              status: "deployed",
              time: "2 hours ago",
              env: "Production",
              emoji: "🚀",
            },
            {
              name: "ShadowAPI v3.2",
              status: "deployed",
              time: "1 day ago",
              env: "Production",
              emoji: "⚡",
            },
            {
              name: "ShadowAdmin v2.1",
              status: "building",
              time: "5 min ago",
              env: "Staging",
              emoji: "🔨",
            },
            {
              name: "ShadowIT Portal v1.4",
              status: "deployed",
              time: "3 days ago",
              env: "Production",
              emoji: "💻",
            },
          ].map((dep, i) => (
            <Card key={dep.name} className="border-border/50">
              <CardContent className="py-3 px-4 flex items-center gap-3">
                <span className="text-2xl">{dep.emoji}</span>
                <div className="flex-1">
                  <p className="font-bold text-sm">{dep.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {dep.env} · {dep.time}
                  </p>
                </div>
                <Badge
                  className={`text-xs ${dep.status === "deployed" ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"}`}
                >
                  {dep.status === "deployed" ? "✓ Live" : "⚙️ Building"}
                </Badge>
              </CardContent>
            </Card>
          ))}
          <Button
            className="w-full h-10 text-xs bg-sky-600 text-white border-0 font-bold"
            onClick={() => toast.success("✅ Deployment triggered!")}
          >
            <Zap className="h-4 w-4 mr-2" />
            Deploy Latest Build
          </Button>
        </div>
      )}

      {tab === "billing" && (
        <div className="space-y-3">
          <Card className="border-sky-500/20 bg-sky-900/5">
            <CardContent className="py-4 px-4">
              <p className="text-xs text-muted-foreground">
                Current Month Estimate
              </p>
              <p className="text-3xl font-black text-sky-400">$444.00</p>
              <p className="text-xs text-muted-foreground">
                Billing cycle: May 1 – May 31, 2026
              </p>
            </CardContent>
          </Card>
          {[
            { item: "4x Virtual Machines", cost: "$288/mo" },
            { item: "2 TB Object Storage", cost: "$88/mo" },
            { item: "CDN Bandwidth (1 TB)", cost: "$44/mo" },
            { item: "Managed Database", cost: "$24/mo" },
          ].map(b => (
            <Card key={b.item} className="border-border/50">
              <CardContent className="py-2.5 px-4 flex items-center justify-between">
                <p className="text-xs">{b.item}</p>
                <p className="font-bold text-xs text-sky-400">{b.cost}</p>
              </CardContent>
            </Card>
          ))}
          <Button
            className="w-full h-10 text-xs bg-sky-600 text-white border-0"
            onClick={() => toast.info("Opening billing portal...")}
          >
            Manage Billing
          </Button>
        </div>
      )}
    </div>
  );
}
