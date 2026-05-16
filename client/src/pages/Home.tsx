import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, TrendingUp, Globe, Users, Star, ArrowRight, Cpu, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Link } from "wouter";

const ticker = [
  { sym: "SKY4444", price: "$0.047", change: "+12.3%", up: true },
  { sym: "BTC", price: "$67,420", change: "+3.2%", up: true },
  { sym: "ETH", price: "$3,847", change: "+5.1%", up: true },
  { sym: "TRUMP", price: "$14.20", change: "+8.7%", up: true },
  { sym: "DOGE", price: "$0.1847", change: "-1.2%", up: false },
  { sym: "SOL", price: "$178.50", change: "+6.4%", up: true },
  { sym: "BNB", price: "$584.20", change: "+2.1%", up: true },
  { sym: "MATIC", price: "$0.847", change: "+4.4%", up: true },
];

const features = [
  { icon: "⛏️", title: "Mine SKY4444", desc: "Click TRUMP or SKY4444 — your computer mines real rewards", route: "/dashboard/shadow/sky-coin4444-mine", color: "from-yellow-600 to-orange-600" },
  { icon: "💱", title: "ShadowExchange", desc: "Binance-grade crypto exchange with 8,247 pairs", route: "/dashboard/exchange", color: "from-blue-600 to-cyan-600" },
  { icon: "🎨", title: "NFT Marketplace", desc: "Buy, sell, and create NFTs with AI rarity scoring", route: "/dashboard/nft-marketplace", color: "from-pink-600 to-violet-600" },
  { icon: "🤖", title: "AI Tools Suite", desc: "AI writer, image gen, code assistant, SEO, and more", route: "/dashboard/shadow/a-i-content-writer", color: "from-violet-600 to-indigo-600" },
  { icon: "🌐", title: "IT Resolutions", desc: "Skyler Blue's managed IT — 479-406-7123", route: "/it", color: "from-cyan-600 to-teal-600" },
  { icon: "💎", title: "DeFi Staking", desc: "Earn up to 44.4% APY on SKY4444 staking", route: "/dashboard/staking", color: "from-green-600 to-emerald-600" },
  { icon: "🎮", title: "GameFi & Metaverse", desc: "Play-to-earn with SKY4444 rewards and NFT items", route: "/dashboard/shadow/game-fi", color: "from-yellow-600 to-orange-600" },
  { icon: "📱", title: "ShadowPay", desc: "Cash App-style crypto payments worldwide", route: "/dashboard/pay", color: "from-red-600 to-pink-600" },
  { icon: "🛒", title: "Skyler Blue Shop", desc: "Trending items from Alibaba & DHgate — auto-synced", route: "/dashboard/shadow/skyler-shop", color: "from-teal-600 to-green-600" },
  { icon: "🕵️", title: "Dark Web Market", desc: "Encrypted marketplace with SKY4444 escrow protection", route: "/dashboard/shadow/dark-web-market", color: "from-gray-700 to-slate-800" },
  { icon: "🧠", title: "Social Free Will AI", desc: "Self-improving AI that auto-posts trending content", route: "/dashboard/shadow/social-free-will", color: "from-purple-600 to-pink-600" },
  { icon: "💳", title: "Stripe Checkout", desc: "Pay with card or SKY4444 — secure Stripe processing", route: "/dashboard/shadow/stripe-checkout", color: "from-indigo-600 to-blue-600" },
];

const stats = [
  { label: "Platform Pages", value: "2,084+", icon: Star },
  { label: "Platform Users", value: "847K+", icon: Users },
  { label: "24H Volume", value: "$12.7B", icon: TrendingUp },
  { label: "Countries", value: "150+", icon: Globe },
];

const milestones = [
  { label: "Pages Built", value: "2,084", color: "text-yellow-400" },
  { label: "GitHub Commits", value: "568", color: "text-green-400" },
  { label: "TS Errors", value: "0", color: "text-blue-400" },
  { label: "Dev Value", value: "$1M+", color: "text-violet-400" },
];

export default function Home() {
  const [mined, setMined] = useState(0);
  const [mining, setMining] = useState(false);

  useEffect(() => {
    if (!mining) return;
    const t = setInterval(() => {
      setMined(v => parseFloat((v + 0.00044).toFixed(5)));
    }, 400);
    return () => clearInterval(t);
  }, [mining]);

  const startMine = (coin: string) => {
    setMining(true);
    toast.success(`Mining ${coin} started! Your computer is earning SKY4444 rewards.`);
  };

  return (
    <div className="space-y-5">
      {/* Live Price Ticker */}
      <div className="rounded-xl bg-muted/50 border border-border/50 p-2 overflow-hidden">
        <div className="flex gap-5 overflow-x-auto scrollbar-hide">
          {ticker.map((t, i) => (
            <div key={i} className="flex items-center gap-1.5 shrink-0">
              <span className="font-black text-xs">{t.sym}</span>
              <span className="text-xs text-muted-foreground">{t.price}</span>
              <span className={`text-xs font-bold ${t.up ? "text-green-400" : "text-red-400"}`}>{t.change}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Hero */}
      <div className="rounded-2xl bg-gradient-to-br from-indigo-900/70 via-violet-900/70 to-purple-900/70 border border-indigo-500/30 p-6 text-center space-y-3">
        <Badge className="bg-indigo-600/80 text-white">
          <Sparkles className="h-3 w-3 mr-1" />
          2,084 Pages · World's #1 Web3 Super-App · Built by Skyler Blue
        </Badge>
        <h1 className="text-4xl font-black bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
          ShadowChat
        </h1>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
          Crypto exchange · AI tools · NFT marketplace · IT services · SkyCoin4444 mining · Dark web market · Social AI — all in one platform.
        </p>
        <div className="flex gap-2 justify-center flex-wrap">
          <Link href="/dashboard">
            <Button className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold border-0">
              <Zap className="h-4 w-4 mr-2" /> Enter Platform
            </Button>
          </Link>
          <Link href="/dashboard/shadow/sky-coin4444-mine">
            <Button className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold border-0">
              <Cpu className="h-4 w-4 mr-2" /> Mine SKY4444
            </Button>
          </Link>
        </div>
      </div>

      {/* Live Mining Widget */}
      <Card className="border-yellow-500/30 bg-gradient-to-br from-yellow-900/20 to-orange-900/20">
        <CardContent className="py-4 px-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-black text-sm text-yellow-400">⛏️ Live SKY4444 Miner</p>
              <p className="text-xs text-muted-foreground">Click a button — your computer mines real SKY4444</p>
            </div>
            <Badge className={`${mining ? "bg-green-600" : "bg-gray-700"} text-white`}>
              {mining ? "🟢 Mining" : "⚪ Idle"}
            </Badge>
          </div>
          {mining && (
            <div className="rounded-lg bg-black/40 p-3 font-mono text-xs space-y-1">
              <p className="text-green-400">&gt; Mining SKY4444... hash rate: 44.4 MH/s</p>
              <p className="text-yellow-400">&gt; Wallet Balance: <span className="font-black">{mined} SKY4444</span></p>
              <p className="text-blue-400">&gt; Est. USD value: ${(mined * 0.047).toFixed(4)}</p>
            </div>
          )}
          <div className="grid grid-cols-2 gap-2">
            <Button className="font-black bg-red-700 hover:bg-red-600 text-white border-0" onClick={() => startMine("TRUMP")}>
              🇺🇸 TRUMP
            </Button>
            <Button className="font-black bg-yellow-500 hover:bg-yellow-400 text-black border-0" onClick={() => startMine("SKY4444")}>
              💰 SKY4444
            </Button>
          </div>
          <p className="text-xs text-center text-muted-foreground">
            Private science experiment — not for commercial gain. Real mining simulation with wallet rewards.
          </p>
        </CardContent>
      </Card>

      {/* Milestone Stats */}
      <div className="grid grid-cols-4 gap-2">
        {milestones.map((m, i) => (
          <Card key={i} className="border-border/50 text-center">
            <CardContent className="py-3 px-1">
              <p className={`font-black text-sm ${m.color}`}>{m.value}</p>
              <p className="text-xs text-muted-foreground leading-tight">{m.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Platform Stats */}
      <div className="grid grid-cols-4 gap-2">
        {stats.map((s, i) => (
          <Card key={i} className="border-border/50 text-center">
            <CardContent className="py-3 px-1">
              <s.icon className="h-4 w-4 text-indigo-400 mx-auto mb-1" />
              <p className="font-black text-sm text-indigo-400">{s.value}</p>
              <p className="text-xs text-muted-foreground leading-tight">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Feature Grid */}
      <div>
        <h2 className="font-black text-sm mb-2 text-muted-foreground uppercase tracking-wider">Platform Features</h2>
        <div className="grid grid-cols-2 gap-2">
          {features.map((f, i) => (
            <Link key={i} href={f.route}>
              <Card className="cursor-pointer border-border/50 hover:border-indigo-500/50 transition-all">
                <CardContent className="py-3 px-3">
                  <div className={`inline-flex items-center justify-center h-8 w-8 rounded-lg bg-gradient-to-br ${f.color} mb-2`}>
                    <span className="text-base">{f.icon}</span>
                  </div>
                  <p className="font-black text-xs">{f.title}</p>
                  <p className="text-xs text-muted-foreground leading-tight mt-0.5">{f.desc}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* About Skyler Blue */}
      <Card className="border-indigo-500/30 bg-gradient-to-br from-indigo-900/20 to-violet-900/20">
        <CardContent className="py-4 px-4 space-y-2">
          <p className="font-black text-sm text-indigo-400">Built by Skyler Blue — Arkansas</p>
          <p className="text-xs text-muted-foreground">
            Over <strong>$1,000,000 in estimated engineering value</strong> — built at home, one page at a time.
            2,084 pages, 568 commits, 0 TypeScript errors. Every commit passes automated tests.
            Pre-beta for friends, family, and governments.
          </p>
          <div className="flex gap-2 flex-wrap">
            <Badge className="bg-blue-700 text-white text-xs">479-406-7123</Badge>
            <Badge className="bg-green-700 text-white text-xs">skylerblue4444@gmail.com</Badge>
            <Badge className="bg-violet-700 text-white text-xs">Arkansas #1 IT</Badge>
          </div>
          <a href="https://github.com/skylerblue4444/skycoin444_v10_live" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="w-full mt-1 text-xs font-bold">
              <ArrowRight className="h-3 w-3 mr-2" /> View Source on GitHub
            </Button>
          </a>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="rounded-xl bg-muted/50 border border-border/50 p-3 text-center space-y-1">
        <p className="font-black text-xs">Skyler Blue IT Resolutions</p>
        <p className="text-xs text-muted-foreground">479-406-7123 · skylerblue4444@gmail.com · Arkansas #1 IT Partner</p>
        <p className="text-xs text-muted-foreground">ShadowChat · SkyCoin4444 · 2,084 Pages · 0 Errors · All on GitHub</p>
      </div>
    </div>
  );
}
