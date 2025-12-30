"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useProtectedRoute } from "../../lib/clerk-helpers"
import { useClerk } from "@clerk/nextjs"
import { 
  BookOpen, 
  Users, 
  Clock, 
  TrendingUp, 
  Star,
  User,
  Settings,
  Calendar,
  Award,
  MessageSquare,
  ArrowLeft,
  LogOut,
  GraduationCap
} from "lucide-react"
import { industryCourses } from "../../lib/industry-data"

export default function TrainerDashboard() {
  const { user, isLoading } = useProtectedRoute("trainer")
  const { signOut } = useClerk()
  const router = useRouter()
  const [myCourses, setMyCourses] = useState<any[]>([])
  const [recentStudents, setRecentStudents] = useState<any[]>([])

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
  }

  useEffect(() => {
    if (user) {
      const stored = typeof window !== 'undefined'
        ? localStorage.getItem(`trainer_courses_${user.id}`)
        : null
      if (stored) {
        try {
          const parsed = JSON.parse(stored)
          setMyCourses(parsed.myCourses || [])
          setRecentStudents(parsed.recentStudents || [])
        } catch (e) {
          console.error('Failed to parse stored trainer data', e)
        }
      }
    }
  }, [user])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const totalCourses = myCourses.length
  const stats = {
    totalCourses,
    totalStudents: myCourses.reduce((sum, c) => sum + (c.enrolledStudents || 0), 0),
    averageRating: totalCourses > 0
      ? (myCourses.reduce((sum, c) => sum + parseFloat(c.averageRating), 0) / totalCourses).toFixed(1)
      : '0.0',
    completionRate: totalCourses > 0
      ? Math.floor(myCourses.reduce((sum, c) => sum + c.completionRate, 0) / totalCourses)
      : 0
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link 
                href="/"
                className="flex items-center space-x-2 px-3 py-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-700"
              >
                <ArrowLeft size={18} />
                <span className="text-sm font-medium">Back to Home</span>
              </Link>
              <div className="h-6 w-px bg-gray-600"></div>
              <h1 className="text-xl font-semibold">Trainer Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-white">
                <Settings size={20} />
              </button>
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
              >
                <LogOut size={18} />
                <span className="text-sm font-medium">Sign Out</span>
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <User size={16} />
                </div>
                <span className="text-sm">{user?.fullName || user?.firstName || 'User'}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">Welcome back, {user?.fullName || user?.firstName || 'Trainer'}! <GraduationCap className="w-7 h-7" style={{ color: '#c084fc' }} /></h2>
          <p className="text-gray-400">Manage your training programs and track student progress.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active Courses</p>
                <p className="text-2xl font-bold">{stats.totalCourses}</p>
              </div>
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Students</p>
                <p className="text-2xl font-bold">{stats.totalStudents}</p>
              </div>
              <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Average Rating</p>
                <p className="text-2xl font-bold">{stats.averageRating}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-600/20 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Completion Rate</p>
                <p className="text-2xl font-bold">{stats.completionRate}%</p>
              </div>
              <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* My Courses */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold mb-6">My Training Programs</h3>
              <div className="space-y-4">
                {myCourses.length === 0 && (
                  <p className="text-sm text-gray-400">No courses assigned yet. Create or import courses to see them here.</p>
                )}
                {myCourses.map((course) => (
                  <div key={course.id} className="bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">{course.title}</h4>
                      <span className="text-sm text-gray-400">{course.company}</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3 text-sm">
                      <div className="flex items-center text-gray-400">
                        <Users size={14} className="mr-1" />
                        {course.enrolledStudents} students
                      </div>
                      <div className="flex items-center text-gray-400">
                        <Star size={14} className="mr-1" />
                        {course.averageRating} rating
                      </div>
                      <div className="flex items-center text-gray-400">
                        <Clock size={14} className="mr-1" />
                        {course.duration}
                      </div>
                      <div className="flex items-center text-green-400">
                        <Award size={14} className="mr-1" />
                        {course.completionRate}% complete
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">Next session: {course.nextSession}</span>
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded text-xs transition-colors">
                          View Details
                        </button>
                        <button className="px-3 py-1 bg-gray-600 hover:bg-gray-500 text-white rounded text-xs transition-colors">
                          Manage
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Students & Quick Actions */}
          <div className="lg:col-span-1 space-y-6">
            {/* Recent Students */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold mb-6">Recent Students</h3>
              <div className="space-y-4">
                {recentStudents.length === 0 && (
                  <p className="text-sm text-gray-400">No student activity yet.</p>
                )}
                {recentStudents.map((student, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium">{student.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{student.name}</p>
                        <p className="text-xs text-gray-400">{student.course}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-green-400">{student.progress}%</p>
                      <p className="text-xs text-gray-400">{student.lastActive}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold mb-6">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Create New Course
                </button>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Schedule Session
                </button>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  View Analytics
                </button>
                <button className="w-full bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Student Messages
                </button>
              </div>
            </div>

            {/* Upcoming Sessions */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold mb-6">Upcoming Sessions</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">PLC Programming</p>
                    <p className="text-xs text-gray-400">Today, 2:00 PM</p>
                  </div>
                  <button className="px-2 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-xs transition-colors">
                    Join
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">SCADA Workshop</p>
                    <p className="text-xs text-gray-400">Tomorrow, 10:00 AM</p>
                  </div>
                  <button className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs transition-colors">
                    Prepare
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
