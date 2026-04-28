import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Lock, Unlock, TrendingUp, Calendar, Gift } from "lucide-react";

interface Vault {
  id: string;
  name: string;
  tier: "bronze" | "silver" | "gold" | "platinum";
  amount: number;
  apy: number;
  lockedUntil: string;
  earned: number;
  status: "locked" | "unlocked" | "available";
}

export default function ColdVault() {
  const [vaults, setVaults] = useState<Vault[]>([
    {
      id: "1",
      name: "Bronze Vault",
      tier: "bronze",
      amount: 5000,
      apy: 8,
      lockedUntil: "30 days",
      earned: 45,
      status: "locked",
    },
    {
      id: "2",
      name: "Silver Vault",
      tier: "silver",
      amount: 15000,
      apy: 12,
      lockedUntil: "15 days",
      earned: 250,
      status: "locked",
    },
    {
      id: "3",
      name: "Gold Vault",
      tier: "gold",
      amount: 0,
      apy: 18,
      lockedUntil: "-",
      earned: 0,
      status: "available",
    },
    {
      id: "4",
      name: "Platinum Vault",
      tier: "platinum",
      amount: 0,
      apy: 25,
      lockedUntil: "-",
      earned: 0,
      status: "available",
    },
  ]);

  const [depositAmount, setDepositAmount] = useState("");
  const [selectedTier, setSelectedTier] = useState("bronze");

  const totalLocked = vaults.reduce((sum, v) => sum + v.amount, 0);
  const totalEarned = vaults.reduce((sum, v) => sum + v.earned, 0);

  const tierInfo: Record<string, { color: string; minAmount: number; description: string }> = {
    bronze: { color: "from-amber-600 to-amber-700", minAmount: 1000, description: "30-day lock" },
    silver: { color: "from-slate-400 to-slate-500", minAmount: 10000, description: "60-day lock" },
    gold: { color: "from-yellow-500 to-yellow-600", minAmount: 50000, description: "90-day lock" },
    platinum: { color: "from-purple-500 to-purple-600", minAmount: 100000, description: "180-day lock" },
  };

  const handleDeposit = () => {
    if (!depositAmount || isNaN(Number(depositAmount))) return;
    alert(`Deposited ${depositAmount} SKY to ${selectedTier} vault`);
    setDepositAmount("");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Locked</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-400">{totalLocked.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">SKY in vaults</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Yield Earned</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-400">+{totalEarned.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">Passive income</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Average APY</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-400">12.75%</div>
            <p className="text-xs text-gray-500 mt-1">Weighted average</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Deposit to Vault</CardTitle>
          <CardDescription>Lock your SKY tokens to earn yield</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-semibold mb-2 block">Select Tier</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {Object.entries(tierInfo).map(([tier, info]) => (
                <button
                  key={tier}
                  onClick={() => setSelectedTier(tier)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    selectedTier === tier
                      ? "border-purple-500 bg-purple-600/20"
                      : "border-gray-700 hover:border-purple-500/50"
                  }`}
                >
                  <p className="text-xs font-semibold capitalize">{tier}</p>
                  <p className="text-xs text-gray-400 mt-1">Min: {info.minAmount.toLocaleString()} SKY</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold mb-2 block">Amount</label>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Enter amount in SKY"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                className="bg-gray-900 border-gray-700"
              />
              <Button
                onClick={handleDeposit}
                disabled={!depositAmount}
                className="bg-purple-600 hover:bg-purple-700 px-4"
              >
                Deposit
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              APY: {tierInfo[selectedTier as keyof typeof tierInfo].minAmount > 50000 ? "25%" : tierInfo[selectedTier as keyof typeof tierInfo].minAmount > 10000 ? "18%" : "12%"}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <h3 className="font-semibold text-lg">Your Vaults</h3>
        {vaults.map((vault) => (
          <Card key={vault.id} className="overflow-hidden">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${tierInfo[vault.tier].color} flex items-center justify-center`}
                  >
                    {vault.status === "locked" ? (
                      <Lock className="w-6 h-6 text-white" />
                    ) : (
                      <Unlock className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm capitalize">{vault.name}</h3>
                    <p className="text-xs text-gray-400">{tierInfo[vault.tier].description}</p>
                  </div>
                </div>
                <Badge
                  className={`text-xs ${
                    vault.status === "locked"
                      ? "bg-purple-600 text-white"
                      : vault.status === "unlocked"
                        ? "bg-green-600 text-white"
                        : "bg-gray-600 text-white"
                  }`}
                >
                  {vault.status === "locked"
                    ? "LOCKED"
                    : vault.status === "unlocked"
                      ? "READY TO WITHDRAW"
                      : "EMPTY"}
                </Badge>
              </div>

              <div className="grid grid-cols-4 gap-3 p-3 bg-gray-900/50 rounded border border-gray-700">
                <div>
                  <p className="text-xs text-gray-400">Amount</p>
                  <p className="text-sm font-bold text-purple-400 mt-1">
                    {vault.amount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">APY</p>
                  <p className="text-sm font-bold text-green-400 mt-1">{vault.apy}%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Earned</p>
                  <p className="text-sm font-bold text-yellow-400 mt-1">+{vault.earned}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Unlock</p>
                  <p className="text-sm font-bold text-blue-400 mt-1">{vault.lockedUntil}</p>
                </div>
              </div>

              {vault.status === "unlocked" && (
                <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">
                  <Unlock className="w-4 h-4 mr-2" />
                  Withdraw Now
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            Vault Benefits
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-gray-300">
            ✓ Earn passive yield on locked positions with competitive APY rates
          </p>
          <p className="text-sm text-gray-300">
            ✓ Higher tier vaults offer better yields and longer lock periods
          </p>
          <p className="text-sm text-gray-300">
            ✓ Automatic compounding of earned rewards into your vault
          </p>
          <p className="text-sm text-gray-300">
            ✓ Secure cold storage with multi-signature protection
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
