import { CheckCircle, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
export default function ShadowSkylerBlueITRecovery() {
  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between"><div><h1 className="text-2xl font-black">💾 IT Disaster Recovery</h1><p className="text-sm text-muted-foreground">Complete disaster recovery and business continuity planning — recover from any IT disaster in minutes</p></div><Badge className="bg-indigo-600 text-white shrink-0">Business Continuity</Badge></div>
      <div className="grid grid-cols-4 gap-2">
        <Card className="border-border/50 text-center"><CardContent className="py-3 px-2"><p className={"font-black text-lg text-cyan-400"}>94</p><p className="text-xs text-muted-foreground">DR Plans</p></CardContent></Card>
        <Card className="border-border/50 text-center"><CardContent className="py-3 px-2"><p className="font-black text-lg text-green-400"><15min</p><p className="text-xs text-muted-foreground">RTO Achieved</p></CardContent></Card>
        <Card className="border-border/50 text-center"><CardContent className="py-3 px-2"><p className="font-black text-lg text-blue-400"><5min</p><p className="text-xs text-muted-foreground">RPO Achieved</p></CardContent></Card>
        <Card className="border-border/50 text-center"><CardContent className="py-3 px-2"><p className="font-black text-lg text-orange-400">100%</p><p className="text-xs text-muted-foreground">Test Success</p></CardContent></Card>
      </div>
      <Card className="border-border/50"><CardContent className="py-3 px-4"><p className="font-bold text-sm mb-2">Features</p><div className="grid grid-cols-2 gap-1.5"><div className="flex items-center gap-1.5 text-xs text-muted-foreground"><CheckCircle className="h-3 w-3 text-green-400 shrink-0" />DR planning</div><div className="flex items-center gap-1.5 text-xs text-muted-foreground"><CheckCircle className="h-3 w-3 text-green-400 shrink-0" />Backup verification</div><div className="flex items-center gap-1.5 text-xs text-muted-foreground"><CheckCircle className="h-3 w-3 text-green-400 shrink-0" />Failover testing</div><div className="flex items-center gap-1.5 text-xs text-muted-foreground"><CheckCircle className="h-3 w-3 text-green-400 shrink-0" />Cloud DR</div><div className="flex items-center gap-1.5 text-xs text-muted-foreground"><CheckCircle className="h-3 w-3 text-green-400 shrink-0" />Runbook automation</div><div className="flex items-center gap-1.5 text-xs text-muted-foreground"><CheckCircle className="h-3 w-3 text-green-400 shrink-0" />Annual DR tests</div></div></CardContent></Card>
      <div className="rounded-xl bg-muted/50 border border-border/50 p-4 text-center"><p className="font-bold">Skyler Blue IT Resolutions</p><p className={"text-2xl font-black mt-1 text-cyan-400"}>479-406-7123</p><p className="text-xs text-muted-foreground mb-3">skylerblue4444@gmail.com</p><Button className="w-full h-10 bg-indigo-600 text-white border-0 font-black" onClick={() => toast.success("Request submitted!")}><Zap className="h-4 w-4 mr-2" />Get Started</Button></div>
    </div>
  );
}
