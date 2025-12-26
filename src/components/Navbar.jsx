"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation"
import { Menu, X, Search, User, Bell, LogOut, Settings } from "lucide-react"
import { useUser, useClerk } from "@clerk/nextjs"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showCoursesDropdown, setShowCoursesDropdown] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const coursesDropdownTimerRef = useRef(null)
  const userMenuTimerRef = useRef(null)
  const searchInputRef = useRef(null)
  const router = useRouter()
  const pathname = usePathname()
  const { user, isLoaded } = useUser()
  const { signOut } = useClerk()
  
  // Get user role from Clerk metadata
  const userRole = (user?.publicMetadata?.role) || 'student'
  const userName = user?.fullName || user?.firstName || user?.emailAddresses[0]?.emailAddress || 'User'
  const userEmail = user?.emailAddresses[0]?.emailAddress || ''

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
      if (coursesDropdownTimerRef.current) clearTimeout(coursesDropdownTimerRef.current)
      if (userMenuTimerRef.current) clearTimeout(userMenuTimerRef.current)
    }
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
    <nav className={`fixed top-0 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'backdrop-blur-xl border' 
        : 'bg-transparent'
    }`}
    style={isScrolled ? {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      borderColor: 'rgba(168, 85, 247, 0.2)',
      borderRadius: '1.5rem',
      width: 'calc(100% - 2rem)',
      maxWidth: 'calc(1280px + 2rem)',
      marginTop: '1rem'
    } : {
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
              <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-purple-300 via-purple-200 to-purple-300 bg-clip-text text-transparent" style={{ textShadow: '0 0 30px rgba(196,181,253,0.5), 0 0 60px rgba(196,181,253,0.3)' }}>TekInPlant</span>
              <div className="text-xs text-white/60 -mt-1">Portal</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* Home */}
            <Link
              href="/"
              className="text-sm font-medium transition-all duration-300 text-white/70 hover:text-white px-3 py-2 rounded-xl relative group"
              style={{ 
                backgroundColor: pathname === '/' ? 'rgba(168,85,247,0.1)' : 'transparent'
              }}
              onMouseEnter={(e) => {
                if (pathname !== '/') {
                  e.currentTarget.style.backgroundColor = 'rgba(168,85,247,0.08)'
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

            {/* Courses + sub‑pages */}
            <div 
              className="relative group"
              onMouseEnter={() => {
                if (coursesDropdownTimerRef.current) {
                  clearTimeout(coursesDropdownTimerRef.current)
                  coursesDropdownTimerRef.current = null
                }
                setShowCoursesDropdown(true)
              }}
              onMouseLeave={() => {
                const timer = setTimeout(() => {
                  setShowCoursesDropdown(false)
                }, 1500)
                coursesDropdownTimerRef.current = timer
              }}
            >
              <Link
                href="/courses"
                className="inline-flex items-center text-sm font-medium transition-all duration-300 text-white/70 hover:text-white px-3 py-2 rounded-xl"
                style={{ 
                  backgroundColor: pathname?.startsWith('/courses') ? 'rgba(168,85,247,0.1)' : 'transparent'
                }}
                onMouseEnter={(e) => {
                  if (!pathname?.startsWith('/courses')) {
                    e.currentTarget.style.backgroundColor = 'rgba(168,85,247,0.08)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!pathname?.startsWith('/courses')) {
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }
                }}
              >
              Courses
                <span className="ml-1 text-xs text-white/50">▼</span>
              </Link>
              <div 
                className={`${showCoursesDropdown ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'} transition-all duration-200 absolute left-0 mt-3 w-64 rounded-2xl border backdrop-blur-xl z-40`}
                style={{
                  backgroundColor: 'rgba(168,85,247,0.08)',
                  borderColor: 'rgba(168,85,247,0.25)',
                  boxShadow: '0 0 20px rgba(196,181,253,0.3), 0 0 40px rgba(196,181,253,0.2)'
                }}
                onMouseEnter={() => {
                  if (coursesDropdownTimerRef.current) {
                    clearTimeout(coursesDropdownTimerRef.current)
                    coursesDropdownTimerRef.current = null
                  }
                  setShowCoursesDropdown(true)
                }}
              >
                <div className="py-3">
                  <Link
                    href="/courses"
                    className="block px-4 py-2 text-sm text-white/80 hover:text-white rounded-lg transition-all duration-200"
                    style={{ backgroundColor: 'transparent' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(168,85,247,0.15)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    All Courses
                  </Link>
                  {/* Example course detail pages – these map to app/courses/[id] */}
                  <Link
                    href="/courses/1"
                    className="block px-4 py-2 text-sm text-white/70 hover:text-white rounded-lg transition-all duration-200"
                    style={{ backgroundColor: 'transparent' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(168,85,247,0.15)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    PLC Programming &amp; Automation
                  </Link>
                  <Link
                    href="/courses/2"
                    className="block px-4 py-2 text-sm text-white/70 hover:text-white rounded-lg transition-all duration-200"
                    style={{ backgroundColor: 'transparent' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(168,85,247,0.15)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    Industrial SCADA &amp; HMI
                  </Link>
                  <Link
                    href="/courses/3"
                    className="block px-4 py-2 text-sm text-white/70 hover:text-white rounded-lg transition-all duration-200"
                    style={{ backgroundColor: 'transparent' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(168,85,247,0.15)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    Drives &amp; Motion Control
                  </Link>
                </div>
                <div className="border-t py-2" style={{ borderColor: 'rgba(168,85,247,0.2)' }}>
                  {/* Example deep links into other course‑related flows */}
                  <Link
                    href="/enroll/1"
                    className="block px-4 py-2 text-xs text-white/60 hover:text-white rounded-lg transition-all duration-200"
                    style={{ backgroundColor: 'transparent' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(168,85,247,0.15)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    Enroll in Course #1
                  </Link>
                  <Link
                    href="/certificate/1"
                    className="block px-4 py-2 text-xs text-white/60 hover:text-white rounded-lg transition-all duration-200"
                    style={{ backgroundColor: 'transparent' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(168,85,247,0.15)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    View Sample Certificate
            </Link>
                </div>
              </div>
            </div>

            {/* Partners */}
            <Link
              href="/partners"
              className="text-sm font-medium transition-all duration-300 text-white/70 hover:text-white px-3 py-2 rounded-xl"
              style={{ 
                backgroundColor: pathname === '/partners' ? 'rgba(168,85,247,0.1)' : 'transparent'
              }}
              onMouseEnter={(e) => {
                if (pathname !== '/partners') {
                  e.currentTarget.style.backgroundColor = 'rgba(168,85,247,0.08)'
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

            {/* About / Contact */}
            <Link
              href="/about"
              className="text-sm font-medium transition-all duration-300 text-white/70 hover:text-white px-3 py-2 rounded-xl"
              style={{ 
                backgroundColor: pathname === '/about' ? 'rgba(168,85,247,0.1)' : 'transparent'
              }}
              onMouseEnter={(e) => {
                if (pathname !== '/about') {
                  e.currentTarget.style.backgroundColor = 'rgba(168,85,247,0.08)'
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
              className="text-sm font-medium transition-all duration-300 text-white/70 hover:text-white px-3 py-2 rounded-xl"
              style={{ 
                backgroundColor: pathname === '/contact' ? 'rgba(168,85,247,0.1)' : 'transparent'
              }}
              onMouseEnter={(e) => {
                if (pathname !== '/contact') {
                  e.currentTarget.style.backgroundColor = 'rgba(168,85,247,0.08)'
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
            <div className="relative search-container">
              <button 
                onClick={handleSearchClick}
                className="p-2 text-white/70 hover:text-white transition-all duration-300 rounded-xl"
                style={{ backgroundColor: 'transparent' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(168,85,247,0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
              <Search size={20} />
            </button>
              {showSearch && (
                <div className="absolute right-0 mt-2 w-80 rounded-xl p-4 border backdrop-blur-xl z-50"
                style={{
                  backgroundColor: 'rgba(168,85,247,0.08)',
                  borderColor: 'rgba(168,85,247,0.25)',
                  boxShadow: '0 0 20px rgba(196,181,253,0.3), 0 0 40px rgba(196,181,253,0.2)'
                }}>
                  <form onSubmit={handleSearch} className="space-y-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={18} />
                      <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Search courses, companies..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-xl text-white placeholder-white/40 focus:outline-none transition-all duration-300 backdrop-blur-sm border"
                        style={{
                          backgroundColor: 'rgba(168,85,247,0.08)',
                          borderColor: 'rgba(168,85,247,0.3)'
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(168,85,247,0.6)'
                          e.currentTarget.style.backgroundColor = 'rgba(168,85,247,0.12)'
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(168,85,247,0.3)'
                          e.currentTarget.style.backgroundColor = 'rgba(168,85,247,0.08)'
                        }}
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full text-sm py-2 rounded-xl transition-all duration-300 hover:opacity-90 backdrop-blur-sm border border-purple-400/40"
                      style={{ background: 'linear-gradient(to right, #a78bfa, #c084fc, #a78bfa)', color: '#ffffff', boxShadow: '0 0 20px rgba(196,181,253,0.4), 0 0 40px rgba(196,181,253,0.2)' }}
                      onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 25px rgba(196,181,253,0.6), 0 0 50px rgba(196,181,253,0.4)'}
                      onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 0 20px rgba(196,181,253,0.4), 0 0 40px rgba(196,181,253,0.2)'}
                    >
                      Search
                    </button>
                  </form>
                </div>
              )}
            </div>
            {user && userRole === "admin" && pathname?.startsWith("/admin-dashboard") && (
            <button className="p-2 text-white/70 hover:text-white transition-all duration-300 rounded-xl relative"
            style={{ backgroundColor: 'transparent' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(168,85,247,0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
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
                  className="flex items-center space-x-2 p-2 text-white/70 hover:text-white transition-all duration-300 rounded-xl"
                  style={{ backgroundColor: 'transparent' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(168,85,247,0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: 'linear-gradient(to right, #a78bfa, #c084fc, #a78bfa)' }}>
                    <span className="text-white text-sm font-medium">{userName.charAt(0).toUpperCase()}</span>
                  </div>
                  <span className="text-sm font-medium text-white">{userName}</span>
                </button>
                
                {showUserMenu && (
                  <div 
                    className="absolute right-0 mt-2 w-48 rounded-xl p-2 border backdrop-blur-xl z-50"
                    style={{
                      backgroundColor: 'rgba(168,85,247,0.08)',
                      borderColor: 'rgba(168,85,247,0.25)',
                      boxShadow: '0 0 20px rgba(196,181,253,0.3), 0 0 40px rgba(196,181,253,0.2)'
                    }}
                    onMouseEnter={() => {
                      if (userMenuTimerRef.current) {
                        clearTimeout(userMenuTimerRef.current)
                        userMenuTimerRef.current = null
                      }
                    }}
                  >
                    <div className="px-3 py-2 border-b" style={{ borderColor: 'rgba(168,85,247,0.2)' }}>
                      <p className="text-sm font-medium text-white">{userName}</p>
                      <p className="text-xs text-white/60">{userEmail}</p>
                      <p className="text-xs capitalize" style={{ color: '#c084fc' }}>{userRole}</p>
                    </div>
                    <Link
                      href={getDashboardLink()}
                      className="flex items-center space-x-2 px-3 py-2 text-sm text-white/70 hover:text-white rounded-lg transition-all duration-200"
                      style={{ backgroundColor: 'transparent' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(168,85,247,0.15)'}
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
              <Link href="/login" className="text-sm px-6 py-2 rounded-xl transition-all duration-300 hover:opacity-90 backdrop-blur-sm border border-purple-400/40"
              style={{ background: 'linear-gradient(to right, #a78bfa, #c084fc, #a78bfa)', color: '#ffffff', boxShadow: '0 0 20px rgba(196,181,253,0.4), 0 0 40px rgba(196,181,253,0.2)' }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 25px rgba(196,181,253,0.6), 0 0 50px rgba(196,181,253,0.4)'}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 0 20px rgba(196,181,253,0.4), 0 0 40px rgba(196,181,253,0.2)'}>
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-white/70 hover:text-white transition-all duration-300 rounded-xl"
            style={{ backgroundColor: 'transparent' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(168,85,247,0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden rounded-2xl mt-4 p-6 border backdrop-blur-xl"
          style={{
            backgroundColor: 'rgba(168,85,247,0.08)',
            borderColor: 'rgba(168,85,247,0.25)',
            boxShadow: '0 0 20px rgba(196,181,253,0.3), 0 0 40px rgba(196,181,253,0.2)'
          }}>
            <div className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-sm font-medium transition-all duration-300 text-white/70 hover:text-white py-2 px-3 rounded-xl"
                style={{ backgroundColor: pathname === '/' ? 'rgba(168,85,247,0.15)' : 'transparent' }}
                onMouseEnter={(e) => {
                  if (pathname !== '/') {
                    e.currentTarget.style.backgroundColor = 'rgba(168,85,247,0.1)'
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
              {/* Courses + sub‑pages (mobile) */}
              <div>
                <Link 
                  href="/courses" 
                  className="text-sm font-medium transition-all duration-300 text-white/70 hover:text-white py-2 px-3 rounded-xl flex items-center justify-between"
                  style={{ backgroundColor: pathname?.startsWith('/courses') ? 'rgba(168,85,247,0.15)' : 'transparent' }}
                  onMouseEnter={(e) => {
                    if (!pathname?.startsWith('/courses')) {
                      e.currentTarget.style.backgroundColor = 'rgba(168,85,247,0.1)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!pathname?.startsWith('/courses')) {
                      e.currentTarget.style.backgroundColor = 'transparent'
                    }
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>Courses</span>
                </Link>
                <div className="ml-4 mt-1 space-y-1 text-xs text-white/70">
              <Link 
                href="/courses" 
                    className="block py-1 px-3 rounded-lg transition-all duration-200"
                    style={{ backgroundColor: 'transparent' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(168,85,247,0.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    All Courses
                  </Link>
                  <Link
                    href="/courses/1"
                    className="block py-1 px-3 rounded-lg transition-all duration-200"
                    style={{ backgroundColor: 'transparent' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(168,85,247,0.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    PLC Programming &amp; Automation
                  </Link>
                  <Link
                    href="/courses/2"
                    className="block py-1 px-3 rounded-lg transition-all duration-200"
                    style={{ backgroundColor: 'transparent' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(168,85,247,0.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Industrial SCADA &amp; HMI
                  </Link>
                  <Link
                    href="/courses/3"
                    className="block py-1 px-3 rounded-lg transition-all duration-200"
                    style={{ backgroundColor: 'transparent' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(168,85,247,0.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Drives &amp; Motion Control
                  </Link>
                  <Link
                    href="/enroll/1"
                    className="block py-1 px-3 rounded-lg transition-all duration-200 text-[11px] text-white/60"
                    style={{ backgroundColor: 'transparent' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(168,85,247,0.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Enroll in Course #1
                  </Link>
                  <Link
                    href="/certificate/1"
                    className="block py-1 px-3 rounded-lg transition-all duration-200 text-[11px] text-white/60"
                    style={{ backgroundColor: 'transparent' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(168,85,247,0.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                onClick={() => setIsMenuOpen(false)}
              >
                    Sample Certificate
              </Link>
                </div>
              </div>
              <Link 
                href="/partners" 
                className="text-sm font-medium transition-all duration-300 text-white/70 hover:text-white py-2 px-3 rounded-xl"
                style={{ backgroundColor: pathname === '/partners' ? 'rgba(168,85,247,0.15)' : 'transparent' }}
                onMouseEnter={(e) => {
                  if (pathname !== '/partners') {
                    e.currentTarget.style.backgroundColor = 'rgba(168,85,247,0.1)'
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
              <Link 
                href="/about" 
                className="text-sm font-medium transition-all duration-300 text-white/70 hover:text-white py-2 px-3 rounded-xl"
                style={{ backgroundColor: pathname === '/about' ? 'rgba(168,85,247,0.15)' : 'transparent' }}
                onMouseEnter={(e) => {
                  if (pathname !== '/about') {
                    e.currentTarget.style.backgroundColor = 'rgba(168,85,247,0.1)'
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
                className="text-sm font-medium transition-all duration-300 text-white/70 hover:text-white py-2 px-3 rounded-xl"
                style={{ backgroundColor: pathname === '/contact' ? 'rgba(168,85,247,0.15)' : 'transparent' }}
                onMouseEnter={(e) => {
                  if (pathname !== '/contact') {
                    e.currentTarget.style.backgroundColor = 'rgba(168,85,247,0.1)'
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
              
              <div className="pt-4 border-t" style={{ borderColor: 'rgba(168,85,247,0.2)' }}>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="relative search-container flex-1">
                    <form onSubmit={handleSearch} className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={18} />
                      <input
                        type="text"
                        placeholder="Search courses..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-xl text-white placeholder-white/40 focus:outline-none transition-all duration-300 backdrop-blur-sm border text-sm"
                        style={{
                          backgroundColor: 'rgba(168,85,247,0.08)',
                          borderColor: 'rgba(168,85,247,0.3)'
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(168,85,247,0.6)'
                          e.currentTarget.style.backgroundColor = 'rgba(168,85,247,0.12)'
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(168,85,247,0.3)'
                          e.currentTarget.style.backgroundColor = 'rgba(168,85,247,0.08)'
                        }}
                      />
                    </form>
                  </div>
                  {user && userRole === "admin" && pathname?.startsWith("/admin-dashboard") && (
                  <button className="p-2 text-white/70 hover:text-white transition-all duration-300 rounded-xl relative"
                  style={{ backgroundColor: 'transparent' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(168,85,247,0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <Bell size={20} />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                  </button>
                  )}
                </div>
                
                {isLoaded && user ? (
                  <div className="space-y-3">
                    <div className="px-3 py-2 rounded-lg backdrop-blur-sm border"
                    style={{
                      backgroundColor: 'rgba(168,85,247,0.08)',
                      borderColor: 'rgba(168,85,247,0.25)'
                    }}>
                      <p className="text-sm font-medium text-white">{userName}</p>
                      <p className="text-xs text-white/60">{userEmail}</p>
                      <p className="text-xs capitalize" style={{ color: '#c084fc' }}>{userRole}</p>
                    </div>
                    <Link 
                      href={getDashboardLink()}
                      className="w-full text-center py-3 rounded-xl transition-all duration-300 hover:opacity-90 backdrop-blur-sm border border-purple-400/40"
                      style={{ background: 'linear-gradient(to right, #a78bfa, #c084fc, #a78bfa)', color: '#ffffff', boxShadow: '0 0 20px rgba(196,181,253,0.4), 0 0 40px rgba(196,181,253,0.2)' }}
                      onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 25px rgba(196,181,253,0.6), 0 0 50px rgba(196,181,253,0.4)'}
                      onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 0 20px rgba(196,181,253,0.4), 0 0 40px rgba(196,181,253,0.2)'}
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
                    className="w-full text-center py-3 rounded-xl transition-all duration-300 hover:opacity-90 backdrop-blur-sm border border-purple-400/40"
                    style={{ background: 'linear-gradient(to right, #a78bfa, #c084fc, #a78bfa)', color: '#ffffff', boxShadow: '0 0 20px rgba(196,181,253,0.4), 0 0 40px rgba(196,181,253,0.2)' }}
                    onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 25px rgba(196,181,253,0.6), 0 0 50px rgba(196,181,253,0.4)'}
                    onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 0 20px rgba(196,181,253,0.4), 0 0 40px rgba(196,181,253,0.2)'}
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
