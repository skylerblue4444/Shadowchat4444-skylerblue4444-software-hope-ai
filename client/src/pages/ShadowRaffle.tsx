import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Ticket,
  Trophy,
  Clock,
  Users,
  DollarSign,
  Zap,
  Star,
  CheckCircle,
  RefreshCw,
  Gift,
  TrendingUp,
  Shield,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Raffle {
  id: number;
  title: string;
  prize: string;
  prizeUSD: string;
  ticketPrice: string;
  ticketsLeft: number;
  totalTickets: number;
  endsIn: string;
  charity: number;
  category: string;
  hot: boolean;
  image: string;
}

const RAFFLES: Raffle[] = [
  {
    id: 1,
    title: "SKY4444 Mega Jackpot",
    prize: "100,000 SKY4444",
    prizeUSD: "$8,420",
    ticketPrice: "10 SKY4444",
    ticketsLeft: 2840,
    totalTickets: 5000,
    endsIn: "23:14:42",
    charity: 10,
    category: "Crypto",
    hot: true,
    image:
      "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=400&q=80",
  },
  {
    id: 2,
    title: "TRUMP Coin Bundle",
    prize: "50,000 TRUMP",
    prizeUSD: "$710",
    ticketPrice: "5 SKY4444",
    ticketsLeft: 1200,
    totalTickets: 2000,
    endsIn: "11:30:00",
    charity: 20,
    category: "Meme",
    hot: true,
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&q=80",
  },
  {
    id: 3,
    title: "IT Services Package",
    prize: "1-Year Managed IT",
    prizeUSD: "$2,400",
    ticketPrice: "25 SKY4444",
    ticketsLeft: 480,
    totalTickets: 500,
    endsIn: "47:00:00",
    charity: 15,
    category: "IT Services",
    hot: false,
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80",
  },
  {
    id: 4,
    title: "NFT Art Collection",
    prize: "Exclusive NFT Bundle",
    prizeUSD: "$5,000",
    ticketPrice: "50 SKY4444",
    ticketsLeft: 320,
    totalTickets: 1000,
    endsIn: "72:00:00",
    charity: 25,
    category: "NFT",
    hot: false,
    image:
      "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=400&q=80",
  },
];

const PAST_WINNERS = [
  {
    raffle: "BTC Raffle",
    winner: "0x7f3a...2b9c",
    prize: "0.1 BTC",
    date: "Yesterday",
  },
  {
    raffle: "SKY4444 Jackpot",
    winner: "0x4e1b...8a2f",
    prize: "50K SKY",
    date: "3 days ago",
  },
  {
    raffle: "IT Package",
    winner: "0x9c2d...1e4a",
    prize: "$1,200",
    date: "1 week ago",
  },
];

export default function ShadowRaffle() {
  const [myTickets, setMyTickets] = useState<Record<number, number>>({});
  const [countdowns, setCountdowns] = useState<Record<number, string>>({});

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdowns(prev => {
        const updated: Record<number, string> = {};
        RAFFLES.forEach(r => {
          const parts = (prev[r.id] || r.endsIn).split(":").map(Number);
          let [h, m, s] = parts;
          s--;
          if (s < 0) {
            s = 59;
            m--;
          }
          if (m < 0) {
            m = 59;
            h--;
          }
          if (h < 0) {
            h = 0;
            m = 0;
            s = 0;
          }
          updated[r.id] =
            `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
        });
        return updated;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const buyTickets = (raffle: Raffle, qty: number) => {
    setMyTickets(prev => ({
      ...prev,
      [raffle.id]: (prev[raffle.id] || 0) + qty,
    }));
    toast.success(
      `🎟️ Bought ${qty} ticket${qty > 1 ? "s" : ""} for ${raffle.title}! Good luck!`
    );
  };

  const totalTickets = Object.values(myTickets).reduce((s, v) => s + v, 0);
  const totalSpent = Object.entries(myTickets).reduce((s, [id, qty]) => {
    const raffle = RAFFLES.find(r => r.id === parseInt(id));
    return s + (raffle ? qty * parseInt(raffle.ticketPrice) : 0);
  }, 0);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Ticket className="h-6 w-6 text-rose-400" />
            ShadowRaffle
          </h1>
          <p className="text-sm text-muted-foreground">
            Decentralized on-chain raffles — buy tickets with SKY4444, win big,
            support charity
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">My Tickets</p>
          <p className="font-black text-base text-rose-400">{totalTickets}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: "Active Raffles", value: "4", color: "text-rose-400" },
          {
            label: "Total Prize Pool",
            value: "$16.5K",
            color: "text-yellow-400",
          },
          {
            label: "My Tickets",
            value: totalTickets.toString(),
            color: "text-cyan-400",
          },
          {
            label: "Charity Donated",
            value: "$4,200",
            color: "text-green-400",
          },
        ].map(s => (
          <Card key={s.label} className="border-border/50 text-center">
            <CardContent className="py-3 px-2">
              <p className={`font-black text-lg ${s.color}`}>{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Raffle Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {RAFFLES.map((raffle, i) => (
          <motion.div
            key={raffle.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
          >
            <Card className="border-border/50 hover:border-rose-500/20 transition-all overflow-hidden">
              <div className="h-32 overflow-hidden relative">
                <img
                  src={raffle.image}
                  alt={raffle.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                <div className="absolute top-2 left-2 flex gap-1.5">
                  {raffle.hot && (
                    <Badge className="text-xs bg-orange-500/90 text-white border-0">
                      🔥 Hot
                    </Badge>
                  )}
                  <Badge className="text-xs bg-black/60 text-white border-0">
                    {raffle.category}
                  </Badge>
                </div>
                <div className="absolute bottom-2 right-2 flex items-center gap-1.5 bg-black/60 rounded-full px-2 py-1">
                  <Clock className="h-3 w-3 text-rose-400" />
                  <span className="text-xs font-mono font-bold text-white">
                    {countdowns[raffle.id] || raffle.endsIn}
                  </span>
                </div>
              </div>
              <CardContent className="py-4 px-4 space-y-3">
                <div>
                  <p className="font-black text-sm">{raffle.title}</p>
                  <p className="text-xs text-muted-foreground">
                    Prize:{" "}
                    <span className="font-bold text-yellow-400">
                      {raffle.prize}
                    </span>{" "}
                    (~{raffle.prizeUSD})
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Tickets sold</span>
                    <span className="font-bold">
                      {(
                        raffle.totalTickets - raffle.ticketsLeft
                      ).toLocaleString()}{" "}
                      / {raffle.totalTickets.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-rose-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${((raffle.totalTickets - raffle.ticketsLeft) / raffle.totalTickets) * 100}%`,
                      }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">
                    Ticket price:{" "}
                    <span className="font-bold text-foreground">
                      {raffle.ticketPrice}
                    </span>
                  </span>
                  <span className="text-green-400 font-medium">
                    {raffle.charity}% to charity
                  </span>
                </div>
                {myTickets[raffle.id] && (
                  <p className="text-xs text-rose-400 font-medium">
                    You own {myTickets[raffle.id]} ticket
                    {myTickets[raffle.id] > 1 ? "s" : ""}
                  </p>
                )}
                <div className="flex gap-2">
                  {[1, 5, 10].map(qty => (
                    <Button
                      key={qty}
                      size="sm"
                      className="flex-1 h-8 text-xs bg-rose-600 text-white border-0 font-bold"
                      onClick={() => buyTickets(raffle, qty)}
                    >
                      {qty}x
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Past Winners */}
      <div>
        <p className="text-sm font-bold mb-3 flex items-center gap-2">
          <Trophy className="h-4 w-4 text-yellow-400" />
          Recent Winners
        </p>
        <div className="space-y-2">
          {PAST_WINNERS.map((w, i) => (
            <Card key={i} className="border-border/50">
              <CardContent className="py-2.5 px-4 flex items-center gap-3">
                <Trophy className="h-4 w-4 text-yellow-400 shrink-0" />
                <div className="flex-1">
                  <p className="text-xs font-bold">{w.raffle}</p>
                  <p className="text-xs text-muted-foreground">{w.winner}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-black text-yellow-400">
                    {w.prize}
                  </p>
                  <p className="text-xs text-muted-foreground">{w.date}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
