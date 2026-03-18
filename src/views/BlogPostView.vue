<script setup>
import { computed, onMounted, ref, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
import { getPost } from "@/features/firebase/posts/posts"
import gsap from "gsap"

const route = useRoute()
const router = useRouter()

const post = ref(null)
const isLoading = ref(false)
const loadError = ref("")

const postId = computed(() => route.params.id)

const loadPost = async () => {
  if (!postId.value) return
  isLoading.value = true
  loadError.value = ""
  try {
    post.value = await getPost(postId.value)
    if (!post.value) {
      loadError.value = "Postagem nao encontrada."
    }
  } catch (error) {
    loadError.value = "Nao foi possivel carregar a postagem."
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadPost()
  gsap.from(".main-container", {
    opacity: 0,
    duration: 0.9,
    ease: "power1.out",
  })
})
watch(() => route.params.id, loadPost)
</script>

<template>
  <div class="main-container min-h-[calc(100vh-4rem)] bg-gradient-to-b from-slate-50 via-white to-white px-6 py-12">
    <div class="mx-auto w-full max-w-4xl space-y-6">
      <button
        class="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-700 shadow-sm transition hover:-translate-y-[1px] hover:border-gray-300 hover:shadow-md"
        type="button"
        @click="router.push('/blog')"
      >
        ← Voltar para o blog
      </button>

      <div class="rounded-[28px] border border-gray-100 bg-white/90 p-8 shadow-[0_14px_40px_-18px_rgba(15,23,42,0.35)] backdrop-blur">
        <p class="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">Postagem</p>

        <h1 class="mt-3 text-4xl font-bold leading-tight text-gray-900">
          {{ post?.title || "Sem título" }}
        </h1>

        <p class="mt-4 text-lg text-gray-600">
          {{ post?.summary || "Sem resumo." }}
        </p>

        <div class="mt-6 h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

        <div class="mt-8 space-y-5 text-base leading-7 text-gray-700">
          <p v-if="isLoading" class="text-sm text-gray-500">Carregando conteúdo...</p>
          <p v-else-if="loadError" class="text-sm text-rose-600">{{ loadError }}</p>
          <p v-else-if="post?.content">
            {{ post.content }}
          </p>
          <p v-else class="text-sm text-gray-500">Sem conteúdo.</p>
        </div>
      </div>
    </div>
  </div>
</template>
