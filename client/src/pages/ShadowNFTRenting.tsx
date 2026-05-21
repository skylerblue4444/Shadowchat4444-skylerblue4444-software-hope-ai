import { useState } from "react";
import {
  Key,
  Clock,
  DollarSign,
  CheckCircle,
  Zap,
  Star,
  Shield,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const RENTALS = [
  {
    nft: "ShadowPunk #4444",
    owner: "CryptoWhale",
    daily: "$42",
    weekly: "$245",
    use: "Gaming avatar, Discord flex",
    rented: false,
  },
  {
    nft: "SKY Genesis #001",
    owner: "SkylerBlue",
    daily: "$85",
    weekly: "$490",
    use: "Exclusive club access, voting rights",
    rented: true,
  },
  {
    nft: "TRUMP Card #777",
    owner: "MAGAHolder",
    daily: "$18",
    weekly: "$98",
    use: "Meme rights, community access",
    rented: false,
  },
  {
    nft: "ShadowApe #2048",
    owner: "DegenKing",
    daily: "$34",
    weekly: "$189",
    use: "Metaverse wearable, staking boost",
    rented: false,
  },
];

export default function ShadowNFTRenting() {
  const [rented, setRented] = useState<Set<number>>(new Set([1]));
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black flex items-center gap-2">
          <Key className="h-6 w-6 text-amber-400" />
          NFT Renting
        </h1>
        <p className="text-sm text-muted-foreground">
          Rent blue-chip NFTs for gaming, access, and status — without buying
        </p>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: "Available", value: "1,247", color: "text-amber-400" },
          { label: "Active Rents", value: "384", color: "text-green-400" },
          { label: "Avg Daily", value: "$28", color: "text-blue-400" },
          { label: "Total Volume", value: "$84K", color: "text-purple-400" },
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
        {RENTALS.map((r, i) => (
          <Card key={i} className="border-border/50">
            <CardContent className="py-3 px-4">
              <div className="flex items-start justify-between mb-1">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-sm">{r.nft}</p>
                    {rented.has(i) && (
                      <Badge className="bg-green-500/10 text-green-400 border-0 text-xs">
                        Rented
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Owner: {r.owner}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Use for: {r.use}
                  </p>
                </div>
                <div className="text-right shrink-0 ml-2">
                  <p className="font-black text-sm text-amber-400">
                    {r.daily}/day
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {r.weekly}/week
                  </p>
                </div>
              </div>
              {rented.has(i) ? (
                <Button
                  size="sm"
                  className="w-full h-7 mt-1 bg-red-600/20 text-red-400 border-0 font-bold text-xs"
                  onClick={() => {
                    setRented(r2 => {
                      const n = new Set(r2);
                      n.delete(i);
                      return n;
                    });
                    toast.success("Rental returned");
                  }}
                >
                  Return NFT
                </Button>
              ) : (
                <div className="flex gap-2 mt-1">
                  <Button
                    size="sm"
                    className="flex-1 h-7 bg-amber-600 text-white border-0 font-bold text-xs"
                    onClick={() => {
                      setRented(r2 => new Set(Array.from(r2).concat([i])));
                      toast.success(
                        "Renting " +
                          r.nft +
                          " for 1 day — " +
                          r.daily +
                          " charged"
                      );
                    }}
                  >
                    <Zap className="h-3 w-3 mr-1" />
                    Rent 1 Day
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 h-7 bg-purple-600 text-white border-0 font-bold text-xs"
                    onClick={() => {
                      setRented(r2 => new Set(Array.from(r2).concat([i])));
                      toast.success(
                        "Renting " +
                          r.nft +
                          " for 1 week — " +
                          r.weekly +
                          " charged"
                      );
                    }}
                  >
                    Rent 1 Week
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
