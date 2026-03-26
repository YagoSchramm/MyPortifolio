<script setup>
import { computed } from 'vue'
import useLucide from '../../composables/useLucide'

const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  href: {
    type: String,
    default: '',
  },
  variant: {
    type: String,
    default: 'dark',
  },
})

const emit = defineEmits(['click'])

const isLink = computed(() => !!props.href)

useLucide()
</script>

<template>
  <component
    :is="isLink ? 'a' : 'button'"
    :href="isLink ? href : undefined"
    :target="isLink ? '_blank' : undefined"
    :rel="isLink ? 'noopener noreferrer' : undefined"
    :type="!isLink ? 'button' : undefined"
    @click="emit('click')"
    class="flex w-full items-center justify-between rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-900 hover:border-gray-300"
  >
    <span class="flex items-center gap-3">
      <i :class="icon"></i>
      <span class="font-medium text-gray-700">{{ label }}</span>
    </span>
    <i data-lucide="arrow-up-right" class="h-4 w-4 text-gray-400"></i>
  </component>
</template>
