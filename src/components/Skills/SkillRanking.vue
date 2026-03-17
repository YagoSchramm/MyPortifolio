<script setup>
import SkillBar from "./SkillBar.vue"

defineProps({
  skills: Array
})
</script>

<template>
  <div class="backdrop-blur-md  mb-8 bg-white/40 border border-white/20 rounded-2xl p-6 shadow-lg space-y-6">
    <SkillBar
      v-for="skill in skills"
      :key="skill.name"
      :name="skill.name"
      :percent="skill.percent"
      :icon="skill.icon"
    />
  </div>
</template>