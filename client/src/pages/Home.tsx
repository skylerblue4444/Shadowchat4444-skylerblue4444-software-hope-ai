import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, TrendingUp, Shield, Globe, Users, Star, ArrowRight, Play } from "lucide-react";
import { toast } from "sonner";
import { Link } from "wouter";

const ticker = [
  { sym: "SKY4444", price: "$0.047", change: "+12.3%", up: true },
  { sym: "BTC", price: "$67,420", change: "+3.2%", up: true },
  { sym: "ETH", price: "$3,847", change: "+5.1%", up: true },
  { sym: "TRUMP", price: "$14.20", change: "+8.7%", up: true },
  { sym: "DOGE", price: "$0.1847", change: "-1.2%", up: false },
  { sym: "SOL", price: "$178.50", change: "+6.4%", up: true },
];

const features = [
  { icon: "💱", title: "ShadowExchange", desc: "Binance-grade crypto exchange with 247 pairs", route: "/dashboard/shadow-exchange", color: "from-blue-600 to-cyan-600" },
  { icon: "🎨", title: "NFT Marketplace", desc: "Buy, sell, and create NFTs with AI rarity scoring", route: "/dashboard/nft-marketplace", color: "from-pink-600 to-violet-600" },
  { icon: "🏛️", title: "DAO Governance", desc: "Vote on platform decisions with SKY4444 tokens", route: "/dashboard/dao-governance", color: "from-orange-600 to-yellow-600" },
  { icon: "🤖", title: "AI Trading Bot", desc: "81.5% win rate AI strategies running 24/7", route: "/dashboard/shadow-ai-trader", color: "from-violet-600 to-indigo-600" },
  { icon: "🌐", title: "IT Resolutions", desc: "Skyler Blue's managed IT services for Arkansas", route: "/it", color: "from-cyan-600 to-teal-600" },
  { icon: "💎", title: "DeFi Staking", desc: "Earn up to 124.5% APY on SKY4444 staking", route: "/dashboard/staking", color: "from-green-600 to-emerald-600" },
  { icon: "🎮", title: "GameFi Hub", desc: "Play-to-earn with SKY4444 rewards and NFT items", route: "/dashboard/shadow-game-fi", color: "from-yellow-600 to-orange-600" },
  { icon: "📱", title: "ShadowPay", desc: "Cash App-style crypto payments worldwide", route: "/dashboard/shadow-pay", color: "from-red-600 to-pink-600" },
];

const stats = [
  { label: "Platform Users", value: "847K+", icon: Users },
  { label: "24H Volume", value: "$12.7B", icon: TrendingUp },
  { label: "Pages & Features", value: "500+", icon: Star },
  { label: "Countries", value: "150+", icon: Globe },
];

export default function Home() {
  const [tickerPos, setTickerPos] = useState(0);
  useEffect(() => { const t = setInterval(() => setTickerPos(p => (p + 1) % ticker.length), 2000); return () => clearInterval(t); }, []);
  
  return (
    <div className="space-y-6">
      {/* Live Price Ticker */}
      <div className="rounded-xl bg-muted/50 border border-border/50 p-2 overflow-hidden">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
          {ticker.map((t, i) => (
            <div key={i} className="flex items-center gap-1.5 shrink-0">
              <span className="font-black text-xs">{t.sym}</span>
              <span className="text-xs">{t.price}</span>
              <span className={`text-xs font-bold ${t.up ? "text-green-400" : "text-red-400"}`}>{t.change}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Hero */}
      <div className="rounded-2xl bg-gradient-to-br from-indigo-900/60 via-violet-900/60 to-purple-900/60 border border-indigo-500/30 p-6 text-center">
        <Badge className="bg-indigo-600/80 text-white mb-3">🚀 500+ Pages • World's #1 Web3 Super-App</Badge>
        <h1 className="text-3xl font-black bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400 bg-clip-text text-transparent mb-2">
          ShadowChat
        </h1>
        <p className="text-sm text-muted-foreground mb-4 max-w-sm mx-auto">
          Trade, socialize, earn, and build on the most comprehensive Web3 platform ever created — powered by SKY4444
        </p>
        <div className="flex gap-2 justify-center">
          <Button className="bg-indigo-600 text-white border-0 font-black" onClick={() => toast.success("Welcome to ShadowChat! Let's get started.")}>
            <Zap className="h-4 w-4 mr-2" /> Get Started Free
          </Button>
          <Button variant="outline" onClick={() => toast.info("Opening platform tour...")}>
            <Play className="h-4 w-4 mr-2" /> Watch Demo
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2">
        {stats.map((s, i) => (
          <Card key={i} className="border-border/50 text-center">
            <CardContent className="py-3 px-2">
              <s.icon className="h-4 w-4 mx-auto mb-1 text-indigo-400" />
              <p className="font-black text-base text-indigo-400">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Feature Grid */}
      <div>
        <h2 className="font-black text-sm mb-3">🌟 Platform Features</h2>
        <div className="grid grid-cols-2 gap-2">
          {features.map((f, i) => (
            <Link key={i} href={f.route}>
              <div className={`rounded-xl bg-gradient-to-br ${f.color} p-3 cursor-pointer hover:opacity-90 transition-opacity`}>
                <div className="text-xl mb-1">{f.icon}</div>
                <p className="font-black text-xs text-white">{f.title}</p>
                <p className="text-xs text-white/70 mt-0.5">{f.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Skyler Blue IT Banner */}
      <div className="rounded-xl bg-gradient-to-r from-cyan-900/40 to-blue-900/40 border border-cyan-500/20 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-black text-sm">🌟 Skyler Blue IT Resolutions</p>
            <p className="text-xs text-muted-foreground">Arkansas's #1 Managed IT Provider</p>
            <p className="font-black text-cyan-400 mt-1">479-406-7123</p>
          </div>
          <Link href="/it">
            <Button size="sm" className="bg-cyan-600 text-white border-0">
              <ArrowRight className="h-4 w-4 mr-1" /> Visit
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
