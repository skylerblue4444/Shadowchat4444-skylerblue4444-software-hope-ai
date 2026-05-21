import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Shield, Lock, Zap, TrendingUp } from "lucide-react";

interface QuantumPosition {
  id: string;
  name: string;
  amount: number;
  tier: "standard" | "quantum" | "ultra";
  security: number;
  apy: number;
  locked: boolean;
  timeRemaining: string;
}

export default function QuantumVault() {
  const [positions, setPositions] = useState<QuantumPosition[]>([
    {
      id: "1",
      name: "Quantum Vault - Tier 1",
      amount: 50000,
      tier: "quantum",
      security: 99.9,
      apy: 28,
      locked: true,
      timeRemaining: "45 days",
    },
    {
      id: "2",
      name: "Ultra Secure Vault",
      amount: 100000,
      tier: "ultra",
      security: 99.99,
      apy: 35,
      locked: true,
      timeRemaining: "90 days",
    },
  ]);

  const totalSecured = positions.reduce((sum, p) => sum + p.amount, 0);
  const avgAPY = (positions.reduce((sum, p) => sum + p.apy, 0) / positions.length).toFixed(1);

  const tierInfo: Record<string, { color: string; description: string; minAmount: number }> = {
    standard: {
      color: "from-blue-500 to-blue-600",
      description: "Standard encryption",
      minAmount: 10000,
    },
    quantum: {
      color: "from-purple-500 to-purple-600",
      description: "Quantum-resistant encryption",
      minAmount: 50000,
    },
    ultra: {
      color: "from-pink-500 to-pink-600",
      description: "Military-grade quantum security",
      minAmount: 100000,
    },
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Secured</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-400">${totalSecured.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">In quantum vaults</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Avg APY</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-400">{avgAPY}%</div>
            <p className="text-xs text-gray-500 mt-1">Weighted average</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Security Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-400">99.99%</div>
            <p className="text-xs text-gray-500 mt-1">Quantum-safe</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Active Positions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-400">{positions.length}</div>
            <p className="text-xs text-gray-500 mt-1">Vaults</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-purple-400" />
            Quantum Vault Tiers
          </CardTitle>
          <CardDescription>Choose your security level and yield</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(tierInfo).map(([tier, info]) => (
              <div
                key={tier}
                className={`p-4 rounded-lg border-2 border-gray-700 hover:border-purple-500/50 transition-all cursor-pointer`}
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${info.color} mb-3`} />
                <h3 className="font-semibold text-sm capitalize mb-1">{tier} Tier</h3>
                <p className="text-xs text-gray-400 mb-2">{info.description}</p>
                <p className="text-xs text-gray-500">Min: ${info.minAmount.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <h3 className="font-semibold text-lg">Your Quantum Positions</h3>
        {positions.map((position) => (
          <Card key={position.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-sm">{position.name}</h3>
                  <p className="text-xs text-gray-400 mt-1">
                    {position.locked ? "🔒 Locked" : "🔓 Unlocked"}
                  </p>
                </div>
                <Badge className="bg-purple-600 text-white text-xs">
                  {position.tier.toUpperCase()}
                </Badge>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-semibold">Security Level</span>
                    <span className="text-xs text-gray-400">{position.security}%</span>
                  </div>
                  <Progress value={position.security} className="h-2" />
                </div>

                <div className="grid grid-cols-4 gap-2 p-3 bg-gray-900/50 rounded border border-gray-700">
                  <div>
                    <p className="text-xs text-gray-400">Amount</p>
                    <p className="text-sm font-bold text-purple-400 mt-1">
                      ${position.amount.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">APY</p>
                    <p className="text-sm font-bold text-green-400 mt-1">{position.apy}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Status</p>
                    <p className="text-sm font-bold text-blue-400 mt-1">
                      {position.locked ? "Locked" : "Active"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Time Left</p>
                    <p className="text-sm font-bold text-yellow-400 mt-1">{position.timeRemaining}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            Quantum Security Features
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-gray-300">
            ✓ Post-quantum cryptography resistant to quantum computing attacks
          </p>
          <p className="text-sm text-gray-300">
            ✓ Multi-signature authorization with biometric verification
          </p>
          <p className="text-sm text-gray-300">
            ✓ Distributed ledger backup across multiple secure locations
          </p>
          <p className="text-sm text-gray-300">
            ✓ Real-time anomaly detection and threat monitoring
          </p>
          <p className="text-sm text-gray-300">
            ✓ Insurance coverage up to $10M per vault
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
