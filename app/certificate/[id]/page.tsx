"use client"

import { useState } from "react"
import { use } from "react"
import { ArrowLeft, Download, Share2, CheckCircle, Award, Calendar, User, BookOpen, Star } from "lucide-react"
import Navbar from "../../../src/components/Navbar"
import Link from "next/link"

export default function CertificatePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const [isDownloading, setIsDownloading] = useState(false)

  // Mock certificate data
  const certificateData = {
    id: resolvedParams.id,
    studentName: "Alex Chen",
    courseName: "Full Stack Web Development",
    instructor: "Dr. Sarah Johnson",
    completionDate: "March 15, 2024",
    certificateNumber: "CERT-2024-001",
    grade: "A+",
    score: "95%",
    duration: "12 weeks",
    skills: [
      "React.js Development",
      "Node.js Backend",
      "MongoDB Database",
      "RESTful APIs",
      "Git Version Control",
      "Deployment Strategies"
    ],
    achievements: [
      "Completed all course modules with distinction",
      "Built 5 real-world projects",
      "Achieved 95% average score",
      "Participated in 20+ live sessions",
      "Received instructor commendation"
    ]
  }

  const handleDownload = () => {
    setIsDownloading(true)
    // Simulate download process
    setTimeout(() => {
      setIsDownloading(false)
      alert("Certificate downloaded successfully!")
    }, 2000)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${certificateData.studentName} - ${certificateData.courseName} Certificate`,
        text: `I just completed ${certificateData.courseName} with a score of ${certificateData.score}!`,
        url: window.location.href
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert("Certificate link copied to clipboard!")
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/student-dashboard"
            className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors mb-4"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold mb-2">Certificate of Completion</h1>
          <p className="text-gray-400">Congratulations on completing your course!</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Certificate Display */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-xl p-8 relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 left-10 w-32 h-32 border-2 border-purple-400 rounded-full"></div>
                <div className="absolute bottom-10 right-10 w-24 h-24 border-2 border-blue-400 rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-purple-300 rounded-full"></div>
              </div>

              {/* Certificate Content */}
              <div className="relative z-10 text-center">
                {/* Header */}
                <div className="mb-8">
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <Award size={32} className="text-purple-400" />
                    <h2 className="text-2xl font-bold text-purple-400">TEKINPLANT</h2>
                  </div>
                  <h3 className="text-lg text-gray-400 uppercase tracking-wider">Certificate of Completion</h3>
                </div>

                {/* Main Content */}
                <div className="mb-8">
                  <p className="text-gray-300 mb-4">This is to certify that</p>
                  <h4 className="text-3xl font-bold text-white mb-4">{certificateData.studentName}</h4>
                  <p className="text-gray-300 mb-6">has successfully completed the course</p>
                  <h5 className="text-2xl font-semibold text-purple-400 mb-6">{certificateData.courseName}</h5>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                      <div className="text-sm text-gray-400 mb-1">Instructor</div>
                      <div className="font-medium">{certificateData.instructor}</div>
                    </div>
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                      <div className="text-sm text-gray-400 mb-1">Completion Date</div>
                      <div className="font-medium">{certificateData.completionDate}</div>
                    </div>
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                      <div className="text-sm text-gray-400 mb-1">Final Grade</div>
                      <div className="font-medium text-green-400">{certificateData.grade} ({certificateData.score})</div>
                    </div>
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                      <div className="text-sm text-gray-400 mb-1">Duration</div>
                      <div className="font-medium">{certificateData.duration}</div>
                    </div>
                  </div>
                </div>

                {/* Certificate Number */}
                <div className="mb-8">
                  <p className="text-sm text-gray-400 mb-2">Certificate Number</p>
                  <p className="font-mono text-purple-400">{certificateData.certificateNumber}</p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center space-x-2">
                    <CheckCircle size={16} className="text-green-400" />
                    <span>Verified Certificate</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star size={16} className="text-yellow-400" />
                    <span>Distinction Award</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 mt-6">
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center"
              >
                {isDownloading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Downloading...
                  </>
                ) : (
                  <>
                    <Download size={20} className="mr-2" />
                    Download Certificate
                  </>
                )}
              </button>
              <button
                onClick={handleShare}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center"
              >
                <Share2 size={20} className="mr-2" />
                Share Certificate
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Summary */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-bold mb-4">Course Summary</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <BookOpen size={20} className="text-purple-400" />
                  <div>
                    <div className="font-medium">{certificateData.courseName}</div>
                    <div className="text-sm text-gray-400">{certificateData.duration}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <User size={20} className="text-purple-400" />
                  <div>
                    <div className="font-medium">Instructor</div>
                    <div className="text-sm text-gray-400">{certificateData.instructor}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Calendar size={20} className="text-purple-400" />
                  <div>
                    <div className="font-medium">Completed</div>
                    <div className="text-sm text-gray-400">{certificateData.completionDate}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Award size={20} className="text-purple-400" />
                  <div>
                    <div className="font-medium">Final Grade</div>
                    <div className="text-sm text-green-400">{certificateData.grade} ({certificateData.score})</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills Acquired */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-bold mb-4">Skills Acquired</h3>
              <div className="space-y-2">
                {certificateData.skills.map((skill, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle size={16} className="text-green-400 flex-shrink-0" />
                    <span className="text-sm text-gray-300">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-bold mb-4">Achievements</h3>
              <div className="space-y-3">
                {certificateData.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <Star size={16} className="text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-300">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Certificate Verification */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-bold mb-4">Certificate Verification</h3>
              <div className="space-y-3">
                <div className="bg-gray-900 border border-gray-700 rounded-lg p-3">
                  <div className="text-sm text-gray-400 mb-1">Certificate ID</div>
                  <div className="font-mono text-sm text-purple-400">{certificateData.certificateNumber}</div>
                </div>
                <div className="bg-gray-900 border border-gray-700 rounded-lg p-3">
                  <div className="text-sm text-gray-400 mb-1">Verification URL</div>
                  <div className="font-mono text-sm text-purple-400 break-all">
                    {window.location.origin}/verify/{certificateData.certificateNumber}
                  </div>
                </div>
                <button className="w-full bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                  Verify Certificate
                </button>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-bold mb-4">Next Steps</h3>
              <div className="space-y-3">
                <Link
                  href="/courses"
                  className="block w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 text-center"
                >
                  Explore More Courses
                </Link>
                <Link
                  href="/student-dashboard"
                  className="block w-full bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 text-center"
                >
                  View Dashboard
                </Link>
                <button className="w-full bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                  Request Transcript
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
