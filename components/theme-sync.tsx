"use client"

import { useTheme } from "next-themes"
import { useEffect } from "react"

export function ThemeSync() {
  const { theme } = useTheme()

  useEffect(() => {
    const isDark = theme === "dark"
    
    const updateInlineStyles = () => {
      // Get all elements with inline styles
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_ELEMENT,
        null
      )

      const elements: HTMLElement[] = []
      let node = walker.nextNode()
      while (node) {
        if (node instanceof HTMLElement && node.hasAttribute('style')) {
          elements.push(node)
        }
        node = walker.nextNode()
      }

      elements.forEach((element) => {
        const computedBg = window.getComputedStyle(element).backgroundColor
        const computedColor = window.getComputedStyle(element).color
        const styleBg = element.style.backgroundColor
        const styleColor = element.style.color
        const styleBackground = element.style.background

        if (isDark) {
          // Restore dark mode if we had overridden it
          if (element.dataset.themeOverridden === 'true') {
            element.removeAttribute('data-theme-overridden')
            // Remove our overrides - React will restore original styles on re-render
          }
        } else {
          // Light mode - override dark colors
          
          // Check if background is black or very dark
          if (styleBg && (styleBg.includes('#000') || styleBg.includes('rgb(0, 0, 0)'))) {
            element.style.setProperty('background-color', 'var(--page-bg)', 'important')
            element.dataset.themeOverridden = 'true'
          }
          
          // Check if background is a dark gradient
          if (styleBackground && styleBackground.includes('linear-gradient') && 
              (styleBackground.includes('#0a0a0a') || styleBackground.includes('#000000') || styleBackground.includes('#1a1a1a'))) {
            element.style.setProperty('background', 'linear-gradient(180deg, var(--page-bg-gradient-start) 0%, var(--page-bg-gradient-mid) 50%, var(--page-bg-gradient-end) 100%)', 'important')
            element.dataset.themeOverridden = 'true'
          }
          
          // Check if background is rgba(0,0,0,0.4) or similar dark overlay
          if (styleBg && styleBg.includes('rgba(0, 0, 0')) {
            element.style.setProperty('background-color', 'var(--section-bg-overlay)', 'important')
            element.dataset.themeOverridden = 'true'
          }
          
          // Check if text is white
          if (styleColor && (styleColor.includes('#fff') || styleColor.includes('rgb(255, 255, 255)'))) {
            element.style.setProperty('color', 'var(--text-primary)', 'important')
            element.dataset.themeOverridden = 'true'
          }
        }
      })
    }

    // Initial update
    const timeoutId = setTimeout(() => {
      updateInlineStyles()
    }, 100)

    // Watch for new elements
    const observer = new MutationObserver(() => {
      updateInlineStyles()
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style'],
    })

    return () => {
      clearTimeout(timeoutId)
      observer.disconnect()
    }
  }, [theme])

  return null
}

