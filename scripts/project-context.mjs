#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root = process.cwd();
const args = process.argv.slice(2);
const getArg = (name, fallback = undefined) => {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : fallback;
};
const has = (name) => args.includes(name);

const DEFAULT_DIRS = ['client', 'server', 'shared', 'docs/context', 'docs/google-drive-info', 'scripts'];
const EXCLUDE_DIRS = new Set(['node_modules', '.git', 'dist', 'build', '.next', 'coverage', '.cache', '.vite']);
const TEXT_EXTENSIONS = new Set([
  '.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '.json', '.md', '.txt', '.css', '.scss', '.html', '.yml', '.yaml', '.toml', '.env.example', '.sql', '.d.ts'
]);

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (EXCLUDE_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else files.push(full);
  }
  return files;
}

function isTextFile(file) {
  const ext = path.extname(file).toLowerCase();
  return TEXT_EXTENSIONS.has(ext) || file.endsWith('.env.example');
}

function readSafe(file, maxBytes = 140_000) {
  const buffer = fs.readFileSync(file);
  if (buffer.includes(0)) return '';
  return buffer.subarray(0, maxBytes).toString('utf8');
}

function hashFile(file) {
  return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex').slice(0, 16);
}

function allFiles() {
  const dirs = getArg('--dirs', DEFAULT_DIRS.join(',')).split(',').map((x) => x.trim()).filter(Boolean);
  return dirs.flatMap((dir) => walk(path.resolve(root, dir))).filter(isTextFile).sort();
}

function summarizeFile(file) {
  const text = readSafe(file, 80_000);
  const rel = path.relative(root, file);
  const lines = text.split(/\r?\n/);
  const exports = [...text.matchAll(/export\s+(?:default\s+)?(?:const|function|class|interface|type|enum)\s+([A-Za-z0-9_$]+)/g)].map((m) => m[1]).slice(0, 20);
  const imports = [...text.matchAll(/^import\s+.*?from\s+['"]([^'"]+)['"]/gm)].map((m) => m[1]).slice(0, 16);
  const routes = [...text.matchAll(/(?:app\.|router\.|route\()(?:get|post|put|patch|delete|use)?\(?['"]([^'"]+)['"]/g)].map((m) => m[1]).slice(0, 16);
  return {
    path: rel,
    bytes: fs.statSync(file).size,
    lines: lines.length,
    sha: hashFile(file),
    exports,
    imports,
    routes,
  };
}

function writeSummary() {
  const files = allFiles();
  const summaries = files.map(summarizeFile);
  const byDir = summaries.reduce((acc, item) => {
    const first = item.path.split(path.sep)[0];
    acc[first] = (acc[first] || 0) + 1;
    return acc;
  }, {});
  const manifest = {
    generatedAt: new Date().toISOString(),
    root,
    fileCount: summaries.length,
    byDir,
    files: summaries,
  };
  const out = path.resolve(root, getArg('--out', '.project-context.json'));
  fs.writeFileSync(out, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`Wrote ${summaries.length} file summaries to ${path.relative(root, out)}`);
}

function printTree() {
  const files = allFiles();
  const limit = Number(getArg('--limit', '500'));
  for (const file of files.slice(0, limit)) console.log(path.relative(root, file));
  if (files.length > limit) console.log(`... ${files.length - limit} more files. Increase --limit to show all.`);
}

function search() {
  const query = getArg('--search');
  if (!query) return false;
  const re = new RegExp(query, has('--ignore-case') ? 'i' : '');
  const limit = Number(getArg('--limit', '80'));
  let hits = 0;
  for (const file of allFiles()) {
    const rel = path.relative(root, file);
    const lines = readSafe(file).split(/\r?\n/);
    lines.forEach((line, index) => {
      if (hits < limit && re.test(line)) {
        console.log(`${rel}:${index + 1}: ${line.trim().slice(0, 260)}`);
        hits += 1;
      }
    });
    if (hits >= limit) return true;
  }
  if (!hits) console.log('No matches.');
  return true;
}

function showFile() {
  const rel = getArg('--file');
  if (!rel) return false;
  const file = path.resolve(root, rel);
  if (!file.startsWith(root) || !fs.existsSync(file)) {
    console.error(`File not found inside project: ${rel}`);
    process.exit(1);
  }
  const start = Number(getArg('--start', '1'));
  const end = Number(getArg('--end', String(start + 220)));
  readSafe(file, 400_000)
    .split(/\r?\n/)
    .slice(start - 1, end)
    .forEach((line, offset) => console.log(`${String(start + offset).padStart(5, ' ')} ${line}`));
  return true;
}

function help() {
  console.log(`Project context loader\n\nUsage:\n  pnpm context:summary              Generate .project-context.json\n  pnpm context:tree -- --limit 200  Print readable project file tree\n  pnpm context -- --search ledger   Search source/docs quickly\n  pnpm context -- --file server/foo.ts --start 1 --end 120\n\nOptions:\n  --dirs a,b,c       Comma-separated directories to scan\n  --out path         Summary output path\n  --ignore-case      Case-insensitive search\n  --limit n          Search or tree limit\n`);
}

if (has('--help') || has('-h')) help();
else if (search()) undefined;
else if (showFile()) undefined;
else if (has('--tree')) printTree();
else writeSummary();
