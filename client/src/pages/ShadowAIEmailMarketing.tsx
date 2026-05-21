import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, CheckCircle, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const features = [
  "AI-powered tool with real-time processing and optimization",
  "Enterprise-grade security with SOC2 Type II certification",
  "SKY4444 token integration for rewards and payments",
  "Global compliance across 150+ countries",
  "24/7 Skyler Blue IT Resolutions expert support",
  "Seamless integration with all ShadowChat modules",
  "Real-time analytics and performance dashboards",
  "Mobile-first responsive design for all devices",
];

export default function ShadowAIEmailMarketing() {
  const [active, setActive] = useState(false);
  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-black">AI Email Marketing</h1>
          <p className="text-sm text-muted-foreground">
            AI-powered email marketing with personalization, A/B testing, and
            automation
          </p>
        </div>
        <Badge className="bg-violet-600 text-white shrink-0">AI Email</Badge>
      </div>
      <div className="grid grid-cols-4 gap-2">
        <Card className="border-border/50 text-center">
          <CardContent className="py-3 px-2">
            <p className="font-black text-lg text-green-400">84pct</p>
            <p className="text-xs text-muted-foreground">Open Rate Boost</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 text-center">
          <CardContent className="py-3 px-2">
            <p className="font-black text-lg text-green-400">8247</p>
            <p className="text-xs text-muted-foreground">Templates</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 text-center">
          <CardContent className="py-3 px-2">
            <p className="font-black text-lg text-blue-400">AI</p>
            <p className="text-xs text-muted-foreground">Personalization</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 text-center">
          <CardContent className="py-3 px-2">
            <p className="font-black text-lg text-orange-400">Full</p>
            <p className="text-xs text-muted-foreground">Automation</p>
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
      <div className="rounded-xl bg-gradient-to-br from-violet-900/40 to-indigo-900/40 border border-violet-500/30 p-4">
        <p className="font-black text-sm mb-1">AI Email Marketing — Try Now</p>
        <p className="text-xs text-muted-foreground mb-3">
          Powered by ShadowChat AI — free to try
        </p>
        <div className="grid grid-cols-2 gap-2">
          <Button
            className={`font-bold border-0 ${active ? "bg-green-600" : "bg-violet-600"} text-white`}
            onClick={() => {
              setActive(true);
              toast.success("AI Email Marketing activated!");
            }}
          >
            <Zap className="h-4 w-4 mr-2" />
            {active ? "Active" : "Try Free"}
          </Button>
          <Button
            variant="outline"
            onClick={() => toast.info("Opening AI Email Marketing docs...")}
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
