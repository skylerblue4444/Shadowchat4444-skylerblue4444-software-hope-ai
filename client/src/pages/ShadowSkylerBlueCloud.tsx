import {
  Cloud,
  Server,
  Database,
  Cpu,
  HardDrive,
  Zap,
  TrendingUp,
  Shield,
  Plus,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const INSTANCES = [
  {
    name: "Web Server 01",
    type: "t3.medium",
    cpu: "45%",
    ram: "62%",
    status: "running",
    region: "us-east-1",
    cost: "$34/mo",
  },
  {
    name: "Database Primary",
    type: "db.r5.large",
    cpu: "28%",
    ram: "71%",
    status: "running",
    region: "us-east-1",
    cost: "$89/mo",
  },
  {
    name: "Dev Environment",
    type: "t3.small",
    cpu: "12%",
    ram: "38%",
    status: "running",
    region: "us-west-2",
    cost: "$18/mo",
  },
  {
    name: "Backup Server",
    type: "t3.micro",
    cpu: "5%",
    ram: "22%",
    status: "stopped",
    region: "us-east-2",
    cost: "$8/mo",
  },
];

const SERVICES = [
  {
    name: "Managed Cloud Hosting",
    desc: "AWS/Azure/GCP managed infrastructure",
    price: "$199/mo",
    icon: <Cloud className="h-5 w-5 text-sky-400" />,
  },
  {
    name: "Cloud Migration",
    desc: "Move your on-prem to cloud seamlessly",
    price: "$1,499",
    icon: <Server className="h-5 w-5 text-blue-400" />,
  },
  {
    name: "Database Management",
    desc: "MySQL, PostgreSQL, MongoDB managed DBs",
    price: "$149/mo",
    icon: <Database className="h-5 w-5 text-green-400" />,
  },
  {
    name: "Cloud Security",
    desc: "WAF, DDoS protection, SSL management",
    price: "$99/mo",
    icon: <Shield className="h-5 w-5 text-red-400" />,
  },
];

export default function ShadowSkylerBlueCloud() {
  return (
    <div className="space-y-5">
      <div className="rounded-2xl bg-gradient-to-br from-sky-900/30 via-blue-900/20 to-indigo-900/20 border border-sky-500/20 p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-10 w-10 rounded-xl bg-sky-500/10 flex items-center justify-center">
            <Cloud className="h-5 w-5 text-sky-400" />
          </div>
          <div>
            <h1 className="text-xl font-black">Skyler Blue Cloud Services</h1>
            <p className="text-sm text-muted-foreground">
              Managed cloud infrastructure for Arkansas businesses
            </p>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: "Instances", value: "4", color: "text-sky-400" },
            { label: "Monthly Cost", value: "$149", color: "text-green-400" },
            { label: "Uptime", value: "99.97%", color: "text-blue-400" },
            { label: "Regions", value: "3", color: "text-purple-400" },
          ].map(s => (
            <div key={s.label} className="text-center">
              <p className={"font-black text-lg " + s.color}>{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-sm font-bold">Cloud Instances</p>
        {INSTANCES.map((inst, i) => (
          <Card key={i} className="border-border/50">
            <CardContent className="py-3 px-4 flex items-center gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-sm">{inst.name}</p>
                  <Badge
                    className={
                      "text-xs border-0 " +
                      (inst.status === "running"
                        ? "bg-green-500/10 text-green-400"
                        : "bg-red-500/10 text-red-400")
                    }
                  >
                    {inst.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {inst.type} · {inst.region} · CPU: {inst.cpu} · RAM:{" "}
                  {inst.ram}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-black text-sm text-green-400">{inst.cost}</p>
                <Button
                  size="sm"
                  className="h-6 mt-1 bg-sky-600 text-white border-0 font-bold text-xs px-2"
                  onClick={() => toast.success("Managing " + inst.name)}
                >
                  Manage
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="space-y-2">
        <p className="text-sm font-bold">Cloud Services</p>
        {SERVICES.map((s, i) => (
          <Card key={i} className="border-border/50">
            <CardContent className="py-3 px-4 flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-muted flex items-center justify-center shrink-0">
                {s.icon}
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm">{s.name}</p>
                <p className="text-xs text-muted-foreground">{s.desc}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-black text-sm text-sky-400">{s.price}</p>
                <Button
                  size="sm"
                  className="h-6 mt-1 bg-sky-600 text-white border-0 font-bold text-xs px-2"
                  onClick={() =>
                    toast.success("Booking " + s.name + " — call 479-406-7123")
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
  );
}
