<script setup>
import { computed } from "vue"
import SkillsList from "./SkillsList.vue"
import SkillRanking from "./SkillRanking.vue"

const props = defineProps({
  type: String
})

const data = {
  frameworks: {
    title: "Frameworks & Bibliotecas",
    skills: [
      { name: "Node.js", icon: "devicon-nodejs-plain" },
      { name: "Flutter", icon: "devicon-flutter-plain" },
      { name: "Vue", icon: "devicon-vuejs-plain" },
      { name: "Express", icon: "devicon-express-original" },
      { name: "Flask", icon: "devicon-flask-original" }
    ],
    ranking: [
      { name: "Node.js", percent: 90, icon: "devicon-nodejs-plain" },
      { name: "Express", percent: 85, icon: "devicon-express-original" },
      { name: "Flutter", percent: 80, icon: "devicon-flutter-plain" },
            { name: "Flask", percent: 50, icon: "devicon-flask-original" }
    ]
  }
}

const current = computed(() => data[props.type] || data.frameworks)
</script>

<template>

<div class="px-8">

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">

    <div>
      <p class="text-2xl font-semibold mb-6">
        {{ current.title }}
      </p>

      <SkillsList :items="current.skills"/>
    </div>

    <div>
      <p class="text-2xl font-semibold mb-6">
        Nível de Proficiência
      </p>

      <SkillRanking :skills="current.ranking"/>
    </div>

  </div>

</div>

</template>