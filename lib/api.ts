import axios from 'axios';

// Ahora usamos el proxy interno de Next
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

export const loginUser = async (email: string, password: string) => {
  const { data } = await api.post('/login', { email, password });
  return data;
};

// otros endpoints
export const getStudentData = async () => (await api.get('/student')).data;
export const getGrades = async () => (await api.get('/grades')).data;
export const getKardex = async () => (await api.get('/kardex')).data;
export const getSchedule = async () => (await api.get('/schedule')).data;

export default api;
