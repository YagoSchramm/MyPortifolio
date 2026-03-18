
<script setup>
import { onMounted } from "vue"
import gsap from "gsap"
import HomeHero from '@/components/Home/HomeHero.vue'

onMounted(() => {
  gsap.from(".main-container", {
    opacity: 0,
    duration: 0.9,
    ease: "power1.out",
  })
})
</script>

<template>
  <div class="main-container">
    <HomeHero />
  </div>
</template>
