import Sidebar from "../components/Sidebar"
import { FileText, Award, Clock, CheckCircle, Calendar } from "lucide-react"

const StudentDashboard = () => {
  const applications = [
    {
      id: 1,
      title: "Frontend Developer Intern",
      company: "TechCorp",
      status: "Under Review",
      appliedDate: "2024-01-15",
      statusColor: "text-yellow-400",
    },
    {
      id: 2,
      title: "Data Science Intern",
      company: "DataLabs",
      status: "Accepted",
      appliedDate: "2024-01-10",
      statusColor: "text-green-400",
    },
    {
      id: 3,
      title: "Marketing Intern",
      company: "BrandStudio",
      status: "Rejected",
      appliedDate: "2024-01-08",
      statusColor: "text-red-400",
    },
  ]

  const certificates = [
    {
      id: 1,
      title: "React Development Certification",
      issuer: "TechCorp",
      date: "2024-01-20",
      status: "Completed",
    },
    {
      id: 2,
      title: "Data Analysis Fundamentals",
      issuer: "DataLabs",
      date: "In Progress",
      status: "In Progress",
    },
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: "Interview with TechCorp",
      date: "2024-01-25",
      time: "2:00 PM",
    },
    {
      id: 2,
      title: "Orientation Session",
      date: "2024-01-28",
      time: "10:00 AM",
    },
  ]

  return (
    <div className="flex">
      <Sidebar userType="student" />

      <div className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, John!</h1>
          <p className="text-gray-400">Here's what's happening with your internship journey</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Applications</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <FileText className="text-dark-primary" size={24} />
            </div>
          </div>

          <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Under Review</p>
                <p className="text-2xl font-bold">5</p>
              </div>
              <Clock className="text-yellow-400" size={24} />
            </div>
          </div>

          <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Accepted</p>
                <p className="text-2xl font-bold">2</p>
              </div>
              <CheckCircle className="text-green-400" size={24} />
            </div>
          </div>

          <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Certificates</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <Award className="text-dark-accent" size={24} />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Applications */}
          <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4">Recent Applications</h2>
            <div className="space-y-4">
              {applications.map((application) => (
                <div key={application.id} className="p-4 bg-dark-bg rounded-lg border border-gray-600">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{application.title}</h3>
                    <span className={`text-sm ${application.statusColor}`}>{application.status}</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">{application.company}</p>
                  <p className="text-gray-500 text-xs">Applied on {application.appliedDate}</p>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-dark-primary hover:text-purple-400 font-medium transition-colors">
              View All Applications
            </button>
          </div>

          {/* Certificates */}
          <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4">Certificates</h2>
            <div className="space-y-4">
              {certificates.map((certificate) => (
                <div key={certificate.id} className="p-4 bg-dark-bg rounded-lg border border-gray-600">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{certificate.title}</h3>
                    <span
                      className={`text-sm px-2 py-1 rounded-full text-xs ${
                        certificate.status === "Completed"
                          ? "bg-green-900 text-green-300"
                          : "bg-yellow-900 text-yellow-300"
                      }`}
                    >
                      {certificate.status}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">{certificate.issuer}</p>
                  <p className="text-gray-500 text-xs">{certificate.date}</p>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-dark-primary hover:text-purple-400 font-medium transition-colors">
              View All Certificates
            </button>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="mt-8 bg-dark-surface border border-gray-700 rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4">Upcoming Events</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="p-4 bg-dark-bg rounded-lg border border-gray-600 flex items-center space-x-4"
              >
                <Calendar className="text-dark-primary" size={20} />
                <div>
                  <h3 className="font-semibold">{event.title}</h3>
                  <p className="text-gray-400 text-sm">
                    {event.date} at {event.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard
