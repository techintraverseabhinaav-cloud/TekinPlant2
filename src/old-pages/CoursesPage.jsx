"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Search, Filter, Calendar, Clock, Users, BookOpen } from "lucide-react"

const CoursesPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDomain, setSelectedDomain] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [selectedDuration, setSelectedDuration] = useState("all")
  const [selectedMode, setSelectedMode] = useState("all")

  const courses = [
    {
      id: 1,
      title: "Full Stack Web Development",
      domain: "Information Technology",
      level: "Intermediate",
      duration: "12 weeks",
      mode: "Online",
      startDate: "Feb 15, 2024",
      trainer: "John Smith",
      students: 45,
      image: "💻",
      description: "Learn modern web development with React, Node.js, and MongoDB...",
    },
    {
      id: 2,
      title: "Industrial Automation",
      domain: "Manufacturing",
      level: "Advanced",
      duration: "8 weeks",
      mode: "Onsite",
      startDate: "Mar 1, 2024",
      trainer: "Emily Johnson",
      students: 32,
      image: "🏭",
      description: "Master PLC programming, SCADA systems, and industrial IoT...",
    },
    {
      id: 3,
      title: "Civil Structural Design",
      domain: "Civil Engineering",
      level: "Intermediate",
      duration: "10 weeks",
      mode: "Hybrid",
      startDate: "Feb 20, 2024",
      trainer: "Robert Chen",
      students: 28,
      image: "🏗️",
      description: "Learn structural analysis, design principles, and CAD software...",
    },
    {
      id: 4,
      title: "CNC Machine Operation",
      domain: "Mechanical Engineering",
      level: "Beginner",
      duration: "6 weeks",
      mode: "Onsite",
      startDate: "Mar 10, 2024",
      trainer: "Sarah Williams",
      students: 24,
      image: "⚙️",
      description: "Hands-on training with CNC machines, programming, and operation...",
    },
    {
      id: 5,
      title: "Digital Marketing Fundamentals",
      domain: "Marketing",
      level: "Beginner",
      duration: "4 weeks",
      mode: "Online",
      startDate: "Feb 25, 2024",
      trainer: "Michael Brown",
      students: 50,
      image: "📊",
      description: "Learn SEO, social media marketing, content strategy, and analytics...",
    },
    {
      id: 6,
      title: "Electrical System Design",
      domain: "Electrical Engineering",
      level: "Advanced",
      duration: "8 weeks",
      mode: "Hybrid",
      startDate: "Mar 5, 2024",
      trainer: "Lisa Chen",
      students: 30,
      image: "⚡",
      description: "Master electrical system design, power distribution, and safety protocols...",
    },
  ]

  const domains = [
    "all",
    "Information Technology",
    "Manufacturing",
    "Civil Engineering",
    "Mechanical Engineering",
    "Electrical Engineering",
    "Marketing",
  ]
  const levels = ["all", "Beginner", "Intermediate", "Advanced"]
  const durations = ["all", "4 weeks", "6 weeks", "8 weeks", "10 weeks", "12 weeks"]
  const modes = ["all", "Online", "Onsite", "Hybrid"]

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.domain.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDomain = selectedDomain === "all" || course.domain === selectedDomain
    const matchesLevel = selectedLevel === "all" || course.level === selectedLevel
    const matchesDuration = selectedDuration === "all" || course.duration === selectedDuration
    const matchesMode = selectedMode === "all" || course.mode === selectedMode

    return matchesSearch && matchesDomain && matchesLevel && matchesDuration && matchesMode
  })

  return (
    <div className="min-h-screen bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Training Programs</h1>
          <p className="text-gray-400">Browse our comprehensive range of industry-focused training programs</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-dark-surface p-6 rounded-2xl border border-gray-700 sticky top-24">
              <div className="flex items-center mb-6">
                <Filter size={20} className="mr-2 text-dark-primary" />
                <h3 className="text-lg font-semibold">Filters</h3>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-dark-bg border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-dark-primary transition-colors text-sm"
                  />
                </div>
              </div>

              {/* Domain Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Domain</label>
                <select
                  value={selectedDomain}
                  onChange={(e) => setSelectedDomain(e.target.value)}
                  className="w-full px-3 py-2 bg-dark-bg border border-gray-600 rounded-lg text-white focus:outline-none focus:border-dark-primary transition-colors text-sm"
                >
                  {domains.map((domain) => (
                    <option key={domain} value={domain}>
                      {domain === "all" ? "All Domains" : domain}
                    </option>
                  ))}
                </select>
              </div>

              {/* Level Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Level</label>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full px-3 py-2 bg-dark-bg border border-gray-600 rounded-lg text-white focus:outline-none focus:border-dark-primary transition-colors text-sm"
                >
                  {levels.map((level) => (
                    <option key={level} value={level}>
                      {level === "all" ? "All Levels" : level}
                    </option>
                  ))}
                </select>
              </div>

              {/* Duration Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Duration</label>
                <select
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value)}
                  className="w-full px-3 py-2 bg-dark-bg border border-gray-600 rounded-lg text-white focus:outline-none focus:border-dark-primary transition-colors text-sm"
                >
                  {durations.map((duration) => (
                    <option key={duration} value={duration}>
                      {duration === "all" ? "All Durations" : duration}
                    </option>
                  ))}
                </select>
              </div>

              {/* Mode Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Mode</label>
                <select
                  value={selectedMode}
                  onChange={(e) => setSelectedMode(e.target.value)}
                  className="w-full px-3 py-2 bg-dark-bg border border-gray-600 rounded-lg text-white focus:outline-none focus:border-dark-primary transition-colors text-sm"
                >
                  {modes.map((mode) => (
                    <option key={mode} value={mode}>
                      {mode === "all" ? "All Modes" : mode}
                    </option>
                  ))}
                </select>
              </div>

              <button className="w-full bg-dark-primary hover:bg-purple-600 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 text-sm">
                Apply Filters
              </button>
            </div>
          </div>

          {/* Course Cards */}
          <div className="lg:w-3/4">
            <div className="mb-6">
              <p className="text-gray-400">{filteredCourses.length} courses found</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {filteredCourses.map((course) => (
                <Link to={`/course/${course.id}`} key={course.id}>
                  <div className="bg-dark-surface border border-gray-700 rounded-2xl overflow-hidden hover:border-dark-primary transition-all duration-300 hover:transform hover:scale-[1.02] h-full">
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-dark-primary rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                          {course.image}
                        </div>
                        <div className="ml-4">
                          <h3 className="text-xl font-semibold">{course.title}</h3>
                          <p className="text-sm text-gray-400">{course.domain}</p>
                        </div>
                      </div>

                      <p className="text-gray-300 text-sm mb-4 line-clamp-2">{course.description}</p>

                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="flex items-center text-sm text-gray-400">
                          <Clock size={14} className="mr-2" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-400">
                          <Calendar size={14} className="mr-2" />
                          <span>Starts {course.startDate}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-400">
                          <BookOpen size={14} className="mr-2" />
                          <span>{course.level}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-400">
                          <Users size={14} className="mr-2" />
                          <span>{course.students} enrolled</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 bg-dark-bg text-gray-300 rounded-full text-xs border border-gray-600">
                          {course.mode}
                        </span>
                        <span className="text-dark-primary font-medium text-sm">View Details →</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoursesPage
