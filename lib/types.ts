export interface LoginResponse {
  responseCodeTxt: string;
  message: { login: { token: string } };
  status: number;
  flag: string;
  type: string;
}

export interface StudentData {
  numero_control: string;
  persona: string;
  email: string;
  semestre: number;
  creditos_acumulados: string;
  promedio_ponderado: string;
  porcentaje_avance: number;
  foto: string;
}
