import { useState } from "react";
import { motion } from "framer-motion";
import {
  Home,
  MapPin,
  Star,
  Coins,
  TrendingUp,
  Search,
  Filter,
  Bed,
  Bath,
  Square,
  ChevronRight,
  Building,
  Zap,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const LISTINGS = [
  {
    id: 1,
    title: "Modern Downtown Condo",
    location: "Fort Smith, AR",
    price: "180,000 USDT",
    priceUSD: "$180K",
    beds: 2,
    baths: 2,
    sqft: 1200,
    img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&q=80",
    type: "Condo",
    tokenized: true,
    apy: "8.4%",
    tag: "🔥 Hot",
  },
  {
    id: 2,
    title: "Luxury Penthouse Suite",
    location: "Dubai, UAE",
    price: "2,400,000 USDT",
    priceUSD: "$2.4M",
    beds: 4,
    baths: 3,
    sqft: 4400,
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80",
    type: "Penthouse",
    tokenized: true,
    apy: "6.2%",
    tag: "⚡ Tokenized",
  },
  {
    id: 3,
    title: "Beachfront Villa",
    location: "Miami, FL",
    price: "1,200,000 USDT",
    priceUSD: "$1.2M",
    beds: 5,
    baths: 4,
    sqft: 3800,
    img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&q=80",
    type: "Villa",
    tokenized: false,
    apy: "",
    tag: "🌊 Waterfront",
  },
  {
    id: 4,
    title: "Tech Hub Office Space",
    location: "Austin, TX",
    price: "450,000 USDT",
    priceUSD: "$450K",
    beds: 0,
    baths: 2,
    sqft: 2800,
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80",
    type: "Commercial",
    tokenized: true,
    apy: "9.1%",
    tag: "💼 Commercial",
  },
];

const INVESTMENTS = [
  {
    property: "ShadowTower NYC",
    tokens: "100 SKY4444",
    value: "$1,200",
    apy: "7.4%",
    earned: "$88.80",
    status: "active",
  },
  {
    property: "Dubai Marina Apt",
    tokens: "50 SKY4444",
    value: "$600",
    apy: "6.2%",
    earned: "$37.20",
    status: "active",
  },
];

export default function ShadowReal() {
  const [tab, setTab] = useState<
    "browse" | "invest" | "myprops" | "calculator"
  >("browse");
  const [search, setSearch] = useState("");
  const [investAmount, setInvestAmount] = useState("100");

  const filtered = LISTINGS.filter(
    l =>
      search === "" ||
      l.title.toLowerCase().includes(search.toLowerCase()) ||
      l.location.toLowerCase().includes(search.toLowerCase())
  );

  const calcReturn = () => {
    const amt = parseFloat(investAmount) || 0;
    const annual = amt * 0.084;
    const monthly = annual / 12;
    return { annual: annual.toFixed(2), monthly: monthly.toFixed(2) };
  };

  const returns = calcReturn();

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Home className="h-6 w-6 text-emerald-400" />
            ShadowReal
          </h1>
          <p className="text-sm text-muted-foreground">
            Tokenized real estate — own fractions with SKY4444
          </p>
        </div>
        <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 font-bold">
          🏠 Tokenized
        </Badge>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Properties", value: LISTINGS.length, emoji: "🏠" },
          { label: "Total Value", value: "$4.2B", emoji: "💰" },
          { label: "Avg APY", value: "7.8%", emoji: "📈" },
        ].map(s => (
          <Card key={s.label} className="border-border/50 text-center">
            <CardContent className="pt-2.5 pb-2.5">
              <p className="text-lg">{s.emoji}</p>
              <p className="font-black text-xs text-emerald-400">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-2">
        {(["browse", "invest", "myprops", "calculator"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-emerald-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t === "myprops" ? "My Properties" : t}
          </button>
        ))}
      </div>

      {tab === "browse" && (
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search properties..."
              className="pl-9 h-9 text-xs"
            />
          </div>
          {filtered.map((listing, i) => (
            <motion.div
              key={listing.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <Card className="border-border/50 overflow-hidden hover:border-emerald-500/20 transition-all">
                <div className="relative">
                  <img
                    src={listing.img}
                    alt={listing.title}
                    className="w-full h-36 object-cover"
                  />
                  <Badge className="absolute top-2 left-2 text-xs bg-black/60 text-white border-0">
                    {listing.tag}
                  </Badge>
                  {listing.tokenized && (
                    <Badge className="absolute top-2 right-2 text-xs bg-emerald-600 text-white border-0">
                      ⚡ Tokenized
                    </Badge>
                  )}
                </div>
                <CardContent className="py-3 px-4">
                  <div className="flex items-start justify-between mb-1">
                    <p className="font-black text-sm">{listing.title}</p>
                    <p className="font-black text-sm text-emerald-400 shrink-0 ml-2">
                      {listing.priceUSD}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    <MapPin className="h-3 w-3 inline mr-0.5" />
                    {listing.location}
                  </p>
                  <div className="flex gap-3 text-xs text-muted-foreground mb-2">
                    {listing.beds > 0 && (
                      <span>
                        <Bed className="h-3 w-3 inline mr-0.5" />
                        {listing.beds}
                      </span>
                    )}
                    <span>
                      <Bath className="h-3 w-3 inline mr-0.5" />
                      {listing.baths}
                    </span>
                    <span>
                      <Square className="h-3 w-3 inline mr-0.5" />
                      {listing.sqft} sqft
                    </span>
                    {listing.apy && (
                      <span className="text-emerald-400 font-bold">
                        {listing.apy} APY
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1 h-8 text-xs bg-emerald-600 text-white border-0"
                      onClick={() =>
                        toast.success(`✅ Investing in ${listing.title}!`)
                      }
                    >
                      {listing.tokenized ? "Buy Tokens" : "Make Offer"}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 text-xs"
                      onClick={() => toast.info("Opening property details...")}
                    >
                      Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "invest" && (
        <div className="space-y-3">
          <Card className="border-emerald-500/20 bg-emerald-900/5">
            <CardContent className="py-4 px-4">
              <p className="font-bold text-sm mb-2">
                Fractional Real Estate Investment
              </p>
              <p className="text-xs text-muted-foreground mb-3">
                Buy as little as $10 worth of tokenized real estate. Earn rental
                income in SKY4444.
              </p>
              {[
                {
                  property: "ShadowTower NYC",
                  location: "New York, NY",
                  minInvest: "$10",
                  apy: "7.4%",
                  funded: 78,
                  img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=200&q=80",
                },
                {
                  property: "Dubai Marina Apt",
                  location: "Dubai, UAE",
                  minInvest: "$50",
                  apy: "6.2%",
                  funded: 92,
                  img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=200&q=80",
                },
                {
                  property: "Austin Tech Campus",
                  location: "Austin, TX",
                  minInvest: "$25",
                  apy: "9.1%",
                  funded: 45,
                  img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&q=80",
                },
              ].map(prop => (
                <div
                  key={prop.property}
                  className="flex items-center gap-3 py-2 border-b border-border/20 last:border-0"
                >
                  <img
                    src={prop.img}
                    alt={prop.property}
                    className="h-12 w-16 rounded-lg object-cover shrink-0"
                  />
                  <div className="flex-1">
                    <p className="font-bold text-xs">{prop.property}</p>
                    <p className="text-xs text-muted-foreground">
                      {prop.location}
                    </p>
                    <div className="flex gap-2 text-xs mt-0.5">
                      <span className="text-emerald-400 font-bold">
                        {prop.apy} APY
                      </span>
                      <span className="text-muted-foreground">
                        Min: {prop.minInvest}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: `${prop.funded}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {prop.funded}%
                      </span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="h-8 text-xs bg-emerald-600 text-white border-0 shrink-0"
                    onClick={() =>
                      toast.success(`✅ Invested in ${prop.property}!`)
                    }
                  >
                    Invest
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "myprops" && (
        <div className="space-y-3">
          {INVESTMENTS.map((inv, i) => (
            <Card key={i} className="border-emerald-500/20 bg-emerald-900/5">
              <CardContent className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <Building className="h-8 w-8 text-emerald-400 shrink-0" />
                  <div className="flex-1">
                    <p className="font-bold text-sm">{inv.property}</p>
                    <p className="text-xs text-muted-foreground">
                      {inv.tokens} tokens · Value: {inv.value}
                    </p>
                    <p className="text-xs text-emerald-400 font-bold">
                      {inv.apy} APY · Earned: {inv.earned}
                    </p>
                  </div>
                  <Badge className="text-xs bg-green-500/10 text-green-400 border-green-500/20">
                    Active
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
          <Card className="border-border/50 text-center">
            <CardContent className="py-3 px-4">
              <p className="font-black text-lg text-emerald-400">$126.00</p>
              <p className="text-xs text-muted-foreground">
                Total Rental Income Earned
              </p>
              <Button
                size="sm"
                className="mt-2 h-8 text-xs bg-emerald-600 text-white border-0"
                onClick={() =>
                  toast.success("Rental income claimed to wallet!")
                }
              >
                Claim Income
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "calculator" && (
        <Card className="border-emerald-500/20 bg-emerald-900/5">
          <CardContent className="py-4 px-4 space-y-3">
            <p className="font-bold text-sm">Investment Return Calculator</p>
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                Investment Amount (USDT)
              </p>
              <Input
                value={investAmount}
                onChange={e => setInvestAmount(e.target.value)}
                type="number"
                className="h-9 text-xs"
              />
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-black/20 text-center">
                <p className="text-xs text-muted-foreground">
                  Annual Return (8.4%)
                </p>
                <p className="font-black text-lg text-emerald-400">
                  ${returns.annual}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-black/20 text-center">
                <p className="text-xs text-muted-foreground">Monthly Return</p>
                <p className="font-black text-lg text-emerald-400">
                  ${returns.monthly}
                </p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Returns paid in SKY4444 monthly
            </p>
            <Button
              className="w-full h-10 text-xs bg-emerald-600 text-white border-0 font-bold"
              onClick={() => toast.info("Opening investment flow...")}
            >
              <Zap className="h-4 w-4 mr-2" />
              Start Investing Now
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
