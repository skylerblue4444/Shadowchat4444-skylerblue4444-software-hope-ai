import { useState } from "react";
import {
  DollarSign,
  Shield,
  Wifi,
  Camera,
  Database,
  Phone,
  CheckCircle,
  Zap,
  Users,
  BarChart3,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function ShadowSkylerBlueDR() {
  const [active, setActive] = useState(false);
  const title = "ShadowSkylerBlueDR".replace(/([A-Z])/g, " $1").trim();
  const descriptions: Record<
    string,
    {
      icon: string;
      desc: string;
      stats: { label: string; value: string; color: string }[];
      features: string[];
    }
  > = {
    ShadowCryptoPayroll: {
      icon: "💰",
      desc: "Pay your team in BTC, ETH, SKY4444, or fiat — automated payroll with tax withholding and compliance",
      stats: [
        { label: "Employees", value: "24", color: "text-emerald-400" },
        { label: "Next Payroll", value: "May 31", color: "text-blue-400" },
        { label: "Total/Month", value: "$48,200", color: "text-green-400" },
        { label: "Crypto %", value: "67%", color: "text-orange-400" },
      ],
      features: [
        "Multi-currency payroll",
        "Auto tax withholding",
        "Crypto-to-fiat conversion",
        "Pay stubs & W-2s",
        "Direct deposit",
        "SKY4444 bonus programs",
      ],
    },
    ShadowSkylerBlueDR: {
      icon: "🔄",
      desc: "Disaster Recovery as a Service — automated backups, failover, and business continuity for Arkansas businesses",
      stats: [
        { label: "Clients Protected", value: "84", color: "text-blue-400" },
        { label: "Last Backup", value: "2min", color: "text-green-400" },
        { label: "RTO", value: "<15min", color: "text-orange-400" },
        { label: "RPO", value: "<1hr", color: "text-purple-400" },
      ],
      features: [
        "Automated daily backups",
        "Offsite replication",
        "Instant failover",
        "Ransomware protection",
        "Compliance reporting",
        "24/7 monitoring",
      ],
    },
    ShadowSkylerBlueWiFi: {
      icon: "📶",
      desc: "Enterprise WiFi management — deploy, monitor, and secure wireless networks for businesses across Arkansas",
      stats: [
        { label: "Access Points", value: "247", color: "text-cyan-400" },
        { label: "Connected", value: "1,847", color: "text-green-400" },
        { label: "Avg Speed", value: "847Mbps", color: "text-blue-400" },
        { label: "Uptime", value: "99.97%", color: "text-emerald-400" },
      ],
      features: [
        "Unifi/Meraki management",
        "Guest network isolation",
        "Bandwidth throttling",
        "Rogue AP detection",
        "Coverage heat maps",
        "Remote troubleshooting",
      ],
    },
    ShadowSkylerBlueCCTV: {
      icon: "📹",
      desc: "Commercial CCTV and security camera installation, monitoring, and management for Arkansas businesses",
      stats: [
        { label: "Cameras", value: "1,284", color: "text-red-400" },
        { label: "Sites", value: "94", color: "text-orange-400" },
        { label: "Storage", value: "48TB", color: "text-blue-400" },
        { label: "AI Alerts", value: "24/7", color: "text-green-400" },
      ],
      features: [
        "HD/4K cameras",
        "AI motion detection",
        "License plate recognition",
        "Cloud recording",
        "Mobile viewing",
        "Instant alerts",
      ],
    },
    ShadowSkylerBlueERP: {
      icon: "🏢",
      desc: "Enterprise Resource Planning for small-medium businesses — inventory, accounting, HR, and operations in one platform",
      stats: [
        { label: "Modules", value: "12", color: "text-indigo-400" },
        { label: "ERP Clients", value: "31", color: "text-green-400" },
        { label: "Transactions", value: "48K/mo", color: "text-blue-400" },
        { label: "Time Saved", value: "18hr/wk", color: "text-orange-400" },
      ],
      features: [
        "Inventory management",
        "Accounts payable/receivable",
        "HR & payroll",
        "CRM integration",
        "Custom reporting",
        "API integrations",
      ],
    },
    ShadowSkylerBluePBX: {
      icon: "☎️",
      desc: "On-premise and cloud PBX phone systems for businesses — Asterisk, 3CX, and FreePBX installation and support",
      stats: [
        { label: "PBX Systems", value: "47", color: "text-teal-400" },
        { label: "Extensions", value: "1,247", color: "text-green-400" },
        { label: "Call Quality", value: "4.9/5", color: "text-blue-400" },
        { label: "Cost Savings", value: "65%", color: "text-orange-400" },
      ],
      features: [
        "3CX/Asterisk/FreePBX",
        "Auto-attendant IVR",
        "Call recording",
        "Ring groups",
        "Voicemail to email",
        "SIP trunk integration",
      ],
    },
  };
  const d = descriptions["ShadowSkylerBlueDR"];
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black">
          {d.icon}{" "}
          {title
            .replace("Shadow", "")
            .replace("Skyler Blue", "Skyler Blue ")
            .trim()}
        </h1>
        <p className="text-sm text-muted-foreground">{d.desc}</p>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {d.stats.map((s: { label: string; value: string; color: string }) => (
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
          <p className="font-bold text-sm mb-2">Features Included</p>
          <div className="grid grid-cols-2 gap-1.5">
            {d.features.map((f: string) => (
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
        <p className="font-bold text-sm">
          Get started with Skyler Blue IT Resolutions
        </p>
        <p className="text-2xl font-black text-indigo-400 mt-1">479-406-7123</p>
        <p className="text-xs text-muted-foreground mb-3">
          skylerblue4444@gmail.com · Free consultation
        </p>
        <Button
          className="w-full h-10 bg-indigo-600 text-white border-0 font-black"
          onClick={() =>
            toast.success(
              "Consultation request sent — we'll call 479-406-7123 within 1 business hour"
            )
          }
        >
          <Zap className="h-4 w-4 mr-2" />
          Request Free Consultation
        </Button>
      </div>
    </div>
  );
}
