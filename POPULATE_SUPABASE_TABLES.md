# How to Populate Supabase Tables

## Overview
This guide will help you populate the empty `companies` and `courses` tables in your Supabase database.

## Steps

### 1. Open Supabase SQL Editor
1. Go to your Supabase project dashboard: https://supabase.com/dashboard
2. Select your project
3. Click on **SQL Editor** in the left sidebar

### 2. Run the Population Script
1. Open the file `supabase/populate-tables.sql` in your project
2. Copy the entire contents of the file
3. Paste it into the Supabase SQL Editor
4. Click **Run** (or press `Ctrl+Enter` / `Cmd+Enter`)

### 3. Verify the Data
After running the script, you should see:
- **25 companies** inserted
- **25 courses** inserted

You can verify by running these queries in the SQL Editor:

```sql
-- Count companies
SELECT COUNT(*) as company_count FROM public.companies;

-- Count courses
SELECT COUNT(*) as course_count FROM public.courses;

-- View all companies
SELECT id, name, industry, location FROM public.companies;

-- View all courses
SELECT id, title, company_name, location, rating, student_count FROM public.courses;
```

## What Data is Included?

### Companies (25 total)
- Siemens, ABB, Rockwell Automation, Emerson, Schneider Electric
- Honeywell, Yokogawa, FANUC, Bosch, Danfoss
- Cisco, SAP, Microsoft, Google Cloud, Fortinet
- TATA Consultancy Services, Infosys, Wipro
- L&T, Suzlon, BHEL, TATA Motors
- Mahindra & Mahindra, Maruti Suzuki, Ashok Leyland

### Courses (25 total)
- PLC Programming & Automation
- Electrical Panel Design
- SCADA System Development
- Industrial Robotics Programming
- Process Control & Instrumentation
- HMI Development & Design
- Industrial Networking & Communication
- Variable Frequency Drive Programming
- Safety Systems & SIL Training
- Industrial IoT & Industry 4.0
- Motor Control & Protection
- DCS Programming & Configuration
- Industrial Cybersecurity
- Batch Process Control
- Industrial Data Analytics
- Motion Control Systems
- Industrial Wireless Communication
- Advanced Process Control
- Industrial Cloud Solutions
- Industrial Machine Learning
- Power Systems & Distribution
- Renewable Energy Systems
- Smart Grid Technologies
- Energy Management Systems
- Industrial Automation & Control

## Troubleshooting

### If you get duplicate key errors:
The script uses `ON CONFLICT DO NOTHING` for companies, so it's safe to run multiple times. If you need to start fresh:

```sql
-- WARNING: This will delete all data!
TRUNCATE TABLE public.courses CASCADE;
TRUNCATE TABLE public.companies CASCADE;
```

Then run the population script again.

### If courses don't link to companies:
Make sure companies are inserted first. The script handles this automatically, but if you run it in parts, ensure companies are created before courses.

## Next Steps
After populating the tables:
1. Test your application to ensure courses are displaying correctly
2. Check the `/courses` page to see all courses
3. Check the `/partners` page to see all companies

