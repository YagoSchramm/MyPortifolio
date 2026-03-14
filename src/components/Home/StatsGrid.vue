<script setup>
import { onMounted } from 'vue';
import StatCard from './StatCard.vue'
import gsap from 'gsap';
const stats = [
  { icon: 'book-open', value: '10+', label: 'Projetos entregues' },
  { icon: 'terminal', value: '8+', label: 'Linguagens e frameworks' },
]
onMounted(()=>{
    gsap.from(".statCard",{
  opacity: 0,
  x: 25,
  duration: 0.5,
  stagger:0.3
  })
})

</script>

<template>
  <div class="grid grid-cols-2 gap-3 w-full">
    <StatCard class="statCard" v-for="stat in stats" :key="stat.label" :icon="stat.icon" :value="stat.value" :label="stat.label" />
  </div>
</template>
