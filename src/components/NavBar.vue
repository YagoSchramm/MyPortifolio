<script setup>
import NavBrand from './NavBrand.vue'
import NavLinks from './NavLinks.vue'
import NavStatus from './NavStatus.vue'
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between px-6 bg-white border-b border-gray-100">
    <NavBrand />
    <NavLinks />
    <NavStatus />
  </nav>
</template>
