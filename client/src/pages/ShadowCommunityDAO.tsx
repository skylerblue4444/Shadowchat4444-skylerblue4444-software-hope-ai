import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Zap,
  Star,
  TrendingUp,
  Shield,
  Globe,
} from "lucide-react";
import { toast } from "sonner";

const features = [
  {
    icon: "🔥",
    title: "AI-Powered",
    desc: "Machine learning drives every decision",
  },
  { icon: "⚡", title: "Real-Time", desc: "Live data with sub-second updates" },
  { icon: "🔒", title: "Secure", desc: "Military-grade encryption throughout" },
  { icon: "🌍", title: "Global", desc: "Available in 150+ countries" },
  { icon: "💰", title: "Earn SKY4444", desc: "Rewards for every interaction" },
  { icon: "📱", title: "Mobile First", desc: "Perfect on any device" },
];

export default function ShadowCommunityDAO() {
  const [liked, setLiked] = useState(false);
  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-black">🏛️ Community DAO</h1>
          <p className="text-sm text-muted-foreground">
            Community-driven DAO for platform governance with quadratic voting
            and delegation
          </p>
        </div>
        <Badge className="bg-indigo-600 text-white shrink-0">
          Govern Together
        </Badge>
      </div>
      <div className="grid grid-cols-4 gap-2">
        <Card className="border-border/50 text-center">
          <CardContent className="py-3 px-2">
            <p className={"font-black text-lg text-orange-400"}>84,247</p>
            <p className="text-xs text-muted-foreground">Members</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 text-center">
          <CardContent className="py-3 px-2">
            <p className="font-black text-lg text-green-400">847</p>
            <p className="text-xs text-muted-foreground">Proposals</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 text-center">
          <CardContent className="py-3 px-2">
            <p className="font-black text-lg text-blue-400">$47M</p>
            <p className="text-xs text-muted-foreground">Treasury</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 text-center">
          <CardContent className="py-3 px-2">
            <p className="font-black text-lg text-orange-400">67%</p>
            <p className="text-xs text-muted-foreground">Participation</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {features.map((f, i) => (
          <Card key={i} className="border-border/50">
            <CardContent className="py-3 px-3 flex items-start gap-2">
              <span className="text-lg">{f.icon}</span>
              <div>
                <p className="font-bold text-xs">{f.title}</p>
                <p className="text-xs text-muted-foreground">{f.desc}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="rounded-xl bg-gradient-to-br from-indigo-900/30 to-violet-900/30 border border-indigo-500/20 p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="font-black text-sm">Community DAO — Premium Access</p>
            <p className="text-xs text-muted-foreground">
              Unlock all features with SKY4444 staking
            </p>
          </div>
          <div className="text-right">
            <p className="font-black text-green-400">FREE</p>
            <p className="text-xs text-muted-foreground">with 1,000 SKY4444</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button
            className="bg-indigo-600 text-white border-0 font-bold"
            onClick={() =>
              toast.success("Community DAO activated! Welcome aboard.")
            }
          >
            <Zap className="h-4 w-4 mr-2" /> Get Started
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setLiked(!liked);
              toast.success(
                liked ? "Removed from favorites" : "Added to favorites!"
              );
            }}
          >
            <Star
              className={`h-4 w-4 mr-2 ${liked ? "fill-yellow-400 text-yellow-400" : ""}`}
            />{" "}
            {liked ? "Saved" : "Save"}
          </Button>
        </div>
      </div>
      <div className="rounded-xl bg-muted/50 border border-border/50 p-4 text-center">
        <p className="font-bold text-sm">Skyler Blue IT Resolutions</p>
        <p className="text-xl font-black text-cyan-400 mt-1">479-406-7123</p>
        <p className="text-xs text-muted-foreground">
          skylerblue4444@gmail.com
        </p>
      </div>
    </div>
  );
}
