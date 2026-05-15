/**
 * ShadowChat Live Crypto Price Ticker
 * Real-time prices from CoinGecko API — used across the entire platform
 */

import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { priceFeed, formatPrice, type PriceMap } from "../lib/crypto/priceFeed";

const TICKER_COINS = ['BTC', 'ETH', 'DOGE', 'TRUMP', 'XMR', 'SOL', 'BNB', 'USDT', 'SKY4444'];

export function CryptoPriceTicker() {
  const [prices, setPrices] = useState<PriceMap>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    priceFeed.start().then(() => setLoading(false));
    const unsub = priceFeed.subscribe(setPrices);
    return () => unsub();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-4 overflow-hidden text-xs text-muted-foreground py-1 px-2">
        <span className="animate-pulse">Loading live prices from CoinGecko...</span>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden bg-black/30 border-b border-border/30 py-1">
      <div className="flex items-center gap-6 animate-marquee whitespace-nowrap px-4">
        {[...TICKER_COINS, ...TICKER_COINS].map((coin, i) => {
          const price = prices[coin];
          if (!price) return null;
          const up = price.change_24h >= 0;
          return (
            <span key={`${coin}-${i}`} className="flex items-center gap-1 text-xs shrink-0">
              <span className="font-black text-foreground">{coin}</span>
              <span className="font-mono">{formatPrice(price.price_usd, coin)}</span>
              <span className={`flex items-center gap-0.5 ${up ? 'text-green-400' : 'text-red-400'}`}>
                {up ? <TrendingUp className="h-2.5 w-2.5" /> : <TrendingDown className="h-2.5 w-2.5" />}
                {up ? '+' : ''}{price.change_24h.toFixed(2)}%
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
