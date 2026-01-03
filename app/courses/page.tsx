"use client"

import { useState, useEffect, Suspense, useMemo } from "react"
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
  const { theme } = useTheme()
  const themeStyles = useThemeStyles()
  const isDark = theme === 'dark'

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
    <div className="min-h-screen relative" style={{ backgroundColor: themeStyles.pageBg }}>
      <Navbar />
      
      {/* Header */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-[1px]" style={{ background: themeStyles.pageBgGradient }}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm border" style={{ 
              backgroundColor: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.7)',
              borderColor: isDark ? 'rgba(168,85,247,0.2)' : 'rgba(139,90,43,0.25)'
            }}>
              <Building className="w-3.5 h-3.5" style={{ color: isDark ? '#a855f7' : '#8b6f47' }} />
              <span className={`text-xs font-medium tracking-wide uppercase ${isDark ? 'text-white/70' : 'text-amber-900/80'}`}>Industry Training Programs</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light mb-6 leading-tight tracking-tight">
              <span style={{ color: themeStyles.textPrimary }}>Industry</span> <span className={`bg-clip-text text-transparent ${
                isDark 
                  ? 'bg-gradient-to-r from-purple-300 via-purple-200 to-purple-300' 
                  : 'bg-gradient-to-r from-amber-800 via-amber-700 to-amber-800'
              }`}>Training Programs</span>
            </h1>
            <p className="text-lg sm:text-xl max-w-3xl mx-auto mb-16 font-light leading-relaxed" style={{ 
              color: themeStyles.textSecondary,
              opacity: isDark ? 0.5 : 0.8
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
                const statBorder = isDark ? 'rgba(168,85,247,0.25)' : 'rgba(139,90,43,0.3)'
                const statBg = isDark ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.7)'
                const hoverShadow = isDark
                  ? '0 12px 24px rgba(0,0,0,0.4), 0 0 20px rgba(196,181,253,0.2)'
                  : '0 12px 24px rgba(58,46,31,0.2), 0 0 20px rgba(139,90,43,0.25)'
                
                return (
                <div 
                  key={index} 
                  className="text-center p-8 rounded-2xl transition-all duration-500" 
                  style={{ 
                    backgroundColor: statBg, 
                    borderColor: statBorder, 
                    borderWidth: '1px'
                  }} 
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)'
                    e.currentTarget.style.boxShadow = hoverShadow
                  }} 
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <div className="w-16 h-16 p-0.5 rounded-xl flex items-center justify-center mx-auto mb-6" style={{ 
                    backgroundColor: isDark ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.9)', 
                    borderColor: statBorder, 
                    borderWidth: '1px' 
                  }}>
                    <div className="w-full h-full rounded-lg flex items-center justify-center overflow-hidden" style={{ 
                      borderColor: statBorder, 
                      borderWidth: '1px', 
                      backgroundColor: '#ffffff' 
                    }}>
                      <img src={stat.icon} alt={stat.label} className="w-full h-full object-cover scale-125" />
                    </div>
                  </div>
                  <h3 className={`text-3xl lg:text-4xl font-light mb-2 tracking-tight bg-clip-text text-transparent ${
                    isDark 
                      ? 'bg-gradient-to-r from-purple-300 to-purple-400' 
                      : 'bg-gradient-to-r from-amber-800 to-amber-700'
                  }`}>{stat.value}</h3>
                  <p className={`text-sm font-light tracking-wide uppercase ${isDark ? 'text-white/50' : 'text-amber-900/70'}`}>{stat.label}</p>
                </div>
                )
              })}
            </div>

            {/* Search and Filters */}
            <div className="rounded-2xl p-8 mb-8 backdrop-blur-xl border" style={{ 
              backgroundColor: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.8)',
              borderColor: isDark ? 'rgba(168,85,247,0.2)' : 'rgba(139,90,43,0.3)'
            }}>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className={`absolute left-5 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-white/40' : 'text-amber-900/50'}`} size={18} />
                    <input
                      type="text"
                      placeholder="Search courses, companies, or skills..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={`w-full pl-14 pr-6 py-3.5 rounded-xl backdrop-blur-sm border transition-all duration-300 focus:outline-none focus:ring-2 font-light ${
                        isDark ? 'text-white placeholder-white/30 focus:ring-purple-500/50' : 'text-amber-900 placeholder-amber-900/50 focus:ring-amber-800/50'
                      }`}
                      style={{ 
                        backgroundColor: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.9)', 
                        borderColor: isDark ? 'rgba(168,85,247,0.2)' : 'rgba(139,90,43,0.3)'
                      }}
                    />
                  </div>
                </div>
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className={`w-full px-5 py-3.5 pr-10 rounded-xl focus:outline-none transition-all duration-300 backdrop-blur-xl border appearance-none cursor-pointer font-light ${
                      isDark ? 'text-white' : 'text-amber-900'
                    }`}
                    style={{ 
                      backgroundColor: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.9)',
                      borderColor: isDark ? 'rgba(168,85,247,0.2)' : 'rgba(139,90,43,0.3)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.4)' : 'rgba(139,90,43,0.5)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.2)' : 'rgba(139,90,43,0.3)'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.6)' : 'rgba(139,90,43,0.6)'
                      e.currentTarget.style.boxShadow = isDark ? '0 0 0 2px rgba(168,85,247,0.2)' : '0 0 0 2px rgba(139,90,43,0.2)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.2)' : 'rgba(139,90,43,0.3)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat} style={{ 
                        backgroundColor: isDark ? '#0a0a0a' : '#ffffff', 
                        color: isDark ? '#ffffff' : '#3a2e1f' 
                      }}>{cat}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <ChevronDown className="w-4 h-4" style={{ color: isDark ? '#c084fc' : '#8b6f47' }} />
                  </div>
                </div>
                <div className="relative">
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className={`w-full px-5 py-3.5 pr-10 rounded-xl focus:outline-none transition-all duration-300 backdrop-blur-xl border appearance-none cursor-pointer font-light ${
                      isDark ? 'text-white' : 'text-amber-900'
                    }`}
                    style={{ 
                      backgroundColor: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.9)',
                      borderColor: isDark ? 'rgba(168,85,247,0.2)' : 'rgba(139,90,43,0.3)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.4)' : 'rgba(139,90,43,0.5)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.2)' : 'rgba(139,90,43,0.3)'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.6)' : 'rgba(139,90,43,0.6)'
                      e.currentTarget.style.boxShadow = isDark ? '0 0 0 2px rgba(168,85,247,0.2)' : '0 0 0 2px rgba(139,90,43,0.2)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.2)' : 'rgba(139,90,43,0.3)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    {locations.map((loc) => (
                      <option key={loc} value={loc} style={{ 
                        backgroundColor: isDark ? '#0a0a0a' : '#ffffff', 
                        color: isDark ? '#ffffff' : '#3a2e1f' 
                      }}>{loc}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <ChevronDown className="w-4 h-4" style={{ color: isDark ? '#c084fc' : '#8b6f47' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-8">
              <p className={`text-sm font-light ${isDark ? 'text-white/40' : 'text-amber-900/60'}`}>
                {searchTerm && (
                  <span style={{ color: isDark ? '#c084fc' : '#8b6f47' }}>
                    Search results for "{searchTerm}":{" "}
                  </span>
                )}
                Showing <span className={isDark ? 'text-white/60' : 'text-amber-900/70'}>{filteredCourses.length}</span> of <span className={isDark ? 'text-white/60' : 'text-amber-900/70'}>{loading ? 0 : courses.length}</span> training programs
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="pt-8 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-[1px]" style={{ background: themeStyles.pageBgGradient }}></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          {loading ? (
            <div className="text-center py-24">
              <div className={`animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4 ${isDark ? 'border-purple-500' : 'border-amber-700'}`}></div>
              <p className={`font-light ${isDark ? 'text-white/50' : 'text-amber-900/70'}`}>Loading courses...</p>
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 backdrop-blur-sm border" style={{ 
                backgroundColor: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.7)',
                borderColor: isDark ? 'rgba(168,85,247,0.2)' : 'rgba(139,90,43,0.3)'
              }}>
                <Search className={`w-10 h-10 ${isDark ? 'text-white/40' : 'text-amber-900/50'}`} />
              </div>
              <h3 className={`text-2xl font-light mb-4 ${isDark ? 'text-white' : 'text-amber-900'}`}>
                {searchTerm ? `No courses found for "${searchTerm}"` : "No courses found"}
              </h3>
              <p className={`mb-10 font-light ${isDark ? 'text-white/50' : 'text-amber-900/70'}`}>
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
                const cardBg = isDark ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.8)'
                const cardBorder = isDark ? 'rgba(168,85,247,0.2)' : 'rgba(139,90,43,0.3)'
                const hoverShadow = isDark
                  ? '0 12px 24px rgba(0,0,0,0.4), 0 0 20px rgba(196,181,253,0.2)'
                  : '0 12px 24px rgba(58,46,31,0.2), 0 0 20px rgba(139,90,43,0.25)'
                
                return (
                <div 
                  key={course.id} 
                  className="group border rounded-2xl overflow-hidden transition-all duration-500" 
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
                        color: '#fbbf24'
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

                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-light leading-tight line-clamp-2" style={{ color: themeStyles.textPrimary }}>
                      {course.title}
                    </h3>
                    
                    <p className="text-sm line-clamp-2 leading-relaxed font-light" style={{ color: themeStyles.textSecondary }}>
                      {course.description}
                    </p>

                    <div className={`flex items-center gap-4 text-xs pt-3 border-t ${isDark ? 'text-white/40 border-white/5' : 'text-amber-900/60 border-amber-900/10'}`}>
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
                      className="w-full text-sm px-4 py-2.5 rounded-xl backdrop-blur-sm border transition-all duration-300 font-medium" 
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
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#000000' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-white/50 font-light">Loading courses...</p>
        </div>
      </div>
    }>
      <CoursesContent />
    </Suspense>
  )
}
