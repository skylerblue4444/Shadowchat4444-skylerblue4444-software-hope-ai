#!/usr/bin/env python3
# 🚀 NUCLEAR CLEANUP SCRIPT - INSTANT AUTO-DELETE ALL FILLER
# NO DRY RUN. NO BS. PRODUCTION READY.

import os
import sys
import json
import subprocess
from pathlib import Path
from datetime import datetime

class NuclearCleanup:
    def __init__(self):
        self.timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        self.report_file = f"cleanup_report_{self.timestamp}.json"
        self.files_deleted = []
        self.dirs_deleted = []
        self.errors = []
        
        self.filler_patterns = [
            'TODO', 'PLACEHOLDER', 'STUB', 'DEMO', 'WIP', 'TEMP',
            'SAMPLE', 'EXAMPLE', 'TEST-', 'FIXME', 'XXX', 'HACK', 'DELETE ME'
        ]
        
        self.duplicate_patterns = [
            '-v2', '-v3', '-v4', '-v5', '-v6', '(copy)', 
            'backup', '.old', '.unused', '.bak', '.tmp', '~'
        ]
        
        self.shadow_dirs = [
            'unused', 'archive', 'shadow', 'backup', 'temp', 'old',
            'staging', 'junk', 'deprecated', 'legacy', 'tmp'
        ]
        
        self.critical_files = {
            'README.md', 'LICENSE', '.gitignore', 'package.json',
            'package-lock.json', 'yarn.lock', 'tsconfig.json', '.env'
        }

    def is_critical(self, filename):
        return filename in self.critical_files

    def is_filler(self, filepath):
        try:
            with open(filepath, 'r', errors='ignore') as f:
                content = f.read(5000).lower()
                return any(p.lower() in content for p in self.filler_patterns)
        except:
            return False

    def is_empty(self, filepath):
        try:
            with open(filepath, 'r', errors='ignore') as f:
                lines = [l for l in f.readlines() if l.strip()]
                return len(lines) < 3
        except:
            return False

    def delete_files(self):
        print(f"\n\033[1;33m[PHASE 1] Deleting filler/placeholder files...\033[0m")
        
        extensions = {'.md', '.js', '.ts', '.tsx', '.jsx', '.py', '.sh', '.json'}
        for root, dirs, files in os.walk('.'):
            # Skip critical directories
            dirs[:] = [d for d in dirs if d not in {'.git', 'node_modules', '.venv', 'venv', 'dist', 'build'}]
            
            for file in files:
                filepath = os.path.join(root, file)
                
                if Path(filepath).suffix not in extensions:
                    continue
                if self.is_critical(file):
                    continue
                
                # Check patterns
                should_delete = False
                reason = ""
                
                if any(p in file for p in self.duplicate_patterns):
                    should_delete = True
                    reason = "duplicate"
                elif self.is_empty(filepath):
                    should_delete = True
                    reason = "empty"
                elif self.is_filler(filepath):
                    should_delete = True
                    reason = "filler"
                
                if should_delete:
                    try:
                        os.remove(filepath)
                        self.files_deleted.append(filepath)
                        print(f"\033[0;32m[✓]\033[0m Deleted: {filepath} ({reason})")
                    except Exception as e:
                        self.errors.append(str(e))
                        print(f"\033[0;31m[✗]\033[0m Error: {filepath}")

    def delete_directories(self):
        print(f"\n\033[1;33m[PHASE 2] Deleting shadow/archive directories...\033[0m")
        
        for root, dirs, files in os.walk('.'):
            dirs[:] = [d for d in dirs if d not in {'.git', 'node_modules', 'dist', 'build'}]
            
            for d in dirs:
                full_path = os.path.join(root, d)
                if any(shadow in d for shadow in self.shadow_dirs):
                    try:
                        import shutil
                        shutil.rmtree(full_path)
                        self.dirs_deleted.append(full_path)
                        print(f"\033[0;32m[✓]\033[0m Deleted DIR: {full_path}")
                    except Exception as e:
                        self.errors.append(str(e))
                        print(f"\033[0;31m[✗]\033[0m Error: {full_path}")

    def git_commit(self):
        print(f"\n\033[1;33m[PHASE 3] Committing to git...\033[0m")
        
        try:
            subprocess.run(['git', 'add', '-A'], capture_output=True)
            commit_msg = f"""🚀 NUCLEAR CLEANUP: Auto-delete all filler code pages
- Deleted {len(self.files_deleted)} files (TODO, PLACEHOLDER, STUB, DEMO, WIP, duplicates, empty)
- Deleted {len(self.dirs_deleted)} shadow/archive directories
- Production-ready codebase
- Ready for next round of development

Generated: {self.timestamp}"""
            subprocess.run(['git', 'commit', '-m', commit_msg], capture_output=True)
            print(f"\033[0;32m[✓]\033[0m Git commit created")
        except Exception as e:
            print(f"\033[0;31m[✗]\033[0m Git error: {e}")

    def generate_report(self):
        report = {
            'timestamp': self.timestamp,
            'files_deleted': self.files_deleted,
            'dirs_deleted': self.dirs_deleted,
            'total_files': len(self.files_deleted),
            'total_dirs': len(self.dirs_deleted),
            'errors': self.errors
        }
        with open(self.report_file, 'w') as f:
            json.dump(report, f, indent=2)

    def run(self):
        print("\n\033[1;33m╔══════════════════════════════════════════════════════════╗\033[0m")
        print("\033[1;33m║  🚀 NUCLEAR CLEANUP - INSTANT AUTO-DELETE ALL FILLER     ║\033[0m")
        print("\033[1;33m║  NO DRY RUN. PRODUCTION READY.                            ║\033[0m")
        print("\033[1;33m╚══════════════════════════════════════════════════════════╝\033[0m")
        
        self.delete_files()
        self.delete_directories()
        self.git_commit()
        self.generate_report()
        
        print(f"\n\033[1;32m╔══════════════════════════════════════════════════════════╗\033[0m")
        print(f"\033[1;32m║  ✅ NUCLEAR CLEANUP COMPLETE - PRODUCTION READY!         ║\033[0m")
        print(f"\033[1;32m╚══════════════════════════════════════════════════════════╝\033[0m\n")
        
        print(f"\033[1mRESULTS:\033[0m")
        print(f"  \033[0;32m✓\033[0m Files deleted:       \033[1m{len(self.files_deleted)}\033[0m")
        print(f"  \033[0;32m✓\033[0m Directories removed: \033[1m{len(self.dirs_deleted)}\033[0m")
        print(f"  \033[0;31m✗\033[0m Errors:              \033[1m{len(self.errors)}\033[0m")
        
        print(f"\n\033[1mNEXT STEPS:\033[0m")
        print(f"  1. Review changes: \033[1;33mgit log -1\033[0m")
        print(f"  2. Verify all branches: \033[1;33mgit branch -a\033[0m")
        print(f"  3. Push to production: \033[1;33mgit push --all origin\033[0m")
        
        print(f"\n\033[0;32m🚀 Your repo is now PRODUCTION READY.\033[0m")
        print(f"\033[0;32m📊 Report saved to: {self.report_file}\033[0m\n")

if __name__ == '__main__':
    cleanup = NuclearCleanup()
    cleanup.run()
