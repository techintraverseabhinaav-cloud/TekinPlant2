"use client"

import { useEffect } from 'react'
import { SignIn } from '@clerk/nextjs'
import SyncUserToSupabase from '../../../components/SyncUserToSupabase'

export default function LoginPage() {
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
    // Add custom styles for social buttons and remove inner borders
    const style = document.createElement('style')
    style.textContent = `
      button[data-provider="google"],
      .cl-socialButtonsBlockButton {
        background-color: rgba(255, 255, 255, 0.1) !important;
        border: 2px solid rgba(168, 85, 247, 0.4) !important;
        color: rgba(255, 255, 255, 0.9) !important;
        padding: 0.75rem 1rem !important;
      }
      button[data-provider="google"]:hover,
      .cl-socialButtonsBlockButton:hover {
        background-color: rgba(255, 255, 255, 0.15) !important;
        border-color: rgba(168, 85, 247, 0.6) !important;
        color: #ffffff !important;
        transform: translateY(-1px);
      }
      .cl-card,
      .cl-rootBox > div,
      .cl-cardBox {
        border: none !important;
        box-shadow: none !important;
      }
    `
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <div className="min-h-screen relative flex" style={{ backgroundColor: '#000000' }}>
      {/* Background Gradient */}
      <div className="absolute inset-0 backdrop-blur-[1px]" style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 50%, #000000 100%)' }}></div>
      
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:flex-1 relative overflow-hidden">
        <div className="relative z-10 flex flex-col justify-center p-12 lg:p-16 xl:p-20 text-white w-full">
          <div className="max-w-lg">
            <div className="slide-up inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm border border-purple-500/20" style={{ backgroundColor: 'rgba(0,0,0,0.4)', transitionDelay: '0.1s' }}>
              <span className="text-xs font-medium text-white/70 tracking-wide uppercase">Welcome Back</span>
            </div>
            <h1 className="slide-up text-5xl lg:text-6xl xl:text-7xl font-light mb-6 leading-tight tracking-tight" style={{ transitionDelay: '0.2s' }}>
              <span className="text-white">Sign In to</span> <span className="bg-gradient-to-r from-purple-300 via-purple-200 to-purple-300 bg-clip-text text-transparent">TEKINPLANT</span>
            </h1>
            <p className="slide-up text-lg lg:text-xl text-white/50 font-light leading-relaxed mb-12" style={{ transitionDelay: '0.3s' }}>
              Access your personalized learning dashboard and continue your professional development journey.
            </p>
            
            <div className="space-y-4">
              <div className="slide-up flex items-start gap-4 rounded-xl p-4 backdrop-blur-xl border border-purple-500/20 transition-all duration-300" style={{ backgroundColor: 'rgba(0,0,0,0.2)', transitionDelay: '0.4s' }} onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.3)'
                e.currentTarget.style.borderColor = 'rgba(168,85,247,0.3)'
              }} onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.2)'
                e.currentTarget.style.borderColor = 'rgba(168,85,247,0.2)'
              }}>
                <div className="w-16 h-16 p-0.5 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(0,0,0,0.5)', borderColor: 'rgba(168,85,247,0.25)', borderWidth: '1px' }}>
                  <div className="w-full h-full rounded-lg flex items-center justify-center overflow-hidden" style={{ borderColor: 'rgba(168,85,247,0.25)', borderWidth: '1px', backgroundColor: '#ffffff' }}>
                    <img src="/Icons/badge.png" alt="Badge" className="w-full h-full object-cover scale-150" />
                  </div>
                </div>
                <div>
                  <h3 className="font-light text-white mb-1">Industry-Leading Courses</h3>
                  <p className="text-white/50 text-sm font-light">Learn from top companies</p>
                </div>
              </div>
              <div className="slide-up flex items-start gap-4 rounded-xl p-4 backdrop-blur-xl border border-purple-500/20 transition-all duration-300" style={{ backgroundColor: 'rgba(0,0,0,0.2)', transitionDelay: '0.5s' }} onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.3)'
                e.currentTarget.style.borderColor = 'rgba(168,85,247,0.3)'
              }} onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.2)'
                e.currentTarget.style.borderColor = 'rgba(168,85,247,0.2)'
              }}>
                <div className="w-16 h-16 p-0.5 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(0,0,0,0.5)', borderColor: 'rgba(168,85,247,0.25)', borderWidth: '1px' }}>
                  <div className="w-full h-full rounded-lg flex items-center justify-center overflow-hidden" style={{ borderColor: 'rgba(168,85,247,0.25)', borderWidth: '1px', backgroundColor: '#ffffff' }}>
                    <img src="/Icons/students.png" alt="Students" className="w-full h-full object-cover scale-150" />
                  </div>
                </div>
                <div>
                  <h3 className="font-light text-white mb-1">Expert Trainers</h3>
                  <p className="text-white/50 text-sm font-light">Learn from industry professionals</p>
                </div>
              </div>
              <div className="slide-up flex items-start gap-4 rounded-xl p-4 backdrop-blur-xl border border-purple-500/20 transition-all duration-300" style={{ backgroundColor: 'rgba(0,0,0,0.2)', transitionDelay: '0.6s' }} onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.3)'
                e.currentTarget.style.borderColor = 'rgba(168,85,247,0.3)'
              }} onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.2)'
                e.currentTarget.style.borderColor = 'rgba(168,85,247,0.2)'
              }}>
                <div className="w-16 h-16 p-0.5 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(0,0,0,0.5)', borderColor: 'rgba(168,85,247,0.25)', borderWidth: '1px' }}>
                  <div className="w-full h-full rounded-lg flex items-center justify-center overflow-hidden" style={{ borderColor: 'rgba(168,85,247,0.25)', borderWidth: '1px', backgroundColor: '#ffffff' }}>
                    <img src="/Icons/growth.png" alt="Growth" className="w-full h-full object-cover scale-150" />
                  </div>
                </div>
                <div>
                  <h3 className="font-light text-white mb-1">Certified Programs</h3>
                  <p className="text-white/50 text-sm font-light">Get recognized certificates</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-50" style={{ backgroundColor: 'rgba(168,85,247,0.1)' }}></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-50" style={{ backgroundColor: 'rgba(196,181,253,0.1)' }}></div>
      </div>

      {/* Right Side - Sign In Form */}
      <div className="flex-1 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-12 xl:px-16 relative z-10">
        <div className="w-full max-w-md mx-auto">
          {/* Mobile Header */}
          <div className="slide-up lg:hidden mb-8 text-center" style={{ transitionDelay: '0.1s' }}>
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm border border-purple-500/20" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
              <span className="text-xs font-medium text-white/70 tracking-wide uppercase">Welcome Back</span>
            </div>
            <h1 className="text-4xl font-light mb-4 leading-tight tracking-tight">
              <span className="text-white">Sign In to</span> <span className="bg-gradient-to-r from-purple-300 via-purple-200 to-purple-300 bg-clip-text text-transparent">TEKINPLANT</span>
            </h1>
          </div>

          {/* Auto-sync user to Supabase after sign-in */}
          <SyncUserToSupabase />

          {/* Clerk Sign In Component */}
          <div className="slide-up w-full" style={{ transitionDelay: '0.7s' }}>
            <div className="rounded-2xl p-12 lg:p-14 backdrop-blur-xl border border-purple-500/20 w-full" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
              <SignIn 
                appearance={{
                  elements: {
                    rootBox: "mx-auto w-full flex flex-col items-center",
                    card: "bg-transparent shadow-none border-none p-0 w-full",
                    headerTitle: "text-2xl lg:text-3xl font-light text-white mb-2 tracking-tight text-center",
                    headerSubtitle: "text-white/50 font-light mb-8 text-center",
                    socialButtonsBlockButton: "rounded-xl border-2 transition-all duration-300 font-light w-full py-3 px-4 backdrop-blur-sm",
                    formButtonPrimary: "rounded-xl transition-all duration-300 hover:opacity-90 backdrop-blur-sm border border-purple-400/40 font-medium w-full",
                    footerActionLink: "transition-colors duration-200 font-light",
                    formFieldInput: "rounded-xl backdrop-blur-sm border transition-all duration-300 font-light w-full",
                    formFieldLabel: "text-white/60 font-medium text-xs uppercase tracking-wide",
                    formFieldInputShowPasswordButton: "text-white/50 hover:text-white",
                    formResendCodeLink: "transition-colors duration-200 font-light",
                    identityPreviewEditButton: "text-white/50 hover:text-white",
                    formFieldSuccessText: "text-green-400 font-light",
                    formFieldErrorText: "text-red-400 font-light",
                    alertText: "text-white/50 font-light",
                    footer: "border-t border-purple-500/20 pt-6 mt-6 text-center",
                    dividerLine: "bg-white/10",
                    dividerText: "text-white/50 font-light",
                    socialButtonsBlockButtonText: "font-light",
                    formButtonReset: "font-light",
                    formButtonResetLink: "font-light",
                    form: "w-full",
                    formField: "w-full",
                    socialButtons: "w-full",
                  },
                  variables: {
                    colorBackground: 'rgba(0,0,0,0.4)',
                    colorInputBackground: 'rgba(0,0,0,0.4)',
                    colorInputText: '#ffffff',
                    colorText: '#ffffff',
                    colorTextSecondary: 'rgba(255,255,255,0.5)',
                    colorPrimary: '#a78bfa',
                    colorDanger: '#ef4444',
                    colorSuccess: '#10b981',
                    borderRadius: '0.75rem',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: '0.875rem',
                    colorNeutral: 'rgba(255,255,255,0.9)',
                  },
                }}
                routing="path"
                path="/login"
                signUpUrl="/sign-up"
                afterSignInUrl="/student-dashboard"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
