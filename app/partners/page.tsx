"use client"

import { useState, useEffect, useLayoutEffect } from "react"
import { Search, MapPin, Building, Users, Calendar, ExternalLink, Mail, Phone, TrendingUp, Star, ChevronDown } from "lucide-react"
import Navbar from "../../src/components/Navbar"
import Link from "next/link"
import { industryPartners, industryStats, industryInsights } from "../../lib/industry-data"
import { useTheme } from "next-themes"
import { useThemeStyles } from "../../lib/theme-styles"

// Helper function to get logo path from company name
const getCompanyLogo = (companyName: string): string | null => {
  const logoMap: { [key: string]: string } = {
    "Siemens": "siemens.png",
    "ABB": "abb.png",
    "Rockwell Automation": "rockwell.png",
    "Emerson": "emerson.png",
    "Schneider Electric": "schneider.png",
    "Honeywell": "honeywell.png",
    "Yokogawa": "yokogawa.png",
    "FANUC": "fanuc.png",
    "Bosch": "bosch.png",
    "Danfoss": "danfoss.png",
    "Cisco": "cisco.png",
    "SAP": "SAP.png",
    "Google Cloud": "googlecloud.png",
    "Microsoft": "microsoft.png",
    "Fortinet": "fortinet.png",
    "TATA Consultancy Services": "tataconsultancyservices.png",
    "Infosys": "Infosys.png",
    "Wipro": "wipro.png",
    "L&T": "L&T.png",
    "Suzlon": "Suzlon.png",
    "BHEL": "BHEL.png",
    "TATA Motors": "tata.png",
    "Mahindra & Mahindra": "mahindra&mahindra.png",
    "Maruti Suzuki": "marutisuzuki.png",
    "Ashok Leyland": "ashokleyland.png"
  }
  
  return logoMap[companyName] || null
}

// Component for company logo with fallback
const CompanyLogo = ({ companyName, isDark }: { companyName: string; isDark: boolean }) => {
  const [imageError, setImageError] = useState(false)
  const logoPath = getCompanyLogo(companyName)
  
  if (!logoPath || imageError) {
    return (
      <span className={`font-bold text-lg ${isDark ? 'text-white' : 'text-purple-900'}`}>{companyName.charAt(0)}</span>
    )
  }
  
  return (
    <img
      src={`/leading-company-logos/${logoPath}`}
      alt={companyName}
      className="w-full h-full object-cover"
      onError={() => setImageError(true)}
    />
  )
}

export default function PartnersPage() {
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
        theme = savedTheme // 'dark' or 'light'
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
  
  // Update theme when resolvedTheme changes (from next-themes)
  useLayoutEffect(() => {
    if (resolvedTheme) {
      setIsDark(resolvedTheme === 'dark')
    } else if (typeof window !== 'undefined') {
      // Fallback to reading from HTML if resolvedTheme not available yet
      const dataTheme = document.documentElement.getAttribute('data-theme')
      const htmlClass = document.documentElement.className
      setIsDark(!(dataTheme === 'light' || htmlClass === 'light'))
    }
  }, [resolvedTheme])
  
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
        
        <div className="slide-up relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center mb-16">
            <div className="slide-up inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm border" suppressHydrationWarning style={{ 
              backgroundColor: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.7)',
              borderColor: isDark ? 'rgba(168,85,247,0.2)' : 'rgba(139,90,43,0.25)',
              transitionDelay: '0.1s' 
            }}>
              <Building className="w-3.5 h-3.5" suppressHydrationWarning style={{ color: isDark ? '#a855f7' : '#a78bfa' }} />
              <span className={`text-xs font-medium tracking-wide uppercase ${isDark ? 'text-white/70' : 'text-purple-900/80'}`}>Industry Partners</span>
            </div>
            <h1 className="slide-up text-5xl sm:text-6xl lg:text-7xl font-light mb-6 leading-tight tracking-tight" style={{ transitionDelay: '0.2s' }}>
              <span style={{ color: themeStyles.textPrimary }}>Our</span> <span className={`bg-clip-text text-transparent ${
                isDark 
                  ? 'bg-gradient-to-r from-purple-300 via-purple-200 to-purple-300' 
                  : 'bg-gradient-to-r from-purple-800 via-purple-700 to-purple-800'
              }`}>Industry Partners</span>
            </h1>
            <p className="slide-up text-lg sm:text-xl max-w-3xl mx-auto mb-16 font-light leading-relaxed" style={{ 
              transitionDelay: '0.3s',
              color: themeStyles.textSecondary,
              opacity: isDark ? 0.5 : 0.8
            }}>
              Connect with leading companies and access world-class training programs designed by industry experts
            </p>

            {/* Statistics */}
            <div className="grid md:grid-cols-4 gap-6 lg:gap-8 mb-16">
              {[
                { icon: "/Icons/building.png", value: industryStats.totalPartners, label: "Partner Companies" },
                { icon: "/Icons/students.png", value: industryStats.totalStudents, label: "Students Trained" },
                { icon: "/Icons/growth.png", value: industryStats.totalCourses, label: "Training Programs" },
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
                >
                  <div
                    className="flash-card-inner"
                  >
                    {/* Front of card - Icon only */}
                    <div
                      className="flash-card-face flash-card-front rounded-2xl"
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
                      >
                        {stat.value}
                      </div>

                      {/* Label */}
                      <p
                        className={`text-sm sm:text-base text-center font-light ${textColor}`}
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
            <div className="slide-up rounded-2xl p-8 mb-8 backdrop-blur-xl border" style={{ 
              backgroundColor: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.8)',
              borderColor: isDark ? 'rgba(168,85,247,0.2)' : 'rgba(139,90,43,0.3)',
              transitionDelay: '0.8s' 
            }}>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className={`absolute left-5 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-white/40' : 'text-purple-900/50'}`} size={18} />
                    <input
                      type="text"
                      placeholder="Search companies, industries, or locations..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      suppressHydrationWarning
                      className={`w-full pl-14 pr-6 py-3.5 rounded-xl backdrop-blur-sm border transition-all duration-300 focus:outline-none focus:ring-2 font-light ${
                        isDark ? 'text-white placeholder-white/30 focus:ring-purple-500/50' : 'text-purple-900 placeholder-purple-900/50 focus:ring-purple-800/50'
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
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    suppressHydrationWarning
                    className={`w-full px-5 py-3.5 pr-10 rounded-xl focus:outline-none transition-all duration-300 backdrop-blur-xl border appearance-none cursor-pointer font-light ${
                      isDark ? 'text-white' : 'text-purple-900'
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
                    {industries.map((ind) => (
                      <option key={ind} value={ind} style={{ 
                        backgroundColor: isDark ? '#0a0a0a' : '#ffffff', 
                        color: isDark ? '#ffffff' : '#3a2e1f' 
                      }}>{ind}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <ChevronDown className="w-4 h-4" suppressHydrationWarning style={{ color: isDark ? '#c084fc' : '#a78bfa' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="slide-up mb-8" suppressHydrationWarning style={{ transitionDelay: '0.9s' }}>
              <p className={`text-sm font-light ${isDark ? 'text-white/40' : 'text-purple-900/60'}`}>
                {searchTerm && (
                  <span suppressHydrationWarning style={{ color: isDark ? '#c084fc' : '#a78bfa' }}>
                    Search results for "{searchTerm}":{" "}
                  </span>
                )}
                Showing <span className={isDark ? 'text-white/60' : 'text-purple-900/70'}>{filteredPartners.length}</span> of <span className={isDark ? 'text-white/60' : 'text-purple-900/70'}>{industryPartners.length}</span> partner companies
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="pt-8 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-[1px]" style={{ background: themeStyles.pageBgGradient }}></div>
        <div className="slide-up relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPartners.map((partner, index) => {
              const cardBg = isDark ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.8)'
              const cardBorder = isDark ? 'rgba(168,85,247,0.2)' : 'rgba(139,90,43,0.3)'
              const logoBg = isDark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.9)'
              const logoBorder = isDark ? 'rgba(168,85,247,0.25)' : 'rgba(139,90,43,0.3)'
              const hoverShadow = isDark
                ? '0 12px 24px rgba(0,0,0,0.4), 0 0 20px rgba(196,181,253,0.2)'
                : '0 12px 24px rgba(58,46,31,0.2), 0 0 20px rgba(139,90,43,0.25)'
              
              return (
              <Link
                key={partner.id}
                href={`/partners/${partner.id}`}
                className="group border rounded-2xl overflow-hidden transition-all duration-500"
                style={{ 
                  backgroundColor: cardBg,
                  borderColor: cardBorder,
                  transitionDelay: `${0.1 + (index % 6) * 0.1}s`
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
                <div className="p-6 space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 p-0.5 flex-shrink-0 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300" style={{ 
                      backgroundColor: logoBg, 
                      borderColor: logoBorder, 
                      borderWidth: '1px' 
                    }}>
                      <div className="w-full h-full rounded-lg flex items-center justify-center overflow-hidden" style={{ 
                        borderColor: logoBorder, 
                        borderWidth: '1px', 
                        backgroundColor: '#ffffff' 
                      }}>
                        <CompanyLogo companyName={partner.name} isDark={isDark} />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`text-xl font-light mb-2 leading-tight ${isDark ? 'text-white' : 'text-purple-900'}`}>
                        {partner.name}
                      </h3>
                      <div className="space-y-1">
                        <p className={`text-sm flex items-center font-light ${isDark ? 'text-white/50' : 'text-purple-900/70'}`}>
                          <Building size={12} className="mr-1.5" />
                          {partner.industry}
                        </p>
                        <p className={`text-sm flex items-center font-light ${isDark ? 'text-white/50' : 'text-purple-900/70'}`}>
                          <MapPin size={12} className="mr-1.5" />
                          {partner.location}
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className={`text-sm line-clamp-2 leading-relaxed font-light ${isDark ? 'text-white/50' : 'text-purple-900/70'}`}>
                    {partner.description}
                  </p>

                  <div className={`flex items-center gap-4 text-xs pt-3 border-t ${isDark ? 'text-white/40 border-white/5' : 'text-purple-900/60 border-purple-900/10'}`}>
                    {partner.employeeCount && (
                      <span className="flex items-center gap-1.5">
                        <Users size={12} />
                        <span>{partner.employeeCount.toLocaleString('en-US')}</span>
                      </span>
                    )}
                    {partner.founded && (
                      <span className="flex items-center gap-1.5">
                        <Calendar size={12} />
                        <span>{partner.founded}</span>
                      </span>
                    )}
                  </div>

                  <div className="space-y-3 pt-2">
                    <h4 className={`text-xs font-medium uppercase tracking-wide ${isDark ? 'text-white/60' : 'text-purple-900/70'}`}>Training Programs</h4>
                    <div className="flex flex-wrap gap-2">
                      {partner.trainingPrograms.slice(0, 3).map((program, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 rounded-full text-xs border font-light"
                          style={{ 
                            backgroundColor: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.9)', 
                            borderColor: isDark ? 'rgba(168,85,247,0.2)' : 'rgba(139,90,43,0.3)',
                            color: themeStyles.textPrimary
                          }}
                        >
                          {program}
                        </span>
                      ))}
                      {partner.trainingPrograms.length > 3 && (
                        <span className={`px-3 py-1 rounded-full text-xs font-light ${isDark ? 'text-purple-400' : 'text-purple-800'}`} style={{ 
                          backgroundColor: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.9)' 
                        }}>
                          +{partner.trainingPrograms.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className={`flex items-center gap-6 pt-4 border-t ${isDark ? 'border-white/5' : 'border-purple-900/10'}`}>
                    <span className={`flex items-center gap-1.5 text-xs font-light ${isDark ? 'text-white/40' : 'text-purple-900/60'}`}>
                      <Mail size={12} />
                      Contact
                    </span>
                    <span className={`flex items-center gap-1.5 text-xs font-light ${isDark ? 'text-white/40' : 'text-purple-900/60'}`}>
                      <ExternalLink size={12} />
                      Website
                    </span>
                  </div>
                </div>
              </Link>
              )
            })}
          </div>

          {filteredPartners.length === 0 && (
            <div className="text-center py-24">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 backdrop-blur-sm border" style={{ 
                backgroundColor: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.7)',
                borderColor: isDark ? 'rgba(168,85,247,0.2)' : 'rgba(139,90,43,0.3)'
              }}>
                <Search className={`w-10 h-10 ${isDark ? 'text-white/40' : 'text-purple-900/50'}`} />
              </div>
              <h3 className={`text-2xl font-light mb-4 ${isDark ? 'text-white' : 'text-purple-900'}`}>
                No partners found matching your criteria
              </h3>
              <p className={`mb-10 font-light ${isDark ? 'text-white/50' : 'text-purple-900/70'}`}>
                Try adjusting your search terms or filters
              </p>
              <button
                onClick={() => {
                  setSearchTerm("")
                  setIndustry("All Industries")
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
            </div>
          )}
        </div>
      </section>

      {/* Industry Insights */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-[1px]" style={{ background: themeStyles.pageBgGradient }}></div>
        <div className="slide-up relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center mb-16">
            <div className="slide-up inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm border" suppressHydrationWarning style={{ 
              backgroundColor: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.7)',
              borderColor: isDark ? 'rgba(168,85,247,0.2)' : 'rgba(139,90,43,0.25)',
              transitionDelay: '0.1s' 
            }}>
              <TrendingUp className="w-3.5 h-3.5" suppressHydrationWarning style={{ color: isDark ? '#a855f7' : '#a78bfa' }} />
              <span className={`text-xs font-medium tracking-wide uppercase ${isDark ? 'text-white/70' : 'text-purple-900/80'}`}>Industry Analytics</span>
            </div>
            <h2 className="slide-up text-4xl lg:text-5xl font-light mb-6 leading-tight tracking-tight" style={{ transitionDelay: '0.2s' }}>
              <span style={{ color: themeStyles.textPrimary }}>Industry</span> <span className={`bg-clip-text text-transparent ${
                isDark 
                  ? 'bg-gradient-to-r from-purple-300 to-purple-400' 
                  : 'bg-gradient-to-r from-purple-800 to-purple-700'
              }`}>Insights</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Top Industries */}
            <div 
              className="slide-up p-8 rounded-2xl backdrop-blur-xl border transition-all duration-500" 
              style={{ 
                backgroundColor: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.8)',
                borderColor: isDark ? 'rgba(168,85,247,0.2)' : 'rgba(139,90,43,0.3)',
                transitionDelay: '0.3s' 
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = isDark
                  ? '0 12px 24px rgba(0,0,0,0.4), 0 0 20px rgba(196,181,253,0.2)'
                  : '0 12px 24px rgba(58,46,31,0.2), 0 0 20px rgba(139,90,43,0.25)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <h3 className={`text-lg font-medium mb-6 ${isDark ? 'text-white' : 'text-purple-900'}`}>Top Industries</h3>
              <div className="space-y-4">
                {industryInsights.topIndustries.map((industry, index) => (
                  <div key={index} className={`flex items-center justify-between py-2 border-b last:border-0 ${isDark ? 'border-white/5' : 'border-purple-900/10'}`}>
                    <span className={`font-light ${isDark ? 'text-white/60' : 'text-purple-900/70'}`}>{industry.name}</span>
                    <span className={`font-medium ${isDark ? 'text-purple-400' : 'text-purple-800'}`}>{industry.count} companies</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Locations */}
            <div 
              className="slide-up p-8 rounded-2xl backdrop-blur-xl border transition-all duration-500" 
              style={{ 
                backgroundColor: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.8)',
                borderColor: isDark ? 'rgba(168,85,247,0.2)' : 'rgba(139,90,43,0.3)',
                transitionDelay: '0.4s' 
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = isDark
                  ? '0 12px 24px rgba(0,0,0,0.4), 0 0 20px rgba(196,181,253,0.2)'
                  : '0 12px 24px rgba(58,46,31,0.2), 0 0 20px rgba(139,90,43,0.25)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <h3 className={`text-lg font-medium mb-6 ${isDark ? 'text-white' : 'text-purple-900'}`}>Popular Locations</h3>
              <div className="space-y-4">
                {industryInsights.popularLocations.map((location, index) => (
                  <div key={index} className={`flex items-center justify-between py-2 border-b last:border-0 ${isDark ? 'border-white/5' : 'border-purple-900/10'}`}>
                    <span className={`font-light ${isDark ? 'text-white/60' : 'text-purple-900/70'}`}>{location.name}</span>
                    <span className={`font-medium ${isDark ? 'text-purple-400' : 'text-purple-800'}`}>{location.count} companies</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Stats */}
          <div className="grid md:grid-cols-4 gap-6 lg:gap-8">
            {[
              { value: industryInsights.averageCoursePrice, label: "Average Course Price" },
              { value: industryInsights.averageDuration, label: "Average Duration" },
              { value: industryInsights.successRate, label: "Success Rate" },
              { value: industryInsights.placementRate, label: "Placement Rate" },
            ].map((stat, index) => {
              const statBorder = isDark ? 'rgba(168,85,247,0.25)' : 'rgba(139,90,43,0.3)'
              const statBg = isDark ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.8)'
              const hoverShadow = isDark
                ? '0 12px 24px rgba(0,0,0,0.4), 0 0 20px rgba(196,181,253,0.2)'
                : '0 12px 24px rgba(58,46,31,0.2), 0 0 20px rgba(139,90,43,0.25)'
              
              return (
              <div 
                key={index} 
                className="slide-up p-8 rounded-2xl text-center transition-all duration-500 backdrop-blur-xl border" 
                style={{ 
                  backgroundColor: statBg, 
                  borderColor: statBorder,
                  transitionDelay: `${0.5 + index * 0.1}s`
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
                <h3 className={`text-3xl font-light mb-2 tracking-tight bg-clip-text text-transparent ${
                  isDark 
                    ? 'bg-gradient-to-r from-purple-300 to-purple-400' 
                    : 'bg-gradient-to-r from-purple-800 to-purple-700'
                }`}>{stat.value}</h3>
                <p className={`text-sm font-light tracking-wide uppercase ${isDark ? 'text-white/50' : 'text-purple-900/70'}`}>{stat.label}</p>
              </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
