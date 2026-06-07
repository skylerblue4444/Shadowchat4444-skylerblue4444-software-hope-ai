/**
 * AMM Engine - Automated Market Maker
 * ─────────────────────────────────────────────────────────────────────────────
 * Constant Product Formula: x * y = k
 * Enables decentralized swaps between SKY4444, SHADOW, and other tokens.
 */

import { Decimal } from "decimal.js";

export interface LiquidityPool {
  id: string;
  token0: string;
  token1: string;
  reserve0: string;
  reserve1: string;
  totalSupply: string;
  fee: number; // in basis points (e.g., 25 = 0.25%)
  volume24h: string;
  tvl: string;
}

export interface SwapQuote {
  amountIn: string;
  amountOut: string;
  priceImpact: number;
  fee: string;
  executionPrice: string;
  minimumReceived: string;
}

export class AMMEngine {
  /**
   * Calculate output amount for a given input using constant product formula
   * x * y = k, where x and y are reserves
   */
  static getAmountOut(
    amountIn: string,
    reserveIn: string,
    reserveOut: string,
    feeBps: number = 25,
  ): string {
    const amountInDecimal = new Decimal(amountIn);
    const reserveInDecimal = new Decimal(reserveIn);
    const reserveOutDecimal = new Decimal(reserveOut);

    // Apply fee: amountInWithFee = amountIn * (10000 - fee) / 10000
    const feeMultiplier = new Decimal(10000 - feeBps).dividedBy(10000);
    const amountInWithFee = amountInDecimal.times(feeMultiplier);

    // numerator = amountInWithFee * reserveOut
    const numerator = amountInWithFee.times(reserveOutDecimal);

    // denominator = reserveIn + amountInWithFee
    const denominator = reserveInDecimal.plus(amountInWithFee);

    // amountOut = numerator / denominator
    const amountOut = numerator.dividedBy(denominator);

    return amountOut.toFixed(18);
  }

  /**
   * Calculate input amount needed to get desired output
   */
  static getAmountIn(
    amountOut: string,
    reserveIn: string,
    reserveOut: string,
    feeBps: number = 25,
  ): string {
    const amountOutDecimal = new Decimal(amountOut);
    const reserveInDecimal = new Decimal(reserveIn);
    const reserveOutDecimal = new Decimal(reserveOut);

    if (amountOutDecimal.gte(reserveOutDecimal)) {
      throw new Error("Insufficient liquidity");
    }

    // numerator = reserveIn * amountOut
    const numerator = reserveInDecimal.times(amountOutDecimal);

    // denominator = (reserveOut - amountOut)
    const denominator = reserveOutDecimal.minus(amountOutDecimal);

    // amountInUnadjusted = numerator / denominator
    const amountInUnadjusted = numerator.dividedBy(denominator);

    // Adjust for fee: amountIn = amountInUnadjusted / (1 - fee/10000)
    const feeMultiplier = new Decimal(10000).dividedBy(new Decimal(10000 - feeBps));
    const amountIn = amountInUnadjusted.times(feeMultiplier);

    return amountIn.toFixed(18);
  }

  /**
   * Calculate price impact percentage
   */
  static getPriceImpact(
    amountIn: string,
    reserveIn: string,
    reserveOut: string,
    feeBps: number = 25,
  ): number {
    const spotPrice = new Decimal(reserveOut).dividedBy(reserveIn);
    const executionPrice = new Decimal(amountIn).dividedBy(
      this.getAmountOut(amountIn, reserveIn, reserveOut, feeBps),
    );
    const priceImpact = executionPrice.dividedBy(spotPrice).minus(1).times(100);
    return parseFloat(priceImpact.toFixed(4));
  }

  /**
   * Generate swap quote
   */
  static getSwapQuote(
    amountIn: string,
    pool: LiquidityPool,
    tokenIn: string,
    slippageTolerance: number = 0.5,
  ): SwapQuote {
    const isToken0In = tokenIn === pool.token0;
    const reserveIn = isToken0In ? pool.reserve0 : pool.reserve1;
    const reserveOut = isToken0In ? pool.reserve1 : pool.reserve0;

    const amountOut = this.getAmountOut(amountIn, reserveIn, reserveOut, pool.fee);
    const priceImpact = this.getPriceImpact(amountIn, reserveIn, reserveOut, pool.fee);
    const fee = new Decimal(amountIn).times(pool.fee).dividedBy(10000).toFixed(18);
    const executionPrice = new Decimal(amountIn).dividedBy(amountOut).toFixed(18);
    const slippageAmount = new Decimal(amountOut).times(slippageTolerance).dividedBy(100);
    const minimumReceived = new Decimal(amountOut).minus(slippageAmount).toFixed(18);

    return {
      amountIn,
      amountOut,
      priceImpact,
      fee,
      executionPrice,
      minimumReceived,
    };
  }

  /**
   * Calculate LP token amount for liquidity provision
   * LP tokens = sqrt(amountA * amountB)
   */
  static getLPTokenAmount(amount0: string, amount1: string): string {
    const product = new Decimal(amount0).times(amount1);
    const lpTokens = product.squareRoot();
    return lpTokens.toFixed(18);
  }

  /**
   * Calculate share of pool for LP
   */
  static getPoolShare(lpTokens: string, totalSupply: string): number {
    const share = new Decimal(lpTokens).dividedBy(totalSupply).times(100);
    return parseFloat(share.toFixed(4));
  }
}
