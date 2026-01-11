import { Link, useLocation } from "react-router-dom"
import {
  Home,
  FileText,
  Award,
  Users,
  PlusCircle,
  BarChart3,
  Settings,
  BookOpen,
  Calendar,
  CreditCard,
  Mail,
} from "lucide-react"

const Sidebar = ({ userType = "student" }) => {
  const location = useLocation()

  const studentMenuItems = [
    { icon: Home, label: "Dashboard", path: "/student-dashboard" },
    { icon: BookOpen, label: "My Courses", path: "/student-dashboard/courses" },
    { icon: FileText, label: "Assignments", path: "/student-dashboard/assignments" },
    { icon: Calendar, label: "Schedule", path: "/student-dashboard/schedule" },
    { icon: Award, label: "Certificates", path: "/student-dashboard/certificates" },
    { icon: BarChart3, label: "Progress", path: "/student-dashboard/progress" },
  ]

  const trainerMenuItems = [
    { icon: Home, label: "Dashboard", path: "/trainer-dashboard" },
    { icon: BookOpen, label: "My Courses", path: "/trainer-dashboard/courses" },
    { icon: Users, label: "Students", path: "/trainer-dashboard/students" },
    { icon: FileText, label: "Assignments", path: "/trainer-dashboard/assignments" },
    { icon: Calendar, label: "Schedule", path: "/trainer-dashboard/schedule" },
    { icon: BarChart3, label: "Analytics", path: "/trainer-dashboard/analytics" },
  ]

  const adminMenuItems = [
    { icon: Home, label: "Dashboard", path: "/admin-dashboard" },
    { icon: Users, label: "User Management", path: "/admin-dashboard/users" },
    { icon: BookOpen, label: "Course Management", path: "/admin-dashboard/courses" },
    { icon: PlusCircle, label: "Add Course", path: "/admin-dashboard/add-course" },
    { icon: BarChart3, label: "Analytics", path: "/admin-dashboard/analytics" },
    { icon: CreditCard, label: "Payments", path: "/admin-dashboard/payments" },
    { icon: Settings, label: "Settings", path: "/admin-dashboard/settings" },
    { icon: Mail, label: "Email System", path: "/admin-dashboard/emails" },
  ]

  const corporateMenuItems = [
    { icon: Home, label: "Dashboard", path: "/corporate-dashboard" },
    { icon: Users, label: "Employees", path: "/corporate-dashboard/employees" },
    { icon: BookOpen, label: "Training Programs", path: "/corporate-dashboard/programs" },
    { icon: BarChart3, label: "Reports", path: "/corporate-dashboard/reports" },
    { icon: CreditCard, label: "Billing", path: "/corporate-dashboard/billing" },
  ]

  const getMenuItems = () => {
    switch (userType) {
      case "trainer":
        return trainerMenuItems
      case "admin":
        return adminMenuItems
      case "corporate":
        return corporateMenuItems
      default:
        return studentMenuItems
    }
  }

  const menuItems = getMenuItems()

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <div className="w-64 bg-dark-surface h-screen fixed left-0 top-16 border-r border-gray-800">
      <div className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold capitalize">{userType} Portal</h3>
          <p className="text-sm text-gray-400">Welcome back!</p>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  isActive(item.path)
                    ? "bg-dark-primary text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

export default Sidebar
