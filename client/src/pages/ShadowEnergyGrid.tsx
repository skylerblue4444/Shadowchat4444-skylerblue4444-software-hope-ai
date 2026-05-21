import { Zap, Sun, Wind, Battery, TrendingUp, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const GRID_NODES = [
  {
    region: "North America",
    renewable: 68,
    demand: 4200,
    price: "$0.042/kWh",
    status: "optimal",
  },
  {
    region: "Europe",
    renewable: 74,
    demand: 3800,
    price: "$0.038/kWh",
    status: "optimal",
  },
  {
    region: "Asia Pacific",
    renewable: 45,
    demand: 6100,
    price: "$0.051/kWh",
    status: "stressed",
  },
  {
    region: "Middle East",
    renewable: 22,
    demand: 2900,
    price: "$0.029/kWh",
    status: "optimal",
  },
];

export default function ShadowEnergyGrid() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black flex items-center gap-2">
          <Zap className="h-6 w-6 text-yellow-400" />
          Energy Grid
        </h1>
        <p className="text-sm text-muted-foreground">
          Decentralized energy trading with SKY4444 tokens — buy, sell, and
          trade renewable energy credits
        </p>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: "Grid Nodes", value: "2,847", color: "text-yellow-400" },
          { label: "Renewable", value: "61%", color: "text-green-400" },
          { label: "SKY Earned", value: "142K", color: "text-blue-400" },
          { label: "CO₂ Saved", value: "8.4MT", color: "text-emerald-400" },
        ].map(s => (
          <Card key={s.label} className="border-border/50 text-center">
            <CardContent className="py-3 px-2">
              <p className={"font-black text-lg " + s.color}>{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[
          {
            icon: <Sun className="h-5 w-5 text-yellow-400" />,
            label: "Solar",
            value: "42%",
            bg: "bg-yellow-500/10",
          },
          {
            icon: <Wind className="h-5 w-5 text-blue-400" />,
            label: "Wind",
            value: "31%",
            bg: "bg-blue-500/10",
          },
          {
            icon: <Battery className="h-5 w-5 text-green-400" />,
            label: "Storage",
            value: "27%",
            bg: "bg-green-500/10",
          },
        ].map(s => (
          <Card key={s.label} className="border-border/50">
            <CardContent className="py-3 px-3 text-center">
              <div
                className={
                  "h-10 w-10 rounded-xl " +
                  s.bg +
                  " flex items-center justify-center mx-auto mb-2"
                }
              >
                {s.icon}
              </div>
              <p className="font-black text-lg">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="space-y-2">
        <p className="text-sm font-bold">Regional Grid Status</p>
        {GRID_NODES.map((node, i) => (
          <Card key={i} className="border-border/50">
            <CardContent className="py-3 px-4 flex items-center gap-3">
              <Globe className="h-5 w-5 text-yellow-400 shrink-0" />
              <div className="flex-1">
                <p className="font-bold text-sm">{node.region}</p>
                <div className="flex items-center gap-1 mt-1">
                  <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: node.renewable + "%" }}
                    />
                  </div>
                  <span className="text-xs text-green-400 font-bold w-8">
                    {node.renewable}%
                  </span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="font-bold text-xs text-yellow-400">
                  {node.price}
                </p>
                <p
                  className={
                    "text-xs " +
                    (node.status === "optimal"
                      ? "text-green-400"
                      : "text-red-400")
                  }
                >
                  {node.status}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Button
        className="w-full h-10 bg-yellow-600 text-white border-0 font-bold"
        onClick={() =>
          toast.success(
            "Energy trading position opened — earning SKY4444 rewards!"
          )
        }
      >
        <Zap className="h-4 w-4 mr-2" />
        Trade Energy Credits
      </Button>
    </div>
  );
}
