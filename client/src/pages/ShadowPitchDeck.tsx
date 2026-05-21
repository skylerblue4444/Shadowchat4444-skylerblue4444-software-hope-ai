/**
 * ShadowChat Pitch Deck — Investor Presentation
 * $1M+ engineering value · 1,655 pages · Built in Arkansas
 */
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  Users,
  Globe2,
  Zap,
  DollarSign,
  Shield,
  Cpu,
  Star,
} from "lucide-react";

const SLIDES = [
  {
    num: "01",
    title: "The Problem",
    icon: "😤",
    content:
      "Crypto traders, IT professionals, and global shoppers are scattered across 10+ platforms. No single platform combines crypto trading, IT services, social networking, marketplace, and mining.",
  },
  {
    num: "02",
    title: "The Solution",
    icon: "✦",
    content:
      "ShadowChat — the world's first all-in-one crypto-social-commerce platform. Mine coins, trade crypto, buy products, date crypto people, get IT support, all in one app.",
  },
  {
    num: "03",
    title: "Market Size",
    icon: "🌍",
    content:
      "Crypto users: 420M globally. IT services market: $1.2T. Social commerce: $1.3T. We sit at the intersection of all three. TAM: $3.5 Trillion.",
  },
  {
    num: "04",
    title: "Traction",
    icon: "📈",
    content:
      "1,655 pages built. 548 GitHub commits. 0 TypeScript errors. $1M+ engineering value. Built solo in Arkansas. SKY4444 token live. Mining operational.",
  },
  {
    num: "05",
    title: "Revenue Model",
    icon: "💰",
    content:
      "6 revenue streams: (1) Trading fees 0.1%, (2) Shop commissions 5-15%, (3) SKY4444 token appreciation, (4) IT services $99-$999/mo, (5) Premium subscriptions $9.99-$99/mo, (6) Advertising.",
  },
  {
    num: "06",
    title: "Competitive Moat",
    icon: "🏰",
    content:
      "SKY4444 token creates lock-in. Mining rewards create daily active users. IT services create B2B revenue. Global marketplace creates network effects. No competitor has all 6.",
  },
  {
    num: "07",
    title: "The Team",
    icon: "👑",
    content:
      "Skyler Blue — Founder, CEO, Lead Engineer. Built $1M+ codebase solo. IT professional with 10+ years experience. Based in Arkansas. Phone: 479-406-7123.",
  },
  {
    num: "08",
    title: "The Ask",
    icon: "🤝",
    content:
      "Seeking $500K seed round for: server infrastructure ($100K), marketing ($200K), team hiring ($150K), legal/compliance ($50K). Projected 100K users in 12 months.",
  },
];

const METRICS = [
  {
    label: "Pages Built",
    value: "1,655",
    icon: <Cpu className="h-4 w-4" />,
    color: "text-blue-400",
  },
  {
    label: "GitHub Commits",
    value: "548",
    icon: <Shield className="h-4 w-4" />,
    color: "text-green-400",
  },
  {
    label: "TS Errors",
    value: "0",
    icon: <Star className="h-4 w-4" />,
    color: "text-yellow-400",
  },
  {
    label: "Dev Value",
    value: "$1M+",
    icon: <DollarSign className="h-4 w-4" />,
    color: "text-purple-400",
  },
  {
    label: "Coins Supported",
    value: "6",
    icon: <Zap className="h-4 w-4" />,
    color: "text-orange-400",
  },
  {
    label: "Target Markets",
    value: "3",
    icon: <Globe2 className="h-4 w-4" />,
    color: "text-cyan-400",
  },
];

export default function ShadowPitchDeck() {
  return (
    <div className="space-y-4">
      <div className="text-center py-4">
        <h1 className="text-3xl font-black mb-1">ShadowChat</h1>
        <p className="text-lg text-muted-foreground mb-2">
          The World's First Crypto-Social-Commerce Platform
        </p>
        <div className="flex items-center justify-center gap-2">
          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
            SKY4444 ✦
          </Badge>
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
            Seed Round Open
          </Badge>
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
            479-406-7123
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {METRICS.map(m => (
          <Card key={m.label} className="border-border/50 text-center">
            <CardContent className="py-3 px-2">
              <span className={m.color}>{m.icon}</span>
              <p className={`font-black text-lg ${m.color}`}>{m.value}</p>
              <p className="text-xs text-muted-foreground">{m.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-3">
        {SLIDES.map(slide => (
          <Card
            key={slide.num}
            className="border-border/50 hover:border-primary/30 transition-all"
          >
            <CardContent className="py-3 px-4">
              <div className="flex items-start gap-3">
                <div className="shrink-0 text-center">
                  <p className="text-2xl">{slide.icon}</p>
                  <p className="text-xs text-muted-foreground font-mono">
                    {slide.num}
                  </p>
                </div>
                <div>
                  <p className="font-black text-sm mb-1">{slide.title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {slide.content}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-primary/30 bg-primary/5">
        <CardContent className="py-4 px-4 text-center">
          <p className="font-black text-sm mb-1">Ready to Invest?</p>
          <p className="text-xs text-muted-foreground mb-3">
            Contact Skyler Blue directly. We are building something the world
            has never seen.
          </p>
          <div className="flex gap-2 justify-center">
            <Button size="sm" className="text-xs">
              📞 479-406-7123
            </Button>
            <Button size="sm" variant="outline" className="text-xs">
              📧 skylerblue4444@gmail.com
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
