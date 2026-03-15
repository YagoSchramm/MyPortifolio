<script setup>
import { computed, ref } from 'vue';
import ProjectCard from './ProjectCard.vue';
import ProjectsArrowButton from './ProjectsArrowButton.vue';

const projects = ref([
  {
    id: 1,
    img: 'https://picsum.photos/600/800?1',
    title: 'Deserto',
    desc: 'Areias infinitas.',
    language: 'Vue',
    githubUrl: 'https://github.com/',
    isOnline: true,
  },
  {
    id: 2,
    img: 'https://picsum.photos/600/800?2',
    title: 'Floresta',
    desc: 'Verde profundo.',
    language: 'JavaScript',
    githubUrl: 'https://github.com/',
    isOnline: false,
  },
  {
    id: 3,
    img: 'https://picsum.photos/600/800?3',
    title: 'Folha',
    desc: 'Detalhes da natureza.',
    language: 'TypeScript',
    githubUrl: 'https://github.com/',
    isOnline: true,
  },
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
