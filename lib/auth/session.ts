// lib/auth/session.ts
// Manejo de sesión y tokens JWT

import { STORAGE_KEYS } from '@/lib/constants';
import type { StudentData } from '@/types/api';

/**
 * Guarda el token JWT en localStorage
 */
export function saveToken(token: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.TOKEN, token);
}

/**
 * Obtiene el token JWT de localStorage
 */
export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(STORAGE_KEYS.TOKEN);
}

/**
 * Elimina el token JWT de localStorage
 */
export function removeToken(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
}

/**
 * Guarda los datos del usuario en localStorage
 */
export function saveUser(user: StudentData): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
}

/**
 * Obtiene los datos del usuario de localStorage
 */
export function getUser(): StudentData | null {
  if (typeof window === 'undefined') return null;

  const userData = localStorage.getItem(STORAGE_KEYS.USER);
  if (!userData) return null;

  try {
    return JSON.parse(userData) as StudentData;
  } catch {
    return null;
  }
}

/**
 * Elimina los datos del usuario de localStorage
 */
export function removeUser(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEYS.USER);
}

/**
 * Verifica si el usuario está autenticado
 */
export function isAuthenticated(): boolean {
  return getToken() !== null;
}

/**
 * Cierra la sesión del usuario
 */
export function logout(): void {
  removeToken();
  removeUser();
}

/**
 * Decodifica un token JWT (simple, sin verificación)
 * NOTA: Esta función solo decodifica el payload, NO verifica la firma
 */
export function decodeToken(token: string): any   {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

/**
 * Verifica si el token ha expirado
 */
export function isTokenExpired(token: string): boolean {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return true;

  const now = Math.floor(Date.now() / 1000);
  return decoded.exp < now;
}

/**
 * Obtiene el tiempo restante del token en segundos
 */
export function getTokenRemainingTime(token: string): number {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return 0;

  const now = Math.floor(Date.now() / 1000);
  return Math.max(0, decoded.exp - now);
}

/**
 * Verifica la sesión actual
 */
export function checkSession(): boolean {
  const token = getToken();
  if (!token) return false;

  if (isTokenExpired(token)) {
    logout();
    return false;
  }

  return true;
}