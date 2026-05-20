import { and, desc, eq, sql } from "drizzle-orm";
import { z } from "zod";
import { holdings, tokenSupplyEvents, transactions, users } from "../../drizzle/schema";
import { adminProcedure, protectedProcedure, router, TRPCError } from "../_core/trpc";
import { getDb } from "../db";
import { multiCoinService, supportedCoins } from "../lib/multi-coin";
import { recordSettlementEntry, settlementKey } from "../lib/settlement-ledger";

const coinSchema = z.enum(supportedCoins);
const betaRewards: Record<(typeof supportedCoins)[number], number> = {
  SKY4444: 44.44,
  TRUMP: 4.44,
  DOGE: 44,
  USDT: 1,
  BTC: 0.00000444,
  MONERO: 0.0044,
  SHADOW: 7.77,
};

async function creditBetaBalance(userId: number, coin: (typeof supportedCoins)[number], amount: number, memo: string) {
  const db = await getDb();
  if (!db) throw new TRPCError({ code: "PRECONDITION_FAILED", message: "Database is required for beta reward claims." });
  const amountText = amount.toFixed(8);

  await db.transaction(async (tx) => {
    if (coin === "SKY4444") {
      await tx.update(users).set({ balance: sql`${users.balance} + ${amountText}` }).where(eq(users.id, userId));
    } else {
      const [existing] = await tx.select().from(holdings).where(and(eq(holdings.userId, userId), eq(holdings.asset, coin))).limit(1);
      if (existing) {
        await tx.update(holdings).set({ amount: sql`${holdings.amount} + ${amountText}` }).where(eq(holdings.id, existing.id));
      } else {
        await tx.insert(holdings).values({ userId, asset: coin, amount: amountText });
      }
    }

    const [transaction] = await tx.insert(transactions).values({
      userId,
      type: "reward",
      token: coin,
      amount: amountText,
      status: "complete",
      memo,
    }).$returningId();

    await recordSettlementEntry(tx, {
      idempotencyKey: settlementKey("skycoin-reward", userId, coin, amountText, memo),
      transactionId: transaction.id,
      userId,
      source: "wallet",
      direction: "credit",
      token: coin,
      amount: amountText,
      providerStatus: "beta_ledger",
      settlementStatus: "recorded",
      reviewStatus: "none",
      memo,
      audit: {
        router: "skycoin.claimBetaReward",
        rewardType: "beta-feature-claim",
        supplyEvent: "airdrop",
        providerGate: "internal beta ledger only; no withdrawal or external payment rail executed",
      },
    });

    await tx.insert(tokenSupplyEvents).values({
      actorId: userId,
      token: coin,
      eventType: "airdrop",
      amount: amountText,
      memo,
      status: "posted",
    });
  });

  return { success: true, coin, amount: amountText };
}

export const skycoinRouter = router({
  getEconomyStatus: protectedProcedure.query(async ({ ctx }) => {
    const balances = await multiCoinService.getBalances(ctx.user.id);
    const db = await getDb();
    const recentEvents = db
      ? await db.select().from(tokenSupplyEvents).orderBy(desc(tokenSupplyEvents.createdAt)).limit(20)
      : [];

    const sky = balances.find((item) => item.coin === "SKY4444");
    const shadow = balances.find((item) => item.coin === "SHADOW");
    return {
      balances,
      skycoin4444: sky,
      shadowCoin: shadow,
      recentEvents,
      productionGate: {
        liveMoneyMovement: false,
        reason: "Real custody, withdrawals, payments, and external chain operations stay disabled until secure provider credentials and compliance checks are configured.",
      },
      betaCapabilities: ["wallet ledger", "creator tips", "marketplace escrow", "mining rewards", "staking records", "admin supply-event audit"],
    };
  }),

  claimBetaReward: protectedProcedure
    .input(z.object({ coin: coinSchema.default("SKY4444"), reason: z.string().max(120).default("daily-live-feature-reward") }))
    .mutation(async ({ ctx, input }) => creditBetaBalance(ctx.user.id, input.coin, betaRewards[input.coin], `Beta ${input.reason} claim`)),

  recordSupplyEvent: adminProcedure
    .input(
      z.object({
        token: coinSchema.default("SKY4444"),
        eventType: z.enum(["mint", "burn", "airdrop", "reserve", "charity", "fee"]),
        amount: z.number().positive(),
        memo: z.string().max(255).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "PRECONDITION_FAILED", message: "Database is required for supply event controls." });
      await db.insert(tokenSupplyEvents).values({
        actorId: ctx.user.id,
        token: input.token,
        eventType: input.eventType,
        amount: input.amount.toFixed(8),
        memo: input.memo,
        status: "posted",
      });
      return { success: true };
    }),
});
