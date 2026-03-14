<script setup>
import Roadmap from '@/components/Roadmap.vue';
import AboutInformation from '@/components/AboutInformation.vue';
import gsap from 'gsap';
import Lenis from 'lenis';
import { onBeforeUnmount, onMounted } from 'vue';
let lenis;
let rafId;
onMounted(()=>{
  gsap.from(".about",{
    opacity:0,
    duration:0.8
  });

  lenis = new Lenis({
    smoothWheel: true,
    smoothTouch: false
  });

  const raf = (time) => {
    lenis.raf(time);
    rafId = requestAnimationFrame(raf);
  };
  rafId = requestAnimationFrame(raf);
});

onBeforeUnmount(()=>{
  if (rafId) {
    cancelAnimationFrame(rafId);
  }
  if (lenis) {
    lenis.destroy();
  }
  lenis = undefined;
  rafId = undefined;
});
</script>

<template>
  <div class="about flex flex-col">
    <AboutInformation />
      <p class="ml-12 mt-12 text-[38px] font-bold font-sans whitespace-nowrap">
          Roadmap
       </p>
    <div class="w-full flex justify-center">
      <Roadmap />
    </div>
  </div>
</template>
