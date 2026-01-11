"use client"

import { useState } from "react"
import { Search, MapPin, Clock, Building } from "lucide-react"

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [category, setCategory] = useState("All Categories")
  const [location, setLocation] = useState("Any Locations")

  const internships = [
    {
      id: 1,
      title: "Software Engineering",
      company: "InnovateTech",
      location: "New York",
      type: "Full-Time",
      tags: ["React", "Node.js", "MongoDB"],
      icon: "⚙️",
    },
    {
      id: 2,
      title: "Marketing Intern",
      company: "CreativeSolutions",
      location: "Remote",
      type: "Part-Time",
      tags: ["Digital Marketing", "SEO", "Content"],
      icon: "💬",
    },
    {
      id: 3,
      title: "Data Analyst Intern",
      company: "HealthCorp",
      location: "Boston",
      type: "Full-Time",
      tags: ["Python", "SQL", "Analytics"],
      icon: "📊",
    },
    {
      id: 4,
      title: "Web Development",
      company: "GreenEnergy",
      location: "Part-Time",
      type: "Part-Time",
      tags: ["JavaScript", "CSS", "HTML"],
      icon: "🌐",
    },
  ]

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Industrial <span className="text-dark-primary">Training</span> Programs
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Enhance your skills with industry-focused training programs and kickstart your career with valuable
                hands-on experience.
              </p>

              {/* Search Bar */}
              <div className="bg-dark-surface p-6 rounded-2xl border border-gray-700">
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="md:col-span-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="text"
                        placeholder="Search Internships..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-dark-bg border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-dark-primary transition-colors"
                      />
                    </div>
                  </div>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="px-4 py-3 bg-dark-bg border border-gray-600 rounded-lg text-white focus:outline-none focus:border-dark-primary transition-colors"
                  >
                    <option>All Categories</option>
                    <option>Technology</option>
                    <option>Marketing</option>
                    <option>Design</option>
                    <option>Finance</option>
                  </select>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="px-4 py-3 bg-dark-bg border border-gray-600 rounded-lg text-white focus:outline-none focus:border-dark-primary transition-colors"
                  >
                    <option>Any Locations</option>
                    <option>Remote</option>
                    <option>New York</option>
                    <option>San Francisco</option>
                    <option>Boston</option>
                  </select>
                </div>
                <button className="w-full md:w-auto mt-4 bg-dark-primary hover:bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
                  Search
                </button>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img
                  src="/placeholder.svg?height=500&width=500"
                  alt="Professional person"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Internships Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12">Latest Internships</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {internships.map((internship) => (
              <div
                key={internship.id}
                className="bg-dark-surface border border-gray-700 rounded-2xl p-8 hover:border-dark-primary transition-all duration-300 hover:transform hover:scale-105 cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-dark-primary rounded-lg flex items-center justify-center text-2xl">
                      {internship.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold group-hover:text-dark-primary transition-colors">
                        {internship.title}
                      </h3>
                      <p className="text-gray-400 flex items-center mt-1">
                        <Building size={16} className="mr-2" />
                        {internship.company}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-6 mb-6 text-sm text-gray-400">
                  <span className="flex items-center">
                    <MapPin size={16} className="mr-2" />
                    {internship.location}
                  </span>
                  <span className="flex items-center">
                    <Clock size={16} className="mr-2" />
                    {internship.type}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {internship.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-dark-bg text-gray-300 rounded-full text-sm border border-gray-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-dark-accent hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
              View All Internships
            </button>
          </div>
        </div>
      </section>

      {/* Industries Covered Section */}
      <section className="py-20 bg-dark-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center">Industries We Cover</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: "Information Technology", icon: "💻" },
              { name: "Manufacturing", icon: "🏭" },
              { name: "Civil Engineering", icon: "🏗️" },
              { name: "Mechanical Engineering", icon: "⚙️" },
              { name: "Electrical Engineering", icon: "⚡" },
              { name: "Healthcare", icon: "🏥" },
              { name: "Finance", icon: "💰" },
              { name: "Marketing", icon: "📊" },
            ].map((industry, index) => (
              <div
                key={index}
                className="bg-dark-bg border border-gray-700 rounded-xl p-6 text-center hover:border-dark-primary transition-all duration-300 hover:transform hover:scale-105 cursor-pointer"
              >
                <div className="text-4xl mb-4">{industry.icon}</div>
                <h3 className="text-lg font-medium">{industry.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Modes Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center">Training Modes</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Onsite Training",
                icon: "🏢",
                description:
                  "Learn in our state-of-the-art facilities with hands-on equipment and direct instructor guidance.",
              },
              {
                name: "Online Training",
                icon: "🌐",
                description:
                  "Flexible learning from anywhere with live sessions, recorded videos, and interactive assignments.",
              },
              {
                name: "Hybrid Training",
                icon: "🔄",
                description: "Best of both worlds with a mix of online learning and practical onsite sessions.",
              },
            ].map((mode, index) => (
              <div
                key={index}
                className="bg-dark-surface border border-gray-700 rounded-xl p-8 text-center hover:border-dark-primary transition-all duration-300"
              >
                <div className="text-5xl mb-6">{mode.icon}</div>
                <h3 className="text-xl font-semibold mb-4">{mode.name}</h3>
                <p className="text-gray-400">{mode.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-dark-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center">Success Stories</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Johnson",
                role: "Software Developer at TechCorp",
                image: "/placeholder.svg?height=100&width=100",
                quote:
                  "The IT training program gave me practical skills that I immediately applied in my new role. Highly recommended!",
              },
              {
                name: "Sarah Williams",
                role: "Mechanical Engineer at InnovateTech",
                image: "/placeholder.svg?height=100&width=100",
                quote:
                  "The hands-on approach and industry-experienced trainers made all the difference in my career journey.",
              },
              {
                name: "Michael Chen",
                role: "Project Manager at BuildRight",
                image: "/placeholder.svg?height=100&width=100",
                quote:
                  "From theory to practice, the civil engineering program prepared me for real-world challenges in construction management.",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-dark-bg border border-gray-700 rounded-xl p-8 hover:border-dark-primary transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-dark-accent hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
              Read More Success Stories
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Stay Updated</h2>
          <p className="text-gray-300 mb-8">
            Subscribe to our newsletter for the latest training programs, industry insights, and special offers.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 bg-dark-bg border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-dark-primary transition-colors"
            />
            <button className="bg-dark-primary hover:bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
              Subscribe
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
          </p>
        </div>
      </section>

      {/* Contact Info Footer */}
      <section className="py-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            Contact us: 9860970798 |{" "}
            <a href="https://www.tekinplant.com" className="text-dark-primary hover:text-purple-400">
              WWW.TEKINPLANT.COM
            </a>
          </p>
        </div>
      </section>
    </div>
  )
}

export default HomePage
