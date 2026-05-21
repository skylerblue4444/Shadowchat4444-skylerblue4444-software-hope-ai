import { useState } from "react";
import {
  CheckCircle,
  Zap,
  TrendingUp,
  Shield,
  Users,
  Star,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
export default function ShadowCryptoOptionsTrading() {
  const [selected, setSelected] = useState("calls");
  const options = [
    {
      strike: "$45,000",
      expiry: "Jun 27",
      type: "CALL",
      premium: "$847",
      iv: "72%",
      delta: "0.54",
    },
    {
      strike: "$50,000",
      expiry: "Jun 27",
      type: "CALL",
      premium: "$412",
      iv: "68%",
      delta: "0.38",
    },
    {
      strike: "$40,000",
      expiry: "Jun 27",
      type: "PUT",
      premium: "$623",
      iv: "74%",
      delta: "-0.47",
    },
    {
      strike: "$35,000",
      expiry: "Jun 27",
      type: "PUT",
      premium: "$247",
      iv: "71%",
      delta: "-0.28",
    },
  ];
  const stats = [
    { label: "Open Interest", value: "$2.4B", color: "text-purple-400" },
    { label: "24h Volume", value: "$847M", color: "text-green-400" },
    { label: "Put/Call Ratio", value: "0.74", color: "text-blue-400" },
    { label: "Max Pain", value: "$47K", color: "text-orange-400" },
  ];
  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-black">📈 Options Trading</h1>
          <p className="text-sm text-muted-foreground">
            Trade BTC, ETH, and SKY4444 options with full Greeks analytics and
            strategy builder
          </p>
        </div>
        <Badge className="bg-purple-600 text-white shrink-0">Advanced</Badge>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {stats.map(s => (
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
          <p className="font-bold text-sm mb-3">BTC Options Chain</p>
          <div className="space-y-2">
            {options.map(o => (
              <div
                key={o.strike + o.type}
                className="flex items-center justify-between text-xs border-b border-border/30 pb-2"
              >
                <span className="font-bold">{o.strike}</span>
                <Badge
                  className={
                    o.type === "CALL"
                      ? "bg-green-900 text-green-300"
                      : "bg-red-900 text-red-300"
                  }
                >
                  {o.type}
                </Badge>
                <span className="text-muted-foreground">{o.expiry}</span>
                <span className="font-bold text-yellow-400">{o.premium}</span>
                <span className="text-muted-foreground">IV: {o.iv}</span>
                <span className="text-muted-foreground">Δ {o.delta}</span>
                <Button
                  size="sm"
                  className="h-6 text-xs bg-indigo-600 text-white border-0"
                  onClick={() => toast.success("Order placed!")}
                >
                  Buy
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
