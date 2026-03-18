<script setup>
import { nextTick, onMounted, ref, watch } from "vue"
import SkillCard from "./SkillCard.vue"
import gsap from "gsap"

const props = defineProps({
  title: String,
  items: Array,
})

const listRoot = ref(null)

const runAnimation = async () => {
  await nextTick()
  const targets = listRoot.value?.querySelectorAll(".skill-card") || []
  gsap.killTweensOf(targets)
  gsap.fromTo(
    targets,
    { autoAlpha: 0, y: 10 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.08,
      ease: "power1.out",
      delay: 1,
      clearProps: "opacity,transform,visibility",
    }
  )
}

onMounted(runAnimation)
watch(
  () => props.items,
  () => runAnimation(),
  { deep: true }
)
</script>

<template>
  <section ref="listRoot" class="space-y-6">
    <p class="text-2xl font-semibold">
      {{ title }}
    </p>

    <div class="grid grid-cols-2 gap-5 md:grid-cols-3">
      <SkillCard
        class="skill-card"
        v-for="item in items"
        :key="item.name"
        :name="item.name"
        :icon="item.icon"
      />
    </div>
  </section>
</template>
