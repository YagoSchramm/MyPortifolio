<script setup>
defineProps({
  name: String,
  icon: String
})
</script>

<template>
  <div
    class="group relative flex items-center gap-4 p-5 rounded-xl
    bg-white/40 backdrop-blur-md
    border border-white/20
    shadow-md
    transition-all duration-300
    hover:shadow-xl
    hover:-translate-y-1
    hover:scale-[1.03]"
  >

    <i :class="icon + ' text-3xl group-hover:scale-110 transition'"></i>

    <span class="font-medium text-lg">
      {{ name }}
    </span>

  </div>
</template>