"use client";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import CoursesPage from "./pages/CoursesPage"
import CourseDetailPage from "./pages/CourseDetailPage"
import AboutPage from "./pages/AboutPage"
import ContactPage from "./pages/ContactPage"
import StudentDashboard from "./pages/StudentDashboard"
import TrainerDashboard from "./pages/TrainerDashboard"
import AdminDashboard from "./pages/AdminDashboard"
import CorporateDashboard from "./pages/CorporateDashboard"
import EnrollmentPage from "./pages/EnrollmentPage"
import CertificatePage from "./pages/CertificatePage"
import AssignmentPage from "./pages/AssignmentPage"
import QuizPage from "./pages/QuizPage"
import CalendarPage from "./pages/CalendarPage"
import EmailSystem from "./components/EmailSystem"
import LiveChat from "./components/LiveChat"

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-dark-bg text-dark-text font-inter">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/course/:id" element={<CourseDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/enroll/:courseId" element={<EnrollmentPage />} />
          <Route path="/certificate/:id" element={<CertificatePage />} />
          <Route path="/student-dashboard/*" element={<StudentDashboard />} />
          <Route path="/trainer-dashboard/*" element={<TrainerDashboard />} />
          <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
          <Route path="/corporate-dashboard/*" element={<CorporateDashboard />} />
          <Route path="/assignment/:id" element={<AssignmentPage />} />
          <Route path="/quiz/:id" element={<QuizPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/admin-dashboard/emails" element={<EmailSystem />} />
        </Routes>
        <LiveChat />
      </div>
    </Router>
  )
}

export default App
