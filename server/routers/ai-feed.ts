import { z } from "zod";
import { desc, eq, and } from "drizzle-orm";
import { router, protectedProcedure } from "../_core/trpc";
import { getDb } from "../db";
import { aiTradingSignals } from "../../drizzle/schema";
import { generateTradingSignal } from "../services/hope-ai";

export const aiFeedRouter = router({
  generateSignal: protectedProcedure
    .input(z.object({
      symbol: z.string().min(1).max(20),
      timeframe: z.string().min(2).max(32).default("intraday"),
      price: z.number().positive().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const signal = generateTradingSignal(input.symbol, input.timeframe, input.price);
      const db = await getDb();

      if (db) {
        await db.insert(aiTradingSignals).values({
          userId: ctx.user.id,
          symbol: signal.symbol,
          action: signal.action,
          timeframe: signal.timeframe,
          confidence: signal.confidence,
          riskLevel: signal.riskLevel,
          entryPrice: signal.entryPrice,
          targetPrice: signal.targetPrice,
          stopLoss: signal.stopLoss,
          rationale: signal.rationale,
          source: signal.source,
          status: "active",
          expiresAt: signal.expiresAt,
        });
      }

      return { ...signal, persisted: Boolean(db) };
    }),

  latest: protectedProcedure
    .input(z.object({ limit: z.number().min(1).max(100).default(25), symbol: z.string().max(20).optional() }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) {
        return [generateTradingSignal(input.symbol ?? "SKY4444"), generateTradingSignal("BTC"), generateTradingSignal("ETH")];
      }

      const base = db.select().from(aiTradingSignals);
      if (input.symbol) {
        return base
          .where(and(eq(aiTradingSignals.userId, ctx.user.id), eq(aiTradingSignals.symbol, input.symbol.toUpperCase())))
          .orderBy(desc(aiTradingSignals.createdAt))
          .limit(input.limit);
      }

      return base
        .where(eq(aiTradingSignals.userId, ctx.user.id))
        .orderBy(desc(aiTradingSignals.createdAt))
        .limit(input.limit);
    }),

  dismiss: protectedProcedure
    .input(z.object({ signalId: z.number().int().positive() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) return { success: false, reason: "Database is not configured." };
      await db
        .update(aiTradingSignals)
        .set({ status: "dismissed" })
        .where(and(eq(aiTradingSignals.id, input.signalId), eq(aiTradingSignals.userId, ctx.user.id)));
      return { success: true };
    }),
});
