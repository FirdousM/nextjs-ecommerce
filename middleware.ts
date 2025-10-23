// middleware.js or middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt'; // If using NextAuth.js

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET }); // Or your custom auth check
  const url = req.nextUrl.clone();

  // If the user is logged in and trying to access the login or signup page
  if (token && (url.pathname.startsWith('/login') || url.pathname.startsWith('/signup'))) {
    url.pathname = '/products'; // Redirect to a protected route
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/signup'], // Apply middleware to the login and signup pages
};