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
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-[1px]" style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 50%, #000000 100%)' }}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in-up">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 backdrop-blur-sm border border-purple-500/20" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
              <Building className="w-4 h-4" style={{ color: '#a855f7' }} />
              <span className="text-sm font-medium text-white/80">Industry Training Programs</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-normal mb-6">
              <span className="text-white" style={{ textShadow: '0 0 20px rgba(255,255,255,0.3)' }}>Industry</span> <span className="bg-gradient-to-r from-purple-300 via-purple-200 to-purple-300 bg-clip-text text-transparent" style={{ textShadow: '0 0 30px rgba(196,181,253,0.5), 0 0 60px rgba(196,181,253,0.3)' }}>Training Programs</span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto mb-12">
              Discover comprehensive training programs designed by industry experts to accelerate your career growth
            </p>

            {/* Statistics */}
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              {[
                { icon: Building, value: industryStats.totalCourses, label: "Training Programs", color: 'rgba(168,85,247,0.12)', border: 'rgba(168,85,247,0.25)', iconColor: '#c084fc' },
                { icon: Users, value: industryStats.totalPartners, label: "Partner Companies", color: 'rgba(99,102,241,0.12)', border: 'rgba(99,102,241,0.25)', iconColor: '#818cf8' },
                { icon: Users, value: industryStats.totalStudents, label: "Students Trained", color: 'rgba(236,72,153,0.12)', border: 'rgba(236,72,153,0.25)', iconColor: '#f472b6' },
                { icon: Star, value: industryStats.averageRating, label: "Average Rating", color: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.25)', iconColor: '#a78bfa' },
              ].map((stat, index) => (
                <div key={index} className="text-center hover-lift p-6 rounded-2xl transition-all duration-300" style={{ backgroundColor: 'rgba(0,0,0,0.4)', borderColor: stat.border, borderWidth: '1px' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 20px rgba(196,181,253,0.5), 0 0 40px rgba(196,181,253,0.3)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}>
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(0,0,0,0.5)', borderColor: stat.border, borderWidth: '1px' }}>
                    <stat.icon className="w-7 h-7" style={{ color: stat.iconColor }} />
                </div>
                  <h3 className="text-2xl lg:text-3xl font-bold mb-3 break-words bg-gradient-to-r from-purple-300 to-purple-400 bg-clip-text text-transparent">{stat.value}</h3>
                  <p className="text-base break-words text-white/70" style={{ lineHeight: '1.6' }}>{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Search and Filters */}
            <div className="rounded-2xl p-6 mb-8 backdrop-blur-xl border border-purple-500/20" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50" size={20} />
                    <input
                      type="text"
                      placeholder="Search courses, companies, or skills..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 rounded-xl backdrop-blur-sm border border-purple-500/20 transition-all duration-300"
                      style={{ backgroundColor: 'rgba(0,0,0,0.4)', color: '#ffffff' }}
                    />
                  </div>
                </div>
                <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 pr-10 rounded-xl text-white focus:outline-none transition-all duration-300 backdrop-blur-xl border appearance-none cursor-pointer"
                    style={{ 
                      backgroundColor: 'rgba(0,0,0,0.5)',
                      borderColor: 'rgba(168,85,247,0.3)',
                      boxShadow: '0 0 15px rgba(196,181,253,0.2), inset 0 1px 0 rgba(255,255,255,0.05)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(168,85,247,0.5)'
                      e.currentTarget.style.boxShadow = '0 0 20px rgba(196,181,253,0.3), inset 0 1px 0 rgba(255,255,255,0.08)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(168,85,247,0.3)'
                      e.currentTarget.style.boxShadow = '0 0 15px rgba(196,181,253,0.2), inset 0 1px 0 rgba(255,255,255,0.05)'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(168,85,247,0.6)'
                      e.currentTarget.style.boxShadow = '0 0 25px rgba(196,181,253,0.4), inset 0 1px 0 rgba(255,255,255,0.1)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(168,85,247,0.3)'
                      e.currentTarget.style.boxShadow = '0 0 15px rgba(196,181,253,0.2), inset 0 1px 0 rgba(255,255,255,0.05)'
                    }}
                >
                  {categories.map((cat) => (
                      <option key={cat} value={cat} style={{ backgroundColor: '#0a0a0a', color: '#ffffff' }}>{cat}</option>
                  ))}
                </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <ChevronDown className="w-5 h-5" style={{ color: '#c084fc' }} />
                  </div>
                </div>
                <div className="relative">
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-3 pr-10 rounded-xl text-white focus:outline-none transition-all duration-300 backdrop-blur-xl border appearance-none cursor-pointer"
                    style={{ 
                      backgroundColor: 'rgba(0,0,0,0.5)',
                      borderColor: 'rgba(168,85,247,0.3)',
                      boxShadow: '0 0 15px rgba(196,181,253,0.2), inset 0 1px 0 rgba(255,255,255,0.05)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(168,85,247,0.5)'
                      e.currentTarget.style.boxShadow = '0 0 20px rgba(196,181,253,0.3), inset 0 1px 0 rgba(255,255,255,0.08)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(168,85,247,0.3)'
                      e.currentTarget.style.boxShadow = '0 0 15px rgba(196,181,253,0.2), inset 0 1px 0 rgba(255,255,255,0.05)'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(168,85,247,0.6)'
                      e.currentTarget.style.boxShadow = '0 0 25px rgba(196,181,253,0.4), inset 0 1px 0 rgba(255,255,255,0.1)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(168,85,247,0.3)'
                      e.currentTarget.style.boxShadow = '0 0 15px rgba(196,181,253,0.2), inset 0 1px 0 rgba(255,255,255,0.05)'
                    }}
                >
                  {locations.map((loc) => (
                      <option key={loc} value={loc} style={{ backgroundColor: '#0a0a0a', color: '#ffffff' }}>{loc}</option>
                  ))}
                </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <ChevronDown className="w-5 h-5" style={{ color: '#c084fc' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-8">
              <p className="text-white/70">
                {searchTerm && (
                  <span style={{ color: '#c084fc' }}>
                    Search results for "{searchTerm}":{" "}
                  </span>
                )}
                Showing {filteredCourses.length} of {industryCourses.length} training programs
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-[1px]" style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 50%, #000000 100%)' }}></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredCourses.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-purple-500/20" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
                <Search className="w-12 h-12 text-white/70" />
              </div>
              <h3 className="text-2xl font-normal text-white mb-4">
                {searchTerm ? `No courses found for "${searchTerm}"` : "No courses found"}
              </h3>
              <p className="text-white/70 mb-8">
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
                  className="px-6 py-3 rounded-xl transition-all duration-300 hover:opacity-90 backdrop-blur-sm border border-purple-400/40"
                  style={{ background: 'linear-gradient(to right, #a78bfa, #c084fc, #a78bfa)', color: '#ffffff', boxShadow: '0 0 20px rgba(196,181,253,0.4), 0 0 40px rgba(196,181,253,0.2)' }}
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 25px rgba(196,181,253,0.6), 0 0 50px rgba(196,181,253,0.4)'}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 0 20px rgba(196,181,253,0.4), 0 0 40px rgba(196,181,253,0.2)'}
                >
                  Clear Filters
                </button>
                {searchTerm && (
                  <Link href="/courses" className="px-6 py-3 rounded-xl transition-all duration-300 backdrop-blur-sm border border-purple-500/20 hover:border-purple-400/40" style={{ backgroundColor: 'rgba(0,0,0,0.4)', color: '#ffffff' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 20px rgba(196,181,253,0.5), 0 0 40px rgba(196,181,253,0.3)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}>
                    View All Courses
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course, index) => (
                <div key={course.id} className="hover-lift animate-fade-in-scale group border border-purple-500/20 rounded-2xl p-6 transition-all duration-300" style={{ animationDelay: `${index * 0.1}s`, backgroundColor: 'rgba(0,0,0,0.3)' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 20px rgba(196,181,253,0.5), 0 0 40px rgba(196,181,253,0.3)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}>
                  <div className="aspect-video rounded-xl overflow-hidden mb-6 relative bg-black/20">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm bg-black/50 border border-purple-500/20 flex items-center gap-1" style={{ color: '#fbbf24' }}>
                        <Star className="w-3 h-3 fill-current" /> {course.rating}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <span className="px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm border border-purple-400/40" style={{ background: 'linear-gradient(to right, #a78bfa, #c084fc, #a78bfa)', color: '#ffffff', boxShadow: '0 0 15px rgba(196,181,253,0.4), 0 0 30px rgba(196,181,253,0.2)' }}>
                        {course.type}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="mb-3">
                      <span className="px-3 py-1 rounded-full text-base font-medium border border-purple-500/20" style={{ backgroundColor: 'rgba(0,0,0,0.4)', color: '#ffffff' }}>
                        {course.type}
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold transition-colors text-white mb-3">
                      {course.title}
                    </h3>
                    
                    <p className="text-base line-clamp-2 text-white/70 mb-4" style={{ lineHeight: '1.7' }}>
                      {course.description}
                    </p>

                    <div className="flex items-center justify-between text-base text-white/70 mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{course.students}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{course.location.split(',')[0]}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-center pt-4">
                      <button onClick={() => isSignedIn ? router.push(`/courses/${course.id}`) : router.push('/login')} className="text-base px-5 py-2.5 rounded-xl hover:opacity-90 backdrop-blur-sm border border-purple-400/40 transition-all duration-300" style={{ background: 'linear-gradient(to right, #a78bfa, #c084fc, #a78bfa)', color: '#ffffff', boxShadow: '0 0 15px rgba(196,181,253,0.4), 0 0 30px rgba(196,181,253,0.2)' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 20px rgba(196,181,253,0.6), 0 0 40px rgba(196,181,253,0.4)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 0 15px rgba(196,181,253,0.4), 0 0 30px rgba(196,181,253,0.2)'}>
                        Learn More
                      </button>
                    </div>
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading courses...</p>
        </div>
      </div>
    }>
      <CoursesContent />
    </Suspense>
  )
}
