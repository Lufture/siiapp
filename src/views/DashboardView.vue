<template>
  <div class="space-y-6">
    <!-- Loading state -->
    <div v-if="studentStore.isLoading && !studentStore.studentInfo" class="flex items-center justify-center py-12">
      <Loader2 class="w-8 h-8 animate-spin text-primary-600" />
    </div>

    <template v-else-if="studentStore.studentInfo">
      <!-- Welcome Section -->
      <div class="card p-6 md:p-8 bg-gradient-to-br from-primary-500 to-primary-700 text-white border-0">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div class="flex items-center gap-4">
            <!-- Foto del estudiante -->
            <div class="relative flex-shrink-0">
              <img
                v-if="studentStore.studentInfo.foto"
                :src="processStudentPhoto(studentStore.studentInfo.foto)"
                :alt="studentStore.studentInfo.persona"
                class="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-4 border-white/30 shadow-lg"
                @error="handleImageError"
              />

              <div
                v-else
                class="w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white/30 shadow-lg"
              >
                <span class="text-2xl md:text-3xl font-bold">
                  {{ getInitials(studentStore.studentInfo.persona) }}
                </span>
              </div>
            </div>
            <div>
              <h2 class="text-2xl md:text-3xl font-bold mb-2">
                ¡Bienvenido, {{ getFirstName(studentStore.studentInfo.persona) }}!
              </h2>
              <p class="text-primary-100 text-lg">
                {{ studentStore.studentInfo.numero_control }} • Semestre {{ studentStore.studentInfo.semestre }}
              </p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <Award class="w-12 h-12" />
          </div>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="card p-6 hover:shadow-md transition-shadow">
          <div class="flex items-center justify-between mb-3">
            <div class="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <TrendingUp class="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <p class="text-sm text-neutral-600 dark:text-neutral-400 mb-1">Promedio General</p>
          <p class="text-2xl font-bold text-neutral-900 dark:text-white">
            {{ parseFloat(studentStore.studentInfo.promedio_aritmetico).toFixed(2) }}
          </p>
        </div>

        <div class="card p-6 hover:shadow-md transition-shadow">
          <div class="flex items-center justify-between mb-3">
            <div class="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <CheckCircle class="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <p class="text-sm text-neutral-600 dark:text-neutral-400 mb-1">Materias Aprobadas</p>
          <p class="text-2xl font-bold text-neutral-900 dark:text-white">
            {{ studentStore.studentInfo.materias_aprobadas }}
          </p>
        </div>

        <div class="card p-6 hover:shadow-md transition-shadow">
          <div class="flex items-center justify-between mb-3">
            <div class="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <BookOpen class="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <p class="text-sm text-neutral-600 dark:text-neutral-400 mb-1">Créditos Acumulados</p>
          <p class="text-2xl font-bold text-neutral-900 dark:text-white">
            {{ studentStore.studentInfo.creditos_acumulados }}
          </p>
        </div>

        <div class="card p-6 hover:shadow-md transition-shadow">
          <div class="flex items-center justify-between mb-3">
            <div class="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <Target class="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
          <p class="text-sm text-neutral-600 dark:text-neutral-400 mb-1">Avance de Carrera</p>
          <p class="text-2xl font-bold text-neutral-900 dark:text-white">
            {{ studentStore.studentInfo.porcentaje_avance }}%
          </p>
        </div>
      </div>

      <!-- Progress Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Student Profile Card with Photo -->
        <div class="card p-6">
          <h3 class="text-lg font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
            <User class="w-5 h-5" />
            Perfil del Estudiante
          </h3>
          <div class="flex flex-col items-center mb-4">
            <!-- Foto grande del estudiante -->
            <div class="relative mb-4">
              <img
                v-if="studentStore.studentInfo.foto"
                :src="processStudentPhoto(studentStore.studentInfo.foto)"
                :alt="studentStore.studentInfo.persona"
                class="w-24 h-24 rounded-full object-cover border-4 border-primary-200 dark:border-primary-800 shadow-lg"
                @error="handleImageError"
              />
              <div
                v-else
                class="w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg"
              >
                {{ getInitials(studentStore.studentInfo.persona) }}
              </div>
            </div>
            <h4 class="text-lg font-bold text-neutral-900 dark:text-white text-center mb-1">
              {{ studentStore.studentInfo.persona }}
            </h4>
            <p class="text-sm text-neutral-600 dark:text-neutral-400">
              {{ studentStore.studentInfo.email }}
            </p>
          </div>
          <div class="space-y-3 pt-4 border-t border-neutral-200 dark:border-neutral-700">
            <div class="flex items-center justify-between py-2">
              <span class="text-sm text-neutral-600 dark:text-neutral-400">Número de Control</span>
              <span class="font-semibold text-neutral-900 dark:text-white">
                {{ studentStore.studentInfo.numero_control }}
              </span>
            </div>
            <div class="flex items-center justify-between py-2">
              <span class="text-sm text-neutral-600 dark:text-neutral-400">Semestre Actual</span>
              <span class="font-semibold text-neutral-900 dark:text-white">
                {{ studentStore.studentInfo.semestre }}°
              </span>
            </div>
            <div class="flex items-center justify-between py-2">
              <span class="text-sm text-neutral-600 dark:text-neutral-400">Promedio General</span>
              <span class="font-semibold text-neutral-900 dark:text-white">
                {{ parseFloat(studentStore.studentInfo.promedio_aritmetico).toFixed(2) }}
              </span>
            </div>
          </div>
        </div>

        <!-- Progress Bar -->
        <div class="card p-6">
          <h3 class="text-lg font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
            <BarChart3 class="w-5 h-5" />
            Progreso Académico
          </h3>
          <div class="space-y-4">
            <div>
              <div class="flex justify-between text-sm mb-2">
                <span class="text-neutral-600 dark:text-neutral-400">Avance actual</span>
                <span class="font-semibold text-neutral-900 dark:text-white">
                  {{ studentStore.studentInfo.porcentaje_avance }}%
                </span>
              </div>
              <div class="h-3 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                <div
                  class="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all duration-500"
                  :style="{ width: `${studentStore.studentInfo.porcentaje_avance}%` }"
                ></div>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
              <div>
                <p class="text-sm text-neutral-600 dark:text-neutral-400">Materias Cursadas</p>
                <p class="text-xl font-bold text-neutral-900 dark:text-white">
                  {{ studentStore.studentInfo.materias_cursadas }}
                </p>
              </div>
              <div>
                <p class="text-sm text-neutral-600 dark:text-neutral-400">Materias Reprobadas</p>
                <p class="text-xl font-bold text-red-600 dark:text-red-400">
                  {{ studentStore.studentInfo.materias_reprobadas }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="card p-6">
        <h3 class="text-lg font-bold text-neutral-900 dark:text-white mb-4">Accesos Rápidos</h3>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <router-link
            to="/calificaciones"
            class="flex items-center gap-4 p-4 rounded-lg border-2 border-neutral-200 dark:border-neutral-700 hover:border-primary-500 dark:hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/10 transition-all group"
          >
            <div class="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg group-hover:bg-primary-200 dark:group-hover:bg-primary-800/40 transition-colors">
              <BookOpen class="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <p class="font-semibold text-neutral-900 dark:text-white">Calificaciones</p>
              <p class="text-sm text-neutral-600 dark:text-neutral-400">Ver mis calificaciones</p>
            </div>
          </router-link>

          <router-link
            to="/horarios"
            class="flex items-center gap-4 p-4 rounded-lg border-2 border-neutral-200 dark:border-neutral-700 hover:border-primary-500 dark:hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/10 transition-all group"
          >
            <div class="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg group-hover:bg-primary-200 dark:group-hover:bg-primary-800/40 transition-colors">
              <Calendar class="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <p class="font-semibold text-neutral-900 dark:text-white">Horarios</p>
              <p class="text-sm text-neutral-600 dark:text-neutral-400">Consultar horario</p>
            </div>
          </router-link>

          <router-link
            to="/kardex"
            class="flex items-center gap-4 p-4 rounded-lg border-2 border-neutral-200 dark:border-neutral-700 hover:border-primary-500 dark:hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/10 transition-all group"
          >
            <div class="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg group-hover:bg-primary-200 dark:group-hover:bg-primary-800/40 transition-colors">
              <FileText class="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <p class="font-semibold text-neutral-900 dark:text-white">Kardex</p>
              <p class="text-sm text-neutral-600 dark:text-neutral-400">Historial académico</p>
            </div>
          </router-link>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useStudentStore } from '@/stores/student'
import { processStudentPhoto, getInitials, getFirstName } from '@/utils/imageHelper'
import {
  Loader2,
  Award,
  TrendingUp,
  CheckCircle,
  BookOpen,
  Target,
  BarChart3,
  User,
  Calendar,
  FileText
} from 'lucide-vue-next'

const studentStore = useStudentStore()

const studentPhoto = computed(() => {
  return processStudentPhoto(studentStore.studentInfo?.foto)
})

onMounted(async () => {
  if (!studentStore.studentInfo) {
    try {
      await studentStore.fetchStudentInfo()
    } catch (error) {
      console.error('Error:', error)
    }
  }
})
</script>
