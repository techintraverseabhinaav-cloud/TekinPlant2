# Contact Form Implementation Guide

## 📋 Overview

The contact form has been upgraded from **frontend-only** to a **full-stack solution** that saves submissions to your Supabase database.

---

## 🔄 How It Works Now

### **Before (Frontend Only) ❌**
- Form data was only logged to browser console
- No data was saved
- No email notifications
- Data was lost after page refresh

### **After (Full Stack) ✅**
1. User fills out contact form
2. Form submits to `/api/contact` endpoint
3. Data is validated (required fields, email format)
4. Data is saved to Supabase `contact_messages` table
5. Success message shown to user
6. Admin can view messages in database

---

## 🚀 Setup Instructions

### Step 1: Create Database Table

Run this SQL in your **Supabase SQL Editor**:

1. Go to https://app.supabase.com
2. Select your project
3. Go to **SQL Editor**
4. Click **New Query**
5. Copy and paste the contents of `supabase/create-contact-messages-table.sql`
6. Click **Run** (or press Ctrl+Enter)

This will create:
- `contact_messages` table
- Indexes for faster queries
- Row Level Security (RLS) policies
- Auto-update trigger for `updated_at` timestamp

### Step 2: Verify API Endpoint

The API endpoint is already created at:
- **File**: `app/api/contact/route.ts`
- **Endpoint**: `POST /api/contact`

### Step 3: Test the Form

1. Go to `/contact` page
2. Fill out the form
3. Submit
4. Check Supabase dashboard → Table Editor → `contact_messages` to see the submission

---

## 📊 Database Schema

The `contact_messages` table stores:

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key (auto-generated) |
| `name` | TEXT | User's full name |
| `email` | TEXT | User's email address |
| `subject` | TEXT | Message subject (dropdown selection) |
| `message` | TEXT | Message content |
| `status` | TEXT | Status: `new`, `read`, `replied`, `archived` |
| `created_at` | TIMESTAMP | When message was submitted |
| `updated_at` | TIMESTAMP | Last update time |

---

## 🔧 API Endpoints

### POST `/api/contact`
Submit a contact form message.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Course Inquiry",
  "message": "I'm interested in your PLC programming course..."
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Your message has been sent successfully!",
  "id": "uuid-here"
}
```

**Response (Error):**
```json
{
  "error": "All fields are required"
}
```

### GET `/api/contact` (Optional - for admin dashboard)
Retrieve contact messages.

**Query Parameters:**
- `status` - Filter by status (`new`, `read`, `replied`, `archived`, or `all`)
- `limit` - Number of results (default: 50)

**Example:**
```
GET /api/contact?status=new&limit=10
```

---

## 📧 Email Notifications (Optional)

Currently, the form saves to the database but **doesn't send emails**. To add email notifications:

### Option 1: Resend (Recommended)
1. Sign up at https://resend.com
2. Get your API key
3. Install: `npm install resend`
4. Add to `.env.local`:
   ```env
   RESEND_API_KEY=re_xxxxx
   ```
5. Update `app/api/contact/route.ts` to send email after saving

### Option 2: SendGrid
1. Sign up at https://sendgrid.com
2. Get your API key
3. Install: `npm install @sendgrid/mail`
4. Add to `.env.local`:
   ```env
   SENDGRID_API_KEY=SG.xxxxx
   ```

### Option 3: Nodemailer
1. Install: `npm install nodemailer`
2. Configure SMTP settings
3. Add email sending logic

---

## 🔒 Security Features

1. **Input Validation**
   - Required fields checked
   - Email format validated
   - Data sanitized (trimmed, lowercased)

2. **Row Level Security (RLS)**
   - Anyone can submit (insert)
   - Only authenticated users can read (for admin)

3. **Error Handling**
   - Graceful error messages
   - No sensitive data exposed

---

## 📱 User Experience

### Form Submission Flow:
1. User fills form → clicks "Send Message"
2. Button shows "Sending..." (disabled state)
3. API call made to `/api/contact`
4. Success toast: "Message sent successfully!"
5. Form resets
6. Error toast shown if submission fails

### Loading States:
- Button disabled during submission
- "Sending..." text shown
- Icon pulses during submission

---

## 🎯 Next Steps (Optional Enhancements)

1. **Admin Dashboard**
   - Create admin page to view/manage messages
   - Mark as read/replied
   - Reply directly from dashboard

2. **Email Notifications**
   - Send email to admin when new message arrives
   - Auto-reply to user confirming receipt

3. **Spam Protection**
   - Add reCAPTCHA
   - Rate limiting (max submissions per hour)

4. **Message Status Management**
   - Update status when admin reads/replies
   - Archive old messages

---

## 🐛 Troubleshooting

### Issue: "Failed to save message"
- **Check**: Supabase table exists
- **Solution**: Run the SQL file in Supabase SQL Editor

### Issue: "Missing Supabase configuration"
- **Check**: `.env.local` has `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`
- **Solution**: Add missing environment variables

### Issue: Form submits but no data in database
- **Check**: Browser console for errors
- **Check**: Supabase RLS policies allow inserts
- **Solution**: Verify RLS policy is set correctly

---

## ✅ Summary

**What Changed:**
- ✅ Created `/api/contact` endpoint
- ✅ Created `contact_messages` table in Supabase
- ✅ Updated form to call API endpoint
- ✅ Added loading states and error handling
- ✅ Data now persists in database

**What You Need to Do:**
1. Run the SQL file in Supabase to create the table
2. Test the form submission
3. (Optional) Add email notifications

The contact form is now fully functional! 🎉

