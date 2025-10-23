# 🗄️ Supabase Setup Guide

Complete guide for setting up Supabase for the Polaris Marketing website.

---

## 📋 Overview

This project uses Supabase for:
- **Database**: Store newsletter subscribers and job applications
- **Edge Functions**: Send emails via Resend API
- **Row Level Security (RLS)**: Secure data access

---

## 🚀 Quick Setup

### 1. Create Supabase Project

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Click **"New Project"**
3. Fill in:
   - Name: `polaris-marketing` (or your preferred name)
   - Database Password: Generate a strong password
   - Region: Choose closest to your users
4. Click **"Create new project"**
5. Wait 2-3 minutes for setup to complete

### 2. Get API Credentials

1. In your project, go to **Settings** → **API**
2. Copy these values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: Starts with `eyJ...`
   - **service_role key**: Starts with `eyJ...` (keep this secret!)

### 3. Configure Environment Variables

Add to your `.env.local`:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

---

## 🗂️ Database Setup

The tables are created automatically via migrations. They include:

### Tables Created

**1. newsletter_subscribers**
- Stores email subscribers from the marketing site
- Fields: email, name, source, language, status
- RLS enabled: Public insert, authenticated read

**2. job_applications**
- Stores job application submissions
- Fields: name, email, phone, position, resume, cover_letter, status
- RLS enabled: Public insert, authenticated read/update

### Verify Tables

1. Go to **Table Editor** in Supabase dashboard
2. You should see both tables with sample structure
3. Check **Authentication** → **Policies** to verify RLS

---

## 📧 Resend Email Setup

### 1. Get Resend API Key

1. Go to [Resend](https://resend.com/)
2. Sign up or log in
3. Create API Key:
   - Name: `Polaris Marketing`
   - Permission: **Full Access**
4. Copy the API key (starts with `re_...`)

### 2. Verify Your Domain (Production)

1. In Resend dashboard, go to **Domains**
2. Add your domain: `polarisplatform.ch`
3. Add the DNS records to your domain registrar:
   - SPF record
   - DKIM records
4. Wait for verification (usually 5-10 minutes)

**For development**: You can use Resend's test domain initially.

### 3. Configure Edge Function Secrets

The Edge Function needs the Resend API key. Set it in Supabase:

**Option A: Via Supabase Dashboard**
1. Go to **Edge Functions** → **Secrets**
2. Add secret:
   - Key: `RESEND_API_KEY`
   - Value: `re_your_api_key_here`

**Option B: Via Supabase CLI**
```bash
supabase secrets set RESEND_API_KEY=re_your_api_key_here
```

Also set email addresses as secrets:
```bash
supabase secrets set FROM_EMAIL=noreply@polarisplatform.ch
supabase secrets set CONTACT_EMAIL=hello@polarisplatform.ch
supabase secrets set NEWSLETTER_EMAIL=newsletter@polarisplatform.ch
```

---

## 🔧 Edge Function Deployment

The `send-email` Edge Function is already deployed. To redeploy or update:

### Via MCP Tools (Already Done)
The Edge Function was deployed using MCP Supabase tools during migration.

### Via Supabase CLI (Manual)
```bash
# Install Supabase CLI if needed
npm install -g supabase

# Login
supabase login

# Link to your project
supabase link --project-ref your-project-ref

# Deploy function
supabase functions deploy send-email

# Set secrets
supabase secrets set RESEND_API_KEY=re_your_key_here
supabase secrets set FROM_EMAIL=noreply@polarisplatform.ch
supabase secrets set CONTACT_EMAIL=hello@polarisplatform.ch
supabase secrets set NEWSLETTER_EMAIL=newsletter@polarisplatform.ch
```

---

## 🧪 Testing

### Test Database Connection

Create a test API endpoint or use the Supabase dashboard:

**Via Dashboard:**
1. Go to **Table Editor**
2. Select `newsletter_subscribers`
3. Click **Insert row**
4. Add test data
5. Verify it appears in the table

**Via API:**
```bash
curl -X POST http://localhost:3000/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "source": "test",
    "language": "es"
  }'
```

### Test Email Function

**Via API:**
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "Test message"
  }'
```

**Via Supabase Dashboard:**
1. Go to **Edge Functions** → `send-email`
2. Click **Invoke**
3. Test with payload:
```json
{
  "type": "contact",
  "data": {
    "name": "Test",
    "email": "test@example.com",
    "message": "Hello"
  }
}
```

---

## 🔒 Security Best Practices

### Row Level Security (RLS)

RLS is enabled on all tables. Current policies:

**newsletter_subscribers:**
- ✅ Anyone can INSERT (subscribe)
- ✅ Authenticated users can SELECT (view)
- ✅ Service role has full access

**job_applications:**
- ✅ Anyone can INSERT (apply)
- ✅ Authenticated users can SELECT and UPDATE (review)
- ✅ Service role has full access

### API Keys

- **anon key**: Safe to use in frontend (public)
- **service_role key**: NEVER expose in frontend, use only server-side
- **Resend API key**: Keep in Edge Function secrets only

### Rate Limiting

Consider adding rate limiting to prevent spam:

1. **Supabase level**: Configure in project settings
2. **Application level**: Add rate limiting middleware in Next.js
3. **Edge Function level**: Add rate limiting in the function itself

---

## 📊 Monitoring

### View Logs

**Edge Function Logs:**
1. Go to **Edge Functions** → `send-email`
2. Click **Logs** tab
3. Monitor email sending status

**Database Activity:**
1. Go to **Database** → **Activity**
2. Monitor queries and performance

### Alerts

Set up alerts in Supabase dashboard:
1. Go to **Settings** → **Alerts**
2. Configure alerts for:
   - High error rates
   - API usage limits
   - Storage limits

---

## 🚢 Production Deployment

### Netlify Environment Variables

Add to Netlify:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### Verify Production

1. Deploy to Netlify
2. Test contact form
3. Test newsletter subscription
4. Test job application
5. Verify emails are received
6. Check data in Supabase dashboard

---

## 🆘 Troubleshooting

### Issue: "Invalid API key" error

**Solution:**
- Verify environment variables are set correctly
- Check for extra spaces in API keys
- Ensure you're using the correct project

### Issue: Emails not sending

**Solution:**
- Verify Resend API key is set in Edge Function secrets
- Check Edge Function logs for errors
- Verify domain is verified in Resend (for production)
- Check "from" email address is authorized

### Issue: RLS policy blocking access

**Solution:**
- Check RLS policies in Supabase dashboard
- Verify user authentication if needed
- Use service role key for admin operations

### Issue: Database connection failed

**Solution:**
- Verify Supabase URL is correct
- Check network connectivity
- Verify project is not paused (free tier)

---

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Resend Documentation](https://resend.com/docs)
- [Edge Functions Guide](https://supabase.com/docs/guides/functions)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)

---

## 🔄 Migration from Google Sheets

If migrating existing data:

### Export from Google Sheets
1. Open your Google Sheet
2. File → Download → CSV
3. Clean data if needed

### Import to Supabase
1. Go to **Table Editor** → `newsletter_subscribers`
2. Click **Import data**
3. Upload CSV
4. Map columns
5. Import

Or use SQL:
```sql
INSERT INTO newsletter_subscribers (email, name, source, language)
VALUES 
  ('user1@example.com', 'User 1', 'website', 'es'),
  ('user2@example.com', 'User 2', 'website', 'en');
```

---

**Setup complete! Your Supabase integration is ready.** 🎉

