<script setup>
defineProps({
  size: {
    type: Number,
    default: 120,
  },
})
</script>

<template>
  <div class="flex items-center justify-center">
    <div class="relative" :style="{ width: `${size}px`, height: `${size}px` }">
      <div
        class="absolute inset-0 rounded-full border-4 border-gray-200 border-t-gray-700 animate-spin"
      ></div>
      <div class="absolute inset-2 rounded-full bg-gray-100 animate-pulse"></div>
      <div class="absolute inset-5 rounded-full bg-white flex items-center justify-center overflow-hidden">
        <img src="/favicon.png" class="w-full h-full object-cover" alt="Logo">
      </div>
    </div>
  </div>
</template>
<style  scoped>

</style>
