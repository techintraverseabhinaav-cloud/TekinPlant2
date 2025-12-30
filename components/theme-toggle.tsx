"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button
        className="p-2 rounded-xl transition-all duration-300"
        style={{ backgroundColor: 'transparent' }}
        aria-label="Toggle theme"
      >
        <Sun size={20} className="text-white/70 dark:text-white/70 light:text-amber-900/70" />
      </button>
    )
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-xl transition-all duration-300 relative group"
      style={{ backgroundColor: 'transparent' }}
      onMouseEnter={(e) => {
        if (theme === "dark") {
          e.currentTarget.style.backgroundColor = 'rgba(168,85,247,0.1)'
        } else {
          e.currentTarget.style.backgroundColor = 'rgba(139, 90, 43, 0.1)'
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent'
      }}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun size={20} className="text-white/70 group-hover:text-white transition-colors" />
      ) : (
        <Moon size={20} className="text-amber-900/70 group-hover:text-amber-900 transition-colors" />
      )}
    </button>
  )
}

