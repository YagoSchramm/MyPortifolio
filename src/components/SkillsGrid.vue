<script setup>
import { onMounted } from 'vue';
import SkillItem from './SkillItem.vue'
import gsap from 'gsap';
const skills = [
  { iconClass: 'devicon-go-original-wordmark', label: 'GoLang' },
  { iconClass: 'devicon-flutter-plain', label: 'Flutter' },
  { iconClass: 'devicon-dart-plain', label: 'Dart' },
  { iconClass: 'devicon-javascript-plain', label: 'JavaScript & Node.js' },
]
onMounted(()=>{
gsap.from(".language", {
  opacity: 0,
  y: -20,
  duration: 0.5,
  stagger: 0.2
})
})
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 p-8">
    <SkillItem class="language" v-for="skill in skills" :key="skill.label" :icon-class="skill.iconClass" :label="skill.label" />
  </div>
</template>
