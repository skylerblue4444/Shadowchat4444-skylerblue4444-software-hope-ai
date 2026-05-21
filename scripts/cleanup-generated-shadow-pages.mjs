import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const appPath = path.join(root, 'client/src/App.tsx');
const pagesDir = path.join(root, 'client/src/pages');
const routesDir = path.join(root, 'client/src/routes');
const reportPath = path.join(root, 'GENERATED_PAGE_CLEANUP_REPORT.md');

const app = fs.readFileSync(appPath, 'utf8');
const keepFiles = new Set();
const importRegex = /import\(['"]\.\/pages\/([^'"]+)['"]\)/g;
let match;
while ((match = importRegex.exec(app)) !== null) {
  const importTarget = match[1];
  if (importTarget.startsWith('Shadow')) {
    const normalized = importTarget.endsWith('.tsx') ? importTarget : `${importTarget}.tsx`;
    keepFiles.add(normalized);
  }
}

const allShadowFiles = fs.readdirSync(pagesDir).filter((file) => file.startsWith('Shadow') && file.endsWith('.tsx'));
const removed = [];
const kept = [];
for (const file of allShadowFiles) {
  if (keepFiles.has(file)) {
    kept.push(file);
    continue;
  }
  fs.unlinkSync(path.join(pagesDir, file));
  removed.push(file);
}

const shadowRoutesPath = path.join(routesDir, 'ShadowRoutes.tsx');
let removedShadowRoutes = false;
if (fs.existsSync(shadowRoutesPath) && !app.includes('ShadowRoutes')) {
  fs.unlinkSync(shadowRoutesPath);
  removedShadowRoutes = true;
}

const report = `# Generated Page Cleanup Report\n\nThe production beta app now keeps the functional route surface imported directly by \`client/src/App.tsx\` and removes generated Shadow filler pages that were not part of the launchable route tree.\n\n| Category | Count |\n|---|---:|\n| Shadow pages kept because App.tsx imports them | ${kept.length} |\n| Generated Shadow pages removed | ${removed.length} |\n| Unused generated ShadowRoutes registry removed | ${removedShadowRoutes ? 'Yes' : 'No'} |\n\n## Kept Production Shadow Pages\n\n${kept.sort().map((file) => `- \`${file}\``).join('\n')}\n\n## Cleanup Boundary\n\nThis cleanup intentionally avoids deleting non-Shadow pages and keeps the functional crypto playground/social beta routes, including mining, staking, wallet, trading, casino playground, dating lounge, livestream, and core dashboard surfaces.\n`;
fs.writeFileSync(reportPath, report);
console.log(`Kept ${kept.length} production Shadow pages.`);
console.log(`Removed ${removed.length} generated Shadow filler pages.`);
console.log(`Removed ShadowRoutes registry: ${removedShadowRoutes ? 'yes' : 'no'}.`);
