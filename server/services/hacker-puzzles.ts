/**
 * Hacker CTF Puzzles — Billion-Dollar Hacker Education
 * ─────────────────────────────────────────────────────────────────────────────
 * Features: 10 CTF challenges, Leaderboard, Token Rewards.
 */

export const CTF_CHALLENGES = [
  { id: 1, title: 'SHADOW_KERNEL_BYPASS', difficulty: 'HARD', reward: 500 },
  { id: 2, title: 'SQL_INJECTION_WARRIOR', difficulty: 'MEDIUM', reward: 250 },
  { id: 3, title: 'METADATA_STRIPPER', difficulty: 'EASY', reward: 100 },
  { id: 4, title: 'WIRE_PROTOCOL_CRACK', difficulty: 'INSANE', reward: 1000 },
  { id: 5, title: 'MINI_TOR_DISCOVERY', difficulty: 'HARD', reward: 500 },
  // ... up to 10
];

export class HackerPuzzles {
  public async submitFlag(challengeId: number, flag: string, userId: string) {
    const challenge = CTF_CHALLENGES.find(c => c.id === challengeId);
    if (!challenge) return { status: 'ERROR', message: 'INVALID_CHALLENGE' };

    // In a real system, this would check against a hashed flag in the DB
    const isCorrect = flag === `FLAG{${challenge.title}_v10}`;
    
    if (isCorrect) {
      console.log(`[CTF]: User ${userId} solved ${challenge.title}. Rewarding ${challenge.reward} SKY4444.`);
      return { status: 'SUCCESS', reward: challenge.reward };
    }

    return { status: 'FAILED', message: 'INCORRECT_FLAG' };
  }
}

export const hackerPuzzles = new HackerPuzzles();
