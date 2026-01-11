"use client"

import { useState, useEffect, useLayoutEffect } from "react"
import { MapPin, Building, Users, Calendar, ExternalLink, Mail, Clock, Star, DollarSign, ArrowLeft } from "lucide-react"
import Navbar from "../../../src/components/Navbar"
import Link from "next/link"
import { industryPartners, industryCourses } from "../../../lib/industry-data"
import { toast } from "sonner"
import { useTheme } from "next-themes"
import { useThemeStyles } from "../../../lib/theme-styles"

export default function CompanyDetailPage({ params }: { params: { id: string } }) {
  const { resolvedTheme } = useTheme()
  const themeStyles = useThemeStyles()
  
  // Theme detection
  const [isDark, setIsDark] = useState(() => {
    if (typeof document !== 'undefined') {
      const dataTheme = document.documentElement.getAttribute('data-theme')
      if (dataTheme === 'dark') return true
      if (dataTheme === 'light') return false
    }
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme')
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      const theme = savedTheme === 'system' || !savedTheme ? (prefersDark ? 'dark' : 'light') : savedTheme
      return theme === 'dark'
    }
    return true
  })
  
  useLayoutEffect(() => {
    if (resolvedTheme) {
      setIsDark(resolvedTheme === 'dark')
    } else if (typeof window !== 'undefined') {
      const dataTheme = document.documentElement.getAttribute('data-theme')
      const htmlClass = document.documentElement.className
      setIsDark(!(dataTheme === 'light' || htmlClass === 'light'))
    }
  }, [resolvedTheme])
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null)
  const [enrollmentForm, setEnrollmentForm] = useState({
    name: "",
    email: "",
    phone: "",
    courseId: ""
  })

  // Find the company by ID
  const company = industryPartners.find(partner => partner.id === parseInt(params.id))
  
  // Find all courses for this company
  const companyCourses = industryCourses.filter(course => 
    course.company.toLowerCase().includes(company?.name.toLowerCase() || "")
  )

  if (!company) {
    return (
      <div className="min-h-screen relative" suppressHydrationWarning style={{ 
        backgroundColor: themeStyles.pageBg,
        paddingTop: 0,
        marginTop: 0,
        border: 'none',
        borderTop: 'none'
      }}>
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className={`text-4xl font-bold mb-4`} style={{ color: themeStyles.textPrimary }}>Company Not Found</h1>
            <p className="mb-8" style={{ color: themeStyles.textSecondary }}>The company you're looking for doesn't exist.</p>
            <Link 
              href="/partners" 
              className="px-4 py-2 rounded-lg font-semibold transition-all duration-200 text-sm"
              style={{ 
                background: themeStyles.buttonGradient, 
                color: '#ffffff',
                boxShadow: themeStyles.buttonShadow
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = themeStyles.buttonShadowHover
                e.currentTarget.style.transform = 'scale(1.02)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = themeStyles.buttonShadow
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              Back to Partners
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const handleEnrollment = (courseId: number) => {
    setSelectedCourse(courseId)
    setEnrollmentForm(prev => ({ ...prev, courseId: courseId.toString() }))
  }

  const submitEnrollment = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the enrollment data to your backend
    toast.success("Enrollment submitted!", {
      description: `We'll contact you at ${enrollmentForm.email} soon.`,
      duration: 5000,
    })
    setSelectedCourse(null)
    setEnrollmentForm({ name: "", email: "", phone: "", courseId: "" })
  }

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
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-[1px]" style={{ background: themeStyles.pageBgGradient }}></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          {/* Back Button */}
          <Link 
            href="/partners" 
            className="inline-flex items-center mb-8 transition-all duration-300"
            style={{ color: isDark ? '#a78bfa' : '#7c3aed' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = isDark ? '#c084fc' : '#8b5cf6'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = isDark ? '#a78bfa' : '#7c3aed'
            }}
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Partners
          </Link>

          {/* Company Header */}
          <div 
            className="rounded-2xl p-8 mb-12 backdrop-blur-xl border"
            style={{
              backgroundColor: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.8)',
              borderColor: isDark ? 'rgba(168,85,247,0.2)' : 'rgba(124,58,237,0.25)',
            }}
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold mb-4" style={{ color: themeStyles.textPrimary }}>
                  {company.name}
                </h1>
                <p className="text-xl mb-6" style={{ color: themeStyles.textSecondary }}>
                  {company.description}
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center" style={{ color: themeStyles.textSecondary }}>
                    <Building size={20} className="mr-3" />
                    <span>{company.industry}</span>
                  </div>
                  <div className="flex items-center" style={{ color: themeStyles.textSecondary }}>
                    <MapPin size={20} className="mr-3" />
                    <span>{company.location}</span>
                  </div>
                  {company.employeeCount && (
                    <div className="flex items-center" style={{ color: themeStyles.textSecondary }}>
                      <Users size={20} className="mr-3" />
                      <span>{company.employeeCount.toLocaleString('en-US')} employees</span>
                    </div>
                  )}
                  {company.founded && (
                    <div className="flex items-center" style={{ color: themeStyles.textSecondary }}>
                      <Calendar size={20} className="mr-3" />
                      <span>Founded {company.founded}</span>
                    </div>
                  )}
                </div>

                <div className="flex space-x-4">
                  <a
                    href={`mailto:${company.contactInfo}`}
                    className="flex items-center text-white px-4 py-2 rounded-lg transition-all duration-300"
                    style={{ 
                      background: themeStyles.buttonGradient, 
                      boxShadow: themeStyles.buttonShadow
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = themeStyles.buttonShadowHover
                      e.currentTarget.style.transform = 'scale(1.02)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = themeStyles.buttonShadow
                      e.currentTarget.style.transform = 'scale(1)'
                    }}
                  >
                    <Mail size={16} className="mr-2" />
                    Contact
                  </a>
                  <a
                    href={company.website.startsWith('http') ? company.website : `https://${company.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 rounded-lg transition-all duration-300 border"
                    style={{
                      backgroundColor: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.9)',
                      borderColor: isDark ? 'rgba(168,85,247,0.2)' : 'rgba(124,58,237,0.25)',
                      color: themeStyles.textPrimary
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.4)' : 'rgba(124,58,237,0.4)'
                      e.currentTarget.style.transform = 'scale(1.02)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.2)' : 'rgba(124,58,237,0.25)'
                      e.currentTarget.style.transform = 'scale(1)'
                    }}
                  >
                    <ExternalLink size={16} className="mr-2" />
                    Website
                  </a>
                </div>
              </div>

              <div 
                className="rounded-xl p-6 backdrop-blur-xl border"
                style={{
                  backgroundColor: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.9)',
                  borderColor: isDark ? 'rgba(168,85,247,0.25)' : 'rgba(124,58,237,0.25)',
                }}
              >
                <h3 className="text-xl font-semibold mb-4" style={{ color: themeStyles.textPrimary }}>Training Programs</h3>
                <div className="space-y-2">
                  {company.trainingPrograms.map((program, index) => (
                    <div key={index} className="flex items-center" style={{ color: themeStyles.textSecondary }}>
                      <div 
                        className="w-2 h-2 rounded-full mr-3"
                        style={{ backgroundColor: isDark ? '#a78bfa' : '#7c3aed' }}
                      ></div>
                      {program}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Courses Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8" style={{ color: themeStyles.textPrimary }}>Available Training Programs</h2>
            
            {companyCourses.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg" style={{ color: themeStyles.textSecondary }}>No courses available for this company at the moment.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {companyCourses.map((course) => (
                  <div
                    key={course.id}
                    className="rounded-2xl p-6 backdrop-blur-xl border transition-all duration-300"
                    style={{
                      backgroundColor: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.8)',
                      borderColor: isDark ? 'rgba(168,85,247,0.2)' : 'rgba(124,58,237,0.25)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.4)' : 'rgba(124,58,237,0.4)'
                      e.currentTarget.style.transform = 'translateY(-4px)'
                      e.currentTarget.style.boxShadow = isDark
                        ? '0 12px 24px rgba(0,0,0,0.4), 0 0 20px rgba(196,181,253,0.2)'
                        : '0 12px 24px rgba(30,41,59,0.25), 0 0 20px rgba(124,58,237,0.25)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.2)' : 'rgba(124,58,237,0.25)'
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    <div className="aspect-video rounded-lg overflow-hidden mb-6">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-2" style={{ color: themeStyles.textPrimary }}>
                          {course.title}
                        </h3>
                        <p className="text-sm mb-3" style={{ color: themeStyles.textSecondary }}>
                          {course.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {course.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 rounded-full text-sm border"
                            style={{
                              backgroundColor: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.9)',
                              borderColor: isDark ? 'rgba(168,85,247,0.2)' : 'rgba(124,58,237,0.25)',
                              color: themeStyles.textPrimary
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="space-y-2 text-sm" style={{ color: themeStyles.textSecondary }}>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center">
                            <Clock size={16} className="mr-2" />
                            Duration
                          </span>
                          <span style={{ color: themeStyles.textPrimary }}>{course.duration}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center">
                            <Users size={16} className="mr-2" />
                            Students
                          </span>
                          <span style={{ color: themeStyles.textPrimary }}>{course.students}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center">
                            <Star size={16} className="mr-2" style={{ color: isDark ? '#a78bfa' : '#7c3aed' }} />
                            Rating
                          </span>
                          <span className="flex items-center gap-1" style={{ color: isDark ? '#a78bfa' : '#7c3aed' }}>
                            {course.rating} <Star className="w-4 h-4 fill-current" />
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center">
                            <DollarSign size={16} className="mr-2" />
                            Price
                          </span>
                          <span className="font-semibold" style={{ color: isDark ? '#4ade80' : '#16a34a' }}>{course.price}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleEnrollment(course.id)}
                        className="w-full text-white py-2 rounded-lg font-semibold transition-all duration-300 text-sm px-4"
                        style={{ 
                          background: themeStyles.buttonGradient, 
                          boxShadow: themeStyles.buttonShadow
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.boxShadow = themeStyles.buttonShadowHover
                          e.currentTarget.style.transform = 'scale(1.02)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.boxShadow = themeStyles.buttonShadow
                          e.currentTarget.style.transform = 'scale(1)'
                        }}
                      >
                        Enroll Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Enrollment Modal */}
      {selectedCourse && (
        <div 
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div 
            className="rounded-2xl p-8 max-w-md w-full backdrop-blur-xl border"
            style={{
              backgroundColor: isDark ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.95)',
              borderColor: isDark ? 'rgba(168,85,247,0.25)' : 'rgba(124,58,237,0.25)',
            }}
          >
            <h3 className="text-2xl font-bold mb-6" style={{ color: themeStyles.textPrimary }}>Enroll in Course</h3>
            
            <form onSubmit={submitEnrollment} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: themeStyles.textPrimary }}>
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={enrollmentForm.name}
                  onChange={(e) => setEnrollmentForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg transition-all duration-300 focus:outline-none"
                  style={{
                    backgroundColor: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.9)',
                    borderColor: isDark ? 'rgba(168,85,247,0.2)' : 'rgba(124,58,237,0.25)',
                    color: themeStyles.textPrimary,
                    borderWidth: '1px',
                    borderStyle: 'solid'
                  }}
                  placeholder="Enter your full name"
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.5)' : 'rgba(124,58,237,0.5)'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.2)' : 'rgba(124,58,237,0.25)'
                  }}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: themeStyles.textPrimary }}>
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={enrollmentForm.email}
                  onChange={(e) => setEnrollmentForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg transition-all duration-300 focus:outline-none"
                  style={{
                    backgroundColor: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.9)',
                    borderColor: isDark ? 'rgba(168,85,247,0.2)' : 'rgba(124,58,237,0.25)',
                    color: themeStyles.textPrimary,
                    borderWidth: '1px',
                    borderStyle: 'solid'
                  }}
                  placeholder="Enter your email"
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.5)' : 'rgba(124,58,237,0.5)'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.2)' : 'rgba(124,58,237,0.25)'
                  }}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: themeStyles.textPrimary }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={enrollmentForm.phone}
                  onChange={(e) => setEnrollmentForm(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg transition-all duration-300 focus:outline-none"
                  style={{
                    backgroundColor: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.9)',
                    borderColor: isDark ? 'rgba(168,85,247,0.2)' : 'rgba(124,58,237,0.25)',
                    color: themeStyles.textPrimary,
                    borderWidth: '1px',
                    borderStyle: 'solid'
                  }}
                  placeholder="Enter your phone number"
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.5)' : 'rgba(124,58,237,0.5)'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.2)' : 'rgba(124,58,237,0.25)'
                  }}
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 text-white py-2 rounded-lg font-semibold transition-all duration-300 text-sm px-4"
                  style={{ 
                    background: themeStyles.buttonGradient, 
                    boxShadow: themeStyles.buttonShadow
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = themeStyles.buttonShadowHover
                    e.currentTarget.style.transform = 'scale(1.02)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = themeStyles.buttonShadow
                    e.currentTarget.style.transform = 'scale(1)'
                  }}
                >
                  Submit Enrollment
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCourse(null)}
                  className="flex-1 py-2 rounded-lg font-semibold transition-all duration-300 text-sm px-4 border"
                  style={{
                    backgroundColor: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.9)',
                    borderColor: isDark ? 'rgba(168,85,247,0.2)' : 'rgba(124,58,237,0.25)',
                    color: themeStyles.textPrimary
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.4)' : 'rgba(124,58,237,0.4)'
                    e.currentTarget.style.transform = 'scale(1.02)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.2)' : 'rgba(124,58,237,0.25)'
                    e.currentTarget.style.transform = 'scale(1)'
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}