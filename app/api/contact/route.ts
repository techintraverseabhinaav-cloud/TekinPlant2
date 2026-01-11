import { NextRequest, NextResponse } from 'next/server'
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

// POST - Submit contact form
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Create Supabase client
    const supabase = await createServiceClient()

    // Insert contact message into database
    const { data, error } = await supabase
      .from('contact_messages')
      .insert({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject.trim(),
        message: message.trim(),
        status: 'new' // new, read, replied
      })
      .select()
      .single()

    if (error) {
      console.error('❌ Error saving contact message:', error)
      console.error('❌ Error code:', error.code)
      console.error('❌ Error details:', error.details)
      console.error('❌ Error hint:', error.hint)
      
      // Check if table doesn't exist
      if (error.code === '42P01' || error.message?.includes('does not exist')) {
        return NextResponse.json(
          { 
            error: 'Database table not found',
            details: 'The contact_messages table does not exist. Please run the SQL script in Supabase to create it.',
            hint: 'See supabase/create-contact-messages-table.sql'
          },
          { status: 500 }
        )
      }
      
      return NextResponse.json(
        { 
          error: 'Failed to save message', 
          details: error.message,
          code: error.code,
          hint: error.hint
        },
        { status: 500 }
      )
    }

    console.log('✅ Contact message saved:', data.id)

    // TODO: Optional - Send email notification here
    // You can integrate with services like:
    // - Resend (resend.com)
    // - SendGrid
    // - Nodemailer
    // - AWS SES

    return NextResponse.json({
      success: true,
      message: 'Your message has been sent successfully!',
      id: data.id
    })
  } catch (error: any) {
    console.error('❌ Contact form error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to submit contact form' },
      { status: 500 }
    )
  }
}

// GET - Retrieve contact messages (admin only - optional)
export async function GET(request: NextRequest) {
  try {
    const supabase = await createServiceClient()
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || 'all'
    const limit = parseInt(searchParams.get('limit') || '50')

    let query = supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (status !== 'all') {
      query = query.eq('status', status)
    }

    const { data, error } = await query

    if (error) {
      console.error('❌ Error fetching contact messages:', error)
      return NextResponse.json(
        { error: 'Failed to fetch messages', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, messages: data })
  } catch (error: any) {
    console.error('❌ Get contact messages error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch contact messages' },
      { status: 500 }
    )
  }
}

