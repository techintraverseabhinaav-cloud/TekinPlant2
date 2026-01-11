"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Plus, Calendar, Clock, MapPin, Users, Video, Bell } from "lucide-react"

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [viewMode, setViewMode] = useState("month") // "month", "week", "day"
  const [showEventModal, setShowEventModal] = useState(false)

  const events = [
    {
      id: 1,
      title: "Full Stack Development - Module 1",
      type: "class",
      date: "2024-02-15",
      time: "10:00 AM - 12:00 PM",
      instructor: "Prof. John Smith",
      location: "Room 101 / Online",
      attendees: 25,
      color: "bg-blue-500",
      isOnline: true,
    },
    {
      id: 2,
      title: "Data Science Assignment Due",
      type: "deadline",
      date: "2024-02-16",
      time: "11:59 PM",
      course: "Data Science & Analytics",
      color: "bg-red-500",
    },
    {
      id: 3,
      title: "JavaScript Quiz",
      type: "assessment",
      date: "2024-02-18",
      time: "2:00 PM - 3:00 PM",
      course: "Full Stack Development",
      duration: "60 minutes",
      color: "bg-yellow-500",
    },
    {
      id: 4,
      title: "Career Guidance Session",
      type: "workshop",
      date: "2024-02-20",
      time: "4:00 PM - 5:30 PM",
      instructor: "Career Counselor",
      location: "Auditorium",
      color: "bg-green-500",
    },
    {
      id: 5,
      title: "Project Presentation",
      type: "presentation",
      date: "2024-02-22",
      time: "10:00 AM - 12:00 PM",
      course: "Full Stack Development",
      color: "bg-purple-500",
    },
  ]

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const getEventsForDate = (date) => {
    const dateString = date.toISOString().split("T")[0]
    return events.filter((event) => event.date === dateString)
  }

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentDate.getMonth() + direction)
    setCurrentDate(newDate)
  }

  const isToday = (date) => {
    const today = new Date()
    return (
      date &&
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  const isSelected = (date) => {
    return (
      date &&
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    )
  }

  const getEventTypeIcon = (type) => {
    switch (type) {
      case "class":
        return <Video size={14} />
      case "deadline":
        return <Clock size={14} />
      case "assessment":
        return <Calendar size={14} />
      case "workshop":
        return <Users size={14} />
      case "presentation":
        return <MapPin size={14} />
      default:
        return <Calendar size={14} />
    }
  }

  const upcomingEvents = events
    .filter((event) => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5)

  return (
    <div className="min-h-screen bg-dark-bg p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Academic Calendar</h1>
            <p className="text-gray-400">Manage your classes, assignments, and important dates</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode("month")}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === "month" ? "bg-dark-primary text-white" : "bg-dark-surface text-gray-300 hover:text-white"
                }`}
              >
                Month
              </button>
              <button
                onClick={() => setViewMode("week")}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === "week" ? "bg-dark-primary text-white" : "bg-dark-surface text-gray-300 hover:text-white"
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setViewMode("day")}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === "day" ? "bg-dark-primary text-white" : "bg-dark-surface text-gray-300 hover:text-white"
                }`}
              >
                Day
              </button>
            </div>
            <button
              onClick={() => setShowEventModal(true)}
              className="bg-dark-primary hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2"
            >
              <Plus size={16} />
              <span>Add Event</span>
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-3">
            <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">
                  {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => navigateMonth(-1)}
                    className="p-2 hover:bg-dark-bg rounded-lg transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() => setCurrentDate(new Date())}
                    className="px-4 py-2 bg-dark-bg hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors"
                  >
                    Today
                  </button>
                  <button
                    onClick={() => navigateMonth(1)}
                    className="p-2 hover:bg-dark-bg rounded-lg transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>

              {/* Days of Week Header */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {daysOfWeek.map((day) => (
                  <div key={day} className="p-3 text-center text-sm font-medium text-gray-400">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {getDaysInMonth(currentDate).map((date, index) => (
                  <div
                    key={index}
                    className={`min-h-24 p-2 border border-gray-700 rounded-lg cursor-pointer transition-colors ${
                      date ? "hover:bg-dark-bg" : ""
                    } ${isToday(date) ? "bg-dark-primary bg-opacity-20 border-dark-primary" : ""} ${
                      isSelected(date) ? "bg-dark-accent bg-opacity-20 border-dark-accent" : ""
                    }`}
                    onClick={() => date && setSelectedDate(date)}
                  >
                    {date && (
                      <>
                        <div className={`text-sm font-medium mb-1 ${isToday(date) ? "text-dark-primary" : ""}`}>
                          {date.getDate()}
                        </div>
                        <div className="space-y-1">
                          {getEventsForDate(date)
                            .slice(0, 2)
                            .map((event) => (
                              <div key={event.id} className={`text-xs p-1 rounded text-white truncate ${event.color}`}>
                                {event.title}
                              </div>
                            ))}
                          {getEventsForDate(date).length > 2 && (
                            <div className="text-xs text-gray-400">+{getEventsForDate(date).length - 2} more</div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Selected Date Events */}
            <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-4">
                {selectedDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </h3>
              <div className="space-y-3">
                {getEventsForDate(selectedDate).length > 0 ? (
                  getEventsForDate(selectedDate).map((event) => (
                    <div key={event.id} className="p-3 bg-dark-bg rounded-lg border border-gray-600">
                      <div className="flex items-start space-x-3">
                        <div className={`w-3 h-3 rounded-full mt-1 ${event.color}`}></div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{event.title}</h4>
                          <div className="flex items-center space-x-1 text-xs text-gray-400 mt-1">
                            <Clock size={12} />
                            <span>{event.time}</span>
                          </div>
                          {event.instructor && (
                            <p className="text-xs text-gray-400 mt-1">Instructor: {event.instructor}</p>
                          )}
                          {event.location && (
                            <div className="flex items-center space-x-1 text-xs text-gray-400 mt-1">
                              <MapPin size={12} />
                              <span>{event.location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm">No events scheduled for this date.</p>
                )}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-4">Upcoming Events</h3>
              <div className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="p-3 bg-dark-bg rounded-lg border border-gray-600">
                    <div className="flex items-start space-x-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white ${event.color}`}>
                        {getEventTypeIcon(event.type)}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{event.title}</h4>
                        <div className="flex items-center space-x-1 text-xs text-gray-400 mt-1">
                          <Calendar size={12} />
                          <span>{new Date(event.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-xs text-gray-400">
                          <Clock size={12} />
                          <span>{event.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 bg-dark-bg hover:bg-gray-600 rounded-lg transition-colors">
                  <Bell className="text-dark-primary" size={16} />
                  <span className="text-sm">Set Reminder</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 bg-dark-bg hover:bg-gray-600 rounded-lg transition-colors">
                  <Calendar className="text-dark-accent" size={16} />
                  <span className="text-sm">View Schedule</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 bg-dark-bg hover:bg-gray-600 rounded-lg transition-colors">
                  <Users className="text-green-400" size={16} />
                  <span className="text-sm">Join Class</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CalendarPage
