import { useState } from "react";
import { motion } from "framer-motion";
import {
  Package,
  Truck,
  CheckCircle,
  MapPin,
  Clock,
  Search,
  QrCode,
  Shield,
  Globe,
  Zap,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const SHIPMENTS = [
  {
    id: "SKY-SHI-4441",
    product: "Dell Server Rack",
    origin: "Shenzhen, China",
    destination: "Fort Smith, AR",
    status: "in_transit",
    eta: "May 18, 2026",
    steps: [
      {
        label: "Order Placed",
        location: "ShadowMarket",
        time: "May 10, 2026",
        done: true,
      },
      {
        label: "Manufacturer Verified",
        location: "Shenzhen Factory",
        time: "May 11, 2026",
        done: true,
      },
      {
        label: "Quality Inspection",
        location: "QC Center, China",
        time: "May 12, 2026",
        done: true,
      },
      {
        label: "Customs Cleared",
        location: "Shanghai Port",
        time: "May 13, 2026",
        done: true,
      },
      {
        label: "In Transit",
        location: "Pacific Ocean",
        time: "May 14-17, 2026",
        done: false,
        active: true,
      },
      {
        label: "US Customs",
        location: "Los Angeles, CA",
        time: "May 17, 2026",
        done: false,
      },
      {
        label: "Last Mile Delivery",
        location: "Fort Smith, AR",
        time: "May 18, 2026",
        done: false,
      },
    ],
    blockchain: "0x4444...sky1",
    verified: true,
  },
  {
    id: "SKY-SHI-4442",
    product: "Cisco Network Switch x5",
    origin: "Taiwan",
    destination: "Fort Smith, AR",
    status: "delivered",
    eta: "May 14, 2026",
    steps: [
      {
        label: "Order Placed",
        location: "ShadowMarket",
        time: "May 8, 2026",
        done: true,
      },
      {
        label: "Manufacturer Verified",
        location: "Taipei Factory",
        time: "May 9, 2026",
        done: true,
      },
      {
        label: "Quality Inspection",
        location: "QC Center, Taiwan",
        time: "May 10, 2026",
        done: true,
      },
      {
        label: "Shipped",
        location: "Kaohsiung Port",
        time: "May 11, 2026",
        done: true,
      },
      {
        label: "US Customs",
        location: "Seattle, WA",
        time: "May 13, 2026",
        done: true,
      },
      {
        label: "Delivered",
        location: "Fort Smith, AR",
        time: "May 14, 2026",
        done: true,
      },
    ],
    blockchain: "0x4444...sky2",
    verified: true,
  },
];

export default function ShadowSupplyChain() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<(typeof SHIPMENTS)[0] | null>(
    SHIPMENTS[0]
  );
  const [trackId, setTrackId] = useState("");

  const track = () => {
    if (!trackId.trim()) {
      toast.error("Enter a tracking ID");
      return;
    }
    toast.info(`Searching blockchain for ${trackId}...`);
    setTimeout(
      () => toast.success("✅ Shipment found on-chain! Displaying details..."),
      1500
    );
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Package className="h-6 w-6 text-teal-400" />
            Supply Chain
          </h1>
          <p className="text-sm text-muted-foreground">
            Blockchain-verified product tracking from factory to door
          </p>
        </div>
        <Badge className="bg-teal-500/10 text-teal-400 border-teal-500/20 font-bold">
          🔗 On-Chain
        </Badge>
      </div>

      {/* Track */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            value={trackId}
            onChange={e => setTrackId(e.target.value)}
            placeholder="Enter tracking ID or scan QR..."
            className="pl-9 h-9 text-xs"
          />
        </div>
        <Button
          className="h-9 text-xs bg-teal-600 text-white border-0"
          onClick={track}
        >
          Track
        </Button>
        <Button
          variant="outline"
          className="h-9 w-9 p-0"
          onClick={() => toast.info("Opening QR scanner...")}
        >
          <QrCode className="h-4 w-4" />
        </Button>
      </div>

      {/* Shipments List */}
      <div className="space-y-2">
        <p className="text-xs font-bold text-muted-foreground">MY SHIPMENTS</p>
        {SHIPMENTS.map(ship => (
          <Card
            key={ship.id}
            className={`border cursor-pointer transition-all ${selected?.id === ship.id ? "border-teal-500/30 bg-teal-900/5" : "border-border/50 hover:border-teal-500/20"}`}
            onClick={() => setSelected(ship)}
          >
            <CardContent className="py-3 px-4">
              <div className="flex items-center gap-3">
                <div
                  className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 ${ship.status === "delivered" ? "bg-green-500/10" : "bg-yellow-500/10"}`}
                >
                  {ship.status === "delivered" ? (
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  ) : (
                    <Truck className="h-5 w-5 text-yellow-400" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm">{ship.product}</p>
                  <p className="text-xs text-muted-foreground">
                    {ship.id} · {ship.origin} → {ship.destination}
                  </p>
                </div>
                <div className="text-right">
                  <Badge
                    className={`text-xs ${ship.status === "delivered" ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"}`}
                  >
                    {ship.status === "delivered"
                      ? "✓ Delivered"
                      : "🚢 In Transit"}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    ETA: {ship.eta}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Selected Shipment Detail */}
      {selected && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-muted-foreground">
              TRACKING: {selected.id}
            </p>
            <div className="flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5 text-teal-400" />
              <p className="text-xs text-teal-400 font-medium">
                Blockchain Verified
              </p>
            </div>
          </div>
          <Card className="border-teal-500/20 bg-teal-900/5">
            <CardContent className="py-4 px-4">
              <div className="relative">
                {selected.steps.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="flex gap-3 mb-4 last:mb-0"
                  >
                    <div className="flex flex-col items-center">
                      <div
                        className={`h-7 w-7 rounded-full flex items-center justify-center shrink-0 z-10 ${step.done ? "bg-green-600" : (step as any).active ? "bg-yellow-600 animate-pulse" : "bg-muted"}`}
                      >
                        {step.done ? (
                          <CheckCircle className="h-4 w-4 text-white" />
                        ) : (step as any).active ? (
                          <Truck className="h-4 w-4 text-white" />
                        ) : (
                          <Clock className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                      {i < selected.steps.length - 1 && (
                        <div
                          className={`w-0.5 h-8 mt-1 ${step.done ? "bg-green-600/50" : "bg-border/50"}`}
                        />
                      )}
                    </div>
                    <div className="flex-1 pb-2">
                      <p
                        className={`font-bold text-sm ${step.done ? "" : "text-muted-foreground"}`}
                      >
                        {step.label}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {step.location}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {step.time}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-border/30">
                <p className="text-xs text-muted-foreground">
                  Blockchain TX:{" "}
                  <span className="font-mono text-teal-400">
                    {selected.blockchain}
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Tracked Items", value: "2", emoji: "📦" },
          { label: "Verified On-Chain", value: "100%", emoji: "🔗" },
          { label: "Avg Delivery", value: "6 days", emoji: "⚡" },
        ].map(s => (
          <Card key={s.label} className="border-border/50 text-center">
            <CardContent className="pt-3 pb-3">
              <p className="text-xl mb-1">{s.emoji}</p>
              <p className="font-black text-xs text-teal-400">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
