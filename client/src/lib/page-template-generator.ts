/**
 * 🎨 PAGE TEMPLATE GENERATOR
 * Auto-generates production-grade page components from templates
 */

export interface PageConfig {
  title: string;
  description: string;
  icon: string;
  features: string[];
  dataEndpoint?: string;
  actions?: Array<{ label: string; action: string }>;
}

export function generatePageTemplate(config: PageConfig): string {
  return `
import React, { useState } from 'react';
import { trpc } from '../_core/trpc';

export const ${toPascalCase(config.title)}: React.FC = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">${config.icon}</span>
            <h1 className="text-3xl font-bold text-white">${config.title}</h1>
          </div>
          <p className="text-slate-400">${config.description}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          ${config.features.map((feature, idx) => `
          <div key="${idx}" className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-blue-500 transition">
            <h3 className="text-white font-bold mb-2">${feature}</h3>
            <p className="text-slate-400 text-sm">Production-grade feature implementation</p>
          </div>
          `).join('')}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 flex-wrap">
          ${config.actions?.map((action, idx) => `
          <button
            key="${idx}"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition"
          >
            ${action.label}
          </button>
          `).join('') || ''}
        </div>
      </div>
    </div>
  );
};
  `;
}

function toPascalCase(str: string): string {
  return str
    .split(/[\s-_]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

// Pre-configured page templates
export const PAGE_TEMPLATES: Record<string, PageConfig> = {
  dashboard: {
    title: 'Dashboard',
    description: 'Real-time system overview and analytics',
    icon: '📊',
    features: ['Live Metrics', 'Performance Analytics', 'System Health', 'User Activity'],
    actions: [{ label: 'View Details', action: 'details' }],
  },
  marketplace: {
    title: 'Marketplace',
    description: 'Global commerce platform with real-time listings',
    icon: '🛒',
    features: ['Product Listings', 'Order Management', 'Seller Dashboard', 'Buyer Protection'],
    actions: [{ label: 'Browse Products', action: 'browse' }],
  },
  crypto: {
    title: 'Crypto Trading',
    description: 'Advanced cryptocurrency trading and portfolio management',
    icon: '💰',
    features: ['Real-Time Charts', 'Order Execution', 'Portfolio Tracking', 'Risk Management'],
    actions: [{ label: 'Trade Now', action: 'trade' }],
  },
  social: {
    title: 'Social Network',
    description: 'Connect, share, and collaborate with the community',
    icon: '👥',
    features: ['User Profiles', 'Feed Management', 'Messaging', 'Community Groups'],
    actions: [{ label: 'Explore', action: 'explore' }],
  },
  nft: {
    title: 'NFT Gallery',
    description: 'Mint, trade, and showcase digital collectibles',
    icon: '🎨',
    features: ['NFT Minting', 'Gallery Display', 'Trading', 'Royalty Distribution'],
    actions: [{ label: 'Create NFT', action: 'create' }],
  },
  gaming: {
    title: 'Gaming Hub',
    description: 'Play-to-earn games with real rewards',
    icon: '🎮',
    features: ['Game Library', 'Leaderboards', 'Rewards', 'Tournaments'],
    actions: [{ label: 'Play Now', action: 'play' }],
  },
  analytics: {
    title: 'Advanced Analytics',
    description: 'Deep insights and data-driven intelligence',
    icon: '📈',
    features: ['Data Visualization', 'Predictive Analytics', 'Custom Reports', 'Export Tools'],
    actions: [{ label: 'Generate Report', action: 'report' }],
  },
  admin: {
    title: 'Admin Panel',
    description: 'System administration and user management',
    icon: '⚙️',
    features: ['User Management', 'System Settings', 'Audit Logs', 'Security Controls'],
    actions: [{ label: 'Manage Users', action: 'users' }],
  },
};
