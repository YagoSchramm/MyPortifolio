<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const isActive = (name) => route.name === name;
</script>

<template>
  <div class="layout-switcher" aria-label="Alternar layout de projetos">
    <RouterLink
      to="/projetos/carrossel"
      class="switcher-button"
      :class="{ active: isActive('projetos-carrossel') }"
      aria-label="Layout carrossel"
    >
      <span class="icon-parallelogram"></span>
    </RouterLink>
    <span class="switcher-separator"></span>
    <RouterLink
      to="/projetos/detalhe"
      class="switcher-button"
      :class="{ active: isActive('projetos-detalhe') }"
      aria-label="Layout detalhe"
    >
      <span class="icon-rectangle"></span>
    </RouterLink>
  </div>
</template>

<style scoped>
.layout-switcher {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  color: #0b0b0b;
}

.switcher-button {
  width: 44px;
  height: 36px;
  padding: 0;
  border-radius: 10px;
  text-decoration: none;
  color: #9a9a9a;
  background: transparent;
  transition: color 0.2s ease, transform 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.switcher-button.active {
  color: #0b0b0b;
}

.switcher-button:hover {
  transform: translateY(-1px);
}

.switcher-separator {
  width: 1px;
  height: 18px;
  background: #d6d6d6;
}

.icon-parallelogram {
  width: 22px;
  height: 16px;
  background: transparent;
  border: 2px solid currentColor;
  transform: skewX(-18deg);
  border-radius: 0;
  opacity: 0.9;
}

.icon-rectangle {
  width: 22px;
  height: 16px;
  background: transparent;
  border: 2px solid currentColor;
  border-radius: 0;
  opacity: 0.9;
}
</style>
