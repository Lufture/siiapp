<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h2 class="text-2xl font-bold text-neutral-900 dark:text-white">Kardex</h2>
        <p class="text-neutral-600 dark:text-neutral-400 mt-1">
          Historial académico completo
        </p>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="studentStore.isLoading && !studentStore.kardex" class="flex items-center justify-center py-12">
      <Loader2 class="w-8 h-8 animate-spin text-primary-600" />
    </div>

    <template v-else-if="studentStore.kardex">
      <!-- Stats -->
      <div class="card p-6 bg-gradient-to-br from-primary-500 to-primary-700 text-white border-0">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-primary-100 mb-1">Avance de Carrera</p>
            <p class="text-3xl font-bold">{{ studentStore.kardex.porcentaje_avance }}%</p>
          </div>
          <Award class="w-12 h-12 opacity-80" />
        </div>
      </div>

      <!-- Filters -->
      <div class="card p-4">
        <div class="flex flex-col sm:flex-row gap-4">
          <!-- Search -->
          <div class="flex-1 relative">
            <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Buscar materia por nombre o clave..."
              class="input-field pl-10"
            />
          </div>

          <!-- Semestre filter -->
          <div class="relative">
            <Filter class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <select
              v-model="selectedSemestre"
              class="input-field pl-10 appearance-none cursor-pointer pr-10"
            >
              <option value="">Todos los semestres</option>
              <option
                v-for="sem in semestresDisponibles"
                :key="sem"
                :value="sem"
              >
                Semestre {{ sem }}
              </option>
            </select>
            <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <!-- Kardex por semestre -->
      <div
        v-for="semestre in semestresAgrupados"
        :key="semestre.numero"
        class="card overflow-hidden"
      >
        <div class="bg-neutral-100 dark:bg-neutral-800 p-4 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold">
              {{ semestre.numero }}
            </div>
            <div>
              <h3 class="font-bold text-neutral-900 dark:text-white">
                Semestre {{ semestre.numero }}
              </h3>
              <p class="text-sm text-neutral-600 dark:text-neutral-400">
                {{ semestre.materias.length }} materias
              </p>
            </div>
          </div>
          <div class="text-right">
            <p class="text-sm text-neutral-600 dark:text-neutral-400">Promedio</p>
            <p class="text-xl font-bold text-neutral-900 dark:text-white">
              {{ calcularPromedioSemestre(semestre.materias) }}
            </p>
          </div>
        </div>

        <div class="p-4">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b border-neutral-200 dark:border-neutral-700">
                  <th class="text-left py-3 px-2 text-sm font-semibold text-neutral-900 dark:text-white">
                    Materia
                  </th>
                  <th class="text-left py-3 px-2 text-sm font-semibold text-neutral-900 dark:text-white">
                    Clave
                  </th>
                  <th class="text-center py-3 px-2 text-sm font-semibold text-neutral-900 dark:text-white">
                    Periodo
                  </th>
                  <th class="text-center py-3 px-2 text-sm font-semibold text-neutral-900 dark:text-white">
                    Créditos
                  </th>
                  <th class="text-center py-3 px-2 text-sm font-semibold text-neutral-900 dark:text-white">
                    Calificación
                  </th>
                  <th class="text-left py-3 px-2 text-sm font-semibold text-neutral-900 dark:text-white">
                    Tipo
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="materia in semestre.materias"
                  :key="materia.clave_materia + materia.periodo"
                  class="border-b border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors"
                >
                  <td class="py-3 px-2 text-sm text-neutral-900 dark:text-white">
                    {{ materia.nombre_materia }}
                  </td>
                  <td class="py-3 px-2 text-sm text-neutral-600 dark:text-neutral-400">
                    {{ materia.clave_materia }}
                  </td>
                  <td class="py-3 px-2 text-sm text-center text-neutral-600 dark:text-neutral-400">
                    {{ materia.periodo }}
                  </td>
                  <td class="py-3 px-2 text-sm text-center text-neutral-900 dark:text-white">
                    {{ materia.creditos }}
                  </td>
                  <td class="py-3 px-2 text-center">
                    <span
                      class="inline-flex items-center justify-center w-12 h-12 rounded-lg font-bold text-sm"
                      :class="getCalificacionStyle(materia.calificacion)"
                    >
                      {{ materia.calificacion }}
                    </span>
                  </td>
                  <td class="py-3 px-2">
                    <span
                      class="inline-block px-2 py-1 text-xs rounded-full"
                      :class="getTipoStyle(materia.descripcion)"
                    >
                      {{ getTipoText(materia.descripcion) }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- No results -->
      <div v-if="semestresAgrupados.length === 0" class="card p-12 text-center">
        <SearchX class="w-12 h-12 text-neutral-400 mx-auto mb-3" />
        <p class="text-neutral-600 dark:text-neutral-400">
          No se encontraron materias que coincidan con tu búsqueda
        </p>
      </div>
    </template>

    <!-- No data -->
    <div v-else class="card p-12 text-center">
      <FileText class="w-12 h-12 text-neutral-400 mx-auto mb-3" />
      <p class="text-neutral-600 dark:text-neutral-400">
        No hay información de kardex disponible
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStudentStore } from '@/stores/student'
import {
  Loader2,
  Award,
  Search,
  Filter,
  ChevronDown,
  SearchX,
  FileText
} from 'lucide-vue-next'

const studentStore = useStudentStore()
const searchQuery = ref('')
const selectedSemestre = ref('')

const kardexData = computed(() => {
  return studentStore.kardex?.kardex || []
})

const semestresDisponibles = computed(() => {
  const semestres = [...new Set(kardexData.value.map(m => m.semestre))]
  return semestres.sort((a, b) => a - b)
})

const materiasFiltradas = computed(() => {
  let materias = kardexData.value

  // Filtrar por búsqueda
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    materias = materias.filter(m => {
      const nombre = m.nombre_materia.toLowerCase()
      const clave = m.clave_materia.toLowerCase()
      return nombre.includes(query) || clave.includes(query)
    })
  }

  // Filtrar por semestre
  if (selectedSemestre.value) {
    materias = materias.filter(m => m.semestre === parseInt(selectedSemestre.value))
  }

  return materias
})

const semestresAgrupados = computed(() => {
  const grupos = {}

  materiasFiltradas.value.forEach(materia => {
    if (!grupos[materia.semestre]) {
      grupos[materia.semestre] = {
        numero: materia.semestre,
        materias: []
      }
    }
    grupos[materia.semestre].materias.push(materia)
  })

  return Object.values(grupos).sort((a, b) => a.numero - b.numero)
})

const getCalificacionStyle = (calificacion) => {
  if (calificacion === 'AC') {
    return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
  }

  const cal = parseInt(calificacion)
  if (isNaN(cal)) {
    return 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400'
  }

  if (cal >= 80) {
    return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
  } else if (cal >= 70) {
    return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
  } else {
    return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
  }
}

const getTipoStyle = (descripcion) => {
  if (descripcion.includes('REPETICIÓN')) {
    return 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'
  }
  return 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400'
}

const getTipoText = (descripcion) => {
  if (descripcion.includes('REPETICIÓN')) {
    return 'Repetición'
  }
  return 'Ordinario'
}

const calcularPromedioSemestre = (materias) => {
  const calificaciones = materias
    .map(m => parseInt(m.calificacion))
    .filter(c => !isNaN(c))

  if (calificaciones.length === 0) return 'N/A'

  const suma = calificaciones.reduce((a, b) => a + b, 0)
  return (suma / calificaciones.length).toFixed(1)
}

onMounted(async () => {
  if (!studentStore.kardex) {
    try {
      await studentStore.fetchKardex()
    } catch (error) {
      console.error('Error:', error)
    }
  }
})
</script>