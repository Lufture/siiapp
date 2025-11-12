<template>
  <div class="card p-6 hover:shadow-xl transition-all duration-300">
    <!-- Header -->
    <div class="flex items-start justify-between mb-4">
      <div class="flex-1">
        <div class="flex items-center gap-3 mb-2">
          <div
            class="w-3 h-3 rounded-full"
            :style="{ backgroundColor: beca.color }"
          ></div>
          <h3 class="text-lg font-bold text-neutral-900 dark:text-white">
            {{ beca.nombre }}
          </h3>
        </div>
        <div class="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
          <span class="px-2 py-1 bg-neutral-100 dark:bg-neutral-700 rounded">
            {{ beca.tipoBeca === 'general' ? 'General' : 'Semestral' }}
          </span>
          <span>•</span>
          <span>{{ beca.monto }}</span>
        </div>
      </div>

      <!-- Badge de estado -->
      <span
        :class="[
          'px-3 py-1 rounded-full text-xs font-semibold',
          beca.estado === 'segura' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
          beca.estado === 'en-riesgo' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' :
          'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
        ]"
      >
        <span v-if="beca.estado === 'segura'">✓ Segura</span>
        <span v-else-if="beca.estado === 'en-riesgo'">⚠ En Riesgo</span>
        <span v-else>✗ Perdida</span>
      </span>
    </div>

    <!-- Promedio requerido vs actual -->
    <div class="mb-4">
      <div class="flex items-end justify-between mb-2">
        <div>
          <p class="text-sm text-neutral-600 dark:text-neutral-400">Promedio Actual</p>
          <p class="text-3xl font-bold text-neutral-900 dark:text-white">
            {{ beca.promedioActual }}
          </p>
        </div>
        <div class="text-right">
          <p class="text-sm text-neutral-600 dark:text-neutral-400">Requerido</p>
          <p class="text-2xl font-bold text-neutral-700 dark:text-neutral-300">
            {{ beca.promedioMinimo }}
          </p>
        </div>
      </div>

      <!-- Barra de progreso -->
      <div class="relative">
        <div class="h-4 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
          <div
            :class="[
              'h-full rounded-full transition-all duration-500',
              beca.estado === 'segura' ? 'bg-gradient-to-r from-green-500 to-green-600' :
              beca.estado === 'en-riesgo' ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
              'bg-gradient-to-r from-red-500 to-red-600'
            ]"
            :style="{ width: `${Math.min(beca.porcentaje, 100)}%` }"
          ></div>
        </div>
        <!-- Marcador del mínimo -->
        <div
          class="absolute top-0 h-4 w-0.5 bg-neutral-900 dark:bg-white"
          :style="{ left: `${(beca.promedioMinimo / 100) * 100}%` }"
        ></div>
      </div>

      <!-- Diferencia -->
      <div class="flex items-center justify-between mt-2 text-sm">
        <span
          :class="[
            'font-medium',
            beca.diferencia > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
          ]"
        >
          {{ beca.diferencia > 0 ? '+' : '' }}{{ beca.diferencia }} puntos
        </span>
        <span class="text-neutral-600 dark:text-neutral-400">
          {{ beca.porcentaje }}%
        </span>
      </div>
    </div>

    <!-- Información adicional -->
    <div class="grid grid-cols-2 gap-3 mb-4 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
      <div>
        <p class="text-xs text-neutral-600 dark:text-neutral-400 mb-1">Vigencia</p>
        <p class="text-sm font-semibold text-neutral-900 dark:text-white">
          {{ beca.semestreActual }}/{{ beca.vigenciaSemestres }} semestres
        </p>
      </div>
      <div>
        <p class="text-xs text-neutral-600 dark:text-neutral-400 mb-1">Renovación</p>
        <p class="text-sm font-semibold text-neutral-900 dark:text-white">
          {{ beca.vigenciaSemestres - beca.semestreActual }} restantes
        </p>
      </div>
    </div>

    <!-- Acciones -->
    <div class="flex gap-2">
      <button class="flex-1 px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-lg hover:bg-primary-200 dark:hover:bg-primary-800/40 transition-colors font-medium text-sm">
        Ver Detalles
      </button>
      <button class="flex-1 px-4 py-2 bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors font-medium text-sm">
        Simular
      </button>
      <button class="px-4 py-2 bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors">
        <MoreVertical class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { MoreVertical } from 'lucide-vue-next'

defineProps({
  beca: {
    type: Object,
    required: true
  }
})
</script>