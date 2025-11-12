<template>
  <div class="card p-6">
    <div class="flex items-center gap-3 mb-6">
      <div class="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-xl">
        <Calculator class="w-6 h-6 text-primary-600 dark:text-primary-400" />
      </div>
      <div>
        <h3 class="text-xl font-bold text-neutral-900 dark:text-white">
          Calculadora de Escenarios
        </h3>
        <p class="text-sm text-neutral-600 dark:text-neutral-400">
          Calcula qué necesitas para mantener tu beca
        </p>
      </div>
    </div>

    <!-- Selector de beca -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div>
        <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          Selecciona una beca
        </label>
        <div class="relative">
          <select
            v-model="becaSeleccionada"
            class="input-field appearance-none cursor-pointer pr-10"
          >
            <option value="">Elige una beca...</option>
            <option value="beca-1">Beca de Excelencia</option>
            <option value="beca-2">Beca de Manutención</option>
            <option value="beca-3">Beca Deportiva</option>
          </select>
          <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 pointer-events-none" />
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          Promedio objetivo
        </label>
        <input
          v-model="promedioObjetivo"
          type="number"
          min="0"
          max="100"
          step="0.1"
          class="input-field"
          placeholder="90.0"
        />
      </div>
    </div>

    <!-- Resultados -->
    <div v-if="becaSeleccionada" class="space-y-6">
      <!-- Info actual -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p class="text-sm text-blue-600 dark:text-blue-400 mb-1">Promedio Actual</p>
          <p class="text-2xl font-bold text-blue-900 dark:text-blue-100">87.5</p>
        </div>

        <div class="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
          <p class="text-sm text-purple-600 dark:text-purple-400 mb-1">Materias Cursadas</p>
          <p class="text-2xl font-bold text-purple-900 dark:text-purple-100">24</p>
        </div>

        <div class="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <p class="text-sm text-green-600 dark:text-green-400 mb-1">Materias Restantes</p>
          <p class="text-2xl font-bold text-green-900 dark:text-green-100">6</p>
        </div>
      </div>

      <!-- Cálculo principal -->
      <div class="p-6 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-xl border border-primary-200 dark:border-primary-800">
        <div class="flex items-start justify-between mb-4">
          <div>
            <p class="text-sm text-primary-700 dark:text-primary-300 mb-1">
              Para alcanzar promedio de {{ promedioObjetivo || '90.0' }}
            </p>
            <p class="text-sm text-primary-600 dark:text-primary-400">
              Necesitas obtener en las materias restantes:
            </p>
          </div>
          <Target class="w-8 h-8 text-primary-600 dark:text-primary-400" />
        </div>

        <div class="flex items-end gap-4 mb-4">
          <div>
            <p class="text-5xl font-bold text-primary-900 dark:text-primary-100">92.3</p>
            <p class="text-sm text-primary-600 dark:text-primary-400 mt-1">
              Promedio necesario
            </p>
          </div>

          <div class="flex-1 text-right">
            <span
              :class="[
                'inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold',
                parseFloat(promedioObjetivo || 90) <= 100
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                  : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
              ]"
            >
              <span v-if="parseFloat(promedioObjetivo || 90) <= 100">
                <CheckCircle class="w-5 h-5" />
              </span>
              <span v-else>
                <XCircle class="w-5 h-5" />
              </span>
              {{ parseFloat(promedioObjetivo || 90) <= 100 ? 'Alcanzable' : 'No alcanzable' }}
            </span>
          </div>
        </div>

        <!-- Desglose -->
        <div class="grid grid-cols-2 gap-3">
          <div class="p-3 bg-white/50 dark:bg-black/20 rounded-lg">
            <p class="text-xs text-neutral-600 dark:text-neutral-400 mb-1">Si obtienes 100</p>
            <p class="text-lg font-bold text-neutral-900 dark:text-white">
              Promedio: 91.25
            </p>
          </div>
          <div class="p-3 bg-white/50 dark:bg-black/20 rounded-lg">
            <p class="text-xs text-neutral-600 dark:text-neutral-400 mb-1">Si obtienes 85</p>
            <p class="text-lg font-bold text-neutral-900 dark:text-white">
              Promedio: 88.75
            </p>
          </div>
        </div>
      </div>

      <!-- Tabla de materias actuales -->
      <div>
        <div class="flex items-center justify-between mb-4">
          <h4 class="font-bold text-neutral-900 dark:text-white">
            Desglose por Materia Actual
          </h4>
          <button class="text-sm text-primary-600 dark:text-primary-400 hover:underline font-medium">
            Ver todas las materias
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-neutral-200 dark:border-neutral-700">
                <th class="text-left py-3 px-2 text-sm font-semibold text-neutral-900 dark:text-white">
                  Materia
                </th>
                <th class="text-center py-3 px-2 text-sm font-semibold text-neutral-900 dark:text-white">
                  Parciales
                </th>
                <th class="text-center py-3 px-2 text-sm font-semibold text-neutral-900 dark:text-white">
                  Promedio Actual
                </th>
                <th class="text-center py-3 px-2 text-sm font-semibold text-neutral-900 dark:text-white">
                  Necesitas
                </th>
                <th class="text-center py-3 px-2 text-sm font-semibold text-neutral-900 dark:text-white">
                  Dificultad
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="materia in materiasActuales"
                :key="materia.id"
                class="border-b border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800"
              >
                <td class="py-3 px-2 text-sm text-neutral-900 dark:text-white">
                  {{ materia.nombre }}
                </td>
                <td class="py-3 px-2 text-sm text-center text-neutral-600 dark:text-neutral-400">
                  {{ materia.parciales }}
                </td>
                <td class="py-3 px-2 text-center">
                  <span class="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded font-semibold text-sm">
                    {{ materia.promedioActual }}
                  </span>
                </td>
                <td class="py-3 px-2 text-center">
                  <span class="inline-block px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded font-semibold text-sm">
                    {{ materia.necesitas }}
                  </span>
                </td>
                <td class="py-3 px-2 text-center">
                  <span
                    :class="[
                      'inline-block px-2 py-1 rounded text-xs font-semibold',
                      materia.dificultad === 'baja' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                      materia.dificultad === 'media' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' :
                      'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                    ]"
                  >
                    {{ materia.dificultad === 'baja' ? 'Baja' : materia.dificultad === 'media' ? 'Media' : 'Alta' }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Recomendaciones -->
      <div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <div class="flex items-start gap-3">
          <Lightbulb class="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <p class="font-semibold text-blue-900 dark:text-blue-100 mb-1">
              Recomendaciones
            </p>
            <ul class="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>• Enfócate en Cálculo Diferencial, necesitas mejorar 10 puntos</li>
              <li>• Bases de Datos está bien encaminada, mantén el ritmo</li>
              <li>• Considera estudiar más tiempo para Algoritmos</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Estado vacío -->
    <div v-else class="py-12 text-center">
      <Calculator class="w-16 h-16 text-neutral-400 mx-auto mb-4" />
      <p class="text-neutral-600 dark:text-neutral-400">
        Selecciona una beca para comenzar a calcular
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  Calculator,
  ChevronDown,
  Target,
  CheckCircle,
  XCircle,
  Lightbulb
} from 'lucide-vue-next'

const becaSeleccionada = ref('')
const promedioObjetivo = ref(90)

const materiasActuales = ref([
  {
    id: 1,
    nombre: 'Cálculo Diferencial',
    parciales: '2/3',
    promedioActual: 75,
    necesitas: 95,
    dificultad: 'alta'
  },
  {
    id: 2,
    nombre: 'Programación Web',
    parciales: '2/3',
    promedioActual: 92,
    necesitas: 88,
    dificultad: 'baja'
  },
  {
    id: 3,
    nombre: 'Bases de Datos',
    parciales: '2/3',
    promedioActual: 88,
    necesitas: 90,
    dificultad: 'media'
  },
  {
    id: 4,
    nombre: 'Redes de Computadoras',
    parciales: '2/3',
    promedioActual: 85,
    necesitas: 92,
    dificultad: 'media'
  },
  {
    id: 5,
    nombre: 'Algoritmos Avanzados',
    parciales: '2/3',
    promedioActual: 80,
    necesitas: 94,
    dificultad: 'alta'
  },
  {
    id: 6,
    nombre: 'Ingeniería de Software',
    parciales: '2/3',
    promedioActual: 90,
    necesitas: 89,
    dificultad: 'baja'
  }
])
</script>