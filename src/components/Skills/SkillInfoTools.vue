<script setup>
import { computed } from "vue"
import SkillsList from "./SkillsList.vue"
import SkillRanking from "./SkillRanking.vue"

const props = defineProps({
  type: String
})

const data = {
  frameworks: {
    title: "Ferramentas e Banco de dados",
    skills: [
      { name: "GitHub", icon: "devicon-github-original" },
      { name: "VS code", icon: "devicon-vscode-plain" },
      { name: "AndroidStudio", icon: "devicon-androidstudio-plain" },
      { name: "Insomnia", icon: "devicon-insomnia-plain" },   
      { name: "Docker", icon: "devicon-docker-plain" },
      { name: "DBeaver", icon: "devicon-dbeaver-plain" },
      { name: "Firebase", icon: "devicon-firebase-plain" },
      { name: "Supabase", icon: "devicon-supabase-plain" },
      { name: "MySQL", icon: "devicon-mysql-original" },
      { name: "PostgreSQL", icon: "devicon-postgresql-plain" },
  
    
    ],
  }
}

const current = computed(() => data[props.type] || data.frameworks)
</script>

<template>

<div class="px-8 mb-12">

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">

    <div>
      <p class="text-2xl font-semibold mb-6">
        {{ current.title }}
      </p>

      <SkillsList :items="current.skills"/>
    </div>

  </div>

</div>

</template>