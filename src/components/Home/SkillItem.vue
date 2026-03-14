<script setup>
defineProps({
  iconClass: {
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
  <div class="flex items-center gap-4">
    <i :class="iconClass" class="text-[28px] text-gray-500"></i>
    <span class="font-medium text-gray-600">{{ label }}</span>
  </div>
</template>
