#!/usr/bin/env node
// 🚀 AGGRESSIVE CLEANUP SCRIPT - Node.js Version
// Usage: node cleanup-script.js [--aggressive]

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const TIMESTAMP = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
const REPORT_FILE = `cleanup_report_${TIMESTAMP}.json`;
const AGGRESSIVE = process.argv.includes('--aggressive');

// Colors
const Colors = {
  RED: '\x1b[0;31m',
  GREEN: '\x1b[0;32m',
  YELLOW: '\x1b[1;33m',
  NC: '\x1b[0m'
};

// Patterns
const FILLER_PATTERNS = [
  'TODO', 'PLACEHOLDER', 'STUB', 'DEMO', 'WIP', 'TEMP',
  'FIX ME', 'FIXME', 'XXX', 'HACK', 'DELETE ME', 'SAMPLE'
];

const DUPLICATE_PATTERNS = [
  '(copy)', '.backup', '.old', '.unused', '-v2', '-v3', '-v4', '-v5',
  '-v6', '-v7', '~', '.tmp', '.bak', '-bak', '-old'
];

const SHADOW_DIRS = [
  'unused', 'archive', 'shadow', 'backup', 'temp', 'old',
  'deprecated', 'legacy', 'staging', 'tmp', 'junk'
];

const CRITICAL_FILES = new Set([
  'README.md', 'LICENSE', '.gitignore', 'package.json',
  'package-lock.json', 'yarn.lock', 'tsconfig.json'
]);

const IGNORE_DIRS = new Set([
  '.git', 'node_modules', '.venv', 'venv', 'dist', 'build', '.env'
]);

let filesToDelete = [];
let dirsToDelete = [];
const reportData = {
  timestamp: TIMESTAMP,
  aggressive: AGGRESSIVE,
  files_deleted: [],
  dirs_deleted: [],
  errors: []
};

function isCritical(filename) {
  return CRITICAL_FILES.has(filename);
}

function shouldIgnoreDir(dirname) {
  return IGNORE_DIRS.has(dirname);
}

function isDuplicate(filename) {
  return DUPLICATE_PATTERNS.some(pattern => filename.includes(pattern));
}

function isFiller(filepath) {
  try {
    const content = fs.readFileSync(filepath, 'utf-8', { flag: 'r' }).slice(0, 5000);
    return FILLER_PATTERNS.some(pattern => content.toLowerCase().includes(pattern.toLowerCase()));
  } catch (e) {
    return false;
  }
}

function isEmpty(filepath) {
  try {
    const content = fs.readFileSync(filepath, 'utf-8');
    const lines = content.split('\n').filter(l => l.trim()).length;
    return lines < 3;
  } catch (e) {
    return false;
  }
}

function scanFiles() {
  console.log(`${Colors.YELLOW}[*] Pattern 1: Scanning for filler/placeholder files...${Colors.NC}`);
  
  const extensions = ['.md', '.js', '.ts', '.tsx', '.jsx', '.py', '.sh', '.json'];
  const walkDir = (dir) => {
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory()) {
          if (!shouldIgnoreDir(entry)) {
            walkDir(fullPath);
          }
        } else if (extensions.includes(path.extname(entry.name))) {
          if (isCritical(entry.name)) {
            continue;
          }
          
          if (isDuplicate(entry.name)) {
            filesToDelete.push(fullPath);
            console.log(`${Colors.RED}[x] DELETE ${fullPath} (duplicate)${Colors.NC}`);
          } else if (isEmpty(fullPath)) {
            filesToDelete.push(fullPath);
            console.log(`${Colors.RED}[x] DELETE ${fullPath} (empty)${Colors.NC}`);
          } else if (isFiller(fullPath)) {
            filesToDelete.push(fullPath);
            console.log(`${Colors.RED}[x] DELETE ${fullPath} (filler)${Colors.NC}`);
          }
        }
      }
    } catch (e) {
      // Silently skip
    }
  };
  
  walkDir('.');
}

function scanDirs() {
  console.log(`${Colors.YELLOW}[*] Pattern 2: Scanning for shadow directories...${Colors.NC}`);
  
  const walkDir = (dir) => {
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.isDirectory()) {
          if (!shouldIgnoreDir(entry)) {
            const fullPath = path.join(dir, entry.name);
            for (const shadow of SHADOW_DIRS) {
              if (entry.name.includes(shadow)) {
                dirsToDelete.push(fullPath);
                console.log(`${Colors.RED}[x] DELETE DIR ${fullPath} (shadow)${Colors.NC}`);
              }
            }
            walkDir(fullPath);
          }
        }
      }
    } catch (e) {
      // Silently skip
    }
  };
  
  walkDir('.');
}

function preview() {
  console.log(`\n${Colors.YELLOW}========================================${Colors.NC}`);
  console.log(`${Colors.YELLOW}CLEANUP SUMMARY (DRY RUN)${Colors.NC}`);
  console.log(`${Colors.YELLOW}========================================${Colors.NC}`);
  console.log(`Files marked for deletion: ${filesToDelete.length}`);
  console.log(`Directories marked for deletion: ${dirsToDelete.length}`);
  console.log(`${Colors.YELLOW}========================================${Colors.NC}`);
  console.log(`\n${Colors.YELLOW}To execute cleanup, run:${Colors.NC}`);
  console.log(`${Colors.GREEN}node cleanup-script.js --aggressive${Colors.NC}\n`);
}

function executeCleanup() {
  console.log(`\n${Colors.RED}[!] AGGRESSIVE MODE - Deleting files...${Colors.NC}\n`);
  
  let filesDeleted = 0;
  let dirsDeleted = 0;
  let errors = 0;
  
  // Delete files
  for (const filepath of filesToDelete) {
    try {
      fs.unlinkSync(filepath);
      filesDeleted++;
      console.log(`${Colors.GREEN}[✓] Deleted ${filepath}${Colors.NC}`);
      reportData.files_deleted.push(filepath);
    } catch (e) {
      errors++;
      console.log(`${Colors.RED}[✗] Failed to delete ${filepath}: ${e.message}${Colors.NC}`);
      reportData.errors.push(filepath);
    }
  }
  
  // Delete directories
  for (const dirpath of dirsToDelete) {
    try {
      fs.rmSync(dirpath, { recursive: true, force: true });
      dirsDeleted++;
      console.log(`${Colors.GREEN}[✓] Deleted directory ${dirpath}${Colors.NC}`);
      reportData.dirs_deleted.push(dirpath);
    } catch (e) {
      errors++;
      console.log(`${Colors.RED}[✗] Failed to delete ${dirpath}: ${e.message}${Colors.NC}`);
      reportData.errors.push(dirpath);
    }
  }
  
  // Git operations
  console.log(`\n${Colors.YELLOW}[*] Committing changes...${Colors.NC}`);
  try {
    execSync('git add -A', { stdio: 'ignore' });
    execSync(`git commit -m "cleanup: Remove ${filesDeleted} filler/duplicate files and ${dirsDeleted} shadow directories"`, { stdio: 'ignore' });
  } catch (e) {
    // Git operations failed silently
  }
  
  // Write report
  fs.writeFileSync(REPORT_FILE, JSON.stringify(reportData, null, 2));
  
  // Summary
  console.log(`\n${Colors.GREEN}========================================${Colors.NC}`);
  console.log(`${Colors.GREEN}CLEANUP COMPLETE!${Colors.NC}`);
  console.log(`${Colors.GREEN}========================================${Colors.NC}`);
  console.log(`✓ Files deleted: ${filesDeleted}`);
  console.log(`✓ Directories deleted: ${dirsDeleted}`);
  console.log(`✗ Errors: ${errors}`);
  console.log(`✓ Report: ${REPORT_FILE}`);
  console.log(`\n${Colors.YELLOW}Next: git push origin main${Colors.NC}`);
  console.log(`${Colors.GREEN}========================================\n${Colors.NC}`);
}

function main() {
  console.log(`${Colors.YELLOW}🚀 AGGRESSIVE CLEANUP SCRIPT - Node.js Version${Colors.NC}`);
  console.log(`${Colors.YELLOW}Report: ${REPORT_FILE}${Colors.NC}\n`);
  
  scanFiles();
  scanDirs();
  
  if (AGGRESSIVE) {
    executeCleanup();
  } else {
    preview();
  }
}

main();
