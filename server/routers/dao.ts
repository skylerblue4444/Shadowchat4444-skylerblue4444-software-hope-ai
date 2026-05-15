import { router, protectedProcedure } from '../_core/trpc';
import { z } from 'zod';
import { MOCK_PROPOSALS } from '../../shared/dao';
export const daoRouter = router({ listProposals: protectedProcedure.query(() => MOCK_PROPOSALS), vote: protectedProcedure.input(z.object({ proposalId: z.string(), vote: z.enum(['for', 'against']) })).mutation(() => ({ success: true })) });