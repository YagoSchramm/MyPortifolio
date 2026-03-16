<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { signInAdmin } from "@/features/firebase/auth/auth"
import StatusMessage from "@/components/Common/StatusMessage.vue"

const router = useRouter()
const email = ref("")
const password = ref("")
const isLoading = ref(false)
const message = ref("")
const messageType = ref("success")

const handleSubmit = async () => {
  if (isLoading.value) return
  message.value = ""
  isLoading.value = true
  try {
    const userCredential = await signInAdmin(email.value, password.value)
    const token = await userCredential.user.getIdToken()
    sessionStorage.setItem("token", token)
    messageType.value = "success"
    message.value = "Login realizado com sucesso."
    setTimeout(() => {
      router.push("/admin")
    }, 700)
  } catch (error) {
    messageType.value = "error"
    message.value = "Nao foi possivel entrar. Verifique seus dados."
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-[calc(100vh-4rem)] bg-white px-6 py-16">
    <div class="mx-auto w-full max-w-md">
      <StatusMessage v-if="message" class="mb-4" :type="messageType" :message="message" />
      <div class="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
      <div class="space-y-2 text-center">
        <p class="text-sm font-semibold uppercase tracking-wide text-gray-400">Area Administrativa</p>
        <h1 class="text-2xl font-semibold text-gray-900">Entrar</h1>
        <p class="text-sm text-gray-500">Use suas credenciais para acessar o painel.</p>
      </div>

      <form class="mt-8 space-y-4" @submit.prevent="handleSubmit">
        <div class="space-y-1">
          <label class="text-sm font-medium text-gray-700" for="login-email">Email</label>
          <input
            id="login-email"
            v-model.trim="email"
            class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none focus:border-gray-400"
            type="email"
            placeholder="voce@exemplo.com"
            autocomplete="email"
            required
          />
        </div>

        <div class="space-y-1">
          <label class="text-sm font-medium text-gray-700" for="login-password">Senha</label>
          <input
            id="login-password"
            v-model.trim="password"
            class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none focus:border-gray-400"
            type="password"
            placeholder="********"
            autocomplete="current-password"
            required
          />
        </div>

        <button
          class="mt-2 w-full rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-70"
          type="submit"
          :disabled="isLoading"
        >
          {{ isLoading ? "Entrando..." : "Entrar" }}
        </button>
      </form>
      </div>
    </div>
  </div>
</template>
