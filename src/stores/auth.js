import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authService } from '@/services/api'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('auth_token') || null)
  const userType = ref(localStorage.getItem('user_type') || null)
  const isLoading = ref(false)
  const error = ref(null)

  const isAuthenticated = computed(() => !!token.value)

  async function login(email, password) {
    isLoading.value = true
    error.value = null

    try {
      const response = await authService.login(email, password)

      if (response.flag === 'success' && response.message?.login?.token) {
        token.value = response.message.login.token
        userType.value = response.type

        // Guardar en localStorage
        localStorage.setItem('auth_token', token.value)
        localStorage.setItem('user_type', userType.value)

        return { success: true }
      } else {
        throw new Error('Respuesta inválida del servidor')
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message ||
                          err.message ||
                          'Error al iniciar sesión'
      error.value = errorMessage
      return { success: false, error: errorMessage }
    } finally {
      isLoading.value = false
    }
  }

  function logout() {
    token.value = null
    userType.value = null
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user_type')
  }

  return {
    token,
    userType,
    isLoading,
    error,
    isAuthenticated,
    login,
    logout,
  }
})