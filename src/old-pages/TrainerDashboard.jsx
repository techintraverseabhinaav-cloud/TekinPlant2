"use client"

import { useState } from "react"
import { Routes, Route, Link, useLocation } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import {
  BookOpen,
  Users,
  Calendar,
  BarChart3,
  Plus,
  Edit,
  Eye,
  Download,
  Upload,
  CheckCircle,
  Clock,
  Star,
  TrendingUp,
  FileText,
  MessageSquare,
} from "lucide-react"

// Main Dashboard Overview
const TrainerDashboardHome = () => {
  const stats = [
    { label: "Active Courses", value: "8", icon: BookOpen, color: "text-dark-primary" },
    { label: "Total Students", value: "156", icon: Users, color: "text-dark-accent" },
    { label: "Pending Assignments", value: "23", icon: Clock, color: "text-yellow-400" },
    { label: "Avg Rating", value: "4.8", icon: Star, color: "text-green-400" },
  ]

  const recentActivities = [
    {
      id: 1,
      type: "assignment",
      message: "New assignment submitted by John Doe in Full Stack Development",
      time: "2 hours ago",
      icon: FileText,
    },
    {
      id: 2,
      type: "question",
      message: "Sarah Wilson asked a question in React Fundamentals",
      time: "4 hours ago",
      icon: MessageSquare,
    },
    {
      id: 3,
      type: "completion",
      message: "5 students completed Module 3 in Web Development",
      time: "6 hours ago",
      icon: CheckCircle,
    },
    {
      id: 4,
      type: "enrollment",
      message: "3 new students enrolled in JavaScript Basics",
      time: "1 day ago",
      icon: Users,
    },
  ]

  const upcomingClasses = [
    {
      id: 1,
      course: "Full Stack Development",
      topic: "React State Management",
      time: "10:00 AM",
      date: "Today",
      students: 25,
    },
    {
      id: 2,
      course: "JavaScript Fundamentals",
      topic: "Async Programming",
      time: "2:00 PM",
      date: "Today",
      students: 18,
    },
    {
      id: 3,
      course: "Node.js Backend",
      topic: "Database Integration",
      time: "10:00 AM",
      date: "Tomorrow",
      students: 22,
    },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-dark-surface border border-gray-700 rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, Prof. John Smith!</h1>
        <p className="text-gray-400">Here's what's happening with your courses today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">{stat.label}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
              <stat.icon className={`${stat.color}`} size={32} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Upcoming Classes */}
        <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Upcoming Classes</h2>
            <Link to="/trainer-dashboard/schedule" className="text-dark-primary hover:text-purple-400 text-sm">
              View All
            </Link>
          </div>

          <div className="space-y-4">
            {upcomingClasses.map((class_) => (
              <div key={class_.id} className="p-4 bg-dark-bg rounded-lg border border-gray-600">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{class_.course}</h3>
                  <span className="text-xs text-gray-400">{class_.date}</span>
                </div>
                <p className="text-gray-400 text-sm mb-2">{class_.topic}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center text-gray-400">
                    <Clock size={14} className="mr-1" />
                    {class_.time}
                  </span>
                  <span className="flex items-center text-gray-400">
                    <Users size={14} className="mr-1" />
                    {class_.students} students
                  </span>
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
          <Link
            to="/trainer-dashboard/courses/add"
            className="flex flex-col items-center p-4 bg-dark-bg border border-gray-600 rounded-lg hover:border-dark-primary transition-colors"
          >
            <Plus className="text-dark-primary mb-2" size={24} />
            <span className="text-sm font-medium">Add Course</span>
          </Link>
          <Link
            to="/trainer-dashboard/assignments"
            className="flex flex-col items-center p-4 bg-dark-bg border border-gray-600 rounded-lg hover:border-dark-primary transition-colors"
          >
            <FileText className="text-dark-accent mb-2" size={24} />
            <span className="text-sm font-medium">Create Assignment</span>
          </Link>
          <Link
            to="/trainer-dashboard/students"
            className="flex flex-col items-center p-4 bg-dark-bg border border-gray-600 rounded-lg hover:border-dark-primary transition-colors"
          >
            <Users className="text-green-400 mb-2" size={24} />
            <span className="text-sm font-medium">View Students</span>
          </Link>
          <Link
            to="/trainer-dashboard/analytics"
            className="flex flex-col items-center p-4 bg-dark-bg border border-gray-600 rounded-lg hover:border-dark-primary transition-colors"
          >
            <BarChart3 className="text-yellow-400 mb-2" size={24} />
            <span className="text-sm font-medium">View Analytics</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

// Course Management Component
const CourseManagement = () => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Full Stack Web Development",
      students: 45,
      progress: 75,
      status: "Active",
      startDate: "2024-01-15",
      duration: "12 weeks",
      modules: 8,
      completedModules: 6,
    },
    {
      id: 2,
      title: "React Fundamentals",
      students: 32,
      progress: 60,
      status: "Active",
      startDate: "2024-02-01",
      duration: "8 weeks",
      modules: 6,
      completedModules: 3,
    },
    {
      id: 3,
      title: "JavaScript Basics",
      students: 28,
      progress: 90,
      status: "Ending Soon",
      startDate: "2024-01-01",
      duration: "6 weeks",
      modules: 5,
      completedModules: 4,
    },
  ])

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Course Management</h1>
        <Link
          to="/trainer-dashboard/courses/add"
          className="bg-dark-primary hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add New Course</span>
        </Link>
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
                        : course.status === "Ending Soon"
                          ? "bg-yellow-900 text-yellow-300"
                          : "bg-gray-900 text-gray-300"
                    }`}
                  >
                    {course.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center text-sm text-gray-400">
                    <Users size={14} className="mr-2" />
                    <span>{course.students} students</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <Calendar size={14} className="mr-2" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <BookOpen size={14} className="mr-2" />
                    <span>
                      {course.completedModules}/{course.modules} modules
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <TrendingUp size={14} className="mr-2" />
                    <span>{course.progress}% complete</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Course Progress</span>
                    <span className="text-gray-300">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-dark-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to={`/trainer-dashboard/courses/${course.id}`}
                  className="flex items-center justify-center space-x-2 px-4 py-2 bg-dark-bg border border-gray-600 rounded-lg hover:border-gray-500 transition-colors"
                >
                  <Eye size={16} />
                  <span>View</span>
                </Link>
                <Link
                  to={`/trainer-dashboard/courses/${course.id}/edit`}
                  className="flex items-center justify-center space-x-2 px-4 py-2 bg-dark-accent hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  <Edit size={16} />
                  <span>Edit</span>
                </Link>
                <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                  <Upload size={16} />
                  <span>Upload</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Student Tracking Component
const StudentTracking = () => {
  const [selectedCourse, setSelectedCourse] = useState("all")
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@email.com",
      course: "Full Stack Web Development",
      progress: 85,
      attendance: 92,
      assignments: { completed: 8, total: 10 },
      lastActive: "2 hours ago",
      grade: "A",
      status: "Active",
    },
    {
      id: 2,
      name: "Sarah Wilson",
      email: "sarah.wilson@email.com",
      course: "React Fundamentals",
      progress: 70,
      attendance: 88,
      assignments: { completed: 5, total: 7 },
      lastActive: "1 day ago",
      grade: "B+",
      status: "Active",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@email.com",
      course: "JavaScript Basics",
      progress: 95,
      attendance: 96,
      assignments: { completed: 6, total: 6 },
      lastActive: "3 hours ago",
      grade: "A+",
      status: "Completed",
    },
    {
      id: 4,
      name: "Emily Brown",
      email: "emily.brown@email.com",
      course: "Full Stack Web Development",
      progress: 45,
      attendance: 75,
      assignments: { completed: 4, total: 10 },
      lastActive: "5 days ago",
      grade: "C",
      status: "At Risk",
    },
  ])

  const courses = ["all", "Full Stack Web Development", "React Fundamentals", "JavaScript Basics"]

  const filteredStudents = selectedCourse === "all" ? students : students.filter((s) => s.course === selectedCourse)

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-900 text-green-300"
      case "Completed":
        return "bg-blue-900 text-blue-300"
      case "At Risk":
        return "bg-red-900 text-red-300"
      default:
        return "bg-gray-900 text-gray-300"
    }
  }

  const getGradeColor = (grade) => {
    if (grade.startsWith("A")) return "text-green-400"
    if (grade.startsWith("B")) return "text-blue-400"
    if (grade.startsWith("C")) return "text-yellow-400"
    return "text-red-400"
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold">Student Tracking</h1>
        <div className="flex items-center space-x-4">
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="px-4 py-2 bg-dark-bg border border-gray-600 rounded-lg text-white focus:outline-none focus:border-dark-primary transition-colors"
          >
            {courses.map((course) => (
              <option key={course} value={course}>
                {course === "all" ? "All Courses" : course}
              </option>
            ))}
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 bg-dark-primary hover:bg-purple-600 text-white rounded-lg transition-colors">
            <Download size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>

      <div className="bg-dark-surface border border-gray-700 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-dark-bg border-b border-gray-700">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-gray-300">Student</th>
                <th className="text-left py-4 px-6 font-medium text-gray-300">Course</th>
                <th className="text-left py-4 px-6 font-medium text-gray-300">Progress</th>
                <th className="text-left py-4 px-6 font-medium text-gray-300">Attendance</th>
                <th className="text-left py-4 px-6 font-medium text-gray-300">Assignments</th>
                <th className="text-left py-4 px-6 font-medium text-gray-300">Grade</th>
                <th className="text-left py-4 px-6 font-medium text-gray-300">Status</th>
                <th className="text-left py-4 px-6 font-medium text-gray-300">Last Active</th>
                <th className="text-left py-4 px-6 font-medium text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className="border-b border-gray-700 hover:bg-dark-bg transition-colors">
                  <td className="py-4 px-6">
                    <div>
                      <div className="font-medium">{student.name}</div>
                      <div className="text-sm text-gray-400">{student.email}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-300">{student.course}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-dark-primary h-2 rounded-full"
                          style={{ width: `${student.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-300">{student.progress}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`${student.attendance >= 90 ? "text-green-400" : student.attendance >= 75 ? "text-yellow-400" : "text-red-400"}`}
                    >
                      {student.attendance}%
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-300">
                    {student.assignments.completed}/{student.assignments.total}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`font-medium ${getGradeColor(student.grade)}`}>{student.grade}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(student.status)}`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-400 text-sm">{student.lastActive}</td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-400 hover:text-dark-accent transition-colors">
                        <Eye size={16} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-green-400 transition-colors">
                        <MessageSquare size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Performance Summary */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4">Performance Overview</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-400">Excellent (A/A+)</span>
              <span className="text-green-400">
                {filteredStudents.filter((s) => s.grade.startsWith("A")).length} students
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Good (B/B+)</span>
              <span className="text-blue-400">
                {filteredStudents.filter((s) => s.grade.startsWith("B")).length} students
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Average (C)</span>
              <span className="text-yellow-400">
                {filteredStudents.filter((s) => s.grade.startsWith("C")).length} students
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">At Risk</span>
              <span className="text-red-400">
                {filteredStudents.filter((s) => s.status === "At Risk").length} students
              </span>
            </div>
          </div>
        </div>

        <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4">Attendance Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-400">Excellent (90%+)</span>
              <span className="text-green-400">
                {filteredStudents.filter((s) => s.attendance >= 90).length} students
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Good (75-89%)</span>
              <span className="text-yellow-400">
                {filteredStudents.filter((s) => s.attendance >= 75 && s.attendance < 90).length} students
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Poor (&lt;75%)</span>
              <span className="text-red-400">{filteredStudents.filter((s) => s.attendance < 75).length} students</span>
            </div>
          </div>
        </div>

        <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4">Assignment Status</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-400">All Complete</span>
              <span className="text-green-400">
                {filteredStudents.filter((s) => s.assignments.completed === s.assignments.total).length} students
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Mostly Complete</span>
              <span className="text-blue-400">
                {
                  filteredStudents.filter(
                    (s) =>
                      s.assignments.completed / s.assignments.total >= 0.8 &&
                      s.assignments.completed !== s.assignments.total,
                  ).length
                }{" "}
                students
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Behind</span>
              <span className="text-red-400">
                {filteredStudents.filter((s) => s.assignments.completed / s.assignments.total < 0.8).length} students
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Assignment Management Component
const AssignmentManagement = () => {
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "React Component Design",
      course: "Full Stack Web Development",
      dueDate: "2024-02-20",
      submissions: 18,
      totalStudents: 25,
      status: "Active",
      graded: 12,
    },
    {
      id: 2,
      title: "JavaScript Functions Exercise",
      course: "JavaScript Basics",
      dueDate: "2024-02-15",
      submissions: 28,
      totalStudents: 28,
      status: "Completed",
      graded: 28,
    },
    {
      id: 3,
      title: "State Management Project",
      course: "React Fundamentals",
      dueDate: "2024-02-25",
      submissions: 8,
      totalStudents: 32,
      status: "Active",
      graded: 3,
    },
  ])

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Assignment Management</h1>
        <button className="bg-dark-primary hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2">
          <Plus size={20} />
          <span>Create Assignment</span>
        </button>
      </div>

      <div className="grid gap-6">
        {assignments.map((assignment) => (
          <div key={assignment.id} className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">{assignment.title}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      assignment.status === "Active" ? "bg-green-900 text-green-300" : "bg-blue-900 text-blue-300"
                    }`}
                  >
                    {assignment.status}
                  </span>
                </div>

                <p className="text-gray-400 mb-4">{assignment.course}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-dark-primary">{assignment.submissions}</div>
                    <div className="text-sm text-gray-400">Submissions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-dark-accent">{assignment.totalStudents}</div>
                    <div className="text-sm text-gray-400">Total Students</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">{assignment.graded}</div>
                    <div className="text-sm text-gray-400">Graded</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">
                      {assignment.submissions - assignment.graded}
                    </div>
                    <div className="text-sm text-gray-400">Pending</div>
                  </div>
                </div>

                <div className="flex items-center text-sm text-gray-400">
                  <Calendar size={14} className="mr-2" />
                  <span>Due: {assignment.dueDate}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-dark-bg border border-gray-600 rounded-lg hover:border-gray-500 transition-colors">
                  <Eye size={16} />
                  <span>View Submissions</span>
                </button>
                <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-dark-accent hover:bg-blue-600 text-white rounded-lg transition-colors">
                  <Edit size={16} />
                  <span>Grade</span>
                </button>
                <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                  <Download size={16} />
                  <span>Export</span>
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
const TrainerAnalytics = () => {
  const analyticsData = {
    coursePerformance: [
      { course: "Full Stack Development", completion: 75, satisfaction: 4.8, enrollment: 45 },
      { course: "React Fundamentals", completion: 60, satisfaction: 4.6, enrollment: 32 },
      { course: "JavaScript Basics", completion: 90, satisfaction: 4.9, enrollment: 28 },
    ],
    monthlyStats: {
      totalStudents: 156,
      activeStudents: 105,
      completionRate: 78,
      averageRating: 4.7,
    },
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Analytics Dashboard</h1>

      {/* Monthly Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Students</p>
              <p className="text-3xl font-bold">{analyticsData.monthlyStats.totalStudents}</p>
            </div>
            <Users className="text-dark-primary" size={32} />
          </div>
        </div>
        <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Active Students</p>
              <p className="text-3xl font-bold">{analyticsData.monthlyStats.activeStudents}</p>
            </div>
            <TrendingUp className="text-green-400" size={32} />
          </div>
        </div>
        <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Completion Rate</p>
              <p className="text-3xl font-bold">{analyticsData.monthlyStats.completionRate}%</p>
            </div>
            <CheckCircle className="text-dark-accent" size={32} />
          </div>
        </div>
        <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Average Rating</p>
              <p className="text-3xl font-bold">{analyticsData.monthlyStats.averageRating}</p>
            </div>
            <Star className="text-yellow-400" size={32} />
          </div>
        </div>
      </div>

      {/* Course Performance */}
      <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-6">Course Performance</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-700">
              <tr>
                <th className="text-left py-3 font-medium text-gray-300">Course</th>
                <th className="text-left py-3 font-medium text-gray-300">Enrollment</th>
                <th className="text-left py-3 font-medium text-gray-300">Completion Rate</th>
                <th className="text-left py-3 font-medium text-gray-300">Satisfaction</th>
                <th className="text-left py-3 font-medium text-gray-300">Performance</th>
              </tr>
            </thead>
            <tbody>
              {analyticsData.coursePerformance.map((course, index) => (
                <tr key={index} className="border-b border-gray-700">
                  <td className="py-4 font-medium">{course.course}</td>
                  <td className="py-4 text-gray-300">{course.enrollment} students</td>
                  <td className="py-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-dark-primary h-2 rounded-full"
                          style={{ width: `${course.completion}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-300">{course.completion}%</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center space-x-1">
                      <Star className="text-yellow-400" size={16} />
                      <span>{course.satisfaction}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        course.completion >= 80
                          ? "bg-green-900 text-green-300"
                          : course.completion >= 60
                            ? "bg-yellow-900 text-yellow-300"
                            : "bg-red-900 text-red-300"
                      }`}
                    >
                      {course.completion >= 80 ? "Excellent" : course.completion >= 60 ? "Good" : "Needs Attention"}
                    </span>
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

// Main Trainer Dashboard Component
const TrainerDashboard = () => {
  const location = useLocation()

  return (
    <div className="flex">
      <Sidebar userType="trainer" />

      <div className="flex-1 ml-64 p-8">
        <Routes>
          <Route path="/" element={<TrainerDashboardHome />} />
          <Route path="/courses" element={<CourseManagement />} />
          <Route path="/students" element={<StudentTracking />} />
          <Route path="/assignments" element={<AssignmentManagement />} />
          <Route path="/analytics" element={<TrainerAnalytics />} />
        </Routes>
      </div>
    </div>
  )
}

export default TrainerDashboard
