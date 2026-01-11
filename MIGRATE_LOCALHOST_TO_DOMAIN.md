# Complete Guide: Migrate from Localhost to Domain

This guide will help you migrate your Training Portal from localhost to your production domain.

## 📋 Prerequisites

- ✅ Domain name purchased and DNS configured
- ✅ Hosting platform account (Vercel, Netlify, etc.)
- ✅ Clerk account with production keys
- ✅ Supabase project set up
- ✅ Application tested on localhost

---

## 🚀 Step-by-Step Migration

### Step 1: Prepare Your Domain

1. **Purchase Domain** (if not done)
   - Use any registrar (GoDaddy, Namecheap, Google Domains, etc.)
   - Example: `yourdomain.com`

2. **Configure DNS**
   - Point your domain to your hosting platform
   - For Vercel: Add A/CNAME records as instructed
   - For Netlify: Add DNS records as instructed
   - Wait for DNS propagation (can take up to 48 hours, usually 1-2 hours)

---

### Step 2: Configure Clerk Dashboard for Your Domain

**This is CRITICAL - Do this BEFORE deploying!**

1. **Go to Clerk Dashboard**
   - Visit https://dashboard.clerk.com
   - Select your **Production** application

2. **Configure Frontend API**
   - Go to **Settings** → **Frontend API**
   - Add your production domain(s):
     ```
     https://yourdomain.com
     https://www.yourdomain.com  (if using www)
     ```
   - Click **Save**

3. **Configure Paths**
   - Go to **Settings** → **Paths**
   - Set these URLs:
     - **Sign-in URL**: `https://yourdomain.com/login`
     - **Sign-up URL**: `https://yourdomain.com/sign-up`
     - **After sign-in URL**: `https://yourdomain.com/redirect-dashboard`
     - **After sign-up URL**: `https://yourdomain.com/redirect-dashboard`
   - Click **Save**

4. **Configure OAuth (if using social logins)**
   - Go to **Settings** → **OAuth**
   - Add to **Allowed Origins**:
     ```
     https://yourdomain.com
     https://www.yourdomain.com
     ```
   - Update OAuth redirect URIs in each provider (Google, GitHub, etc.)

5. **Get Production Keys**
   - Go to **API Keys** section
   - Copy:
     - **Publishable Key** (starts with `pk_live_...`)
     - **Secret Key** (starts with `sk_live_...`)
   - Save these securely

---

### Step 3: Prepare Environment Variables

Create a list of all environment variables you'll need:

```env
# Clerk Production Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...

# Supabase (keep existing)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Optional: Clerk URLs (if custom)
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/redirect-dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/redirect-dashboard
```

---

### Step 4: Deploy to Hosting Platform

#### Option A: Vercel (Recommended for Next.js)

1. **Install Vercel CLI** (if not installed)
   ```powershell
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```powershell
   vercel login
   ```

3. **Deploy**
   ```powershell
   vercel --prod
   ```

4. **Add Environment Variables**
   - Go to Vercel Dashboard → Your Project → **Settings** → **Environment Variables**
   - Add all variables from Step 3
   - Make sure to select **Production** environment
   - Click **Save**

5. **Configure Domain**
   - Go to **Settings** → **Domains**
   - Add your domain: `yourdomain.com`
   - Follow DNS configuration instructions
   - Wait for SSL certificate (automatic, usually 1-2 minutes)

#### Option B: Netlify

1. **Connect Repository**
   - Go to Netlify Dashboard
   - Click "Add new site" → "Import an existing project"
   - Connect your Git repository

2. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`

3. **Add Environment Variables**
   - Go to **Site settings** → **Environment variables**
   - Add all variables from Step 3
   - Set scope to **Production**

4. **Configure Domain**
   - Go to **Domain settings**
   - Add custom domain
   - Follow DNS configuration instructions

#### Option C: Other Platforms

Follow your platform's specific instructions for:
- Setting environment variables
- Configuring domain
- Deploying Next.js applications

---

### Step 5: Update Local Development (Optional)

For local development, you can keep using development keys:

**`.env.local` (for local development):**
```env
# Development Keys (for localhost)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Supabase (same for dev and prod)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

**Note:** Production keys are set in your hosting platform, not in `.env.local`

---

### Step 6: Verify Deployment

1. **Check Domain**
   - Visit `https://yourdomain.com`
   - Verify site loads correctly
   - Check SSL certificate (should be automatic)

2. **Test Authentication**
   - Visit `https://yourdomain.com/login`
   - Try signing in
   - Verify redirect works
   - Check browser console for errors

3. **Test Sign-Up**
   - Visit `https://yourdomain.com/sign-up`
   - Create a test account
   - Verify user appears in Clerk Dashboard
   - Verify user syncs to Supabase

4. **Test Protected Routes**
   - Sign in and navigate to protected pages
   - Verify middleware works correctly
   - Test role-based access

---

### Step 7: Post-Deployment Checklist

- [ ] Domain configured and SSL active
- [ ] Clerk Dashboard configured with production domain
- [ ] Environment variables set in hosting platform
- [ ] Application deployed successfully
- [ ] Sign-in works on production domain
- [ ] Sign-up works on production domain
- [ ] Users sync to Supabase correctly
- [ ] Protected routes work correctly
- [ ] No console errors in browser
- [ ] All features tested and working

---

## 🔧 Troubleshooting

### Issue: "Failed to load Clerk" on Production

**Solution:**
1. Verify domain is added in Clerk Dashboard → Settings → Frontend API
2. Check environment variables are set correctly in hosting platform
3. Clear browser cache and try again
4. Check browser console for specific errors

### Issue: "Redirect URL not allowed"

**Solution:**
1. Go to Clerk Dashboard → Settings → Paths
2. Verify all URLs use `https://yourdomain.com` (not `http://`)
3. Make sure paths match exactly

### Issue: Users not syncing to Supabase

**Solution:**
1. Verify `SUPABASE_SERVICE_ROLE_KEY` is set in hosting platform
2. Check Supabase RLS policies allow the sync
3. Check server logs for errors

### Issue: Domain not loading

**Solution:**
1. Verify DNS records are correct
2. Wait for DNS propagation (can take up to 48 hours)
3. Check hosting platform status
4. Verify SSL certificate is active

### Issue: CORS Errors

**Solution:**
1. Add domain to Clerk Dashboard → Settings → OAuth → Allowed Origins
2. Verify domain uses `https://` (not `http://`)
3. Check browser console for specific CORS errors

---

## 📝 Environment Variables Summary

### For Production (Hosting Platform):
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

### For Local Development (.env.local):
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

**Key Point:** Use production keys (`pk_live_`) in hosting platform, development keys (`pk_test_`) for localhost.

---

## 🎯 Quick Reference

### Clerk Dashboard URLs to Configure:
- **Frontend API**: `https://yourdomain.com`
- **Sign-in**: `https://yourdomain.com/login`
- **Sign-up**: `https://yourdomain.com/sign-up`
- **After sign-in**: `https://yourdomain.com/redirect-dashboard`
- **After sign-up**: `https://yourdomain.com/redirect-dashboard`

### Important Notes:
- ✅ Always use `https://` (not `http://`) for production
- ✅ Configure Clerk Dashboard BEFORE deploying
- ✅ Use production keys only in hosting platform
- ✅ Keep development keys for local development
- ✅ Test thoroughly after deployment

---

## 🆘 Need Help?

1. Check Clerk Dashboard for configuration errors
2. Review hosting platform logs
3. Check browser console for errors
4. Verify all environment variables are set
5. Test with a fresh browser session (incognito)

---

**Congratulations!** Your application is now live on your domain! 🎉

