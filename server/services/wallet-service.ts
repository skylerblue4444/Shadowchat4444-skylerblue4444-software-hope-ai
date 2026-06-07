/**
 * Wallet Service - SKY4444 Multi-Coin Wallet Infrastructure
 * Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC
 * 
 * Features: Multi-coin balances, transfers, burn, airdrop, escrow, transaction history
 */

import { SUPPORTED_COINS } from '../lib/crypto-infrastructure';

export interface WalletBalance {
  coinSymbol: string;
  available: number;
  locked: number;
  staked: number;
  pending: number;
  total: number;
}

export interface Transaction {
  id: string;
  userId: string;
  coinSymbol: string;
  type: TransactionType;
  amount: number;
  fee: number;
  fromAddress?: string;
  toAddress?: string;
  status: 'pending' | 'confirmed' | 'failed' | 'cancelled';
  hash?: string;
  memo?: string;
  createdAt: Date;
  confirmedAt?: Date;
}

export type TransactionType =
  | 'deposit'
  | 'withdrawal'
  | 'transfer'
  | 'swap'
  | 'trade_buy'
  | 'trade_sell'
  | 'mining_reward'
  | 'staking_reward'
  | 'ico_purchase'
  | 'airdrop'
  | 'burn'
  | 'escrow_hold'
  | 'escrow_release'
  | 'tip'
  | 'marketplace_payment'
  | 'charity_donation'
  | 'platform_fee';

export interface EscrowHold {
  id: string;
  userId: string;
  coinSymbol: string;
  amount: number;
  reason: string;
  relatedId: string;
  status: 'held' | 'released' | 'refunded';
  createdAt: Date;
  releasedAt?: Date;
}

// =============================================================================
// WALLET ENGINE
// =============================================================================

class WalletEngine {
  private balances: Map<string, Map<string, WalletBalance>> = new Map();
  private transactions: Transaction[] = [];
  private escrows: Map<string, EscrowHold> = new Map();

  // Initialize wallet for a user
  initializeWallet(userId: string): void {
    if (this.balances.has(userId)) return;

    const userBalances = new Map<string, WalletBalance>();
    for (const symbol of Object.keys(SUPPORTED_COINS)) {
      userBalances.set(symbol, {
        coinSymbol: symbol,
        available: 0,
        locked: 0,
        staked: 0,
        pending: 0,
        total: 0,
      });
    }
    this.balances.set(userId, userBalances);
  }

  // Get all balances for a user
  getBalances(userId: string): WalletBalance[] {
    this.initializeWallet(userId);
    return Array.from(this.balances.get(userId)!.values());
  }

  // Get balance for specific coin
  getBalance(userId: string, coinSymbol: string): WalletBalance {
    this.initializeWallet(userId);
    const balance = this.balances.get(userId)!.get(coinSymbol);
    if (!balance) throw new Error(`Coin ${coinSymbol} not supported`);
    return balance;
  }

  // Credit (add) funds to wallet
  credit(userId: string, coinSymbol: string, amount: number, type: TransactionType, memo?: string): Transaction {
    this.initializeWallet(userId);
    const balance = this.balances.get(userId)!.get(coinSymbol);
    if (!balance) throw new Error(`Coin ${coinSymbol} not supported`);

    balance.available += amount;
    balance.total = balance.available + balance.locked + balance.staked + balance.pending;

    const tx = this.createTransaction(userId, coinSymbol, type, amount, 0, memo);
    return tx;
  }

  // Debit (remove) funds from wallet
  debit(userId: string, coinSymbol: string, amount: number, type: TransactionType, fee: number = 0, memo?: string): Transaction {
    this.initializeWallet(userId);
    const balance = this.balances.get(userId)!.get(coinSymbol);
    if (!balance) throw new Error(`Coin ${coinSymbol} not supported`);

    const totalDebit = amount + fee;
    if (balance.available < totalDebit) {
      throw new Error(`Insufficient ${coinSymbol} balance. Available: ${balance.available}, Required: ${totalDebit}`);
    }

    balance.available -= totalDebit;
    balance.total = balance.available + balance.locked + balance.staked + balance.pending;

    const tx = this.createTransaction(userId, coinSymbol, type, -amount, fee, memo);
    return tx;
  }

  // Transfer between users
  transfer(fromUserId: string, toUserId: string, coinSymbol: string, amount: number, fee: number = 0, memo?: string): { fromTx: Transaction; toTx: Transaction } {
    const fromTx = this.debit(fromUserId, coinSymbol, amount, 'transfer', fee, memo);
    const toTx = this.credit(toUserId, coinSymbol, amount, 'transfer', memo);
    return { fromTx, toTx };
  }

  // Lock funds (for staking, escrow, etc.)
  lockFunds(userId: string, coinSymbol: string, amount: number, reason: string): void {
    const balance = this.getBalance(userId, coinSymbol);
    if (balance.available < amount) {
      throw new Error(`Insufficient available ${coinSymbol} to lock`);
    }
    balance.available -= amount;
    balance.locked += amount;
    balance.total = balance.available + balance.locked + balance.staked + balance.pending;
  }

  // Unlock funds
  unlockFunds(userId: string, coinSymbol: string, amount: number): void {
    const balance = this.getBalance(userId, coinSymbol);
    if (balance.locked < amount) {
      throw new Error(`Insufficient locked ${coinSymbol} to unlock`);
    }
    balance.locked -= amount;
    balance.available += amount;
    balance.total = balance.available + balance.locked + balance.staked + balance.pending;
  }

  // Create escrow hold
  createEscrow(userId: string, coinSymbol: string, amount: number, reason: string, relatedId: string): EscrowHold {
    this.lockFunds(userId, coinSymbol, amount, reason);

    const escrow: EscrowHold = {
      id: `escrow_${Date.now()}_${userId}`,
      userId,
      coinSymbol,
      amount,
      reason,
      relatedId,
      status: 'held',
      createdAt: new Date(),
    };

    this.escrows.set(escrow.id, escrow);
    this.createTransaction(userId, coinSymbol, 'escrow_hold', -amount, 0, reason);
    return escrow;
  }

  // Release escrow
  releaseEscrow(escrowId: string, toUserId: string): void {
    const escrow = this.escrows.get(escrowId);
    if (!escrow) throw new Error('Escrow not found');
    if (escrow.status !== 'held') throw new Error('Escrow already processed');

    this.unlockFunds(escrow.userId, escrow.coinSymbol, escrow.amount);
    this.debit(escrow.userId, escrow.coinSymbol, escrow.amount, 'escrow_release');
    this.credit(toUserId, escrow.coinSymbol, escrow.amount, 'escrow_release');

    escrow.status = 'released';
    escrow.releasedAt = new Date();
  }

  // Burn tokens
  burn(userId: string, coinSymbol: string, amount: number): Transaction {
    return this.debit(userId, coinSymbol, amount, 'burn', 0, 'Token burn');
  }

  // Airdrop tokens to user
  airdrop(userId: string, coinSymbol: string, amount: number, reason: string): Transaction {
    return this.credit(userId, coinSymbol, amount, 'airdrop', reason);
  }

  // Get transaction history
  getTransactions(userId: string, limit: number = 50): Transaction[] {
    return this.transactions
      .filter(t => t.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }

  // Get transactions by type
  getTransactionsByType(userId: string, type: TransactionType): Transaction[] {
    return this.transactions
      .filter(t => t.userId === userId && t.type === type);
  }

  // Create transaction record
  private createTransaction(
    userId: string,
    coinSymbol: string,
    type: TransactionType,
    amount: number,
    fee: number,
    memo?: string
  ): Transaction {
    const tx: Transaction = {
      id: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      coinSymbol,
      type,
      amount: Math.abs(amount),
      fee,
      status: 'confirmed',
      memo,
      createdAt: new Date(),
      confirmedAt: new Date(),
    };

    this.transactions.push(tx);
    return tx;
  }

  // Get portfolio summary
  getPortfolioSummary(userId: string, prices: Record<string, number>): {
    totalValueUSD: number;
    balances: Array<WalletBalance & { valueUSD: number }>;
  } {
    const balances = this.getBalances(userId);
    let totalValueUSD = 0;

    const enriched = balances.map(b => {
      const price = prices[b.coinSymbol] || 0;
      const valueUSD = b.total * price;
      totalValueUSD += valueUSD;
      return { ...b, valueUSD };
    });

    return { totalValueUSD, balances: enriched };
  }
}

// Singleton instance
export const walletEngine = new WalletEngine();

export default walletEngine;
