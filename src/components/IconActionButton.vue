<script setup>
import useLucide from '../composables/useLucide'
defineProps({
  icon: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  variant: {
    type: String,
    default: 'dark',
  },
})

useLucide()
</script>

<template>
  <button
    type="button"
    class="flex items-center justify-center gap-2 px-12 py-3 rounded-full shadow transition whitespace-nowrap"
    :class="
      variant === 'light'
        ? 'bg-white text-black hover:bg-gray-200'
        : 'bg-black text-white hover:bg-gray-800'
    "
  >
    <i :data-lucide="icon" class="w-5 h-5"></i>
    <span>{{ label }}</span>
  </button>
</template>
