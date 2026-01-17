"use client"

import { useState, useEffect, useLayoutEffect } from "react"
import { Send, ChevronDown, MessageCircle, Lock, Linkedin, Youtube, Instagram, Mail, Phone, MapPin } from "lucide-react"
import Navbar from "../../src/components/Navbar"
import { useTheme } from "next-themes"
import { useThemeStyles } from "../../lib/theme-styles"
import { toast } from "sonner"

export default function ContactPage() {
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
    // Ensure theme is initialized before reading (prevents flash)
    if (typeof document !== 'undefined') {
      const isInitialized = document.documentElement.hasAttribute('data-theme-initialized')
      if (!isInitialized) {
        // Wait for theme initialization
        const checkTheme = setInterval(() => {
          if (document.documentElement.hasAttribute('data-theme-initialized')) {
            clearInterval(checkTheme)
            const dataTheme = document.documentElement.getAttribute('data-theme')
            setIsDark(dataTheme === 'dark')
          }
        }, 10)
        return () => clearInterval(checkTheme)
      }
    }
    
    if (resolvedTheme) {
      setIsDark(resolvedTheme === 'dark')
    } else if (typeof window !== 'undefined') {
      const dataTheme = document.documentElement.getAttribute('data-theme')
      if (dataTheme) {
        setIsDark(dataTheme === 'dark')
      }
    }
  }, [resolvedTheme])
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        const errorMessage = data.details || data.error || 'Failed to send message'
        const errorHint = data.hint ? `\n\n${data.hint}` : ''
        throw new Error(errorMessage + errorHint)
      }

      // Success
      toast.success("Message sent successfully!", {
        description: "We'll get back to you soon.",
        duration: 4000,
      })
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (error: any) {
      console.error('Error submitting contact form:', error)
      toast.error("Failed to send message", {
        description: error.message || "Please try again later.",
        duration: 5000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const faqs = [
    {
      question: "How do I enroll in a training program?",
      answer: "You can enroll directly through our website by selecting your desired course and following the enrollment process. You can also contact us for personalized assistance."
    },
    {
      question: "What payment options do you accept?",
      answer: "We accept all major credit cards, debit cards, and online banking transfers. We also offer flexible payment plans for longer programs."
    },
    {
      question: "Do you provide certificates upon completion?",
      answer: "Yes, all our training programs provide industry-recognized certificates upon successful completion. These certificates are widely accepted by employers."
    },
    {
      question: "Can I get a refund if I'm not satisfied?",
      answer: "We offer a 30-day money-back guarantee for all our training programs. If you're not satisfied with the course, you can request a full refund."
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
      <div style={{ 
        position: 'relative',
        zIndex: 50,
        border: 'none',
        borderTop: 'none',
        paddingTop: 0,
        marginTop: 0,
        backgroundColor: themeStyles.pageBg
      }}>
      <Navbar />
      </div>
      
      {/* Header */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-[1px]" style={{ background: themeStyles.pageBgGradient }}></div>
        <div className="slide-up relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center mb-16">
            <div className="slide-up inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm border" style={{ 
              backgroundColor: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.7)',
              borderColor: isDark ? 'rgba(168,85,247,0.2)' : 'rgba(139,90,43,0.25)',
              transitionDelay: '0.1s' 
            }}>
              <span className={`text-xs font-medium tracking-wide uppercase ${isDark ? 'text-white/70' : 'text-purple-900/80'}`}>Get in Touch</span>
            </div>
            <h1 className="slide-up text-5xl sm:text-6xl lg:text-7xl font-light mb-6 leading-tight tracking-tight" style={{ transitionDelay: '0.2s' }}>
              <span style={{ color: themeStyles.textPrimary }}>Contact</span> <span className={`bg-clip-text text-transparent ${
                isDark 
                  ? 'bg-gradient-to-r from-purple-300 via-purple-200 to-purple-300' 
                  : 'bg-gradient-to-r from-purple-800 via-purple-700 to-purple-800'
              }`}>Us</span>
            </h1>
            <p className="slide-up text-lg sm:text-xl max-w-3xl mx-auto mb-16 font-light leading-relaxed" style={{ 
              transitionDelay: '0.3s',
              color: themeStyles.textSecondary,
              opacity: isDark ? 0.5 : 0.8
            }}>
              Have questions about our training programs? We're here to help! Get in touch with our team for personalized assistance.
            </p>
          </div>

          {/* Contact Form */}
          <div className="slide-up max-w-2xl mx-auto" style={{ transitionDelay: '0.4s' }}>
            <div className="rounded-2xl p-8 lg:p-10 backdrop-blur-xl border" style={{ 
              backgroundColor: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.8)',
              borderColor: isDark ? 'rgba(168,85,247,0.2)' : 'rgba(139,90,43,0.3)'
            }}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className={`block text-xs font-medium mb-2 uppercase tracking-wide ${isDark ? 'text-white/60' : 'text-purple-900/70'}`}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={`w-full px-5 py-3.5 rounded-xl focus:outline-none transition-all duration-300 backdrop-blur-sm border font-light ${
                        isDark ? 'text-white placeholder-white/30' : 'text-purple-900 placeholder-purple-900/50'
                      }`}
                      style={{ 
                        backgroundColor: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.9)',
                        borderColor: isDark ? 'rgba(168,85,247,0.2)' : 'rgba(139,90,43,0.3)'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.6)' : 'rgba(139,90,43,0.6)'
                        e.currentTarget.style.boxShadow = isDark ? '0 0 0 2px rgba(168,85,247,0.2)' : '0 0 0 2px rgba(139,90,43,0.2)'
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.2)' : 'rgba(139,90,43,0.3)'
                        e.currentTarget.style.boxShadow = 'none'
                      }}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className={`block text-xs font-medium mb-2 uppercase tracking-wide ${isDark ? 'text-white/60' : 'text-purple-900/70'}`}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`w-full px-5 py-3.5 rounded-xl focus:outline-none transition-all duration-300 backdrop-blur-sm border font-light ${
                        isDark ? 'text-white placeholder-white/30' : 'text-purple-900 placeholder-purple-900/50'
                      }`}
                      style={{ 
                        backgroundColor: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.9)',
                        borderColor: isDark ? 'rgba(168,85,247,0.2)' : 'rgba(139,90,43,0.3)'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.6)' : 'rgba(139,90,43,0.6)'
                        e.currentTarget.style.boxShadow = isDark ? '0 0 0 2px rgba(168,85,247,0.2)' : '0 0 0 2px rgba(139,90,43,0.2)'
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.2)' : 'rgba(139,90,43,0.3)'
                        e.currentTarget.style.boxShadow = 'none'
                      }}
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className={`block text-xs font-medium mb-2 uppercase tracking-wide ${isDark ? 'text-white/60' : 'text-purple-900/70'}`}>
                    Subject
                  </label>
                  <div className="relative">
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className={`w-full px-5 py-3.5 pr-10 rounded-xl focus:outline-none transition-all duration-300 backdrop-blur-xl border appearance-none cursor-pointer font-light ${
                        isDark ? 'text-white' : 'text-purple-900'
                      }`}
                      style={{ 
                        backgroundColor: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.9)',
                        borderColor: isDark ? 'rgba(168,85,247,0.2)' : 'rgba(139,90,43,0.3)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.4)' : 'rgba(139,90,43,0.5)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.2)' : 'rgba(139,90,43,0.3)'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.6)' : 'rgba(139,90,43,0.6)'
                        e.currentTarget.style.boxShadow = isDark ? '0 0 0 2px rgba(168,85,247,0.2)' : '0 0 0 2px rgba(139,90,43,0.2)'
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.2)' : 'rgba(139,90,43,0.3)'
                        e.currentTarget.style.boxShadow = 'none'
                      }}
                    >
                      <option value="" style={{ backgroundColor: isDark ? '#0a0a0a' : '#ffffff', color: isDark ? '#ffffff' : '#3a2e1f' }}>Select a subject</option>
                      <option value="Course Inquiry" style={{ backgroundColor: isDark ? '#0a0a0a' : '#ffffff', color: isDark ? '#ffffff' : '#3a2e1f' }}>Course Inquiry</option>
                      <option value="Enrollment" style={{ backgroundColor: isDark ? '#0a0a0a' : '#ffffff', color: isDark ? '#ffffff' : '#3a2e1f' }}>Enrollment</option>
                      <option value="Technical Support" style={{ backgroundColor: isDark ? '#0a0a0a' : '#ffffff', color: isDark ? '#ffffff' : '#3a2e1f' }}>Technical Support</option>
                      <option value="Partnership" style={{ backgroundColor: isDark ? '#0a0a0a' : '#ffffff', color: isDark ? '#ffffff' : '#3a2e1f' }}>Partnership</option>
                      <option value="General" style={{ backgroundColor: isDark ? '#0a0a0a' : '#ffffff', color: isDark ? '#ffffff' : '#3a2e1f' }}>General</option>
                    </select>
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <ChevronDown className="w-4 h-4" style={{ color: isDark ? '#c084fc' : '#a78bfa' }} />
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className={`block text-xs font-medium mb-2 uppercase tracking-wide ${isDark ? 'text-white/60' : 'text-purple-900/70'}`}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className={`w-full px-5 py-3.5 rounded-xl focus:outline-none transition-all duration-300 resize-none backdrop-blur-sm border font-light ${
                      isDark ? 'text-white placeholder-white/30' : 'text-purple-900 placeholder-purple-900/50'
                    }`}
                    style={{ 
                      backgroundColor: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.9)',
                      borderColor: isDark ? 'rgba(168,85,247,0.2)' : 'rgba(139,90,43,0.3)'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.6)' : 'rgba(139,90,43,0.6)'
                      e.currentTarget.style.boxShadow = isDark ? '0 0 0 2px rgba(168,85,247,0.2)' : '0 0 0 2px rgba(139,90,43,0.2)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.2)' : 'rgba(139,90,43,0.3)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                    placeholder="Tell us how we can help you..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3.5 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm border disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ 
                    background: themeStyles.buttonGradient, 
                    color: '#ffffff',
                    borderColor: isDark ? 'rgba(168,85,247,0.4)' : 'rgba(168,85,247,0.4)',
                    boxShadow: themeStyles.buttonShadow
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.transform = 'scale(1.02)'
                      e.currentTarget.style.boxShadow = themeStyles.buttonShadowHover
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)'
                    e.currentTarget.style.boxShadow = themeStyles.buttonShadow
                  }}
                >
                  <Send size={18} className={isSubmitting ? 'animate-pulse' : ''} />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-[1px]" style={{ background: themeStyles.pageBgGradient }}></div>
        <div className="slide-up relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              { icon: Mail, title: "Email", content: "contact@tekinplant.com" },
              { icon: Phone, title: "Phone", content: "+91 9860970798" },
              { icon: MapPin, title: "Location", content: "Bangalore, India" }
            ].map((item, index) => {
              const itemBorder = isDark ? 'rgba(124,58,237,0.25)' : 'rgba(124,58,237,0.25)'
              const itemBg = isDark ? 'rgba(124,58,237,0.10)' : 'transparent'
              const iconColor = isDark ? '#8b5cf6' : '#7c3aed'
              
              return (
                <div key={index} className="text-center">
                  <div className="flash-card-container mx-auto mb-6" style={{ width: '80px', height: '80px' }}>
                    <div className="flash-card-inner">
                      {/* Front of card - Icon only */}
                      <div
                        className="flash-card-face flash-card-front rounded-xl"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: itemBg,
                          border: `1px solid ${itemBorder}`,
                          boxShadow: isDark
                            ? '0 8px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.05)'
                            : '0 8px 24px rgba(30,41,59,0.15), inset 0 1px 0 rgba(255,255,255,0.1)',
                        }}
                      >
                        <item.icon
                          className="w-12 h-12 transition-transform duration-300"
                          style={{ color: iconColor }}
                        />
                      </div>

                      {/* Back of card - Title */}
                      <div
                        className="flash-card-face flash-card-back rounded-xl"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: itemBg,
                          border: `1px solid ${itemBorder}`,
                          boxShadow: isDark
                            ? '0 16px 40px rgba(0,0,0,0.35), 0 0 30px rgba(124,58,237,0.35)'
                            : '0 16px 40px rgba(30,41,59,0.25), 0 0 30px rgba(124,58,237,0.25)',
                        }}
                      >
                        <h3 className={`text-sm font-light px-2 ${isDark ? 'text-white' : 'text-purple-900'}`}>{item.title}</h3>
                      </div>
                    </div>
                  </div>
                  <h3 className={`text-lg font-light mb-2 ${isDark ? 'text-white' : 'text-purple-900'}`}>{item.title}</h3>
                  <p className={`font-light ${isDark ? 'text-white/50' : 'text-purple-900/70'}`}>{item.content}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-[1px]" style={{ background: themeStyles.pageBgGradient }}></div>
        <div className="slide-up relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center mb-16">
            <div className="slide-up inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm border" style={{ 
              backgroundColor: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.7)',
              borderColor: isDark ? 'rgba(168,85,247,0.2)' : 'rgba(139,90,43,0.25)',
              transitionDelay: '0.1s' 
            }}>
              <MessageCircle className="w-3.5 h-3.5" style={{ color: isDark ? '#a855f7' : '#a78bfa' }} />
              <span className={`text-xs font-medium tracking-wide uppercase ${isDark ? 'text-white/70' : 'text-purple-900/80'}`}>Common Questions</span>
            </div>
            <h2 className="slide-up text-4xl lg:text-5xl font-light mb-6 leading-tight tracking-tight" style={{ transitionDelay: '0.2s' }}>
              <span style={{ color: themeStyles.textPrimary }}>Frequently Asked</span> <span className={`bg-clip-text text-transparent ${
                isDark 
                  ? 'bg-gradient-to-r from-purple-300 to-purple-400' 
                  : 'bg-gradient-to-r from-purple-800 to-purple-700'
              }`}>Questions</span>
            </h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const faqBg = isDark ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.7)'
              const faqBorder = isDark ? 'rgba(168,85,247,0.2)' : 'rgba(139,90,43,0.3)'
              
              return (
              <div 
                key={index} 
                className="slide-up p-6 rounded-xl border transition-all duration-500" 
                style={{ 
                  backgroundColor: faqBg,
                  borderColor: faqBorder,
                  transitionDelay: `${0.3 + index * 0.1}s`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = isDark ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.9)'
                  e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.3)' : 'rgba(139,90,43,0.4)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = faqBg
                  e.currentTarget.style.borderColor = faqBorder
                }}
              >
                <h3 className={`text-lg font-light mb-3 ${isDark ? 'text-white' : 'text-purple-900'}`}>{faq.question}</h3>
                <p className={`leading-relaxed font-light ${isDark ? 'text-white/50' : 'text-purple-900/70'}`}>{faq.answer}</p>
              </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-[1px]" style={{ background: themeStyles.pageBgGradient }}></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="flex justify-center items-center gap-6">
            <a
              href="#"
              className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 border"
              style={{ 
                backgroundColor: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.7)',
                borderColor: isDark ? 'rgba(168,85,247,0.2)' : 'rgba(139,90,43,0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.4)' : 'rgba(139,90,43,0.5)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.2)' : 'rgba(139,90,43,0.3)'
              }}
              aria-label="LinkedIn"
            >
              <Linkedin className={`w-5 h-5 ${isDark ? 'text-white/60' : 'text-purple-900/70'}`} />
            </a>
            <a
              href="#"
              className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 border"
              style={{ 
                backgroundColor: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.7)',
                borderColor: isDark ? 'rgba(168,85,247,0.2)' : 'rgba(139,90,43,0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.4)' : 'rgba(139,90,43,0.5)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.2)' : 'rgba(139,90,43,0.3)'
              }}
              aria-label="YouTube"
            >
              <Youtube className={`w-5 h-5 ${isDark ? 'text-white/60' : 'text-purple-900/70'}`} />
            </a>
            <a
              href="#"
              className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 border"
              style={{ 
                backgroundColor: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.7)',
                borderColor: isDark ? 'rgba(168,85,247,0.2)' : 'rgba(139,90,43,0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.4)' : 'rgba(139,90,43,0.5)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.borderColor = isDark ? 'rgba(168,85,247,0.2)' : 'rgba(139,90,43,0.3)'
              }}
              aria-label="Instagram"
            >
              <Instagram className={`w-5 h-5 ${isDark ? 'text-white/60' : 'text-purple-900/70'}`} />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}