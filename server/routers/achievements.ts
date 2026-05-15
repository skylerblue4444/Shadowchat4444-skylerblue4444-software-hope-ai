import { router, publicProcedure, protectedProcedure } from './_core/trpc';
import { z } from 'zod';

export const achievementsRouter = router({
  getUserAchievements: protectedProcedure.query(async ({ ctx }) => {
    // Mock - replace with DB
    return [
      { id: 'ach1', name: 'First Trade', description: 'Complete your first trade', unlocked: true, xp: 50 },
      { id: 'ach2', name: 'Charity Champion', description: 'Donate 100+ TRUMP to causes', unlocked: false, xp: 200 },
      { id: 'ach3', name: 'Storyteller', description: 'Mint 5 Impact Story NFTs', unlocked: false, xp: 150 },
      { id: 'ach4', name: 'WeChat Pioneer', description: 'Launch 3 Mini-Programs', unlocked: false, xp: 100 },
    ];
  }),
  unlock: protectedProcedure.input(z.object({ achievementId: z.string() })).mutation(async () => ({ success: true })),
});