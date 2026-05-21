import { useState } from "react";
import {
  FileText,
  Shield,
  Users,
  Lock,
  CheckCircle,
  AlertTriangle,
  Plus,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const ASSETS = [
  {
    asset: "SKY4444",
    amount: "500,000",
    value: "$42,000",
    beneficiary: "Sarah Spiller",
    pct: 50,
  },
  {
    asset: "BTC",
    amount: "0.5",
    value: "$21,000",
    beneficiary: "James Spiller",
    pct: 25,
  },
  {
    asset: "ETH",
    amount: "5.0",
    value: "$16,800",
    beneficiary: "Charity DAO",
    pct: 20,
  },
  {
    asset: "TRUMP",
    amount: "10,000",
    value: "$4,200",
    beneficiary: "Estate Reserve",
    pct: 5,
  },
];

export default function ShadowWills() {
  const [tab, setTab] = useState("assets");
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black flex items-center gap-2">
          <FileText className="h-6 w-6 text-amber-400" />
          Crypto Wills & Inheritance
        </h1>
        <p className="text-sm text-muted-foreground">
          Secure your digital legacy — automated crypto inheritance with smart
          contracts
        </p>
      </div>
      <div className="relative rounded-xl bg-amber-500/5 border border-amber-500/20 p-4">
        <div className="flex items-start gap-3">
          <Shield className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-sm text-amber-400">
              Your Digital Will is Active
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Smart contract deployed · Last updated May 15, 2026 · $84,000
              total estate value
            </p>
          </div>
          <Badge className="bg-green-500/10 text-green-400 border-0 text-xs ml-auto shrink-0">
            Active
          </Badge>
        </div>
      </div>
      <div className="flex gap-2">
        {["assets", "beneficiaries", "conditions"].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={
              "px-3 py-1.5 rounded-full text-xs font-medium transition-colors capitalize " +
              (tab === t
                ? "bg-amber-600 text-white"
                : "bg-muted text-muted-foreground")
            }
          >
            {t}
          </button>
        ))}
      </div>
      {tab === "assets" && (
        <div className="space-y-2">
          {ASSETS.map((a, i) => (
            <Card key={i} className="border-border/50">
              <CardContent className="py-3 px-4 flex items-center gap-3">
                <div className="h-8 w-8 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                  <span className="text-xs font-black text-amber-400">
                    {a.asset.slice(0, 3)}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm">
                    {a.amount} {a.asset}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    → {a.beneficiary}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-black text-sm text-green-400">{a.value}</p>
                  <p className="text-xs text-muted-foreground">{a.pct}%</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      {tab === "beneficiaries" && (
        <div className="space-y-2">
          {[
            "Sarah Spiller — 50% — Primary Beneficiary",
            "James Spiller — 25% — Secondary Beneficiary",
            "Charity DAO — 20% — Charitable Bequest",
            "Estate Reserve — 5% — Legal/Admin Costs",
          ].map((b, i) => (
            <Card key={i} className="border-border/50">
              <CardContent className="py-3 px-4 flex items-center gap-2">
                <Users className="h-4 w-4 text-amber-400 shrink-0" />
                <p className="text-sm">{b}</p>
              </CardContent>
            </Card>
          ))}
          <Button
            className="w-full h-9 bg-amber-600 text-white border-0 font-bold text-sm"
            onClick={() => toast.success("Add beneficiary form opened")}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Beneficiary
          </Button>
        </div>
      )}
      {tab === "conditions" && (
        <div className="space-y-2">
          {[
            {
              condition: "Inactivity Trigger",
              detail: "Release after 365 days of wallet inactivity",
              status: "active",
            },
            {
              condition: "Multi-Sig Approval",
              detail: "Requires 2-of-3 executor signatures",
              status: "active",
            },
            {
              condition: "Time Lock",
              detail: "Beneficiaries must wait 30 days after trigger",
              status: "active",
            },
          ].map((c, i) => (
            <Card key={i} className="border-border/50">
              <CardContent className="py-3 px-4 flex items-center gap-3">
                <Lock className="h-4 w-4 text-amber-400 shrink-0" />
                <div className="flex-1">
                  <p className="font-bold text-sm">{c.condition}</p>
                  <p className="text-xs text-muted-foreground">{c.detail}</p>
                </div>
                <Badge className="bg-green-500/10 text-green-400 border-0 text-xs">
                  {c.status}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
