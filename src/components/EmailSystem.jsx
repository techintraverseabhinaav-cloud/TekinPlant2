"use client"

import { useState } from "react"
import { Mail, Send, Clock, CheckCircle, AlertCircle, Users, Calendar } from "lucide-react"

const EmailSystem = () => {
  const [emailTemplates, setEmailTemplates] = useState([
    {
      id: 1,
      name: "Welcome Email",
      subject: "Welcome to TEKINPLANT - Your Learning Journey Begins!",
      type: "welcome",
      trigger: "user_registration",
      status: "active",
      sentCount: 1247,
      openRate: 85.2,
    },
    {
      id: 2,
      name: "Course Enrollment Confirmation",
      subject: "Course Enrollment Confirmed - {{course_name}}",
      type: "enrollment",
      trigger: "course_enrollment",
      status: "active",
      sentCount: 892,
      openRate: 92.1,
    },
    {
      id: 3,
      name: "Assignment Reminder",
      subject: "Assignment Due Tomorrow - {{assignment_name}}",
      type: "reminder",
      trigger: "assignment_due_24h",
      status: "active",
      sentCount: 2156,
      openRate: 78.9,
    },
    {
      id: 4,
      name: "Certificate Ready",
      subject: "🎉 Your Certificate is Ready for Download!",
      type: "certificate",
      trigger: "course_completion",
      status: "active",
      sentCount: 567,
      openRate: 96.3,
    },
    {
      id: 5,
      name: "Payment Confirmation",
      subject: "Payment Received - Invoice #{{invoice_number}}",
      type: "payment",
      trigger: "payment_success",
      status: "active",
      sentCount: 1034,
      openRate: 89.7,
    },
  ])

  const [emailQueue, setEmailQueue] = useState([
    {
      id: 1,
      recipient: "john.doe@email.com",
      template: "Course Enrollment Confirmation",
      subject: "Course Enrollment Confirmed - Full Stack Development",
      status: "pending",
      scheduledTime: "2024-02-15 10:30 AM",
      priority: "high",
    },
    {
      id: 2,
      recipient: "sarah.wilson@email.com",
      template: "Assignment Reminder",
      subject: "Assignment Due Tomorrow - React Components",
      status: "sent",
      scheduledTime: "2024-02-15 09:00 AM",
      priority: "medium",
      sentTime: "2024-02-15 09:00 AM",
    },
    {
      id: 3,
      recipient: "mike.johnson@email.com",
      template: "Certificate Ready",
      subject: "🎉 Your Certificate is Ready for Download!",
      status: "delivered",
      scheduledTime: "2024-02-15 08:00 AM",
      priority: "high",
      sentTime: "2024-02-15 08:00 AM",
      deliveredTime: "2024-02-15 08:02 AM",
    },
  ])

  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [showTemplateEditor, setShowTemplateEditor] = useState(false)
  const [emailStats, setEmailStats] = useState({
    totalSent: 5896,
    deliveryRate: 98.2,
    openRate: 87.4,
    clickRate: 23.6,
  })

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="text-yellow-400" size={16} />
      case "sent":
        return <Send className="text-blue-400" size={16} />
      case "delivered":
        return <CheckCircle className="text-green-400" size={16} />
      case "failed":
        return <AlertCircle className="text-red-400" size={16} />
      default:
        return <Mail className="text-gray-400" size={16} />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-900 text-yellow-300"
      case "sent":
        return "bg-blue-900 text-blue-300"
      case "delivered":
        return "bg-green-900 text-green-300"
      case "failed":
        return "bg-red-900 text-red-300"
      default:
        return "bg-gray-900 text-gray-300"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-900 text-red-300"
      case "medium":
        return "bg-yellow-900 text-yellow-300"
      case "low":
        return "bg-green-900 text-green-300"
      default:
        return "bg-gray-900 text-gray-300"
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Email Automation</h1>
          <p className="text-gray-400">Manage automated email campaigns and notifications</p>
        </div>
        <button
          onClick={() => setShowTemplateEditor(true)}
          className="bg-dark-primary hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2"
        >
          <Mail size={20} />
          <span>Create Template</span>
        </button>
      </div>

      {/* Email Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Sent</p>
              <p className="text-3xl font-bold">{emailStats.totalSent.toLocaleString()}</p>
            </div>
            <Send className="text-dark-primary" size={32} />
          </div>
        </div>
        <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Delivery Rate</p>
              <p className="text-3xl font-bold">{emailStats.deliveryRate}%</p>
            </div>
            <CheckCircle className="text-green-400" size={32} />
          </div>
        </div>
        <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Open Rate</p>
              <p className="text-3xl font-bold">{emailStats.openRate}%</p>
            </div>
            <Mail className="text-dark-accent" size={32} />
          </div>
        </div>
        <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Click Rate</p>
              <p className="text-3xl font-bold">{emailStats.clickRate}%</p>
            </div>
            <Users className="text-yellow-400" size={32} />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Email Templates */}
        <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-6">Email Templates</h2>
          <div className="space-y-4">
            {emailTemplates.map((template) => (
              <div key={template.id} className="p-4 bg-dark-bg rounded-lg border border-gray-600">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold">{template.name}</h3>
                    <p className="text-sm text-gray-400 mt-1">{template.subject}</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      template.status === "active" ? "bg-green-900 text-green-300" : "bg-gray-900 text-gray-300"
                    }`}
                  >
                    {template.status}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Sent:</span>
                    <span className="ml-1 font-medium">{template.sentCount}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Open Rate:</span>
                    <span className="ml-1 font-medium">{template.openRate}%</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Trigger:</span>
                    <span className="ml-1 font-medium text-xs">{template.trigger.replace(/_/g, " ")}</span>
                  </div>
                </div>
                <div className="flex justify-end mt-3">
                  <button
                    onClick={() => setSelectedTemplate(template)}
                    className="text-dark-primary hover:text-purple-400 text-sm font-medium"
                  >
                    Edit Template
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Email Queue */}
        <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-6">Email Queue</h2>
          <div className="space-y-4">
            {emailQueue.map((email) => (
              <div key={email.id} className="p-4 bg-dark-bg rounded-lg border border-gray-600">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3">
                    {getStatusIcon(email.status)}
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm">{email.subject}</h3>
                      <p className="text-xs text-gray-400 mt-1">To: {email.recipient}</p>
                      <p className="text-xs text-gray-400">Template: {email.template}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(email.status)}`}>
                      {email.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(email.priority)}`}>
                      {email.priority}
                    </span>
                  </div>
                </div>
                <div className="text-xs text-gray-400">
                  <div className="flex items-center space-x-1 mb-1">
                    <Calendar size={12} />
                    <span>Scheduled: {email.scheduledTime}</span>
                  </div>
                  {email.sentTime && (
                    <div className="flex items-center space-x-1 mb-1">
                      <Send size={12} />
                      <span>Sent: {email.sentTime}</span>
                    </div>
                  )}
                  {email.deliveredTime && (
                    <div className="flex items-center space-x-1">
                      <CheckCircle size={12} />
                      <span>Delivered: {email.deliveredTime}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Automation Rules */}
      <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-6">Automation Rules</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 bg-dark-bg rounded-lg border border-gray-600">
            <h3 className="font-semibold mb-2">Welcome Series</h3>
            <p className="text-sm text-gray-400 mb-3">Send welcome emails to new users</p>
            <div className="text-xs text-gray-400">
              <div>Trigger: User Registration</div>
              <div>Delay: Immediate</div>
              <div>
                Status: <span className="text-green-400">Active</span>
              </div>
            </div>
          </div>
          <div className="p-4 bg-dark-bg rounded-lg border border-gray-600">
            <h3 className="font-semibold mb-2">Assignment Reminders</h3>
            <p className="text-sm text-gray-400 mb-3">Remind students about upcoming deadlines</p>
            <div className="text-xs text-gray-400">
              <div>Trigger: 24h before due date</div>
              <div>Delay: 24 hours</div>
              <div>
                Status: <span className="text-green-400">Active</span>
              </div>
            </div>
          </div>
          <div className="p-4 bg-dark-bg rounded-lg border border-gray-600">
            <h3 className="font-semibold mb-2">Course Completion</h3>
            <p className="text-sm text-gray-400 mb-3">Congratulate students on course completion</p>
            <div className="text-xs text-gray-400">
              <div>Trigger: Course completion</div>
              <div>Delay: Immediate</div>
              <div>
                Status: <span className="text-green-400">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmailSystem
