#!/bin/bash

# ==============================================
# Blog API Testing Script
# ==============================================
# This script tests all blog management endpoints
# Run with: bash scripts/test-blog-api.sh

API_BASE="http://localhost:3000/api/blog"
LOCALE="en"

echo "======================================"
echo "Testing Blog Management API"
echo "======================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test 1: List all blog posts
echo -e "${YELLOW}Test 1: List all blog posts${NC}"
curl -s -X GET "${API_BASE}/list?locale=${LOCALE}" | json_pp
echo ""
echo "--------------------------------------"
echo ""

# Test 2: Get a specific blog post
echo -e "${YELLOW}Test 2: Get blog post with ID 1${NC}"
curl -s -X GET "${API_BASE}/get?id=1&locale=${LOCALE}" | json_pp
echo ""
echo "--------------------------------------"
echo ""

# Test 3: Create a new blog post
echo -e "${YELLOW}Test 3: Create a new blog post${NC}"
NEW_POST=$(curl -s -X POST "${API_BASE}/create" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Blog Post - API Testing",
    "excerpt": "This is a test blog post created via the API to verify CRUD operations",
    "content": "## Testing Blog API\n\nThis post was created automatically by the test script.\n\n### Features Tested\n\n- Create operation\n- JSON formatting\n- Markdown content\n- Auto ID generation\n\nIf you see this post, the API is working correctly!",
    "author": {
      "name": "API Test Bot",
      "role": "Automated Testing",
      "bio": "This is an automated test account for API verification",
      "image": "/assets/logos/polaris-logo-64.png",
      "initials": "TB"
    },
    "category": "technology",
    "readTime": 2,
    "image": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=60",
    "tags": ["test", "api", "automation"],
    "featured": false,
    "locale": "'"${LOCALE}"'"
  }')

echo "$NEW_POST" | json_pp

# Extract the new post ID
NEW_POST_ID=$(echo "$NEW_POST" | grep -o '"id"[[:space:]]*:[[:space:]]*"[^"]*"' | sed 's/"id"[[:space:]]*:[[:space:]]*"\([^"]*\)"/\1/')

if [ -z "$NEW_POST_ID" ]; then
  echo -e "${RED}Error: Failed to create post or extract ID${NC}"
  exit 1
fi

echo -e "${GREEN}Created post with ID: ${NEW_POST_ID}${NC}"
echo ""
echo "--------------------------------------"
echo ""

# Test 4: Update the blog post
echo -e "${YELLOW}Test 4: Update the blog post${NC}"
curl -s -X PUT "${API_BASE}/update" \
  -H "Content-Type: application/json" \
  -d '{
    "id": "'"${NEW_POST_ID}"'",
    "title": "Test Blog Post - UPDATED via API",
    "excerpt": "This test post has been updated successfully",
    "featured": true,
    "locale": "'"${LOCALE}"'"
  }' | json_pp
echo ""
echo "--------------------------------------"
echo ""

# Test 5: Get the updated post
echo -e "${YELLOW}Test 5: Verify the update${NC}"
curl -s -X GET "${API_BASE}/get?id=${NEW_POST_ID}&locale=${LOCALE}" | json_pp
echo ""
echo "--------------------------------------"
echo ""

# Test 6: List featured posts
echo -e "${YELLOW}Test 6: List featured posts only${NC}"
curl -s -X GET "${API_BASE}/list?locale=${LOCALE}&featured=true" | json_pp
echo ""
echo "--------------------------------------"
echo ""

# Test 7: Delete the test post
echo -e "${YELLOW}Test 7: Delete the test blog post${NC}"
curl -s -X DELETE "${API_BASE}/delete" \
  -H "Content-Type: application/json" \
  -d '{
    "id": "'"${NEW_POST_ID}"'",
    "locale": "'"${LOCALE}"'"
  }' | json_pp
echo ""
echo "--------------------------------------"
echo ""

# Test 8: Verify deletion
echo -e "${YELLOW}Test 8: Verify deletion (should return 404)${NC}"
curl -s -X GET "${API_BASE}/get?id=${NEW_POST_ID}&locale=${LOCALE}" | json_pp
echo ""
echo "--------------------------------------"
echo ""

echo -e "${GREEN}All tests completed!${NC}"
echo ""
echo "======================================"

