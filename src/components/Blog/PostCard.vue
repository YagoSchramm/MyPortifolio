<script setup>
defineProps({
  post: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <RouterLink
    class="block rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-gray-300"
    :to="`/blog/${post.id}`"
  >
    <p class="text-xs font-semibold uppercase tracking-wide text-gray-400">Postagem</p>
    <h3 class="mt-2 text-lg font-semibold text-gray-900">{{ post.title || "Sem titulo" }}</h3>
    <p class="mt-2 text-sm text-gray-600">{{ post.summary || "Sem resumo" }}</p>
  </RouterLink>
</template>
