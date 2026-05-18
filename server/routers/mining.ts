// Production-grade Mining Router - Real DB logic

import { z } from 'zod';
import { privateProcedure, router } from '../_core/trpc';
import { db } from '../../drizzle';
import { mining_sessions, users } from '../../drizzle/schema';
import { eq } from 'drizzle-orm';

export const miningRouter = router({
  startMining: privateProcedure
    .input(z.object({ coin: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const [session] = await db.insert(mining_sessions).values({
        userId: ctx.user.id,
        coin: input.coin,
        hashRate: Math.floor(Math.random() * 100) + 50,
        blocksFound: 0,
        balance: 0,
        startedAt: new Date(),
        status: 'active'
      }).returning();
      return { success: true, sessionId: session.id };
    }),

  recordBlockFound: privateProcedure
    .input(z.object({ sessionId: z.number() }))
    .mutation(async ({ ctx }) => {
      await db.transaction(async (tx) => {
        await tx.update(mining_sessions)
          .set({ blocksFound: sql`${mining_sessions.blocksFound} + 1` })
          .where(eq(mining_sessions.id, input.sessionId));

        await tx.update(users)
          .set({ balance: sql`${users.balance} + 50` })
          .where(eq(users.id, ctx.user.id));
      });
      return { success: true, reward: 50 };
    }),

  getMiningStats: privateProcedure.query(async ({ ctx }) => {
    return await db.query.mining_sessions.findMany({
      where: eq(mining_sessions.userId, ctx.user.id)
    });
  })
});