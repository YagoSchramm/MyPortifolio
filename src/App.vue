<script setup>
import { nextTick, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import NavBar from './components/NavBar.vue'
import Loader from './components/Loader.vue'

const route = useRoute()
const isLoading = ref(true)

const refreshIcons = async () => {
  await nextTick()
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons()
  }
}

onMounted(refreshIcons)
watch(() => route.fullPath, refreshIcons)

watch(isLoading, (value) => {
  if (!value) {
    refreshIcons()
  }
})

onMounted(() => {
  const timer = setTimeout(() => {
    isLoading.value = false
  }, 1200)

  return () => clearTimeout(timer)
})
</script>

<template>
  <div class="min-h-screen bg-white">
    <div v-if="isLoading" class="min-h-screen flex items-center justify-center">
      <Loader :size="140" />
    </div>
    <div v-else class="pt-16">
      <NavBar />
      <RouterView />
    </div>
  </div>
</template>

<style>
:global(*) {
  margin: 0;
  padding: 0;
}
</style>
