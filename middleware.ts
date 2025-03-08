import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // For a real implementation, you would verify the JWT token here
  // For now, we'll just check if the user has a role in localStorage on the client side

  // Example of how you would protect routes in a real implementation:
  // const token = request.cookies.get('ocid_token')?.value
  // if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
  //   return NextResponse.redirect(new URL('/login', request.url))
  // }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/dashboard/:path*"],
}

