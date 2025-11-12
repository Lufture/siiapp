import axios from 'axios'
import router from '@/router'

// En desarrollo usa el proxy de Vite, en producción usa la URL completa
const API_BASE_URL = import.meta.env.DEV
  ? '/api'  // Proxy de Vite
  : 'https://cetech.roque.tecnm.mx/api'  // Producción

// Crear instancia de axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para agregar el token a todas las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token inválido o expirado
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user_type')
      router.push('/login')
    }
    return Promise.reject(error)
  }
)

// Servicios de autenticación
export const authService = {
  async login(email, password) {
    const response = await api.post('/login', { email, password })
    return response.data
  },
}

// Servicios del estudiante
export const studentService = {
  async getInfo() {
    const response = await api.get('/movil/estudiante')
    // La foto viene en base64 en el campo 'foto'
    return response.data
  },

  async getCalificaciones() {
    const response = await api.get('/movil/estudiante/calificaciones')
    return response.data
  },

  async getKardex() {
    const response = await api.get('/movil/estudiante/kardex')
    return response.data
  },

  async getHorarios() {
    const response = await api.get('/movil/estudiante/horarios')
    return response.data
  },
}

export default api