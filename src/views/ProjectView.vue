<script setup>
import { onMounted } from "vue"
import gsap from "gsap"
import ProjectsLayoutContainer from "@/components/Projects/ProjectsLayoutContainer.vue"

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
    <p class="ml-8 mt-8 mb-8 text-[38px] font-bold font-sans whitespace-nowrap">
      Projetos
    </p>
    <p class="ml-12 mb-12 text-2xl text-gray-600 font-sans">
      Projetos desenvolvidos com foco em interfaces interativas e animações fluidas.<br>
      Clique em um card para ver as tecnologias utilizadas e os desafios resolvidos.
    </p>
    <ProjectsLayoutContainer />
  </div>
</template>
