import { router, protectedProcedure } from '../_core/trpc';
import { z } from 'zod';
export const nftMarketplaceRouter = router({
  listListings: protectedProcedure.query(() => [{ id: 'nft1', title: 'Clean Water Impact Story #42', priceTrump: 150, rarity: 'legendary' }]),
  buy: protectedProcedure.input(z.object({ listingId: z.string() })).mutation(() => ({ success: true, tx: '0x...' })),
});