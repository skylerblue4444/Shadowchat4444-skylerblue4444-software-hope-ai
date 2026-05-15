/**
 * ShadowChat Mining Web Worker
 * Real SHA-256 double-hash proof-of-work computation
 * Supports: BTC, DOGE, TRUMP, SKY4444, USDT (SHA-256d), Monero (keccak)
 *
 * This worker runs in a separate thread and performs actual hash computations.
 */

export interface MineMessage {
  type: 'start' | 'stop' | 'status';
  coin?: string;
  difficulty?: number;
}

export interface MineResult {
  type: 'hash' | 'block' | 'stats' | 'error';
  coin: string;
  hash: string;
  nonce: number;
  hashRate: number;
  totalHashes: number;
  reward: number;
  walletBalance: number;
  difficulty: number;
  found: boolean;
  timestamp: number;
}

// Real SHA-256 using SubtleCrypto (available in Web Workers)
async function sha256(data: ArrayBuffer): Promise<ArrayBuffer> {
  return crypto.subtle.digest('SHA-256', data);
}

// SHA-256 double hash (Bitcoin standard)
async function sha256d(data: ArrayBuffer): Promise<ArrayBuffer> {
  return sha256(await sha256(data));
}

// Keccak-256 approximation using SHA-256 (for Monero-style)
async function keccak256(data: ArrayBuffer): Promise<ArrayBuffer> {
  return sha256(data);
}

// Convert number to little-endian 4-byte buffer
function uint32LE(n: number): Uint8Array {
  const buf = new Uint8Array(4);
  buf[0] = n & 0xff;
  buf[1] = (n >> 8) & 0xff;
  buf[2] = (n >> 16) & 0xff;
  buf[3] = (n >> 24) & 0xff;
  return buf;
}

// Build a block header for hashing (simplified Bitcoin-style)
function buildBlockHeader(coin: string, nonce: number, prevHash: Uint8Array, timestamp: number): ArrayBuffer {
  const version = uint32LE(4);
  const time = uint32LE(timestamp);
  const nonceBytes = uint32LE(nonce);
  const coinBytes = new TextEncoder().encode(coin.padEnd(8, '\0').slice(0, 8));

  const total = version.length + prevHash.length + time.length + nonceBytes.length + coinBytes.length;
  const header = new Uint8Array(total);
  let offset = 0;
  header.set(version, offset); offset += version.length;
  header.set(prevHash, offset); offset += prevHash.length;
  header.set(time, offset); offset += time.length;
  header.set(nonceBytes, offset); offset += nonceBytes.length;
  header.set(coinBytes, offset);
  return header.buffer;
}

// Check if hash meets difficulty (leading zero bits)
function meetsTarget(hash: ArrayBuffer, difficulty: number): boolean {
  const bytes = new Uint8Array(hash);
  const zeroBytesNeeded = Math.floor(difficulty / 8);
  const remainingBits = difficulty % 8;
  for (let i = 0; i < zeroBytesNeeded; i++) {
    if (bytes[i] !== 0) return false;
  }
  if (remainingBits > 0 && zeroBytesNeeded < bytes.length) {
    const mask = (0xff << (8 - remainingBits)) & 0xff;
    if ((bytes[zeroBytesNeeded] & mask) !== 0) return false;
  }
  return true;
}

// Convert ArrayBuffer to hex string
function toHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

// Coin configs
const COIN_CONFIG: Record<string, { difficulty: number; blockReward: number; hashFn: 'sha256d' | 'keccak' }> = {
  BTC:     { difficulty: 4, blockReward: 0.00000001, hashFn: 'sha256d' },
  DOGE:    { difficulty: 3, blockReward: 0.001,      hashFn: 'sha256d' },
  TRUMP:   { difficulty: 3, blockReward: 0.01,       hashFn: 'sha256d' },
  SKY4444: { difficulty: 2, blockReward: 0.444,      hashFn: 'sha256d' },
  USDT:    { difficulty: 3, blockReward: 0.001,      hashFn: 'sha256d' },
  XMR:     { difficulty: 2, blockReward: 0.0001,     hashFn: 'keccak'  },
};

let running = false;
let totalHashes = 0;
let walletBalance = 0;
let currentCoin = 'SKY4444';

// Main mining loop
async function mine(coin: string, difficulty: number) {
  running = true;
  currentCoin = coin;
  const config = COIN_CONFIG[coin] ?? COIN_CONFIG['SKY4444'];
  const actualDifficulty = difficulty || config.difficulty;

  let nonce = Math.floor(Math.random() * 0xffffffff);
  let hashCount = 0;
  let startTime = Date.now();
  let prevHash = new Uint8Array(32); // genesis prev hash = all zeros

  while (running) {
    const timestamp = Math.floor(Date.now() / 1000);
    const header = buildBlockHeader(coin, nonce, prevHash, timestamp);

    let hash: ArrayBuffer;
    if (config.hashFn === 'keccak') {
      hash = await keccak256(header);
    } else {
      hash = await sha256d(header);
    }

    hashCount++;
    totalHashes++;

    const elapsed = (Date.now() - startTime) / 1000;
    const hashRate = elapsed > 0 ? Math.round(hashCount / elapsed) : 0;
    const found = meetsTarget(hash, actualDifficulty);

    if (found) {
      walletBalance += config.blockReward;
      prevHash = new Uint8Array(hash);

      self.postMessage({
        type: 'block',
        coin,
        hash: toHex(hash),
        nonce,
        hashRate,
        totalHashes,
        reward: config.blockReward,
        walletBalance,
        difficulty: actualDifficulty,
        found: true,
        timestamp: Date.now(),
      } as MineResult);

      hashCount = 0;
      startTime = Date.now();
      nonce = Math.floor(Math.random() * 0xffffffff);
    } else if (hashCount % 50 === 0) {
      self.postMessage({
        type: 'hash',
        coin,
        hash: toHex(hash),
        nonce,
        hashRate,
        totalHashes,
        reward: config.blockReward,
        walletBalance,
        difficulty: actualDifficulty,
        found: false,
        timestamp: Date.now(),
      } as MineResult);
    }

    nonce = (nonce + 1) >>> 0;

    if (hashCount % 100 === 0) {
      await new Promise<void>(resolve => setTimeout(resolve, 0));
    }
  }
}

self.onmessage = async (e: MessageEvent<MineMessage>) => {
  const { type, coin, difficulty } = e.data;

  if (type === 'start') {
    if (!running) {
      mine(coin ?? 'SKY4444', difficulty ?? 2);
    }
  } else if (type === 'stop') {
    running = false;
    self.postMessage({
      type: 'stats',
      coin: currentCoin,
      hash: '',
      nonce: 0,
      hashRate: 0,
      totalHashes,
      reward: 0,
      walletBalance,
      difficulty: 0,
      found: false,
      timestamp: Date.now(),
    } as MineResult);
  } else if (type === 'status') {
    self.postMessage({
      type: 'stats',
      coin: currentCoin,
      hash: '',
      nonce: 0,
      hashRate: 0,
      totalHashes,
      reward: 0,
      walletBalance,
      difficulty: 0,
      found: false,
      timestamp: Date.now(),
    } as MineResult);
  }
};
