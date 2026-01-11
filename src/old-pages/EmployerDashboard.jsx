"use client"

import { useState } from "react"
import Sidebar from "../components/Sidebar"
import { Plus, Eye, Edit, Trash2, Users, Briefcase, TrendingUp, Calendar } from "lucide-react"

const EmployerDashboard = () => {
  const [showPostForm, setShowPostForm] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    duration: "",
    type: "Full-Time",
    salary: "",
    requirements: "",
  })

  const internshipPostings = [
    {
      id: 1,
      title: "Frontend Developer Intern",
      location: "San Francisco, CA",
      type: "Full-Time",
      applicants: 45,
      status: "Active",
      posted: "2024-01-15",
    },
    {
      id: 2,
      title: "Data Science Intern",
      location: "Remote",
      type: "Part-Time",
      applicants: 32,
      status: "Active",
      posted: "2024-01-12",
    },
    {
      id: 3,
      title: "Marketing Intern",
      location: "New York, NY",
      type: "Full-Time",
      applicants: 28,
      status: "Closed",
      posted: "2024-01-08",
    },
  ]

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setShowPostForm(false)
    // Reset form
    setFormData({
      title: "",
      description: "",
      company: "",
      location: "",
      duration: "",
      type: "Full-Time",
      salary: "",
      requirements: "",
    })
  }

  return (
    <div className="flex">
      <Sidebar userType="employer" />

      <div className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Employer Dashboard</h1>
            <p className="text-gray-400">Manage your internship postings and applications</p>
          </div>
          <button
            onClick={() => setShowPostForm(true)}
            className="bg-dark-primary hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>Post New Internship</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active Postings</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <Briefcase className="text-dark-primary" size={24} />
            </div>
          </div>

          <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Applications</p>
                <p className="text-2xl font-bold">156</p>
              </div>
              <Users className="text-dark-accent" size={24} />
            </div>
          </div>

          <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Interviews Scheduled</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <Calendar className="text-green-400" size={24} />
            </div>
          </div>

          <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Hired</p>
                <p className="text-2xl font-bold">5</p>
              </div>
              <TrendingUp className="text-yellow-400" size={24} />
            </div>
          </div>
        </div>

        {/* Post Internship Form Modal */}
        {showPostForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-dark-surface border border-gray-700 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Post New Internship</h2>
                <button onClick={() => setShowPostForm(false)} className="text-gray-400 hover:text-white">
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Job Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-dark-bg border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-dark-primary transition-colors"
                      placeholder="e.g. Frontend Developer Intern"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Company</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-dark-bg border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-dark-primary transition-colors"
                      placeholder="Your company name"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-dark-bg border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-dark-primary transition-colors"
                      placeholder="e.g. San Francisco, CA or Remote"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Duration</label>
                    <input
                      type="text"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-dark-bg border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-dark-primary transition-colors"
                      placeholder="e.g. 3 months"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-dark-bg border border-gray-600 rounded-lg text-white focus:outline-none focus:border-dark-primary transition-colors"
                    >
                      <option value="Full-Time">Full-Time</option>
                      <option value="Part-Time">Part-Time</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Salary</label>
                    <input
                      type="text"
                      name="salary"
                      value={formData.salary}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-dark-bg border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-dark-primary transition-colors"
                      placeholder="e.g. $2000/month"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Job Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-dark-bg border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-dark-primary transition-colors"
                    placeholder="Describe the internship role, responsibilities, and what the intern will learn..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Requirements</label>
                  <textarea
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 bg-dark-bg border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-dark-primary transition-colors"
                    placeholder="List the required skills, education, and experience..."
                    required
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="flex-1 bg-dark-primary hover:bg-purple-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200"
                  >
                    Post Internship
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPostForm(false)}
                    className="flex-1 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Current Postings */}
        <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-6">Current Postings</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 font-medium text-gray-300">Job Title</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-300">Location</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-300">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-300">Applicants</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-300">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-300">Posted</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {internshipPostings.map((posting) => (
                  <tr key={posting.id} className="border-b border-gray-700 hover:bg-dark-bg transition-colors">
                    <td className="py-4 px-4 font-medium">{posting.title}</td>
                    <td className="py-4 px-4 text-gray-300">{posting.location}</td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-1 bg-dark-accent text-white rounded-full text-xs">{posting.type}</span>
                    </td>
                    <td className="py-4 px-4 text-gray-300">{posting.applicants}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          posting.status === "Active" ? "bg-green-900 text-green-300" : "bg-red-900 text-red-300"
                        }`}
                      >
                        {posting.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-300">{posting.posted}</td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <button className="p-2 text-gray-400 hover:text-dark-accent transition-colors">
                          <Eye size={16} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-yellow-400 transition-colors">
                          <Edit size={16} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-400 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployerDashboard
