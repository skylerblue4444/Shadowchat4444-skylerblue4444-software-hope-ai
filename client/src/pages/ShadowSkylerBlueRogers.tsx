import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, CheckCircle, Phone } from "lucide-react";
import { toast } from "sonner";

const services = [
  "Managed IT Services & Help Desk Support",
  "Cybersecurity & Network Security",
  "Cloud Migration & Management (AWS/Azure/GCP)",
  "WiFi, Cabling, Switching & Routing",
  "Server Setup, Maintenance & Virtualization",
  "Microsoft 365 & Google Workspace",
  "Backup, Disaster Recovery & Business Continuity",
  "VoIP Phone Systems & UCaaS",
];

export default function ShadowSkylerBlueRogers() {
  const [called, setCalled] = useState(false);
  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-black">IT Services Rogers AR</h1>
          <p className="text-sm text-muted-foreground">
            Skyler Blue IT Resolutions — Rogers Arkansas IT managed services and
            cybersecurity
          </p>
        </div>
        <Badge className="bg-blue-700 text-white shrink-0">Rogers</Badge>
      </div>
      <div className="grid grid-cols-4 gap-2">
        <Card className="border-border/50 text-center">
          <CardContent className="py-3 px-2">
            <p className="font-black text-lg text-cyan-400">Under 1hr</p>
            <p className="text-xs text-muted-foreground">Response Time</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 text-center">
          <CardContent className="py-3 px-2">
            <p className="font-black text-lg text-green-400">284+</p>
            <p className="text-xs text-muted-foreground">Clients</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 text-center">
          <CardContent className="py-3 px-2">
            <p className="font-black text-lg text-blue-400">Full IT</p>
            <p className="text-xs text-muted-foreground">Services</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 text-center">
          <CardContent className="py-3 px-2">
            <p className="font-black text-lg text-orange-400">Benton County</p>
            <p className="text-xs text-muted-foreground">Coverage</p>
          </CardContent>
        </Card>
      </div>
      <Card className="border-border/50">
        <CardContent className="py-3 px-4 space-y-2">
          {services.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <CheckCircle className="h-3.5 w-3.5 text-green-400 shrink-0" />
              <span className="text-xs">{s}</span>
            </div>
          ))}
        </CardContent>
      </Card>
      <div className="rounded-xl bg-gradient-to-br from-blue-900/40 to-indigo-900/40 border border-blue-500/30 p-4">
        <p className="font-black text-sm mb-1">Call Skyler Blue Now</p>
        <p className="text-xs text-muted-foreground mb-3">
          479-406-7123 &bull; skylerblue4444@gmail.com
        </p>
        <Button
          className={`w-full font-bold border-0 ${called ? "bg-green-600" : "bg-blue-600"} text-white`}
          onClick={() => {
            setCalled(true);
            toast.success("Calling Skyler Blue IT Resolutions: 479-406-7123");
          }}
        >
          <Phone className="h-4 w-4 mr-2" />
          {called ? "Call Initiated!" : "Call 479-406-7123"}
        </Button>
      </div>
      <div className="rounded-xl bg-muted/50 border border-border/50 p-3 text-center">
        <p className="font-bold text-xs">
          Skyler Blue IT Resolutions &bull; 479-406-7123
        </p>
        <p className="text-xs text-muted-foreground">
          skylerblue4444@gmail.com &bull; Arkansas #1 IT Partner
        </p>
      </div>
    </div>
  );
}
