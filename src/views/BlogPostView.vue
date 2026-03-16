<script setup>
import { computed, onMounted, ref, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
import { getPost } from "@/features/firebase/posts/posts"

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

onMounted(loadPost)
watch(() => route.params.id, loadPost)
</script>

<template>
  <div class="px-6 py-10">
    <div class="mx-auto w-full max-w-3xl">
      <button
        class="mb-6 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:border-gray-300"
        type="button"
        @click="router.push('/blog')"
      >
        Voltar
      </button>

      <p v-if="loadError" class="text-sm text-red-500">{{ loadError }}</p>
      <p v-else-if="isLoading" class="text-sm text-gray-500">Carregando...</p>

      <article v-else-if="post" class="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <p class="text-xs font-semibold uppercase tracking-wide text-gray-400">Postagem</p>
        <h1 class="mt-2 text-3xl font-semibold text-gray-900">{{ post.title || "Sem titulo" }}</h1>
        <p class="mt-3 text-sm text-gray-500">{{ post.summary || "Sem resumo" }}</p>
        <div class="mt-6 space-y-4 text-sm text-gray-700">
          <p v-if="post.content">{{ post.content }}</p>
          <p v-else>Sem conteudo.</p>
        </div>
      </article>
    </div>
  </div>
</template>
