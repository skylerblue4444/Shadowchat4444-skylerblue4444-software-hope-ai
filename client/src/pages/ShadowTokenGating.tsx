import { useState } from "react";
import { Lock, Unlock, Key, Users, Zap, CheckCircle, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const GATES = [
  {
    name: "ShadowChat VIP",
    token: "SKY4444",
    required: "1,000",
    members: 4847,
    perks: ["No ads", "Priority support", "VIP badge", "Early access"],
    unlocked: true,
  },
  {
    name: "Shadow Whale Club",
    token: "SKY4444",
    required: "100,000",
    members: 284,
    perks: ["OTC desk", "Private signals", "Whale chat", "Revenue share"],
    unlocked: false,
  },
  {
    name: "TRUMP Holders Lounge",
    token: "TRUMP",
    required: "10,000",
    members: 1204,
    perks: ["TRUMP signals", "Meme drops", "Political alpha"],
    unlocked: true,
  },
  {
    name: "Shadow Builder DAO",
    token: "SKY4444",
    required: "50,000",
    members: 892,
    perks: ["Dev grants", "SDK access", "Revenue share", "Governance"],
    unlocked: false,
  },
  {
    name: "NFT Creator Guild",
    token: "NFT",
    required: "1 NFT",
    members: 2341,
    perks: ["Creator tools", "Collab drops", "Royalty boost"],
    unlocked: false,
  },
];

export default function ShadowTokenGating() {
  const [unlocked, setUnlocked] = useState<Set<string>>(
    new Set(["ShadowChat VIP", "TRUMP Holders Lounge"])
  );
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black flex items-center gap-2">
          <Key className="h-6 w-6 text-orange-400" />
          Token Gating
        </h1>
        <p className="text-sm text-muted-foreground">
          Exclusive communities unlocked by holding SKY4444, TRUMP, or NFTs
        </p>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Communities", value: "5", color: "text-orange-400" },
          { label: "Unlocked", value: "2", color: "text-green-400" },
          { label: "Total Members", value: "9,568", color: "text-blue-400" },
        ].map(s => (
          <Card key={s.label} className="border-border/50 text-center">
            <CardContent className="py-3 px-2">
              <p className={"font-black text-xl " + s.color}>{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="space-y-3">
        {GATES.map((gate, i) => (
          <Card
            key={i}
            className={
              "border-border/50 " +
              (unlocked.has(gate.name) ? "border-orange-500/20" : "")
            }
          >
            <CardContent className="py-3 px-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-bold text-sm">{gate.name}</p>
                    {unlocked.has(gate.name) ? (
                      <Badge className="bg-green-500/10 text-green-400 border-0 text-xs">
                        Unlocked
                      </Badge>
                    ) : (
                      <Badge className="bg-orange-500/10 text-orange-400 border-0 text-xs">
                        Locked
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Requires {gate.required} {gate.token} ·{" "}
                    {gate.members.toLocaleString()} members
                  </p>
                </div>
                <div className="h-8 w-8 rounded-xl flex items-center justify-center shrink-0 ml-2">
                  {unlocked.has(gate.name) ? (
                    <Unlock className="h-4 w-4 text-green-400" />
                  ) : (
                    <Lock className="h-4 w-4 text-orange-400" />
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mb-2">
                {gate.perks.map(perk => (
                  <span
                    key={perk}
                    className="text-xs bg-muted rounded-full px-2 py-0.5"
                  >
                    {perk}
                  </span>
                ))}
              </div>
              {unlocked.has(gate.name) ? (
                <Button
                  size="sm"
                  className="w-full h-7 bg-green-600 text-white border-0 font-bold text-xs"
                  onClick={() => toast.success("Entering " + gate.name)}
                >
                  <Zap className="h-3 w-3 mr-1" />
                  Enter Community
                </Button>
              ) : (
                <Button
                  size="sm"
                  className="w-full h-7 bg-orange-600 text-white border-0 font-bold text-xs"
                  onClick={() =>
                    toast.info(
                      "Need " + gate.required + " " + gate.token + " to unlock"
                    )
                  }
                >
                  <Lock className="h-3 w-3 mr-1" />
                  Get {gate.token} to Unlock
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      <Button
        className="w-full h-10 bg-orange-600 text-white border-0 font-bold"
        onClick={() => toast.success("Token-gated community creator opened!")}
      >
        <Plus className="h-4 w-4 mr-2" />
        Create Token-Gated Community
      </Button>
    </div>
  );
}
