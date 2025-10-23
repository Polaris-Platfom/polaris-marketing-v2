# 🚀 Netlify Deployment Checklist

Use this checklist to ensure a smooth deployment to Netlify.

---

## ☑️ Pre-Deployment

### Local Environment

- [ ] All features tested locally (`npm run dev`)
- [ ] Build runs successfully (`npm run build`)
- [ ] No TypeScript errors (`npm run type-check`)
- [ ] No linter errors (`npm run lint`)
- [ ] All tests pass (if applicable)
- [ ] Blog consistency validated (`npm run validate:blog`)

### Code Repository

- [ ] All changes committed to Git
- [ ] Pushed to `main` branch
- [ ] `.gitignore` includes:
  - `node_modules/`
  - `.next/`
  - `.env*.local`
  - `.DS_Store`

### Configuration Files

- [ ] `netlify.toml` exists in root
- [ ] `next.config.js` configured (no `standalone` output)
- [ ] `@netlify/plugin-nextjs` in `package.json`
- [ ] `env.example` updated with all required variables

---

## ☑️ Netlify Setup

### Account & Repository

- [ ] Netlify account created
- [ ] GitHub repository connected
- [ ] Build settings detected automatically

### Build Configuration

Verify these settings in Netlify:

- [ ] **Build command**: `npm run build`
- [ ] **Publish directory**: `.next`
- [ ] **Node version**: `20`
- [ ] **Functions directory**: (auto-detected)

### Environment Variables

Configure in Netlify Dashboard → Site Settings → Environment Variables:

#### Required

- [ ] `NEXT_PUBLIC_API_URL` = `https://api.polarisplatform.ch`
- [ ] `NEXT_PUBLIC_PLATFORM_URL` = `https://app.polarisplatform.ch`
- [ ] `NEXT_PUBLIC_MARKETING_URL` = `https://polarisplatform.ch`
- [ ] `NODE_ENV` = `production`

#### Email (SMTP)

- [ ] `SMTP_HOST`
- [ ] `SMTP_PORT`
- [ ] `SMTP_SECURE`
- [ ] `SMTP_USER`
- [ ] `SMTP_PASS`
- [ ] `EMAIL_FROM`

#### Google Sheets

- [ ] `GOOGLE_SHEETS_CLIENT_EMAIL`
- [ ] `GOOGLE_SHEETS_PRIVATE_KEY` (with proper line breaks: `\n`)
- [ ] `GOOGLE_SHEETS_SHEET_ID`

#### Optional

- [ ] `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID`
- [ ] `NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID`
- [ ] `NEXT_TELEMETRY_DISABLED` = `1`

---

## ☑️ First Deployment

### Trigger Build

- [ ] Manual deploy OR
- [ ] Push to `main` branch
- [ ] Build starts automatically

### Monitor Build

- [ ] Build logs show no errors
- [ ] All dependencies installed
- [ ] Next.js build completes
- [ ] Functions deployed
- [ ] Site published

### Verify Deploy

- [ ] Site URL accessible (`https://[site-name].netlify.app`)
- [ ] Homepage loads correctly
- [ ] All pages accessible
- [ ] Images display properly
- [ ] Dark mode works
- [ ] Language switcher functions

---

## ☑️ Post-Deployment Testing

### Functionality

- [ ] Navigation works (all links)
- [ ] Contact form submits successfully
- [ ] Email notifications received
- [ ] Blog posts load correctly
- [ ] Blog API endpoints work (if using)
- [ ] Google Sheets data loads (team, testimonials)
- [ ] Multi-language switching works
- [ ] Swiss flag displays in footer

### Performance

- [ ] Page load time < 3 seconds
- [ ] Images optimized and lazy-loaded
- [ ] No console errors in browser
- [ ] Lighthouse score > 90

### SEO & Metadata

- [ ] Page titles correct
- [ ] Meta descriptions present
- [ ] Open Graph tags working
- [ ] Favicons display
- [ ] Robots.txt accessible

### Mobile

- [ ] Responsive on mobile devices
- [ ] Touch interactions work
- [ ] Mobile menu functions
- [ ] Forms usable on small screens

---

## ☑️ Custom Domain (Optional)

### DNS Configuration

- [ ] A record: `@` → `75.2.60.5`
- [ ] CNAME record: `www` → `[site-name].netlify.app`
- [ ] DNS propagation complete (24-48 hours)

### SSL Certificate

- [ ] HTTPS enabled (automatic with Netlify)
- [ ] Certificate provisioned
- [ ] HTTP redirects to HTTPS
- [ ] No mixed content warnings

### Domain Settings

- [ ] Primary domain set in Netlify
- [ ] Branch subdomains configured (if needed)
- [ ] Email on custom domain (if applicable)

---

## ☑️ Monitoring & Maintenance

### Set Up Alerts

- [ ] Build failure notifications enabled
- [ ] Deploy success emails configured
- [ ] Form submission notifications working

### Analytics

- [ ] Google Analytics tracking
- [ ] Netlify Analytics enabled (optional)
- [ ] Error tracking configured (Sentry, etc.)

### Backup & Recovery

- [ ] Environment variables backed up securely
- [ ] Repository backed up
- [ ] Deployment rollback tested

---

## 🔧 Troubleshooting

If you encounter issues, check:

1. **Build fails**: Review build logs in Netlify Dashboard
2. **Functions error**: Check API routes and serverless function limits
3. **Environment variables**: Verify all required variables are set
4. **Images not loading**: Check `next.config.js` image configuration
5. **404 errors**: Verify `netlify.toml` redirect rules

---

## 📚 Resources

- [Netlify Deployment Guide](./docs/setup/netlify-deployment.md)
- [Netlify Documentation](https://docs.netlify.com/)
- [Next.js on Netlify](https://docs.netlify.com/integrations/frameworks/next-js/)
- [Environment Variables Guide](./docs/setup/email-setup.md)

---

## ✅ Deployment Complete

Once all items are checked:

- [ ] Update team with live URL
- [ ] Share with stakeholders
- [ ] Monitor for issues in first 24 hours
- [ ] Document any custom configurations
- [ ] Celebrate! 🎉

---

**Last Updated**: 2025-01-23  
**Maintainer**: Polaris Platform Team

