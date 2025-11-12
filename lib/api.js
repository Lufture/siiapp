import { getToken, removeToken } from './auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

const handleResponse = async (response) => {
  if (!response.ok) {
    if (response.status === 401) {
      removeToken();
      window.location.href = '/login';
    }
    const error = await response.json().catch(() => ({ message: 'Error en la solicitud' }));
    throw new ApiError(error.message || 'Error en la solicitud', response.status);
  }
  return response.json();
};

export const api = {
  login: async (email, password) => {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    return handleResponse(response);
  },

  getEstudiante: async () => {
    const token = getToken();
    const response = await fetch(`${API_URL}/movil/estudiante`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  },

  getCalificaciones: async () => {
    const token = getToken();
    const response = await fetch(`${API_URL}/movil/estudiante/calificaciones`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  },

  getKardex: async () => {
    const token = getToken();
    const response = await fetch(`${API_URL}/movil/estudiante/kardex`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  },

  getHorarios: async () => {
    const token = getToken();
    const response = await fetch(`${API_URL}/movil/estudiante/horarios`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  },
};