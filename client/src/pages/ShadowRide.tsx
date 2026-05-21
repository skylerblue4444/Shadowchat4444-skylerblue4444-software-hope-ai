import { useState } from "react";
import { motion } from "framer-motion";
import {
  Car,
  MapPin,
  Clock,
  Star,
  Coins,
  Zap,
  Navigation,
  Users,
  Shield,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const RIDE_TYPES = [
  {
    id: "economy",
    name: "ShadowX",
    desc: "Affordable everyday rides",
    price: "8 SKY4444",
    eta: "4 min",
    emoji: "🚗",
    capacity: 4,
  },
  {
    id: "comfort",
    name: "ShadowComfort",
    desc: "Newer cars, more legroom",
    price: "14 SKY4444",
    eta: "6 min",
    emoji: "🚙",
    capacity: 4,
  },
  {
    id: "xl",
    name: "ShadowXL",
    desc: "SUVs for groups up to 6",
    price: "20 SKY4444",
    eta: "8 min",
    emoji: "🚐",
    capacity: 6,
  },
  {
    id: "luxury",
    name: "ShadowBlack",
    desc: "Premium luxury vehicles",
    price: "44 SKY4444",
    eta: "10 min",
    emoji: "🖤",
    capacity: 4,
  },
];

const RECENT_TRIPS = [
  {
    from: "Home",
    to: "Fort Smith Regional Airport",
    date: "May 14, 2026",
    cost: "14 SKY4444",
    driver: "Marcus T.",
    rating: 5,
    type: "ShadowComfort",
  },
  {
    from: "Walmart Supercenter",
    to: "Home",
    date: "May 12, 2026",
    cost: "8 SKY4444",
    driver: "Sarah K.",
    rating: 5,
    type: "ShadowX",
  },
  {
    from: "Home",
    to: "Mercy Hospital",
    date: "May 10, 2026",
    cost: "10 SKY4444",
    driver: "James R.",
    rating: 4,
    type: "ShadowX",
  },
];

export default function ShadowRide() {
  const [tab, setTab] = useState<"book" | "schedule" | "history" | "driver">(
    "book"
  );
  const [pickup, setPickup] = useState("Current Location");
  const [dropoff, setDropoff] = useState("");
  const [selected, setSelected] = useState("economy");
  const [booking, setBooking] = useState(false);

  const selectedRide = RIDE_TYPES.find(r => r.id === selected)!;

  const bookRide = () => {
    if (!dropoff) {
      toast.error("Please enter a destination");
      return;
    }
    setBooking(true);
    setTimeout(() => {
      setBooking(false);
      toast.success(
        `🚗 Driver on the way! Marcus T. — ${selectedRide.eta} away`
      );
    }, 2000);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Car className="h-6 w-6 text-blue-400" />
            ShadowRide
          </h1>
          <p className="text-sm text-muted-foreground">
            Ride sharing powered by SKY4444 — earn while you drive
          </p>
        </div>
        <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 font-bold">
          ⚡ 2x Rewards
        </Badge>
      </div>

      <div className="flex gap-2">
        {(["book", "schedule", "history", "driver"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-blue-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "book" && (
        <div className="space-y-3">
          <Card className="border-blue-500/20 bg-blue-900/5">
            <CardContent className="py-4 px-4 space-y-3">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Pickup</p>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-green-400" />
                  <Input
                    value={pickup}
                    onChange={e => setPickup(e.target.value)}
                    className="pl-9 h-9 text-xs"
                  />
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">
                  Destination
                </p>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-red-400" />
                  <Input
                    value={dropoff}
                    onChange={e => setDropoff(e.target.value)}
                    placeholder="Where to?"
                    className="pl-9 h-9 text-xs"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <p className="text-xs font-bold text-muted-foreground">
            CHOOSE RIDE TYPE
          </p>
          <div className="space-y-2">
            {RIDE_TYPES.map(ride => (
              <motion.div key={ride.id} whileTap={{ scale: 0.98 }}>
                <Card
                  className={`border cursor-pointer transition-all ${selected === ride.id ? "border-blue-500/50 bg-blue-900/10" : "border-border/50"}`}
                  onClick={() => setSelected(ride.id)}
                >
                  <CardContent className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{ride.emoji}</span>
                      <div className="flex-1">
                        <p className="font-bold text-sm">{ride.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {ride.desc} · {ride.capacity} seats
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-sm text-blue-400">
                          {ride.price}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {ride.eta}
                        </p>
                      </div>
                      {selected === ride.id && (
                        <div className="h-4 w-4 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                          <div className="h-2 w-2 rounded-full bg-white" />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <Button
            className="w-full h-12 text-sm bg-blue-600 text-white border-0 font-bold"
            onClick={bookRide}
            disabled={booking}
          >
            {booking ? (
              <span className="flex items-center gap-2">
                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Finding driver...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Book {selectedRide.name} — {selectedRide.price}
              </span>
            )}
          </Button>
        </div>
      )}

      {tab === "schedule" && (
        <Card className="border-blue-500/20 bg-blue-900/5">
          <CardContent className="py-4 px-4 space-y-3">
            <p className="font-bold text-sm">Schedule a Ride</p>
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                Pickup Date & Time
              </p>
              <Input
                type="datetime-local"
                className="h-9 text-xs"
                defaultValue="2026-05-16T08:00"
              />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                Pickup Location
              </p>
              <Input
                placeholder="Enter pickup address..."
                className="h-9 text-xs"
              />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Destination</p>
              <Input
                placeholder="Enter destination..."
                className="h-9 text-xs"
              />
            </div>
            <Button
              className="w-full h-10 text-xs bg-blue-600 text-white border-0 font-bold"
              onClick={() =>
                toast.success(
                  "✅ Ride scheduled! You'll get a reminder 30 min before."
                )
              }
            >
              <Clock className="h-4 w-4 mr-2" />
              Schedule Ride
            </Button>
          </CardContent>
        </Card>
      )}

      {tab === "history" && (
        <div className="space-y-3">
          {RECENT_TRIPS.map((trip, i) => (
            <Card key={i} className="border-border/50">
              <CardContent className="py-3 px-4">
                <div className="flex items-start gap-3">
                  <Car className="h-8 w-8 text-blue-400 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-bold text-sm">
                      {trip.from} → {trip.to}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {trip.type} · {trip.driver}
                    </p>
                    <p className="text-xs text-muted-foreground">{trip.date}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      {Array.from({ length: trip.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-3 w-3 text-yellow-400 fill-yellow-400"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="font-black text-sm text-blue-400 shrink-0">
                    {trip.cost}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "driver" && (
        <div className="space-y-3">
          <Card className="border-blue-500/20 bg-blue-900/5">
            <CardContent className="py-4 px-4 text-center">
              <p className="text-3xl mb-2">🚗</p>
              <p className="font-black text-sm">Become a ShadowRide Driver</p>
              <p className="text-xs text-muted-foreground mb-3">
                Earn SKY4444 for every ride. Bonus rewards for top-rated
                drivers.
              </p>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {[
                  { label: "Avg Earnings", value: "444 SKY/day" },
                  { label: "Bonus Pool", value: "4,444 SKY/week" },
                  { label: "Rating Bonus", value: "5★ = 2x rewards" },
                  { label: "Referral", value: "100 SKY/driver" },
                ].map(s => (
                  <div
                    key={s.label}
                    className="p-2 rounded-xl bg-black/20 text-center"
                  >
                    <p className="font-black text-xs text-blue-400">
                      {s.value}
                    </p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>
              <Button
                className="w-full h-10 text-xs bg-blue-600 text-white border-0 font-bold"
                onClick={() =>
                  toast.success("✅ Driver application submitted!")
                }
              >
                Apply to Drive — Earn SKY4444
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
