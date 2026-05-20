import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const dirs = ['server', 'client/src/pages', 'client/src/workers', 'shared', 'drizzle'];
const keywords = /\b(crypto|coin|token|wallet|web3|swap|trade|trading|mine|mining|burn|tip|pay|payment|escrow|ledger|contract|staking|vault|marketplace|blackjack|roulette|slots|casino)\b/i;
const skip = /node_modules|dist|\.git|terminal_full_output|\.m/;
const rows = [];

function walk(dir) {
  const abs = join(root, dir);
  let entries = [];
  try { entries = readdirSync(abs); } catch { return; }
  for (const entry of entries) {
    const full = join(abs, entry);
    const rel = relative(root, full);
    if (skip.test(rel)) continue;
    const st = statSync(full);
    if (st.isDirectory()) walk(rel);
    if (!st.isFile() || !/\.(ts|tsx|js|jsx|sql)$/.test(entry)) continue;
    let text = '';
    try { text = readFileSync(full, 'utf8'); } catch { continue; }
    if (!keywords.test(rel) && !keywords.test(text)) continue;
    const procedures = [...text.matchAll(/\n\s*([a-zA-Z0-9_]+):\s*(?:protectedProcedure|publicProcedure|adminProcedure)/g)].map((m) => m[1]);
    const exports = [...text.matchAll(/export\s+const\s+([a-zA-Z0-9_]+)/g)].map((m) => m[1]);
    const hits = [...new Set((text.match(keywords) ? text.match(new RegExp(keywords.source, 'gi')) ?? [] : []).map((s) => s.toLowerCase()))].slice(0, 18);
    rows.push({ file: rel, lines: text.split('\n').length, procedures, exports, hits });
  }
}

dirs.forEach(walk);
rows.sort((a, b) => {
  const score = (r) => (r.file.includes('web3') ? 100 : 0) + (r.file.includes('multi-coin') ? 90 : 0) + (r.file.includes('mining') ? 70 : 0) + (r.file.includes('skycoin') ? 65 : 0) + (r.file.includes('Wallet') ? 60 : 0) + r.procedures.length;
  return score(b) - score(a);
});

const out = rows.map((r) => [
  `## ${r.file}`,
  `lines: ${r.lines}`,
  `exports: ${r.exports.join(', ') || '-'}`,
  `procedures: ${r.procedures.join(', ') || '-'}`,
  `hits: ${r.hits.join(', ')}`,
].join('\n')).join('\n\n');
writeFileSync(join(root, '.crypto-fast-scan.md'), out + '\n');
console.log(`crypto-fast-scan wrote ${rows.length} file summaries to .crypto-fast-scan.md`);
console.log(rows.slice(0, 20).map((r) => `${r.file} :: ${r.procedures.join(',') || r.exports.join(',') || 'no api names'}`).join('\n'));
