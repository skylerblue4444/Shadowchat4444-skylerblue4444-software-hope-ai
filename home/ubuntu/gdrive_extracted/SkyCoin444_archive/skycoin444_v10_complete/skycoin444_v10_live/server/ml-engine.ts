/**
 * Machine Learning Engine for SkyCoin444 v10
 * - LSTM-based price prediction
 * - Pattern recognition
 * - Trend analysis
 * - Volatility forecasting
 */

interface PricePoint {
  timestamp: number;
  price: number;
  volume: number;
}

interface MLPrediction {
  timestamp: number;
  predictedPrice: number;
  confidence: number;
  trend: "bullish" | "bearish" | "neutral";
  volatility: number;
  support: number;
  resistance: number;
}

interface TrainingData {
  prices: number[];
  volumes: number[];
  timestamps: number[];
}

/**
 * Simplified LSTM-like price prediction using statistical methods
 * In production, use TensorFlow.js or Python ML service
 */
export class MLEngine {
  private historyWindow = 50;
  private predictionHorizon = 24; // hours

  /**
   * Get fallback prediction when insufficient data
   */
  private getFallbackPrediction(history: PricePoint[]): MLPrediction {
    const currentPrice = history[history.length - 1]?.price || 0;
    return {
      timestamp: Date.now() + this.predictionHorizon * 60 * 60 * 1000,
      predictedPrice: currentPrice,
      confidence: 0.3,
      trend: "neutral",
      volatility: 0.1,
      support: currentPrice * 0.95,
      resistance: currentPrice * 1.05,
    };
  }

  /**
   * Predict future price using ensemble methods
   */
  predictPrice(history: PricePoint[]): MLPrediction {
    if (history.length < this.historyWindow) {
      return this.getFallbackPrediction(history);
    }

    const prices = history.map((p) => p.price);
    const volumes = history.map((p) => p.volume);

    // Calculate multiple predictions
    const maPrediction = this.movingAveragePrediction(prices);
    const exponentialPrediction = this.exponentialSmoothingPrediction(prices);
    const arimaPrediction = this.arimaPrediction(prices);

    // Ensemble: average predictions
    const predictedPrice = (maPrediction + exponentialPrediction + arimaPrediction) / 3;

    // Calculate confidence
    const confidence = this.calculateConfidence(prices, predictedPrice);

    // Determine trend
    const trend = this.determineTrend(prices, predictedPrice);

    // Calculate volatility
    const volatility = this.calculateVolatility(prices);

    // Support and resistance levels
    const { support, resistance } = this.calculateSupportResistance(prices);

    return {
      timestamp: Date.now() + this.predictionHorizon * 60 * 60 * 1000,
      predictedPrice,
      confidence,
      trend,
      volatility,
      support,
      resistance,
    };
  }

  /**
   * Moving Average Prediction
   */
  private movingAveragePrediction(prices: number[]): number {
    const shortMA = this.calculateMA(prices, 10);
    const longMA = this.calculateMA(prices, 30);
    const currentPrice = prices[prices.length - 1];

    // Trend-following prediction
    const momentum = (shortMA - longMA) / longMA;
    return currentPrice * (1 + momentum * 0.05);
  }

  /**
   * Exponential Smoothing Prediction (Holt-Winters)
   */
  private exponentialSmoothingPrediction(prices: number[]): number {
    const alpha = 0.3;
    const beta = 0.1;

    let level = prices[0];
    let trend = 0;

    for (let i = 1; i < prices.length; i++) {
      const prevLevel = level;
      level = alpha * prices[i] + (1 - alpha) * (level + trend);
      trend = beta * (level - prevLevel) + (1 - beta) * trend;
    }

    // Predict next value
    return level + trend;
  }

  /**
   * ARIMA-like Prediction
   */
  private arimaPrediction(prices: number[]): number {
    // AR(1) - Autoregressive model
    const mean = prices.reduce((a, b) => a + b, 0) / prices.length;
    const deviations = prices.map((p) => p - mean);

    // Calculate autocorrelation at lag 1
    let numerator = 0;
    let denominator = 0;

    for (let i = 1; i < deviations.length; i++) {
      numerator += deviations[i] * deviations[i - 1];
      denominator += deviations[i - 1] * deviations[i - 1];
    }

    const phi = denominator !== 0 ? numerator / denominator : 0;
    const currentDeviation = deviations[deviations.length - 1];

    return mean + phi * currentDeviation;
  }

  /**
   * Calculate Moving Average
   */
  private calculateMA(prices: number[], period: number): number {
    const recentPrices = prices.slice(-period);
    return recentPrices.reduce((a, b) => a + b, 0) / recentPrices.length;
  }

  /**
   * Calculate prediction confidence (0-1)
   */
  private calculateConfidence(prices: number[], prediction: number): number {
    const volatility = this.calculateVolatility(prices);
    const currentPrice = prices[prices.length - 1];
    const priceChange = Math.abs(prediction - currentPrice) / currentPrice;

    // Lower volatility and smaller changes = higher confidence
    return Math.max(0.3, 1 - volatility - priceChange);
  }

  /**
   * Determine trend direction
   */
  private determineTrend(
    prices: number[],
    prediction: number
  ): "bullish" | "bearish" | "neutral" {
    const currentPrice = prices[prices.length - 1];
    const change = (prediction - currentPrice) / currentPrice;

    if (change > 0.02) return "bullish";
    if (change < -0.02) return "bearish";
    return "neutral";
  }

  /**
   * Calculate volatility (standard deviation)
   */
  private calculateVolatility(prices: number[]): number {
    const mean = prices.reduce((a, b) => a + b, 0) / prices.length;
    const variance =
      prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) /
      prices.length;
    const stdDev = Math.sqrt(variance);
    return stdDev / mean; // Normalized volatility
  }

  /**
   * Calculate support and resistance levels
   */
  private calculateSupportResistance(
    prices: number[]
  ): { support: number; resistance: number } {
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const range = max - min;

    // Support: 33% from bottom
    const support = min + range * 0.33;

    // Resistance: 67% from bottom
    const resistance = min + range * 0.67;

    return { support, resistance };
  }

  /**
   * Pattern Recognition - Identify chart patterns
   */
  identifyPatterns(prices: number[]): string[] {
    const patterns: string[] = [];

    if (this.isHeadAndShoulders(prices)) patterns.push("head_and_shoulders");
    if (this.isDoubleBottom(prices)) patterns.push("double_bottom");
    if (this.isDoubleTop(prices)) patterns.push("double_top");
    if (this.isCupWithHandlePattern(prices)) patterns.push("cup_with_handle");
    if (this.isTriangle(prices)) patterns.push("triangle");

    return patterns;
  }

  /**
   * Head and Shoulders pattern detection
   */
  private isHeadAndShoulders(prices: number[]): boolean {
    if (prices.length < 5) return false;

    const recent = prices.slice(-5);
    const [a, b, c, d, e] = recent;

    // Left shoulder < head > right shoulder pattern
    return b < c && c > d && Math.abs(b - d) < c * 0.05;
  }

  /**
   * Double Bottom pattern detection
   */
  private isDoubleBottom(prices: number[]): boolean {
    if (prices.length < 5) return false;

    const recent = prices.slice(-5);
    const min1 = Math.min(recent[0], recent[1]);
    const min2 = Math.min(recent[3], recent[4]);

    return Math.abs(min1 - min2) < min1 * 0.03 && recent[2] > min1;
  }

  /**
   * Double Top pattern detection
   */
  private isDoubleTop(prices: number[]): boolean {
    if (prices.length < 5) return false;

    const recent = prices.slice(-5);
    const max1 = Math.max(recent[0], recent[1]);
    const max2 = Math.max(recent[3], recent[4]);

    return Math.abs(max1 - max2) < max1 * 0.03 && recent[2] < max1;
  }

  /**
   * Cup with Handle pattern detection
   */
  private isCupWithHandlePattern(prices: number[]): boolean {
    if (prices.length < 7) return false;

    const recent = prices.slice(-7);
    const cup = Math.min(...recent.slice(0, 5));
    const handle = Math.min(...recent.slice(5));

    return handle > cup && handle < recent[4];
  }

  /**
   * Triangle pattern detection
   */
  private isTriangle(prices: number[]): boolean {
    if (prices.length < 5) return false;

    const recent = prices.slice(-5);
    const range = Math.max(...recent) - Math.min(...recent);
    const avgRange = range / 5;

    // Prices converging = triangle
    return (
      Math.max(...recent.slice(-2)) - Math.min(...recent.slice(-2)) <
      avgRange * 0.5
    );
  }

  /**
   * Calculate Relative Strength Index (RSI)
   */
  calculateRSI(prices: number[], period: number = 14): number {
    if (prices.length < period + 1) return 50;

    let gains = 0;
    let losses = 0;

    for (let i = prices.length - period; i < prices.length; i++) {
      const change = prices[i] - prices[i - 1];
      if (change > 0) gains += change;
      else losses += Math.abs(change);
    }

    const avgGain = gains / period;
    const avgLoss = losses / period;

    if (avgLoss === 0) return 100;

    const rs = avgGain / avgLoss;
    return 100 - 100 / (1 + rs);
  }

  /**
   * Calculate MACD (Moving Average Convergence Divergence)
   */
  calculateMACD(prices: number[]): { macd: number; signal: number; histogram: number } {
    const ema12 = this.calculateEMA(prices, 12);
    const ema26 = this.calculateEMA(prices, 26);

    const macd = ema12 - ema26;
    const signal = this.calculateEMA([macd], 9);
    const histogram = macd - signal;

    return { macd, signal, histogram };
  }

  /**
   * Calculate Exponential Moving Average
   */
  private calculateEMA(prices: number[], period: number): number {
    const multiplier = 2 / (period + 1);
    let ema = prices[0];

    for (let i = 1; i < prices.length; i++) {
      ema = prices[i] * multiplier + ema * (1 - multiplier);
    }

    return ema;
  }

  /**
   * Calculate Bollinger Bands
   */
  calculateBollingerBands(
    prices: number[],
    period: number = 20,
    stdDevs: number = 2
  ): { upper: number; middle: number; lower: number } {
    const sma = this.calculateMA(prices, period);
    const variance =
      prices
        .slice(-period)
        .reduce((sum, price) => sum + Math.pow(price - sma, 2), 0) / period;
    const stdDev = Math.sqrt(variance);

    return {
      upper: sma + stdDev * stdDevs,
      middle: sma,
      lower: sma - stdDev * stdDevs,
    };
  }
}

export default MLEngine;
