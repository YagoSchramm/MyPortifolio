<script setup>
import { computed, ref } from 'vue';
import ProjectCard from './ProjectCard.vue';
import ProjectsArrowButton from './ProjectsArrowButton.vue';

const baseUrl = import.meta.env.BASE_URL;
const projects = ref([
 { id: 1, img: `${baseUrl}images/Sprinter.png`, title: 'Sprinter', desc: 'Um aplicativo de monitoramento de atividades físicas focado na sustentabilidade, onde você pode realizar atividades, e com os pontos adiquiridos pelas atividades e comprar ingressos', language: 'Flutter, Dart, Firebase', githubUrl: 'https://github.com/Yago3108/Sprinter', isOnline: false },
  { id: 2, img: `${baseUrl}images/GoApi.png`, title: 'GO CRUD', desc: 'Uma API REST básica com um CRUD de produtos e com deploy via Docker.', language: 'GO, Gin, PostgreSQL', githubUrl: 'https://github.com/YagoSchramm/BasicGoApi', isOnline: true },
  { id: 3, img: `${baseUrl}images/NodeApi.png`, title: 'Node.js CRUD', desc: 'Uma API REST básica com um CRUD de clientes e com front-end em pug e bootstrap.', language: 'TypeScript, Node, Express, Pug', githubUrl: 'https://github.com/YagoSchramm/NodeBasicApi', isOnline: false},
  { id: 4, img: `${baseUrl}images/MakeYourBurguer.png`, title: 'Make Your Burguer', desc: 'Uma aplicação de monitoramento de pedidos de uma hambúrgueria que permite a criação de um hamburguer ao estilo do cliente.', language: 'Vue, GSAP, JSON server', githubUrl: 'https://github.com/YagoSchramm/MakeYourBurguer', isOnline: false },
  { id: 5, img: `${baseUrl}images/MyChat.png`, title: 'MyChat', desc: 'Um aplicativo de mensagens focado em criar novas conexões e uma experiência de usuário aprimorada.', language: 'Flutter, Dart', githubUrl: 'https://github.com/YagoSchramm/MyChat', isOnline: false },
  { id: 6, img: `${baseUrl}images/MyChatApi.png`, title: 'API MyChat', desc: 'Uma API com websocket desenvolvida para melhor experiência de usuário do aplicativo MyChat.', language: 'Go, Gin, PostgreSQL, Supabase', githubUrl: 'https://github.com/YagoSchramm/ApiMyChat', isOnline: false },
]);

const currentIndex = ref(0);

const currentProject = computed(() => projects.value[currentIndex.value]);

const goPrev = () => {
  currentIndex.value =
    (currentIndex.value - 1 + projects.value.length) % projects.value.length;
};

const goNext = () => {
  currentIndex.value = (currentIndex.value + 1) % projects.value.length;
};
</script>

<template>
  <div class="showcase">
    <ProjectsArrowButton icon="chevron-left" :on-click="goPrev" label="Projeto anterior" />

    <Transition name="project-fade" mode="out-in">
      <div class="showcase-card" :key="currentProject.id">
        <div class="image-card">
          <img :src="currentProject.img" :alt="currentProject.title" />
        </div>
        <div class="info-card">
          <ProjectCard
            :title="currentProject.title"
            :description="currentProject.desc"
            :language="currentProject.language"
            :github-url="currentProject.githubUrl"
            :is-online="currentProject.isOnline"
          />
        </div>
      </div>
    </Transition>

    <ProjectsArrowButton icon="chevron-right" :on-click="goNext" label="Projeto seguinte" />
  </div>
</template>

<style scoped>
.showcase {
  width: 100%;
  padding: 80px 24px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 24px;
  justify-content: center;
}

.showcase-card {
  display: grid;
  grid-template-columns: minmax(260px, 380px) minmax(260px, 380px);
  gap: 32px;
  align-items: stretch;
  justify-content: center;
  width: min(1000px, 100%);
  margin: 0 auto;
}

.image-card {
  width: 100%;
  aspect-ratio: 3 / 4;
  border-radius: 36px;
  overflow: hidden;
  box-shadow: 0 24px 40px rgba(0, 0, 0, 0.2);
  background: #f4f4f4;
}

.image-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.info-card {
  width: 100%;
  aspect-ratio: 3 / 4;
  display: flex;
  align-items: stretch;
  justify-content: stretch;
}

.project-fade-enter-active,
.project-fade-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}

.project-fade-enter-from {
  opacity: 0;
  transform: translateX(18px);
}

.project-fade-leave-to {
  opacity: 0;
  transform: translateX(-18px);
}

@media (max-width: 900px) {
  .showcase {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .showcase-card {
    grid-template-columns: 1fr;
  }
}
</style>
