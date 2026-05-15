import { router, protectedProcedure } from '../_core/trpc';
import { z } from 'zod';

export const achievementsRouter = router({
  getUserAchievements: protectedProcedure.query(async ({ ctx }) => {
    return [
      { id: 'ach1', name: 'First Trade', description: 'Complete your first trade', unlocked: true, xp: 50 },
      { id: 'ach2', name: 'Charity Champion', description: 'Donate 100+ TRUMP to causes', unlocked: false, xp: 200 },
      { id: 'ach3', name: 'Storyteller', description: 'Mint 5 Impact Story NFTs', unlocked: false, xp: 150 },
      { id: 'ach4', name: 'WeChat Pioneer', description: 'Launch 3 Mini-Programs', unlocked: false, xp: 100 },
      { id: 'ach5', name: 'Diamond Hands', description: 'Hold TRUMP for 30+ days', unlocked: false, xp: 300 },
      { id: 'ach6', name: 'Community Builder', description: 'Post 50 times in boards', unlocked: false, xp: 150 },
      { id: 'ach7', name: 'IT Pro', description: 'Book 3 IT consultations', unlocked: false, xp: 100 },
      { id: 'ach8', name: 'Marketplace Maven', description: 'Complete 5 marketplace orders', unlocked: false, xp: 200 },
    ];
  }),
  unlock: protectedProcedure.input(z.object({ achievementId: z.string() })).mutation(async () => ({ success: true })),
});
