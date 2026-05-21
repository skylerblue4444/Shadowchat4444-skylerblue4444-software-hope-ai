import { useState } from "react";
import {
  TrendingUp,
  Heart,
  MessageCircle,
  Share2,
  Zap,
  Users,
  Star,
  DollarSign,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const POSTS = [
  {
    user: "SkylerBlue",
    avatar: "SB",
    content:
      "SKY4444 just hit a new ATH! 🚀 The ICO is crushing it — $2.4M raised in 48 hours. This is just the beginning. #SKY4444 #Web3",
    likes: 847,
    tips: "12.4 SKY",
    comments: 124,
    time: "2h ago",
    verified: true,
  },
  {
    user: "CryptoKing",
    avatar: "CK",
    content:
      "Just deployed my first smart contract on SKY Chain. The TPS is insane — 50,000 transactions per second. Binance can't compete 😤",
    likes: 423,
    tips: "5.2 SKY",
    comments: 67,
    time: "4h ago",
    verified: false,
  },
  {
    user: "Web3Builder",
    avatar: "WB",
    content:
      "The ShadowChat platform is the most complete Web3 app I've ever seen. 220+ pages, full DeFi, NFTs, social, IT services, gaming... this team is building something special",
    likes: 1204,
    tips: "28.7 SKY",
    comments: 203,
    time: "6h ago",
    verified: true,
  },
  {
    user: "TrumpFan2026",
    avatar: "TF",
    content:
      "TRUMP coin is up 45% today after the rally! Holding strong with my SKY4444 stack. Portfolio is up 340% this month 💰",
    likes: 612,
    tips: "8.1 SKY",
    comments: 89,
    time: "8h ago",
    verified: false,
  },
];

export default function ShadowSocialFi() {
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const [tipped, setTipped] = useState<Set<number>>(new Set());
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-emerald-400" />
          SocialFi
        </h1>
        <p className="text-sm text-muted-foreground">
          Earn SKY4444 for every like, comment, and share — social media meets
          DeFi
        </p>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {[
          {
            label: "Your Followers",
            value: "12.4K",
            color: "text-emerald-400",
          },
          { label: "SKY Earned", value: "284", color: "text-green-400" },
          { label: "Post Reach", value: "847K", color: "text-blue-400" },
          { label: "Engagement", value: "8.4%", color: "text-purple-400" },
        ].map(s => (
          <Card key={s.label} className="border-border/50 text-center">
            <CardContent className="py-3 px-2">
              <p className={"font-black text-lg " + s.color}>{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="border-border/50">
        <CardContent className="py-3 px-4">
          <textarea
            placeholder="Share your alpha... earn SKY4444 for every engagement 🚀"
            className="w-full h-16 bg-transparent text-sm resize-none focus:outline-none"
          />
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-muted-foreground">
              Earn 0.01 SKY per like · 0.05 SKY per comment
            </p>
            <Button
              size="sm"
              className="h-7 bg-emerald-600 text-white border-0 font-bold text-xs"
              onClick={() =>
                toast.success("Post published — earning SKY4444 rewards!")
              }
            >
              <Zap className="h-3 w-3 mr-1" />
              Post & Earn
            </Button>
          </div>
        </CardContent>
      </Card>
      <div className="space-y-3">
        {POSTS.map((post, i) => (
          <Card key={i} className="border-border/50">
            <CardContent className="py-3 px-4">
              <div className="flex items-start gap-3 mb-2">
                <div className="h-8 w-8 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 text-xs font-black text-emerald-400">
                  {post.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1">
                    <p className="font-bold text-sm">{post.user}</p>
                    {post.verified && (
                      <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                    )}
                    <span className="text-xs text-muted-foreground ml-auto">
                      {post.time}
                    </span>
                  </div>
                  <p className="text-sm mt-1 leading-relaxed">{post.content}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 pt-2 border-t border-border/30">
                <button
                  onClick={() => {
                    setLiked(l => {
                      const n = new Set(l);
                      n.has(i) ? n.delete(i) : n.add(i);
                      return n;
                    });
                  }}
                  className={
                    "flex items-center gap-1 text-xs font-medium transition-colors " +
                    (liked.has(i)
                      ? "text-rose-400"
                      : "text-muted-foreground hover:text-rose-400")
                  }
                >
                  <Heart
                    className={
                      "h-3.5 w-3.5 " + (liked.has(i) ? "fill-rose-400" : "")
                    }
                  />
                  {post.likes + (liked.has(i) ? 1 : 0)}
                </button>
                <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-blue-400 transition-colors">
                  <MessageCircle className="h-3.5 w-3.5" />
                  {post.comments}
                </button>
                <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-green-400 transition-colors">
                  <Share2 className="h-3.5 w-3.5" />
                  Share
                </button>
                <button
                  onClick={() => {
                    setTipped(t => new Set(Array.from(t).concat([i])));
                    toast.success("Tipped 1 SKY to " + post.user);
                  }}
                  className={
                    "flex items-center gap-1 text-xs font-bold ml-auto transition-colors " +
                    (tipped.has(i)
                      ? "text-green-400"
                      : "text-muted-foreground hover:text-green-400")
                  }
                >
                  <Zap className="h-3.5 w-3.5" />
                  {post.tips}
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
