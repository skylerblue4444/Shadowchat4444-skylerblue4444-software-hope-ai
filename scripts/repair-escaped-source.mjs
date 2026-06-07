#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const targets = ['client/src', 'server', 'shared', 'drizzle'];
const exts = new Set(['.ts', '.tsx', '.mts', '.cts']);
const skipDirs = new Set(['node_modules', '.git', 'dist', 'build', 'coverage']);

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!skipDirs.has(entry.name)) walk(path.join(dir, entry.name), out);
    } else if (exts.has(path.extname(entry.name))) {
      out.push(path.join(dir, entry.name));
    }
  }
  return out;
}

function repair(text) {
  let next = text;
  next = next.replace(/\\r\\n/g, '\n').replace(/\\n/g, '\n').replace(/\\t/g, '  ');
  // Files affected by this corruption usually escaped every quote as well.
  const escapedDoubleQuotes = (next.match(/\\"/g) || []).length;
  const normalDoubleQuotes = (next.match(/(?<!\\)"/g) || []).length;
  if (escapedDoubleQuotes > Math.max(6, normalDoubleQuotes * 2)) {
    next = next.replace(/\\"/g, '"');
  }
  return next;
}

const files = targets.flatMap((dir) => walk(path.resolve(root, dir)));
const changed = [];
for (const file of files) {
  const text = fs.readFileSync(file, 'utf8');
  const literalNewlines = (text.match(/\\n/g) || []).length;
  const actualNewlines = (text.match(/\n/g) || []).length;
  if (literalNewlines < 20 || actualNewlines > Math.max(4, literalNewlines / 3)) continue;
  const next = repair(text);
  if (next !== text) {
    fs.writeFileSync(file, next.endsWith('\n') ? next : `${next}\n`);
    changed.push(path.relative(root, file));
  }
}

console.log(`Repaired ${changed.length} escaped source files.`);
for (const file of changed) console.log(file);
