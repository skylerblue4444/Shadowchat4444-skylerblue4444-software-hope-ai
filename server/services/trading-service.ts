/**
 * Trading & Swap Service - SKY4444 Spot Trading Infrastructure
 * Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC
 * 
 * Features: Spot Trading, Token Swap, P2P Exchange, Order Book, Market/Limit Orders
 */

import { TRADING_PAIRS, TRADING_FEES, SWAP_CONFIG, SUPPORTED_COINS } from '../lib/crypto-infrastructure';

export interface Order {
  id: string;
  userId: string;
  pair: string;
  side: 'buy' | 'sell';
  type: 'market' | 'limit' | 'stop' | 'stop_limit';
  amount: number;
  price: number;
  filled: number;
  remaining: number;
  status: 'open' | 'filled' | 'partial' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
  fee: number;
}

export interface SwapQuote {
  id: string;
  fromCoin: string;
  toCoin: string;
  fromAmount: number;
  toAmount: number;
  rate: number;
  fee: number;
  slippage: number;
  expiresAt: Date;
  valid: boolean;
}

export interface TradeExecution {
  orderId: string;
  executedPrice: number;
  executedAmount: number;
  fee: number;
  timestamp: Date;
}

export interface OrderBook {
  pair: string;
  bids: OrderBookEntry[];
  asks: OrderBookEntry[];
  lastPrice: number;
  volume24h: number;
  change24h: number;
}

export interface OrderBookEntry {
  price: number;
  amount: number;
  total: number;
  orderCount: number;
}

// =============================================================================
// TRADING ENGINE
// =============================================================================

class TradingEngine {
  private orders: Map<string, Order> = new Map();
  private trades: TradeExecution[] = [];
  private prices: Map<string, number> = new Map();

  constructor() {
    // Initialize with base prices
    this.prices.set('SKY4444', 0.01);
    this.prices.set('SHADOW', 0.005);
    this.prices.set('TRUMP', 12.50);
    this.prices.set('DOGE', 0.35);
    this.prices.set('BTC', 107000);
    this.prices.set('XMR', 185);
    this.prices.set('USDT', 1.0);
  }

  // Place a new order
  placeOrder(
    userId: string,
    pair: string,
    side: 'buy' | 'sell',
    type: 'market' | 'limit' | 'stop' | 'stop_limit',
    amount: number,
    price: number
  ): Order {
    if (!TRADING_PAIRS.includes(pair)) {
      throw new Error(`Trading pair ${pair} not supported`);
    }

    const fee = side === 'buy' ? amount * TRADING_FEES.taker : amount * TRADING_FEES.maker;

    const order: Order = {
      id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      pair,
      side,
      type,
      amount,
      price: type === 'market' ? this.getMarketPrice(pair) : price,
      filled: 0,
      remaining: amount,
      status: 'open',
      createdAt: new Date(),
      updatedAt: new Date(),
      fee,
    };

    this.orders.set(order.id, order);

    // Auto-execute market orders
    if (type === 'market') {
      this.executeOrder(order);
    }

    return order;
  }

  // Execute an order
  private executeOrder(order: Order): TradeExecution {
    const executedPrice = order.price;
    const executedAmount = order.amount;
    const fee = executedAmount * TRADING_FEES.taker;

    order.filled = executedAmount;
    order.remaining = 0;
    order.status = 'filled';
    order.updatedAt = new Date();

    const trade: TradeExecution = {
      orderId: order.id,
      executedPrice,
      executedAmount,
      fee,
      timestamp: new Date(),
    };

    this.trades.push(trade);
    return trade;
  }

  // Cancel an order
  cancelOrder(orderId: string, userId: string): Order {
    const order = this.orders.get(orderId);
    if (!order) throw new Error('Order not found');
    if (order.userId !== userId) throw new Error('Unauthorized');
    if (order.status === 'filled') throw new Error('Cannot cancel filled order');

    order.status = 'cancelled';
    order.updatedAt = new Date();
    return order;
  }

  // Get a swap quote
  getSwapQuote(fromCoin: string, toCoin: string, fromAmount: number): SwapQuote {
    if (!SWAP_CONFIG.enabled) throw new Error('Swap is currently disabled');

    const fromPrice = this.prices.get(fromCoin) || 0;
    const toPrice = this.prices.get(toCoin) || 0;

    if (fromPrice === 0 || toPrice === 0) {
      throw new Error(`Price not available for ${fromCoin} or ${toCoin}`);
    }

    const rate = fromPrice / toPrice;
    const fee = fromAmount * SWAP_CONFIG.feePercent;
    const netAmount = fromAmount - fee;
    const toAmount = netAmount * rate;
    const slippage = this.calculateSlippage(fromCoin, toCoin, fromAmount);

    return {
      id: `swap_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      fromCoin,
      toCoin,
      fromAmount,
      toAmount: toAmount * (1 - slippage),
      rate,
      fee,
      slippage,
      expiresAt: new Date(Date.now() + 30000), // 30 second expiry
      valid: slippage <= SWAP_CONFIG.maxSlippage,
    };
  }

  // Execute a swap
  executeSwap(quoteId: string, userId: string): { success: boolean; toAmount: number } {
    // In production, validate quote hasn't expired and user has balance
    return { success: true, toAmount: 0 }; // Placeholder
  }

  // Calculate price slippage
  private calculateSlippage(fromCoin: string, toCoin: string, amount: number): number {
    const pair = `${fromCoin}/${toCoin}`;
    const pool = SWAP_CONFIG.liquidityPools.find(p => p.pair === pair);
    if (!pool) return SWAP_CONFIG.slippageTolerance;

    const fromPrice = this.prices.get(fromCoin) || 0;
    const impactRatio = (amount * fromPrice) / pool.liquidity;
    return Math.min(impactRatio * 0.5, SWAP_CONFIG.maxSlippage);
  }

  // Get market price for a pair
  getMarketPrice(pair: string): number {
    const [base, quote] = pair.split('/');
    const basePrice = this.prices.get(base) || 0;
    const quotePrice = this.prices.get(quote) || 1;
    return basePrice / quotePrice;
  }

  // Get order book for a pair
  getOrderBook(pair: string): OrderBook {
    const pairOrders = Array.from(this.orders.values())
      .filter(o => o.pair === pair && o.status === 'open');

    const bids = pairOrders
      .filter(o => o.side === 'buy')
      .sort((a, b) => b.price - a.price)
      .slice(0, 20)
      .map(o => ({
        price: o.price,
        amount: o.remaining,
        total: o.price * o.remaining,
        orderCount: 1,
      }));

    const asks = pairOrders
      .filter(o => o.side === 'sell')
      .sort((a, b) => a.price - b.price)
      .slice(0, 20)
      .map(o => ({
        price: o.price,
        amount: o.remaining,
        total: o.price * o.remaining,
        orderCount: 1,
      }));

    return {
      pair,
      bids,
      asks,
      lastPrice: this.getMarketPrice(pair),
      volume24h: this.get24hVolume(pair),
      change24h: this.get24hChange(pair),
    };
  }

  // Get 24h volume
  private get24hVolume(pair: string): number {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    return this.trades
      .filter(t => {
        const order = this.orders.get(t.orderId);
        return order?.pair === pair && t.timestamp > oneDayAgo;
      })
      .reduce((sum, t) => sum + t.executedAmount * t.executedPrice, 0);
  }

  // Get 24h price change
  private get24hChange(pair: string): number {
    return (Math.random() - 0.5) * 10; // Simulated
  }

  // Get user's open orders
  getUserOrders(userId: string, status?: string): Order[] {
    return Array.from(this.orders.values())
      .filter(o => o.userId === userId && (!status || o.status === status));
  }

  // Get user's trade history
  getUserTrades(userId: string): TradeExecution[] {
    const userOrderIds = new Set(
      Array.from(this.orders.values())
        .filter(o => o.userId === userId)
        .map(o => o.id)
    );
    return this.trades.filter(t => userOrderIds.has(t.orderId));
  }

  // Update price (from external feed or internal)
  updatePrice(coinSymbol: string, price: number): void {
    this.prices.set(coinSymbol, price);
  }

  // Get all current prices
  getAllPrices(): Record<string, number> {
    const prices: Record<string, number> = {};
    for (const [symbol, price] of this.prices) {
      prices[symbol] = price;
    }
    return prices;
  }

  // Get supported trading pairs
  getSupportedPairs(): string[] {
    return TRADING_PAIRS;
  }
}

// Singleton instance
export const tradingEngine = new TradingEngine();

export default tradingEngine;
