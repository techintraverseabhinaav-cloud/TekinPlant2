-- Complete Migration Script: ALL 25 Courses
-- Run this in Supabase SQL Editor AFTER running schema.sql and inserting companies
-- This script migrates ALL courses from lib/industry-data.ts

-- ============================================
-- IMPORTANT: Make sure companies are inserted first!
-- Run the companies INSERT from complete-migration.sql first
-- ============================================

-- Clear existing courses (optional - comment out if you want to keep existing data)
-- DELETE FROM public.courses;

-- ============================================
-- INSERT ALL 25 COURSES
-- ============================================

INSERT INTO public.courses (
  title, company_name, location, type, duration, price, image_url, description, 
  tags, contact, website, rating, student_count, is_active
) VALUES
(
  'PLC Programming & Automation',
  'Siemens',
  'Mumbai, India',
  'Industrial Training',
  '6 weeks',
  '₹45,000',
  'https://images.unsplash.com/photo-1700427296131-0cc4c4610fc6?q=80&w=2676&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'Comprehensive PLC programming training covering Siemens S7-1200 and TIA Portal software with hands-on automation projects.',
  ARRAY['PLC', 'Automation', 'Siemens', 'Industrial'],
  '+91 98765 43210',
  'https://siemens.com',
  4.8,
  245,
  true
),
(
  'Electrical Panel Design',
  'ABB',
  'Bangalore, India',
  'Technical Training',
  '4 weeks',
  '₹35,000',
  'https://plus.unsplash.com/premium_photo-1661817214148-2d4cf768a7c3?q=80&w=1896&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'Learn electrical panel design principles, component selection, and safety standards for industrial applications.',
  ARRAY['Electrical', 'Panel Design', 'ABB', 'Industrial'],
  '+91 98765 43211',
  'https://abb.com',
  4.7,
  189,
  true
),
(
  'SCADA System Development',
  'Rockwell Automation',
  'Pune, India',
  'Software Training',
  '5 weeks',
  '₹40,000',
  'https://images.unsplash.com/photo-1667264501379-c1537934c7ab?q=80&w=2274&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'Master SCADA system development using FactoryTalk View Studio with real-world industrial applications.',
  ARRAY['SCADA', 'Rockwell', 'HMI', 'Automation'],
  '+91 98765 43212',
  'https://rockwellautomation.com',
  4.6,
  156,
  true
),
(
  'Industrial Robotics Programming',
  'FANUC',
  'Chennai, India',
  'Robotics Training',
  '8 weeks',
  '₹55,000',
  'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRlY2hub2xvZ3l8ZW58MHx8MHx8fDA%3D',
  'Comprehensive robotics programming training covering FANUC robots, teach pendant operation, and automation integration.',
  ARRAY['Robotics', 'FANUC', 'Automation', 'Programming'],
  '+91 98765 43213',
  'https://fanuc.com',
  4.9,
  134,
  true
),
(
  'Process Control & Instrumentation',
  'Emerson',
  'Delhi, India',
  'Process Training',
  '6 weeks',
  '₹42,000',
  'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHRlY2hub2xvZ3l8ZW58MHx8MHx8fDA%3D',
  'Learn process control systems, instrumentation, and DeltaV DCS programming for industrial processes.',
  ARRAY['Process Control', 'Instrumentation', 'Emerson', 'DCS'],
  '+91 98765 43214',
  'https://emerson.com',
  4.5,
  178,
  true
),
(
  'HMI Development & Design',
  'Schneider Electric',
  'Hyderabad, India',
  'Software Training',
  '4 weeks',
  '₹38,000',
  'https://plus.unsplash.com/premium_photo-1681426687411-21986b0626a8?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'Master HMI development using Vijeo Designer and Wonderware InTouch for industrial automation applications.',
  ARRAY['HMI', 'Schneider', 'Design', 'Automation'],
  '+91 98765 43215',
  'https://schneider-electric.com',
  4.7,
  167,
  true
),
(
  'Industrial Networking & Communication',
  'Cisco',
  'Kolkata, India',
  'Network Training',
  '5 weeks',
  '₹36,000',
  'https://plus.unsplash.com/premium_photo-1681399975135-252eab5fd2db?q=80&w=2274&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'Learn industrial networking protocols, Ethernet/IP, Profinet, and network security for automation systems.',
  ARRAY['Networking', 'Cisco', 'Industrial', 'Communication'],
  '+91 98765 43216',
  'https://cisco.com',
  4.4,
  145,
  true
),
(
  'Variable Frequency Drive Programming',
  'Danfoss',
  'Ahmedabad, India',
  'Drive Training',
  '3 weeks',
  '₹28,000',
  'https://plus.unsplash.com/premium_photo-1764695678014-3b87d3c0a432?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'Comprehensive VFD programming training covering parameter setting, commissioning, and troubleshooting.',
  ARRAY['VFD', 'Danfoss', 'Drives', 'Programming'],
  '+91 98765 43217',
  'https://danfoss.com',
  4.6,
  123,
  true
),
(
  'Safety Systems & SIL Training',
  'Honeywell',
  'Mumbai, India',
  'Safety Training',
  '4 weeks',
  '₹45,000',
  'https://plus.unsplash.com/premium_photo-1661963874418-df1110ee39c1?q=80&w=2286&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'Learn safety instrumented systems, SIL calculations, and Safety Manager programming for critical applications.',
  ARRAY['Safety', 'Honeywell', 'SIL', 'Critical Systems'],
  '+91 98765 43218',
  'https://honeywell.com',
  4.8,
  98,
  true
),
(
  'Industrial IoT & Industry 4.0',
  'Bosch',
  'Bangalore, India',
  'IoT Training',
  '6 weeks',
  '₹48,000',
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'Master Industrial IoT concepts, data analytics, and Industry 4.0 implementation strategies.',
  ARRAY['IoT', 'Industry 4.0', 'Bosch', 'Analytics'],
  '+91 98765 43219',
  'https://bosch.com',
  4.7,
  167,
  true
),
(
  'Motor Control & Protection',
  'Siemens',
  'Pune, India',
  'Motor Training',
  '4 weeks',
  '₹32,000',
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'Learn motor control systems, protection relays, and soft starter programming for industrial applications.',
  ARRAY['Motor Control', 'Siemens', 'Protection', 'Industrial'],
  '+91 98765 43220',
  'https://siemens.com',
  4.5,
  134,
  true
),
(
  'DCS Programming & Configuration',
  'Yokogawa',
  'Chennai, India',
  'DCS Training',
  '7 weeks',
  '₹52,000',
  'https://plus.unsplash.com/premium_photo-1661962646119-0c9d2a604a63?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'Master DCS programming using CENTUM VP with advanced control strategies and system integration.',
  ARRAY['DCS', 'Yokogawa', 'CENTUM', 'Control Systems'],
  '+91 98765 43221',
  'https://yokogawa.com',
  4.9,
  89,
  true
),
(
  'Industrial Cybersecurity',
  'Fortinet',
  'Delhi, India',
  'Security Training',
  '5 weeks',
  '₹40,000',
  'https://plus.unsplash.com/premium_photo-1661964187664-e26f70e1a224?q=80&w=2687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'Learn industrial cybersecurity, network protection, and security best practices for automation systems.',
  ARRAY['Cybersecurity', 'Fortinet', 'Security', 'Industrial'],
  '+91 98765 43222',
  'https://fortinet.com',
  4.6,
  112,
  true
),
(
  'Batch Process Control',
  'Emerson',
  'Mumbai, India',
  'Process Training',
  '6 weeks',
  '₹46,000',
  'https://plus.unsplash.com/premium_photo-1661963515041-661b417c0b45?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'Master batch process control using DeltaV Batch with recipe management and batch execution strategies.',
  ARRAY['Batch Control', 'Emerson', 'Process', 'DeltaV'],
  '+91 98765 43223',
  'https://emerson.com',
  4.7,
  78,
  true
),
(
  'Industrial Data Analytics',
  'SAP',
  'Bangalore, India',
  'Analytics Training',
  '8 weeks',
  '₹58,000',
  'https://plus.unsplash.com/premium_photo-1683121696175-d05600fefb85?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'Learn industrial data analytics, predictive maintenance, and performance optimization using SAP solutions.',
  ARRAY['Analytics', 'SAP', 'Predictive', 'Data Science'],
  '+91 98765 43224',
  'https://sap.com',
  4.8,
  145,
  true
),
(
  'Motion Control Systems',
  'Rockwell Automation',
  'Pune, India',
  'Motion Training',
  '5 weeks',
  '₹44,000',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'Master motion control systems using Kinetix drives and servo programming for precision applications.',
  ARRAY['Motion Control', 'Rockwell', 'Servo', 'Precision'],
  '+91 98765 43225',
  'https://rockwellautomation.com',
  4.9,
  67,
  true
),
(
  'Industrial Wireless Communication',
  'Honeywell',
  'Chennai, India',
  'Wireless Training',
  '4 weeks',
  '₹35,000',
  'https://plus.unsplash.com/premium_photo-1681400019731-5d7cc4cafb9d?q=80&w=2274&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'Learn industrial wireless communication protocols, mesh networks, and wireless sensor networks.',
  ARRAY['Wireless', 'Honeywell', 'Communication', 'Sensors'],
  '+91 98765 43226',
  'https://honeywell.com',
  4.5,
  89,
  true
),
(
  'Advanced Process Control',
  'ABB',
  'Mumbai, India',
  'Advanced Training',
  '8 weeks',
  '₹65,000',
  'https://plus.unsplash.com/premium_photo-1733317290375-d39da9fcc8e3?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'Master advanced process control techniques, model predictive control, and optimization strategies.',
  ARRAY['Advanced Control', 'ABB', 'MPC', 'Optimization'],
  '+91 98765 43227',
  'https://abb.com',
  4.9,
  56,
  true
),
(
  'Industrial Cloud Solutions',
  'Microsoft',
  'Bangalore, India',
  'Cloud Training',
  '6 weeks',
  '₹42,000',
  'https://plus.unsplash.com/premium_photo-1764705723226-8ec5a8d8fda9?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'Learn Azure IoT Hub, industrial cloud platforms, and digital twin implementation for Industry 4.0.',
  ARRAY['Cloud', 'Microsoft', 'Azure', 'Digital Twin'],
  '+91 98765 43228',
  'https://microsoft.com',
  4.6,
  123,
  true
),
(
  'Industrial Machine Learning',
  'Google Cloud',
  'Delhi, India',
  'AI Training',
  '10 weeks',
  '₹72,000',
  'https://plus.unsplash.com/premium_photo-1764695811910-d1b958dab303?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'Master industrial machine learning, predictive analytics, and AI implementation for automation systems.',
  ARRAY['Machine Learning', 'Google', 'AI', 'Predictive'],
  '+91 98765 43229',
  'https://cloud.google.com',
  4.8,
  78,
  true
),
(
  'Power Systems & Distribution',
  'L&T',
  'Mumbai, India',
  'Power Training',
  '7 weeks',
  '₹50,000',
  'https://images.unsplash.com/photo-1543946602-a0fce8117697?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'Comprehensive power systems training covering distribution networks, protection systems, and grid management.',
  ARRAY['Power Systems', 'L&T', 'Distribution', 'Grid'],
  '+91 98765 43230',
  'https://larsentoubro.com',
  4.7,
  156,
  true
),
(
  'Renewable Energy Systems',
  'Suzlon',
  'Pune, India',
  'Renewable Training',
  '6 weeks',
  '₹45,000',
  'https://plus.unsplash.com/premium_photo-1681399960857-f3bf93e87a03?q=80&w=2274&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'Learn renewable energy systems, solar power, wind energy, and sustainable energy management.',
  ARRAY['Renewable Energy', 'Suzlon', 'Solar', 'Wind'],
  '+91 98765 43231',
  'https://suzlon.com',
  4.6,
  134,
  true
),
(
  'Smart Grid Technologies',
  'BHEL',
  'Delhi, India',
  'Grid Training',
  '8 weeks',
  '₹55,000',
  'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'Master smart grid technologies, IoT integration, and advanced metering infrastructure.',
  ARRAY['Smart Grid', 'BHEL', 'IoT', 'Metering'],
  '+91 98765 43232',
  'https://bhel.com',
  4.8,
  98,
  true
),
(
  'Energy Management Systems',
  'Schneider Electric',
  'Bangalore, India',
  'Energy Training',
  '5 weeks',
  '₹42,000',
  'https://plus.unsplash.com/premium_photo-1752302839380-411d4411b0b1?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'Learn energy management systems, efficiency optimization, and sustainability practices.',
  ARRAY['Energy Management', 'Schneider', 'Efficiency', 'Sustainability'],
  '+91 98765 43233',
  'https://schneider-electric.com',
  4.7,
  167,
  true
),
(
  'Industrial Automation & Control',
  'TATA Motors',
  'Mumbai, India',
  'Automation Training',
  '9 weeks',
  '₹60,000',
  'https://plus.unsplash.com/premium_photo-1733342554594-102b8e2d0623?q=80&w=3462&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'Comprehensive industrial automation training covering manufacturing processes and control systems.',
  ARRAY['Automation', 'TATA Motors', 'Manufacturing', 'Control'],
  '+91 98765 43234',
  'https://tatamotors.com',
  4.9,
  145,
  true
);

-- ============================================
-- LINK COURSES TO COMPANIES (Update company_id)
-- ============================================
-- This will link each course to its company based on company_name

UPDATE public.courses 
SET company_id = (SELECT id FROM public.companies WHERE name = 'Siemens' LIMIT 1)
WHERE company_name = 'Siemens';

UPDATE public.courses 
SET company_id = (SELECT id FROM public.companies WHERE name = 'ABB' LIMIT 1)
WHERE company_name = 'ABB';

UPDATE public.courses 
SET company_id = (SELECT id FROM public.companies WHERE name = 'Rockwell Automation' LIMIT 1)
WHERE company_name = 'Rockwell Automation';

UPDATE public.courses 
SET company_id = (SELECT id FROM public.companies WHERE name = 'FANUC' LIMIT 1)
WHERE company_name = 'FANUC';

UPDATE public.courses 
SET company_id = (SELECT id FROM public.companies WHERE name = 'Emerson' LIMIT 1)
WHERE company_name = 'Emerson';

UPDATE public.courses 
SET company_id = (SELECT id FROM public.companies WHERE name = 'Schneider Electric' LIMIT 1)
WHERE company_name = 'Schneider Electric';

UPDATE public.courses 
SET company_id = (SELECT id FROM public.companies WHERE name = 'Honeywell' LIMIT 1)
WHERE company_name = 'Honeywell';

UPDATE public.courses 
SET company_id = (SELECT id FROM public.companies WHERE name = 'Cisco' LIMIT 1)
WHERE company_name = 'Cisco';

UPDATE public.courses 
SET company_id = (SELECT id FROM public.companies WHERE name = 'Danfoss' LIMIT 1)
WHERE company_name = 'Danfoss';

UPDATE public.courses 
SET company_id = (SELECT id FROM public.companies WHERE name = 'Bosch' LIMIT 1)
WHERE company_name = 'Bosch';

UPDATE public.courses 
SET company_id = (SELECT id FROM public.companies WHERE name = 'Yokogawa' LIMIT 1)
WHERE company_name = 'Yokogawa';

UPDATE public.courses 
SET company_id = (SELECT id FROM public.companies WHERE name = 'Fortinet' LIMIT 1)
WHERE company_name = 'Fortinet';

UPDATE public.courses 
SET company_id = (SELECT id FROM public.companies WHERE name = 'SAP' LIMIT 1)
WHERE company_name = 'SAP';

UPDATE public.courses 
SET company_id = (SELECT id FROM public.companies WHERE name = 'Microsoft' LIMIT 1)
WHERE company_name = 'Microsoft';

UPDATE public.courses 
SET company_id = (SELECT id FROM public.companies WHERE name = 'Google Cloud' LIMIT 1)
WHERE company_name = 'Google Cloud';

UPDATE public.courses 
SET company_id = (SELECT id FROM public.companies WHERE name = 'L&T' LIMIT 1)
WHERE company_name = 'L&T';

UPDATE public.courses 
SET company_id = (SELECT id FROM public.companies WHERE name = 'Suzlon' LIMIT 1)
WHERE company_name = 'Suzlon';

UPDATE public.courses 
SET company_id = (SELECT id FROM public.companies WHERE name = 'BHEL' LIMIT 1)
WHERE company_name = 'BHEL';

UPDATE public.courses 
SET company_id = (SELECT id FROM public.companies WHERE name = 'TATA Motors' LIMIT 1)
WHERE company_name = 'TATA Motors';

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Check total courses inserted
-- SELECT COUNT(*) as total_courses FROM public.courses;

-- View all courses with company info
-- SELECT c.id, c.title, c.company_name, c.location, c.rating, c.student_count, comp.name as company_name_verified
-- FROM public.courses c
-- LEFT JOIN public.companies comp ON c.company_id = comp.id
-- ORDER BY c.rating DESC;

-- Check courses by company
-- SELECT company_name, COUNT(*) as course_count 
-- FROM public.courses 
-- GROUP BY company_name 
-- ORDER BY course_count DESC;

