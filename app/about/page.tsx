"use client"

import { useState, useEffect, useLayoutEffect } from "react"
import { Users, Award, Globe, Target } from "lucide-react"
import Navbar from "../../src/components/Navbar"
import Link from "next/link"
import { useTheme } from "next-themes"
import { useThemeStyles } from "../../lib/theme-styles"

export default function AboutPage() {
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
        theme = savedTheme
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
  
  // Update theme when resolvedTheme changes
  useLayoutEffect(() => {
    if (resolvedTheme) {
      setIsDark(resolvedTheme === 'dark')
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
  const team = [
    {
      name: "Dr Swati Bhasme",
      role: "CEO & Founder",
      image: "/placeholder.svg",
      bio: "Former tech executive with 15+ years in software development and education."
    }
  ]

  const stats = [
    { number: "10,000+", label: "Students Trained", icon: "/Icons/students.png" },
    { number: "50+", label: "Industry Partners", icon: "/Icons/globe.png" },
    { number: "95%", label: "Success Rate", icon: "/Icons/badge.png" },
    { number: "200+", label: "Training Programs", icon: "/Icons/growth.png" }
  ]

  const values = [
    {
      icon: "/Icons/excellence.png",
      title: "Excellence",
      description: "We maintain the highest standards in our training programs, ensuring quality education that meets industry requirements."
    },
    {
      icon: "/Icons/collaboration.png",
      title: "Collaboration",
      description: "We foster partnerships with industry leaders and educational institutions to create comprehensive learning experiences."
    },
    {
      icon: "/Icons/innovation.png",
      title: "Innovation",
      description: "We continuously evolve our training methodologies to incorporate the latest industry trends and technologies."
    }
  ]

  return (
    <div className="min-h-screen relative" style={{ 
      backgroundColor: themeStyles.pageBg,
      paddingTop: 0,
      marginTop: 0,
      border: 'none',
      borderTop: 'none'
    }}>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-[1px]" style={{ background: themeStyles.pageBgGradient }}></div>
        <div className="slide-up relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center mb-20">
            <div className="slide-up inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm border" style={{ 
              backgroundColor: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.7)',
              borderColor: isDark ? 'rgba(168,85,247,0.2)' : 'rgba(139,90,43,0.25)',
              transitionDelay: '0.1s' 
            }}>
              <Award className="w-3.5 h-3.5" style={{ color: isDark ? '#a855f7' : '#a78bfa' }} />
              <span className={`text-xs font-medium tracking-wide uppercase ${isDark ? 'text-white/70' : 'text-purple-900/80'}`}>Who We Are</span>
            </div>
            <h1 className="slide-up text-5xl sm:text-6xl lg:text-7xl font-light mb-6 leading-tight tracking-tight" style={{ transitionDelay: '0.2s' }}>
              <span style={{ color: themeStyles.textPrimary }}>About</span> <span className={`bg-clip-text text-transparent ${
                isDark 
                  ? 'bg-gradient-to-r from-purple-300 via-purple-200 to-purple-300' 
                  : 'bg-gradient-to-r from-purple-800 via-purple-700 to-purple-800'
              }`}>TEKINPLANT</span>
            </h1>
            <p className="slide-up text-lg sm:text-xl max-w-4xl mx-auto mb-16 font-light leading-relaxed" style={{ 
              transitionDelay: '0.3s',
              color: themeStyles.textSecondary,
              opacity: isDark ? 0.5 : 0.8
            }}>
              We are a leading industrial training platform dedicated to bridging the gap between academic knowledge and industry requirements. 
              Our mission is to empower professionals with practical skills and hands-on experience.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
              {stats.map((stat, index) => {
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
                        {stat.number}
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
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-[1px]" style={{ background: themeStyles.pageBgGradient }}></div>
        <div className="slide-up relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center mb-16">
            <div className="slide-up inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm border" style={{ 
              backgroundColor: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.7)',
              borderColor: isDark ? 'rgba(168,85,247,0.2)' : 'rgba(139,90,43,0.25)',
              transitionDelay: '0.1s' 
            }}>
              <Target className="w-3.5 h-3.5" style={{ color: isDark ? '#a855f7' : '#a78bfa' }} />
              <span className={`text-xs font-medium tracking-wide uppercase ${isDark ? 'text-white/70' : 'text-purple-900/80'}`}>Our Purpose</span>
            </div>
          </div>
          
          <div className="space-y-20">
            {/* Mission */}
            <div className="slide-up" style={{ transitionDelay: '0.2s' }}>
              <h2 className="text-3xl lg:text-4xl font-light mb-6 leading-tight tracking-tight">
                <span style={{ color: themeStyles.textPrimary }}>Our</span> <span className={`bg-clip-text text-transparent ${
                  isDark 
                    ? 'bg-gradient-to-r from-purple-300 to-purple-400' 
                    : 'bg-gradient-to-r from-purple-800 to-purple-700'
                }`}>Mission</span>
              </h2>
              <div className="space-y-4">
                <p className="text-lg leading-relaxed font-light" style={{ 
                  color: themeStyles.textSecondary,
                  opacity: isDark ? 0.6 : 0.8
                }}>
                  To provide industry-relevant training programs that equip professionals with the practical skills and knowledge needed to excel in their careers. 
                  We believe in learning by doing and connecting theory with real-world applications.
                </p>
                <p className="text-lg leading-relaxed font-light" style={{ 
                  color: themeStyles.textSecondary,
                  opacity: isDark ? 0.6 : 0.8
                }}>
                  Our comprehensive approach combines theoretical knowledge with hands-on projects, industry mentorship, and practical case studies to ensure our students are job-ready.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className={`slide-up pt-20 border-t ${isDark ? 'border-white/5' : 'border-purple-900/10'}`} style={{ transitionDelay: '0.3s' }}>
              <h2 className="text-3xl lg:text-4xl font-light mb-6 leading-tight tracking-tight">
                <span style={{ color: themeStyles.textPrimary }}>Our</span> <span className={`bg-clip-text text-transparent ${
                  isDark 
                    ? 'bg-gradient-to-r from-purple-300 to-purple-400' 
                    : 'bg-gradient-to-r from-purple-800 to-purple-700'
                }`}>Vision</span>
              </h2>
              <div className="space-y-4">
                <p className="text-lg leading-relaxed font-light" style={{ 
                  color: themeStyles.textSecondary,
                  opacity: isDark ? 0.6 : 0.8
                }}>
                  To become the most trusted platform for industrial training, recognized for our commitment to quality education, industry partnerships, and student success.
                </p>
                <p className="text-lg leading-relaxed font-light" style={{ 
                  color: themeStyles.textSecondary,
                  opacity: isDark ? 0.6 : 0.8
                }}>
                  We envision a future where every professional has access to high-quality, industry-aligned training that accelerates their career growth and contributes to organizational success.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-[1px]" style={{ background: themeStyles.pageBgGradient }}></div>
        <div className="slide-up relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center mb-16">
            <div className="slide-up inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm border" style={{ 
              backgroundColor: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.7)',
              borderColor: isDark ? 'rgba(168,85,247,0.2)' : 'rgba(139,90,43,0.25)',
              transitionDelay: '0.1s' 
            }}>
              <Award className="w-3.5 h-3.5" style={{ color: isDark ? '#a855f7' : '#a78bfa' }} />
              <span className={`text-xs font-medium tracking-wide uppercase ${isDark ? 'text-white/70' : 'text-purple-900/80'}`}>What We Stand For</span>
            </div>
            <h2 className="slide-up text-4xl lg:text-5xl font-light mb-6 leading-tight tracking-tight" style={{ transitionDelay: '0.2s' }}>
              <span style={{ color: themeStyles.textPrimary }}>Our</span> <span className={`bg-clip-text text-transparent ${
                isDark 
                  ? 'bg-gradient-to-r from-purple-300 to-purple-400' 
                  : 'bg-gradient-to-r from-purple-800 to-purple-700'
              }`}>Values</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
            {values.map((value, index) => {
              const valueBorder = isDark ? 'rgba(168,85,247,0.25)' : 'rgba(139,90,43,0.3)'
              const valueBg = isDark ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.9)'
              
              return (
              <div 
                key={index} 
                className="slide-up text-center transition-all duration-500" 
                style={{ transitionDelay: `${0.3 + index * 0.1}s` }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <div className="w-16 h-16 p-0.5 rounded-xl flex items-center justify-center mx-auto mb-6" style={{ 
                  backgroundColor: valueBg, 
                  borderColor: valueBorder, 
                  borderWidth: '1px' 
                }}>
                  <div className="w-full h-full rounded-lg flex items-center justify-center overflow-hidden relative" style={{ 
                    borderColor: valueBorder, 
                    borderWidth: '1px', 
                    backgroundColor: '#ffffff' 
                  }}>
                    <div 
                      className="absolute inset-0 rounded-lg"
                      style={{
                        background: 'transparent',
                        mixBlendMode: 'normal',
                        pointerEvents: 'none',
                        zIndex: 1
                      }}
                    />
                    <img 
                      src={value.icon} 
                      alt={value.title} 
                      className="w-full h-full object-cover scale-150 relative z-0" 
                      style={{ 
                        filter: 'none',
                        WebkitFilter: 'none'
                      }}
                    />
                  </div>
                </div>
                <h3 className={`text-xl font-light mb-4 ${isDark ? 'text-white' : 'text-purple-900'}`}>{value.title}</h3>
                <p className={`leading-relaxed font-light ${isDark ? 'text-white/50' : 'text-purple-900/70'}`}>
                  {value.description}
                </p>
              </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-[1px]" style={{ background: themeStyles.pageBgGradient }}></div>
        <div className="slide-up relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center mb-16">
            <div className="slide-up inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm border" style={{ 
              backgroundColor: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.7)',
              borderColor: isDark ? 'rgba(168,85,247,0.2)' : 'rgba(139,90,43,0.25)',
              transitionDelay: '0.1s' 
            }}>
              <Users className="w-3.5 h-3.5" style={{ color: isDark ? '#a855f7' : '#a78bfa' }} />
              <span className={`text-xs font-medium tracking-wide uppercase ${isDark ? 'text-white/70' : 'text-purple-900/80'}`}>Our Founder</span>
            </div>
            <h2 className="slide-up text-4xl lg:text-5xl font-light mb-6 leading-tight tracking-tight" style={{ transitionDelay: '0.2s' }}>
              <span style={{ color: themeStyles.textPrimary }}>Founder &</span> <span className={`bg-clip-text text-transparent ${
                isDark 
                  ? 'bg-gradient-to-r from-purple-300 to-purple-400' 
                  : 'bg-gradient-to-r from-purple-800 to-purple-700'
              }`}>CEO</span>
            </h2>
          </div>
          
          <div className="flex justify-center">
            {team.map((member, index) => (
              <div 
                key={index} 
                className="slide-up text-center transition-all duration-500 max-w-md" 
                style={{ transitionDelay: `${0.3 + index * 0.1}s` }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border" style={{ 
                  backgroundColor: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.7)',
                  borderColor: isDark ? 'rgba(168,85,247,0.2)' : 'rgba(139,90,43,0.3)'
                }}>
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className={`text-2xl font-light mb-2 ${isDark ? 'text-white' : 'text-purple-900'}`}>{member.name}</h3>
                <p className={`text-sm mb-4 font-light ${isDark ? 'text-purple-400' : 'text-purple-800'}`}>{member.role}</p>
                <p className={`leading-relaxed font-light ${isDark ? 'text-white/50' : 'text-purple-900/70'}`}>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}