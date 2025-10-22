# ==============================================
# Blog API Testing Script for PowerShell
# ==============================================
# This script tests all blog management endpoints
# Run with: .\scripts\test-blog-api.ps1

$API_BASE = "http://localhost:3000/api/blog"
$LOCALE = "en"

Write-Host "======================================" -ForegroundColor Cyan
Write-Host "Testing Blog Management API" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# Test 1: List all blog posts
Write-Host "Test 1: List all blog posts" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "${API_BASE}/list?locale=${LOCALE}" -Method Get
    $response | ConvertTo-Json -Depth 10
} catch {
    Write-Host "Error: $_" -ForegroundColor Red
}
Write-Host ""
Write-Host "--------------------------------------"
Write-Host ""

# Test 2: Get a specific blog post
Write-Host "Test 2: Get blog post with ID 1" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "${API_BASE}/get?id=1&locale=${LOCALE}" -Method Get
    $response | ConvertTo-Json -Depth 10
} catch {
    Write-Host "Error: $_" -ForegroundColor Red
}
Write-Host ""
Write-Host "--------------------------------------"
Write-Host ""

# Test 3: Create a new blog post
Write-Host "Test 3: Create a new blog post" -ForegroundColor Yellow
$newPost = @{
    title = "Test Blog Post - API Testing"
    excerpt = "This is a test blog post created via the API to verify CRUD operations"
    content = @"
## Testing Blog API

This post was created automatically by the test script.

### Features Tested

- Create operation
- JSON formatting
- Markdown content
- Auto ID generation

If you see this post, the API is working correctly!
"@
    author = @{
        name = "API Test Bot"
        role = "Automated Testing"
        bio = "This is an automated test account for API verification"
        image = "/assets/logos/polaris-logo-64.png"
        initials = "TB"
    }
    category = "technology"
    readTime = 2
    image = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=60"
    tags = @("test", "api", "automation")
    featured = $false
    locale = $LOCALE
}

try {
    $createResponse = Invoke-RestMethod -Uri "${API_BASE}/create" -Method Post -Body ($newPost | ConvertTo-Json -Depth 10) -ContentType "application/json"
    $createResponse | ConvertTo-Json -Depth 10
    $NEW_POST_ID = $createResponse.data.id
    Write-Host "Created post with ID: $NEW_POST_ID" -ForegroundColor Green
} catch {
    Write-Host "Error: $_" -ForegroundColor Red
    exit 1
}
Write-Host ""
Write-Host "--------------------------------------"
Write-Host ""

# Test 4: Update the blog post
Write-Host "Test 4: Update the blog post" -ForegroundColor Yellow
$updatePost = @{
    id = $NEW_POST_ID
    title = "Test Blog Post - UPDATED via API"
    excerpt = "This test post has been updated successfully"
    featured = $true
    locale = $LOCALE
}

try {
    $updateResponse = Invoke-RestMethod -Uri "${API_BASE}/update" -Method Put -Body ($updatePost | ConvertTo-Json -Depth 10) -ContentType "application/json"
    $updateResponse | ConvertTo-Json -Depth 10
} catch {
    Write-Host "Error: $_" -ForegroundColor Red
}
Write-Host ""
Write-Host "--------------------------------------"
Write-Host ""

# Test 5: Get the updated post
Write-Host "Test 5: Verify the update" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "${API_BASE}/get?id=${NEW_POST_ID}&locale=${LOCALE}" -Method Get
    $response | ConvertTo-Json -Depth 10
} catch {
    Write-Host "Error: $_" -ForegroundColor Red
}
Write-Host ""
Write-Host "--------------------------------------"
Write-Host ""

# Test 6: List featured posts
Write-Host "Test 6: List featured posts only" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "${API_BASE}/list?locale=${LOCALE}&featured=true" -Method Get
    $response | ConvertTo-Json -Depth 10
} catch {
    Write-Host "Error: $_" -ForegroundColor Red
}
Write-Host ""
Write-Host "--------------------------------------"
Write-Host ""

# Test 7: Delete the test post
Write-Host "Test 7: Delete the test blog post" -ForegroundColor Yellow
$deletePost = @{
    id = $NEW_POST_ID
    locale = $LOCALE
}

try {
    $deleteResponse = Invoke-RestMethod -Uri "${API_BASE}/delete" -Method Delete -Body ($deletePost | ConvertTo-Json) -ContentType "application/json"
    $deleteResponse | ConvertTo-Json -Depth 10
} catch {
    Write-Host "Error: $_" -ForegroundColor Red
}
Write-Host ""
Write-Host "--------------------------------------"
Write-Host ""

# Test 8: Verify deletion
Write-Host "Test 8: Verify deletion (should return 404)" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "${API_BASE}/get?id=${NEW_POST_ID}&locale=${LOCALE}" -Method Get
    $response | ConvertTo-Json -Depth 10
} catch {
    Write-Host "Expected error - Post was successfully deleted:" -ForegroundColor Green
    Write-Host $_.Exception.Message -ForegroundColor Gray
}
Write-Host ""
Write-Host "--------------------------------------"
Write-Host ""

Write-Host "All tests completed!" -ForegroundColor Green
Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan

