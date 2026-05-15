import { router, protectedProcedure } from '../_core/trpc';
import { z } from 'zod';

export const notificationsRouter = router({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return [
      { id: 'n1', type: 'charity', title: 'Your donation created 340 impact points!', timestamp: new Date(), read: false },
      { id: 'n2', type: 'nft', title: 'New legendary Story NFT minted by @player42', timestamp: new Date(Date.now() - 3600000), read: true },
      { id: 'n3', type: 'system', title: 'TRUMP price spiked 12% - check trading', timestamp: new Date(Date.now() - 7200000), read: true },
    ];
  }),
  markRead: protectedProcedure.input(z.object({ id: z.string() })).mutation(async () => ({ success: true })),
});