/**
 * Unified Wallet & Transaction System
 * ─────────────────────────────────────────────────────────────────────────────
 * Multi-coin wallet management for all 7 coins with complete transaction support
 */

import { Decimal } from "decimal.js";

export type CoinType = "SKYCOIN4444" | "SHADOW" | "TRUMP" | "DOGE" | "BTC" | "MONERO" | "USDT";
export type TransactionType = "send" | "receive" | "stake" | "unstake" | "mine" | "burn" | "swap" | "trade" | "ico_invest" | "ico_distribute";
export type TransactionStatus = "pending" | "confirmed" | "failed" | "cancelled";

export interface Wallet {
  walletId: string;
  userId: number;
  coinType: CoinType;
  address: string;
  balance: string;
  stakedBalance: string;
  lockedBalance: string;
  availableBalance: string;
  totalValue: string;
  createdAt: Date;
  lastUpdated: Date;
  isActive: boolean;
}

export interface Transaction {
  txId: string;
  walletId: string;
  userId: number;
  coinType: CoinType;
  type: TransactionType;
  amount: string;
  fee: string;
  fromAddress: string;
  toAddress: string;
  status: TransactionStatus;
  hash?: string;
  timestamp: Date;
  confirmations: number;
  metadata?: Record<string, any>;
}

export interface CoinBalance {
  coinType: CoinType;
  balance: string;
  stakedBalance: string;
  lockedBalance: string;
  availableBalance: string;
  usdValue: string;
  percentageOfPortfolio: number;
}

export interface PortfolioSummary {
  userId: number;
  totalValue: string;
  totalBalance: string;
  totalStaked: string;
  totalLocked: string;
  coins: CoinBalance[];
  lastUpdated: Date;
}

export interface TransactionHistory {
  txId: string;
  coinType: CoinType;
  type: TransactionType;
  amount: string;
  fee: string;
  status: TransactionStatus;
  timestamp: Date;
  description: string;
}

export interface WalletActivity {
  userId: number;
  totalTransactions: number;
  totalVolume: string;
  totalFeesPaid: string;
  averageTransactionSize: string;
  mostUsedCoin: CoinType;
  lastActivityDate: Date;
}

export class UnifiedWallet {
  // All supported coins
  static readonly SUPPORTED_COINS: CoinType[] = [
    "SKYCOIN4444",
    "SHADOW",
    "TRUMP",
    "DOGE",
    "BTC",
    "MONERO",
    "USDT",
  ];

  // Transaction fees (percentage)
  static readonly TRANSACTION_FEES: Record<CoinType, number> = {
    SKYCOIN4444: 0.5,
    SHADOW: 0.5,
    TRUMP: 0.1,
    DOGE: 0.1,
    BTC: 0.2,
    MONERO: 0.3,
    USDT: 0.1,
  };

  /**
   * Create wallet for user
   */
  static createWallet(
    userId: number,
    coinType: CoinType,
  ): Wallet {
    return {
      walletId: `WALLET-${coinType}-${userId}-${Date.now()}`,
      userId,
      coinType,
      address: `0x${Math.random().toString(16).slice(2)}`,
      balance: "0",
      stakedBalance: "0",
      lockedBalance: "0",
      availableBalance: "0",
      totalValue: "0",
      createdAt: new Date(),
      lastUpdated: new Date(),
      isActive: true,
    };
  }

  /**
   * Get or create all wallets for user
   */
  static initializeUserWallets(userId: number): Wallet[] {
    return this.SUPPORTED_COINS.map((coin) =>
      this.createWallet(userId, coin),
    );
  }

  /**
   * Calculate available balance
   */
  static calculateAvailableBalance(
    balance: string,
    stakedBalance: string,
    lockedBalance: string,
  ): string {
    return new Decimal(balance)
      .minus(stakedBalance)
      .minus(lockedBalance)
      .toFixed(18);
  }

  /**
   * Calculate transaction fee
   */
  static calculateTransactionFee(
    amount: string,
    coinType: CoinType,
  ): string {
    const feePercentage = this.TRANSACTION_FEES[coinType];
    return new Decimal(amount)
      .times(feePercentage)
      .dividedBy(100)
      .toFixed(18);
  }

  /**
   * Record transaction
   */
  static recordTransaction(
    wallet: Wallet,
    type: TransactionType,
    amount: string,
    toAddress: string,
    metadata?: Record<string, any>,
  ): Transaction {
    const fee = this.calculateTransactionFee(amount, wallet.coinType);

    return {
      txId: `TX-${Date.now()}`,
      walletId: wallet.walletId,
      userId: wallet.userId,
      coinType: wallet.coinType,
      type,
      amount,
      fee,
      fromAddress: wallet.address,
      toAddress,
      status: "pending",
      timestamp: new Date(),
      confirmations: 0,
      metadata,
    };
  }

  /**
   * Send transaction
   */
  static sendTransaction(
    wallet: Wallet,
    amount: string,
    toAddress: string,
  ): { success: boolean; transaction?: Transaction; error?: string } {
    const fee = this.calculateTransactionFee(amount, wallet.coinType);
    const totalAmount = new Decimal(amount).plus(fee);

    if (new Decimal(wallet.availableBalance).lt(totalAmount)) {
      return {
        success: false,
        error: "Insufficient balance",
      };
    }

    const transaction = this.recordTransaction(
      wallet,
      "send",
      amount,
      toAddress,
    );

    return {
      success: true,
      transaction,
    };
  }

  /**
   * Receive transaction
   */
  static receiveTransaction(
    wallet: Wallet,
    amount: string,
    fromAddress: string,
  ): Transaction {
    return this.recordTransaction(
      wallet,
      "receive",
      amount,
      fromAddress,
    );
  }

  /**
   * Get portfolio summary
   */
  static getPortfolioSummary(
    wallets: Wallet[],
    coinPrices: Record<CoinType, string>,
  ): PortfolioSummary {
    const coins: CoinBalance[] = wallets.map((wallet) => {
      const price = new Decimal(coinPrices[wallet.coinType] || "0");
      const usdValue = new Decimal(wallet.balance).times(price);

      return {
        coinType: wallet.coinType,
        balance: wallet.balance,
        stakedBalance: wallet.stakedBalance,
        lockedBalance: wallet.lockedBalance,
        availableBalance: wallet.availableBalance,
        usdValue: usdValue.toFixed(2),
        percentageOfPortfolio: 0, // Will be calculated below
      };
    });

    const totalValue = coins.reduce(
      (sum, coin) => new Decimal(sum).plus(coin.usdValue),
      new Decimal(0),
    );

    const coinsWithPercentage = coins.map((coin) => ({
      ...coin,
      percentageOfPortfolio: new Decimal(coin.usdValue)
        .dividedBy(totalValue)
        .times(100)
        .toNumber(),
    }));

    const totalBalance = wallets.reduce(
      (sum, w) => new Decimal(sum).plus(w.balance),
      new Decimal(0),
    );

    const totalStaked = wallets.reduce(
      (sum, w) => new Decimal(sum).plus(w.stakedBalance),
      new Decimal(0),
    );

    const totalLocked = wallets.reduce(
      (sum, w) => new Decimal(sum).plus(w.lockedBalance),
      new Decimal(0),
    );

    return {
      userId: wallets[0]?.userId || 0,
      totalValue: totalValue.toFixed(2),
      totalBalance: totalBalance.toFixed(18),
      totalStaked: totalStaked.toFixed(18),
      totalLocked: totalLocked.toFixed(18),
      coins: coinsWithPercentage,
      lastUpdated: new Date(),
    };
  }

  /**
   * Get transaction history
   */
  static getTransactionHistory(
    transactions: Transaction[],
    limit: number = 50,
  ): TransactionHistory[] {
    return transactions
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit)
      .map((tx) => ({
        txId: tx.txId,
        coinType: tx.coinType,
        type: tx.type,
        amount: tx.amount,
        fee: tx.fee,
        status: tx.status,
        timestamp: tx.timestamp,
        description: `${tx.type.toUpperCase()} ${tx.amount} ${tx.coinType}`,
      }));
  }

  /**
   * Get wallet activity
   */
  static getWalletActivity(
    userId: number,
    transactions: Transaction[],
  ): WalletActivity {
    const totalVolume = transactions.reduce(
      (sum, tx) => new Decimal(sum).plus(tx.amount),
      new Decimal(0),
    );

    const totalFeesPaid = transactions.reduce(
      (sum, tx) => new Decimal(sum).plus(tx.fee),
      new Decimal(0),
    );

    const averageTransactionSize =
      transactions.length > 0
        ? totalVolume.dividedBy(transactions.length)
        : new Decimal(0);

    // Find most used coin
    const coinCounts: Record<CoinType, number> = {} as any;
    transactions.forEach((tx) => {
      coinCounts[tx.coinType] = (coinCounts[tx.coinType] || 0) + 1;
    });

    const mostUsedCoin = Object.entries(coinCounts).sort(
      ([, a], [, b]) => b - a,
    )[0]?.[0] as CoinType || "SKYCOIN4444";

    return {
      userId,
      totalTransactions: transactions.length,
      totalVolume: totalVolume.toFixed(18),
      totalFeesPaid: totalFeesPaid.toFixed(18),
      averageTransactionSize: averageTransactionSize.toFixed(18),
      mostUsedCoin,
      lastActivityDate: transactions[0]?.timestamp || new Date(),
    };
  }

  /**
   * Swap coins
   */
  static swapCoins(
    fromWallet: Wallet,
    toWallet: Wallet,
    fromAmount: string,
    exchangeRate: string,
  ): { success: boolean; transaction?: Transaction; error?: string } {
    const fee = this.calculateTransactionFee(fromAmount, fromWallet.coinType);
    const totalAmount = new Decimal(fromAmount).plus(fee);

    if (new Decimal(fromWallet.availableBalance).lt(totalAmount)) {
      return {
        success: false,
        error: "Insufficient balance for swap",
      };
    }

    const toAmount = new Decimal(fromAmount).times(exchangeRate);

    const transaction = this.recordTransaction(
      fromWallet,
      "swap",
      fromAmount,
      toWallet.address,
      {
        toAmount: toAmount.toFixed(18),
        toCoin: toWallet.coinType,
        exchangeRate,
      },
    );

    return {
      success: true,
      transaction,
    };
  }

  /**
   * Stake coins
   */
  static stakeCoins(
    wallet: Wallet,
    amount: string,
    duration: number, // days
  ): { success: boolean; transaction?: Transaction; error?: string } {
    if (new Decimal(wallet.availableBalance).lt(amount)) {
      return {
        success: false,
        error: "Insufficient balance to stake",
      };
    }

    const transaction = this.recordTransaction(
      wallet,
      "stake",
      amount,
      wallet.address,
      {
        duration,
        stakingStartDate: new Date(),
      },
    );

    return {
      success: true,
      transaction,
    };
  }

  /**
   * Burn coins
   */
  static burnCoins(
    wallet: Wallet,
    amount: string,
  ): { success: boolean; transaction?: Transaction; error?: string } {
    if (new Decimal(wallet.availableBalance).lt(amount)) {
      return {
        success: false,
        error: "Insufficient balance to burn",
      };
    }

    const transaction = this.recordTransaction(
      wallet,
      "burn",
      amount,
      "0x0000000000000000000000000000000000000000",
      {
        burnType: "user_initiated",
      },
    );

    return {
      success: true,
      transaction,
    };
  }

  /**
   * Get wallet by coin type
   */
  static getWalletByCoin(
    wallets: Wallet[],
    coinType: CoinType,
  ): Wallet | undefined {
    return wallets.find((w) => w.coinType === coinType);
  }

  /**
   * Get all wallet addresses
   */
  static getAllWalletAddresses(wallets: Wallet[]): Record<CoinType, string> {
    const addresses: any = {};
    wallets.forEach((wallet) => {
      addresses[wallet.coinType] = wallet.address;
    });
    return addresses;
  }

  /**
   * Update wallet balance
   */
  static updateWalletBalance(
    wallet: Wallet,
    newBalance: string,
  ): Wallet {
    const availableBalance = this.calculateAvailableBalance(
      newBalance,
      wallet.stakedBalance,
      wallet.lockedBalance,
    );

    return {
      ...wallet,
      balance: newBalance,
      availableBalance,
      lastUpdated: new Date(),
    };
  }

  /**
   * Verify transaction
   */
  static verifyTransaction(transaction: Transaction): boolean {
    return (
      transaction.fromAddress !== transaction.toAddress &&
      new Decimal(transaction.amount).gt(0) &&
      new Decimal(transaction.fee).gte(0)
    );
  }

  /**
   * Get transaction by ID
   */
  static getTransactionById(
    transactions: Transaction[],
    txId: string,
  ): Transaction | undefined {
    return transactions.find((tx) => tx.txId === txId);
  }

  /**
   * Get transactions by type
   */
  static getTransactionsByType(
    transactions: Transaction[],
    type: TransactionType,
  ): Transaction[] {
    return transactions.filter((tx) => tx.type === type);
  }

  /**
   * Get transactions by status
   */
  static getTransactionsByStatus(
    transactions: Transaction[],
    status: TransactionStatus,
  ): Transaction[] {
    return transactions.filter((tx) => tx.status === status);
  }
}
