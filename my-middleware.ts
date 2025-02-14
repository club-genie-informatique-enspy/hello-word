import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const userCookie = request.cookies.get('currentUser'); 

  if (!userCookie) {
    
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next(); 
}


export const config = {
  matcher: ['/dashboard/:path*','/admin/:path*'],
};