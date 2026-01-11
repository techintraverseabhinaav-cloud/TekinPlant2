"use client"

import { useTheme } from "next-themes"
import { useMemo, useState, useEffect } from "react"

export function useThemeStyles() {
  const [mounted, setMounted] = useState(false)
  const { theme, resolvedTheme, systemTheme } = useTheme()
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // During SSR, default to dark to match server render
  // After mount, use resolvedTheme which gives the actual theme
  const currentTheme = mounted ? (resolvedTheme || systemTheme || theme || 'dark') : 'dark'
  const isDark = currentTheme === "dark"

  return useMemo(() => {
    if (isDark) {
      return {
        pageBg: '#000000',
        pageBgGradient: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 50%, #000000 100%)',
        sectionBgOverlay: 'rgba(0,0,0,0.4)',
        textPrimary: '#ffffff',
        textSecondary: 'rgba(255,255,255,0.7)',
        cardBg: 'rgba(0,0,0,0.4)',
        selectBg: '#0a0a0a',
        buttonGradient: 'linear-gradient(to right, #7c3aed, #8b5cf6, #7c3aed)',
        buttonShadow: '0 0 20px rgba(124,58,237,0.4), 0 0 40px rgba(124,58,237,0.2)',
        buttonShadowHover: '0 0 25px rgba(124,58,237,0.6), 0 0 50px rgba(124,58,237,0.4)',
      }
    } else {
      return {
        pageBg: '#f0f4f8',
        pageBgGradient: 'linear-gradient(180deg, #f0f4f8 0%, #e2e8f0 50%, #cbd5e1 100%)',
        sectionBgOverlay: 'rgba(255,255,255,0.6)',
        textPrimary: '#1e293b',
        textSecondary: 'rgba(30, 41, 59, 0.7)',
        cardBg: 'rgba(255,255,255,0.7)',
        selectBg: '#ffffff',
        buttonGradient: 'linear-gradient(to right, #7c3aed, #8b5cf6, #7c3aed)',
        buttonShadow: '0 0 20px rgba(124,58,237,0.4), 0 0 40px rgba(124,58,237,0.2)',
        buttonShadowHover: '0 0 25px rgba(124,58,237,0.6), 0 0 50px rgba(124,58,237,0.4)',
      }
    }
  }, [isDark, mounted, currentTheme])
}

