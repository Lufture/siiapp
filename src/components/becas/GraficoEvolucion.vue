<template>
  <div class="card p-6">
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-3">
        <div class="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-xl">
          <TrendingUp class="w-6 h-6 text-primary-600 dark:text-primary-400" />
        </div>
        <div>
          <h3 class="text-xl font-bold text-neutral-900 dark:text-white">
            Evolución Histórica
          </h3>
          <p class="text-sm text-neutral-600 dark:text-neutral-400">
            Progreso de tu promedio vs requisitos de becas
          </p>
        </div>
      </div>

      <!-- Filtros -->
      <div class="flex items-center gap-2">
        <button
          v-for="periodo in periodos"
          :key="periodo.value"
          @click="periodoSeleccionado = periodo.value"
          :class="[
            'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
            periodoSeleccionado === periodo.value
              ? 'bg-primary-600 text-white'
              : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600'
          ]"
        >
          {{ periodo.label }}
        </button>
      </div>
    </div>

    <!-- Gráfico simulado -->
    <div class="mb-6">
      <div class="h-80 bg-neutral-50 dark:bg-neutral-800 rounded-lg p-6 relative overflow-hidden">
        <!-- Eje Y -->
        <div class="absolute left-0 top-0 bottom-0 flex flex-col justify-between py-6 px-2 text-xs text-neutral-500 dark:text-neutral-400">
          <span>100</span>
          <span>90</span>
          <span>80</span>
          <span>70</span>
          <span>60</span>
        </div>

        <!-- Área del gráfico -->
        <div class="ml-8 h-full relative">
          <!-- Líneas de referencia -->
          <div class="absolute inset-0 flex flex-col justify-between">
            <div class="border-t border-neutral-200 dark:border-neutral-700 border-dashed"></div>
            <div class="border-t border-neutral-200 dark:border-neutral-700 border-dashed"></div>
            <div class="border-t border-neutral-200 dark:border-neutral-700 border-dashed"></div>
            <div class="border-t border-neutral-200 dark:border-neutral-700 border-dashed"></div>
            <div class="border-t border-neutral-200 dark:border-neutral-700 border-dashed"></div>
          </div>

          <!-- Línea de beca 1 (85) -->
          <div class="absolute inset-x-0" style="top: 37.5%;">
            <div class="border-t-2 border-green-500 border-dashed relative">
              <span class="absolute right-0 -top-3 text-xs font-semibold text-green-600 dark:text-green-400 bg-white dark:bg-neutral-800 px-2">
                Beca Excelencia (85)
              </span>
            </div>
          </div>

          <!-- Línea de beca 2 (90) -->
          <div class="absolute inset-x-0" style="top: 25%;">
            <div class="border-t-2 border-blue-500 border-dashed relative">
              <span class="absolute right-0 -top-3 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-white dark:bg-neutral-800 px-2">
                Beca Manutención (90)
              </span>
            </div>
          </div>

          <!-- Curva de promedio (simulada con divs) -->
          <svg class="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <!-- Área sombreada -->
            <defs>
              <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#8b5cf6;stop-opacity:0.3" />
                <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:0.05" />
              </linearGradient>
            </defs>
            <path
              d="M 0,40 L 16.67,38 L 33.33,35 L 50,30 L 66.67,28 L 83.33,25 L 100,27"
              fill="url(#areaGradient)"
              stroke="none"
            />
            <!-- Línea principal -->
            <path
              d="M 0,40 L 16.67,38 L 33.33,35 L 50,30 L 66.67,28 L 83.33,25 L 100,27"
              fill="none"
              stroke="#8b5cf6"
              stroke-width="0.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <!-- Puntos -->
            <circle cx="0" cy="40" r="1" fill="#8b5cf6" />
            <circle cx="16.67" cy="38" r="1" fill="#8b5cf6" />
            <circle cx="33.33" cy="35" r="1" fill="#8b5cf6" />
            <circle cx="50" cy="30" r="1" fill="#8b5cf6" />
            <circle cx="66.67" cy="28" r="1" fill="#8b5cf6" />
            <circle cx="83.33" cy="25" r="1" fill="#8b5cf6" />
            <circle cx="100" cy="27" r="1.5" fill="#8b5cf6" />
          </svg>
        </div>

        <!-- Eje X -->
        <div class="absolute bottom-0 left-8 right-0 flex justify-between px-2 py-2 text-xs text-neutral-500 dark:text-neutral-400">
          <span>Sem 1</span>
          <span>Sem 2</span>
          <span>Sem 3</span>
          <span>Sem 4</span>
          <span>Sem 5</span>
          <span>Sem 6</span>
          <span>Actual</span>
        </div>
      </div>
    </div>

    <!-- Leyenda -->
    <div class="flex flex-wrap items-center justify-center gap-6 mb-6">
      <div class="flex items-center gap-2">
        <div class="w-4 h-4 rounded-full bg-purple-500"></div>
        <span class="text-sm text-neutral-700 dark:text-neutral-300">Tu Promedio</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="w-4 h-1 bg-green-500"></div>
        <span class="text-sm text-neutral-700 dark:text-neutral-300">Beca Excelencia</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="w-4 h-1 bg-blue-500"></div>
        <span class="text-sm text-neutral-700 dark:text-neutral-300">Beca Manutención</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="w-4 h-1 bg-orange-500"></div>
        <span class="text-sm text-neutral-700 dark:text-neutral-300">Beca Deportiva</span>
      </div>
    </div>

    <!-- Estadísticas del periodo -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
        <div class="flex items-center justify-between mb-2">
          <TrendingUp class="w-5 h-5 text-green-600 dark:text-green-400" />
          <span class="text-xs font-semibold text-green-600 dark:text-green-400">+2.5</span>
        </div>
        <p class="text-sm text-green-700 dark:text-green-300 mb-1">Mejor Mejora</p>
        <p class="text-lg font-bold text-green-900 dark:text-green-100">Sem 4 → Sem 5</p>
      </div>

      <div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <div class="flex items-center justify-between mb-2">
          <Award class="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <p class="text-sm text-blue-700 dark:text-blue-300 mb-1">Semestres Cumpliendo</p>
        <p class="text-lg font-bold text-blue-900 dark:text-blue-100">5 de 6</p>
      </div>

      <div class="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
        <div class="flex items-center justify-between mb-2">
          <BarChart3 class="w-5 h-5 text-purple-600 dark:text-purple-400" />
        </div>
        <p class="text-sm text-purple-700 dark:text-purple-300 mb-1">Promedio General</p>
        <p class="text-lg font-bold text-purple-900 dark:text-purple-100">87.5</p>
      </div>

      <div class="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
        <div class="flex items-center justify-between mb-2">
          <Target class="w-5 h-5 text-orange-600 dark:text-orange-400" />
        </div>
        <p class="text-sm text-orange-700 dark:text-orange-300 mb-1">Tendencia</p>
        <p class="text-lg font-bold text-orange-900 dark:text-orange-100">↗ Creciendo</p>
      </div>
    </div>

    <!-- Timeline de eventos -->
    <div class="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-700">
      <h4 class="font-bold text-neutral-900 dark:text-white mb-4">
        Historial de Eventos
      </h4>
      <div class="space-y-3">
        <div class="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div class="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
          <div class="flex-1">
            <p class="text-sm font-semibold text-green-900 dark:text-green-100">
              Semestre 5 - Beca Excelencia Renovada
            </p>
            <p class="text-xs text-green-700 dark:text-green-300">
              Mantuviste promedio de 88.5, superando el mínimo de 85
            </p>
          </div>
          <span class="text-xs text-green-600 dark:text-green-400">Ene 2025</span>
        </div>

        <div class="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <div class="w-2 h-2 rounded-full bg-red-500 mt-2"></div>
          <div class="flex-1">
            <p class="text-sm font-semibold text-red-900 dark:text-red-100">
              Semestre 4 - Beca Manutención Perdida
            </p>
            <p class="text-xs text-red-700 dark:text-red-300">
              Promedio de 86 no alcanzó el mínimo requerido de 90
            </p>
          </div>
          <span class="text-xs text-red-600 dark:text-red-400">Ago 2024</span>
        </div>

        <div class="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div class="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
          <div class="flex-1">
            <p class="text-sm font-semibold text-blue-900 dark:text-blue-100">
              Semestre 3 - Nueva Beca Deportiva
            </p>
            <p class="text-xs text-blue-700 dark:text-blue-300">
              Beca otorgada por promedio de 85 y participación deportiva
            </p>
          </div>
          <span class="text-xs text-blue-600 dark:text-blue-400">Ene 2024</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { TrendingUp, Award, BarChart3, Target } from 'lucide-vue-next'

const periodoSeleccionado = ref('all')

const periodos = [
  { value: 'all', label: 'Todo' },
  { value: 'year', label: '1 Año' },
  { value: 'semester', label: '6 Meses' }
]
</script>