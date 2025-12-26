"use client"

import { useState, useEffect } from "react"
import { Search, MapPin, Building, Users, Calendar, ExternalLink, Mail, Phone, TrendingUp, Star, ChevronDown } from "lucide-react"
import Navbar from "../../src/components/Navbar"
import Link from "next/link"
import { industryPartners, industryStats, industryInsights } from "../../lib/industry-data"

export default function PartnersPage() {
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
  const [searchTerm, setSearchTerm] = useState("")
  const [industry, setIndustry] = useState("All Industries")
  const [location, setLocation] = useState("All Locations")

  // Get unique industries and locations for filters
  const industries = ["All Industries", ...new Set(industryPartners.map(partner => partner.industry))]
  const locations = ["All Locations", ...new Set(industryPartners.map(partner => partner.location.split(',')[0]))]

  // Filter partners based on search and filters
  const filteredPartners = industryPartners.filter((partner) => {
    const matchesSearch = partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.trainingPrograms.some(program => program.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesIndustry = industry === "All Industries" || partner.industry === industry
    const matchesLocation = location === "All Locations" || partner.location.includes(location)
    
    return matchesSearch && matchesIndustry && matchesLocation
  })

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: '#000000' }}>
      <Navbar />
      
      {/* Header */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-[1px]" style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 50%, #000000 100%)' }}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="slide-up inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 backdrop-blur-sm border border-purple-500/20" style={{ backgroundColor: 'rgba(168,85,247,0.08)', transitionDelay: '0.1s' }}>
              <Building className="w-4 h-4" style={{ color: '#a855f7' }} />
              <span className="text-sm font-medium text-white/80">Industry Partners</span>
            </div>
            <h1 className="slide-up text-5xl lg:text-6xl font-normal mb-6" style={{ transitionDelay: '0.2s' }}>
              <span className="text-white" style={{ textShadow: '0 0 20px rgba(255,255,255,0.3)' }}>Our</span> <span className="bg-gradient-to-r from-purple-300 via-purple-200 to-purple-300 bg-clip-text text-transparent" style={{ textShadow: '0 0 30px rgba(196,181,253,0.5), 0 0 60px rgba(196,181,253,0.3)' }}>Industry Partners</span>
            </h1>
            <p className="slide-up text-xl text-white/70 max-w-3xl mx-auto leading-relaxed" style={{ transitionDelay: '0.3s' }}>
              Connect with leading companies and access world-class training programs designed by industry experts
            </p>
          </div>

          {/* Statistics */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {[
              { icon: Building, value: industryStats.totalPartners, label: "Partner Companies", color: 'rgba(168,85,247,0.12)', border: 'rgba(168,85,247,0.25)', iconColor: '#c084fc' },
              { icon: Users, value: industryStats.totalStudents, label: "Students Trained", color: 'rgba(99,102,241,0.12)', border: 'rgba(99,102,241,0.25)', iconColor: '#818cf8' },
              { icon: TrendingUp, value: industryStats.totalCourses, label: "Training Programs", color: 'rgba(236,72,153,0.12)', border: 'rgba(236,72,153,0.25)', iconColor: '#f472b6' },
              { icon: Star, value: industryStats.averageRating, label: "Average Rating", color: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.25)', iconColor: '#a78bfa' },
            ].map((stat, index) => (
              <div key={index} className="slide-up text-center p-6 rounded-2xl transition-all duration-300" style={{ backgroundColor: stat.color, borderColor: stat.border, borderWidth: '1px', transitionDelay: `${0.4 + index * 0.1}s` }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 20px rgba(196,181,253,0.5), 0 0 40px rgba(196,181,253,0.3)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}>
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border" style={{ backgroundColor: stat.color.replace('0.12', '0.22'), borderColor: stat.border }}>
                  <stat.icon className="w-7 h-7" style={{ color: stat.iconColor }} />
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold mb-3 break-words bg-gradient-to-r from-purple-300 to-purple-400 bg-clip-text text-transparent">{stat.value}</h3>
                <p className="text-base break-words text-white/70" style={{ lineHeight: '1.6' }}>{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Search and Filters */}
          <div className="slide-up rounded-2xl p-6 mb-8 backdrop-blur-xl border border-purple-500/20" style={{ backgroundColor: 'rgba(168,85,247,0.08)', transitionDelay: '0.8s' }}>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50" size={20} />
                  <input
                    type="text"
                    placeholder="Search companies, industries, or locations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl backdrop-blur-sm border transition-all duration-300 text-white placeholder-white/40 focus:outline-none"
                    style={{ 
                      backgroundColor: 'rgba(168,85,247,0.08)',
                      borderColor: 'rgba(168,85,247,0.3)'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(168,85,247,0.6)'
                      e.currentTarget.style.backgroundColor = 'rgba(168,85,247,0.12)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(168,85,247,0.3)'
                      e.currentTarget.style.backgroundColor = 'rgba(168,85,247,0.08)'
                    }}
                  />
                </div>
              </div>
              <div className="relative">
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-4 py-3 pr-10 rounded-xl text-white focus:outline-none transition-all duration-300 backdrop-blur-xl border appearance-none cursor-pointer"
                  style={{ 
                    backgroundColor: 'rgba(168,85,247,0.12)',
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
                  {industries.map((ind) => (
                    <option key={ind} value={ind} style={{ backgroundColor: '#0a0a0a', color: '#ffffff' }}>{ind}</option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <ChevronDown className="w-5 h-5" style={{ color: '#c084fc' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="slide-up mb-8" style={{ transitionDelay: '0.9s' }}>
            <p className="text-white/70">
              {searchTerm && (
                <span style={{ color: '#c084fc' }}>
                  Search results for "{searchTerm}":{" "}
                </span>
              )}
              Showing {filteredPartners.length} of {industryPartners.length} partner companies
            </p>
          </div>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-[1px]" style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 50%, #000000 100%)' }}></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredPartners.map((partner, index) => (
              <Link
                key={partner.id}
                href={`/partners/${partner.id}`}
                className="slide-up group border border-purple-500/20 rounded-2xl p-6 transition-all duration-300 backdrop-blur-xl"
                style={{ 
                  backgroundColor: 'rgba(168,85,247,0.08)',
                  transitionDelay: `${0.1 + (index % 6) * 0.1}s`
                }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 20px rgba(196,181,253,0.5), 0 0 40px rgba(196,181,253,0.3)'}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm border border-purple-500/20" style={{ background: 'linear-gradient(to right, #a78bfa, #c084fc, #a78bfa)' }}>
                    <span className="text-white font-bold text-lg">{partner.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1 transition-colors">
                      {partner.name}
                    </h3>
                    <p className="text-white/70 text-sm flex items-center">
                      <Building size={14} className="mr-1" />
                      {partner.industry}
                    </p>
                    <p className="text-white/70 text-sm flex items-center">
                      <MapPin size={14} className="mr-1" />
                      {partner.location}
                    </p>
                  </div>
                </div>

                <p className="text-white/70 text-sm line-clamp-3 mb-4">
                  {partner.description}
                </p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    {partner.employeeCount && (
                      <span className="flex items-center text-white/70">
                        <Users size={16} className="mr-1" />
                        {partner.employeeCount.toLocaleString()} employees
                      </span>
                    )}
                    {partner.founded && (
                      <span className="flex items-center text-white/70">
                        <Calendar size={16} className="mr-1" />
                        Founded {partner.founded}
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-white/80">Training Programs:</h4>
                    <div className="flex flex-wrap gap-2">
                      {partner.trainingPrograms.slice(0, 3).map((program, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 rounded-full text-sm border border-purple-500/20"
                          style={{ backgroundColor: 'rgba(168,85,247,0.1)', color: '#ffffff' }}
                        >
                          {program}
                        </span>
                      ))}
                      {partner.trainingPrograms.length > 3 && (
                        <span className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: 'rgba(168,85,247,0.2)', color: '#c084fc' }}>
                          +{partner.trainingPrograms.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 pt-4 border-t border-purple-500/20">
                    <span className="flex items-center text-white/70">
                      <Mail size={16} className="mr-1" />
                      Contact
                    </span>
                    <span className="flex items-center text-white/70">
                      <ExternalLink size={16} className="mr-1" />
                      Website
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredPartners.length === 0 && (
            <div className="slide-up text-center py-12" style={{ transitionDelay: '0.1s' }}>
              <p className="text-white/70 text-lg mb-4">No partners found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearchTerm("")
                  setIndustry("All Industries")
                  setLocation("All Locations")
                }}
                className="px-6 py-3 rounded-xl transition-all duration-300 hover:opacity-90 backdrop-blur-sm border border-purple-400/40"
                style={{ background: 'linear-gradient(to right, #a78bfa, #c084fc, #a78bfa)', color: '#ffffff', boxShadow: '0 0 20px rgba(196,181,253,0.4), 0 0 40px rgba(196,181,253,0.2)' }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 25px rgba(196,181,253,0.6), 0 0 50px rgba(196,181,253,0.4)'}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 0 20px rgba(196,181,253,0.4), 0 0 40px rgba(196,181,253,0.2)'}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Industry Insights */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-[1px]" style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 50%, #000000 100%)' }}></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="slide-up inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 backdrop-blur-sm border border-purple-500/20" style={{ backgroundColor: 'rgba(168,85,247,0.08)', transitionDelay: '0.1s' }}>
              <TrendingUp className="w-4 h-4" style={{ color: '#a855f7' }} />
              <span className="text-sm font-medium text-white/80">Industry Analytics</span>
            </div>
            <h2 className="slide-up text-3xl lg:text-4xl font-normal mb-4" style={{ transitionDelay: '0.2s' }}>
              <span className="text-white" style={{ textShadow: '0 0 20px rgba(255,255,255,0.3)' }}>Industry</span> <span className="bg-gradient-to-r from-purple-300 to-purple-400 bg-clip-text text-transparent" style={{ textShadow: '0 0 30px rgba(196,181,253,0.5), 0 0 60px rgba(196,181,253,0.3)' }}>Insights</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-12">
            {/* Top Industries */}
            <div className="slide-up p-6 rounded-xl backdrop-blur-xl border border-purple-500/20 transition-all duration-300" style={{ backgroundColor: 'rgba(168,85,247,0.08)', transitionDelay: '0.3s' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 20px rgba(196,181,253,0.5), 0 0 40px rgba(196,181,253,0.3)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}>
              <h3 className="text-xl font-semibold mb-4 text-white">Top Industries</h3>
              <div className="space-y-3">
                {industryInsights.topIndustries.map((industry, index) => (
                  <div key={index} className="flex items-center justify-between py-2">
                    <span className="text-white/70">{industry.name}</span>
                    <span className="font-semibold" style={{ color: '#c084fc' }}>{industry.count} companies</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Locations */}
            <div className="slide-up p-6 rounded-xl backdrop-blur-xl border border-purple-500/20 transition-all duration-300" style={{ backgroundColor: 'rgba(168,85,247,0.08)', transitionDelay: '0.4s' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 20px rgba(196,181,253,0.5), 0 0 40px rgba(196,181,253,0.3)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}>
              <h3 className="text-xl font-semibold mb-4 text-white">Popular Locations</h3>
              <div className="space-y-3">
                {industryInsights.popularLocations.map((location, index) => (
                  <div key={index} className="flex items-center justify-between py-2">
                    <span className="text-white/70">{location.name}</span>
                    <span className="font-semibold" style={{ color: '#c084fc' }}>{location.count} companies</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Stats */}
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { value: industryInsights.averageCoursePrice, label: "Average Course Price", color: 'rgba(168,85,247,0.12)', border: 'rgba(168,85,247,0.25)' },
              { value: industryInsights.averageDuration, label: "Average Duration", color: 'rgba(99,102,241,0.12)', border: 'rgba(99,102,241,0.25)' },
              { value: industryInsights.successRate, label: "Success Rate", color: 'rgba(236,72,153,0.12)', border: 'rgba(236,72,153,0.25)' },
              { value: industryInsights.placementRate, label: "Placement Rate", color: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.25)' },
            ].map((stat, index) => (
              <div key={index} className="slide-up p-6 rounded-xl text-center transition-all duration-300 backdrop-blur-xl border" style={{ backgroundColor: stat.color, borderColor: stat.border, transitionDelay: `${0.5 + index * 0.1}s` }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 20px rgba(196,181,253,0.5), 0 0 40px rgba(196,181,253,0.3)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}>
                <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-300 to-purple-400 bg-clip-text text-transparent">{stat.value}</h3>
                <p className="text-white/70 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
