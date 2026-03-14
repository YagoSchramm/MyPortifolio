<script setup>
defineProps({
  icon: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-[18px]">
    <div class="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
      <i :data-lucide="icon" class="w-5 h-5"></i>
    </div>
    <div class="leading-tight">
      <span class="block text-2xl font-bold text-black">{{ value }}</span>
      <span class="block text-base text-gray-500">{{ label }}</span>
    </div>
  </div>
</template>
