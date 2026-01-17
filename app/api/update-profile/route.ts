import { NextRequest, NextResponse } from 'next/server'
import { auth, currentUser } from '@clerk/nextjs/server'
import { generateUserIdFromClerkId } from '../../../lib/supabase/sync-clerk-user'
import { createClient } from '@supabase/supabase-js'

// Use service role for admin operations
async function createServiceClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase configuration')
  }

  return createClient(supabaseUrl, supabaseServiceKey)
}

export async function PUT(request: NextRequest) {
  try {
    console.log('📥 Update profile API called')
    
    const { userId: clerkId } = await auth()
    console.log('🔑 Clerk ID:', clerkId)
    
    if (!clerkId) {
      console.error('❌ No Clerk ID found')
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    console.log('📋 Request body:', body)
    const { firstName, lastName, fullName, avatarUrl } = body

    // Validate input - allow avatarUrl updates even without name fields
    if (!firstName && !lastName && !fullName && !avatarUrl) {
      console.error('❌ No fields provided')
      return NextResponse.json(
        { error: 'At least one field (firstName, lastName, fullName, or avatarUrl) is required' },
        { status: 400 }
      )
    }

    // Get Supabase user ID from Clerk ID
    const supabaseUserId = generateUserIdFromClerkId(clerkId)
    console.log('🆔 Supabase User ID:', supabaseUserId)
    
    // Check Supabase configuration
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error('❌ Missing Supabase configuration')
      return NextResponse.json(
        { error: 'Server configuration error: Supabase not configured' },
        { status: 500 }
      )
    }
    
    // Use service role client for admin operations
    const supabase = await createServiceClient()
    console.log('✅ Supabase client created')
    
    // Verify user exists in Supabase
    console.log('🔍 Checking for profile with ID:', supabaseUserId)
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id, full_name, clerk_id')
      .eq('id', supabaseUserId)
      .single()

    if (profileError) {
      console.error('❌ Profile error:', profileError)
      console.error('❌ Error code:', profileError.code)
      console.error('❌ Error message:', profileError.message)
      console.error('❌ Error details:', profileError.details)
      
      // Try to find by clerk_id as fallback
      console.log('🔄 Trying to find profile by clerk_id...')
      const { data: profileByClerkId, error: clerkIdError } = await supabase
        .from('profiles')
        .select('id, full_name, clerk_id, email')
        .eq('clerk_id', clerkId)
        .single()
      
      if (clerkIdError || !profileByClerkId) {
        // If profile doesn't exist, try to create it using the sync function
        console.log('🔄 Profile not found, attempting to create it...')
        try {
          const { syncClerkUserToSupabase } = await import('../../../lib/supabase/sync-clerk-user')
          
          // Get full user data from Clerk to create the profile properly
          const clerkUser = await currentUser()
          if (!clerkUser) {
            return NextResponse.json(
              { error: 'Could not fetch user data from Clerk' },
              { status: 401 }
            )
          }
          
          const constructedFullName = fullName || 
            (firstName && lastName ? `${firstName} ${lastName}` : firstName || lastName || clerkUser.fullName || null)
          
          // Use the sync function to create the profile with all necessary data
          const syncResult = await syncClerkUserToSupabase({
            clerkId: clerkId,
            email: clerkUser.emailAddresses[0]?.emailAddress || '',
            fullName: constructedFullName,
            firstName: firstName || clerkUser.firstName || null,
            lastName: lastName || clerkUser.lastName || null,
            avatarUrl: avatarUrl || clerkUser.imageUrl || null,
            role: (clerkUser.publicMetadata?.role as string) || 'student'
          })
          
          console.log('✅ Profile created via sync:', syncResult)
          return NextResponse.json({
            success: true,
            profile: syncResult,
            message: 'Profile created and updated successfully in Supabase'
          })
        } catch (syncError: any) {
          console.error('❌ Error creating profile via sync:', syncError)
          console.error('❌ Sync error details:', syncError.message, syncError.stack)
          return NextResponse.json(
            { 
              error: 'User profile not found and could not be created. Please try signing out and back in to sync your profile.',
              details: syncError.message || profileError.message,
              clerkId,
              supabaseUserId,
              hint: 'Your profile may need to be synced. Try visiting the dashboard or signing out and back in.'
            },
            { status: 404 }
          )
        }
      }
      
      // Use profile found by clerk_id
      const profileToUpdate = profileByClerkId
      console.log('✅ Found profile by clerk_id:', profileToUpdate.id)
      
      // Prepare update data
      // Note: updated_at is automatically handled by database trigger
      const updateData: any = {}

      // Update full_name - construct from firstName/lastName or use provided fullName
      if (fullName) {
        updateData.full_name = fullName.trim() || null
      } else if (firstName || lastName) {
        // Construct full name from parts
        const parts = []
        if (firstName) parts.push(firstName.trim())
        if (lastName) parts.push(lastName.trim())
        const constructedName = parts.join(' ').trim()
        updateData.full_name = constructedName || profileToUpdate.full_name || null
      }

      // Update avatar_url if provided
      if (avatarUrl) {
        updateData.avatar_url = avatarUrl.trim() || null
      }

      console.log('📝 Update data:', updateData)

      // Update profile in Supabase
      const { data: updatedProfile, error: updateError } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', profileToUpdate.id)
        .select()
        .single()

      if (updateError) {
        console.error('❌ Error updating profile:', updateError)
        console.error('❌ Update error code:', updateError.code)
        console.error('❌ Update error message:', updateError.message)
        return NextResponse.json(
          { error: 'Failed to update profile in Supabase', details: updateError.message },
          { status: 500 }
        )
      }

      console.log('✅ Profile updated in Supabase:', updatedProfile)
      return NextResponse.json({
        success: true,
        profile: updatedProfile,
        message: 'Profile updated successfully in Supabase'
      })
    }

    if (!profile) {
      console.error('❌ Profile not found')
      return NextResponse.json(
        { error: 'User profile not found. Please ensure you are logged in.' },
        { status: 404 }
      )
    }

    console.log('✅ Found existing profile:', profile)

    // Prepare update data
    // Note: updated_at is automatically handled by database trigger
    const updateData: any = {}
    
    // Ensure clerk_id is set (in case it was missing)
    if (!profile.clerk_id) {
      updateData.clerk_id = clerkId
      console.log('📝 Setting missing clerk_id on profile')
    }

    // Update full_name - construct from firstName/lastName or use provided fullName
    if (fullName) {
      updateData.full_name = fullName.trim() || null
    } else if (firstName || lastName) {
      // Construct full name from parts
      const parts = []
      if (firstName) parts.push(firstName.trim())
      if (lastName) parts.push(lastName.trim())
      const constructedName = parts.join(' ').trim()
      updateData.full_name = constructedName || profile.full_name || null
    }

    // Update avatar_url if provided
    if (avatarUrl) {
      updateData.avatar_url = avatarUrl.trim() || null
    }

    // Check if there's anything to update
    if (Object.keys(updateData).length === 0) {
      console.log('ℹ️ No changes to update')
      // Return current profile even if no changes
      const { data: currentProfile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', supabaseUserId)
        .single()
      
      return NextResponse.json({
        success: true,
        profile: currentProfile,
        message: 'No changes to update'
      })
    }

    console.log('📝 Update data:', updateData)

    // Update profile in Supabase
    const { data: updatedProfile, error: updateError } = await supabase
      .from('profiles')
      .update(updateData)
      .eq('id', supabaseUserId)
      .select()
      .single()

    if (updateError) {
      console.error('❌ Error updating profile:', updateError)
      console.error('❌ Update error code:', updateError.code)
      console.error('❌ Update error message:', updateError.message)
      console.error('❌ Update error details:', updateError.details)
      console.error('❌ Update error hint:', updateError.hint)
      
      // Provide helpful error messages based on error code
      let errorMessage = 'Failed to update profile in Supabase'
      if (updateError.code === '23505') {
        errorMessage = 'Profile update conflict - please try again'
      } else if (updateError.code === '23503') {
        errorMessage = 'Database constraint violation - please contact support'
      } else if (updateError.message?.includes('permission') || updateError.message?.includes('policy')) {
        errorMessage = 'Permission denied - RLS policy may be blocking update'
      }
      
      return NextResponse.json(
        { 
          error: errorMessage, 
          details: updateError.message,
          code: updateError.code,
          hint: updateError.hint
        },
        { status: 500 }
      )
    }

    console.log('✅ Profile updated in Supabase:', updatedProfile)

    return NextResponse.json({
      success: true,
      profile: updatedProfile,
      message: 'Profile updated successfully in Supabase'
    })
  } catch (error: any) {
    console.error('❌ Profile update error:', error)
    console.error('❌ Error message:', error?.message)
    console.error('❌ Error stack:', error?.stack)
    return NextResponse.json(
      { error: error.message || 'Failed to update profile', details: error.toString() },
      { status: 500 }
    )
  }
}

