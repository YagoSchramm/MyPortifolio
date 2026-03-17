<script setup>
defineProps({
  label: { type: String, default: "Enviar mensagem" },
  loading: { type: Boolean, default: false },
})
</script>

<template>
  <button
    type="submit"
    :disabled="loading"
    class="inline-flex items-center justify-center rounded-xl bg-gray-900 px-7 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white shadow-lg shadow-gray-900/20 transition hover:-translate-y-0.5 hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
  >
    {{ loading ? 'Enviando...' : label }}
  </button>
</template>
