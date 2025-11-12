<template>
  <!-- Backdrop -->
  <Transition name="fade">
    <div
      v-if="show"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      @click.self="$emit('close')"
    >
      <!-- Modal -->
      <div
        class="bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
        @click.stop
      >
        <!-- Header -->
        <div class="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-700">
          <div class="flex items-center gap-3">
            <div class="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
              <Award class="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h3 class="text-xl font-bold text-neutral-900 dark:text-white">
                {{ isEditing ? 'Editar Beca' : 'Nueva Beca' }}
              </h3>
              <p class="text-sm text-neutral-600 dark:text-neutral-400">
                Configura los requisitos de tu beca
              </p>
            </div>
          </div>
          <button
            @click="$emit('close')"
            class="p-2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
          >
            <X class="w-5 h-5" />
          </button>
        </div>

        <!-- Content -->
        <div class="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Información Básica -->
            <div>
              <h4 class="font-semibold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                <Info class="w-4 h-4" />
                Información Básica
              </h4>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Nombre de la Beca *
                  </label>
                  <input
                    v-model="formData.nombre"
                    type="text"
                    required
                    placeholder="Ej: Beca de Excelencia"
                    class="input-field"
                  />
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Tipo de Beca *
                    </label>
                    <select v-model="formData.tipoBeca" class="input-field" required>
                      <option value="general">Promedio General</option>
                      <option value="semestral">Promedio Semestral</option>
                    </select>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Monto/Porcentaje
                    </label>
                    <input
                      v-model="formData.monto"
                      type="text"
                      placeholder="Ej: 100% o $5,000 MXN"
                      class="input-field"
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Color de Identificación
                  </label>
                  <div class="flex items-center gap-3">
                    <input
                      v-model="formData.color"
                      type="color"
                      class="w-12 h-12 rounded-lg border-2 border-neutral-200 dark:border-neutral-600 cursor-pointer"
                    />
                    <span class="text-sm text-neutral-600 dark:text-neutral-400">
                      {{ formData.color }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Requisitos Académicos -->
            <div>
              <h4 class="font-semibold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                <GraduationCap class="w-4 h-4" />
                Requisitos Académicos
              </h4>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Promedio Mínimo Requerido *
                  </label>
                  <div class="relative">
                    <input
                      v-model="formData.promedioMinimo"
                      type="number"
                      min="0"
                      max="100"
                      step="0.1"
                      required
                      placeholder="85.0"
                      class="input-field"
                    />
                    <span class="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 text-sm">
                      / 100
                    </span>
                  </div>
                  <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    Promedio mínimo que debes mantener para conservar la beca
                  </p>
                </div>

                <div>
                  <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Créditos Mínimos Aprobados (opcional)
                  </label>
                  <input
                    v-model="formData.creditosMinimos"
                    type="number"
                    min="0"
                    placeholder="35"
                    class="input-field"
                  />
                  <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    Número mínimo de créditos que debes aprobar por periodo
                  </p>
                </div>
              </div>
            </div>

            <!-- Vigencia -->
            <div>
              <h4 class="font-semibold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                <Calendar class="w-4 h-4" />
                Vigencia
              </h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Semestre de Inicio
                  </label>
                  <input
                    v-model="formData.semestreInicio"
                    type="number"
                    min="1"
                    placeholder="1"
                    class="input-field"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Vigencia (semestres)
                  </label>
                  <input
                    v-model="formData.vigenciaSemestres"
                    type="number"
                    min="1"
                    placeholder="10"
                    class="input-field"
                  />
                </div>
              </div>
            </div>

            <!-- Notas Adicionales -->
            <div>
              <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Notas Adicionales
              </label>
              <textarea
                v-model="formData.notas"
                rows="3"
                placeholder="Requisitos adicionales, condiciones especiales, etc."
                class="input-field resize-none"
              ></textarea>
            </div>

            <!-- Plantillas Rápidas -->
            <div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div class="flex items-start gap-2 mb-3">
                <Lightbulb class="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p class="text-sm font-semibold text-blue-900 dark:text-blue-100">
                    Plantillas Rápidas
                  </p>
                  <p class="text-xs text-blue-700 dark:text-blue-300">
                    Usa una plantilla predefinida para agilizar el registro
                  </p>
                </div>
              </div>
              <div class="flex flex-wrap gap-2">
                <button
                  type="button"
                  @click="aplicarPlantilla('excelencia')"
                  class="px-3 py-1.5 bg-white dark:bg-neutral-700 text-blue-700 dark:text-blue-300 rounded-lg text-xs font-medium hover:bg-blue-100 dark:hover:bg-neutral-600 transition-colors"
                >
                  Beca Excelencia (85+)
                </button>
                <button
                  type="button"
                  @click="aplicarPlantilla('manutención')"
                  class="px-3 py-1.5 bg-white dark:bg-neutral-700 text-blue-700 dark:text-blue-300 rounded-lg text-xs font-medium hover:bg-blue-100 dark:hover:bg-neutral-600 transition-colors"
                >
                  Beca Manutención (90+)
                </button>
                <button
                  type="button"
                  @click="aplicarPlantilla('conacyt')"
                  class="px-3 py-1.5 bg-white dark:bg-neutral-700 text-blue-700 dark:text-blue-300 rounded-lg text-xs font-medium hover:bg-blue-100 dark:hover:bg-neutral-600 transition-colors"
                >
                  CONACYT (80+)
                </button>
              </div>
            </div>
          </form>
        </div>

        <!-- Footer -->
        <div class="flex items-center justify-end gap-3 p-6 border-t border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg transition-colors font-medium"
          >
            Cancelar
          </button>
          <button
            type="submit"
            @click="handleSubmit"
            class="btn-primary flex items-center gap-2"
          >
            <Save class="w-4 h-4" />
            <span>{{ isEditing ? 'Guardar Cambios' : 'Crear Beca' }}</span>
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch } from 'vue'
import {
  Award,
  X,
  Info,
  GraduationCap,
  Calendar,
  Lightbulb,
  Save
} from 'lucide-vue-next'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  beca: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'save'])

const isEditing = ref(false)

const formData = ref({
  nombre: '',
  tipoBeca: 'general',
  promedioMinimo: null,
  creditosMinimos: null,
  monto: '',
  color: '#10b981',
  vigenciaSemestres: null,
  semestreInicio: null,
  notas: ''
})

// Plantillas predefinidas
const plantillas = {
  excelencia: {
    nombre: 'Beca de Excelencia',
    tipoBeca: 'general',
    promedioMinimo: 85,
    creditosMinimos: null,
    monto: '100%',
    color: '#10b981',
    vigenciaSemestres: 10,
    semestreInicio: 1,
    notas: 'Renovación automática si se mantiene el promedio mínimo'
  },
  manutención: {
    nombre: 'Beca de Manutención',
    tipoBeca: 'semestral',
    promedioMinimo: 90,
    creditosMinimos: 35,
    monto: '$5,000 MXN',
    color: '#3b82f6',
    vigenciaSemestres: 4,
    semestreInicio: 1,
    notas: 'Requiere mantener promedio semestral y aprobar créditos mínimos'
  },
  conacyt: {
    nombre: 'Beca CONACYT',
    tipoBeca: 'general',
    promedioMinimo: 80,
    creditosMinimos: 30,
    monto: '$6,500 MXN',
    color: '#f59e0b',
    vigenciaSemestres: 8,
    semestreInicio: 1,
    notas: 'Beca de posgrado, requiere dedicación de tiempo completo'
  }
}

const aplicarPlantilla = (tipo) => {
  formData.value = { ...plantillas[tipo] }
}

const handleSubmit = () => {
  emit('save', formData.value)
  emit('close')
  // Resetear formulario
  formData.value = {
    nombre: '',
    tipoBeca: 'general',
    promedioMinimo: null,
    creditosMinimos: null,
    monto: '',
    color: '#10b981',
    vigenciaSemestres: null,
    semestreInicio: null,
    notas: ''
  }
}

watch(() => props.show, (newVal) => {
  if (newVal && props.beca) {
    isEditing.value = true
    formData.value = { ...props.beca }
  } else {
    isEditing.value = false
  }
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>