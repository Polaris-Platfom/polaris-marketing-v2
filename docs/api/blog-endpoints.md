# Blog Management API Endpoints

This document describes the CRUD endpoints for managing blog posts in the Polaris Platform.

## Quick Start

**💡 Prefer Postman?** We have a complete Postman collection ready to use!

Import `postman/Polaris-Blog-API.postman_collection.json` into Postman for instant testing with pre-configured requests, demo data, and automated tests. See `postman/README.md` for instructions.

## Endpoints Overview

- `POST /api/blog/create` - Create a new blog post
- `PUT /api/blog/update` - Update an existing blog post
- `DELETE /api/blog/delete` - Delete a blog post
- `GET /api/blog/list` - List all blog posts with optional filters
- `GET /api/blog/get` - Get a specific blog post by ID

---

## 1. Create Blog Post

**Endpoint:** `POST /api/blog/create`

**Description:** Creates a new blog post in the specified language.

### Request Body

```json
{
  "title": "The Future of Blockchain",
  "excerpt": "A short summary of the blog post",
  "content": "Full content of the blog post with markdown support...",
  "author": {
    "name": "John Doe",
    "role": "CTO & Co-Founder",
    "bio": "Blockchain engineer with expertise in decentralized systems",
    "image": "/assets/images/team/john-doe.png",
    "initials": "JD"
  },
  "category": "technology",
  "readTime": 8,
  "image": "https://example.com/image.jpg",
  "tags": ["blockchain", "technology", "innovation"],
  "featured": true,
  "locale": "en"
}
```

### Required Fields
- `title` (string)
- `excerpt` (string)
- `content` (string)
- `author` (object)
- `category` (string)

### Optional Fields
- `readTime` (number) - Auto-calculated if not provided
- `image` (string) - Featured image URL
- `tags` (string[]) - Array of tags
- `featured` (boolean) - Default: false
- `locale` (string) - Default: "en" (options: "en", "es", "de")

### Response (201 Created)

```json
{
  "success": true,
  "message": "Blog post created successfully",
  "data": {
    "id": "7",
    "title": "The Future of Blockchain",
    "excerpt": "A short summary of the blog post",
    "content": "Full content...",
    "author": { ... },
    "date": "2025-10-22",
    "category": "technology",
    "readTime": 8,
    "image": "https://example.com/image.jpg",
    "tags": ["blockchain", "technology", "innovation"],
    "featured": true
  }
}
```

### Example cURL

```bash
curl -X POST http://localhost:3000/api/blog/create \
  -H "Content-Type: application/json" \
  -d '{
    "title": "The Future of Blockchain",
    "excerpt": "A short summary",
    "content": "Full content here...",
    "author": {
      "name": "John Doe",
      "role": "CTO",
      "bio": "Expert in blockchain",
      "image": "/images/john.png",
      "initials": "JD"
    },
    "category": "technology",
    "readTime": 8,
    "image": "https://example.com/image.jpg",
    "tags": ["blockchain"],
    "featured": false,
    "locale": "en"
  }'
```

---

## 2. Update Blog Post

**Endpoint:** `PUT /api/blog/update`

**Description:** Updates an existing blog post. Only provided fields will be updated.

### Request Body

```json
{
  "id": "7",
  "title": "Updated Title",
  "excerpt": "Updated excerpt",
  "featured": true,
  "locale": "en"
}
```

### Required Fields
- `id` (string)

### Optional Fields
All other blog post fields can be updated. Only include the fields you want to change.

### Response (200 OK)

```json
{
  "success": true,
  "message": "Blog post updated successfully",
  "data": {
    "id": "7",
    "title": "Updated Title",
    "excerpt": "Updated excerpt",
    // ... other fields
  }
}
```

### Example cURL

```bash
curl -X PUT http://localhost:3000/api/blog/update \
  -H "Content-Type: application/json" \
  -d '{
    "id": "7",
    "title": "Updated Title",
    "featured": true,
    "locale": "en"
  }'
```

---

## 3. Delete Blog Post

**Endpoint:** `DELETE /api/blog/delete`

**Description:** Deletes a blog post by ID.

### Request Body

```json
{
  "id": "7",
  "locale": "en"
}
```

### Required Fields
- `id` (string)

### Optional Fields
- `locale` (string) - Default: "en" (options: "en", "es", "de")

### Response (200 OK)

```json
{
  "success": true,
  "message": "Blog post deleted successfully",
  "data": {
    "id": "7"
  }
}
```

### Example cURL

```bash
curl -X DELETE http://localhost:3000/api/blog/delete \
  -H "Content-Type: application/json" \
  -d '{
    "id": "7",
    "locale": "en"
  }'
```

---

## 4. List Blog Posts

**Endpoint:** `GET /api/blog/list`

**Description:** Lists all blog posts with optional filtering.

### Query Parameters

- `locale` (string) - Default: "en" (options: "en", "es", "de")
- `category` (string) - Filter by category
- `featured` (boolean) - Filter by featured status ("true" or "false")
- `limit` (number) - Limit number of results

### Response (200 OK)

```json
{
  "success": true,
  "message": "Found 6 blog posts",
  "data": [
    {
      "id": "1",
      "title": "Blog Post Title",
      // ... full post data
    }
  ]
}
```

### Example Requests

```bash
# Get all English posts
curl http://localhost:3000/api/blog/list?locale=en

# Get featured posts only
curl http://localhost:3000/api/blog/list?locale=en&featured=true

# Get technology category posts
curl http://localhost:3000/api/blog/list?locale=en&category=technology

# Get first 5 posts
curl http://localhost:3000/api/blog/list?locale=en&limit=5

# Combine filters
curl http://localhost:3000/api/blog/list?locale=en&category=technology&featured=true&limit=3
```

---

## 5. Get Single Blog Post

**Endpoint:** `GET /api/blog/get`

**Description:** Gets a specific blog post by ID.

### Query Parameters

- `id` (string) - Required - Blog post ID
- `locale` (string) - Default: "en" (options: "en", "es", "de")

### Response (200 OK)

```json
{
  "success": true,
  "message": "Blog post found",
  "data": {
    "id": "1",
    "title": "Blog Post Title",
    "excerpt": "Short summary",
    "content": "Full content...",
    // ... full post data
  }
}
```

### Example cURL

```bash
# Get English post with ID 1
curl http://localhost:3000/api/blog/get?id=1&locale=en

# Get Spanish post with ID 2
curl http://localhost:3000/api/blog/get?id=2&locale=es
```

---

## Error Responses

All endpoints return consistent error responses:

### 400 Bad Request
```json
{
  "success": false,
  "error": "Missing required field: id"
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": "Blog post with id 999 not found"
}
```

### 405 Method Not Allowed
```json
{
  "success": false,
  "error": "Method not allowed"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": "Internal server error while creating blog post"
}
```

---

## Categories

Available blog post categories:
- `technology`
- `community`
- `case-study`
- `future`
- `tutorial`

---

## Supported Locales

- `en` - English
- `es` - Spanish
- `de` - German

---

## Notes

### File Storage
- Blog posts are stored in JSON files in `public/data/`
- Each locale has its own file: `blog-posts-{locale}.json`
- Files are automatically created if they don't exist

### ID Generation
- IDs are auto-incremented integers stored as strings
- The system finds the highest existing ID and increments it

### Date Format
- Dates are automatically set to current date in `YYYY-MM-DD` format
- Cannot be manually set when creating posts

### Reading Time Calculation
- If not provided, reading time is auto-calculated based on word count
- Formula: `Math.ceil(wordCount / 200)` minutes

### Security Considerations
- **Important:** These endpoints currently have no authentication
- In production, implement proper authentication/authorization
- Consider adding rate limiting
- Validate and sanitize all inputs
- Add CSRF protection for state-changing operations

---

## Future Improvements

1. **Authentication:** Add JWT or session-based auth
2. **Validation:** Use a library like Zod or Yup for request validation
3. **Image Upload:** Add endpoint for uploading and managing images
4. **Search:** Implement full-text search across posts
5. **Draft System:** Add support for draft vs. published posts
6. **Versioning:** Track post revision history
7. **Bulk Operations:** Support for bulk create/update/delete
8. **Analytics:** Track views, likes, and engagement metrics

