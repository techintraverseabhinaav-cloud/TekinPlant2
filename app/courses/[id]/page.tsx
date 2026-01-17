"use client"

import { useState, useEffect, useLayoutEffect } from "react"
import { use } from "react"
import { Clock, Users, Star, MapPin, Calendar, BookOpen, CheckCircle, Play, Download, Building, Mail, Globe } from "lucide-react"
import Navbar from "../../../src/components/Navbar"
import Link from "next/link"
import { useTheme } from "next-themes"
import { useThemeStyles } from "../../../lib/theme-styles"
import { industryCourses } from "../../../lib/industry-data"

// Helper function to generate syllabus, requirements, and outcomes from course data
function getCourseDetails(course: typeof industryCourses[0]) {
  // Generate syllabus based on course tags and type
  const syllabus = [
    `${course.type} Fundamentals`,
    `${course.company} Technologies Overview`,
    "Hands-on Practical Training",
    "Industry Best Practices",
    "Real-world Project Applications",
    "Quality Standards & Compliance",
    "Safety Protocols & Procedures",
    "Career Development & Placement"
  ]

  // Generate requirements based on course type
  const requirements = [
    course.type.includes("Engineering") || course.type.includes("Technical") 
      ? "Engineering degree or equivalent technical background"
      : "Bachelor's degree or relevant experience",
    "Basic understanding of industrial systems",
    "Strong analytical and problem-solving skills",
    "Willingness to learn and adapt to new technologies"
  ]

  // Generate outcomes
  const outcomes = [
    `Hands-on experience with ${course.company} technologies`,
    "Industry-recognized certification",
    "Practical knowledge applicable to real-world scenarios",
    "Career placement assistance and networking opportunities"
  ]

  return {
    ...course,
    instructor: `${course.company} Technical Team`,
    syllabus,
    requirements,
    outcomes
  }
}

// Convert industryCourses array to object with string keys for easy lookup
const industryCoursesData: Record<string, ReturnType<typeof getCourseDetails>> = {}
industryCourses.forEach(course => {
  industryCoursesData[course.id.toString()] = getCourseDetails(course)
})

export default function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const [activeTab, setActiveTab] = useState("overview")
  const { resolvedTheme } = useTheme()
  const themeStyles = useThemeStyles()
  
  // Read initial theme from data-theme attribute
  const [isDark, setIsDark] = useState(() => {
    if (typeof document !== 'undefined') {
      const dataTheme = document.documentElement.getAttribute('data-theme')
      if (dataTheme === 'dark') {
        return true
      }
      if (dataTheme === 'light') {
        return false
      }
    }
    
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme')
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      let theme
      
      if (savedTheme === 'system' || !savedTheme) {
        theme = prefersDark ? 'dark' : 'light'
      } else {
        theme = savedTheme
      }
      
      if (theme === 'dark') {
        return true
      } else {
        return false
      }
    }
    
    return true
  })
  
  // Update theme when resolvedTheme changes
  useLayoutEffect(() => {
    if (resolvedTheme) {
      setIsDark(resolvedTheme === 'dark')
    }
  }, [resolvedTheme])

  // Get course data - try to find by ID, fallback to first course
  const courseId = resolvedParams.id
  const staticCourseData = industryCoursesData[courseId] || industryCoursesData["1"] || getCourseDetails(industryCourses[0])
  const [courseData, setCourseData] = useState(staticCourseData)
  const [databaseCourseId, setDatabaseCourseId] = useState<string | null>(null)

  // Fetch the actual database UUID for the course by matching title
  useEffect(() => {
    async function fetchDatabaseCourseId() {
      try {
        console.log('🔍 Looking up database course ID for:', staticCourseData.title)
        
        // First, try to find the course in the database by matching title
        const response = await fetch(`/api/courses?search=${encodeURIComponent(staticCourseData.title)}`)
        
        if (response.ok) {
          const courses = await response.json()
          
          if (!Array.isArray(courses) || courses.length === 0) {
            console.warn('⚠️ No courses returned from search for:', staticCourseData.title)
            // Try fetching all courses and searching manually
            const allCoursesResponse = await fetch('/api/courses?limit=100')
            if (allCoursesResponse.ok) {
              const allCourses = await allCoursesResponse.json()
              const matchedCourse = Array.isArray(allCourses)
                ? allCourses.find((c: any) => 
                    c.title === staticCourseData.title || 
                    c.title.toLowerCase().includes(staticCourseData.title.toLowerCase()) ||
                    staticCourseData.title.toLowerCase().includes(c.title.toLowerCase())
                  )
                : null
              
              if (matchedCourse && matchedCourse.id) {
                setDatabaseCourseId(matchedCourse.id)
                console.log('✅ Found database course ID (from all courses):', matchedCourse.id, 'for:', staticCourseData.title)
                return
              }
            }
            console.warn('⚠️ Course not found in database. Enrollment may not work.')
            setDatabaseCourseId(null)
            return
          }
          
          // Find exact match by title first
          let matchedCourse = courses.find((c: any) => c.title === staticCourseData.title)
          
          // If no exact match, try partial match
          if (!matchedCourse) {
            matchedCourse = courses.find((c: any) => 
              c.title.toLowerCase().includes(staticCourseData.title.toLowerCase()) ||
              staticCourseData.title.toLowerCase().includes(c.title.toLowerCase())
            )
          }
          
          if (matchedCourse && matchedCourse.id) {
            // Validate it's a UUID
            const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
            if (uuidRegex.test(matchedCourse.id)) {
              setDatabaseCourseId(matchedCourse.id)
              console.log('✅ Found database course ID:', matchedCourse.id, 'for:', staticCourseData.title)
            } else {
              console.error('❌ Invalid UUID format for course ID:', matchedCourse.id)
              setDatabaseCourseId(null)
            }
          } else {
            console.warn('⚠️ Course not found in database by title:', staticCourseData.title)
            console.warn('⚠️ Search returned courses:', courses?.slice(0, 3)?.map((c: any) => ({ id: c.id, title: c.title })))
            setDatabaseCourseId(null)
          }
        } else {
          const errorData = await response.json().catch(() => ({}))
          console.error('❌ Failed to search courses:', errorData)
          setDatabaseCourseId(null)
        }
      } catch (error) {
        console.error('❌ Error fetching database course ID:', error)
        setDatabaseCourseId(null)
      }
    }
    fetchDatabaseCourseId()
  }, [staticCourseData.title, courseId])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains('slide-up')) {
            entry.target.classList.add('slide-up-visible')
          }
        }
      })
    }, { threshold: 0.1 })
    
    const elements = document.querySelectorAll('.slide-up')
    elements.forEach(el => observer.observe(el))
    
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: themeStyles.pageBg }}>
      <Navbar />
      
      {/* Course Header */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-[1px]" style={{ background: isDark ? 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 50%, #000000 100%)' : 'linear-gradient(180deg, #ffffff 0%, #f9fafb 50%, #ffffff 100%)' }}></div>
        <div className="slide-up relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <h1 className="slide-up text-4xl lg:text-5xl font-normal mb-6" style={{ transitionDelay: '0.1s' }}>
                  <span style={{ color: themeStyles.textPrimary, textShadow: isDark ? '0 0 20px rgba(255,255,255,0.3)' : 'none' }}>{courseData.title}</span>
                </h1>
                <div className="slide-up flex flex-wrap items-center gap-6 mb-6" style={{ transitionDelay: '0.2s' }}>
                  <span className="flex items-center" style={{ color: themeStyles.textSecondary }}>
                    <Building size={20} className="mr-2" style={{ color: isDark ? '#c084fc' : '#5b21b6' }} />
                    {courseData.company}
                  </span>
                  <span className="flex items-center" style={{ color: themeStyles.textSecondary }}>
                    <MapPin size={20} className="mr-2" style={{ color: isDark ? '#c084fc' : '#5b21b6' }} />
                    {courseData.location}
                  </span>
                </div>
                <p className="slide-up text-xl leading-relaxed" style={{ transitionDelay: '0.3s', color: themeStyles.textSecondary }}>
                  {courseData.description}
                </p>
              </div>

              {/* Course Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="slide-up rounded-xl p-4 text-center backdrop-blur-xl border transition-all duration-300" style={{ backgroundColor: themeStyles.cardBg, borderColor: isDark ? 'rgba(168,85,247,0.25)' : 'rgba(91,33,182,0.3)', transitionDelay: '0.4s' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = isDark ? '0 0 15px rgba(196,181,253,0.4), 0 0 30px rgba(196,181,253,0.2)' : '0 0 15px rgba(91,33,182,0.3), 0 0 30px rgba(91,33,182,0.15)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}>
                  <div className={`text-2xl font-bold bg-clip-text text-transparent ${isDark ? 'bg-gradient-to-r from-purple-300 to-purple-400' : 'bg-gradient-to-r from-purple-800 to-purple-700'}`}>{courseData.duration}</div>
                  <div className="text-sm mt-1" style={{ color: themeStyles.textSecondary }}>Duration</div>
                </div>
                <div className="slide-up rounded-xl p-4 text-center backdrop-blur-xl border transition-all duration-300" style={{ backgroundColor: themeStyles.cardBg, borderColor: isDark ? 'rgba(168,85,247,0.25)' : 'rgba(91,33,182,0.3)', transitionDelay: '0.5s' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = isDark ? '0 0 15px rgba(196,181,253,0.4), 0 0 30px rgba(196,181,253,0.2)' : '0 0 15px rgba(91,33,182,0.3), 0 0 30px rgba(91,33,182,0.15)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}>
                  <div className={`text-2xl font-bold bg-clip-text text-transparent ${isDark ? 'bg-gradient-to-r from-purple-300 to-purple-400' : 'bg-gradient-to-r from-purple-800 to-purple-700'}`}>{courseData.students}</div>
                  <div className="text-sm mt-1" style={{ color: themeStyles.textSecondary }}>Students</div>
                </div>
                <div className="slide-up rounded-xl p-4 text-center backdrop-blur-xl border transition-all duration-300" style={{ backgroundColor: themeStyles.cardBg, borderColor: isDark ? 'rgba(168,85,247,0.25)' : 'rgba(91,33,182,0.3)', transitionDelay: '0.6s' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = isDark ? '0 0 15px rgba(196,181,253,0.4), 0 0 30px rgba(196,181,253,0.2)' : '0 0 15px rgba(91,33,182,0.3), 0 0 30px rgba(91,33,182,0.15)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}>
                  <div className={`text-2xl font-bold bg-clip-text text-transparent ${isDark ? 'bg-gradient-to-r from-purple-300 to-purple-400' : 'bg-gradient-to-r from-purple-800 to-purple-700'}`}>{courseData.rating}</div>
                  <div className="text-sm mt-1" style={{ color: themeStyles.textSecondary }}>Rating</div>
                </div>
                <div className="slide-up rounded-xl p-4 text-center backdrop-blur-xl border transition-all duration-300" style={{ backgroundColor: themeStyles.cardBg, borderColor: isDark ? 'rgba(168,85,247,0.25)' : 'rgba(91,33,182,0.3)', transitionDelay: '0.7s' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = isDark ? '0 0 15px rgba(196,181,253,0.4), 0 0 30px rgba(196,181,253,0.2)' : '0 0 15px rgba(91,33,182,0.3), 0 0 30px rgba(91,33,182,0.15)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}>
                  <div className={`text-2xl font-bold bg-clip-text text-transparent ${isDark ? 'bg-gradient-to-r from-purple-300 to-purple-400' : 'bg-gradient-to-r from-purple-800 to-purple-700'}`}>{courseData.price}</div>
                  <div className="text-sm mt-1" style={{ color: themeStyles.textSecondary }}>Price</div>
                </div>
              </div>

              {/* Tabs */}
              <div className="slide-up rounded-2xl p-6 backdrop-blur-xl border transition-all duration-300" style={{ backgroundColor: themeStyles.cardBg, borderColor: isDark ? 'rgba(168,85,247,0.25)' : 'rgba(91,33,182,0.3)', transitionDelay: '0.8s' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = isDark ? '0 0 20px rgba(196,181,253,0.5), 0 0 40px rgba(196,181,253,0.3)' : '0 0 20px rgba(91,33,182,0.4), 0 0 40px rgba(91,33,182,0.2)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}>
                <div className="flex flex-wrap gap-4 mb-6 border-b" style={{ borderColor: isDark ? 'rgba(168,85,247,0.2)' : 'rgba(91,33,182,0.2)' }}>
                  {[
                    { id: "overview", label: "Overview", icon: BookOpen },
                    { id: "syllabus", label: "Syllabus", icon: CheckCircle },
                    { id: "requirements", label: "Requirements", icon: CheckCircle },
                    { id: "outcomes", label: "Learning Outcomes", icon: CheckCircle }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 pb-4 px-2 border-b-2 transition-all duration-300 ${
                        activeTab === tab.id
                          ? "border-purple-400"
                          : "border-transparent"
                      }`}
                      style={activeTab === tab.id ? { borderColor: isDark ? '#c084fc' : '#5b21b6', color: themeStyles.textPrimary } : { color: themeStyles.textSecondary }}
                    >
                      <tab.icon size={20} style={{ color: activeTab === tab.id ? (isDark ? '#c084fc' : '#5b21b6') : themeStyles.textSecondary }} />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="min-h-[400px]">
                  {activeTab === "overview" && (
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-xl font-semibold mb-4" style={{ color: themeStyles.textPrimary }}>About This Program</h3>
                        <p className="leading-relaxed" style={{ color: themeStyles.textSecondary }}>
                          {courseData.description}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-4" style={{ color: themeStyles.textPrimary }}>Instructor</h3>
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-bold backdrop-blur-sm border" style={{ backgroundColor: themeStyles.cardBg, borderColor: isDark ? 'rgba(168,85,247,0.25)' : 'rgba(91,33,182,0.3)', color: isDark ? '#c084fc' : '#5b21b6' }}>
                            {courseData.instructor.split(' ').map((n: string) => n[0]).join('')}
                          </div>
                          <div>
                            <div className="font-semibold" style={{ color: themeStyles.textPrimary }}>{courseData.instructor}</div>
                            <div style={{ color: themeStyles.textSecondary }}>{courseData.company}</div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-4" style={{ color: themeStyles.textPrimary }}>Contact Information</h3>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2" style={{ color: themeStyles.textSecondary }}>
                            <Mail size={16} style={{ color: isDark ? '#c084fc' : '#5b21b6' }} />
                            <span>{courseData.contact}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Globe size={16} style={{ color: isDark ? '#c084fc' : '#5b21b6' }} />
                            <a href={courseData.website} target="_blank" rel="noopener noreferrer" className="transition-colors hover:opacity-80" style={{ color: isDark ? '#c084fc' : '#5b21b6' }}>
                              {courseData.website}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "syllabus" && (
                    <div>
                      <h3 className="text-xl font-semibold mb-6" style={{ color: themeStyles.textPrimary }}>Course Syllabus</h3>
                      <div className="space-y-4">
                        {courseData.syllabus.map((item: string, index: number) => (
                          <div key={index} className="flex items-start space-x-3">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold backdrop-blur-sm border flex-shrink-0" style={{ backgroundColor: themeStyles.cardBg, borderColor: isDark ? 'rgba(168,85,247,0.25)' : 'rgba(91,33,182,0.3)', color: isDark ? '#c084fc' : '#5b21b6' }}>
                              {index + 1}
                            </div>
                            <span className="leading-relaxed" style={{ color: themeStyles.textSecondary }}>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === "requirements" && (
                    <div>
                      <h3 className="text-xl font-semibold mb-6" style={{ color: themeStyles.textPrimary }}>Prerequisites & Requirements</h3>
                      <div className="space-y-4">
                        {courseData.requirements.map((item: string, index: number) => (
                          <div key={index} className="flex items-start space-x-3">
                            <CheckCircle size={20} className="mt-0.5 flex-shrink-0" style={{ color: '#10b981' }} />
                            <span className="leading-relaxed" style={{ color: themeStyles.textSecondary }}>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === "outcomes" && (
                    <div>
                      <h3 className="text-xl font-semibold mb-6" style={{ color: themeStyles.textPrimary }}>What You'll Learn</h3>
                      <div className="space-y-4">
                        {courseData.outcomes.map((item: string, index: number) => (
                          <div key={index} className="flex items-start space-x-3">
                            <CheckCircle size={20} className="mt-0.5 flex-shrink-0" style={{ color: '#10b981' }} />
                            <span className="leading-relaxed" style={{ color: themeStyles.textSecondary }}>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="slide-up rounded-2xl p-6 backdrop-blur-xl border sticky top-24 transition-all duration-300" style={{ backgroundColor: themeStyles.cardBg, borderColor: isDark ? 'rgba(168,85,247,0.25)' : 'rgba(91,33,182,0.3)', transitionDelay: '0.9s' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = isDark ? '0 0 20px rgba(196,181,253,0.5), 0 0 40px rgba(196,181,253,0.3)' : '0 0 20px rgba(91,33,182,0.4), 0 0 40px rgba(91,33,182,0.2)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}>
                <div className="aspect-video rounded-xl overflow-hidden mb-6 border" style={{ borderColor: isDark ? 'rgba(168,85,247,0.25)' : 'rgba(91,33,182,0.3)' }}>
                  <img
                    src={courseData.image}
                    alt={courseData.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className={`text-3xl font-bold mb-6 bg-clip-text text-transparent ${isDark ? 'bg-gradient-to-r from-purple-300 to-purple-400' : 'bg-gradient-to-r from-purple-800 to-purple-700'}`}>
                  {courseData.price}
                </div>

                {databaseCourseId ? (
                  <Link
                    href={`/enroll/${databaseCourseId}`}
                    className="w-full px-4 py-2 rounded-xl font-semibold transition-all duration-300 hover:opacity-90 backdrop-blur-sm border mb-6 block text-center text-sm"
                    style={{ 
                      background: themeStyles.buttonGradient, 
                      color: '#ffffff', 
                      borderColor: isDark ? 'rgba(168,85,247,0.4)' : 'rgba(91,33,182,0.4)',
                      boxShadow: themeStyles.buttonShadow
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.boxShadow = themeStyles.buttonShadowHover}
                    onMouseLeave={(e) => e.currentTarget.style.boxShadow = themeStyles.buttonShadow}
                  >
                    Enroll Now
                  </Link>
                ) : (
                  <div 
                    className="w-full px-4 py-2 rounded-xl font-semibold mb-6 block text-center text-sm cursor-not-allowed opacity-50"
                    style={{ 
                      background: isDark ? 'rgba(75,85,99,0.5)' : 'rgba(156,163,175,0.5)', 
                      color: isDark ? '#9ca3af' : '#6b7280', 
                      borderColor: isDark ? 'rgba(75,85,99,0.3)' : 'rgba(156,163,175,0.3)',
                    }}
                  >
                    Loading course...
                  </div>
                )}

                <div className="space-y-4 text-sm pt-4 border-t" style={{ borderColor: isDark ? 'rgba(168,85,247,0.2)' : 'rgba(91,33,182,0.2)' }}>
                  <div className="flex items-center justify-between">
                    <span style={{ color: themeStyles.textSecondary }}>Duration:</span>
                    <span style={{ color: themeStyles.textPrimary }}>{courseData.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span style={{ color: themeStyles.textSecondary }}>Students:</span>
                    <span style={{ color: themeStyles.textPrimary }}>{courseData.students}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span style={{ color: themeStyles.textSecondary }}>Rating:</span>
                    <span className="flex items-center" style={{ color: themeStyles.textPrimary }}>
                      <Star size={16} className="mr-1" style={{ color: '#fbbf24' }} />
                      {courseData.rating}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span style={{ color: themeStyles.textSecondary }}>Type:</span>
                    <span style={{ color: themeStyles.textPrimary }}>{courseData.type}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
