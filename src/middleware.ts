import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get('host') || '';

  // Detect admin subdomain (e.g. admin.housingmantra.in or admin.localhost:3000)
  const isAdminSubdomain = host.startsWith('admin.');

  if (isAdminSubdomain) {
    // If accessing the admin subdomain, rewrite requests to the /admin folder internally
    if (!url.pathname.startsWith('/admin')) {
      url.pathname = `/admin${url.pathname}`;
      return NextResponse.rewrite(url);
    }
  } else {
    // If on the main domain but trying to access /admin directly, redirect to the homepage
    if (url.pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

// Config to specify where this middleware should run
export const config = {
  matcher: [
    /*
     * Match all paths except:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. Static files (e.g. favicon.ico, images, stylesheets)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.svg|.*\\.webp|.*\\.gif).*)',
  ],
};
