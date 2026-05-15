import { z } from 'zod';

// TRUMP Charity Gaming & NFT Storytelling Schemas
// Production-grade validation for ShadowChat Web3 Playground

export const CharityCauseSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(3).max(100),
  description: z.string().min(10).max(500),
  category: z.enum(['education', 'environment', 'health', 'poverty', 'animals']),
  targetAmount: z.number().positive(),
  currentAmount: z.number().min(0),
  trumpMultiplier: z.number().min(1).max(3), // TRUMP holdings boost
  verified: z.boolean().default(true),
  imageUrl: z.string().url().optional(),
});

export type CharityCause = z.infer<typeof CharityCauseSchema>;

export const GameSessionSchema = z.object({
  id: z.string().uuid(),
  causeId: z.string().uuid(),
  userId: z.string().uuid(),
  gameType: z.enum(['prediction', 'trivia', 'slots', 'story-coop']),
  entryFeeTrump: z.number().positive().default(10),
  status: z.enum(['active', 'completed', 'cancelled']),
  startedAt: z.date(),
  endedAt: z.date().optional(),
  impactScore: z.number().min(0).default(0),
  participants: z.number().int().min(1).default(1),
});

export type GameSession = z.infer<typeof GameSessionSchema>;

export const DonationSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  causeId: z.string().uuid(),
  amountTrump: z.number().positive(),
  impactMultiplier: z.number().min(1),
  txHash: z.string().optional(), // Simulated on-chain proof
  timestamp: z.date(),
  message: z.string().max(200).optional(),
});

export type Donation = z.infer<typeof DonationSchema>;

export const ImpactNFTSchema = z.object({
  id: z.string().uuid(),
  tokenId: z.string(),
  ownerId: z.string().uuid(),
  causeId: z.string().uuid(),
  storyTitle: z.string().min(5).max(80),
  storyContent: z.string().min(20).max(2000),
  coAuthors: z.array(z.string().uuid()).default([]), // Multi-player collaborative
  imageUrl: z.string().url(),
  rarity: z.enum(['common', 'rare', 'legendary']).default('common'),
  mintedAt: z.date(),
  trumpValueLocked: z.number().min(0),
  metadataUri: z.string().url().optional(), // IPFS-style
});

export type ImpactNFT = z.infer<typeof ImpactNFTSchema>;

export const MultiAgentLogSchema = z.object({
  id: z.string().uuid(),
  agent: z.enum(['manus-agent', 'grok', 'chatgpt', 'other']),
  action: z.string().min(5),
  feature: z.string(),
  timestamp: z.date(),
  impact: z.string().optional(),
});

export type MultiAgentLog = z.infer<typeof MultiAgentLogSchema>;

// Input schemas for tRPC

export const JoinGameInput = z.object({
  causeId: z.string().uuid(),
  gameType: z.enum(['prediction', 'trivia', 'slots', 'story-coop']),
  entryFeeTrump: z.number().positive().default(10),
});

export const RecordDonationInput = z.object({
  causeId: z.string().uuid(),
  amountTrump: z.number().positive().min(1),
  message: z.string().max(200).optional(),
});

export const MintNFTInput = z.object({
  causeId: z.string().uuid(),
  storyTitle: z.string().min(5).max(80),
  storyContent: z.string().min(20).max(2000),
  coAuthorIds: z.array(z.string().uuid()).optional(),
});

// Mock data for demo (replace with Drizzle queries in production)
export const MOCK_CAUSES: CharityCause[] = [
  {
    id: 'c1',
    name: 'Clean Water for 10k Kids',
    description: 'Provide sustainable clean water solutions in rural Africa and Asia.',
    category: 'health',
    targetAmount: 50000,
    currentAmount: 12450,
    trumpMultiplier: 2.5,
    verified: true,
    imageUrl: 'https://picsum.photos/id/1015/400/300',
  },
  {
    id: 'c2',
    name: 'Reforest 1 Million Trees',
    description: 'Combat climate change by planting native trees in deforested regions.',
    category: 'environment',
    targetAmount: 75000,
    currentAmount: 38200,
    trumpMultiplier: 1.8,
    verified: true,
    imageUrl: 'https://picsum.photos/id/107/400/300',
  },
  {
    id: 'c3',
    name: 'AI Education for Underserved Youth',
    description: 'Equip 5,000 students with AI literacy and coding skills.',
    category: 'education',
    targetAmount: 30000,
    currentAmount: 8900,
    trumpMultiplier: 3.0,
    verified: true,
    imageUrl: 'https://picsum.photos/id/201/400/300',
  },
];

export const MOCK_AGENT_LOGS: MultiAgentLog[] = [
  { id: 'log1', agent: 'manus-agent', action: 'Core infrastructure + 18 feature page stubs + real-time WS', feature: 'Trading Dashboard, ShadowChat Feed, Vaults', timestamp: new Date('2026-04-28T10:00:00Z'), impact: 'Beta v4 foundation' },
  { id: 'log2', agent: 'grok', action: 'Added TRUMP Charity Gaming & NFT Storytelling Hub with multi-agent meta', feature: 'Charity Impact, Story NFTs, Agent Coordination', timestamp: new Date(), impact: 'Complementary unique value layer' },
];

// Utility: Calculate TRUMP-boosted impact
export function calculateImpact(amountTrump: number, multiplier: number): number {
  return Math.floor(amountTrump * multiplier * 1.1); // 10% bonus for verified
}

export function generateTxHash(): string {
  return '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
}