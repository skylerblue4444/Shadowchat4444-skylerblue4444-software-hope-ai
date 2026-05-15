import { useState } from "react";
import { Layers, DollarSign, Users, TrendingUp, Zap, CheckCircle, Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const FRACTIONS = [
  { nft: "ShadowPunk #4444",  totalValue: "$84,000", fractions: "10,000", pricePerFrac: "$8.40",  owned: "250",   yield: "4.2%", holders: 847  },
  { nft: "Bored Ape #8888",   totalValue: "$240,000",fractions: "100,000",pricePerFrac: "$2.40",  owned: "1,000", yield: "2.8%", holders: 2341 },
  { nft: "CryptoPunk #9999",  totalValue: "$420,000",fractions: "50,000", pricePerFrac: "$8.40",  owned: "0",     yield: "3.5%", holders: 1204 },
];

export default function ShadowNFTFractionalize() {
  const [buying, setBuying] = useState<Set<number>>(new Set());
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black flex items-center gap-2"><Layers className="h-6 w-6 text-lime-400" />NFT Fractionalization</h1>
        <p className="text-sm text-muted-foreground">Own a piece of blue-chip NFTs — fractionalized ownership with yield</p>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Total Value Locked", value: "$744K",  color: "text-lime-400"   },
          { label: "Fraction Holders",   value: "4,392",  color: "text-green-400"  },
          { label: "Avg Yield",          value: "3.5%",   color: "text-blue-400"   },
        ].map(s => (
          <Card key={s.label} className="border-border/50 text-center">
            <CardContent className="py-3 px-2">
              <p className={"font-black text-xl " + s.color}>{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="space-y-3">
        {FRACTIONS.map((f, i) => (
          <Card key={i} className="border-border/50">
            <CardContent className="py-3 px-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-bold text-sm">{f.nft}</p>
                  <p className="text-xs text-muted-foreground">Total Value: {f.totalValue} · {f.fractions} fractions</p>
                </div>
                <div className="text-right shrink-0 ml-2">
                  <p className="font-black text-sm text-lime-400">{f.pricePerFrac}</p>
                  <p className="text-xs text-muted-foreground">per fraction</p>
                </div>
              </div>
              <div className="flex items-center gap-3 mb-2 text-xs">
                <span className="flex items-center gap-1 text-muted-foreground"><TrendingUp className="h-3 w-3 text-green-400" />Yield: <span className="text-green-400 font-bold">{f.yield}</span></span>
                <span className="flex items-center gap-1 text-muted-foreground"><Users className="h-3 w-3" />{f.holders} holders</span>
                {f.owned !== "0" && <span className="flex items-center gap-1 text-lime-400 font-bold"><CheckCircle className="h-3 w-3" />You own: {f.owned}</span>}
              </div>
              <Button size="sm" className="w-full h-7 bg-lime-600 text-white border-0 font-bold text-xs"
                onClick={() => { setBuying(b => new Set(Array.from(b).concat([i]))); toast.success("Buying 10 fractions of " + f.nft + " for " + (parseFloat(f.pricePerFrac.replace("$","")) * 10).toFixed(2)); }}>
                <Zap className="h-3 w-3 mr-1" />Buy Fractions
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
