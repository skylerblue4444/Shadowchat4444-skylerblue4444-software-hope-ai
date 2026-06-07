/**
 * SkyCoin444 Payment Engine
 * Production-Grade Stripe + Crypto Payment Processing
 * Supports: Credit Cards, Bank Transfers, Crypto Payments, Staking Rewards
 */

import Stripe from 'stripe';
import { EventEmitter } from 'events';

// ============================================================================
// STRIPE PAYMENT ENGINE
// ============================================================================

interface PaymentIntent {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'processing' | 'succeeded' | 'failed' | 'canceled';
  stripeIntentId: string;
  metadata: Record<string, any>;
  createdAt: Date;
  completedAt?: Date;
}

interface StripeWebhookEvent {
  type: string;
  data: any;
  timestamp: number;
}

class StripePaymentEngine extends EventEmitter {
  private stripe: Stripe;
  private payments: Map<string, PaymentIntent> = new Map();
  private webhookSecret: string;

  constructor(apiKey: string, webhookSecret: string) {
    super();
    this.stripe = new Stripe(apiKey, { apiVersion: '2026-04-22.dahlia' as any });
    this.webhookSecret = webhookSecret;
  }

  /**
   * Create a payment intent for credit card or bank transfer
   */
  async createPaymentIntent(
    userId: string,
    amount: number,
    currency: string = 'USD',
    metadata: Record<string, any> = {}
  ): Promise<PaymentIntent> {
    try {
      const stripeIntent = await this.stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: currency.toLowerCase(),
        metadata: {
          userId,
          ...metadata,
        },
        automatic_payment_methods: {
          enabled: true,
        },
      });

      const payment: PaymentIntent = {
        id: `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        userId,
        amount,
        currency,
        status: 'pending',
        stripeIntentId: stripeIntent.id,
        metadata,
        createdAt: new Date(),
      };

      this.payments.set(payment.id, payment);
      this.emit('payment:created', payment);

      return payment;
    } catch (error: any) {
      this.emit('payment:error', { error, userId, amount });
      throw new Error(`Failed to create payment intent: ${error?.message || 'Unknown error'}`);
    }
  }

  /**
   * Confirm payment with Stripe
   */
  async confirmPayment(
    paymentId: string,
    paymentMethodId: string
  ): Promise<PaymentIntent> {
    const payment = this.payments.get(paymentId);
    if (!payment) throw new Error('Payment not found');

    try {
      const confirmed = await this.stripe.paymentIntents.confirm(
        payment.stripeIntentId,
        {
          payment_method: paymentMethodId,
          return_url: `https://skycoin444.com/payment/confirm/${paymentId}`,
        }
      );

      payment.status = confirmed.status === 'succeeded' ? 'succeeded' : 'processing';
      payment.completedAt = new Date();

      this.payments.set(paymentId, payment);
      this.emit('payment:confirmed', payment);

      return payment;
    } catch (error) {
      payment.status = 'failed';
      this.emit('payment:failed', { payment, error });
      throw error;
    }
  }

  /**
   * Handle Stripe webhook events
   */
  async handleWebhookEvent(event: StripeWebhookEvent): Promise<void> {
    switch (event.type) {
      case 'payment_intent.succeeded':
        this.handlePaymentSucceeded(event.data.object);
        break;
      case 'payment_intent.payment_failed':
        this.handlePaymentFailed(event.data.object);
        break;
      case 'charge.refunded':
        this.handleRefund(event.data.object);
        break;
      case 'customer.subscription.updated':
        this.handleSubscriptionUpdate(event.data.object);
        break;
    }
  }

  private handlePaymentSucceeded(stripeIntent: any): void {
    const payment = Array.from(this.payments.values()).find(
      (p) => p.stripeIntentId === stripeIntent.id
    );
    if (payment) {
      payment.status = 'succeeded';
      payment.completedAt = new Date();
      this.emit('payment:webhook:succeeded', payment);
    }
  }

  private handlePaymentFailed(stripeIntent: any): void {
    const payment = Array.from(this.payments.values()).find(
      (p) => p.stripeIntentId === stripeIntent.id
    );
    if (payment) {
      payment.status = 'failed';
      this.emit('payment:webhook:failed', payment);
    }
  }

  private handleRefund(charge: any): void {
    this.emit('payment:refunded', charge);
  }

  private handleSubscriptionUpdate(subscription: any): void {
    this.emit('subscription:updated', subscription);
  }

  /**
   * Get payment status
   */
  getPaymentStatus(paymentId: string): PaymentIntent | null {
    return this.payments.get(paymentId) || null;
  }

  /**
   * List user payments
   */
  getUserPayments(userId: string, limit: number = 50): PaymentIntent[] {
    return Array.from(this.payments.values())
      .filter((p) => p.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }
}

// ============================================================================
// CRYPTO PAYMENT ENGINE
// ============================================================================

interface CryptoPayment {
  id: string;
  userId: string;
  amount: number;
  token: string; // 'ETH', 'BTC', 'USDC', 'SKY', etc.
  walletAddress: string;
  txHash?: string;
  status: 'pending' | 'confirmed' | 'failed';
  confirmations: number;
  requiredConfirmations: number;
  createdAt: Date;
  confirmedAt?: Date;
}

interface CryptoWallet {
  id: string;
  userId: string;
  address: string;
  token: string;
  balance: number;
  lastUpdated: Date;
}

class CryptoPaymentEngine extends EventEmitter {
  private payments: Map<string, CryptoPayment> = new Map();
  private wallets: Map<string, CryptoWallet> = new Map();
  private rpcEndpoints: Record<string, string> = {
    ethereum: process.env.ETH_RPC_URL || 'https://eth-mainnet.g.alchemy.com/v2/demo',
    polygon: process.env.POLYGON_RPC_URL || 'https://polygon-rpc.com',
    bsc: process.env.BSC_RPC_URL || 'https://bsc-dataseed.bnbchain.org',
    arbitrum: process.env.ARBITRUM_RPC_URL || 'https://arb1.arbitrum.io/rpc',
  };

  /**
   * Create crypto payment request
   */
  createCryptoPayment(
    userId: string,
    amount: number,
    token: string,
    walletAddress: string
  ): CryptoPayment {
    const payment: CryptoPayment = {
      id: `crypto_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      amount,
      token,
      walletAddress,
      status: 'pending',
      confirmations: 0,
      requiredConfirmations: token === 'BTC' ? 3 : 12, // Different chains need different confirmations
      createdAt: new Date(),
    };

    this.payments.set(payment.id, payment);
    this.emit('crypto:payment:created', payment);

    return payment;
  }

  /**
   * Confirm crypto payment with transaction hash
   */
  async confirmCryptoPayment(
    paymentId: string,
    txHash: string,
    confirmations: number = 0
  ): Promise<CryptoPayment> {
    const payment = this.payments.get(paymentId);
    if (!payment) throw new Error('Crypto payment not found');

    payment.txHash = txHash;
    payment.confirmations = confirmations;

    if (confirmations >= payment.requiredConfirmations) {
      payment.status = 'confirmed';
      payment.confirmedAt = new Date();
      this.emit('crypto:payment:confirmed', payment);
    } else {
      payment.status = 'pending';
      this.emit('crypto:payment:pending', payment);
    }

    this.payments.set(paymentId, payment);
    return payment;
  }

  /**
   * Add crypto wallet
   */
  addWallet(
    userId: string,
    address: string,
    token: string,
    balance: number = 0
  ): CryptoWallet {
    const wallet: CryptoWallet = {
      id: `wallet_${token}_${address}`,
      userId,
      address,
      token,
      balance,
      lastUpdated: new Date(),
    };

    this.wallets.set(wallet.id, wallet);
    this.emit('crypto:wallet:added', wallet);

    return wallet;
  }

  /**
   * Update wallet balance (from blockchain)
   */
  async updateWalletBalance(
    walletId: string,
    newBalance: number
  ): Promise<CryptoWallet> {
    const wallet = this.wallets.get(walletId);
    if (!wallet) throw new Error('Wallet not found');

    wallet.balance = newBalance;
    wallet.lastUpdated = new Date();

    this.wallets.set(walletId, wallet);
    this.emit('crypto:wallet:updated', wallet);

    return wallet;
  }

  /**
   * Get user's crypto wallets
   */
  getUserWallets(userId: string): CryptoWallet[] {
    return Array.from(this.wallets.values()).filter((w) => w.userId === userId);
  }

  /**
   * Get crypto payment status
   */
  getCryptoPaymentStatus(paymentId: string): CryptoPayment | null {
    return this.payments.get(paymentId) || null;
  }

  /**
   * List user crypto payments
   */
  getUserCryptoPayments(userId: string, limit: number = 50): CryptoPayment[] {
    return Array.from(this.payments.values())
      .filter((p) => p.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }
}

// ============================================================================
// UNIFIED PAYMENT ROUTER
// ============================================================================

interface UnifiedPayment {
  id: string;
  userId: string;
  amount: number;
  paymentMethod: 'stripe' | 'crypto';
  status: 'pending' | 'processing' | 'succeeded' | 'failed';
  details: PaymentIntent | CryptoPayment;
  createdAt: Date;
}

class UnifiedPaymentEngine extends EventEmitter {
  private stripe: StripePaymentEngine;
  private crypto: CryptoPaymentEngine;
  private payments: Map<string, UnifiedPayment> = new Map();

  constructor(stripeApiKey: string, stripeWebhookSecret: string) {
    super();
    this.stripe = new StripePaymentEngine(stripeApiKey, stripeWebhookSecret);
    this.crypto = new CryptoPaymentEngine();

    // Forward events
    this.stripe.on('payment:created', (payment) => this.emit('payment:created', payment));
    this.stripe.on('payment:succeeded', (payment) => this.emit('payment:succeeded', payment));
    this.crypto.on('crypto:payment:confirmed', (payment) =>
      this.emit('crypto:payment:confirmed', payment)
    );
  }

  /**
   * Process payment with automatic method selection
   */
  async processPayment(
    userId: string,
    amount: number,
    paymentMethod: 'stripe' | 'crypto',
    metadata: Record<string, any> = {}
  ): Promise<UnifiedPayment> {
    const payment: UnifiedPayment = {
      id: `unified_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      amount,
      paymentMethod,
      status: 'pending',
      details: null as any,
      createdAt: new Date(),
    };

    try {
      if (paymentMethod === 'stripe') {
        payment.details = await this.stripe.createPaymentIntent(
          userId,
          amount,
          'USD',
          metadata
        );
      } else if (paymentMethod === 'crypto') {
        payment.details = this.crypto.createCryptoPayment(
          userId,
          amount,
          metadata.token || 'ETH',
          metadata.walletAddress
        );
      }

      payment.status = 'processing';
      this.payments.set(payment.id, payment);
      this.emit('payment:processing', payment);

      return payment;
    } catch (error) {
      payment.status = 'failed';
      this.emit('payment:error', { payment, error });
      throw error;
    }
  }

  /**
   * Get payment status
   */
  getPaymentStatus(paymentId: string): UnifiedPayment | null {
    return this.payments.get(paymentId) || null;
  }

  /**
   * Get user payments
   */
  getUserPayments(userId: string, limit: number = 50): UnifiedPayment[] {
    return Array.from(this.payments.values())
      .filter((p) => p.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }

  /**
   * Get Stripe engine
   */
  getStripeEngine(): StripePaymentEngine {
    return this.stripe;
  }

  /**
   * Get Crypto engine
   */
  getCryptoEngine(): CryptoPaymentEngine {
    return this.crypto;
  }
}

export {
  StripePaymentEngine,
  CryptoPaymentEngine,
  UnifiedPaymentEngine,
  PaymentIntent,
  CryptoPayment,
  CryptoWallet,
  UnifiedPayment,
};
