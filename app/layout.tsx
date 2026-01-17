import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ClerkProvider } from '@clerk/nextjs'
import SyncUserToSupabase from '../components/SyncUserToSupabase'
import { ClerkErrorBoundary } from '../components/ClerkErrorBoundary'
import { ThemeProvider } from '../components/theme-provider'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TekinPlant - Industry Training Portal",
  description: "Connect with leading companies, master cutting-edge technologies, and accelerate your professional growth with our comprehensive training programs.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Explicitly use production keys from environment variables
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  
  if (!publishableKey) {
    console.error('⚠️ NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is not set')
  } else if (publishableKey.startsWith('pk_live_')) {
    console.log('✅ Using Clerk Production Keys')
  } else if (publishableKey.startsWith('pk_test_')) {
    console.warn('⚠️ Using Clerk Development Keys - Switch to production keys for production mode')
  }

  // Only render ClerkProvider if we have a valid key
  if (!publishableKey) {
    return (
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className} suppressHydrationWarning>
          <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Configuration Error</h1>
              <p className="text-gray-400">NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is not set</p>
              <p className="text-sm text-gray-500 mt-2">Please check your .env.local file</p>
            </div>
          </div>
        </body>
      </html>
    )
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* CRITICAL: Theme script in <head> - Stack Overflow solution */}
        {/* Based on: https://stackoverflow.com/questions/62635314/how-to-stop-light-mode-flickering-to-darker-background-on-page-load */}
        <script
          id="theme-script"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // CRITICAL: Apply theme BEFORE body is parsed and displayed
                // This runs synchronously in <head> to prevent flash
                try {
                  // Check local storage first, then system preference
                  var savedTheme = localStorage.getItem('theme');
                  var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var theme;
                  
                  if (savedTheme === 'system' || !savedTheme) {
                    theme = prefersDark ? 'dark' : 'light';
                  } else {
                    theme = savedTheme; // 'dark' or 'light'
                  }
                  
                  // Apply class to <html> tag (document.documentElement) - Stack Overflow solution
                  // This is the key - apply BEFORE body is parsed and displayed
                  // Based on: https://stackoverflow.com/questions/62635314/how-to-stop-light-mode-flickering-to-darker-background-on-page-load
                  var html = document.documentElement;
                  html.classList.remove('dark', 'light');
                  html.classList.add(theme);
                  html.setAttribute('data-theme', theme);
                  html.setAttribute('data-theme-initialized', 'true');
                  
                  // Set background colors immediately to prevent flash
                  if (theme === 'dark') {
                    html.style.setProperty('background-color', '#000000', 'important');
                  } else {
                    html.style.setProperty('background-color', '#f5f1e8', 'important');
                  }
                } catch (e) {
                  // Fallback to dark theme on error
                  var html = document.documentElement;
                  html.classList.remove('dark', 'light');
                  html.classList.add('dark');
                  html.setAttribute('data-theme', 'dark');
                  html.style.setProperty('background-color', '#000000', 'important');
                }
                
                // Function to apply theme (for re-application on navigation)
                function applyTheme() {
                  try {
                    // Check local storage first, then system preference
                    var savedTheme = localStorage.getItem('theme');
                    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                    var theme;
                    
                    if (savedTheme === 'system' || !savedTheme) {
                      theme = prefersDark ? 'dark' : 'light';
                    } else {
                      theme = savedTheme; // 'dark' or 'light'
                    }
                    
                    // Apply the theme to the document element IMMEDIATELY and SYNCHRONOUSLY
                    // This must happen before any rendering to prevent flash
                    var html = document.documentElement;
                    
                    // Remove any existing theme classes first
                    html.classList.remove('dark', 'light');
                    
                    // Set data-theme attribute
                    html.setAttribute('data-theme', theme);
                    
                    // Set className (this is what next-themes uses)
                    html.className = theme;
                    
                    // Set background colors immediately to prevent flash
                    if (theme === 'dark') {
                      html.style.setProperty('background-color', '#000000', 'important');
                    } else {
                      html.style.setProperty('background-color', '#f5f1e8', 'important');
                    }
                    
                    // Mark theme as initialized IMMEDIATELY
                    html.setAttribute('data-theme-initialized', 'true');
                  
                  // Apply body class and background color when body is available
                  function applyBodyClass() {
                    var body = document.body;
                    if (body) {
                      // Remove both classes first to avoid conflicts
                      body.classList.remove('darkbody', 'lightbody');
                      // Add the appropriate class based on theme
                      if (theme === 'dark') {
                        body.classList.add('darkbody');
                        // Set background color inline immediately to prevent flash
                        body.style.setProperty('background', 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)', 'important');
                        body.style.setProperty('color', '#ffffff', 'important');
                      } else {
                        body.classList.add('lightbody');
                        // Set background color inline immediately to prevent flash
                        body.style.setProperty('background', 'linear-gradient(135deg, #f5f1e8 0%, #e8ddd4 50%, #d4c4b0 100%)', 'important');
                        body.style.setProperty('color', '#3a2e1f', 'important');
                      }
                      // Disable transitions during initialization to prevent flash
                      body.style.setProperty('transition', 'none', 'important');
                      
                      // Theme applied - body is already visible
                      
                      // Re-enable transitions after a short delay
                      setTimeout(function() {
                        body.style.removeProperty('transition');
                      }, 100);
                    }
                  }
                  
                  // Try to apply immediately if body exists
                  if (document.body) {
                    applyBodyClass();
                  } else {
                    // Use MutationObserver to catch body when it's added
                    var observer = new MutationObserver(function(mutations) {
                      if (document.body) {
                        applyBodyClass();
                        observer.disconnect();
                      }
                    });
                    observer.observe(document.documentElement, { childList: true, subtree: true });
                  }
                  
                  // Theme applied successfully
                } catch (e) {
                  // Fallback to dark theme on error
                  var html = document.documentElement;
                  html.classList.remove('dark', 'light');
                  html.className = 'dark';
                  html.setAttribute('data-theme', 'dark');
                  html.setAttribute('data-theme-initialized', 'true');
                  html.style.setProperty('background-color', '#000000', 'important');
                  // Apply body class and background if body exists
                  if (document.body) {
                    document.body.classList.remove('lightbody');
                    document.body.classList.add('darkbody');
                    document.body.style.setProperty('background', 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)', 'important');
                    document.body.style.setProperty('color', '#ffffff', 'important');
                    document.body.style.setProperty('transition', 'none', 'important');
                    // Body is already visible
                  }
                }
                
                // Call applyTheme immediately on page load
                applyTheme();
                
                // Handle browser back/forward navigation (bfcache) - Stack Overflow solution
                // pageshow event fires when page is restored from cache
                if (typeof window !== 'undefined') {
                  window.addEventListener('pageshow', function(event) {
                    // event.persisted is true when page is loaded from cache (back/forward navigation)
                    if (event.persisted) {
                      // Re-apply theme immediately for cached pages
                      applyTheme();
                    }
                  });
                  
                  // Also handle popstate (back/forward button)
                  window.addEventListener('popstate', function() {
                    // Small delay to ensure DOM is ready
                    setTimeout(function() {
                      applyTheme();
                    }, 0);
                  });
                }
              })();
            `,
          }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              /* Default: wait for theme script to set theme before showing anything */
              html:not([data-theme]) { 
                background-color: #000000 !important; 
              }
              /* Dark theme */
              html[data-theme="dark"],
              html.dark { 
                background-color: #000000 !important; 
              }
              /* Light theme */
              html[data-theme="light"],
              html.light { 
                background-color: #f5f1e8 !important; 
              }
              /* Default body styles - wait for theme initialization */
              body:not([class*="body"]) { 
                background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%) !important;
                color: #ffffff !important;
                transition: none !important;
              }
              /* Light mode via data-theme attribute */
              html[data-theme="light"] body,
              html.light body {
                background: linear-gradient(135deg, #f5f1e8 0%, #e8ddd4 50%, #d4c4b0 100%) !important;
                color: #3a2e1f !important;
              }
              /* Light mode via body class (CSS-based, preferred) */
              body.lightbody {
                background: linear-gradient(135deg, #f5f1e8 0%, #e8ddd4 50%, #d4c4b0 100%) !important;
                color: #3a2e1f !important;
              }
              /* Dark mode via body class (CSS-based, preferred) */
              body.darkbody {
                background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%) !important;
                color: #ffffff !important;
              }
              /* Re-enable transitions after initialization */
              html[data-theme-initialized] body {
                transition: background-color 0.3s ease, color 0.3s ease, background 0.3s ease !important;
              }
            `,
          }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ClerkErrorBoundary>
          <ClerkProvider
            publishableKey={publishableKey}
            domain={typeof window !== 'undefined' ? window.location.hostname : undefined}
          >
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
              storageKey="theme"
              enableColorScheme={false}
            >
              <SyncUserToSupabase />
              <Toaster 
                position="top-right"
                richColors
                closeButton
                toastOptions={{
                  classNames: {
                    toast: 'theme-toast',
                    title: 'theme-toast-title',
                    description: 'theme-toast-description',
                    success: 'theme-toast-success',
                    error: 'theme-toast-error',
                    info: 'theme-toast-info',
                    warning: 'theme-toast-warning',
                  },
                }}
              />
              {children}
            </ThemeProvider>
          </ClerkProvider>
        </ClerkErrorBoundary>
      </body>
    </html>
  )
}

