import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, Star, ArrowRight, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const highlights = [
  {
    label: "AI-Powered Intelligence",
    desc: "Machine learning optimizes every feature automatically",
  },
  {
    label: "Real-Time Data Sync",
    desc: "Sub-second updates across all connected services",
  },
  {
    label: "Enterprise Security",
    desc: "SOC2 Type II certified with end-to-end encryption",
  },
  {
    label: "SKY4444 Integration",
    desc: "Earn tokens for every action on the platform",
  },
  {
    label: "Global Compliance",
    desc: "Meets regulatory requirements in 150+ countries",
  },
  {
    label: "24/7 Expert Support",
    desc: "Skyler Blue IT team available around the clock",
  },
];

export default function ShadowITRiskMgmt() {
  const [activated, setActivated] = useState(false);
  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-black">🛡️ IT Risk Mgmt</h1>
          <p className="text-sm text-muted-foreground">
            Comprehensive IT risk management with threat modeling, risk scoring,
            and mitigation planning
          </p>
        </div>
        <Badge className="bg-indigo-600 text-white shrink-0">
          Risk Control
        </Badge>
      </div>
      <div className="grid grid-cols-4 gap-2">
        <Card className="border-border/50 text-center">
          <CardContent className="py-3 px-2">
            <p className={"font-black text-lg text-red-400"}>8,247</p>
            <p className="text-xs text-muted-foreground">Risks Tracked</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 text-center">
          <CardContent className="py-3 px-2">
            <p className="font-black text-lg text-green-400">Low</p>
            <p className="text-xs text-muted-foreground">Avg Risk Score</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 text-center">
          <CardContent className="py-3 px-2">
            <p className="font-black text-lg text-blue-400">2,847</p>
            <p className="text-xs text-muted-foreground">Mitigations</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 text-center">
          <CardContent className="py-3 px-2">
            <p className="font-black text-lg text-orange-400">100%</p>
            <p className="text-xs text-muted-foreground">Compliance</p>
          </CardContent>
        </Card>
      </div>
      <div className="space-y-2">
        {highlights.map((h, i) => (
          <div
            key={i}
            className="flex items-start gap-3 rounded-lg bg-muted/30 border border-border/30 p-3"
          >
            <CheckCircle className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-xs">{h.label}</p>
              <p className="text-xs text-muted-foreground">{h.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-xl bg-gradient-to-br from-indigo-900/40 to-violet-900/40 border border-indigo-500/30 p-4">
        <p className="font-black text-sm mb-1">
          IT Risk Mgmt — Get Started Today
        </p>
        <p className="text-xs text-muted-foreground mb-3">
          Join 847,000+ users already using this feature
        </p>
        <div className="grid grid-cols-2 gap-2">
          <Button
            className={`font-bold border-0 ${activated ? "bg-green-600" : "bg-indigo-600"} text-white`}
            onClick={() => {
              setActivated(true);
              toast.success("IT Risk Mgmt activated! Enjoy your new features.");
            }}
          >
            <Zap className="h-4 w-4 mr-2" />
            {activated ? "Activated ✓" : "Activate Now"}
          </Button>
          <Button
            variant="outline"
            onClick={() => toast.info("Opening IT Risk Mgmt documentation...")}
          >
            <ArrowRight className="h-4 w-4 mr-2" /> Learn More
          </Button>
        </div>
      </div>
      <div className="rounded-xl bg-muted/50 border border-border/50 p-3 text-center">
        <p className="font-bold text-xs">
          Skyler Blue IT Resolutions • 479-406-7123
        </p>
        <p className="text-xs text-muted-foreground">
          skylerblue4444@gmail.com • Arkansas's #1 IT Partner
        </p>
      </div>
    </div>
  );
}
