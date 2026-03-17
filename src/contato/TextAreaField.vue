<script setup>
const model = defineModel({ type: String, default: "" })

defineProps({
  label: { type: String, required: true },
  name: { type: String, default: "" },
  placeholder: { type: String, default: "" },
  rows: { type: [Number, String], default: 6 },
  required: { type: Boolean, default: false },
  minlength: { type: [Number, String], default: undefined },
  maxlength: { type: [Number, String], default: undefined },
})
</script>

<template>
  <label class="space-y-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
    {{ label }}
    <textarea
      v-model="model"
      :name="name"
      :rows="rows"
      :required="required"
      :minlength="minlength"
      :maxlength="maxlength"
      :placeholder="placeholder"
      class="w-full resize-none rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-base font-medium text-gray-900 shadow-sm transition focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
    ></textarea>
  </label>
</template>
