import {
  Phone,
  PhoneCall,
  PhoneOff,
  Mic,
  MicOff,
  Volume2,
  Users,
  Settings,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const EXTENSIONS = [
  {
    name: "Skyler Spiller",
    ext: "100",
    status: "available",
    dept: "IT Management",
  },
  { name: "Sarah Johnson", ext: "101", status: "busy", dept: "Help Desk" },
  {
    name: "James Williams",
    ext: "102",
    status: "available",
    dept: "Network Ops",
  },
  { name: "Maria Garcia", ext: "103", status: "away", dept: "Sales" },
  { name: "Front Desk", ext: "0", status: "available", dept: "Reception" },
];

const PLANS = [
  {
    name: "Basic VoIP",
    lines: "1-5 lines",
    price: "$15/line/mo",
    features: ["Unlimited local", "Voicemail", "Call forwarding"],
  },
  {
    name: "Business VoIP",
    lines: "6-20 lines",
    price: "$12/line/mo",
    features: [
      "Everything Basic",
      "Auto-attendant",
      "Conference bridge",
      "Mobile app",
    ],
  },
  {
    name: "Enterprise VoIP",
    lines: "21+ lines",
    price: "$9/line/mo",
    features: [
      "Everything Business",
      "Call recording",
      "CRM integration",
      "Analytics",
      "24/7 support",
    ],
  },
];

const STATUS_COLORS: Record<string, string> = {
  available: "bg-green-500/10 text-green-400",
  busy: "bg-red-500/10 text-red-400",
  away: "bg-yellow-500/10 text-yellow-400",
};

export default function ShadowSkylerBlueVoIP() {
  const [calling, setCalling] = useState<number | null>(null);

  return (
    <div className="space-y-5">
      <div className="rounded-2xl bg-gradient-to-br from-green-900/30 via-teal-900/20 to-cyan-900/20 border border-green-500/20 p-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-xl bg-green-500/10 flex items-center justify-center">
            <Phone className="h-5 w-5 text-green-400" />
          </div>
          <div>
            <h1 className="text-xl font-black">Skyler Blue VoIP</h1>
            <p className="text-sm text-muted-foreground">
              Business phone system — crystal clear calls, any device
            </p>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: "Active Lines", value: "24", color: "text-green-400" },
            { label: "Calls Today", value: "147", color: "text-blue-400" },
            { label: "Avg Call Time", value: "4.2min", color: "text-teal-400" },
            { label: "Uptime", value: "99.99%", color: "text-cyan-400" },
          ].map(s => (
            <div key={s.label} className="text-center">
              <p className={"font-black text-lg " + s.color}>{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-sm font-bold">Directory</p>
        {EXTENSIONS.map((e, i) => (
          <Card key={i} className="border-border/50">
            <CardContent className="py-3 px-4 flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                <span className="font-black text-xs">
                  {e.name
                    .split(" ")
                    .map(n => n[0])
                    .join("")}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-sm">{e.name}</p>
                  <Badge
                    className={"text-xs border-0 " + STATUS_COLORS[e.status]}
                  >
                    {e.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Ext. {e.ext} · {e.dept}
                </p>
              </div>
              {calling === i ? (
                <Button
                  size="sm"
                  className="h-7 bg-red-600 text-white border-0 font-bold text-xs"
                  onClick={() => {
                    setCalling(null);
                    toast.success("Call ended");
                  }}
                >
                  <PhoneOff className="h-3 w-3 mr-1" />
                  End
                </Button>
              ) : (
                <Button
                  size="sm"
                  className="h-7 bg-green-600 text-white border-0 font-bold text-xs"
                  onClick={() => {
                    setCalling(i);
                    toast.success("Calling " + e.name + " at ext. " + e.ext);
                  }}
                >
                  <PhoneCall className="h-3 w-3 mr-1" />
                  Call
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="space-y-2">
        <p className="text-sm font-bold">VoIP Plans</p>
        {PLANS.map((p, i) => (
          <Card key={i} className="border-border/50">
            <CardContent className="py-3 px-4">
              <div className="flex items-start justify-between mb-1">
                <div>
                  <p className="font-bold text-sm">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.lines}</p>
                </div>
                <p className="font-black text-sm text-green-400">{p.price}</p>
              </div>
              <div className="flex flex-wrap gap-1">
                {p.features.map(f => (
                  <span
                    key={f}
                    className="text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground"
                  >
                    {f}
                  </span>
                ))}
              </div>
              <Button
                size="sm"
                className="w-full h-7 mt-2 bg-green-600 text-white border-0 font-bold text-xs"
                onClick={() =>
                  toast.success("Starting " + p.name + " — call 479-406-7123")
                }
              >
                Get Started
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
