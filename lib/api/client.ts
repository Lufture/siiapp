// lib/api/client.ts
// Cliente HTTP para interactuar con la API del SII ITC

import { API_BASE_URL, API_ENDPOINTS, ERROR_MESSAGES } from '@/lib/constants';
import type {
  LoginRequest,
  LoginResponse,
  StudentResponse,
  CalificacionesResponse,
  KardexResponse,
  HorarioResponse,
} from '@/types/api';

class ApiClient {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  /**
   * Método genérico para realizar peticiones HTTP
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);

      // Si la respuesta no es OK, lanzar error
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.message || ERROR_MESSAGES.SERVER_ERROR
        );
      }

      const data = await response.json();
      return data as T;
    } catch (error) {
      if (error instanceof TypeError) {
        throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
      }
      throw error;
    }
  }

  /**
   * Autenticación - Login
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await this.request<LoginResponse>(
        API_ENDPOINTS.LOGIN,
        {
          method: 'POST',
          body: JSON.stringify(credentials),
        }
      );

      if (response.flag !== 'success' || !response.message?.login?.token) {
        throw new Error(ERROR_MESSAGES.INVALID_CREDENTIALS);
      }

      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(ERROR_MESSAGES.GENERIC_ERROR);
    }
  }

  /**
   * Obtener información del estudiante
   */
  async getStudent(token: string): Promise<StudentResponse> {
    try {
      const response = await this.request<StudentResponse>(
        API_ENDPOINTS.STUDENT,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.flag) {
        throw new Error(ERROR_MESSAGES.INVALID_TOKEN);
      }

      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(ERROR_MESSAGES.GENERIC_ERROR);
    }
  }

  /**
   * Obtener calificaciones del estudiante
   */
  async getCalificaciones(token: string): Promise<CalificacionesResponse> {
    try {
      const response = await this.request<CalificacionesResponse>(
        API_ENDPOINTS.CALIFICACIONES,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.flag) {
        throw new Error(ERROR_MESSAGES.INVALID_TOKEN);
      }

      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(ERROR_MESSAGES.GENERIC_ERROR);
    }
  }

  /**
   * Obtener kardex del estudiante
   */
  async getKardex(token: string): Promise<KardexResponse> {
    try {
      const response = await this.request<KardexResponse>(
        API_ENDPOINTS.KARDEX,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.flag) {
        throw new Error(ERROR_MESSAGES.INVALID_TOKEN);
      }

      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(ERROR_MESSAGES.GENERIC_ERROR);
    }
  }

  /**
   * Obtener horario del estudiante
   */
  async getHorario(token: string): Promise<HorarioResponse> {
    try {
      const response = await this.request<HorarioResponse>(
        API_ENDPOINTS.HORARIOS,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.flag) {
        throw new Error(ERROR_MESSAGES.INVALID_TOKEN);
      }

      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(ERROR_MESSAGES.GENERIC_ERROR);
    }
  }
}

// Exportar una instancia única del cliente
export const apiClient = new ApiClient();