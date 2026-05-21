import { useState } from "react";
import {
  Users,
  DollarSign,
  Link,
  TrendingUp,
  Copy,
  CheckCircle,
  Gift,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const TIERS = [
  {
    name: "Bronze",
    referrals: "0-10",
    commission: "10%",
    bonus: "100 SKY",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
  },
  {
    name: "Silver",
    referrals: "11-50",
    commission: "15%",
    bonus: "500 SKY",
    color: "text-gray-300",
    bg: "bg-gray-500/10",
  },
  {
    name: "Gold",
    referrals: "51-200",
    commission: "20%",
    bonus: "2K SKY",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
  },
  {
    name: "Diamond",
    referrals: "201+",
    commission: "25%",
    bonus: "10K SKY",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
];

const REFERRALS = [
  {
    user: "CryptoKing42",
    joined: "May 10",
    earnings: "$84.20",
    status: "active",
  },
  { user: "SkyWhale", joined: "May 8", earnings: "$420.00", status: "active" },
  {
    user: "TrumpFan2026",
    joined: "May 5",
    earnings: "$42.00",
    status: "active",
  },
  {
    user: "DeFiDegen",
    joined: "Apr 28",
    earnings: "$0.00",
    status: "inactive",
  },
];

export default function ShadowAffiliates() {
  const [copied, setCopied] = useState(false);
  const refLink = "https://shadowchat.io/ref/SKYLER4444";

  const copyLink = () => {
    navigator.clipboard.writeText(refLink).catch(() => {});
    setCopied(true);
    toast.success("Referral link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black flex items-center gap-2">
          <Users className="h-6 w-6 text-pink-400" />
          Affiliate Program
        </h1>
        <p className="text-sm text-muted-foreground">
          Earn SKY4444 and commission by referring users to ShadowChat
        </p>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: "Total Earned", value: "$546.20", color: "text-pink-400" },
          { label: "Referrals", value: "4", color: "text-green-400" },
          { label: "Active", value: "3", color: "text-blue-400" },
          { label: "Current Tier", value: "Bronze", color: "text-orange-400" },
        ].map(s => (
          <Card key={s.label} className="border-border/50 text-center">
            <CardContent className="py-3 px-2">
              <p className={"font-black text-lg " + s.color}>{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="border-border/50 border-pink-500/20">
        <CardContent className="py-4 px-4 space-y-2">
          <p className="text-xs text-muted-foreground font-medium">
            Your Referral Link
          </p>
          <div className="flex items-center gap-2 bg-muted rounded-xl px-3 py-2">
            <Link className="h-4 w-4 text-pink-400 shrink-0" />
            <code className="text-xs font-mono text-pink-400 flex-1">
              {refLink}
            </code>
            <button
              onClick={copyLink}
              className="text-muted-foreground hover:text-pink-400 transition-colors"
            >
              {copied ? (
                <CheckCircle className="h-4 w-4 text-green-400" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          </div>
          <p className="text-xs text-muted-foreground">
            Share this link and earn 10% of all fees your referrals generate
          </p>
        </CardContent>
      </Card>
      <div className="space-y-2">
        <p className="text-sm font-bold">Commission Tiers</p>
        <div className="grid grid-cols-2 gap-2">
          {TIERS.map(tier => (
            <Card
              key={tier.name}
              className={
                "border " +
                tier.bg.replace("bg-", "border-").replace("/10", "/30")
              }
            >
              <CardContent className={"py-3 px-3 " + tier.bg + " rounded-xl"}>
                <p className={"font-black text-sm " + tier.color}>
                  {tier.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {tier.referrals} referrals
                </p>
                <p className={"font-bold text-xs mt-1 " + tier.color}>
                  {tier.commission} commission
                </p>
                <p className="text-xs text-muted-foreground">
                  +{tier.bonus} bonus
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-sm font-bold">Your Referrals</p>
        {REFERRALS.map((ref, i) => (
          <Card key={i} className="border-border/50">
            <CardContent className="py-2.5 px-4 flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-pink-500/10 flex items-center justify-center shrink-0">
                <Users className="h-4 w-4 text-pink-400" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm">{ref.user}</p>
                <p className="text-xs text-muted-foreground">
                  Joined {ref.joined}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-black text-sm text-green-400">
                  {ref.earnings}
                </p>
                <Badge
                  className={
                    "text-xs border-0 " +
                    (ref.status === "active"
                      ? "bg-green-500/10 text-green-400"
                      : "bg-muted text-muted-foreground")
                  }
                >
                  {ref.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
