// types/api.ts
// Definición de tipos para las respuestas de la API del SII ITC

// ============================================
// Login Types
// ============================================
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  responseCodeTxt: string;
  message: {
    login: {
      token: string;
    };
  };
  status: number;
  flag: string;
  data: number;
  type: string;
}

// ============================================
// Student Types
// ============================================
export interface StudentResponse {
  code: number;
  message: string;
  flag: boolean;
  data: StudentData;
}

export interface StudentData {
  numero_control: string;
  persona: string;
  email: string;
  semestre: number;
  num_mat_rep_no_acreditadas: string;
  creditos_acumulados: string;
  promedio_ponderado: string;
  promedio_aritmetico: string;
  materias_cursadas: string;
  materias_reprobadas: string;
  materias_aprobadas: string;
  creditos_complementarios: number;
  porcentaje_avance: number;
  num_materias_rep_primera: string | null;
  num_materias_rep_segunda: string | null;
  percentaje_avance_cursando: number;
  foto: string;
}

// ============================================
// Calificaciones Types
// ============================================
export interface CalificacionesResponse {
  code: number;
  message: string;
  flag: boolean;
  data: PeriodoCalificaciones[];
}

export interface PeriodoCalificaciones {
  periodo: Periodo;
  materias: MateriaConCalificaciones[];
}

export interface Periodo {
  clave_periodo: string;
  anio: number;
  descripcion_periodo: string;
}

export interface MateriaConCalificaciones {
  materia: MateriaInfo;
  calificaiones: Calificacion[];
}

export interface MateriaInfo {
  id_grupo: number;
  nombre_materia: string;
  clave_materia: string;
  letra_grupo: string;
}

export interface Calificacion {
  id_calificacion: number;
  numero_calificacion: number;
  calificacion: string | null;
}

// ============================================
// Kardex Types
// ============================================
export interface KardexResponse {
  code: number;
  message: string;
  flag: boolean;
  data: KardexData;
}

export interface KardexData {
  porcentaje_avance: number;
  kardex: MateriaKardex[];
}

export interface MateriaKardex {
  nombre_materia: string;
  clave_materia: string;
  periodo: string;
  creditos: string;
  calificacion: string;
  descripcion: string;
  semestre: number;
}

// ============================================
// Horario Types
// ============================================
export interface HorarioResponse {
  code: number;
  message: string;
  flag: boolean;
  data: PeriodoHorario[];
}

export interface PeriodoHorario {
  periodo: Periodo;
  horario: ClaseHorario[];
}

export interface ClaseHorario {
  id_grupo: number;
  letra_grupo: string;
  nombre_materia: string;
  clave_materia: string;
  clave_turno: string;
  nombre_plan: string;
  letra_nivel: string;
  lunes: string | null;
  lunes_clave_salon: string | null;
  martes: string | null;
  martes_clave_salon: string | null;
  miercoles: string | null;
  miercoles_clave_salon: string | null;
  jueves: string | null;
  jueves_clave_salon: string | null;
  viernes: string | null;
  viernes_clave_salon: string | null;
  sabado: string | null;
  sabado_clave_salon: string | null;
}

// ============================================
// Error Types
// ============================================
export interface ApiError {
  code: number;
  message: string;
  flag: boolean;
}

// ============================================
// Generic API Response
// ============================================
export interface ApiResponse<T> {
  code: number;
  message: string;
  flag: boolean;
  data: T;
}

// ============================================
// Utility Types
// ============================================
export type DayOfWeek = 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes' | 'sabado';

export interface DaySchedule {
  day: DayOfWeek;
  time: string | null;
  salon: string | null;
}