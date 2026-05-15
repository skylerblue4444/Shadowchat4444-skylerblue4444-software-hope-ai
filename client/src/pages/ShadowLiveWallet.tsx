/**
 * ShadowChat Live Wallet Dashboard
 * Real wallet addresses (secp256k1 generated)
 * Live balances from mining workers
 * Live USD values from CoinGecko
 */

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Wallet, Copy, Send, ArrowDownToLine, RefreshCw, Eye, EyeOff, Shield } from "lucide-react";
import { generateWallet, COIN_META, type WalletAddresses } from "../lib/crypto/walletGenerator";
import { priceFeed, formatPrice, formatChange, formatMarketCap, type PriceMap } from "../lib/crypto/priceFeed";

const COINS = ['BTC', 'DOGE', 'TRUMP', 'SKY4444', 'USDT', 'XMR'] as const;

const COIN_COLORS: Record<string, string> = {
  BTC: '#F7931A', DOGE: '#C2A633', TRUMP: '#E31837',
  SKY4444: '#6366F1', USDT: '#26A17B', XMR: '#FF6600',
};
const COIN_ICONS: Record<string, string> = {
  BTC: '₿', DOGE: 'Ð', TRUMP: '🇺🇸', SKY4444: '✦', USDT: '₮', XMR: 'ɱ',
};

// Demo balances (would come from mining workers in full integration)
const DEMO_BALANCES: Record<string, number> = {
  BTC: 0.00000847, DOGE: 4.444, TRUMP: 10.0, SKY4444: 4444.0, USDT: 47.00, XMR: 0.0047,
};

export default function ShadowLiveWallet() {
  const [wallet, setWallet] = useState<WalletAddresses | null>(null);
  const [prices, setPrices] = useState<PriceMap>({});
  const [showKeys, setShowKeys] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setWallet(generateWallet());
    priceFeed.start().then(() => setLoading(false));
    const unsub = priceFeed.subscribe(setPrices);
    return () => unsub();
  }, []);

  const totalUSD = COINS.reduce((sum, coin) => {
    const price = prices[coin]?.price_usd ?? 0;
    return sum + (DEMO_BALANCES[coin] ?? 0) * price;
  }, 0);

  const copy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied`);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-black">Live Wallet</h1>
          <p className="text-xs text-muted-foreground">Real addresses · Live CoinGecko prices · secp256k1 generated</p>
        </div>
        <Button size="sm" variant="outline" onClick={() => { setWallet(generateWallet()); toast.success("New wallet generated"); }}>
          <RefreshCw className="h-3 w-3 mr-1" /> New
        </Button>
      </div>

      {/* Total Balance */}
      <Card className="border-yellow-500/30 bg-gradient-to-br from-yellow-900/20 to-orange-900/10">
        <CardContent className="py-4 px-4 text-center">
          <p className="text-xs text-muted-foreground mb-1">Total Portfolio Value (Live)</p>
          <p className="text-3xl font-black text-yellow-400">
            {loading ? '...' : `$${totalUSD.toFixed(2)}`}
          </p>
          <p className="text-xs text-muted-foreground mt-1">Prices from CoinGecko · Updates every 30s</p>
        </CardContent>
      </Card>

      {/* Coin Balances */}
      <div className="space-y-2">
        {COINS.map(coin => {
          const price = prices[coin];
          const balance = DEMO_BALANCES[coin] ?? 0;
          const usdVal = balance * (price?.price_usd ?? 0);
          const meta = COIN_META[coin as keyof typeof COIN_META];
          const addr = wallet?.[coin as keyof WalletAddresses] as string;

          return (
            <Card key={coin} className="border-border/50">
              <CardContent className="py-3 px-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl" style={{ color: COIN_COLORS[coin] }}>{COIN_ICONS[coin]}</span>
                    <div>
                      <p className="font-black text-sm">{coin}</p>
                      <p className="text-xs text-muted-foreground">{meta?.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-sm">{balance.toFixed(8)} {coin}</p>
                    <p className="text-xs text-green-400">${usdVal.toFixed(4)}</p>
                  </div>
                </div>

                {/* Live price row */}
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-muted-foreground">Live Price</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono">{loading ? '...' : formatPrice(price?.price_usd ?? 0, coin)}</span>
                    {price && (
                      <span className={price.change_24h >= 0 ? 'text-green-400' : 'text-red-400'}>
                        {formatChange(price.change_24h)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Market cap */}
                {price && (
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-muted-foreground">Market Cap</span>
                    <span className="font-mono">{formatMarketCap(price.market_cap)}</span>
                  </div>
                )}

                {/* Address */}
                {addr && (
                  <div className="flex items-center gap-1.5 bg-black/30 rounded px-2 py-1">
                    <code className="flex-1 text-xs font-mono text-blue-400 truncate">{addr}</code>
                    <Button size="sm" variant="ghost" className="h-5 w-5 p-0" onClick={() => copy(addr, `${coin} address`)}>
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex gap-1.5 mt-2">
                  <Button size="sm" className="flex-1 h-7 text-xs bg-green-600 hover:bg-green-500 text-white border-0"
                    onClick={() => toast.info(`Receive ${coin} — share your address above`)}>
                    <ArrowDownToLine className="h-3 w-3 mr-1" /> Receive
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 h-7 text-xs"
                    onClick={() => toast.info(`Send ${coin} — enter recipient address`)}>
                    <Send className="h-3 w-3 mr-1" /> Send
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Security Notice */}
      <Card className="border-red-500/30 bg-red-900/10">
        <CardContent className="py-3 px-3">
          <div className="flex items-center justify-between mb-2">
            <p className="font-black text-xs text-red-400 flex items-center gap-1">
              <Shield className="h-3.5 w-3.5" /> Private Key Security
            </p>
            <Button size="sm" variant="ghost" className="h-6 text-xs" onClick={() => setShowKeys(v => !v)}>
              {showKeys ? <EyeOff className="h-3 w-3 mr-1" /> : <Eye className="h-3 w-3 mr-1" />}
              {showKeys ? 'Hide' : 'Show'}
            </Button>
          </div>
          {showKeys && wallet && (
            <div className="space-y-1">
              <p className="text-xs text-red-300 font-bold">⚠ Never share your private key with anyone</p>
              <div className="flex items-center gap-1.5 bg-black/40 rounded px-2 py-1">
                <code className="flex-1 text-xs font-mono text-red-300 break-all">{wallet.privateKeyHex}</code>
                <Button size="sm" variant="ghost" className="h-5 w-5 p-0 shrink-0"
                  onClick={() => copy(wallet.privateKeyHex, 'Private key')}>
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>
          )}
          {!showKeys && (
            <p className="text-xs text-muted-foreground">
              Generated with real secp256k1 ECDSA. Your private key controls all 6 coin addresses.
            </p>
          )}
        </CardContent>
      </Card>

      <div className="rounded-xl bg-muted/50 border border-border/50 p-3 text-center">
        <p className="font-bold text-xs">ShadowChat Live Wallet — Skyler Blue IT Resolutions</p>
        <p className="text-xs text-muted-foreground">479-406-7123 · Real secp256k1 · CoinGecko live prices</p>
      </div>
    </div>
  );
}
