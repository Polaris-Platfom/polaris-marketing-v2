# ==============================================
# 🏗️ POLARIS MARKETING - INDEPENDENT BUILD
# ==============================================
# Standalone application optimized for production
# Security-first approach with non-root user

# Base dependencies stage
FROM node:20-alpine AS dependencies
RUN apk add --no-cache libc6-compat curl dumb-init
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install production dependencies only
RUN npm ci --only=production && npm cache clean --force

# Development dependencies for build
FROM node:20-alpine AS dev-dependencies  
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install all dependencies including dev dependencies
RUN npm ci && npm cache clean --force

# Build stage
FROM node:20-alpine AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy dependencies
COPY --from=dev-dependencies /app/node_modules ./node_modules
COPY --from=dev-dependencies /app/package*.json ./

# Copy application source code
COPY . .

# Build the application
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# Production runtime stage  
FROM node:20-alpine AS runner

# Install runtime dependencies and create user
RUN apk add --no-cache \
    curl \
    dumb-init \
    && addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

WORKDIR /app

# Copy production dependencies
COPY --from=dependencies --chown=nextjs:nodejs /app/node_modules ./node_modules

# Copy built application
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Security: Use non-root user
USER nextjs

# Network configuration
EXPOSE 3000
ENV PORT=3000
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD curl -f http://localhost:3000/api/health || exit 1

# Use dumb-init for proper signal handling
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "server.js"]