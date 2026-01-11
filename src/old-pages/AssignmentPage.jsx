"use client"

import { useState } from "react"
import { useParams } from "react-router-dom"
import {
  Upload,
  Download,
  FileText,
  Calendar,
  Clock,
  CheckCircle,
  User,
  BookOpen,
  MessageSquare,
  Send,
} from "lucide-react"

const AssignmentPage = () => {
  const { id } = useParams()
  const [selectedFile, setSelectedFile] = useState(null)
  const [submissionText, setSubmissionText] = useState("")
  const [feedback, setFeedback] = useState("")

  // Mock assignment data
  const assignment = {
    id: id,
    title: "React Component Design Project",
    course: "Full Stack Web Development",
    instructor: "Prof. John Smith",
    description: `Create a responsive React component library with the following requirements:

1. Build at least 5 reusable components (Button, Card, Modal, Form, Navigation)
2. Implement proper TypeScript interfaces
3. Add comprehensive documentation
4. Include unit tests for each component
5. Deploy to a live demo site

Your submission should include:
- Source code repository link
- Live demo URL
- Documentation explaining component usage
- Test coverage report`,
    dueDate: "2024-03-15",
    maxPoints: 100,
    submissionFormat: ["GitHub Repository", "Live Demo", "Documentation"],
    status: "In Progress", // "Not Started", "In Progress", "Submitted", "Graded"
    timeRemaining: "5 days",
    attachments: [
      { name: "Assignment Guidelines.pdf", size: "2.5 MB", url: "#" },
      { name: "Component Examples.zip", size: "1.8 MB", url: "#" },
    ],
  }

  // Mock submission data (if already submitted)
  const submission = {
    submittedAt: "2024-03-10 14:30",
    files: [
      { name: "react-components-project.zip", size: "5.2 MB" },
      { name: "documentation.pdf", size: "1.1 MB" },
    ],
    repositoryUrl: "https://github.com/johndoe/react-components",
    demoUrl: "https://react-components-demo.vercel.app",
    notes: "Implemented all required components with additional accessibility features.",
    grade: null, // Will be filled when graded
    feedback: null,
  }

  // Mock grading data (for instructor view)
  const grading = {
    grade: 92,
    maxPoints: 100,
    gradedAt: "2024-03-12 10:15",
    feedback: `Excellent work! Your component library is well-structured and follows React best practices. 

Strengths:
- Clean, reusable component architecture
- Comprehensive TypeScript interfaces
- Good test coverage (85%)
- Excellent documentation

Areas for improvement:
- Consider adding more accessibility features
- Some components could benefit from better error handling

Overall, this is a high-quality submission that demonstrates strong React development skills.`,
    rubric: [
      { criteria: "Code Quality", points: 20, earned: 18 },
      { criteria: "Functionality", points: 25, earned: 24 },
      { criteria: "Documentation", points: 20, earned: 19 },
      { criteria: "Testing", points: 15, earned: 13 },
      { criteria: "Design & UX", points: 20, earned: 18 },
    ],
  }

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Submitting assignment:", {
      file: selectedFile,
      text: submissionText,
      assignmentId: assignment.id,
    })
    // Handle submission logic
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Not Started":
        return "bg-gray-900 text-gray-300"
      case "In Progress":
        return "bg-yellow-900 text-yellow-300"
      case "Submitted":
        return "bg-blue-900 text-blue-300"
      case "Graded":
        return "bg-green-900 text-green-300"
      default:
        return "bg-gray-900 text-gray-300"
    }
  }

  const getGradeColor = (percentage) => {
    if (percentage >= 90) return "text-green-400"
    if (percentage >= 80) return "text-blue-400"
    if (percentage >= 70) return "text-yellow-400"
    return "text-red-400"
  }

  return (
    <div className="min-h-screen bg-dark-bg py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-dark-surface border border-gray-700 rounded-2xl p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
                <BookOpen className="text-dark-primary" size={24} />
                <span className="text-gray-400">{assignment.course}</span>
              </div>
              <h1 className="text-3xl font-bold mb-4">{assignment.title}</h1>
              <div className="flex items-center space-x-6 text-sm text-gray-400 mb-4">
                <span className="flex items-center">
                  <User size={16} className="mr-2" />
                  {assignment.instructor}
                </span>
                <span className="flex items-center">
                  <Calendar size={16} className="mr-2" />
                  Due: {assignment.dueDate}
                </span>
                <span className="flex items-center">
                  <Clock size={16} className="mr-2" />
                  {assignment.timeRemaining} remaining
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(assignment.status)}`}>
                  {assignment.status}
                </span>
                <span className="text-gray-400">Max Points: {assignment.maxPoints}</span>
              </div>
            </div>

            {assignment.status === "Graded" && (
              <div className="bg-dark-bg border border-gray-700 rounded-xl p-6 text-center">
                <div className="mb-2">
                  <span className="text-sm text-gray-400">Your Grade</span>
                </div>
                <div className={`text-4xl font-bold ${getGradeColor((grading.grade / grading.maxPoints) * 100)}`}>
                  {grading.grade}/{grading.maxPoints}
                </div>
                <div className="text-sm text-gray-400 mt-1">
                  {Math.round((grading.grade / grading.maxPoints) * 100)}%
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Assignment Description */}
            <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4">Assignment Description</h2>
              <div className="text-gray-300 leading-relaxed whitespace-pre-line">{assignment.description}</div>
            </div>

            {/* Submission Form (if not submitted) */}
            {assignment.status !== "Submitted" && assignment.status !== "Graded" && (
              <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
                <h2 className="text-xl font-bold mb-6">Submit Assignment</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* File Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Upload Files</label>
                    <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                      <div className="flex flex-col items-center">
                        <Upload className="text-gray-400 mb-4" size={48} />
                        <p className="text-gray-400 mb-4">
                          {selectedFile
                            ? `Selected: ${selectedFile.name}`
                            : "Drag and drop your files here, or click to browse"}
                        </p>
                        <input
                          type="file"
                          onChange={handleFileChange}
                          className="hidden"
                          id="file-upload"
                          multiple
                          accept=".pdf,.doc,.docx,.zip,.rar"
                        />
                        <label
                          htmlFor="file-upload"
                          className="bg-dark-primary hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer"
                        >
                          Choose Files
                        </label>
                        <p className="text-xs text-gray-500 mt-2">
                          Supported formats: PDF, DOC, DOCX, ZIP, RAR (Max 50MB)
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Text Submission */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Additional Notes / Links</label>
                    <textarea
                      value={submissionText}
                      onChange={(e) => setSubmissionText(e.target.value)}
                      rows={6}
                      className="w-full px-4 py-3 bg-dark-bg border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-dark-primary transition-colors"
                      placeholder="Add any additional notes, repository links, demo URLs, or explanations..."
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      className="bg-dark-primary hover:bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2"
                    >
                      <Send size={20} />
                      <span>Submit Assignment</span>
                    </button>
                    <button
                      type="button"
                      className="border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
                    >
                      Save Draft
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Submission Details (if submitted) */}
            {(assignment.status === "Submitted" || assignment.status === "Graded") && (
              <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Your Submission</h2>
                  <span className="text-sm text-gray-400">Submitted on {submission.submittedAt}</span>
                </div>

                <div className="space-y-4">
                  {/* Submitted Files */}
                  <div>
                    <h3 className="font-semibold mb-3">Submitted Files</h3>
                    <div className="space-y-2">
                      {submission.files.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-dark-bg rounded-lg border border-gray-600"
                        >
                          <div className="flex items-center space-x-3">
                            <FileText className="text-dark-primary" size={20} />
                            <div>
                              <p className="font-medium">{file.name}</p>
                              <p className="text-sm text-gray-400">{file.size}</p>
                            </div>
                          </div>
                          <button className="text-dark-accent hover:text-blue-400 transition-colors">
                            <Download size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  {submission.repositoryUrl && (
                    <div>
                      <h3 className="font-semibold mb-2">Repository</h3>
                      <a
                        href={submission.repositoryUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-dark-primary hover:text-purple-400 transition-colors"
                      >
                        {submission.repositoryUrl}
                      </a>
                    </div>
                  )}

                  {submission.demoUrl && (
                    <div>
                      <h3 className="font-semibold mb-2">Live Demo</h3>
                      <a
                        href={submission.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-dark-primary hover:text-purple-400 transition-colors"
                      >
                        {submission.demoUrl}
                      </a>
                    </div>
                  )}

                  {/* Notes */}
                  {submission.notes && (
                    <div>
                      <h3 className="font-semibold mb-2">Notes</h3>
                      <p className="text-gray-300 bg-dark-bg p-4 rounded-lg border border-gray-600">
                        {submission.notes}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Grading & Feedback (if graded) */}
            {assignment.status === "Graded" && (
              <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
                <h2 className="text-xl font-bold mb-6">Grading & Feedback</h2>

                {/* Rubric */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-4">Grading Rubric</h3>
                  <div className="space-y-3">
                    {grading.rubric.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-dark-bg rounded-lg">
                        <span className="font-medium">{item.criteria}</span>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <span className={`font-bold ${getGradeColor((item.earned / item.points) * 100)}`}>
                              {item.earned}
                            </span>
                            <span className="text-gray-400">/{item.points}</span>
                          </div>
                          <div className="w-20 bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-dark-primary h-2 rounded-full"
                              style={{ width: `${(item.earned / item.points) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Instructor Feedback */}
                <div>
                  <h3 className="font-semibold mb-4">Instructor Feedback</h3>
                  <div className="bg-dark-bg border border-gray-600 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <User className="text-dark-primary" size={20} />
                      <span className="font-medium">{assignment.instructor}</span>
                      <span className="text-sm text-gray-400">• {grading.gradedAt}</span>
                    </div>
                    <div className="text-gray-300 leading-relaxed whitespace-pre-line">{grading.feedback}</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Assignment Info */}
            <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-4">Assignment Info</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Due Date:</span>
                  <span>{assignment.dueDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Max Points:</span>
                  <span>{assignment.maxPoints}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status:</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(assignment.status)}`}>
                    {assignment.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Time Remaining:</span>
                  <span className="text-yellow-400">{assignment.timeRemaining}</span>
                </div>
              </div>
            </div>

            {/* Submission Format */}
            <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-4">Submission Format</h3>
              <ul className="space-y-2">
                {assignment.submissionFormat.map((format, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <CheckCircle className="text-green-400" size={16} />
                    <span className="text-sm">{format}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Attachments */}
            <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-4">Assignment Files</h3>
              <div className="space-y-3">
                {assignment.attachments.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-dark-bg rounded-lg border border-gray-600"
                  >
                    <div className="flex items-center space-x-3">
                      <FileText className="text-dark-primary" size={20} />
                      <div>
                        <p className="font-medium text-sm">{file.name}</p>
                        <p className="text-xs text-gray-400">{file.size}</p>
                      </div>
                    </div>
                    <button className="text-dark-accent hover:text-blue-400 transition-colors">
                      <Download size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Help & Support */}
            <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-4">Need Help?</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-2 p-3 bg-dark-bg border border-gray-600 rounded-lg hover:border-gray-500 transition-colors">
                  <MessageSquare size={16} />
                  <span className="text-sm">Ask Instructor</span>
                </button>
                <button className="w-full flex items-center space-x-2 p-3 bg-dark-bg border border-gray-600 rounded-lg hover:border-gray-500 transition-colors">
                  <FileText size={16} />
                  <span className="text-sm">Assignment FAQ</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AssignmentPage
