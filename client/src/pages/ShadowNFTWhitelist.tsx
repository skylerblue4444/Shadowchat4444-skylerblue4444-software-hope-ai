import { useState } from "react";
import {
  Star,
  Clock,
  Users,
  CheckCircle,
  AlertCircle,
  Zap,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const DROPS = [
  {
    name: "Shadow Genesis",
    total: 10000,
    wlSpots: 500,
    wlPrice: "0.05 ETH",
    pubPrice: "0.08 ETH",
    date: "May 20, 2026",
    status: "whitelist",
    joined: true,
  },
  {
    name: "SKY4444 Founders",
    total: 4444,
    wlSpots: 1000,
    wlPrice: "Free",
    pubPrice: "200 SKY",
    date: "May 25, 2026",
    status: "whitelist",
    joined: false,
  },
  {
    name: "ShadowPunks",
    total: 8888,
    wlSpots: 2000,
    wlPrice: "0.02 ETH",
    pubPrice: "0.04 ETH",
    date: "Jun 1, 2026",
    status: "upcoming",
    joined: false,
  },
  {
    name: "TRUMP NFT Series",
    total: 4700,
    wlSpots: 470,
    wlPrice: "100 TRUMP",
    pubPrice: "200 TRUMP",
    date: "Jun 10, 2026",
    status: "upcoming",
    joined: false,
  },
];

export default function ShadowNFTWhitelist() {
  const [joined, setJoined] = useState<Record<string, boolean>>({
    "Shadow Genesis": true,
  });
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black flex items-center gap-2">
          <Star className="h-6 w-6 text-amber-400" />
          NFT Whitelist
        </h1>
        <p className="text-sm text-muted-foreground">
          Secure early access to upcoming NFT drops at whitelist prices
        </p>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: "Upcoming Drops", value: "4", color: "text-amber-400" },
          { label: "WL Spots", value: "3,970", color: "text-green-400" },
          { label: "Joined", value: "1", color: "text-blue-400" },
          { label: "Avg Discount", value: "40%", color: "text-purple-400" },
        ].map(s => (
          <Card key={s.label} className="border-border/50 text-center">
            <CardContent className="py-3 px-2">
              <p className={"font-black text-lg " + s.color}>{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="space-y-3">
        {DROPS.map((drop, i) => (
          <Card
            key={i}
            className={
              "border-border/50 " +
              (joined[drop.name] || drop.joined ? "border-amber-500/30" : "")
            }
          >
            <CardContent className="py-4 px-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-bold">{drop.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {drop.total.toLocaleString()} total · {drop.wlSpots} WL
                    spots
                  </p>
                </div>
                <Badge
                  className={
                    "text-xs border-0 " +
                    (drop.status === "whitelist"
                      ? "bg-amber-500/10 text-amber-400"
                      : "bg-blue-500/10 text-blue-400")
                  }
                >
                  {drop.status}
                </Badge>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-3 text-xs">
                <div className="bg-muted rounded-lg p-2 text-center">
                  <p className="text-muted-foreground">WL Price</p>
                  <p className="font-bold text-green-400">{drop.wlPrice}</p>
                </div>
                <div className="bg-muted rounded-lg p-2 text-center">
                  <p className="text-muted-foreground">Public Price</p>
                  <p className="font-bold">{drop.pubPrice}</p>
                </div>
                <div className="bg-muted rounded-lg p-2 text-center">
                  <p className="text-muted-foreground">Mint Date</p>
                  <p className="font-bold">{drop.date.split(",")[0]}</p>
                </div>
              </div>
              {joined[drop.name] || drop.joined ? (
                <div className="flex items-center gap-2 text-green-400 text-sm font-bold">
                  <CheckCircle className="h-4 w-4" />
                  Whitelisted — You're in!
                </div>
              ) : (
                <Button
                  size="sm"
                  className="w-full h-8 bg-amber-600 text-white border-0 font-bold text-xs"
                  onClick={() => {
                    setJoined(j => ({ ...j, [drop.name]: true }));
                    toast.success("Joined whitelist: " + drop.name);
                  }}
                >
                  <Zap className="h-3.5 w-3.5 mr-1.5" />
                  Join Whitelist
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
