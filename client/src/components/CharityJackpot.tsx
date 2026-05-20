/**
 * Charity Jackpot Gambling Component
 * ─────────────────────────────────────────────────────────────────────────────
 * Fun, engaging lottery UI where 50% goes to charity, 50% to winners
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CharityJackpotProps {
  onPurchaseTicket: (coin: string, amount: number) => void;
  charityAmount: number;
  currentJackpot: number;
  selectedCharity: string;
}

const LOTTERY_BALLS = Array.from({ length: 49 }, (_, i) => i + 1);

export const CharityJackpot: React.FC<CharityJackpotProps> = ({
  onPurchaseTicket,
  charityAmount,
  currentJackpot,
  selectedCharity,
}) => {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [ticketAmount, setTicketAmount] = useState<number>(10);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const toggleNumber = (num: number) => {
    if (selectedNumbers.includes(num)) {
      setSelectedNumbers(selectedNumbers.filter((n) => n !== num));
    } else if (selectedNumbers.length < 6) {
      setSelectedNumbers([...selectedNumbers, num].sort((a, b) => a - b));
    }
  };

  const generateRandom = () => {
    const random: number[] = [];
    while (random.length < 6) {
      const num = Math.floor(Math.random() * 49) + 1;
      if (!random.includes(num)) random.push(num);
    }
    setSelectedNumbers(random.sort((a, b) => a - b));
  };

  const handlePurchase = async () => {
    setIsAnimating(true);
    setShowConfetti(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    onPurchaseTicket("SKYCOIN4444", ticketAmount);
    setIsAnimating(false);
    setShowConfetti(false);
    setSelectedNumbers([]);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-gradient-to-br from-purple-900 via-slate-900 to-slate-800 rounded-3xl shadow-2xl border border-purple-700/50">
      {/* Header with Jackpot */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
          🎰 Charity Jackpot
        </h1>
        <p className="text-slate-400 mb-4">50% to winners • 50% to charity</p>

        {/* Jackpot Display */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="bg-gradient-to-r from-yellow-600 to-yellow-400 rounded-2xl p-6 mb-6 shadow-lg"
        >
          <p className="text-slate-900 text-sm font-semibold mb-1">Current Jackpot</p>
          <p className="text-4xl font-bold text-slate-900">
            ${currentJackpot.toLocaleString()}
          </p>
        </motion.div>

        {/* Charity Info */}
        <motion.div
          className="bg-blue-900/30 border border-blue-700/50 rounded-xl p-4 mb-6"
          whileHover={{ borderColor: "rgb(96, 165, 250)" }}
        >
          <p className="text-blue-300 text-sm">
            💚 {selectedCharity} will receive ${charityAmount.toLocaleString()}
          </p>
        </motion.div>
      </motion.div>

      {/* Number Selection Grid */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Pick 6 Numbers</h2>
          <motion.button
            onClick={generateRandom}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm font-semibold transition-colors"
          >
            🎲 Random
          </motion.button>
        </div>

        {/* Number Balls */}
        <div className="grid grid-cols-7 gap-2 mb-6 bg-slate-800/50 p-4 rounded-xl">
          <AnimatePresence>
            {LOTTERY_BALLS.map((num) => (
              <motion.button
                key={num}
                onClick={() => toggleNumber(num)}
                className={`aspect-square rounded-full font-bold text-sm transition-all duration-200 ${
                  selectedNumbers.includes(num)
                    ? "bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg scale-110"
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                animate={
                  selectedNumbers.includes(num)
                    ? { rotate: 360 }
                    : { rotate: 0 }
                }
                transition={{ duration: 0.3 }}
              >
                {num}
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        {/* Selected Numbers Display */}
        <motion.div
          className="bg-slate-700/50 rounded-lg p-4 mb-6"
          animate={{ height: "auto" }}
        >
          <p className="text-slate-400 text-sm mb-2">Selected Numbers</p>
          <div className="flex flex-wrap gap-2">
            {selectedNumbers.length === 0 ? (
              <p className="text-slate-500 text-sm">Select 6 numbers...</p>
            ) : (
              <>
                {selectedNumbers.map((num) => (
                  <motion.span
                    key={num}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold"
                  >
                    {num}
                  </motion.span>
                ))}
              </>
            )}
          </div>
        </motion.div>
      </div>

      {/* Ticket Amount */}
      <div className="mb-8">
        <label className="block text-slate-300 text-sm font-semibold mb-3">
          Ticket Amount (SKY4444)
        </label>
        <div className="flex gap-3">
          {[5, 10, 25, 50, 100].map((amount) => (
            <motion.button
              key={amount}
              onClick={() => setTicketAmount(amount)}
              className={`flex-1 py-3 rounded-lg font-bold transition-all ${
                ticketAmount === amount
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {amount}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Odds Display */}
      <motion.div
        className="bg-slate-700/50 rounded-lg p-4 mb-6 grid grid-cols-3 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-center">
          <p className="text-slate-400 text-xs mb-1">Jackpot Odds</p>
          <p className="text-lg font-bold text-yellow-400">1 in 13.9M</p>
        </div>
        <div className="text-center border-l border-r border-slate-600">
          <p className="text-slate-400 text-xs mb-1">Your Chance</p>
          <p className="text-lg font-bold text-blue-400">0.000007%</p>
        </div>
        <div className="text-center">
          <p className="text-slate-400 text-xs mb-1">Expected Value</p>
          <p className="text-lg font-bold text-green-400">+50%</p>
        </div>
      </motion.div>

      {/* Purchase Button */}
      <motion.button
        onClick={handlePurchase}
        disabled={selectedNumbers.length !== 6 || isAnimating}
        className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
          selectedNumbers.length === 6 && !isAnimating
            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-2xl cursor-pointer"
            : "bg-slate-600 text-slate-400 cursor-not-allowed opacity-50"
        }`}
        whileHover={selectedNumbers.length === 6 ? { scale: 1.02 } : {}}
        whileTap={selectedNumbers.length === 6 ? { scale: 0.98 } : {}}
      >
        {isAnimating ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity }}
            className="inline-block"
          >
            ⟳
          </motion.div>
        ) : selectedNumbers.length === 6 ? (
          `Buy Ticket • ${ticketAmount} SKY4444`
        ) : (
          `Select ${6 - selectedNumbers.length} more number${6 - selectedNumbers.length !== 1 ? "s" : ""}`
        )}
      </motion.button>

      {/* Confetti Animation */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none"
          >
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: -20,
                  opacity: 1,
                }}
                animate={{
                  y: window.innerHeight,
                  opacity: 0,
                  rotate: Math.random() * 360,
                }}
                transition={{ duration: 2, ease: "easeIn" }}
                className="fixed text-2xl"
              >
                {["🎉", "✨", "🎊", "💰", "🎈"][i % 5]}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
