<script setup>
import IconBadge from '../Home/IconBadge.vue'
import IconActionButton from '../Home/IconActionButton.vue'
import ProfileImageCard from '../Home/ProfileImageCard.vue'
import SkillsGrid from '../Home/SkillsGrid.vue'
import StatsGrid from '../Home/StatsGrid.vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import gsap from 'gsap'
import SocialActionButton from './SocialActionButton.vue'
onMounted(() => {
  gsap.from('#hero-section', {
    opacity: 0,
    duration: 0.8,
  })
  gsap.from(".action-button",{
  opacity: 0,
  y: -20,
  duration: 1.2,
  })
})

const router = useRouter()

const goProjects = () => router.push({ name: 'projetos-carrossel' })
const goBlog = () => router.push({ name: 'blog' })
</script>

<template>
  <section class="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center font-sans" id="hero-section">
    <div class="justify-center">
      <div class="flex items-center gap-2 justify-center">
        <IconBadge icon="map-pin" text="Gaspar SC" />
        <IconBadge icon="briefcase" text="Full Stack Developer" />
      </div>

      <div class="text-center py-2 space-y-1">
        <span class="text-center text-[34px] text-gray-500 font-medium font-sans">
          Desenvolvedor de soluções
          <br>
        </span>
        <span class="text-center text-[75px] font-bold font-sans">
          Yago Schramm
          <br>
        </span>
        <span class="w-20 text-center text-2xl text-gray-600 font-sans">
          Full-Stack Developer apaixonado por tecnologia. Desenvolvo soluções eficientes e escaláveis para
          produtos de diversos tipos, utilizando arquiteturas modernas e boas práticas de código.
          <br>
        </span>
      </div>

      <SkillsGrid />
      <div class="action-button flex mt-12 justify-center gap-4">
        <IconActionButton icon="code-xml" label="Ver Projetos" @click="goProjects" />
        <IconActionButton  icon="notebook-pen" label="Ler Blog" variant="light" @click="goBlog" />
      </div>
    
    </div>

    <div class="lg:justify-self-end w-full max-w-[420px] space-y-4">
      <ProfileImageCard />
      <StatsGrid />
    </div>
  </section>

</template>
