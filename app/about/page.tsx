"use client"

import { useState, useEffect } from "react"
import { Users, Award, Globe, Target, Handshake, Lightbulb } from "lucide-react"
import Navbar from "../../src/components/Navbar"
import Link from "next/link"

export default function AboutPage() {
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
  const team = [
    {
      name: "Dr. Sarah Johnson",
      role: "CEO & Founder",
      image: "/placeholder.svg",
      bio: "Former tech executive with 15+ years in software development and education."
    }
  ]

  const stats = [
    { number: "10,000+", label: "Students Trained", icon: Users },
    { number: "50+", label: "Industry Partners", icon: Globe },
    { number: "95%", label: "Success Rate", icon: Award },
    { number: "200+", label: "Training Programs", icon: Target }
  ]

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: '#000000' }}>
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-[1px]" style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 50%, #000000 100%)' }}></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="slide-up inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 backdrop-blur-sm border border-purple-500/20" style={{ backgroundColor: 'rgba(0,0,0,0.4)', transitionDelay: '0.1s' }}>
              <Award className="w-4 h-4" style={{ color: '#a855f7' }} />
              <span className="text-sm font-medium text-white/80">Who We Are</span>
            </div>
            <h1 className="slide-up text-5xl lg:text-6xl font-normal mb-6" style={{ transitionDelay: '0.2s' }}>
              <span className="text-white" style={{ textShadow: '0 0 20px rgba(255,255,255,0.3)' }}>About</span> <span className="bg-gradient-to-r from-purple-300 via-purple-200 to-purple-300 bg-clip-text text-transparent" style={{ textShadow: '0 0 30px rgba(196,181,253,0.5), 0 0 60px rgba(196,181,253,0.3)' }}>TEKINPLANT</span>
            </h1>
            <p className="slide-up text-xl text-white/70 max-w-4xl mx-auto leading-relaxed" style={{ transitionDelay: '0.3s' }}>
              We are a leading industrial training platform dedicated to bridging the gap between academic knowledge and industry requirements. 
              Our mission is to empower professionals with practical skills and hands-on experience.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="slide-up text-center p-6 rounded-2xl transition-all duration-300" style={{ backgroundColor: 'rgba(0,0,0,0.4)', borderColor: 'rgba(168,85,247,0.25)', borderWidth: '1px', transitionDelay: `${0.4 + index * 0.1}s` }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 20px rgba(196,181,253,0.5), 0 0 40px rgba(196,181,253,0.3)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}>
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-purple-500/20" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                  <stat.icon className="w-7 h-7" style={{ color: '#c084fc' }} />
                </div>
                <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-300 to-purple-400 bg-clip-text text-transparent">{stat.number}</div>
                <div className="text-white/70 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-[1px]" style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 50%, #000000 100%)' }}></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="slide-up inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 backdrop-blur-sm border border-purple-500/20" style={{ backgroundColor: 'rgba(0,0,0,0.4)', transitionDelay: '0.1s' }}>
              <Target className="w-4 h-4" style={{ color: '#a855f7' }} />
              <span className="text-sm font-medium text-white/80">Our Purpose</span>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <div className="slide-up rounded-2xl p-8 backdrop-blur-xl border border-purple-500/20 transition-all duration-300" style={{ backgroundColor: 'rgba(0,0,0,0.4)', transitionDelay: '0.2s' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 20px rgba(196,181,253,0.5), 0 0 40px rgba(196,181,253,0.3)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}>
              <h2 className="text-3xl font-normal mb-6">
                <span className="text-white" style={{ textShadow: '0 0 20px rgba(255,255,255,0.3)' }}>Our</span> <span className="bg-gradient-to-r from-purple-300 to-purple-400 bg-clip-text text-transparent" style={{ textShadow: '0 0 30px rgba(196,181,253,0.5), 0 0 60px rgba(196,181,253,0.3)' }}>Mission</span>
              </h2>
              <p className="text-white/70 leading-relaxed mb-4">
                To provide industry-relevant training programs that equip professionals with the practical skills and knowledge needed to excel in their careers. 
                We believe in learning by doing and connecting theory with real-world applications.
              </p>
              <p className="text-white/70 leading-relaxed">
                Our comprehensive approach combines theoretical knowledge with hands-on projects, industry mentorship, and practical case studies to ensure our students are job-ready.
              </p>
            </div>
            <div className="slide-up rounded-2xl p-8 backdrop-blur-xl border border-purple-500/20 transition-all duration-300" style={{ backgroundColor: 'rgba(0,0,0,0.4)', transitionDelay: '0.3s' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 20px rgba(196,181,253,0.5), 0 0 40px rgba(196,181,253,0.3)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}>
              <h2 className="text-3xl font-normal mb-6">
                <span className="text-white" style={{ textShadow: '0 0 20px rgba(255,255,255,0.3)' }}>Our</span> <span className="bg-gradient-to-r from-purple-300 to-purple-400 bg-clip-text text-transparent" style={{ textShadow: '0 0 30px rgba(196,181,253,0.5), 0 0 60px rgba(196,181,253,0.3)' }}>Vision</span>
              </h2>
              <p className="text-white/70 leading-relaxed mb-4">
                To become the most trusted platform for industrial training, recognized for our commitment to quality education, industry partnerships, and student success.
              </p>
              <p className="text-white/70 leading-relaxed">
                We envision a future where every professional has access to high-quality, industry-aligned training that accelerates their career growth and contributes to organizational success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-[1px]" style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 50%, #000000 100%)' }}></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="slide-up inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 backdrop-blur-sm border border-purple-500/20" style={{ backgroundColor: 'rgba(0,0,0,0.4)', transitionDelay: '0.1s' }}>
              <Award className="w-4 h-4" style={{ color: '#a855f7' }} />
              <span className="text-sm font-medium text-white/80">What We Stand For</span>
            </div>
            <h2 className="slide-up text-4xl lg:text-5xl font-normal mb-4" style={{ transitionDelay: '0.2s' }}>
              <span className="text-white" style={{ textShadow: '0 0 20px rgba(255,255,255,0.3)' }}>Our</span> <span className="bg-gradient-to-r from-purple-300 to-purple-400 bg-clip-text text-transparent" style={{ textShadow: '0 0 30px rgba(196,181,253,0.5), 0 0 60px rgba(196,181,253,0.3)' }}>Values</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            <div className="slide-up rounded-xl p-8 text-center transition-all duration-300" style={{ backgroundColor: 'rgba(0,0,0,0.4)', borderColor: 'rgba(168,85,247,0.25)', borderWidth: '1px', transitionDelay: '0.3s' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 20px rgba(196,181,253,0.5), 0 0 40px rgba(196,181,253,0.3)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}>
              <div className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-purple-500/20" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <Target className="w-8 h-8" style={{ color: '#c084fc' }} />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">Excellence</h3>
              <p className="text-white/70 leading-relaxed">
                We maintain the highest standards in our training programs, ensuring quality education that meets industry requirements.
              </p>
            </div>
            <div className="slide-up rounded-xl p-8 text-center transition-all duration-300" style={{ backgroundColor: 'rgba(0,0,0,0.4)', borderColor: 'rgba(168,85,247,0.25)', borderWidth: '1px', transitionDelay: '0.4s' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 20px rgba(196,181,253,0.5), 0 0 40px rgba(196,181,253,0.3)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}>
              <div className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-purple-500/20" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <Handshake className="w-8 h-8" style={{ color: '#c084fc' }} />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">Collaboration</h3>
              <p className="text-white/70 leading-relaxed">
                We foster partnerships with industry leaders and educational institutions to create comprehensive learning experiences.
              </p>
            </div>
            <div className="slide-up rounded-xl p-8 text-center transition-all duration-300" style={{ backgroundColor: 'rgba(0,0,0,0.4)', borderColor: 'rgba(168,85,247,0.25)', borderWidth: '1px', transitionDelay: '0.5s' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 20px rgba(196,181,253,0.5), 0 0 40px rgba(196,181,253,0.3)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}>
              <div className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-purple-500/20" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <Lightbulb className="w-8 h-8" style={{ color: '#c084fc' }} />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">Innovation</h3>
              <p className="text-white/70 leading-relaxed">
                We continuously evolve our training methodologies to incorporate the latest industry trends and technologies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-[1px]" style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 50%, #000000 100%)' }}></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="slide-up inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 backdrop-blur-sm border border-purple-500/20" style={{ backgroundColor: 'rgba(0,0,0,0.4)', transitionDelay: '0.1s' }}>
              <Users className="w-4 h-4" style={{ color: '#a855f7' }} />
              <span className="text-sm font-medium text-white/80">Meet the Team</span>
            </div>
            <h2 className="slide-up text-4xl lg:text-5xl font-normal mb-4" style={{ transitionDelay: '0.2s' }}>
              <span className="text-white" style={{ textShadow: '0 0 20px rgba(255,255,255,0.3)' }}>Our Leadership</span> <span className="bg-gradient-to-r from-purple-300 to-purple-400 bg-clip-text text-transparent" style={{ textShadow: '0 0 30px rgba(196,181,253,0.5), 0 0 60px rgba(196,181,253,0.3)' }}>Team</span>
            </h2>
          </div>
          <div className="flex justify-center">
            {team.map((member, index) => (
              <div key={index} className="slide-up rounded-xl p-6 text-center transition-all duration-300 max-w-sm" style={{ backgroundColor: 'rgba(0,0,0,0.4)', borderColor: 'rgba(168,85,247,0.25)', borderWidth: '1px', transitionDelay: `${0.3 + index * 0.1}s` }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 20px rgba(196,181,253,0.5), 0 0 40px rgba(196,181,253,0.3)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}>
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden backdrop-blur-sm border border-purple-500/20" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">{member.name}</h3>
                <p className="text-sm mb-3" style={{ color: '#c084fc' }}>{member.role}</p>
                <p className="text-white/70 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
