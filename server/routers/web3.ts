import { router, protectedProcedure } from '../_core/trpc';
import { z } from 'zod';
export const web3Router = router({
  getTrumpBalance: protectedProcedure.query(() => ({ balance: 2847.5, usdValue: 2420 })),
  sendTrump: protectedProcedure.input(z.object({ to: z.string(), amount: z.number() })).mutation(() => ({ txHash: '0x' + Math.random().toString(16).slice(2) })),
});