<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import gsap from 'gsap'
import useLucide from '../composables/useLucide'

const route = useRoute()

const linksWrapRef = ref(null)
const indicatorRef = ref(null)
const homeRef = ref(null)
const sobreRef = ref(null)
const hasSizedIndicator = ref(false)

useLucide()

const getEl = (templateRef) => {
  const value = templateRef.value
  if (!value) return null
  return value.$el ?? value
}

const moveIndicator = async () => {
  await nextTick()
  const indicator = getEl(indicatorRef)
  const wrap = getEl(linksWrapRef)
  const target = route.path === '/sobre' ? getEl(sobreRef) : getEl(homeRef)

  if (!indicator || !wrap || !target) return

  const wrapRect = wrap.getBoundingClientRect()
  const targetRect = target.getBoundingClientRect()
  const nextX = targetRect.left - wrapRect.left
  const nextY = targetRect.top - wrapRect.top
  const nextWidth = targetRect.width
  const nextHeight = targetRect.height

  if (!hasSizedIndicator.value) {
    gsap.set(indicator, {
      x: nextX,
      y: nextY,
      width: nextWidth,
      height: nextHeight,
    })
    hasSizedIndicator.value = true
    return
  }

  gsap.to(indicator, {
    x: nextX,
    y: nextY,
    width: nextWidth,
    height: nextHeight,
    duration: 0.4,
    ease: 'power2.out',
  })
}

const runAfterPaint = (fn) => {
  requestAnimationFrame(() => requestAnimationFrame(fn))
}

onMounted(async () => {
  await nextTick()
  moveIndicator()
  runAfterPaint(moveIndicator)
  const onLoad = () => moveIndicator()
  window.addEventListener('load', onLoad)

  onBeforeUnmount(() => {
    window.removeEventListener('load', onLoad)
  })
})
watch(() => route.fullPath, moveIndicator)
</script>

<template>
  <div class="flex items-center border border-gray-200 rounded-full px-2 py-1.5 shadow-sm">
    <div ref="linksWrapRef" class="relative flex items-center">
      <div
        ref="indicatorRef"
        class="absolute left-0 top-0 rounded-full bg-gray-100 pointer-events-none shadow-sm"
      ></div>

      <RouterLink
        ref="homeRef"
        to="/"
        class="relative z-10 flex items-center gap-2 px-4 py-2 rounded-full"
        :class="route.path === '/' ? 'text-gray-900 font-medium' : 'text-gray-500 hover:text-gray-900'"
      >
        <i data-lucide="home" class="w-4 h-4"></i>
        <span v-if="route.path === '/'">Home</span>
      </RouterLink>
      <RouterLink
        ref="sobreRef"
        to="/sobre"
        class="relative z-10 flex items-center gap-2 px-4 py-2 rounded-full"
        :class="route.path === '/sobre' ? 'text-gray-900 font-medium' : 'text-gray-500 hover:text-gray-900'"
      >
        <i data-lucide="user" class="w-4 h-4"></i>
        <span v-if="route.path === '/sobre'">Sobre</span>
      </RouterLink>
    </div>

    <div class="flex items-center gap-1 px-2">
      <a href="#" class="p-2.5 text-gray-500 hover:text-gray-900 transition" aria-label="Projetos">
        <i data-lucide="briefcase" class="w-5 h-5"></i>
      </a>
      <a href="#" class="p-2.5 text-gray-500 hover:text-gray-900 transition" aria-label="Leituras">
        <i data-lucide="book-open" class="w-5 h-5"></i>
      </a>
      <a href="#" class="p-2.5 text-gray-500 hover:text-gray-900 transition" aria-label="Blog">
        <i data-lucide="notebook-pen" class="w-5 h-5"></i>
      </a>
      <a href="#" class="p-2.5 text-gray-500 hover:text-gray-900 transition" aria-label="Contato">
        <i data-lucide="mail" class="w-5 h-5"></i>
      </a>
    </div>
  </div>
</template>
