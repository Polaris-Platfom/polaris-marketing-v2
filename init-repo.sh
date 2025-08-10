#!/bin/bash

# ==============================================
# 🚀 POLARIS MARKETING - REPOSITORY INITIALIZATION
# ==============================================
# Script to initialize the standalone marketing repository

set -e

echo "🏗️ Initializing Polaris Marketing standalone repository..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if git is available
if ! command -v git &> /dev/null; then
    echo -e "${RED}❌ Git is not installed or not in PATH${NC}"
    exit 1
fi

# Check if npm is available
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed or not in PATH${NC}"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
    echo -e "${RED}❌ Node.js 20 or higher is required. Current version: $(node --version)${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Prerequisites check passed${NC}"

# Initialize git repository if not already initialized
if [ ! -d ".git" ]; then
    echo -e "${BLUE}📦 Initializing git repository...${NC}"
    git init
    git branch -M main
    echo -e "${GREEN}✅ Git repository initialized${NC}"
else
    echo -e "${YELLOW}⚠️ Git repository already exists${NC}"
fi

# Install dependencies
echo -e "${BLUE}📥 Installing dependencies...${NC}"
npm ci
echo -e "${GREEN}✅ Dependencies installed${NC}"

# Create .env.local from example if it doesn't exist
if [ ! -f ".env.local" ]; then
    echo -e "${BLUE}🔧 Creating .env.local from example...${NC}"
    cp env.example .env.local
    echo -e "${YELLOW}⚠️ Please edit .env.local with your configuration${NC}"
else
    echo -e "${YELLOW}⚠️ .env.local already exists${NC}"
fi

# Run type check
echo -e "${BLUE}🔍 Running type check...${NC}"
npm run type-check
echo -e "${GREEN}✅ Type check passed${NC}"

# Run linting
echo -e "${BLUE}🧹 Running linter...${NC}"
npm run lint
echo -e "${GREEN}✅ Linting passed${NC}"

# Test build
echo -e "${BLUE}🏗️ Testing build...${NC}"
npm run build
echo -e "${GREEN}✅ Build successful${NC}"

# Add initial git commit if no commits exist
if [ ! "$(git rev-list --count HEAD 2>/dev/null)" ] || [ "$(git rev-list --count HEAD 2>/dev/null)" = "0" ]; then
    echo -e "${BLUE}📝 Creating initial commit...${NC}"
    git add .
    git commit -m "🎉 Initial commit: Polaris Marketing standalone repository

    - Extracted from monorepo to independent repository
    - Configured Docker deployment
    - Set up CI/CD pipeline
    - Added comprehensive documentation
    
    Features:
    - Multi-language support (EN/ES/DE)
    - Google Sheets integration
    - Email functionality
    - Real-time statistics
    - Blog system
    - Production-ready containerization"
    echo -e "${GREEN}✅ Initial commit created${NC}"
else
    echo -e "${YELLOW}⚠️ Repository already has commits${NC}"
fi

echo ""
echo -e "${GREEN}🎉 Repository initialization complete!${NC}"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo "1. Edit .env.local with your configuration"
echo "2. Set up your remote repository:"
echo "   git remote add origin https://github.com/Polaris-Platfom/polaris-marketing.git"
echo "3. Push to remote:"
echo "   git push -u origin main"
echo "4. Configure repository secrets for CI/CD:"
echo "   - DEPLOY_HOST"
echo "   - DEPLOY_USER" 
echo "   - DEPLOY_KEY"
echo ""
echo -e "${BLUE}Development commands:${NC}"
echo "• npm run dev          # Start development server"
echo "• npm run build        # Build for production"
echo "• npm run docker:build # Build Docker image"
echo "• npm run lint         # Run linter"
echo ""
echo -e "${GREEN}Happy coding! 🚀${NC}"
