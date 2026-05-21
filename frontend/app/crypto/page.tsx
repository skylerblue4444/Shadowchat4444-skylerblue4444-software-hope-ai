'use client';

import React, { useState } from 'react';

interface CryptoPair {
  symbol: string;
  price: number;
  change: number;
  volume: string;
  high: number;
  low: number;
}

const cryptoData: CryptoPair[] = [
  { symbol: 'BTC/USD', price: 45230, change: 2.5, volume: '$28.5B', high: 46100, low: 44500 },
  { symbol: 'ETH/USD', price: 2450, change: 1.8, volume: '$15.2B', high: 2520, low: 2380 },
  { symbol: 'SOL/USD', price: 185, change: 5.2, volume: '$2.1B', high: 192, low: 175 },
  { symbol: 'XRP/USD', price: 2.85, change: -1.2, volume: '$1.8B', high: 2.95, low: 2.75 },
];

export default function CryptoPage() {
  const [selectedPair, setSelectedPair] = useState<CryptoPair>(cryptoData[0]);
  const [orderType, setOrderType] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState('');

  const handleTrade = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`${orderType.toUpperCase()} order placed: ${amount} ${selectedPair.symbol}`);
    setAmount('');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="pt-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">Crypto Exchange</h1>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Market Data */}
            <div className="md:col-span-2">
              <div className="bg-black/40 border border-blue-500/30 rounded-xl p-6 mb-8">
                <h2 className="text-2xl font-bold text-white mb-6">Market Overview</h2>
                <div className="space-y-4">
                  {cryptoData.map((pair) => (
                    <div
                      key={pair.symbol}
                      onClick={() => setSelectedPair(pair)}
                      className={`p-4 rounded-lg cursor-pointer transition border ${
                        selectedPair.symbol === pair.symbol
                          ? 'bg-blue-600/30 border-blue-400/60'
                          : 'bg-slate-800/50 border-blue-500/20 hover:border-blue-400/40'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-bold text-white">{pair.symbol}</h3>
                          <p className="text-sm text-gray-400">Vol: {pair.volume}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-white">${pair.price.toFixed(2)}</p>
                          <p className={`text-sm ${pair.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {pair.change >= 0 ? '+' : ''}{pair.change}%
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chart Placeholder */}
              <div className="bg-black/40 border border-blue-500/30 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">{selectedPair.symbol} Chart</h3>
                <div className="h-64 bg-slate-800/50 rounded-lg flex items-center justify-center">
                  <p className="text-gray-400">Price Chart - ${selectedPair.price.toFixed(2)}</p>
                </div>
              </div>
            </div>

            {/* Trading Panel */}
            <div className="bg-black/40 border border-blue-500/30 rounded-xl p-6 h-fit">
              <h3 className="text-xl font-bold text-white mb-6">Place Order</h3>
              <form onSubmit={handleTrade}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Pair</label>
                  <select
                    value={selectedPair.symbol}
                    onChange={(e) => {
                      const pair = cryptoData.find((p) => p.symbol === e.target.value);
                      if (pair) setSelectedPair(pair);
                    }}
                    className="w-full bg-slate-800 text-white rounded-lg p-2 border border-blue-500/20 focus:border-blue-500/60"
                  >
                    {cryptoData.map((pair) => (
                      <option key={pair.symbol} value={pair.symbol}>
                        {pair.symbol}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setOrderType('buy')}
                      className={`flex-1 py-2 rounded-lg transition ${
                        orderType === 'buy'
                          ? 'bg-green-600 text-white'
                          : 'bg-slate-800 text-gray-400 hover:bg-slate-700'
                      }`}
                    >
                      Buy
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderType('sell')}
                      className={`flex-1 py-2 rounded-lg transition ${
                        orderType === 'sell'
                          ? 'bg-red-600 text-white'
                          : 'bg-slate-800 text-gray-400 hover:bg-slate-700'
                      }`}
                    >
                      Sell
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Amount</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-slate-800 text-white rounded-lg p-2 border border-blue-500/20 focus:border-blue-500/60"
                  />
                </div>

                <div className="mb-6 p-3 bg-slate-800/50 rounded-lg">
                  <p className="text-sm text-gray-400">Total: ${(parseFloat(amount || '0') * selectedPair.price).toFixed(2)}</p>
                </div>

                <button
                  type="submit"
                  className={`w-full py-2 rounded-lg font-bold transition ${
                    orderType === 'buy'
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-red-600 hover:bg-red-700'
                  } text-white`}
                >
                  {orderType.toUpperCase()} {selectedPair.symbol}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
