import { useState } from "react";
import {
  FileText,
  DollarSign,
  TrendingDown,
  Download,
  Calculator,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const TAX_EVENTS = [
  {
    type: "Short-Term Gain",
    asset: "SKY4444",
    amount: "+$4,200",
    date: "Mar 15, 2026",
    taxable: true,
    rate: "37%",
    tax: "$1,554",
  },
  {
    type: "Long-Term Gain",
    asset: "BTC",
    amount: "+$12,400",
    date: "Jan 8, 2026",
    taxable: true,
    rate: "20%",
    tax: "$2,480",
  },
  {
    type: "Short-Term Loss",
    asset: "DOGE",
    amount: "-$840",
    date: "Feb 22, 2026",
    taxable: false,
    rate: "0%",
    tax: "-$840 offset",
  },
  {
    type: "Mining Income",
    asset: "ETH",
    amount: "+$2,100",
    date: "Apr 1, 2026",
    taxable: true,
    rate: "37%",
    tax: "$777",
  },
  {
    type: "Staking Reward",
    asset: "SKY4444",
    amount: "+$680",
    date: "May 1, 2026",
    taxable: true,
    rate: "37%",
    tax: "$251.60",
  },
];

export default function ShadowCryptoTax2() {
  const [exported, setExported] = useState(false);
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black flex items-center gap-2">
          <Calculator className="h-6 w-6 text-amber-400" />
          Crypto Tax Center
        </h1>
        <p className="text-sm text-muted-foreground">
          Automated tax reporting for all your ShadowChat crypto activity — IRS
          Form 8949 ready
        </p>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: "Total Gains", value: "+$18.5K", color: "text-green-400" },
          { label: "Total Losses", value: "-$840", color: "text-red-400" },
          { label: "Est. Tax Owed", value: "$4,222", color: "text-amber-400" },
          { label: "Tax Events", value: "247", color: "text-blue-400" },
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
        <p className="text-sm font-bold">Tax Events (2026)</p>
        {TAX_EVENTS.map((e, i) => (
          <Card key={i} className="border-border/50">
            <CardContent className="py-3 px-4 flex items-center gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <Badge
                    className={
                      "text-xs border-0 " +
                      (e.taxable
                        ? "bg-amber-500/10 text-amber-400"
                        : "bg-green-500/10 text-green-400")
                    }
                  >
                    {e.type}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {e.date}
                  </span>
                </div>
                <p className="font-bold text-sm">
                  {e.asset} —{" "}
                  <span
                    className={
                      e.amount.startsWith("+")
                        ? "text-green-400"
                        : "text-red-400"
                    }
                  >
                    {e.amount}
                  </span>
                </p>
                <p className="text-xs text-muted-foreground">
                  Tax Rate: {e.rate} · Est. Tax: {e.tax}
                </p>
              </div>
              {e.taxable ? (
                <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
              ) : (
                <CheckCircle className="h-4 w-4 text-green-400 shrink-0" />
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex gap-2">
        <Button
          className="flex-1 h-10 bg-amber-600 text-white border-0 font-bold"
          onClick={() => {
            setExported(true);
            toast.success("Form 8949 CSV exported — ready for TurboTax or CPA");
          }}
        >
          <Download className="h-4 w-4 mr-2" />
          {exported ? "Exported!" : "Export Form 8949"}
        </Button>
        <Button
          className="flex-1 h-10 bg-muted font-bold"
          onClick={() =>
            toast.success(
              "Connecting to CPA network — 3 CPAs available in your area"
            )
          }
        >
          Connect CPA
        </Button>
      </div>
    </div>
  );
}
