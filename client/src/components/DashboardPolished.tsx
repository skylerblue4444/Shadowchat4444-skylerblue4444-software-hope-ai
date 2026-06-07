/**
 * 💎 POLISHED DASHBOARD
 * Production-grade UI with real-time data wiring to backend
 */

import React, { useState } from 'react';
import { trpc } from '../_core/trpc';

export const DashboardPolished: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'portfolio' | 'trading' | 'social'>('overview');

  // Wire to backend endpoints
  const { data: portfolio } = trpc.portfolio.get.useQuery();
  const { data: orders } = trpc.trading.getOrders.useQuery();
  const { data: posts } = trpc.social.getFeedPosts.useQuery();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation */}
      <nav className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">SkyCoin444 Dashboard</h1>
          <div className="flex gap-4">
            {(['overview', 'portfolio', 'trading', 'social'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'overview' && <OverviewTab portfolio={portfolio} />}
        {activeTab === 'portfolio' && <PortfolioTab portfolio={portfolio} />}
        {activeTab === 'trading' && <TradingTab orders={orders} />}
        {activeTab === 'social' && <SocialTab posts={posts} />}
      </div>
    </div>
  );
};

interface OverviewTabProps {
  portfolio?: any;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ portfolio }) => (
  <div className="space-y-6">
    <h2 className="text-3xl font-bold text-white">Welcome to SkyCoin444</h2>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <StatCard label="Total Balance" value={`$${(portfolio?.totalBalance || 0).toFixed(2)}`} />
      <StatCard label="24h Change" value={`${(portfolio?.change24h || 0).toFixed(2)}%`} />
      <StatCard label="Holdings" value={(portfolio?.holdings || 0).toString()} />
      <StatCard label="Rewards" value={`$${(portfolio?.rewards || 0).toFixed(2)}`} />
    </div>
  </div>
);

interface PortfolioTabProps {
  portfolio?: any;
}

const PortfolioTab: React.FC<PortfolioTabProps> = ({ portfolio }) => (
  <div className="space-y-6">
    <h2 className="text-3xl font-bold text-white">Portfolio</h2>
    <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
      {portfolio?.assets ? (
        <div className="space-y-4">
          {portfolio.assets.map((asset: any) => (
            <div key={asset.symbol} className="flex justify-between items-center p-4 bg-slate-700 rounded-lg">
              <span className="text-white font-semibold">{asset.symbol}</span>
              <span className="text-slate-300">{asset.amount} units</span>
              <span className="text-green-400">${asset.value.toFixed(2)}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-slate-400">Loading portfolio...</p>
      )}
    </div>
  </div>
);

interface TradingTabProps {
  orders?: any[];
}

const TradingTab: React.FC<TradingTabProps> = ({ orders }) => (
  <div className="space-y-6">
    <h2 className="text-3xl font-bold text-white">Trading</h2>
    <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
      {orders && orders.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-slate-300">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-2">Pair</th>
                <th className="text-left py-2">Type</th>
                <th className="text-left py-2">Amount</th>
                <th className="text-left py-2">Price</th>
                <th className="text-left py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order: any) => (
                <tr key={order.id} className="border-b border-slate-700 hover:bg-slate-700">
                  <td className="py-3">{order.pair}</td>
                  <td className="py-3">{order.type}</td>
                  <td className="py-3">{order.amount}</td>
                  <td className="py-3">${order.price}</td>
                  <td className="py-3">
                    <span className="px-2 py-1 bg-green-600 text-white rounded text-sm">{order.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-slate-400">No orders yet</p>
      )}
    </div>
  </div>
);

interface SocialTabProps {
  posts?: any[];
}

const SocialTab: React.FC<SocialTabProps> = ({ posts }) => (
  <div className="space-y-6">
    <h2 className="text-3xl font-bold text-white">Social Feed</h2>
    <div className="space-y-4">
      {posts && posts.length > 0 ? (
        posts.map((post: any) => (
          <div key={post.id} className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full" />
              <div>
                <p className="text-white font-semibold">{post.author}</p>
                <p className="text-slate-400 text-sm">{new Date(post.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            <p className="text-slate-300">{post.content}</p>
          </div>
        ))
      ) : (
        <p className="text-slate-400">No posts yet</p>
      )}
    </div>
  </div>
);

interface StatCardProps {
  label: string;
  value: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value }) => (
  <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
    <p className="text-slate-400 text-sm mb-2">{label}</p>
    <p className="text-white text-2xl font-bold">{value}</p>
  </div>
);
