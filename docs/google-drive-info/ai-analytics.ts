/**
 * AI Analytics Engine
 * ─────────────────────────────────────────────────────────────────────────────
 * AI-driven price predictions, sentiment analysis, and trading signals.
 */

import { Decimal } from "decimal.js";

export interface PriceData {
  timestamp: Date;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
}

export interface TechnicalIndicators {
  rsi: number; // Relative Strength Index (0-100)
  macd: number; // MACD value
  signal: number; // MACD Signal line
  histogram: number; // MACD Histogram
  sma20: string; // 20-period Simple Moving Average
  sma50: string; // 50-period Simple Moving Average
  sma200: string; // 200-period Simple Moving Average
  bollingerBands: {
    upper: string;
    middle: string;
    lower: string;
  };
}

export interface PricePrediction {
  coin: string;
  currentPrice: string;
  predicted1h: string;
  predicted24h: string;
  predicted7d: string;
  confidence: number; // 0-100
  trend: "bullish" | "bearish" | "neutral";
  signals: string[];
}

export interface SentimentAnalysis {
  coin: string;
  socialSentiment: number; // -100 to 100
  newsSentiment: number; // -100 to 100
  onChainSentiment: number; // -100 to 100
  overallSentiment: number; // -100 to 100
  trend: "very_bullish" | "bullish" | "neutral" | "bearish" | "very_bearish";
  sources: string[];
}

export class AIAnalytics {
  /**
   * Calculate RSI (Relative Strength Index)
   */
  static calculateRSI(prices: string[], period: number = 14): number {
    if (prices.length < period + 1) return 50; // Neutral if not enough data

    let gains = new Decimal(0);
    let losses = new Decimal(0);

    for (let i = prices.length - period; i < prices.length; i++) {
      const change = new Decimal(prices[i]).minus(prices[i - 1]);
      if (change.gt(0)) {
        gains = gains.plus(change);
      } else {
        losses = losses.plus(change.abs());
      }
    }

    const avgGain = gains.dividedBy(period);
    const avgLoss = losses.dividedBy(period);

    if (avgLoss.eq(0)) return 100;

    const rs = avgGain.dividedBy(avgLoss);
    const rsi = new Decimal(100).minus(new Decimal(100).dividedBy(rs.plus(1)));

    return parseFloat(rsi.toFixed(2));
  }

  /**
   * Calculate Simple Moving Average
   */
  static calculateSMA(prices: string[], period: number): string {
    if (prices.length < period) return prices[prices.length - 1];

    const sum = prices
      .slice(-period)
      .reduce((acc, price) => acc.plus(price), new Decimal(0));

    const sma = sum.dividedBy(period);
    return sma.toFixed(18);
  }

  /**
   * Calculate MACD (Moving Average Convergence Divergence)
   */
  static calculateMACD(
    prices: string[],
  ): { macd: number; signal: number; histogram: number } {
    const ema12 = this.calculateEMA(prices, 12);
    const ema26 = this.calculateEMA(prices, 26);

    const macd = parseFloat(
      new Decimal(ema12).minus(ema26).toFixed(6),
    );

    // Signal line is 9-period EMA of MACD
    const macdValues = prices.map((_, i) => {
      const e12 = this.calculateEMA(prices.slice(0, i + 1), 12);
      const e26 = this.calculateEMA(prices.slice(0, i + 1), 26);
      return new Decimal(e12).minus(e26).toFixed(6);
    });

    const signal = parseFloat(
      this.calculateEMA(macdValues, 9),
    );
    const histogram = macd - signal;

    return { macd, signal, histogram };
  }

  /**
   * Calculate Exponential Moving Average
   */
  static calculateEMA(prices: string[], period: number): string {
    if (prices.length === 0) return "0";

    const k = new Decimal(2).dividedBy(period + 1);
    let ema = new Decimal(prices[0]);

    for (let i = 1; i < prices.length; i++) {
      ema = new Decimal(prices[i])
        .minus(ema)
        .times(k)
        .plus(ema);
    }

    return ema.toFixed(18);
  }

  /**
   * Calculate Bollinger Bands
   */
  static calculateBollingerBands(
    prices: string[],
    period: number = 20,
    stdDevMultiplier: number = 2,
  ): { upper: string; middle: string; lower: string } {
    const middle = this.calculateSMA(prices, period);
    const middleDecimal = new Decimal(middle);

    // Calculate standard deviation
    const recentPrices = prices.slice(-period);
    const mean = recentPrices.reduce((acc, p) => acc.plus(p), new Decimal(0))
      .dividedBy(period);

    const variance = recentPrices
      .reduce((acc, p) => {
        const diff = new Decimal(p).minus(mean);
        return acc.plus(diff.times(diff));
      }, new Decimal(0))
      .dividedBy(period);

    const stdDev = variance.squareRoot();
    const offset = stdDev.times(stdDevMultiplier);

    return {
      upper: middleDecimal.plus(offset).toFixed(18),
      middle,
      lower: middleDecimal.minus(offset).toFixed(18),
    };
  }

  /**
   * Generate AI price prediction
   */
  static generatePricePrediction(
    coin: string,
    currentPrice: string,
    technicalIndicators: TechnicalIndicators,
    sentiment: number,
  ): PricePrediction {
    const signals: string[] = [];
    let bullishScore = 0;
    let bearishScore = 0;

    // RSI signals
    if (technicalIndicators.rsi > 70) {
      signals.push("RSI Overbought");
      bearishScore += 2;
    } else if (technicalIndicators.rsi < 30) {
      signals.push("RSI Oversold");
      bullishScore += 2;
    }

    // MACD signals
    if (technicalIndicators.histogram > 0) {
      signals.push("MACD Bullish Crossover");
      bullishScore += 1.5;
    } else {
      signals.push("MACD Bearish Crossover");
      bearishScore += 1.5;
    }

    // Moving Average signals
    const currentPriceDecimal = new Decimal(currentPrice);
    const sma20 = new Decimal(technicalIndicators.sma20);
    const sma50 = new Decimal(technicalIndicators.sma50);
    const sma200 = new Decimal(technicalIndicators.sma200);

    if (currentPriceDecimal.gt(sma20) && sma20.gt(sma50) && sma50.gt(sma200)) {
      signals.push("Golden Cross - Strong Uptrend");
      bullishScore += 2;
    } else if (currentPriceDecimal.lt(sma20) && sma20.lt(sma50) && sma50.lt(sma200)) {
      signals.push("Death Cross - Strong Downtrend");
      bearishScore += 2;
    }

    // Sentiment signals
    if (sentiment > 50) {
      signals.push("Positive Sentiment");
      bullishScore += 1;
    } else if (sentiment < -50) {
      signals.push("Negative Sentiment");
      bearishScore += 1;
    }

    // Calculate predictions
    const totalScore = bullishScore + bearishScore;
    const confidence = (Math.max(bullishScore, bearishScore) / Math.max(totalScore, 1)) * 100;

    const trend = bullishScore > bearishScore ? "bullish" : bearishScore > bullishScore ? "bearish" : "neutral";

    // Simple price projection based on trend
    const volatility = 0.02; // 2% assumed volatility
    const priceChange1h = trend === "bullish" ? volatility : trend === "bearish" ? -volatility : 0;
    const priceChange24h = priceChange1h * 12;
    const priceChange7d = priceChange24h * 7;

    const predicted1h = new Decimal(currentPrice).times(1 + priceChange1h).toFixed(18);
    const predicted24h = new Decimal(currentPrice).times(1 + priceChange24h).toFixed(18);
    const predicted7d = new Decimal(currentPrice).times(1 + priceChange7d).toFixed(18);

    return {
      coin,
      currentPrice,
      predicted1h,
      predicted24h,
      predicted7d,
      confidence: parseFloat(confidence.toFixed(2)),
      trend,
      signals,
    };
  }

  /**
   * Analyze sentiment from multiple sources
   */
  static analyzeSentiment(
    socialScore: number,
    newsScore: number,
    onChainScore: number,
  ): SentimentAnalysis {
    const overallSentiment = (socialScore + newsScore + onChainScore) / 3;

    let trend: "very_bullish" | "bullish" | "neutral" | "bearish" | "very_bearish";
    if (overallSentiment > 75) trend = "very_bullish";
    else if (overallSentiment > 25) trend = "bullish";
    else if (overallSentiment > -25) trend = "neutral";
    else if (overallSentiment > -75) trend = "bearish";
    else trend = "very_bearish";

    return {
      coin: "SKY4444",
      socialSentiment: socialScore,
      newsSentiment: newsScore,
      onChainSentiment: onChainScore,
      overallSentiment: parseFloat(overallSentiment.toFixed(2)),
      trend,
      sources: ["Twitter", "Reddit", "News API", "On-Chain Metrics"],
    };
  }

  /**
   * Generate trading signals
   */
  static generateTradingSignals(
    prediction: PricePrediction,
    sentiment: SentimentAnalysis,
  ): { action: "buy" | "sell" | "hold"; strength: number; reason: string } {
    let score = 0;

    // Prediction score
    if (prediction.trend === "bullish") score += prediction.confidence / 100;
    else if (prediction.trend === "bearish") score -= prediction.confidence / 100;

    // Sentiment score
    const sentimentScore = sentiment.overallSentiment / 100;
    score += sentimentScore * 0.5;

    let action: "buy" | "sell" | "hold";
    if (score > 0.3) action = "buy";
    else if (score < -0.3) action = "sell";
    else action = "hold";

    const strength = Math.abs(score);
    const reason = `${prediction.signals.join(", ")} - Sentiment: ${sentiment.trend}`;

    return { action, strength: parseFloat(strength.toFixed(2)), reason };
  }
}
