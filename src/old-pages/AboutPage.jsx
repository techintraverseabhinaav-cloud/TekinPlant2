import { Award, Users, Globe, BookOpen, Target, Briefcase } from "lucide-react"

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Hero Section */}
      <section className="py-20 bg-dark-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">About TekinPlant</h1>
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                We are a premier industrial training institute dedicated to bridging the gap between academic knowledge
                and industry requirements. Our mission is to empower individuals with practical skills and hands-on
                experience needed to excel in today's competitive job market.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <Users className="text-dark-primary" size={20} />
                  <span className="text-gray-300">10,000+ Trained Professionals</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="text-dark-primary" size={20} />
                  <span className="text-gray-300">Industry-Recognized Certifications</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="text-dark-primary" size={20} />
                  <span className="text-gray-300">Global Network</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img
                  src="/placeholder.svg?height=500&width=500"
                  alt="Training facility"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-dark-surface border border-gray-700 rounded-2xl p-8">
              <div className="w-12 h-12 bg-dark-primary rounded-lg flex items-center justify-center mb-6">
                <Target className="text-white" size={24} />
              </div>
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-300 leading-relaxed">
                To provide high-quality, industry-relevant training programs that equip individuals with practical
                skills and knowledge required to succeed in their chosen fields. We aim to bridge the gap between
                academic education and industry requirements through hands-on training and real-world projects.
              </p>
            </div>
            <div className="bg-dark-surface border border-gray-700 rounded-2xl p-8">
              <div className="w-12 h-12 bg-dark-accent rounded-lg flex items-center justify-center mb-6">
                <BookOpen className="text-white" size={24} />
              </div>
              <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
              <p className="text-gray-300 leading-relaxed">
                To be the leading industrial training institute recognized for excellence in skill development and
                professional growth. We envision creating a global community of skilled professionals who drive
                innovation and progress in their respective industries, contributing to economic growth and
                technological advancement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Covered */}
      <section className="py-20 bg-dark-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center">Industries We Cover</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {[
              { name: "Information Technology", icon: "💻" },
              { name: "Manufacturing", icon: "🏭" },
              { name: "Civil Engineering", icon: "🏗️" },
              { name: "Mechanical Engineering", icon: "⚙️" },
              { name: "Electrical Engineering", icon: "⚡" },
              { name: "Healthcare", icon: "🏥" },
              { name: "Finance", icon: "💰" },
              { name: "Marketing", icon: "📊" },
              { name: "Automotive", icon: "🚗" },
              { name: "Aerospace", icon: "✈️" },
              { name: "Chemical", icon: "🧪" },
              { name: "Renewable Energy", icon: "🌱" },
            ].map((industry, index) => (
              <div
                key={index}
                className="bg-dark-bg border border-gray-700 rounded-xl p-6 text-center hover:border-dark-primary transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="text-4xl mb-4">{industry.icon}</div>
                <h3 className="text-sm font-medium">{industry.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Locations */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center">Training Locations & Modes</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-dark-surface border border-gray-700 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-dark-primary rounded-xl flex items-center justify-center mx-auto mb-6">
                <Briefcase className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Onsite Training</h3>
              <p className="text-gray-300 mb-6">
                Learn in our state-of-the-art facilities equipped with the latest technology and industry-standard
                equipment. Get hands-on experience with direct instructor guidance.
              </p>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>• Modern training facilities</li>
                <li>• Industry-standard equipment</li>
                <li>• Direct instructor interaction</li>
                <li>• Practical workshops</li>
              </ul>
            </div>

            <div className="bg-dark-surface border border-gray-700 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-dark-accent rounded-xl flex items-center justify-center mx-auto mb-6">
                <Globe className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Online Training</h3>
              <p className="text-gray-300 mb-6">
                Flexible learning from anywhere in the world with live interactive sessions, recorded videos, and
                virtual labs. Perfect for working professionals.
              </p>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>• Live interactive sessions</li>
                <li>• Recorded video content</li>
                <li>• Virtual lab access</li>
                <li>• 24/7 learning support</li>
              </ul>
            </div>

            <div className="bg-dark-surface border border-gray-700 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                <BookOpen className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Hybrid Training</h3>
              <p className="text-gray-300 mb-6">
                Best of both worlds combining online theoretical learning with practical onsite sessions. Flexible
                schedule with maximum learning impact.
              </p>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>• Online theory sessions</li>
                <li>• Onsite practical training</li>
                <li>• Flexible scheduling</li>
                <li>• Personalized learning path</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-dark-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center">Our Impact</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "10,000+", label: "Students Trained" },
              { number: "500+", label: "Corporate Partners" },
              { number: "50+", label: "Training Programs" },
              { number: "95%", label: "Placement Rate" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-dark-primary mb-2">{stat.number}</div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center">Our Leadership Team</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Dr. Rajesh Kumar",
                role: "Founder & CEO",
                experience: "20+ years in Industrial Training",
                image: "/placeholder.svg?height=300&width=300",
                description: "Visionary leader with extensive experience in industrial training and skill development.",
              },
              {
                name: "Prof. Priya Sharma",
                role: "Head of Academics",
                experience: "15+ years in Education",
                image: "/placeholder.svg?height=300&width=300",
                description: "Expert in curriculum design and academic excellence with a focus on industry relevance.",
              },
              {
                name: "Mr. Amit Patel",
                role: "Director of Operations",
                experience: "12+ years in Operations",
                image: "/placeholder.svg?height=300&width=300",
                description: "Operations expert ensuring smooth delivery of training programs across all locations.",
              },
            ].map((member, index) => (
              <div key={index} className="bg-dark-surface border border-gray-700 rounded-2xl p-6 text-center">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
                />
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-dark-primary font-medium mb-2">{member.role}</p>
                <p className="text-sm text-gray-400 mb-4">{member.experience}</p>
                <p className="text-gray-300 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-dark-surface">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
          <p className="text-gray-300 mb-8">
            Ready to start your learning journey? Contact us to learn more about our training programs and how we can
            help you achieve your career goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:9860970798"
              className="bg-dark-primary hover:bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Call: 9860970798
            </a>
            <a
              href="https://www.tekinplant.com"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Visit: WWW.TEKINPLANT.COM
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
