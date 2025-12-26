"use client"

import { useState } from "react"
import { use } from "react"
import { ArrowLeft, CreditCard, User, Mail, Phone, Calendar, CheckCircle, Clock, Users, Star, ChevronDown } from "lucide-react"
import Navbar from "../../../src/components/Navbar"
import Link from "next/link"

export default function EnrollmentPage({ params }: { params: Promise<{ courseId: string }> }) {
  const resolvedParams = use(params)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    position: "",
    experience: "beginner",
    goals: "",
    paymentMethod: "card"
  })

  // Mock course data - in a real app, this would come from an API
  const coursesData = {
    "1": {
      id: "1",
      title: "Full Stack Web Development",
      price: "$999",
      duration: "12 weeks",
      students: 245,
      rating: 4.8,
      instructor: "Dr. Sarah Johnson",
      startDate: "February 15, 2024",
      schedule: "Mondays & Wednesdays, 6:00 PM - 8:00 PM"
    },
    "2": {
      id: "2",
      title: "Data Science & Analytics",
      price: "$1,299",
      duration: "16 weeks",
      students: 189,
      rating: 4.9,
      instructor: "Prof. Michael Chen",
      startDate: "February 20, 2024",
      schedule: "Tuesdays & Thursdays, 7:00 PM - 9:00 PM"
    }
  }

  const courseData = coursesData[resolvedParams.courseId as keyof typeof coursesData] || coursesData["1"]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle enrollment submission here
    console.log("Enrollment submitted:", { courseId: resolvedParams.courseId, ...formData })
    alert("Enrollment submitted successfully! We'll contact you soon with further details.")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href={`/courses/${resolvedParams.courseId}`}
            className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors mb-4"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Course
          </Link>
          <h1 className="text-4xl font-bold mb-2">Enroll in Course</h1>
          <p className="text-gray-400">Complete your enrollment for {courseData.title}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Enrollment Form */}
          <div className="space-y-8">
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                      placeholder="Enter your company name"
                    />
                  </div>
                  <div>
                    <label htmlFor="position" className="block text-sm font-medium mb-2">
                      Position
                    </label>
                    <input
                      type="text"
                      id="position"
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                      placeholder="Enter your job title"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="experience" className="block text-sm font-medium mb-2">
                    Experience Level
                  </label>
                  <div className="relative">
                    <select
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
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
                      <option value="beginner" style={{ backgroundColor: '#0a0a0a', color: '#ffffff' }}>Beginner</option>
                      <option value="intermediate" style={{ backgroundColor: '#0a0a0a', color: '#ffffff' }}>Intermediate</option>
                      <option value="advanced" style={{ backgroundColor: '#0a0a0a', color: '#ffffff' }}>Advanced</option>
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <ChevronDown className="w-5 h-5" style={{ color: '#c084fc' }} />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="goals" className="block text-sm font-medium mb-2">
                    Learning Goals
                  </label>
                  <textarea
                    id="goals"
                    name="goals"
                    value={formData.goals}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                    placeholder="What do you hope to achieve from this course?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-4">Payment Method</label>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === "card"}
                        onChange={handleChange}
                        className="w-4 h-4 text-purple-600 bg-gray-900 border-gray-600 focus:ring-purple-500 focus:ring-2"
                      />
                      <span className="ml-3 flex items-center">
                        <CreditCard size={20} className="mr-2" />
                        Credit/Debit Card
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bank"
                        checked={formData.paymentMethod === "bank"}
                        onChange={handleChange}
                        className="w-4 h-4 text-purple-600 bg-gray-900 border-gray-600 focus:ring-purple-500 focus:ring-2"
                      />
                      <span className="ml-3">Bank Transfer</span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-4 rounded-lg font-semibold transition-colors duration-200 text-lg"
                >
                  Complete Enrollment - {courseData.price}
                </button>
              </form>
            </div>
          </div>

          {/* Course Summary */}
          <div className="space-y-6">
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4">Course Summary</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-purple-400 mb-2">{courseData.title}</h3>
                  <p className="text-gray-400">Instructor: {courseData.instructor}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center text-sm">
                    <Clock size={16} className="mr-2 text-purple-400" />
                    <span>{courseData.duration}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Users size={16} className="mr-2 text-purple-400" />
                    <span>{courseData.students} students</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Star size={16} className="mr-2 text-purple-400" />
                    <span>{courseData.rating} rating</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar size={16} className="mr-2 text-purple-400" />
                    <span>Starts {courseData.startDate}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-700">
                  <p className="text-sm text-gray-400 mb-2">Schedule:</p>
                  <p className="text-sm">{courseData.schedule}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">What's Included</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  <span className="text-sm">Lifetime access to course materials</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  <span className="text-sm">Live interactive sessions</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  <span className="text-sm">Certificate of completion</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  <span className="text-sm">1-on-1 mentoring sessions</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  <span className="text-sm">Project portfolio development</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  <span className="text-sm">Career guidance and support</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Payment Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Course Fee:</span>
                  <span className="font-semibold">{courseData.price}</span>
                </div>
                <div className="flex justify-between">
                  <span>Registration Fee:</span>
                  <span className="font-semibold">$50</span>
                </div>
                <div className="flex justify-between">
                  <span>Study Materials:</span>
                  <span className="font-semibold">Included</span>
                </div>
                <div className="pt-3 border-t border-gray-700">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-purple-400">
                      ${parseInt(courseData.price.replace('$', '')) + 50}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
