"use client"

import { useState } from "react"
import { useParams } from "react-router-dom"
import { CheckCircle, Upload, CreditCard, Calendar, Clock } from "lucide-react"

const EnrollmentPage = () => {
  const { courseId } = useParams()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    education: "",
    experience: "",
    batch: "",
    paymentMethod: "creditCard",
    documents: {
      resume: null,
      id: null,
      qualification: null,
    },
  })

  // Mock course data
  const course = {
    id: courseId,
    title: "Full Stack Web Development",
    price: "₹24,999",
    duration: "12 weeks",
    startDates: ["Feb 15, 2024", "Mar 1, 2024", "Mar 15, 2024"],
    image: "💻",
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleFileChange = (e) => {
    const { name, files } = e.target
    setFormData({
      ...formData,
      documents: {
        ...formData.documents,
        [name]: files[0],
      },
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (step < 3) {
      setStep(step + 1)
    } else {
      // Submit enrollment
      console.log("Enrollment submitted:", formData)
      // Redirect to success page or dashboard
    }
  }

  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-center mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                s === step
                  ? "bg-dark-primary text-white"
                  : s < step
                    ? "bg-green-500 text-white"
                    : "bg-dark-bg text-gray-400 border border-gray-600"
              }`}
            >
              {s < step ? <CheckCircle size={18} /> : s}
            </div>
            {s < 3 && <div className={`w-20 h-1 ${s < step ? "bg-green-500" : "bg-gray-600"}`}></div>}
          </div>
        ))}
      </div>
    )
  }

  const renderPersonalInfoForm = () => {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold mb-6">Personal Information</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-dark-bg border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-dark-primary transition-colors"
              placeholder="Enter your first name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-dark-bg border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-dark-primary transition-colors"
              placeholder="Enter your last name"
              required
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-dark-bg border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-dark-primary transition-colors"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-dark-bg border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-dark-primary transition-colors"
              placeholder="Enter your phone number"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Highest Education</label>
          <select
            name="education"
            value={formData.education}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-dark-bg border border-gray-600 rounded-lg text-white focus:outline-none focus:border-dark-primary transition-colors"
            required
          >
            <option value="">Select your highest education</option>
            <option value="high_school">High School</option>
            <option value="diploma">Diploma</option>
            <option value="bachelors">Bachelor's Degree</option>
            <option value="masters">Master's Degree</option>
            <option value="phd">PhD</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Work Experience (Years)</label>
          <select
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-dark-bg border border-gray-600 rounded-lg text-white focus:outline-none focus:border-dark-primary transition-colors"
            required
          >
            <option value="">Select your experience</option>
            <option value="0">No experience</option>
            <option value="1-2">1-2 years</option>
            <option value="3-5">3-5 years</option>
            <option value="5+">5+ years</option>
          </select>
        </div>
      </div>
    )
  }

  const renderDocumentsForm = () => {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold mb-6">Document Upload</h2>
        <p className="text-gray-400 mb-6">Please upload the following documents in PDF or image format (JPG, PNG).</p>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Resume/CV</label>
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
              <div className="flex flex-col items-center">
                <Upload className="text-gray-400 mb-2" size={24} />
                <p className="text-sm text-gray-400 mb-2">
                  {formData.documents.resume
                    ? `Selected: ${formData.documents.resume.name}`
                    : "Drag and drop your resume here, or click to browse"}
                </p>
                <input
                  type="file"
                  name="resume"
                  onChange={handleFileChange}
                  className="hidden"
                  id="resume-upload"
                  accept=".pdf,.doc,.docx"
                />
                <label
                  htmlFor="resume-upload"
                  className="bg-dark-bg hover:bg-gray-700 text-gray-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
                >
                  Browse Files
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">ID Proof (Aadhar/PAN/Passport)</label>
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
              <div className="flex flex-col items-center">
                <Upload className="text-gray-400 mb-2" size={24} />
                <p className="text-sm text-gray-400 mb-2">
                  {formData.documents.id
                    ? `Selected: ${formData.documents.id.name}`
                    : "Drag and drop your ID proof here, or click to browse"}
                </p>
                <input
                  type="file"
                  name="id"
                  onChange={handleFileChange}
                  className="hidden"
                  id="id-upload"
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                <label
                  htmlFor="id-upload"
                  className="bg-dark-bg hover:bg-gray-700 text-gray-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
                >
                  Browse Files
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Educational Qualification</label>
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
              <div className="flex flex-col items-center">
                <Upload className="text-gray-400 mb-2" size={24} />
                <p className="text-sm text-gray-400 mb-2">
                  {formData.documents.qualification
                    ? `Selected: ${formData.documents.qualification.name}`
                    : "Drag and drop your qualification certificate here, or click to browse"}
                </p>
                <input
                  type="file"
                  name="qualification"
                  onChange={handleFileChange}
                  className="hidden"
                  id="qualification-upload"
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                <label
                  htmlFor="qualification-upload"
                  className="bg-dark-bg hover:bg-gray-700 text-gray-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
                >
                  Browse Files
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderPaymentForm = () => {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold mb-6">Payment & Batch Selection</h2>

        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-300 mb-2">Select Batch</label>
          <div className="grid md:grid-cols-3 gap-4">
            {course.startDates.map((date, index) => (
              <div key={index}>
                <input
                  type="radio"
                  name="batch"
                  id={`batch-${index}`}
                  value={date}
                  onChange={handleInputChange}
                  className="hidden peer"
                  required
                />
                <label
                  htmlFor={`batch-${index}`}
                  className="flex flex-col items-center p-4 border border-gray-600 rounded-lg cursor-pointer peer-checked:border-dark-primary peer-checked:bg-dark-bg hover:bg-dark-bg transition-colors"
                >
                  <Calendar className="mb-2 text-gray-400 peer-checked:text-dark-primary" size={24} />
                  <span className="font-medium">{date}</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-300 mb-2">Payment Method</label>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { id: "creditCard", name: "Credit/Debit Card", icon: CreditCard },
              { id: "netBanking", name: "Net Banking", icon: CreditCard },
              { id: "upi", name: "UPI", icon: CreditCard },
            ].map((method) => (
              <div key={method.id}>
                <input
                  type="radio"
                  name="paymentMethod"
                  id={method.id}
                  value={method.id}
                  onChange={handleInputChange}
                  checked={formData.paymentMethod === method.id}
                  className="hidden peer"
                />
                <label
                  htmlFor={method.id}
                  className="flex flex-col items-center p-4 border border-gray-600 rounded-lg cursor-pointer peer-checked:border-dark-primary peer-checked:bg-dark-bg hover:bg-dark-bg transition-colors"
                >
                  <method.icon className="mb-2 text-gray-400 peer-checked:text-dark-primary" size={24} />
                  <span className="font-medium">{method.name}</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-dark-bg border border-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-bold mb-4">Order Summary</h3>
          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-400">Course Fee</span>
              <span>{course.price}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">GST (18%)</span>
              <span>₹4,499</span>
            </div>
            <div className="border-t border-gray-700 pt-3 flex justify-between font-semibold">
              <span>Total Amount</span>
              <span>₹29,498</span>
            </div>
          </div>

          <div className="text-sm text-gray-400">
            <p>By proceeding with the payment, you agree to our Terms & Conditions and Refund Policy.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-bg py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Enrollment: {course.title}</h1>
          <p className="text-gray-400">Complete the following steps to enroll in this course</p>
        </div>

        {renderStepIndicator()}

        <div className="bg-dark-surface border border-gray-700 rounded-2xl p-8">
          <form onSubmit={handleSubmit}>
            {step === 1 && renderPersonalInfoForm()}
            {step === 2 && renderDocumentsForm()}
            {step === 3 && renderPaymentForm()}

            <div className="flex justify-between mt-8">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                >
                  Back
                </button>
              )}
              <button
                type="submit"
                className="bg-dark-primary hover:bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 ml-auto"
              >
                {step === 3 ? "Complete Enrollment" : "Continue"}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-8 bg-dark-bg border border-gray-700 rounded-xl p-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-dark-primary rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
              {course.image}
            </div>
            <div>
              <h3 className="font-semibold">{course.title}</h3>
              <div className="flex items-center space-x-4 text-sm text-gray-400 mt-2">
                <span className="flex items-center">
                  <Clock size={14} className="mr-1" />
                  {course.duration}
                </span>
                <span className="flex items-center">
                  <Calendar size={14} className="mr-1" />
                  Multiple start dates
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EnrollmentPage
