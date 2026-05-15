import { z } from 'zod';
export const ProposalSchema = z.object({ id: z.string().uuid(), title: z.string(), description: z.string(), votesFor: z.number(), votesAgainst: z.number(), endTime: z.date(), status: z.enum(['active', 'passed', 'failed']) });
export type Proposal = z.infer<typeof ProposalSchema>;
export const MOCK_PROPOSALS: Proposal[] = [{ id: 'p1', title: 'Increase Charity Matching to 2x TRUMP', description: 'Boost impact for all donations', votesFor: 1240, votesAgainst: 320, endTime: new Date(Date.now() + 86400000 * 3), status: 'active' }];