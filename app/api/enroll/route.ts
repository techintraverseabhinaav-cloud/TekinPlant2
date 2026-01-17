import { NextRequest, NextResponse } from 'next/server'
import { auth, currentUser } from '@clerk/nextjs/server'
import { createClient } from '../../../lib/supabase/server'
import { generateUserIdFromClerkId } from '../../../lib/supabase/sync-clerk-user'

// Use service role for admin operations
async function createServiceClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase configuration')
  }

  const { createClient: createSupabaseClient } = await import('@supabase/supabase-js')
  return createSupabaseClient(supabaseUrl, supabaseServiceKey)
}

export async function POST(request: NextRequest) {
  try {
    console.log('📥 Enrollment API called')
    
    // Try to get user from Clerk first (since app uses Clerk for auth)
    const { userId: clerkId } = await auth()
    
    let studentId: string | null = null
    
    if (clerkId) {
      console.log('🔑 Clerk ID found:', clerkId)
      
      // Get Supabase service client to lookup profile
      const serviceSupabase = await createServiceClient()
      
      // Try to find profile by clerk_id first
      const { data: profileByClerkId } = await serviceSupabase
        .from('profiles')
        .select('id')
        .eq('clerk_id', clerkId)
        .maybeSingle()
      
      if (profileByClerkId) {
        studentId = profileByClerkId.id
        console.log('✅ Found Supabase profile by clerk_id:', studentId)
      } else {
        // Try by generated ID
        const supabaseUserId = generateUserIdFromClerkId(clerkId)
        const { data: profileById } = await serviceSupabase
          .from('profiles')
          .select('id')
          .eq('id', supabaseUserId)
          .maybeSingle()
        
        if (profileById) {
          studentId = profileById.id
          console.log('✅ Found Supabase profile by generated ID:', studentId)
        }
      }
    }
    
    // If no Clerk user, try Supabase auth as fallback
    if (!studentId) {
      console.log('⚠️ No Clerk user, trying Supabase auth...')
      const supabase = await createClient()
      const { data: { user: supabaseUser }, error: authError } = await supabase.auth.getUser()
      
      if (!authError && supabaseUser) {
        studentId = supabaseUser.id
        console.log('✅ Found Supabase user:', studentId)
      }
    }
    
    if (!studentId) {
      console.error('❌ No authenticated user found (neither Clerk nor Supabase)')
      return NextResponse.json(
        { error: 'Unauthorized. Please sign in to enroll in a course.' },
        { status: 401 }
      )
    }

    console.log('👤 Using student ID:', studentId)

    const body = await request.json()
    console.log('📋 Request body:', body)
    const { courseId } = body

    if (!courseId) {
      console.error('❌ No courseId provided')
      return NextResponse.json(
        { error: 'Course ID is required' },
        { status: 400 }
      )
    }

    console.log('📚 Course ID:', courseId)
    
    // Check Supabase configuration
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error('❌ Missing Supabase configuration')
      return NextResponse.json(
        { error: 'Server configuration error: Supabase not configured' },
        { status: 500 }
      )
    }
    
    // Use service role client for admin operations
    const serviceSupabase = await createServiceClient()
    console.log('✅ Supabase service client created')
    
    // Verify profile exists, create if missing
    console.log('🔍 Verifying profile exists:', studentId)
    let { data: profile, error: profileError } = await serviceSupabase
      .from('profiles')
      .select('id, email, full_name')
      .eq('id', studentId)
      .maybeSingle()

    // If profile not found, try to create it from Clerk data
    if (profileError || !profile) {
      console.warn('⚠️ Profile not found, attempting to create from Clerk data...')
      
      if (clerkId) {
        try {
          // Get user data from Clerk
          const clerkUser = await currentUser()
          
          if (clerkUser) {
            const fullName = clerkUser.fullName || 
              (clerkUser.firstName && clerkUser.lastName 
                ? `${clerkUser.firstName} ${clerkUser.lastName}` 
                : clerkUser.firstName || null)
            
            const email = clerkUser.emailAddresses[0]?.emailAddress || null
            const role = (clerkUser.publicMetadata?.role as string) || 'student'
            
            console.log('➕ Creating profile from Clerk data...', {
              id: studentId,
              clerk_id: clerkId,
              email,
              full_name: fullName,
              role
            })
            
            // Try to create profile
            const { data: newProfile, error: createError } = await serviceSupabase
              .from('profiles')
              .insert({
                id: studentId,
                clerk_id: clerkId,
                email: email,
                full_name: fullName,
                role: role,
                avatar_url: clerkUser.imageUrl || null
              })
              .select('id, email, full_name')
              .single()
            
            if (createError) {
              // If creation fails due to unique constraint, try to find by clerk_id
              if (createError.code === '23505') {
                console.log('🔄 Profile already exists with different ID, looking up by clerk_id...')
                const { data: existingProfile } = await serviceSupabase
                  .from('profiles')
                  .select('id, email, full_name')
                  .eq('clerk_id', clerkId)
                  .maybeSingle()
                
                if (existingProfile) {
                  profile = existingProfile
                  studentId = existingProfile.id
                  console.log('✅ Found existing profile by clerk_id:', studentId)
                } else {
                  throw createError
                }
              } else {
                throw createError
              }
            } else {
              profile = newProfile
              console.log('✅ Created new profile:', profile.id)
            }
          }
        } catch (createErr: any) {
          console.error('❌ Error creating profile:', createErr)
          // Fall through to return error
        }
      }
      
      // If still no profile, return error
      if (!profile) {
        console.error('❌ Profile not found and could not be created:', profileError)
        console.error('❌ Student ID:', studentId)
        
        // Try to list profiles for debugging
        const { data: sampleProfiles } = await serviceSupabase
          .from('profiles')
          .select('id, email, clerk_id')
          .limit(3)
        
        console.log('📋 Sample profiles in database:', sampleProfiles)
        
        return NextResponse.json(
          { 
            error: 'User profile not found. Please ensure you are logged in and your profile exists in Supabase.',
            details: profileError?.message || 'Profile does not exist and could not be created',
            studentId,
            hint: 'Try signing out and signing back in to sync your profile, or visit /profile to update your profile'
          },
          { status: 404 }
        )
      }
    }

    console.log('✅ Found profile:', profile.id)

    // Verify course exists
    console.log('🔍 Verifying course exists:', courseId)
    console.log('🔍 Course ID type:', typeof courseId)
    console.log('🔍 Course ID length:', courseId?.length)
    
    // Try to find course by ID
    const { data: course, error: courseError } = await serviceSupabase
      .from('courses')
      .select('id, title, is_active')
      .eq('id', courseId)
      .maybeSingle()

    if (courseError) {
      console.error('❌ Error querying course:', courseError)
      console.error('❌ Error code:', courseError.code)
      console.error('❌ Error message:', courseError.message)
      console.error('❌ Error details:', courseError.details)
      
      return NextResponse.json(
        { 
          error: 'Database error while looking up course',
          details: courseError.message,
          code: courseError.code,
          courseId
        },
        { status: 500 }
      )
    }

    if (!course) {
      console.error('❌ Course not found in database')
      console.error('❌ Course ID provided:', courseId)
      
      // Try to list available courses for debugging
      const { data: allCourses, error: listError } = await serviceSupabase
        .from('courses')
        .select('id, title, is_active')
        .limit(10)
      
      if (!listError && allCourses) {
        console.log('📋 Available courses in database:', allCourses.map(c => ({ 
          id: c.id, 
          title: c.title,
          is_active: c.is_active 
        })))
      }
      
      return NextResponse.json(
        { 
          error: 'Course not found',
          details: `No course found with ID: ${courseId}`,
          courseId,
          hint: 'Make sure the course ID is correct and the course exists in the database',
          availableCourses: allCourses?.slice(0, 5) || []
        },
        { status: 404 }
      )
    }

    // Check if course is active
    if (course.is_active === false) {
      console.warn('⚠️ Course is inactive:', course.id)
      return NextResponse.json(
        { 
          error: 'Course is not available',
          details: 'This course is currently inactive',
          courseId: course.id,
          courseTitle: course.title
        },
        { status: 400 }
      )
    }

    console.log('✅ Course found:', course.title, 'ID:', course.id, 'Active:', course.is_active)

    // Check if already enrolled
    console.log('🔍 Checking for existing enrollment...')
    const { data: existingEnrollment, error: checkError } = await serviceSupabase
      .from('enrollments')
      .select('id, status')
      .eq('student_id', studentId)
      .eq('course_id', courseId)
      .maybeSingle()

    if (checkError) {
      console.error('❌ Error checking enrollment:', checkError)
    }

    if (existingEnrollment) {
      console.log('⚠️ Already enrolled:', existingEnrollment)
      return NextResponse.json(
        { error: 'You are already enrolled in this course', enrollment: existingEnrollment },
        { status: 400 }
      )
    }

    // Enroll in course (using service role to bypass RLS)
    console.log('📝 Creating enrollment...', {
      student_id: studentId,
      course_id: courseId,
      status: 'approved' // Set to approved so it counts immediately
    })
    
    // Ensure courseId and studentId are valid UUIDs
    if (!courseId || typeof courseId !== 'string' || courseId.trim() === '') {
      console.error('❌ Invalid courseId:', courseId)
      return NextResponse.json(
        { error: 'Invalid course ID format' },
        { status: 400 }
      )
    }
    
    if (!studentId || typeof studentId !== 'string' || studentId.trim() === '') {
      console.error('❌ Invalid studentId:', studentId)
      return NextResponse.json(
        { error: 'Invalid student ID format' },
        { status: 400 }
      )
    }
    
    const { data: enrollment, error: enrollmentError } = await serviceSupabase
      .from('enrollments')
      .insert({
        student_id: studentId,
        course_id: courseId,
        status: 'pending',
        progress_percentage: 0, // Initialize progress to 0
      })
      .select()
      .single()

    if (enrollmentError) {
      console.error('❌ Enrollment error:', enrollmentError)
      console.error('❌ Error code:', enrollmentError.code)
      console.error('❌ Error message:', enrollmentError.message)
      console.error('❌ Error details:', enrollmentError.details)
      console.error('❌ Error hint:', enrollmentError.hint)
      console.error('❌ Full error:', JSON.stringify(enrollmentError, null, 2))
      return NextResponse.json(
        { 
          error: 'Failed to enroll in course', 
          details: enrollmentError.message,
          code: enrollmentError.code,
          hint: enrollmentError.hint,
          studentId,
          courseId
        },
        { status: 500 }
      )
    }

    console.log('✅ Enrollment created successfully:', enrollment)

    // Increment student_count by 1 when enrollment is approved
    // This adds to the base count from industry-data.ts
    console.log('📈 Incrementing student_count for course:', courseId)
    const { data: currentCourse, error: fetchError } = await serviceSupabase
      .from('courses')
      .select('student_count')
      .eq('id', courseId)
      .single()
    
    if (!fetchError && currentCourse) {
      const newCount = (currentCourse.student_count || 0) + 1
      const { error: updateError } = await serviceSupabase
        .from('courses')
        .update({ student_count: newCount })
        .eq('id', courseId)
      
      if (updateError) {
        console.error('⚠️ Failed to increment student_count:', updateError)
      } else {
        console.log(`✅ Student count incremented: ${currentCourse.student_count} → ${newCount}`)
      }
    } else {
      console.error('⚠️ Failed to fetch current student_count:', fetchError)
    }

    // Create notification for the student
    try {
      console.log('📬 Creating notification...')
      const { error: notifError } = await serviceSupabase
        .from('notifications')
        .insert({
          user_id: studentId,
          title: 'Enrollment Successful',
          message: `You have successfully enrolled in ${course.title}. Your enrollment is pending approval.`,
          type: 'info',
          read: false
        })
      
      if (notifError) {
        console.error('⚠️ Failed to create notification:', notifError)
        // Don't fail enrollment if notification fails
      } else {
        console.log('✅ Notification created')
      }
    } catch (notifError) {
      console.error('⚠️ Error creating notification:', notifError)
      // Don't fail enrollment if notification fails
    }

    return NextResponse.json({
      success: true,
      enrollment,
      message: 'Successfully enrolled in course!'
    })
  } catch (error: any) {
    console.error('❌ Enrollment error (catch block):', error)
    console.error('❌ Error message:', error?.message)
    console.error('❌ Error stack:', error?.stack)
    console.error('❌ Error name:', error?.name)
    console.error('❌ Full error:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2))
    
    return NextResponse.json(
      { 
        error: error.message || 'Failed to enroll in course',
        details: error.toString(),
        type: error?.name || 'UnknownError'
      },
      { status: 500 }
    )
  }
}

