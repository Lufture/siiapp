<template>
  <div class="min-h-screen bg-neutral-50 dark:bg-neutral-900">
    <!-- Sidebar -->
    <aside
      :class="[
        'fixed top-0 left-0 z-40 h-screen transition-transform',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
        'lg:translate-x-0 w-64 bg-white dark:bg-neutral-800 border-r border-neutral-200 dark:border-neutral-700'
      ]"
    >
      <div class="h-full flex flex-col">
        <!-- Logo -->
        <div class="p-6 border-b border-neutral-200 dark:border-neutral-700">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <GraduationCap class="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 class="font-bold text-neutral-900 dark:text-white">TecNM</h2>
              <p class="text-xs text-neutral-600 dark:text-neutral-400">Celaya</p>
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 p-4 space-y-1 overflow-y-auto">
          <router-link
            v-for="item in menuItems"
            :key="item.name"
            :to="item.path"
            class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors"
            :class="[
              $route.name === item.name
                ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700'
            ]"
            @click="closeSidebarOnMobile"
          >
            <component :is="item.icon" class="w-5 h-5" />
            <span class="font-medium">{{ item.label }}</span>
          </router-link>
        </nav>

        <!-- User info -->
        <div class="p-4 border-t border-neutral-200 dark:border-neutral-700">
          <div v-if="studentStore.studentInfo" class="flex items-center gap-3 mb-3">
            <div class="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-bold">
              {{ getInitials(studentStore.studentInfo.persona) }}
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-neutral-900 dark:text-white truncate">
                {{ studentStore.studentInfo.persona }}
              </p>
              <p class="text-xs text-neutral-600 dark:text-neutral-400">
                {{ studentStore.studentInfo.numero_control }}
              </p>
            </div>
          </div>
          <button
            @click="handleLogout"
            class="w-full flex items-center justify-center gap-2 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <LogOut class="w-4 h-4" />
            <span class="text-sm font-medium">Cerrar sesión</span>
          </button>
        </div>
      </div>
    </aside>

    <!-- Overlay móvil -->
    <div
      v-if="isSidebarOpen"
      class="fixed inset-0 bg-black/50 z-30 lg:hidden"
      @click="closeSidebar"
    ></div>

    <!-- Main content -->
    <div class="lg:pl-64">
      <!-- Navbar -->
      <header class="sticky top-0 z-20 bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
        <div class="flex items-center justify-between px-4 py-4">
          <button
            @click="toggleSidebar"
            class="lg:hidden p-2 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg"
          >
            <Menu class="w-6 h-6" />
          </button>

          <h1 class="text-xl font-bold text-neutral-900 dark:text-white">
            {{ currentPageTitle }}
          </h1>

          <button
            @click="toggleDarkMode"
            class="p-2 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors"
          >
            <Moon v-if="!isDarkMode" class="w-5 h-5" />
            <Sun v-else class="w-5 h-5" />
          </button>
        </div>
      </header>

      <!-- Page content -->
      <main class="p-4 md:p-6 lg:p-8">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useStudentStore } from '@/stores/student'
import {
  GraduationCap,
  LayoutDashboard,
  BookOpen,
  Calendar,
  FileText,
  LogOut,
  Menu,
  Moon,
  Sun
} from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const studentStore = useStudentStore()

const isSidebarOpen = ref(false)
const isDarkMode = ref(false)

const menuItems = [
  { name: 'dashboard', path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { name: 'calificaciones', path: '/calificaciones', label: 'Calificaciones', icon: BookOpen },
  { name: 'horarios', path: '/horarios', label: 'Horarios', icon: Calendar },
  { name: 'kardex', path: '/kardex', label: 'Kardex', icon: FileText },
]

const currentPageTitle = computed(() => {
  const item = menuItems.find(i => i.name === route.name)
  return item?.label || 'Dashboard'
})

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const closeSidebar = () => {
  isSidebarOpen.value = false
}

const closeSidebarOnMobile = () => {
  if (window.innerWidth < 1024) {
    closeSidebar()
  }
}

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  document.documentElement.classList.toggle('dark')
  localStorage.setItem('darkMode', isDarkMode.value)
}

const getInitials = (name) => {
  if (!name) return '??'
  const words = name.trim().split(' ')
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase()
  }
  return name.substring(0, 2).toUpperCase()
}

const handleLogout = () => {
  authStore.logout()
  studentStore.clearData()
  router.push('/login')
}

onMounted(async () => {
  isDarkMode.value = localStorage.getItem('darkMode') === 'true'

  // Cargar información del estudiante si no está cargada
  if (!studentStore.studentInfo) {
    try {
      await studentStore.fetchStudentInfo()
    } catch (error) {
      console.error('Error al cargar información del estudiante:', error)
    }
  }
})
</script>