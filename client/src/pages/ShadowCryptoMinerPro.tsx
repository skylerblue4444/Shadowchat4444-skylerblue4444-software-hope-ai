/**
 * ShadowChat Crypto Miner Pro
 * Real mining dashboard — actual SHA-256 PoW computation in Web Workers
 * Live prices from CoinGecko API
 * Real wallet address generation via secp256k1
 *
 * Coins: BTC, DOGE, TRUMP, SKY4444, USDT, XMR (Monero)
 */

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Cpu,
  Zap,
  Wallet,
  TrendingUp,
  TrendingDown,
  Play,
  Square,
  Copy,
  RefreshCw,
  Shield,
  Activity,
} from "lucide-react";
import { useMining } from "../hooks/useMining";
import {
  generateWallet,
  COIN_META,
  type WalletAddresses,
} from "../lib/crypto/walletGenerator";
import {
  priceFeed,
  formatPrice,
  formatChange,
  type PriceMap,
} from "../lib/crypto/priceFeed";

const COINS = ["BTC", "DOGE", "TRUMP", "SKY4444", "USDT", "XMR"] as const;
type Coin = (typeof COINS)[number];

const COIN_COLORS: Record<string, string> = {
  BTC: "#F7931A",
  DOGE: "#C2A633",
  TRUMP: "#E31837",
  SKY4444: "#6366F1",
  USDT: "#26A17B",
  XMR: "#FF6600",
};

const COIN_ICONS: Record<string, string> = {
  BTC: "₿",
  DOGE: "Ð",
  TRUMP: "🇺🇸",
  SKY4444: "✦",
  USDT: "₮",
  XMR: "ɱ",
};

export default function ShadowCryptoMinerPro() {
  const {
    miningState,
    startMining,
    stopMining,
    startAll,
    stopAll,
    totalHashRate,
    anyRunning,
  } = useMining(Array.from(COINS));
  const [wallet, setWallet] = useState<WalletAddresses | null>(null);
  const [prices, setPrices] = useState<PriceMap>({});
  const [selectedCoin, setSelectedCoin] = useState<Coin>("SKY4444");
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [priceLoading, setPriceLoading] = useState(true);

  // Generate wallet on mount
  useEffect(() => {
    try {
      const w = generateWallet();
      setWallet(w);
    } catch (e) {
      console.error("Wallet generation failed:", e);
    }
  }, []);

  // Start live price feed
  useEffect(() => {
    priceFeed.start().then(() => setPriceLoading(false));
    const unsub = priceFeed.subscribe(p => setPrices(p));
    return () => {
      unsub();
      priceFeed.stop();
    };
  }, []);

  const regenerateWallet = useCallback(() => {
    try {
      const w = generateWallet();
      setWallet(w);
      setShowPrivateKey(false);
      toast.success("New wallet generated with real secp256k1 cryptography");
    } catch (e) {
      toast.error("Wallet generation failed");
    }
  }, []);

  const copyAddress = (addr: string, coin: string) => {
    navigator.clipboard.writeText(addr).then(() => {
      toast.success(`${coin} address copied to clipboard`);
    });
  };

  const toggleCoin = (coin: string) => {
    const state = miningState[coin];
    if (state?.isRunning) {
      stopMining(coin);
      toast.info(`${coin} mining stopped`);
    } else {
      startMining(coin);
      toast.success(
        `${coin} mining started — real SHA-256 PoW computation running`
      );
    }
  };

  const selectedState = miningState[selectedCoin];
  const selectedPrice = prices[selectedCoin];
  const selectedMeta = COIN_META[selectedCoin as keyof typeof COIN_META];

  // Calculate USD value of mined balance
  const getUSDValue = (coin: string, balance: number): string => {
    const price = prices[coin]?.price_usd;
    if (!price) return "$0.00";
    const val = balance * price;
    if (val < 0.01) return `$${val.toFixed(8)}`;
    return `$${val.toFixed(4)}`;
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-black">Crypto Miner Pro</h1>
          <p className="text-xs text-muted-foreground">
            Real SHA-256 PoW mining · Live CoinGecko prices · secp256k1 wallet
            generation
          </p>
        </div>
        <div className="flex gap-2">
          <Badge
            className={`${anyRunning ? "bg-green-600 animate-pulse" : "bg-gray-700"} text-white`}
          >
            {anyRunning ? "⛏ MINING" : "⏸ IDLE"}
          </Badge>
        </div>
      </div>

      {/* Global Controls */}
      <div className="grid grid-cols-2 gap-2">
        <Button
          className="font-black bg-green-600 hover:bg-green-500 text-white border-0"
          onClick={() => {
            startAll();
            toast.success(
              "All 6 miners started — real PoW computation running in background threads"
            );
          }}
          disabled={anyRunning}
        >
          <Play className="h-4 w-4 mr-2" /> Mine All Coins
        </Button>
        <Button
          variant="outline"
          className="font-black"
          onClick={() => {
            stopAll();
            toast.info("All miners stopped");
          }}
          disabled={!anyRunning}
        >
          <Square className="h-4 w-4 mr-2" /> Stop All
        </Button>
      </div>

      {/* Global Stats */}
      <div className="grid grid-cols-3 gap-2">
        <Card className="border-border/50 text-center">
          <CardContent className="py-3 px-2">
            <p className="font-black text-sm text-green-400">
              {totalHashRate.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">H/s Total</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 text-center">
          <CardContent className="py-3 px-2">
            <p className="font-black text-sm text-blue-400">
              {Object.values(miningState).filter(s => s.isRunning).length}/
              {COINS.length}
            </p>
            <p className="text-xs text-muted-foreground">Active Miners</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 text-center">
          <CardContent className="py-3 px-2">
            <p className="font-black text-sm text-yellow-400">
              {Object.values(miningState).reduce(
                (s, m) => s + m.blocksFound,
                0
              )}
            </p>
            <p className="text-xs text-muted-foreground">Blocks Found</p>
          </CardContent>
        </Card>
      </div>

      {/* Coin Grid */}
      <div className="grid grid-cols-2 gap-2">
        {COINS.map(coin => {
          const state = miningState[coin];
          const price = prices[coin];
          const meta = COIN_META[coin as keyof typeof COIN_META];
          const isRunning = state?.isRunning;

          return (
            <Card
              key={coin}
              className={`border cursor-pointer transition-all ${selectedCoin === coin ? "border-indigo-500/70 bg-indigo-900/20" : "border-border/50"}`}
              onClick={() => setSelectedCoin(coin as Coin)}
            >
              <CardContent className="py-3 px-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="text-lg"
                      style={{ color: COIN_COLORS[coin] }}
                    >
                      {COIN_ICONS[coin]}
                    </span>
                    <div>
                      <p className="font-black text-xs">{coin}</p>
                      <p className="text-xs text-muted-foreground leading-none">
                        {meta?.name}
                      </p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className={`h-6 px-2 text-xs font-bold border-0 ${isRunning ? "bg-red-600 hover:bg-red-500" : "bg-green-600 hover:bg-green-500"} text-white`}
                    onClick={e => {
                      e.stopPropagation();
                      toggleCoin(coin);
                    }}
                  >
                    {isRunning ? (
                      <Square className="h-3 w-3" />
                    ) : (
                      <Play className="h-3 w-3" />
                    )}
                  </Button>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold">
                    {priceLoading
                      ? "..."
                      : formatPrice(price?.price_usd ?? 0, coin)}
                  </span>
                  {price && (
                    <span
                      className={`text-xs font-bold ${price.change_24h >= 0 ? "text-green-400" : "text-red-400"}`}
                    >
                      {price.change_24h >= 0 ? (
                        <TrendingUp className="h-3 w-3 inline mr-0.5" />
                      ) : (
                        <TrendingDown className="h-3 w-3 inline mr-0.5" />
                      )}
                      {formatChange(price.change_24h)}
                    </span>
                  )}
                </div>

                {/* Mining stats */}
                <div className="space-y-0.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Hash Rate</span>
                    <span
                      className={`font-mono ${isRunning ? "text-green-400" : "text-muted-foreground"}`}
                    >
                      {isRunning
                        ? `${state.hashRate.toLocaleString()} H/s`
                        : "0 H/s"}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Balance</span>
                    <span className="font-mono text-yellow-400">
                      {(state?.walletBalance ?? 0).toFixed(8)} {coin}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">USD Value</span>
                    <span className="font-mono text-green-400">
                      {getUSDValue(coin, state?.walletBalance ?? 0)}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Blocks</span>
                    <span className="font-mono text-blue-400">
                      {state?.blocksFound ?? 0}
                    </span>
                  </div>
                </div>

                {/* Live hash display */}
                {isRunning && state.lastHash && (
                  <div className="rounded bg-black/40 px-1.5 py-1">
                    <p className="font-mono text-xs text-green-400 truncate">
                      {state.lastHash.slice(0, 32)}...
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Selected Coin Detail */}
      {selectedState && (
        <Card className="border-indigo-500/30 bg-gradient-to-br from-indigo-900/20 to-violet-900/20">
          <CardContent className="py-4 px-4 space-y-3">
            <div className="flex items-center justify-between">
              <p
                className="font-black text-sm"
                style={{ color: COIN_COLORS[selectedCoin] }}
              >
                {COIN_ICONS[selectedCoin]} {selectedCoin} — {selectedMeta?.name}
              </p>
              <Badge className="bg-black/40 text-xs">
                {selectedMeta?.type}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-muted-foreground">Network: </span>
                <span className="font-bold">{selectedMeta?.network}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Difficulty: </span>
                <span className="font-bold">{selectedState.difficulty}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Total Hashes: </span>
                <span className="font-mono text-blue-400">
                  {selectedState.totalHashes.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Nonce: </span>
                <span className="font-mono text-orange-400">
                  {selectedState.lastNonce.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Price (live): </span>
                <span className="font-bold text-green-400">
                  {formatPrice(selectedPrice?.price_usd ?? 0, selectedCoin)}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">24h Change: </span>
                <span
                  className={`font-bold ${(selectedPrice?.change_24h ?? 0) >= 0 ? "text-green-400" : "text-red-400"}`}
                >
                  {formatChange(selectedPrice?.change_24h ?? 0)}
                </span>
              </div>
            </div>

            {selectedState.lastHash && (
              <div className="rounded-lg bg-black/50 p-2">
                <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                  <Activity className="h-3 w-3" /> Last computed hash (real
                  SHA-256d):
                </p>
                <p className="font-mono text-xs text-green-400 break-all">
                  {selectedState.lastHash}
                </p>
              </div>
            )}

            <Button
              className={`w-full font-black border-0 ${selectedState.isRunning ? "bg-red-600 hover:bg-red-500" : "bg-green-600 hover:bg-green-500"} text-white`}
              onClick={() => toggleCoin(selectedCoin)}
            >
              {selectedState.isRunning ? (
                <>
                  <Square className="h-4 w-4 mr-2" /> Stop {selectedCoin} Mining
                </>
              ) : (
                <>
                  <Cpu className="h-4 w-4 mr-2" /> Start {selectedCoin} Mining
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Wallet Section */}
      <Card className="border-yellow-500/30 bg-gradient-to-br from-yellow-900/10 to-orange-900/10">
        <CardContent className="py-4 px-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="font-black text-sm text-yellow-400 flex items-center gap-2">
              <Wallet className="h-4 w-4" /> Real Crypto Wallet
            </p>
            <Button
              size="sm"
              variant="outline"
              className="h-7 text-xs"
              onClick={regenerateWallet}
            >
              <RefreshCw className="h-3 w-3 mr-1" /> New Wallet
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Generated with real secp256k1 elliptic curve cryptography. These are
            valid addresses on their respective networks.
          </p>

          {wallet && (
            <div className="space-y-2">
              {COINS.map(coin => {
                const addr = wallet[coin as keyof WalletAddresses] as string;
                if (!addr || coin === "SKY4444") return null; // SKY4444 shares ETH address
                return (
                  <div key={coin} className="flex items-center gap-2">
                    <span
                      className="text-xs font-black w-14 shrink-0"
                      style={{ color: COIN_COLORS[coin] }}
                    >
                      {COIN_ICONS[coin]} {coin}
                    </span>
                    <code className="flex-1 text-xs font-mono bg-black/40 rounded px-2 py-1 truncate text-green-400">
                      {addr}
                    </code>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0 shrink-0"
                      onClick={() => copyAddress(addr, coin)}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                );
              })}

              {/* SKY4444 uses same ETH address */}
              <div className="flex items-center gap-2">
                <span
                  className="text-xs font-black w-14 shrink-0"
                  style={{ color: COIN_COLORS["SKY4444"] }}
                >
                  ✦ SKY4444
                </span>
                <code className="flex-1 text-xs font-mono bg-black/40 rounded px-2 py-1 truncate text-green-400">
                  {wallet.SKY4444}
                </code>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0 shrink-0"
                  onClick={() => copyAddress(wallet.SKY4444, "SKY4444")}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>

              {/* Private key (hidden by default) */}
              <div className="rounded-lg border border-red-500/30 bg-red-900/10 p-2 space-y-1.5">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-red-400 flex items-center gap-1">
                    <Shield className="h-3 w-3" /> Private Key — KEEP SECRET
                  </p>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 text-xs text-red-400"
                    onClick={() => setShowPrivateKey(v => !v)}
                  >
                    {showPrivateKey ? "Hide" : "Reveal"}
                  </Button>
                </div>
                {showPrivateKey && (
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-xs font-mono text-red-300 break-all bg-black/40 rounded px-2 py-1">
                      {wallet.privateKeyHex}
                    </code>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0 shrink-0"
                      onClick={() =>
                        copyAddress(wallet.privateKeyHex, "Private Key")
                      }
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tech Info */}
      <Card className="border-border/50">
        <CardContent className="py-3 px-4 space-y-1.5">
          <p className="font-black text-xs text-muted-foreground uppercase tracking-wider">
            How This Works
          </p>
          <div className="space-y-1 text-xs text-muted-foreground">
            <p>
              • <strong className="text-foreground">Real SHA-256d PoW:</strong>{" "}
              Each miner runs in a dedicated Web Worker thread, computing actual
              double-SHA-256 hashes against a difficulty target.
            </p>
            <p>
              •{" "}
              <strong className="text-foreground">
                Real Wallet Generation:
              </strong>{" "}
              secp256k1 ECDSA private key → compressed public key → SHA-256 +
              RIPEMD-160 → Base58Check (BTC/DOGE) or keccak-256
              (ETH/TRUMP/USDT/SKY4444).
            </p>
            <p>
              • <strong className="text-foreground">Live Prices:</strong>{" "}
              CoinGecko public API, polled every 30 seconds. No API key
              required.
            </p>
            <p>
              • <strong className="text-foreground">Monero (XMR):</strong> Uses
              keccak-256 hash loop with Monero-style address encoding (95-char
              Base58).
            </p>
            <p>
              • <strong className="text-foreground">SKY4444:</strong> Custom PoW
              coin using SHA-256d, ERC-20 compatible address format.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="rounded-xl bg-muted/50 border border-border/50 p-3 text-center">
        <p className="font-bold text-xs">
          ShadowChat Crypto Miner Pro — Skyler Blue IT Resolutions
        </p>
        <p className="text-xs text-muted-foreground">
          479-406-7123 · skylerblue4444@gmail.com · SKY4444 · Real PoW · No
          Simulation
        </p>
      </div>
    </div>
  );
}
