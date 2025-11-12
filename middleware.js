import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Si está en login y tiene token, redirigir a dashboard
  if (pathname.startsWith('/login') && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Si está en dashboard y no tiene token, redirigir a login
  if (pathname.startsWith('/dashboard') && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};