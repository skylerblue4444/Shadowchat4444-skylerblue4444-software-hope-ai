'use client';

import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <nav className="fixed top-0 w-full bg-black/50 backdrop-blur-md border-b border-purple-500/20 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            ShadowChat v70
          </h1>
          <div className="flex gap-4">
            <Link href="/social" className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition">
              Social
            </Link>
            <Link href="/crypto" className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition">
              Crypto
            </Link>
            <Link href="/marketplace" className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition">
              Marketplace
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl sm:text-7xl font-bold text-white mb-6">
            Welcome to ShadowChat v70
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            The ultimate multi-industry platform combining Social Networking, Crypto Trading, and Digital Marketplace
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {/* Social Card */}
            <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/30 rounded-xl p-8 hover:border-purple-400/60 transition">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-2xl font-bold text-white mb-4">Social Network</h3>
              <p className="text-gray-300 mb-6">
                Connect with millions of users, share content, and build your community
              </p>
              <Link
                href="/social"
                className="inline-block px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition"
              >
                Explore Social
              </Link>
            </div>

            {/* Crypto Card */}
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/30 rounded-xl p-8 hover:border-blue-400/60 transition">
              <div className="text-4xl mb-4">₿</div>
              <h3 className="text-2xl font-bold text-white mb-4">Crypto Exchange</h3>
              <p className="text-gray-300 mb-6">
                Trade cryptocurrencies with real-time market data and advanced tools
              </p>
              <Link
                href="/crypto"
                className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
              >
                Start Trading
              </Link>
            </div>

            {/* Marketplace Card */}
            <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/30 rounded-xl p-8 hover:border-green-400/60 transition">
              <div className="text-4xl mb-4">🛍️</div>
              <h3 className="text-2xl font-bold text-white mb-4">Marketplace</h3>
              <p className="text-gray-300 mb-6">
                Buy and sell digital products from verified sellers worldwide
              </p>
              <Link
                href="/marketplace"
                className="inline-block px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition"
              >
                Browse Products
              </Link>
            </div>
          </div>

          <div className="mt-20 p-8 bg-black/40 border border-purple-500/20 rounded-xl">
            <h3 className="text-2xl font-bold text-white mb-4">Key Features</h3>
            <div className="grid md:grid-cols-2 gap-4 text-left text-gray-300">
              <div>✓ Real-time social feeds and messaging</div>
              <div>✓ Advanced crypto trading algorithms</div>
              <div>✓ Secure marketplace transactions</div>
              <div>✓ Multi-currency support</div>
              <div>✓ User verification and trust system</div>
              <div>✓ 24/7 customer support</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
