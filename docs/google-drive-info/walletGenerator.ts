/**
 * ShadowChat Real Wallet Generator
 * Generates real cryptographic wallet addresses for:
 * - BTC (P2PKH — Base58Check encoded)
 * - DOGE (P2PKH — Base58Check encoded, version byte 0x1E)
 * - TRUMP (ERC-20 — Ethereum-style address)
 * - SKY4444 (ERC-20 — Ethereum-style address)
 * - USDT (ERC-20 on Ethereum — Ethereum-style address)
 * - XMR (Monero — simplified 95-char address)
 *
 * Uses real secp256k1 elliptic curve cryptography via @noble/secp256k1
 * and real SHA-256/RIPEMD-160/keccak hashing.
 */

import * as secp from '@noble/secp256k1';

// ─── RIPEMD-160 pure JS implementation ───────────────────────────────────────
// Needed for Bitcoin P2PKH address generation
function ripemd160(data: Uint8Array): Uint8Array {
  // RIPEMD-160 constants
  const KL = [0x00000000, 0x5A827999, 0x6ED9EBA1, 0x8F1BBCDC, 0xA953FD4E];
  const KR = [0x50A28BE6, 0x5C4DD124, 0x6D703EF3, 0x7A6D76E9, 0x00000000];
  const SL = [
    [11,14,15,12, 5, 8, 7, 9,11,13,14,15, 6, 7, 9, 8],
    [ 7, 6, 8,13,11, 9, 7,15, 7,12,15, 9,11, 7,13,12],
    [11,13, 6, 7,14, 9,13,15,14, 8,13, 6, 5,12, 7, 5],
    [11,12,14,15,14,15, 9, 8, 9,14, 5, 6, 8, 6, 5,12],
    [ 9,15, 5,11, 6, 8,13,12, 5,12,13,14,11, 8, 5, 6],
  ];
  const SR = [
    [ 8, 9, 9,11,13,15,15, 5, 7, 7, 8,11,14,14,12, 6],
    [ 9,13,15, 7,12, 8, 9,11, 7, 7,12, 7, 6,15,13,11],
    [ 9, 7,15,11, 8, 6, 6,14,12,13, 5,14,13,13, 7, 5],
    [15, 5, 8,11,14,14, 6,14, 6, 9,12, 9,12, 5,15, 8],
    [ 8, 5,12, 9,12, 5,14, 6, 8,13, 6, 5,15,13,11,11],
  ];
  const RL = [
    [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15],
    [ 7, 4,13, 1,10, 6,15, 3,12, 0, 9, 5, 2,14,11, 8],
    [ 3,10,14, 4, 9,15, 8, 1, 2, 7, 0, 6,13,11, 5,12],
    [ 1, 9,11,10, 0, 8,12, 4,13, 3, 7,15,14, 5, 6, 2],
    [ 4, 0, 5, 9, 7,12, 2,10,14, 1, 3, 8,11, 6,15,13],
  ];
  const RR = [
    [ 5,14, 7, 0, 9, 2,11, 4,13, 6,15, 8, 1,10, 3,12],
    [ 6,11, 3, 7, 0,13, 5,10,14,15, 8,12, 4, 9, 1, 2],
    [15, 5, 1, 3, 7,14, 6, 9,11, 8,12, 2,10, 0, 4,13],
    [ 8, 6, 4, 1, 3,11,15, 0, 5,12, 2,13, 9, 7,10,14],
    [12,15,10, 4, 1, 5, 8, 7, 6, 2,13,14, 0, 3, 9,11],
  ];

  function f(j: number, x: number, y: number, z: number): number {
    if (j < 16) return x ^ y ^ z;
    if (j < 32) return (x & y) | (~x & z);
    if (j < 48) return (x | ~y) ^ z;
    if (j < 64) return (x & z) | (y & ~z);
    return x ^ (y | ~z);
  }

  function rol(x: number, n: number): number {
    return (x << n) | (x >>> (32 - n));
  }

  // Padding
  const msgLen = data.length;
  const bitLen = msgLen * 8;
  const padLen = msgLen % 64 < 56 ? 56 - (msgLen % 64) : 120 - (msgLen % 64);
  const padded = new Uint8Array(msgLen + padLen + 8);
  padded.set(data);
  padded[msgLen] = 0x80;
  const view = new DataView(padded.buffer);
  view.setUint32(msgLen + padLen, bitLen & 0xffffffff, true);
  view.setUint32(msgLen + padLen + 4, Math.floor(bitLen / 0x100000000), true);

  // Initial hash
  let h0 = 0x67452301, h1 = 0xEFCDAB89, h2 = 0x98BADCFE, h3 = 0x10325476, h4 = 0xC3D2E1F0;

  for (let i = 0; i < padded.length; i += 64) {
    const X: number[] = [];
    for (let j = 0; j < 16; j++) {
      X.push(view.getUint32(i + j * 4, true));
    }

    let al = h0, bl = h1, cl = h2, dl = h3, el = h4;
    let ar = h0, br = h1, cr = h2, dr = h3, er = h4;

    for (let j = 0; j < 80; j++) {
      const round = Math.floor(j / 16);
      let T = rol(al + f(j, bl, cl, dl) + X[RL[round][j % 16]] + KL[round], SL[round][j % 16]) + el;
      al = el; el = dl; dl = rol(cl, 10); cl = bl; bl = T;
      T = rol(ar + f(79 - j, br, cr, dr) + X[RR[round][j % 16]] + KR[round], SR[round][j % 16]) + er;
      ar = er; er = dr; dr = rol(cr, 10); cr = br; br = T;
    }

    const T = h1 + cl + dr;
    h1 = h2 + dl + er; h2 = h3 + el + ar; h3 = h4 + al + br; h4 = h0 + bl + cr; h0 = T;
  }

  const result = new Uint8Array(20);
  const rv = new DataView(result.buffer);
  rv.setUint32(0, h0, true); rv.setUint32(4, h1, true); rv.setUint32(8, h2, true);
  rv.setUint32(12, h3, true); rv.setUint32(16, h4, true);
  return result;
}

// ─── Keccak-256 pure JS implementation ───────────────────────────────────────
function keccak256(data: Uint8Array): Uint8Array {
  // Keccak-256 (not SHA3-256 — Ethereum uses original Keccak without NIST padding)
  const RC: number[][] = [
    [0x00000001, 0x00000000], [0x00008082, 0x00000000], [0x0000808A, 0x80000000],
    [0x80008000, 0x80000000], [0x0000808B, 0x00000000], [0x80000001, 0x00000000],
    [0x80008081, 0x80000000], [0x00008009, 0x80000000], [0x0000008A, 0x00000000],
    [0x00000088, 0x00000000], [0x80008009, 0x00000000], [0x8000000A, 0x00000000],
    [0x8000808B, 0x00000000], [0x0000008B, 0x80000000], [0x00008089, 0x80000000],
    [0x00008003, 0x80000000], [0x00008002, 0x80000000], [0x00000080, 0x80000000],
    [0x0000800A, 0x00000000], [0x8000000A, 0x80000000], [0x80008081, 0x80000000],
    [0x00008080, 0x80000000], [0x80000001, 0x00000000], [0x80008008, 0x80000000],
  ];
  const ROTATIONS = [
    [0, 36, 3, 41, 18], [1, 44, 10, 45, 2], [62, 6, 43, 15, 61],
    [28, 55, 25, 21, 56], [27, 20, 39, 8, 14],
  ];

  // State: 5x5 array of [lo, hi] 32-bit pairs
  const state: number[][] = Array.from({ length: 25 }, () => [0, 0]);

  function rotl64(lo: number, hi: number, n: number): [number, number] {
    if (n === 0) return [lo, hi];
    if (n < 32) return [(lo << n) | (hi >>> (32 - n)), (hi << n) | (lo >>> (32 - n))];
    n -= 32;
    return [(hi << n) | (lo >>> (32 - n)), (lo << n) | (hi >>> (32 - n))];
  }

  function keccakF(): void {
    for (let round = 0; round < 24; round++) {
      // Theta
      const C: number[][] = Array.from({ length: 5 }, (_, x) => [
        state[x][0] ^ state[x + 5][0] ^ state[x + 10][0] ^ state[x + 15][0] ^ state[x + 20][0],
        state[x][1] ^ state[x + 5][1] ^ state[x + 10][1] ^ state[x + 15][1] ^ state[x + 20][1],
      ]);
      for (let x = 0; x < 5; x++) {
        const [dlo, dhi] = rotl64(C[(x + 1) % 5][0], C[(x + 1) % 5][1], 1);
        const d = [dlo ^ C[(x + 4) % 5][0], dhi ^ C[(x + 4) % 5][1]];
        for (let y = 0; y < 5; y++) {
          state[x + y * 5][0] ^= d[0]; state[x + y * 5][1] ^= d[1];
        }
      }
      // Rho + Pi
      const B: number[][] = Array.from({ length: 25 }, () => [0, 0]);
      for (let x = 0; x < 5; x++) {
        for (let y = 0; y < 5; y++) {
          const [rlo, rhi] = rotl64(state[x + y * 5][0], state[x + y * 5][1], ROTATIONS[x][y]);
          B[y + ((2 * x + 3 * y) % 5) * 5] = [rlo, rhi];
        }
      }
      // Chi
      for (let x = 0; x < 5; x++) {
        for (let y = 0; y < 5; y++) {
          state[x + y * 5][0] = B[x + y * 5][0] ^ (~B[(x + 1) % 5 + y * 5][0] & B[(x + 2) % 5 + y * 5][0]);
          state[x + y * 5][1] = B[x + y * 5][1] ^ (~B[(x + 1) % 5 + y * 5][1] & B[(x + 2) % 5 + y * 5][1]);
        }
      }
      // Iota
      state[0][0] ^= RC[round][1]; state[0][1] ^= RC[round][0];
    }
  }

  // Absorb (rate = 136 bytes for keccak-256)
  const rate = 136;
  const padded = new Uint8Array(Math.ceil((data.length + 1) / rate) * rate);
  padded.set(data);
  padded[data.length] = 0x01; // Keccak padding (not SHA3 0x06)
  padded[padded.length - 1] |= 0x80;

  const dv = new DataView(padded.buffer);
  for (let i = 0; i < padded.length; i += rate) {
    for (let j = 0; j < rate / 8; j++) {
      state[j][0] ^= dv.getUint32(i + j * 8, true);
      state[j][1] ^= dv.getUint32(i + j * 8 + 4, true);
    }
    keccakF();
  }

  // Squeeze
  const result = new Uint8Array(32);
  const rv = new DataView(result.buffer);
  for (let i = 0; i < 4; i++) {
    rv.setUint32(i * 8, state[i][0], true);
    rv.setUint32(i * 8 + 4, state[i][1], true);
  }
  return result;
}

// ─── SHA-256 via SubtleCrypto (sync wrapper using cached results) ─────────────
// For synchronous wallet generation, we use a pure JS SHA-256
function sha256Sync(data: Uint8Array): Uint8Array {
  // Pure JS SHA-256 implementation
  const K = [
    0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,
    0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,
    0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,
    0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,
    0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,
    0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,
    0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,
    0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2,
  ];
  const msgLen = data.length;
  const bitLen = msgLen * 8;
  const padLen = msgLen % 64 < 56 ? 56 - (msgLen % 64) : 120 - (msgLen % 64);
  const padded = new Uint8Array(msgLen + padLen + 8);
  padded.set(data);
  padded[msgLen] = 0x80;
  const dv = new DataView(padded.buffer);
  dv.setUint32(msgLen + padLen + 4, bitLen & 0xffffffff, false);

  let h0=0x6a09e667,h1=0xbb67ae85,h2=0x3c6ef372,h3=0xa54ff53a,h4=0x510e527f,h5=0x9b05688c,h6=0x1f83d9ab,h7=0x5be0cd19;

  for (let i = 0; i < padded.length; i += 64) {
    const W: number[] = [];
    for (let j = 0; j < 16; j++) W.push(dv.getUint32(i + j * 4, false));
    for (let j = 16; j < 64; j++) {
      const s0 = ((W[j-15]>>>7)|(W[j-15]<<25)) ^ ((W[j-15]>>>18)|(W[j-15]<<14)) ^ (W[j-15]>>>3);
      const s1 = ((W[j-2]>>>17)|(W[j-2]<<15)) ^ ((W[j-2]>>>19)|(W[j-2]<<13)) ^ (W[j-2]>>>10);
      W.push((W[j-16]+s0+W[j-7]+s1) >>> 0);
    }
    let a=h0,b=h1,c=h2,d=h3,e=h4,f=h5,g=h6,h=h7;
    for (let j = 0; j < 64; j++) {
      const S1 = ((e>>>6)|(e<<26)) ^ ((e>>>11)|(e<<21)) ^ ((e>>>25)|(e<<7));
      const ch = (e&f)^(~e&g);
      const temp1 = (h+S1+ch+K[j]+W[j]) >>> 0;
      const S0 = ((a>>>2)|(a<<30)) ^ ((a>>>13)|(a<<19)) ^ ((a>>>22)|(a<<10));
      const maj = (a&b)^(a&c)^(b&c);
      const temp2 = (S0+maj) >>> 0;
      h=g; g=f; f=e; e=(d+temp1)>>>0; d=c; c=b; b=a; a=(temp1+temp2)>>>0;
    }
    h0=(h0+a)>>>0; h1=(h1+b)>>>0; h2=(h2+c)>>>0; h3=(h3+d)>>>0;
    h4=(h4+e)>>>0; h5=(h5+f)>>>0; h6=(h6+g)>>>0; h7=(h7+h)>>>0;
  }

  const result = new Uint8Array(32);
  const rv = new DataView(result.buffer);
  [h0,h1,h2,h3,h4,h5,h6,h7].forEach((v,i) => rv.setUint32(i*4, v, false));
  return result;
}

function sha256d(data: Uint8Array): Uint8Array {
  return sha256Sync(sha256Sync(data));
}

// ─── Base58 Encoding ──────────────────────────────────────────────────────────
const BASE58_ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

function base58Encode(bytes: Uint8Array): string {
  let num = 0n;
  for (const b of Array.from(bytes)) {
    num = num * 256n + BigInt(b);
  }
  let result = '';
  const base = 58n;
  while (num > 0n) {
    result = BASE58_ALPHABET[Number(num % base)] + result;
    num = num / base;
  }
  for (const byte of Array.from(bytes)) {
    if (byte === 0) result = '1' + result;
    else break;
  }
  return result;
}

function base58Check(payload: Uint8Array): string {
  const checksum = sha256d(payload).slice(0, 4);
  const full = new Uint8Array(payload.length + 4);
  full.set(payload);
  full.set(checksum, payload.length);
  return base58Encode(full);
}

// ─── Address generators ───────────────────────────────────────────────────────
function btcAddress(publicKey: Uint8Array, versionByte: number): string {
  const pubKeyHash = ripemd160(sha256Sync(publicKey));
  const payload = new Uint8Array(1 + pubKeyHash.length);
  payload[0] = versionByte;
  payload.set(pubKeyHash, 1);
  return base58Check(payload);
}

function ethAddress(publicKey: Uint8Array): string {
  const pubKeyBytes = publicKey.length === 65 ? publicKey.slice(1) : publicKey;
  const hash = keccak256(pubKeyBytes);
  const addr = Array.from(hash.slice(12)).map(b => b.toString(16).padStart(2, '0')).join('');
  const addrHash = Array.from(keccak256(new TextEncoder().encode(addr)))
    .map(b => b.toString(16).padStart(2, '0')).join('');
  let checksummed = '0x';
  for (let i = 0; i < addr.length; i++) {
    checksummed += parseInt(addrHash[i], 16) >= 8 ? addr[i].toUpperCase() : addr[i];
  }
  return checksummed;
}

function xmrAddress(privateKey: Uint8Array): string {
  const spendKey = keccak256(privateKey);
  const viewKey = keccak256(spendKey);
  const payload = new Uint8Array(69);
  payload[0] = 0x12;
  payload.set(spendKey.slice(0, 32), 1);
  payload.set(viewKey.slice(0, 32), 33);
  const checksum = keccak256(payload.slice(0, 65)).slice(0, 4);
  payload.set(checksum, 65);
  return base58Encode(payload);
}

// ─── Main wallet generation ───────────────────────────────────────────────────
export interface WalletAddresses {
  privateKeyHex: string;
  BTC: string;
  DOGE: string;
  TRUMP: string;
  SKY4444: string;
  USDT: string;
  XMR: string;
}

export function generateWallet(): WalletAddresses {
  const privateKey = secp.utils.randomSecretKey();
  const privateKeyHex = Array.from(privateKey as Uint8Array).map((b: number) => b.toString(16).padStart(2, '0')).join('');
  const publicKeyCompressed = secp.getPublicKey(privateKey, true);
  const publicKeyUncompressed = secp.getPublicKey(privateKey, false);
  const ethAddr = ethAddress(publicKeyUncompressed);

  return {
    privateKeyHex,
    BTC:     btcAddress(publicKeyCompressed, 0x00),
    DOGE:    btcAddress(publicKeyCompressed, 0x1e),
    TRUMP:   ethAddr,
    SKY4444: ethAddr,
    USDT:    ethAddr,
    XMR:     xmrAddress(privateKey),
  };
}

export function validateAddress(address: string, coin: string): boolean {
  switch (coin) {
    case 'BTC':   return /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/.test(address);
    case 'DOGE':  return /^D[5-9A-HJ-NP-U][1-9A-HJ-NP-Za-km-z]{32}$/.test(address);
    case 'TRUMP':
    case 'SKY4444':
    case 'USDT':  return /^0x[0-9a-fA-F]{40}$/.test(address);
    case 'XMR':   return address.length >= 90;
    default:      return false;
  }
}

export const COIN_META = {
  BTC:     { name: 'Bitcoin',       symbol: 'BTC',     color: '#F7931A', network: 'Bitcoin Mainnet',         type: 'PoW SHA-256',        decimals: 8,  coingeckoId: 'bitcoin'       },
  DOGE:    { name: 'Dogecoin',      symbol: 'DOGE',    color: '#C2A633', network: 'Dogecoin Mainnet',        type: 'PoW Scrypt',         decimals: 8,  coingeckoId: 'dogecoin'      },
  TRUMP:   { name: 'TRUMP Official',symbol: 'TRUMP',   color: '#E31837', network: 'Solana / Ethereum',       type: 'SPL Token / ERC-20', decimals: 6,  coingeckoId: 'official-trump'},
  SKY4444: { name: 'SkyCoin4444',   symbol: 'SKY4444', color: '#6366F1', network: 'ShadowChain',             type: 'PoW SHA-256d',       decimals: 8,  coingeckoId: null            },
  USDT:    { name: 'Tether USD',    symbol: 'USDT',    color: '#26A17B', network: 'Ethereum / Tron / Solana',type: 'ERC-20 / TRC-20',    decimals: 6,  coingeckoId: 'tether'        },
  XMR:     { name: 'Monero',        symbol: 'XMR',     color: '#FF6600', network: 'Monero Mainnet',          type: 'PoW CryptoNight',    decimals: 12, coingeckoId: 'monero'        },
} as const;

export type SupportedCoin = keyof typeof COIN_META;
