// server/routers/mining.ts
import { z } from "zod";
import { router, protectedProcedure } from "../_core/trpc";
import { db } from "../db";
import { miningSessions, users } from "../../drizzle/schema";
import { eq, and, sql } from "drizzle-orm";

export const miningRouter = router({
  startMining: protectedProcedure
    .input(z.object({ 
      coin: z.enum(["SKY4444", "TRUMP", "DOGE", "USDT", "BTC"]) 
    }))
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

      return { 
        success: true, 
        sessionId: session.id, 
        message: `Mining started for ${input.coin}` 
      };
    }),

  recordBlockFound: protectedProcedure
    .input(z.object({ sessionId: z.number(), coin: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const reward = input.coin === "SKY4444" ? "50" : input.coin === "TRUMP" ? "25" : "15";

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

      return { success: true, reward, message: `Block found! +${reward} ${input.coin}` };
    }),

  getActiveSessions: protectedProcedure.query(async ({ ctx }) => {
    return await db.query.miningSessions.findMany({
      where: eq(miningSessions.userId, ctx.user.id),
      orderBy: (sessions, { desc }) => [desc(sessions.startedAt)],
    });
  }),
});