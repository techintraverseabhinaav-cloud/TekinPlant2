# Fix "No Courses Found" Error

This guide will help you troubleshoot and fix the "No courses found" error.

## 🔍 Quick Diagnosis

The "No courses found" error can occur for several reasons. Follow these steps to identify and fix the issue.

---

## ✅ Step 1: Check Browser Console

1. **Open Browser DevTools**
   - Press `F12` or right-click → "Inspect"
   - Go to **Console** tab

2. **Look for Errors**
   - Check for red error messages
   - Look for messages starting with `❌` or `Error`
   - Note any Supabase-related errors

3. **Check Network Tab**
   - Go to **Network** tab
   - Look for `/api/courses` request
   - Check the response:
     - **Status 200**: API is working, but no courses in database
     - **Status 500**: Database connection or configuration issue
     - **Status 404**: API route not found

---

## ✅ Step 2: Test Database Connection

1. **Visit Test Endpoint**
   - Go to: `http://localhost:3000/api/test-db`
   - This will show your Supabase configuration status

2. **Check Response**
   - Should show: `✅ Supabase configured correctly`
   - If it shows errors, fix those first (see Step 3)

---

## ✅ Step 3: Verify Supabase Configuration

1. **Check `.env.local` File**
   - Location: Project root (same folder as `package.json`)
   - Must contain:
     ```env
     NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
     NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
     SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
     ```

2. **Verify Keys Are Correct**
   - Go to Supabase Dashboard → Settings → API
   - Compare your keys with what's in `.env.local`
   - Make sure there are no extra spaces or quotes

3. **Restart Development Server**
   - Stop server: `Ctrl+C`
   - Start again: `npm run dev`
   - Environment variables only load when server starts

---

## ✅ Step 4: Check if Courses Table Exists

1. **Go to Supabase Dashboard**
   - Visit https://app.supabase.com
   - Select your project

2. **Check Table Editor**
   - Go to **Table Editor**
   - Look for `courses` table
   - If it doesn't exist, go to Step 5

3. **If Table Exists, Check for Data**
   - Click on `courses` table
   - Check if there are any rows
   - If empty, go to Step 6

---

## ✅ Step 5: Create Courses Table (If Missing)

1. **Open SQL Editor**
   - In Supabase dashboard, go to **SQL Editor**
   - Click **"New Query"**

2. **Run Schema Script**
   - Open `supabase/schema.sql` in your project
   - Copy **ALL** the SQL code
   - Paste into Supabase SQL Editor
   - Click **"Run"** (or `Ctrl+Enter`)
   - Wait for "Success" message

3. **Verify Table Created**
   - Go back to **Table Editor**
   - You should now see `courses` table

---

## ✅ Step 6: Add Courses to Database

If the table exists but is empty, you need to add courses. You have two options:

### Option A: Add Courses via Supabase Dashboard

1. **Go to Table Editor** → `courses` table
2. **Click "Insert"** → "Insert row"
3. **Fill in required fields:**
   - `title` (required): Course title
   - `type` (required): Course category
   - `is_active` (required): Set to `true` (important!)
   - `company_name`: Company offering the course
   - `location`: Course location
   - `description`: Course description
   - `price`: Course price
   - `duration`: Course duration
   - `image_url`: Course image URL (optional)
   - Other fields as needed
4. **Click "Save"**
5. **Repeat** for more courses

### Option B: Add Courses via SQL

1. **Go to SQL Editor** in Supabase
2. **Run this SQL** (replace with your course data):

```sql
INSERT INTO public.courses (
  title,
  type,
  company_name,
  location,
  description,
  price,
  duration,
  image_url,
  is_active
) VALUES (
  'Introduction to Automation',
  'Automation',
  'Siemens',
  'Online',
  'Learn the fundamentals of industrial automation',
  'Free',
  '4 weeks',
  'https://example.com/image.jpg',
  true
);
```

3. **Run the query**
4. **Add more courses** by repeating the INSERT statement

---

## ✅ Step 7: Check is_active Field

**Important**: The API only shows courses where `is_active = true`

1. **Check Course Status**
   - Go to Supabase → Table Editor → `courses`
   - Check the `is_active` column
   - Make sure it's set to `true` for courses you want to display

2. **Update Inactive Courses**
   - If courses have `is_active = false`, update them:
   ```sql
   UPDATE public.courses 
   SET is_active = true 
   WHERE is_active = false;
   ```

---

## ✅ Step 8: Check RLS Policies

Row Level Security (RLS) might be blocking access:

1. **Go to Supabase Dashboard**
   - **Authentication** → **Policies**
   - Or **Table Editor** → `courses` → **Policies** tab

2. **Verify Policies Exist**
   - Should have policies allowing:
     - Public read access (SELECT)
     - Service role full access

3. **If Policies Missing, Create Them:**
   ```sql
   -- Allow public read access
   CREATE POLICY "Allow public read access" ON public.courses
   FOR SELECT
   USING (true);
   
   -- Allow service role full access
   CREATE POLICY "Allow service role full access" ON public.courses
   FOR ALL
   USING (true)
   WITH CHECK (true);
   ```

---

## ✅ Step 9: Test API Directly

1. **Open Browser**
   - Visit: `http://localhost:3000/api/courses`
   - This should return JSON with courses array

2. **Check Response**
   - **Empty array `[]`**: Database is connected but no courses
   - **Error object**: Check the error message
   - **Courses array**: API is working correctly

3. **Check Terminal/Console**
   - Look for log messages:
     - `✅ Database connection successful`
     - `✅ Fetched X courses`
     - Or error messages starting with `❌`

---

## 🆘 Common Issues and Solutions

### Issue 1: "Missing Supabase configuration"

**Symptoms:**
- Error in console: "Missing Supabase configuration"
- API returns 500 error

**Solution:**
- Check `.env.local` file exists
- Verify all three Supabase variables are set
- Restart development server
- See Step 3 above

---

### Issue 2: "Database table not found"

**Symptoms:**
- Error: "The courses table does not exist"
- Error code: `42P01`

**Solution:**
- Run `supabase/schema.sql` in Supabase SQL Editor
- See Step 5 above

---

### Issue 3: "Database permission error"

**Symptoms:**
- Error: "permission denied"
- Error code: `42501`

**Solution:**
- Verify `SUPABASE_SERVICE_ROLE_KEY` is correct
- Check the key in Supabase Dashboard → Settings → API
- Make sure you're using `service_role` key (not `anon` key)
- See Step 3 above

---

### Issue 4: Table exists but no courses showing

**Symptoms:**
- Table has data in Supabase
- But website shows "No courses found"

**Possible Causes:**
1. **All courses have `is_active = false`**
   - Solution: Update `is_active` to `true` (see Step 7)

2. **RLS policies blocking access**
   - Solution: Check and fix RLS policies (see Step 8)

3. **API returning empty array**
   - Solution: Check API response at `/api/courses` (see Step 9)

---

### Issue 5: Courses show in Supabase but not on website

**Symptoms:**
- Courses visible in Supabase Table Editor
- But not showing on website

**Solution:**
1. Check `is_active` field is `true`
2. Check browser console for errors
3. Check API response at `/api/courses`
4. Verify RLS policies allow read access
5. Clear browser cache and hard refresh (`Ctrl+Shift+R`)

---

## 🔧 Quick Fixes

### Fix 1: Activate All Courses

If you have courses but they're inactive:

```sql
-- Run in Supabase SQL Editor
UPDATE public.courses 
SET is_active = true;
```

### Fix 2: Add Sample Course

If you need a test course quickly:

```sql
-- Run in Supabase SQL Editor
INSERT INTO public.courses (
  title, type, company_name, location, description, price, duration, is_active
) VALUES (
  'Test Course',
  'Automation',
  'Test Company',
  'Online',
  'This is a test course',
  'Free',
  '1 week',
  true
);
```

### Fix 3: Reset and Recreate Table

If the table is corrupted:

```sql
-- ⚠️ WARNING: This deletes all courses!
DROP TABLE IF EXISTS public.courses CASCADE;

-- Then run the CREATE TABLE statement from schema.sql
```

---

## 📝 Verification Checklist

After fixing, verify:

- [ ] `.env.local` has all three Supabase variables
- [ ] Development server restarted after updating `.env.local`
- [ ] `courses` table exists in Supabase
- [ ] At least one course exists in the table
- [ ] Course has `is_active = true`
- [ ] API endpoint `/api/courses` returns courses (not errors)
- [ ] Browser console shows no errors
- [ ] Courses page displays courses

---

## 🧪 Test Steps

1. **Test API Endpoint**
   ```
   Visit: http://localhost:3000/api/courses
   Should return: JSON array with courses
   ```

2. **Test Database Connection**
   ```
   Visit: http://localhost:3000/api/test-db
   Should show: ✅ Supabase configured correctly
   ```

3. **Check Browser Console**
   - Open DevTools (F12)
   - Look for: `✅ Fetched X courses`
   - No red errors

4. **Check Supabase Dashboard**
   - Table Editor → `courses`
   - Should see your courses
   - `is_active` column should be `true`

---

## 📚 Additional Resources

- **Supabase Dashboard**: https://app.supabase.com
- **Schema File**: `supabase/schema.sql`
- **API Route**: `app/api/courses/route.ts`
- **Courses Page**: `app/courses/page.tsx`
- **Database Setup Guide**: `CONNECT_NEW_SUPABASE_PROJECT.md`

---

## 🆘 Still Not Working?

If you've tried all steps and still see "No courses found":

1. **Check Terminal Logs**
   - Look for detailed error messages
   - Check for `❌` error indicators

2. **Check Supabase Logs**
   - Go to Supabase Dashboard → Logs
   - Look for API errors or database errors

3. **Verify Environment Variables**
   - Make sure you're using the correct Supabase project
   - Double-check keys match Supabase Dashboard

4. **Test with Simple Query**
   - In Supabase SQL Editor, run:
     ```sql
     SELECT * FROM public.courses WHERE is_active = true;
     ```
   - If this returns courses, the issue is in the API or frontend
   - If this returns empty, the issue is in the database

---

**Most Common Cause**: The `courses` table is empty or all courses have `is_active = false`. Add at least one course with `is_active = true` to see it on the website.

