"use client"

import { useParams } from "react-router-dom"
import { Download, Share2, BadgeCheckIcon as Verify, Calendar, Award, User, BookOpen } from "lucide-react"

const CertificatePage = () => {
  const { id } = useParams()

  // Mock certificate data
  const certificate = {
    id: id,
    studentName: "John Doe",
    courseName: "Full Stack Web Development",
    completionDate: "February 15, 2024",
    issueDate: "February 20, 2024",
    grade: "A+",
    duration: "12 weeks",
    trainer: "Prof. John Smith",
    certificateNumber: "TEKINPLANT-2024-FSW-001",
    qrCode:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzMzMzMzMyIvPgogIDx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UVIgQ29kZTwvdGV4dD4KICA8L3N2Zz4K",
    skills: ["React.js", "Node.js", "MongoDB", "Express.js", "JavaScript", "HTML/CSS"],
    verificationUrl: `https://trainin.com/verify/${id}`,
  }

  const handleDownload = () => {
    // In a real app, this would generate and download a PDF
    console.log("Downloading certificate...")
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${certificate.studentName}'s Certificate`,
        text: `Check out my certificate for ${certificate.courseName}`,
        url: window.location.href,
      })
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href)
      alert("Certificate link copied to clipboard!")
    }
  }

  const handleVerify = () => {
    window.open(certificate.verificationUrl, "_blank")
  }

  return (
    <div className="min-h-screen bg-dark-bg py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Certificate of Completion</h1>
            <p className="text-gray-400">Certificate ID: {certificate.certificateNumber}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleDownload}
              className="flex items-center space-x-2 bg-dark-primary hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Download size={16} />
              <span>Download PDF</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center space-x-2 bg-dark-accent hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Share2 size={16} />
              <span>Share</span>
            </button>
            <button
              onClick={handleVerify}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Verify size={16} />
              <span>Verify</span>
            </button>
          </div>
        </div>

        {/* Certificate Display */}
        <div className="bg-white text-gray-900 rounded-2xl p-12 mb-8 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-600 to-blue-600"></div>
          </div>

          {/* Certificate Content */}
          <div className="relative z-10 text-center">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-purple-600 mb-2">TEKINPLANT</h1>
              <p className="text-lg text-gray-600">Industrial Training Institute</p>
            </div>

            {/* Certificate Title */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-4">Certificate of Completion</h2>
              <p className="text-lg text-gray-600">This is to certify that</p>
            </div>

            {/* Student Name */}
            <div className="mb-8">
              <h3 className="text-4xl font-bold text-purple-600 border-b-2 border-purple-600 inline-block pb-2">
                {certificate.studentName}
              </h3>
            </div>

            {/* Course Details */}
            <div className="mb-8">
              <p className="text-lg text-gray-600 mb-2">has successfully completed the course</p>
              <h4 className="text-2xl font-bold text-gray-800 mb-4">{certificate.courseName}</h4>
              <p className="text-gray-600">
                Duration: {certificate.duration} | Grade:{" "}
                <span className="font-bold text-green-600">{certificate.grade}</span>
              </p>
            </div>

            {/* Dates and Signatures */}
            <div className="flex justify-between items-end mt-12">
              <div className="text-left">
                <p className="text-sm text-gray-600">Completion Date</p>
                <p className="font-semibold">{certificate.completionDate}</p>
              </div>
              <div className="text-center">
                <div className="w-32 h-16 bg-gray-200 rounded-lg flex items-center justify-center mb-2">
                  <span className="text-xs text-gray-500">Digital Signature</span>
                </div>
                <p className="text-sm font-semibold">Dr. Swati Bhasme</p>
                <p className="text-xs text-gray-600">Director, TEKINPLANT</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Issue Date</p>
                <p className="font-semibold">{certificate.issueDate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Certificate Details */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Certificate Information */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">Certificate Details</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <User className="text-dark-primary" size={20} />
                    <div>
                      <p className="text-sm text-gray-400">Student Name</p>
                      <p className="font-medium">{certificate.studentName}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <BookOpen className="text-dark-accent" size={20} />
                    <div>
                      <p className="text-sm text-gray-400">Course</p>
                      <p className="font-medium">{certificate.courseName}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Award className="text-green-400" size={20} />
                    <div>
                      <p className="text-sm text-gray-400">Grade</p>
                      <p className="font-medium">{certificate.grade}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="text-yellow-400" size={20} />
                    <div>
                      <p className="text-sm text-gray-400">Completion Date</p>
                      <p className="font-medium">{certificate.completionDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <User className="text-purple-400" size={20} />
                    <div>
                      <p className="text-sm text-gray-400">Trainer</p>
                      <p className="font-medium">{certificate.trainer}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Verify className="text-blue-400" size={20} />
                    <div>
                      <p className="text-sm text-gray-400">Certificate ID</p>
                      <p className="font-medium text-xs">{certificate.certificateNumber}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills Acquired */}
            <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">Skills Acquired</h3>
              <div className="flex flex-wrap gap-2">
                {certificate.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-dark-bg text-gray-300 rounded-full text-sm border border-gray-600"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Verification & QR Code */}
          <div className="space-y-6">
            <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6 text-center">
              <h3 className="text-xl font-bold mb-4">Verification</h3>
              <div className="w-32 h-32 mx-auto mb-4 bg-white rounded-lg flex items-center justify-center">
                <img src={certificate.qrCode || "/placeholder.svg"} alt="QR Code" className="w-24 h-24" />
              </div>
              <p className="text-sm text-gray-400 mb-4">Scan QR code or click below to verify this certificate</p>
              <button
                onClick={handleVerify}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Verify Certificate
              </button>
            </div>

            <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-4">Share Certificate</h3>
              <div className="space-y-3">
                <button
                  onClick={handleShare}
                  className="w-full bg-dark-accent hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <Share2 size={16} />
                  <span>Share Link</span>
                </button>
                <button
                  onClick={handleDownload}
                  className="w-full bg-dark-primary hover:bg-purple-600 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <Download size={16} />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>

            <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-4">Certificate Validity</h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-400">
                  <span className="font-medium text-white">Valid:</span> Lifetime
                </p>
                <p className="text-gray-400">
                  <span className="font-medium text-white">Accredited by:</span> Tech Industry Association
                </p>
                <p className="text-gray-400">
                  <span className="font-medium text-white">Recognized by:</span> 500+ Companies
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CertificatePage
