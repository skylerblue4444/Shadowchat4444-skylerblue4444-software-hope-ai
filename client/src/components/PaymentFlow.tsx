/**
 * Seamless Multi-Coin Payment Flow Component
 * ─────────────────────────────────────────────────────────────────────────────
 * Beautiful, smooth payment experience with real-time conversion and animations
 */

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PaymentFlowProps {
  amount: number;
  onPaymentComplete: (coin: string, amount: string) => void;
  acceptedCoins: string[];
  usdPrices: Record<string, number>;
}

const COIN_COLORS: Record<string, string> = {
  SKYCOIN4444: "from-blue-600 to-blue-400",
  SHADOW: "from-gray-800 to-gray-600",
  TRUMP: "from-orange-600 to-orange-400",
  DOGE: "from-yellow-500 to-yellow-300",
  BTC: "from-orange-700 to-orange-500",
  MONERO: "from-red-600 to-red-400",
  USDT: "from-green-600 to-green-400",
};

const COIN_ICONS: Record<string, string> = {
  SKYCOIN4444: "🚀",
  SHADOW: "🌑",
  TRUMP: "🦅",
  DOGE: "🐕",
  BTC: "₿",
  MONERO: "🔐",
  USDT: "💵",
};

export const PaymentFlow: React.FC<PaymentFlowProps> = ({
  amount,
  onPaymentComplete,
  acceptedCoins,
  usdPrices,
}) => {
  const [selectedCoin, setSelectedCoin] = useState<string>(acceptedCoins[0]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const cryptoAmount = useMemo(() => {
    const price = usdPrices[selectedCoin] || 0.01;
    return (amount / price).toFixed(8);
  }, [amount, selectedCoin, usdPrices]);

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setShowSuccess(true);
    onPaymentComplete(selectedCoin, cryptoAmount);
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(false);
    }, 2000);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold text-white mb-2">Seamless Payment</h2>
        <p className="text-slate-400">Choose your payment method</p>
      </motion.div>

      {/* Amount Display */}
      <motion.div
        className="bg-slate-800 rounded-xl p-6 mb-6 border border-slate-700"
        whileHover={{ borderColor: "rgb(71, 85, 105)" }}
      >
        <p className="text-slate-400 text-sm mb-2">Total Amount</p>
        <motion.div
          key={selectedCoin}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex items-baseline justify-between"
        >
          <div>
            <span className="text-4xl font-bold text-white">${amount}</span>
            <span className="text-slate-400 ml-2">USD</span>
          </div>
          <div className="text-right">
            <span className="text-2xl font-semibold text-blue-400">
              {cryptoAmount}
            </span>
            <span className="text-slate-400 ml-2 text-sm">{selectedCoin}</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Coin Selection */}
      <div className="mb-6">
        <p className="text-slate-400 text-sm mb-3">Select Payment Coin</p>
        <div className="grid grid-cols-2 gap-3">
          <AnimatePresence>
            {acceptedCoins.map((coin) => (
              <motion.button
                key={coin}
                onClick={() => setSelectedCoin(coin)}
                className={`p-4 rounded-lg transition-all duration-300 ${
                  selectedCoin === coin
                    ? `bg-gradient-to-br ${COIN_COLORS[coin]} text-white shadow-lg scale-105`
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-2xl mb-2">{COIN_ICONS[coin]}</div>
                <div className="text-sm font-semibold">{coin}</div>
                <div className="text-xs opacity-75">
                  ${usdPrices[coin]?.toFixed(4) || "0.00"}
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Payment Method Info */}
      <motion.div
        className="bg-blue-900/30 border border-blue-700/50 rounded-lg p-4 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <p className="text-blue-300 text-sm">
          ✓ Instant processing • ✓ No hidden fees • ✓ Secure transaction
        </p>
      </motion.div>

      {/* Action Button */}
      <motion.button
        onClick={handlePayment}
        disabled={isProcessing}
        className={`w-full py-4 rounded-lg font-bold text-lg transition-all duration-300 ${
          isProcessing
            ? "bg-slate-600 text-slate-400 cursor-not-allowed"
            : `bg-gradient-to-r ${COIN_COLORS[selectedCoin]} text-white hover:shadow-lg`
        }`}
        whileHover={!isProcessing ? { scale: 1.02 } : {}}
        whileTap={!isProcessing ? { scale: 0.98 } : {}}
      >
        {isProcessing ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity }}
            className="inline-block"
          >
            ⟳
          </motion.div>
        ) : showSuccess ? (
          "✓ Payment Complete!"
        ) : (
          `Pay ${cryptoAmount} ${selectedCoin}`
        )}
      </motion.button>

      {/* Success Animation */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed inset-0 flex items-center justify-center pointer-events-none"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.6 }}
              className="text-6xl"
            >
              ✨
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
