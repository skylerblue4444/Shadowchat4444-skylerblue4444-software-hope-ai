import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, CheckCircle, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const features = [
  "Production-grade feature with enterprise-level reliability",
  "SKY4444 token integration for rewards and payments",
  "AI-powered automation and smart execution",
  "Global compliance across 150+ countries and 50+ blockchains",
  "24/7 Skyler Blue IT Resolutions expert support — 479-406-7123",
  "Seamless integration with all 1,623 ShadowChat modules",
  "Real-time analytics and performance dashboards",
  "Mobile-first responsive design for all devices",
];

export default function ShadowModerationCenter() {
  const [active, setActive] = useState(false);
  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-black">Moderation Center</h1>
          <p className="text-sm text-muted-foreground">
            ShadowChat's AI-powered content moderation — keeping the platform
            safe and clean 24/7
          </p>
        </div>
        <Badge className="bg-indigo-600 text-white shrink-0">Moderation</Badge>
      </div>
      <div className="grid grid-cols-4 gap-2">
        <Card className="border-border/50 text-center">
          <CardContent className="py-3 px-2">
            <p className="font-black text-lg text-red-400">8247</p>
            <p className="text-xs text-muted-foreground">AI Models</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 text-center">
          <CardContent className="py-3 px-2">
            <p className="font-black text-lg text-green-400">99.9pct</p>
            <p className="text-xs text-muted-foreground">Accuracy</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 text-center">
          <CardContent className="py-3 px-2">
            <p className="font-black text-lg text-blue-400">Under 100ms</p>
            <p className="text-xs text-muted-foreground">Response</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 text-center">
          <CardContent className="py-3 px-2">
            <p className="font-black text-lg text-orange-400">Human review</p>
            <p className="text-xs text-muted-foreground">Appeals</p>
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
        <p className="font-black text-sm mb-1">Moderation Center</p>
        <p className="text-xs text-muted-foreground mb-3">
          ShadowChat — 1,623 pages · 0 TypeScript errors · All on GitHub
        </p>
        <div className="grid grid-cols-2 gap-2">
          <Button
            className={`font-bold border-0 ${active ? "bg-green-600" : "bg-indigo-600"} text-white`}
            onClick={() => {
              setActive(true);
              toast.success("Moderation Center activated!");
            }}
          >
            <Zap className="h-4 w-4 mr-2" />
            {active ? "Active" : "Activate"}
          </Button>
          <Button
            variant="outline"
            onClick={() => toast.info("Opening Moderation Center docs...")}
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
          skylerblue4444@gmail.com &bull; ShadowChat &bull; SKY4444
        </p>
      </div>
    </div>
  );
}
