import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Shield, Star, Zap, MessageCircle, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const profiles = [
  { id: 1, name: "Alex K.", age: 28, gender: "M", role: "DeFi Trader", portfolio: "$84K", coins: ["BTC","ETH","SKY4444"], verified: true, online: true, bio: "Full-time DeFi trader. Looking for someone who understands the grind. SKY4444 HODLer since day one.", match: 94 },
  { id: 2, name: "Maya R.", age: 26, gender: "F", role: "NFT Artist", portfolio: "$42K", coins: ["ETH","SOL","MATIC"], verified: true, online: true, bio: "NFT creator and crypto investor. Love talking charts, art, and building the future together.", match: 88 },
  { id: 3, name: "Jordan T.", age: 31, gender: "M", role: "Crypto VC", portfolio: "$420K", coins: ["BTC","BNB","SKY4444"], verified: true, online: false, bio: "Early Bitcoin adopter. Angel investor in 12 Web3 projects. Looking for a partner who thinks long-term.", match: 91 },
  { id: 4, name: "Priya S.", age: 24, gender: "F", role: "Blockchain Dev", portfolio: "$67K", coins: ["ETH","ARB","OP"], verified: true, online: true, bio: "Solidity developer building the next gen of DeFi. Swipe right if you can talk smart contracts.", match: 86 },
  { id: 5, name: "Chris M.", age: 29, gender: "M", role: "Day Trader", portfolio: "$31K", coins: ["BTC","DOGE","SKY4444"], verified: false, online: true, bio: "Day trader since 2019. I scream at charts for a living. Looking for someone who gets it.", match: 79 },
  { id: 6, name: "Zara L.", age: 27, gender: "F", role: "Crypto Influencer", portfolio: "$128K", coins: ["SOL","AVAX","SKY4444"], verified: true, online: true, bio: "200K crypto Twitter followers. Building in public. Looking for a genuine connection in the space.", match: 92 },
];

const interests = ["Bitcoin Maxis", "DeFi Degens", "NFT Collectors", "Day Traders", "HODLers", "Web3 Builders", "Crypto Investors", "AI Enthusiasts", "GameFi Players", "DAO Governors"];

const safetyFeatures = [
  "AI-powered profile verification — no fake accounts",
  "Heavy content moderation — 24/7 AI + human review",
  "SKY4444 tip system — send appreciation anonymously",
  "Encrypted messaging — end-to-end, zero knowledge",
  "Report & block — instant action, no questions asked",
  "Age verification required — 18+ only, strictly enforced",
];

export default function ShadowCryptoDate() {
  const [liked, setLiked] = useState<number[]>([]);
  const [filter, setFilter] = useState("All");

  const handleLike = (id: number, name: string) => {
    setLiked(l => [...l, id]);
    toast.success(`You liked ${name}! If they like you back, it's a match. 💰`);
  };

  const filtered = filter === "All" ? profiles : profiles.filter(p => p.gender === filter[0]);

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-black">CryptoDate</h1>
          <p className="text-xs text-muted-foreground">Meet crypto enthusiasts, investors, and builders. Heavily moderated. SKY4444 tipping built in.</p>
        </div>
        <Badge className="bg-pink-600 text-white shrink-0"><Heart className="h-3 w-3 mr-1" />{liked.length} Likes</Badge>
      </div>

      {/* Safety Banner */}
      <Card className="border-green-500/30 bg-gradient-to-br from-green-900/20 to-emerald-900/20">
        <CardContent className="py-3 px-4 space-y-2">
          <p className="font-black text-sm text-green-400 flex items-center gap-2"><Shield className="h-4 w-4" /> Safety First — Heavily Moderated Platform</p>
          <div className="grid grid-cols-2 gap-1">
            {safetyFeatures.map((f, i) => (
              <div key={i} className="flex items-start gap-1.5">
                <CheckCircle className="h-3 w-3 text-green-400 shrink-0 mt-0.5" />
                <span className="text-xs text-muted-foreground">{f}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Filter */}
      <div className="flex gap-2">
        {["All", "Men", "Women"].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${filter === f ? "bg-pink-600 text-white" : "bg-muted/50 text-muted-foreground"}`}>
            {f}
          </button>
        ))}
      </div>

      {/* Interests */}
      <div>
        <p className="font-black text-xs text-muted-foreground uppercase tracking-wider mb-2">Browse by Interest</p>
        <div className="flex gap-2 flex-wrap">
          {interests.map((tag, i) => (
            <Badge key={i} className="bg-indigo-800 text-indigo-200 text-xs cursor-pointer hover:bg-indigo-700"
              onClick={() => toast.info(`Filtering by ${tag}...`)}>
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Profiles */}
      <div className="grid grid-cols-2 gap-3">
        {filtered.map(p => (
          <Card key={p.id} className={`border-border/50 transition-all ${liked.includes(p.id) ? "border-pink-500/50" : "hover:border-pink-500/30"}`}>
            <CardContent className="py-3 px-3 space-y-2">
              <div className="flex items-start justify-between">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-pink-600 to-violet-600 flex items-center justify-center font-black text-sm text-white">
                  {p.name[0]}
                </div>
                <div className="text-right">
                  {p.online && <Badge className="bg-green-700 text-white text-xs">Online</Badge>}
                  {p.verified && <p className="text-xs text-blue-400 mt-0.5">✓ Verified</p>}
                </div>
              </div>
              <div>
                <p className="font-black text-xs">{p.name}, {p.age}</p>
                <p className="text-xs text-muted-foreground">{p.role}</p>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                <span className="text-xs font-bold text-yellow-400">{p.match}% match</span>
              </div>
              <p className="text-xs text-muted-foreground leading-tight line-clamp-2">{p.bio}</p>
              <div className="flex gap-1 flex-wrap">
                {p.coins.map((c, i) => <Badge key={i} className="bg-gray-800 text-gray-300 text-xs">{c}</Badge>)}
              </div>
              <p className="text-xs text-green-400 font-bold">Portfolio: {p.portfolio}</p>
              <div className="grid grid-cols-2 gap-1">
                <Button
                  className={`h-7 text-xs font-bold border-0 ${liked.includes(p.id) ? "bg-pink-700" : "bg-pink-600 hover:bg-pink-500"} text-white`}
                  onClick={() => handleLike(p.id, p.name)}
                  disabled={liked.includes(p.id)}
                >
                  <Heart className="h-3 w-3 mr-1" />{liked.includes(p.id) ? "Liked" : "Like"}
                </Button>
                <Button variant="outline" className="h-7 text-xs font-bold"
                  onClick={() => toast.info(`Opening chat with ${p.name}...`)}>
                  <MessageCircle className="h-3 w-3 mr-1" /> Chat
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* SKY4444 Tip System */}
      <Card className="border-yellow-500/30 bg-gradient-to-br from-yellow-900/20 to-orange-900/20">
        <CardContent className="py-3 px-4 space-y-2">
          <p className="font-black text-sm text-yellow-400">💰 SKY4444 Tipping</p>
          <p className="text-xs text-muted-foreground">Send SKY4444 tips to people you like — anonymously or with a message. Tips go directly to their wallet.</p>
          <div className="grid grid-cols-3 gap-2">
            {[10, 44, 100].map(amt => (
              <Button key={amt} className="h-8 text-xs font-bold bg-yellow-600 hover:bg-yellow-500 text-black border-0"
                onClick={() => toast.success(`Sent ${amt} SKY4444 tip!`)}>
                {amt} SKY4444
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="rounded-xl bg-muted/50 border border-border/50 p-3 text-center">
        <p className="font-black text-xs">CryptoDate by ShadowChat</p>
        <p className="text-xs text-muted-foreground">18+ only · AI moderated · SKY4444 powered · Skyler Blue 479-406-7123</p>
      </div>
    </div>
  );
}
