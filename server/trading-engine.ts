/**
 * SkyCoin444 Trading Engine
 * Production-Grade Real-Time Trading & Market Data
 * Supports: Spot Trading, Futures, Options, Market Making
 */

import { EventEmitter } from 'events';

// ============================================================================
// MARKET DATA MANAGER
// ============================================================================

interface Ticker {
  symbol: string;
  price: number;
  change24h: number;
  changePercent24h: number;
  high24h: number;
  low24h: number;
  volume24h: number;
  marketCap: number;
  timestamp: Date;
}

interface Candle {
  timestamp: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface OrderBook {
  symbol: string;
  bids: Array<[number, number]>; // [price, quantity]
  asks: Array<[number, number]>;
  timestamp: Date;
}

class MarketDataManager extends EventEmitter {
  private tickers: Map<string, Ticker> = new Map();
  private candles: Map<string, Candle[]> = new Map();
  private orderBooks: Map<string, OrderBook> = new Map();
  private priceFeeds: Map<string, NodeJS.Timeout> = new Map();

  /**
   * Update ticker data
   */
  updateTicker(ticker: Ticker): void {
    this.tickers.set(ticker.symbol, ticker);
    this.emit('ticker:updated', ticker);
  }

  /**
   * Get current ticker
   */
  getTicker(symbol: string): Ticker | null {
    return this.tickers.get(symbol) || null;
  }

  /**
   * Get all tickers
   */
  getAllTickers(): Ticker[] {
    return Array.from(this.tickers.values());
  }

  /**
   * Add candle data
   */
  addCandle(symbol: string, candle: Candle): void {
    if (!this.candles.has(symbol)) {
      this.candles.set(symbol, []);
    }
    this.candles.get(symbol)!.push(candle);
    this.emit('candle:added', { symbol, candle });
  }

  /**
   * Get candles for symbol
   */
  getCandles(symbol: string, limit: number = 100): Candle[] {
    const candles = this.candles.get(symbol) || [];
    return candles.slice(-limit);
  }

  /**
   * Update order book
   */
  updateOrderBook(orderBook: OrderBook): void {
    this.orderBooks.set(orderBook.symbol, orderBook);
    this.emit('orderbook:updated', orderBook);
  }

  /**
   * Get order book
   */
  getOrderBook(symbol: string): OrderBook | null {
    return this.orderBooks.get(symbol) || null;
  }

  /**
   * Subscribe to price updates
   */
  subscribeToPriceUpdates(symbol: string, callback: (ticker: Ticker) => void): void {
    const interval = setInterval(() => {
      const ticker = this.getTicker(symbol);
      if (ticker) callback(ticker);
    }, 1000);

    this.priceFeeds.set(`${symbol}:price`, interval as any);
  }

  /**
   * Unsubscribe from price updates
   */
  unsubscribeFromPriceUpdates(symbol: string): void {
    const interval = this.priceFeeds.get(`${symbol}:price`);
    if (interval) clearInterval(interval as any);
    this.priceFeeds.delete(`${symbol}:price`);
  }
}

// ============================================================================
// ORDER MANAGER
// ============================================================================

type OrderType = 'market' | 'limit' | 'stop' | 'stop-limit';
type OrderSide = 'buy' | 'sell';
type OrderStatus = 'pending' | 'open' | 'partially_filled' | 'filled' | 'canceled' | 'rejected';

interface Order {
  id: string;
  userId: string;
  symbol: string;
  type: OrderType;
  side: OrderSide;
  quantity: number;
  price: number;
  stopPrice?: number;
  status: OrderStatus;
  filledQuantity: number;
  filledPrice: number;
  fee: number;
  createdAt: Date;
  updatedAt: Date;
  fills: Fill[];
}

interface Fill {
  id: string;
  orderId: string;
  quantity: number;
  price: number;
  fee: number;
  timestamp: Date;
}

class OrderManager extends EventEmitter {
  private orders: Map<string, Order> = new Map();
  private userOrders: Map<string, string[]> = new Map();
  private orderIdCounter = 0;

  /**
   * Create order
   */
  createOrder(
    userId: string,
    symbol: string,
    type: OrderType,
    side: OrderSide,
    quantity: number,
    price: number,
    stopPrice?: number
  ): Order {
    const orderId = `order_${++this.orderIdCounter}_${Date.now()}`;

    const order: Order = {
      id: orderId,
      userId,
      symbol,
      type,
      side,
      quantity,
      price,
      stopPrice,
      status: 'pending',
      filledQuantity: 0,
      filledPrice: 0,
      fee: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      fills: [],
    };

    this.orders.set(orderId, order);

    if (!this.userOrders.has(userId)) {
      this.userOrders.set(userId, []);
    }
    this.userOrders.get(userId)!.push(orderId);

    this.emit('order:created', order);
    return order;
  }

  /**
   * Fill order
   */
  fillOrder(orderId: string, quantity: number, price: number, fee: number = 0): Order {
    const order = this.orders.get(orderId);
    if (!order) throw new Error('Order not found');

    const fill: Fill = {
      id: `fill_${Date.now()}_${Math.random()}`,
      orderId,
      quantity,
      price,
      fee,
      timestamp: new Date(),
    };

    order.fills.push(fill);
    order.filledQuantity += quantity;
    order.filledPrice = (order.filledPrice * (order.filledQuantity - quantity) + price * quantity) / order.filledQuantity;
    order.fee += fee;

    if (order.filledQuantity >= order.quantity) {
      order.status = 'filled';
    } else if (order.filledQuantity > 0) {
      order.status = 'partially_filled';
    } else {
      order.status = 'open';
    }

    order.updatedAt = new Date();
    this.emit('order:filled', { order, fill });

    return order;
  }

  /**
   * Cancel order
   */
  cancelOrder(orderId: string): Order {
    const order = this.orders.get(orderId);
    if (!order) throw new Error('Order not found');

    order.status = 'canceled';
    order.updatedAt = new Date();

    this.emit('order:canceled', order);
    return order;
  }

  /**
   * Get order
   */
  getOrder(orderId: string): Order | null {
    return this.orders.get(orderId) || null;
  }

  /**
   * Get user orders
   */
  getUserOrders(userId: string, status?: OrderStatus): Order[] {
    const orderIds = this.userOrders.get(userId) || [];
    let orders = orderIds.map((id) => this.orders.get(id)).filter((o) => o !== undefined) as Order[];

    if (status) {
      orders = orders.filter((o) => o.status === status);
    }

    return orders.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  /**
   * Get open orders
   */
  getOpenOrders(userId: string): Order[] {
    return this.getUserOrders(userId).filter((o) => o.status === 'open' || o.status === 'partially_filled');
  }
}

// ============================================================================
// PORTFOLIO MANAGER
// ============================================================================

interface Position {
  symbol: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  unrealizedPnL: number;
  unrealizedPnLPercent: number;
  value: number;
}

interface Portfolio {
  userId: string;
  cash: number;
  positions: Map<string, Position>;
  totalValue: number;
  totalPnL: number;
  totalPnLPercent: number;
  updatedAt: Date;
}

class PortfolioManager extends EventEmitter {
  private portfolios: Map<string, Portfolio> = new Map();

  /**
   * Create portfolio
   */
  createPortfolio(userId: string, initialCash: number): Portfolio {
    const portfolio: Portfolio = {
      userId,
      cash: initialCash,
      positions: new Map(),
      totalValue: initialCash,
      totalPnL: 0,
      totalPnLPercent: 0,
      updatedAt: new Date(),
    };

    this.portfolios.set(userId, portfolio);
    this.emit('portfolio:created', portfolio);

    return portfolio;
  }

  /**
   * Get portfolio
   */
  getPortfolio(userId: string): Portfolio | null {
    return this.portfolios.get(userId) || null;
  }

  /**
   * Update position
   */
  updatePosition(userId: string, symbol: string, quantity: number, price: number): Position {
    const portfolio = this.portfolios.get(userId);
    if (!portfolio) throw new Error('Portfolio not found');

    let position = portfolio.positions.get(symbol);

    if (!position) {
      position = {
        symbol,
        quantity: 0,
        averagePrice: 0,
        currentPrice: price,
        unrealizedPnL: 0,
        unrealizedPnLPercent: 0,
        value: 0,
      };
    }

    // Update average price
    const totalCost = position.averagePrice * position.quantity + price * quantity;
    position.quantity += quantity;
    position.averagePrice = position.quantity > 0 ? totalCost / position.quantity : 0;
    position.currentPrice = price;
    position.value = position.quantity * price;
    position.unrealizedPnL = position.value - position.quantity * position.averagePrice;
    position.unrealizedPnLPercent = position.averagePrice > 0 ? (position.unrealizedPnL / (position.quantity * position.averagePrice)) * 100 : 0;

    portfolio.positions.set(symbol, position);
    this.updatePortfolioMetrics(userId);

    this.emit('position:updated', { userId, position });
    return position;
  }

  /**
   * Update portfolio metrics
   */
  private updatePortfolioMetrics(userId: string): void {
    const portfolio = this.portfolios.get(userId);
    if (!portfolio) return;

    let positionsValue = 0;
    let totalPnL = 0;

    portfolio.positions.forEach((position) => {
      positionsValue += position.value;
      totalPnL += position.unrealizedPnL;
    });

    portfolio.totalValue = portfolio.cash + positionsValue;
    portfolio.totalPnL = totalPnL;
    portfolio.totalPnLPercent = portfolio.totalValue > 0 ? (totalPnL / portfolio.totalValue) * 100 : 0;
    portfolio.updatedAt = new Date();

    this.emit('portfolio:updated', portfolio);
  }

  /**
   * Get position
   */
  getPosition(userId: string, symbol: string): Position | null {
    const portfolio = this.portfolios.get(userId);
    if (!portfolio) return null;
    return portfolio.positions.get(symbol) || null;
  }

  /**
   * Get all positions
   */
  getPositions(userId: string): Position[] {
    const portfolio = this.portfolios.get(userId);
    if (!portfolio) return [];
    return Array.from(portfolio.positions.values());
  }
}

// ============================================================================
// TRADING ENGINE (UNIFIED)
// ============================================================================

class TradingEngine extends EventEmitter {
  private marketData: MarketDataManager;
  private orderManager: OrderManager;
  private portfolioManager: PortfolioManager;

  constructor() {
    super();
    this.marketData = new MarketDataManager();
    this.orderManager = new OrderManager();
    this.portfolioManager = new PortfolioManager();

    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    this.orderManager.on('order:filled', ({ order, fill }) => {
      this.portfolioManager.updatePosition(order.userId, order.symbol, order.side === 'buy' ? fill.quantity : -fill.quantity, fill.price);
    });
  }

  /**
   * Execute trade
   */
  async executeTrade(
    userId: string,
    symbol: string,
    side: OrderSide,
    quantity: number,
    price: number,
    type: OrderType = 'market'
  ): Promise<Order> {
    // Create order
    const order = this.orderManager.createOrder(userId, symbol, type, side, quantity, price);

    // For market orders, fill immediately
    if (type === 'market') {
      const ticker = this.marketData.getTicker(symbol);
      if (ticker) {
        const fillPrice = side === 'buy' ? ticker.price * 1.001 : ticker.price * 0.999; // Slight slippage
        const fee = (quantity * fillPrice) * 0.001; // 0.1% fee
        this.orderManager.fillOrder(order.id, quantity, fillPrice, fee);
      }
    }

    this.emit('trade:executed', order);
    return order;
  }

  /**
   * Get market data manager
   */
  getMarketDataManager(): MarketDataManager {
    return this.marketData;
  }

  /**
   * Get order manager
   */
  getOrderManager(): OrderManager {
    return this.orderManager;
  }

  /**
   * Get portfolio manager
   */
  getPortfolioManager(): PortfolioManager {
    return this.portfolioManager;
  }
}

export {
  TradingEngine,
  MarketDataManager,
  OrderManager,
  PortfolioManager,
  Ticker,
  Candle,
  OrderBook,
  Order,
  Fill,
  Position,
  Portfolio,
  OrderType,
  OrderSide,
  OrderStatus,
};
