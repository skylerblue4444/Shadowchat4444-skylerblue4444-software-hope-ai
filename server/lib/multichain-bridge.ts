/**
 * Multi-Chain Bridge & Cross-Chain Features
 * ─────────────────────────────────────────────────────────────────────────────
 * Seamless token bridging across multiple blockchains
 */

import { Decimal } from "decimal.js";

export type SupportedChain = "ethereum" | "polygon" | "bsc" | "arbitrum" | "optimism" | "solana" | "bitcoin";

export interface ChainBridge {
  bridgeId: string;
  sourceChain: SupportedChain;
  destinationChain: SupportedChain;
  tokenSymbol: string;
  bridgeAddress: string;
  liquidity: string;
  fee: number; // percentage
  minAmount: string;
  maxAmount: string;
  isActive: boolean;
  supportedTokens: string[];
}

export interface BridgeTransaction {
  txId: string;
  bridgeId: string;
  userId: number;
  sourceChain: SupportedChain;
  destinationChain: SupportedChain;
  tokenSymbol: string;
  amount: string;
  fee: string;
  amountReceived: string;
  sourceHash: string;
  destinationHash?: string;
  status: "pending" | "confirmed" | "completed" | "failed";
  timestamp: Date;
  estimatedCompletion?: Date;
}

export interface ChainInfo {
  chainId: number;
  chainName: SupportedChain;
  rpcUrl: string;
  explorerUrl: string;
  nativeToken: string;
  gasPrice: string;
  avgBlockTime: number; // seconds
  finality: number; // blocks
}

export interface LiquidityPool {
  poolId: string;
  bridgeId: string;
  tokenSymbol: string;
  sourceChain: SupportedChain;
  destinationChain: SupportedChain;
  totalLiquidity: string;
  availableLiquidity: string;
  utilizationRate: number;
  apy: number;
  providers: number;
}

export interface BridgeLiquidityProvider {
  providerId: string;
  poolId: string;
  userId: number;
  liquidityProvided: string;
  sharePercentage: number;
  rewardsEarned: string;
  joinDate: Date;
  status: "active" | "withdrawn";
}

export interface ChainSwap {
  swapId: string;
  userId: number;
  fromChain: SupportedChain;
  toChain: SupportedChain;
  fromToken: string;
  toToken: string;
  fromAmount: string;
  toAmount: string;
  exchangeRate: string;
  fee: string;
  status: "pending" | "completed" | "failed";
  timestamp: Date;
}

export class MultichainBridge {
  // Supported chains
  static readonly SUPPORTED_CHAINS: Record<SupportedChain, ChainInfo> = {
    ethereum: {
      chainId: 1,
      chainName: "ethereum",
      rpcUrl: "https://eth-mainnet.g.alchemy.com/v2/",
      explorerUrl: "https://etherscan.io",
      nativeToken: "ETH",
      gasPrice: "50",
      avgBlockTime: 12,
      finality: 12,
    },
    polygon: {
      chainId: 137,
      chainName: "polygon",
      rpcUrl: "https://polygon-mainnet.g.alchemy.com/v2/",
      explorerUrl: "https://polygonscan.com",
      nativeToken: "MATIC",
      gasPrice: "30",
      avgBlockTime: 2,
      finality: 256,
    },
    bsc: {
      chainId: 56,
      chainName: "bsc",
      rpcUrl: "https://bsc-dataseed1.binance.org",
      explorerUrl: "https://bscscan.com",
      nativeToken: "BNB",
      gasPrice: "5",
      avgBlockTime: 3,
      finality: 20,
    },
    arbitrum: {
      chainId: 42161,
      chainName: "arbitrum",
      rpcUrl: "https://arb1.arbitrum.io/rpc",
      explorerUrl: "https://arbiscan.io",
      nativeToken: "ETH",
      gasPrice: "0.1",
      avgBlockTime: 0.25,
      finality: 1,
    },
    optimism: {
      chainId: 10,
      chainName: "optimism",
      rpcUrl: "https://mainnet.optimism.io",
      explorerUrl: "https://optimistic.etherscan.io",
      nativeToken: "ETH",
      gasPrice: "0.5",
      avgBlockTime: 2,
      finality: 1,
    },
    solana: {
      chainId: 900,
      chainName: "solana",
      rpcUrl: "https://api.mainnet-beta.solana.com",
      explorerUrl: "https://solscan.io",
      nativeToken: "SOL",
      gasPrice: "0.00025",
      avgBlockTime: 0.4,
      finality: 32,
    },
    bitcoin: {
      chainId: 0,
      chainName: "bitcoin",
      rpcUrl: "https://api.blockcypher.com/v1/btc/main",
      explorerUrl: "https://blockchain.com",
      nativeToken: "BTC",
      gasPrice: "10",
      avgBlockTime: 600,
      finality: 6,
    },
  };

  /**
   * Create bridge between chains
   */
  static createBridge(
    sourceChain: SupportedChain,
    destinationChain: SupportedChain,
    tokenSymbol: string,
    bridgeAddress: string,
    liquidity: string,
    fee: number = 0.5,
  ): ChainBridge {
    return {
      bridgeId: `BRIDGE-${sourceChain}-${destinationChain}-${Date.now()}`,
      sourceChain,
      destinationChain,
      tokenSymbol,
      bridgeAddress,
      liquidity,
      fee,
      minAmount: "1",
      maxAmount: new Decimal(liquidity).times(0.1).toFixed(18),
      isActive: true,
      supportedTokens: [tokenSymbol],
    };
  }

  /**
   * Calculate bridge fee
   */
  static calculateBridgeFee(amount: string, feePercentage: number): string {
    return new Decimal(amount)
      .times(feePercentage)
      .dividedBy(100)
      .toFixed(18);
  }

  /**
   * Calculate amount received after bridge
   */
  static calculateAmountReceived(
    amount: string,
    feePercentage: number,
  ): string {
    const fee = this.calculateBridgeFee(amount, feePercentage);
    return new Decimal(amount)
      .minus(fee)
      .toFixed(18);
  }

  /**
   * Initiate bridge transaction
   */
  static initiateBridgeTransaction(
    bridgeId: string,
    userId: number,
    sourceChain: SupportedChain,
    destinationChain: SupportedChain,
    tokenSymbol: string,
    amount: string,
    feePercentage: number,
  ): BridgeTransaction {
    const fee = this.calculateBridgeFee(amount, feePercentage);
    const amountReceived = this.calculateAmountReceived(amount, feePercentage);

    const sourceChainInfo = this.SUPPORTED_CHAINS[sourceChain];
    const estimatedTime = sourceChainInfo.avgBlockTime * sourceChainInfo.finality * 2;

    return {
      txId: `BRIDGE-${Date.now()}`,
      bridgeId,
      userId,
      sourceChain,
      destinationChain,
      tokenSymbol,
      amount,
      fee,
      amountReceived,
      sourceHash: `0x${Math.random().toString(16).slice(2)}`,
      status: "pending",
      timestamp: new Date(),
      estimatedCompletion: new Date(Date.now() + estimatedTime * 1000),
    };
  }

  /**
   * Create liquidity pool
   */
  static createLiquidityPool(
    bridgeId: string,
    tokenSymbol: string,
    sourceChain: SupportedChain,
    destinationChain: SupportedChain,
    initialLiquidity: string,
  ): LiquidityPool {
    return {
      poolId: `POOL-${Date.now()}`,
      bridgeId,
      tokenSymbol,
      sourceChain,
      destinationChain,
      totalLiquidity: initialLiquidity,
      availableLiquidity: initialLiquidity,
      utilizationRate: 0,
      apy: 12, // 12% APY
      providers: 1,
    };
  }

  /**
   * Add liquidity to pool
   */
  static addLiquidityToPool(
    pool: LiquidityPool,
    userId: number,
    amount: string,
  ): BridgeLiquidityProvider {
    return {
      providerId: `LP-${Date.now()}`,
      poolId: pool.poolId,
      userId,
      liquidityProvided: amount,
      sharePercentage: new Decimal(amount)
        .dividedBy(pool.totalLiquidity)
        .times(100)
        .toNumber(),
      rewardsEarned: "0",
      joinDate: new Date(),
      status: "active",
    };
  }

  /**
   * Calculate LP rewards
   */
  static calculateLPRewards(
    provider: BridgeLiquidityProvider,
    pool: LiquidityPool,
    daysActive: number,
  ): string {
    const dailyAPY = new Decimal(pool.apy).dividedBy(365);
    const rewards = new Decimal(provider.liquidityProvided)
      .times(dailyAPY)
      .dividedBy(100)
      .times(daysActive);

    return rewards.toFixed(18);
  }

  /**
   * Get bridge status
   */
  static getBridgeStatus(
    bridge: ChainBridge,
    transactions: BridgeTransaction[],
  ): {
    isHealthy: boolean;
    utilizationRate: number;
    averageTime: number;
    successRate: number;
  } {
    const completedTxs = transactions.filter((tx) => tx.status === "completed");
    const totalTxs = transactions.length;

    const successRate =
      totalTxs > 0 ? (completedTxs.length / totalTxs) * 100 : 0;

    const utilizationRate = new Decimal(
      new Decimal(bridge.liquidity).minus(bridge.maxAmount),
    )
      .dividedBy(bridge.liquidity)
      .times(100)
      .toNumber();

    const averageTime =
      completedTxs.length > 0
        ? completedTxs.reduce((sum, tx) => {
          if (tx.estimatedCompletion) {
            return (
              sum +
              (tx.estimatedCompletion.getTime() - tx.timestamp.getTime()) /
              1000
            );
          }
          return sum;
        }, 0) / completedTxs.length
        : 0;

    return {
      isHealthy: successRate > 95 && utilizationRate < 80,
      utilizationRate,
      averageTime,
      successRate,
    };
  }

  /**
   * Estimate bridge time
   */
  static estimateBridgeTime(
    sourceChain: SupportedChain,
    destinationChain: SupportedChain,
  ): number {
    const sourceInfo = this.SUPPORTED_CHAINS[sourceChain];
    const destInfo = this.SUPPORTED_CHAINS[destinationChain];

    const sourceTime = sourceInfo.avgBlockTime * sourceInfo.finality;
    const destTime = destInfo.avgBlockTime * destInfo.finality;

    return sourceTime + destTime + 60; // Add 1 minute buffer
  }

  /**
   * Get bridge routes
   */
  static getBridgeRoutes(
    tokenSymbol: string,
    bridges: ChainBridge[],
  ): ChainBridge[] {
    return bridges.filter(
      (bridge) =>
        bridge.tokenSymbol === tokenSymbol &&
        bridge.isActive &&
        bridge.supportedTokens.includes(tokenSymbol),
    );
  }

  /**
   * Compare bridge options
   */
  static compareBridgeOptions(
    routes: ChainBridge[],
    amount: string,
  ): {
    bridgeId: string;
    fee: string;
    amountReceived: string;
    estimatedTime: number;
    liquidity: string;
  }[] {
    return routes.map((bridge) => ({
      bridgeId: bridge.bridgeId,
      fee: this.calculateBridgeFee(amount, bridge.fee),
      amountReceived: this.calculateAmountReceived(amount, bridge.fee),
      estimatedTime: this.estimateBridgeTime(
        bridge.sourceChain,
        bridge.destinationChain,
      ),
      liquidity: bridge.availableLiquidity,
    }));
  }

  /**
   * Get all supported chains
   */
  static getSupportedChains(): SupportedChain[] {
    return Object.keys(this.SUPPORTED_CHAINS) as SupportedChain[];
  }

  /**
   * Get chain info
   */
  static getChainInfo(chain: SupportedChain): ChainInfo {
    return this.SUPPORTED_CHAINS[chain];
  }

  /**
   * Calculate cross-chain swap
   */
  static calculateCrossChainSwap(
    fromAmount: string,
    fromChainFee: number,
    toChainFee: number,
    exchangeRate: string,
  ): {
    fromAmount: string;
    toAmount: string;
    totalFee: string;
    exchangeRate: string;
  } {
    const fee1 = this.calculateBridgeFee(fromAmount, fromChainFee);
    const afterFee1 = new Decimal(fromAmount).minus(fee1);

    const swapped = afterFee1.times(exchangeRate);
    const fee2 = this.calculateBridgeFee(swapped.toFixed(18), toChainFee);
    const toAmount = swapped.minus(fee2);

    const totalFee = new Decimal(fee1).plus(fee2);

    return {
      fromAmount,
      toAmount: toAmount.toFixed(18),
      totalFee: totalFee.toFixed(18),
      exchangeRate,
    };
  }
}
