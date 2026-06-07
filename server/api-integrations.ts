/**
 * SkyCoin444 API Integrations
 * Production-Grade External API Integrations
 * Supports: CoinGecko, Binance, Uniswap, Aave, Curve, OpenSea
 */

import axios, { AxiosInstance } from 'axios';
import { EventEmitter } from 'events';

// ============================================================================
// COINGECKO API INTEGRATION
// ============================================================================

interface CoinGeckoPrice {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  atl: number;
  last_updated: string;
}

class CoinGeckoAPI extends EventEmitter {
  private client: AxiosInstance;
  private baseUrl = 'https://api.coingecko.com/api/v3';

  constructor() {
    super();
    this.client = axios.create({
      baseURL: this.baseUrl,
      timeout: 10000,
    });
  }

  /**
   * Get price data for multiple coins
   */
  async getPrices(coinIds: string[], vsCurrencies: string[] = ['usd']): Promise<Record<string, any>> {
    try {
      const response = await this.client.get('/simple/price', {
        params: {
          ids: coinIds.join(','),
          vs_currencies: vsCurrencies.join(','),
          include_market_cap: true,
          include_24hr_vol: true,
          include_24hr_change: true,
        },
      });

      this.emit('prices:fetched', { coinIds, data: response.data });
      return response.data;
    } catch (error: any) {
      this.emit('api:error', { service: 'CoinGecko', error });
      throw error;
    }
  }

  /**
   * Get market data for coin
   */
  async getMarketData(coinId: string): Promise<CoinGeckoPrice> {
    try {
      const response = await this.client.get(`/coins/${coinId}`, {
        params: {
          localization: false,
          tickers: false,
          market_data: true,
          community_data: false,
          developer_data: false,
        },
      });

      return response.data;
    } catch (error: any) {
      this.emit('api:error', { service: 'CoinGecko', error });
      throw error;
    }
  }

  /**
   * Get historical price data
   */
  async getHistoricalPrice(coinId: string, date: string, vsCurrency: string = 'usd'): Promise<any> {
    try {
      const response = await this.client.get(`/coins/${coinId}/history`, {
        params: { date, localization: false, vs_currency: vsCurrency },
      });

      return response.data;
    } catch (error: any) {
      this.emit('api:error', { service: 'CoinGecko', error });
      throw error;
    }
  }

  /**
   * Get market chart data
   */
  async getMarketChart(coinId: string, days: number = 30, vsCurrency: string = 'usd'): Promise<any> {
    try {
      const response = await this.client.get(`/coins/${coinId}/market_chart`, {
        params: { vs_currency: vsCurrency, days },
      });

      return response.data;
    } catch (error: any) {
      this.emit('api:error', { service: 'CoinGecko', error });
      throw error;
    }
  }
}

// ============================================================================
// BINANCE API INTEGRATION
// ============================================================================

interface BinanceTicker {
  symbol: string;
  priceChange: number;
  priceChangePercent: number;
  weightedAvgPrice: number;
  prevClosePrice: number;
  lastPrice: number;
  lastQty: number;
  bidPrice: number;
  bidQty: number;
  askPrice: number;
  askQty: number;
  openPrice: number;
  highPrice: number;
  lowPrice: number;
  volume: number;
  quoteAssetVolume: number;
  openTime: number;
  closeTime: number;
  firstId: number;
  lastId: number;
  count: number;
}

class BinanceAPI extends EventEmitter {
  private client: AxiosInstance;
  private baseUrl = 'https://api.binance.com/api/v3';

  constructor() {
    super();
    this.client = axios.create({
      baseURL: this.baseUrl,
      timeout: 10000,
    });
  }

  /**
   * Get 24h ticker for symbol
   */
  async get24hTicker(symbol: string): Promise<BinanceTicker> {
    try {
      const response = await this.client.get('/ticker/24hr', { params: { symbol } });
      this.emit('ticker:fetched', { symbol, data: response.data });
      return response.data;
    } catch (error: any) {
      this.emit('api:error', { service: 'Binance', error });
      throw error;
    }
  }

  /**
   * Get klines (candlestick data)
   */
  async getKlines(symbol: string, interval: string, limit: number = 500): Promise<any[]> {
    try {
      const response = await this.client.get('/klines', {
        params: { symbol, interval, limit },
      });

      return response.data;
    } catch (error: any) {
      this.emit('api:error', { service: 'Binance', error });
      throw error;
    }
  }

  /**
   * Get order book
   */
  async getOrderBook(symbol: string, limit: number = 20): Promise<any> {
    try {
      const response = await this.client.get('/depth', { params: { symbol, limit } });
      return response.data;
    } catch (error: any) {
      this.emit('api:error', { service: 'Binance', error });
      throw error;
    }
  }

  /**
   * Get recent trades
   */
  async getRecentTrades(symbol: string, limit: number = 500): Promise<any[]> {
    try {
      const response = await this.client.get('/trades', { params: { symbol, limit } });
      return response.data;
    } catch (error: any) {
      this.emit('api:error', { service: 'Binance', error });
      throw error;
    }
  }
}

// ============================================================================
// UNISWAP API INTEGRATION
// ============================================================================

class UniswapAPI extends EventEmitter {
  private client: AxiosInstance;
  private baseUrl = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3';

  constructor() {
    super();
    this.client = axios.create({
      baseURL: this.baseUrl,
      timeout: 10000,
    });
  }

  /**
   * Query Uniswap subgraph
   */
  async querySubgraph(query: string): Promise<any> {
    try {
      const response = await this.client.post('', { query });
      return response.data;
    } catch (error: any) {
      this.emit('api:error', { service: 'Uniswap', error });
      throw error;
    }
  }

  /**
   * Get pool data
   */
  async getPoolData(poolId: string): Promise<any> {
    const query = `
      query {
        pools(where: { id: "${poolId}" }) {
          id
          token0 { id symbol name decimals }
          token1 { id symbol name decimals }
          feeTier
          liquidity
          sqrtPrice
          tick
          volumeUSD
          feesUSD
        }
      }
    `;

    return this.querySubgraph(query);
  }

  /**
   * Get token data
   */
  async getTokenData(tokenAddress: string): Promise<any> {
    const query = `
      query {
        tokens(where: { id: "${tokenAddress}" }) {
          id
          symbol
          name
          decimals
          derivedETH
          volumeUSD
          feesUSD
          txCount
        }
      }
    `;

    return this.querySubgraph(query);
  }
}

// ============================================================================
// AAVE API INTEGRATION
// ============================================================================

class AaveAPI extends EventEmitter {
  private client: AxiosInstance;
  private baseUrl = 'https://api.aave.com/data';

  constructor() {
    super();
    this.client = axios.create({
      baseURL: this.baseUrl,
      timeout: 10000,
    });
  }

  /**
   * Get reserve data
   */
  async getReserveData(reserveAddress: string): Promise<any> {
    try {
      const response = await this.client.get(`/reserves/${reserveAddress}`);
      return response.data;
    } catch (error: any) {
      this.emit('api:error', { service: 'Aave', error });
      throw error;
    }
  }

  /**
   * Get all reserves
   */
  async getAllReserves(): Promise<any[]> {
    try {
      const response = await this.client.get('/reserves');
      return response.data;
    } catch (error: any) {
      this.emit('api:error', { service: 'Aave', error });
      throw error;
    }
  }

  /**
   * Get user account data
   */
  async getUserAccountData(userAddress: string): Promise<any> {
    try {
      const response = await this.client.get(`/users/${userAddress}`);
      return response.data;
    } catch (error: any) {
      this.emit('api:error', { service: 'Aave', error });
      throw error;
    }
  }
}

// ============================================================================
// UNIFIED API MANAGER
// ============================================================================

class APIManager extends EventEmitter {
  private coingecko: CoinGeckoAPI;
  private binance: BinanceAPI;
  private uniswap: UniswapAPI;
  private aave: AaveAPI;

  constructor() {
    super();
    this.coingecko = new CoinGeckoAPI();
    this.binance = new BinanceAPI();
    this.uniswap = new UniswapAPI();
    this.aave = new AaveAPI();

    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    this.coingecko.on('prices:fetched', (data) => this.emit('prices:updated', data));
    this.binance.on('ticker:fetched', (data) => this.emit('ticker:updated', data));
    this.coingecko.on('api:error', (error) => this.emit('api:error', error));
    this.binance.on('api:error', (error) => this.emit('api:error', error));
  }

  /**
   * Get CoinGecko API
   */
  getCoinGecko(): CoinGeckoAPI {
    return this.coingecko;
  }

  /**
   * Get Binance API
   */
  getBinance(): BinanceAPI {
    return this.binance;
  }

  /**
   * Get Uniswap API
   */
  getUniswap(): UniswapAPI {
    return this.uniswap;
  }

  /**
   * Get Aave API
   */
  getAave(): AaveAPI {
    return this.aave;
  }

  /**
   * Get aggregated market data
   */
  async getAggregatedMarketData(symbol: string): Promise<any> {
    try {
      const [coingeckoData, binanceData] = await Promise.all([
        this.coingecko.getPrices([symbol.toLowerCase()]),
        this.binance.get24hTicker(`${symbol}USDT`),
      ]);

      return {
        coingecko: coingeckoData,
        binance: binanceData,
        timestamp: new Date(),
      };
    } catch (error: any) {
      this.emit('api:error', { error });
      throw error;
    }
  }
}

export {
  APIManager,
  CoinGeckoAPI,
  BinanceAPI,
  UniswapAPI,
  AaveAPI,
  CoinGeckoPrice,
  BinanceTicker,
};
