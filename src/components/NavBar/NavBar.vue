<script setup>
import { ref } from 'vue'
import NavBrand from '../NavBar/NavBrand.vue'
import NavLinks from './NavLinks.vue'
import NavStatus from '../NavBar/NavStatus.vue'
import NavDrawer from '../NavBar/NavDrawer.vue'

const isDrawerOpen = ref(false)

const toggleDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value
}

const closeDrawer = () => {
  isDrawerOpen.value = false
}
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between px-6 bg-white border-b border-gray-100">
    <NavBrand @toggle-drawer="toggleDrawer" />
    <NavLinks />
    <NavStatus />
  </nav>
  <NavDrawer :open="isDrawerOpen" @close="closeDrawer" />
</template>
