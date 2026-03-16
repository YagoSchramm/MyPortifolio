<script setup>
defineProps({
  post: {
    type: Object,
    required: true,
  },
})

defineEmits(["edit", "delete"])
</script>

<template>
  <div class="flex items-center justify-between gap-4 rounded-xl border border-gray-200 px-4 py-3">
    <div>
      <p class="text-sm font-semibold text-gray-900">{{ post.title || "Sem titulo" }}</p>
      <p class="text-xs text-gray-500">{{ post.summary || "Sem resumo" }}</p>
    </div>
    <div class="flex items-center gap-2">
      <button
        class="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:border-gray-300"
        type="button"
        @click="$emit('edit', post)"
      >
        Editar
      </button>
      <button
        class="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:border-red-300"
        type="button"
        @click="$emit('delete', post)"
      >
        Deletar
      </button>
    </div>
  </div>
</template>
