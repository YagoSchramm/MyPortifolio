<script setup>
import ProjectsLayoutSwitcher from '@/components/Projects/ProjectsLayoutSwitcher.vue';
</script>

<template>
  <section class="projects-view">
    <div class="header">
      
      <ProjectsLayoutSwitcher />
    </div>
    <RouterView />
  </section>
</template>

<style scoped>
.projects-view {
  display: grid;
  gap: 24px;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  padding: 0 24px;
}

h1 {
  margin: 0;
}

@media (max-width: 900px) {
  .header {
    padding: 0 16px;
  }
}
</style>
