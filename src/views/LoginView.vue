<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 dark:from-neutral-900 dark:to-neutral-800 px-4">
    <div class="w-full max-w-md">
      <!-- Logo y título -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-20 h-20 bg-primary-600 rounded-2xl mb-4 shadow-lg">
          <GraduationCap class="w-10 h-10 text-white" />
        </div>
        <h1 class="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
          TecNM Celaya
        </h1>
        <p class="text-neutral-600 dark:text-neutral-400">
          Sistema de Información Institucional
        </p>
      </div>

      <!-- Formulario de login -->
      <div class="card p-8">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Correo institucional
            </label>
            <div class="relative">
              <Mail class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                id="email"
                v-model="email"
                type="email"
                required
                placeholder="l20030065@celaya.tecnm.mx"
                class="input-field pl-10"
                :disabled="authStore.isLoading"
              />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Contraseña
            </label>
            <div class="relative">
              <Lock class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                required
                placeholder="••••••••"
                class="input-field pl-10 pr-10"
                :disabled="authStore.isLoading"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
              >
                <EyeOff v-if="showPassword" class="w-5 h-5" />
                <Eye v-else class="w-5 h-5" />
              </button>
            </div>
          </div>

          <!-- Mensaje de error -->
          <div v-if="authStore.error" class="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <AlertCircle class="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <p class="text-sm text-red-600 dark:text-red-400">{{ authStore.error }}</p>
          </div>

          <button
            type="submit"
            class="btn-primary w-full flex items-center justify-center gap-2"
            :disabled="authStore.isLoading"
          >
            <Loader2 v-if="authStore.isLoading" class="w-5 h-5 animate-spin" />
            <LogIn v-else class="w-5 h-5" />
            <span>{{ authStore.isLoading ? 'Iniciando sesión...' : 'Iniciar sesión' }}</span>
          </button>
        </form>
      </div>

      <!-- Footer -->
      <p class="text-center text-sm text-neutral-600 dark:text-neutral-400 mt-6">
        Instituto Tecnológico de Celaya © 2025
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { GraduationCap, Mail, Lock, Eye, EyeOff, LogIn, AlertCircle, Loader2 } from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const showPassword = ref(false)

const handleLogin = async () => {
  const result = await authStore.login(email.value, password.value)

  if (result.success) {
    router.push('/')
  }
}
</script>