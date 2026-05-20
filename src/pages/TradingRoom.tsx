// src/pages/TradingRoom.tsx - Production Luxury Trading Room
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { multiCoinService } from '@/server/lib/multi-coin';

const TradingRoom: React.FC = () => {
  const [selectedPair, setSelectedPair] = useState("SKY4444/USDT");
  const [amount, setAmount] = useState("124.50");
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [livePrice, setLivePrice] = useState(0.0847);

  useEffect(() => {
    const interval = setInterval(() => {
      setLivePrice(prev => parseFloat((prev * (1 + (Math.random() - 0.5) * 0.002)).toFixed(6)));
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  const executeTrade = async () => {
    await multiCoinService.swap({ user: { id: "current" } }, side === "buy" ? "USDT" : "SKY4444", side === "buy" ? "SKY4444" : "USDT", amount);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,#ffd70012_0%,transparent_70%)]" />
      <div className="relative z-10 max-w-7xl mx-auto p-8">
        <h1 className="text-6xl font-serif tracking-tight bg-gradient-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent mb-12">SHADOW EXCHANGE</h1>
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-8">
            <Card className="bg-black/70 border border-amber-400/30 backdrop-blur-3xl">
              <CardContent className="p-8">
                <div className="text-6xl font-mono text-white">{livePrice}</div>
                <Button onClick={executeTrade} className="mt-8 w-full py-8 text-xl bg-gradient-to-r from-amber-400 to-yellow-500">EXECUTE TRADE</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingRoom;