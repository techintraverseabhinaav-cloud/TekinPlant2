# Migrate to New Supabase Server - Complete Guide

## 🔍 Problem
After migrating to a new Supabase project, enrollment fails because:
- **Courses table is empty** - No courses exist in the new database
- **Companies table is empty** - No companies exist
- **Course IDs don't match** - Static course IDs from `industryCourses` don't match database UUIDs

## ✅ Solution: Populate Your New Supabase Database

### Step 1: Set Up Database Schema

1. Go to your **new Supabase project dashboard**: https://supabase.com/dashboard
2. Click on **SQL Editor** in the left sidebar
3. Open `supabase/schema.sql` from your project
4. Copy the **entire contents** and paste into SQL Editor
5. Click **Run** (or press `Ctrl+Enter`)

This creates all necessary tables: `profiles`, `companies`, `courses`, `enrollments`, etc.

### Step 2: Populate Companies and Courses

1. In the **SQL Editor**, open `supabase/populate-tables.sql` from your project
2. Copy the **entire contents** and paste into SQL Editor
3. Click **Run**

This will insert:
- **25 companies** (Siemens, ABB, Rockwell, etc.)
- **25 courses** (with proper company relationships)

### Step 3: Verify Data

Run these queries in SQL Editor to verify:

```sql
-- Check companies count
SELECT COUNT(*) as company_count FROM public.companies;

-- Check courses count
SELECT COUNT(*) as course_count FROM public.courses;

-- View sample courses
SELECT id, title, company_name, is_active FROM public.courses LIMIT 5;
```

You should see:
- `company_count`: 25
- `course_count`: 25
- Courses with UUIDs in the `id` column

### Step 4: Update Environment Variables

Make sure your `.env.local` has the **new Supabase credentials**:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-new-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-new-service-role-key
```

To get these:
1. Go to **Supabase Dashboard** → **Settings** → **API**
2. Copy **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
3. Copy **service_role key** (secret) → `SUPABASE_SERVICE_ROLE_KEY`

### Step 5: Restart Your Dev Server

```powershell
# Stop server (Ctrl+C)
# Then restart
npm run dev
```

## 🔧 Fix Course ID Mismatch Issue

The course detail page uses static IDs from `industryCourses` (like "1", "2", "3"), but the database uses UUIDs. The enrollment page already handles this by:

1. Looking up the course by **title** in the database
2. Getting the **database UUID**
3. Using that UUID for enrollment

This should work automatically, but if you still see "Course not found" errors:

### Option A: Check Course Titles Match

The enrollment page matches courses by title. Make sure the titles in your database match the titles in `lib/industry-data.ts`.

### Option B: Verify Course Images

The populate script should include image URLs. If images are missing:

1. Check `supabase/populate-tables.sql` has `image_url` values
2. Or update courses manually in Supabase Table Editor

## 🧪 Test Enrollment

After populating the database:

1. **Visit a course page**: `/courses/1` (or any course ID)
2. **Click "Enroll Now"**
3. **Fill out the enrollment form**
4. **Submit**

The enrollment should now work because:
- ✅ Courses exist in the database
- ✅ Profile will be auto-created if missing
- ✅ Course lookup by title will find the database UUID

## 🐛 Troubleshooting

### Error: "Course not found"

**Cause**: Course doesn't exist in database or title doesn't match

**Fix**:
1. Check if courses were inserted: `SELECT COUNT(*) FROM courses;`
2. Check course titles match: `SELECT title FROM courses LIMIT 5;`
3. Re-run `supabase/populate-tables.sql`

### Error: "User profile not found"

**Cause**: Profile doesn't exist (should auto-create, but might fail)

**Fix**:
1. Visit `/profile` page to trigger profile sync
2. Or sign out and sign back in
3. Check Supabase `profiles` table has your user

### Error: "Database connection error"

**Cause**: Wrong Supabase credentials

**Fix**:
1. Verify `.env.local` has correct `NEXT_PUBLIC_SUPABASE_URL`
2. Verify `SUPABASE_SERVICE_ROLE_KEY` is correct
3. Restart dev server after updating `.env.local`

### Error: "Table does not exist"

**Cause**: Schema not set up

**Fix**:
1. Run `supabase/schema.sql` in Supabase SQL Editor
2. Verify tables exist: `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';`

## 📋 Quick Checklist

- [ ] Run `supabase/schema.sql` in new Supabase project
- [ ] Run `supabase/populate-tables.sql` to insert companies and courses
- [ ] Update `.env.local` with new Supabase credentials
- [ ] Restart dev server
- [ ] Test enrollment on a course page
- [ ] Verify courses appear on `/courses` page

## 🎯 Next Steps

After migration:
1. **Test enrollment** - Try enrolling in a course
2. **Check courses page** - Verify all 25 courses appear
3. **Check partners page** - Verify all 25 companies appear
4. **Test profile sync** - Visit `/profile` to ensure profile exists

Your enrollment should now work! 🎉

