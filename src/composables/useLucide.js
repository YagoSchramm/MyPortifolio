import { nextTick, onBeforeUnmount, onMounted, onUpdated } from 'vue'

export default function useLucide() {
  let retryId = null
  let attempts = 0

  const refresh = async () => {
    await nextTick()
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons()
      return
    }

    if (attempts < 20) {
      attempts += 1
      retryId = setTimeout(refresh, 60)
    }
  }

  onMounted(refresh)
  onUpdated(refresh)

  onBeforeUnmount(() => {
    if (retryId) {
      clearTimeout(retryId)
    }
  })
}
