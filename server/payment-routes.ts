/**
 * SkyCoin444 Payment & Crypto tRPC Routes
 * Production-Grade Payment Processing API
 */

import { z } from 'zod';
import { protectedProcedure, publicProcedure, router } from './_core/trpc';
import { UnifiedPaymentEngine, StripePaymentEngine, CryptoPaymentEngine } from './payment-engine';
import { BlockchainProviderManager, TokenManager } from './blockchain-engine';

// Initialize engines
const paymentEngine = new UnifiedPaymentEngine(
  process.env.STRIPE_API_KEY || '',
  process.env.STRIPE_WEBHOOK_SECRET || ''
);

const blockchainManager = new BlockchainProviderManager();
const tokenManager = new TokenManager(blockchainManager);

export const paymentRouter = router({
  // ========== STRIPE PAYMENTS ==========

  /**
   * Create Stripe payment intent
   */
  createStripePayment: protectedProcedure
    .input(
      z.object({
        amount: z.number().positive(),
        currency: z.string().default('USD'),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const payment = await paymentEngine.processPayment(
          ctx.user.id.toString(),
          input.amount,
          'stripe',
          {
            description: input.description,
            currency: input.currency,
          }
        );
        return payment;
      } catch (error: any) {
        throw new Error(`Payment creation failed: ${error?.message}`);
      }
    }),

  /**
   * Confirm Stripe payment
   */
  confirmStripePayment: protectedProcedure
    .input(
      z.object({
        paymentId: z.string(),
        paymentMethodId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const stripeEngine = paymentEngine.getStripeEngine();
        const payment = await stripeEngine.confirmPayment(input.paymentId, input.paymentMethodId);
        return payment;
      } catch (error: any) {
        throw new Error(`Payment confirmation failed: ${error?.message}`);
      }
    }),

  /**
   * Get payment status
   */
  getPaymentStatus: protectedProcedure
    .input(z.object({ paymentId: z.string() }))
    .query(({ input }) => {
      const payment = paymentEngine.getPaymentStatus(input.paymentId);
      if (!payment) throw new Error('Payment not found');
      return payment;
    }),

  /**
   * List user payments
   */
  listUserPayments: protectedProcedure
    .input(z.object({ limit: z.number().default(50) }))
    .query(({ ctx, input }) => {
      return paymentEngine.getUserPayments(ctx.user.id.toString(), input.limit);
    }),

  // ========== CRYPTO PAYMENTS ==========

  /**
   * Create crypto payment request
   */
  createCryptoPayment: protectedProcedure
    .input(
      z.object({
        amount: z.number().positive(),
        token: z.enum(['ETH', 'BTC', 'USDC', 'SKY', 'MATIC', 'BNB']),
        walletAddress: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const cryptoEngine = paymentEngine.getCryptoEngine();
        const payment = cryptoEngine.createCryptoPayment(
          ctx.user.id.toString(),
          input.amount,
          input.token,
          input.walletAddress
        );
        return payment;
      } catch (error: any) {
        throw new Error(`Crypto payment creation failed: ${error?.message}`);
      }
    }),

  /**
   * Confirm crypto payment with transaction hash
   */
  confirmCryptoPayment: protectedProcedure
    .input(
      z.object({
        paymentId: z.string(),
        txHash: z.string(),
        confirmations: z.number().default(0),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const cryptoEngine = paymentEngine.getCryptoEngine();
        const payment = await cryptoEngine.confirmCryptoPayment(
          input.paymentId,
          input.txHash,
          input.confirmations
        );
        return payment;
      } catch (error: any) {
        throw new Error(`Crypto payment confirmation failed: ${error?.message}`);
      }
    }),

  /**
   * Get crypto payment status
   */
  getCryptoPaymentStatus: protectedProcedure
    .input(z.object({ paymentId: z.string() }))
    .query(({ input }) => {
      const cryptoEngine = paymentEngine.getCryptoEngine();
      const payment = cryptoEngine.getCryptoPaymentStatus(input.paymentId);
      if (!payment) throw new Error('Crypto payment not found');
      return payment;
    }),

  /**
   * List user crypto payments
   */
  listUserCryptoPayments: protectedProcedure
    .input(z.object({ limit: z.number().default(50) }))
    .query(({ ctx, input }) => {
      const cryptoEngine = paymentEngine.getCryptoEngine();
      return cryptoEngine.getUserCryptoPayments(ctx.user.id.toString(), input.limit);
    }),

  // ========== CRYPTO WALLETS ==========

  /**
   * Add crypto wallet
   */
  addCryptoWallet: protectedProcedure
    .input(
      z.object({
        address: z.string(),
        token: z.enum(['ETH', 'BTC', 'USDC', 'SKY', 'MATIC', 'BNB']),
        balance: z.number().default(0),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const cryptoEngine = paymentEngine.getCryptoEngine();
        const wallet = cryptoEngine.addWallet(
          ctx.user.id.toString(),
          input.address,
          input.token,
          input.balance
        );
        return wallet;
      } catch (error: any) {
        throw new Error(`Wallet addition failed: ${error?.message}`);
      }
    }),

  /**
   * Get user crypto wallets
   */
  getUserCryptoWallets: protectedProcedure.query(({ ctx }) => {
    const cryptoEngine = paymentEngine.getCryptoEngine();
    return cryptoEngine.getUserWallets(ctx.user.id.toString());
  }),

  /**
   * Update wallet balance
   */
  updateWalletBalance: protectedProcedure
    .input(
      z.object({
        walletId: z.string(),
        newBalance: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const cryptoEngine = paymentEngine.getCryptoEngine();
        const wallet = await cryptoEngine.updateWalletBalance(input.walletId, input.newBalance);
        return wallet;
      } catch (error: any) {
        throw new Error(`Wallet update failed: ${error?.message}`);
      }
    }),

  // ========== BLOCKCHAIN ==========

  /**
   * Get account balance on chain
   */
  getBlockchainBalance: protectedProcedure
    .input(
      z.object({
        chain: z.string(),
        address: z.string(),
      })
    )
    .query(async ({ input }) => {
      try {
        const balance = await blockchainManager.getBalance(input.chain, input.address);
        return { balance, chain: input.chain, address: input.address };
      } catch (error: any) {
        throw new Error(`Balance fetch failed: ${error?.message}`);
      }
    }),

  /**
   * Get supported blockchain networks
   */
  getSupportedChains: publicProcedure.query(() => {
    return blockchainManager.getSupportedChains();
  }),

  /**
   * Get transaction status
   */
  getTransactionStatus: publicProcedure
    .input(
      z.object({
        chain: z.string(),
        txHash: z.string(),
      })
    )
    .query(async ({ input }) => {
      try {
        const status = await blockchainManager.getTransactionStatus(input.chain, input.txHash);
        return status;
      } catch (error: any) {
        throw new Error(`Transaction status fetch failed: ${error?.message}`);
      }
    }),

  // ========== TOKENS ==========

  /**
   * Register token
   */
  registerToken: protectedProcedure
    .input(
      z.object({
        chain: z.string(),
        address: z.string(),
        name: z.string(),
        symbol: z.string(),
        decimals: z.number(),
        totalSupply: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const token = tokenManager.registerToken(
          input.chain,
          input.address,
          input.name,
          input.symbol,
          input.decimals,
          input.totalSupply
        );
        return token;
      } catch (error: any) {
        throw new Error(`Token registration failed: ${error?.message}`);
      }
    }),

  /**
   * Get token info
   */
  getTokenInfo: publicProcedure
    .input(
      z.object({
        chain: z.string(),
        tokenAddress: z.string(),
      })
    )
    .query(({ input }) => {
      const token = tokenManager.getTokenInfo(input.chain, input.tokenAddress);
      if (!token) throw new Error('Token not found');
      return token;
    }),

  /**
   * Get all tokens on chain
   */
  getChainTokens: publicProcedure
    .input(z.object({ chain: z.string() }))
    .query(({ input }) => {
      return tokenManager.getChainTokens(input.chain);
    }),
});

export type PaymentRouter = typeof paymentRouter;
