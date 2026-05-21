import { useState } from "react";
import { motion } from "framer-motion";
import { Crown, TrendingUp, DollarSign, Image, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const COLLECTIONS = [
  {
    name: "ShadowPunks",
    items: 10000,
    royalty: "7.5%",
    totalEarned: "$42,840",
    pendingClaim: "$840.20",
    sales30d: 142,
    floor: "0.42 ETH",
  },
  {
    name: "SkyApes",
    items: 5000,
    royalty: "5.0%",
    totalEarned: "$18,200",
    pendingClaim: "$420.00",
    sales30d: 89,
    floor: "0.18 ETH",
  },
  {
    name: "ShadowArt 1/1s",
    items: 100,
    royalty: "15%",
    totalEarned: "$24,000",
    pendingClaim: "$1,200.00",
    sales30d: 8,
    floor: "0.80 ETH",
  },
];

const RECENT_SALES = [
  {
    collection: "ShadowPunks",
    tokenId: "#4242",
    buyer: "0x7f3a...2b9c",
    price: "0.84 ETH",
    royalty: "$42.00",
    time: "2 min ago",
  },
  {
    collection: "SkyApes",
    tokenId: "#1337",
    buyer: "0x4e1b...8a2f",
    price: "0.42 ETH",
    royalty: "$14.70",
    time: "18 min ago",
  },
  {
    collection: "ShadowArt 1/1s",
    tokenId: "#007",
    buyer: "0x9c2d...1e4a",
    price: "2.40 ETH",
    royalty: "$252.00",
    time: "1 hr ago",
  },
  {
    collection: "ShadowPunks",
    tokenId: "#8888",
    buyer: "0x2a8f...7d3e",
    price: "0.62 ETH",
    royalty: "$31.00",
    time: "3 hr ago",
  },
];

export default function ShadowNFTRoyalties() {
  const [tab, setTab] = useState<"collections" | "sales" | "analytics">(
    "collections"
  );
  const totalPending = COLLECTIONS.reduce(
    (s, c) => s + parseFloat(c.pendingClaim.replace(/[$,]/g, "")),
    0
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Crown className="h-6 w-6 text-yellow-400" />
            NFT Royalties
          </h1>
          <p className="text-sm text-muted-foreground">
            Track secondary sales, manage royalty rates, and claim earnings
          </p>
        </div>
        <Button
          size="sm"
          className="h-8 bg-yellow-600 text-white border-0 font-bold text-xs"
          onClick={() => toast.success("Claimed all royalties!")}
        >
          <Zap className="h-3.5 w-3.5 mr-1" />
          Claim All (${totalPending.toFixed(2)})
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {[
          { label: "Total Earned", value: "$85,040", color: "text-yellow-400" },
          {
            label: "Pending",
            value: "$" + totalPending.toFixed(0),
            color: "text-green-400",
          },
          { label: "Collections", value: "3", color: "text-cyan-400" },
          { label: "Sales (30d)", value: "239", color: "text-blue-400" },
        ].map(s => (
          <Card key={s.label} className="border-border/50 text-center">
            <CardContent className="py-3 px-2">
              <p className={"font-black text-lg " + s.color}>{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-2">
        {(["collections", "sales", "analytics"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={
              "px-3 py-1.5 rounded-full text-xs font-medium transition-colors " +
              (tab === t
                ? "bg-yellow-600 text-white"
                : "bg-muted text-muted-foreground")
            }
          >
            {t === "collections"
              ? "🖼️ Collections"
              : t === "sales"
                ? "💸 Sales"
                : "📊 Analytics"}
          </button>
        ))}
      </div>

      {tab === "collections" && (
        <div className="space-y-3">
          {COLLECTIONS.map((col, i) => (
            <motion.div
              key={col.name}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Card className="border-border/50 hover:border-yellow-500/20 transition-all">
                <CardContent className="py-4 px-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-yellow-500/10 flex items-center justify-center shrink-0">
                      <Image className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div className="flex-1">
                      <p className="font-black text-sm">{col.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {col.items.toLocaleString()} items · Floor: {col.floor}
                      </p>
                    </div>
                    <Badge className="bg-yellow-500/10 text-yellow-400 border-0 text-xs">
                      {col.royalty}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="bg-muted rounded-xl py-2">
                      <p className="font-black text-green-400">
                        {col.totalEarned}
                      </p>
                      <p className="text-muted-foreground">Total Earned</p>
                    </div>
                    <div className="bg-muted rounded-xl py-2">
                      <p className="font-black text-yellow-400">
                        {col.pendingClaim}
                      </p>
                      <p className="text-muted-foreground">Pending</p>
                    </div>
                    <div className="bg-muted rounded-xl py-2">
                      <p className="font-black text-cyan-400">{col.sales30d}</p>
                      <p className="text-muted-foreground">Sales 30d</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="w-full h-8 text-xs bg-yellow-600 text-white border-0 font-bold"
                    onClick={() =>
                      toast.success(
                        "Claimed " +
                          col.pendingClaim +
                          " from " +
                          col.name +
                          "!"
                      )
                    }
                  >
                    Claim {col.pendingClaim}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "sales" && (
        <div className="space-y-2">
          {RECENT_SALES.map((sale, i) => (
            <Card key={i} className="border-border/50">
              <CardContent className="py-3 px-4 flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-yellow-500/10 flex items-center justify-center shrink-0">
                  <Crown className="h-4 w-4 text-yellow-400" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm">
                    {sale.collection} {sale.tokenId}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {sale.buyer} · {sale.time}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-black text-sm">{sale.price}</p>
                  <p className="text-xs text-green-400">+{sale.royalty}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "analytics" && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                label: "Best Month",
                value: "$12,840",
                color: "text-green-400",
              },
              {
                label: "Avg Per Sale",
                value: "$342.00",
                color: "text-yellow-400",
              },
              {
                label: "Top Collection",
                value: "ShadowPunks",
                color: "text-cyan-400",
              },
              {
                label: "YTD Earnings",
                value: "$85,040",
                color: "text-blue-400",
              },
            ].map(s => (
              <Card key={s.label} className="border-border/50">
                <CardContent className="py-4 px-4 text-center">
                  <p className={"font-black text-xl " + s.color}>{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          {COLLECTIONS.map(col => {
            const pct =
              (parseFloat(col.totalEarned.replace(/[$,]/g, "")) / 85040) * 100;
            return (
              <div key={col.name} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium">{col.name}</span>
                  <span className="font-bold text-yellow-400">
                    {col.totalEarned}
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-yellow-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: pct + "%" }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
