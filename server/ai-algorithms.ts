/**
 * AI Algorithms for SkyCoin444 v10
 * - Content Ranking Algorithm (Engagement-based)
 * - Sentiment Analysis (Market sentiment scoring)
 * - Portfolio Optimization (Risk-adjusted allocation)
 * - Anomaly Detection (Price movements)
 */

interface Post {
  id: string;
  content: string;
  likes: number;
  tips: number;
  replies: number;
  shares: number;
  createdAt: number;
  sentiment?: number;
  score?: number;
}

interface SentimentData {
  text: string;
  score: number; // -1 to 1
  label: "bearish" | "neutral" | "bullish";
}

interface PortfolioAsset {
  symbol: string;
  amount: number;
  price: number;
  volatility: number;
  correlation: number;
}

interface OptimizationResult {
  symbol: string;
  allocation: number;
  expectedReturn: number;
  risk: number;
}

/**
 * Content Ranking Algorithm
 * Scores posts based on engagement metrics, recency, and quality
 */
export function rankContent(posts: Post[]): Post[] {
  const now = Date.now();
  const ONE_DAY = 24 * 60 * 60 * 1000;

  return posts
    .map((post) => {
      // Time decay factor (newer posts score higher)
      const ageHours = (now - post.createdAt) / (60 * 60 * 1000);
      const timeDecay = Math.exp(-ageHours / 24);

      // Engagement score
      const engagementScore =
        post.likes * 1 +
        post.tips * 5 +
        post.replies * 2 +
        post.shares * 3;

      // Sentiment boost (bullish posts get slight boost)
      const sentimentBoost = (post.sentiment || 0) * 0.1;

      // Quality score (prevents spam)
      const qualityScore = Math.min(
        1,
        post.content.length / 500 // Longer, more detailed posts score higher
      );

      // Final ranking score
      const score =
        engagementScore * 0.5 +
        timeDecay * 0.3 +
        sentimentBoost * 0.1 +
        qualityScore * 0.1;

      return { ...post, score };
    })
    .sort((a, b) => (b.score || 0) - (a.score || 0));
}

/**
 * Sentiment Analysis Algorithm
 * Analyzes text for market sentiment using keyword matching and scoring
 */
export function analyzeSentiment(text: string): SentimentData {
  const lowerText = text.toLowerCase();

  // Bullish keywords
  const bullishKeywords = [
    "buy",
    "bullish",
    "moon",
    "pump",
    "surge",
    "breakout",
    "rally",
    "strong",
    "gain",
    "profit",
    "bull",
    "uptrend",
    "bull run",
    "lambo",
    "hodl",
  ];

  // Bearish keywords
  const bearishKeywords = [
    "sell",
    "bearish",
    "crash",
    "dump",
    "drop",
    "plunge",
    "decline",
    "weak",
    "loss",
    "bear",
    "downtrend",
    "rekt",
    "rug",
    "scam",
    "liquidation",
  ];

  // Neutral keywords
  const neutralKeywords = [
    "consolidation",
    "sideways",
    "range",
    "stable",
    "holding",
    "analysis",
    "technical",
    "support",
    "resistance",
  ];

  let bullishScore = 0;
  let bearishScore = 0;
  let neutralScore = 0;

  // Count keyword occurrences
  bullishKeywords.forEach((keyword) => {
    const regex = new RegExp(`\\b${keyword}\\b`, "gi");
    const matches = lowerText.match(regex);
    bullishScore += (matches?.length || 0) * 1.5;
  });

  bearishKeywords.forEach((keyword) => {
    const regex = new RegExp(`\\b${keyword}\\b`, "gi");
    const matches = lowerText.match(regex);
    bearishScore += (matches?.length || 0) * 1.5;
  });

  neutralKeywords.forEach((keyword) => {
    const regex = new RegExp(`\\b${keyword}\\b`, "gi");
    const matches = lowerText.match(regex);
    neutralScore += (matches?.length || 0);
  });

  // Normalize scores
  const total = bullishScore + bearishScore + neutralScore;
  if (total === 0) {
    return { text, score: 0, label: "neutral" };
  }

  const normalizedBullish = bullishScore / total;
  const normalizedBearish = bearishScore / total;

  // Calculate final sentiment score (-1 to 1)
  const score = normalizedBullish - normalizedBearish;

  // Determine label
  let label: "bearish" | "neutral" | "bullish" = "neutral";
  if (score > 0.2) label = "bullish";
  else if (score < -0.2) label = "bearish";

  return { text, score: Math.max(-1, Math.min(1, score)), label };
}

/**
 * Portfolio Optimization Algorithm
 * Optimizes asset allocation using Modern Portfolio Theory
 */
export function optimizePortfolio(assets: PortfolioAsset[]): OptimizationResult[] {
  // Calculate expected returns based on historical volatility and correlation
  const results: OptimizationResult[] = assets.map((asset) => {
    // Expected return: higher volatility = higher potential return
    const expectedReturn = 0.05 + asset.volatility * 0.3;

    // Risk-adjusted allocation: lower volatility gets higher allocation
    const riskAdjustment = 1 / (1 + asset.volatility);

    // Correlation adjustment: lower correlation = better diversification
    const diversificationBoost = (1 - asset.correlation) * 0.1;

    // Calculate allocation percentage
    const baseAllocation = riskAdjustment * (1 + diversificationBoost);

    return {
      symbol: asset.symbol,
      allocation: baseAllocation,
      expectedReturn,
      risk: asset.volatility,
    };
  });

  // Normalize allocations to sum to 1
  const totalAllocation = results.reduce((sum, r) => sum + r.allocation, 0);
  return results.map((r) => ({
    ...r,
    allocation: r.allocation / totalAllocation,
  }));
}

/**
 * Anomaly Detection Algorithm
 * Detects unusual price movements and trading patterns
 */
export function detectAnomalies(
  prices: number[],
  threshold: number = 2
): { index: number; value: number; zscore: number }[] {
  if (prices.length < 2) return [];

  // Calculate mean and standard deviation
  const mean = prices.reduce((a, b) => a + b, 0) / prices.length;
  const variance =
    prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) /
    prices.length;
  const stdDev = Math.sqrt(variance);

  // Find anomalies using Z-score
  const anomalies: { index: number; value: number; zscore: number }[] = [];

  prices.forEach((price, index) => {
    const zscore = Math.abs((price - mean) / stdDev);
    if (zscore > threshold) {
      anomalies.push({ index, value: price, zscore });
    }
  });

  return anomalies;
}

/**
 * Price Prediction Algorithm (Simple Moving Average + Momentum)
 */
export function predictPrice(
  historicalPrices: number[],
  periods: number = 20
): { prediction: number; confidence: number } {
  if (historicalPrices.length < periods) {
    return { prediction: historicalPrices[historicalPrices.length - 1], confidence: 0.3 };
  }

  // Calculate simple moving average
  const recentPrices = historicalPrices.slice(-periods);
  const sma = recentPrices.reduce((a, b) => a + b, 0) / periods;

  // Calculate momentum (rate of change)
  const currentPrice = historicalPrices[historicalPrices.length - 1];
  const previousPrice = historicalPrices[historicalPrices.length - Math.min(5, periods)];
  const momentum = (currentPrice - previousPrice) / previousPrice;

  // Calculate volatility
  const variance =
    recentPrices.reduce((sum, price) => sum + Math.pow(price - sma, 2), 0) /
    periods;
  const volatility = Math.sqrt(variance) / sma;

  // Predict next price
  const prediction = currentPrice * (1 + momentum * 0.5);

  // Confidence based on volatility (lower volatility = higher confidence)
  const confidence = Math.max(0.3, 1 - volatility);

  return { prediction, confidence };
}

/**
 * Risk Assessment Algorithm
 * Evaluates portfolio risk based on asset correlation and volatility
 */
export function assessRisk(assets: PortfolioAsset[]): {
  overallRisk: number;
  diversificationScore: number;
  recommendation: string;
} {
  if (assets.length === 0) {
    return {
      overallRisk: 0,
      diversificationScore: 0,
      recommendation: "No assets",
    };
  }

  // Calculate weighted average volatility
  const totalValue = assets.reduce((sum, a) => sum + a.amount * a.price, 0);
  const weightedVolatility = assets.reduce((sum, a) => {
    const weight = (a.amount * a.price) / totalValue;
    return sum + weight * a.volatility;
  }, 0);

  // Calculate diversification score (1 = fully diversified, 0 = concentrated)
  const avgCorrelation = assets.reduce((sum, a) => sum + a.correlation, 0) / assets.length;
  const diversificationScore = 1 - avgCorrelation;

  // Overall risk (0-1)
  const overallRisk = Math.min(1, weightedVolatility);

  // Generate recommendation
  let recommendation = "Moderate risk";
  if (overallRisk < 0.3) recommendation = "Low risk - Conservative portfolio";
  else if (overallRisk > 0.6) recommendation = "High risk - Aggressive portfolio";

  if (diversificationScore < 0.3)
    recommendation += " | Low diversification - Consider spreading across more assets";

  return { overallRisk, diversificationScore, recommendation };
}

export default {
  rankContent,
  analyzeSentiment,
  optimizePortfolio,
  detectAnomalies,
  predictPrice,
  assessRisk,
};
