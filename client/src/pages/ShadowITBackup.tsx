import {
  HardDrive,
  Cloud,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Clock,
  Shield,
  Zap,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const BACKUPS = [
  {
    name: "Client Database",
    size: "42 GB",
    last: "2h ago",
    status: "success",
    location: "AWS S3 + Local",
    retention: "90 days",
  },
  {
    name: "Email Archive",
    size: "128 GB",
    last: "6h ago",
    status: "success",
    location: "Azure Blob",
    retention: "1 year",
  },
  {
    name: "File Server",
    size: "2.4 TB",
    last: "12h ago",
    status: "success",
    location: "Local NAS",
    retention: "30 days",
  },
  {
    name: "VM Snapshots",
    size: "890 GB",
    last: "1 day ago",
    status: "warning",
    location: "AWS S3",
    retention: "7 days",
  },
  {
    name: "SQL Databases",
    size: "67 GB",
    last: "4h ago",
    status: "success",
    location: "RDS + Local",
    retention: "30 days",
  },
];

export default function ShadowITBackup() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black flex items-center gap-2">
          <HardDrive className="h-6 w-6 text-teal-400" />
          Backup & Recovery
        </h1>
        <p className="text-sm text-muted-foreground">
          Skyler Blue IT — automated backup management with 3-2-1 strategy
        </p>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: "Total Backed Up", value: "3.5 TB", color: "text-teal-400" },
          { label: "Success Rate", value: "99.8%", color: "text-green-400" },
          { label: "Last Backup", value: "2h ago", color: "text-blue-400" },
          { label: "RTO", value: "<4 hrs", color: "text-orange-400" },
        ].map(s => (
          <Card key={s.label} className="border-border/50 text-center">
            <CardContent className="py-3 px-2">
              <p className={"font-black text-lg " + s.color}>{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="space-y-2">
        <p className="text-sm font-bold">Backup Jobs</p>
        {BACKUPS.map((b, i) => (
          <Card key={i} className="border-border/50">
            <CardContent className="py-3 px-4 flex items-center gap-3">
              <div
                className={
                  "h-8 w-8 rounded-xl flex items-center justify-center shrink-0 " +
                  (b.status === "success"
                    ? "bg-green-500/10"
                    : "bg-yellow-500/10")
                }
              >
                {b.status === "success" ? (
                  <CheckCircle className="h-4 w-4 text-green-400" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-yellow-400" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-sm">{b.name}</p>
                  <Badge
                    className={
                      "text-xs border-0 " +
                      (b.status === "success"
                        ? "bg-green-500/10 text-green-400"
                        : "bg-yellow-500/10 text-yellow-400")
                    }
                  >
                    {b.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {b.size} · {b.location} · Retain {b.retention}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs text-muted-foreground">{b.last}</p>
                <Button
                  size="sm"
                  className="h-6 mt-1 bg-teal-600 text-white border-0 font-bold text-xs px-2"
                  onClick={() =>
                    toast.success("Manual backup triggered for " + b.name)
                  }
                >
                  Backup Now
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex gap-2">
        <Button
          className="flex-1 h-9 bg-teal-600 text-white border-0 font-bold text-sm"
          onClick={() =>
            toast.success("Full system backup initiated — ETA 45 minutes")
          }
        >
          <Cloud className="h-4 w-4 mr-2" />
          Run Full Backup
        </Button>
        <Button
          className="flex-1 h-9 bg-muted font-bold text-sm"
          onClick={() => toast.success("Disaster recovery test initiated")}
        >
          <Shield className="h-4 w-4 mr-2" />
          Test Recovery
        </Button>
      </div>
    </div>
  );
}
