<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const isActive = (name) => route.name === name;
</script>

<template>
  <div
    class="inline-flex items-center gap-3 text-neutral-950"
    aria-label="Alternar layout de projetos"
  >
    <RouterLink
      to="/projetos/carrossel"
      class="inline-flex h-9 w-11 items-center justify-center rounded-[10px] bg-transparent p-0 text-neutral-400 transition-[color,transform] duration-200 hover:-translate-y-0.5"
      :class="{ 'text-neutral-950': isActive('projetos-carrossel') }"
      aria-label="Layout carrossel"
    >
      <span
        class="h-4 w-[22px] -skew-x-[18deg] border-2 border-current opacity-90"
      ></span>
    </RouterLink>
    <span class="h-[18px] w-px bg-neutral-300"></span>
    <RouterLink
      to="/projetos/detalhe"
      class="inline-flex h-9 w-11 items-center justify-center rounded-[10px] bg-transparent p-0 text-neutral-400 transition-[color,transform] duration-200 hover:-translate-y-0.5"
      :class="{ 'text-neutral-950': isActive('projetos-detalhe') }"
      aria-label="Layout detalhe"
    >
      <span
        class="h-4 w-[22px] border-2 border-current opacity-90"
      ></span>
    </RouterLink>
  </div>
</template>
