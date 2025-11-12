<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // Aplicar modo oscuro si está guardado
  const isDark = localStorage.getItem('darkMode') === 'true'
  if (isDark) {
    document.documentElement.classList.add('dark')
  }
})
</script>