"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useProtectedRoute } from "../../lib/clerk-helpers"
import { useClerk } from "@clerk/nextjs"
import { useTheme } from "next-themes"
import { useThemeStyles } from "../../lib/theme-styles"
import { 
  BookOpen, 
  Clock, 
  Award, 
  TrendingUp, 
  Calendar, 
  Users, 
  Star, 
  LogOut,
  User,
  ArrowLeft,
  Sparkles
} from "lucide-react"
import Image from "next/image"

export default function StudentDashboard() {
  const { user, isLoading } = useProtectedRoute("student")
  const { signOut } = useClerk()
  const router = useRouter()
  const { theme } = useTheme()
  const themeStyles = useThemeStyles()
  const isDark = theme === 'dark'
  const [dashboardData, setDashboardData] = useState<any>(null)
  const [loadingDashboard, setLoadingDashboard] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
  }

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user?.id) {
        setLoadingDashboard(false)
        return
      }

      console.log('📊 Fetching student dashboard data for Clerk ID:', user.id)
      setLoadingDashboard(true)
      setError(null)

      try {
        const response = await fetch(`/api/dashboard/student?clerkId=${user.id}`)
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          console.error('❌ Dashboard API error:', response.status, errorData)
          throw new Error(errorData.error || `Failed to fetch dashboard data (${response.status})`)
        }
        
        const data = await response.json()
        console.log('✅ Dashboard data received:', data)
        setDashboardData(data)
      } catch (err: any) {
        console.error('❌ Error fetching dashboard data:', err)
        setError(err.message || 'Failed to load dashboard data.')
        setDashboardData(null)
      } finally {
        setLoadingDashboard(false)
      }
    }

    if (user) {
      fetchDashboardData()
    }
  }, [user])

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
  }, [dashboardData])

  if (isLoading || loadingDashboard) {
    return (
      <div className="min-h-screen relative" style={{ backgroundColor: themeStyles.pageBg }}>
        <div className="absolute inset-0 backdrop-blur-[1px]" style={{ background: themeStyles.pageBgGradient }}></div>
        <div className="relative flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className={`animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4 ${isDark ? 'border-purple-500' : 'border-amber-700'}`}></div>
            <p className={isDark ? 'text-white/70' : 'text-amber-900/70'}>Loading dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen relative" style={{ backgroundColor: themeStyles.pageBg }}>
        <div className="absolute inset-0 backdrop-blur-[1px]" style={{ background: themeStyles.pageBgGradient }}></div>
        <div className="relative flex items-center justify-center min-h-screen p-4">
          <div className={`text-xl text-center p-6 rounded-2xl backdrop-blur-xl border ${isDark ? 'text-red-400 border-red-500/20' : 'text-red-600 border-red-600/30'}`} style={{ 
            backgroundColor: isDark ? 'rgba(239,68,68,0.1)' : 'rgba(239,68,68,0.15)' 
          }}>
            <p>Error: {error}</p>
            <p className={`text-sm mt-2 ${isDark ? 'text-white/60' : 'text-amber-900/70'}`}>Please try refreshing the page or contact support.</p>
          </div>
        </div>
      </div>
    )
  }

  if (!user || !dashboardData) {
    return (
      <div className="min-h-screen relative" style={{ backgroundColor: themeStyles.pageBg }}>
        <div className="absolute inset-0 backdrop-blur-[1px]" style={{ background: themeStyles.pageBgGradient }}></div>
        <div className="relative flex items-center justify-center min-h-screen">
          <div className={`text-xl text-center p-4 ${isDark ? 'text-white/70' : 'text-amber-900/80'}`}>No dashboard data available. Please ensure you are logged in and have a profile.</div>
        </div>
      </div>
    )
  }

  const { enrollments, recentActivity, stats } = dashboardData || { enrollments: [], recentActivity: [], stats: {} }

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: themeStyles.pageBg }}>
      <div className="absolute inset-0 backdrop-blur-[1px]" style={{ background: themeStyles.pageBgGradient }}></div>
      
      {/* Header */}
      <header className="slide-up relative border-b backdrop-blur-xl" style={{ 
        borderColor: isDark ? 'rgba(168,85,247,0.2)' : 'rgba(139,90,43,0.3)',
        backgroundColor: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.7)'
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <Link 
                href="/"
                className={`flex items-center space-x-2 px-4 py-2 transition-all duration-300 rounded-xl backdrop-blur-sm border ${
                  isDark ? 'text-white/70 hover:text-white hover:bg-white/10 border-purple-500/20' : 'text-amber-900/80 hover:text-amber-900 hover:bg-amber-50/50 border-amber-800/30'
                }`}
                style={{ backgroundColor: isDark ? 'rgba(168,85,247,0.08)' : 'rgba(139,90,43,0.1)' }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = isDark ? '0 0 15px rgba(196,181,253,0.3)' : '0 0 15px rgba(139,90,43,0.25)'}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
              >
                <ArrowLeft size={18} />
                <span className="text-sm font-medium">Back to Home</span>
              </Link>
              <div className="h-6 w-px" style={{ backgroundColor: isDark ? 'rgba(168,85,247,0.3)' : 'rgba(139,90,43,0.3)' }}></div>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5" style={{ color: isDark ? '#a855f7' : '#8b6f47' }} />
                <h1 className={`text-xl font-semibold bg-clip-text text-transparent ${
                  isDark 
                    ? 'bg-gradient-to-r from-purple-300 to-purple-400' 
                    : 'bg-gradient-to-r from-amber-800 to-amber-700'
                }`}>Student Dashboard</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/profile"
                className={`flex items-center space-x-2 px-4 py-2 transition-all duration-300 rounded-xl backdrop-blur-sm border ${
                  isDark ? 'text-white/70 hover:text-white hover:bg-white/10 border-purple-500/20' : 'text-amber-900/80 hover:text-amber-900 hover:bg-amber-50/50 border-amber-800/30'
                }`}
                style={{ backgroundColor: isDark ? 'rgba(168,85,247,0.08)' : 'rgba(139,90,43,0.1)' }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = isDark ? '0 0 15px rgba(196,181,253,0.3)' : '0 0 15px rgba(139,90,43,0.25)'}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
              >
                <User size={18} />
                <span className="text-sm font-medium">Profile</span>
              </Link>
              <button 
                onClick={handleSignOut}
                className={`flex items-center space-x-2 px-4 py-2 transition-all duration-300 rounded-xl backdrop-blur-sm border ${
                  isDark ? 'text-red-400 hover:text-red-300 hover:bg-red-500/10 border-red-500/20' : 'text-red-600 hover:text-red-700 hover:bg-red-50/50 border-red-600/30'
                }`}
                style={{ backgroundColor: isDark ? 'rgba(239,68,68,0.08)' : 'rgba(239,68,68,0.1)' }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = isDark ? '0 0 15px rgba(239,68,68,0.3)' : '0 0 15px rgba(239,68,68,0.25)'}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
              >
                <LogOut size={18} />
                <span className="text-sm font-medium">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="slide-up mb-12 rounded-2xl p-8 backdrop-blur-xl border transition-all duration-300" style={{ 
          background: isDark 
            ? 'linear-gradient(135deg, rgba(168,85,247,0.15) 0%, rgba(139,92,246,0.15) 100%)'
            : 'linear-gradient(135deg, rgba(139,90,43,0.15) 0%, rgba(160,130,109,0.15) 100%)',
          borderColor: isDark ? 'rgba(168,85,247,0.25)' : 'rgba(139,90,43,0.3)',
          boxShadow: isDark 
            ? '0 8px 32px rgba(0,0,0,0.3), 0 0 20px rgba(196,181,253,0.2)'
            : '0 8px 32px rgba(58,46,31,0.2), 0 0 20px rgba(139,90,43,0.25)'
        }}>
          <h2 className="text-4xl font-normal mb-3">
            <span style={{ 
              color: themeStyles.textPrimary,
              textShadow: isDark ? '0 0 20px rgba(255,255,255,0.3)' : 'none'
            }}>Welcome, </span>
            <span className={`bg-clip-text text-transparent ${
              isDark 
                ? 'bg-gradient-to-r from-purple-300 to-purple-400' 
                : 'bg-gradient-to-r from-amber-800 to-amber-700'
            }`} style={{ 
              textShadow: isDark ? '0 0 30px rgba(196,181,253,0.5)' : 'none'
            }}>
              {user.firstName || user.emailAddresses[0]?.emailAddress}
            </span>
            <span style={{ 
              color: themeStyles.textPrimary,
              textShadow: isDark ? '0 0 20px rgba(255,255,255,0.3)' : 'none'
            }}>! 👋</span>
          </h2>
          <p className={`text-lg ${isDark ? 'text-white/70' : 'text-amber-900/80'}`}>Your personalized learning journey awaits.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { icon: BookOpen, value: stats.totalCourses, label: "Total Courses" },
            { icon: Award, value: stats.completedCourses, label: "Completed Courses" },
            { icon: Clock, value: stats.totalHours, label: "Total Hours" },
            { icon: TrendingUp, value: stats.averageScore, label: "Average Score" },
          ].map((stat, index) => {
            const statColor = isDark ? 'rgba(168,85,247,0.12)' : 'rgba(139,90,43,0.15)'
            const statBorder = isDark ? 'rgba(168,85,247,0.25)' : 'rgba(139,90,43,0.3)'
            const statIconColor = isDark ? '#a78bfa' : '#8b6f47'
            const hoverShadow = isDark
              ? '0 0 25px rgba(196,181,253,0.4), 0 0 50px rgba(196,181,253,0.2)'
              : '0 0 25px rgba(139,90,43,0.3), 0 0 50px rgba(139,90,43,0.2)'
            
            return (
            <div 
              key={index} 
              className="slide-up hover-lift rounded-2xl p-6 transition-all duration-300" 
              style={{ 
                backgroundColor: statColor, 
                borderColor: statBorder, 
                borderWidth: '1px',
                animationDelay: `${index * 0.1}s`
              }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = hoverShadow}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
            >
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ 
                  backgroundColor: isDark ? statColor.replace('0.12', '0.22') : statColor.replace('0.15', '0.25'), 
                  borderColor: statBorder, 
                  borderWidth: '1px' 
                }}>
                  <stat.icon className="w-7 h-7" style={{ color: statIconColor }} />
                </div>
                <div>
                  <p className={`text-sm mb-1 ${isDark ? 'text-white/60' : 'text-amber-900/70'}`}>{stat.label}</p>
                  <p className={`text-3xl font-bold bg-clip-text text-transparent ${
                    isDark 
                      ? 'bg-gradient-to-r from-purple-300 to-purple-400' 
                      : 'bg-gradient-to-r from-amber-800 to-amber-700'
                  }`}>{stat.value}</p>
                </div>
              </div>
            </div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Enrolled Courses */}
          <div className="lg:col-span-2">
            <h3 className={`text-2xl font-normal mb-6 ${isDark ? 'text-white' : 'text-amber-900'}`}>My Enrollments</h3>
            <div className="space-y-6">
              {enrollments.length > 0 ? (
                enrollments.map((course: any, index: number) => {
                  const courseBg = isDark ? 'rgba(168,85,247,0.05)' : 'rgba(139,90,43,0.08)'
                  const courseBorder = isDark ? 'rgba(168,85,247,0.25)' : 'rgba(139,90,43,0.3)'
                  const hoverShadow = isDark
                    ? '0 0 25px rgba(196,181,253,0.4), 0 0 50px rgba(196,181,253,0.2)'
                    : '0 0 25px rgba(139,90,43,0.3), 0 0 50px rgba(139,90,43,0.2)'
                  
                  return (
                  <div 
                    key={course.id} 
                    className="slide-up hover-lift rounded-2xl p-6 flex items-center space-x-6 backdrop-blur-xl border transition-all duration-300" 
                    style={{ 
                      backgroundColor: courseBg,
                      borderColor: courseBorder,
                      animationDelay: `${index * 0.1}s`
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.boxShadow = hoverShadow}
                    onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
                  >
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0" style={{ 
                      backgroundColor: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.5)' 
                    }}>
                      <Image
                        src={course.image_url || "/placeholder.svg"}
                        alt={course.title}
                        width={96}
                        height={96}
                        className="object-cover"
                        priority={false}
                        placeholder="blur"
                        blurDataURL="/placeholder.svg"
                      />
                    </div>
                    <div className="flex-grow min-w-0">
                      <h4 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-amber-900'}`}>{course.title}</h4>
                      <p className={`text-sm mb-3 ${isDark ? 'text-white/60' : 'text-amber-900/70'}`}>{course.company} - {course.duration}</p>
                      <div className={`flex items-center space-x-4 text-sm mb-3 ${isDark ? 'text-white/70' : 'text-amber-900/80'}`}>
                        <span className="flex items-center">
                          <Star size={16} className="mr-1" style={{ color: '#fbbf24' }} /> 
                          {course.rating}
                        </span>
                        <span className="flex items-center">
                          <Clock size={16} className="mr-1" style={{ color: isDark ? '#60a5fa' : '#8b6f47' }} /> 
                          Progress: {course.progress}%
                        </span>
                        <span className="flex items-center">
                          <Calendar size={16} className="mr-1" style={{ color: isDark ? '#a78bfa' : '#8b6f47' }} /> 
                          Status: {course.status}
                        </span>
                      </div>
                      <div className="w-full rounded-full h-2" style={{ 
                        backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(58,46,31,0.1)' 
                      }}>
                        <div 
                          className="h-2 rounded-full transition-all duration-500"
                          style={{ 
                            width: `${course.progress}%`,
                            background: themeStyles.buttonGradient,
                            boxShadow: isDark ? '0 0 10px rgba(196,181,253,0.5)' : '0 0 10px rgba(139,90,43,0.4)'
                          }}
                        ></div>
                      </div>
                    </div>
                    <Link 
                      href={`/courses/${course.courseId}`} 
                      className="px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 backdrop-blur-sm border flex-shrink-0"
                      style={{ 
                        background: themeStyles.buttonGradient, 
                        color: '#ffffff',
                        borderColor: isDark ? 'rgba(168,85,247,0.4)' : 'rgba(139,90,43,0.4)',
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
                      View Course
                    </Link>
                  </div>
                  )
                })
              ) : (
                <div className="slide-up rounded-2xl p-12 text-center backdrop-blur-xl border" style={{ 
                  backgroundColor: 'rgba(168,85,247,0.05)',
                  borderColor: 'rgba(168,85,247,0.25)'
                }}>
                  <BookOpen className="w-16 h-16 mx-auto mb-4 text-white/40" />
                  <p className="text-white/70 mb-4">You are not enrolled in any courses yet.</p>
                  <Link 
                    href="/courses" 
                    className="inline-block px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 backdrop-blur-sm border border-purple-400/40"
                    style={{ 
                      background: 'linear-gradient(to right, #a78bfa, #c084fc, #a78bfa)', 
                      color: '#ffffff',
                      boxShadow: '0 0 15px rgba(196,181,253,0.4)'
                    }}
                  >
                    Browse Courses
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h3 className="text-2xl font-normal mb-6 text-white">Recent Activity</h3>
            <div className="slide-up rounded-2xl p-6 backdrop-blur-xl border space-y-4" style={{ 
              backgroundColor: 'rgba(168,85,247,0.05)',
              borderColor: 'rgba(168,85,247,0.25)'
            }}>
              {recentActivity.length > 0 ? (
                <ul className="space-y-4">
                  {recentActivity.map((activity: any, index: number) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 mt-2 rounded-full flex-shrink-0" style={{ backgroundColor: '#a78bfa' }}></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white/90 text-sm">{activity.title}</p>
                        <p className="text-white/50 text-xs mt-1">{activity.date}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-white/50 text-center py-8">No recent activity.</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
