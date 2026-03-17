<script setup>
import SkillContainer from '@/components/Skills/SkillContainer.vue';
import gsap from 'gsap';
import { onMounted } from 'vue';
onMounted(()=>{
  gsap.from(".main-container",{
    opacity:0,
    duration:1,
  })
  })
</script>

<template>

  <div class="main-container flex flex-col w-full">

    <p class="ml-8 mt-8 mb-6 text-[38px] font-bold font-sans">
      Skills
    </p>

    <p class="ml-8 mb-10 text-2xl text-gray-600">
      Tecnologias que utilizo para construir aplicações.
    </p>

<SkillContainer />

  </div>

</template>