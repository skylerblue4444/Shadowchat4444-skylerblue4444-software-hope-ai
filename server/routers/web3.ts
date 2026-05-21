import { z } from "zod";
import { protectedProcedure, router, TRPCError } from "../_core/trpc";
import { getDb } from "../db";
import { getRecentSettlementEntries } from "../lib/settlement-ledger";
import { multiCoinService, supportedCoins } from "../lib/multi-coin";

const coinSchema = z.enum(supportedCoins);
const cryptoActionSchema = z.enum([
  "mine",
  "buy",
  "trade",
  "swap",
  "store",
  "burn",
  "tip",
  "pay",
  "escrow",
]);

function toClientError(
  error: unknown,
  fallback = "Beta wallet operation failed."
) {
  if (error instanceof TRPCError) return error;
  const message = error instanceof Error ? error.message : fallback;
  return new TRPCError({ code: "BAD_REQUEST", message });
}

function summarizeBalances(
  balances: Awaited<ReturnType<typeof multiCoinService.getBalances>>
) {
  const totalUsdValue = balances.reduce((sum, item) => sum + item.usdValue, 0);
  const liquidCoins = balances
    .filter(item => Number.parseFloat(item.amount) > 0)
    .map(item => item.coin);
  return {
    balances,
    totalUsdValue: Number(totalUsdValue.toFixed(2)),
    liquidCoins,
    betaNotice:
      "Full crypto playground ledger is live for mine, buy, trade, swap, store, burn, tip, pay, and escrow. Real custody, card onramp, withdrawals, and deployed smart contracts remain provider-gated.",
  };
}

export const web3Router = router({
  getSupportedCoins: protectedProcedure.query(() => supportedCoins),

  getWalletSummary: protectedProcedure.query(async ({ ctx }) => {
    try {
      const balances = await multiCoinService.getBalances(ctx.user.id);
      const transactions = await multiCoinService.getRecentTransactions(
        ctx.user.id,
        25
      );
      const db = await getDb();
      const settlementHistory = db
        ? await getRecentSettlementEntries(db, ctx.user.id, 25)
        : [];
      return {
        ...summarizeBalances(balances),
        transactions,
        settlementHistory,
        infrastructure: multiCoinService.getInfrastructure(),
      };
    } catch (error) {
      throw toClientError(error, "Unable to load beta wallet summary.");
    }
  }),

  getCryptoInfrastructure: protectedProcedure.query(async ({ ctx }) => {
    try {
      const balances = await multiCoinService.getBalances(ctx.user.id);
      const recentTransactions = await multiCoinService.getRecentTransactions(
        ctx.user.id,
        50
      );
      return {
        ...summarizeBalances(balances),
        recentTransactions,
        infrastructure: multiCoinService.getInfrastructure(),
        startupModules: [
          "Mine-to-earn beta ledger rewards",
          "Provider-gated buy/onramp credit adapter",
          "Trading router built on the swap engine",
          "Store/vault lock workflow",
          "Burn and token-supply audit events",
          "Creator tips, checkout payments, and marketplace escrow",
          "Smart-contract adapter plan for EVM, BTC, Monero, and internal beta ledger rails",
        ],
      };
    } catch (error) {
      throw toClientError(error, "Unable to load crypto infrastructure.");
    }
  }),

  mineBlock: protectedProcedure
    .input(
      z.object({
        coin: coinSchema.default("SKY4444"),
        power: z.number().positive().max(250).default(1),
        memo: z.string().max(255).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await multiCoinService.mine(
          ctx,
          input.coin,
          input.power,
          input.memo ?? "User beta mining block reward"
        );
      } catch (error) {
        throw toClientError(error, "Unable to mine beta reward.");
      }
    }),

  buyCoin: protectedProcedure
    .input(
      z.object({
        coin: coinSchema.default("SKY4444"),
        fiatAmountUsd: z.number().positive().max(1_000_000),
        provider: z.string().max(80).default("beta-onramp"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await multiCoinService.buy(
          ctx,
          input.coin,
          input.fiatAmountUsd,
          input.provider
        );
      } catch (error) {
        throw toClientError(error, "Unable to run beta buy/onramp credit.");
      }
    }),

  tradeCoin: protectedProcedure
    .input(
      z.object({
        fromCoin: coinSchema,
        toCoin: coinSchema,
        amount: z.number().positive(),
        orderType: z.enum(["market", "limit"]).default("market"),
        limitPriceUsd: z.number().positive().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await multiCoinService.trade(
          ctx,
          input.fromCoin,
          input.toCoin,
          input.amount,
          input.orderType,
          input.limitPriceUsd
        );
      } catch (error) {
        throw toClientError(error, "Unable to execute beta trade.");
      }
    }),

  storeCoin: protectedProcedure
    .input(
      z.object({
        coin: coinSchema.default("SKY4444"),
        amount: z.number().positive(),
        vaultLabel: z.string().max(120).default("Sky Vault storage"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await multiCoinService.store(
          ctx,
          input.coin,
          input.amount,
          input.vaultLabel
        );
      } catch (error) {
        throw toClientError(error, "Unable to store beta coin in vault.");
      }
    }),

  burnCoin: protectedProcedure
    .input(
      z.object({
        coin: coinSchema.default("SKY4444"),
        amount: z.number().positive(),
        memo: z.string().max(255).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await multiCoinService.burn(
          ctx,
          input.coin,
          input.amount,
          input.memo
        );
      } catch (error) {
        throw toClientError(error, "Unable to burn beta coin.");
      }
    }),

  payWithCoin: protectedProcedure
    .input(
      z.object({
        coin: coinSchema.default("SKY4444"),
        amount: z.number().positive(),
        recipientId: z.number().int().positive().optional(),
        recipientAddress: z.string().min(3).max(160).optional(),
        memo: z.string().max(255).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await multiCoinService.pay(
          ctx,
          input.coin,
          input.amount,
          input.recipientId,
          input.recipientAddress,
          input.memo ?? "Beta checkout payment"
        );
      } catch (error) {
        throw toClientError(error, "Unable to send beta payment.");
      }
    }),

  smartContractPlan: protectedProcedure
    .input(
      z.object({
        action: cryptoActionSchema.default("pay"),
        coin: coinSchema.default("SKY4444"),
      })
    )
    .query(({ input }) =>
      multiCoinService.getSmartContractPlan(input.action, input.coin)
    ),

  executeUniversalCryptoAction: protectedProcedure
    .input(
      z.object({
        action: cryptoActionSchema,
        coin: coinSchema.default("SKY4444"),
        fromCoin: coinSchema.optional(),
        toCoin: coinSchema.optional(),
        amount: z.number().positive().optional(),
        fiatAmountUsd: z.number().positive().optional(),
        recipientId: z.number().int().positive().optional(),
        recipientAddress: z.string().min(3).max(160).optional(),
        memo: z.string().max(255).optional(),
        sellerId: z.number().int().positive().optional(),
        provider: z.string().max(80).default("beta-onramp"),
        power: z.number().positive().max(250).default(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        if (input.action === "mine")
          return multiCoinService.mine(
            ctx,
            input.coin,
            input.power,
            input.memo
          );
        if (input.action === "buy")
          return multiCoinService.buy(
            ctx,
            input.coin,
            input.fiatAmountUsd ?? input.amount ?? 25,
            input.provider,
            input.memo
          );
        if (input.action === "trade")
          return multiCoinService.trade(
            ctx,
            input.fromCoin ?? input.coin,
            input.toCoin ?? "USDT",
            input.amount ?? 1
          );
        if (input.action === "swap")
          return multiCoinService.swap(
            ctx,
            input.fromCoin ?? input.coin,
            input.toCoin ?? "USDT",
            input.amount ?? 1
          );
        if (input.action === "store")
          return multiCoinService.store(
            ctx,
            input.coin,
            input.amount ?? 1,
            input.memo ?? "Universal crypto storage"
          );
        if (input.action === "burn")
          return multiCoinService.burn(
            ctx,
            input.coin,
            input.amount ?? 1,
            input.memo
          );
        if (input.action === "tip") {
          if (!input.recipientId)
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "recipientId is required for tips.",
            });
          return multiCoinService.tip(
            ctx,
            input.recipientId,
            input.amount ?? 1,
            input.coin,
            input.memo
          );
        }
        if (input.action === "pay")
          return multiCoinService.pay(
            ctx,
            input.coin,
            input.amount ?? 1,
            input.recipientId,
            input.recipientAddress,
            input.memo
          );
        return multiCoinService.createEscrow(
          ctx,
          input.sellerId,
          input.coin,
          input.amount ?? 1,
          input.memo
        );
      } catch (error) {
        throw toClientError(error, "Universal beta crypto action failed.");
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
        return await multiCoinService.transfer(
          ctx,
          input.coin,
          input.amount,
          input.recipientId,
          input.recipientAddress,
          "transfer"
        );
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
        return await multiCoinService.tip(
          ctx,
          input.recipientId,
          input.amount,
          input.coin,
          input.memo
        );
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
      const received =
        input.fromCoin === input.toCoin
          ? 0
          : (input.amount * from.usd) / to.usd;
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
        return await multiCoinService.swap(
          ctx,
          input.fromCoin,
          input.toCoin,
          input.amount,
          input.slippage
        );
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
        return await multiCoinService.createEscrow(
          ctx,
          input.sellerId,
          input.coin,
          input.amount,
          input.memo
        );
      } catch (error) {
        throw toClientError(error, "Unable to create beta escrow hold.");
      }
    }),

  getTrumpBalance: protectedProcedure.query(async ({ ctx }) => {
    const balances = await multiCoinService.getBalances(ctx.user.id);
    const trump = balances.find(item => item.coin === "TRUMP");
    return {
      balance: Number.parseFloat(trump?.amount ?? "0"),
      usdValue: trump?.usdValue ?? 0,
    };
  }),

  sendTrump: protectedProcedure
    .input(z.object({ to: z.string(), amount: z.number().positive() }))
    .mutation(async ({ ctx, input }) => {
      try {
        return await multiCoinService.transfer(
          ctx,
          "TRUMP",
          input.amount,
          undefined,
          input.to,
          "transfer"
        );
      } catch (error) {
        throw toClientError(error, "Unable to send TRUMP beta transfer.");
      }
    }),
});
