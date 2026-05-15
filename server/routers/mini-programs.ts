import { router, publicProcedure, protectedProcedure } from '../_core/trpc';
import { z } from 'zod';
import { MOCK_MINI_PROGRAMS } from '../../shared/mini-programs';

export const miniProgramsRouter = router({
  list: publicProcedure.query(() => MOCK_MINI_PROGRAMS),
  launch: protectedProcedure
    .input(z.object({ programId: z.string().uuid() }))
    .mutation(async ({ input, ctx }) => {
      const program = MOCK_MINI_PROGRAMS.find(p => p.id === input.programId);
      if (!program) throw new Error('Program not found');
      // In prod: deduct entryFeeTrump from user, launch session
      return { success: true, program, sessionId: crypto.randomUUID(), message: `Launched ${program.name}!` };
    }),
});