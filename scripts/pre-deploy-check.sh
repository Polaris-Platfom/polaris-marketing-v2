#!/bin/bash

# ==============================================
# Pre-Deployment Verification Script
# ==============================================
# This script checks if the project is ready for deployment to Netlify

echo ""
echo "=========================================="
echo "  POLARIS PRE-DEPLOYMENT CHECK"
echo "=========================================="
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Initialize counters
PASS=0
FAIL=0
WARN=0

# Function to check if file exists
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $2"
        ((PASS++))
    else
        echo -e "${RED}✗${NC} $2"
        ((FAIL++))
    fi
}

# Function to check if directory exists
check_dir() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✓${NC} $2"
        ((PASS++))
    else
        echo -e "${RED}✗${NC} $2"
        ((FAIL++))
    fi
}

# Check essential files
echo "Checking essential files..."
check_file "netlify.toml" "netlify.toml exists"
check_file "next.config.js" "next.config.js exists"
check_file "next-i18next.config.js" "next-i18next.config.js exists"
check_file "package.json" "package.json exists"
check_file "tsconfig.json" "tsconfig.json exists"
check_file ".gitignore" ".gitignore exists"
echo ""

# Check essential directories
echo "Checking essential directories..."
check_dir "src" "src/ directory exists"
check_dir "public" "public/ directory exists"
check_dir "src/pages" "src/pages/ directory exists"
check_dir "src/components" "src/components/ directory exists"
echo ""

# Check if @netlify/plugin-nextjs is in package.json
echo "Checking Netlify plugin..."
if grep -q "@netlify/plugin-nextjs" package.json; then
    echo -e "${GREEN}✓${NC} @netlify/plugin-nextjs found in package.json"
    ((PASS++))
else
    echo -e "${RED}✗${NC} @netlify/plugin-nextjs NOT found in package.json"
    echo -e "${YELLOW}  Run: npm install -D @netlify/plugin-nextjs${NC}"
    ((FAIL++))
fi
echo ""

# Check if build script exists
echo "Checking npm scripts..."
if grep -q '"build"' package.json; then
    echo -e "${GREEN}✓${NC} Build script exists"
    ((PASS++))
else
    echo -e "${RED}✗${NC} Build script missing"
    ((FAIL++))
fi
echo ""

# Try to build the project
echo "Running build test..."
echo -e "${YELLOW}This may take a few minutes...${NC}"
if npm run build > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} Build successful"
    ((PASS++))
else
    echo -e "${RED}✗${NC} Build failed - Check errors above"
    echo -e "${YELLOW}  Run 'npm run build' to see detailed errors${NC}"
    ((FAIL++))
fi
echo ""

# Check for common issues
echo "Checking for common issues..."

# Check if .env files are in .gitignore
if grep -q "\.env" .gitignore; then
    echo -e "${GREEN}✓${NC} .env files are in .gitignore"
    ((PASS++))
else
    echo -e "${YELLOW}⚠${NC} .env files should be in .gitignore"
    ((WARN++))
fi

# Check if node_modules is in .gitignore
if grep -q "node_modules" .gitignore; then
    echo -e "${GREEN}✓${NC} node_modules is in .gitignore"
    ((PASS++))
else
    echo -e "${RED}✗${NC} node_modules should be in .gitignore"
    ((FAIL++))
fi

# Check if .next is in .gitignore
if grep -q "\.next" .gitignore; then
    echo -e "${GREEN}✓${NC} .next is in .gitignore"
    ((PASS++))
else
    echo -e "${YELLOW}⚠${NC} .next should be in .gitignore"
    ((WARN++))
fi
echo ""

# Summary
echo "=========================================="
echo "  SUMMARY"
echo "=========================================="
echo -e "${GREEN}Passed:${NC} $PASS"
if [ $WARN -gt 0 ]; then
    echo -e "${YELLOW}Warnings:${NC} $WARN"
fi
if [ $FAIL -gt 0 ]; then
    echo -e "${RED}Failed:${NC} $FAIL"
fi
echo ""

# Final verdict
if [ $FAIL -eq 0 ]; then
    echo -e "${GREEN}✓ Project is ready for deployment!${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Push to GitHub: git push origin main"
    echo "2. Connect repository to Netlify"
    echo "3. Configure environment variables in Netlify"
    echo "4. Deploy!"
    echo ""
    exit 0
else
    echo -e "${RED}✗ Please fix the issues above before deploying${NC}"
    echo ""
    exit 1
fi

