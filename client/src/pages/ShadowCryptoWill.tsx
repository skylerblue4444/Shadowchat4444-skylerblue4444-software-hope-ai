import { useState } from "react";
import {
  FileText,
  Heart,
  Lock,
  Users,
  CheckCircle,
  Shield,
  Zap,
  Clock,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const BENEFICIARIES = [
  {
    name: "Sarah Spiller",
    relation: "Spouse",
    allocation: "50%",
    assets: "BTC, SKY4444, ETH",
    wallet: "0x1a2b...3c4d",
  },
  {
    name: "Tyler Spiller",
    relation: "Son",
    allocation: "30%",
    assets: "SKY4444, NFTs",
    wallet: "0x5e6f...7g8h",
  },
  {
    name: "Charity DAO",
    relation: "Charity",
    allocation: "20%",
    assets: "TRUMP, DOGE",
    wallet: "0x9i0j...1k2l",
  },
];

export default function ShadowCryptoWill() {
  const [step, setStep] = useState(1);
  const [notarized, setNotarized] = useState(false);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black flex items-center gap-2">
          <FileText className="h-6 w-6 text-rose-400" />
          Crypto Will & Inheritance
        </h1>
        <p className="text-sm text-muted-foreground">
          Secure your digital legacy — on-chain inheritance planning with
          time-locked smart contracts
        </p>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: "Total Estate", value: "$284K", color: "text-rose-400" },
          { label: "Beneficiaries", value: "3", color: "text-green-400" },
          { label: "Assets Covered", value: "8", color: "text-blue-400" },
          {
            label: "Status",
            value: notarized ? "Active" : "Draft",
            color: notarized ? "text-green-400" : "text-yellow-400",
          },
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
        <p className="text-sm font-bold">Beneficiaries</p>
        {BENEFICIARIES.map((b, i) => (
          <Card key={i} className="border-border/50">
            <CardContent className="py-3 px-4 flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-rose-500/10 flex items-center justify-center shrink-0">
                <Heart className="h-4 w-4 text-rose-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-sm">{b.name}</p>
                  <Badge className="bg-rose-500/10 text-rose-400 border-0 text-xs">
                    {b.relation}
                  </Badge>
                  <Badge className="bg-green-500/10 text-green-400 border-0 text-xs">
                    {b.allocation}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Assets: {b.assets}
                </p>
                <p className="text-xs text-muted-foreground font-mono">
                  {b.wallet}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="border-border/50">
        <CardContent className="py-3 px-4">
          <p className="font-bold text-sm mb-2 flex items-center gap-2">
            <Clock className="h-4 w-4 text-orange-400" />
            Dead Man's Switch
          </p>
          <p className="text-xs text-muted-foreground mb-2">
            If you don't check in within 365 days, assets automatically transfer
            to beneficiaries via smart contract.
          </p>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
              <div className="h-full w-3/4 bg-green-500 rounded-full" />
            </div>
            <span className="text-xs text-green-400 font-bold">
              274 days remaining
            </span>
          </div>
        </CardContent>
      </Card>
      <div className="flex gap-2">
        <Button
          className="flex-1 h-10 bg-rose-600 text-white border-0 font-bold"
          onClick={() => {
            setNotarized(true);
            toast.success(
              "Will notarized on-chain — transaction hash: 0xabc...def"
            );
          }}
        >
          <Shield className="h-4 w-4 mr-2" />
          {notarized ? "Will Active ✓" : "Notarize On-Chain"}
        </Button>
        <Button
          className="flex-1 h-10 bg-muted font-bold"
          onClick={() =>
            toast.success("Check-in recorded — 365 day timer reset")
          }
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          Check In
        </Button>
      </div>
    </div>
  );
}
