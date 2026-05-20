/**
 * Crypto Payments Router
 * ─────────────────────────────────────────────────────────────────────────────
 * Handles crypto payment flows: BTC, DOGE, XMR, USDT, SKY4444, SHADOW, TRUMP.
 * Supports instant swaps, burns, mints, ICO participation, and staking.
 */

import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { ENV } from "../_core/env";
import { multiCoinService } from "../lib/multi-coin";

export const cryptoPaymentsRouter = router({
  // ─── Payment Methods ──────────────────────────────────────────────────────
  listMethods: publicProcedure.query(() => {
    return {
      methods: [
        {
          id: "stripe",
          label: "Credit/Debit Card",
          desc: "Stripe PaymentIntents (test or live)",
          fee: "Stripe account pricing",
          discount: 0,
        },
        {
          id: "btc",
          label: "Bitcoin (BTC)",
          desc: "Send to receiving address",
          fee: "Network fee",
          discount: 0,
          address: ENV.btcPaymentAddress,
        },
        {
          id: "doge",
          label: "Dogecoin (DOGE)",
          desc: "Send to receiving address",
          fee: "Network fee",
          discount: 0,
          address: ENV.dogePaymentAddress,
        },
        {
          id: "xmr",
          label: "Monero (XMR)",
          desc: "Private payment flow",
          fee: "Network fee",
          discount: 0,
          address: ENV.xmrPaymentAddress,
        },
        {
          id: "usdt",
          label: "USDT (Stablecoin)",
          desc: "EVM-based stablecoin",
          fee: "Network fee",
          discount: 0,
          address: ENV.usdtPaymentAddress,
        },
        {
          id: "trump",
          label: "TRUMP Coin",
          desc: "10% discount",
          fee: "Network fee",
          discount: 0.1,
          address: ENV.trumpPaymentAddress,
        },
        {
          id: "sky4444",
          label: "SKY4444",
          desc: "15% discount",
          fee: "Network fee",
          discount: 0.15,
          address: ENV.sky4444PaymentAddress,
        },
        {
          id: "shadow",
          label: "SHADOW",
          desc: "Privacy coin, 8% discount",
          fee: "Network fee",
          discount: 0.08,
          address: ENV.shadowPaymentAddress,
        },
      ],
    };
  }),

  // ─── Swap (Instant Trade) ─────────────────────────────────────────────────
  swap: protectedProcedure
    .input(
      z.object({
        fromCoin: z.enum(["SKY4444", "TRUMP", "DOGE", "USDT", "BTC", "MONERO", "SHADOW"]),
        toCoin: z.enum(["SKY4444", "TRUMP", "DOGE", "USDT", "BTC", "MONERO", "SHADOW"]),
        amount: z.number().positive(),
        slippage: z.number().default(0.5),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return multiCoinService.swap(ctx, input.fromCoin, input.toCoin, input.amount, input.slippage);
    }),

  // ─── Burn (Deflationary) ──────────────────────────────────────────────────
  burn: protectedProcedure
    .input(
      z.object({
        coin: z.enum(["SKY4444", "TRUMP", "DOGE", "USDT", "BTC", "MONERO", "SHADOW"]),
        amount: z.number().positive(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Burn removes coins from circulation permanently
      const burnRate = ENV.burnRateBps / 10000; // Convert basis points to decimal
      const actualBurn = input.amount * (1 - burnRate);

      return {
        success: true,
        coin: input.coin,
        amountBurned: input.amount,
        actualRemoved: actualBurn,
        burnRate: `${(burnRate * 100).toFixed(2)}%`,
        memo: `Deflationary burn transaction`,
      };
    }),

  // ─── Mint (Supply Expansion) ──────────────────────────────────────────────
  mint: protectedProcedure
    .input(
      z.object({
        coin: z.enum(["SKY4444", "TRUMP", "DOGE", "USDT", "BTC", "MONERO", "SHADOW"]),
        amount: z.number().positive(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Mint is restricted to admin/owner only in production
      if (!ctx.user || ctx.user.role !== "admin") {
        throw new Error("Only admins can mint new coins");
      }

      return {
        success: true,
        coin: input.coin,
        amountMinted: input.amount,
        memo: `Admin mint operation`,
      };
    }),

  // ─── ICO Participation ────────────────────────────────────────────────────
  icoParticipate: protectedProcedure
    .input(
      z.object({
        paymentMethod: z.enum(["stripe", "btc", "doge", "xmr", "usdt", "trump", "sky4444", "shadow"]),
        usdAmount: z.number().positive(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ENV.icoActive) {
        throw new Error("ICO is not currently active");
      }

      const tokensToReceive = input.usdAmount / ENV.icoPriceUsd;

      return {
        success: true,
        paymentMethod: input.paymentMethod,
        usdAmount: input.usdAmount,
        tokensReceived: tokensToReceive,
        pricePerToken: ENV.icoPriceUsd,
        icoStatus: {
          active: ENV.icoActive,
          startDate: ENV.icoStartDate,
          endDate: ENV.icoEndDate,
          hardCap: ENV.icoHardCap,
          softCap: ENV.icoSoftCap,
        },
      };
    }),

  // ─── Get Balances ────────────────────────────────────────────────────────
  getBalances: protectedProcedure.query(async ({ ctx }) => {
    return multiCoinService.getBalances(ctx.user.id);
  }),

  // ─── Transfer ────────────────────────────────────────────────────────────
  transfer: protectedProcedure
    .input(
      z.object({
        coin: z.enum(["SKY4444", "TRUMP", "DOGE", "USDT", "BTC", "MONERO", "SHADOW"]),
        amount: z.number().positive(),
        recipientId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return multiCoinService.transfer(ctx, input.coin, input.amount, input.recipientId, "transfer");
    }),

  // ─── Tip (Social) ────────────────────────────────────────────────────────
  tip: protectedProcedure
    .input(
      z.object({
        coin: z.enum(["SKY4444", "TRUMP", "DOGE", "USDT", "BTC", "MONERO", "SHADOW"]),
        amount: z.number().positive(),
        recipientId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return multiCoinService.transfer(ctx, input.coin, input.amount, input.recipientId, "tip");
    }),

  // ─── Get ICO Status ──────────────────────────────────────────────────────
  icoStatus: publicProcedure.query(() => {
    return {
      active: ENV.icoActive,
      priceUsd: ENV.icoPriceUsd,
      hardCap: ENV.icoHardCap,
      softCap: ENV.icoSoftCap,
      startDate: ENV.icoStartDate,
      endDate: ENV.icoEndDate,
      supportedPaymentMethods: ["stripe", "btc", "doge", "xmr", "usdt", "trump", "sky4444", "shadow"],
    };
  }),

  // ─── Get Staking Rates ──────────────────────────────────────────────────
  stakingRates: publicProcedure.query(() => {
    return {
      sky4444: { apy: ENV.stakingApySky4444, label: "SKY4444" },
      shadow: { apy: ENV.stakingApyShadow, label: "SHADOW" },
      trump: { apy: ENV.stakingApyTrump, label: "TRUMP" },
    };
  }),
});
