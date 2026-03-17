<script setup>
defineProps({
  name: { type: String, required: true },
  icon: { type: String, required: true },
})
</script>

<template>
  <div class="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
    <span class="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
      <i :class="`text-xl ${icon}`"></i>
    </span>
    <span class="text-sm font-semibold uppercase tracking-[0.2em] text-gray-700">{{ name }}</span>
  </div>
</template>
