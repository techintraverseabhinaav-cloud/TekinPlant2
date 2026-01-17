# Clerk New Account Setup Verification

## ✅ Configuration Check

Your website is configured to use Clerk keys from environment variables. After changing to a new Clerk account, verify the following:

### 1. Environment Variables

Make sure your `.env.local` file has the new keys:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_... or pk_live_...
CLERK_SECRET_KEY=sk_test_... or sk_live_...
```

**Important:**
- Development keys start with `pk_test_` and `sk_test_`
- Production keys start with `pk_live_` and `sk_live_`
- Make sure both keys are from the same Clerk account

### 2. Clerk Dashboard Configuration

In your new Clerk account dashboard:

#### A. Configure Allowed Domains (if using production keys)
1. Go to **Settings** → **Domains**
2. Add your domains:
   - `localhost` (for development)
   - Your production domain (if deployed)

#### B. Configure OAuth Providers (if needed)
1. Go to **User & Authentication** → **Social Connections**
2. Enable providers you want (Google, GitHub, etc.)
3. Add OAuth credentials for each provider

#### C. Set Up User Roles
1. Go to **User & Authentication** → **Roles**
2. Create these roles:
   - `student`
   - `trainer`
   - `admin`
   - `corporate`

### 3. Webhook Configuration (if using webhooks)

If you have webhooks set up:
1. Go to **Webhooks** in Clerk Dashboard
2. Update the endpoint URL to match your deployment
3. Update the signing secret in `.env.local`:
   ```env
   CLERK_WEBHOOK_SECRET=whsec_...
   ```

### 4. Verify Everything Works

After updating keys and restarting the server:

1. **Check Browser Console**
   - Open DevTools (F12)
   - Look for any Clerk errors
   - Should see no authentication errors

2. **Test Sign-In**
   - Go to `/login`
   - Try signing in with email/password
   - Should work without errors

3. **Test Sign-Up**
   - Go to `/sign-up`
   - Create a new account
   - Should redirect to dashboard after sign-up

4. **Test Protected Routes**
   - Try accessing `/student-dashboard`
   - Should require authentication
   - Should redirect to login if not signed in

5. **Test API Routes**
   - Try enrolling in a course
   - Should work without middleware errors

## 🔧 Troubleshooting

### Issue: "Clerk: auth() was called but Clerk can't detect usage of clerkMiddleware()"

**Solution:**
1. Clear Next.js cache: `Remove-Item -Recurse -Force .next`
2. Restart dev server: `npm run dev`
3. Hard refresh browser: `Ctrl+Shift+R`

### Issue: "Invalid Clerk key"

**Solution:**
1. Verify keys are correct in `.env.local`
2. Make sure keys are from the same Clerk account
3. Restart dev server after changing keys

### Issue: "Clerk script not found"

**Solution:**
1. Check `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` is set
2. Verify key starts with `pk_test_` or `pk_live_`
3. Clear browser cache and hard refresh

### Issue: Users not syncing to Supabase

**Solution:**
1. Check `SUPABASE_SERVICE_ROLE_KEY` is set in `.env.local`
2. Verify Supabase URL is correct
3. Check server logs for sync errors

## 📋 Current Configuration Status

✅ **Middleware**: Properly configured at `./middleware.ts`
✅ **ClerkProvider**: Configured in `app/layout.tsx`
✅ **Environment Variables**: Using `process.env` (no hardcoded keys)
✅ **API Routes**: All use `auth()` from Clerk
✅ **User Sync**: Automatic sync to Supabase configured

## 🚀 Next Steps

1. **Test the website** - Make sure all features work
2. **Test authentication** - Sign in/up should work smoothly
3. **Test enrollment** - Course enrollment should work
4. **Check user sync** - Verify users are created in Supabase

If everything works, you're all set! 🎉

