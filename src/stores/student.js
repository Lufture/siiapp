import { defineStore } from 'pinia'
import { ref } from 'vue'
import { studentService } from '@/services/api'

export const useStudentStore = defineStore('student', () => {
  const studentInfo = ref(null)
  const calificaciones = ref([])
  const kardex = ref(null)
  const horarios = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  async function fetchStudentInfo() {
    isLoading.value = true
    error.value = null

    try {
      const response = await studentService.getInfo()
      if (response.flag) {
        studentInfo.value = response.data
      }
    } catch (err) {
      error.value = err.message || 'Error al cargar información del estudiante'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function fetchCalificaciones() {
    isLoading.value = true
    error.value = null

    try {
      const response = await studentService.getCalificaciones()
      if (response.flag) {
        calificaciones.value = response.data
      }
    } catch (err) {
      error.value = err.message || 'Error al cargar calificaciones'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function fetchKardex() {
    isLoading.value = true
    error.value = null

    try {
      const response = await studentService.getKardex()
      if (response.flag) {
        kardex.value = response.data
      }
    } catch (err) {
      error.value = err.message || 'Error al cargar kardex'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function fetchHorarios() {
    isLoading.value = true
    error.value = null

    try {
      const response = await studentService.getHorarios()
      if (response.flag) {
        horarios.value = response.data
      }
    } catch (err) {
      error.value = err.message || 'Error al cargar horarios'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  function clearData() {
    studentInfo.value = null
    calificaciones.value = []
    kardex.value = null
    horarios.value = []
  }

  return {
    studentInfo,
    calificaciones,
    kardex,
    horarios,
    isLoading,
    error,
    fetchStudentInfo,
    fetchCalificaciones,
    fetchKardex,
    fetchHorarios,
    clearData,
  }
})