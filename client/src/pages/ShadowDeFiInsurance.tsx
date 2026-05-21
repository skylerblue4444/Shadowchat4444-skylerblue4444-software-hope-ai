import { useState } from "react";
import {
  Shield,
  DollarSign,
  CheckCircle,
  AlertTriangle,
  Zap,
  TrendingUp,
  Lock,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const POLICIES = [
  {
    name: "Smart Contract Cover",
    coverage: "$50,000",
    premium: "$25/mo",
    risk: "low",
    desc: "Protection against smart contract exploits and bugs",
    active: true,
  },
  {
    name: "Exchange Hack Cover",
    coverage: "$25,000",
    premium: "$18/mo",
    risk: "medium",
    desc: "Coverage if your exchange account is hacked or drained",
    active: true,
  },
  {
    name: "Stablecoin De-peg",
    coverage: "$10,000",
    premium: "$8/mo",
    risk: "low",
    desc: "Protection if USDC, USDT, or DAI loses its peg",
    active: false,
  },
  {
    name: "NFT Floor Price Guard",
    coverage: "$15,000",
    premium: "$35/mo",
    risk: "high",
    desc: "Pays out if your NFT collection floor drops 50%+",
    active: false,
  },
  {
    name: "Wallet Drain Cover",
    coverage: "$100,000",
    premium: "$45/mo",
    risk: "medium",
    desc: "Full wallet recovery if drained by phishing or malware",
    active: true,
  },
];

const RISK_COLORS: Record<string, string> = {
  low: "bg-green-500/10 text-green-400",
  medium: "bg-yellow-500/10 text-yellow-400",
  high: "bg-red-500/10 text-red-400",
};

export default function ShadowDeFiInsurance() {
  const [active, setActive] = useState<Set<number>>(new Set([0, 1, 4]));
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black flex items-center gap-2">
          <Shield className="h-6 w-6 text-emerald-400" />
          DeFi Insurance
        </h1>
        <p className="text-sm text-muted-foreground">
          Decentralized coverage for your crypto assets — powered by SKY4444
          risk pools
        </p>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {[
          {
            label: "Total Coverage",
            value: "$200K",
            color: "text-emerald-400",
          },
          { label: "Active Policies", value: "3", color: "text-green-400" },
          { label: "Monthly Premium", value: "$88", color: "text-blue-400" },
          { label: "Claims Paid", value: "$1.2M", color: "text-orange-400" },
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
        {POLICIES.map((p, i) => (
          <Card
            key={i}
            className={
              "border-border/50 " +
              (active.has(i) ? "border-emerald-500/30" : "")
            }
          >
            <CardContent className="py-3 px-4">
              <div className="flex items-start justify-between mb-1">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-bold text-sm">{p.name}</p>
                    <Badge
                      className={"text-xs border-0 " + RISK_COLORS[p.risk]}
                    >
                      {p.risk} risk
                    </Badge>
                    {active.has(i) && (
                      <Badge className="bg-emerald-500/10 text-emerald-400 border-0 text-xs">
                        Active
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{p.desc}</p>
                </div>
                <div className="text-right shrink-0 ml-2">
                  <p className="font-black text-sm text-emerald-400">
                    {p.coverage}
                  </p>
                  <p className="text-xs text-muted-foreground">{p.premium}</p>
                </div>
              </div>
              <Button
                size="sm"
                className={
                  "w-full h-7 mt-1 font-bold text-xs border-0 " +
                  (active.has(i)
                    ? "bg-red-600/20 text-red-400"
                    : "bg-emerald-600 text-white")
                }
                onClick={() => {
                  setActive(a => {
                    const n = new Set(a);
                    n.has(i) ? n.delete(i) : n.add(i);
                    return n;
                  });
                  toast.success(
                    active.has(i)
                      ? "Policy cancelled"
                      : "Policy activated — " + p.premium + " billed monthly"
                  );
                }}
              >
                {active.has(i) ? (
                  "Cancel Policy"
                ) : (
                  <>
                    <Zap className="h-3 w-3 mr-1" />
                    Activate Policy
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
