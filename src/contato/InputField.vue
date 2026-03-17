<script setup>
const model = defineModel({ type: String, default: "" })

defineProps({
  label: { type: String, required: true },
  type: { type: String, default: "text" },
  name: { type: String, default: "" },
  placeholder: { type: String, default: "" },
  required: { type: Boolean, default: false },
  minlength: { type: [Number, String], default: undefined },
  maxlength: { type: [Number, String], default: undefined },
  autocomplete: { type: String, default: "off" },
})
</script>

<template>
  <label class="space-y-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
    {{ label }}
    <input
      v-model="model"
      :type="type"
      :name="name"
      :required="required"
      :minlength="minlength"
      :maxlength="maxlength"
      :autocomplete="autocomplete"
      :placeholder="placeholder"
      class="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-base font-medium text-gray-900 shadow-sm transition focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
    />
  </label>
</template>
