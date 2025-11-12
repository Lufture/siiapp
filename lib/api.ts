import axios from 'axios';
import type { LoginResponse, StudentDataResponse } from './types';

const api = axios.create({
  baseURL: '/api-sii',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>('/login', { email, password });
  return data;
};

export const getStudentData = async (): Promise<StudentDataResponse> => {
  const { data } = await api.get<StudentDataResponse>('/estudiante');
  return data;
};

export default api;
