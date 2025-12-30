"use client"

import { useState } from "react"
import { TrendingUp, Users, Building, MapPin, Star, DollarSign, Clock, Award } from "lucide-react"
import Navbar from "../../src/components/Navbar"
import { industryCourses, industryPartners, industryStats, industryInsights } from "../../lib/industry-data"

export default function InsightsPage() {
  return (
    <div className="min-h-screen relative" style={{ backgroundColor: '#000000' }}>
      <Navbar />
      
      {/* Header */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-[1px]" style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 50%, #000000 100%)' }}></div>
        <div className="slide-up relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-normal mb-6">
              <span className="text-white" style={{ textShadow: '0 0 20px rgba(255,255,255,0.3)' }}>Industry</span> <span className="bg-gradient-to-r from-purple-300 via-purple-200 to-purple-300 bg-clip-text text-transparent" style={{ textShadow: '0 0 30px rgba(196,181,253,0.5), 0 0 60px rgba(196,181,253,0.3)' }}>Insights</span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Comprehensive analytics and trends from our industry training programs and partner companies
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {[
              { icon: Users, value: industryStats.totalStudents, label: "Total Students", color: 'rgba(0,0,0,0.4)', border: 'rgba(168,85,247,0.25)', iconColor: '#c084fc' },
              { icon: Building, value: industryStats.totalPartners, label: "Partner Companies", color: 'rgba(0,0,0,0.4)', border: 'rgba(99,102,241,0.25)', iconColor: '#818cf8' },
              { icon: Star, value: industryStats.averageRating, label: "Average Rating", color: 'rgba(0,0,0,0.4)', border: 'rgba(236,72,153,0.25)', iconColor: '#f472b6' },
              { icon: Award, value: industryInsights.successRate, label: "Success Rate", color: 'rgba(0,0,0,0.4)', border: 'rgba(139,92,246,0.25)', iconColor: '#a78bfa' },
            ].map((stat, index) => (
              <div key={index} className="p-6 rounded-xl text-center transition-all duration-300 backdrop-blur-xl border" style={{ backgroundColor: stat.color, borderColor: stat.border }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 20px rgba(196,181,253,0.5), 0 0 40px rgba(196,181,253,0.3)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}>
              <div className="flex items-center justify-center mb-2">
                  <stat.icon className="mr-2" size={24} style={{ color: stat.iconColor }} />
              </div>
                <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-300 to-purple-400 bg-clip-text text-transparent">{stat.value}</h3>
                <p className="text-white/70">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Overview Stats */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="p-8 rounded-xl backdrop-blur-xl border border-purple-500/20 transition-all duration-300" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 20px rgba(196,181,253,0.5), 0 0 40px rgba(196,181,253,0.3)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}>
              <h3 className="text-2xl font-normal mb-6 text-white">Training Programs Overview</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Total Programs</span>
                  <span className="font-semibold" style={{ color: '#c084fc' }}>{industryStats.totalCourses}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Average Price</span>
                  <span className="font-semibold" style={{ color: '#c084fc' }}>{industryInsights.averageCoursePrice}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Average Duration</span>
                  <span className="font-semibold" style={{ color: '#c084fc' }}>{industryInsights.averageDuration}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Placement Rate</span>
                  <span className="font-semibold" style={{ color: '#c084fc' }}>{industryInsights.placementRate}</span>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-xl backdrop-blur-xl border border-purple-500/20 transition-all duration-300" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 20px rgba(196,181,253,0.5), 0 0 40px rgba(196,181,253,0.3)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}>
              <h3 className="text-2xl font-normal mb-6 text-white">Partner Companies Overview</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Total Partners</span>
                  <span className="font-semibold" style={{ color: '#c084fc' }}>{industryStats.totalPartners}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Industries Covered</span>
                  <span className="font-semibold" style={{ color: '#c084fc' }}>{industryStats.industries.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Locations</span>
                  <span className="font-semibold" style={{ color: '#c084fc' }}>{industryStats.locations.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Success Rate</span>
                  <span className="font-semibold" style={{ color: '#c084fc' }}>{industryInsights.successRate}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Industry Distribution */}
          <div className="p-8 rounded-xl mb-12 backdrop-blur-xl border border-purple-500/20 transition-all duration-300" style={{ backgroundColor: 'rgba(168,85,247,0.08)' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 20px rgba(196,181,253,0.5), 0 0 40px rgba(196,181,253,0.3)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}>
            <h3 className="text-2xl font-normal mb-6 text-white">Industry Distribution</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-white/80">Top Industries by Company Count</h4>
                <div className="space-y-3">
                  {industryInsights.topIndustries.map((industry, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-white/70">{industry.name}</span>
                      <div className="flex items-center">
                        <div className="w-32 rounded-full h-2 mr-3 backdrop-blur-sm border border-purple-500/20" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
                          <div
                            className="h-2 rounded-full"
                            style={{ width: `${(industry.count / Math.max(...industryInsights.topIndustries.map(i => i.count))) * 100}%`, background: 'linear-gradient(to right, #a78bfa, #c084fc, #a78bfa)' }}
                          ></div>
                        </div>
                        <span className="font-semibold w-8 text-right" style={{ color: '#c084fc' }}>{industry.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4 text-white/80">Popular Locations</h4>
                <div className="space-y-3">
                  {industryInsights.popularLocations.map((location, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-white/70">{location.name}</span>
                      <div className="flex items-center">
                        <div className="w-32 rounded-full h-2 mr-3 backdrop-blur-sm border border-purple-500/20" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
                          <div
                            className="h-2 rounded-full"
                            style={{ width: `${(location.count / Math.max(...industryInsights.popularLocations.map(l => l.count))) * 100}%`, background: 'linear-gradient(to right, #a78bfa, #c084fc, #a78bfa)' }}
                          ></div>
                        </div>
                        <span className="font-semibold w-8 text-right" style={{ color: '#c084fc' }}>{location.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Top Performing Companies */}
          <div className="p-8 rounded-xl mb-12 backdrop-blur-xl border border-purple-500/20 transition-all duration-300" style={{ backgroundColor: 'rgba(168,85,247,0.08)' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 20px rgba(196,181,253,0.5), 0 0 40px rgba(196,181,253,0.3)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}>
            <h3 className="text-2xl font-normal mb-6 text-white">Top Performing Companies</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {industryCourses
                .sort((a, b) => b.rating - a.rating)
                .slice(0, 6)
                .map((course) => (
                  <div key={course.id} className="p-4 rounded-lg backdrop-blur-sm border border-purple-500/20 transition-all duration-300" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 15px rgba(196,181,253,0.4), 0 0 30px rgba(196,181,253,0.2)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}>
                    <h4 className="font-semibold mb-2" style={{ color: '#c084fc' }}>{course.company}</h4>
                    <p className="text-white/70 text-sm mb-2">{course.title}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-white/60 text-sm">Rating</span>
                      <span className="font-semibold flex items-center gap-1" style={{ color: '#fbbf24' }}>{course.rating} <Star className="w-4 h-4 fill-current" /></span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Market Trends */}
          <div className="p-8 rounded-xl backdrop-blur-xl border border-purple-500/20 transition-all duration-300" style={{ backgroundColor: 'rgba(168,85,247,0.08)' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 20px rgba(196,181,253,0.5), 0 0 40px rgba(196,181,253,0.3)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}>
            <h3 className="text-2xl font-normal mb-6 text-white">Market Trends & Analysis</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-white/80">Training Program Trends</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg backdrop-blur-sm border border-purple-500/20 transition-all duration-300" style={{ backgroundColor: 'rgba(168,85,247,0.05)' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 15px rgba(196,181,253,0.4), 0 0 30px rgba(196,181,253,0.2)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}>
                    <div className="flex items-center">
                      <TrendingUp className="mr-3" size={20} style={{ color: '#4ade80' }} />
                      <div>
                        <p className="text-white font-medium">Growing Demand</p>
                        <p className="text-white/60 text-sm">Automation & IoT training</p>
                      </div>
                    </div>
                    <span className="font-semibold" style={{ color: '#4ade80' }}>+25%</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg backdrop-blur-sm border border-purple-500/20 transition-all duration-300" style={{ backgroundColor: 'rgba(168,85,247,0.05)' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 15px rgba(196,181,253,0.4), 0 0 30px rgba(196,181,253,0.2)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}>
                    <div className="flex items-center">
                      <DollarSign className="mr-3" size={20} style={{ color: '#60a5fa' }} />
                      <div>
                        <p className="text-white font-medium">Price Trends</p>
                        <p className="text-white/60 text-sm">Average course pricing</p>
                      </div>
                    </div>
                    <span className="font-semibold" style={{ color: '#60a5fa' }}>{industryInsights.averageCoursePrice}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg backdrop-blur-sm border border-purple-500/20 transition-all duration-300" style={{ backgroundColor: 'rgba(168,85,247,0.05)' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 15px rgba(196,181,253,0.4), 0 0 30px rgba(196,181,253,0.2)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}>
                    <div className="flex items-center">
                      <Clock className="mr-3" size={20} style={{ color: '#fbbf24' }} />
                      <div>
                        <p className="text-white font-medium">Duration Patterns</p>
                        <p className="text-white/60 text-sm">Most popular duration</p>
                      </div>
                    </div>
                    <span className="font-semibold" style={{ color: '#fbbf24' }}>{industryInsights.averageDuration}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4 text-white/80">Success Metrics</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg backdrop-blur-sm border border-purple-500/20 transition-all duration-300" style={{ backgroundColor: 'rgba(168,85,247,0.05)' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 15px rgba(196,181,253,0.4), 0 0 30px rgba(196,181,253,0.2)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}>
                    <div className="flex items-center">
                      <Award className="mr-3" size={20} style={{ color: '#c084fc' }} />
                      <div>
                        <p className="text-white font-medium">Success Rate</p>
                        <p className="text-white/60 text-sm">Program completion</p>
                      </div>
                    </div>
                    <span className="font-semibold" style={{ color: '#c084fc' }}>{industryInsights.successRate}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg backdrop-blur-sm border border-purple-500/20 transition-all duration-300" style={{ backgroundColor: 'rgba(168,85,247,0.05)' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 15px rgba(196,181,253,0.4), 0 0 30px rgba(196,181,253,0.2)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}>
                    <div className="flex items-center">
                      <Users className="mr-3" size={20} style={{ color: '#4ade80' }} />
                      <div>
                        <p className="text-white font-medium">Placement Rate</p>
                        <p className="text-white/60 text-sm">Job placement success</p>
                      </div>
                    </div>
                    <span className="font-semibold" style={{ color: '#4ade80' }}>{industryInsights.placementRate}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg backdrop-blur-sm border border-purple-500/20 transition-all duration-300" style={{ backgroundColor: 'rgba(168,85,247,0.05)' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 15px rgba(196,181,253,0.4), 0 0 30px rgba(196,181,253,0.2)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}>
                    <div className="flex items-center">
                      <Star className="mr-3" size={20} style={{ color: '#fbbf24' }} />
                      <div>
                        <p className="text-white font-medium">Student Satisfaction</p>
                        <p className="text-white/60 text-sm">Average rating</p>
                      </div>
                    </div>
                    <span className="font-semibold flex items-center gap-1" style={{ color: '#fbbf24' }}>{industryStats.averageRating} <Star className="w-4 h-4 fill-current" /></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
