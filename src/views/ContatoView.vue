<script setup>
import { onMounted, reactive, ref } from "vue"
import { sendContactEmail } from "@/features/emailjs/email"
import InputField from "@/contato/InputField.vue"
import TextAreaField from "@/contato/TextAreaField.vue"
import SubmitButton from "@/contato/SubmitButton.vue"
import gsap from "gsap"

const form = reactive({
  name: "",
  email: "",
  subject: "",
  message: "",
  company: "",
})

const status = ref("idle")
const feedback = ref("")
const lastSubmitAt = ref(0)

const limits = {
  nameMax: 80,
  emailMax: 120,
  subjectMax: 120,
  messageMin: 10,
  messageMax: 1000,
  cooldownMs: 15000,
}

const resetForm = () => {
  form.name = ""
  form.email = ""
  form.subject = ""
  form.message = ""
  form.company = ""
}

const normalizeText = (value) => value.trim()

const countLinks = (value) => {
  const matches = value.match(/https?:\/\/\S+/gi)
  return matches ? matches.length : 0
}

const validateForm = () => {
  if (form.company) {
    return "Envio bloqueado."
  }

  const now = Date.now()
  if (now - lastSubmitAt.value < limits.cooldownMs) {
    return "Aguarde alguns segundos antes de enviar novamente."
  }

  form.name = normalizeText(form.name)
  form.email = normalizeText(form.email)
  form.subject = normalizeText(form.subject)
  form.message = normalizeText(form.message)

  if (!form.name || form.name.length > limits.nameMax) {
    return `Nome inválido (máximo ${limits.nameMax} caracteres).`
  }

  if (!form.email || form.email.length > limits.emailMax) {
    return `Email inválido (máximo ${limits.emailMax} caracteres).`
  }

  if (form.subject.length > limits.subjectMax) {
    return `Assunto muito longo (máximo ${limits.subjectMax} caracteres).`
  }

  if (form.message.length < limits.messageMin || form.message.length > limits.messageMax) {
    return `Mensagem deve ter entre ${limits.messageMin} e ${limits.messageMax} caracteres.`
  }

  if (countLinks(form.message) > 2) {
    return "Mensagem contém muitos links."
  }

  return ""
}

const handleSubmit = async () => {
  status.value = "loading"
  feedback.value = ""
  const validationError = validateForm()
  if (validationError) {
    status.value = "error"
    feedback.value = validationError
    return
  }
  try {
    await sendContactEmail({
      name: form.name,
      email: form.email,
      subject: form.subject,
      message: form.message,
    })
    status.value = "success"
    feedback.value = "Mensagem enviada com sucesso. Obrigado pelo contato."
    lastSubmitAt.value = Date.now()
    resetForm()
  } catch (error) {
    status.value = "error"
    feedback.value = "Não foi possível enviar agora. Tente novamente em instantes."
    console.error(error)
  }
}

onMounted(() => {
  gsap.from(".main-container", {
    opacity: 0,
    duration: 0.9,
    ease: "power1.out",
  })
})
</script>

<template>
  <section class="main-container min-h-[calc(100vh-4rem)] bg-gradient-to-br from-slate-50 via-white to-slate-100">
       <p class="ml-8 mt-8 mb-8 text-[38px] font-bold font-sans whitespace-nowrap">
         Contato
       </p>
    <div class="mx-auto w-full max-w-3xl px-6 py-12">
      
      <div class="mb-10 space-y-3 text-center">
        <h1 class="text-4xl font-semibold text-gray-900 sm:text-5xl">Vamos conversar?</h1>
      </div>

      <form
        class="space-y-6 rounded-[32px] border border-white/60 bg-white/80 p-8 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.45)] backdrop-blur"
        @submit.prevent="handleSubmit"
      >
        <div class="grid gap-5 sm:grid-cols-2">
          <InputField
            v-model="form.name"
            label="Nome"
            name="name"
            required
            autocomplete="name"
            :maxlength="limits.nameMax"
            placeholder="Seu nome completo"
          />
          <InputField
            v-model="form.email"
            label="Email"
            name="email"
            type="email"
            required
            autocomplete="email"
            :maxlength="limits.emailMax"
            placeholder="voce@email.com"
          />
        </div>

        <InputField
          v-model="form.subject"
          label="Assunto"
          name="subject"
          :maxlength="limits.subjectMax"
          placeholder="Sobre o que é?"
        />

        <TextAreaField
          v-model="form.message"
          label="Mensagem"
          name="message"
          required
          :minlength="limits.messageMin"
          :maxlength="limits.messageMax"
          placeholder="Escreva sua mensagem"
        />

        <input
          v-model="form.company"
          type="text"
          name="company"
          autocomplete="off"
          tabindex="-1"
          aria-hidden="true"
          class="pointer-events-none absolute h-0 w-0 opacity-0"
        />

        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <SubmitButton :loading="status === 'loading'" label="Enviar mensagem" />
          <p
            v-if="feedback"
            class="text-sm"
            :class="status === 'success' ? 'text-emerald-600' : 'text-rose-600'"
            aria-live="polite"
          >
            {{ feedback }}
          </p>
        </div>
        <p class="text-xs text-gray-400">
          Limites: até {{ limits.messageMax }} caracteres, no máximo 2 links por mensagem.
        </p>
      </form>
    </div>
      
  </section>
</template>
