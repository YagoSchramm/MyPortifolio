<script setup>
import { computed, onMounted, ref } from "vue"
import PostItem from "@/components/Admin/PostItem.vue"
import {
  createPost,
  deletePost,
  listPosts,
  updatePost,
} from "@/features/firebase/posts/posts"
import gsap from "gsap"

const posts = ref([])
const title = ref("")
const summary = ref("")
const content = ref("")
const isLoadingPosts = ref(false)
const isSaving = ref(false)
const isDeleting = ref(false)
const loadError = ref("")
const actionMessage = ref("")
const messageType = ref("success")

const isEditOpen = ref(false)
const editId = ref("")
const editTitle = ref("")
const editSummary = ref("")
const editContent = ref("")
const isUpdating = ref(false)

const totalPosts = computed(() => posts.value.length)

const withTimeout = (promise, ms = 10000) =>
  Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), ms)),
  ])

const loadPosts = async () => {
  isLoadingPosts.value = true
  loadError.value = ""
  try {
    posts.value = await withTimeout(listPosts({ limitCount: 50 }))
  } catch (error) {
    loadError.value = "Nao foi possivel carregar as postagens."
  } finally {
    isLoadingPosts.value = false
  }
}

const handleCreate = async () => {
  if (isSaving.value) return
  actionMessage.value = ""
  isSaving.value = true
  try {
    await withTimeout(
      createPost({
        title: title.value,
        summary: summary.value,
        content: content.value,
      })
    )
    title.value = ""
    summary.value = ""
    content.value = ""
    messageType.value = "success"
    actionMessage.value = "Postagem criada com sucesso."
    await loadPosts()
  } catch (error) {
    messageType.value = "error"
    actionMessage.value =
      error?.message === "timeout"
        ? "O servidor demorou para responder. Tente novamente."
        : "Nao foi possivel criar a postagem."
  } finally {
    isSaving.value = false
  }
}

const openEdit = (post) => {
  editId.value = post.id
  editTitle.value = post.title || ""
  editSummary.value = post.summary || ""
  editContent.value = post.content || ""
  isEditOpen.value = true
}

const closeEdit = () => {
  isEditOpen.value = false
  editId.value = ""
  editTitle.value = ""
  editSummary.value = ""
  editContent.value = ""
}

const handleUpdate = async () => {
  if (isUpdating.value || !editId.value) return
  actionMessage.value = ""
  isUpdating.value = true
  try {
    await withTimeout(
      updatePost(editId.value, {
        title: editTitle.value,
        summary: editSummary.value,
        content: editContent.value,
      })
    )
    messageType.value = "success"
    actionMessage.value = "Postagem atualizada."
    closeEdit()
    await loadPosts()
  } catch (error) {
    messageType.value = "error"
    actionMessage.value =
      error?.message === "timeout"
        ? "O servidor demorou para responder. Tente novamente."
        : "Nao foi possivel atualizar a postagem."
  } finally {
    isUpdating.value = false
  }
}

const handleDelete = async (post) => {
  if (isDeleting.value) return
  const confirmed = window.confirm(`Deletar a postagem "${post.title || "Sem titulo"}"?`)
  if (!confirmed) return
  actionMessage.value = ""
  isDeleting.value = true
  try {
    await withTimeout(deletePost(post.id))
    messageType.value = "success"
    actionMessage.value = "Postagem removida."
    await loadPosts()
  } catch (error) {
    messageType.value = "error"
    actionMessage.value =
      error?.message === "timeout"
        ? "O servidor demorou para responder. Tente novamente."
        : "Nao foi possivel deletar a postagem."
  } finally {
    isDeleting.value = false
  }
}

onMounted(() => {
  loadPosts()
  gsap.from(".main-container", {
    opacity: 0,
    duration: 0.9,
    ease: "power1.out",
  })
})
</script>

<template>
  <div class="main-container min-h-[calc(100vh-4rem)] bg-white px-6 py-12">
    <div class="mx-auto w-full max-w-5xl">
      <header class="mb-8">
        <p class="text-xs font-semibold uppercase tracking-wide text-gray-400">Dashboard</p>
        <h1 class="text-3xl font-semibold text-gray-900">Admin</h1>
        <p class="mt-2 text-sm text-gray-500">Gerencie as postagens do blog.</p>
      </header>

      <div class="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <section class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 class="text-lg font-semibold text-gray-900">Resumo</h2>
          <div class="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <p class="text-sm text-gray-500">Total de postagens</p>
            <p class="mt-2 text-3xl font-semibold text-gray-900">{{ totalPosts }}</p>
          </div>
        </section>

        <section class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 class="text-lg font-semibold text-gray-900">Nova postagem</h2>
          <form class="mt-4 space-y-4" @submit.prevent="handleCreate">
            <div class="space-y-1">
              <label class="text-sm font-medium text-gray-700" for="post-title">Titulo</label>
              <input
                id="post-title"
                v-model.trim="title"
                class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none focus:border-gray-400"
                type="text"
                placeholder="Digite o titulo"
              />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium text-gray-700" for="post-summary">Resumo</label>
              <textarea
                id="post-summary"
                v-model.trim="summary"
                class="min-h-[140px] w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none focus:border-gray-400"
                placeholder="Descreva a postagem"
              ></textarea>
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium text-gray-700" for="post-content">Conteudo</label>
              <textarea
                id="post-content"
                v-model.trim="content"
                class="min-h-[160px] w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none focus:border-gray-400"
                placeholder="Escreva o conteudo completo"
              ></textarea>
            </div>
            <button
              class="w-full rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-900"
              type="submit"
              :disabled="isSaving"
            >
              {{ isSaving ? "Salvando..." : "Salvar postagem" }}
            </button>
          </form>
        </section>
      </div>

      <section class="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-gray-900">Postagens</h2>
          <button
            class="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:border-gray-300"
            type="button"
            :disabled="isLoadingPosts"
            @click="loadPosts"
          >
            Atualizar
          </button>
        </div>

        <p
          v-if="actionMessage"
          class="mt-3 rounded-lg border px-3 py-2 text-xs font-medium"
          :class="messageType === 'error' ? 'border-red-200 bg-red-50 text-red-600' : 'border-emerald-200 bg-emerald-50 text-emerald-700'"
        >
          {{ actionMessage }}
        </p>
        <p v-if="loadError" class="mt-3 text-sm text-red-500">{{ loadError }}</p>
        <p v-else-if="isLoadingPosts" class="mt-3 text-sm text-gray-500">Carregando...</p>

        <div v-else class="mt-4 space-y-3">
          <PostItem
            v-for="post in posts"
            :key="post.id"
            :post="post"
            @edit="openEdit"
            @delete="handleDelete"
          />

          <p v-if="posts.length === 0" class="text-sm text-gray-500">Nenhuma postagem encontrada.</p>
        </div>
      </section>

      <div v-if="isEditOpen" class="fixed inset-0 z-50 flex items-center justify-center px-4">
        <button
          class="absolute inset-0 bg-black/40"
          type="button"
          aria-label="Fechar"
          @click="closeEdit"
        ></button>
        <div class="relative w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">Editar postagem</h3>
            <button
              class="rounded-full p-2 text-gray-500 hover:text-gray-900"
              type="button"
              aria-label="Fechar"
              @click="closeEdit"
            >
              X
            </button>
          </div>
          <form class="mt-4 space-y-4" @submit.prevent="handleUpdate">
            <div class="space-y-1">
              <label class="text-sm font-medium text-gray-700" for="edit-title">Titulo</label>
              <input
                id="edit-title"
                v-model.trim="editTitle"
                class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none focus:border-gray-400"
                type="text"
              />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium text-gray-700" for="edit-summary">Resumo</label>
              <textarea
                id="edit-summary"
                v-model.trim="editSummary"
                class="min-h-[120px] w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none focus:border-gray-400"
              ></textarea>
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium text-gray-700" for="edit-content">Conteudo</label>
              <textarea
                id="edit-content"
                v-model.trim="editContent"
                class="min-h-[160px] w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none focus:border-gray-400"
              ></textarea>
            </div>
            <div class="flex items-center justify-end gap-2">
              <button
                class="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 hover:border-gray-300"
                type="button"
                @click="closeEdit"
              >
                Cancelar
              </button>
              <button
                class="rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-gray-900"
                type="submit"
                :disabled="isUpdating"
              >
                {{ isUpdating ? "Salvando..." : "Salvar" }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
