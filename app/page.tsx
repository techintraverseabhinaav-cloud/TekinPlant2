"use client"

import { useState, useEffect, useRef } from "react"
import { Inter } from "next/font/google"
import { Search, Star, Users, Clock, MapPin, ArrowRight, Sparkles, TrendingUp, Award } from "lucide-react"
import Navbar from "../src/components/Navbar"
import ThreeScene from "../components/ThreeScene"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { industryCourses, industryStats, industryInsights } from "../lib/industry-data"

const inter = Inter({ subsets: ["latin"] })

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()
  const featuredCourses = industryCourses.slice(0, 6)
  const popularSearches = ["PLC Training", "Automation", "Electrical Engineering", "Industrial Training", "Siemens", "ABB"]
  
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
      <section className="slide-up relative min-h-screen flex items-center py-32 overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-[1px]" style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 50%, #000000 100%)' }}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-8 backdrop-blur-sm border border-purple-500/20" style={{ backgroundColor: 'rgba(168,85,247,0.08)' }}>
              <Sparkles className="w-4 h-4" style={{ color: '#a855f7' }} />
              <span className="text-sm font-medium text-white/80">Leading Industry Training Platform</span>
              </div>
              
            <h1 className="text-6xl lg:text-7xl font-normal mb-8 leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-purple-300 via-purple-200 to-purple-300 bg-clip-text text-transparent" style={{ textShadow: '0 0 30px rgba(196,181,253,0.5), 0 0 60px rgba(196,181,253,0.3)' }}>Transform</span> <span className="text-white" style={{ textShadow: '0 0 20px rgba(255,255,255,0.3)' }}>Your Career with</span>
                <br />
              <span className="bg-gradient-to-r from-purple-300 via-purple-200 to-purple-300 bg-clip-text text-transparent" style={{ textShadow: '0 0 30px rgba(196,181,253,0.5), 0 0 60px rgba(196,181,253,0.3)' }}>Industry</span> <span className="text-white" style={{ textShadow: '0 0 20px rgba(255,255,255,0.3)' }}>Training</span>
              </h1>
              
            <p className="text-2xl mb-12 max-w-2xl mx-auto leading-relaxed text-white/70" style={{ lineHeight: '1.8' }}>
                Connect with leading companies, master cutting-edge technologies, and accelerate your professional growth with our comprehensive training programs.
              </p>

              {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
                <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white/50" size={24} />
                      <input
                        type="text"
                    placeholder="Search for courses, companies, or skills..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-32 py-5 backdrop-blur-xl rounded-2xl transition-all duration-300 text-lg border border-purple-500/20"
                  style={{ backgroundColor: 'rgba(168,85,247,0.08)', color: '#ffffff' }}
                  />
                  <button 
                    type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2.5 rounded-xl transition-all duration-300 hover:opacity-90 backdrop-blur-sm border border-purple-400/40"
                  style={{ background: 'linear-gradient(to right, #a78bfa, #c084fc, #a78bfa)', color: '#ffffff', boxShadow: '0 0 20px rgba(196,181,253,0.4), 0 0 40px rgba(196,181,253,0.2)' }}
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 25px rgba(196,181,253,0.6), 0 0 50px rgba(196,181,253,0.4)'}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 0 20px rgba(196,181,253,0.4), 0 0 40px rgba(196,181,253,0.2)'}
                  >
                    Search
                  </button>
                </form>
              </div>

              {/* Popular Searches */}
              <div className="mb-8">
              <p className="text-base mb-4 text-white/60">Popular searches:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                  {popularSearches.map((term, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickSearch(term)}
                    className="px-4 py-2 rounded-full text-base transition-all duration-300 backdrop-blur-sm border border-purple-500/20 hover:border-purple-400/40"
                    style={{ backgroundColor: 'rgba(168,85,247,0.08)', color: '#ffffff' }}
                    onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 20px rgba(196,181,253,0.5), 0 0 40px rgba(196,181,253,0.3)'}
                    onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/courses" className="text-lg px-8 py-4 rounded-2xl flex items-center gap-2 group w-fit transition-all duration-300 hover:opacity-90 backdrop-blur-sm border border-purple-400/40" style={{ background: 'linear-gradient(to right, #a78bfa, #c084fc, #a78bfa)', color: '#ffffff', boxShadow: '0 0 20px rgba(196,181,253,0.4), 0 0 40px rgba(196,181,253,0.2)' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 25px rgba(196,181,253,0.6), 0 0 50px rgba(196,181,253,0.4)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 0 20px rgba(196,181,253,0.4), 0 0 40px rgba(196,181,253,0.2)'}>
                  Explore Courses
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              <Link href="/partners" className="text-lg px-8 py-4 rounded-2xl flex items-center gap-2 transition-all duration-300 w-fit backdrop-blur-sm border border-purple-500/20 hover:border-purple-400/40" style={{ backgroundColor: 'rgba(168,85,247,0.08)', color: '#ffffff' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 20px rgba(196,181,253,0.5), 0 0 40px rgba(196,181,253,0.3)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}>
                  Watch Demo
                </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="slide-up py-20 relative overflow-hidden" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Users, value: industryStats.totalStudents.toLocaleString(), label: "Students Trained", color: 'rgba(168,85,247,0.12)', border: 'rgba(168,85,247,0.25)', iconColor: '#c084fc' },
              { icon: TrendingUp, value: industryStats.totalCourses, label: "Training Programs", color: 'rgba(99,102,241,0.12)', border: 'rgba(99,102,241,0.25)', iconColor: '#818cf8' },
              { icon: Award, value: industryStats.totalPartners, label: "Partner Companies", color: 'rgba(236,72,153,0.12)', border: 'rgba(236,72,153,0.25)', iconColor: '#f472b6' },
              { icon: Star, value: industryStats.averageRating, label: "Average Rating", color: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.25)', iconColor: '#a78bfa' },
            ].map((stat, index) => (
              <div key={index} className="text-center hover-lift p-6 rounded-2xl transition-all duration-300" style={{ backgroundColor: stat.color, borderColor: stat.border, borderWidth: '1px' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 20px rgba(196,181,253,0.5), 0 0 40px rgba(196,181,253,0.3)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}>
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: stat.color.replace('0.12', '0.22'), borderColor: stat.border, borderWidth: '1px' }}>
                  <stat.icon className="w-7 h-7" style={{ color: stat.iconColor }} />
              </div>
                <h3 className="text-2xl lg:text-3xl font-bold mb-3 break-words bg-gradient-to-r from-purple-300 to-purple-400 bg-clip-text text-transparent">{stat.value}</h3>
                <p className="text-base break-words text-white/70" style={{ lineHeight: '1.6' }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Companies Section */}
      <section className="slide-right py-16 relative overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-[1px]" style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 50%, #000000 100%)' }}></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-normal mb-4">
                <span className="text-white" style={{ textShadow: '0 0 20px rgba(255,255,255,0.3)' }}>Trusted by</span> <span className="bg-gradient-to-r from-purple-300 to-purple-400 bg-clip-text text-transparent" style={{ textShadow: '0 0 30px rgba(196,181,253,0.5), 0 0 60px rgba(196,181,253,0.3)' }}>Leading Companies</span>
            </h2>
              <p className="text-xl lg:text-2xl text-white/70" style={{ lineHeight: '1.7' }}>Partner with industry leaders for world-class training</p>
            </div>
            
            <div className="flex flex-col gap-4 items-end -mr-4 sm:-mr-6 lg:-mr-8">
              {[
                [{ name: "Siemens", logo: "/leading-company-logos/siemens.png", index: 0 }],
                [{ name: "ABB", logo: "/leading-company-logos/abb.png", index: 1 }, { name: "Rockwell", logo: "/leading-company-logos/rockwell.png", index: 2 }],
                [{ name: "Emerson", logo: "/leading-company-logos/emerson.png", index: 3 }, { name: "Honeywell", logo: "/leading-company-logos/honeywell.png", index: 4 }, { name: "FANUC", logo: "/leading-company-logos/fanuc.png", index: 5 }]
              ].map((row, rowIndex) => (
                <div key={rowIndex} className="flex gap-4 justify-end">
                  {row.map((company) => {
                    const colors = [
                      { bg: 'rgba(168,85,247,0.12)', border: 'rgba(168,85,247,0.25)', inner: 'rgba(168,85,247,0.22)' },
                      { bg: 'rgba(99,102,241,0.12)', border: 'rgba(99,102,241,0.25)', inner: 'rgba(99,102,241,0.22)' },
                      { bg: 'rgba(236,72,153,0.12)', border: 'rgba(236,72,153,0.25)', inner: 'rgba(236,72,153,0.22)' },
                      { bg: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.25)', inner: 'rgba(139,92,246,0.22)' },
                      { bg: 'rgba(79,70,229,0.12)', border: 'rgba(79,70,229,0.25)', inner: 'rgba(79,70,229,0.22)' },
                      { bg: 'rgba(192,132,252,0.12)', border: 'rgba(192,132,252,0.25)', inner: 'rgba(192,132,252,0.22)' },
                    ]
                    const color = colors[company.index % 6]
                    return (
                      <div key={company.index} className="hover-lift p-2 flex items-center justify-center w-32 h-32 rounded-2xl transition-all duration-300 relative" style={{ backgroundColor: color.bg, borderColor: color.border, borderWidth: '1px' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 25px rgba(196,181,253,0.6), 0 0 50px rgba(196,181,253,0.4), inset 0 0 25px rgba(196,181,253,0.2)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}>
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
      <section className="slide-up py-20 relative overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-[1px]" style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 50%, #000000 100%)' }}></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 backdrop-blur-sm border border-purple-500/20" style={{ backgroundColor: 'rgba(168,85,247,0.08)' }}>
              <Star className="w-4 h-4" style={{ color: '#a855f7' }} />
              <span className="text-base font-medium text-white/80">Handpicked Programs</span>
                    </div>
            <h2 className="text-4xl lg:text-5xl font-normal mb-6">
              <span className="text-white" style={{ textShadow: '0 0 20px rgba(255,255,255,0.3)' }}>Featured</span> <span className="bg-gradient-to-r from-purple-300 to-purple-400 bg-clip-text text-transparent" style={{ textShadow: '0 0 30px rgba(196,181,253,0.5), 0 0 60px rgba(196,181,253,0.3)' }}>Training Programs</span>
            </h2>
            <p className="text-xl max-w-3xl mx-auto text-white/70" style={{ lineHeight: '1.8' }}>
              Discover industry-leading training programs designed to accelerate your career growth
                      </p>
                    </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course, index) => (
              <div key={course.id} className="hover-lift animate-fade-in-scale group border border-purple-500/20 rounded-2xl p-6 transition-all duration-300" style={{ animationDelay: `${index * 0.1}s`, backgroundColor: 'rgba(168,85,247,0.05)' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 20px rgba(196,181,253,0.5), 0 0 40px rgba(196,181,253,0.3)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}>
                <div className="aspect-video rounded-xl overflow-hidden mb-6 relative bg-black/20">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm bg-black/50 border border-purple-500/20" style={{ color: '#fbbf24' }}>
                      ⭐ {course.rating}
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
                    <span className="px-3 py-1 rounded-full text-base font-medium border border-purple-500/20" style={{ backgroundColor: 'rgba(168,85,247,0.1)', color: '#ffffff' }}>
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
                    <Link href={`/courses/${course.id}`} className="text-base px-5 py-2.5 rounded-xl hover:opacity-90 backdrop-blur-sm border border-purple-400/40 transition-all duration-300" style={{ background: 'linear-gradient(to right, #a78bfa, #c084fc, #a78bfa)', color: '#ffffff', boxShadow: '0 0 15px rgba(196,181,253,0.4), 0 0 30px rgba(196,181,253,0.2)' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 20px rgba(196,181,253,0.6), 0 0 40px rgba(196,181,253,0.4)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 0 15px rgba(196,181,253,0.4), 0 0 30px rgba(196,181,253,0.2)'}>
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/courses" className="text-lg px-8 py-4 rounded-2xl inline-flex items-center gap-2 hover:opacity-90 backdrop-blur-sm border border-purple-400/40 transition-all duration-300" style={{ background: 'linear-gradient(to right, #a78bfa, #c084fc, #a78bfa)', color: '#ffffff', boxShadow: '0 0 20px rgba(196,181,253,0.4), 0 0 40px rgba(196,181,253,0.2)' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 25px rgba(196,181,253,0.6), 0 0 50px rgba(196,181,253,0.4)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 0 20px rgba(196,181,253,0.4), 0 0 40px rgba(196,181,253,0.2)'}>
              View All Courses
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Industry Insights */}
      <section className="slide-up py-20 relative" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="max-w-7xl mx-auto px-0">
          <div className="grid grid-cols-5 gap-0">
            <div className="col-span-2 flex gap-4 items-end pr-0 max-w-[380px] self-end">
              {[
                { value: industryInsights.successRate, label: "Success Rate", desc: "Program completion rate", color: 'rgba(168,85,247,0.12)', border: 'rgba(168,85,247,0.25)', inner: 'rgba(221,201,255,0.22)', tall: true },
                { value: industryInsights.averageCoursePrice, label: "Average Price", desc: "Course pricing", color: 'rgba(99,102,241,0.12)', border: 'rgba(99,102,241,0.25)', inner: 'rgba(221,201,255,0.22)', tall: false },
              ].map((insight, index) => (
                <div key={index} className={`flex-1 hover-lift rounded-3xl transition-all duration-500 flex flex-col items-center justify-center p-8 ${insight.tall ? 'h-[320px]' : 'h-[240px]'}`} style={{
                  backgroundColor: insight.color, 
                  borderColor: insight.border, 
                  borderWidth: '1px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.2), 0 0 15px rgba(196,181,253,0.15), inset 0 1px 0 rgba(255,255,255,0.05)'
                }} onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.3), 0 0 25px rgba(196,181,253,0.3), inset 0 1px 0 rgba(255,255,255,0.08)'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2), 0 0 15px rgba(196,181,253,0.15), inset 0 1px 0 rgba(255,255,255,0.05)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}>
                  <span className={`font-bold text-center leading-none block mb-5 ${insight.tall ? 'text-2xl lg:text-3xl' : 'text-xl lg:text-2xl'}`} style={{ color: '#ffffff', letterSpacing: '-0.02em' }}>{insight.value}</span>
                  <h3 className={`font-semibold mb-2 text-white text-center ${insight.tall ? 'text-lg' : 'text-base'}`} style={{ letterSpacing: '-0.01em' }}>{insight.label}</h3>
                  <p className={`text-white/60 text-center ${insight.tall ? 'text-sm' : 'text-xs'}`} style={{ lineHeight: '1.6', letterSpacing: '0.01em' }}>{insight.desc}</p>
                </div>
              ))}
            </div>
            
            <div className="col-span-1 text-center px-12 lg:px-20 flex flex-col items-center justify-center" style={{ height: '240px', alignSelf: 'center' }}>
              <h2 className="text-3xl lg:text-4xl font-normal mb-4 whitespace-nowrap">
                <span className="text-white" style={{ textShadow: '0 0 20px rgba(255,255,255,0.3)' }}>Industry</span> <span className="bg-gradient-to-r from-purple-300 to-purple-400 bg-clip-text text-transparent" style={{ textShadow: '0 0 30px rgba(196,181,253,0.5), 0 0 60px rgba(196,181,253,0.3)' }}>Insights</span>
              </h2>
              <p className="text-base text-white/70 text-center whitespace-nowrap" style={{ lineHeight: '1.8' }}>
                Stay ahead with comprehensive analytics and market trends
              </p>
            </div>

            <div className="col-span-2 flex gap-4 items-end pl-0 max-w-[380px] ml-auto self-end">
              {[
                { value: industryInsights.placementRate, label: "Placement Rate", desc: "Job placement success", color: 'rgba(236,72,153,0.12)', border: 'rgba(236,72,153,0.25)', inner: 'rgba(221,201,255,0.22)', tall: false },
                { value: industryInsights.marketGrowth, label: "Market Growth", desc: "Year over year", color: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.25)', inner: 'rgba(221,201,255,0.22)', tall: true },
              ].map((insight, index) => (
                <div key={index} className={`flex-1 hover-lift rounded-3xl transition-all duration-500 flex flex-col items-center justify-center p-8 ${insight.tall ? 'h-[320px]' : 'h-[240px]'}`} style={{
                  backgroundColor: insight.color, 
                  borderColor: insight.border, 
                  borderWidth: '1px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.2), 0 0 15px rgba(196,181,253,0.15), inset 0 1px 0 rgba(255,255,255,0.05)'
                }} onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.3), 0 0 25px rgba(196,181,253,0.3), inset 0 1px 0 rgba(255,255,255,0.08)'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2), 0 0 15px rgba(196,181,253,0.15), inset 0 1px 0 rgba(255,255,255,0.05)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}>
                  <span className={`font-bold text-center leading-none block mb-5 ${insight.tall ? 'text-2xl lg:text-3xl' : 'text-xl lg:text-2xl'}`} style={{ color: '#ffffff', letterSpacing: '-0.02em' }}>{insight.value}</span>
                  <h3 className={`font-semibold mb-2 text-white text-center ${insight.tall ? 'text-lg' : 'text-base'}`} style={{ letterSpacing: '-0.01em' }}>{insight.label}</h3>
                  <p className={`text-white/60 text-center ${insight.tall ? 'text-sm' : 'text-xs'}`} style={{ lineHeight: '1.6', letterSpacing: '0.01em' }}>{insight.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="slide-up py-12 pt-32 relative overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-[1px]" style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 50%, #000000 100%)' }}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-normal mb-4">
                <span className="text-white" style={{ textShadow: '0 0 20px rgba(255,255,255,0.3)' }}>Ready to</span> <span className="bg-gradient-to-r from-purple-300 via-purple-200 to-purple-300 bg-clip-text text-transparent" style={{ textShadow: '0 0 30px rgba(196,181,253,0.5), 0 0 60px rgba(196,181,253,0.3)' }}>Transform</span> <span className="text-white" style={{ textShadow: '0 0 20px rgba(255,255,255,0.3)' }}>Your Career?</span>
            </h2>
              <p className="text-lg max-w-xl" style={{ lineHeight: '1.8', color: '#CBD5E0' }}>
              Join thousands of professionals who have accelerated their careers with our industry-leading training programs.
            </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <Link href="/courses" className="text-base px-7 py-3 rounded-2xl hover:opacity-90 transition-all duration-300 backdrop-blur-sm border border-purple-400/40" style={{ background: 'linear-gradient(to right, #a78bfa, #c084fc, #a78bfa)', color: '#ffffff', boxShadow: '0 0 20px rgba(196,181,253,0.4), 0 0 40px rgba(196,181,253,0.2)' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 25px rgba(196,181,253,0.6), 0 0 50px rgba(196,181,253,0.4)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 0 20px rgba(196,181,253,0.4), 0 0 40px rgba(196,181,253,0.2)'}>
                Get Started Today
              </Link>
              <Link href="/partners" className="text-base px-7 py-3 rounded-2xl transition-all duration-300" style={{ backgroundColor: '#E0E0E0', color: '#6b21a8' }} onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.9'
              }} onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1'
              }}>
                Explore Partners
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
