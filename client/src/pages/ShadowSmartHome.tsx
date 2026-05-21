import { useState } from "react";
import { motion } from "framer-motion";
import {
  Home,
  Wifi,
  Zap,
  Thermometer,
  Lock,
  Camera,
  Lightbulb,
  Wind,
  Shield,
  TrendingDown,
  Plus,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const DEVICES = [
  {
    id: 1,
    name: "Living Room Lights",
    type: "light",
    icon: Lightbulb,
    status: true,
    value: 80,
    room: "Living Room",
    color: "#f59e0b",
  },
  {
    id: 2,
    name: "Smart Thermostat",
    type: "thermostat",
    icon: Thermometer,
    status: true,
    value: 72,
    room: "Whole Home",
    color: "#ef4444",
  },
  {
    id: 3,
    name: "Front Door Lock",
    type: "lock",
    icon: Lock,
    status: false,
    value: 0,
    room: "Entrance",
    color: "#6366f1",
  },
  {
    id: 4,
    name: "Security Camera",
    type: "camera",
    icon: Camera,
    status: true,
    value: 100,
    room: "Exterior",
    color: "#22c55e",
  },
  {
    id: 5,
    name: "AC Unit",
    type: "ac",
    icon: Wind,
    status: false,
    value: 68,
    room: "Bedroom",
    color: "#06b6d4",
  },
  {
    id: 6,
    name: "Solar Panels",
    type: "solar",
    icon: Zap,
    status: true,
    value: 4.4,
    room: "Roof",
    color: "#eab308",
  },
];

const AUTOMATIONS = [
  {
    name: "Morning Routine",
    trigger: "7:00 AM",
    actions: "Lights on 60%, Thermostat 72°F, Coffee on",
    active: true,
  },
  {
    name: "Away Mode",
    trigger: "Leave Home",
    actions: "Lights off, Lock doors, Security on",
    active: true,
  },
  {
    name: "Night Mode",
    trigger: "10:00 PM",
    actions: "Dim lights 20%, Lock doors, AC 68°F",
    active: false,
  },
  {
    name: "Energy Saver",
    trigger: "Peak Hours",
    actions: "Reduce AC, Sell solar to grid for SKY4444",
    active: true,
  },
];

export default function ShadowSmartHome() {
  const [devices, setDevices] = useState(DEVICES);
  const [automations, setAutomations] = useState(AUTOMATIONS);
  const [tab, setTab] = useState<"devices" | "automations" | "energy">(
    "devices"
  );

  const toggleDevice = (id: number) => {
    setDevices(prev =>
      prev.map(d => (d.id === id ? { ...d, status: !d.status } : d))
    );
    const device = devices.find(d => d.id === id);
    toast.success(`${device?.name} turned ${device?.status ? "off" : "on"}`);
  };

  const toggleAutomation = (i: number) => {
    setAutomations(prev =>
      prev.map((a, idx) => (idx === i ? { ...a, active: !a.active } : a))
    );
  };

  const activeDevices = devices.filter(d => d.status).length;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Home className="h-6 w-6 text-blue-400" />
            Smart Home
          </h1>
          <p className="text-sm text-muted-foreground">
            IoT control center — earn SKY4444 from solar energy
          </p>
        </div>
        <Badge className="bg-green-500/10 text-green-400 border-green-500/20 font-bold">
          {activeDevices}/{devices.length} Active
        </Badge>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[
          {
            label: "Active Devices",
            value: `${activeDevices}`,
            icon: Wifi,
            color: "text-blue-400",
          },
          {
            label: "Energy Today",
            value: "4.4 kWh",
            icon: Zap,
            color: "text-yellow-400",
          },
          {
            label: "SKY4444 Earned",
            value: "+44",
            icon: TrendingDown,
            color: "text-green-400",
          },
        ].map(s => (
          <Card key={s.label} className="border-border/50 text-center">
            <CardContent className="py-2.5 px-2">
              <s.icon className={`h-5 w-5 mx-auto mb-1 ${s.color}`} />
              <p className={`font-black text-sm ${s.color}`}>{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-2">
        {(["devices", "automations", "energy"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-blue-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "devices" && (
        <div className="grid grid-cols-2 gap-2">
          {devices.map((device, i) => (
            <motion.div
              key={device.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06 }}
            >
              <Card
                className={`border cursor-pointer transition-all ${device.status ? "border-blue-500/20 bg-blue-900/5" : "border-border/50"}`}
                onClick={() => toggleDevice(device.id)}
              >
                <CardContent className="py-3 px-3">
                  <div className="flex items-start justify-between mb-2">
                    <div
                      className="h-9 w-9 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: device.status
                          ? device.color + "20"
                          : "#ffffff10",
                      }}
                    >
                      <device.icon
                        className="h-4 w-4"
                        style={{ color: device.status ? device.color : "#666" }}
                      />
                    </div>
                    <div
                      className={`h-4 w-8 rounded-full transition-colors relative ${device.status ? "bg-green-500" : "bg-muted"}`}
                    >
                      <div
                        className={`h-3 w-3 rounded-full bg-white absolute top-0.5 transition-all ${device.status ? "right-0.5" : "left-0.5"}`}
                      />
                    </div>
                  </div>
                  <p className="font-bold text-xs leading-tight">
                    {device.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{device.room}</p>
                  {device.status && (
                    <p
                      className="text-xs font-bold mt-1"
                      style={{ color: device.color }}
                    >
                      {device.type === "thermostat"
                        ? `${device.value}°F`
                        : device.type === "solar"
                          ? `${device.value} kW`
                          : `${device.value}%`}
                    </p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
          <Card
            className="border-dashed border-2 border-border/50 cursor-pointer"
            onClick={() => toast.success("Opening device pairing...")}
          >
            <CardContent className="py-3 px-3 flex flex-col items-center justify-center h-full min-h-[100px]">
              <Plus className="h-6 w-6 text-muted-foreground mb-1" />
              <p className="text-xs text-muted-foreground font-bold">
                Add Device
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "automations" && (
        <div className="space-y-2">
          {automations.map((auto, i) => (
            <Card key={auto.name} className="border-border/50">
              <CardContent className="py-3 px-4 flex items-start gap-3">
                <div
                  className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 ${auto.active ? "bg-green-500/10" : "bg-muted"}`}
                >
                  <Shield
                    className={`h-4 w-4 ${auto.active ? "text-green-400" : "text-muted-foreground"}`}
                  />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm">{auto.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Trigger: {auto.trigger}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {auto.actions}
                  </p>
                </div>
                <div
                  className={`h-5 w-9 rounded-full cursor-pointer transition-colors relative shrink-0 mt-1 ${auto.active ? "bg-green-500" : "bg-muted"}`}
                  onClick={() => toggleAutomation(i)}
                >
                  <div
                    className={`h-3.5 w-3.5 rounded-full bg-white absolute top-0.5 transition-all ${auto.active ? "right-0.5" : "left-0.5"}`}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
          <Button
            className="w-full h-10 text-xs bg-blue-600 text-white border-0 font-bold"
            onClick={() => toast.success("Opening automation builder...")}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Automation
          </Button>
        </div>
      )}

      {tab === "energy" && (
        <div className="space-y-3">
          <Card className="border-yellow-500/20 bg-yellow-900/5">
            <CardContent className="py-4 px-4">
              <p className="font-bold text-sm mb-3">Solar Energy Dashboard</p>
              <div className="grid grid-cols-3 gap-2 text-center">
                {[
                  {
                    label: "Generated Today",
                    value: "4.4 kWh",
                    color: "text-yellow-400",
                  },
                  {
                    label: "Consumed",
                    value: "2.8 kWh",
                    color: "text-red-400",
                  },
                  {
                    label: "Sold to Grid",
                    value: "1.6 kWh",
                    color: "text-green-400",
                  },
                ].map(s => (
                  <div key={s.label} className="p-2 rounded-xl bg-muted/50">
                    <p className={`font-black text-sm ${s.color}`}>{s.value}</p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="border-green-500/20 bg-green-900/5">
            <CardContent className="py-4 px-4">
              <p className="font-bold text-sm mb-1">SKY4444 Energy Rewards</p>
              <p className="text-xs text-muted-foreground mb-3">
                Earn SKY4444 by selling excess solar energy back to the grid
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Today", value: "+44 SKY4444" },
                  { label: "This Month", value: "+1,444 SKY4444" },
                  { label: "Rate", value: "27.5 SKY/kWh" },
                  { label: "Total Earned", value: "44,444 SKY4444" },
                ].map(s => (
                  <div
                    key={s.label}
                    className="p-2 rounded-xl bg-muted/50 text-center"
                  >
                    <p className="font-black text-xs text-green-400">
                      {s.value}
                    </p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
