import { Smartphone, Download, Star, Shield, Zap, Globe, Bell, Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const FEATURES = [
  { icon: "💬", name: "ShadowChat",      desc: "End-to-end encrypted messaging with crypto tipping" },
  { icon: "💰", name: "ShadowPay",       desc: "Send & receive crypto in seconds worldwide" },
  { icon: "📈", name: "ShadowTrade",     desc: "Trade 200+ crypto pairs on the go" },
  { icon: "🎮", name: "ShadowGames",     desc: "Play-to-earn games with SKY4444 rewards" },
  { icon: "🎨", name: "ShadowNFT",       desc: "Browse, buy, and sell NFTs from your phone" },
  { icon: "🗳️", name: "ShadowVote",      desc: "Participate in DAO governance anywhere" },
  { icon: "🔒", name: "ShadowVault",     desc: "Biometric-secured cold storage wallet" },
  { icon: "🌍", name: "ShadowID",        desc: "Decentralized identity and KYC on mobile" },
];

const REVIEWS = [
  { user: "CryptoKing88",   rating: 5, text: "Best crypto app I've ever used. SKY4444 gains are insane!" },
  { user: "ShadowFan2026",  rating: 5, text: "The messaging + trading combo is unbeatable. 10/10!" },
  { user: "Web3Builder",    rating: 5, text: "Finally an app that does everything. Love the IT services section!" },
];

export default function ShadowMobileApp() {
  return (
    <div className="space-y-6">
      <div className="relative rounded-2xl bg-gradient-to-br from-violet-900/40 via-purple-900/30 to-indigo-900/40 border border-violet-500/20 p-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.15),transparent_70%)]" />
        <div className="relative">
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center mx-auto mb-3">
            <Smartphone className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-black text-white">ShadowChat Mobile</h1>
          <p className="text-violet-300 text-sm mt-1">The World's Most Powerful Web3 Super-App</p>
          <div className="flex items-center justify-center gap-1 mt-2">
            {[1,2,3,4,5].map(s => <Star key={s} className="h-4 w-4 text-yellow-400 fill-yellow-400" />)}
            <span className="text-sm text-muted-foreground ml-1">4.9 (128K reviews)</span>
          </div>
          <div className="flex gap-3 mt-4 justify-center">
            <Button className="h-10 bg-black text-white border-0 font-bold px-4" onClick={() => toast.success("Redirecting to App Store...")}>
              <Download className="h-4 w-4 mr-2" />App Store
            </Button>
            <Button className="h-10 bg-green-700 text-white border-0 font-bold px-4" onClick={() => toast.success("Redirecting to Google Play...")}>
              <Download className="h-4 w-4 mr-2" />Google Play
            </Button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: "Downloads",  value: "2.4M+",  color: "text-violet-400" },
          { label: "Countries",  value: "147",    color: "text-green-400"  },
          { label: "Rating",     value: "4.9★",   color: "text-yellow-400" },
          { label: "Size",       value: "48MB",   color: "text-blue-400"   },
        ].map(s => (
          <Card key={s.label} className="border-border/50 text-center">
            <CardContent className="py-3 px-2">
              <p className={"font-black text-lg " + s.color}>{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="space-y-2">
        <p className="text-sm font-bold">App Features</p>
        <div className="grid grid-cols-2 gap-2">
          {FEATURES.map((f, i) => (
            <Card key={i} className="border-border/50">
              <CardContent className="py-2.5 px-3 flex items-center gap-2">
                <span className="text-lg">{f.icon}</span>
                <div>
                  <p className="font-bold text-xs">{f.name}</p>
                  <p className="text-xs text-muted-foreground leading-tight">{f.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-sm font-bold">User Reviews</p>
        {REVIEWS.map((r, i) => (
          <Card key={i} className="border-border/50">
            <CardContent className="py-3 px-4">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-bold text-sm">{r.user}</p>
                <div className="flex">{[1,2,3,4,5].map(s => <Star key={s} className="h-3 w-3 text-yellow-400 fill-yellow-400" />)}</div>
              </div>
              <p className="text-xs text-muted-foreground">{r.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
