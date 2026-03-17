<script setup>
import Roadmap from '@/components/About/Roadmap.vue';
import AboutInformation from '@/components/About/AboutInformation.vue';
import gsap from 'gsap';
import Lenis from 'lenis';
import { onBeforeUnmount, onMounted } from 'vue';
let lenis;
let rafId;
onMounted(()=>{
  const tl=gsap.timeline()
   tl.from(".about",{
x:-25,
opacity:0,
duration:1,
  })
  tl.from(".roadmap-title",{
x:-25,
opacity:0,
duration:1.5,
  })
    tl.from(".roadmap-line",{
x:-25,
opacity:0,
duration:1,
  })
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
  <div class="about flex flex-col w-full overflow-x-hidden">
    <AboutInformation />
      <p class="roadmap-title ml-12 mt-12 text-[38px] font-bold font-sans whitespace-nowrap">
          Roadmap
       </p>
    <div class="w-full pl-10 pr-10 flex justify-center">
      <Roadmap class="roadmap-line"/>
    </div>
  </div>
</template>
