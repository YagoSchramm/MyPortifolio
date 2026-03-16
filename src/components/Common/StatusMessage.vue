<script setup>
const props = defineProps({
  type: {
    type: String,
    default: "success",
  },
  message: {
    type: String,
    required: true,
  },
})

const baseClasses =
  "rounded-xl border px-4 py-3 text-sm font-medium"

const typeClasses = {
  success: "border-emerald-200 bg-emerald-50 text-emerald-700",
  error: "border-red-200 bg-red-50 text-red-600",
}
</script>

<template>
  <div :class="[baseClasses, typeClasses[type] || typeClasses.success]">
    {{ message }}
  </div>
</template>
