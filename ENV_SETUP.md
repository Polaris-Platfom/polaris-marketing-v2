# 🔐 Environment Variables Setup

Simple, secure, single source of truth.

---

## 🚀 Quick Setup

### 1. Local Development

```bash
# Copy the example file
cp env.example .env.local

# Edit with your real credentials
# Windows: notepad .env.local
# Mac/Linux: nano .env.local
```

### 2. Netlify Deployment

1. Go to [Netlify Dashboard](https://app.netlify.com/)
2. Your Site → **Settings** → **Environment Variables**
3. Copy **each variable** from `env.example`
4. Paste with **your real values** (same as `.env.local`)

---

## 📋 Required Credentials

### Supabase (for database and email functions)
- Setup guide: `docs/setup/supabase-setup.md`
- Get credentials from: https://supabase.com/dashboard/project/_/settings/api
- Fill in:
  - `NEXT_PUBLIC_SUPABASE_URL` - Your project URL
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Public anon key
  - `SUPABASE_SERVICE_ROLE_KEY` - Service role key (keep secret!)

### Resend (for sending emails)
- Get API key from: https://resend.com/api-keys
- Fill in: `RESEND_API_KEY`
- Configure in Supabase Edge Function secrets

### Email Addresses
- Fill in: `FROM_EMAIL`, `CONTACT_EMAIL`, `NEWSLETTER_EMAIL`, `SUPPORT_EMAIL`
- Use your actual domain emails

---

## 🔒 Security Rules

✅ **DO:**
- Keep `.env.local` on your machine only
- Use different credentials for dev/prod if needed
- Store production secrets in Netlify dashboard
- Keep `env.example` updated (without real values)

❌ **DON'T:**
- Commit `.env.local` to git (already in `.gitignore`)
- Share credentials via email/chat
- Use production credentials locally
- Hardcode secrets in code

---

## 🆘 Server Update

To update production server variables:

```bash
ssh deploy@polarisplatform.ch
cd /home/deploy/polaris-marketing
nano .env
# Edit variables
# Save: Ctrl+X, Y, Enter

# Restart
docker-compose -f docker-compose.prod.yml restart
```

---

**One file. One source. Secure.**

