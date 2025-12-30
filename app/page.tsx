"use client"

import { useState, useEffect, useRef } from "react"
import { Inter } from "next/font/google"
import { Search, Star, Users, Clock, MapPin, ArrowRight, Sparkles, TrendingUp, Award } from "lucide-react"
import Navbar from "../src/components/Navbar"
import ThreeScene from "../components/ThreeScene"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import { industryCourses, industryStats, industryInsights } from "../lib/industry-data"

const inter = Inter({ subsets: ["latin"] })

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()
  const { isSignedIn } = useUser()
  const featuredCourses = industryCourses.slice(0, 6)
  const popularSearches = ["Automation", "Industrial Training", "Siemens", "ABB"]
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains('slide-up')) {
            entry.target.classList.add('slide-up-visible')
          }
          if (entry.target.classList.contains('slide-right')) {
            entry.target.classList.add('slide-right-visible')
          }
        }
      })
    }, { threshold: 0.1 })
    
    const elements = document.querySelectorAll('.slide-up, .slide-right')
    elements.forEach(el => observer.observe(el))
    
    return () => observer.disconnect()
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/courses?search=${encodeURIComponent(searchTerm.trim())}`)
    }
  }

  const handleQuickSearch = (term: string) => {
    setSearchTerm(term)
    router.push(`/courses?search=${encodeURIComponent(term)}`)
  }

  return (
    <div className={`min-h-screen relative ${inter.className}`} style={{ backgroundColor: '#000000' }}>
      <ThreeScene />
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center py-20 overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-[1px]" style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 50%, #000000 100%)' }}></div>
        
        <div className="slide-up relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm border border-purple-500/20" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
              <Sparkles className="w-3.5 h-3.5" style={{ color: '#a855f7' }} />
              <span className="text-xs font-medium text-white/70 tracking-wide uppercase">Leading Industry Training Platform</span>
            </div>
              
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light mb-6 leading-[1.1] tracking-tight">
              <span className="bg-gradient-to-r from-purple-300 via-purple-200 to-purple-300 bg-clip-text text-transparent" style={{ textShadow: '0 0 30px rgba(196,181,253,0.5), 0 0 60px rgba(196,181,253,0.3)' }}>Transform</span> <span className="text-white font-normal" style={{ textShadow: '0 0 20px rgba(255,255,255,0.3)' }}>Your Career with</span>
              <br />
              <span className="bg-gradient-to-r from-purple-300 via-purple-200 to-purple-300 bg-clip-text text-transparent" style={{ textShadow: '0 0 30px rgba(196,181,253,0.5), 0 0 60px rgba(196,181,253,0.3)' }}>Industry</span> <span className="text-white font-normal" style={{ textShadow: '0 0 20px rgba(255,255,255,0.3)' }}>Training</span>
            </h1>
              
            <p className="text-lg sm:text-xl mb-10 max-w-2xl mx-auto leading-relaxed text-white/60 font-light" style={{ lineHeight: '1.7' }}>
              Connect with leading companies, master cutting-edge technologies, and accelerate your professional growth with our comprehensive training programs.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 z-10" size={20} style={{ color: 'rgba(255,255,255,0.6)' }} />
                <input
                  type="text"
                  placeholder="Search courses, skills, or companies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 rounded-2xl backdrop-blur-sm border transition-all duration-300 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  style={{ 
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    borderColor: 'rgba(168,85,247,0.2)'
                  }}
                />
              </div>
              {popularSearches.length > 0 && (
                <div className="flex flex-wrap gap-2 justify-center mt-4">
                  <span className="text-xs text-white/50">Popular:</span>
                  {popularSearches.slice(0, 4).map((term, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleQuickSearch(term)}
                      className="text-xs px-3 py-1 rounded-full text-white/60 hover:text-white/90 transition-colors"
                      style={{ backgroundColor: 'rgba(168,85,247,0.1)' }}
                    >
                      {term}
                    </button>
                  ))}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-[1px]" style={{ background: 'linear-gradient(180deg, #000000 0%, #0a0a0a 50%, #1a1a1a 100%)' }}></div>
        <div className="slide-up relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid md:grid-cols-4 gap-6 lg:gap-8">
            {[
              { icon: "/Icons/students.png", value: industryStats.totalStudents.toLocaleString(), label: "Students Trained", border: 'rgba(168,85,247,0.25)' },
              { icon: "/Icons/growth.png", value: industryStats.totalCourses, label: "Training Programs", border: 'rgba(168,85,247,0.25)' },
              { icon: "/Icons/badge.png", value: industryStats.totalPartners, label: "Partner Companies", border: 'rgba(168,85,247,0.25)' },
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
        </div>
      </section>

      {/* Featured Companies Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-[1px]" style={{ background: 'linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 50%, #000000 100%)' }}></div>
        <div className="slide-right relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-light mb-6 leading-tight tracking-tight">
                <span className="text-white">Trusted by</span> <span className="bg-gradient-to-r from-purple-300 to-purple-400 bg-clip-text text-transparent">Leading Companies</span>
              </h2>
              <p className="text-lg text-white/50 leading-relaxed font-light">Partner with industry leaders for world-class training</p>
            </div>
            
            <div className="flex flex-col gap-4 items-end">
              {[
                [{ name: "Siemens", logo: "/leading-company-logos/siemens.png", index: 0 }],
                [{ name: "ABB", logo: "/leading-company-logos/abb.png", index: 1 }, { name: "Rockwell", logo: "/leading-company-logos/rockwell.png", index: 2 }],
                [{ name: "Emerson", logo: "/leading-company-logos/emerson.png", index: 3 }, { name: "Honeywell", logo: "/leading-company-logos/honeywell.png", index: 4 }, { name: "FANUC", logo: "/leading-company-logos/fanuc.png", index: 5 }]
              ].map((row, rowIndex) => (
                <div key={rowIndex} className="flex gap-4 justify-end">
                  {row.map((company) => {
                    const colors = [
                      { border: 'rgba(168,85,247,0.25)' },
                      { border: 'rgba(99,102,241,0.25)' },
                      { border: 'rgba(236,72,153,0.25)' },
                      { border: 'rgba(139,92,246,0.25)' },
                      { border: 'rgba(79,70,229,0.25)' },
                      { border: 'rgba(192,132,252,0.25)' },
                    ]
                    const color = colors[company.index % 6]
                    return (
                      <div 
                        key={company.index} 
                        className="p-2 flex items-center justify-center w-32 h-32 rounded-2xl transition-all duration-500 relative" 
                        style={{ 
                          backgroundColor: 'rgba(0,0,0,0.3)', 
                          borderColor: color.border, 
                          borderWidth: '1px' 
                        }} 
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)'
                          e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.4), 0 0 20px rgba(196,181,253,0.2)'
                        }} 
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0) scale(1)'
                          e.currentTarget.style.boxShadow = 'none'
                        }}
                      >
                        <div className="w-full h-full rounded-xl flex items-center justify-center relative z-10 overflow-hidden" style={{ borderColor: color.border, borderWidth: '1px' }}>
                          <img src={company.logo} alt={company.name} className="w-full h-full object-cover" />
                        </div>
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-[1px]" style={{ background: 'linear-gradient(180deg, #000000 0%, #0a0a0a 50%, #1a1a1a 100%)' }}></div>
        <div className="slide-up relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm border border-purple-500/20" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
              <Star className="w-3.5 h-3.5" style={{ color: '#a855f7' }} />
              <span className="text-xs font-medium text-white/70 tracking-wide uppercase">Handpicked Programs</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-light mb-6 leading-tight tracking-tight">
              <span className="text-white">Featured</span> <span className="bg-gradient-to-r from-purple-300 to-purple-400 bg-clip-text text-transparent">Training Programs</span>
            </h2>
            <p className="text-lg max-w-2xl mx-auto text-white/50 font-light leading-relaxed">
              Discover industry-leading training programs designed to accelerate your career growth
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course, index) => (
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

                  <div className="flex items-center gap-4 text-xs text-white/40 pt-2 border-t border-white/5">
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

          <div className="text-center mt-16">
            <Link 
              href="/courses" 
              className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl backdrop-blur-sm border border-purple-400/40 transition-all duration-300 font-medium" 
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
              View All Courses
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Industry Insights */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-[1px]" style={{ background: 'linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 50%, #000000 100%)' }}></div>
        <div className="slide-up relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid grid-cols-5 gap-8">
            <div className="col-span-2 flex gap-6 items-end pr-0 max-w-[400px] self-end">
              {[
                { value: industryInsights.successRate, label: "Success Rate", desc: "Program completion rate", border: 'rgba(168,85,247,0.25)', tall: true },
                { value: industryInsights.averageCoursePrice, label: "Average Price", desc: "Course pricing", border: 'rgba(168,85,247,0.25)', tall: false },
              ].map((insight, index) => (
                <div 
                  key={index} 
                  className={`flex-1 rounded-3xl transition-all duration-500 flex flex-col items-center justify-center p-8 h-[300px]`} 
                  style={{
                    backgroundColor: 'rgba(0,0,0,0.3)', 
                    borderColor: insight.border, 
                    borderWidth: '1px'
                  }} 
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)'
                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.4), 0 0 20px rgba(196,181,253,0.2)'
                  }} 
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <span className={`font-light text-center leading-none block mb-6 ${insight.tall ? 'text-3xl lg:text-4xl' : 'text-2xl lg:text-3xl'}`} style={{ color: '#ffffff', letterSpacing: '-0.02em' }}>{insight.value}</span>
                  <h3 className={`font-medium mb-2 text-white text-center ${insight.tall ? 'text-base' : 'text-sm'}`} style={{ letterSpacing: '-0.01em' }}>{insight.label}</h3>
                  <p className={`text-white/40 text-center ${insight.tall ? 'text-xs' : 'text-xs'}`} style={{ lineHeight: '1.6', letterSpacing: '0.01em' }}>{insight.desc}</p>
                </div>
              ))}
            </div>
            
            <div className="col-span-1 text-center px-8 lg:px-12 flex flex-col items-center justify-center" style={{ height: '240px', alignSelf: 'center' }}>
              <h2 className="text-3xl lg:text-4xl font-light mb-4 whitespace-nowrap tracking-tight">
                <span className="text-white">Industry</span> <span className="bg-gradient-to-r from-purple-300 to-purple-400 bg-clip-text text-transparent">Insights</span>
              </h2>
              <p className="text-sm text-white/40 text-center whitespace-nowrap font-light leading-relaxed">
                Stay ahead with comprehensive analytics and market trends
              </p>
            </div>

            <div className="col-span-2 flex gap-6 items-end pl-0 max-w-[400px] ml-auto self-end">
              {[
                { value: industryInsights.placementRate, label: "Placement Rate", desc: "Job placement success", border: 'rgba(168,85,247,0.25)', tall: false },
                { value: industryInsights.marketGrowth, label: "Market Growth", desc: "Year over year", border: 'rgba(168,85,247,0.25)', tall: true },
              ].map((insight, index) => (
                <div 
                  key={index} 
                  className={`flex-1 rounded-3xl transition-all duration-500 flex flex-col items-center justify-center p-8 h-[300px]`} 
                  style={{
                    backgroundColor: 'rgba(0,0,0,0.3)', 
                    borderColor: insight.border, 
                    borderWidth: '1px'
                  }} 
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)'
                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.4), 0 0 20px rgba(196,181,253,0.2)'
                  }} 
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <span className={`font-light text-center leading-none block mb-6 ${insight.tall ? 'text-3xl lg:text-4xl' : 'text-2xl lg:text-3xl'}`} style={{ color: '#ffffff', letterSpacing: '-0.02em' }}>{insight.value}</span>
                  <h3 className={`font-medium mb-2 text-white text-center ${insight.tall ? 'text-base' : 'text-sm'}`} style={{ letterSpacing: '-0.01em' }}>{insight.label}</h3>
                  <p className={`text-white/40 text-center ${insight.tall ? 'text-xs' : 'text-xs'}`} style={{ lineHeight: '1.6', letterSpacing: '0.01em' }}>{insight.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-[1px]" style={{ background: 'linear-gradient(180deg, #000000 0%, #0a0a0a 50%, #1a1a1a 100%)' }}></div>
        <div className="slide-up relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-light mb-6 leading-tight tracking-tight">
              <span className="text-white">Ready to</span> <span className="bg-gradient-to-r from-purple-300 via-purple-200 to-purple-300 bg-clip-text text-transparent">Transform</span> <span className="text-white">Your Career?</span>
            </h2>
            <p className="text-lg mb-10 max-w-xl mx-auto text-white/50 font-light leading-relaxed">
              Join thousands of professionals who have accelerated their careers with our industry-leading training programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/courses" 
                className="px-8 py-3.5 rounded-2xl backdrop-blur-sm border border-purple-400/40 transition-all duration-300 font-medium" 
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
                Get Started Today
              </Link>
              <Link 
                href="/partners" 
                className="px-8 py-3.5 rounded-2xl transition-all duration-300 font-medium border border-white/10" 
                style={{ 
                  backgroundColor: 'rgba(255,255,255,0.05)', 
                  color: '#ffffff'
                }} 
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'
                }} 
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'
                }}
              >
                Explore Partners
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
