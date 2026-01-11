"use client"

import { useState } from "react"
import { Search, Filter, MapPin, Clock, Building, Star } from "lucide-react"

const InternshipList = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedIndustry, setSelectedIndustry] = useState("all")
  const [selectedMode, setSelectedMode] = useState("all")
  const [selectedDuration, setSelectedDuration] = useState("all")

  const internships = [
    {
      id: 1,
      title: "Frontend Developer Intern",
      company: "TechCorp",
      location: "San Francisco, CA",
      mode: "Remote",
      duration: "3 months",
      type: "Full-Time",
      salary: "$2,000/month",
      rating: 4.8,
      tags: ["React", "JavaScript", "CSS"],
      description: "Join our frontend team to build amazing user interfaces...",
      logo: "🚀",
    },
    {
      id: 2,
      title: "Data Science Intern",
      company: "DataLabs",
      location: "New York, NY",
      mode: "Hybrid",
      duration: "6 months",
      type: "Part-Time",
      salary: "$1,800/month",
      rating: 4.6,
      tags: ["Python", "Machine Learning", "SQL"],
      description: "Work with our data science team on cutting-edge projects...",
      logo: "📊",
    },
    {
      id: 3,
      title: "Marketing Intern",
      company: "BrandStudio",
      location: "Los Angeles, CA",
      mode: "On-site",
      duration: "4 months",
      type: "Full-Time",
      salary: "$1,500/month",
      rating: 4.7,
      tags: ["Digital Marketing", "SEO", "Content"],
      description: "Help us create compelling marketing campaigns...",
      logo: "📱",
    },
    {
      id: 4,
      title: "UX Design Intern",
      company: "DesignHub",
      location: "Seattle, WA",
      mode: "Remote",
      duration: "3 months",
      type: "Part-Time",
      salary: "$2,200/month",
      rating: 4.9,
      tags: ["Figma", "User Research", "Prototyping"],
      description: "Design intuitive user experiences for our products...",
      logo: "🎨",
    },
    {
      id: 5,
      title: "Backend Developer Intern",
      company: "ServerTech",
      location: "Austin, TX",
      mode: "Hybrid",
      duration: "5 months",
      type: "Full-Time",
      salary: "$2,100/month",
      rating: 4.5,
      tags: ["Node.js", "MongoDB", "API"],
      description: "Build scalable backend systems and APIs...",
      logo: "⚙️",
    },
    {
      id: 6,
      title: "Product Management Intern",
      company: "InnovateCorp",
      location: "Boston, MA",
      mode: "On-site",
      duration: "4 months",
      type: "Full-Time",
      salary: "$2,300/month",
      rating: 4.8,
      tags: ["Strategy", "Analytics", "Roadmapping"],
      description: "Help shape product strategy and roadmap...",
      logo: "💼",
    },
  ]

  const industries = ["all", "Technology", "Marketing", "Design", "Finance", "Healthcare"]
  const modes = ["all", "Remote", "On-site", "Hybrid"]
  const durations = ["all", "3 months", "4 months", "5 months", "6 months"]

  const filteredInternships = internships.filter((internship) => {
    const matchesSearch =
      internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesIndustry =
      selectedIndustry === "all" ||
      internship.tags.some((tag) => tag.toLowerCase().includes(selectedIndustry.toLowerCase()))
    const matchesMode = selectedMode === "all" || internship.mode === selectedMode
    const matchesDuration = selectedDuration === "all" || internship.duration === selectedDuration

    return matchesSearch && matchesIndustry && matchesMode && matchesDuration
  })

  return (
    <div className="min-h-screen bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                    placeholder="Search internships..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-dark-bg border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-dark-primary transition-colors text-sm"
                  />
                </div>
              </div>

              {/* Industry Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Industry</label>
                <select
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="w-full px-3 py-2 bg-dark-bg border border-gray-600 rounded-lg text-white focus:outline-none focus:border-dark-primary transition-colors text-sm"
                >
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry === "all" ? "All Industries" : industry}
                    </option>
                  ))}
                </select>
              </div>

              {/* Mode Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Work Mode</label>
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

              <button className="w-full bg-dark-primary hover:bg-purple-600 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 text-sm">
                Apply Filters
              </button>
            </div>
          </div>

          {/* Internship Cards */}
          <div className="lg:w-3/4">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">Available Internships</h1>
              <p className="text-gray-400">{filteredInternships.length} internships found</p>
            </div>

            <div className="space-y-6">
              {filteredInternships.map((internship) => (
                <div
                  key={internship.id}
                  className="bg-dark-surface border border-gray-700 rounded-2xl p-6 hover:border-dark-primary transition-all duration-300 hover:transform hover:scale-[1.02] cursor-pointer group"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                    <div className="flex items-start space-x-4 mb-4 md:mb-0">
                      <div className="w-12 h-12 bg-dark-primary rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                        {internship.logo}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold group-hover:text-dark-primary transition-colors mb-1">
                          {internship.title}
                        </h3>
                        <p className="text-gray-400 flex items-center mb-2">
                          <Building size={16} className="mr-2" />
                          {internship.company}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                          <span className="flex items-center">
                            <MapPin size={14} className="mr-1" />
                            {internship.location}
                          </span>
                          <span className="flex items-center">
                            <Clock size={14} className="mr-1" />
                            {internship.duration}
                          </span>
                          <span className="px-2 py-1 bg-dark-bg rounded-full text-xs">{internship.mode}</span>
                        </div>
                        <p className="text-gray-300 text-sm mb-3">{internship.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {internship.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-dark-bg text-gray-300 rounded-full text-xs border border-gray-600"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end space-y-2">
                      <div className="flex items-center space-x-1 text-yellow-400">
                        <Star size={16} fill="currentColor" />
                        <span className="text-sm font-medium">{internship.rating}</span>
                      </div>
                      <p className="text-lg font-semibold text-dark-primary">{internship.salary}</p>
                      <span className="px-3 py-1 bg-dark-accent text-white rounded-full text-sm">
                        {internship.type}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InternshipList
