# Connect Project to New Supabase Project

This guide will help you connect your Training Portal to a new Supabase project.

## 📋 Prerequisites

1. A Supabase account (sign up at https://supabase.com if needed)
2. Your project files ready
3. Access to your project's `.env.local` file

---

## 🚀 Step 1: Create a New Supabase Project

1. **Go to Supabase Dashboard**
   - Visit https://app.supabase.com
   - Sign in with your account

2. **Create New Project**
   - Click **"New Project"** button
   - Fill in the project details:
     - **Name**: `tekinplant` (or your preferred name)
     - **Database Password**: Create a strong password (save it securely!)
     - **Region**: Choose the region closest to your users
     - **Pricing Plan**: Select your plan (Free tier is fine for development)
   - Click **"Create new project"**
   - Wait 2-3 minutes for the project to be set up

---

## 🔑 Step 2: Get Your API Keys

1. **Navigate to API Settings**
   - In your Supabase project dashboard
   - Go to **Settings** → **API**

2. **Copy Required Keys**
   You'll need these three values:
   
   - **Project URL**
     - Example: `https://xxxxxxxxxxxxx.supabase.co`
     - This is your `NEXT_PUBLIC_SUPABASE_URL`
   
   - **anon public key**
     - Starts with `eyJ...`
     - This is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - Safe to use in client-side code (protected by RLS)
   
   - **service_role secret key**
     - Starts with `eyJ...` (different from anon key)
     - This is your `SUPABASE_SERVICE_ROLE_KEY`
     - ⚠️ **KEEP SECRET** - Only use server-side!
     - Click "Reveal" to see the full key

3. **Save These Keys Securely**
   - Copy them to a secure location
   - You'll need them in Step 4

---

## 🗄️ Step 3: Set Up Database Schema

Your project requires specific database tables. Follow these steps:

1. **Open SQL Editor**
   - In Supabase dashboard, go to **SQL Editor**
   - Click **"New Query"**

2. **Run Main Schema**
   - Open the file: `supabase/schema.sql` in your project
   - Copy **ALL** the SQL code from that file
   - Paste it into the Supabase SQL Editor
   - Click **"Run"** (or press `Ctrl+Enter` / `Cmd+Enter`)
   - Wait for "Success" message
   - This creates all the main tables (profiles, courses, enrollments, etc.)

3. **Run Clerk Support Migration** (if using Clerk for authentication)
   - Open the file: `supabase/migrate-clerk-support.sql` in your project
   - Copy **ALL** the SQL code
   - Paste it into a new query in Supabase SQL Editor
   - Click **"Run"**
   - This adds Clerk authentication support to your profiles table

4. **Run Contact Messages Table** (if using contact form)
   - Open the file: `supabase/create-contact-messages-table.sql` in your project
   - Copy **ALL** the SQL code
   - Paste it into a new query in Supabase SQL Editor
   - Click **"Run"**

5. **Verify Tables Created**
   - Go to **Table Editor** in Supabase dashboard
   - You should see these tables:
     - `profiles`
     - `courses`
     - `companies`
     - `enrollments`
     - `assignments`
     - `submissions`
     - `quizzes`
     - `quiz_attempts`
     - `certificates`
     - `contact_messages` (if you ran the contact form script)

---

## 🔐 Step 4: Update Environment Variables

1. **Locate `.env.local` File**
   - In your project root directory (same folder as `package.json`)
   - If it doesn't exist, create it

2. **Update Supabase Configuration**
   Open `.env.local` and update/add these variables:

   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

   **Replace with your actual values from Step 2:**
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your anon public key
   - `SUPABASE_SERVICE_ROLE_KEY`: Your service_role secret key

3. **Keep Other Environment Variables**
   Make sure you also have your Clerk keys (if using Clerk):
   ```env
   # Clerk Configuration
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_... or pk_test_...
   CLERK_SECRET_KEY=sk_live_... or sk_test_...
   ```

4. **Save the File**
   - Save `.env.local`
   - ⚠️ **Important**: This file should be in `.gitignore` and never committed to Git

---

## ✅ Step 5: Verify the Connection

1. **Restart Your Development Server**
   - Stop the current server (Press `Ctrl+C`)
   - Start it again:
     ```bash
     npm run dev
     ```

2. **Check for Errors**
   - Open your browser console (F12)
   - Look for any Supabase connection errors
   - Check the terminal for any error messages

3. **Test Database Connection**
   - Visit: `http://localhost:3000/api/test-db` (if this route exists)
   - Or try signing up/logging in to test user sync

4. **Verify in Supabase Dashboard**
   - Go to **Table Editor** → `profiles`
   - Try creating a user account
   - Check if a new profile appears in the `profiles` table

---

## 🔒 Step 6: Configure Row Level Security (RLS)

Your schema should already include RLS policies, but verify:

1. **Check RLS Status**
   - Go to **Authentication** → **Policies** in Supabase dashboard
   - Or go to **Table Editor** → Select a table → **Policies** tab

2. **Verify Policies Exist**
   - `profiles`: Should have policies for users to read/update their own profile
   - `courses`: Should have policies for public read access
   - `enrollments`: Should have policies for users to read their own enrollments
   - Other tables should have appropriate policies

3. **If Policies Are Missing**
   - The schema.sql file should have created them
   - If not, you may need to manually create policies
   - See `SUPABASE_TABLES_GUIDE.md` for policy details

---

## 🚀 Step 7: Test Key Features

Test these features to ensure everything works:

1. **User Authentication**
   - Sign up a new user
   - Check if profile is created in Supabase `profiles` table
   - Verify the profile has correct `clerk_id` (if using Clerk)

2. **Course Listing**
   - Visit the courses page
   - Verify courses load from Supabase
   - Check browser console for any errors

3. **Enrollment**
   - Try enrolling in a course
   - Check if enrollment appears in `enrollments` table

4. **Contact Form** (if applicable)
   - Submit a test message
   - Check if it appears in `contact_messages` table

---

## 📝 Environment Variables Checklist

Make sure your `.env.local` has:

- [ ] `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your anon public key
- [ ] `SUPABASE_SERVICE_ROLE_KEY` - Your service_role secret key
- [ ] `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Your Clerk publishable key (if using Clerk)
- [ ] `CLERK_SECRET_KEY` - Your Clerk secret key (if using Clerk)

---

## 🆘 Troubleshooting

### Issue: "Missing Supabase configuration" error

**Solution:**
- Verify `.env.local` file exists in project root
- Check variable names are exact (case-sensitive)
- Restart the development server after updating `.env.local`

### Issue: Tables not found

**Solution:**
- Go to Supabase SQL Editor
- Run `supabase/schema.sql` again
- Check Table Editor to verify tables exist

### Issue: Users not syncing to Supabase

**Solution:**
- Verify `SUPABASE_SERVICE_ROLE_KEY` is set correctly
- Check Supabase logs for errors
- Verify RLS policies allow inserts
- Check browser console for sync errors

### Issue: RLS blocking queries

**Solution:**
- Go to Supabase → Authentication → Policies
- Verify policies are created correctly
- Check that policies allow the operations you need
- Temporarily disable RLS for testing (not recommended for production)

### Issue: Connection timeout

**Solution:**
- Verify `NEXT_PUBLIC_SUPABASE_URL` is correct
- Check your internet connection
- Verify Supabase project is active (not paused)
- Check Supabase status page for outages

---

## 🔄 Migrating Data from Old Project (Optional)

If you're migrating from an old Supabase project:

1. **Export Data from Old Project**
   - Use Supabase dashboard → Table Editor
   - Export each table as CSV or use SQL dump

2. **Import to New Project**
   - Use Supabase dashboard → Table Editor → Import
   - Or use SQL INSERT statements in SQL Editor

3. **Update Foreign Keys**
   - Make sure all foreign key relationships are maintained
   - Update any hardcoded IDs if necessary

---

## 📚 Additional Resources

- **Supabase Documentation**: https://supabase.com/docs
- **Supabase Dashboard**: https://app.supabase.com
- **Project Schema**: See `supabase/schema.sql`
- **RLS Policies Guide**: See `SUPABASE_TABLES_GUIDE.md`
- **API Usage**: See `SUPABASE_API_ROUTES_GUIDE.md`

---

## ✅ Final Checklist

Before considering setup complete:

- [ ] New Supabase project created
- [ ] API keys copied (URL, anon key, service_role key)
- [ ] Database schema executed (`schema.sql`)
- [ ] Clerk support migration executed (if using Clerk)
- [ ] Contact messages table created (if needed)
- [ ] Environment variables updated in `.env.local`
- [ ] Development server restarted
- [ ] Connection tested (no errors in console)
- [ ] User sign-up tested (profile created in Supabase)
- [ ] RLS policies verified
- [ ] Key features tested (courses, enrollments, etc.)

---

**Your project is now connected to the new Supabase project!** 🎉

If you encounter any issues, refer to the troubleshooting section or check the Supabase dashboard logs for detailed error messages.

