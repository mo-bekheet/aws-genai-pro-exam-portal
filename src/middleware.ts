// Temporary no-op middleware to allow local development when Clerk authMiddleware
// export is not compatible with the current dependency version.
// Replace with Clerk's official authMiddleware when dependencies are aligned.
import { NextResponse } from 'next/server';

export function middleware() {
  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'],
};
