"use client"

import { useState } from "react"
import { Mail, Lock } from "lucide-react"

const LoginPage = () => {
  const [userType, setUserType] = useState("student")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle login logic here
    console.log("Login attempt:", { userType, email, password })
  }

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-gray-400">Sign in to your account</p>
        </div>

        <div className="bg-dark-surface p-8 rounded-2xl border border-gray-700">
          {/* User Type Toggle */}
          <div className="mb-8">
            <div className="flex bg-dark-bg rounded-lg p-1 border border-gray-600">
              {["student", "employer", "admin"].map((type) => (
                <button
                  key={type}
                  onClick={() => setUserType(type)}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${
                    userType === type ? "bg-dark-primary text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-dark-bg border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-dark-primary transition-colors"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-dark-bg border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-dark-primary transition-colors"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-dark-primary focus:ring-dark-primary border-gray-600 rounded bg-dark-bg"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm text-dark-primary hover:text-purple-400 transition-colors">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-dark-primary hover:bg-purple-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-dark-primary focus:ring-offset-2 focus:ring-offset-dark-surface"
            >
              Log In
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don't have an account?{" "}
              <a href="#" className="text-dark-primary hover:text-purple-400 font-medium transition-colors">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
