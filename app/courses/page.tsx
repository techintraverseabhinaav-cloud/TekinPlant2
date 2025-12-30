"use client"

import { useState, useEffect, Suspense, useMemo } from "react"
import { Search, Clock, Users, Star, MapPin, Building, Filter, ArrowRight, ChevronDown } from "lucide-react"
import Navbar from "../../src/components/Navbar"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import { industryCourses, industryStats } from "../../lib/industry-data"

function CoursesContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [category, setCategory] = useState("All Categories")
  const [location, setLocation] = useState("All Locations")
  const searchParams = useSearchParams()
  const router = useRouter()
  const { isSignedIn } = useUser()

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
    <div className="min-h-screen relative" style={{ backgroundColor: '#000000' }}>
      <Navbar />
      
      {/* Header */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-[1px]" style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 50%, #000000 100%)' }}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm border border-purple-500/20" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
              <Building className="w-3.5 h-3.5" style={{ color: '#a855f7' }} />
              <span className="text-xs font-medium text-white/70 tracking-wide uppercase">Industry Training Programs</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light mb-6 leading-tight tracking-tight">
              <span className="text-white">Industry</span> <span className="bg-gradient-to-r from-purple-300 via-purple-200 to-purple-300 bg-clip-text text-transparent">Training Programs</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/50 max-w-3xl mx-auto mb-16 font-light leading-relaxed">
              Discover comprehensive training programs designed by industry experts to accelerate your career growth
            </p>

            {/* Statistics */}
            <div className="grid md:grid-cols-4 gap-6 lg:gap-8 mb-16">
              {[
                { icon: "/Icons/building.png", value: industryStats.totalCourses, label: "Training Programs", border: 'rgba(168,85,247,0.25)' },
                { icon: "/Icons/growth.png", value: industryStats.totalPartners, label: "Partner Companies", border: 'rgba(168,85,247,0.25)' },
                { icon: "/Icons/students.png", value: industryStats.totalStudents, label: "Students Trained", border: 'rgba(168,85,247,0.25)' },
                { icon: "/Icons/rating.png", value: industryStats.averageRating, label: "Average Rating", border: 'rgba(168,85,247,0.25)' },
              ].map((stat, index) => (
                <div 
                  key={index} 
                  className="text-center p-8 rounded-2xl transition-all duration-500" 
                  style={{ 
                    backgroundColor: 'rgba(0,0,0,0.3)', 
                    borderColor: stat.border, 
                    borderWidth: '1px'
                  }} 
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)'
                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.4), 0 0 20px rgba(196,181,253,0.2)'
                  }} 
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <div className="w-16 h-16 p-0.5 rounded-xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'rgba(0,0,0,0.5)', borderColor: stat.border, borderWidth: '1px' }}>
                    <div className="w-full h-full rounded-lg flex items-center justify-center overflow-hidden" style={{ borderColor: stat.border, borderWidth: '1px', backgroundColor: '#ffffff' }}>
                      <img src={stat.icon} alt={stat.label} className="w-full h-full object-cover scale-125" />
                    </div>
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-light mb-2 tracking-tight bg-gradient-to-r from-purple-300 to-purple-400 bg-clip-text text-transparent">{stat.value}</h3>
                  <p className="text-sm text-white/50 font-light tracking-wide uppercase">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Search and Filters */}
            <div className="rounded-2xl p-8 mb-8 backdrop-blur-xl border border-purple-500/20" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-white/40" size={18} />
                    <input
                      type="text"
                      placeholder="Search courses, companies, or skills..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-14 pr-6 py-3.5 rounded-xl backdrop-blur-sm border transition-all duration-300 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 font-light"
                      style={{ 
                        backgroundColor: 'rgba(0,0,0,0.4)', 
                        borderColor: 'rgba(168,85,247,0.2)'
                      }}
                    />
                  </div>
                </div>
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-5 py-3.5 pr-10 rounded-xl text-white focus:outline-none transition-all duration-300 backdrop-blur-xl border appearance-none cursor-pointer font-light"
                    style={{ 
                      backgroundColor: 'rgba(0,0,0,0.4)',
                      borderColor: 'rgba(168,85,247,0.2)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(168,85,247,0.4)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(168,85,247,0.2)'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(168,85,247,0.6)'
                      e.currentTarget.style.boxShadow = '0 0 0 2px rgba(168,85,247,0.2)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(168,85,247,0.2)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat} style={{ backgroundColor: '#0a0a0a', color: '#ffffff' }}>{cat}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <ChevronDown className="w-4 h-4" style={{ color: '#c084fc' }} />
                  </div>
                </div>
                <div className="relative">
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-5 py-3.5 pr-10 rounded-xl text-white focus:outline-none transition-all duration-300 backdrop-blur-xl border appearance-none cursor-pointer font-light"
                    style={{ 
                      backgroundColor: 'rgba(0,0,0,0.4)',
                      borderColor: 'rgba(168,85,247,0.2)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(168,85,247,0.4)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(168,85,247,0.2)'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(168,85,247,0.6)'
                      e.currentTarget.style.boxShadow = '0 0 0 2px rgba(168,85,247,0.2)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(168,85,247,0.2)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    {locations.map((loc) => (
                      <option key={loc} value={loc} style={{ backgroundColor: '#0a0a0a', color: '#ffffff' }}>{loc}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <ChevronDown className="w-4 h-4" style={{ color: '#c084fc' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-8">
              <p className="text-sm text-white/40 font-light">
                {searchTerm && (
                  <span style={{ color: '#c084fc' }}>
                    Search results for "{searchTerm}":{" "}
                  </span>
                )}
                Showing <span className="text-white/60">{filteredCourses.length}</span> of <span className="text-white/60">{industryCourses.length}</span> training programs
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="pt-8 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-[1px]" style={{ background: 'linear-gradient(180deg, #000000 0%, #0a0a0a 50%, #1a1a1a 100%)' }}></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          {filteredCourses.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 backdrop-blur-sm border border-purple-500/20" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
                <Search className="w-10 h-10 text-white/40" />
              </div>
              <h3 className="text-2xl font-light text-white mb-4">
                {searchTerm ? `No courses found for "${searchTerm}"` : "No courses found"}
              </h3>
              <p className="text-white/50 mb-10 font-light">
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
                  className="px-6 py-3 rounded-xl transition-all duration-300 backdrop-blur-sm border border-purple-400/40 font-medium"
                  style={{ 
                    background: 'linear-gradient(to right, #a78bfa, #c084fc, #a78bfa)', 
                    color: '#ffffff'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)'
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(196,181,253,0.4)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  Clear Filters
                </button>
                {searchTerm && (
                  <Link 
                    href="/courses" 
                    className="px-6 py-3 rounded-xl transition-all duration-300 backdrop-blur-sm border border-purple-500/20 hover:border-purple-400/40 font-medium" 
                    style={{ backgroundColor: 'rgba(0,0,0,0.3)', color: '#ffffff' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.5)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.3)'
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
                  className="group border border-purple-500/20 rounded-2xl overflow-hidden transition-all duration-500" 
                  style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)'
                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.4), 0 0 20px rgba(196,181,253,0.2)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <div className="aspect-video rounded-t-2xl overflow-hidden relative bg-black/20">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm bg-black/60 border border-purple-500/20 flex items-center gap-1.5" style={{ color: '#fbbf24' }}>
                        <Star className="w-3 h-3 fill-current" /> {course.rating}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm border border-purple-400/40" style={{ background: 'linear-gradient(to right, #a78bfa, #c084fc, #a78bfa)', color: '#ffffff' }}>
                        {course.type}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-light text-white leading-tight line-clamp-2">
                      {course.title}
                    </h3>
                    
                    <p className="text-sm text-white/50 line-clamp-2 leading-relaxed font-light">
                      {course.description}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-white/40 pt-3 border-t border-white/5">
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
                      className="w-full text-sm px-4 py-2.5 rounded-xl backdrop-blur-sm border border-purple-400/40 transition-all duration-300 font-medium" 
                      style={{ 
                        background: 'linear-gradient(to right, #a78bfa, #c084fc, #a78bfa)', 
                        color: '#ffffff'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.02)'
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(196,181,253,0.4)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)'
                        e.currentTarget.style.boxShadow = 'none'
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
