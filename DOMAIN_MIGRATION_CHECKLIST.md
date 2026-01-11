# Domain Migration Checklist

Quick checklist for migrating from localhost to your domain.

## ✅ Pre-Deployment

- [ ] Domain purchased and DNS configured
- [ ] Clerk Dashboard → Settings → Frontend API → Add `https://yourdomain.com`
- [ ] Clerk Dashboard → Settings → Paths → Configure all URLs with your domain
- [ ] Clerk Dashboard → Settings → OAuth → Add domain to Allowed Origins (if using OAuth)
- [ ] Production keys copied from Clerk Dashboard (`pk_live_...` and `sk_live_...`)

## ✅ Deployment

- [ ] Deploy application to hosting platform (Vercel/Netlify/etc.)
- [ ] Add environment variables to hosting platform:
  - [ ] `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` = `pk_live_...`
  - [ ] `CLERK_SECRET_KEY` = `sk_live_...`
  - [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - [ ] `SUPABASE_SERVICE_ROLE_KEY`
- [ ] Configure domain in hosting platform
- [ ] Wait for SSL certificate (automatic)

## ✅ Post-Deployment Testing

- [ ] Visit `https://yourdomain.com` - site loads
- [ ] Visit `https://yourdomain.com/login` - sign-in page loads
- [ ] Test sign-in - works correctly
- [ ] Test sign-up - works correctly
- [ ] Verify redirect after sign-in/sign-up
- [ ] Check Clerk Dashboard - new users appear
- [ ] Check Supabase - users sync correctly
- [ ] Test protected routes - work correctly
- [ ] Browser console - no errors
- [ ] All features working as expected

## 🔧 If Issues Occur

- [ ] Verify domain in Clerk Dashboard → Frontend API
- [ ] Verify all URLs use `https://` (not `http://`)
- [ ] Check environment variables in hosting platform
- [ ] Clear browser cache and try again
- [ ] Check hosting platform logs for errors
- [ ] Verify DNS propagation (can take up to 48 hours)

---

**For detailed instructions, see `MIGRATE_LOCALHOST_TO_DOMAIN.md`**

