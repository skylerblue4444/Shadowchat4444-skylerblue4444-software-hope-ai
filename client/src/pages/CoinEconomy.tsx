import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Coins, TrendingUp, Gift, Zap, Award } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function CoinEconomy() {
  const [wallet, setWallet] = useState(null);
  const [rewards, setRewards] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch wallet
  const { data: walletData } = trpc.coinEconomy.getWallet.useQuery();

  // Fetch available rewards
  const { data: availableRewards } =
    trpc.coinEconomy.getAvailableRewards.useQuery();

  // Fetch leaderboard
  const { data: leaderboardData } = trpc.coinEconomy.getLeaderboard.useQuery({
    coinType: "skycoin",
    limit: 20,
  });

  // Mutations
  const claimRewardMutation = trpc.coinEconomy.claimReward.useMutation();

  useEffect(() => {
    if (walletData) {
      setWallet(walletData);
      setLoading(false);
    }
  }, [walletData]);

  useEffect(() => {
    if (availableRewards) {
      setRewards(availableRewards);
    }
  }, [availableRewards]);

  useEffect(() => {
    if (leaderboardData) {
      setLeaderboard(leaderboardData);
    }
  }, [leaderboardData]);

  async function handleClaimReward(rewardId) {
    try {
      await claimRewardMutation.mutateAsync({ rewardId });
      // Refetch rewards
    } catch (error) {
      console.error("Error claiming reward:", error);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[radial-gradient(circle_at_top,#2d1a3d,#09090b_45%)] p-6 text-white">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-zinc-400">Loading wallet...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#2d1a3d,#09090b_45%)] p-6 text-white">
      <section className="mx-auto max-w-6xl space-y-6">
        <div className="rounded-3xl border border-yellow-400/30 bg-black/45 p-8 shadow-2xl shadow-yellow-500/10">
          <Badge className="mb-4 border-yellow-400/40 bg-yellow-400/10 text-yellow-200">
            Coin Economy
          </Badge>
          <h1 className="text-4xl font-black tracking-tight md:text-6xl">
            SKY4444 & Shadow Coin
          </h1>
          <p className="mt-3 max-w-3xl text-sm text-zinc-300 md:text-base">
            Earn, claim, and trade SKYCOIN4444 and Shadow Coin through dating
            matches, marketplace sales, livestream tips, and platform
            activities.
          </p>
        </div>

        {/* Wallet Overview */}
        {wallet && (
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="border-yellow-400/20 bg-yellow-950/30 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Coins className="h-5 w-5 text-yellow-400" />
                  SKYCOIN Balance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-black text-yellow-400">
                  {parseFloat(wallet.skycoinBalance).toFixed(2)}
                </p>
                <p className="text-sm text-zinc-400 mt-2">Available to spend</p>
              </CardContent>
            </Card>

            <Card className="border-purple-400/20 bg-purple-950/30 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Zap className="h-5 w-5 text-purple-400" />
                  Shadow Coin Balance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-black text-purple-400">
                  {parseFloat(wallet.shadowcoinBalance).toFixed(2)}
                </p>
                <p className="text-sm text-zinc-400 mt-2">Beta rewards</p>
              </CardContent>
            </Card>

            <Card className="border-emerald-400/20 bg-emerald-950/30 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="h-5 w-5 text-emerald-400" />
                  Total Earned
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-black text-emerald-400">
                  {parseFloat(wallet.totalEarned).toFixed(2)}
                </p>
                <p className="text-sm text-zinc-400 mt-2">All time</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Available Rewards */}
        {rewards.length > 0 && (
          <Card className="border-green-400/20 bg-green-950/30 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="h-6 w-6 text-green-400" />
                Available Rewards ({rewards.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {rewards.map(reward => (
                  <div
                    key={reward.id}
                    className="flex items-center justify-between rounded-lg border border-green-400/20 bg-green-400/5 p-4"
                  >
                    <div>
                      <p className="font-semibold text-green-300 capitalize">
                        {reward.rewardType.replace(/_/g, " ")}
                      </p>
                      <p className="text-sm text-zinc-400">
                        {reward.amount}{" "}
                        {reward.coinType === "skycoin" ? "SKY" : "Shadow"}
                      </p>
                      {reward.expiresAt && (
                        <p className="text-xs text-yellow-400 mt-1">
                          Expires:{" "}
                          {new Date(reward.expiresAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    <Button
                      onClick={() => handleClaimReward(reward.id)}
                      disabled={claimRewardMutation.isPending}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {claimRewardMutation.isPending ? "Claiming..." : "Claim"}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Leaderboard */}
        {leaderboard.length > 0 && (
          <Card className="border-blue-400/20 bg-blue-950/30 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-6 w-6 text-blue-400" />
                Top SKYCOIN Holders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {leaderboard.slice(0, 10).map(entry => (
                  <div
                    key={entry.id}
                    className="flex items-center justify-between rounded-lg border border-blue-400/20 bg-blue-400/5 p-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-black text-blue-400 w-8">
                        #{entry.rank}
                      </span>
                      <div>
                        <p className="font-semibold">
                          {entry.user?.name || "User"}
                        </p>
                        <p className="text-xs text-zinc-400">
                          {entry.user?.email || "—"}
                        </p>
                      </div>
                    </div>
                    <p className="text-xl font-black text-yellow-400">
                      {parseFloat(entry.skycoinBalance).toFixed(2)} SKY
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Earning Opportunities */}
        <Card className="border-cyan-400/20 bg-cyan-950/30 text-white">
          <CardHeader>
            <CardTitle>How to Earn</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-cyan-400/20 bg-cyan-400/5 p-4">
                <h3 className="font-semibold text-cyan-300 mb-2">
                  Dating Matches
                </h3>
                <p className="text-sm text-zinc-300">
                  Earn 50 SKY for each successful match
                </p>
              </div>
              <div className="rounded-lg border border-cyan-400/20 bg-cyan-400/5 p-4">
                <h3 className="font-semibold text-cyan-300 mb-2">
                  Marketplace Sales
                </h3>
                <p className="text-sm text-zinc-300">
                  Earn 5% commission on all sales
                </p>
              </div>
              <div className="rounded-lg border border-cyan-400/20 bg-cyan-400/5 p-4">
                <h3 className="font-semibold text-cyan-300 mb-2">
                  Livestream Tips
                </h3>
                <p className="text-sm text-zinc-300">
                  Keep 85% of tips received from viewers
                </p>
              </div>
              <div className="rounded-lg border border-cyan-400/20 bg-cyan-400/5 p-4">
                <h3 className="font-semibold text-cyan-300 mb-2">
                  Daily Login
                </h3>
                <p className="text-sm text-zinc-300">
                  Earn 10 SKY for daily platform engagement
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
