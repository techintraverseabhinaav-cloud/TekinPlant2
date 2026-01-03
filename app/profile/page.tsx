"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useUser, useClerk } from "@clerk/nextjs"
import { useTheme } from "next-themes"
import { useThemeStyles } from "../../lib/theme-styles"
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Shield, 
  Save,
  Camera,
  Edit2,
  X,
  Sun,
  Moon,
  Monitor
} from "lucide-react"

export default function ProfilePage() {
  const { user, isLoaded } = useUser()
  const { signOut } = useClerk()
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploadingImage, setIsUploadingImage] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: ""
  })

  // Handle theme mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isLoaded && user && !isEditing) {
      // Only update formData when not editing to avoid overwriting user input
      // This ensures we use the latest values from Clerk
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.emailAddresses[0]?.emailAddress || "",
        role: (user.publicMetadata?.role as string) || "student"
      })
    }
  }, [isLoaded, user, isEditing])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = async () => {
    if (!user) return
    
    // Capture current form values BEFORE any updates
    const currentFirstName = formData.firstName
    const currentLastName = formData.lastName
    
    console.log('💾 Saving profile with values:', {
      firstName: currentFirstName,
      lastName: currentLastName
    })
    
    setIsSaving(true)
    try {
      // Update Clerk user data
      await user.update({
        firstName: currentFirstName,
        lastName: currentLastName,
      })
      
      // Wait a moment for Clerk to update internally
      await new Promise(resolve => setTimeout(resolve, 100))
      
      // Sync to Supabase using the CAPTURED values (not formData which might be stale)
      console.log('🔄 Syncing profile to Supabase...', {
        firstName: currentFirstName,
        lastName: currentLastName
      })
      
      try {
        const response = await fetch('/api/update-profile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: currentFirstName,
            lastName: currentLastName,
          }),
        })

        console.log('📡 API Response status:', response.status)

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          console.error('❌ Failed to sync to Supabase:', errorData)
          console.error('❌ Response status:', response.status)
          console.error('❌ Full error:', JSON.stringify(errorData, null, 2))
          
          // Show error to user
          alert(`Profile updated in Clerk, but failed to sync to Supabase: ${errorData.error || 'Unknown error'}. Check console for details.`)
        } else {
          const result = await response.json()
          console.log('✅ Profile synced to Supabase:', result)
          console.log('✅ Updated profile:', result.profile)
        }
      } catch (syncError: any) {
        console.error('❌ Error syncing to Supabase:', syncError)
        console.error('❌ Error message:', syncError?.message)
        console.error('❌ Error stack:', syncError?.stack)
        
        // Show error to user
        alert(`Profile updated in Clerk, but failed to sync to Supabase: ${syncError?.message || 'Network error'}. Check console for details.`)
      }
      
      // Note: Email changes typically require verification in Clerk
      // Role changes should be restricted to admins
      
      // Close editing mode first
      setIsEditing(false)
      
      // Update formData with the saved values to ensure UI shows correct data
      // This prevents the useEffect from overwriting with stale user data
      setFormData(prev => ({
        ...prev,
        firstName: currentFirstName,
        lastName: currentLastName,
      }))
      
      alert("Profile updated successfully!")
    } catch (error: any) {
      console.error("Error updating profile:", error)
      alert("Failed to update profile. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.emailAddresses[0]?.emailAddress || "",
        role: (user.publicMetadata?.role as string) || "student"
      })
    }
    setIsEditing(false)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user || !e.target.files || !e.target.files[0]) return
    
    const file = e.target.files[0]
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB')
      return
    }
    
    setIsUploadingImage(true)
    try {
      // Upload image to Clerk
      await user.setProfileImage({ file })
      
      // Wait for Clerk to process the image
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Sync avatar URL to Supabase
      if (user.imageUrl) {
        const response = await fetch('/api/update-profile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            avatarUrl: user.imageUrl,
          }),
        })
        
        if (!response.ok) {
          console.error('Failed to sync avatar to Supabase')
        } else {
          console.log('Avatar synced to Supabase')
        }
      }
      
      alert('Profile image updated successfully!')
    } catch (error: any) {
      console.error('Error uploading image:', error)
      alert('Failed to upload image. Please try again.')
    } finally {
      setIsUploadingImage(false)
      // Reset file input
      e.target.value = ''
    }
  }

  const isDark = theme === 'dark'
  const themeStyles = useThemeStyles()

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: themeStyles.pageBg }}>
        <div style={{ color: themeStyles.textPrimary }} className="text-xl">Loading...</div>
      </div>
    )
  }

  if (!user) {
    router.push("/login")
    return null
  }

  const userRole = (user.publicMetadata?.role as string) || "student"
  const userName = user.fullName || user.firstName || "User"

  return (
    <div className="min-h-screen" style={{ backgroundColor: themeStyles.pageBg, color: themeStyles.textPrimary }}>
      {/* Header */}
      <header className="border-b" style={{ 
        backgroundColor: themeStyles.cardBg,
        borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(139,90,43,0.2)'
      }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link 
                href="/"
                className={`flex items-center space-x-2 px-3 py-2 transition-colors rounded-lg ${
                  isDark ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-amber-900/70 hover:text-amber-900 hover:bg-amber-900/10'
                }`}
              >
                <ArrowLeft size={18} />
                <span className="text-sm font-medium">Back to Home</span>
              </Link>
              <div className="h-6 w-px" style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(139,90,43,0.3)' }}></div>
              <h1 className="text-xl font-semibold" style={{ color: themeStyles.textPrimary }}>Profile Settings</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="rounded-xl p-8 border mb-6" style={{ 
          backgroundColor: themeStyles.cardBg,
          borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(139,90,43,0.2)'
        }}>
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                {user.imageUrl ? (
                  <img 
                    src={user.imageUrl} 
                    alt={userName}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : (
                  <span className="text-white text-3xl font-bold">
                    {userName.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              {isEditing && (
                <label className="absolute bottom-0 right-0 p-2 bg-purple-600 rounded-full hover:bg-purple-700 transition-colors cursor-pointer">
                  <Camera size={16} className="text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUploadingImage}
                    className="hidden"
                  />
                </label>
              )}
              {isUploadingImage && (
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                  <div className="text-white text-xs">Uploading...</div>
                </div>
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-1" style={{ color: themeStyles.textPrimary }}>{userName}</h2>
              <p className="mb-2" style={{ color: themeStyles.textSecondary }}>{formData.email}</p>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                userRole === 'admin' ? (isDark ? 'bg-red-900/30 text-red-300' : 'bg-red-200 text-red-800') :
                userRole === 'trainer' ? (isDark ? 'bg-green-900/30 text-green-300' : 'bg-green-200 text-green-800') :
                userRole === 'corporate' ? (isDark ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-200 text-blue-800') :
                (isDark ? 'bg-purple-900/30 text-purple-300' : 'bg-purple-200 text-purple-800')
              }`}>
                {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
              </span>
            </div>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
              >
                <Edit2 size={18} />
                <span>Edit Profile</span>
              </button>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors disabled:opacity-50"
                >
                  <Save size={18} />
                  <span>{isSaving ? "Saving..." : "Save"}</span>
                </button>
                <button
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors disabled:opacity-50"
                >
                  <X size={18} />
                  <span>Cancel</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Profile Details */}
        <div className="rounded-xl p-6 border" style={{ 
          backgroundColor: themeStyles.cardBg,
          borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(139,90,43,0.2)'
        }}>
          <h3 className="text-xl font-semibold mb-6" style={{ color: themeStyles.textPrimary }}>Personal Information</h3>
          
          <div className="space-y-6">
            {/* First Name */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-400' : 'text-amber-900/70'}`}>
                First Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-purple-500' 
                      : 'bg-white border-amber-900/20 text-amber-900 focus:border-amber-800'
                  }`}
                  placeholder="Enter first name"
                />
              ) : (
                <p style={{ color: themeStyles.textPrimary }}>{formData.firstName || "Not set"}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-400' : 'text-amber-900/70'}`}>
                Last Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-purple-500' 
                      : 'bg-white border-amber-900/20 text-amber-900 focus:border-amber-800'
                  }`}
                  placeholder="Enter last name"
                />
              ) : (
                <p style={{ color: themeStyles.textPrimary }}>{formData.lastName || "Not set"}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className={`block text-sm font-medium mb-2 flex items-center ${isDark ? 'text-gray-400' : 'text-amber-900/70'}`}>
                <Mail size={16} className="mr-2" />
                Email Address
              </label>
              <p style={{ color: themeStyles.textPrimary }}>{formData.email}</p>
              <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-amber-900/60'}`}>
                Email changes require verification. Contact support to change your email.
              </p>
            </div>

            {/* Role */}
            <div>
              <label className={`block text-sm font-medium mb-2 flex items-center ${isDark ? 'text-gray-400' : 'text-amber-900/70'}`}>
                <Shield size={16} className="mr-2" />
                Account Role
              </label>
              <p className="capitalize" style={{ color: themeStyles.textPrimary }}>{formData.role}</p>
              <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-amber-900/60'}`}>
                Role cannot be changed from this page. Contact an administrator for role changes.
              </p>
            </div>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="rounded-xl p-6 border mt-6" style={{ 
          backgroundColor: themeStyles.cardBg,
          borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(139,90,43,0.2)'
        }}>
          <h3 className="text-xl font-semibold mb-6" style={{ color: themeStyles.textPrimary }}>Appearance</h3>
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-3 ${isDark ? 'text-gray-400' : 'text-amber-900/70'}`}>
                Theme Preference
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setTheme('light')}
                  className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${
                    theme === 'light'
                      ? (isDark ? 'border-purple-500 bg-purple-500/10' : 'border-amber-700 bg-amber-700/20')
                      : (isDark ? 'border-gray-600 hover:border-gray-500 bg-gray-700/50' : 'border-amber-900/30 hover:border-amber-800/50 bg-white/50')
                  }`}
                >
                  <Sun size={24} className={`mb-2 ${theme === 'light' ? (isDark ? 'text-purple-400' : 'text-amber-800') : (isDark ? 'text-gray-400' : 'text-amber-900/60')}`} />
                  <span className={`text-sm font-medium ${theme === 'light' ? (isDark ? 'text-purple-300' : 'text-amber-900') : (isDark ? 'text-gray-400' : 'text-amber-900/70')}`}>
                    Light
                  </span>
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${
                    theme === 'dark'
                      ? (isDark ? 'border-purple-500 bg-purple-500/10' : 'border-amber-700 bg-amber-700/20')
                      : (isDark ? 'border-gray-600 hover:border-gray-500 bg-gray-700/50' : 'border-amber-900/30 hover:border-amber-800/50 bg-white/50')
                  }`}
                >
                  <Moon size={24} className={`mb-2 ${theme === 'dark' ? (isDark ? 'text-purple-400' : 'text-amber-800') : (isDark ? 'text-gray-400' : 'text-amber-900/60')}`} />
                  <span className={`text-sm font-medium ${theme === 'dark' ? (isDark ? 'text-purple-300' : 'text-amber-900') : (isDark ? 'text-gray-400' : 'text-amber-900/70')}`}>
                    Dark
                  </span>
                </button>
                <button
                  onClick={() => setTheme('system')}
                  className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${
                    theme === 'system'
                      ? (isDark ? 'border-purple-500 bg-purple-500/10' : 'border-amber-700 bg-amber-700/20')
                      : (isDark ? 'border-gray-600 hover:border-gray-500 bg-gray-700/50' : 'border-amber-900/30 hover:border-amber-800/50 bg-white/50')
                  }`}
                >
                  <Monitor size={24} className={`mb-2 ${theme === 'system' ? (isDark ? 'text-purple-400' : 'text-amber-800') : (isDark ? 'text-gray-400' : 'text-amber-900/60')}`} />
                  <span className={`text-sm font-medium ${theme === 'system' ? (isDark ? 'text-purple-300' : 'text-amber-900') : (isDark ? 'text-gray-400' : 'text-amber-900/70')}`}>
                    System
                  </span>
                </button>
              </div>
              <p className={`text-xs mt-3 ${isDark ? 'text-gray-500' : 'text-amber-900/60'}`}>
                {mounted && (
                  <>
                    {theme === 'system' 
                      ? 'Theme will match your system preferences'
                      : theme === 'dark'
                      ? 'Dark mode is currently active'
                      : 'Light mode is currently active'
                    }
                  </>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Account Actions */}
        <div className="rounded-xl p-6 border mt-6" style={{ 
          backgroundColor: themeStyles.cardBg,
          borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(139,90,43,0.2)'
        }}>
          <h3 className="text-xl font-semibold mb-6" style={{ color: themeStyles.textPrimary }}>Account Actions</h3>
          <div className="space-y-4">
            <Link
              href={userRole === 'admin' ? '/admin-dashboard' : '/student-dashboard'}
              className="block px-4 py-3 rounded-lg transition-colors text-center text-white"
              style={{ 
                background: themeStyles.buttonGradient,
                boxShadow: themeStyles.buttonShadow
              }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = themeStyles.buttonShadowHover}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = themeStyles.buttonShadow}
            >
              Go to Dashboard
            </Link>
            <button
              onClick={async () => {
                await signOut()
                router.push("/")
              }}
              className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors text-center text-white"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

