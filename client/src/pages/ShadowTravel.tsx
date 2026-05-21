import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plane,
  Hotel,
  MapPin,
  Star,
  Clock,
  Coins,
  Search,
  Calendar,
  Users,
  ChevronRight,
  Zap,
  Globe,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const DESTINATIONS = [
  {
    city: "Tokyo",
    country: "Japan",
    img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&q=80",
    price: "1,200 SKY4444",
    rating: 4.9,
    tag: "🔥 Trending",
  },
  {
    city: "Dubai",
    country: "UAE",
    img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80",
    price: "980 SKY4444",
    rating: 4.8,
    tag: "⚡ Crypto-Friendly",
  },
  {
    city: "New York",
    country: "USA",
    img: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&q=80",
    price: "800 SKY4444",
    rating: 4.7,
    tag: "🗽 Popular",
  },
  {
    city: "Singapore",
    country: "SG",
    img: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&q=80",
    price: "1,100 SKY4444",
    rating: 4.9,
    tag: "🌏 Web3 Hub",
  },
];

const HOTELS = [
  {
    name: "ShadowLux Tokyo",
    stars: 5,
    price: "120 SKY4444/night",
    rating: 4.9,
    amenities: ["🏊 Pool", "🍜 Restaurant", "💆 Spa", "🔐 Crypto ATM"],
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80",
  },
  {
    name: "Crypto Suites Dubai",
    stars: 5,
    price: "200 SKY4444/night",
    rating: 4.8,
    amenities: ["🌊 Beach", "🍽️ Fine Dining", "🏋️ Gym", "🔑 NFT Key"],
    img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&q=80",
  },
];

export default function ShadowTravel() {
  const [tab, setTab] = useState<
    "discover" | "flights" | "hotels" | "mybookings"
  >("discover");
  const [from, setFrom] = useState("Fort Smith, AR");
  const [to, setTo] = useState("");

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Globe className="h-6 w-6 text-sky-400" />
            ShadowTravel
          </h1>
          <p className="text-sm text-muted-foreground">
            Book flights, hotels, and experiences with SKY4444
          </p>
        </div>
        <Badge className="bg-sky-500/10 text-sky-400 border-sky-500/20 font-bold">
          ✈️ 5% SKY Cashback
        </Badge>
      </div>

      <div className="flex gap-2">
        {(["discover", "flights", "hotels", "mybookings"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-sky-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t === "mybookings" ? "My Bookings" : t}
          </button>
        ))}
      </div>

      {tab === "discover" && (
        <div className="space-y-3">
          <p className="text-xs font-bold text-muted-foreground">
            TRENDING DESTINATIONS
          </p>
          {DESTINATIONS.map((dest, i) => (
            <motion.div
              key={dest.city}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <Card
                className="border-border/50 overflow-hidden hover:border-sky-500/20 transition-all cursor-pointer"
                onClick={() => toast.info(`Exploring ${dest.city}...`)}
              >
                <div className="relative">
                  <img
                    src={dest.img}
                    alt={dest.city}
                    className="w-full h-32 object-cover"
                  />
                  <Badge className="absolute top-2 left-2 text-xs bg-black/60 text-white border-0">
                    {dest.tag}
                  </Badge>
                </div>
                <CardContent className="py-3 px-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-black text-sm">
                        {dest.city}, {dest.country}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Star className="h-3 w-3 text-yellow-400" />
                        {dest.rating}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-sm text-sky-400">
                        From {dest.price}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        round trip
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "flights" && (
        <div className="space-y-3">
          <Card className="border-sky-500/20 bg-sky-900/5">
            <CardContent className="py-4 px-4 space-y-3">
              <p className="font-bold text-sm">Search Flights</p>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">From</p>
                  <Input
                    value={from}
                    onChange={e => setFrom(e.target.value)}
                    className="h-9 text-xs"
                  />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">To</p>
                  <Input
                    value={to}
                    onChange={e => setTo(e.target.value)}
                    placeholder="Destination city..."
                    className="h-9 text-xs"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Depart</p>
                    <Input
                      type="date"
                      className="h-9 text-xs"
                      defaultValue="2026-06-01"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Return</p>
                    <Input
                      type="date"
                      className="h-9 text-xs"
                      defaultValue="2026-06-08"
                    />
                  </div>
                </div>
              </div>
              <Button
                className="w-full h-10 text-xs bg-sky-600 text-white border-0 font-bold"
                onClick={() => toast.info("Searching flights...")}
              >
                <Search className="h-4 w-4 mr-2" />
                Search Flights — Pay with SKY4444
              </Button>
            </CardContent>
          </Card>
          {[
            {
              airline: "ShadowAir",
              from: "XNA",
              to: "NRT",
              depart: "8:00 AM",
              arrive: "2:30 PM+1",
              duration: "14h 30m",
              stops: "Nonstop",
              price: "1,200 SKY4444",
              class: "Economy",
            },
            {
              airline: "CryptoJet",
              from: "XNA",
              to: "DXB",
              depart: "11:00 AM",
              arrive: "9:45 AM+1",
              duration: "13h 45m",
              stops: "1 Stop",
              price: "980 SKY4444",
              class: "Economy",
            },
            {
              airline: "ShadowAir Premium",
              from: "XNA",
              to: "NRT",
              depart: "6:00 PM",
              arrive: "12:30 PM+1",
              duration: "14h 30m",
              stops: "Nonstop",
              price: "2,400 SKY4444",
              class: "Business",
            },
          ].map((flight, i) => (
            <Card key={i} className="border-border/50">
              <CardContent className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-bold text-sm">{flight.airline}</p>
                      <Badge
                        className={`text-xs ${flight.class === "Business" ? "bg-purple-500/10 text-purple-400 border-purple-500/20" : "bg-muted text-muted-foreground"}`}
                      >
                        {flight.class}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-bold">{flight.from}</span>
                      <Plane className="h-3 w-3 text-sky-400" />
                      <span className="font-bold">{flight.to}</span>
                      <span className="text-muted-foreground">
                        {flight.depart} → {flight.arrive}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {flight.duration} · {flight.stops}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-black text-sm text-sky-400">
                      {flight.price}
                    </p>
                    <Button
                      size="sm"
                      className="h-7 text-xs mt-1 bg-sky-600 text-white border-0"
                      onClick={() =>
                        toast.success(
                          `✅ Flight booked! ${flight.price} deducted.`
                        )
                      }
                    >
                      Book
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "hotels" && (
        <div className="space-y-3">
          {HOTELS.map((hotel, i) => (
            <Card key={hotel.name} className="border-border/50 overflow-hidden">
              <img
                src={hotel.img}
                alt={hotel.name}
                className="w-full h-36 object-cover"
              />
              <CardContent className="py-3 px-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-black text-sm">{hotel.name}</p>
                    <div className="flex items-center gap-1 text-xs">
                      {Array.from({ length: hotel.stars }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-3 w-3 text-yellow-400 fill-yellow-400"
                        />
                      ))}
                      <span className="text-muted-foreground ml-1">
                        {hotel.rating}
                      </span>
                    </div>
                  </div>
                  <p className="font-black text-sm text-sky-400">
                    {hotel.price}
                  </p>
                </div>
                <div className="flex gap-1 flex-wrap mb-2">
                  {hotel.amenities.map(a => (
                    <Badge
                      key={a}
                      className="text-xs bg-muted text-muted-foreground"
                    >
                      {a}
                    </Badge>
                  ))}
                </div>
                <Button
                  className="w-full h-9 text-xs bg-sky-600 text-white border-0"
                  onClick={() => toast.success(`✅ ${hotel.name} booked!`)}
                >
                  Book Hotel
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "mybookings" && (
        <div className="space-y-3">
          <Card className="border-sky-500/20 bg-sky-900/5">
            <CardContent className="py-3 px-4">
              <div className="flex items-center gap-3">
                <Plane className="h-8 w-8 text-sky-400" />
                <div className="flex-1">
                  <p className="font-bold text-sm">XNA → NRT — ShadowAir</p>
                  <p className="text-xs text-muted-foreground">
                    Jun 1, 2026 · Economy · 1 passenger
                  </p>
                  <p className="text-xs text-sky-400 font-bold">
                    1,200 SKY4444 paid
                  </p>
                </div>
                <Badge className="text-xs bg-green-500/10 text-green-400 border-green-500/20">
                  Confirmed
                </Badge>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50 text-center py-6">
            <p className="text-muted-foreground text-xs">
              No other bookings yet
            </p>
            <Button
              size="sm"
              className="mt-2 h-8 text-xs bg-sky-600 text-white border-0"
              onClick={() => setTab("flights")}
            >
              Book a Flight
            </Button>
          </Card>
        </div>
      )}
    </div>
  );
}
