"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Bot, User, Phone, Mail, Minimize2 } from "lucide-react"

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      message: "Hello! I'm TEKINPLANT Assistant. How can I help you today?",
      timestamp: new Date(),
      options: ["Course Information", "Enrollment Process", "Technical Support", "Speak to Human Agent"],
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [chatMode, setChatMode] = useState("bot") // "bot" or "human"
  const [userInfo, setUserInfo] = useState({ name: "", email: "", phone: "" })
  const [showContactForm, setShowContactForm] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const botResponses = {
    "course information": {
      message: "I can help you with course information! Here are our popular courses:",
      options: [
        "Full Stack Development - 12 weeks",
        "Data Science & Analytics - 10 weeks",
        "Digital Marketing - 8 weeks",
        "Cloud Computing - 6 weeks",
        "View All Courses",
      ],
    },
    "enrollment process": {
      message:
        "Our enrollment process is simple:\n\n1. Browse courses\n2. Select your preferred course\n3. Fill enrollment form\n4. Upload required documents\n5. Make payment\n6. Start learning!\n\nWould you like help with any specific step?",
      options: ["Document Requirements", "Payment Options", "Course Schedule", "Start Enrollment"],
    },
    "technical support": {
      message: "I can help with technical issues. What problem are you experiencing?",
      options: [
        "Login Issues",
        "Video Playback Problems",
        "Assignment Submission",
        "Certificate Download",
        "Other Technical Issue",
      ],
    },
    "speak to human agent": {
      message: "I'll connect you with a human agent. Please provide your contact details:",
      action: "showContactForm",
    },
    "document requirements": {
      message:
        "Required documents for enrollment:\n\n• Educational certificates\n• ID proof (Aadhar/Passport)\n• Recent photograph\n• Work experience certificate (if applicable)\n\nAll documents should be in PDF format, max 5MB each.",
      options: ["Payment Options", "Start Enrollment", "Back to Main Menu"],
    },
    "payment options": {
      message:
        "We accept multiple payment methods:\n\n• Credit/Debit Cards\n• Net Banking\n• UPI (GPay, PhonePe, Paytm)\n• EMI options available\n• Corporate invoicing\n\nAll payments are secure and encrypted.",
      options: ["EMI Details", "Corporate Billing", "Start Enrollment"],
    },
  }

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const newMessage = {
      id: messages.length + 1,
      type: "user",
      message: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
    setInputMessage("")

    if (chatMode === "bot") {
      handleBotResponse(inputMessage.toLowerCase())
    } else {
      // Human agent simulation
      setTimeout(() => {
        const agentResponse = {
          id: messages.length + 2,
          type: "agent",
          message: "Thank you for your message. An agent will respond shortly. Average response time is 2-3 minutes.",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, agentResponse])
      }, 1000)
    }
  }

  const handleBotResponse = (userMessage) => {
    setIsTyping(true)

    setTimeout(() => {
      const response = {
        id: messages.length + 2,
        type: "bot",
        timestamp: new Date(),
      }

      // Check for specific keywords
      const key = Object.keys(botResponses).find((k) => userMessage.includes(k))

      if (key && botResponses[key]) {
        const botResponse = botResponses[key]
        response.message = botResponse.message
        response.options = botResponse.options

        if (botResponse.action === "showContactForm") {
          setShowContactForm(true)
        }
      } else {
        // Default response
        response.message =
          "I understand you're asking about: \"" +
          userMessage +
          '"\n\nLet me help you with that. Please choose from the options below:'
        response.options = ["Course Information", "Enrollment Process", "Technical Support", "Speak to Human Agent"]
      }

      setMessages((prev) => [...prev, response])
      setIsTyping(false)
    }, 1500)
  }

  const handleOptionClick = (option) => {
    const newMessage = {
      id: messages.length + 1,
      type: "user",
      message: option,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
    handleBotResponse(option.toLowerCase())
  }

  const handleContactSubmit = (e) => {
    e.preventDefault()
    setChatMode("human")
    setShowContactForm(false)

    const agentMessage = {
      id: messages.length + 1,
      type: "agent",
      message: `Hello ${userInfo.name}! I'm Sarah from TEKINPLANT support team. I've received your contact details and I'm here to help you. What can I assist you with today?`,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, agentMessage])
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-dark-primary hover:bg-purple-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 z-50 animate-pulse"
      >
        <MessageCircle size={24} />
      </button>
    )
  }

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${isMinimized ? "w-80 h-16" : "w-80 h-96"}`}
    >
      <div className="bg-dark-surface border border-gray-700 rounded-2xl shadow-2xl overflow-hidden h-full flex flex-col">
        {/* Header */}
        <div className="bg-dark-primary p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              {chatMode === "bot" ? (
                <Bot size={16} className="text-dark-primary" />
              ) : (
                <User size={16} className="text-dark-primary" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-white">{chatMode === "bot" ? "TEKINPLANT Assistant" : "Live Support"}</h3>
              <p className="text-xs text-purple-200">
                {chatMode === "bot" ? "AI-powered help" : "Human agent - Online"}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-white hover:text-purple-200 transition-colors"
            >
              <Minimize2 size={16} />
            </button>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-purple-200 transition-colors">
              <X size={16} />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-dark-bg">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-xs ${message.type === "user" ? "bg-dark-primary text-white" : message.type === "agent" ? "bg-green-600 text-white" : "bg-gray-700 text-gray-100"} rounded-lg p-3`}
                    >
                      <p className="text-sm whitespace-pre-line">{message.message}</p>
                      <p className="text-xs opacity-70 mt-1">{formatTime(message.timestamp)}</p>

                      {message.options && (
                        <div className="mt-3 space-y-2">
                          {message.options.map((option, index) => (
                            <button
                              key={index}
                              onClick={() => handleOptionClick(option)}
                              className="block w-full text-left text-xs bg-dark-bg hover:bg-gray-600 text-gray-200 p-2 rounded transition-colors"
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-700 text-gray-100 rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Contact Form Modal */}
            {showContactForm && (
              <div className="absolute inset-0 bg-dark-bg bg-opacity-95 flex items-center justify-center p-4">
                <div className="bg-dark-surface border border-gray-700 rounded-lg p-6 w-full max-w-sm">
                  <h3 className="text-lg font-semibold mb-4">Connect with Human Agent</h3>
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={userInfo.name}
                      onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                      className="w-full px-3 py-2 bg-dark-bg border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-dark-primary"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={userInfo.email}
                      onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                      className="w-full px-3 py-2 bg-dark-bg border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-dark-primary"
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={userInfo.phone}
                      onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                      className="w-full px-3 py-2 bg-dark-bg border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-dark-primary"
                    />
                    <div className="flex space-x-3">
                      <button
                        type="button"
                        onClick={() => setShowContactForm(false)}
                        className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 px-4 py-2 bg-dark-primary hover:bg-purple-600 text-white rounded transition-colors"
                      >
                        Connect
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-gray-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 bg-dark-bg border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-dark-primary"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-dark-primary hover:bg-purple-600 text-white p-2 rounded-lg transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>

              {chatMode === "human" && (
                <div className="flex items-center justify-center space-x-4 mt-3 pt-3 border-t border-gray-700">
                  <a
                    href="tel:9860970798"
                    className="flex items-center space-x-1 text-xs text-gray-400 hover:text-dark-primary transition-colors"
                  >
                    <Phone size={12} />
                    <span>Call</span>
                  </a>
                  <a
                    href="mailto:info@trainin.com"
                    className="flex items-center space-x-1 text-xs text-gray-400 hover:text-dark-primary transition-colors"
                  >
                    <Mail size={12} />
                    <span>Email</span>
                  </a>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default LiveChat
