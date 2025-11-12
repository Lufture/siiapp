<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h2 class="text-2xl font-bold text-neutral-900 dark:text-white">Horario de Clases</h2>
        <p class="text-neutral-600 dark:text-neutral-400 mt-1">
          Tu horario del periodo actual
        </p>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="studentStore.isLoading && !studentStore.horarios.length" class="flex items-center justify-center py-12">
      <Loader2 class="w-8 h-8 animate-spin text-primary-600" />
    </div>

    <template v-else-if="studentStore.horarios.length > 0">
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

      <!-- Vista de escritorio - Calendario -->
      <div class="hidden lg:block card overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="bg-neutral-100 dark:bg-neutral-800">
                <th class="p-4 text-left font-semibold text-neutral-900 dark:text-white w-24">
                  Hora
                </th>
                <th
                  v-for="dia in diasSemana"
                  :key="dia.key"
                  class="p-4 text-center font-semibold text-neutral-900 dark:text-white"
                >
                  {{ dia.label }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="hora in horasUnicas"
                :key="hora"
                class="border-t border-neutral-200 dark:border-neutral-700"
              >
                <td class="p-4 font-medium text-neutral-600 dark:text-neutral-400 text-sm">
                  {{ hora }}
                </td>
                <td
                  v-for="dia in diasSemana"
                  :key="dia.key"
                  class="p-2 align-top"
                >
                  <div
                    v-for="clase in getClasesPorDiaYHora(dia.key, hora)"
                    :key="clase.id_grupo"
                    :class="getClaseColor(clase)"
                    class="p-3 rounded-lg mb-2 cursor-pointer hover:shadow-lg transition-all"
                  >
                    <p class="font-bold text-sm mb-1 leading-tight">
                      {{ clase.nombre_materia }}
                    </p>
                    <p class="text-xs opacity-90 mb-1">
                      {{ clase.clave_materia }}
                    </p>
                    <div class="flex items-center gap-1 text-xs opacity-75">
                      <MapPin class="w-3 h-3" />
                      <span>{{ clase[`${dia.key}_clave_salon`] || 'S/S' }}</span>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Vista móvil - Lista por día -->
      <div class="lg:hidden space-y-4">
        <div
          v-for="dia in diasSemana"
          :key="dia.key"
          class="card p-4"
        >
          <h3 class="font-bold text-lg text-neutral-900 dark:text-white mb-3 flex items-center gap-2">
            <Calendar class="w-5 h-5" />
            {{ dia.label }}
          </h3>

          <div v-if="getClasesPorDia(dia.key).length > 0" class="space-y-3">
            <div
              v-for="clase in getClasesPorDia(dia.key)"
              :key="clase.id_grupo"
              :class="getClaseColor(clase)"
              class="p-4 rounded-lg"
            >
              <div class="flex items-start justify-between mb-2">
                <div class="flex-1">
                  <p class="font-bold text-neutral-900 dark:text-white mb-1">
                    {{ clase.nombre_materia }}
                  </p>
                  <p class="text-sm opacity-75">
                    {{ clase.clave_materia }} - Grupo {{ clase.letra_grupo }}
                  </p>
                </div>
              </div>

              <div class="flex items-center gap-4 text-sm">
                <div class="flex items-center gap-1">
                  <Clock class="w-4 h-4" />
                  <span>{{ clase[dia.key] }}</span>
                </div>
                <div class="flex items-center gap-1">
                  <MapPin class="w-4 h-4" />
                  <span>{{ clase[`${dia.key}_clave_salon`] || 'Sin salón' }}</span>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="text-center py-6 text-neutral-500 dark:text-neutral-400">
            <p class="text-sm">Sin clases este día</p>
          </div>
        </div>
      </div>
    </template>

    <!-- No data -->
    <div v-else class="card p-12 text-center">
      <CalendarOff class="w-12 h-12 text-neutral-400 mx-auto mb-3" />
      <p class="text-neutral-600 dark:text-neutral-400">
        No hay horarios disponibles
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useStudentStore } from '@/stores/student'
import { Loader2, Calendar, CalendarOff, MapPin, Clock } from 'lucide-vue-next'

const studentStore = useStudentStore()

const diasSemana = [
  { key: 'lunes', label: 'Lunes' },
  { key: 'martes', label: 'Martes' },
  { key: 'miercoles', label: 'Miércoles' },
  { key: 'jueves', label: 'Jueves' },
  { key: 'viernes', label: 'Viernes' },
  { key: 'sabado', label: 'Sábado' },
]

const coloresClases = [
  'bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100',
  'bg-purple-100 dark:bg-purple-900/30 text-purple-900 dark:text-purple-100',
  'bg-green-100 dark:bg-green-900/30 text-green-900 dark:text-green-100',
  'bg-orange-100 dark:bg-orange-900/30 text-orange-900 dark:text-orange-100',
  'bg-pink-100 dark:bg-pink-900/30 text-pink-900 dark:text-pink-100',
  'bg-teal-100 dark:bg-teal-900/30 text-teal-900 dark:text-teal-100',
]

const currentPeriodo = computed(() => {
  if (studentStore.horarios.length > 0) {
    return studentStore.horarios[0].periodo
  }
  return null
})

const allHorarios = computed(() => {
  if (studentStore.horarios.length > 0) {
    return studentStore.horarios[0].horario || []
  }
  return []
})

const horasUnicas = computed(() => {
  const horas = new Set()

  allHorarios.value.forEach(clase => {
    diasSemana.forEach(dia => {
      if (clase[dia.key]) {
        horas.add(clase[dia.key])
      }
    })
  })

  return Array.from(horas).sort()
})

const getClasesPorDia = (dia) => {
  return allHorarios.value.filter(clase => clase[dia] !== null)
}

const getClasesPorDiaYHora = (dia, hora) => {
  return allHorarios.value.filter(clase => clase[dia] === hora)
}

const getClaseColor = (clase) => {
  const index = clase.id_grupo % coloresClases.length
  return coloresClases[index]
}

onMounted(async () => {
  if (studentStore.horarios.length === 0) {
    try {
      await studentStore.fetchHorarios()
    } catch (error) {
      console.error('Error:', error)
    }
  }
})
</script>