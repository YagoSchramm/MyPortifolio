<script setup>
import RoadmapCard from './RoadmapCard.vue'

defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  side: {
    type: String,
    default: 'left',
  },
  setDotRef: {
    type: Function,
    required: true,
  },
  imageSrc: {
    type: String,
    required: true,
  },
  imageAlt: {
    type: String,
    default: 'Imagem do roadmap',
  },
})
</script>

<template>
  <div class="step-item relative mb-72 flex items-center justify-center">
    <div
      :ref="(el) => setDotRef(el, index)"
      class="dot w-6 h-6 bg-white border-4 border-gray-300 rounded-full z-10 transition-colors duration-300"
    ></div>

    <div
      class="content-card absolute left-1/2 top-1/2 w-[520px] -translate-x-1/2 -translate-y-1/2 p-4 rounded-xl opacity-0"
      :data-side="side"
    >
      <div
        class="flex items-center gap-4"
        :class="side === 'right' ? 'flex-row' : 'flex-row-reverse'"
      >
        <RoadmapCard :src="imageSrc" :alt="imageAlt" />
        <div
          class="text-block min-w-[320px] opacity-0 translate-y-2"
          :class="side === 'right' ? 'text-left' : 'text-right'"
        >
          <h3 class="font-bold text-[28px]">{{ title }}</h3>
          <p class="text-[18] text-gray-600">{{ description }}</p>
        </div>
      </div>
    </div>

    <div
      class="line absolute w-12 h-px bg-black opacity-0"
      :class="side === 'right' ? 'left-1/2' : 'right-1/2'"
    ></div>
  </div>
</template>

<style scoped>
.dot.is-active {
  background-color: #000;
  border-color: #000;
}
</style>
