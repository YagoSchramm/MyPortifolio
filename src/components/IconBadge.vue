<script setup>
import useLucide from '../composables/useLucide'

defineProps({
  icon: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
})

useLucide()
</script>

<template>
  <div class="flex items-center gap-2 border border-black-200 px-4 py-2 rounded-full text-gray-500">
    <i :data-lucide="icon" class="w-5 h-5"></i>
    {{ text }}
  </div>
</template>
