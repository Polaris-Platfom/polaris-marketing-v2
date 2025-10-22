# Blog API - Practical Examples

Quick reference guide with real-world examples for using the Blog Management API.

## Table of Contents
- [Basic Operations](#basic-operations)
- [Advanced Queries](#advanced-queries)
- [Common Workflows](#common-workflows)
- [Error Handling](#error-handling)

---

## Basic Operations

### 1. Create a Technology Blog Post

```bash
curl -X POST http://localhost:3000/api/blog/create \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Introduction to Smart Contracts",
    "excerpt": "Learn the fundamentals of smart contracts and how they power decentralized applications.",
    "content": "## What are Smart Contracts?\n\nSmart contracts are self-executing contracts with the terms directly written into code...\n\n### Benefits\n- Automation\n- Transparency\n- Security",
    "author": {
      "name": "Osmel P. Teran",
      "role": "CTO & Co-Founder",
      "bio": "Blockchain engineer with expertise in decentralized systems",
      "image": "/assets/images/team/osmel-teran.png",
      "initials": "OPT"
    },
    "category": "technology",
    "readTime": 5,
    "image": "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&auto=format&fit=crop&q=60",
    "tags": ["blockchain", "smart-contracts", "technology"],
    "featured": true,
    "locale": "en"
  }'
```

### 2. Create a Community Blog Post

```bash
curl -X POST http://localhost:3000/api/blog/create \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Building Inclusive Communities",
    "excerpt": "Strategies for creating welcoming and diverse community spaces.",
    "content": "Creating inclusive communities requires intentional effort and clear values...",
    "author": {
      "name": "Dionne P. Teran",
      "role": "Head of Community",
      "bio": "Community management expert",
      "image": "/team/dionne.jpg",
      "initials": "DPT"
    },
    "category": "community",
    "image": "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&auto=format&fit=crop&q=60",
    "tags": ["community", "inclusion", "diversity"],
    "locale": "en"
  }'
```

### 3. Update Post Title and Featured Status

```bash
curl -X PUT http://localhost:3000/api/blog/update \
  -H "Content-Type: application/json" \
  -d '{
    "id": "7",
    "title": "Introduction to Smart Contracts - Updated Edition",
    "featured": true,
    "locale": "en"
  }'
```

### 4. Delete a Blog Post

```bash
curl -X DELETE http://localhost:3000/api/blog/delete \
  -H "Content-Type: application/json" \
  -d '{
    "id": "7",
    "locale": "en"
  }'
```

---

## Advanced Queries

### Get All Featured Posts

```bash
curl "http://localhost:3000/api/blog/list?locale=en&featured=true"
```

### Get Technology Category Posts (Limited to 5)

```bash
curl "http://localhost:3000/api/blog/list?locale=en&category=technology&limit=5"
```

### Get Spanish Posts

```bash
curl "http://localhost:3000/api/blog/list?locale=es"
```

### Get Specific Post by ID

```bash
curl "http://localhost:3000/api/blog/get?id=1&locale=en"
```

### Get Featured Technology Posts

```bash
curl "http://localhost:3000/api/blog/list?locale=en&category=technology&featured=true"
```

---

## Common Workflows

### Workflow 1: Create and Immediately Update

```bash
# Step 1: Create the post
RESPONSE=$(curl -s -X POST http://localhost:3000/api/blog/create \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Draft Post",
    "excerpt": "Initial version",
    "content": "Content here...",
    "author": {
      "name": "Author Name",
      "role": "Role",
      "bio": "Bio",
      "image": "/image.jpg",
      "initials": "AN"
    },
    "category": "technology",
    "locale": "en"
  }')

# Extract the new post ID (requires jq)
POST_ID=$(echo $RESPONSE | jq -r '.data.id')

# Step 2: Update the post
curl -X PUT http://localhost:3000/api/blog/update \
  -H "Content-Type: application/json" \
  -d "{
    \"id\": \"$POST_ID\",
    \"title\": \"Published Post\",
    \"featured\": true,
    \"locale\": \"en\"
  }"
```

### Workflow 2: Publish Same Post in Multiple Languages

```bash
# English version
curl -X POST http://localhost:3000/api/blog/create \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Global Community Update",
    "excerpt": "Updates from our global community",
    "content": "We are excited to share...",
    "author": { ... },
    "category": "community",
    "locale": "en"
  }'

# Spanish version
curl -X POST http://localhost:3000/api/blog/create \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Actualización de la Comunidad Global",
    "excerpt": "Actualizaciones de nuestra comunidad global",
    "content": "Estamos emocionados de compartir...",
    "author": { ... },
    "category": "community",
    "locale": "es"
  }'

# German version
curl -X POST http://localhost:3000/api/blog/create \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Globale Community-Update",
    "excerpt": "Updates aus unserer globalen Community",
    "content": "Wir freuen uns zu teilen...",
    "author": { ... },
    "category": "community",
    "locale": "de"
  }'
```

### Workflow 3: Content Migration

```bash
# Get all posts from English
curl "http://localhost:3000/api/blog/list?locale=en" > en-posts.json

# Process and translate (manual or automated)
# ...

# Create posts in target language
cat de-posts.json | jq -c '.[]' | while read post; do
  curl -X POST http://localhost:3000/api/blog/create \
    -H "Content-Type: application/json" \
    -d "$post"
done
```

---

## Error Handling

### Example: Handling Missing Fields

```bash
# This will fail with 400 Bad Request
curl -X POST http://localhost:3000/api/blog/create \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Incomplete Post"
  }'

# Response:
# {
#   "success": false,
#   "error": "Missing required fields: title, excerpt, content, author, category"
# }
```

### Example: Handling Non-existent Post

```bash
# This will fail with 404 Not Found
curl "http://localhost:3000/api/blog/get?id=99999&locale=en"

# Response:
# {
#   "success": false,
#   "error": "Blog post with id 99999 not found"
# }
```

### Example: Handling Invalid Locale

```bash
# This will fail with 400 Bad Request
curl "http://localhost:3000/api/blog/list?locale=fr"

# Response:
# {
#   "success": false,
#   "error": "Invalid locale. Must be one of: en, es, de"
# }
```

---

## PowerShell Examples (Windows)

### Create a Post

```powershell
$body = @{
    title = "PowerShell Test Post"
    excerpt = "Created using PowerShell"
    content = "Full content here..."
    author = @{
        name = "Test Author"
        role = "Developer"
        bio = "Bio here"
        image = "/image.jpg"
        initials = "TA"
    }
    category = "technology"
    locale = "en"
} | ConvertTo-Json -Depth 5

Invoke-RestMethod -Uri "http://localhost:3000/api/blog/create" `
    -Method Post `
    -Body $body `
    -ContentType "application/json"
```

### List Posts

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/blog/list?locale=en&limit=5" `
    -Method Get
```

### Update a Post

```powershell
$updateBody = @{
    id = "7"
    title = "Updated Title"
    featured = $true
    locale = "en"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/blog/update" `
    -Method Put `
    -Body $updateBody `
    -ContentType "application/json"
```

### Delete a Post

```powershell
$deleteBody = @{
    id = "7"
    locale = "en"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/blog/delete" `
    -Method Delete `
    -Body $deleteBody `
    -ContentType "application/json"
```

---

## JavaScript/Node.js Examples

### Using fetch API

```javascript
// Create a post
async function createPost() {
  const response = await fetch('http://localhost:3000/api/blog/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: "JavaScript Example Post",
      excerpt: "Created using JavaScript",
      content: "Full content...",
      author: {
        name: "JS Developer",
        role: "Developer",
        bio: "Bio here",
        image: "/image.jpg",
        initials: "JD"
      },
      category: "technology",
      locale: "en"
    })
  });
  
  const data = await response.json();
  console.log(data);
}

// List posts
async function listPosts() {
  const response = await fetch('http://localhost:3000/api/blog/list?locale=en&limit=10');
  const data = await response.json();
  console.log(data);
}

// Update a post
async function updatePost(id) {
  const response = await fetch('http://localhost:3000/api/blog/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
      title: "Updated Title",
      featured: true,
      locale: "en"
    })
  });
  
  const data = await response.json();
  console.log(data);
}

// Delete a post
async function deletePost(id) {
  const response = await fetch('http://localhost:3000/api/blog/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
      locale: "en"
    })
  });
  
  const data = await response.json();
  console.log(data);
}
```

---

## Tips and Best Practices

### 1. Content Organization
- Use consistent categories across languages
- Keep tag names standardized
- Use descriptive and SEO-friendly titles

### 2. Multi-language Support
- Always create content in primary language (English) first
- Use the same post structure across all languages
- Consider using translation management tools for consistency

### 3. Images
- Use high-quality images (min 800px wide)
- Optimize images before uploading
- Use Unsplash or similar for stock photos
- Ensure proper image licensing

### 4. Author Information
- Keep author bios consistent across posts
- Use proper image paths
- Update author roles when necessary

### 5. Featured Posts
- Feature only high-quality, important posts
- Limit featured posts to 3-5 at a time
- Review and update featured posts regularly

### 6. Tags and Categories
- Use lowercase tags for consistency
- Don't exceed 5-7 tags per post
- Stick to predefined categories
- Review tags periodically for consolidation

---

## Automation Ideas

### 1. Scheduled Publishing
Create a cron job or scheduled task to publish posts at specific times

### 2. Backup Script
Regularly backup blog data to external storage

### 3. Analytics Integration
Track post views and engagement metrics

### 4. Content Validation
Implement automated checks for content quality and SEO

### 5. Social Media Integration
Auto-post to social media when new content is published

---

## Troubleshooting

### Issue: Post not appearing after creation
- Check the locale parameter matches the language you're viewing
- Verify the post was created successfully (check response)
- Refresh the blog page

### Issue: Cannot update post
- Ensure the post ID is correct
- Verify the locale matches the original post locale
- Check that the post exists in the target locale

### Issue: Images not loading
- Verify image URLs are accessible
- Check for CORS issues with external images
- Use relative paths for local images

### Issue: Reading time incorrect
- Provide manual readTime if auto-calculation is off
- Count should be: `Math.ceil(wordCount / 200)`

---

For more information, see the [complete API documentation](./blog-endpoints.md).

