import { CheckCircle, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
export default function ShadowSkylerBlueITSecurity9() {
  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-black">☁️ Cloud Security</h1>
          <p className="text-sm text-muted-foreground">
            Cloud security posture management for AWS, Azure, and GCP — find and
            fix cloud misconfigurations automatically
          </p>
        </div>
        <Badge className="bg-indigo-600 text-white shrink-0">CSPM</Badge>
      </div>
      <div className="grid grid-cols-4 gap-2">
        <Card className="border-border/50 text-center">
          <CardContent className="py-3 px-2">
            <p className={"font-black text-lg text-sky-400"}>247</p>
            <p className="text-xs text-muted-foreground">Cloud Accounts</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 text-center">
          <CardContent className="py-3 px-2">
            <p className="font-black text-lg text-green-400">4,847</p>
            <p className="text-xs text-muted-foreground">Misconfigs Found</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 text-center">
          <CardContent className="py-3 px-2">
            <p className="font-black text-lg text-blue-400">97%</p>
            <p className="text-xs text-muted-foreground">Fixed</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 text-center">
          <CardContent className="py-3 px-2">
            <p className="font-black text-lg text-orange-400">A+</p>
            <p className="text-xs text-muted-foreground">Compliance Score</p>
          </CardContent>
        </Card>
      </div>
      <Card className="border-border/50">
        <CardContent className="py-3 px-4">
          <p className="font-bold text-sm mb-2">Features</p>
          <div className="grid grid-cols-2 gap-1.5">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <CheckCircle className="h-3 w-3 text-green-400 shrink-0" />
              CSPM/CWPP
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <CheckCircle className="h-3 w-3 text-green-400 shrink-0" />
              Cloud compliance
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <CheckCircle className="h-3 w-3 text-green-400 shrink-0" />
              Misconfiguration detection
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <CheckCircle className="h-3 w-3 text-green-400 shrink-0" />
              Auto-remediation
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <CheckCircle className="h-3 w-3 text-green-400 shrink-0" />
              Multi-cloud
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <CheckCircle className="h-3 w-3 text-green-400 shrink-0" />
              Cost optimization
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="rounded-xl bg-muted/50 border border-border/50 p-4 text-center">
        <p className="font-bold">Skyler Blue IT Resolutions</p>
        <p className={"text-2xl font-black mt-1 text-sky-400"}>479-406-7123</p>
        <p className="text-xs text-muted-foreground mb-3">
          skylerblue4444@gmail.com
        </p>
        <Button
          className="w-full h-10 bg-indigo-600 text-white border-0 font-black"
          onClick={() => toast.success("Request submitted!")}
        >
          <Zap className="h-4 w-4 mr-2" />
          Get Started
        </Button>
      </div>
    </div>
  );
}
