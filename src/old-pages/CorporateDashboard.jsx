"use client"

import { useState } from "react"
import { Routes, Route } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import {
  Users,
  BookOpen,
  DollarSign,
  Plus,
  Download,
  Eye,
  Calendar,
  Award,
  BarChart3,
  FileText,
  Building,
} from "lucide-react"

// Corporate Dashboard Home
const CorporateDashboardHome = () => {
  const stats = [
    { label: "Total Employees", value: "245", icon: Users, color: "text-dark-primary", change: "+12" },
    { label: "Active Training", value: "8", icon: BookOpen, color: "text-dark-accent", change: "+3" },
    { label: "Completed Courses", value: "156", icon: Award, color: "text-green-400", change: "+45" },
    { label: "Training Budget", value: "₹12.5L", icon: DollarSign, color: "text-yellow-400", change: "₹2.1L" },
  ]

  const recentActivities = [
    {
      id: 1,
      type: "enrollment",
      message: "25 employees enrolled in Full Stack Development program",
      time: "2 hours ago",
      icon: Users,
    },
    {
      id: 2,
      type: "completion",
      message: "John Doe completed Data Science certification",
      time: "4 hours ago",
      icon: Award,
    },
    {
      id: 3,
      type: "training",
      message: "New batch started for Digital Marketing training",
      time: "1 day ago",
      icon: BookOpen,
    },
    {
      id: 4,
      type: "report",
      message: "Monthly training report generated and sent",
      time: "2 days ago",
      icon: FileText,
    },
  ]

  const activePrograms = [
    {
      id: 1,
      name: "Full Stack Web Development",
      employees: 25,
      progress: 65,
      startDate: "2024-01-15",
      endDate: "2024-04-15",
      trainer: "Prof. John Smith",
      status: "In Progress",
    },
    {
      id: 2,
      name: "Data Science & Analytics",
      employees: 18,
      progress: 40,
      startDate: "2024-02-01",
      endDate: "2024-04-30",
      trainer: "Dr. Sarah Wilson",
      status: "In Progress",
    },
    {
      id: 3,
      name: "Digital Marketing",
      employees: 22,
      progress: 85,
      startDate: "2024-01-01",
      endDate: "2024-03-01",
      trainer: "Prof. Mike Johnson",
      status: "Ending Soon",
    },
  ]

  const upcomingDeadlines = [
    { task: "Q1 Training Report Due", date: "2024-03-31", type: "report" },
    { task: "Digital Marketing Batch Completion", date: "2024-03-01", type: "completion" },
    { task: "New Hire Orientation", date: "2024-02-25", type: "orientation" },
    { task: "Skills Assessment Review", date: "2024-03-15", type: "assessment" },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-dark-surface border border-gray-700 rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, TechCorp HR!</h1>
        <p className="text-gray-400">Manage your organization's training programs and track employee progress.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <stat.icon className={`${stat.color}`} size={32} />
              <span className="text-sm font-medium text-green-400">+{stat.change}</span>
            </div>
            <div>
              <p className="text-gray-400 text-sm">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Active Training Programs */}
        <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Active Training Programs</h2>
            <button className="text-dark-primary hover:text-purple-400 text-sm">View All</button>
          </div>

          <div className="space-y-4">
            {activePrograms.map((program) => (
              <div key={program.id} className="p-4 bg-dark-bg rounded-lg border border-gray-600">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold">{program.name}</h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      program.status === "In Progress"
                        ? "bg-blue-900 text-blue-300"
                        : program.status === "Ending Soon"
                          ? "bg-yellow-900 text-yellow-300"
                          : "bg-green-900 text-green-300"
                    }`}
                  >
                    {program.status}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-3">Trainer: {program.trainer}</p>
                <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                  <span>{program.employees} employees</span>
                  <span>
                    {program.startDate} - {program.endDate}
                  </span>
                </div>
                <div className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-gray-300">{program.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-dark-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${program.progress}%` }}
                    ></div>
                  </div>
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

      {/* Upcoming Deadlines & Quick Actions */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-6">Upcoming Deadlines</h2>
          <div className="space-y-3">
            {upcomingDeadlines.map((deadline, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-dark-bg rounded-lg">
                <div className="flex items-center space-x-3">
                  <Calendar className="text-dark-primary" size={16} />
                  <span className="text-sm">{deadline.task}</span>
                </div>
                <span className="text-xs text-gray-400">{deadline.date}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="flex flex-col items-center p-4 bg-dark-bg border border-gray-600 rounded-lg hover:border-dark-primary transition-colors">
              <Plus className="text-dark-primary mb-2" size={24} />
              <span className="text-sm font-medium">Enroll Employees</span>
            </button>
            <button className="flex flex-col items-center p-4 bg-dark-bg border border-gray-600 rounded-lg hover:border-dark-primary transition-colors">
              <FileText className="text-dark-accent mb-2" size={24} />
              <span className="text-sm font-medium">Generate Report</span>
            </button>
            <button className="flex flex-col items-center p-4 bg-dark-bg border border-gray-600 rounded-lg hover:border-dark-primary transition-colors">
              <BarChart3 className="text-green-400 mb-2" size={24} />
              <span className="text-sm font-medium">View Analytics</span>
            </button>
            <button className="flex flex-col items-center p-4 bg-dark-bg border border-gray-600 rounded-lg hover:border-dark-primary transition-colors">
              <DollarSign className="text-yellow-400 mb-2" size={24} />
              <span className="text-sm font-medium">Billing</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Employee Management Component
const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@techcorp.com",
      department: "Engineering",
      position: "Software Developer",
      enrolledCourses: 2,
      completedCourses: 1,
      progress: 75,
      lastActivity: "2 hours ago",
      status: "Active",
    },
    {
      id: 2,
      name: "Sarah Wilson",
      email: "sarah.wilson@techcorp.com",
      department: "Marketing",
      position: "Marketing Manager",
      enrolledCourses: 1,
      completedCourses: 3,
      progress: 90,
      lastActivity: "1 day ago",
      status: "Active",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@techcorp.com",
      department: "Sales",
      position: "Sales Executive",
      enrolledCourses: 3,
      completedCourses: 0,
      progress: 45,
      lastActivity: "3 days ago",
      status: "Inactive",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")

  const departments = ["all", "Engineering", "Marketing", "Sales", "HR", "Finance"]

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = departmentFilter === "all" || employee.department === departmentFilter
    return matchesSearch && matchesDepartment
  })

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold">Employee Management</h1>
        <div className="flex gap-3">
          <button className="bg-dark-primary hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2">
            <Plus size={20} />
            <span>Add Employee</span>
          </button>
          <button className="bg-dark-accent hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2">
            <Download size={20} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 bg-dark-bg border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-dark-primary transition-colors"
            />
          </div>
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="px-4 py-3 bg-dark-bg border border-gray-600 rounded-lg text-white focus:outline-none focus:border-dark-primary transition-colors"
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept === "all" ? "All Departments" : dept}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Employee Table */}
      <div className="bg-dark-surface border border-gray-700 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-dark-bg border-b border-gray-700">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-gray-300">Employee</th>
                <th className="text-left py-4 px-6 font-medium text-gray-300">Department</th>
                <th className="text-left py-4 px-6 font-medium text-gray-300">Training Progress</th>
                <th className="text-left py-4 px-6 font-medium text-gray-300">Courses</th>
                <th className="text-left py-4 px-6 font-medium text-gray-300">Status</th>
                <th className="text-left py-4 px-6 font-medium text-gray-300">Last Activity</th>
                <th className="text-left py-4 px-6 font-medium text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="border-b border-gray-700 hover:bg-dark-bg transition-colors">
                  <td className="py-4 px-6">
                    <div>
                      <div className="font-medium">{employee.name}</div>
                      <div className="text-sm text-gray-400">{employee.email}</div>
                      <div className="text-xs text-gray-500">{employee.position}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-300">{employee.department}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-dark-primary h-2 rounded-full"
                          style={{ width: `${employee.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-300">{employee.progress}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-300">
                    <div className="text-sm">
                      <div>Enrolled: {employee.enrolledCourses}</div>
                      <div>Completed: {employee.completedCourses}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        employee.status === "Active" ? "bg-green-900 text-green-300" : "bg-red-900 text-red-300"
                      }`}
                    >
                      {employee.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-400 text-sm">{employee.lastActivity}</td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-400 hover:text-dark-accent transition-colors">
                        <Eye size={16} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-green-400 transition-colors">
                        <Plus size={16} />
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

// Training Programs Component
const TrainingPrograms = () => {
  const [programs, setPrograms] = useState([
    {
      id: 1,
      name: "Full Stack Web Development",
      description: "Comprehensive web development training covering frontend and backend technologies",
      duration: "12 weeks",
      enrolled: 25,
      completed: 8,
      inProgress: 17,
      startDate: "2024-01-15",
      endDate: "2024-04-15",
      trainer: "Prof. John Smith",
      cost: "₹2,50,000",
      status: "Active",
    },
    {
      id: 2,
      name: "Data Science & Analytics",
      description: "Advanced data science training with hands-on projects and real-world applications",
      duration: "10 weeks",
      enrolled: 18,
      completed: 5,
      inProgress: 13,
      startDate: "2024-02-01",
      endDate: "2024-04-30",
      trainer: "Dr. Sarah Wilson",
      cost: "₹2,00,000",
      status: "Active",
    },
    {
      id: 3,
      name: "Digital Marketing",
      description: "Complete digital marketing strategy and implementation training",
      duration: "8 weeks",
      enrolled: 22,
      completed: 18,
      inProgress: 4,
      startDate: "2024-01-01",
      endDate: "2024-03-01",
      trainer: "Prof. Mike Johnson",
      cost: "₹1,50,000",
      status: "Ending Soon",
    },
  ])

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Training Programs</h1>
        <button className="bg-dark-primary hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2">
          <Plus size={20} />
          <span>Request New Program</span>
        </button>
      </div>

      <div className="grid gap-6">
        {programs.map((program) => (
          <div key={program.id} className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">{program.name}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      program.status === "Active"
                        ? "bg-green-900 text-green-300"
                        : program.status === "Ending Soon"
                          ? "bg-yellow-900 text-yellow-300"
                          : "bg-blue-900 text-blue-300"
                    }`}
                  >
                    {program.status}
                  </span>
                </div>

                <p className="text-gray-400 mb-4">{program.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-dark-primary">{program.enrolled}</div>
                    <div className="text-sm text-gray-400">Enrolled</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">{program.completed}</div>
                    <div className="text-sm text-gray-400">Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">{program.inProgress}</div>
                    <div className="text-sm text-gray-400">In Progress</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-dark-accent">{program.cost}</div>
                    <div className="text-sm text-gray-400">Total Cost</div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>Duration: {program.duration}</span>
                  <span>Trainer: {program.trainer}</span>
                  <span>
                    {program.startDate} - {program.endDate}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-dark-bg border border-gray-600 rounded-lg hover:border-gray-500 transition-colors">
                  <Eye size={16} />
                  <span>View Details</span>
                </button>
                <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-dark-accent hover:bg-blue-600 text-white rounded-lg transition-colors">
                  <Download size={16} />
                  <span>Report</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Reports Component
const CorporateReports = () => {
  const reportData = {
    summary: {
      totalEmployees: 245,
      activeTrainees: 67,
      completedCertifications: 156,
      totalInvestment: "₹12.5L",
    },
    departmentProgress: [
      { department: "Engineering", employees: 85, trained: 45, completion: 78 },
      { department: "Marketing", employees: 42, trained: 28, completion: 85 },
      { department: "Sales", employees: 38, trained: 22, completion: 65 },
      { department: "HR", employees: 25, trained: 18, completion: 90 },
      { department: "Finance", employees: 35, trained: 20, completion: 70 },
    ],
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Training Reports</h1>
        <button className="bg-dark-primary hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2">
          <Download size={20} />
          <span>Export Report</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Employees</p>
              <p className="text-3xl font-bold">{reportData.summary.totalEmployees}</p>
            </div>
            <Building className="text-dark-primary" size={32} />
          </div>
        </div>
        <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Active Trainees</p>
              <p className="text-3xl font-bold">{reportData.summary.activeTrainees}</p>
            </div>
            <Users className="text-dark-accent" size={32} />
          </div>
        </div>
        <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Certifications</p>
              <p className="text-3xl font-bold">{reportData.summary.completedCertifications}</p>
            </div>
            <Award className="text-green-400" size={32} />
          </div>
        </div>
        <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Investment</p>
              <p className="text-3xl font-bold">{reportData.summary.totalInvestment}</p>
            </div>
            <DollarSign className="text-yellow-400" size={32} />
          </div>
        </div>
      </div>

      {/* Department Progress */}
      <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-6">Department-wise Training Progress</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-700">
              <tr>
                <th className="text-left py-3 font-medium text-gray-300">Department</th>
                <th className="text-left py-3 font-medium text-gray-300">Total Employees</th>
                <th className="text-left py-3 font-medium text-gray-300">Trained</th>
                <th className="text-left py-3 font-medium text-gray-300">Completion Rate</th>
                <th className="text-left py-3 font-medium text-gray-300">Progress</th>
              </tr>
            </thead>
            <tbody>
              {reportData.departmentProgress.map((dept, index) => (
                <tr key={index} className="border-b border-gray-700">
                  <td className="py-4 font-medium">{dept.department}</td>
                  <td className="py-4 text-gray-300">{dept.employees}</td>
                  <td className="py-4 text-gray-300">{dept.trained}</td>
                  <td className="py-4 text-gray-300">{dept.completion}%</td>
                  <td className="py-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-dark-primary h-2 rounded-full"
                          style={{ width: `${dept.completion}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-300">{dept.completion}%</span>
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

// Main Corporate Dashboard Component
const CorporateDashboard = () => {
  return (
    <div className="flex">
      <Sidebar userType="corporate" />

      <div className="flex-1 ml-64 p-8">
        <Routes>
          <Route path="/" element={<CorporateDashboardHome />} />
          <Route path="/employees" element={<EmployeeManagement />} />
          <Route path="/programs" element={<TrainingPrograms />} />
          <Route path="/reports" element={<CorporateReports />} />
        </Routes>
      </div>
    </div>
  )
}

export default CorporateDashboard
