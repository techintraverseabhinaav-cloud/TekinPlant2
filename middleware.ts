import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  '/',
  '/login(.*)',
  '/sign-up(.*)',
  '/admin(.*)',
  '/trainer(.*)',
  '/corporate(.*)',
  '/redirect-dashboard',
  '/courses(.*)',
  '/about',
  '/contact',
  '/partners(.*)',
  '/api/webhooks(.*)',
  '/api/sync-user',
  '/api/get-user-role',
  '/api/test',
  '/api/courses(.*)',
  '/api/enrollments',
  '/debug-sync',
])

export default clerkMiddleware(async (auth, request) => {
  const pathname = request.nextUrl.pathname
  
  // Skip static assets and Next.js internals
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.match(/\.(js|css|png|jpg|jpeg|svg|ico|woff|woff2|ttf|eot)$/)
  ) {
    return
  }
  
  // CRITICAL: For ALL API routes, we MUST call auth() to ensure Clerk middleware is detected
  // This must happen BEFORE the route handler executes
  if (pathname.startsWith('/api/')) {
    // Call auth() for all API routes - this is what allows auth() to work in API handlers
    // This call MUST happen for Clerk to detect the middleware
    await auth()
    
    // For protected API routes (not in public routes), verify authentication
    if (!isPublicRoute(request)) {
      await auth.protect()
    }
    
    // IMPORTANT: Don't return early - let the request continue naturally
    // The auth() call above ensures Clerk knows middleware processed this route
    return
  }
  
  // Protect non-public page routes
  if (!isPublicRoute(request)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    // Match all routes except static files and Next.js internals
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf|eot)).*)',
    // Explicitly include all API routes to ensure they're processed
    '/api/:path*',
  ],
}

