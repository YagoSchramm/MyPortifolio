<script setup>
import { computed } from "vue"
import SkillsList from "./SkillsList.vue"
import SkillRanking from "./SkillRanking.vue"

const props = defineProps({
  type: String
})

const data = {
  frameworks: {
    title: "Linguagens de Programação",
    skills: [
  { name: "JavaScript", icon: "devicon-javascript-plain" },
  { name: "TypeScript", icon: "devicon-typescript-plain" },
  { name: "Go", icon: "devicon-go-original-wordmark" },
  { name: "Dart", icon: "devicon-dart-plain" },
  { name: "Java", icon: "devicon-java-plain" },
  { name: "C", icon: "devicon-c-original" },
  { name: "Python", icon: "devicon-python-plain" }
    ],
    ranking: [
    { name: "Java",percent:89 , icon: "devicon-java-plain" },
   { name: "Go", percent: 80, icon: "devicon-go-original-wordmark" },
    { name: "JavaScript", percent: 80, icon: "devicon-javascript-plain" },
    { name: "Dart",percent:  80,icon: "devicon-dart-plain" },
          { name: "C",percent: 78, icon: "devicon-c-original" },
    { name: "Python", percent: 75, icon: "devicon-python-plain" },
      { name: "TypeScript",percent: 74,icon: "devicon-typescript-plain" },



    ]
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

      <SkillsList :items="current.skills" :istools=false />
    </div>


  </div>

</div>

</template>
