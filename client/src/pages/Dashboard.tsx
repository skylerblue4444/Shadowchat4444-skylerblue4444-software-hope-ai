/**
 * FinTrack Dashboard - Main Hub
 * ─────────────────────────────────────────────────────────────────────────────
 * Integrated dashboard for all platform features
 */

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface DashboardData {
  portfolio: {
    totalValue: string;
    totalBalance: string;
    coins: Array<{ coinType: string; balance: string; usdValue: string }>;
  };
  trading: {
    activeSignals: number;
    openTrades: number;
    monthlyReturn: number;
    winRate: number;
  };
  whale: {
    activityScore: number;
    anomalies: number;
    concentrationRisk: string;
  };
  security: {
    riskScore: number;
    level: string;
    complianceStatus: string;
    securityScore: number;
  };
}

const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    // Fetch dashboard data from API
    const fetchData = async () => {
      try {
        setLoading(false);
        // Mock data for now
        setDashboardData({
          portfolio: {
            totalValue: "$125,450.50",
            totalBalance: "1000000",
            coins: [
              { coinType: "SKYCOIN4444", balance: "20000", usdValue: "$20.00" },
              { coinType: "SHADOW", balance: "10000", usdValue: "$15.00" },
              { coinType: "BTC", balance: "0.5", usdValue: "$32,500" },
            ],
          },
          trading: {
            activeSignals: 5,
            openTrades: 3,
            monthlyReturn: 5.2,
            winRate: 62.5,
          },
          whale: {
            activityScore: 72,
            anomalies: 2,
            concentrationRisk: "medium",
          },
          security: {
            riskScore: 28,
            level: "low",
            complianceStatus: "compliant",
            securityScore: 92,
          },
        });
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="flex items-center justify-center h-screen">
        Error loading dashboard
      </div>
    );
  }

  const portfolioChartData = [
    { name: "SKY4444", value: 20 },
    { name: "SHADOW", value: 15 },
    { name: "BTC", value: 32500 },
    { name: "Others", value: 92915.5 },
  ];

  const tradingChartData = [
    { month: "Jan", return: 3.2, winRate: 58 },
    { month: "Feb", return: 4.1, winRate: 61 },
    { month: "Mar", return: 5.2, winRate: 62.5 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            FinTrack Dashboard
          </h1>
          <p className="text-slate-400">
            Your unified crypto and trading intelligence hub
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">
                Portfolio Value
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {dashboardData.portfolio.totalValue}
              </div>
              <p className="text-xs text-green-400 mt-1">+5.2% this month</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">
                Trading Win Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {dashboardData.trading.winRate.toFixed(1)}%
              </div>
              <p className="text-xs text-blue-400 mt-1">
                {dashboardData.trading.openTrades} open trades
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">
                Security Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {dashboardData.security.securityScore}/100
              </div>
              <Badge className="mt-1 bg-green-600">
                {dashboardData.security.level.toUpperCase()}
              </Badge>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">
                Whale Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {dashboardData.whale.activityScore}
              </div>
              <p className="text-xs text-yellow-400 mt-1">
                {dashboardData.whale.anomalies} anomalies
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-slate-800 border-slate-700">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trading">Trading Bot</TabsTrigger>
            <TabsTrigger value="whale">Whale Tracker</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="social">Social</TabsTrigger>
            <TabsTrigger value="youtube">YouTube</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">
                    Portfolio Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={portfolioChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: $${value}`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {portfolioChartData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">
                    Trading Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={tradingChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="return"
                        stroke="#10b981"
                        name="Monthly Return %"
                      />
                      <Line
                        type="monotone"
                        dataKey="winRate"
                        stroke="#3b82f6"
                        name="Win Rate %"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Your Coins</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {dashboardData.portfolio.coins.map(coin => (
                    <div
                      key={coin.coinType}
                      className="flex justify-between items-center p-2 bg-slate-700 rounded"
                    >
                      <span className="text-white font-medium">
                        {coin.coinType}
                      </span>
                      <div className="text-right">
                        <div className="text-white">{coin.balance}</div>
                        <div className="text-xs text-slate-400">
                          {coin.usdValue}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Trading Bot Tab */}
          <TabsContent value="trading" className="space-y-4">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">AI Trading Bot</CardTitle>
                <CardDescription>
                  Automated trading with 5 strategies
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-700 p-4 rounded">
                    <p className="text-slate-400 text-sm">Active Signals</p>
                    <p className="text-2xl font-bold text-white">
                      {dashboardData.trading.activeSignals}
                    </p>
                  </div>
                  <div className="bg-slate-700 p-4 rounded">
                    <p className="text-slate-400 text-sm">Monthly Return</p>
                    <p className="text-2xl font-bold text-green-400">
                      {dashboardData.trading.monthlyReturn}%
                    </p>
                  </div>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  View Trading Signals
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Whale Tracker Tab */}
          <TabsContent value="whale" className="space-y-4">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Whale Tracker</CardTitle>
                <CardDescription>Real-time market analytics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-slate-700 p-4 rounded">
                  <p className="text-slate-400 text-sm">Concentration Risk</p>
                  <Badge className="mt-2 bg-yellow-600">
                    {dashboardData.whale.concentrationRisk.toUpperCase()}
                  </Badge>
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  View Whale Activity
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-4">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Security Shield</CardTitle>
                <CardDescription>
                  Fraud detection and compliance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-slate-700 p-4 rounded">
                  <p className="text-slate-400 text-sm">Compliance Status</p>
                  <Badge className="mt-2 bg-green-600">
                    {dashboardData.security.complianceStatus.toUpperCase()}
                  </Badge>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  View Audit Log
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Social Tab */}
          <TabsContent value="social" className="space-y-4">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Social Feed</CardTitle>
                <CardDescription>Connect with the community</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-pink-600 hover:bg-pink-700">
                  View Social Feed
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* YouTube Tab */}
          <TabsContent value="youtube" className="space-y-4">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">
                  YouTube Watch-to-Earn
                </CardTitle>
                <CardDescription>
                  Earn SKY4444 by watching crypto content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-red-600 hover:bg-red-700">
                  Start Watching
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
