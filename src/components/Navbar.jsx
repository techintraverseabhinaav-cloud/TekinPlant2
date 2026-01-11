"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation"
import { Menu, X, Search, User, Bell, LogOut, Settings, Moon, Sun } from "lucide-react"
import { useUser, useClerk } from "@clerk/nextjs"
import { useTheme } from "next-themes"
import { useThemeStyles } from "../../lib/theme-styles"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const userMenuTimerRef = useRef(null)
  const searchInputRef = useRef(null)
  const router = useRouter()
  const pathname = usePathname()
  const { user, isLoaded } = useUser()
  const { signOut } = useClerk()
  const { theme, setTheme } = useTheme()
  const themeStyles = useThemeStyles()
  const [mounted, setMounted] = useState(false)
  
  // Get user role from Clerk metadata
  const userRole = (user?.publicMetadata?.role) || 'student'
  const userName = user?.fullName || user?.firstName || user?.emailAddresses[0]?.emailAddress || 'User'
  const userEmail = user?.emailAddresses[0]?.emailAddress || ''
  
  // Use consistent default during SSR to prevent hydration mismatch
  // After mount, use the actual theme from next-themes
  const isDark = mounted ? (theme === 'dark') : true

  useEffect(() => {
    const handleClickOutside = (event) => {
      const target = event.target
      if (showUserMenu && target instanceof Element && !target.closest('.user-menu')) {
        setShowUserMenu(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showUserMenu])

  // Clear timers on unmount
  useEffect(() => {
    return () => {
      if (userMenuTimerRef.current) clearTimeout(userMenuTimerRef.current)
    }
  }, [])

  // Mount check for theme toggle
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogout = async () => {
    await signOut()
    setShowUserMenu(false)
    setIsMenuOpen(false)
    router.push("/")
  }

  const getDashboardLink = () => {
    if (!user) return "/login"
    
    const dashboardRoutes = {
      student: "/student-dashboard",
      trainer: "/trainer-dashboard",
      admin: "/admin-dashboard",
      corporate: "/corporate-dashboard"
    }
    return dashboardRoutes[userRole] || "/login"
  }

  const handleSearch = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const trimmedSearch = searchTerm.trim()
    if (trimmedSearch) {
      const searchQuery = encodeURIComponent(trimmedSearch)
      setShowSearch(false)
      setSearchTerm("")
      // Navigate immediately without delay
      router.push(`/courses?search=${searchQuery}`)
    }
  }

  const handleSearchClick = () => {
    setShowSearch(!showSearch)
    if (!showSearch) {
      // Use requestAnimationFrame for immediate focus
      requestAnimationFrame(() => {
        searchInputRef.current?.focus()
      })
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showSearch && event.target instanceof Element && !event.target.closest('.search-container')) {
        setShowSearch(false)
      }
    }
    
    if (showSearch) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showSearch])

  return (
    <nav className="relative z-50 backdrop-blur-xl mx-auto"
    style={{
      backgroundColor: isDark ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.8)',
      borderColor: isDark ? 'rgba(168, 85, 247, 0.2)' : 'rgba(124, 58, 237, 0.25)',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderTopColor: isDark ? 'rgba(168, 85, 247, 0.2)' : 'transparent',
      borderRightColor: isDark ? 'rgba(168, 85, 247, 0.2)' : 'rgba(124, 58, 237, 0.25)',
      borderBottomColor: isDark ? 'rgba(168, 85, 247, 0.2)' : 'rgba(124, 58, 237, 0.25)',
      borderLeftColor: isDark ? 'rgba(168, 85, 247, 0.2)' : 'rgba(124, 58, 237, 0.25)',
      borderRadius: '1.5rem',
      width: 'calc(100% - 2rem)',
      maxWidth: 'calc(1280px + 2rem)',
      marginTop: '1rem'
    }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <div>
              <span className={`text-xl lg:text-2xl font-bold bg-clip-text text-transparent ${
                isDark 
                  ? 'bg-gradient-to-r from-purple-300 via-purple-200 to-purple-300' 
                  : 'bg-gradient-to-r from-purple-700 via-purple-600 to-purple-700'
              }`} style={{ 
                textShadow: isDark 
                  ? '0 0 30px rgba(196,181,253,0.5), 0 0 60px rgba(196,181,253,0.3)' 
                  : 'none' 
              }}>TekInPlant</span>
              <div className={`text-xs -mt-1 ${isDark ? 'text-white/60' : 'text-gray-700/70'}`}>Portal</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* Home */}
            <Link
              href="/"
              className={`text-sm font-medium transition-all duration-300 px-3 py-2 rounded-xl relative group ${
                isDark ? 'text-white/70 hover:text-white' : 'text-gray-800/80 hover:text-gray-900'
              }`}
              style={{ 
                backgroundColor: pathname === '/' 
                  ? (isDark ? 'rgba(168,85,247,0.1)' : 'rgba(124,58,237,0.15)')
                  : 'transparent'
              }}
              onMouseEnter={(e) => {
                if (pathname !== '/') {
                  e.currentTarget.style.backgroundColor = isDark ? 'rgba(168,85,247,0.08)' : 'rgba(124,58,237,0.1)'
                }
              }}
              onMouseLeave={(e) => {
                if (pathname !== '/') {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }
              }}
            >
              Home
            </Link>

            {/* Courses */}
            <Link
              href="/courses"
              className={`text-sm font-medium transition-all duration-300 px-3 py-2 rounded-xl ${
                isDark ? 'text-white/70 hover:text-white' : 'text-gray-800/80 hover:text-gray-900'
              }`}
              style={{ 
                backgroundColor: pathname?.startsWith('/courses') 
                  ? (isDark ? 'rgba(168,85,247,0.1)' : 'rgba(124,58,237,0.15)')
                  : 'transparent'
              }}
              onMouseEnter={(e) => {
                if (!pathname?.startsWith('/courses')) {
                  e.currentTarget.style.backgroundColor = isDark ? 'rgba(168,85,247,0.08)' : 'rgba(124,58,237,0.1)'
                }
              }}
              onMouseLeave={(e) => {
                if (!pathname?.startsWith('/courses')) {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }
              }}
            >
              Courses
            </Link>

            {/* Partners */}
            <Link
              href="/partners"
              className={`text-sm font-medium transition-all duration-300 px-3 py-2 rounded-xl ${
                isDark ? 'text-white/70 hover:text-white' : 'text-gray-800/80 hover:text-gray-900'
              }`}
              style={{ 
                backgroundColor: pathname === '/partners' 
                  ? (isDark ? 'rgba(168,85,247,0.1)' : 'rgba(124,58,237,0.15)')
                  : 'transparent'
              }}
              onMouseEnter={(e) => {
                if (pathname !== '/partners') {
                  e.currentTarget.style.backgroundColor = isDark ? 'rgba(168,85,247,0.08)' : 'rgba(124,58,237,0.1)'
                }
              }}
              onMouseLeave={(e) => {
                if (pathname !== '/partners') {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }
              }}
            >
              Partners
            </Link>

            {/* Dashboard - Only visible when logged in */}
            {isLoaded && user && (
              <Link
                href={getDashboardLink()}
                className={`text-sm font-medium transition-all duration-300 px-3 py-2 rounded-xl ${
                  isDark ? 'text-white/70 hover:text-white' : 'text-gray-800/80 hover:text-gray-900'
                }`}
                style={{ 
                  backgroundColor: pathname?.startsWith('/student-dashboard') || pathname?.startsWith('/admin-dashboard') || pathname?.startsWith('/trainer-dashboard') || pathname?.startsWith('/corporate-dashboard') 
                    ? (isDark ? 'rgba(168,85,247,0.1)' : 'rgba(124,58,237,0.15)')
                    : 'transparent'
                }}
                onMouseEnter={(e) => {
                  if (!pathname?.startsWith('/student-dashboard') && !pathname?.startsWith('/admin-dashboard') && !pathname?.startsWith('/trainer-dashboard') && !pathname?.startsWith('/corporate-dashboard')) {
                    e.currentTarget.style.backgroundColor = isDark ? 'rgba(168,85,247,0.08)' : 'rgba(124,58,237,0.1)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!pathname?.startsWith('/student-dashboard') && !pathname?.startsWith('/admin-dashboard') && !pathname?.startsWith('/trainer-dashboard') && !pathname?.startsWith('/corporate-dashboard')) {
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }
                }}
              >
                Dashboard
              </Link>
            )}

            {/* About / Contact */}
            <Link
              href="/about"
              className={`text-sm font-medium transition-all duration-300 px-3 py-2 rounded-xl ${
                isDark ? 'text-white/70 hover:text-white' : 'text-gray-800/80 hover:text-gray-900'
              }`}
              style={{ 
                backgroundColor: pathname === '/about' 
                  ? (isDark ? 'rgba(168,85,247,0.1)' : 'rgba(124,58,237,0.15)')
                  : 'transparent'
              }}
              onMouseEnter={(e) => {
                if (pathname !== '/about') {
                  e.currentTarget.style.backgroundColor = isDark ? 'rgba(168,85,247,0.08)' : 'rgba(124,58,237,0.1)'
                }
              }}
              onMouseLeave={(e) => {
                if (pathname !== '/about') {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }
              }}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`text-sm font-medium transition-all duration-300 px-3 py-2 rounded-xl ${
                isDark ? 'text-white/70 hover:text-white' : 'text-gray-800/80 hover:text-gray-900'
              }`}
              style={{ 
                backgroundColor: pathname === '/contact' 
                  ? (isDark ? 'rgba(168,85,247,0.1)' : 'rgba(124,58,237,0.15)')
                  : 'transparent'
              }}
              onMouseEnter={(e) => {
                if (pathname !== '/contact') {
                  e.currentTarget.style.backgroundColor = isDark ? 'rgba(168,85,247,0.08)' : 'rgba(124,58,237,0.1)'
                }
              }}
              onMouseLeave={(e) => {
                if (pathname !== '/contact') {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }
              }}
            >
              Contact
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {user && userRole === "admin" && pathname?.startsWith("/admin-dashboard") && (
            <button className={`p-2 transition-all duration-300 rounded-xl relative ${
              isDark ? 'text-white/70 hover:text-white' : 'text-gray-800/80 hover:text-gray-900'
            }`}
            style={{ backgroundColor: 'transparent' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDark ? 'rgba(168,85,247,0.1)' : 'rgba(124,58,237,0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
            )}
            
            {/* Theme Toggle Button */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className={`p-2 transition-all duration-300 rounded-xl ${
                  isDark ? 'text-white/70 hover:text-white' : 'text-gray-800/80 hover:text-gray-900'
                }`}
                style={{ backgroundColor: 'transparent' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDark ? 'rgba(168,85,247,0.1)' : 'rgba(124,58,237,0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun size={20} />
                ) : (
                  <Moon size={20} />
                )}
              </button>
            )}
            
            {isLoaded && user ? (
              <div 
                className="relative user-menu z-50"
                onMouseEnter={() => {
                  if (userMenuTimerRef.current) {
                    clearTimeout(userMenuTimerRef.current)
                    userMenuTimerRef.current = null
                  }
                }}
                onMouseLeave={() => {
                  const timer = setTimeout(() => {
                    setShowUserMenu(false)
                  }, 1500)
                  userMenuTimerRef.current = timer
                }}
              >
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className={`flex items-center space-x-2 p-2 transition-all duration-300 rounded-xl ${
                    isDark ? 'text-white/70 hover:text-white' : 'text-gray-800/80 hover:text-gray-900'
                  }`}
                  style={{ backgroundColor: 'transparent' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDark ? 'rgba(168,85,247,0.1)' : 'rgba(124,58,237,0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden relative"
                  style={{ background: user?.imageUrl ? 'transparent' : themeStyles.buttonGradient }}>
                    {user?.imageUrl ? (
                      <>
                        <img
                          src={user.imageUrl}
                          alt={userName}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                            const fallback = e.currentTarget.nextElementSibling
                            if (fallback) {
                              fallback.style.display = 'flex'
                            }
                          }}
                        />
                        <span className="text-white text-sm font-medium absolute inset-0 flex items-center justify-center" style={{ display: 'none' }}>
                          {userName.charAt(0).toUpperCase()}
                        </span>
                      </>
                    ) : (
                      <span className="text-white text-sm font-medium">{userName.charAt(0).toUpperCase()}</span>
                    )}
                  </div>
                  <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{userName}</span>
                </button>
                
                {showUserMenu && (
                  <div 
                    className="absolute right-0 mt-2 w-48 rounded-xl p-2 border backdrop-blur-xl z-50"
                    style={{
                      backgroundColor: isDark ? 'rgba(168,85,247,0.08)' : 'rgba(255,255,255,0.9)',
                      borderColor: isDark ? 'rgba(168,85,247,0.25)' : 'rgba(124,58,237,0.3)',
                      boxShadow: isDark 
                        ? '0 0 20px rgba(196,181,253,0.3), 0 0 40px rgba(196,181,253,0.2)'
                        : '0 0 20px rgba(58,46,31,0.15), 0 0 40px rgba(58,46,31,0.1)'
                    }}
                    onMouseEnter={() => {
                      if (userMenuTimerRef.current) {
                        clearTimeout(userMenuTimerRef.current)
                        userMenuTimerRef.current = null
                      }
                    }}
                  >
                    <div className="px-3 py-2 border-b" style={{ borderColor: isDark ? 'rgba(168,85,247,0.2)' : 'rgba(124,58,237,0.25)' }}>
                      <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{userName}</p>
                      <p className={`text-xs ${isDark ? 'text-white/60' : 'text-gray-900/70'}`}>{userEmail}</p>
                      <p className={`text-xs capitalize ${isDark ? 'text-purple-400' : 'text-purple-700'}`}>{userRole}</p>
                    </div>
                    <Link
                      href="/profile"
                      className={`flex items-center space-x-2 px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                        isDark ? 'text-white/70 hover:text-white' : 'text-gray-800/80 hover:text-gray-900'
                      }`}
                      style={{ backgroundColor: 'transparent' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDark ? 'rgba(168,85,247,0.15)' : 'rgba(124,58,237,0.15)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      onClick={() => setShowUserMenu(false)}
                    >
                      <Settings size={16} />
                      <span>Profile Settings</span>
                    </Link>
                    <Link
                      href={getDashboardLink()}
                      className={`flex items-center space-x-2 px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                        isDark ? 'text-white/70 hover:text-white' : 'text-gray-800/80 hover:text-gray-900'
                      }`}
                      style={{ backgroundColor: 'transparent' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDark ? 'rgba(168,85,247,0.15)' : 'rgba(124,58,237,0.15)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      onClick={() => setShowUserMenu(false)}
                    >
                      <User size={16} />
                      <span>Dashboard</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 px-3 py-2 text-sm text-red-400 hover:text-red-300 rounded-lg transition-all duration-200 w-full text-left"
                      style={{ backgroundColor: 'transparent' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(239,68,68,0.15)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <LogOut size={16} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="text-sm px-6 py-2 rounded-xl transition-all duration-300 hover:opacity-90 backdrop-blur-sm border"
              style={{ 
                background: themeStyles.buttonGradient, 
                color: '#ffffff', 
                borderColor: isDark ? 'rgba(168,85,247,0.4)' : 'rgba(124,58,237,0.4)',
                boxShadow: themeStyles.buttonShadow 
              }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = themeStyles.buttonShadowHover}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = themeStyles.buttonShadow}>
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden p-2 transition-all duration-300 rounded-xl ${
              isDark ? 'text-white/70 hover:text-white' : 'text-gray-800/80 hover:text-gray-900'
            }`}
            style={{ backgroundColor: 'transparent' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDark ? 'rgba(168,85,247,0.1)' : 'rgba(124,58,237,0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden rounded-2xl mt-4 p-6 border backdrop-blur-xl"
          style={{
            backgroundColor: isDark ? 'rgba(168,85,247,0.08)' : 'rgba(255,255,255,0.9)',
            borderColor: isDark ? 'rgba(168,85,247,0.25)' : 'rgba(124,58,237,0.3)',
            boxShadow: isDark 
              ? '0 0 20px rgba(196,181,253,0.3), 0 0 40px rgba(196,181,253,0.2)'
              : '0 0 20px rgba(58,46,31,0.15), 0 0 40px rgba(58,46,31,0.1)'
          }}>
            <div className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className={`text-sm font-medium transition-all duration-300 py-2 px-3 rounded-xl ${
                  isDark ? 'text-white/70 hover:text-white' : 'text-gray-800/80 hover:text-gray-900'
                }`}
                style={{ backgroundColor: pathname === '/' ? (isDark ? 'rgba(168,85,247,0.15)' : 'rgba(124,58,237,0.15)') : 'transparent' }}
                onMouseEnter={(e) => {
                  if (pathname !== '/') {
                    e.currentTarget.style.backgroundColor = isDark ? 'rgba(168,85,247,0.1)' : 'rgba(124,58,237,0.1)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (pathname !== '/') {
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              {/* Courses (mobile) */}
              <Link 
                href="/courses" 
                className={`text-sm font-medium transition-all duration-300 py-2 px-3 rounded-xl ${
                  isDark ? 'text-white/70 hover:text-white' : 'text-gray-800/80 hover:text-gray-900'
                }`}
                style={{ backgroundColor: pathname?.startsWith('/courses') ? (isDark ? 'rgba(168,85,247,0.15)' : 'rgba(124,58,237,0.15)') : 'transparent' }}
                onMouseEnter={(e) => {
                  if (!pathname?.startsWith('/courses')) {
                    e.currentTarget.style.backgroundColor = isDark ? 'rgba(168,85,247,0.1)' : 'rgba(124,58,237,0.1)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!pathname?.startsWith('/courses')) {
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                Courses
              </Link>
              <Link 
                href="/partners" 
                className={`text-sm font-medium transition-all duration-300 py-2 px-3 rounded-xl ${
                  isDark ? 'text-white/70 hover:text-white' : 'text-gray-800/80 hover:text-gray-900'
                }`}
                style={{ backgroundColor: pathname === '/partners' ? (isDark ? 'rgba(168,85,247,0.15)' : 'rgba(124,58,237,0.15)') : 'transparent' }}
                onMouseEnter={(e) => {
                  if (pathname !== '/partners') {
                    e.currentTarget.style.backgroundColor = isDark ? 'rgba(168,85,247,0.1)' : 'rgba(124,58,237,0.1)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (pathname !== '/partners') {
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                Partners
              </Link>
              {/* Dashboard - Only visible when logged in (mobile) */}
              {isLoaded && user && (
                <Link 
                  href={getDashboardLink()}
                  className={`text-sm font-medium transition-all duration-300 py-2 px-3 rounded-xl ${
                    isDark ? 'text-white/70 hover:text-white' : 'text-gray-800/80 hover:text-gray-900'
                  }`}
                  style={{ backgroundColor: pathname?.startsWith('/student-dashboard') || pathname?.startsWith('/admin-dashboard') || pathname?.startsWith('/trainer-dashboard') || pathname?.startsWith('/corporate-dashboard') ? (isDark ? 'rgba(168,85,247,0.15)' : 'rgba(124,58,237,0.15)') : 'transparent' }}
                  onMouseEnter={(e) => {
                    if (!pathname?.startsWith('/student-dashboard') && !pathname?.startsWith('/admin-dashboard') && !pathname?.startsWith('/trainer-dashboard') && !pathname?.startsWith('/corporate-dashboard')) {
                      e.currentTarget.style.backgroundColor = isDark ? 'rgba(168,85,247,0.1)' : 'rgba(124,58,237,0.1)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!pathname?.startsWith('/student-dashboard') && !pathname?.startsWith('/admin-dashboard') && !pathname?.startsWith('/trainer-dashboard') && !pathname?.startsWith('/corporate-dashboard')) {
                      e.currentTarget.style.backgroundColor = 'transparent'
                    }
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}
              <Link 
                href="/about" 
                className={`text-sm font-medium transition-all duration-300 py-2 px-3 rounded-xl ${
                  isDark ? 'text-white/70 hover:text-white' : 'text-gray-800/80 hover:text-gray-900'
                }`}
                style={{ backgroundColor: pathname === '/about' ? (isDark ? 'rgba(168,85,247,0.15)' : 'rgba(124,58,237,0.15)') : 'transparent' }}
                onMouseEnter={(e) => {
                  if (pathname !== '/about') {
                    e.currentTarget.style.backgroundColor = isDark ? 'rgba(168,85,247,0.1)' : 'rgba(124,58,237,0.1)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (pathname !== '/about') {
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className={`text-sm font-medium transition-all duration-300 py-2 px-3 rounded-xl ${
                  isDark ? 'text-white/70 hover:text-white' : 'text-gray-800/80 hover:text-gray-900'
                }`}
                style={{ backgroundColor: pathname === '/contact' ? (isDark ? 'rgba(168,85,247,0.15)' : 'rgba(124,58,237,0.15)') : 'transparent' }}
                onMouseEnter={(e) => {
                  if (pathname !== '/contact') {
                    e.currentTarget.style.backgroundColor = isDark ? 'rgba(168,85,247,0.1)' : 'rgba(124,58,237,0.1)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (pathname !== '/contact') {
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              
              <div className="pt-4 border-t" style={{ borderColor: isDark ? 'rgba(168,85,247,0.2)' : 'rgba(124,58,237,0.25)' }}>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="relative search-container flex-1">
                    <form onSubmit={handleSearch} className="relative">
                      <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-white/50' : 'text-gray-900/50'}`} size={18} />
                      <input
                        type="text"
                        placeholder="Search courses..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={`w-full pl-10 pr-4 py-2 rounded-xl focus:outline-none transition-all duration-300 backdrop-blur-sm border text-sm ${
                          isDark ? 'text-white placeholder-white/40' : 'text-gray-900 placeholder-gray-600/50'
                        }`}
                        style={{
                          backgroundColor: isDark ? 'rgba(168,85,247,0.08)' : 'rgba(255,255,255,0.8)',
                          borderColor: isDark ? 'rgba(168,85,247,0.3)' : 'rgba(124,58,237,0.3)'
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.6)' : 'rgba(124,58,237,0.6)'
                          e.currentTarget.style.backgroundColor = isDark ? 'rgba(168,85,247,0.12)' : 'rgba(255,255,255,0.95)'
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.3)' : 'rgba(124,58,237,0.3)'
                          e.currentTarget.style.backgroundColor = isDark ? 'rgba(168,85,247,0.08)' : 'rgba(255,255,255,0.8)'
                        }}
                      />
                    </form>
                  </div>
                  {user && userRole === "admin" && pathname?.startsWith("/admin-dashboard") && (
                  <button className={`p-2 transition-all duration-300 rounded-xl relative ${
                    isDark ? 'text-white/70 hover:text-white' : 'text-gray-800/80 hover:text-gray-900'
                  }`}
                  style={{ backgroundColor: 'transparent' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDark ? 'rgba(168,85,247,0.1)' : 'rgba(124,58,237,0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <Bell size={20} />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                  </button>
                  )}
                  
                  {/* Theme Toggle Button (Mobile) */}
                  {mounted && (
                    <button
                      onClick={() => {
                        setTheme(theme === "dark" ? "light" : "dark")
                        setIsMenuOpen(false)
                      }}
                      className={`p-2 transition-all duration-300 rounded-xl ${
                        isDark ? 'text-white/70 hover:text-white' : 'text-gray-800/80 hover:text-gray-900'
                      }`}
                      style={{ backgroundColor: 'transparent' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDark ? 'rgba(168,85,247,0.1)' : 'rgba(124,58,237,0.1)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      aria-label="Toggle theme"
                    >
                      {theme === "dark" ? (
                        <Sun size={20} />
                      ) : (
                        <Moon size={20} />
                      )}
                    </button>
                  )}
                </div>
                
                {isLoaded && user ? (
                  <div className="space-y-3">
                    <div className="px-3 py-2 rounded-lg backdrop-blur-sm border"
                    style={{
                      backgroundColor: isDark ? 'rgba(168,85,247,0.08)' : 'rgba(255,255,255,0.9)',
                      borderColor: isDark ? 'rgba(168,85,247,0.25)' : 'rgba(124,58,237,0.3)'
                    }}>
                      <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{userName}</p>
                      <p className={`text-xs ${isDark ? 'text-white/60' : 'text-gray-900/70'}`}>{userEmail}</p>
                      <p className={`text-xs capitalize ${isDark ? 'text-purple-400' : 'text-purple-700'}`}>{userRole}</p>
                    </div>
                    <Link 
                      href="/profile"
                      className="w-full text-center py-3 rounded-xl transition-all duration-300 hover:opacity-90 backdrop-blur-sm border mb-3"
                      style={{ 
                        background: themeStyles.buttonGradient, 
                        color: '#ffffff', 
                        borderColor: isDark ? 'rgba(168,85,247,0.4)' : 'rgba(124,58,237,0.4)',
                        boxShadow: themeStyles.buttonShadow 
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.boxShadow = themeStyles.buttonShadowHover}
                      onMouseLeave={(e) => e.currentTarget.style.boxShadow = themeStyles.buttonShadow}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Profile Settings
                    </Link>
                    <Link 
                      href={getDashboardLink()}
                      className="w-full text-center py-3 rounded-xl transition-all duration-300 hover:opacity-90 backdrop-blur-sm border mb-3"
                      style={{ 
                        background: themeStyles.buttonGradient, 
                        color: '#ffffff', 
                        borderColor: isDark ? 'rgba(168,85,247,0.4)' : 'rgba(124,58,237,0.4)',
                        boxShadow: themeStyles.buttonShadow 
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.boxShadow = themeStyles.buttonShadowHover}
                      onMouseLeave={(e) => e.currentTarget.style.boxShadow = themeStyles.buttonShadow}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="w-full text-center py-3 rounded-xl border text-red-400 hover:text-red-300 transition-all duration-300"
                      style={{ 
                        borderColor: 'rgba(239,68,68,0.3)',
                        backgroundColor: 'transparent'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(239,68,68,0.1)'
                        e.currentTarget.style.borderColor = 'rgba(239,68,68,0.5)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent'
                        e.currentTarget.style.borderColor = 'rgba(239,68,68,0.3)'
                      }}
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <Link 
                    href="/login" 
                    className="w-full text-center py-3 rounded-xl transition-all duration-300 hover:opacity-90 backdrop-blur-sm border"
                    style={{ 
                      background: themeStyles.buttonGradient, 
                      color: '#ffffff', 
                      borderColor: isDark ? 'rgba(168,85,247,0.4)' : 'rgba(124,58,237,0.4)',
                      boxShadow: themeStyles.buttonShadow 
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.boxShadow = themeStyles.buttonShadowHover}
                    onMouseLeave={(e) => e.currentTarget.style.boxShadow = themeStyles.buttonShadow}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
