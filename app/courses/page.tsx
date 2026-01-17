"use client"

import { useState, useEffect, Suspense, useMemo, useLayoutEffect } from "react"
import { Search, Clock, Users, Star, MapPin, Building, Filter, ArrowRight, ChevronDown, TrendingUp, BarChart3 } from "lucide-react"
import Navbar from "../../src/components/Navbar"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import { useTheme } from "next-themes"
import { useThemeStyles } from "../../lib/theme-styles"
import { industryCourses, industryStats } from "../../lib/industry-data"

function CoursesContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [category, setCategory] = useState("All Categories")
  const [location, setLocation] = useState("All Locations")
  const searchParams = useSearchParams()
  const router = useRouter()
  const { isSignedIn } = useUser()
  const { resolvedTheme } = useTheme()
  const themeStyles = useThemeStyles()
  
  // Read initial theme from data-theme attribute (set by theme script before React)
  // Returns: true for dark mode (purple), false for light mode (purple)
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
    // Check if theme is initialized
    if (typeof document !== 'undefined') {
      const isInitialized = document.documentElement.hasAttribute('data-theme-initialized')
      if (!isInitialized) {
        // Wait for theme initialization
        const checkTheme = setInterval(() => {
          if (document.documentElement.hasAttribute('data-theme-initialized')) {
            clearInterval(checkTheme)
            const dataTheme = document.documentElement.getAttribute('data-theme')
            setIsDark(dataTheme === 'dark')
          }
        }, 10)
        return () => clearInterval(checkTheme)
      }
    }
    
    if (resolvedTheme) {
      setIsDark(resolvedTheme === 'dark')
    } else if (typeof document !== 'undefined') {
      // Fallback to data-theme attribute
      const dataTheme = document.documentElement.getAttribute('data-theme')
      if (dataTheme) {
        setIsDark(dataTheme === 'dark')
      }
    }
  }, [resolvedTheme])

  // Get unique categories and locations for filters
  const categories = ["All Categories", ...new Set(industryCourses.map(course => course.type))]
  const locations = ["All Locations", ...new Set(industryCourses.map(course => course.location.split(',')[0]))]

  // Handle search parameter from URL
  useEffect(() => {
    const searchFromUrl = searchParams.get('search')
    if (searchFromUrl) {
      setSearchTerm(searchFromUrl)
    }
  }, [searchParams])

  // Filter courses based on search and filters - optimized with useMemo
  const filteredCourses = useMemo(() => {
    const searchLower = searchTerm.toLowerCase()
    return industryCourses.filter((course) => {
      const matchesSearch = !searchLower || 
        course.title.toLowerCase().includes(searchLower) ||
        course.company.toLowerCase().includes(searchLower) ||
        course.description.toLowerCase().includes(searchLower) ||
        course.tags.some(tag => tag.toLowerCase().includes(searchLower))
      const matchesCategory = category === "All Categories" || course.type === category
      const matchesLocation = location === "All Locations" || course.location.includes(location)
      
      return matchesSearch && matchesCategory && matchesLocation
    })
  }, [searchTerm, category, location])

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: themeStyles.pageBg }}>
      <Navbar />
      
      {/* Header */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-[1px]" style={{ background: themeStyles.pageBgGradient }}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm border" style={{ 
              backgroundColor: themeStyles.cardBg,
              borderColor: isDark ? 'rgba(168,85,247,0.2)' : 'rgba(91,33,182,0.3)'
            }}>
              <Building className="w-3.5 h-3.5" style={{ color: isDark ? '#a855f7' : '#5b21b6' }} />
              <span className="text-xs font-medium tracking-wide uppercase" style={{ color: themeStyles.textSecondary }}>Industry Training Programs</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light mb-6 leading-tight tracking-tight">
              <span style={{ color: themeStyles.textPrimary }}>Industry</span> <span className={`bg-clip-text text-transparent ${isDark ? 'bg-gradient-to-r from-purple-300 via-purple-200 to-purple-300' : 'bg-gradient-to-r from-purple-800 via-purple-700 to-purple-800'}`}>Training Programs</span>
            </h1>
            <p className="text-lg sm:text-xl max-w-3xl mx-auto mb-16 font-light leading-relaxed" style={{ color: themeStyles.textSecondary }}>
              Discover comprehensive training programs designed by industry experts to accelerate your career growth
            </p>

            {/* Statistics */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
              {[
                { Icon: Building, value: industryStats.totalCourses, label: "Training Programs" },
                { Icon: TrendingUp, value: industryStats.totalPartners, label: "Partner Companies" },
                { Icon: Users, value: industryStats.totalStudents, label: "Students Trained" },
                { Icon: Star, value: industryStats.averageRating, label: "Average Rating" },
              ].map((stat, index) => {
                const IconComponent = stat.Icon
                const bg = isDark
                  ? 'rgba(124,58,237,0.10)'
                  : 'transparent'

                const border = isDark
                  ? 'rgba(124,58,237,0.25)'
                  : 'rgba(91,33,182,0.25)'

                const iconColor = isDark ? '#8b5cf6' : '#5b21b6'
                const textColor = isDark ? 'text-white/70' : 'text-purple-900/70'
                const valueGradient = isDark
                  ? 'bg-gradient-to-r from-purple-600 to-purple-500'
                  : 'bg-gradient-to-r from-purple-800 to-purple-700'
                
                return (
                  <div 
                    key={index} 
                    className="flash-card-container"
                  >
                    <div
                      className="flash-card-inner"
                    >
                      {/* Front of card - Icon only */}
                      <div
                        className="flash-card-face flash-card-front rounded-2xl"
                        style={{
                          padding: '1rem',
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
                        <IconComponent
                          className="w-12 h-12 sm:w-16 sm:h-16 transition-transform duration-300"
                          style={{ color: iconColor }}
                        />
                      </div>

                      {/* Back of card - Stats */}
                      <div
                        className="flash-card-face flash-card-back rounded-2xl"
                        style={{
                          padding: '1rem',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: bg,
                          border: `1px solid ${border}`,
                          boxShadow: isDark
                            ? '0 16px 40px rgba(0,0,0,0.35), 0 0 30px rgba(124,58,237,0.35)'
                            : '0 16px 40px rgba(30,41,59,0.25), 0 0 30px rgba(91,33,182,0.25)',
                        }}
                      >
                        {/* Value */}
                        <div
                          className={`text-2xl sm:text-3xl lg:text-4xl font-semibold text-center mb-2 sm:mb-3 bg-clip-text text-transparent ${valueGradient}`}
                        >
                          {stat.value}
                        </div>

                        {/* Label */}
                        <p
                          className={`text-xs sm:text-sm lg:text-base text-center font-light ${textColor}`}
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
            <div className="rounded-2xl p-8 mb-8 backdrop-blur-xl border" style={{ 
              backgroundColor: themeStyles.cardBg,
              borderColor: isDark ? 'rgba(168,85,247,0.2)' : 'rgba(91,33,182,0.3)'
            }}>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-5 top-1/2 transform -translate-y-1/2" size={18} style={{ color: themeStyles.textSecondary }} />
                    <input
                      type="text"
                      placeholder="Search courses, companies, or skills..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-14 pr-6 py-3.5 rounded-xl backdrop-blur-sm border transition-all duration-300 focus:outline-none focus:ring-2 font-light placeholder:opacity-60"
                      style={{ 
                        backgroundColor: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.8)', 
                        borderColor: isDark ? 'rgba(168,85,247,0.2)' : 'rgba(91,33,182,0.3)',
                        color: themeStyles.textPrimary
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.6)' : 'rgba(91,33,182,0.6)'
                        e.currentTarget.style.boxShadow = isDark ? '0 0 0 2px rgba(168,85,247,0.2)' : '0 0 0 2px rgba(91,33,182,0.2)'
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.2)' : 'rgba(91,33,182,0.3)'
                        e.currentTarget.style.boxShadow = 'none'
                      }}
                    />
                  </div>
                </div>
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-5 py-3.5 pr-10 rounded-xl focus:outline-none transition-all duration-300 backdrop-blur-xl border appearance-none cursor-pointer font-light"
                    style={{ 
                      backgroundColor: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.8)',
                      borderColor: isDark ? 'rgba(168,85,247,0.2)' : 'rgba(91,33,182,0.3)',
                      color: themeStyles.textPrimary
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.4)' : 'rgba(91,33,182,0.5)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.2)' : 'rgba(91,33,182,0.3)'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.6)' : 'rgba(91,33,182,0.6)'
                      e.currentTarget.style.boxShadow = isDark ? '0 0 0 2px rgba(168,85,247,0.2)' : '0 0 0 2px rgba(91,33,182,0.2)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.2)' : 'rgba(91,33,182,0.3)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat} style={{ backgroundColor: themeStyles.selectBg, color: themeStyles.textPrimary }}>{cat}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <ChevronDown className="w-4 h-4" style={{ color: isDark ? '#c084fc' : '#5b21b6' }} />
                  </div>
                </div>
                <div className="relative">
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-5 py-3.5 pr-10 rounded-xl focus:outline-none transition-all duration-300 backdrop-blur-xl border appearance-none cursor-pointer font-light"
                    style={{ 
                      backgroundColor: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.8)',
                      borderColor: isDark ? 'rgba(168,85,247,0.2)' : 'rgba(91,33,182,0.3)',
                      color: themeStyles.textPrimary
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.4)' : 'rgba(91,33,182,0.5)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.2)' : 'rgba(91,33,182,0.3)'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.6)' : 'rgba(91,33,182,0.6)'
                      e.currentTarget.style.boxShadow = isDark ? '0 0 0 2px rgba(168,85,247,0.2)' : '0 0 0 2px rgba(91,33,182,0.2)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.2)' : 'rgba(91,33,182,0.3)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    {locations.map((loc) => (
                      <option key={loc} value={loc} style={{ backgroundColor: themeStyles.selectBg, color: themeStyles.textPrimary }}>{loc}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <ChevronDown className="w-4 h-4" style={{ color: isDark ? '#c084fc' : '#5b21b6' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-8">
              <p className="text-sm font-light" style={{ color: themeStyles.textSecondary }}>
                {searchTerm && (
                  <span style={{ color: isDark ? '#c084fc' : '#5b21b6' }}>
                    Search results for "{searchTerm}":{" "}
                  </span>
                )}
                Showing <span style={{ color: themeStyles.textPrimary }}>{filteredCourses.length}</span> of <span style={{ color: themeStyles.textPrimary }}>{industryCourses.length}</span> training programs
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="pt-8 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-[1px]" style={{ background: themeStyles.pageBgGradient }}></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          {filteredCourses.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 backdrop-blur-sm border" style={{ 
                backgroundColor: themeStyles.cardBg,
                borderColor: isDark ? 'rgba(168,85,247,0.2)' : 'rgba(91,33,182,0.3)'
              }}>
                <Search className="w-10 h-10" style={{ color: themeStyles.textSecondary }} />
              </div>
              <h3 className="text-2xl font-light mb-4" style={{ color: themeStyles.textPrimary }}>
                {searchTerm ? `No courses found for "${searchTerm}"` : "No courses found"}
              </h3>
              <p className="mb-10 font-light" style={{ color: themeStyles.textSecondary }}>
                {searchTerm 
                  ? "Try adjusting your search terms or browse all courses" 
                  : "Try adjusting your search criteria or filters"
                }
              </p>
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
                    borderColor: isDark ? 'rgba(168,85,247,0.4)' : 'rgba(91,33,182,0.4)',
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
                  Clear Filters
                </button>
                {searchTerm && (
                  <Link 
                    href="/courses" 
                    className="px-6 py-3 rounded-xl transition-all duration-300 backdrop-blur-sm border font-medium" 
                    style={{ 
                      backgroundColor: themeStyles.cardBg, 
                      color: themeStyles.textPrimary,
                      borderColor: isDark ? 'rgba(168,85,247,0.2)' : 'rgba(91,33,182,0.3)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = isDark ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.9)'
                      e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.4)' : 'rgba(91,33,182,0.5)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = themeStyles.cardBg
                      e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.2)' : 'rgba(91,33,182,0.3)'
                    }}
                  >
                    View All Courses
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course, index) => (
                <div 
                  key={course.id} 
                  className="group border rounded-2xl overflow-hidden transition-all duration-500" 
                  style={{ 
                    backgroundColor: themeStyles.cardBg,
                    borderColor: isDark ? 'rgba(168,85,247,0.2)' : 'rgba(91,33,182,0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)'
                    e.currentTarget.style.boxShadow = isDark 
                      ? '0 12px 24px rgba(0,0,0,0.4), 0 0 20px rgba(196,181,253,0.2)'
                      : '0 12px 24px rgba(0,0,0,0.1), 0 0 20px rgba(91,33,182,0.2)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <div className="aspect-video rounded-t-2xl overflow-hidden relative" style={{ backgroundColor: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.1)' }}>
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm border flex items-center gap-1.5" style={{ 
                        backgroundColor: isDark ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.8)',
                        borderColor: isDark ? 'rgba(168,85,247,0.2)' : 'rgba(91,33,182,0.3)',
                        color: '#fbbf24' 
                      }}>
                        <Star className="w-3 h-3 fill-current" /> {course.rating}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm border" style={{ 
                        background: themeStyles.buttonGradient, 
                        color: '#ffffff',
                        borderColor: isDark ? 'rgba(168,85,247,0.4)' : 'rgba(91,33,182,0.4)'
                      }}>
                        {course.type}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-light leading-tight line-clamp-2" style={{ color: themeStyles.textPrimary }}>
                      {course.title}
                    </h3>
                    
                    <p className="text-sm line-clamp-2 leading-relaxed font-light" style={{ color: themeStyles.textSecondary }}>
                      {course.description}
                    </p>

                    <div className="flex items-center gap-4 text-xs pt-3 border-t" style={{ 
                      color: themeStyles.textSecondary,
                      borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.1)'
                    }}>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5" />
                        <span>{course.students}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{course.location.split(',')[0]}</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => isSignedIn ? router.push(`/courses/${course.id}`) : router.push('/login')} 
                      className="w-full text-sm px-4 py-2.5 rounded-xl backdrop-blur-sm border transition-all duration-300 font-medium" 
                      style={{ 
                        background: themeStyles.buttonGradient, 
                        color: '#ffffff',
                        borderColor: isDark ? 'rgba(168,85,247,0.4)' : 'rgba(91,33,182,0.4)',
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
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default function CoursesPage() {
  const themeStyles = useThemeStyles()
  
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: themeStyles.pageBg }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="font-light" style={{ color: themeStyles.textSecondary }}>Loading courses...</p>
        </div>
      </div>
    }>
      <CoursesContent />
    </Suspense>
  )
}

