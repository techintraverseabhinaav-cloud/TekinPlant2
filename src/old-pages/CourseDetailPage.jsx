"use client"

import { useParams, Link } from "react-router-dom"
import { Calendar, Clock, Users, BookOpen, CheckCircle, Award, Download } from "lucide-react"

const CourseDetailPage = () => {
  const { id } = useParams()

  // Mock data - in real app, fetch based on ID
  const course = {
    id: 1,
    title: "Full Stack Web Development",
    domain: "Information Technology",
    level: "Intermediate",
    duration: "12 weeks",
    mode: "Online",
    startDate: "Feb 15, 2024",
    trainer: {
      name: "John Smith",
      role: "Senior Developer",
      experience: "10+ years",
      image: "/placeholder.svg?height=100&width=100",
    },
    students: 45,
    image: "💻",
    description: `This comprehensive Full Stack Web Development program is designed to equip you with the skills needed to build modern, responsive web applications from front to back.

You'll learn the latest technologies and frameworks used in the industry, including React for frontend development, Node.js for backend, and MongoDB for database management. The course covers everything from basic HTML/CSS to advanced topics like authentication, API development, and deployment.`,
    syllabus: [
      {
        title: "Module 1: Frontend Fundamentals",
        topics: ["HTML5 & CSS3", "JavaScript Essentials", "Responsive Design", "CSS Frameworks"],
      },
      {
        title: "Module 2: React Development",
        topics: ["React Fundamentals", "State Management", "Hooks & Context API", "Routing"],
      },
      {
        title: "Module 3: Backend Development",
        topics: ["Node.js Basics", "Express Framework", "RESTful API Design", "Authentication"],
      },
      {
        title: "Module 4: Database Integration",
        topics: ["MongoDB Fundamentals", "Mongoose ODM", "Data Modeling", "CRUD Operations"],
      },
      {
        title: "Module 5: Deployment & DevOps",
        topics: ["Git Version Control", "CI/CD Pipelines", "Cloud Deployment", "Performance Optimization"],
      },
    ],
    prerequisites: [
      "Basic understanding of HTML, CSS, and JavaScript",
      "Familiarity with programming concepts",
      "Own laptop with admin access",
      "Reliable internet connection for online sessions",
    ],
    certification: {
      name: "Certified Full Stack Developer",
      validity: "2 years",
      accreditation: "Tech Industry Association",
      skills: ["Frontend Development", "Backend Development", "Database Management", "API Design"],
    },
    testimonials: [
      {
        name: "Alex Johnson",
        role: "Software Developer at TechCorp",
        image: "/placeholder.svg?height=80&width=80",
        quote:
          "This course transformed my career. The hands-on projects and industry-relevant curriculum helped me land my dream job.",
      },
      {
        name: "Sarah Williams",
        role: "Freelance Web Developer",
        image: "/placeholder.svg?height=80&width=80",
        quote:
          "The instructor's expertise and the comprehensive syllabus made complex concepts easy to understand. Highly recommended!",
      },
    ],
  }

  return (
    <div className="min-h-screen bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-dark-surface border border-gray-700 rounded-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-dark-primary rounded-xl flex items-center justify-center text-3xl">
                {course.image}
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
                <p className="text-xl text-gray-300 mb-4">{course.domain}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Clock size={18} className="text-dark-primary" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Calendar size={18} className="text-dark-primary" />
                    <span>Starts {course.startDate}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <BookOpen size={18} className="text-dark-primary" />
                    <span>{course.level}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Users size={18} className="text-dark-primary" />
                    <span>{course.students} enrolled</span>
                  </div>
                </div>

                <span className="px-3 py-1 bg-dark-bg text-gray-300 rounded-full text-sm border border-gray-600">
                  {course.mode}
                </span>
              </div>
            </div>

            <div className="flex flex-col space-y-3">
              <Link
                to={`/enroll/${course.id}`}
                className="bg-dark-primary hover:bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 text-center"
              >
                Enroll Now
              </Link>
              <button className="border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200">
                Download Brochure
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-4">Course Description</h2>
              <div className="text-gray-300 leading-relaxed whitespace-pre-line">{course.description}</div>
            </div>

            {/* Syllabus */}
            <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-6">Course Syllabus</h2>
              <div className="space-y-6">
                {course.syllabus.map((module, index) => (
                  <div key={index} className="border-b border-gray-700 pb-6 last:border-0 last:pb-0">
                    <h3 className="text-xl font-semibold mb-4">{module.title}</h3>
                    <ul className="space-y-2">
                      {module.topics.map((topic, topicIndex) => (
                        <li key={topicIndex} className="flex items-start space-x-3">
                          <CheckCircle size={18} className="text-dark-primary mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Prerequisites */}
            <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-4">Prerequisites</h2>
              <ul className="space-y-3">
                {course.prerequisites.map((prerequisite, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle size={18} className="text-dark-accent mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{prerequisite}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Certification */}
            <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
              <div className="flex items-center mb-4">
                <Award size={24} className="text-yellow-500 mr-3" />
                <h2 className="text-2xl font-bold">Certification</h2>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">{course.certification.name}</h3>
                <p className="text-gray-400 mb-4">
                  Validity: {course.certification.validity} | Accredited by: {course.certification.accreditation}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {course.certification.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-dark-bg text-gray-300 rounded-full text-sm border border-gray-600"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <p className="text-gray-300">
                  Upon successful completion of the course and passing the final assessment, you'll receive an
                  industry-recognized certification that validates your skills and enhances your employability.
                </p>
              </div>

              <div className="bg-dark-bg border border-gray-700 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium">Sample Certificate</p>
                  <p className="text-sm text-gray-400">Preview the certificate you'll earn</p>
                </div>
                <button className="flex items-center space-x-2 text-dark-primary hover:text-purple-400 transition-colors">
                  <Download size={18} />
                  <span>Preview</span>
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trainer Info */}
            <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">Meet Your Trainer</h3>
              <div className="flex items-center mb-4">
                <img
                  src={course.trainer.image || "/placeholder.svg"}
                  alt={course.trainer.name}
                  className="w-16 h-16 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-semibold">{course.trainer.name}</h4>
                  <p className="text-sm text-gray-400">{course.trainer.role}</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-2">
                With {course.trainer.experience} of industry experience, {course.trainer.name} brings practical
                knowledge and insights to the classroom.
              </p>
              <button className="text-dark-primary hover:text-purple-400 text-sm font-medium transition-colors">
                View Full Profile
              </button>
            </div>

            {/* Key Highlights */}
            <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">Key Highlights</h3>
              <ul className="space-y-3">
                {[
                  "Industry-relevant curriculum",
                  "Hands-on practical sessions",
                  "Real-world projects",
                  "Personalized feedback",
                  "Job placement assistance",
                  "Lifetime access to course materials",
                ].map((highlight, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle size={18} className="text-dark-primary mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Testimonials */}
            <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">Student Testimonials</h3>
              <div className="space-y-4">
                {course.testimonials.map((testimonial, index) => (
                  <div key={index} className="p-4 bg-dark-bg rounded-lg border border-gray-600">
                    <div className="flex items-center mb-3">
                      <img
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="w-10 h-10 rounded-full mr-3 object-cover"
                      />
                      <div>
                        <h4 className="font-medium text-sm">{testimonial.name}</h4>
                        <p className="text-xs text-gray-400">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm italic">"{testimonial.quote}"</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Courses */}
            <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">Related Courses</h3>
              <div className="space-y-3">
                {[
                  { title: "Frontend Development with React", domain: "Information Technology" },
                  { title: "Backend Development with Node.js", domain: "Information Technology" },
                  { title: "Database Design & Management", domain: "Information Technology" },
                ].map((relatedCourse, index) => (
                  <Link to={`/course/${index + 2}`} key={index}>
                    <div className="p-3 bg-dark-bg rounded-lg border border-gray-600 hover:border-gray-500 transition-colors">
                      <h4 className="font-medium text-white">{relatedCourse.title}</h4>
                      <p className="text-sm text-gray-400">{relatedCourse.domain}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetailPage
