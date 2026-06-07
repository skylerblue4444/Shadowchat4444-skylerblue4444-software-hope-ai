import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Wallet, PiggyBank, CreditCard, Target, AlertCircle, Plus, Settings, Download } from 'lucide-react';

interface Budget {
  id: string;
  category: string;
  limit: number;
  spent: number;
  percent: number;
}

interface SavingsGoal {
  id: string;
  name: string;
  target: number;
  current: number;
  percent: number;
  daysLeft: number;
}

interface RecurringBill {
  id: string;
  name: string;
  amount: number;
  frequency: string;
  dueDate: string;
  status: 'active' | 'paused';
}

interface Investment {
  id: string;
  symbol: string;
  type: string;
  shares: number;
  value: number;
  gain: number;
  gainPercent: number;
}

const MoneyManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'budgets' | 'savings' | 'bills' | 'investments'>('overview');
  const [budgets, setBudgets] = useState<Budget[]>([
    { id: '1', category: 'Food & Dining', limit: 600, spent: 420, percent: 70 },
    { id: '2', category: 'Transportation', limit: 400, spent: 280, percent: 70 },
    { id: '3', category: 'Entertainment', limit: 300, spent: 180, percent: 60 },
    { id: '4', category: 'Utilities', limit: 250, spent: 240, percent: 96 },
    { id: '5', category: 'Shopping', limit: 500, spent: 320, percent: 64 },
  ]);

  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>([
    { id: '1', name: 'Emergency Fund', target: 10000, current: 6500, percent: 65, daysLeft: 120 },
    { id: '2', name: 'Vacation', target: 5000, current: 3200, percent: 64, daysLeft: 180 },
    { id: '3', name: 'New Laptop', target: 2000, current: 1800, percent: 90, daysLeft: 30 },
  ]);

  const [recurringBills, setRecurringBills] = useState<RecurringBill[]>([
    { id: '1', name: 'Netflix', amount: 15.99, frequency: 'Monthly', dueDate: '2026-06-01', status: 'active' },
    { id: '2', name: 'Gym Membership', amount: 45, frequency: 'Monthly', dueDate: '2026-05-28', status: 'active' },
    { id: '3', name: 'Cloud Storage', amount: 9.99, frequency: 'Monthly', dueDate: '2026-06-05', status: 'active' },
    { id: '4', name: 'Insurance', amount: 120, frequency: 'Monthly', dueDate: '2026-06-10', status: 'active' },
  ]);

  const [investments, setInvestments] = useState<Investment[]>([
    { id: '1', symbol: 'AAPL', type: 'Stock', shares: 10, value: 1850, gain: 150, gainPercent: 8.8 },
    { id: '2', symbol: 'BTC', type: 'Crypto', shares: 0.5, value: 21500, gain: 1500, gainPercent: 7.5 },
    { id: '3', symbol: 'ETH', type: 'Crypto', shares: 5, value: 9500, gain: 500, gainPercent: 5.6 },
    { id: '4', symbol: 'VOO', type: 'Fund', shares: 20, value: 8200, gain: 400, gainPercent: 5.1 },
  ]);

  const [financialSummary, setFinancialSummary] = useState({
    totalIncome: 5500,
    totalExpenses: 2840,
    netWorth: 45000,
    savingsRate: 48,
    monthlyTrend: [
      { month: 'Jan', income: 5500, expenses: 2600 },
      { month: 'Feb', income: 5500, expenses: 2750 },
      { month: 'Mar', income: 5500, expenses: 2840 },
      { month: 'Apr', income: 5500, expenses: 2700 },
      { month: 'May', income: 5500, expenses: 2840 },
    ],
  });

  const budgetChartData = budgets.map((b) => ({
    name: b.category,
    spent: b.spent,
    limit: b.limit,
  }));

  const savingsChartData = savingsGoals.map((g) => ({
    name: g.name,
    value: g.current,
    target: g.target,
  }));

  const investmentChartData = investments.map((i) => ({
    name: i.symbol,
    value: i.value,
  }));

  const totalBudgetLimit = budgets.reduce((sum, b) => sum + b.limit, 0);
  const totalBudgetSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
  const totalSavingsTarget = savingsGoals.reduce((sum, g) => sum + g.target, 0);
  const totalSavingsAccumulated = savingsGoals.reduce((sum, g) => sum + g.current, 0);
  const totalInvestmentValue = investments.reduce((sum, i) => sum + i.value, 0);
  const totalInvestmentGain = investments.reduce((sum, i) => sum + i.gain, 0);
  const monthlyRecurringBills = recurringBills.filter((b) => b.status === 'active').reduce((sum, b) => sum + b.amount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-5xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Money Management
              </h1>
              <p className="text-slate-400 mt-2">Enterprise-grade financial control & analytics</p>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition">
                <Plus className="inline mr-2 h-5 w-5" />
                New Budget
              </button>
              <button className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg font-semibold transition">
                <Download className="inline mr-2 h-5 w-5" />
                Export
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Monthly Income</p>
                  <p className="text-3xl font-bold mt-2">${financialSummary.totalIncome.toLocaleString()}</p>
                </div>
                <TrendingUp className="h-10 w-10 text-green-400 opacity-50" />
              </div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Monthly Expenses</p>
                  <p className="text-3xl font-bold mt-2">${financialSummary.totalExpenses.toLocaleString()}</p>
                </div>
                <CreditCard className="h-10 w-10 text-red-400 opacity-50" />
              </div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Net Worth</p>
                  <p className="text-3xl font-bold mt-2">${financialSummary.netWorth.toLocaleString()}</p>
                </div>
                <Wallet className="h-10 w-10 text-blue-400 opacity-50" />
              </div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Savings Rate</p>
                  <p className="text-3xl font-bold mt-2">{financialSummary.savingsRate}%</p>
                </div>
                <PiggyBank className="h-10 w-10 text-emerald-400 opacity-50" />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8 border-b border-slate-700">
          {(['overview', 'budgets', 'savings', 'bills', 'investments'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold capitalize transition border-b-2 ${
                activeTab === tab
                  ? 'border-purple-500 text-purple-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Income vs Expenses Chart */}
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Income vs Expenses</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={financialSummary.monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="month" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
                  <Legend />
                  <Line type="monotone" dataKey="income" stroke="#10b981" strokeWidth={2} />
                  <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Budget Overview */}
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Budget Overview</h3>
              <div className="space-y-3">
                {budgets.slice(0, 3).map((budget) => (
                  <div key={budget.id}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{budget.category}</span>
                      <span className="text-sm text-slate-400">${budget.spent} / ${budget.limit}</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition ${
                          budget.percent > 90 ? 'bg-red-500' : budget.percent > 75 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${Math.min(budget.percent, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Savings Goals */}
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Savings Goals</h3>
              <div className="space-y-3">
                {savingsGoals.map((goal) => (
                  <div key={goal.id} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{goal.name}</p>
                      <p className="text-xs text-slate-400">${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-emerald-400">{goal.percent}%</p>
                      <p className="text-xs text-slate-400">{goal.daysLeft}d left</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Investment Portfolio */}
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Investment Portfolio</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={investmentChartData} cx="50%" cy="50%" labelLine={false} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} outerRadius={80} fill="#8884d8" dataKey="value">
                    {investmentChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#8b5cf6', '#ec4899', '#06b6d4', '#10b981'][index % 4]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <p className="text-center text-sm text-slate-400 mt-4">Total Value: ${totalInvestmentValue.toLocaleString()}</p>
            </div>
          </div>
        )}

        {/* Budgets Tab */}
        {activeTab === 'budgets' && (
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6">Budget Breakdown</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={budgetChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
                  <Legend />
                  <Bar dataKey="spent" fill="#ef4444" />
                  <Bar dataKey="limit" fill="#6b7280" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {budgets.map((budget) => (
                <div key={budget.id} className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-lg font-bold">{budget.category}</h4>
                      <p className="text-sm text-slate-400">Budget Category</p>
                    </div>
                    <button className="p-2 hover:bg-slate-700 rounded-lg transition">
                      <Settings className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Spent</span>
                      <span className="font-bold">${budget.spent}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Limit</span>
                      <span className="font-bold">${budget.limit}</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-3 mt-4">
                      <div
                        className={`h-3 rounded-full transition ${
                          budget.percent > 90 ? 'bg-red-500' : budget.percent > 75 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${Math.min(budget.percent, 100)}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-sm mt-2">
                      <span className="text-slate-400">{budget.percent}% used</span>
                      <span className="font-bold">${budget.limit - budget.spent} remaining</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Savings Tab */}
        {activeTab === 'savings' && (
          <div className="space-y-6">
            {savingsGoals.map((goal) => (
              <div key={goal.id} className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold">{goal.name}</h3>
                    <p className="text-slate-400">Target: ${goal.target.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-emerald-400">{goal.percent}%</p>
                    <p className="text-sm text-slate-400">{goal.daysLeft} days remaining</p>
                  </div>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-4">
                  <div className="h-4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" style={{ width: `${goal.percent}%` }} />
                </div>
                <div className="flex justify-between mt-4 text-sm">
                  <span className="text-slate-400">Accumulated: ${goal.current.toLocaleString()}</span>
                  <span className="text-slate-400">Remaining: ${(goal.target - goal.current).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bills Tab */}
        {activeTab === 'bills' && (
          <div className="space-y-4">
            {recurringBills.map((bill) => (
              <div key={bill.id} className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6 flex justify-between items-center">
                <div className="flex-1">
                  <h4 className="text-lg font-bold">{bill.name}</h4>
                  <p className="text-sm text-slate-400">
                    {bill.frequency} • Due: {bill.dueDate}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">${bill.amount.toFixed(2)}</p>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${bill.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-slate-600 text-slate-300'}`}>
                    {bill.status === 'active' ? 'Active' : 'Paused'}
                  </span>
                </div>
              </div>
            ))}
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
              <p className="text-slate-400">Monthly Total</p>
              <p className="text-3xl font-bold mt-2">${monthlyRecurringBills.toFixed(2)}</p>
            </div>
          </div>
        )}

        {/* Investments Tab */}
        {activeTab === 'investments' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
                <p className="text-slate-400 text-sm">Portfolio Value</p>
                <p className="text-3xl font-bold mt-2">${totalInvestmentValue.toLocaleString()}</p>
              </div>
              <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
                <p className="text-slate-400 text-sm">Total Gain/Loss</p>
                <p className={`text-3xl font-bold mt-2 ${totalInvestmentGain >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  ${totalInvestmentGain.toLocaleString()}
                </p>
              </div>
              <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
                <p className="text-slate-400 text-sm">Return %</p>
                <p className={`text-3xl font-bold mt-2 ${totalInvestmentGain >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {((totalInvestmentGain / totalInvestmentValue) * 100).toFixed(2)}%
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {investments.map((inv) => (
                <div key={inv.id} className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-xl font-bold">{inv.symbol}</h4>
                      <p className="text-sm text-slate-400">{inv.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">${inv.value.toLocaleString()}</p>
                      <p className={`text-sm font-semibold ${inv.gainPercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {inv.gainPercent >= 0 ? '+' : ''}{inv.gainPercent.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-slate-400">
                      <span>Shares</span>
                      <span>{inv.shares}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Gain/Loss</span>
                      <span className={inv.gain >= 0 ? 'text-green-400' : 'text-red-400'}>${inv.gain.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoneyManagement;
