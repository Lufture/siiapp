<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h2 class="text-2xl font-bold text-neutral-900 dark:text-white">Calificaciones</h2>
        <p class="text-neutral-600 dark:text-neutral-400 mt-1">
          Consulta tus calificaciones del periodo actual
        </p>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="studentStore.isLoading && !studentStore.calificaciones.length" class="flex items-center justify-center py-12">
      <Loader2 class="w-8 h-8 animate-spin text-primary-600" />
    </div>

    <template v-else-if="studentStore.calificaciones.length > 0">
      <!-- Search and Filter -->
      <div class="card p-4">
        <div class="relative">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Buscar materia por nombre o clave..."
            class="input-field pl-10"
          />
        </div>
      </div>

      <!-- Periodo Info -->
      <div v-if="currentPeriodo" class="card p-4 bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800">
        <div class="flex items-center gap-3">
          <div class="p-2 bg-primary-600 rounded-lg">
            <Calendar class="w-5 h-5 text-white" />
          </div>
          <div>
            <p class="font-semibold text-neutral-900 dark:text-white">
              {{ currentPeriodo.descripcion_periodo }}
            </p>
            <p class="text-sm text-neutral-600 dark:text-neutral-400">
              Periodo: {{ currentPeriodo.clave_periodo }}
            </p>
          </div>
        </div>
      </div>

      <!-- Materias Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div
          v-for="materia in filteredMaterias"
          :key="materia.materia.id_grupo"
          class="card p-6 hover:shadow-lg transition-shadow"
        >
          <!-- Header de materia -->
          <div class="mb-4 pb-4 border-b border-neutral-200 dark:border-neutral-700">
            <h3 class="font-bold text-neutral-900 dark:text-white mb-1">
              {{ materia.materia.nombre_materia }}
            </h3>
            <div class="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400">
              <span class="flex items-center gap-1">
                <BookOpen class="w-4 h-4" />
                {{ materia.materia.clave_materia }}
              </span>
              <span>Grupo {{ materia.materia.letra_grupo }}</span>
            </div>
          </div>

          <!-- Calificaciones -->
          <div class="space-y-2">
            <div
              v-for="cal in materia.calificaiones"
              :key="cal.id_calificacion"
              class="flex items-center justify-between p-3 rounded-lg"
              :class="getCalificacionStyle(cal.calificacion)"
            >
              <span class="font-medium">Parcial {{ cal.numero_calificacion }}</span>
              <span class="text-lg font-bold">
                {{ cal.calificacion || 'S/C' }}
              </span>
            </div>
          </div>

          <!-- Promedio -->
          <div v-if="getPromedio(materia.calificaiones)" class="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
            <div class="flex items-center justify-between">
              <span class="font-semibold text-neutral-900 dark:text-white">Promedio Actual</span>
              <span class="text-xl font-bold text-primary-600 dark:text-primary-400">
                {{ getPromedio(materia.calificaiones) }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- No results -->
      <div v-if="filteredMaterias.length === 0" class="card p-12 text-center">
        <SearchX class="w-12 h-12 text-neutral-400 mx-auto mb-3" />
        <p class="text-neutral-600 dark:text-neutral-400">
          No se encontraron materias que coincidan con tu búsqueda
        </p>
      </div>
    </template>

    <!-- No data -->
    <div v-else class="card p-12 text-center">
      <BookOpen class="w-12 h-12 text-neutral-400 mx-auto mb-3" />
      <p class="text-neutral-600 dark:text-neutral-400">
        No hay calificaciones disponibles
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStudentStore } from '@/stores/student'
import { Loader2, Calendar, BookOpen, Search, SearchX } from 'lucide-vue-next'

const studentStore = useStudentStore()
const searchQuery = ref('')

const currentPeriodo = computed(() => {
  if (studentStore.calificaciones.length > 0) {
    return studentStore.calificaciones[0].periodo
  }
  return null
})

const allMaterias = computed(() => {
  if (studentStore.calificaciones.length > 0) {
    return studentStore.calificaciones[0].materias || []
  }
  return []
})

const filteredMaterias = computed(() => {
  if (!searchQuery.value) return allMaterias.value

  const query = searchQuery.value.toLowerCase()
  return allMaterias.value.filter(m => {
    const nombre = m.materia.nombre_materia.toLowerCase()
    const clave = m.materia.clave_materia.toLowerCase()
    return nombre.includes(query) || clave.includes(query)
  })
})

const getCalificacionStyle = (calificacion) => {
  if (!calificacion) {
    return 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400'
  }

  const cal = parseInt(calificacion)
  if (cal >= 80) {
    return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
  } else if (cal >= 70) {
    return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
  } else {
    return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
  }
}

const getPromedio = (calificaciones) => {
  const validCals = calificaciones
    .filter(c => c.calificacion !== null)
    .map(c => parseInt(c.calificacion))

  if (validCals.length === 0) return null

  const sum = validCals.reduce((a, b) => a + b, 0)
  return (sum / validCals.length).toFixed(1)
}

onMounted(async () => {
  if (studentStore.calificaciones.length === 0) {
    try {
      await studentStore.fetchCalificaciones()
    } catch (error) {
      console.error('Error:', error)
    }
  }
})
</script>