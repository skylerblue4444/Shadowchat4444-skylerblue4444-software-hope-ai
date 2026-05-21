import {
  Monitor,
  Cpu,
  HardDrive,
  Wifi,
  Plus,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const ASSETS = [
  {
    name: "Dell OptiPlex 7090",
    type: "Desktop",
    serial: "SN-4847291",
    user: "John Smith",
    status: "active",
    warranty: "2027-03",
    value: "$1,200",
  },
  {
    name: "HP EliteBook 840 G9",
    type: "Laptop",
    serial: "SN-2938471",
    user: "Jane Doe",
    status: "active",
    warranty: "2026-11",
    value: "$1,800",
  },
  {
    name: "Cisco Catalyst 2960",
    type: "Switch",
    serial: "SN-1847362",
    user: "IT Dept",
    status: "active",
    warranty: "2025-06",
    value: "$2,400",
  },
  {
    name: "HP LaserJet Pro M404",
    type: "Printer",
    serial: "SN-9283741",
    user: "Reception",
    status: "active",
    warranty: "2026-03",
    value: "$450",
  },
  {
    name: "APC UPS 1500VA",
    type: "UPS",
    serial: "SN-8374621",
    user: "Server Room",
    status: "warning",
    warranty: "2024-12",
    value: "$380",
  },
  {
    name: "Dell PowerEdge R750",
    type: "Server",
    serial: "SN-7463821",
    user: "IT Dept",
    status: "active",
    warranty: "2028-06",
    value: "$12,000",
  },
];

const TYPE_ICONS: Record<string, React.ReactNode> = {
  Desktop: <Monitor className="h-4 w-4 text-blue-400" />,
  Laptop: <Monitor className="h-4 w-4 text-purple-400" />,
  Switch: <Wifi className="h-4 w-4 text-cyan-400" />,
  Printer: <Cpu className="h-4 w-4 text-orange-400" />,
  UPS: <HardDrive className="h-4 w-4 text-yellow-400" />,
  Server: <HardDrive className="h-4 w-4 text-green-400" />,
};

export default function ShadowITAssets() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black flex items-center gap-2">
          <Monitor className="h-6 w-6 text-blue-400" />
          IT Asset Management
        </h1>
        <p className="text-sm text-muted-foreground">
          Skyler Blue IT Resolutions — full hardware inventory and lifecycle
          tracking
        </p>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: "Total Assets", value: "6", color: "text-blue-400" },
          { label: "Total Value", value: "$18.2K", color: "text-green-400" },
          { label: "Expiring Soon", value: "2", color: "text-yellow-400" },
          { label: "Avg Age", value: "2.1 yrs", color: "text-purple-400" },
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
        {ASSETS.map((a, i) => (
          <Card key={i} className="border-border/50">
            <CardContent className="py-3 px-4 flex items-center gap-3">
              <div className="h-8 w-8 rounded-xl bg-muted flex items-center justify-center shrink-0">
                {TYPE_ICONS[a.type]}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-sm">{a.name}</p>
                  <Badge
                    className={
                      "text-xs border-0 " +
                      (a.status === "active"
                        ? "bg-green-500/10 text-green-400"
                        : "bg-yellow-500/10 text-yellow-400")
                    }
                  >
                    {a.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {a.type} · S/N: {a.serial} · {a.user}
                </p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Warranty: {a.warranty}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-black text-sm text-green-400">{a.value}</p>
                <Button
                  size="sm"
                  className="h-6 mt-1 bg-blue-600 text-white border-0 font-bold text-xs px-2"
                  onClick={() => toast.success("Viewing asset: " + a.name)}
                >
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Button
        className="w-full h-10 bg-blue-600 text-white border-0 font-bold"
        onClick={() => toast.success("Add new asset form opened")}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add New Asset
      </Button>
    </div>
  );
}
