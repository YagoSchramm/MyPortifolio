<script setup>
import { ref } from "vue"
import SkillCard from "@/components/Skills/SkillCard.vue"

defineProps({
  title: { type: String, default: "" },
  items: { type: Array, default: () => [] },
})

const scrollerRef = ref(null)

const scrollByAmount = (direction) => {
  if (!scrollerRef.value) return
  const amount = Math.round(scrollerRef.value.clientWidth * 0.6)
  scrollerRef.value.scrollBy({ left: direction * amount, behavior: "smooth" })
}
</script>

<template>
  <section class="space-y-4">
    <p v-if="title" class="ml-8 text-[28px] font-semibold font-sans whitespace-nowrap">
      {{ title }}
    </p>
    <div class="relative px-8">
      <button
        type="button"
        class="absolute -left-2 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition hover:text-gray-900 md:flex"
        @click="scrollByAmount(-1)"
        aria-label="Anterior"
      >
        ‹
      </button>
      <div
        ref="scrollerRef"
        class="flex gap-4 overflow-x-auto scroll-smooth pb-2 pr-2"
        style="scrollbar-width: thin"
      >
        <SkillCard v-for="item in items" :key="item.name" :name="item.name" :icon="item.icon" />
      </div>
      <button
        type="button"
        class="absolute -right-2 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition hover:text-gray-900 md:flex"
        @click="scrollByAmount(1)"
        aria-label="Proximo"
      >
        ›
      </button>
    </div>
  </section>
</template>
