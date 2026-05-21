import {
  Building2,
  Users,
  Shield,
  Wifi,
  Monitor,
  Phone,
  CheckCircle,
  Star,
  Zap,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const PLANS = [
  {
    name: "Starter MSP",
    price: "$299/mo",
    users: "Up to 10 users",
    features: [
      "Remote monitoring",
      "Help desk (8x5)",
      "Antivirus management",
      "Patch management",
      "Monthly reports",
    ],
    color: "border-blue-500/30",
    badge: "Popular",
  },
  {
    name: "Business MSP",
    price: "$599/mo",
    users: "Up to 25 users",
    features: [
      "Everything in Starter",
      "Help desk (24x7)",
      "Backup management",
      "Network monitoring",
      "Quarterly reviews",
      "Vendor management",
    ],
    color: "border-purple-500/30",
    badge: "Best Value",
  },
  {
    name: "Enterprise MSP",
    price: "$1,299/mo",
    users: "Unlimited users",
    features: [
      "Everything in Business",
      "Dedicated account manager",
      "On-site support",
      "vCIO services",
      "Compliance management",
      "Custom SLAs",
      "Priority response <15min",
    ],
    color: "border-gold-500/30",
    badge: "Enterprise",
  },
];

const CLIENTS = [
  {
    name: "Arkansas Medical Group",
    users: 24,
    status: "healthy",
    since: "2022",
  },
  { name: "Fort Smith Law Firm", users: 8, status: "healthy", since: "2023" },
  {
    name: "Fayetteville Retail Co",
    users: 15,
    status: "warning",
    since: "2021",
  },
  { name: "NWA Construction LLC", users: 31, status: "healthy", since: "2024" },
];

export default function ShadowSkylerBlueMSP() {
  return (
    <div className="space-y-5">
      <div className="rounded-2xl bg-gradient-to-br from-indigo-900/30 via-purple-900/20 to-blue-900/20 border border-indigo-500/20 p-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
            <Building2 className="h-5 w-5 text-indigo-400" />
          </div>
          <div>
            <h1 className="text-xl font-black">Managed Service Provider</h1>
            <p className="text-sm text-muted-foreground">
              Skyler Blue IT Resolutions — Full MSP for Arkansas businesses
            </p>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: "MSP Clients", value: "84", color: "text-indigo-400" },
            { label: "Managed Users", value: "847", color: "text-green-400" },
            { label: "Avg Response", value: "14min", color: "text-blue-400" },
            { label: "CSAT Score", value: "4.9★", color: "text-yellow-400" },
          ].map(s => (
            <div key={s.label} className="text-center">
              <p className={"font-black text-lg " + s.color}>{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-3">
        <p className="text-sm font-bold">MSP Plans</p>
        {PLANS.map((plan, i) => (
          <Card key={i} className={"border-2 " + plan.color}>
            <CardContent className="py-3 px-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-black text-base">{plan.name}</p>
                    <Badge className="bg-indigo-500/10 text-indigo-400 border-0 text-xs">
                      {plan.badge}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{plan.users}</p>
                </div>
                <p className="font-black text-lg text-indigo-400">
                  {plan.price}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-1 mb-2">
                {plan.features.map(f => (
                  <div
                    key={f}
                    className="flex items-center gap-1 text-xs text-muted-foreground"
                  >
                    <CheckCircle className="h-3 w-3 text-green-400 shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
              <Button
                size="sm"
                className="w-full h-8 bg-indigo-600 text-white border-0 font-bold text-sm"
                onClick={() =>
                  toast.success(
                    "Starting " +
                      plan.name +
                      " — call 479-406-7123 to get started"
                  )
                }
              >
                <Zap className="h-3 w-3 mr-1" />
                Get Started
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="space-y-2">
        <p className="text-sm font-bold">Active MSP Clients</p>
        {CLIENTS.map((c, i) => (
          <Card key={i} className="border-border/50">
            <CardContent className="py-3 px-4 flex items-center gap-3">
              <div
                className={
                  "h-8 w-8 rounded-xl flex items-center justify-center shrink-0 " +
                  (c.status === "healthy"
                    ? "bg-green-500/10"
                    : "bg-yellow-500/10")
                }
              >
                {c.status === "healthy" ? (
                  <CheckCircle className="h-4 w-4 text-green-400" />
                ) : (
                  <Shield className="h-4 w-4 text-yellow-400" />
                )}
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm">{c.name}</p>
                <p className="text-xs text-muted-foreground">
                  {c.users} users · Client since {c.since}
                </p>
              </div>
              <Button
                size="sm"
                className="h-7 bg-indigo-600 text-white border-0 font-bold text-xs"
                onClick={() =>
                  toast.success("Opening client portal for " + c.name)
                }
              >
                Portal
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="rounded-xl bg-muted/50 border border-border/50 p-4 text-center">
        <p className="font-bold text-sm">Ready to offload your IT?</p>
        <p className="text-2xl font-black text-indigo-400 mt-1">479-406-7123</p>
        <p className="text-xs text-muted-foreground">
          skylerblue4444@gmail.com · Free 30-day trial
        </p>
      </div>
    </div>
  );
}
