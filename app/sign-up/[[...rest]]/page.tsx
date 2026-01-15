"use client"

import { useEffect, useState, useLayoutEffect } from 'react'
import { SignUp } from '@clerk/nextjs'
import SyncUserToSupabase from '../../../components/SyncUserToSupabase'
import { useTheme } from 'next-themes'
import { useThemeStyles } from '../../../lib/theme-styles'
import { Award, Users, TrendingUp } from 'lucide-react'

export default function SignUpPage() {
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
  
  // Purple colors for both light and dark mode
  const primaryColor = isDark ? 'rgba(168,85,247' : 'rgba(168,85,247' // purple for both
  const primaryColorLight = isDark ? 'rgba(196,181,253' : 'rgba(196,181,253' // purple-300 for both
  const borderColor = isDark ? 'rgba(168,85,247' : 'rgba(168,85,247' 
  const gradientFrom = isDark ? 'from-purple-600' : 'from-purple-800'
  const gradientVia = isDark ? 'via-purple-700' : 'via-purple-900'
  const gradientTo = isDark ? 'to-purple-600' : 'to-purple-800'

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

  useEffect(() => {
    // Add custom styles for social buttons, sign button, and text colors
    const style = document.createElement('style')
    const borderColor = isDark ? 'rgba(168, 85, 247, 0.4)' : 'rgba(168, 85, 247, 0.4)'
    const borderColorHover = isDark ? 'rgba(168, 85, 247, 0.6)' : 'rgba(168, 85, 247, 0.6)'
    const textColor = isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(30, 41, 59, 0.9)'
    const bgColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.8)'
    const bgColorHover = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.9)'
    const buttonGradient = isDark 
      ? 'linear-gradient(135deg, #a78bfa 0%, #c084fc 100%)'
      : 'linear-gradient(135deg, #a78bfa 0%, #c084fc 100%)'
    const buttonGradientHover = isDark
      ? 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)'
      : 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)'
    
    style.textContent = `
      button[data-provider="google"],
      .cl-socialButtonsBlockButton {
        background-color: ${bgColor} !important;
        border: 2px solid ${borderColor} !important;
        color: ${textColor} !important;
        padding: 0.75rem 1rem !important;
      }
      button[data-provider="google"]:hover,
      .cl-socialButtonsBlockButton:hover {
        background-color: ${bgColorHover} !important;
        border-color: ${borderColorHover} !important;
          color: ${isDark ? '#ffffff' : '#1e293b'} !important;
        transform: translateY(-1px);
      }
      .cl-formButtonPrimary {
        background: ${buttonGradient} !important;
        border: none !important;
        color: #ffffff !important;
        box-shadow: ${isDark ? '0 4px 14px rgba(168, 85, 247, 0.4)' : '0 4px 14px rgba(168, 85, 247, 0.4)'} !important;
      }
      .cl-formButtonPrimary:hover {
        background: ${buttonGradientHover} !important;
        box-shadow: ${isDark ? '0 6px 20px rgba(168, 85, 247, 0.5)' : '0 6px 20px rgba(168, 85, 247, 0.5)'} !important;
        transform: translateY(-1px);
      }
      .cl-card,
      .cl-rootBox > div,
      .cl-cardBox {
        border: none !important;
        box-shadow: none !important;
      }
      ${!isDark ? `
        .cl-headerTitle,
        .cl-headerSubtitle,
        .cl-formFieldLabel,
        .cl-footerActionLink,
        .cl-formFieldInput,
        .cl-identityPreviewText,
        .cl-identityPreviewEditButton,
        .cl-formResendCodeLink,
        .cl-alertText {
          color: #1e293b !important;
        }
        .cl-headerSubtitle,
        .cl-formFieldLabel,
        .cl-footerActionLink,
        .cl-alertText {
          color: rgba(30, 41, 59, 0.7) !important;
        }
        .cl-footerActionLink:hover {
          color: #a78bfa !important;
        }
      ` : ''}
    `
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [isDark])

  return (
    <div className="min-h-screen relative flex flex-col lg:flex-row overflow-x-hidden" style={{ backgroundColor: themeStyles.pageBg }}>
      {/* Background Gradient */}
      <div className="absolute inset-0 backdrop-blur-[1px]" style={{ background: themeStyles.pageBgGradient }}></div>
      
      {/* Top Header - Logo (Visible on all devices) */}
      <div className="absolute top-0 left-0 right-0 z-50 p-4 sm:p-6 lg:p-8">
        <div className="flex items-center justify-center lg:justify-start">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center transition-transform duration-300 hover:scale-110">
              <span className="text-white font-bold text-lg sm:text-xl">T</span>
            </div>
            <div>
              <span className={`text-xl sm:text-2xl lg:text-3xl font-bold bg-clip-text text-transparent ${
                isDark 
                  ? 'bg-gradient-to-r from-purple-300 via-purple-200 to-purple-300' 
                  : 'bg-gradient-to-r from-purple-700 via-purple-600 to-purple-700'
              }`} style={{ 
                textShadow: isDark 
                  ? '0 0 30px rgba(196,181,253,0.5), 0 0 60px rgba(196,181,253,0.3)' 
                  : 'none',
                letterSpacing: '-0.02em'
              }}>TekInPlant</span>
              <div className={`text-xs sm:text-sm -mt-0.5 sm:-mt-1 font-medium ${isDark ? 'text-white/70' : 'text-purple-900/80'}`}>Portal</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:flex-1 relative overflow-hidden">
        <div className="relative z-10 flex flex-col p-12 lg:p-16 xl:p-20 text-white w-full" style={{ paddingTop: '6rem', justifyContent: 'flex-start' }}>
          <div className="max-w-lg">
            <div className={`slide-up inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm border ${isDark ? 'border-purple-500/20' : 'border-purple-600/30'}`} style={{ backgroundColor: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.7)', transitionDelay: '0.1s' }}>
              <span className={`text-xs font-medium tracking-wide uppercase ${isDark ? 'text-white/70' : 'text-purple-900/80'}`}>Get Started</span>
            </div>
            <h1 className="slide-up text-5xl lg:text-6xl xl:text-7xl font-light mb-6 leading-tight tracking-tight" style={{ transitionDelay: '0.2s' }}>
              <span className={isDark ? 'text-white' : 'text-purple-900'}>Sign Up for</span> <span className={`bg-gradient-to-r ${gradientFrom} ${gradientVia} ${gradientTo} bg-clip-text text-transparent`}>TekInPlant</span>
            </h1>
            <p className={`slide-up text-lg lg:text-xl font-light leading-relaxed mb-12 ${isDark ? 'text-white/50' : 'text-purple-900/70'}`} style={{ transitionDelay: '0.3s' }}>
              Start your professional development journey and unlock access to industry-leading training programs.
            </p>
            
            <div className="space-y-4">
              <div className={`slide-up flex items-start gap-4 rounded-xl p-4 backdrop-blur-xl border ${isDark ? 'border-purple-500/20' : 'border-purple-600/30'} transition-all duration-300`} style={{ backgroundColor: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.6)', transitionDelay: '0.4s' }} onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = isDark ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.8)'
                e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.3)' : 'rgba(217,119,6,0.4)'
              }} onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = isDark ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.6)'
                e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.2)' : 'rgba(217,119,6,0.3)'
              }}>
                <div className="flash-card-container flex-shrink-0" style={{ width: '80px', height: '80px' }}>
                  <div className="flash-card-inner">
                    {/* Front of card - Icon only */}
                    <div
                      className="flash-card-face flash-card-front rounded-xl"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: isDark ? 'rgba(124,58,237,0.10)' : 'transparent',
                        border: `1px solid ${isDark ? 'rgba(124,58,237,0.25)' : 'rgba(124,58,237,0.25)'}`,
                        boxShadow: isDark
                          ? '0 8px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.05)'
                          : '0 8px 24px rgba(30,41,59,0.15), inset 0 1px 0 rgba(255,255,255,0.1)',
                      }}
                    >
                      <div className="w-full h-full flex items-center justify-center">
                      <Award
                          size={64}
                          className="transition-transform duration-300"
                          style={{
                            color: isDark ? '#ffffff' : '#7c3aed'
                          }}
                      />
                      </div>
                    </div>

                    {/* Back of card - Title */}
                    <div
                      className="flash-card-face flash-card-back rounded-xl"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: isDark ? 'rgba(124,58,237,0.10)' : 'transparent',
                        border: `1px solid ${isDark ? 'rgba(124,58,237,0.25)' : 'rgba(124,58,237,0.25)'}`,
                        boxShadow: isDark
                          ? '0 16px 40px rgba(0,0,0,0.35), 0 0 30px rgba(124,58,237,0.35)'
                          : '0 16px 40px rgba(30,41,59,0.25), 0 0 30px rgba(124,58,237,0.25)',
                      }}
                    >
                      <span className={`text-xs font-light px-2 ${isDark ? 'text-white' : 'text-purple-900'}`}>Courses</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className={`font-light mb-1 ${isDark ? 'text-white' : 'text-purple-900'}`}>Industry-Leading Courses</h3>
                  <p className={`text-sm font-light ${isDark ? 'text-white/50' : 'text-purple-900/70'}`}>Learn from top companies</p>
                </div>
              </div>
              <div className={`slide-up flex items-start gap-4 rounded-xl p-4 backdrop-blur-xl border ${isDark ? 'border-purple-500/20' : 'border-purple-600/30'} transition-all duration-300`} style={{ backgroundColor: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.6)', transitionDelay: '0.5s' }} onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = isDark ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.8)'
                e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.3)' : 'rgba(217,119,6,0.4)'
              }} onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = isDark ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.6)'
                e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.2)' : 'rgba(217,119,6,0.3)'
              }}>
                <div className="flash-card-container flex-shrink-0" style={{ width: '80px', height: '80px' }}>
                  <div className="flash-card-inner">
                    {/* Front of card - Icon only */}
                    <div
                      className="flash-card-face flash-card-front rounded-xl"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: isDark ? 'rgba(124,58,237,0.10)' : 'transparent',
                        border: `1px solid ${isDark ? 'rgba(124,58,237,0.25)' : 'rgba(124,58,237,0.25)'}`,
                        boxShadow: isDark
                          ? '0 8px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.05)'
                          : '0 8px 24px rgba(30,41,59,0.15), inset 0 1px 0 rgba(255,255,255,0.1)',
                      }}
                    >
                      <div className="w-full h-full flex items-center justify-center">
                      <Users
                          size={64}
                          className="transition-transform duration-300"
                          style={{
                            color: isDark ? '#ffffff' : '#7c3aed'
                          }}
                      />
                      </div>
                    </div>

                    {/* Back of card - Title */}
                    <div
                      className="flash-card-face flash-card-back rounded-xl"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: isDark ? 'rgba(124,58,237,0.10)' : 'transparent',
                        border: `1px solid ${isDark ? 'rgba(124,58,237,0.25)' : 'rgba(124,58,237,0.25)'}`,
                        boxShadow: isDark
                          ? '0 16px 40px rgba(0,0,0,0.35), 0 0 30px rgba(124,58,237,0.35)'
                          : '0 16px 40px rgba(30,41,59,0.25), 0 0 30px rgba(124,58,237,0.25)',
                      }}
                    >
                      <span className={`text-xs font-light px-2 ${isDark ? 'text-white' : 'text-purple-900'}`}>Trainers</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className={`font-light mb-1 ${isDark ? 'text-white' : 'text-purple-900'}`}>Expert Trainers</h3>
                  <p className={`text-sm font-light ${isDark ? 'text-white/50' : 'text-purple-900/70'}`}>Learn from industry professionals</p>
                </div>
              </div>
              <div className={`slide-up flex items-start gap-4 rounded-xl p-4 backdrop-blur-xl border ${isDark ? 'border-purple-500/20' : 'border-purple-600/30'} transition-all duration-300`} style={{ backgroundColor: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.6)', transitionDelay: '0.6s' }} onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = isDark ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.8)'
                e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.3)' : 'rgba(217,119,6,0.4)'
              }} onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = isDark ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.6)'
                e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.2)' : 'rgba(217,119,6,0.3)'
              }}>
                <div className="flash-card-container flex-shrink-0" style={{ width: '80px', height: '80px' }}>
                  <div className="flash-card-inner">
                    {/* Front of card - Icon only */}
                    <div
                      className="flash-card-face flash-card-front rounded-xl"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: isDark ? 'rgba(124,58,237,0.10)' : 'transparent',
                        border: `1px solid ${isDark ? 'rgba(124,58,237,0.25)' : 'rgba(124,58,237,0.25)'}`,
                        boxShadow: isDark
                          ? '0 8px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.05)'
                          : '0 8px 24px rgba(30,41,59,0.15), inset 0 1px 0 rgba(255,255,255,0.1)',
                      }}
                    >
                      <div className="w-full h-full flex items-center justify-center">
                      <TrendingUp
                          size={64}
                          className="transition-transform duration-300"
                          style={{
                            color: isDark ? '#ffffff' : '#7c3aed'
                          }}
                      />
                      </div>
                    </div>

                    {/* Back of card - Title */}
                    <div
                      className="flash-card-face flash-card-back rounded-xl"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: isDark ? 'rgba(124,58,237,0.10)' : 'transparent',
                        border: `1px solid ${isDark ? 'rgba(124,58,237,0.25)' : 'rgba(124,58,237,0.25)'}`,
                        boxShadow: isDark
                          ? '0 16px 40px rgba(0,0,0,0.35), 0 0 30px rgba(124,58,237,0.35)'
                          : '0 16px 40px rgba(30,41,59,0.25), 0 0 30px rgba(124,58,237,0.25)',
                      }}
                    >
                      <span className={`text-xs font-light px-2 ${isDark ? 'text-white' : 'text-purple-900'}`}>Certified</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className={`font-light mb-1 ${isDark ? 'text-white' : 'text-purple-900'}`}>Certified Programs</h3>
                  <p className={`text-sm font-light ${isDark ? 'text-white/50' : 'text-purple-900/70'}`}>Get recognized certificates</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-50" style={{ backgroundColor: isDark ? 'rgba(168,85,247,0.1)' : 'rgba(217,119,6,0.1)' }}></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-50" style={{ backgroundColor: isDark ? 'rgba(196,181,253,0.1)' : 'rgba(251,191,36,0.1)' }}></div>
      </div>

      {/* Right Side - Sign Up Form */}
      <div className="flex-1 flex flex-col justify-center items-center py-6 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-12 xl:px-16 relative z-10 w-full overflow-y-auto">
        <div className="w-full max-w-md mx-auto">
          {/* Mobile Header */}
          <div className="slide-up lg:hidden mb-6 sm:mb-8 text-center pt-16 sm:pt-20" style={{ transitionDelay: '0.05s' }}>
            <div className={`inline-flex items-center gap-2 rounded-full px-3 sm:px-4 py-1.5 mb-4 sm:mb-6 backdrop-blur-sm border ${isDark ? 'border-purple-500/20' : 'border-purple-600/30'}`} style={{ backgroundColor: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.7)' }}>
              <span className={`text-xs font-medium tracking-wide uppercase ${isDark ? 'text-white/70' : 'text-purple-900/80'}`}>Get Started</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-light mb-3 sm:mb-4 leading-tight tracking-tight px-2">
              <span className={isDark ? 'text-white' : 'text-purple-900'}>Sign Up for</span> <span className={`bg-gradient-to-r ${gradientFrom} ${gradientVia} ${gradientTo} bg-clip-text text-transparent`}>TekInPlant</span>
            </h1>
          </div>

          {/* Auto-sync user to Supabase after sign-up */}
          <SyncUserToSupabase />

          {/* Clerk Sign Up Component */}
          <div className="slide-up w-full" style={{ transitionDelay: '0.7s' }}>
            <div className={`rounded-2xl p-6 sm:p-8 lg:p-12 xl:p-14 backdrop-blur-xl border ${isDark ? 'border-purple-500/20' : 'border-purple-600/30'} w-full`} style={{ backgroundColor: themeStyles.cardBg }}>
              <SignUp 
                appearance={{
                  elements: {
                    rootBox: "mx-auto w-full flex flex-col items-center",
                    card: "bg-transparent shadow-none border-none p-0 w-full",
                    headerTitle: `text-2xl lg:text-3xl font-light mb-2 tracking-tight text-center ${isDark ? 'text-white' : 'text-purple-900'}`,
                    headerSubtitle: `font-light mb-8 text-center ${isDark ? 'text-white/50' : 'text-purple-900/70'}`,
                    socialButtonsBlockButton: "rounded-xl border-2 transition-all duration-300 font-light w-full py-3 px-4 backdrop-blur-sm",
                    formButtonPrimary: `rounded-xl transition-all duration-300 hover:opacity-90 backdrop-blur-sm border ${isDark ? 'border-purple-400/40' : 'border-purple-600/50'} font-medium w-full`,
                    footerActionLink: "transition-colors duration-200 font-light",
                    formFieldInput: "rounded-xl backdrop-blur-sm border transition-all duration-300 font-light w-full",
                    formFieldLabel: `font-medium text-xs uppercase tracking-wide ${isDark ? 'text-white/60' : 'text-purple-900/70'}`,
                    formFieldInputShowPasswordButton: `${isDark ? 'text-white/50 hover:text-white' : 'text-purple-900/70 hover:text-purple-900'}`,
                    formResendCodeLink: "transition-colors duration-200 font-light",
                    identityPreviewEditButton: `${isDark ? 'text-white/50 hover:text-white' : 'text-purple-900/70 hover:text-purple-900'}`,
                    formFieldSuccessText: "text-green-400 font-light",
                    formFieldErrorText: "text-red-400 font-light",
                    alertText: `${isDark ? 'text-white/50' : 'text-purple-900/70'} font-light`,
                    footer: `border-t ${isDark ? 'border-purple-500/20' : 'border-purple-600/30'} pt-6 mt-6 text-center`,
                    dividerLine: isDark ? "bg-white/10" : "bg-purple-900/20",
                    dividerText: `${isDark ? 'text-white/50' : 'text-purple-900/70'} font-light`,
                    socialButtonsBlockButtonText: "font-light",
                    formButtonReset: "font-light",
                    formButtonResetLink: "font-light",
                    form: "w-full",
                    formField: "w-full",
                    socialButtons: "w-full",
                  },
                  variables: {
                    colorBackground: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.7)',
                    colorInputBackground: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.9)',
                    colorInputText: isDark ? '#ffffff' : '#3a2e1f',
                    colorText: isDark ? '#ffffff' : '#3a2e1f',
                    colorTextSecondary: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(58,46,31,0.7)',
                    colorPrimary: isDark ? '#a78bfa' : '#a78bfa',
                    colorDanger: '#ef4444',
                    colorSuccess: '#10b981',
                    borderRadius: '0.75rem',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: '0.875rem',
                    colorNeutral: isDark ? 'rgba(255,255,255,0.9)' : 'rgba(58,46,31,0.9)',
                  },
                }}
                routing="path"
                path="/sign-up"
                signInUrl="/login"
                afterSignUpUrl="/redirect-dashboard"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
