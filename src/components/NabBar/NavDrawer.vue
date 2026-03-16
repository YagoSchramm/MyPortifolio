<script setup>
import { onBeforeUnmount, onMounted } from 'vue'
import useLucide from '../../composables/useLucide'

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close'])

useLucide()

const onKeydown = (event) => {
  if (!props.open) return
  if (event.key === 'Escape') {
    emit('close')
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <Transition name="drawer">
    <div v-if="open" class="drawer-wrapper fixed inset-0 z-50">
      <button
        class="absolute inset-0 bg-black/30"
        type="button"
        aria-label="Fechar menu"
        @click="emit('close')"
      ></button>

      <aside
        class="drawer-panel absolute left-0 top-0 flex h-full w-80 flex-col bg-white shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-label="Menu lateral"
      >
        <div class="flex items-center justify-between border-b border-gray-100 px-6 py-5">
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-full bg-black text-sm font-bold text-white">
              Y
            </div>
            <div>
              <p class="text-sm font-semibold text-gray-900">Yago Schramm de Souza</p>
              <p class="text-xs text-gray-500">Portfólio</p>
            </div>
          </div>
          <button
            class="rounded-full p-2 text-gray-500 hover:text-gray-900"
            type="button"
            aria-label="Fechar menu"
            @click="emit('close')"
          >
            <i data-lucide="x" class="h-5 w-5"></i>
          </button>
        </div>

        <div class="flex-1 px-6 py-6">
          <div class="rounded-xl border border-gray-200 px-4 py-4">
            <p class="text-xs font-semibold uppercase tracking-wide text-gray-400">Tema</p>
            <div class="mt-3 grid grid-cols-2 gap-2">
              <button
                class="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-900"
                type="button"
                aria-pressed="true"
              >
                <i data-lucide="sun" class="h-4 w-4 text-gray-600"></i>
                Claro
              </button>
              <button
                class="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-600"
                type="button"
                aria-pressed="false"
              >
                <i data-lucide="moon" class="h-4 w-4 text-gray-500"></i>
                Escuro
              </button>
            </div>
          </div>
        </div>

        <div class="border-t border-gray-100 px-6 py-5">
          <RouterLink
            class="flex w-full items-center justify-between rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-900 hover:border-gray-300"
            to="/login"
            @click="emit('close')"
          >
            <span class="flex items-center gap-3">
              <i data-lucide="shield-check" class="h-5 w-5 text-gray-600"></i>
              Login de administrador
            </span>
            <i data-lucide="arrow-right" class="h-4 w-4 text-gray-400"></i>
          </RouterLink>
        </div>
      </aside>
    </div>
  </Transition>
</template>

<style scoped>
.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.2s ease;
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}

.drawer-panel {
  transform: translateX(0);
  transition: transform 0.25s ease;
}

.drawer-enter-from .drawer-panel,
.drawer-leave-to .drawer-panel {
  transform: translateX(-100%);
}
</style>
