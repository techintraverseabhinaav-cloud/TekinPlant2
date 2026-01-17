"use client"

import { useState, useEffect, useLayoutEffect } from "react"
import { use } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import { useTheme } from "next-themes"
import { useThemeStyles } from "../../../lib/theme-styles"
import { ArrowLeft, CreditCard, User, Mail, Phone, Calendar, CheckCircle, Clock, Users, Star, ChevronDown } from "lucide-react"
import Navbar from "../../../src/components/Navbar"
import Link from "next/link"
import { toast } from "sonner"

interface Course {
  id: string
  title: string
  company_name: string
  location: string
  type: string
  duration: string
  price: string
  image_url: string
  description: string
  tags: string[]
  rating: number
  student_count: number
  instructor_id: string | null
}

export default function EnrollmentPage({ params }: { params: Promise<{ courseId: string }> }) {
  const resolvedParams = use(params)
  const router = useRouter()
  const { user, isLoaded } = useUser()
  const { resolvedTheme } = useTheme()
  const themeStyles = useThemeStyles()
  
  // Read initial theme from data-theme attribute (set by theme script before React)
  // Returns: true for dark mode (purple), false for light mode (purple)
  const [isDark, setIsDark] = useState(() => {
    // First, try to read from data-theme attribute (set by theme script before React)
    // This works in both client and SSR if document is available
    if (typeof document !== 'undefined') {
      const dataTheme = document.documentElement.getAttribute('data-theme')
      if (dataTheme === 'dark') {
        return true // Current mode is dark, SSR fallback = dark
      }
      if (dataTheme === 'light') {
        return false // Current mode is light, SSR fallback = light
      }
    }
    
    // Client-side: fallback to localStorage if data-theme not set yet
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme')
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      let theme
      
      if (savedTheme === 'system' || !savedTheme) {
        theme = prefersDark ? 'dark' : 'light'
      } else {
        theme = savedTheme
      }
      
      // If current mode is dark, SSR fallback should be dark
      // If current mode is light, SSR fallback should be light
      if (theme === 'dark') {
        return true // Current mode is dark, SSR fallback = dark
      } else {
        return false // Current mode is light, SSR fallback = light
      }
    }
    
    // SSR fallback: Check data-theme first (set by theme script before React)
    // If current mode is dark, SSR fallback = dark
    // If current mode is light, SSR fallback = light
    if (typeof document !== 'undefined') {
      const dataTheme = document.documentElement.getAttribute('data-theme')
      if (dataTheme === 'dark') {
        return true // Current mode is dark, SSR fallback = dark
      }
      if (dataTheme === 'light') {
        return false // Current mode is light, SSR fallback = light
      }
    }
    
    // Final fallback: default to dark (will be corrected by useLayoutEffect)
    return true
  })
  
  // Update theme when resolvedTheme changes
  useLayoutEffect(() => {
    if (resolvedTheme) {
      setIsDark(resolvedTheme === 'dark')
    }
  }, [resolvedTheme])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoadingCourse, setIsLoadingCourse] = useState(true)
  const [courseData, setCourseData] = useState<Course | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    position: "",
    experience: "beginner",
    goals: "",
    paymentMethod: "card"
  })

  // Fetch course data from API
  useEffect(() => {
    async function fetchCourse() {
      console.log('📚 Fetching course:', resolvedParams.courseId)
      setIsLoadingCourse(true)
      setError(null)
      
      try {
        // Validate courseId is not empty
        if (!resolvedParams.courseId || resolvedParams.courseId.trim() === '') {
          throw new Error('Invalid course ID: Course ID is required')
        }

        // Validate UUID format
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
        const trimmedId = resolvedParams.courseId.trim()
        
        if (!uuidRegex.test(trimmedId)) {
          console.error('❌ Invalid UUID format:', trimmedId)
          throw new Error(`Invalid course ID format. Expected UUID, received: "${trimmedId}". Please select a course from the courses page.`)
        }

        const response = await fetch(`/api/courses?id=${encodeURIComponent(trimmedId)}`)
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          console.error('❌ API error response:', errorData)
          throw new Error(errorData.error || errorData.details || `Failed to fetch course (${response.status})`)
        }
        
        const data = await response.json()
        console.log('✅ Course data received:', data)
        
        if (!data || !data.id) {
          throw new Error('Invalid course data received from server')
        }
        
        setCourseData(data)
      } catch (err: any) {
        console.error('❌ Error fetching course:', err)
        setError(err.message || 'Failed to load course details. Please try again or go back to the courses page.')
        setCourseData(null)
      } finally {
        setIsLoadingCourse(false)
      }
    }
    fetchCourse()
  }, [resolvedParams.courseId])

  // Pre-fill form with user data from Clerk
  useEffect(() => {
    if (isLoaded && user) {
      setFormData(prev => ({
        ...prev,
        firstName: user.firstName || prev.firstName,
        lastName: user.lastName || prev.lastName,
        email: user.emailAddresses[0]?.emailAddress || prev.email,
      }))
    }
  }, [isLoaded, user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      toast.error("Please sign in to enroll in a course.", {
        description: "Redirecting to login page...",
        duration: 3000,
      })
      router.push("/login")
      return
    }

    if (!courseData?.id) {
      toast.error("Course data not loaded", {
        description: "Please wait and try again.",
        duration: 3000,
      })
      return
    }

    setIsSubmitting(true)
    setError(null)
    
    try {
      // Validate course ID before submitting
      if (!courseData.id || typeof courseData.id !== 'string' || courseData.id.trim() === '') {
        throw new Error('Invalid course ID. Please refresh the page and try again.')
      }

      // Validate UUID format
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
      if (!uuidRegex.test(courseData.id.trim())) {
        throw new Error(`Invalid course ID format: "${courseData.id}". Please go back and select a course from the courses page.`)
      }

      console.log('📝 Submitting enrollment for course:', courseData.id, courseData.title)
      
      const response = await fetch('/api/enroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId: courseData.id.trim(), // Use the actual UUID from courseData
        }),
      })

      console.log('📡 Enrollment API response status:', response.status)

      const data = await response.json()
      console.log('📋 Enrollment API response:', data)

      if (!response.ok) {
        console.error('❌ Enrollment failed:', data)
        const errorMessage = data.error || data.details || 'Failed to enroll in course'
        throw new Error(errorMessage)
      }

      console.log('✅ Enrollment successful:', data.enrollment)

      // Success - redirect to student dashboard
      toast.success("Enrollment successful!", {
        description: `You have successfully enrolled in ${courseData.title}. You can now access it from your dashboard.`,
        duration: 4000,
      })
      setTimeout(() => {
        router.push("/student-dashboard")
      }, 1500)
    } catch (error: any) {
      console.error('❌ Enrollment error:', error)
      const errorMessage = error.message || "Failed to enroll. Please try again."
      setError(errorMessage)
      toast.error("Enrollment failed", {
        description: errorMessage,
        duration: 5000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  if (isLoadingCourse || !isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: themeStyles.pageBg }}>
        <div className="text-center">
          <div className={`animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4 ${isDark ? 'border-purple-500' : 'border-purple-800'}`}></div>
          <p style={{ color: themeStyles.textPrimary }}>Loading course details...</p>
        </div>
      </div>
    )
  }

  if (error || !courseData) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: themeStyles.pageBg }}>
        <div className={`text-xl text-center p-6 rounded-2xl backdrop-blur-xl border ${isDark ? 'text-red-400 border-red-500/20' : 'text-red-600 border-red-600/30'}`} style={{ 
          backgroundColor: isDark ? 'rgba(239,68,68,0.1)' : 'rgba(239,68,68,0.15)' 
        }}>
          <p>Error: {error || "Course data could not be loaded."}</p>
          <p className={`text-sm mt-2 ${isDark ? 'text-white/60' : 'text-gray-700'}`}>Please try refreshing the page.</p>
          <Link 
            href="/courses"
            className={`mt-4 inline-block ${isDark ? 'text-purple-400 hover:text-purple-300' : 'text-purple-800 hover:text-purple-900'}`}
          >
            Back to Courses
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative" style={{ 
      backgroundColor: themeStyles.pageBg,
      paddingTop: 0,
      marginTop: 0,
      border: 'none',
      borderTop: 'none'
    }}>
      <div className="absolute inset-0 backdrop-blur-[1px]" style={{ background: themeStyles.pageBgGradient }}></div>
      <div style={{ 
        position: 'relative',
        zIndex: 50,
        border: 'none',
        borderTop: 'none',
        paddingTop: 0,
        marginTop: 0,
        backgroundColor: themeStyles.pageBg
      }}>
        <Navbar />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href={`/courses/${courseData.id}`}
            className={`inline-flex items-center transition-colors mb-4 ${isDark ? 'text-purple-400 hover:text-purple-300' : 'text-purple-800 hover:text-purple-900'}`}
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Course
          </Link>
          <h1 className={`text-4xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Enroll in Course</h1>
          <p style={{ color: themeStyles.textSecondary }}>Complete your enrollment for {courseData.title}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Enrollment Form */}
          <div className="space-y-8">
            <div className="rounded-xl p-6 backdrop-blur-xl border" style={{ 
              backgroundColor: themeStyles.cardBg,
              borderColor: isDark ? 'rgba(168,85,247,0.25)' : 'rgba(91,33,182,0.3)'
            }}>
              <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Personal Information</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className={`block text-sm font-medium mb-2 ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg transition-all duration-300 focus:outline-none ${isDark ? 'text-white placeholder-white/30' : 'text-gray-900 placeholder-gray-500'}`}
                      style={{ 
                        backgroundColor: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.9)',
                        borderColor: isDark ? 'rgba(168,85,247,0.2)' : 'rgba(91,33,182,0.3)'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.5)' : 'rgba(91,33,182,0.5)'
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.2)' : 'rgba(91,33,182,0.3)'
                      }}
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className={`block text-sm font-medium mb-2 ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg transition-all duration-300 focus:outline-none ${isDark ? 'text-white placeholder-white/30' : 'text-gray-900 placeholder-gray-500'}`}
                      style={{ 
                        backgroundColor: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.9)',
                        borderColor: isDark ? 'rgba(168,85,247,0.2)' : 'rgba(91,33,182,0.3)'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.5)' : 'rgba(91,33,182,0.5)'
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.2)' : 'rgba(91,33,182,0.3)'
                      }}
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className={`block text-sm font-medium mb-2 ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg transition-all duration-300 focus:outline-none ${isDark ? 'text-white placeholder-white/30' : 'text-gray-900 placeholder-gray-500'}`}
                    style={{ 
                      backgroundColor: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.9)',
                      borderColor: isDark ? 'rgba(168,85,247,0.2)' : 'rgba(91,33,182,0.3)'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.5)' : 'rgba(91,33,182,0.5)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.2)' : 'rgba(91,33,182,0.3)'
                    }}
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className={`block text-sm font-medium mb-2 ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg transition-all duration-300 focus:outline-none ${isDark ? 'text-white placeholder-white/30' : 'text-gray-900 placeholder-gray-500'}`}
                    style={{ 
                      backgroundColor: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.9)',
                      borderColor: isDark ? 'rgba(168,85,247,0.2)' : 'rgba(91,33,182,0.3)'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.5)' : 'rgba(91,33,182,0.5)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.2)' : 'rgba(91,33,182,0.3)'
                    }}
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="company" className={`block text-sm font-medium mb-2 ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg transition-all duration-300 focus:outline-none ${isDark ? 'text-white placeholder-white/30' : 'text-gray-900 placeholder-gray-500'}`}
                      style={{ 
                        backgroundColor: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.9)',
                        borderColor: isDark ? 'rgba(168,85,247,0.2)' : 'rgba(91,33,182,0.3)'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.5)' : 'rgba(91,33,182,0.5)'
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.2)' : 'rgba(91,33,182,0.3)'
                      }}
                      placeholder="Enter your company name"
                    />
                  </div>
                  <div>
                    <label htmlFor="position" className={`block text-sm font-medium mb-2 ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
                      Position
                    </label>
                    <input
                      type="text"
                      id="position"
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg transition-all duration-300 focus:outline-none ${isDark ? 'text-white placeholder-white/30' : 'text-gray-900 placeholder-gray-500'}`}
                      style={{ 
                        backgroundColor: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.9)',
                        borderColor: isDark ? 'rgba(168,85,247,0.2)' : 'rgba(91,33,182,0.3)'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.5)' : 'rgba(91,33,182,0.5)'
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.2)' : 'rgba(91,33,182,0.3)'
                      }}
                      placeholder="Enter your job title"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="experience" className={`block text-sm font-medium mb-2 ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
                    Experience Level
                  </label>
                  <div className="relative">
                  <select
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                      className={`w-full px-4 py-3 pr-10 rounded-xl focus:outline-none transition-all duration-300 backdrop-blur-xl border appearance-none cursor-pointer ${isDark ? 'text-white' : 'text-gray-900'}`}
                      style={{ 
                        backgroundColor: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.9)',
                        borderColor: isDark ? 'rgba(168,85,247,0.3)' : 'rgba(91,33,182,0.3)',
                        boxShadow: isDark ? '0 0 15px rgba(196,181,253,0.2), inset 0 1px 0 rgba(255,255,255,0.05)' : '0 0 15px rgba(91,33,182,0.2), inset 0 1px 0 rgba(255,255,255,0.1)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.5)' : 'rgba(91,33,182,0.5)'
                        e.currentTarget.style.boxShadow = isDark ? '0 0 20px rgba(196,181,253,0.3), inset 0 1px 0 rgba(255,255,255,0.08)' : '0 0 20px rgba(91,33,182,0.3), inset 0 1px 0 rgba(255,255,255,0.15)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.3)' : 'rgba(91,33,182,0.3)'
                        e.currentTarget.style.boxShadow = isDark ? '0 0 15px rgba(196,181,253,0.2), inset 0 1px 0 rgba(255,255,255,0.05)' : '0 0 15px rgba(91,33,182,0.2), inset 0 1px 0 rgba(255,255,255,0.1)'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.6)' : 'rgba(91,33,182,0.6)'
                        e.currentTarget.style.boxShadow = isDark ? '0 0 25px rgba(196,181,253,0.4), inset 0 1px 0 rgba(255,255,255,0.1)' : '0 0 25px rgba(91,33,182,0.4), inset 0 1px 0 rgba(255,255,255,0.2)'
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.3)' : 'rgba(91,33,182,0.3)'
                        e.currentTarget.style.boxShadow = isDark ? '0 0 15px rgba(196,181,253,0.2), inset 0 1px 0 rgba(255,255,255,0.05)' : '0 0 15px rgba(91,33,182,0.2), inset 0 1px 0 rgba(255,255,255,0.1)'
                      }}
                  >
                      <option value="beginner" style={{ backgroundColor: isDark ? '#0a0a0a' : '#ffffff', color: isDark ? '#ffffff' : '#1e293b' }}>Beginner</option>
                      <option value="intermediate" style={{ backgroundColor: isDark ? '#0a0a0a' : '#ffffff', color: isDark ? '#ffffff' : '#1e293b' }}>Intermediate</option>
                      <option value="advanced" style={{ backgroundColor: isDark ? '#0a0a0a' : '#ffffff', color: isDark ? '#ffffff' : '#1e293b' }}>Advanced</option>
                  </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <ChevronDown className="w-5 h-5" style={{ color: isDark ? '#c084fc' : '#5b21b6' }} />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="goals" className={`block text-sm font-medium mb-2 ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
                    Learning Goals
                  </label>
                  <textarea
                    id="goals"
                    name="goals"
                    value={formData.goals}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full px-4 py-3 rounded-lg transition-all duration-300 focus:outline-none resize-none ${isDark ? 'text-white placeholder-white/30' : 'text-gray-900 placeholder-gray-500'}`}
                    style={{ 
                      backgroundColor: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.9)',
                      borderColor: isDark ? 'rgba(168,85,247,0.2)' : 'rgba(91,33,182,0.3)'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.5)' : 'rgba(91,33,182,0.5)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.2)' : 'rgba(91,33,182,0.3)'
                    }}
                    placeholder="What do you hope to achieve from this course?"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-4 ${isDark ? 'text-white/70' : 'text-gray-700'}`}>Payment Method</label>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === "card"}
                        onChange={handleChange}
                        className={`w-4 h-4 focus:ring-2 ${isDark ? 'text-purple-600 focus:ring-purple-500' : 'text-purple-800 focus:ring-purple-800'}`}
                        style={{ 
                          backgroundColor: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.9)',
                          borderColor: isDark ? 'rgba(168,85,247,0.3)' : 'rgba(91,33,182,0.3)'
                        }}
                      />
                      <span className={`ml-3 flex items-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        <CreditCard size={20} className="mr-2" />
                        Credit/Debit Card
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bank"
                        checked={formData.paymentMethod === "bank"}
                        onChange={handleChange}
                        className={`w-4 h-4 focus:ring-2 ${isDark ? 'text-purple-600 focus:ring-purple-500' : 'text-purple-800 focus:ring-purple-800'}`}
                        style={{ 
                          backgroundColor: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.9)',
                          borderColor: isDark ? 'rgba(168,85,247,0.3)' : 'rgba(91,33,182,0.3)'
                        }}
                      />
                      <span className={`ml-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>Bank Transfer</span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !isLoaded || !user || isLoadingCourse || !courseData}
                  className="w-full text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 text-base backdrop-blur-sm border disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ 
                    background: isSubmitting || !isLoaded || !user || isLoadingCourse || !courseData 
                      ? (isDark ? 'rgba(75,85,99,0.5)' : 'rgba(91,33,182,0.3)')
                      : themeStyles.buttonGradient,
                    borderColor: isDark ? 'rgba(168,85,247,0.4)' : 'rgba(91,33,182,0.4)',
                    boxShadow: themeStyles.buttonShadow
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting && isLoaded && user && !isLoadingCourse && courseData) {
                      e.currentTarget.style.boxShadow = themeStyles.buttonShadowHover
                      e.currentTarget.style.transform = 'scale(1.02)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = themeStyles.buttonShadow
                    e.currentTarget.style.transform = 'scale(1)'
                  }}
                >
                  {isSubmitting ? "Enrolling..." : isLoadingCourse ? "Loading..." : `Complete Enrollment - ${courseData.price}`}
                </button>
                {!user && isLoaded && (
                  <p className={`text-sm mt-2 text-center ${isDark ? 'text-yellow-400' : 'text-purple-800'}`}>
                    Please sign in to enroll in this course.
                  </p>
                )}
                {error && (
                  <p className={`text-sm mt-2 text-center ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                    {error}
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* Course Summary */}
          <div className="space-y-6">
            <div className="rounded-xl p-6 backdrop-blur-xl border" style={{ 
              backgroundColor: themeStyles.cardBg,
              borderColor: isDark ? 'rgba(168,85,247,0.25)' : 'rgba(91,33,182,0.3)'
            }}>
              <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Course Summary</h2>
              <div className="space-y-4">
                <div>
                  <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-purple-400' : 'text-purple-800'}`}>{courseData.title}</h3>
                  <p style={{ color: themeStyles.textSecondary }}>Company: {courseData.company_name || 'N/A'}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className={`flex items-center text-sm ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
                    <Clock size={16} className="mr-2" style={{ color: isDark ? '#a78bfa' : '#5b21b6' }} />
                    <span>{courseData.duration}</span>
                  </div>
                  <div className={`flex items-center text-sm ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
                    <Users size={16} className="mr-2" style={{ color: isDark ? '#a78bfa' : '#5b21b6' }} />
                    <span>{courseData.student_count} students</span>
                  </div>
                  <div className={`flex items-center text-sm ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
                    <Star size={16} className="mr-2" style={{ color: '#fbbf24' }} />
                    <span>{courseData.rating} rating</span>
                  </div>
                  <div className={`flex items-center text-sm ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
                    <Calendar size={16} className="mr-2" style={{ color: isDark ? '#a78bfa' : '#5b21b6' }} />
                    <span>Starts TBD</span>
                  </div>
                </div>

                <div className="pt-4 border-t" style={{ borderColor: isDark ? 'rgba(168,85,247,0.2)' : 'rgba(91,33,182,0.25)' }}>
                  <p className={`text-sm mb-2 ${isDark ? 'text-white/60' : 'text-gray-700'}`}>Location:</p>
                  <p className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{courseData.location}</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl p-6 backdrop-blur-xl border" style={{ 
              backgroundColor: themeStyles.cardBg,
              borderColor: isDark ? 'rgba(168,85,247,0.25)' : 'rgba(91,33,182,0.3)'
            }}>
              <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>What's Included</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-3" style={{ color: '#10b981' }} />
                  <span className={`text-sm ${isDark ? 'text-white/70' : 'text-gray-700'}`}>Lifetime access to course materials</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-3" style={{ color: '#10b981' }} />
                  <span className={`text-sm ${isDark ? 'text-white/70' : 'text-gray-700'}`}>Live interactive sessions</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-3" style={{ color: '#10b981' }} />
                  <span className={`text-sm ${isDark ? 'text-white/70' : 'text-gray-700'}`}>Certificate of completion</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-3" style={{ color: '#10b981' }} />
                  <span className={`text-sm ${isDark ? 'text-white/70' : 'text-gray-700'}`}>1-on-1 mentoring sessions</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-3" style={{ color: '#10b981' }} />
                  <span className={`text-sm ${isDark ? 'text-white/70' : 'text-gray-700'}`}>Project portfolio development</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-3" style={{ color: '#10b981' }} />
                  <span className={`text-sm ${isDark ? 'text-white/70' : 'text-gray-700'}`}>Career guidance and support</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl p-6 backdrop-blur-xl border" style={{ 
              backgroundColor: themeStyles.cardBg,
              borderColor: isDark ? 'rgba(168,85,247,0.25)' : 'rgba(91,33,182,0.3)'
            }}>
              <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Payment Information</h3>
              <div className="space-y-3">
                <div className={`flex justify-between ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
                  <span>Course Fee:</span>
                  <span className="font-semibold">{courseData.price}</span>
                </div>
                <div className={`flex justify-between ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
                  <span>Registration Fee:</span>
                  <span className="font-semibold">$50</span>
                </div>
                <div className={`flex justify-between ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
                  <span>Study Materials:</span>
                  <span className="font-semibold">Included</span>
                </div>
                <div className="pt-3 border-t" style={{ borderColor: isDark ? 'rgba(168,85,247,0.2)' : 'rgba(91,33,182,0.25)' }}>
                  <div className={`flex justify-between text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    <span>Total:</span>
                    <span className={isDark ? 'text-purple-400' : 'text-purple-800'}>
                      {(() => {
                        // Extract numeric value from price string (handles ₹, $, commas)
                        const priceStr = courseData.price.replace(/[₹$,]/g, '');
                        const courseFee = parseInt(priceStr) || 0;
                        
                        // Detect currency symbol from original price
                        const currencySymbol = courseData.price.includes('₹') ? '₹' : courseData.price.includes('$') ? '$' : '₹';
                        
                        // Registration fee is always $50, convert to same currency as course
                        const registrationFeeUSD = 50;
                        let registrationFee = registrationFeeUSD;
                        
                        // Convert $50 to ₹ if course is in Indian Rupees (using approximate rate: 1 USD = 83 INR)
                        if (currencySymbol === '₹') {
                          registrationFee = Math.round(registrationFeeUSD * 83); // Convert $50 to ₹
                        }
                        
                        const total = courseFee + registrationFee;
                        
                        // Format with commas for Indian Rupees, simple format for USD
                        if (currencySymbol === '₹') {
                          return `${currencySymbol}${total.toLocaleString('en-IN')}`;
                        } else {
                          return `${currencySymbol}${total.toLocaleString('en-US')}`;
                        }
                      })()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}