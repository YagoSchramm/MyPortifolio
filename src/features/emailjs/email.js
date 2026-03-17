import emailjs from "@emailjs/browser"

const getEmailJsConfig = () => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

  if (!serviceId || !templateId || !publicKey) {
    throw new Error("Configuração do EmailJS ausente. Verifique o .env.")
  }

  return { serviceId, templateId, publicKey }
}

export const sendContactEmail = async ({
  name = "",
  email = "",
  subject = "",
  message = "",
} = {}) => {
  const { serviceId, templateId, publicKey } = getEmailJsConfig()

  const templateParams = {
    from_name: name,
    reply_to: email,
    subject,
    message,
  }

  const response = await emailjs.send(serviceId, templateId, templateParams, publicKey)
  return response
}
