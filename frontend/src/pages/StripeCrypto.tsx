import React, { useState } from 'react';
import { CreditCard, TrendingUp, Wallet, Send, Copy, CheckCircle, Clock, AlertCircle, ArrowDownRight, ArrowUpRight } from 'lucide-react';

interface CryptoPayment {
  id: string;
  asset: string;
  amountUSD: number;
  amountCrypto: number;
  status: 'pending' | 'confirmed' | 'settled' | 'failed';
  transactionHash?: string;
  confirmations?: number;
  requiredConfirmations: number;
  createdAt: number;
}

interface ExchangeRate {
  asset: string;
  price: number;
  change24h: number;
}

interface LiquidityPool {
  asset: string;
  available: number;
  reserved: number;
  utilization: number;
}

const StripeCrypto: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'payments' | 'wallets' | 'exchange' | 'liquidity'>('payments');
  const [selectedAsset, setSelectedAsset] = useState('BTC');
  const [amountUSD, setAmountUSD] = useState('');
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const [payments, setPayments] = useState<CryptoPayment[]>([
    {
      id: 'pay-001',
      asset: 'BTC',
      amountUSD: 5000,
      amountCrypto: 0.116,
      status: 'settled',
      transactionHash: '0x1a2b3c4d5e6f7g8h9i0j',
      confirmations: 6,
      requiredConfirmations: 6,
      createdAt: Date.now() - 86400000,
    },
    {
      id: 'pay-002',
      asset: 'ETH',
      amountUSD: 2300,
      amountCrypto: 1.0,
      status: 'confirmed',
      transactionHash: '0x9i8h7g6f5e4d3c2b1a0j',
      confirmations: 12,
      requiredConfirmations: 12,
      createdAt: Date.now() - 3600000,
    },
    {
      id: 'pay-003',
      asset: 'SOL',
      amountUSD: 1400,
      amountCrypto: 10.0,
      status: 'pending',
      transactionHash: '0x5e4d3c2b1a0j9i8h7g6f',
      confirmations: 8,
      requiredConfirmations: 32,
      createdAt: Date.now() - 600000,
    },
  ]);

  const [exchangeRates, setExchangeRates] = useState<ExchangeRate[]>([
    { asset: 'BTC', price: 43000, change24h: 2.5 },
    { asset: 'ETH', price: 2300, change24h: -1.2 },
    { asset: 'SOL', price: 140, change24h: 5.8 },
    { asset: 'USDC', price: 1.0, change24h: 0.0 },
    { asset: 'DOGE', price: 0.12, change24h: 3.2 },
    { asset: 'XMR', price: 185, change24h: -2.1 },
  ]);

  const [liquidityPools, setLiquidityPools] = useState<LiquidityPool[]>([
    { asset: 'BTC', available: 850000, reserved: 150000, utilization: 15 },
    { asset: 'ETH', available: 920000, reserved: 80000, utilization: 8 },
    { asset: 'SOL', available: 750000, reserved: 250000, utilization: 25 },
    { asset: 'USDC', available: 980000, reserved: 20000, utilization: 2 },
  ]);

  const [wallets, setWallets] = useState([
    { asset: 'BTC', address: '1A1z7agoat...', balance: 2.5, received: 5.2, sent: 2.7 },
    { asset: 'ETH', address: '0x742d35Cc...', balance: 15.3, received: 25.1, sent: 9.8 },
    { asset: 'SOL', address: 'Ey6Q8cDf...', balance: 125.5, received: 200.0, sent: 74.5 },
  ]);

  const [stats] = useState({
    totalPayments: 247,
    settledPayments: 234,
    failedPayments: 5,
    pendingPayments: 8,
    totalUSDSettled: 1245000,
    totalCryptoSettled: 45.2,
    successRate: 94.8,
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'settled':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'confirmed':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'failed':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'settled':
        return <CheckCircle className="h-5 w-5" />;
      case 'confirmed':
        return <CheckCircle className="h-5 w-5" />;
      case 'pending':
        return <Clock className="h-5 w-5" />;
      case 'failed':
        return <AlertCircle className="h-5 w-5" />;
      default:
        return null;
    }
  };

  const convertUSDToCrypto = (usd: number, asset: string) => {
    const rate = exchangeRates.find((r) => r.asset === asset);
    return rate ? (usd / rate.price).toFixed(6) : '0';
  };

  const handleCreatePayment = () => {
    if (!amountUSD) return;

    const newPayment: CryptoPayment = {
      id: `pay-${Date.now()}`,
      asset: selectedAsset,
      amountUSD: parseFloat(amountUSD),
      amountCrypto: parseFloat(convertUSDToCrypto(parseFloat(amountUSD), selectedAsset)),
      status: 'pending',
      confirmations: 0,
      requiredConfirmations: selectedAsset === 'BTC' ? 6 : selectedAsset === 'ETH' ? 12 : 32,
      createdAt: Date.now(),
    };

    setPayments([newPayment, ...payments]);
    setAmountUSD('');
    setShowPaymentForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center">
                  <CreditCard className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-5xl font-black">Stripe Crypto</h1>
                  <p className="text-slate-400">Live Crypto Payment Settlement & Management</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowPaymentForm(!showPaymentForm)}
              className="px-6 py-3 bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700 rounded-lg font-semibold transition flex items-center gap-2"
            >
              <Send className="h-5 w-5" />
              New Payment
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
              <p className="text-slate-400 text-sm">Total Settled</p>
              <p className="text-3xl font-bold mt-2">${stats.totalUSDSettled.toLocaleString()}</p>
              <p className="text-xs text-slate-400 mt-2">{stats.totalCryptoSettled} crypto</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
              <p className="text-slate-400 text-sm">Success Rate</p>
              <p className="text-3xl font-bold mt-2 text-green-400">{stats.successRate}%</p>
              <p className="text-xs text-slate-400 mt-2">{stats.settledPayments} settled</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
              <p className="text-slate-400 text-sm">Pending</p>
              <p className="text-3xl font-bold mt-2 text-yellow-400">{stats.pendingPayments}</p>
              <p className="text-xs text-slate-400 mt-2">awaiting confirmation</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
              <p className="text-slate-400 text-sm">Failed</p>
              <p className="text-3xl font-bold mt-2 text-red-400">{stats.failedPayments}</p>
              <p className="text-xs text-slate-400 mt-2">requires review</p>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        {showPaymentForm && (
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-bold mb-4">Create Crypto Payment</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Select Crypto Asset</label>
                <select
                  value={selectedAsset}
                  onChange={(e) => setSelectedAsset(e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                >
                  {exchangeRates.map((rate) => (
                    <option key={rate.asset} value={rate.asset}>
                      {rate.asset} (${rate.price.toFixed(2)})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Amount (USD)</label>
                <input
                  type="number"
                  value={amountUSD}
                  onChange={(e) => setAmountUSD(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Amount ({selectedAsset})</label>
                <input
                  type="text"
                  value={amountUSD ? convertUSDToCrypto(parseFloat(amountUSD), selectedAsset) : '0'}
                  readOnly
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={handleCreatePayment}
                className="px-6 py-2 bg-orange-600 hover:bg-orange-700 rounded-lg font-semibold transition"
              >
                Create Payment
              </button>
              <button
                onClick={() => setShowPaymentForm(false)}
                className="px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg font-semibold transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8 border-b border-slate-700">
          {(['payments', 'wallets', 'exchange', 'liquidity'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold capitalize transition border-b-2 ${
                activeTab === tab
                  ? 'border-orange-500 text-orange-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Payments Tab */}
        {activeTab === 'payments' && (
          <div className="space-y-4">
            {payments.map((payment) => (
              <div key={payment.id} className={`bg-slate-800/50 backdrop-blur border rounded-lg p-6 ${getStatusColor(payment.status)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="mt-1">{getStatusIcon(payment.status)}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="text-lg font-bold">{payment.asset}</h4>
                        <span className="text-sm font-semibold px-3 py-1 rounded bg-black/20">{payment.status}</span>
                      </div>
                      <p className="text-sm opacity-80">
                        {payment.amountCrypto} {payment.asset} = ${payment.amountUSD.toLocaleString()}
                      </p>
                      {payment.transactionHash && (
                        <div className="flex items-center gap-2 mt-2 text-xs opacity-70">
                          <span>TX: {payment.transactionHash.substring(0, 16)}...</span>
                          <Copy className="h-3 w-3 cursor-pointer hover:opacity-100" />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">${payment.amountUSD}</p>
                    {payment.confirmations !== undefined && (
                      <p className="text-xs opacity-70 mt-2">
                        {payment.confirmations}/{payment.requiredConfirmations} confirmations
                      </p>
                    )}
                    <p className="text-xs opacity-70 mt-1">
                      {new Date(payment.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                {payment.status === 'pending' && payment.confirmations !== undefined && (
                  <div className="mt-4 w-full bg-slate-700 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500"
                      style={{ width: `${(payment.confirmations / payment.requiredConfirmations) * 100}%` }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Wallets Tab */}
        {activeTab === 'wallets' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {wallets.map((wallet, idx) => (
              <div key={idx} className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">{wallet.asset} Wallet</h3>
                  <Wallet className="h-6 w-6 text-orange-400" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Address</span>
                    <span className="font-mono text-sm">{wallet.address}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Balance</span>
                    <span className="font-bold">{wallet.balance} {wallet.asset}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Received</span>
                    <span className="text-green-400 flex items-center gap-1">
                      <ArrowDownRight className="h-4 w-4" />
                      {wallet.received} {wallet.asset}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Sent</span>
                    <span className="text-red-400 flex items-center gap-1">
                      <ArrowUpRight className="h-4 w-4" />
                      {wallet.sent} {wallet.asset}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Exchange Rates Tab */}
        {activeTab === 'exchange' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {exchangeRates.map((rate, idx) => (
              <div key={idx} className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-bold">{rate.asset}</h4>
                  <TrendingUp className="h-5 w-5 text-orange-400" />
                </div>
                <p className="text-3xl font-bold mb-2">${rate.price.toLocaleString()}</p>
                <p className={`text-sm font-semibold ${rate.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {rate.change24h >= 0 ? '+' : ''}{rate.change24h}% (24h)
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Liquidity Pools Tab */}
        {activeTab === 'liquidity' && (
          <div className="space-y-4">
            {liquidityPools.map((pool, idx) => (
              <div key={idx} className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-lg font-bold">{pool.asset} Liquidity Pool</h4>
                  <span className="text-sm font-bold px-3 py-1 rounded bg-slate-700">{pool.utilization}% utilized</span>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-slate-400 text-sm">Available</p>
                    <p className="text-xl font-bold">${pool.available.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Reserved</p>
                    <p className="text-xl font-bold text-yellow-400">${pool.reserved.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Total</p>
                    <p className="text-xl font-bold">${(pool.available + pool.reserved).toLocaleString()}</p>
                  </div>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3">
                  <div
                    className="h-3 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500"
                    style={{ width: `${pool.utilization}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StripeCrypto;
