import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const targets = [
  'server/routers/hope-ai.ts',
  'client/src/pages/HopeAI.tsx',
  'server/routers.ts',
  'server/routers/mining.ts',
  'server/routers/staking.ts',
  'server/routers/web3.ts',
  'server/routers/marketplace-live.ts',
  'server/routers/live-social.ts',
  'server/routers/games.ts',
  'server/lib/multi-coin.ts',
];

function read(rel) {
  const abs = path.join(root, rel);
  if (!fs.existsSync(abs)) return '';
  return fs.readFileSync(abs, 'utf8');
}

function findProcedures(src) {
  const names = [];
  const rx = /\n\s*([A-Za-z0-9_]+)\s*:\s*(?:publicProcedure|protectedProcedure)/g;
  let m;
  while ((m = rx.exec(src))) names.push(m[1]);
  return names;
}

function findImports(src) {
  return [...src.matchAll(/^import\s+.*?from\s+["']([^"']+)["'];?/gm)].map((m) => m[0].slice(0, 160));
}

function findClientHooks(src) {
  return [...src.matchAll(/trpc\.([A-Za-z0-9_.]+)\.(?:useQuery|useMutation)/g)].map((m) => m[0]);
}

function statusFor(rel, src) {
  const procedures = findProcedures(src);
  const hasDb = /\bdb\.|ctx\.db|insert\(|update\(|select\(|transactions|holdings|staking|mining/i.test(src);
  const hasStubSignals = /stub|mock|prep|adapter-boundary|provider-gated|pending|beta/i.test(src);
  const hasMultiCoin = /multiCoinService|transfer\(|tip\(|swap\(|mine\(|burn\(|pay\(/.test(src);
  const hooks = findClientHooks(src);
  return { rel, lines: src ? src.split('\n').length : 0, procedures, hooks, hasDb, hasMultiCoin, hasStubSignals, imports: findImports(src).slice(0, 8) };
}

const map = targets.map((rel) => statusFor(rel, read(rel)));
const summary = {
  generatedAt: new Date().toISOString(),
  branchHint: 'feature/full-backend-social-crypto-20260520',
  hopeAiPatchPriorities: [
    'Expose a readiness matrix that labels DB-backed vs prep-stage features honestly.',
    'Route Hope AI quick commands to procedure names that exist now.',
    'Block mainnet claims; describe Web3 as wallet/contract adapter readiness until deployment exists.',
    'Surface mining/staking/trading persistence gaps as next work instead of pretending done.',
  ],
  map,
};

const out = path.join(root, '.manus-hope-ai-fast-map.json');
fs.writeFileSync(out, JSON.stringify(summary, null, 2));

for (const item of map) {
  console.log(`\n## ${item.rel}`);
  console.log(`lines=${item.lines} db=${item.hasDb} multiCoin=${item.hasMultiCoin} stubSignals=${item.hasStubSignals}`);
  if (item.procedures.length) console.log(`procedures=${item.procedures.join(', ')}`);
  if (item.hooks.length) console.log(`hooks=${[...new Set(item.hooks)].join(', ')}`);
}
console.log(`\nWROTE ${out}`);
