import { z } from 'zod';
import { router, publicProcedure } from '../_core/trpc';
import { TRPCError } from '../_core/trpc';
import {
  CharityCauseSchema,
  JoinGameInput,
  RecordDonationInput,
  MintNFTInput,
  MOCK_CAUSES,
  MOCK_AGENT_LOGS,
  calculateImpact,
  generateTxHash,
} from '../../shared/trump-charity';

// TRUMP Charity Gaming Router - Production Grade
// Extends SkyCoin444 with ShadowChat Web3 Playground vision
// TODO: Replace mocks with Drizzle queries to existing DB (portfolios, users, etc.)

export const charityRouter = router({
  listCauses: publicProcedure
    .query(async () => {
      // In prod: await db.select().from(charityCauses).where(...)
      return MOCK_CAUSES;
    }),

  joinGameSession: publicProcedure
    .input(JoinGameInput)
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.user?.id ?? 'demo-user';
      const session = {
        id: crypto.randomUUID(),
        causeId: input.causeId,
        userId,
        gameType: input.gameType,
        entryFeeTrump: input.entryFeeTrump,
        status: 'active' as const,
        startedAt: new Date(),
        impactScore: 0,
        participants: 1,
      };
      // TODO: Persist to DB + deduct TRUMP from user portfolio
      // Emit WS event for real-time lobby update
      return { success: true, session, message: `Joined ${input.gameType} for cause! TRUMP deducted.` };
    }),

  recordDonation: publicProcedure
    .input(RecordDonationInput)
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.user?.id ?? 'demo-user';
      const cause = MOCK_CAUSES.find(c => c.id === input.causeId);
      if (!cause) throw new TRPCError({ code: 'NOT_FOUND', message: 'Cause not found' });

      const multiplier = cause.trumpMultiplier;
      const impact = calculateImpact(input.amountTrump, multiplier);
      const txHash = generateTxHash();

      const donation = {
        id: crypto.randomUUID(),
        userId,
        causeId: input.causeId,
        amountTrump: input.amountTrump,
        impactMultiplier: multiplier,
        txHash,
        timestamp: new Date(),
        message: input.message,
      };

      // Update mock currentAmount (in prod: DB transaction)
      cause.currentAmount += input.amountTrump;

      return {
        success: true,
        donation,
        impactAdded: impact,
        txProof: txHash,
        message: `Thank you! Your ${input.amountTrump} TRUMP created ${impact} impact points.`,
      };
    }),

  getImpactMetrics: publicProcedure
    .query(async () => {
      const totalRaised = MOCK_CAUSES.reduce((sum, c) => sum + c.currentAmount, 0);
      const totalImpact = MOCK_CAUSES.reduce((sum, c) => sum + calculateImpact(c.currentAmount, c.trumpMultiplier), 0);
      return {
        totalRaisedTrump: totalRaised,
        totalImpactPoints: totalImpact,
        causesSupported: MOCK_CAUSES.length,
        topCause: MOCK_CAUSES.sort((a, b) => b.currentAmount - a.currentAmount)[0],
        multiplierAvg: MOCK_CAUSES.reduce((sum, c) => sum + c.trumpMultiplier, 0) / MOCK_CAUSES.length,
      };
    }),

  mintStoryNFT: publicProcedure
    .input(MintNFTInput)
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.user?.id ?? 'demo-user';
      const nft = {
        id: crypto.randomUUID(),
        tokenId: 'TRUMP-' + Date.now().toString(36).toUpperCase(),
        ownerId: userId,
        causeId: input.causeId,
        storyTitle: input.storyTitle,
        storyContent: input.storyContent,
        coAuthors: input.coAuthorIds ?? [userId],
        imageUrl: `https://picsum.photos/id/${Math.floor(Math.random() * 1000)}/600/400`,
        rarity: input.coAuthorIds && input.coAuthorIds.length > 1 ? 'legendary' : 'rare',
        mintedAt: new Date(),
        trumpValueLocked: 50, // Example locked value
        metadataUri: `ipfs://Qm${crypto.randomUUID().replace(/-/g, '')}`,
      };
      return { success: true, nft, message: 'Impact Story NFT minted! View in your vault.' };
    }),

  getMultiAgentLog: publicProcedure
    .query(async () => {
      return MOCK_AGENT_LOGS;
    }),
});

// Integration note for main tRPC:
// In server/_core/index.ts or trpc.ts: appRouter = router({ ..., charity: charityRouter })
// Then expose via trpc.charity.listCauses etc.