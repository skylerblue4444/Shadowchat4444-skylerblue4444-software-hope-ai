import { z } from 'zod';

export const MiniProgramSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2).max(50),
  description: z.string().max(200),
  category: z.enum(['charity', 'nft', 'trading', 'social', 'game', 'utility']),
  icon: z.string(),
  entryFeeTrump: z.number().min(0).default(0),
  isActive: z.boolean().default(true),
  developer: z.string().default('SkyCoin Team'),
});

export type MiniProgram = z.infer<typeof MiniProgramSchema>;

export const MOCK_MINI_PROGRAMS: MiniProgram[] = [
  { id: 'mp1', name: 'Charity Raffle', description: 'Daily TRUMP raffle for verified causes', category: 'charity', icon: '🎟️', entryFeeTrump: 5, isActive: true },
  { id: 'mp2', name: 'NFT Story Forge', description: 'Collaborative story minting studio', category: 'nft', icon: '📖', entryFeeTrump: 10, isActive: true },
  { id: 'mp3', name: 'TRUMP Staking Pool', description: 'Earn yield while supporting impact', category: 'utility', icon: '💎', entryFeeTrump: 0, isActive: true },
  { id: 'mp4', name: 'Impact Trivia', description: 'Test your knowledge, earn TRUMP for charity', category: 'game', icon: '🧠', entryFeeTrump: 2, isActive: true },
  { id: 'mp5', name: 'Social Tip Jar', description: 'Send TRUMP tips in ShadowChat', category: 'social', icon: '💬', entryFeeTrump: 0, isActive: true },
];