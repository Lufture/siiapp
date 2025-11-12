export interface LoginResponse {
  responseCodeTxt: string;
  message: { login: { token: string } };
  status: number;
  flag: string;
  type: string;
}

export interface StudentDataResponse {
  code: number;
  message: string;
  flag: boolean;
  data: Student;
}

export interface Student {
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
  num_materias_rep_primera: number | null;
  num_materias_rep_segunda: number | null;
  percentaje_avance_cursando: number;
  foto?: string;
}
