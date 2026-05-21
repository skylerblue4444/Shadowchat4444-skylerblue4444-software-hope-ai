import { useState } from "react";
import {
  Layers,
  DollarSign,
  Clock,
  TrendingUp,
  Shield,
  Zap,
  CheckCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const OFFERS = [
  {
    nft: "ShadowPunk #4444",
    floor: "$8,400",
    offer: "$5,880",
    ltv: "70%",
    apr: "12%",
    duration: "30 days",
    lender: "WhaleVault",
    status: "active",
  },
  {
    nft: "SKY Genesis #001",
    floor: "$12,000",
    offer: "$9,600",
    ltv: "80%",
    apr: "9%",
    duration: "60 days",
    lender: "DeFiBank",
    status: "active",
  },
  {
    nft: "TRUMP Card #777",
    floor: "$3,200",
    offer: "$1,920",
    ltv: "60%",
    apr: "15%",
    duration: "14 days",
    lender: "QuickLend",
    status: "active",
  },
  {
    nft: "ShadowApe #2048",
    floor: "$6,800",
    offer: "$4,760",
    ltv: "70%",
    apr: "11%",
    duration: "30 days",
    lender: "ShadowFi",
    status: "active",
  },
];

export default function ShadowNFTLending() {
  const [borrowed, setBorrowed] = useState<Set<number>>(new Set());
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black flex items-center gap-2">
          <Layers className="h-6 w-6 text-violet-400" />
          NFT Lending
        </h1>
        <p className="text-sm text-muted-foreground">
          Use your NFTs as collateral — borrow SKY4444, ETH, or USDC instantly
        </p>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: "Total Borrowed", value: "$2.1M", color: "text-violet-400" },
          { label: "Active Loans", value: "847", color: "text-green-400" },
          { label: "Avg APR", value: "11.8%", color: "text-blue-400" },
          { label: "Avg LTV", value: "70%", color: "text-orange-400" },
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
        <p className="text-sm font-bold">Loan Offers for Your NFTs</p>
        {OFFERS.map((offer, i) => (
          <Card key={i} className="border-border/50">
            <CardContent className="py-3 px-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-bold text-sm">{offer.nft}</p>
                  <p className="text-xs text-muted-foreground">
                    Floor: {offer.floor} · Lender: {offer.lender}
                  </p>
                </div>
                <div className="text-right shrink-0 ml-2">
                  <p className="font-black text-sm text-green-400">
                    {offer.offer}
                  </p>
                  <p className="text-xs text-muted-foreground">loan amount</p>
                </div>
              </div>
              <div className="flex items-center gap-3 mb-2 text-xs">
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Shield className="h-3 w-3" />
                  LTV: <span className="text-white font-bold">{offer.ltv}</span>
                </span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <TrendingUp className="h-3 w-3" />
                  APR:{" "}
                  <span className="text-orange-400 font-bold">{offer.apr}</span>
                </span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {offer.duration}
                </span>
              </div>
              {borrowed.has(i) ? (
                <div className="flex items-center gap-1 text-xs text-green-400 font-bold">
                  <CheckCircle className="h-3 w-3" />
                  Loan Active — Repay before {offer.duration}
                </div>
              ) : (
                <Button
                  size="sm"
                  className="w-full h-7 bg-violet-600 text-white border-0 font-bold text-xs"
                  onClick={() => {
                    setBorrowed(b => new Set(Array.from(b).concat([i])));
                    toast.success(
                      "Loan of " +
                        offer.offer +
                        " approved! NFT locked as collateral."
                    );
                  }}
                >
                  <Zap className="h-3 w-3 mr-1" />
                  Borrow {offer.offer}
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
