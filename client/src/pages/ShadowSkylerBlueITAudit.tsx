import { useState } from "react";
import {
  CheckCircle,
  Zap,
  TrendingUp,
  Shield,
  Users,
  Star,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
export default function ShadowSkylerBlueITAudit() {
  const stats = [
    { label: "Audits Completed", value: "247", color: "text-blue-400" },
    { label: "Findings Resolved", value: "4,847", color: "text-green-400" },
    { label: "Avg Audit Time", value: "3 days", color: "text-orange-400" },
    { label: "Compliance Rate", value: "97.2%", color: "text-emerald-400" },
  ];
  const features = [
    "IT security audit",
    "Network vulnerability scan",
    "Compliance gap analysis",
    "Policy review",
    "Risk assessment",
    "Remediation roadmap",
  ];
  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-black">🔍 IT Security Audit</h1>
          <p className="text-sm text-muted-foreground">
            Comprehensive IT security and compliance audits for Arkansas
            businesses — identify risks before attackers do
          </p>
        </div>
        <Badge className="bg-red-600 text-white shrink-0">Critical</Badge>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {stats.map(s => (
          <Card key={s.label} className="border-border/50 text-center">
            <CardContent className="py-3 px-2">
              <p className={"font-black text-lg " + s.color}>{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="border-border/50">
        <CardContent className="py-3 px-4">
          <p className="font-bold text-sm mb-2">Audit Services</p>
          <div className="grid grid-cols-2 gap-1.5">
            {features.map(f => (
              <div
                key={f}
                className="flex items-center gap-1.5 text-xs text-muted-foreground"
              >
                <CheckCircle className="h-3 w-3 text-green-400 shrink-0" />
                {f}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <div className="rounded-xl bg-muted/50 border border-border/50 p-4 text-center">
        <p className="font-bold">Skyler Blue IT Resolutions</p>
        <p className="text-2xl font-black mt-1 text-blue-400">479-406-7123</p>
        <p className="text-xs text-muted-foreground mb-3">
          skylerblue4444@gmail.com
        </p>
        <Button
          className="w-full h-10 bg-indigo-600 text-white border-0 font-black"
          onClick={() => toast.success("Audit request submitted!")}
        >
          <Zap className="h-4 w-4 mr-2" />
          Schedule Audit
        </Button>
      </div>
    </div>
  );
}
