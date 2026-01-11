# Fix: "Failed to Save Message" Error

## 🔍 Common Causes

The most common reason for this error is that the `contact_messages` table doesn't exist in your Supabase database.

## ✅ Solution: Create the Table

### Step 1: Open Supabase SQL Editor

1. Go to https://app.supabase.com
2. Select your project
3. Click on **SQL Editor** in the left sidebar
4. Click **New Query**

### Step 2: Run the SQL Script

1. Open the file: `supabase/create-contact-messages-table.sql`
2. Copy **ALL** the SQL code
3. Paste it into the Supabase SQL Editor
4. Click **Run** (or press `Ctrl+Enter`)

### Step 3: Verify Table Created

1. Go to **Table Editor** in Supabase
2. You should see `contact_messages` table
3. It should have these columns:
   - `id` (UUID)
   - `name` (text)
   - `email` (text)
   - `subject` (text)
   - `message` (text)
   - `status` (text)
   - `created_at` (timestamp)
   - `updated_at` (timestamp)

### Step 4: Test the Form Again

1. Go back to your contact form
2. Fill it out and submit
3. It should work now!

## 🔍 Other Possible Issues

### Issue 1: Missing Environment Variables

**Check:** Make sure `.env.local` has:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

**Fix:** Add missing variables and restart the dev server

### Issue 2: RLS Policy Blocking Insert

**Check:** In Supabase → Authentication → Policies → `contact_messages`

**Fix:** Make sure there's a policy that allows INSERT for `anon` role:
```sql
CREATE POLICY "Anyone can submit contact form"
  ON public.contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
```

### Issue 3: Table Name Mismatch

**Check:** The table name must be exactly `contact_messages` (lowercase, with underscore)

**Fix:** Make sure the table name matches exactly

## 🧪 Test the API Directly

You can test the API endpoint directly:

```bash
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test",
    "message": "This is a test message"
  }'
```

## 📝 Quick SQL to Create Table

If you need to create the table quickly, run this in Supabase SQL Editor:

```sql
-- Create contact_messages table
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert
CREATE POLICY "Anyone can submit contact form"
  ON public.contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
```

## ✅ After Creating Table

1. Restart your dev server (if needed)
2. Try submitting the form again
3. Check Supabase Table Editor to see the message

---

**Most Common Fix:** Just create the table using the SQL script! 🎯

