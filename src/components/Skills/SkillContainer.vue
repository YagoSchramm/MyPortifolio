<template>
      <div class="mb-8">
      <SkillsNavbar />
    <RouterView />
            </div>
</template>

<script setup>
import SkillsNavbar from './SkillsNavbar.vue';
import { RouterView } from 'vue-router';
</script>

<style>

</style>
