<template>
  <div class="card p-6 bg-gradient-to-br from-primary-500 to-primary-700 text-white border-0">
    <div class="flex items-center gap-3 mb-6">
      <div class="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
        <Award class="w-8 h-8" />
      </div>
      <div>
        <h3 class="text-2xl font-bold">Estado General</h3>
        <p class="text-primary-100">Resumen de todas tus becas</p>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Promedio Actual -->
      <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
        <div class="flex items-center justify-between mb-2">
          <TrendingUp class="w-5 h-5 text-primary-100" />
        </div>
        <p class="text-sm text-primary-100 mb-1">Promedio Actual</p>
        <p class="text-3xl font-bold">{{ promedioActual }}</p>
      </div>

      <!-- Becas Activas -->
      <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
        <div class="flex items-center justify-between mb-2">
          <CheckCircle class="w-5 h-5 text-green-300" />
        </div>
        <p class="text-sm text-primary-100 mb-1">Becas Activas</p>
        <p class="text-3xl font-bold">{{ becasActivas }}</p>
      </div>

      <!-- Becas en Riesgo -->
      <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
        <div class="flex items-center justify-between mb-2">
          <AlertTriangle class="w-5 h-5 text-yellow-300" />
        </div>
        <p class="text-sm text-primary-100 mb-1">En Riesgo</p>
        <p class="text-3xl font-bold">{{ becasEnRiesgo }}</p>
      </div>

      <!-- Becas Perdidas -->
      <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
        <div class="flex items-center justify-between mb-2">
          <XCircle class="w-5 h-5 text-red-300" />
        </div>
        <p class="text-sm text-primary-100 mb-1">Perdidas</p>
        <p class="text-3xl font-bold">{{ becasPerdidas }}</p>
      </div>
    </div>

    <!-- Barra de progreso visual -->
    <div class="mt-6 space-y-3">
      <div class="flex items-center justify-between text-sm">
        <span class="text-primary-100">Estado general de becas</span>
        <span class="font-semibold">{{ porcentajeGeneral }}%</span>
      </div>
      <div class="h-3 bg-white/20 rounded-full overflow-hidden">
        <div
          class="h-full bg-white rounded-full transition-all duration-500"
          :style="{ width: `${porcentajeGeneral}%` }"
        ></div>
      </div>
      <div class="flex items-center justify-between text-xs text-primary-100">
        <span>{{ becasActivas }} cumpliendo</span>
        <span>{{ becasActivas + becasEnRiesgo + becasPerdidas }} total</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Award, TrendingUp, CheckCircle, AlertTriangle, XCircle } from 'lucide-vue-next'

// Props de ejemplo (en producción vendrían del store)
const promedioActual = 87.5
const becasActivas = 1
const becasEnRiesgo = 1
const becasPerdidas = 1
const porcentajeGeneral = 66 // (becasActivas / total) * 100
</script>