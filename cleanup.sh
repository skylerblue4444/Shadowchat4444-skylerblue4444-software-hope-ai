#!/bin/bash
# 🚀 AGGRESSIVE CLEANUP SCRIPT - Bash Version
# Usage: bash cleanup.sh [--aggressive]

AGGRESSIVE=${1:-""}
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
REPORT_FILE="cleanup_report_${TIMESTAMP}.json"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counters
FILES_DELETED=0
DIRS_DELETED=0
TOTAL_SIZE=0

echo -e "${YELLOW}[*] Scanning for filler content...${NC}"

# Arrays
declare -a FILES_TO_DELETE
declare -a DIRS_TO_DELETE

# Patterns
FILLER_PATTERNS=(
    "TODO" "PLACEHOLDER" "STUB" "DEMO" "WIP" "TEMP"
    "FIX ME" "FIXME" "XXX" "HACK" "DELETE ME"
)

DUPLICATE_PATTERNS=(
    "(copy)" ".backup" ".old" ".unused" "-v2" "-v3" "-v4" "-v5"
    "-v6" "~" ".tmp" ".bak" "-bak" "-old"
)

SHADOW_DIRS=(
    "unused" "archive" "shadow" "backup" "temp" "old"
    "deprecated" "legacy" "staging" "tmp"
)

CRITICAL_FILES=(
    "README.md" "LICENSE" ".gitignore" "package.json"
    "package-lock.json" "yarn.lock" "tsconfig.json"
)

IGNORE_DIRS=(
    ".git" "node_modules" ".venv" "venv" "dist" "build"
    "__pycache__" ".next" "out"
)

# Function: Check if file is critical
is_critical() {
    local file="$1"
    for critical in "${CRITICAL_FILES[@]}"; do
        if [[ "$file" == "$critical" ]]; then
            return 0
        fi
    done
    return 1
}

# Function: Check if directory should be ignored
should_ignore_dir() {
    local dir="$1"
    for ignore in "${IGNORE_DIRS[@]}"; do
        if [[ "$dir" == "$ignore" ]]; then
            return 0
        fi
    done
    return 1
}

# Function: Check if file is duplicate
is_duplicate() {
    local file="$1"
    for pattern in "${DUPLICATE_PATTERNS[@]}"; do
        if [[ "$file" == *"$pattern"* ]]; then
            return 0
        fi
    done
    return 1
}

# Function: Check if file is filler
is_filler() {
    local file="$1"
    if [[ ! -f "$file" ]]; then
        return 1
    fi
    
    # Read first 5KB
    local content=$(head -c 5000 "$file" 2>/dev/null)
    for pattern in "${FILLER_PATTERNS[@]}"; do
        if [[ "$content" == *"$pattern"* ]]; then
            return 0
        fi
    done
    return 1
}

# Function: Check if file is empty
is_empty() {
    local file="$1"
    if [[ ! -f "$file" ]]; then
        return 1
    fi
    
    local line_count=$(grep -c . "$file" 2>/dev/null || echo 0)
    if [[ $line_count -lt 3 ]]; then
        return 0
    fi
    return 1
}

# Function: Scan files
scan_files() {
    echo -e "${YELLOW}[*] Pattern 1: Scanning for filler/placeholder files...${NC}"
    
    while IFS= read -r file; do
        if [[ -f "$file" ]]; then
            filename=$(basename "$file")
            
            # Skip critical files
            if is_critical "$filename"; then
                continue
            fi
            
            # Check patterns
            if is_duplicate "$filename"; then
                FILES_TO_DELETE+=("$file")
                echo -e "${RED}[x] DELETE ${file} (duplicate)${NC}"
            elif is_empty "$file"; then
                FILES_TO_DELETE+=("$file")
                echo -e "${RED}[x] DELETE ${file} (empty)${NC}"
            elif is_filler "$file"; then
                FILES_TO_DELETE+=("$file")
                echo -e "${RED}[x] DELETE ${file} (filler)${NC}"
            fi
        fi
    done < <(find . -type f \( -name "*.md" -o -name "*.js" -o -name "*.ts" -o -name "*.tsx" -o -name "*.jsx" -o -name "*.py" -o -name "*.sh" -o -name "*.json" \) 2>/dev/null)
}

# Function: Scan directories
scan_dirs() {
    echo -e "${YELLOW}[*] Pattern 2: Scanning for shadow directories...${NC}"
    
    while IFS= read -r dir; do
        if [[ -d "$dir" ]]; then
            for shadow in "${SHADOW_DIRS[@]}"; do
                if [[ "$dir" == *"$shadow"* ]]; then
                    DIRS_TO_DELETE+=("$dir")
                    echo -e "${RED}[x] DELETE DIR ${dir} (shadow)${NC}"
                fi
            done
        fi
    done < <(find . -type d 2>/dev/null | grep -v ".git" | grep -v "node_modules")
}

# Function: Preview
preview() {
    echo -e "\n${YELLOW}========================================${NC}"
    echo -e "${YELLOW}CLEANUP SUMMARY (DRY RUN)${NC}"
    echo -e "${YELLOW}========================================${NC}"
    echo -e "Files marked for deletion: ${#FILES_TO_DELETE[@]}"
    echo -e "Directories marked for deletion: ${#DIRS_TO_DELETE[@]}"
    echo -e "${YELLOW}========================================${NC}"
    echo -e "\n${YELLOW}To execute cleanup, run:${NC}"
    echo -e "${GREEN}bash cleanup.sh --aggressive${NC}\n"
}

# Function: Execute cleanup
execute() {
    echo -e "\n${RED}[!] AGGRESSIVE MODE - Deleting files...${NC}\n"
    
    FILES_DELETED=0
    FAILED_COUNT=0
    
    # Delete files
    for file in "${FILES_TO_DELETE[@]}"; do
        if rm -f "$file" 2>/dev/null; then
            ((FILES_DELETED++))
            echo -e "${GREEN}[✓] Deleted ${file}${NC}"
        else
            ((FAILED_COUNT++))
            echo -e "${RED}[✗] Failed to delete ${file}${NC}"
        fi
    done
    
    # Delete directories
    for dir in "${DIRS_TO_DELETE[@]}"; do
        if rm -rf "$dir" 2>/dev/null; then
            ((DIRS_DELETED++))
            echo -e "${GREEN}[✓] Deleted directory ${dir}${NC}"
        else
            ((FAILED_COUNT++))
            echo -e "${RED}[✗] Failed to delete ${dir}${NC}"
        fi
    done
    
    # Git operations
    echo -e "\n${YELLOW}[*] Committing changes...${NC}"
    git add -A 2>/dev/null
    git commit -m "cleanup: Remove ${FILES_DELETED} filler/duplicate files and ${DIRS_DELETED} shadow directories" 2>/dev/null
    
    # Summary
    echo -e "\n${GREEN}========================================${NC}"
    echo -e "${GREEN}CLEANUP COMPLETE!${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo -e "✓ Files deleted: ${FILES_DELETED}"
    echo -e "✓ Directories deleted: ${DIRS_DELETED}"
    echo -e "✗ Errors: ${FAILED_COUNT}"
    echo -e "\n${YELLOW}Next: git push origin main${NC}"
    echo -e "${GREEN}========================================\n${NC}"
}

# Main
scan_files
scan_dirs

if [[ "$AGGRESSIVE" == "--aggressive" ]]; then
    execute
else
    preview
fi
