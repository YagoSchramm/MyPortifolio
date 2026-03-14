<script setup>
import useLucide from '../composables/useLucide'

useLucide()
</script>

<template>
  <div class="flex items-center gap-4">
    <button class="text-gray-600 p-2 rounded-lg" type="button" aria-label="Abrir menu">
      <i data-lucide="menu" class="w-6 h-6"></i>
    </button>

    <div class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm">
        Y
      </div>
    </div>
  </div>
</template>
