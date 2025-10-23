# ==============================================
# Pre-Deployment Verification Script (PowerShell)
# ==============================================
# This script checks if the project is ready for deployment to Netlify

Write-Host ""
Write-Host "==========================================" -ForegroundColor Green
Write-Host "  POLARIS PRE-DEPLOYMENT CHECK" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
Write-Host ""

# Initialize counters
$PASS = 0
$FAIL = 0
$WARN = 0

# Function to check if file exists
function Check-File {
    param($Path, $Description)
    if (Test-Path $Path) {
        Write-Host "[OK] $Description" -ForegroundColor Green
        $script:PASS++
    } else {
        Write-Host "[FAIL] $Description" -ForegroundColor Red
        $script:FAIL++
    }
}

# Function to check if directory exists
function Check-Directory {
    param($Path, $Description)
    if (Test-Path $Path -PathType Container) {
        Write-Host "[OK] $Description" -ForegroundColor Green
        $script:PASS++
    } else {
        Write-Host "[FAIL] $Description" -ForegroundColor Red
        $script:FAIL++
    }
}

# Check essential files
Write-Host "Checking essential files..." -ForegroundColor Cyan
Check-File "netlify.toml" "netlify.toml exists"
Check-File "next.config.js" "next.config.js exists"
Check-File "next-i18next.config.js" "next-i18next.config.js exists"
Check-File "package.json" "package.json exists"
Check-File "tsconfig.json" "tsconfig.json exists"
Check-File ".gitignore" ".gitignore exists"
Write-Host ""

# Check essential directories
Write-Host "Checking essential directories..." -ForegroundColor Cyan
Check-Directory "src" "src/ directory exists"
Check-Directory "public" "public/ directory exists"
Check-Directory "src/pages" "src/pages/ directory exists"
Check-Directory "src/components" "src/components/ directory exists"
Write-Host ""

# Check if @netlify/plugin-nextjs is in package.json
Write-Host "Checking Netlify plugin..." -ForegroundColor Cyan
$packageJson = Get-Content "package.json" -Raw
if ($packageJson -match "@netlify/plugin-nextjs") {
    Write-Host "[OK] @netlify/plugin-nextjs found in package.json" -ForegroundColor Green
    $PASS++
} else {
    Write-Host "[FAIL] @netlify/plugin-nextjs NOT found in package.json" -ForegroundColor Red
    Write-Host "  Run: npm install -D @netlify/plugin-nextjs" -ForegroundColor Yellow
    $FAIL++
}
Write-Host ""

# Check if build script exists
Write-Host "Checking npm scripts..." -ForegroundColor Cyan
if ($packageJson -match '"build"') {
    Write-Host "[OK] Build script exists" -ForegroundColor Green
    $PASS++
} else {
    Write-Host "[FAIL] Build script missing" -ForegroundColor Red
    $FAIL++
}
Write-Host ""

# Try to build the project
Write-Host "Running build test..." -ForegroundColor Cyan
Write-Host "This may take a few minutes..." -ForegroundColor Yellow
try {
    $buildOutput = npm run build 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "[OK] Build successful" -ForegroundColor Green
        $PASS++
    } else {
        Write-Host "[FAIL] Build failed - Check errors above" -ForegroundColor Red
        Write-Host "  Run 'npm run build' to see detailed errors" -ForegroundColor Yellow
        $FAIL++
    }
} catch {
    Write-Host "[FAIL] Build failed - $($_.Exception.Message)" -ForegroundColor Red
    $FAIL++
}
Write-Host ""

# Check for common issues
Write-Host "Checking for common issues..." -ForegroundColor Cyan

# Check if .env files are in .gitignore
$gitignore = Get-Content ".gitignore" -Raw
if ($gitignore -match "\.env") {
    Write-Host "[OK] .env files are in .gitignore" -ForegroundColor Green
    $PASS++
} else {
    Write-Host "[WARN] .env files should be in .gitignore" -ForegroundColor Yellow
    $WARN++
}

# Check if node_modules is in .gitignore
if ($gitignore -match "node_modules") {
    Write-Host "[OK] node_modules is in .gitignore" -ForegroundColor Green
    $PASS++
} else {
    Write-Host "[FAIL] node_modules should be in .gitignore" -ForegroundColor Red
    $FAIL++
}

# Check if .next is in .gitignore
if ($gitignore -match "\.next") {
    Write-Host "[OK] .next is in .gitignore" -ForegroundColor Green
    $PASS++
} else {
    Write-Host "[WARN] .next should be in .gitignore" -ForegroundColor Yellow
    $WARN++
}
Write-Host ""

# Summary
Write-Host "==========================================" -ForegroundColor Green
Write-Host "  SUMMARY" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
Write-Host "Passed: $PASS" -ForegroundColor Green
if ($WARN -gt 0) {
    Write-Host "Warnings: $WARN" -ForegroundColor Yellow
}
if ($FAIL -gt 0) {
    Write-Host "Failed: $FAIL" -ForegroundColor Red
}
Write-Host ""

# Final verdict
if ($FAIL -eq 0) {
    Write-Host "[OK] Project is ready for deployment!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Push to GitHub: git push origin main"
    Write-Host "2. Connect repository to Netlify"
    Write-Host "3. Configure environment variables in Netlify"
    Write-Host "4. Deploy!"
    Write-Host ""
    exit 0
} else {
    Write-Host "[ERROR] Please fix the issues above before deploying" -ForegroundColor Red
    Write-Host ""
    exit 1
}

