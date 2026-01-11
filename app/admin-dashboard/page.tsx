"use client"

import { useState, useEffect, useLayoutEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useProtectedRoute } from "../../lib/clerk-helpers"
import { useClerk } from "@clerk/nextjs"
import { useTheme } from "next-themes"
import { useThemeStyles } from "../../lib/theme-styles"
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  DollarSign,
  User,
  Bell,
  Calendar,
  Award,
  MessageSquare,
  BarChart3,
  Shield,
  Activity,
  Eye,
  Edit,
  Trash2,
  Plus,
  Download,
  Filter,
  Search,
  ArrowLeft,
  LogOut,
  Sparkles
} from "lucide-react"
// Using placeholder data instead of fetching from Supabase
// import { getAdminDashboardData } from "../../lib/supabase/dashboard-data"

export default function AdminDashboard() {
  const { user, isLoading } = useProtectedRoute("admin")
  const { signOut } = useClerk()
  const router = useRouter()
  const { resolvedTheme } = useTheme()
  const themeStyles = useThemeStyles()
  
  // Read initial theme from data-theme attribute (set by theme script before React)
  // Returns: true for dark mode (purple), false for light mode (amber)
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
  const [activeTab, setActiveTab] = useState("overview")
  const [systemStats, setSystemStats] = useState<any>({
    totalStudents: 0,
    activeCourses: 0,
    totalRevenue: 0,
    completionRate: 0,
    userGrowth: 0
  })
  const [recentUsers, setRecentUsers] = useState<any[]>([])
  const [systemAlerts, setSystemAlerts] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [dataLoading, setDataLoading] = useState(true)

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
  }

  useEffect(() => {
    // Use placeholder data instead of fetching from Supabase
    setDataLoading(true)
    
    // Set placeholder values
    setSystemStats({
      totalUsers: 2847,
      totalStudents: 2847,
      activeCourses: 25,
      totalRevenue: 1250000, // ₹12.5L
      systemHealth: 98.5,
      newUsers: 342,
      courseEnrollments: 1847,
      completionRate: 87,
      revenueGrowth: 15,
      userGrowth: 12
    })
    
    // Set placeholder recent users
    setRecentUsers([
      { id: '1', name: 'John Doe', email: 'john@example.com', role: 'student', status: 'active', lastActive: '2 hours ago' },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'student', status: 'active', lastActive: '5 hours ago' },
      { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'student', status: 'active', lastActive: '1 day ago' },
      { id: '4', name: 'Alice Williams', email: 'alice@example.com', role: 'student', status: 'active', lastActive: '2 days ago' },
      { id: '5', name: 'Charlie Brown', email: 'charlie@example.com', role: 'student', status: 'active', lastActive: '3 days ago' }
    ])
    
    // Set placeholder system alerts
    setSystemAlerts([
      { id: '1', type: 'info', message: '25 new students enrolled in Full Stack Development', time: '2 hours ago' },
      { id: '2', type: 'success', message: "New course 'AI/ML Fundamentals' added", time: '4 hours ago' },
      { id: '3', type: 'warning', message: '₹2.5L revenue generated from corporate training', time: '6 hours ago' },
      { id: '4', type: 'info', message: '45 students completed JavaScript Basics certification', time: '1 day ago' }
    ])
    
    setDataLoading(false)
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
  }, [systemStats, recentUsers, systemAlerts])

  if (isLoading) {
    return (
      <div className="min-h-screen relative" style={{ backgroundColor: themeStyles.pageBg }}>
        <div className="absolute inset-0 backdrop-blur-[1px]" style={{ background: themeStyles.pageBgGradient }}></div>
        <div className="relative flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className={`animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4 ${isDark ? 'border-red-500' : 'border-red-600'}`}></div>
            <p className={isDark ? 'text-white/70' : 'text-amber-900/70'}>Loading admin dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  // Additional check: verify user is actually admin before rendering
  const userRole = (user.publicMetadata?.role as string) || undefined
  if (userRole && userRole !== 'admin') {
    console.log(`⚠️ User is not admin (role: ${userRole}), redirecting...`)
    return null // Will be redirected by useProtectedRoute
  }

  const filteredUsers = recentUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: themeStyles.pageBg }}>
      <div className="absolute inset-0 backdrop-blur-[1px]" style={{ background: themeStyles.pageBgGradient }}></div>
      
      {/* Header */}
      <header className="slide-up relative border-b backdrop-blur-xl" style={{ 
        borderColor: isDark ? 'rgba(239,68,68,0.2)' : 'rgba(239,68,68,0.3)',
        backgroundColor: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.7)'
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <Link 
                href="/"
                className={`flex items-center space-x-2 px-4 py-2 transition-all duration-300 rounded-xl backdrop-blur-sm border ${
                  isDark ? 'text-white/70 hover:text-white hover:bg-white/10 border-red-500/20' : 'text-amber-900/80 hover:text-amber-900 hover:bg-red-50/50 border-red-600/30'
                }`}
                style={{ backgroundColor: isDark ? 'rgba(239,68,68,0.08)' : 'rgba(239,68,68,0.1)' }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = isDark ? '0 0 15px rgba(239,68,68,0.3)' : '0 0 15px rgba(239,68,68,0.25)'}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
              >
                <ArrowLeft size={18} />
                <span className="text-sm font-medium">Back to Home</span>
              </Link>
              <div className="h-6 w-px" style={{ backgroundColor: isDark ? 'rgba(239,68,68,0.3)' : 'rgba(239,68,68,0.4)' }}></div>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5" style={{ color: isDark ? '#ef4444' : '#dc2626' }} />
                <h1 className={`text-xl font-semibold bg-clip-text text-transparent ${
                  isDark 
                    ? 'bg-gradient-to-r from-red-300 to-red-400' 
                    : 'bg-gradient-to-r from-red-700 to-red-800'
                }`}>Admin Dashboard</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/profile"
                className={`flex items-center space-x-2 px-4 py-2 transition-all duration-300 rounded-xl backdrop-blur-sm border ${
                  isDark ? 'text-white/70 hover:text-white hover:bg-white/10 border-red-500/20' : 'text-amber-900/80 hover:text-amber-900 hover:bg-red-50/50 border-red-600/30'
                }`}
                style={{ backgroundColor: isDark ? 'rgba(239,68,68,0.08)' : 'rgba(239,68,68,0.1)' }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = isDark ? '0 0 15px rgba(239,68,68,0.3)' : '0 0 15px rgba(239,68,68,0.25)'}
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
            ? 'linear-gradient(135deg, rgba(239,68,68,0.15) 0%, rgba(220,38,38,0.15) 100%)'
            : 'linear-gradient(135deg, rgba(239,68,68,0.2) 0%, rgba(220,38,38,0.2) 100%)',
          borderColor: isDark ? 'rgba(239,68,68,0.25)' : 'rgba(239,68,68,0.3)',
          boxShadow: isDark 
            ? '0 8px 32px rgba(0,0,0,0.3), 0 0 20px rgba(239,68,68,0.2)'
            : '0 8px 32px rgba(58,46,31,0.2), 0 0 20px rgba(239,68,68,0.25)'
        }}>
          <h2 className="text-4xl font-normal mb-3">
            <span style={{ 
              color: themeStyles.textPrimary,
              textShadow: isDark ? '0 0 20px rgba(255,255,255,0.3)' : 'none'
            }}>Welcome, Admin </span>
            <span className={`bg-clip-text text-transparent ${
              isDark 
                ? 'bg-gradient-to-r from-red-300 to-red-400' 
                : 'bg-gradient-to-r from-red-700 to-red-800'
            }`} style={{ 
              textShadow: isDark ? '0 0 30px rgba(239,68,68,0.5)' : 'none'
            }}>
              {user.firstName || user.emailAddresses[0]?.emailAddress}
            </span>
            <span style={{ 
              color: themeStyles.textPrimary,
              textShadow: isDark ? '0 0 20px rgba(255,255,255,0.3)' : 'none'
            }}>! 🔧</span>
          </h2>
          <p className={`text-lg ${isDark ? 'text-white/70' : 'text-amber-900/80'}`}>Manage your TekinPlant platform.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { 
              icon: Users, 
              value: (systemStats.totalStudents !== undefined && systemStats.totalStudents !== null) 
                ? systemStats.totalStudents.toLocaleString('en-IN') 
                : "0", 
              label: "Total Students", 
              color: 'rgba(239,68,68,0.12)', 
              border: 'rgba(239,68,68,0.25)', 
              iconColor: '#f87171', 
              change: systemStats.userGrowth ? `${systemStats.userGrowth > 0 ? '+' : ''}${systemStats.userGrowth}%` : undefined 
            },
            { 
              icon: BookOpen, 
              value: (systemStats.activeCourses !== undefined && systemStats.activeCourses !== null) 
                ? systemStats.activeCourses.toString() 
                : "0", 
              label: "Active Courses", 
              color: 'rgba(59,130,246,0.12)', 
              border: 'rgba(59,130,246,0.25)', 
              iconColor: '#60a5fa', 
              change: undefined 
            },
            { 
              icon: DollarSign, 
              value: (() => {
                const revenue = systemStats.totalRevenue || 0
                if (revenue >= 100000) {
                  return `₹${(revenue / 100000).toFixed(1)}L`
                } else if (revenue >= 1000) {
                  return `₹${(revenue / 1000).toFixed(1)}K`
                } else {
                  return `₹${revenue.toLocaleString('en-IN')}`
                }
              })(), 
              label: "Revenue", 
              color: 'rgba(16,185,129,0.12)', 
              border: 'rgba(16,185,129,0.25)', 
              iconColor: '#34d399', 
              change: systemStats.revenueGrowth ? `${systemStats.revenueGrowth > 0 ? '+' : ''}${systemStats.revenueGrowth}%` : undefined 
            },
            { 
              icon: TrendingUp, 
              value: `${systemStats.completionRate || 0}%`, 
              label: "Completion Rate", 
              color: 'rgba(234,179,8,0.12)', 
              border: 'rgba(234,179,8,0.25)', 
              iconColor: '#fbbf24', 
              change: undefined 
            },
          ].map((stat, index) => {
            // Keep admin-specific colors but make them theme-aware
            const statBg = isDark ? stat.color : 'transparent'
            const statBorder = isDark ? stat.border : stat.border.replace('0.25', '0.35')
            const textColor = isDark ? 'text-white/70' : 'text-black'
            
            // Determine gradient based on stat color
            let valueGradient = ''
            if (stat.color.includes('239,68,68')) {
              // Red
              valueGradient = isDark ? 'bg-gradient-to-r from-red-300 to-red-400' : 'bg-gradient-to-r from-red-700 to-red-800'
            } else if (stat.color.includes('59,130,246')) {
              // Blue
              valueGradient = isDark ? 'bg-gradient-to-r from-blue-300 to-blue-400' : 'bg-gradient-to-r from-blue-700 to-blue-800'
            } else if (stat.color.includes('16,185,129')) {
              // Green
              valueGradient = isDark ? 'bg-gradient-to-r from-green-300 to-green-400' : 'bg-gradient-to-r from-green-700 to-green-800'
            } else if (stat.color.includes('234,179,8')) {
              // Yellow
              valueGradient = isDark ? 'bg-gradient-to-r from-yellow-300 to-yellow-400' : 'bg-gradient-to-r from-yellow-700 to-yellow-800'
            }
            
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
                    backgroundColor: statBg,
                    border: `1px solid ${statBorder}`,
                    boxShadow: isDark
                      ? '0 8px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.05)'
                      : '0 8px 24px rgba(30,41,59,0.15), inset 0 1px 0 rgba(255,255,255,0.1)',
                  }}
                >
                  <stat.icon
                    className="w-24 h-24 transition-transform duration-300"
                    style={{ color: stat.iconColor }}
                  />
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
                    backgroundColor: isDark ? stat.color : 'transparent',
                    border: `1px solid ${statBorder}`,
                    boxShadow: isDark
                      ? '0 16px 40px rgba(0,0,0,0.35), 0 0 30px rgba(124,58,237,0.35)'
                      : '0 16px 40px rgba(30,41,59,0.25), 0 0 30px rgba(124,58,237,0.25)',
                  }}
                >
                  {/* Value */}
                  <div
                    className={`text-3xl sm:text-4xl font-semibold text-center mb-3 bg-clip-text text-transparent ${valueGradient}`}
                  >
                    {dataLoading ? "..." : stat.value}
                  </div>

                  {/* Label */}
                  <p
                    className={`text-sm sm:text-base text-center font-light ${textColor}`}
                    style={{ lineHeight: '1.6' }}
                  >
                    {stat.label}
                  </p>

                  {/* Change indicator */}
                  {stat.change && (
                    <p className={`text-xs mt-2 ${isDark ? 'text-green-400' : 'text-green-700'}`}>{stat.change}</p>
                  )}
                </div>
              </div>
            </div>
            )
          })}
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-8 backdrop-blur-xl rounded-xl p-1 border" style={{ 
          backgroundColor: isDark ? 'rgba(239,68,68,0.05)' : 'rgba(239,68,68,0.08)',
          borderColor: isDark ? 'rgba(239,68,68,0.25)' : 'rgba(239,68,68,0.3)'
        }}>
          {[
            { id: "overview", label: "Overview", icon: BarChart3 },
            { id: "users", label: "Users", icon: Users },
            { id: "courses", label: "Courses", icon: BookOpen },
            { id: "alerts", label: "Alerts", icon: Bell },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? isDark ? "text-white backdrop-blur-sm border" : "text-white backdrop-blur-sm border"
                  : isDark ? "text-white/60 hover:text-white hover:bg-white/5" : "text-amber-900/70 hover:text-amber-900 hover:bg-red-50/50"
              }`}
              style={activeTab === tab.id ? {
                background: 'linear-gradient(to right, #ef4444, #dc2626, #ef4444)',
                borderColor: isDark ? 'rgba(239,68,68,0.4)' : 'rgba(239,68,68,0.5)',
                boxShadow: isDark ? '0 0 15px rgba(239,68,68,0.4)' : '0 0 15px rgba(239,68,68,0.3)'
              } : {}}
            >
              <tab.icon size={16} className="mr-2" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* System Alerts */}
            <div className="lg:col-span-3">
              <div className="slide-up rounded-2xl p-6 backdrop-blur-xl border" style={{ 
                backgroundColor: isDark ? 'rgba(239,68,68,0.05)' : 'rgba(239,68,68,0.08)',
                borderColor: isDark ? 'rgba(239,68,68,0.25)' : 'rgba(239,68,68,0.3)'
              }}>
                <h3 className={`text-xl font-semibold mb-6 ${isDark ? 'text-white' : 'text-amber-900'}`}>System Alerts</h3>
                <div className="space-y-4">
                  {systemAlerts.length > 0 ? (
                    systemAlerts.map((alert) => (
                      <div 
                        key={alert.id} 
                        className="flex items-center justify-between p-4 rounded-xl backdrop-blur-sm border transition-all duration-300 hover:bg-white/5" 
                        style={{ 
                          backgroundColor: 'rgba(0,0,0,0.2)',
                          borderColor: 'rgba(239,68,68,0.2)'
                        }}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${
                            alert.type === 'warning' ? 'bg-yellow-400' :
                            alert.type === 'info' ? 'bg-blue-400' :
                            'bg-green-400'
                          }`}></div>
                          <div>
                            <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-amber-900'}`}>{alert.message}</p>
                            <p className={`text-xs ${isDark ? 'text-white/50' : 'text-amber-900/60'}`}>{alert.time}</p>
                          </div>
                        </div>
                        <button className={`${isDark ? 'text-white/40 hover:text-white' : 'text-amber-900/50 hover:text-amber-900'} transition-colors`}>
                          <Eye size={16} />
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className={`${isDark ? 'text-white/50' : 'text-amber-900/60'} text-center py-8`}>No new system alerts.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div className="slide-up rounded-2xl p-6 backdrop-blur-xl border" style={{ 
            backgroundColor: isDark ? 'rgba(239,68,68,0.05)' : 'rgba(239,68,68,0.08)',
            borderColor: isDark ? 'rgba(239,68,68,0.25)' : 'rgba(239,68,68,0.3)'
          }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-amber-900'}`}>User Management</h3>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-white/40' : 'text-amber-900/50'}`} size={18} />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`pl-10 pr-4 py-2.5 rounded-xl ${isDark ? 'text-white placeholder-white/40' : 'text-amber-900 placeholder-amber-900/50'} focus:outline-none focus:ring-2 transition-all duration-300 backdrop-blur-sm border`}
                    style={{ 
                      backgroundColor: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.6)',
                      borderColor: isDark ? 'rgba(239,68,68,0.3)' : 'rgba(239,68,68,0.4)'
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = 'rgba(239,68,68,0.5)'}
                    onBlur={(e) => e.currentTarget.style.borderColor = isDark ? 'rgba(239,68,68,0.3)' : 'rgba(239,68,68,0.4)'}
                  />
                </div>
                <button 
                  className="px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 backdrop-blur-sm border"
                  style={{ 
                    background: 'linear-gradient(to right, #10b981, #059669)',
                    color: '#ffffff',
                    borderColor: 'rgba(16,185,129,0.4)',
                    boxShadow: '0 0 15px rgba(16,185,129,0.3)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 20px rgba(16,185,129,0.5)'}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 0 15px rgba(16,185,129,0.3)'}
                >
                  <Plus size={16} className="inline mr-2" />
                  Add User
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b" style={{ borderColor: isDark ? 'rgba(239,68,68,0.2)' : 'rgba(239,68,68,0.3)' }}>
                    <th className={`text-left py-3 px-4 font-medium text-sm ${isDark ? 'text-white/70' : 'text-amber-900/70'}`}>Name</th>
                    <th className={`text-left py-3 px-4 font-medium text-sm ${isDark ? 'text-white/70' : 'text-amber-900/70'}`}>Email</th>
                    <th className={`text-left py-3 px-4 font-medium text-sm ${isDark ? 'text-white/70' : 'text-amber-900/70'}`}>Role</th>
                    <th className={`text-left py-3 px-4 font-medium text-sm ${isDark ? 'text-white/70' : 'text-amber-900/70'}`}>Status</th>
                    <th className={`text-left py-3 px-4 font-medium text-sm ${isDark ? 'text-white/70' : 'text-amber-900/70'}`}>Last Active</th>
                    <th className={`text-right py-3 px-4 font-medium text-sm ${isDark ? 'text-white/70' : 'text-amber-900/70'}`}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b transition-colors hover:bg-white/5" style={{ borderColor: 'rgba(239,68,68,0.1)' }}>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium" style={{ backgroundColor: isDark ? 'rgba(239,68,68,0.2)' : 'rgba(239,68,68,0.25)' }}>
                            <span className={isDark ? 'text-white' : 'text-amber-900'}>{user.name.charAt(0)}</span>
                          </div>
                          <div>
                            <div className={`font-medium ${isDark ? 'text-white' : 'text-amber-900'}`}>{user.name}</div>
                            <div className={`text-sm ${isDark ? 'text-white/50' : 'text-amber-900/60'}`}>{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className={`py-4 px-4 text-sm ${isDark ? 'text-white/70' : 'text-amber-900/70'}`}>{user.email}</td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                          user.role === 'admin' ? 'bg-red-900/30 text-red-300 border border-red-500/30' :
                          user.role === 'trainer' ? 'bg-green-900/30 text-green-300 border border-green-500/30' :
                          user.role === 'corporate' ? 'bg-blue-900/30 text-blue-300 border border-blue-500/30' :
                          'bg-purple-900/30 text-purple-300 border border-purple-500/30'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.status === 'active' ? 'bg-green-900/30 text-green-300 border border-green-500/30' : 'bg-yellow-900/30 text-yellow-300 border border-yellow-500/30'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className={`py-4 px-4 text-sm ${isDark ? 'text-white/50' : 'text-amber-900/60'}`}>{user.lastActive}</td>
                      <td className="py-4 px-4">
                        <div className="flex space-x-2 justify-end">
                          <button className={`p-1.5 ${isDark ? 'text-white/40 hover:text-white hover:bg-white/10' : 'text-amber-900/60 hover:text-amber-900 hover:bg-red-50/50'} rounded-lg transition-colors`}>
                            <Eye size={14} />
                          </button>
                          <button className={`p-1.5 ${isDark ? 'text-white/40 hover:text-white hover:bg-white/10' : 'text-amber-900/60 hover:text-amber-900 hover:bg-red-50/50'} rounded-lg transition-colors`}>
                            <Edit size={14} />
                          </button>
                          <button className={`p-1.5 ${isDark ? 'text-red-400/60 hover:text-red-300 hover:bg-red-500/10' : 'text-red-600/70 hover:text-red-700 hover:bg-red-50/50'} rounded-lg transition-colors`}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "courses" && (
          <div className="slide-up rounded-2xl p-6 backdrop-blur-xl border" style={{ 
            backgroundColor: isDark ? 'rgba(239,68,68,0.05)' : 'rgba(239,68,68,0.08)',
            borderColor: isDark ? 'rgba(239,68,68,0.25)' : 'rgba(239,68,68,0.3)'
          }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-amber-900'}`}>Course Management</h3>
              <button 
                className="px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 backdrop-blur-sm border"
                style={{ 
                  background: 'linear-gradient(to right, #10b981, #059669)',
                  color: '#ffffff',
                  borderColor: 'rgba(16,185,129,0.4)',
                  boxShadow: '0 0 15px rgba(16,185,129,0.3)'
                }}
              >
                <Plus size={16} className="inline mr-2" />
                Add Course
              </button>
            </div>
            <p className={isDark ? 'text-white/50' : 'text-amber-900/60'}>Course management features will be implemented here.</p>
          </div>
        )}

        {activeTab === "alerts" && (
          <div className="slide-up rounded-2xl p-6 backdrop-blur-xl border" style={{ 
            backgroundColor: isDark ? 'rgba(239,68,68,0.05)' : 'rgba(239,68,68,0.08)',
            borderColor: isDark ? 'rgba(239,68,68,0.25)' : 'rgba(239,68,68,0.3)'
          }}>
            <h3 className={`text-xl font-semibold mb-6 ${isDark ? 'text-white' : 'text-amber-900'}`}>Alerts & Notifications</h3>
            <p className={isDark ? 'text-white/50' : 'text-amber-900/60'}>Alerts and notification management will be implemented here.</p>
          </div>
        )}
      </main>
    </div>
  )
}
