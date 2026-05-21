import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, CheckCircle, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const features = [
  "AI-powered intelligence with real-time optimization",
  "Enterprise-grade security with SOC2 Type II certification",
  "SKY4444 token integration for rewards and payments",
  "Global compliance across 150+ countries",
  "24/7 Skyler Blue IT Resolutions expert support",
  "Seamless integration with all ShadowChat modules",
  "Real-time analytics and performance dashboards",
  "Mobile-first responsive design for all devices",
];

export default function ShadowEthereum() {
  const [active, setActive] = useState(false);
  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-black">Ethereum Hub</h1>
          <p className="text-sm text-muted-foreground">
            Comprehensive Ethereum integration hub with staking, DeFi, NFTs, and
            L2s
          </p>
        </div>
        <Badge className="bg-indigo-600 text-white shrink-0">Ethereum</Badge>
      </div>
      <div className="grid grid-cols-4 gap-2">
        <Card className="border-border/50 text-center">
          <CardContent className="py-3 px-2">
            <p className="font-black text-lg text-cyan-400">8.4M ETH</p>
            <p className="text-xs text-muted-foreground">ETH Staked</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 text-center">
          <CardContent className="py-3 px-2">
            <p className="font-black text-lg text-green-400">47</p>
            <p className="text-xs text-muted-foreground">L2s</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 text-center">
          <CardContent className="py-3 px-2">
            <p className="font-black text-lg text-blue-400">8.4B USD</p>
            <p className="text-xs text-muted-foreground">DeFi TVL</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 text-center">
          <CardContent className="py-3 px-2">
            <p className="font-black text-lg text-orange-400">847M USD/day</p>
            <p className="text-xs text-muted-foreground">NFT Volume</p>
          </CardContent>
        </Card>
      </div>
      <Card className="border-border/50">
        <CardContent className="py-3 px-4 space-y-2">
          {features.map((f, i) => (
            <div key={i} className="flex items-center gap-2">
              <CheckCircle className="h-3.5 w-3.5 text-green-400 shrink-0" />
              <span className="text-xs">{f}</span>
            </div>
          ))}
        </CardContent>
      </Card>
      <div className="rounded-xl bg-gradient-to-br from-indigo-900/40 to-violet-900/40 border border-indigo-500/30 p-4">
        <p className="font-black text-sm mb-1">Ethereum Hub — Activate Now</p>
        <p className="text-xs text-muted-foreground mb-3">
          Join 847000+ users already on ShadowChat
        </p>
        <div className="grid grid-cols-2 gap-2">
          <Button
            className={`font-bold border-0 ${active ? "bg-green-600" : "bg-indigo-600"} text-white`}
            onClick={() => {
              setActive(true);
              toast.success("Ethereum Hub activated!");
            }}
          >
            <Zap className="h-4 w-4 mr-2" />
            {active ? "Active" : "Activate"}
          </Button>
          <Button
            variant="outline"
            onClick={() => toast.info("Opening Ethereum Hub docs...")}
          >
            <ArrowRight className="h-4 w-4 mr-2" /> Learn More
          </Button>
        </div>
      </div>
      <div className="rounded-xl bg-muted/50 border border-border/50 p-3 text-center">
        <p className="font-bold text-xs">
          Skyler Blue IT Resolutions &bull; 479-406-7123
        </p>
        <p className="text-xs text-muted-foreground">
          skylerblue4444@gmail.com &bull; Arkansas #1 IT Partner
        </p>
      </div>
    </div>
  );
}
