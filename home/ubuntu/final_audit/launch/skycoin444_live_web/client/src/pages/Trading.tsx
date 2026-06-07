import { motion } from "framer-motion";
import { TrendingUp, BarChart3, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Trading() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={itemVariants} className="flex justify-between items-center">
        <h1 className="text-3xl font-bold gold-text">Crypto Trading Dashboard</h1>
        <Button className="luxury-button">+ New Order</Button>
      </motion.div>

      {/* Price Ticker */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { symbol: "BTC", price: "$45,230", change: "+2.5%" },
          { symbol: "ETH", price: "$2,850", change: "+1.8%" },
          { symbol: "SOL", price: "$142", change: "+3.2%" }
        ].map((coin) => (
          <Card key={coin.symbol} className="luxury-card">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-muted-foreground">{coin.symbol}</p>
                <p className="text-2xl font-bold gold-text">{coin.price}</p>
              </div>
              <TrendingUp className="text-green-500" />
            </div>
            <p className="text-green-500 text-sm mt-2">{coin.change}</p>
          </Card>
        ))}
      </motion.div>

      {/* Order Book */}
      <motion.div variants={itemVariants} className="luxury-card">
        <h2 className="text-xl font-bold gold-text mb-4">Order Book</h2>
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex justify-between p-2 hover:bg-[#FFD700]/5 rounded">
              <span className="text-muted-foreground">Buy {i * 0.5} BTC</span>
              <span className="gold-text">${45000 - i * 100}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Portfolio */}
      <motion.div variants={itemVariants} className="luxury-card">
        <h2 className="text-xl font-bold gold-text mb-4 flex items-center gap-2">
          <Wallet className="w-5 h-5" /> Portfolio
        </h2>
        <div className="space-y-3">
          {[
            { asset: "Bitcoin", amount: "0.5 BTC", value: "$22,615" },
            { asset: "Ethereum", amount: "5 ETH", value: "$14,250" },
            { asset: "Solana", amount: "100 SOL", value: "$14,200" }
          ].map((item) => (
            <div key={item.asset} className="flex justify-between p-3 bg-[#FFD700]/5 rounded">
              <div>
                <p className="font-semibold">{item.asset}</p>
                <p className="text-sm text-muted-foreground">{item.amount}</p>
              </div>
              <p className="gold-text font-bold">{item.value}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
