import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Copy, Share2, Gift, Users, TrendingUp } from "lucide-react";

interface Referral {
  id: string;
  name: string;
  email: string;
  status: "pending" | "active" | "inactive";
  joinedDate: string;
  totalReward: number;
  trades: number;
}

export default function Referrals() {
  const [referrals, setReferrals] = useState<Referral[]>([
    {
      id: "1",
      name: "Alex Johnson",
      email: "alex@example.com",
      status: "active",
      joinedDate: "2 weeks ago",
      totalReward: 500,
      trades: 23,
    },
    {
      id: "2",
      name: "Sarah Chen",
      email: "sarah@example.com",
      status: "active",
      joinedDate: "1 month ago",
      totalReward: 1200,
      trades: 45,
    },
    {
      id: "3",
      name: "Mike Davis",
      email: "mike@example.com",
      status: "pending",
      joinedDate: "3 days ago",
      totalReward: 0,
      trades: 0,
    },
  ]);

  const referralLink = "https://skycoin444.com/ref/USER123456";
  const totalRewards = referrals.reduce((sum, r) => sum + r.totalReward, 0);
  const activeReferrals = referrals.filter((r) => r.status === "active").length;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Referrals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-400">{referrals.length}</div>
            <p className="text-xs text-gray-500 mt-1">{activeReferrals} active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Rewards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-400">{totalRewards.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">SKY earned</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Pending Rewards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-400">250</div>
            <p className="text-xs text-gray-500 mt-1">From 1 pending</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Tier</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-400">Silver</div>
            <p className="text-xs text-gray-500 mt-1">5 more to Gold</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Referral Link</CardTitle>
          <CardDescription>Share this link to invite friends and earn rewards</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={referralLink}
              readOnly
              className="bg-gray-900 border-gray-700"
            />
            <Button
              onClick={handleCopyLink}
              variant="outline"
              className="px-4"
            >
              <Copy className="w-4 h-4" />
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700 px-4">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-purple-900/20 rounded-lg border border-purple-500/30">
            <div>
              <p className="text-xs text-gray-400 mb-1">Bronze Tier</p>
              <p className="text-sm font-semibold">5% commission</p>
              <p className="text-xs text-gray-500">1-5 referrals</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Silver Tier</p>
              <p className="text-sm font-semibold">10% commission</p>
              <p className="text-xs text-gray-500">6-15 referrals (Current)</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Gold Tier</p>
              <p className="text-sm font-semibold">15% commission</p>
              <p className="text-xs text-gray-500">16+ referrals</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Referrals</CardTitle>
          <CardDescription>Track your referred users and earnings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {referrals.map((ref) => (
              <div
                key={ref.id}
                className="flex items-center justify-between p-4 border border-gray-700 rounded-lg hover:border-purple-500/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-sm">{ref.name}</p>
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        ref.status === "active"
                          ? "border-green-500 text-green-400"
                          : ref.status === "pending"
                            ? "border-yellow-500 text-yellow-400"
                            : "border-gray-500 text-gray-400"
                      }`}
                    >
                      {ref.status.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500">{ref.email}</p>
                  <p className="text-xs text-gray-600 mt-1">Joined {ref.joinedDate}</p>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-xs text-gray-400">Trades</p>
                      <p className="text-lg font-bold text-blue-400">{ref.trades}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Reward</p>
                      <p className="text-lg font-bold text-green-400">
                        {ref.totalReward > 0 ? `+${ref.totalReward}` : "-"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-yellow-400" />
            How It Works
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center font-bold text-sm flex-shrink-0">
              1
            </div>
            <div>
              <p className="font-semibold text-sm">Share Your Link</p>
              <p className="text-xs text-gray-400">Send your unique referral link to friends</p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center font-bold text-sm flex-shrink-0">
              2
            </div>
            <div>
              <p className="font-semibold text-sm">They Sign Up</p>
              <p className="text-xs text-gray-400">Your friend creates an account using your link</p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center font-bold text-sm flex-shrink-0">
              3
            </div>
            <div>
              <p className="font-semibold text-sm">They Trade</p>
              <p className="text-xs text-gray-400">Your friend starts trading on the platform</p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center font-bold text-sm flex-shrink-0">
              4
            </div>
            <div>
              <p className="font-semibold text-sm">You Earn</p>
              <p className="text-xs text-gray-400">Earn a percentage of their trading fees forever</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
