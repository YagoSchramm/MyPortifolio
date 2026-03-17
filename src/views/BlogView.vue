<script setup>
import { onMounted, ref } from "vue"
import PostCard from "@/components/Blog/PostCard.vue"
import { listPostsPage } from "@/features/firebase/posts/posts"
import gsap from "gsap"
const posts = ref([])
const isLoading = ref(false)
const loadError = ref("")
const limitCount = 9
const lastDoc = ref(null)
const hasMore = ref(true)

const loadPosts = async () => {

  isLoading.value = true
  loadError.value = ""
  try {
    const { items, lastDoc: last } = await listPostsPage({ limitCount })
    posts.value = items
    lastDoc.value = last
    hasMore.value = Boolean(last)
  } catch (error) {
    loadError.value = "Nao foi possivel carregar as postagens."
  } finally {
    isLoading.value = false
  }
}

const handleLoadMore = async () => {
  if (!hasMore.value || isLoading.value) return
  isLoading.value = true
  loadError.value = ""
  try {
    const { items, lastDoc: last } = await listPostsPage({
      limitCount,
      startAfterDoc: lastDoc.value,
    })
    posts.value = [...posts.value, ...items]
    lastDoc.value = last
    hasMore.value = Boolean(last)
  } catch (error) {
    loadError.value = "Nao foi possivel carregar mais postagens."
  } finally {
    isLoading.value = false
  }
}

onMounted(
 loadPosts
)
</script>

<template>
  <div class="main-container px-6 py-8">
    <h1 class="text-[38px] font-bold font-sans">Blog</h1>

    <p v-if="loadError" class="mt-4 text-sm text-red-500">{{ loadError }}</p>
    <p v-else-if="isLoading" class="mt-4 text-sm text-gray-500">Carregando...</p>

    <div v-else class="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <PostCard v-for="post in posts" :key="post.id" :post="post" />
      <p v-if="posts.length === 0" class="text-sm text-gray-500">Nenhuma postagem encontrada.</p>
    </div>

    <div v-if="posts.length > 0" class="mt-8 flex justify-center">
      <button
        class="rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:border-gray-300"
        type="button"
        :disabled="isLoading || !hasMore"
        @click="handleLoadMore"
      >
        {{ isLoading ? "Carregando..." : hasMore ? "Carregar mais" : "Sem mais postagens" }}
      </button>
    </div>
  </div>
</template>
