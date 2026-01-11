"use client"

import { useState, useEffect, useLayoutEffect, Suspense, useMemo } from "react"
import { Search, Clock, Users, Star, MapPin, Building, Filter, ArrowRight, ChevronDown } from "lucide-react"
import Navbar from "../../src/components/Navbar"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import { industryStats } from "../../lib/industry-data"
import { useTheme } from "next-themes"
import { useThemeStyles } from "../../lib/theme-styles"

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
}

function CoursesContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [category, setCategory] = useState("All Categories")
  const [location, setLocation] = useState("All Locations")
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()
  const router = useRouter()
  const { isSignedIn } = useUser()
  const { resolvedTheme } = useTheme()
  const themeStyles = useThemeStyles()
  
  // Read initial theme from data-theme attribute (set by theme script before React)
  // Returns: true for dark mode (purple), false for light mode (amber)
  // The key is to read from data-theme which is set synchronously in <head> before React
  const [isDark, setIsDark] = useState(() => {
    // Client-side: Read from data-theme first (set by theme script before React hydrates)
    // The theme script runs synchronously in <head>, so data-theme should be available
    // when React hydrates on the client
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      const dataTheme = document.documentElement.getAttribute('data-theme')
      if (dataTheme === 'dark') {
        return true // Current theme is dark - match it
      }
      if (dataTheme === 'light') {
        return false // Current theme is light - match it
      }
      
      // Fallback to localStorage if data-theme not set yet (shouldn't happen, but safety)
      const savedTheme = localStorage.getItem('theme')
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      let theme
      
      if (savedTheme === 'system' || !savedTheme) {
        theme = prefersDark ? 'dark' : 'light'
      } else {
        theme = savedTheme // 'dark' or 'light'
      }
      
      // Return based on determined theme
      // This matches what the theme script would set in data-theme
      return theme === 'dark'
    }
    
    // SSR fallback: During server-side rendering, document and window are not available
    // We can't know the user's theme preference during SSR
    // However, the theme script runs in <head> before React, so by the time React hydrates,
    // data-theme should be set. The useState initializer runs during hydration, so it should
    // be able to read data-theme. If not, we default to false (light mode) and useLayoutEffect
    // will correct it immediately (runs synchronously before paint, so no visible flash)
    return false
  })
  
  // Update theme immediately when component mounts (runs synchronously before paint)
  // This ensures the theme matches the current theme set by the theme script
  // and prevents leak of wrong theme colors
  useLayoutEffect(() => {
    // Read from data-theme first (set by theme script before React hydrates)
    // This is the most reliable source since it's set synchronously in <head>
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      const dataTheme = document.documentElement.getAttribute('data-theme')
      if (dataTheme === 'dark') {
        setIsDark(true) // Current theme is dark - match it
        return
      }
      if (dataTheme === 'light') {
        setIsDark(false) // Current theme is light - match it
        return
      }
    }
    
    // Fallback to resolvedTheme from next-themes
    if (resolvedTheme) {
      setIsDark(resolvedTheme === 'dark')
    } else if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      // Final fallback: check className
      const htmlClass = document.documentElement.className
      setIsDark(!(htmlClass === 'light'))
    }
  }, [resolvedTheme])
  
  // Update when resolvedTheme changes (user manually switches theme)
  useEffect(() => {
    if (resolvedTheme) {
      setIsDark(resolvedTheme === 'dark')
    }
  }, [resolvedTheme])

  // Theme-dependent color variables: purple for dark mode, amber/golden for light mode
  // All colors are set using if-else to ensure proper theme separation
  let themeColors: {
    badgeBg: string
    badgeBorder: string
    iconColor: string
    textColor: string
    gradientClass: string
    statBorder: string
    statBg: string
    hoverShadow: string
    searchBg: string
    searchBorder: string
    inputBg: string
    inputBorder: string
    inputText: string
    inputPlaceholder: string
    inputFocusRing: string
    chevronColor: string
    optionBg: string
    optionText: string
  }
  
  if (isDark) {
    // Dark mode - purple colors only
    themeColors = {
      badgeBg: 'rgba(0,0,0,0.4)',
      badgeBorder: 'rgba(168,85,247,0.2)',
      iconColor: '#a855f7',
      textColor: 'text-white/70',
      gradientClass: 'bg-gradient-to-r from-purple-300 via-purple-200 to-purple-300',
      statBorder: 'rgba(168,85,247,0.25)',
      statBg: 'rgba(0,0,0,0.3)',
      hoverShadow: '0 12px 24px rgba(0,0,0,0.4), 0 0 20px rgba(196,181,253,0.2)',
      searchBg: 'rgba(0,0,0,0.3)',
      searchBorder: 'rgba(168,85,247,0.2)',
      inputBg: 'rgba(0,0,0,0.4)',
      inputBorder: 'rgba(168,85,247,0.2)',
      inputText: 'text-white',
      inputPlaceholder: 'placeholder-white/30',
      inputFocusRing: 'focus:ring-purple-500/50',
      chevronColor: '#c084fc',
      optionBg: '#0a0a0a',
      optionText: '#ffffff'
    }
  } else {
    // Light mode - amber/golden colors only
    themeColors = {
      badgeBg: 'rgba(255,255,255,0.7)',
      badgeBorder: 'rgba(139,90,43,0.25)',
      iconColor: '#8b6f47',
      textColor: 'text-gray-800/80',
      gradientClass: 'bg-gradient-to-r from-purple-700 via-purple-600 to-purple-700',
      statBorder: 'rgba(139,90,43,0.3)',
      statBg: 'rgba(255,255,255,0.7)',
      hoverShadow: '0 12px 24px rgba(58,46,31,0.2), 0 0 20px rgba(139,90,43,0.25)',
      searchBg: 'rgba(255,255,255,0.8)',
      searchBorder: 'rgba(139,90,43,0.3)',
      inputBg: 'rgba(255,255,255,0.9)',
      inputBorder: 'rgba(139,90,43,0.3)',
      inputText: 'text-gray-900',
      inputPlaceholder: 'placeholder-gray-600/50',
      inputFocusRing: 'focus:ring-purple-700/50',
      chevronColor: '#8b6f47',
      optionBg: '#ffffff',
      optionText: '#3a2e1f'
    }
  }

  // Fetch courses from API
  useEffect(() => {
    async function fetchCourses() {
      try {
        setLoading(true)
        const response = await fetch(`/api/courses?search=${searchTerm}&type=${category}&location=${location}`)
        if (response.ok) {
          const data = await response.json()
          setCourses(data || [])
        } else {
          console.error('Failed to fetch courses')
          setCourses([])
        }
      } catch (error) {
        console.error('Error fetching courses:', error)
        setCourses([])
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
  }, [searchTerm, category, location])

  // Get unique categories and locations for filters from fetched courses
  const categories = useMemo(() => ["All Categories", ...new Set(courses.map(course => course.type))], [courses])
  const locations = useMemo(() => ["All Locations", ...new Set(courses.map(course => course.location?.split(',')[0] || course.location))], [courses])

  // Handle search parameter from URL
  useEffect(() => {
    const searchFromUrl = searchParams?.get('search')
    if (searchFromUrl) {
      setSearchTerm(searchFromUrl)
    }
  }, [searchParams])

  // Filter courses based on search and filters - optimized with useMemo
  const filteredCourses = useMemo(() => {
    const searchLower = searchTerm.toLowerCase()
    return courses.filter((course) => {
      const matchesSearch = !searchLower || 
        course.title.toLowerCase().includes(searchLower) ||
        course.company_name.toLowerCase().includes(searchLower) ||
        course.description.toLowerCase().includes(searchLower) ||
        (course.tags && course.tags.some(tag => tag.toLowerCase().includes(searchLower)))
      const matchesCategory = category === "All Categories" || course.type === category
      const matchesLocation = location === "All Locations" || (course.location && course.location.includes(location))
      
      return matchesSearch && matchesCategory && matchesLocation
    })
  }, [courses, searchTerm, category, location])

  return (
    <div className="min-h-screen relative" suppressHydrationWarning style={{ 
      backgroundColor: themeStyles.pageBg,
      paddingTop: 0,
      marginTop: 0,
      border: 'none',
      borderTop: 'none'
    }}>
      <Navbar />
      
      {/* Header */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-[1px]" style={{ background: themeStyles.pageBgGradient }}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm border" suppressHydrationWarning style={{ 
              backgroundColor: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.7)',
              borderColor: isDark ? 'rgba(168,85,247,0.2)' : 'rgba(139,90,43,0.25)'
            }}>
              <Building className="w-3.5 h-3.5" suppressHydrationWarning style={{ color: isDark ? '#a855f7' : '#8b6f47' }} />
              <span suppressHydrationWarning style={{ 
                color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(26, 15, 0, 0.8)'
              }} className="text-xs font-medium tracking-wide uppercase">Industry Training Programs</span>
            </div>
            {(() => {
              // Theme-dependent heading colors: white/purple for dark mode, black/golden for light mode
              let industryColor, trainingGradient
              if (isDark) {
                // Dark mode - Industry in white, Training Programs in purple
                industryColor = '#ffffff'
                trainingGradient = 'bg-gradient-to-r from-purple-300 via-purple-200 to-purple-300'
              } else {
                // Light mode - Industry in black, Training Programs in purple
                industryColor = '#1a0f00'
                trainingGradient = 'bg-gradient-to-r from-purple-700 via-purple-600 to-purple-700'
              }
              return (
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light mb-6 leading-tight tracking-tight" suppressHydrationWarning>
                  <span suppressHydrationWarning style={{ color: industryColor }}>Industry</span> <span className={`bg-clip-text text-transparent ${trainingGradient}`} suppressHydrationWarning>Training Programs</span>
                </h1>
              )
            })()}
            <p className="text-lg sm:text-xl max-w-3xl mx-auto mb-16 font-light leading-relaxed" suppressHydrationWarning style={{ 
              color: isDark ? '#ffffff' : '#1a0f00',
              opacity: isDark ? 0.9 : 0.9
            }}>
              Discover comprehensive training programs designed by industry experts to accelerate your career growth
            </p>

            {/* Statistics */}
            <div className="grid md:grid-cols-4 gap-6 lg:gap-8 mb-16">
              {[
                { icon: "/Icons/building.png", value: industryStats.totalCourses, label: "Training Programs" },
                { icon: "/Icons/growth.png", value: industryStats.totalPartners, label: "Partner Companies" },
                { icon: "/Icons/students.png", value: industryStats.totalStudents, label: "Students Trained" },
                { icon: "/Icons/rating.png", value: industryStats.averageRating, label: "Average Rating" },
              ].map((stat, index) => {
                const bg = isDark
                  ? 'rgba(124,58,237,0.10)'
                  : 'transparent'

                const border = isDark
                  ? 'rgba(124,58,237,0.25)'
                  : 'rgba(124,58,237,0.25)'

                const textColor = isDark ? 'text-white/70' : 'text-black'
                const valueGradient = isDark
                  ? 'bg-gradient-to-r from-purple-600 to-purple-500'
                  : 'bg-gradient-to-r from-purple-700 to-purple-600'
                
                return (
                <div 
                  key={index} 
                  className="flash-card-container"
                  suppressHydrationWarning
                >
                  <div
                    className="flash-card-inner"
                  >
                    {/* Front of card - Icon only */}
                    <div
                      className="flash-card-face flash-card-front rounded-2xl"
                      suppressHydrationWarning
                      style={{
                        padding: '2rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: bg,
                        border: `1px solid ${border}`,
                        boxShadow: isDark
                          ? '0 8px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.05)'
                          : '0 8px 24px rgba(30,41,59,0.15), inset 0 1px 0 rgba(255,255,255,0.1)',
                      }}
                    >
                      <div 
                        className="w-16 h-16 flex items-center justify-center overflow-hidden"
                        style={{
                          backgroundColor: isDark ? 'rgba(0,0,0,0.01)' : 'rgba(255,255,255,0.01)',
                        }}
                      >
                        <img 
                          src={stat.icon} 
                          alt={stat.label} 
                          className="w-full h-full object-contain" 
                          suppressHydrationWarning
                          style={{
                            mixBlendMode: isDark ? 'screen' : 'multiply',
                            transform: 'scale(1.8)',
                          }}
                        />
                      </div>
                    </div>

                    {/* Back of card - Stats */}
                    <div
                      className="flash-card-face flash-card-back rounded-2xl"
                      suppressHydrationWarning
                      style={{
                        padding: '2rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: isDark ? 'rgba(124,58,237,0.10)' : 'transparent',
                        border: `1px solid ${border}`,
                        boxShadow: isDark
                          ? '0 16px 40px rgba(0,0,0,0.35), 0 0 30px rgba(124,58,237,0.35)'
                          : '0 16px 40px rgba(30,41,59,0.25), 0 0 30px rgba(124,58,237,0.25)',
                      }}
                    >
                      {/* Value */}
                      <div
                        className={`text-3xl sm:text-4xl font-semibold text-center mb-3 bg-clip-text text-transparent ${valueGradient}`}
                        suppressHydrationWarning
                      >
                        {stat.value}
                      </div>

                      {/* Label */}
                      <p
                        className={`text-sm sm:text-base text-center font-light ${textColor}`}
                        suppressHydrationWarning
                        style={{ lineHeight: '1.6' }}
                      >
                        {stat.label}
                      </p>
                    </div>
                  </div>
                </div>
                )
              })}
            </div>

            {/* Search and Filters */}
            <div className="rounded-2xl p-8 mb-4 backdrop-blur-xl border" suppressHydrationWarning style={{ 
              backgroundColor: themeColors.searchBg,
              borderColor: themeColors.searchBorder
            }}>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-5 top-1/2 transform -translate-y-1/2" size={18} suppressHydrationWarning style={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(139,90,43,0.5)' }} />
                    <input
                      type="text"
                      placeholder="Search courses, companies, or skills..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      suppressHydrationWarning
                      className={`w-full pl-14 pr-6 py-3.5 rounded-xl backdrop-blur-sm border transition-all duration-300 focus:outline-none focus:ring-2 font-light ${isDark ? 'placeholder-white/30 focus:ring-purple-500/50' : 'placeholder-gray-600/50 focus:ring-purple-700/50'}`}
                      style={{ 
                        backgroundColor: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.9)', 
                        borderColor: isDark ? 'rgba(168,85,247,0.2)' : 'rgba(139,90,43,0.3)',
                        color: isDark ? '#ffffff' : '#1a0f00'
                      }}
                    />
                  </div>
                </div>
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    suppressHydrationWarning
                    className="w-full px-5 py-3.5 pr-10 rounded-xl focus:outline-none transition-all duration-300 backdrop-blur-xl border appearance-none cursor-pointer font-light"
                    style={{ 
                      backgroundColor: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.9)',
                      borderColor: isDark ? 'rgba(168,85,247,0.2)' : 'rgba(139,90,43,0.3)',
                      color: isDark ? '#ffffff' : '#1a0f00'
                    }}
                    onMouseEnter={(e) => {
                      if (isDark) {
                        e.currentTarget.style.borderColor = 'rgba(168,85,247,0.4)'
                      } else {
                        e.currentTarget.style.borderColor = 'rgba(139,90,43,0.5)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.2)' : 'rgba(139,90,43,0.3)'
                    }}
                    onFocus={(e) => {
                      if (isDark) {
                        e.currentTarget.style.borderColor = 'rgba(168,85,247,0.6)'
                        e.currentTarget.style.boxShadow = '0 0 0 2px rgba(168,85,247,0.2)'
                      } else {
                        e.currentTarget.style.borderColor = 'rgba(139,90,43,0.6)'
                        e.currentTarget.style.boxShadow = '0 0 0 2px rgba(139,90,43,0.2)'
                      }
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.2)' : 'rgba(139,90,43,0.3)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat} suppressHydrationWarning style={{ 
                        backgroundColor: isDark ? '#0a0a0a' : '#ffffff', 
                        color: isDark ? '#ffffff' : '#3a2e1f'
                      }}>{cat}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <ChevronDown className="w-4 h-4" suppressHydrationWarning style={{ color: isDark ? '#c084fc' : '#8b6f47' }} />
                  </div>
                </div>
                <div className="relative">
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    suppressHydrationWarning
                    className="w-full px-5 py-3.5 pr-10 rounded-xl focus:outline-none transition-all duration-300 backdrop-blur-xl border appearance-none cursor-pointer font-light"
                    style={{ 
                      backgroundColor: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.9)',
                      borderColor: isDark ? 'rgba(168,85,247,0.2)' : 'rgba(139,90,43,0.3)',
                      color: isDark ? '#ffffff' : '#1a0f00'
                    }}
                    onMouseEnter={(e) => {
                      if (isDark) {
                        e.currentTarget.style.borderColor = 'rgba(168,85,247,0.4)'
                      } else {
                        e.currentTarget.style.borderColor = 'rgba(139,90,43,0.5)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.2)' : 'rgba(139,90,43,0.3)'
                    }}
                    onFocus={(e) => {
                      if (isDark) {
                        e.currentTarget.style.borderColor = 'rgba(168,85,247,0.6)'
                        e.currentTarget.style.boxShadow = '0 0 0 2px rgba(168,85,247,0.2)'
                      } else {
                        e.currentTarget.style.borderColor = 'rgba(139,90,43,0.6)'
                        e.currentTarget.style.boxShadow = '0 0 0 2px rgba(139,90,43,0.2)'
                      }
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.2)' : 'rgba(139,90,43,0.3)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    {locations.map((loc) => (
                      <option key={loc} value={loc} suppressHydrationWarning style={{ 
                        backgroundColor: isDark ? '#0a0a0a' : '#ffffff', 
                        color: isDark ? '#ffffff' : '#3a2e1f'
                      }}>{loc}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <ChevronDown className="w-4 h-4" suppressHydrationWarning style={{ color: isDark ? '#c084fc' : '#8b6f47' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-2">
              <p className="text-sm font-light" suppressHydrationWarning style={{ 
                color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(26, 15, 0, 0.6)'
              }}>
                {searchTerm && (
                  <span suppressHydrationWarning style={{ color: isDark ? '#c084fc' : '#8b6f47' }}>
                    Search results for "{searchTerm}":{" "}
                  </span>
                )}
                Showing <span suppressHydrationWarning style={{ color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(26, 15, 0, 0.7)' }}>{filteredCourses.length}</span> of <span suppressHydrationWarning style={{ color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(26, 15, 0, 0.7)' }}>{loading ? 0 : courses.length}</span> training programs
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="pt-2 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-[1px]" style={{ background: themeStyles.pageBgGradient }}></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          {loading ? (
            <div className="text-center py-24">
              {(() => {
                // Loading spinner: purple for dark mode, amber for light mode
                let spinnerBorder, loadingTextColor
                if (isDark) {
                  // Dark mode - purple colors only
                  spinnerBorder = 'border-purple-500'
                  loadingTextColor = 'text-white/50'
                } else {
                  // Light mode - amber colors only
                  spinnerBorder = 'border-amber-700'
                  loadingTextColor = 'text-gray-800/70'
                }
                return (
                  <>
                    <div className={`animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4 ${spinnerBorder}`} suppressHydrationWarning></div>
                    <p className={`font-light ${loadingTextColor}`} suppressHydrationWarning>Loading courses...</p>
                  </>
                )
              })()}
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="text-center py-24">
              {(() => {
                // Empty state: purple for dark mode, amber for light mode
                let emptyBg, emptyBorder, emptyIconColor, emptyTitleColor, emptyTextColor
                if (isDark) {
                  // Dark mode - purple colors only
                  emptyBg = 'rgba(0,0,0,0.3)'
                  emptyBorder = 'rgba(168,85,247,0.2)'
                  emptyIconColor = 'text-white/40'
                  emptyTitleColor = 'text-white'
                  emptyTextColor = 'text-white/50'
                } else {
                  // Light mode - amber colors only
                  emptyBg = 'rgba(255,255,255,0.7)'
                  emptyBorder = 'rgba(139,90,43,0.3)'
                  emptyIconColor = 'text-gray-600/50'
                  emptyTitleColor = 'text-gray-900'
                  emptyTextColor = 'text-gray-800/70'
                }
                return (
                  <>
                    <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 backdrop-blur-sm border" suppressHydrationWarning style={{ 
                      backgroundColor: emptyBg,
                      borderColor: emptyBorder
                    }}>
                      <Search className={`w-10 h-10 ${emptyIconColor}`} />
                    </div>
                    <h3 className={`text-2xl font-light mb-4 ${emptyTitleColor}`} suppressHydrationWarning>
                      {searchTerm ? `No courses found for "${searchTerm}"` : "No courses found"}
                    </h3>
                    <p className={`mb-10 font-light ${emptyTextColor}`} suppressHydrationWarning>
                      {searchTerm 
                        ? "Try adjusting your search terms or browse all courses" 
                        : "Try adjusting your search criteria or filters"
                      }
                    </p>
                  </>
                )
              })()}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    setSearchTerm("")
                    setCategory("All Categories")
                    setLocation("All Locations")
                  }}
                  className="px-6 py-3 rounded-xl transition-all duration-300 backdrop-blur-sm border font-medium"
                  style={{ 
                    background: themeStyles.buttonGradient, 
                    color: '#ffffff',
                    borderColor: isDark ? 'rgba(168,85,247,0.4)' : 'rgba(139,90,43,0.4)',
                    boxShadow: themeStyles.buttonShadow
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = themeStyles.buttonShadowHover
                    e.currentTarget.style.transform = 'scale(1.02)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = themeStyles.buttonShadow
                    e.currentTarget.style.transform = 'scale(1)'
                  }}
                >
                  Clear Filters
                </button>
                {searchTerm && (
                  <Link 
                    href="/courses" 
                    className={`px-6 py-3 rounded-xl transition-all duration-300 backdrop-blur-sm border font-medium ${
                      isDark ? 'hover:border-purple-400/40' : 'hover:border-amber-800/50'
                    }`}
                    style={{ 
                      backgroundColor: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.7)', 
                      borderColor: isDark ? 'rgba(168,85,247,0.2)' : 'rgba(139,90,43,0.3)',
                      color: themeStyles.textPrimary
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = isDark ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.9)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = isDark ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.7)'
                    }}
                  >
                    View All Courses
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course, index) => {
                const cardBg = isDark ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.8)'
                const cardBorder = isDark ? 'rgba(168,85,247,0.2)' : 'rgba(139,90,43,0.3)'
                const hoverShadow = isDark
                  ? '0 12px 24px rgba(0,0,0,0.4), 0 0 20px rgba(196,181,253,0.2)'
                  : '0 12px 24px rgba(58,46,31,0.2), 0 0 20px rgba(139,90,43,0.25)'
                
                return (
                <div 
                  key={course.id} 
                  className="group border rounded-2xl overflow-hidden transition-all duration-500 flex flex-col h-full" 
                  style={{ backgroundColor: cardBg, borderColor: cardBorder }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)'
                    e.currentTarget.style.boxShadow = hoverShadow
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <div className="aspect-video rounded-t-2xl overflow-hidden relative bg-black/20">
                    <img
                      src={course.image_url || "/placeholder.svg"}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm border flex items-center gap-1.5" style={{ 
                        backgroundColor: isDark ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.9)',
                        borderColor: isDark ? 'rgba(168,85,247,0.2)' : 'rgba(139,90,43,0.3)',
                        color: isDark ? '#8b5cf6' : '#7c3aed'
                      }}>
                        <Star className="w-3 h-3 fill-current" /> {course.rating}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm border" style={{ 
                        background: themeStyles.buttonGradient, 
                        color: '#ffffff',
                        borderColor: isDark ? 'rgba(168,85,247,0.4)' : 'rgba(139,90,43,0.4)',
                        boxShadow: themeStyles.buttonShadow
                      }}>
                        {course.type}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-4 flex flex-col flex-grow">
                    <h3 className="text-xl font-light leading-tight line-clamp-2" suppressHydrationWarning style={{ 
                      color: isDark ? '#ffffff' : '#1a0f00'
                    }}>
                      {course.title}
                    </h3>
                    
                    <p className="text-sm line-clamp-2 leading-relaxed font-light flex-grow" suppressHydrationWarning style={{ 
                      color: isDark ? 'rgba(255,255,255,0.9)' : 'rgba(26, 15, 0, 0.85)'
                    }}>
                      {course.description}
                    </p>

                    <div className="flex items-center gap-4 text-xs pt-3 border-t" suppressHydrationWarning style={{ 
                      color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(26, 15, 0, 0.6)',
                      borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(139,90,43,0.1)'
                    }}>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5" />
                        <span>{course.student_count}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{course.location.split(',')[0]}</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => isSignedIn ? router.push(`/courses/${course.id}`) : router.push('/login')} 
                      className="w-full text-sm px-4 py-2.5 rounded-xl backdrop-blur-sm border transition-all duration-300 font-medium mt-auto" 
                      style={{ 
                        background: themeStyles.buttonGradient, 
                        color: '#ffffff',
                        borderColor: isDark ? 'rgba(168,85,247,0.4)' : 'rgba(139,90,43,0.4)',
                        boxShadow: themeStyles.buttonShadow
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.02)'
                        e.currentTarget.style.boxShadow = themeStyles.buttonShadowHover
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)'
                        e.currentTarget.style.boxShadow = themeStyles.buttonShadow
                      }}
                    >
                      Learn More
                    </button>
                  </div>
                </div>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default function CoursesPage() {
  // Read theme from HTML for Suspense fallback (before React hydrates)
  // Default to dark mode for SSR
  const isDarkFallback = true
  const fallbackBg = '#000000'
  
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" suppressHydrationWarning style={{ backgroundColor: fallbackBg }}>
        <div className="text-center">
          <div className={`animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4 ${isDarkFallback ? 'border-purple-500' : 'border-amber-700'}`} suppressHydrationWarning></div>
          <p className={`font-light ${isDarkFallback ? 'text-white/50' : 'text-gray-800/70'}`} suppressHydrationWarning>Loading courses...</p>
        </div>
      </div>
    }>
      <CoursesContent />
    </Suspense>
  )
}

