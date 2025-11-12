// lib/constants.ts
// Constantes utilizadas en toda la aplicación

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://cetech.roque.tecnm.mx/api';

export const API_ENDPOINTS = {
  LOGIN: '/login',
  STUDENT: '/movil/estudiante',
  CALIFICACIONES: '/movil/estudiante/calificaciones',
  KARDEX: '/movil/estudiante/kardex',
  HORARIOS: '/movil/estudiante/horarios',
} as const;

export const STORAGE_KEYS = {
  TOKEN: 'sii_token',
  USER: 'sii_user',
} as const;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  CALIFICACIONES: '/dashboard/calificaciones',
  KARDEX: '/dashboard/kardex',
  HORARIO: '/dashboard/horario',
} as const;

// Mapeo de días de la semana
export const DAYS_MAP = {
  lunes: 'Lunes',
  martes: 'Martes',
  miercoles: 'Miércoles',
  jueves: 'Jueves',
  viernes: 'Viernes',
  sabado: 'Sábado',
} as const;

// Colores para calificaciones
export const GRADE_COLORS = {
  EXCELENTE: 'text-green-600 bg-green-50 border-green-200', // 90-100
  BIEN: 'text-blue-600 bg-blue-50 border-blue-200', // 80-89
  REGULAR: 'text-yellow-600 bg-yellow-50 border-yellow-200', // 70-79
  REPROBADO: 'text-red-600 bg-red-50 border-red-200', // < 70
  PENDIENTE: 'text-gray-600 bg-gray-50 border-gray-200', // null
  ACREDITADO: 'text-purple-600 bg-purple-50 border-purple-200', // AC
} as const;

// Función helper para obtener el color según la calificación
export const getGradeColor = (calificacion: string | null): string => {
  if (!calificacion) return GRADE_COLORS.PENDIENTE;
  if (calificacion === 'AC') return GRADE_COLORS.ACREDITADO;

  const grade = parseInt(calificacion);
  if (isNaN(grade)) return GRADE_COLORS.PENDIENTE;

  if (grade >= 90) return GRADE_COLORS.EXCELENTE;
  if (grade >= 80) return GRADE_COLORS.BIEN;
  if (grade >= 70) return GRADE_COLORS.REGULAR;
  return GRADE_COLORS.REPROBADO;
};

// Configuración de la aplicación
export const APP_CONFIG = {
  NAME: 'SII ITC',
  DESCRIPTION: 'Sistema de Información Institucional - Instituto Tecnológico de Celaya',
  TOKEN_EXPIRY: 3600, // 1 hora en segundos
} as const;

// Mensajes de error comunes
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Error de conexión. Verifica tu conexión a internet.',
  UNAUTHORIZED: 'Sesión expirada. Por favor, inicia sesión nuevamente.',
  INVALID_CREDENTIALS: 'Correo o contraseña incorrectos.',
  SERVER_ERROR: 'Error en el servidor. Inténtalo más tarde.',
  INVALID_TOKEN: 'Token inválido. Por favor, inicia sesión nuevamente.',
  GENERIC_ERROR: 'Ha ocurrido un error. Por favor, inténtalo nuevamente.',
} as const;