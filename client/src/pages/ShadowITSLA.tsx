import { useState } from "react";
import {
  Shield,
  CheckCircle,
  AlertTriangle,
  Clock,
  TrendingUp,
  FileText,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const SLA_TIERS = [
  {
    name: "Basic",
    responseTime: "8 hours",
    uptime: "99.0%",
    support: "Email",
    price: "$99/mo",
    color: "text-gray-400",
  },
  {
    name: "Business",
    responseTime: "4 hours",
    uptime: "99.5%",
    support: "Email + Phone",
    price: "$299/mo",
    color: "text-blue-400",
  },
  {
    name: "Enterprise",
    responseTime: "1 hour",
    uptime: "99.9%",
    support: "24/7 Dedicated",
    price: "$799/mo",
    color: "text-purple-400",
  },
  {
    name: "Platinum",
    responseTime: "15 min",
    uptime: "99.99%",
    support: "White Glove",
    price: "$1,999/mo",
    color: "text-yellow-400",
  },
];

const INCIDENTS = [
  {
    id: "INC-001",
    title: "Email server latency",
    severity: "low",
    status: "resolved",
    opened: "May 14",
    sla: "Met",
  },
  {
    id: "INC-002",
    title: "VPN connectivity issue",
    severity: "medium",
    status: "in-progress",
    opened: "May 15",
    sla: "At Risk",
  },
  {
    id: "INC-003",
    title: "Firewall rule update",
    severity: "low",
    status: "resolved",
    opened: "May 13",
    sla: "Met",
  },
  {
    id: "INC-004",
    title: "Server disk space alert",
    severity: "high",
    status: "resolved",
    opened: "May 12",
    sla: "Met",
  },
];

export default function ShadowITSLA() {
  const [tab, setTab] = useState("sla");
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black flex items-center gap-2">
          <Shield className="h-6 w-6 text-blue-400" />
          IT SLA Manager
        </h1>
        <p className="text-sm text-muted-foreground">
          Service Level Agreements, incident tracking, and uptime guarantees —
          Skyler Blue IT Resolutions
        </p>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: "Current Uptime", value: "99.97%", color: "text-green-400" },
          { label: "Open Incidents", value: "1", color: "text-yellow-400" },
          { label: "SLA Met", value: "98.4%", color: "text-blue-400" },
          { label: "Avg Response", value: "42 min", color: "text-purple-400" },
        ].map(s => (
          <Card key={s.label} className="border-border/50 text-center">
            <CardContent className="py-3 px-2">
              <p className={"font-black text-lg " + s.color}>{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex gap-2">
        {["sla", "incidents"].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={
              "px-3 py-1.5 rounded-full text-xs font-medium transition-colors " +
              (tab === t
                ? "bg-blue-600 text-white"
                : "bg-muted text-muted-foreground")
            }
          >
            {t === "sla" ? "📋 SLA Tiers" : "🚨 Incidents"}
          </button>
        ))}
      </div>
      {tab === "sla" && (
        <div className="space-y-3">
          {SLA_TIERS.map((tier, i) => (
            <Card key={i} className="border-border/50">
              <CardContent className="py-3 px-4">
                <div className="flex items-center justify-between mb-2">
                  <p className={"font-black text-sm " + tier.color}>
                    {tier.name}
                  </p>
                  <p className="font-black text-sm text-blue-400">
                    {tier.price}
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <p className="text-muted-foreground">Response</p>
                    <p className="font-bold">{tier.responseTime}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Uptime</p>
                    <p className="font-bold text-green-400">{tier.uptime}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Support</p>
                    <p className="font-bold">{tier.support}</p>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="w-full mt-2 h-7 bg-blue-600 text-white border-0 font-bold text-xs"
                  onClick={() =>
                    toast.success("Upgrading to " + tier.name + " SLA plan!")
                  }
                >
                  Select Plan
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      {tab === "incidents" && (
        <div className="space-y-2">
          {INCIDENTS.map((inc, i) => (
            <Card key={i} className="border-border/50">
              <CardContent className="py-3 px-4 flex items-center gap-3">
                <div
                  className={
                    "h-8 w-8 rounded-xl flex items-center justify-center shrink-0 " +
                    (inc.severity === "high"
                      ? "bg-red-500/10"
                      : inc.severity === "medium"
                        ? "bg-yellow-500/10"
                        : "bg-blue-500/10")
                  }
                >
                  {inc.status === "resolved" ? (
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  ) : (
                    <AlertTriangle
                      className={
                        "h-4 w-4 " +
                        (inc.severity === "high"
                          ? "text-red-400"
                          : "text-yellow-400")
                      }
                    />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-xs">{inc.id}</p>
                    <Badge
                      className={
                        "text-xs border-0 " +
                        (inc.severity === "high"
                          ? "bg-red-500/10 text-red-400"
                          : inc.severity === "medium"
                            ? "bg-yellow-500/10 text-yellow-400"
                            : "bg-blue-500/10 text-blue-400")
                      }
                    >
                      {inc.severity}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{inc.title}</p>
                </div>
                <div className="text-right shrink-0">
                  <Badge
                    className={
                      "text-xs border-0 " +
                      (inc.sla === "Met"
                        ? "bg-green-500/10 text-green-400"
                        : "bg-yellow-500/10 text-yellow-400")
                    }
                  >
                    {inc.sla}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {inc.opened}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
          <Button
            className="w-full h-9 bg-blue-600 text-white border-0 font-bold text-sm"
            onClick={() =>
              toast.success("New incident created — ticket #INC-005")
            }
          >
            <FileText className="h-4 w-4 mr-2" />
            Report New Incident
          </Button>
        </div>
      )}
    </div>
  );
}
