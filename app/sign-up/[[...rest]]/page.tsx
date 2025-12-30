"use client"

import { useEffect, useRef, useState } from 'react'
import { SignUp, useUser } from '@clerk/nextjs'
import SyncUserToSupabase from '../../../components/SyncUserToSupabase'

export default function SignUpPage() {
  const { user, isLoaded } = useUser()
  const [selectedRole, setSelectedRole] = useState('student')
  const roleUpdatedRef = useRef(false)

  // Persist role choice locally so SyncUserToSupabase can use it
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('signup_role', selectedRole)
    }
  }, [selectedRole])

  // After the user is created, attach the chosen role to Clerk public metadata (once)
  useEffect(() => {
    const applyRoleToClerk = async () => {
      if (!isLoaded || !user || roleUpdatedRef.current) return
      const currentRole = user.publicMetadata?.role as string | undefined
      const storedRole =
        (typeof window !== 'undefined' && localStorage.getItem('signup_role')) || selectedRole

      if (!currentRole && storedRole) {
        try {
          await user.update({ publicMetadata: { role: storedRole } })
          roleUpdatedRef.current = true
        } catch (err) {
          console.error('Failed to set role on Clerk user:', err)
        }
      }
    }
    applyRoleToClerk()
  }, [isLoaded, user, selectedRole])

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Side - Branding & Illustration */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          <div>
            <h1 className="text-4xl font-bold mb-4">TekinPlant</h1>
            <p className="text-xl text-white/90 font-light">Start Your Learning Journey Today</p>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Free to Join</h3>
                <p className="text-white/80 text-sm">Create your account in seconds</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Access All Courses</h3>
                <p className="text-white/80 text-sm">Browse hundreds of training programs</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Track Your Progress</h3>
                <p className="text-white/80 text-sm">Monitor your learning journey</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      {/* Right Side - Clerk Sign Up */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm">
          {/* Logo for mobile */}
          <div className="lg:hidden mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              TEKINPLANT
            </h1>
          </div>

          {/* Role selection (sign-up only) */}
          <div className="mb-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-sm font-semibold text-gray-700 mb-3">Select your role</p>
            <div className="grid grid-cols-2 gap-3">
              {['student', 'trainer', 'admin', 'corporate'].map((role) => (
                <label
                  key={role}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer text-sm capitalize ${
                    selectedRole === role
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-indigo-200'
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value={role}
                    checked={selectedRole === role}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="text-indigo-600"
                  />
                  {role}
                </label>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">Roles are set during sign up only.</p>
          </div>

          {/* Auto-sync user to Supabase after sign-up */}
          <SyncUserToSupabase />

          {/* Clerk Sign Up Component */}
          <div className="flex justify-center">
            <SignUp 
              appearance={{
                elements: {
                  rootBox: "mx-auto",
                  card: "shadow-xl",
                  headerTitle: "text-2xl font-bold text-gray-900",
                  headerSubtitle: "text-gray-600",
                  socialButtonsBlockButton: "border-gray-300 hover:bg-gray-50",
                  formButtonPrimary: "bg-indigo-600 hover:bg-indigo-700 text-white",
                  footerActionLink: "text-indigo-600 hover:text-indigo-700",
                  formFieldInput: "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500",
                  formFieldLabel: "text-gray-700 font-semibold",
                },
              }}
              routing="path"
              path="/sign-up"
              signInUrl="/login"
              afterSignUpUrl="/student-dashboard"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

