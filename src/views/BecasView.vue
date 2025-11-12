<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h2 class="text-2xl font-bold text-neutral-900 dark:text-white">Gestor de Becas</h2>
        <p class="text-neutral-600 dark:text-neutral-400 mt-1">
          Monitorea y gestiona tus becas académicas
        </p>
      </div>
      <button
        @click="showModal = true"
        class="btn-primary flex items-center gap-2"
      >
        <Plus class="w-5 h-5" />
        <span>Nueva Beca</span>
      </button>
    </div>

    <!-- Estado General -->
    <EstadoGeneralBecas />

    <!-- Alertas -->
    <div v-if="alertas.length > 0" class="space-y-3">
      <div
        v-for="alerta in alertas"
        :key="alerta.id"
        :class="[
          'card p-4 border-l-4',
          alerta.tipo === 'error' ? 'border-red-500 bg-red-50 dark:bg-red-900/20' :
          alerta.tipo === 'warning' ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' :
          'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
        ]"
      >
        <div class="flex items-start justify-between gap-4">
          <div class="flex items-start gap-3">
            <AlertCircle
              :class="[
                'w-5 h-5 flex-shrink-0 mt-0.5',
                alerta.tipo === 'error' ? 'text-red-600 dark:text-red-400' :
                alerta.tipo === 'warning' ? 'text-yellow-600 dark:text-yellow-400' :
                'text-blue-600 dark:text-blue-400'
              ]"
            />
            <div>
              <p
                :class="[
                  'font-medium',
                  alerta.tipo === 'error' ? 'text-red-900 dark:text-red-100' :
                  alerta.tipo === 'warning' ? 'text-yellow-900 dark:text-yellow-100' :
                  'text-blue-900 dark:text-blue-100'
                ]"
              >
                {{ alerta.mensaje }}
              </p>
              <button
                class="text-sm font-medium underline mt-1"
                :class="[
                  alerta.tipo === 'error' ? 'text-red-700 dark:text-red-300' :
                  alerta.tipo === 'warning' ? 'text-yellow-700 dark:text-yellow-300' :
                  'text-blue-700 dark:text-blue-300'
                ]"
              >
                {{ alerta.accion }}
              </button>
            </div>
          </div>
          <button class="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200">
            <X class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>

    <!-- Lista de Becas -->
    <div v-if="becas.length > 0" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <BecaCard
        v-for="beca in becas"
        :key="beca.id"
        :beca="beca"
      />
    </div>

    <!-- No hay becas -->
    <div v-else class="card p-12 text-center">
      <Award class="w-16 h-16 text-neutral-400 mx-auto mb-4" />
      <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
        No tienes becas registradas
      </h3>
      <p class="text-neutral-600 dark:text-neutral-400 mb-6">
        Comienza agregando una beca para monitorear tu progreso académico
      </p>
      <button
        @click="showModal = true"
        class="btn-primary inline-flex items-center gap-2"
      >
        <Plus class="w-5 h-5" />
        <span>Agregar mi primera beca</span>
      </button>
    </div>

    <!-- Calculadora de Escenarios -->
    <CalculadoraBecas v-if="becas.length > 0" />

    <!-- Gráfico de Evolución -->
    <GraficoEvolucion v-if="becas.length > 0" />

    <!-- Modal de Nueva Beca -->
    <BecaFormModal
      :show="showModal"
      @close="showModal = false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Plus, AlertCircle, X, Award } from 'lucide-vue-next'
import EstadoGeneralBecas from '@/components/becas/EstadoGeneralBecas.vue'
import BecaCard from '@/components/becas/BecaCard.vue'
import CalculadoraBecas from '@/components/becas/CalculadoraBecas.vue'
import GraficoEvolucion from '@/components/becas/GraficoEvolucion.vue'
import BecaFormModal from '@/components/becas/BecaFormModal.vue'

const showModal = ref(false)

// Datos de ejemplo (en producción vendrían del store)
const becas = ref([
  {
    id: 'beca-1',
    nombre: 'Beca de Excelencia',
    promedioMinimo: 85,
    promedioActual: 87.5,
    tipoBeca: 'general',
    monto: '100%',
    estado: 'segura',
    diferencia: 2.5,
    porcentaje: 103,
    color: '#10b981',
    vigenciaSemestres: 10,
    semestreActual: 3
  },
  {
    id: 'beca-2',
    nombre: 'Beca de Manutención',
    promedioMinimo: 90,
    promedioActual: 87.5,
    tipoBeca: 'semestral',
    monto: '$5,000 MXN',
    estado: 'perdida',
    diferencia: -2.5,
    porcentaje: 97,
    color: '#3b82f6',
    vigenciaSemestres: 4,
    semestreActual: 2
  },
  {
    id: 'beca-3',
    nombre: 'Beca Deportiva',
    promedioMinimo: 80,
    promedioActual: 87.5,
    tipoBeca: 'general',
    monto: '50%',
    estado: 'en-riesgo',
    diferencia: 7.5,
    porcentaje: 109,
    color: '#f59e0b',
    vigenciaSemestres: 8,
    semestreActual: 4
  }
])

const alertas = ref([
  {
    id: 'alert-1',
    tipo: 'error',
    mensaje: 'Has perdido la Beca de Manutención. Necesitas 2.5 puntos más para recuperarla.',
    accion: 'Ver cómo recuperarla',
    becaId: 'beca-2'
  },
  {
    id: 'alert-2',
    tipo: 'warning',
    mensaje: 'Beca Deportiva en zona de riesgo. Solo 7.5 puntos de margen sobre el mínimo.',
    accion: 'Ver qué necesito',
    becaId: 'beca-3'
  }
])
</script>