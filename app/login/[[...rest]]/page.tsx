"use client"

import { useEffect } from 'react'
import { SignIn } from '@clerk/nextjs'
import SyncUserToSupabase from '../../../components/SyncUserToSupabase'
import { Award, Users, Target } from 'lucide-react'

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

  return (
    <div className="min-h-screen relative flex" style={{ backgroundColor: '#000000' }}>
      {/* Background Gradient */}
      <div className="absolute inset-0 backdrop-blur-[1px]" style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 50%, #000000 100%)' }}></div>
      
      {/* Left Side - Branding & Illustration */}
      <div className="hidden lg:flex lg:flex-1 relative overflow-hidden">
        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          <div>
            <div className="slide-up inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 backdrop-blur-sm border border-purple-500/20" style={{ backgroundColor: 'rgba(0,0,0,0.4)', transitionDelay: '0.1s' }}>
              <Award className="w-4 h-4" style={{ color: '#a855f7' }} />
              <span className="text-sm font-medium text-white/80">Welcome Back</span>
            </div>
            <h1 className="slide-up text-5xl font-normal mb-4" style={{ transitionDelay: '0.2s' }}>
              <span className="text-white" style={{ textShadow: '0 0 20px rgba(255,255,255,0.3)' }}>Sign In to</span> <span className="bg-gradient-to-r from-purple-300 via-purple-200 to-purple-300 bg-clip-text text-transparent" style={{ textShadow: '0 0 30px rgba(196,181,253,0.5), 0 0 60px rgba(196,181,253,0.3)' }}>TEKINPLANT</span>
            </h1>
            <p className="slide-up text-xl text-white/70 font-light" style={{ transitionDelay: '0.3s' }}>Empowering Your Learning Journey</p>
          </div>
          
          <div className="space-y-6">
            <div className="slide-up flex items-center gap-4 rounded-xl p-4 backdrop-blur-xl border border-purple-500/20 transition-all duration-300" style={{ backgroundColor: 'rgba(0,0,0,0.4)', transitionDelay: '0.4s' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 15px rgba(196,181,253,0.4), 0 0 30px rgba(196,181,253,0.2)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-sm border border-purple-500/20" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <Award className="w-6 h-6" style={{ color: '#c084fc' }} />
              </div>
              <div>
                <h3 className="font-semibold text-white">Industry-Leading Courses</h3>
                <p className="text-white/70 text-sm">Learn from top companies</p>
              </div>
            </div>
            <div className="slide-up flex items-center gap-4 rounded-xl p-4 backdrop-blur-xl border border-purple-500/20 transition-all duration-300" style={{ backgroundColor: 'rgba(0,0,0,0.4)', transitionDelay: '0.5s' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 15px rgba(196,181,253,0.4), 0 0 30px rgba(196,181,253,0.2)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-sm border border-purple-500/20" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <Users className="w-6 h-6" style={{ color: '#c084fc' }} />
              </div>
              <div>
                <h3 className="font-semibold text-white">Expert Trainers</h3>
                <p className="text-white/70 text-sm">Learn from industry professionals</p>
              </div>
            </div>
            <div className="slide-up flex items-center gap-4 rounded-xl p-4 backdrop-blur-xl border border-purple-500/20 transition-all duration-300" style={{ backgroundColor: 'rgba(0,0,0,0.4)', transitionDelay: '0.6s' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 15px rgba(196,181,253,0.4), 0 0 30px rgba(196,181,253,0.2)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-sm border border-purple-500/20" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <Target className="w-6 h-6" style={{ color: '#c084fc' }} />
              </div>
              <div>
                <h3 className="font-semibold text-white">Certified Programs</h3>
                <p className="text-white/70 text-sm">Get recognized certificates</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(168,85,247,0.1)' }}></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(196,181,253,0.1)' }}></div>
      </div>

      {/* Right Side - Clerk Sign In */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24 relative z-10">
        <div className="mx-auto w-full max-w-sm">
          {/* Logo for mobile */}
          <div className="slide-up lg:hidden mb-8 text-center" style={{ transitionDelay: '0.1s' }}>
            <h1 className="text-4xl font-normal mb-2">
              <span className="text-white" style={{ textShadow: '0 0 20px rgba(255,255,255,0.3)' }}>Sign In to</span> <span className="bg-gradient-to-r from-purple-300 via-purple-200 to-purple-300 bg-clip-text text-transparent" style={{ textShadow: '0 0 30px rgba(196,181,253,0.5), 0 0 60px rgba(196,181,253,0.3)' }}>TEKINPLANT</span>
            </h1>
          </div>

          {/* Auto-sync user to Supabase after sign-in */}
          <SyncUserToSupabase />

          {/* Clerk Sign In Component */}
          <div className="slide-up flex justify-center" style={{ transitionDelay: '0.7s' }}>
            <SignIn 
              appearance={{
                elements: {
                  rootBox: "mx-auto w-full",
                  card: "rounded-2xl backdrop-blur-xl border shadow-2xl",
                  headerTitle: "text-2xl font-normal text-white",
                  headerSubtitle: "text-white/70",
                  socialButtonsBlockButton: "rounded-xl border transition-all duration-300",
                  formButtonPrimary: "rounded-xl transition-all duration-300 hover:opacity-90 backdrop-blur-sm border border-purple-400/40",
                  footerActionLink: "transition-colors duration-200",
                  formFieldInput: "rounded-xl backdrop-blur-sm border transition-all duration-300",
                  formFieldLabel: "text-white/80 font-medium",
                  formFieldInputShowPasswordButton: "text-white/70 hover:text-white",
                  formResendCodeLink: "transition-colors duration-200",
                  identityPreviewEditButton: "text-white/70 hover:text-white",
                  formFieldSuccessText: "text-green-400",
                  formFieldErrorText: "text-red-400",
                  alertText: "text-white/70",
                  footer: "border-t",
                  dividerLine: "bg-white/10",
                  dividerText: "text-white/70",
                },
                variables: {
                  colorBackground: 'rgba(168,85,247,0.08)',
                  colorInputBackground: 'rgba(168,85,247,0.08)',
                  colorInputText: '#ffffff',
                  colorText: '#ffffff',
                  colorTextSecondary: 'rgba(255,255,255,0.7)',
                  colorPrimary: '#a78bfa',
                  colorDanger: '#ef4444',
                  colorSuccess: '#10b981',
                  borderRadius: '0.75rem',
                  fontFamily: 'Inter, system-ui, sans-serif',
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
  )
}
