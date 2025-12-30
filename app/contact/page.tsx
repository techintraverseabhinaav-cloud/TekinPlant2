"use client"

import { useState, useEffect } from "react"
import { Send, ChevronDown, MessageCircle, Lock, Linkedin, Youtube, Instagram } from "lucide-react"
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
    <div className="min-h-screen relative" style={{ backgroundColor: '#000000' }}>
      <Navbar />
      
      {/* Header */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-[1px]" style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 50%, #000000 100%)' }}></div>
        <div className="slide-up relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center mb-16">
            <div className="slide-up inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm border border-purple-500/20" style={{ backgroundColor: 'rgba(0,0,0,0.4)', transitionDelay: '0.1s' }}>
              <span className="text-xs font-medium text-white/70 tracking-wide uppercase">Get in Touch</span>
            </div>
            <h1 className="slide-up text-5xl sm:text-6xl lg:text-7xl font-light mb-6 leading-tight tracking-tight" style={{ transitionDelay: '0.2s' }}>
              <span className="text-white">Contact</span> <span className="bg-gradient-to-r from-purple-300 via-purple-200 to-purple-300 bg-clip-text text-transparent">Us</span>
            </h1>
            <p className="slide-up text-lg sm:text-xl text-white/50 max-w-3xl mx-auto mb-16 font-light leading-relaxed" style={{ transitionDelay: '0.3s' }}>
              Have questions about our training programs? We're here to help! Get in touch with our team for personalized assistance.
            </p>
          </div>

          {/* Contact Form */}
          <div className="slide-up max-w-2xl mx-auto" style={{ transitionDelay: '0.4s' }}>
            <div className="rounded-2xl p-8 lg:p-10 backdrop-blur-xl border border-purple-500/20" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-xs font-medium mb-2 text-white/60 uppercase tracking-wide">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-3.5 rounded-xl text-white placeholder-white/30 focus:outline-none transition-all duration-300 backdrop-blur-sm border font-light"
                      style={{ 
                        backgroundColor: 'rgba(0,0,0,0.4)',
                        borderColor: 'rgba(168,85,247,0.2)'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(168,85,247,0.6)'
                        e.currentTarget.style.boxShadow = '0 0 0 2px rgba(168,85,247,0.2)'
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(168,85,247,0.2)'
                        e.currentTarget.style.boxShadow = 'none'
                      }}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-medium mb-2 text-white/60 uppercase tracking-wide">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-3.5 rounded-xl text-white placeholder-white/30 focus:outline-none transition-all duration-300 backdrop-blur-sm border font-light"
                      style={{ 
                        backgroundColor: 'rgba(0,0,0,0.4)',
                        borderColor: 'rgba(168,85,247,0.2)'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(168,85,247,0.6)'
                        e.currentTarget.style.boxShadow = '0 0 0 2px rgba(168,85,247,0.2)'
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(168,85,247,0.2)'
                        e.currentTarget.style.boxShadow = 'none'
                      }}
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-xs font-medium mb-2 text-white/60 uppercase tracking-wide">
                    Subject
                  </label>
                  <div className="relative">
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-3.5 pr-10 rounded-xl text-white focus:outline-none transition-all duration-300 backdrop-blur-xl border appearance-none cursor-pointer font-light"
                      style={{ 
                        backgroundColor: 'rgba(0,0,0,0.4)',
                        borderColor: 'rgba(168,85,247,0.2)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(168,85,247,0.4)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(168,85,247,0.2)'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(168,85,247,0.6)'
                        e.currentTarget.style.boxShadow = '0 0 0 2px rgba(168,85,247,0.2)'
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(168,85,247,0.2)'
                        e.currentTarget.style.boxShadow = 'none'
                      }}
                    >
                      <option value="" style={{ backgroundColor: '#0a0a0a', color: '#ffffff' }}>Select a subject</option>
                      <option value="Course Inquiry" style={{ backgroundColor: '#0a0a0a', color: '#ffffff' }}>Course Inquiry</option>
                      <option value="Enrollment" style={{ backgroundColor: '#0a0a0a', color: '#ffffff' }}>Enrollment</option>
                      <option value="Technical Support" style={{ backgroundColor: '#0a0a0a', color: '#ffffff' }}>Technical Support</option>
                      <option value="Partnership" style={{ backgroundColor: '#0a0a0a', color: '#ffffff' }}>Partnership</option>
                      <option value="General" style={{ backgroundColor: '#0a0a0a', color: '#ffffff' }}>General</option>
                    </select>
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <ChevronDown className="w-4 h-4" style={{ color: '#c084fc' }} />
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs font-medium mb-2 text-white/60 uppercase tracking-wide">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-5 py-3.5 rounded-xl text-white placeholder-white/30 focus:outline-none transition-all duration-300 resize-none backdrop-blur-sm border font-light"
                    style={{ 
                      backgroundColor: 'rgba(0,0,0,0.4)',
                      borderColor: 'rgba(168,85,247,0.2)'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(168,85,247,0.6)'
                      e.currentTarget.style.boxShadow = '0 0 0 2px rgba(168,85,247,0.2)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(168,85,247,0.2)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                    placeholder="Tell us how we can help you..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3.5 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm border border-purple-400/40"
                  style={{ 
                    background: 'linear-gradient(to right, #a78bfa, #c084fc, #a78bfa)', 
                    color: '#ffffff'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)'
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(196,181,253,0.4)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <Send size={18} />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-[1px]" style={{ background: 'linear-gradient(180deg, #000000 0%, #0a0a0a 50%, #1a1a1a 100%)' }}></div>
        <div className="slide-up relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <div className="text-center">
              <div className="w-16 h-16 p-0.5 rounded-xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'rgba(0,0,0,0.5)', borderColor: 'rgba(168,85,247,0.25)', borderWidth: '1px' }}>
                <div className="w-full h-full rounded-lg flex items-center justify-center overflow-hidden" style={{ borderColor: 'rgba(168,85,247,0.25)', borderWidth: '1px', backgroundColor: '#ffffff' }}>
                  <img src="/Icons/email.png" alt="Email" className="w-full h-full object-cover scale-150" />
                </div>
              </div>
              <h3 className="text-lg font-light mb-2 text-white">Email</h3>
              <p className="text-white/50 font-light">contact@tekinplant.com</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 p-0.5 rounded-xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'rgba(0,0,0,0.5)', borderColor: 'rgba(168,85,247,0.25)', borderWidth: '1px' }}>
                <div className="w-full h-full rounded-lg flex items-center justify-center overflow-hidden" style={{ borderColor: 'rgba(168,85,247,0.25)', borderWidth: '1px', backgroundColor: '#ffffff' }}>
                  <img src="/Icons/phone.png" alt="Phone" className="w-full h-full object-cover scale-150" />
                </div>
              </div>
              <h3 className="text-lg font-light mb-2 text-white">Phone</h3>
              <p className="text-white/50 font-light">+91 9860970798</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 p-0.5 rounded-xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'rgba(0,0,0,0.5)', borderColor: 'rgba(168,85,247,0.25)', borderWidth: '1px' }}>
                <div className="w-full h-full rounded-lg flex items-center justify-center overflow-hidden" style={{ borderColor: 'rgba(168,85,247,0.25)', borderWidth: '1px', backgroundColor: '#ffffff' }}>
                  <img src="/Icons/location.png" alt="Location" className="w-full h-full object-cover scale-150" />
                </div>
              </div>
              <h3 className="text-lg font-light mb-2 text-white">Location</h3>
              <p className="text-white/50 font-light">Bangalore, India</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-[1px]" style={{ background: 'linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 50%, #000000 100%)' }}></div>
        <div className="slide-up relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center mb-16">
            <div className="slide-up inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm border border-purple-500/20" style={{ backgroundColor: 'rgba(0,0,0,0.4)', transitionDelay: '0.1s' }}>
              <MessageCircle className="w-3.5 h-3.5" style={{ color: '#a855f7' }} />
              <span className="text-xs font-medium text-white/70 tracking-wide uppercase">Common Questions</span>
            </div>
            <h2 className="slide-up text-4xl lg:text-5xl font-light mb-6 leading-tight tracking-tight" style={{ transitionDelay: '0.2s' }}>
              <span className="text-white">Frequently Asked</span> <span className="bg-gradient-to-r from-purple-300 to-purple-400 bg-clip-text text-transparent">Questions</span>
            </h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="slide-up p-6 rounded-xl border border-purple-500/20 transition-all duration-500" 
                style={{ 
                  backgroundColor: 'rgba(0,0,0,0.2)',
                  transitionDelay: `${0.3 + index * 0.1}s`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.3)'
                  e.currentTarget.style.borderColor = 'rgba(168,85,247,0.3)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.2)'
                  e.currentTarget.style.borderColor = 'rgba(168,85,247,0.2)'
                }}
              >
                <h3 className="text-lg font-light mb-3 text-white">{faq.question}</h3>
                <p className="text-white/50 leading-relaxed font-light">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-[1px]" style={{ background: 'linear-gradient(180deg, #000000 0%, #0a0a0a 50%, #1a1a1a 100%)' }}></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="flex justify-center items-center gap-6">
            <a
              href="#"
              className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 border border-purple-500/20"
              style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.borderColor = 'rgba(168,85,247,0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.borderColor = 'rgba(168,85,247,0.2)'
              }}
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5 text-white/60" />
            </a>
            <a
              href="#"
              className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 border border-purple-500/20"
              style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.borderColor = 'rgba(168,85,247,0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.borderColor = 'rgba(168,85,247,0.2)'
              }}
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5 text-white/60" />
            </a>
            <a
              href="#"
              className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 border border-purple-500/20"
              style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.borderColor = 'rgba(168,85,247,0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.borderColor = 'rgba(168,85,247,0.2)'
              }}
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5 text-white/60" />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
