"use client"

import { useState, useEffect } from "react"
import { Mail, Phone, MapPin, Clock, Send, ChevronDown } from "lucide-react"
import Navbar from "../../src/components/Navbar"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
    alert("Thank you for your message! We'll get back to you soon.")
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: '#000000' }}>
      <Navbar />
      
      {/* Header */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-[1px]" style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 50%, #000000 100%)' }}></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="slide-up inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 backdrop-blur-sm border border-purple-500/20" style={{ backgroundColor: 'rgba(168,85,247,0.08)', transitionDelay: '0.1s' }}>
              <Mail className="w-4 h-4" style={{ color: '#a855f7' }} />
              <span className="text-sm font-medium text-white/80">Get in Touch</span>
            </div>
            <h1 className="slide-up text-5xl lg:text-6xl font-normal mb-6" style={{ transitionDelay: '0.2s' }}>
              <span className="text-white" style={{ textShadow: '0 0 20px rgba(255,255,255,0.3)' }}>Contact</span> <span className="bg-gradient-to-r from-purple-300 via-purple-200 to-purple-300 bg-clip-text text-transparent" style={{ textShadow: '0 0 30px rgba(196,181,253,0.5), 0 0 60px rgba(196,181,253,0.3)' }}>Us</span>
            </h1>
            <p className="slide-up text-xl text-white/70 max-w-3xl mx-auto leading-relaxed" style={{ transitionDelay: '0.3s' }}>
              Have questions about our training programs? We're here to help! Get in touch with our team for personalized assistance.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <div className="slide-up rounded-2xl px-8 pt-8 pb-6 lg:px-10 lg:pt-10 lg:pb-8 backdrop-blur-xl border border-purple-500/20 transition-all duration-300" style={{ backgroundColor: 'rgba(168,85,247,0.08)', transitionDelay: '0.4s' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 20px rgba(196,181,253,0.5), 0 0 40px rgba(196,181,253,0.3)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}>
              <h2 className="text-2xl lg:text-3xl font-normal mb-8 text-white">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-3 text-white/80">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl text-white placeholder-white/40 focus:outline-none transition-all duration-300 backdrop-blur-sm border"
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
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-3 text-white/80">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl text-white placeholder-white/40 focus:outline-none transition-all duration-300 backdrop-blur-sm border"
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
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-3 text-white/80">
                    Subject
                  </label>
                  <div className="relative">
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 pr-10 rounded-xl text-white focus:outline-none transition-all duration-300 backdrop-blur-xl border appearance-none cursor-pointer"
                      style={{ 
                        backgroundColor: 'rgba(168,85,247,0.12)',
                        borderColor: 'rgba(168,85,247,0.3)',
                        boxShadow: '0 0 15px rgba(196,181,253,0.2), inset 0 1px 0 rgba(255,255,255,0.05)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(168,85,247,0.5)'
                        e.currentTarget.style.boxShadow = '0 0 20px rgba(196,181,253,0.3), inset 0 1px 0 rgba(255,255,255,0.08)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(168,85,247,0.3)'
                        e.currentTarget.style.boxShadow = '0 0 15px rgba(196,181,253,0.2), inset 0 1px 0 rgba(255,255,255,0.05)'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(168,85,247,0.6)'
                        e.currentTarget.style.boxShadow = '0 0 25px rgba(196,181,253,0.4), inset 0 1px 0 rgba(255,255,255,0.1)'
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(168,85,247,0.3)'
                        e.currentTarget.style.boxShadow = '0 0 15px rgba(196,181,253,0.2), inset 0 1px 0 rgba(255,255,255,0.05)'
                      }}
                    >
                      <option value="" style={{ backgroundColor: '#0a0a0a', color: '#ffffff' }}>Select a subject</option>
                      <option value="Course Inquiry" style={{ backgroundColor: '#0a0a0a', color: '#ffffff' }}>Course Inquiry</option>
                      <option value="Enrollment" style={{ backgroundColor: '#0a0a0a', color: '#ffffff' }}>Enrollment</option>
                      <option value="Technical Support" style={{ backgroundColor: '#0a0a0a', color: '#ffffff' }}>Technical Support</option>
                      <option value="Partnership" style={{ backgroundColor: '#0a0a0a', color: '#ffffff' }}>Partnership</option>
                      <option value="General" style={{ backgroundColor: '#0a0a0a', color: '#ffffff' }}>General</option>
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <ChevronDown className="w-5 h-5" style={{ color: '#c084fc' }} />
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-3 text-white/80">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl text-white placeholder-white/40 focus:outline-none transition-all duration-300 resize-none backdrop-blur-sm border"
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
                    placeholder="Tell us how we can help you..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:opacity-90 flex items-center justify-center backdrop-blur-sm border border-purple-400/40"
                  style={{ background: 'linear-gradient(to right, #a78bfa, #c084fc, #a78bfa)', color: '#ffffff', boxShadow: '0 0 20px rgba(196,181,253,0.4), 0 0 40px rgba(196,181,253,0.2)' }}
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 25px rgba(196,181,253,0.6), 0 0 50px rgba(196,181,253,0.4)'}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 0 20px rgba(196,181,253,0.4), 0 0 40px rgba(196,181,253,0.2)'}
                >
                  <Send size={20} className="mr-2" />
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <div className="slide-up" style={{ transitionDelay: '0.5s' }}>
                <h2 className="text-2xl lg:text-3xl font-normal mb-4 text-white">Get in Touch</h2>
                <p className="text-white/70 leading-relaxed">
                  We're here to help you find the perfect training program for your career goals. 
                  Reach out to us through any of the channels below.
                </p>
              </div>

              <div className="grid gap-4">
                <div className="slide-up rounded-xl p-5 backdrop-blur-xl border border-purple-500/20 transition-all duration-300 flex items-start space-x-4" style={{ backgroundColor: 'rgba(168,85,247,0.08)', transitionDelay: '0.6s' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 15px rgba(196,181,253,0.4), 0 0 30px rgba(196,181,253,0.2)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}>
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-sm border border-purple-500/20" style={{ backgroundColor: 'rgba(168,85,247,0.12)' }}>
                    <Phone className="w-5 h-5" style={{ color: '#c084fc' }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1 text-white">Phone</h3>
                    <p className="text-white/80 mb-1">+91 9860970798</p>
                    <p className="text-white/60 text-sm">Monday - Friday, 9:00 AM - 6:00 PM</p>
                  </div>
                </div>

                <div className="slide-up rounded-xl p-5 backdrop-blur-xl border border-purple-500/20 transition-all duration-300 flex items-start space-x-4" style={{ backgroundColor: 'rgba(168,85,247,0.08)', transitionDelay: '0.7s' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 15px rgba(196,181,253,0.4), 0 0 30px rgba(196,181,253,0.2)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}>
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-sm border border-purple-500/20" style={{ backgroundColor: 'rgba(168,85,247,0.12)' }}>
                    <Mail className="w-5 h-5" style={{ color: '#c084fc' }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1 text-white">Email</h3>
                    <p className="text-white/80 mb-1">info@trainin.com</p>
                    <p className="text-white/60 text-sm">We'll respond within 24 hours</p>
                  </div>
                </div>

                <div className="slide-up rounded-xl p-5 backdrop-blur-xl border border-purple-500/20 transition-all duration-300 flex items-start space-x-4" style={{ backgroundColor: 'rgba(168,85,247,0.08)', transitionDelay: '0.8s' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 15px rgba(196,181,253,0.4), 0 0 30px rgba(196,181,253,0.2)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}>
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-sm border border-purple-500/20" style={{ backgroundColor: 'rgba(168,85,247,0.12)' }}>
                    <MapPin className="w-5 h-5" style={{ color: '#c084fc' }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1 text-white">Address</h3>
                    <p className="text-white/80 text-sm leading-relaxed">
                      TEKINPLANT Headquarters<br />
                      Tech Park, Building A<br />
                      Bangalore, Karnataka 560001<br />
                      India
                    </p>
                  </div>
                </div>

                <div className="slide-up rounded-xl p-5 backdrop-blur-xl border border-purple-500/20 transition-all duration-300 flex items-start space-x-4" style={{ backgroundColor: 'rgba(168,85,247,0.08)', transitionDelay: '0.9s' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 15px rgba(196,181,253,0.4), 0 0 30px rgba(196,181,253,0.2)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}>
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-sm border border-purple-500/20" style={{ backgroundColor: 'rgba(168,85,247,0.12)' }}>
                    <Clock className="w-5 h-5" style={{ color: '#c084fc' }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1 text-white">Business Hours</h3>
                    <p className="text-white/80 text-sm leading-relaxed">
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 10:00 AM - 4:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="slide-up rounded-xl p-6 backdrop-blur-xl border border-purple-500/20 transition-all duration-300" style={{ backgroundColor: 'rgba(168,85,247,0.08)', transitionDelay: '1s' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 20px rgba(196,181,253,0.5), 0 0 40px rgba(196,181,253,0.3)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}>
                <h3 className="font-semibold mb-4 text-white">Quick Links</h3>
                <div className="space-y-3">
                  <a href="/courses" className="block py-2 px-3 rounded-lg transition-all duration-200 text-white/70 hover:text-white" style={{ backgroundColor: 'transparent' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(168,85,247,0.15)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                    Browse Training Courses
                  </a>
                  <a href="/about" className="block py-2 px-3 rounded-lg transition-all duration-200 text-white/70 hover:text-white" style={{ backgroundColor: 'transparent' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(168,85,247,0.15)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                    Learn About Us
                  </a>
                  <a href="/login" className="block py-2 px-3 rounded-lg transition-all duration-200 text-white/70 hover:text-white" style={{ backgroundColor: 'transparent' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(168,85,247,0.15)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                    Student Login
                  </a>
                  <a href="https://www.trainin.com" className="block py-2 px-3 rounded-lg transition-all duration-200 text-white/70 hover:text-white" style={{ backgroundColor: 'transparent' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(168,85,247,0.15)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                    Visit Our Website
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-[1px]" style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 50%, #000000 100%)' }}></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="slide-up inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 backdrop-blur-sm border border-purple-500/20" style={{ backgroundColor: 'rgba(168,85,247,0.08)', transitionDelay: '0.1s' }}>
              <span className="text-sm font-medium text-white/80">Common Questions</span>
            </div>
            <h2 className="slide-up text-3xl lg:text-4xl font-normal mb-4" style={{ transitionDelay: '0.2s' }}>
              <span className="text-white" style={{ textShadow: '0 0 20px rgba(255,255,255,0.3)' }}>Frequently Asked</span> <span className="bg-gradient-to-r from-purple-300 to-purple-400 bg-clip-text text-transparent" style={{ textShadow: '0 0 30px rgba(196,181,253,0.5), 0 0 60px rgba(196,181,253,0.3)' }}>Questions</span>
            </h2>
          </div>
          <div className="space-y-4">
            <div className="slide-up rounded-xl p-6 backdrop-blur-xl border border-purple-500/20 transition-all duration-300" style={{ backgroundColor: 'rgba(168,85,247,0.08)', transitionDelay: '0.3s' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 20px rgba(196,181,253,0.5), 0 0 40px rgba(196,181,253,0.3)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}>
              <h3 className="font-semibold mb-2 text-white">How do I enroll in a training program?</h3>
              <p className="text-white/70">
                You can enroll directly through our website by selecting your desired course and following the enrollment process. 
                You can also contact us for personalized assistance.
              </p>
            </div>
            <div className="slide-up rounded-xl p-6 backdrop-blur-xl border border-purple-500/20 transition-all duration-300" style={{ backgroundColor: 'rgba(168,85,247,0.08)', transitionDelay: '0.4s' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 20px rgba(196,181,253,0.5), 0 0 40px rgba(196,181,253,0.3)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}>
              <h3 className="font-semibold mb-2 text-white">What payment options do you accept?</h3>
              <p className="text-white/70">
                We accept all major credit cards, debit cards, and online banking transfers. 
                We also offer flexible payment plans for longer programs.
              </p>
            </div>
            <div className="slide-up rounded-xl p-6 backdrop-blur-xl border border-purple-500/20 transition-all duration-300" style={{ backgroundColor: 'rgba(168,85,247,0.08)', transitionDelay: '0.5s' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 20px rgba(196,181,253,0.5), 0 0 40px rgba(196,181,253,0.3)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}>
              <h3 className="font-semibold mb-2 text-white">Do you provide certificates upon completion?</h3>
              <p className="text-white/70">
                Yes, all our training programs provide industry-recognized certificates upon successful completion. 
                These certificates are widely accepted by employers.
              </p>
            </div>
            <div className="slide-up rounded-xl p-6 backdrop-blur-xl border border-purple-500/20 transition-all duration-300" style={{ backgroundColor: 'rgba(168,85,247,0.08)', transitionDelay: '0.6s' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 20px rgba(196,181,253,0.5), 0 0 40px rgba(196,181,253,0.3)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}>
              <h3 className="font-semibold mb-2 text-white">Can I get a refund if I'm not satisfied?</h3>
              <p className="text-white/70">
                We offer a 30-day money-back guarantee for all our training programs. 
                If you're not satisfied with the course, you can request a full refund.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
