// Production Grade Mining Router
import { z } from "zod";
import { router, protectedProcedure } from "../_core/trpc";
import { db } from "../db";
import { miningSessions, users } from "../../drizzle/schema";
import { eq, and, sql } from "drizzle-orm";

export const miningRouter = router({
  startMining: protectedProcedure
    .input(z.object({ coin: z.enum(["SKY4444", "TRUMP", "DOGE", "USDT", "BTC", "MONERO"]) }))
    .mutation(async ({ ctx, input }) => {
      const [session] = await db.insert(miningSessions).values({
        userId: ctx.user.id,
        coin: input.coin,
        hashRate: "0",
        blocksFound: 0,
        balance: "0",
        startedAt: new Date(),
        status: "active",
      }).returning();

      return { success: true, sessionId: session.id };
    }),

  recordBlockFound: protectedProcedure
    .input(z.object({ sessionId: z.number(), coin: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const reward = input.coin === "SKY4444" ? "50" : "25";

      await db.transaction(async (tx) => {
        await tx.update(miningSessions)
          .set({ 
            blocksFound: sql`blocksFound + 1`,
            balance: sql`balance + ${reward}` 
          })
          .where(and(
            eq(miningSessions.id, input.sessionId),
            eq(miningSessions.userId, ctx.user.id)
          ));

        await tx.update(users)
          .set({ balance: sql`balance + ${reward}` })
          .where(eq(users.id, ctx.user.id));
      });

      return { success: true, reward };
    }),
});