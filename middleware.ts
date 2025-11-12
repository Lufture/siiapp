// middleware.ts
// Middleware para proteger rutas y validar autenticación

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rutas públicas que no requieren autenticación
const publicRoutes = ['/', '/login'];

// Rutas protegidas que requieren autenticación
const protectedRoutes = ['/dashboard'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Obtener token de las cookies o headers
  const token = request.cookies.get('sii_token')?.value;

  // Verificar si la ruta actual es protegida
  const isProtectedRoute = protectedRoutes.some(route =>
    pathname.startsWith(route)
  );

  // Verificar si la ruta actual es pública
  const isPublicRoute = publicRoutes.includes(pathname);

  // Si es una ruta protegida y no hay token, redirigir a login
  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Si está en login y ya tiene token, redirigir a dashboard
  if (pathname === '/login' && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Si está en la raíz y tiene token, redirigir a dashboard
  if (pathname === '/' && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// Configurar las rutas que deben pasar por el middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};