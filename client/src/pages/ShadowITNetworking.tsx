import { useState } from "react";
import { Network, Wifi, Server, Router, Shield, Activity, Plus, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const DEVICES = [
  { name: "Core Switch SW-01",   type: "Switch",   ip: "192.168.1.1",   status: "online",  uptime: "99.9%", load: 23  },
  { name: "Firewall FW-01",      type: "Firewall", ip: "192.168.1.254", status: "online",  uptime: "99.9%", load: 45  },
  { name: "AP-Floor1",           type: "Access Point",ip: "192.168.1.10",status: "online",  uptime: "99.7%", load: 67  },
  { name: "AP-Floor2",           type: "Access Point",ip: "192.168.1.11",status: "warning", uptime: "98.2%", load: 89  },
  { name: "VPN Gateway VPN-01",  type: "VPN",      ip: "10.0.0.1",      status: "online",  uptime: "99.9%", load: 34  },
  { name: "Backup Router RTR-02",type: "Router",   ip: "192.168.2.1",   status: "standby", uptime: "100%",  load: 0   },
];

const STATUS_COLORS: Record<string, string> = {
  online:  "bg-green-500/10 text-green-400",
  warning: "bg-yellow-500/10 text-yellow-400",
  standby: "bg-blue-500/10 text-blue-400",
  offline: "bg-red-500/10 text-red-400",
};

export default function ShadowITNetworking() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black flex items-center gap-2"><Network className="h-6 w-6 text-cyan-400" />Network Management</h1>
        <p className="text-sm text-muted-foreground">Skyler Blue IT Resolutions — real-time network topology and device management</p>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: "Devices",      value: "6",       color: "text-cyan-400"   },
          { label: "Online",       value: "5",       color: "text-green-400"  },
          { label: "Bandwidth",    value: "2.4 Gbps",color: "text-blue-400"   },
          { label: "Threats",      value: "0",       color: "text-green-400"  },
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
        <p className="text-sm font-bold">Network Devices</p>
        {DEVICES.map((dev, i) => (
          <Card key={i} className="border-border/50">
            <CardContent className="py-3 px-4 flex items-center gap-3">
              <div className="h-8 w-8 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0">
                {dev.type === "Switch" ? <Network className="h-4 w-4 text-cyan-400" /> :
                 dev.type === "Firewall" ? <Shield className="h-4 w-4 text-cyan-400" /> :
                 dev.type === "Access Point" ? <Wifi className="h-4 w-4 text-cyan-400" /> :
                 <Router className="h-4 w-4 text-cyan-400" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-sm">{dev.name}</p>
                  <Badge className={"text-xs border-0 " + STATUS_COLORS[dev.status]}>{dev.status}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{dev.type} · {dev.ip}</p>
                {dev.load > 0 && (
                  <div className="flex items-center gap-1 mt-1">
                    <div className="w-20 h-1 bg-muted rounded-full overflow-hidden">
                      <div className={"h-full rounded-full " + (dev.load > 80 ? "bg-red-500" : dev.load > 60 ? "bg-yellow-500" : "bg-green-500")} style={{width: dev.load + "%"}} />
                    </div>
                    <span className="text-xs text-muted-foreground">{dev.load}% load</span>
                  </div>
                )}
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs font-bold text-green-400">{dev.uptime}</p>
                <p className="text-xs text-muted-foreground">uptime</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex gap-2">
        <Button className="flex-1 h-9 bg-cyan-600 text-white border-0 font-bold text-sm" onClick={() => toast.success("Network scan initiated — scanning 254 IPs...")}>
          <Activity className="h-4 w-4 mr-2" />Scan Network
        </Button>
        <Button className="flex-1 h-9 bg-muted font-bold text-sm" onClick={() => toast.success("Add device wizard opened")}>
          <Plus className="h-4 w-4 mr-2" />Add Device
        </Button>
      </div>
    </div>
  );
}
