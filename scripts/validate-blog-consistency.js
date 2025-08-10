#!/usr/bin/env node

/**
 * Blog Post Consistency Validator
 * 
 * This script validates that all blog posts are consistent across languages.
 * It checks for:
 * - Same number of posts in each language
 * - Same post IDs in each language
 * - Consistent tag and category format
 * - Required fields present
 * - Data structure integrity
 */

const fs = require('fs');
const path = require('path');

// Configuration
const LANGUAGES = ['en', 'es', 'de'];
const REQUIRED_FIELDS = [
  'id', 'title', 'excerpt', 'content', 'author',
  'date', 'category', 'readTime', 'image', 'tags', 'featured'
];

// Valid categories (standardized in English)
const VALID_CATEGORIES = [
  'technology', 'community', 'finance', 'case-study', 'future', 'tutorial'
];

// Valid tags (standardized in English)
const VALID_TAGS = [
  'blockchain', 'governance', 'transparency', 'community', 'technology',
  'democracy', 'participation', 'trust', 'engagement', 'community-building',
  'finance', 'management', 'best-practices', 'case-study', 'community-funding',
  'success-story', 'implementation', 'digital-democracy', 'future', 'voting',
  'step-by-step', 'tutorial', 'park-renovation', 'innovation'
];

class BlogValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.posts = {};
  }

  // Add error message
  addError(message) {
    this.errors.push(`❌ ERROR: ${message}`);
  }

  // Add warning message
  addWarning(message) {
    this.warnings.push(`⚠️  WARNING: ${message}`);
  }

  // Load blog posts for all languages
  loadPosts() {
    for (const lang of LANGUAGES) {
      const filePath = path.join(__dirname, '..', 'public', 'data', `blog-posts-${lang}.json`);
      
      if (!fs.existsSync(filePath)) {
        this.addError(`Missing blog posts file for language: ${lang}`);
        continue;
      }

      try {
        const data = fs.readFileSync(filePath, 'utf8');
        this.posts[lang] = JSON.parse(data);
        console.log(`✅ Loaded ${this.posts[lang].length} posts for ${lang.toUpperCase()}`);
      } catch (error) {
        this.addError(`Invalid JSON in ${lang} blog posts: ${error.message}`);
      }
    }
  }

  // Validate post count consistency
  validatePostCount() {
    const counts = {};
    
    for (const lang of LANGUAGES) {
      if (this.posts[lang]) {
        counts[lang] = this.posts[lang].length;
      }
    }

    const uniqueCounts = [...new Set(Object.values(counts))];
    
    if (uniqueCounts.length > 1) {
      this.addError(`Inconsistent post counts: ${JSON.stringify(counts)}`);
    } else {
      console.log(`✅ All languages have ${uniqueCounts[0]} posts`);
    }
  }

  // Validate ID consistency
  validateIdConsistency() {
    const idSets = {};
    
    for (const lang of LANGUAGES) {
      if (this.posts[lang]) {
        idSets[lang] = new Set(this.posts[lang].map(post => post.id));
      }
    }

    // Check if all languages have same IDs
    const baseIds = idSets[LANGUAGES[0]];
    let allMatch = true;

    for (let i = 1; i < LANGUAGES.length; i++) {
      const currentIds = idSets[LANGUAGES[i]];
      
      if (baseIds.size !== currentIds.size) {
        allMatch = false;
        this.addError(`ID count mismatch between ${LANGUAGES[0]} and ${LANGUAGES[i]}`);
      }

      for (const id of baseIds) {
        if (!currentIds.has(id)) {
          allMatch = false;
          this.addError(`Missing ID "${id}" in ${LANGUAGES[i]}`);
        }
      }
    }

    if (allMatch) {
      console.log(`✅ All languages have consistent IDs: ${Array.from(baseIds).sort().join(', ')}`);
    }
  }

  // Validate individual post structure
  validatePostStructure() {
    for (const lang of LANGUAGES) {
      if (!this.posts[lang]) continue;

      for (const post of this.posts[lang]) {
        // Check required fields
        for (const field of REQUIRED_FIELDS) {
          if (!post.hasOwnProperty(field)) {
            this.addError(`Missing field "${field}" in post ${post.id} (${lang})`);
          }
        }

        // Validate data types
        if (post.id && typeof post.id !== 'string') {
          this.addError(`Invalid ID type in post ${post.id} (${lang}): expected string`);
        }

        if (post.readTime && typeof post.readTime !== 'number') {
          this.addError(`Invalid readTime type in post ${post.id} (${lang}): expected number`);
        }

        if (post.featured && typeof post.featured !== 'boolean') {
          this.addError(`Invalid featured type in post ${post.id} (${lang}): expected boolean`);
        }

        if (post.tags && !Array.isArray(post.tags)) {
          this.addError(`Invalid tags type in post ${post.id} (${lang}): expected array`);
        }

        // Validate date format
        if (post.date) {
          const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
          if (!dateRegex.test(post.date)) {
            this.addError(`Invalid date format in post ${post.id} (${lang}): expected YYYY-MM-DD`);
          }
        }

        // Validate category
        if (post.category && !VALID_CATEGORIES.includes(post.category)) {
          this.addError(`Invalid category "${post.category}" in post ${post.id} (${lang})`);
        }

        // Validate tags
        if (post.tags && Array.isArray(post.tags)) {
          for (const tag of post.tags) {
            if (!VALID_TAGS.includes(tag)) {
              this.addError(`Invalid tag "${tag}" in post ${post.id} (${lang})`);
            }
          }
        }

        // Validate author structure
        if (post.author) {
          if (typeof post.author !== 'object') {
            this.addError(`Invalid author type in post ${post.id} (${lang}): expected object`);
          } else {
            const requiredAuthorFields = ['name', 'role', 'bio', 'image', 'initials'];
            for (const field of requiredAuthorFields) {
              if (!post.author.hasOwnProperty(field)) {
                this.addError(`Missing author field "${field}" in post ${post.id} (${lang})`);
              }
            }
          }
        }
      }
    }
  }

  // Validate cross-language consistency
  validateCrossLanguageConsistency() {
    if (!this.posts[LANGUAGES[0]]) return;

    for (const basePost of this.posts[LANGUAGES[0]]) {
      for (let i = 1; i < LANGUAGES.length; i++) {
        const lang = LANGUAGES[i];
        if (!this.posts[lang]) continue;

        const matchingPost = this.posts[lang].find(p => p.id === basePost.id);
        if (!matchingPost) continue;

        // Check consistent metadata
        if (basePost.category !== matchingPost.category) {
          this.addError(`Category mismatch for post ${basePost.id}: ${LANGUAGES[0]}="${basePost.category}" vs ${lang}="${matchingPost.category}"`);
        }

        if (basePost.readTime !== matchingPost.readTime) {
          this.addWarning(`ReadTime mismatch for post ${basePost.id}: ${LANGUAGES[0]}="${basePost.readTime}" vs ${lang}="${matchingPost.readTime}"`);
        }

        if (basePost.featured !== matchingPost.featured) {
          this.addError(`Featured status mismatch for post ${basePost.id}: ${LANGUAGES[0]}="${basePost.featured}" vs ${lang}="${matchingPost.featured}"`);
        }

        // Check tags consistency
        const baseTags = new Set(basePost.tags || []);
        const matchingTags = new Set(matchingPost.tags || []);
        
        if (baseTags.size !== matchingTags.size) {
          this.addError(`Tag count mismatch for post ${basePost.id}: ${LANGUAGES[0]}=${baseTags.size} vs ${lang}=${matchingTags.size}`);
        }

        for (const tag of baseTags) {
          if (!matchingTags.has(tag)) {
            this.addError(`Missing tag "${tag}" in post ${basePost.id} (${lang})`);
          }
        }
      }
    }
  }

  // Run all validations
  validate() {
    console.log('🔍 Starting Blog Post Consistency Validation...\n');
    
    this.loadPosts();
    this.validatePostCount();
    this.validateIdConsistency();
    this.validatePostStructure();
    this.validateCrossLanguageConsistency();
    
    this.printResults();
    
    return this.errors.length === 0;
  }

  // Print validation results
  printResults() {
    console.log('\n📊 VALIDATION RESULTS:');
    console.log('=' .repeat(50));
    
    if (this.errors.length === 0 && this.warnings.length === 0) {
      console.log('🎉 All validations passed! Blog posts are consistent across all languages.');
      return;
    }

    if (this.errors.length > 0) {
      console.log('\n💥 ERRORS:');
      this.errors.forEach(error => console.log(error));
    }

    if (this.warnings.length > 0) {
      console.log('\n⚠️  WARNINGS:');
      this.warnings.forEach(warning => console.log(warning));
    }

    console.log('\n📈 SUMMARY:');
    console.log(`   Errors: ${this.errors.length}`);
    console.log(`   Warnings: ${this.warnings.length}`);
    
    if (this.errors.length > 0) {
      console.log('\n❌ VALIDATION FAILED - Please fix the errors above.');
      process.exit(1);
    } else {
      console.log('\n✅ VALIDATION PASSED - Only warnings found.');
    }
  }
}

// Run validation if called directly
if (require.main === module) {
  const validator = new BlogValidator();
  validator.validate();
}

module.exports = BlogValidator; 