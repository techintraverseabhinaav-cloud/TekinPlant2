"use client"

import { useState } from "react"
import { MapPin, Building, Users, Calendar, ExternalLink, Mail, Clock, Star, DollarSign, ArrowLeft } from "lucide-react"
import Navbar from "../../../src/components/Navbar"
import Link from "next/link"
import { industryPartners, industryCourses } from "../../../lib/industry-data"

export default function CompanyDetailPage({ params }: { params: { id: string } }) {
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null)
  const [enrollmentForm, setEnrollmentForm] = useState({
    name: "",
    email: "",
    phone: "",
    courseId: ""
  })

  // Find the company by ID
  const company = industryPartners.find(partner => partner.id === parseInt(params.id))
  
  // Find all courses for this company
  const companyCourses = industryCourses.filter(course => 
    course.company.toLowerCase().includes(company?.name.toLowerCase() || "")
  )

  if (!company) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Company Not Found</h1>
            <p className="text-gray-400 mb-8">The company you're looking for doesn't exist.</p>
            <Link href="/partners" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
              Back to Partners
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const handleEnrollment = (courseId: number) => {
    setSelectedCourse(courseId)
    setEnrollmentForm(prev => ({ ...prev, courseId: courseId.toString() }))
  }

  const submitEnrollment = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the enrollment data to your backend
    alert(`Enrollment submitted for course ${enrollmentForm.courseId}! We'll contact you at ${enrollmentForm.email} soon.`)
    setSelectedCourse(null)
    setEnrollmentForm({ name: "", email: "", phone: "", courseId: "" })
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      
      {/* Header */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link href="/partners" className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-8 transition-colors">
            <ArrowLeft size={20} className="mr-2" />
            Back to Partners
          </Link>

          {/* Company Header */}
          <div className="bg-gray-800 rounded-2xl p-8 mb-12">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                  {company.name}
                </h1>
                <p className="text-xl text-gray-300 mb-6">
                  {company.description}
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-400">
                    <Building size={20} className="mr-3" />
                    <span>{company.industry}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <MapPin size={20} className="mr-3" />
                    <span>{company.location}</span>
                  </div>
                  {company.employeeCount && (
                    <div className="flex items-center text-gray-400">
                      <Users size={20} className="mr-3" />
                      <span>{company.employeeCount.toLocaleString()} employees</span>
                    </div>
                  )}
                  {company.founded && (
                    <div className="flex items-center text-gray-400">
                      <Calendar size={20} className="mr-3" />
                      <span>Founded {company.founded}</span>
                    </div>
                  )}
                </div>

                <div className="flex space-x-4">
                  <a
                    href={`mailto:${company.contactInfo}`}
                    className="flex items-center bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Mail size={16} className="mr-2" />
                    Contact
                  </a>
                  <a
                    href={company.website.startsWith('http') ? company.website : `https://${company.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <ExternalLink size={16} className="mr-2" />
                    Website
                  </a>
                </div>
              </div>

              <div className="bg-gray-900 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4">Training Programs</h3>
                <div className="space-y-2">
                  {company.trainingPrograms.map((program, index) => (
                    <div key={index} className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                      {program}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Courses Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8">Available Training Programs</h2>
            
            {companyCourses.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No courses available for this company at the moment.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {companyCourses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-gray-800 border border-gray-700 rounded-2xl p-6 hover:border-purple-500 transition-all duration-300"
                  >
                    <div className="aspect-video rounded-lg overflow-hidden mb-6">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">
                          {course.title}
                        </h3>
                        <p className="text-gray-400 text-sm mb-3">
                          {course.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {course.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-900 text-gray-300 rounded-full text-sm border border-gray-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="space-y-2 text-sm text-gray-400">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center">
                            <Clock size={16} className="mr-2" />
                            Duration
                          </span>
                          <span className="text-white">{course.duration}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center">
                            <Users size={16} className="mr-2" />
                            Students
                          </span>
                          <span className="text-white">{course.students}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center">
                            <Star size={16} className="mr-2" />
                            Rating
                          </span>
                          <span className="text-yellow-400 flex items-center gap-1">{course.rating} <Star className="w-4 h-4 fill-current" /></span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center">
                            <DollarSign size={16} className="mr-2" />
                            Price
                          </span>
                          <span className="text-green-400 font-semibold">{course.price}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleEnrollment(course.id)}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition-colors duration-200"
                      >
                        Enroll Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Enrollment Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold mb-6">Enroll in Course</h3>
            
            <form onSubmit={submitEnrollment} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={enrollmentForm.name}
                  onChange={(e) => setEnrollmentForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={enrollmentForm.email}
                  onChange={(e) => setEnrollmentForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={enrollmentForm.phone}
                  onChange={(e) => setEnrollmentForm(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition-colors duration-200"
                >
                  Submit Enrollment
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCourse(null)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
