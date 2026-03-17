<script setup>
import { ref, onMounted } from "vue"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const props = defineProps({
  name: String,
  percent: Number,
  icon: String
})

const bar = ref(null)

onMounted(() => {
  gsap.fromTo(
    bar.value,
    { width: "0%" },
    {
      width: props.percent + "%",
      duration: 1.4,
      ease: "power3.out",
      scrollTrigger: {
        trigger: bar.value,
        start: "top 90%",
      }
    }
  )
})
</script>

<template>
  <div class="space-y-2">
    <div class="flex items-center justify-between">

      <div class="flex items-center gap-3">
        <i :class="icon + ' text-xl'"></i>
        <span class="font-medium">{{ name }}</span>
      </div>

      <span class="text-gray-500">{{ percent }}%</span>

    </div>

    <div class="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
      <div
        ref="bar"
        class="h-full bg-gradient-to-r from-black to-gray-700 rounded-full"
      ></div>
    </div>
  </div>
</template>