import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Zap, Brain, TrendingUp, Target } from "lucide-react";

interface AIStrategy {
  id: string;
  name: string;
  description: string;
  status: "active" | "paused" | "completed";
  allocation: number;
  expectedReturn: number;
  riskLevel: "low" | "medium" | "high";
  performance: number;
  nextRebalance: string;
}

export default function AIWealth() {
  const [strategies, setStrategies] = useState<AIStrategy[]>([
    {
      id: "1",
      name: "Growth Optimizer",
      description: "Aggressive growth strategy with 70% equity allocation",
      status: "active",
      allocation: 50000,
      expectedReturn: 24,
      riskLevel: "high",
      performance: 18.5,
      nextRebalance: "3 days",
    },
    {
      id: "2",
      name: "Balanced Income",
      description: "Balanced strategy with 50% equity, 50% staking",
      status: "active",
      allocation: 30000,
      expectedReturn: 16,
      riskLevel: "medium",
      performance: 14.2,
      nextRebalance: "5 days",
    },
    {
      id: "3",
      name: "Conservative Yield",
      description: "Low-risk strategy focused on staking and bonds",
      status: "active",
      allocation: 20000,
      expectedReturn: 10,
      riskLevel: "low",
      performance: 9.8,
      nextRebalance: "7 days",
    },
  ]);

  const totalManaged = strategies.reduce((sum, s) => sum + s.allocation, 0);
  const totalPerformance = (
    strategies.reduce((sum, s) => sum + s.performance * s.allocation, 0) / totalManaged
  ).toFixed(1);

  const riskColors: Record<string, string> = {
    low: "bg-green-600",
    medium: "bg-yellow-600",
    high: "bg-red-600",
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Managed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-400">${totalManaged.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">Under AI management</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Avg Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-400">+{totalPerformance}%</div>
            <p className="text-xs text-gray-500 mt-1">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Active Strategies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-400">
              {strategies.filter((s) => s.status === "active").length}
            </div>
            <p className="text-xs text-gray-500 mt-1">Running</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">AI Confidence</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-400">94%</div>
            <p className="text-xs text-gray-500 mt-1">Prediction accuracy</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-400" />
            AI-Powered Strategies
          </CardTitle>
          <CardDescription>Autonomous portfolio management with machine learning</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {strategies.map((strategy) => (
            <div
              key={strategy.id}
              className="p-4 border border-gray-700 rounded-lg hover:border-purple-500/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-sm">{strategy.name}</h3>
                    <Badge
                      className={`text-xs ${
                        strategy.status === "active"
                          ? "bg-green-600 text-white"
                          : strategy.status === "paused"
                            ? "bg-yellow-600 text-white"
                            : "bg-gray-600 text-white"
                      }`}
                    >
                      {strategy.status.toUpperCase()}
                    </Badge>
                    <Badge className={`text-xs text-white ${riskColors[strategy.riskLevel]}`}>
                      {strategy.riskLevel.toUpperCase()} RISK
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-400">{strategy.description}</p>
                </div>
              </div>

              <div className="space-y-2 mb-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-semibold">Allocation</span>
                    <span className="text-xs text-gray-400">${strategy.allocation.toLocaleString()}</span>
                  </div>
                  <Progress value={(strategy.allocation / totalManaged) * 100} className="h-2" />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 p-3 bg-gray-900/50 rounded border border-gray-700">
                <div>
                  <p className="text-xs text-gray-400">Performance</p>
                  <p className="text-sm font-bold text-green-400 mt-1">+{strategy.performance}%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Expected Return</p>
                  <p className="text-sm font-bold text-blue-400 mt-1">{strategy.expectedReturn}%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Next Rebalance</p>
                  <p className="text-sm font-bold text-yellow-400 mt-1">{strategy.nextRebalance}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Confidence</p>
                  <p className="text-sm font-bold text-purple-400 mt-1">94%</p>
                </div>
              </div>

              <div className="flex gap-2 mt-3">
                {strategy.status === "active" && (
                  <>
                    <Button size="sm" variant="outline" className="flex-1">
                      Pause
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      Adjust
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            AI Features
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-gray-300">
            ✓ Real-time market analysis with predictive modeling
          </p>
          <p className="text-sm text-gray-300">
            ✓ Automatic rebalancing based on market conditions
          </p>
          <p className="text-sm text-gray-300">
            ✓ Risk-adjusted portfolio optimization
          </p>
          <p className="text-sm text-gray-300">
            ✓ Sentiment analysis from social media and news
          </p>
          <p className="text-sm text-gray-300">
            ✓ Tax-loss harvesting and yield optimization
          </p>
          <p className="text-sm text-gray-300">
            ✓ 24/7 monitoring and emergency stop-loss protection
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Create New AI Strategy</CardTitle>
          <CardDescription>Let our AI build a custom strategy for you</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-semibold mb-2 block">Risk Tolerance</label>
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline">Conservative</Button>
                <Button variant="outline">Balanced</Button>
                <Button variant="outline">Aggressive</Button>
              </div>
            </div>

            <Button className="w-full bg-purple-600 hover:bg-purple-700">
              <Brain className="w-4 h-4 mr-2" />
              Generate AI Strategy
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
