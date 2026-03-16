<script setup>
import useLucide from '../../composables/useLucide';

const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  language: { type: String, required: true },
  githubUrl: { type: String, required: true },
  isOnline: { type: Boolean, default: false },
});

useLucide();
</script>

<template>
  <div class="grid h-full w-full content-start gap-3 bg-transparent px-[18px] py-4 text-left text-[#0b0b0b]">
    <div class="flex items-center justify-between gap-4">
      <h3 class="ml-5 m-0 text-[32px] font-bold leading-tight">{{ title }}</h3>
      <div
        class="flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-medium shadow"
        :class="
          isOnline
            ? 'bg-emerald-50 text-emerald-700'
            : 'bg-gray-100 text-gray-600'
        "
      >
        <span
          class="h-2.5 w-2.5 rounded-full"
          :class="isOnline ? 'bg-emerald-500' : 'bg-gray-400'"
        ></span>
        {{ isOnline ? 'Online' : 'Offline' }}
      </div>
    </div>

    <p class="ml-8 m-0 text-[22px] text-gray-600">
      {{ description }}
    </p>

    <div class="flex items-center gap-2">
      <span class="ml-8 text-[0.78rem] uppercase tracking-[0.06em] text-[#4f4f4f]">
        Tecnologias :
      </span>
      <span class=" text-[0.95rem] font-semibold">{{ language }}</span>
    </div>

    <a
      class="ml-5 mt-8 inline-flex h-9 w-fit items-center justify-center gap-2 rounded-full bg-[#0b0b0b] px-[14px] text-[0.85rem] font-semibold text-white transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_16px_rgba(0,0,0,0.2)]"
      :href="githubUrl"
      target="_blank"
      rel="noopener"
    >
      <i data-lucide="github" class="h-4 w-4"></i>
      Ver no GitHub
    </a>
  </div>
</template>
