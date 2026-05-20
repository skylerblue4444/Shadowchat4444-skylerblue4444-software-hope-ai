import { SafeCryptoCompliancePanel } from "@/components/SafeCryptoCompliancePanel";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap, TrendingUp, Users, DollarSign, Clock, Star, Shield,
  ChevronRight, ArrowRight, CheckCircle, Globe, Award, Rocket,
  BarChart2, Lock, Unlock, Calendar, FileText, Download,
  Bitcoin, Coins, Wallet, Target, Flame, Crown, Heart
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, AreaChart, Area, XAxis, YAxis } from "recharts";

// ICO Phases
const ICO_PHASES = [
  { phase: "Seed Round", price: 0.001, raised: 500000, target: 500000, status: "completed", bonus: "50%", start: "Jan 2024", end: "Feb 2024" },
  { phase: "Private Sale", price: 0.005, raised: 2000000, target: 2000000, status: "completed", bonus: "30%", start: "Feb 2024", end: "Mar 2024" },
  { phase: "Pre-Sale", price: 0.025, raised: 3200000, target: 5000000, status: "active", bonus: "15%", start: "Apr 2024", end: "Jun 2024" },
  { phase: "Public ICO", price: 0.05, raised: 0, target: 10000000, status: "upcoming", bonus: "5%", start: "Jul 2024", end: "Sep 2024" },
  { phase: "Exchange Listing", price: 0.12, raised: 0, target: 0, status: "upcoming", bonus: "0%", start: "Oct 2024", end: "—" },
];

const TOKENOMICS = [
  { name: "Public Sale", value: 30, color: "#3b82f6" },
  { name: "Team & Advisors", value: 15, color: "#8b5cf6" },
  { name: "Ecosystem Fund", value: 20, color: "#10b981" },
  { name: "Staking Rewards", value: 18, color: "#f59e0b" },
  { name: "Charity Reserve", value: 7, color: "#ef4444" },
  { name: "Liquidity Pool", value: 10, color: "#06b6d4" },
];

const TOTAL_SUPPLY = 4_444_444_444; // 4.444 Billion (SKY4444)

const ROADMAP = [
  { q: "Q1 2024", title: "Foundation", items: ["Smart contract audit", "Website launch", "Whitepaper v1", "Seed round close"], done: true },
  { q: "Q2 2024", title: "Build", items: ["ShadowChat beta", "Trading platform", "NFT marketplace", "Mobile app alpha"], done: true },
  { q: "Q3 2024", title: "Scale", items: ["Public ICO", "Exchange listings (3+)", "DAO governance live", "IT Resolutions integration"], done: false },
  { q: "Q4 2024", title: "Expand", items: ["China market entry", "50+ mini programs", "Charity gaming tournament", "World leader dashboard"], done: false },
  { q: "Q1 2025", title: "Dominate", items: ["1M users target", "TRUMP/SKY4444 bridge", "Institutional partnerships", "Global compliance"], done: false },
];

const PRICE_HISTORY = [
  { date: "Jan", price: 0.001 }, { date: "Feb", price: 0.003 }, { date: "Mar", price: 0.008 },
  { date: "Apr", price: 0.025 }, { date: "May", price: 0.031 }, { date: "Jun", price: 0.047 },
];

const INVESTORS = [
  { name: "CryptoWhale_88", amount: 250000, tier: "Whale", country: "🇺🇸" },
  { name: "DeFi_Wizard", amount: 100000, tier: "Shark", country: "🇬🇧" },
  { name: "China_Trader_01", amount: 75000, tier: "Shark", country: "🇨🇳" },
  { name: "NFT_Artist_Pro", amount: 50000, tier: "Dolphin", country: "🇯🇵" },
  { name: "GameFi_Master", amount: 25000, tier: "Dolphin", country: "🇰🇷" },
];

export default function ICOHub() {
  const [investAmount, setInvestAmount] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("USDC");
  const [timeLeft, setTimeLeft] = useState({ days: 47, hours: 12, mins: 33, secs: 21 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, mins, secs } = prev;
        secs--;
        if (secs < 0) { secs = 59; mins--; }
        if (mins < 0) { mins = 59; hours--; }
        if (hours < 0) { hours = 23; days--; }
        return { days, hours, mins, secs };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const currentPhase = ICO_PHASES.find(p => p.status === "active")!;
  const totalRaised = ICO_PHASES.reduce((sum, p) => sum + p.raised, 0);
  const totalTarget = ICO_PHASES.reduce((sum, p) => sum + p.target, 0);

  const tokensToReceive = investAmount ? (parseFloat(investAmount) / currentPhase.price * 1.15).toLocaleString(undefined, { maximumFractionDigits: 0 }) : "0";

  return (
    <div className="space-y-8">
      <SafeCryptoCompliancePanel focus="ico" compact />
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-950 via-blue-950 to-purple-950 border border-cyan-500/20 p-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(6,182,212,0.15),transparent_50%)]" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white">SKY4444 ICO</h1>
              <p className="text-cyan-300 text-sm">The Future of Decentralized Super-Platforms</p>
            </div>
            <Badge className="ml-auto bg-green-500/20 text-green-300 border-green-500/30 animate-pulse">🟢 LIVE Pre-Sale</Badge>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Current Price", value: `$${currentPhase.price}`, sub: "+15% bonus" },
              { label: "Total Raised", value: `$${(totalRaised / 1000000).toFixed(1)}M`, sub: `of $${(totalTarget / 1000000).toFixed(0)}M target` },
              { label: "Total Supply", value: "4.444B", sub: "SKY4444 tokens" },
              { label: "Investors", value: "8,432+", sub: "from 47 countries" },
            ].map(({ label, value, sub }) => (
              <div key={label} className="bg-white/5 rounded-xl p-3 border border-white/10">
                <p className="text-xs text-cyan-300">{label}</p>
                <p className="text-xl font-black text-white">{value}</p>
                <p className="text-xs text-white/50">{sub}</p>
              </div>
            ))}
          </div>

          {/* Countdown */}
          <div className="flex items-center gap-4 mb-6">
            <p className="text-sm text-white/70">Pre-Sale ends in:</p>
            {[
              { val: timeLeft.days, label: "Days" },
              { val: timeLeft.hours, label: "Hours" },
              { val: timeLeft.mins, label: "Mins" },
              { val: timeLeft.secs, label: "Secs" },
            ].map(({ val, label }) => (
              <div key={label} className="bg-black/30 rounded-xl px-3 py-2 text-center min-w-[56px]">
                <p className="text-2xl font-black text-cyan-300 font-mono">{String(val).padStart(2, "0")}</p>
                <p className="text-xs text-white/50">{label}</p>
              </div>
            ))}
          </div>

          {/* Buy Widget */}
          <div className="flex flex-wrap gap-3">
            <div className="flex-1 min-w-48">
              <Input placeholder="Amount (USDC/BTC/ETH)" className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-11" value={investAmount} onChange={e => setInvestAmount(e.target.value)} />
            </div>
            <div className="flex gap-2">
              {["USDC", "BTC", "ETH", "TRUMP"].map(c => (
                <button key={c} onClick={() => setSelectedCurrency(c)} className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${selectedCurrency === c ? "bg-cyan-500 text-black" : "bg-white/10 text-white/70 hover:bg-white/20"}`}>{c}</button>
              ))}
            </div>
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-bold border-0 h-11 px-6" onClick={() => toast.success(`Buying SKY4444 with ${investAmount || "0"} ${selectedCurrency}`)}>
              Buy SKY4444 <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
          {investAmount && <p className="text-sm text-cyan-300 mt-2">You receive: <span className="font-black text-white">{tokensToReceive} SKY4444</span> (+15% pre-sale bonus)</p>}
        </div>
      </div>

      {/* ICO Phases */}
      <div>
        <h2 className="text-lg font-black mb-4 flex items-center gap-2"><Rocket className="h-5 w-5 text-cyan-400" />ICO Phases</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {ICO_PHASES.map((phase, i) => (
            <Card key={phase.phase} className={`border-border/50 ${phase.status === "active" ? "border-cyan-500/30 bg-cyan-500/5" : ""}`}>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-muted-foreground">Phase {i + 1}</span>
                  <Badge className={`text-xs ${phase.status === "completed" ? "bg-green-500/10 text-green-400 border-green-500/20" : phase.status === "active" ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20 animate-pulse" : "bg-muted text-muted-foreground"}`}>
                    {phase.status}
                  </Badge>
                </div>
                <p className="font-bold text-sm">{phase.phase}</p>
                <p className="text-lg font-black text-cyan-400">${phase.price}</p>
                <p className="text-xs text-green-400">{phase.bonus} bonus</p>
                {phase.target > 0 && (
                  <>
                    <Progress value={(phase.raised / phase.target) * 100} className="h-1.5 mt-2" />
                    <p className="text-xs text-muted-foreground mt-1">${(phase.raised / 1000000).toFixed(1)}M / ${(phase.target / 1000000).toFixed(0)}M</p>
                  </>
                )}
                <p className="text-xs text-muted-foreground mt-1">{phase.start} – {phase.end}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Tokenomics + Price Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border/50">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-bold flex items-center gap-2"><Coins className="h-4 w-4 text-yellow-400" />Tokenomics — 4,444,444,444 SKY4444</CardTitle></CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <ResponsiveContainer width={180} height={180}>
                <PieChart>
                  <Pie data={TOKENOMICS} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                    {TOKENOMICS.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip formatter={(v: any) => `${v}%`} contentStyle={{ background: "#1a1a2e", border: "1px solid #333", borderRadius: 8, fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 flex-1">
                {TOKENOMICS.map(t => (
                  <div key={t.name} className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: t.color }} />
                    <span className="text-sm flex-1">{t.name}</span>
                    <span className="text-sm font-bold">{t.value}%</span>
                    <span className="text-xs text-muted-foreground font-mono">{((TOTAL_SUPPLY * t.value / 100) / 1000000).toFixed(0)}M</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-bold flex items-center gap-2"><TrendingUp className="h-4 w-4 text-green-400" />Price History & Projection</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={PRICE_HISTORY}>
                <defs>
                  <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#6b7280" }} />
                <YAxis tick={{ fontSize: 10, fill: "#6b7280" }} tickFormatter={v => `$${v}`} />
                <Tooltip formatter={(v: any) => `$${v}`} contentStyle={{ background: "#1a1a2e", border: "1px solid #333", borderRadius: 8, fontSize: 12 }} />
                <Area type="monotone" dataKey="price" stroke="#06b6d4" fill="url(#priceGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-3 gap-2 mt-3">
              {[{ label: "ATL", value: "$0.001", color: "text-red-400" }, { label: "Current", value: "$0.025", color: "text-cyan-400" }, { label: "Target", value: "$0.12", color: "text-green-400" }].map(({ label, value, color }) => (
                <div key={label} className="text-center p-2 rounded-lg bg-muted/30">
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className={`font-black text-sm ${color}`}>{value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Roadmap */}
      <div>
        <h2 className="text-lg font-black mb-4 flex items-center gap-2"><Calendar className="h-5 w-5 text-purple-400" />Roadmap</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {ROADMAP.map((item, i) => (
            <Card key={item.q} className={`border-border/50 ${item.done ? "border-green-500/20 bg-green-500/5" : ""}`}>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge className={`text-xs ${item.done ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-muted text-muted-foreground"}`}>{item.q}</Badge>
                  {item.done && <CheckCircle className="h-4 w-4 text-green-400" />}
                </div>
                <p className="font-bold text-sm mb-2">{item.title}</p>
                <ul className="space-y-1">
                  {item.items.map(it => (
                    <li key={it} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <div className={`h-1.5 w-1.5 rounded-full shrink-0 ${item.done ? "bg-green-400" : "bg-muted-foreground"}`} />
                      {it}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Top Investors */}
      <Card className="border-border/50">
        <CardHeader className="pb-2"><CardTitle className="text-sm font-bold flex items-center gap-2"><Crown className="h-4 w-4 text-yellow-400" />Top Investors</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-2">
            {INVESTORS.map((inv, i) => (
              <div key={inv.name} className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/20">
                <span className="text-sm font-bold text-muted-foreground w-5">#{i + 1}</span>
                <span className="text-lg">{inv.country}</span>
                <span className="flex-1 font-medium text-sm">{inv.name}</span>
                <Badge className="text-xs bg-yellow-500/10 text-yellow-400 border-yellow-500/20">{inv.tier}</Badge>
                <span className="font-mono font-bold text-sm text-green-400">${inv.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Documents */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          { title: "Whitepaper v2.0", desc: "Full technical documentation, tokenomics, and vision", icon: FileText, color: "text-blue-400" },
          { title: "Smart Contract Audit", desc: "CertiK audit report — 0 critical vulnerabilities", icon: Shield, color: "text-green-400" },
          { title: "Legal Opinion", desc: "SEC/CFTC compliance legal opinion by top-tier firm", icon: Award, color: "text-purple-400" },
        ].map(({ title, desc, icon: Icon, color }) => (
          <Card key={title} className="border-border/50 hover:border-blue-500/30 transition-colors cursor-pointer" onClick={() => toast.success(`Downloading ${title}`)}>
            <CardContent className="pt-4">
              <div className="flex items-start gap-3">
                <Icon className={`h-8 w-8 ${color} shrink-0`} />
                <div>
                  <p className="font-bold text-sm">{title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                </div>
                <Download className="h-4 w-4 text-muted-foreground ml-auto shrink-0" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
