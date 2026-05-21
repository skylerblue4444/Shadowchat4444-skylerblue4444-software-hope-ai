import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Users,
  Ticket,
  Clock,
  Search,
  Filter,
  Star,
  Heart,
  Share2,
  ChevronRight,
  Globe,
  Zap,
  Music,
  Mic,
  Monitor,
  Trophy,
  Coins,
  Plus,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const EVENTS = [
  {
    id: "e1",
    title: "ShadowChat Global Summit 2025",
    category: "Conference",
    date: "Jun 15, 2025",
    time: "9:00 AM EST",
    location: "Las Vegas, NV",
    virtual: false,
    price: 299,
    cryptoPrice: "12,800 TRUMP",
    attendees: 4200,
    maxAttendees: 5000,
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop",
    tags: ["crypto", "web3", "networking"],
    featured: true,
    host: "ShadowChat Inc.",
  },
  {
    id: "e2",
    title: "SKY4444 ICO Launch Party",
    category: "Party",
    date: "Jun 22, 2025",
    time: "7:00 PM EST",
    location: "Virtual + Miami, FL",
    virtual: true,
    price: 0,
    cryptoPrice: "FREE",
    attendees: 12800,
    maxAttendees: 50000,
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=200&fit=crop",
    tags: ["ico", "sky4444", "launch"],
    featured: true,
    host: "Skyler Blue IT",
  },
  {
    id: "e3",
    title: "Crypto Trading Masterclass",
    category: "Workshop",
    date: "May 28, 2025",
    time: "2:00 PM EST",
    location: "Online",
    virtual: true,
    price: 49,
    cryptoPrice: "2,100 TRUMP",
    attendees: 840,
    maxAttendees: 1000,
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=200&fit=crop",
    tags: ["trading", "education", "defi"],
    featured: false,
    host: "CryptoKing Academy",
  },
  {
    id: "e4",
    title: "NFT Art Exhibition — Digital Futures",
    category: "Exhibition",
    date: "Jun 5, 2025",
    time: "6:00 PM CST",
    location: "Chicago, IL",
    virtual: false,
    price: 25,
    cryptoPrice: "1,070 TRUMP",
    attendees: 320,
    maxAttendees: 500,
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=200&fit=crop",
    tags: ["nft", "art", "exhibition"],
    featured: false,
    host: "NFT Gallery DAO",
  },
  {
    id: "e5",
    title: "IT Security Conference 2025",
    category: "Conference",
    date: "Jul 10, 2025",
    time: "8:00 AM CST",
    location: "Fayetteville, AR",
    virtual: false,
    price: 199,
    cryptoPrice: "8,500 TRUMP",
    attendees: 180,
    maxAttendees: 300,
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=200&fit=crop",
    tags: ["security", "it", "business"],
    featured: false,
    host: "Skyler Blue IT Resolutions",
  },
  {
    id: "e6",
    title: "DAO Governance Town Hall",
    category: "Community",
    date: "May 20, 2025",
    time: "3:00 PM UTC",
    location: "Virtual",
    virtual: true,
    price: 0,
    cryptoPrice: "FREE",
    attendees: 2840,
    maxAttendees: 10000,
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=200&fit=crop",
    tags: ["dao", "governance", "community"],
    featured: false,
    host: "ShadowChat DAO",
  },
];

const CATEGORIES = [
  "All",
  "Conference",
  "Workshop",
  "Party",
  "Exhibition",
  "Community",
  "Virtual",
];
const CATEGORY_ICONS: Record<string, any> = {
  Conference: Monitor,
  Workshop: Mic,
  Party: Music,
  Exhibition: Star,
  Community: Users,
  Virtual: Globe,
};

export default function Events() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [registered, setRegistered] = useState<Record<string, boolean>>({});

  const filtered = EVENTS.filter(
    e =>
      (category === "All" || e.category === category) &&
      (e.title.toLowerCase().includes(search.toLowerCase()) ||
        e.tags.some(t => t.includes(search.toLowerCase())))
  );

  const featured = filtered.filter(e => e.featured);
  const regular = filtered.filter(e => !e.featured);

  const handleRegister = (event: (typeof EVENTS)[0]) => {
    setRegistered(prev => ({ ...prev, [event.id]: true }));
    toast.success(
      `🎟️ Registered for ${event.title}! Ticket sent to your wallet.`
    );
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Calendar className="h-6 w-6 text-purple-400" />
            Events
          </h1>
          <p className="text-sm text-muted-foreground">
            Discover crypto, tech, and community events worldwide
          </p>
        </div>
        <Button
          className="bg-purple-600 text-white border-0"
          onClick={() => toast.info("Create event form")}
        >
          <Plus className="h-4 w-4 mr-2" />
          Host Event
        </Button>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            className="pl-9"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {CATEGORIES.map(cat => {
          const Icon = CATEGORY_ICONS[cat] || Calendar;
          return (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors ${category === cat ? "bg-purple-600 text-white" : "bg-muted text-muted-foreground"}`}
            >
              <Icon className="h-3.5 w-3.5" />
              {cat}
            </button>
          );
        })}
      </div>

      {/* Featured Events */}
      {featured.length > 0 && (
        <div>
          <h2 className="font-bold text-sm mb-3 flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-400" />
            Featured Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featured.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="border-purple-500/20 bg-purple-500/3 overflow-hidden">
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <Badge className="bg-yellow-500 text-black border-0 text-xs font-bold">
                        ⭐ Featured
                      </Badge>
                      {event.virtual && (
                        <Badge className="bg-blue-500/80 text-white border-0 text-xs">
                          🌐 Virtual
                        </Badge>
                      )}
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-white font-black text-lg leading-tight">
                        {event.title}
                      </p>
                    </div>
                  </div>
                  <CardContent className="pt-3">
                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {event.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {event.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {event.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {event.attendees.toLocaleString()} attending
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-black text-lg">
                          {event.price === 0 ? "FREE" : `$${event.price}`}
                        </p>
                        <p className="text-xs text-cyan-400">
                          {event.cryptoPrice}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            setSaved(prev => ({
                              ...prev,
                              [event.id]: !prev[event.id],
                            }))
                          }
                          className={`h-9 w-9 rounded-xl flex items-center justify-center border transition-colors ${saved[event.id] ? "bg-red-500/10 border-red-500/20 text-red-400" : "border-border/30 text-muted-foreground"}`}
                        >
                          <Heart
                            className="h-4 w-4"
                            fill={saved[event.id] ? "currentColor" : "none"}
                          />
                        </button>
                        <Button
                          className={`${registered[event.id] ? "bg-green-600" : "bg-purple-600"} text-white border-0`}
                          size="sm"
                          onClick={() =>
                            !registered[event.id] && handleRegister(event)
                          }
                        >
                          {registered[event.id] ? (
                            <>
                              <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
                              Registered
                            </>
                          ) : (
                            <>
                              <Ticket className="h-3.5 w-3.5 mr-1.5" />
                              Register
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                    {/* Capacity Bar */}
                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>
                          {event.attendees.toLocaleString()} /{" "}
                          {event.maxAttendees.toLocaleString()} spots
                        </span>
                        <span>
                          {Math.round(
                            (event.attendees / event.maxAttendees) * 100
                          )}
                          % full
                        </span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                          style={{
                            width: `${(event.attendees / event.maxAttendees) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Regular Events */}
      <div className="space-y-3">
        <h2 className="font-bold text-sm">All Events ({regular.length})</h2>
        {regular.map((event, i) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="border-border/50 hover:border-purple-500/20 transition-colors">
              <CardContent className="py-3 px-4">
                <div className="flex gap-3">
                  <div className="h-20 w-28 rounded-xl overflow-hidden shrink-0">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <Badge variant="outline" className="text-xs">
                            {event.category}
                          </Badge>
                          {event.virtual && (
                            <Badge className="text-xs bg-blue-500/10 text-blue-400 border-blue-500/20">
                              Virtual
                            </Badge>
                          )}
                        </div>
                        <p className="font-bold text-sm">{event.title}</p>
                        <div className="flex flex-wrap gap-2 mt-1 text-xs text-muted-foreground">
                          <span className="flex items-center gap-0.5">
                            <Calendar className="h-3 w-3" />
                            {event.date}
                          </span>
                          <span className="flex items-center gap-0.5">
                            <MapPin className="h-3 w-3" />
                            {event.location}
                          </span>
                          <span className="flex items-center gap-0.5">
                            <Users className="h-3 w-3" />
                            {event.attendees.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-black">
                          {event.price === 0 ? "FREE" : `$${event.price}`}
                        </p>
                        <p className="text-xs text-cyan-400">
                          {event.cryptoPrice}
                        </p>
                        <Button
                          size="sm"
                          className={`mt-1 h-7 text-xs ${registered[event.id] ? "bg-green-600" : "bg-purple-600"} text-white border-0`}
                          onClick={() =>
                            !registered[event.id] && handleRegister(event)
                          }
                        >
                          {registered[event.id] ? "✓ Registered" : "Register"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
