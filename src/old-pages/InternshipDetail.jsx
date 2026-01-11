"use client"
import { useParams } from "react-router-dom"
import { MapPin, Clock, Building, Star, Users, Calendar, DollarSign, CheckCircle } from "lucide-react"

const InternshipDetail = () => {
  const { id } = useParams()

  // Mock data - in real app, fetch based on ID
  const internship = {
    id: 1,
    title: "Frontend Developer Intern",
    company: "TechCorp",
    location: "San Francisco, CA",
    mode: "Remote",
    duration: "3 months",
    type: "Full-Time",
    salary: "$2,000/month",
    rating: 4.8,
    applicants: 45,
    posted: "2 days ago",
    logo: "🚀",
    description: `We are looking for a passionate Frontend Developer Intern to join our dynamic team. You will work on exciting projects that impact millions of users worldwide. This is a great opportunity to learn from experienced developers and contribute to real-world applications.

As part of our team, you'll be involved in building responsive web applications, implementing new features, and optimizing user experiences. You'll work closely with our design and backend teams to deliver high-quality products.`,
    requirements: [
      "Currently pursuing or recently completed a degree in Computer Science or related field",
      "Strong knowledge of HTML, CSS, and JavaScript",
      "Experience with React.js or similar frontend frameworks",
      "Understanding of responsive design principles",
      "Familiarity with version control systems (Git)",
      "Good problem-solving skills and attention to detail",
      "Excellent communication and teamwork abilities",
    ],
    benefits: [
      "Competitive monthly stipend",
      "Mentorship from senior developers",
      "Flexible working hours",
      "Access to latest development tools and technologies",
      "Opportunity to work on real projects",
      "Certificate of completion",
      "Potential for full-time offer",
      "Health insurance coverage",
    ],
    skills: ["React", "JavaScript", "CSS", "HTML", "Git", "Responsive Design"],
  }

  return (
    <div className="min-h-screen bg-dark-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-dark-surface border border-gray-700 rounded-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
            <div className="flex items-start space-x-4 mb-4 md:mb-0">
              <div className="w-16 h-16 bg-dark-primary rounded-xl flex items-center justify-center text-3xl">
                {internship.logo}
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">{internship.title}</h1>
                <p className="text-xl text-gray-300 flex items-center mb-2">
                  <Building size={20} className="mr-2" />
                  {internship.company}
                </p>
                <div className="flex items-center space-x-1 text-yellow-400">
                  <Star size={16} fill="currentColor" />
                  <span className="text-sm font-medium mr-4">{internship.rating}</span>
                  <span className="text-gray-400 text-sm">({internship.applicants} applicants)</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-3">
              <button className="bg-dark-primary hover:bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
                Apply Now
              </button>
              <button className="border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200">
                Save Job
              </button>
            </div>
          </div>

          {/* Job Info */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2 text-gray-300">
              <MapPin size={18} className="text-dark-primary" />
              <span>{internship.location}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-300">
              <Clock size={18} className="text-dark-primary" />
              <span>{internship.duration}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-300">
              <DollarSign size={18} className="text-dark-primary" />
              <span>{internship.salary}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-300">
              <Calendar size={18} className="text-dark-primary" />
              <span>Posted {internship.posted}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-6">
            <span className="px-3 py-1 bg-dark-accent text-white rounded-full text-sm">{internship.type}</span>
            <span className="px-3 py-1 bg-dark-bg text-gray-300 rounded-full text-sm border border-gray-600">
              {internship.mode}
            </span>
            {internship.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-dark-bg text-gray-300 rounded-full text-sm border border-gray-600"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-4">Job Description</h2>
              <div className="text-gray-300 leading-relaxed whitespace-pre-line">{internship.description}</div>
            </div>

            {/* Requirements */}
            <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-4">Requirements</h2>
              <ul className="space-y-3">
                {internship.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle size={20} className="text-dark-primary mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-4">Benefits</h2>
              <ul className="space-y-3">
                {internship.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle size={20} className="text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Company Info */}
            <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">About {internship.company}</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Users size={18} className="text-dark-primary" />
                  <span className="text-gray-300">500-1000 employees</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Building size={18} className="text-dark-primary" />
                  <span className="text-gray-300">Technology</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin size={18} className="text-dark-primary" />
                  <span className="text-gray-300">San Francisco, CA</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm mt-4">
                TechCorp is a leading technology company focused on building innovative solutions that transform
                industries.
              </p>
            </div>

            {/* Similar Jobs */}
            <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">Similar Internships</h3>
              <div className="space-y-4">
                {[
                  { title: "Backend Developer Intern", company: "DevCorp" },
                  { title: "Full Stack Intern", company: "StartupXYZ" },
                  { title: "React Developer Intern", company: "WebTech" },
                ].map((job, index) => (
                  <div
                    key={index}
                    className="p-3 bg-dark-bg rounded-lg border border-gray-600 hover:border-gray-500 transition-colors cursor-pointer"
                  >
                    <h4 className="font-medium text-white">{job.title}</h4>
                    <p className="text-sm text-gray-400">{job.company}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InternshipDetail
