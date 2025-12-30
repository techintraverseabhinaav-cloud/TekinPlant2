"use client"

import { useState } from "react"
import { Routes, Route } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import {
  Users,
  BookOpen,
  TrendingUp,
  DollarSign,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  Search,
  BarChart3,
  Settings,
} from "lucide-react"

// Admin Dashboard Home
const AdminDashboardHome = () => {
  const stats = [
    { label: "Total Users", value: "2,847", icon: Users, color: "text-dark-primary", change: "+12%" },
    { label: "Active Courses", value: "156", icon: BookOpen, color: "text-dark-accent", change: "+8%" },
    { label: "Revenue", value: "₹12.5L", icon: DollarSign, color: "text-green-400", change: "+15%" },
    { label: "Completion Rate", value: "87%", icon: TrendingUp, color: "text-yellow-400", change: "+3%" },
  ]

  const recentActivities = [
    {
      id: 1,
      type: "enrollment",
      message: "25 new students enrolled in Full Stack Development",
      time: "2 hours ago",
      icon: Users,
    },
    {
      id: 2,
      type: "course",
      message: "New course 'AI/ML Fundamentals' added by Prof. Smith",
      time: "4 hours ago",
      icon: BookOpen,
    },
    {
      id: 3,
      type: "payment",
      message: "₹2.5L revenue generated from corporate training",
      time: "6 hours ago",
      icon: DollarSign,
    },
    {
      id: 4,
      type: "completion",
      message: "45 students completed JavaScript Basics certification",
      time: "1 day ago",
      icon: TrendingUp,
    },
  ]

  const topCourses = [
    { name: "Full Stack Web Development", students: 245, revenue: "₹4.2L", rating: 4.8 },
    { name: "Data Science & Analytics", students: 189, revenue: "₹3.1L", rating: 4.7 },
    { name: "Digital Marketing", students: 156, revenue: "₹2.8L", rating: 4.6 },
    { name: "Cloud Computing", students: 134, revenue: "₹2.4L", rating: 4.9 },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-dark-surface border border-gray-700 rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-400">Welcome back! Here's what's happening with TEKINPLANT today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <stat.icon className={`${stat.color}`} size={32} />
              <span
                className={`text-sm font-medium ${stat.change.startsWith("+") ? "text-green-400" : "text-red-400"}`}
              >
                {stat.change}
              </span>
            </div>
            <div>
              <p className="text-gray-400 text-sm">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Top Performing Courses */}
        <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-6">Top Performing Courses</h2>
          <div className="space-y-4">
            {topCourses.map((course, index) => (
              <div key={index} className="p-4 bg-dark-bg rounded-lg border border-gray-600">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{course.name}</h3>
                  <span className="text-sm text-green-400">{course.revenue}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>{course.students} students</span>
                  <span className="flex items-center">⭐ {course.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-6">Recent Activities</h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 bg-dark-bg rounded-lg">
                <div className="w-8 h-8 bg-dark-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <activity.icon size={16} className="text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-300">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 bg-dark-bg border border-gray-600 rounded-lg hover:border-dark-primary transition-colors">
            <Plus className="text-dark-primary mb-2" size={24} />
            <span className="text-sm font-medium">Add User</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-dark-bg border border-gray-600 rounded-lg hover:border-dark-primary transition-colors">
            <BookOpen className="text-dark-accent mb-2" size={24} />
            <span className="text-sm font-medium">Manage Courses</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-dark-bg border border-gray-600 rounded-lg hover:border-dark-primary transition-colors">
            <BarChart3 className="text-green-400 mb-2" size={24} />
            <span className="text-sm font-medium">View Reports</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-dark-bg border border-gray-600 rounded-lg hover:border-dark-primary transition-colors">
            <Settings className="text-yellow-400 mb-2" size={24} />
            <span className="text-sm font-medium">System Settings</span>
          </button>
        </div>
      </div>
    </div>
  )
}

// User Management Component
const UserManagement = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@email.com",
      role: "Student",
      status: "Active",
      joinDate: "2024-01-15",
      lastLogin: "2 hours ago",
    },
    {
      id: 2,
      name: "Prof. Sarah Wilson",
      email: "sarah.wilson@trainin.com",
      role: "Trainer",
      status: "Active",
      joinDate: "2023-12-01",
      lastLogin: "1 day ago",
    },
    {
      id: 3,
      name: "TechCorp Ltd",
      email: "hr@techcorp.com",
      role: "Corporate",
      status: "Active",
      joinDate: "2024-01-10",
      lastLogin: "3 hours ago",
    },
    {
      id: 4,
      name: "Mike Johnson",
      email: "mike.johnson@email.com",
      role: "Student",
      status: "Inactive",
      joinDate: "2024-01-05",
      lastLogin: "1 week ago",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    return matchesSearch && matchesRole
  })

  const getRoleColor = (role) => {
    switch (role) {
      case "Admin":
        return "bg-red-900 text-red-300"
      case "Trainer":
        return "bg-blue-900 text-blue-300"
      case "Student":
        return "bg-green-900 text-green-300"
      case "Corporate":
        return "bg-purple-900 text-purple-300"
      default:
        return "bg-gray-900 text-gray-300"
    }
  }

  const getStatusColor = (status) => {
    return status === "Active" ? "bg-green-900 text-green-300" : "bg-red-900 text-red-300"
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold">User Management</h1>
        <button className="bg-dark-primary hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2">
          <Plus size={20} />
          <span>Add User</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-dark-bg border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-dark-primary transition-colors"
              />
            </div>
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-3 bg-dark-bg border border-gray-600 rounded-lg text-white focus:outline-none focus:border-dark-primary transition-colors"
          >
            <option value="all">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="Trainer">Trainer</option>
            <option value="Student">Student</option>
            <option value="Corporate">Corporate</option>
          </select>
          <button className="flex items-center space-x-2 px-4 py-3 bg-dark-accent hover:bg-blue-600 text-white rounded-lg transition-colors">
            <Download size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-dark-surface border border-gray-700 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-dark-bg border-b border-gray-700">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-gray-300">User</th>
                <th className="text-left py-4 px-6 font-medium text-gray-300">Role</th>
                <th className="text-left py-4 px-6 font-medium text-gray-300">Status</th>
                <th className="text-left py-4 px-6 font-medium text-gray-300">Join Date</th>
                <th className="text-left py-4 px-6 font-medium text-gray-300">Last Login</th>
                <th className="text-left py-4 px-6 font-medium text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-700 hover:bg-dark-bg transition-colors">
                  <td className="py-4 px-6">
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-gray-400">{user.email}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-300">{user.joinDate}</td>
                  <td className="py-4 px-6 text-gray-400">{user.lastLogin}</td>
                  <td className="py-4 px-6">
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
  )
}

// Course Management Component
const AdminCourseManagement = () => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Full Stack Web Development",
      trainer: "Prof. John Smith",
      students: 245,
      revenue: "₹4.2L",
      status: "Active",
      startDate: "2024-01-15",
      duration: "12 weeks",
      rating: 4.8,
    },
    {
      id: 2,
      title: "Data Science & Analytics",
      trainer: "Dr. Sarah Wilson",
      students: 189,
      revenue: "₹3.1L",
      status: "Active",
      startDate: "2024-02-01",
      duration: "10 weeks",
      rating: 4.7,
    },
    {
      id: 3,
      title: "Digital Marketing",
      trainer: "Prof. Mike Johnson",
      students: 156,
      revenue: "₹2.8L",
      status: "Completed",
      startDate: "2024-01-01",
      duration: "8 weeks",
      rating: 4.6,
    },
  ])

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Course Management</h1>
        <button className="bg-dark-primary hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2">
          <Plus size={20} />
          <span>Add Course</span>
        </button>
      </div>

      <div className="grid gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">{course.title}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      course.status === "Active"
                        ? "bg-green-900 text-green-300"
                        : course.status === "Completed"
                          ? "bg-blue-900 text-blue-300"
                          : "bg-gray-900 text-gray-300"
                    }`}
                  >
                    {course.status}
                  </span>
                </div>

                <p className="text-gray-400 mb-4">Trainer: {course.trainer}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-dark-primary">{course.students}</div>
                    <div className="text-sm text-gray-400">Students</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">{course.revenue}</div>
                    <div className="text-sm text-gray-400">Revenue</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">{course.rating}</div>
                    <div className="text-sm text-gray-400">Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-dark-accent">{course.duration}</div>
                    <div className="text-sm text-gray-400">Duration</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-dark-bg border border-gray-600 rounded-lg hover:border-gray-500 transition-colors">
                  <Eye size={16} />
                  <span>View</span>
                </button>
                <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-dark-accent hover:bg-blue-600 text-white rounded-lg transition-colors">
                  <Edit size={16} />
                  <span>Edit</span>
                </button>
                <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
                  <Trash2 size={16} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Analytics Component
const AdminAnalytics = () => {
  const analyticsData = {
    overview: {
      totalRevenue: "₹45.2L",
      totalStudents: 2847,
      activeCourses: 156,
      completionRate: 87,
    },
    monthlyGrowth: {
      revenue: "+15%",
      students: "+12%",
      courses: "+8%",
      completion: "+3%",
    },
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Analytics & Reports</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="text-green-400" size={32} />
            <span className="text-sm font-medium text-green-400">{analyticsData.monthlyGrowth.revenue}</span>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Total Revenue</p>
            <p className="text-3xl font-bold">{analyticsData.overview.totalRevenue}</p>
          </div>
        </div>

        <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Users className="text-dark-primary" size={32} />
            <span className="text-sm font-medium text-green-400">{analyticsData.monthlyGrowth.students}</span>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Total Students</p>
            <p className="text-3xl font-bold">{analyticsData.overview.totalStudents.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <BookOpen className="text-dark-accent" size={32} />
            <span className="text-sm font-medium text-green-400">{analyticsData.monthlyGrowth.courses}</span>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Active Courses</p>
            <p className="text-3xl font-bold">{analyticsData.overview.activeCourses}</p>
          </div>
        </div>

        <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="text-yellow-400" size={32} />
            <span className="text-sm font-medium text-green-400">{analyticsData.monthlyGrowth.completion}</span>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Completion Rate</p>
            <p className="text-3xl font-bold">{analyticsData.overview.completionRate}%</p>
          </div>
        </div>
      </div>

      {/* Charts Placeholder */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
          <h3 className="text-xl font-bold mb-4">Revenue Trends</h3>
          <div className="h-64 bg-dark-bg rounded-lg flex items-center justify-center">
            <p className="text-gray-400">Revenue Chart Placeholder</p>
          </div>
        </div>

        <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
          <h3 className="text-xl font-bold mb-4">Student Enrollment</h3>
          <div className="h-64 bg-dark-bg rounded-lg flex items-center justify-center">
            <p className="text-gray-400">Enrollment Chart Placeholder</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main Admin Dashboard Component
const AdminDashboard = () => {
  return (
    <div className="flex">
      <Sidebar userType="admin" />

      <div className="flex-1 ml-64 p-8">
        <Routes>
          <Route path="/" element={<AdminDashboardHome />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/courses" element={<AdminCourseManagement />} />
          <Route path="/analytics" element={<AdminAnalytics />} />
        </Routes>
      </div>
    </div>
  )
}

export default AdminDashboard
