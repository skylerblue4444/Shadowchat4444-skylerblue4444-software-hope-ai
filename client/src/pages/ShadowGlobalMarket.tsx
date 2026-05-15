/**
 * ShadowChat Global Marketplace
 * USA 🇺🇸 · China 🇨🇳 · EU 🇪🇺 · Global 🌍
 * Multi-currency: USD · CNY · EUR · BTC · ETH · SKY4444 · USDT
 * Auto-synced from DHgate, Alibaba, and USA partners
 */

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Globe2, ShoppingCart, Star, TrendingUp, Zap, Shield, Truck } from "lucide-react";

type Region = 'All' | 'USA' | 'China' | 'EU' | 'Global';
type Currency = 'USD' | 'CNY' | 'EUR' | 'SKY4444' | 'BTC' | 'USDT';

const EXCHANGE_RATES: Record<Currency, number> = {
  USD: 1, CNY: 7.24, EUR: 0.92, SKY4444: 21.28, BTC: 0.0000148, USDT: 1,
};

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: '$', CNY: '¥', EUR: '€', SKY4444: '✦', BTC: '₿', USDT: '₮',
};

const PRODUCTS = [
  // USA Products
  { id: 1, name: 'TRUMP 2024 Gold Collector Coin', price: 49.99, rating: 4.9, sold: 18472, discount: 20, region: 'USA' as Region, category: 'Collectibles', emoji: '🇺🇸', source: 'USA Mint Partner', tags: ['TRUMP', 'gold', 'collectible'], hot: true, cryptoBonus: 10 },
  { id: 2, name: 'SKY4444 Crypto Hoodie — Limited', price: 44.44, rating: 5.0, sold: 4444, discount: 51, region: 'USA' as Region, category: 'Fashion', emoji: '👕', source: 'ShadowChat Shop', tags: ['SKY4444', 'streetwear'], hot: true, cryptoBonus: 15 },
  { id: 3, name: 'Bitcoin Hardware Wallet Pro', price: 79.99, rating: 4.8, sold: 8472, discount: 30, region: 'USA' as Region, category: 'Crypto', emoji: '🔐', source: 'USA Tech Partner', tags: ['bitcoin', 'hardware wallet', 'security'], hot: false, cryptoBonus: 5 },
  { id: 4, name: 'Crypto Trading Desk Setup Kit', price: 299.99, rating: 4.7, sold: 2847, discount: 25, region: 'USA' as Region, category: 'Tech', emoji: '🖥️', source: 'USA Tech Partner', tags: ['trading', 'setup', 'desk'], hot: false, cryptoBonus: 8 },

  // China Products
  { id: 5, name: 'RGB Mechanical Gaming Keyboard', price: 34.99, rating: 4.8, sold: 12847, discount: 61, region: 'China' as Region, category: 'Gaming', emoji: '⌨️', source: 'DHgate', tags: ['gaming', 'RGB', 'keyboard'], hot: true, cryptoBonus: 5 },
  { id: 6, name: 'Smart LED Strip Lights 10M', price: 18.99, rating: 4.7, sold: 44721, discount: 58, region: 'China' as Region, category: 'Home', emoji: '💡', source: 'DHgate', tags: ['LED', 'smart home', 'RGB'], hot: true, cryptoBonus: 3 },
  { id: 7, name: 'Portable Mining Rig Frame', price: 89.99, rating: 4.8, sold: 2847, discount: 55, region: 'China' as Region, category: 'Mining', emoji: '⛏️', source: 'Alibaba', tags: ['mining', 'rig', 'crypto'], hot: false, cryptoBonus: 10 },
  { id: 8, name: 'Smart Watch Pro — Health Monitor', price: 29.99, rating: 4.6, sold: 28471, discount: 63, region: 'China' as Region, category: 'Wearables', emoji: '⌚', source: 'Alibaba', tags: ['smartwatch', 'health', 'fitness'], hot: true, cryptoBonus: 4 },
  { id: 9, name: 'Wireless Earbuds Pro 48hr Battery', price: 22.99, rating: 4.7, sold: 67841, discount: 62, region: 'China' as Region, category: 'Audio', emoji: '🎧', source: 'DHgate', tags: ['earbuds', 'wireless', 'audio'], hot: true, cryptoBonus: 3 },
  { id: 10, name: 'ASIC Miner Cooling Fan Set', price: 45.99, rating: 4.9, sold: 5847, discount: 40, region: 'China' as Region, category: 'Mining', emoji: '🌀', source: 'Alibaba', tags: ['ASIC', 'cooling', 'mining'], hot: false, cryptoBonus: 7 },
  { id: 11, name: 'Crypto Themed Phone Case Set', price: 8.99, rating: 4.5, sold: 34721, discount: 70, region: 'China' as Region, category: 'Accessories', emoji: '📱', source: 'DHgate', tags: ['phone case', 'crypto', 'bitcoin'], hot: false, cryptoBonus: 2 },
  { id: 12, name: 'USB-C Hub 12-in-1 Pro', price: 39.99, rating: 4.8, sold: 19847, discount: 50, region: 'China' as Region, category: 'Tech', emoji: '🔌', source: 'Alibaba', tags: ['USB hub', 'tech', 'productivity'], hot: false, cryptoBonus: 4 },

  // EU Products
  { id: 13, name: 'Crypto Ledger Nano Case — EU', price: 24.99, rating: 4.9, sold: 7847, discount: 35, region: 'EU' as Region, category: 'Crypto', emoji: '🔒', source: 'EU Partner', tags: ['ledger', 'crypto', 'security'], hot: false, cryptoBonus: 6 },
  { id: 14, name: 'DeFi Trading Journal — Premium', price: 19.99, rating: 4.8, sold: 4721, discount: 40, region: 'EU' as Region, category: 'Education', emoji: '📓', source: 'EU Partner', tags: ['DeFi', 'trading', 'journal'], hot: false, cryptoBonus: 5 },
  { id: 15, name: 'Blockchain Dev Course Bundle', price: 99.99, rating: 4.9, sold: 2847, discount: 60, region: 'EU' as Region, category: 'Education', emoji: '🎓', source: 'EU Partner', tags: ['blockchain', 'development', 'course'], hot: true, cryptoBonus: 20 },
  { id: 16, name: 'Privacy VPN Router — Crypto Ready', price: 149.99, rating: 4.7, sold: 3847, discount: 30, region: 'EU' as Region, category: 'Privacy', emoji: '🛡️', source: 'EU Partner', tags: ['VPN', 'privacy', 'router'], hot: false, cryptoBonus: 8 },
];

const CATEGORIES = ['All', 'Crypto', 'Gaming', 'Mining', 'Fashion', 'Tech', 'Home', 'Wearables', 'Audio', 'Education', 'Privacy', 'Collectibles', 'Accessories'];

function convertPrice(usdPrice: number, currency: Currency): string {
  const rate = EXCHANGE_RATES[currency];
  const converted = usdPrice * rate;
  const symbol = CURRENCY_SYMBOLS[currency];
  if (currency === 'BTC') return `${symbol}${converted.toFixed(6)}`;
  if (currency === 'SKY4444') return `${converted.toFixed(2)} ${symbol}`;
  return `${symbol}${converted.toFixed(2)}`;
}

export default function ShadowGlobalMarket() {
  const [region, setRegion] = useState<Region>('All');
  const [category, setCategory] = useState('All');
  const [currency, setCurrency] = useState<Currency>('USD');
  const [cart, setCart] = useState<number[]>([]);

  const filtered = PRODUCTS.filter(p =>
    (region === 'All' || p.region === region) &&
    (category === 'All' || p.category === category)
  );

  const addToCart = (id: number, name: string) => {
    setCart(v => [...v, id]);
    toast.success(`Added to cart! Pay with ${currency} · +${PRODUCTS.find(p => p.id === id)?.cryptoBonus ?? 0} SKY4444 bonus ✦`);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Globe2 className="h-6 w-6 text-primary" />
            Global Marketplace
          </h1>
          <p className="text-xs text-muted-foreground">🇺🇸 USA · 🇨🇳 China · 🇪🇺 EU · Pay with crypto · SKY4444 rewards on every purchase</p>
        </div>
        <div className="relative">
          <Button size="sm" variant="outline" className="text-xs">
            <ShoppingCart className="h-3.5 w-3.5 mr-1" /> Cart
            {cart.length > 0 && (
              <span className="ml-1 bg-primary text-primary-foreground rounded-full text-xs w-4 h-4 flex items-center justify-center">{cart.length}</span>
            )}
          </Button>
        </div>
      </div>

      {/* Trust badges */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { icon: <Shield className="h-3.5 w-3.5" />, text: 'SKY4444 Escrow', sub: 'Buyer protection' },
          { icon: <Truck className="h-3.5 w-3.5" />, text: 'Global Shipping', sub: '150+ countries' },
          { icon: <Zap className="h-3.5 w-3.5" />, text: 'Crypto Payments', sub: '6 coins accepted' },
        ].map(b => (
          <Card key={b.text} className="border-border/50">
            <CardContent className="py-2 px-2 flex items-center gap-1.5">
              <span className="text-green-400">{b.icon}</span>
              <div>
                <p className="font-bold text-xs">{b.text}</p>
                <p className="text-xs text-muted-foreground">{b.sub}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Currency selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs text-muted-foreground shrink-0">Pay with:</span>
        {(Object.keys(EXCHANGE_RATES) as Currency[]).map(c => (
          <button
            key={c}
            onClick={() => setCurrency(c)}
            className={`shrink-0 text-xs px-2.5 py-1 rounded-full border transition-all ${
              currency === c ? 'bg-primary text-primary-foreground border-primary' : 'border-border/50 text-muted-foreground hover:border-primary/50'
            }`}
          >
            {CURRENCY_SYMBOLS[c]} {c}
          </button>
        ))}
      </div>

      {/* Region filter */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {(['All', 'USA', 'China', 'EU'] as Region[]).map(r => (
          <button
            key={r}
            onClick={() => setRegion(r)}
            className={`shrink-0 text-xs px-3 py-1 rounded-full border transition-all ${
              region === r ? 'bg-primary text-primary-foreground border-primary' : 'border-border/50 text-muted-foreground hover:border-primary/50'
            }`}
          >
            {r === 'USA' ? '🇺🇸 USA' : r === 'China' ? '🇨🇳 China' : r === 'EU' ? '🇪🇺 EU' : '🌍 All'}
          </button>
        ))}
      </div>

      {/* Category filter */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {CATEGORIES.map(c => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`shrink-0 text-xs px-2.5 py-1 rounded-full border transition-all ${
              category === c ? 'bg-primary text-primary-foreground border-primary' : 'border-border/50 text-muted-foreground hover:border-primary/50'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Product count */}
      <p className="text-xs text-muted-foreground">{filtered.length} products · Prices in {currency}</p>

      {/* Products grid */}
      <div className="grid grid-cols-2 gap-3">
        {filtered.map(product => {
          const inCart = cart.includes(product.id);
          return (
            <Card key={product.id} className={`border-border/50 hover:border-primary/30 transition-all ${product.hot ? 'ring-1 ring-orange-500/30' : ''}`}>
              <CardContent className="py-3 px-3">
                {/* Image placeholder */}
                <div className="w-full h-20 bg-muted/50 rounded-lg flex items-center justify-center mb-2 relative">
                  <span className="text-4xl">{product.emoji}</span>
                  {product.hot && (
                    <Badge className="absolute top-1 right-1 bg-orange-500/90 text-white border-0 text-xs px-1.5 py-0">
                      🔥 HOT
                    </Badge>
                  )}
                </div>

                {/* Name */}
                <p className="font-bold text-xs leading-tight mb-1 line-clamp-2">{product.name}</p>

                {/* Source & Region */}
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-xs text-muted-foreground">{product.region === 'USA' ? '🇺🇸' : product.region === 'China' ? '🇨🇳' : '🇪🇺'}</span>
                  <span className="text-xs text-muted-foreground truncate">{product.source}</span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-1">
                  <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-xs font-bold">{product.rating}</span>
                  <span className="text-xs text-muted-foreground">({product.sold.toLocaleString()} sold)</span>
                </div>

                {/* Price */}
                <div className="mb-1">
                  <span className="font-black text-sm text-green-400">{convertPrice(product.price, currency)}</span>
                  {product.discount > 0 && (
                    <span className="ml-1 text-xs text-muted-foreground line-through">{convertPrice(product.price / (1 - product.discount / 100), currency)}</span>
                  )}
                </div>

                {/* Discount + crypto bonus */}
                <div className="flex items-center gap-1 mb-2">
                  {product.discount > 0 && (
                    <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs px-1 py-0">-{product.discount}%</Badge>
                  )}
                  <Badge className="bg-indigo-500/20 text-indigo-400 border-indigo-500/30 text-xs px-1 py-0">+{product.cryptoBonus} SKY4444</Badge>
                </div>

                {/* Add to cart */}
                <Button
                  size="sm"
                  className={`w-full h-7 text-xs border-0 ${inCart ? 'bg-green-700 text-white' : 'bg-green-600 hover:bg-green-500 text-white'}`}
                  onClick={() => addToCart(product.id, product.name)}
                >
                  <ShoppingCart className="h-3 w-3 mr-1" />
                  {inCart ? 'Added ✓' : 'Add to Cart'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <Card className="border-primary/30 bg-primary/5">
        <CardContent className="py-4 px-4 text-center">
          <p className="font-black text-sm mb-1">🌍 Sell Your Products Here</p>
          <p className="text-xs text-muted-foreground mb-2">List products from USA, China, or EU. Accept crypto payments. Reach global buyers. Zero listing fees for SKY4444 holders.</p>
          <Button size="sm" className="text-xs">Become a Seller</Button>
        </CardContent>
      </Card>

      <div className="text-center py-2">
        <p className="text-xs text-muted-foreground">ShadowChat Global Market · Skyler Blue IT Resolutions · 479-406-7123</p>
      </div>
    </div>
  );
}
