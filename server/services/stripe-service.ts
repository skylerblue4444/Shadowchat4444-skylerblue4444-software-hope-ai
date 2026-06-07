/**
 * Stripe Payment Service - FinTrack Money Management App
 * Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC
 * 
 * Handles: Crypto purchases, ICO investments, subscription payments, marketplace transactions
 */

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-12-18.acacia' as any,
});

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: string;
  metadata: Record<string, string>;
}

export interface CryptoPayment {
  userId: string;
  coinSymbol: string;
  amount: number;
  usdValue: number;
  type: 'buy' | 'ico' | 'invest' | 'subscription' | 'marketplace';
}

// =============================================================================
// PAYMENT INTENTS
// =============================================================================

export async function createPaymentIntent(payment: CryptoPayment): Promise<PaymentIntent> {
  const amountInCents = Math.round(payment.usdValue * 100);

  const intent = await stripe.paymentIntents.create({
    amount: amountInCents,
    currency: 'usd',
    metadata: {
      userId: payment.userId,
      coinSymbol: payment.coinSymbol,
      coinAmount: payment.amount.toString(),
      type: payment.type,
      platform: 'sky4444-fintrack',
    },
    description: `${payment.type.toUpperCase()}: ${payment.amount} ${payment.coinSymbol} for $${payment.usdValue}`,
  });

  return {
    id: intent.id,
    amount: intent.amount,
    currency: intent.currency,
    status: intent.status,
    metadata: intent.metadata as Record<string, string>,
  };
}

// =============================================================================
// ICO INVESTMENT PAYMENTS
// =============================================================================

export async function createICOInvestment(
  userId: string,
  investmentUSD: number,
  tokenAmount: number,
  bonusPercent: number
): Promise<PaymentIntent> {
  const totalTokens = tokenAmount * (1 + bonusPercent / 100);

  return createPaymentIntent({
    userId,
    coinSymbol: 'SKY4444',
    amount: totalTokens,
    usdValue: investmentUSD,
    type: 'ico',
  });
}

// =============================================================================
// CRYPTO PURCHASE
// =============================================================================

export async function createCryptoPurchase(
  userId: string,
  coinSymbol: string,
  coinAmount: number,
  pricePerCoin: number
): Promise<PaymentIntent> {
  const usdValue = coinAmount * pricePerCoin;

  return createPaymentIntent({
    userId,
    coinSymbol,
    amount: coinAmount,
    usdValue,
    type: 'buy',
  });
}

// =============================================================================
// SUBSCRIPTION PAYMENTS
// =============================================================================

export async function createSubscription(
  userId: string,
  plan: 'basic' | 'pro' | 'enterprise'
): Promise<{ subscriptionId: string; clientSecret: string }> {
  const prices: Record<string, number> = {
    basic: 999, // $9.99
    pro: 2999, // $29.99
    enterprise: 9999, // $99.99
  };

  const intent = await stripe.paymentIntents.create({
    amount: prices[plan],
    currency: 'usd',
    metadata: {
      userId,
      plan,
      type: 'subscription',
      platform: 'sky4444-fintrack',
    },
  });

  return {
    subscriptionId: intent.id,
    clientSecret: intent.client_secret || '',
  };
}

// =============================================================================
// MARKETPLACE ESCROW PAYMENTS
// =============================================================================

export async function createMarketplaceEscrow(
  buyerId: string,
  sellerId: string,
  amount: number,
  listingId: string
): Promise<PaymentIntent> {
  const amountInCents = Math.round(amount * 100);

  const intent = await stripe.paymentIntents.create({
    amount: amountInCents,
    currency: 'usd',
    metadata: {
      buyerId,
      sellerId,
      listingId,
      type: 'marketplace_escrow',
      platform: 'sky4444-fintrack',
    },
    capture_method: 'manual', // Hold funds until delivery confirmed
  });

  return {
    id: intent.id,
    amount: intent.amount,
    currency: intent.currency,
    status: intent.status,
    metadata: intent.metadata as Record<string, string>,
  };
}

// =============================================================================
// REFUNDS
// =============================================================================

export async function processRefund(
  paymentIntentId: string,
  amount?: number
): Promise<{ refundId: string; status: string }> {
  const refund = await stripe.refunds.create({
    payment_intent: paymentIntentId,
    amount: amount ? Math.round(amount * 100) : undefined,
  });

  return {
    refundId: refund.id,
    status: refund.status || 'pending',
  };
}

// =============================================================================
// WEBHOOK HANDLER
// =============================================================================

export async function handleWebhook(
  payload: Buffer,
  signature: string,
  webhookSecret: string
): Promise<{ event: string; data: any }> {
  const event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);

  switch (event.type) {
    case 'payment_intent.succeeded':
      return { event: 'payment_success', data: event.data.object };
    case 'payment_intent.payment_failed':
      return { event: 'payment_failed', data: event.data.object };
    case 'charge.refunded':
      return { event: 'refund_processed', data: event.data.object };
    default:
      return { event: event.type, data: event.data.object };
  }
}

export default {
  createPaymentIntent,
  createICOInvestment,
  createCryptoPurchase,
  createSubscription,
  createMarketplaceEscrow,
  processRefund,
  handleWebhook,
};
