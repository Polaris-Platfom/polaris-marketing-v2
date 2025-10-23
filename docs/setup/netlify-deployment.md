# Netlify Deployment Guide

This guide will walk you through deploying the Polaris Marketing website to Netlify.

## Prerequisites

- A Netlify account ([sign up here](https://app.netlify.com/signup))
- GitHub repository connected to Netlify
- Environment variables configured (see below)

---

## Quick Start

### 1. Connect Repository to Netlify

1. Log in to [Netlify](https://app.netlify.com/)
2. Click **"Add new site"** → **"Import an existing project"**
3. Select **GitHub** and authorize Netlify
4. Choose the repository: `Polaris-Platfom/polaris-marketing-v2`
5. Netlify will auto-detect Next.js settings

### 2. Configure Build Settings

Netlify should auto-detect these settings from `netlify.toml`:

```
Build command: npm run build
Publish directory: .next
Node version: 20
```

**Important:** Install the Next.js Runtime plugin:
```
npm install -D @netlify/plugin-nextjs
```

### 3. Set Environment Variables

Go to **Site Settings** → **Environment Variables** and add:

#### Required Variables

```bash
# Application URLs (Production)
NEXT_PUBLIC_API_URL=https://api.polarisplatform.ch
NEXT_PUBLIC_PLATFORM_URL=https://app.polarisplatform.ch
NEXT_PUBLIC_MARKETING_URL=https://polarisplatform.ch

# Email Configuration (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_FROM=noreply@polarisplatform.ch

# Google Sheets Integration
GOOGLE_SHEETS_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEETS_SHEET_ID=your-google-sheet-id

# Build Settings
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

#### Optional Variables

```bash
# Analytics
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID=GTM-XXXXXXX
```

---

## Deployment Steps

### Initial Deployment

1. Push your code to the `main` branch
2. Netlify will automatically trigger a build
3. Wait for the build to complete (usually 2-5 minutes)
4. Your site will be live at: `https://[site-name].netlify.app`

### Custom Domain Setup

1. Go to **Domain Settings** → **Add custom domain**
2. Enter your domain: `polarisplatform.ch`
3. Follow DNS configuration instructions
4. Enable HTTPS (automatic with Netlify)

#### DNS Configuration

Add these records to your domain:

```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www
Value: [your-site].netlify.app
```

---

## Continuous Deployment

Netlify automatically deploys when you:
- Push to the `main` branch
- Merge a pull request
- Manually trigger from the dashboard

### Deploy Previews

Every pull request gets a unique preview URL:
- Review changes before merging
- Share with stakeholders
- Test in production-like environment

---

## Build Configuration

### netlify.toml

The `netlify.toml` file contains:
- Build commands and settings
- Redirect rules
- Security headers
- Cache policies
- Environment-specific configurations

### Next.js Plugin

The `@netlify/plugin-nextjs` provides:
- Server-side rendering (SSR)
- Static site generation (SSG)
- API routes support
- Image optimization
- Incremental static regeneration

---

## Troubleshooting

### Build Fails

**Error:** "Module not found"
```bash
# Solution: Clear cache and redeploy
Site Settings → Build & Deploy → Clear cache and retry deploy
```

**Error:** "Node version mismatch"
```bash
# Solution: Update Node version in netlify.toml
[build.environment]
  NODE_VERSION = "20"
```

### Environment Variables Not Working

1. Check variable names (must start with `NEXT_PUBLIC_` for client-side)
2. Redeploy after adding variables
3. Clear build cache if issues persist

### Images Not Loading

1. Verify `remotePatterns` in `next.config.js`
2. Check image URLs are HTTPS
3. Enable automatic image optimization in Netlify

### API Routes Failing

1. Verify `@netlify/plugin-nextjs` is installed
2. Check API route exports are correct
3. Review function logs in Netlify dashboard

---

## Performance Optimization

### Enable Features

1. **Asset Optimization**
   - Netlify Dashboard → Build & Deploy → Post processing
   - Enable: Bundle CSS, Minify CSS, Minify JS

2. **Image Optimization**
   - Automatic with Next.js Image component
   - Uses Netlify's CDN

3. **Caching**
   - Configured in `netlify.toml`
   - Static assets cached for 1 year
   - HTML cached with smart invalidation

### Monitoring

- **Build Minutes:** Check usage in dashboard
- **Bandwidth:** Monitor in Analytics
- **Functions:** Track API route usage

---

## Security

### Headers

Security headers are configured in `netlify.toml`:
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin

### Secrets

⚠️ **Never commit secrets to Git**

- Use Netlify environment variables
- Sensitive keys in Google Sheets config
- SMTP passwords for email

---

## Rollback

If a deployment breaks production:

1. Go to **Deploys** tab
2. Find the last working deployment
3. Click **"Publish deploy"**
4. Site instantly rolls back

---

## Support

- [Netlify Documentation](https://docs.netlify.com/)
- [Next.js on Netlify](https://docs.netlify.com/integrations/frameworks/next-js/)
- [Community Forums](https://answers.netlify.com/)

---

## Checklist

Before deploying, ensure:

- [ ] All environment variables configured
- [ ] `netlify.toml` is in repository root
- [ ] `@netlify/plugin-nextjs` installed
- [ ] Build runs successfully locally (`npm run build`)
- [ ] All secrets are secure (not in Git)
- [ ] Custom domain DNS configured (if applicable)
- [ ] Google Sheets API credentials set up
- [ ] SMTP email credentials configured
- [ ] Test all contact forms and API routes

---

## Next Steps

After successful deployment:

1. **Test the live site thoroughly**
   - All pages load correctly
   - Forms submit successfully
   - Images display properly
   - Dark mode works
   - Multi-language switching functions

2. **Set up monitoring**
   - Google Analytics
   - Error tracking
   - Uptime monitoring

3. **Configure alerts**
   - Build failure notifications
   - Deploy success emails

4. **Document the process**
   - Share credentials securely with team
   - Update README with live URL

---

**🎉 Your Polaris Marketing website is now live on Netlify!**

