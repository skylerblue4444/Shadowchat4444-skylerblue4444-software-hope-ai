import {
  Shield,
  AlertTriangle,
  CheckCircle,
  Lock,
  Eye,
  Zap,
  Activity,
  Globe,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const THREATS = [
  {
    type: "Phishing Attempt",
    severity: "high",
    source: "185.234.x.x",
    time: "2m ago",
    blocked: true,
  },
  {
    type: "Port Scan",
    severity: "medium",
    source: "91.108.x.x",
    time: "15m ago",
    blocked: true,
  },
  {
    type: "Brute Force SSH",
    severity: "high",
    source: "45.33.x.x",
    time: "1h ago",
    blocked: true,
  },
  {
    type: "Malware Signature",
    severity: "critical",
    source: "Internal",
    time: "3h ago",
    blocked: false,
  },
];

const SERVICES = [
  {
    name: "Firewall Management",
    desc: "24/7 enterprise firewall monitoring and rule management",
    price: "$299/mo",
  },
  {
    name: "Endpoint Protection",
    desc: "AI-powered endpoint detection and response (EDR)",
    price: "$149/mo",
  },
  {
    name: "Security Awareness Training",
    desc: "Monthly phishing simulations and employee training",
    price: "$99/mo",
  },
  {
    name: "Penetration Testing",
    desc: "Quarterly ethical hacking and vulnerability assessment",
    price: "$1,499/qtr",
  },
  {
    name: "Incident Response",
    desc: "24/7 emergency response team for security breaches",
    price: "$499/mo",
  },
  {
    name: "Compliance Auditing",
    desc: "HIPAA, PCI-DSS, SOC2, ISO 27001 compliance management",
    price: "$799/mo",
  },
];

export default function ShadowSkylerBlueCyber() {
  return (
    <div className="space-y-5">
      <div className="relative rounded-2xl bg-gradient-to-br from-red-900/30 via-orange-900/20 to-yellow-900/20 border border-red-500/20 p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-12 w-12 rounded-xl bg-red-500/10 flex items-center justify-center">
            <Shield className="h-6 w-6 text-red-400" />
          </div>
          <div>
            <h1 className="text-xl font-black">Skyler Blue Cybersecurity</h1>
            <p className="text-sm text-muted-foreground">
              Enterprise-grade security for Arkansas businesses
            </p>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: "Threats Blocked", value: "1,247", color: "text-red-400" },
            { label: "Uptime", value: "99.9%", color: "text-green-400" },
            { label: "Clients", value: "84", color: "text-blue-400" },
            {
              label: "Response Time",
              value: "<15min",
              color: "text-orange-400",
            },
          ].map(s => (
            <div key={s.label} className="text-center">
              <p className={"font-black text-lg " + s.color}>{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold">Live Threat Monitor</p>
          <Badge className="bg-green-500/10 text-green-400 border-0 text-xs">
            ● Live
          </Badge>
        </div>
        {THREATS.map((t, i) => (
          <Card key={i} className="border-border/50">
            <CardContent className="py-3 px-4 flex items-center gap-3">
              <AlertTriangle
                className={
                  "h-4 w-4 shrink-0 " +
                  (t.severity === "critical"
                    ? "text-red-500"
                    : t.severity === "high"
                      ? "text-orange-400"
                      : "text-yellow-400")
                }
              />
              <div className="flex-1">
                <p className="font-bold text-sm">{t.type}</p>
                <p className="text-xs text-muted-foreground">
                  Source: {t.source} · {t.time}
                </p>
              </div>
              <Badge
                className={
                  "text-xs border-0 " +
                  (t.blocked
                    ? "bg-green-500/10 text-green-400"
                    : "bg-red-500/10 text-red-400")
                }
              >
                {t.blocked ? "Blocked" : "Investigating"}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="space-y-2">
        <p className="text-sm font-bold">Security Services</p>
        <div className="grid grid-cols-1 gap-2">
          {SERVICES.map((s, i) => (
            <Card key={i} className="border-border/50">
              <CardContent className="py-3 px-4 flex items-center gap-3">
                <div className="flex-1">
                  <p className="font-bold text-sm">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.desc}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-black text-sm text-green-400">{s.price}</p>
                  <Button
                    size="sm"
                    className="h-6 mt-1 bg-red-600 text-white border-0 font-bold text-xs px-2"
                    onClick={() =>
                      toast.success(
                        "Booking " + s.name + " — call 479-406-7123"
                      )
                    }
                  >
                    Book
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div className="rounded-xl bg-muted/50 border border-border/50 p-4 text-center">
        <p className="font-bold text-sm">24/7 Emergency Security Hotline</p>
        <p className="text-2xl font-black text-red-400 mt-1">479-406-7123</p>
        <p className="text-xs text-muted-foreground mt-1">
          skylerblue4444@gmail.com
        </p>
        <Button
          className="mt-3 h-9 bg-red-600 text-white border-0 font-bold text-sm"
          onClick={() => toast.success("Connecting to security team...")}
        >
          <Shield className="h-4 w-4 mr-2" />
          Get Emergency Help
        </Button>
      </div>
    </div>
  );
}
