import { motion } from "framer-motion";
import { ShoppingCart, Star, Download } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Marketplace() {
  const products = [
    { name: "AI Trading Bot", price: "$99", rating: 4.8, sales: "1.2K" },
    { name: "Prompt Pack Pro", price: "$29", rating: 4.9, sales: "3.4K" },
    { name: "Creator Course", price: "$199", rating: 4.7, sales: "856" },
    { name: "Hope AI Agent", price: "$149", rating: 4.9, sales: "2.1K" },
    { name: "NFT Collection", price: "$499", rating: 4.6, sales: "234" },
    { name: "Membership Pro", price: "$9.99/mo", rating: 4.8, sales: "5.6K" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#0a0a0a] p-8"
    >
      <h1 className="text-4xl font-bold gold-text mb-8">Marketplace X</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="luxury-card"
          >
            <div className="bg-[#FFD700]/10 rounded-lg h-32 mb-4 flex items-center justify-center">
              <Download className="w-8 h-8 gold-text" />
            </div>
            <h3 className="font-bold text-lg mb-2">{product.name}</h3>
            <div className="flex justify-between items-center mb-3">
              <span className="gold-text font-bold">{product.price}</span>
              <span className="flex items-center gap-1 text-sm">
                <Star className="w-4 h-4 gold-text" /> {product.rating}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mb-3">{product.sales} sold</p>
            <Button className="luxury-button w-full">Buy Now</Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
