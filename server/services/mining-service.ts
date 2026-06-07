/**
 * Mining Service - SKY4444 Multi-Coin Mining Infrastructure
 * Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC
 * 
 * Supports: SKY4444, Shadow, BTC (simulation), DOGE, Monero
 */

import { createHash } from 'crypto';
import { MINING_CONFIGS, SUPPORTED_COINS } from '../lib/crypto-infrastructure';

export interface MiningSession {
  id: string;
  userId: string;
  coinSymbol: string;
  startTime: Date;
  endTime?: Date;
  hashRate: number;
  blocksFound: number;
  totalReward: number;
  status: 'active' | 'paused' | 'completed';
}

export interface MinedBlock {
  index: number;
  timestamp: Date;
  previousHash: string;
  hash: string;
  nonce: number;
  minerUserId: string;
  reward: number;
  coinSymbol: string;
  difficulty: number;
}

export interface MiningStats {
  totalBlocks: number;
  totalRewards: number;
  currentDifficulty: number;
  networkHashRate: number;
  nextHalving: number;
  currentReward: number;
}

// =============================================================================
// MINING ENGINE
// =============================================================================

class MiningEngine {
  private activeSessions: Map<string, MiningSession> = new Map();
  private blockchains: Map<string, MinedBlock[]> = new Map();

  constructor() {
    // Initialize blockchains for each mineable coin
    for (const [symbol, coin] of Object.entries(SUPPORTED_COINS)) {
      if (coin.features.mining) {
        this.blockchains.set(symbol, [this.createGenesisBlock(symbol)]);
      }
    }
  }

  private createGenesisBlock(coinSymbol: string): MinedBlock {
    return {
      index: 0,
      timestamp: new Date('2026-01-01'),
      previousHash: '0'.repeat(64),
      hash: createHash('sha256').update(`genesis-${coinSymbol}-sky4444`).digest('hex'),
      nonce: 0,
      minerUserId: 'system',
      reward: 0,
      coinSymbol,
      difficulty: MINING_CONFIGS[coinSymbol]?.difficulty || 4,
    };
  }

  // Start a mining session
  startMining(userId: string, coinSymbol: string): MiningSession {
    const config = MINING_CONFIGS[coinSymbol];
    if (!config) throw new Error(`Mining not supported for ${coinSymbol}`);

    const session: MiningSession = {
      id: `mine_${Date.now()}_${userId}`,
      userId,
      coinSymbol,
      startTime: new Date(),
      hashRate: Math.random() * 100 + 50, // Simulated hash rate
      blocksFound: 0,
      totalReward: 0,
      status: 'active',
    };

    this.activeSessions.set(session.id, session);
    return session;
  }

  // Stop a mining session
  stopMining(sessionId: string): MiningSession {
    const session = this.activeSessions.get(sessionId);
    if (!session) throw new Error('Mining session not found');

    session.endTime = new Date();
    session.status = 'completed';
    this.activeSessions.delete(sessionId);
    return session;
  }

  // Mine a block (proof of work simulation)
  mineBlock(userId: string, coinSymbol: string): MinedBlock | null {
    const config = MINING_CONFIGS[coinSymbol];
    if (!config) return null;

    const chain = this.blockchains.get(coinSymbol) || [];
    const lastBlock = chain[chain.length - 1];
    if (!lastBlock) return null;

    const currentReward = this.calculateReward(coinSymbol, chain.length);
    const difficulty = config.difficulty;

    // Simulate proof of work
    let nonce = 0;
    let hash = '';
    const target = '0'.repeat(difficulty);

    do {
      nonce++;
      const data = `${lastBlock.hash}${Date.now()}${nonce}${userId}`;
      hash = createHash('sha256').update(data).digest('hex');
    } while (!hash.startsWith(target) && nonce < 1000000);

    if (!hash.startsWith(target)) return null;

    const newBlock: MinedBlock = {
      index: chain.length,
      timestamp: new Date(),
      previousHash: lastBlock.hash,
      hash,
      nonce,
      minerUserId: userId,
      reward: currentReward,
      coinSymbol,
      difficulty,
    };

    chain.push(newBlock);
    this.blockchains.set(coinSymbol, chain);

    // Update active session
    for (const session of this.activeSessions.values()) {
      if (session.userId === userId && session.coinSymbol === coinSymbol) {
        session.blocksFound++;
        session.totalReward += currentReward;
      }
    }

    return newBlock;
  }

  // Calculate current mining reward (with halving)
  calculateReward(coinSymbol: string, blockHeight: number): number {
    const config = MINING_CONFIGS[coinSymbol];
    if (!config) return 0;

    if (config.halvingInterval === 0) return config.reward;

    const halvings = Math.floor(blockHeight / config.halvingInterval);
    return config.reward / Math.pow(2, halvings);
  }

  // Get mining statistics
  getStats(coinSymbol: string): MiningStats {
    const config = MINING_CONFIGS[coinSymbol];
    const chain = this.blockchains.get(coinSymbol) || [];

    if (!config) {
      return {
        totalBlocks: 0,
        totalRewards: 0,
        currentDifficulty: 0,
        networkHashRate: 0,
        nextHalving: 0,
        currentReward: 0,
      };
    }

    const totalRewards = chain.reduce((sum, block) => sum + block.reward, 0);
    const currentReward = this.calculateReward(coinSymbol, chain.length);
    const nextHalving = config.halvingInterval > 0
      ? config.halvingInterval - (chain.length % config.halvingInterval)
      : 0;

    return {
      totalBlocks: chain.length,
      totalRewards,
      currentDifficulty: config.difficulty,
      networkHashRate: this.activeSessions.size * 75, // Simulated
      nextHalving,
      currentReward,
    };
  }

  // Get active sessions for a user
  getUserSessions(userId: string): MiningSession[] {
    return Array.from(this.activeSessions.values())
      .filter(s => s.userId === userId);
  }

  // Get all active sessions count
  getActiveSessionCount(): number {
    return this.activeSessions.size;
  }
}

// Singleton instance
export const miningEngine = new MiningEngine();

export default miningEngine;
