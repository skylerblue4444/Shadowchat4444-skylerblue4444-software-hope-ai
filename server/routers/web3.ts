import { z } from "zod";
import { protectedProcedure, router, TRPCError } from "../_core/trpc";
import { multiCoinService, supportedCoins } from "../lib/multi-coin";

const coinSchema = z.enum(supportedCoins);

function toClientError(error: unknown, fallback = "Beta wallet operation failed.") {
  if (error instanceof TRPCError) return error;
  const message = error instanceof Error ? error.message : fallback;
  return new TRPCError({ code: "BAD_REQUEST", message });
}

export const web3Router = router({
  getSupportedCoins: protectedProcedure.query(() => supportedCoins),

  getWalletSummary: protectedProcedure.query(async ({ ctx }) => {
    try {
      const balances = await multiCoinService.getBalances(ctx.user.id);
      const transactions = await multiCoinService.getRecentTransactions(ctx.user.id, 25);
      const totalUsdValue = balances.reduce((sum, item) => sum + item.usdValue, 0);
      return {
        balances,
        transactions,
        totalUsdValue: Number(totalUsdValue.toFixed(2)),
        betaNotice:
          "Database-backed beta ledger. Real custody, withdrawals, payments, and on-chain deployment require explicit production approval.",
      };
    } catch (error) {
      throw toClientError(error, "Unable to load beta wallet summary.");
    }
  }),

  sendCoin: protectedProcedure
    .input(
      z.object({
        coin: coinSchema.default("SKY4444"),
        amount: z.number().positive(),
        recipientId: z.number().int().positive().optional(),
        recipientAddress: z.string().min(3).max(120).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await multiCoinService.transfer(ctx, input.coin, input.amount, input.recipientId, input.recipientAddress, "transfer");
      } catch (error) {
        throw toClientError(error, "Unable to send beta wallet transfer.");
      }
    }),

  tipCreator: protectedProcedure
    .input(
      z.object({
        recipientId: z.number().int().positive(),
        coin: coinSchema.default("SKY4444"),
        amount: z.number().positive(),
        memo: z.string().max(255).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await multiCoinService.tip(ctx, input.recipientId, input.amount, input.coin, input.memo);
      } catch (error) {
        throw toClientError(error, "Unable to record beta social tip.");
      }
    }),

  swapQuote: protectedProcedure
    .input(
      z.object({
        fromCoin: coinSchema,
        toCoin: coinSchema,
        amount: z.number().positive(),
      })
    )
    .query(({ input }) => {
      const from = multiCoinService.coinMeta[input.fromCoin];
      const to = multiCoinService.coinMeta[input.toCoin];
      const received = input.fromCoin === input.toCoin ? 0 : (input.amount * from.usd) / to.usd;
      return {
        fromCoin: input.fromCoin,
        toCoin: input.toCoin,
        amount: input.amount,
        estimatedReceived: Number(received.toFixed(8)),
        route: `${input.fromCoin} → SKY4444 beta ledger → ${input.toCoin}`,
        slippageGuard: 0.5,
      };
    }),

  executeSwap: protectedProcedure
    .input(
      z.object({
        fromCoin: coinSchema,
        toCoin: coinSchema,
        amount: z.number().positive(),
        slippage: z.number().min(0.1).max(10).default(0.5),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await multiCoinService.swap(ctx, input.fromCoin, input.toCoin, input.amount, input.slippage);
      } catch (error) {
        throw toClientError(error, "Unable to execute beta swap.");
      }
    }),

  createEscrowHold: protectedProcedure
    .input(
      z.object({
        sellerId: z.number().int().positive().optional(),
        coin: coinSchema.default("SKY4444"),
        amount: z.number().positive(),
        memo: z.string().max(255).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await multiCoinService.createEscrow(ctx, input.sellerId, input.coin, input.amount, input.memo);
      } catch (error) {
        throw toClientError(error, "Unable to create beta escrow hold.");
      }
    }),

  getTrumpBalance: protectedProcedure.query(async ({ ctx }) => {
    const balances = await multiCoinService.getBalances(ctx.user.id);
    const trump = balances.find((item) => item.coin === "TRUMP");
    return { balance: Number.parseFloat(trump?.amount ?? "0"), usdValue: trump?.usdValue ?? 0 };
  }),

  sendTrump: protectedProcedure.input(z.object({ to: z.string(), amount: z.number().positive() })).mutation(async ({ ctx, input }) => {
    try {
      return await multiCoinService.transfer(ctx, "TRUMP", input.amount, undefined, input.to, "transfer");
    } catch (error) {
      throw toClientError(error, "Unable to send TRUMP beta transfer.");
    }
  }),
});
