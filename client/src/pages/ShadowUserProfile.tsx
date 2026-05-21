/**
 * ShadowChat User Profile — Skyler Blue
 */
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Edit,
  Copy,
  Share2,
  Shield,
  Star,
  Zap,
  TrendingUp,
} from "lucide-react";
import { toast } from "sonner";

const PROFILE = {
  name: "Skyler Blue",
  username: "@SkylerBlue4444",
  avatar: "👑",
  bio: "Founder of ShadowChat · SKY4444 Creator · IT Professional · Built $1M+ codebase solo in Arkansas · 479-406-7123",
  location: "Fayetteville, Arkansas 🇺🇸",
  joined: "2024",
  verified: true,
  badges: ["Founder", "Miner", "Trader", "Builder", "SKY4444 Creator"],
  stats: [
    { label: "SKY4444 Balance", value: "44,444 ✦" },
    { label: "Blocks Mined", value: "4,444" },
    { label: "Trades Made", value: "847" },
    { label: "Referrals", value: "847" },
    { label: "Shop Orders", value: "124" },
    { label: "Reputation", value: "⭐⭐⭐⭐⭐" },
  ],
  activity: [
    { type: "⛏️", text: "Mined SKY4444 block #4444", time: "2m ago" },
    { type: "📈", text: "Traded TRUMP/USDT +12.3%", time: "15m ago" },
    { type: "🛒", text: "Purchased SKY4444 Hoodie", time: "1h ago" },
    { type: "🎁", text: "Referred CryptoKing_CN", time: "2h ago" },
    { type: "💕", text: "Matched on CryptoDate", time: "3h ago" },
  ],
};

export default function ShadowUserProfile() {
  return (
    <div className="space-y-4">
      <Card className="border-yellow-500/30 bg-gradient-to-br from-yellow-900/20 to-indigo-900/10">
        <CardContent className="py-4 px-4">
          <div className="flex items-start gap-3">
            <div className="text-5xl">{PROFILE.avatar}</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <h1 className="text-xl font-black">{PROFILE.name}</h1>
                {PROFILE.verified && (
                  <Shield className="h-4 w-4 text-blue-400" />
                )}
              </div>
              <p className="text-xs text-muted-foreground mb-1">
                {PROFILE.username}
              </p>
              <p className="text-xs text-muted-foreground mb-2">
                {PROFILE.bio}
              </p>
              <p className="text-xs text-muted-foreground mb-2">
                📍 {PROFILE.location} · Joined {PROFILE.joined}
              </p>
              <div className="flex flex-wrap gap-1">
                {PROFILE.badges.map(b => (
                  <Badge
                    key={b}
                    className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs px-1.5 py-0"
                  >
                    {b}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-3">
            <Button size="sm" className="flex-1 h-7 text-xs">
              <Edit className="h-3 w-3 mr-1" />
              Edit Profile
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-7 text-xs"
              onClick={() => {
                navigator.clipboard.writeText(
                  "https://shadowchat.app/u/skylerblue4444"
                );
                toast.success("Profile link copied!");
              }}
            >
              <Copy className="h-3 w-3 mr-1" />
              Copy Link
            </Button>
            <Button size="sm" variant="outline" className="h-7 text-xs">
              <Share2 className="h-3 w-3" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-2">
        {PROFILE.stats.map(s => (
          <Card key={s.label} className="border-border/50 text-center">
            <CardContent className="py-2 px-2">
              <p className="font-black text-xs text-primary">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border/50">
        <CardContent className="py-3 px-4">
          <p className="font-black text-sm mb-2 flex items-center gap-1.5">
            <Zap className="h-4 w-4 text-yellow-400" />
            Recent Activity
          </p>
          <div className="space-y-1.5">
            {PROFILE.activity.map((a, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-xs py-1 border-b border-border/30 last:border-0"
              >
                <span>{a.type}</span>
                <span className="flex-1 text-muted-foreground">{a.text}</span>
                <span className="text-muted-foreground shrink-0">{a.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
