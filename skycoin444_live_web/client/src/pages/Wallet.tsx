import { motion } from "framer-motion";
import { Send, Download, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Wallet() {
  const coins = [
    { symbol: "BTC", balance: "0.5", value: "$22,615", apy: "4.5%" },
    { symbol: "ETH", balance: "5.0", value: "$14,250", apy: "3.2%" },
    { symbol: "SOL", balance: "100", value: "$14,200", apy: "5.8%" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h1 className="text-3xl font-bold gold-text">Multi-Coin Wallet</h1>

      {/* Balances */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {coins.map((coin) => (
          <motion.div
            key={coin.symbol}
            whileHover={{ scale: 1.05 }}
            className="luxury-card"
          >
            <p className="text-muted-foreground mb-2">{coin.symbol}</p>
            <p className="text-2xl font-bold gold-text">{coin.balance}</p>
            <p className="text-sm text-muted-foreground">{coin.value}</p>
            <p className="text-xs gold-text mt-2">APY: {coin.apy}</p>
          </motion.div>
        ))}
      </div>

      {/* Send/Receive */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="luxury-card">
          <h3 className="font-bold gold-text mb-3 flex items-center gap-2"><Send className="w-4 h-4" /> Send</h3>
          <Input placeholder="Recipient address" className="mb-2" />
          <Input placeholder="Amount" type="number" className="mb-3" />
          <Button className="luxury-button w-full">Send</Button>
        </Card>

        <Card className="luxury-card">
          <h3 className="font-bold gold-text mb-3 flex items-center gap-2"><Download className="w-4 h-4" /> Receive</h3>
          <div className="bg-[#FFD700]/10 p-3 rounded mb-3 text-center">
            <p className="text-xs text-muted-foreground">Your Address</p>
            <p className="text-sm font-mono gold-text">1A1z7agoat...xyz</p>
          </div>
          <Button variant="outline" className="gold-border w-full">Copy Address</Button>
        </Card>
      </div>

      {/* Staking */}
      <Card className="luxury-card">
        <h3 className="font-bold gold-text mb-4 flex items-center gap-2"><Lock className="w-4 h-4" /> Staking</h3>
        <div className="space-y-3">
          {coins.map((coin) => (
            <div key={coin.symbol} className="flex justify-between items-center p-3 bg-[#FFD700]/5 rounded">
              <div>
                <p className="font-semibold">{coin.symbol}</p>
                <p className="text-xs text-muted-foreground">APY: {coin.apy}</p>
              </div>
              <Button size="sm" className="luxury-button">Stake</Button>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
