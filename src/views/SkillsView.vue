<script setup>
import AboutInformation from "@/components/About/AboutInformation.vue"
import SkillsList from "@/components/Skills/SkillsList.vue"

const languages = [
  { name: "JavaScript", icon: "devicon-javascript-plain" },
  { name: "TypeScript", icon: "devicon-typescript-plain" },
  { name: "HTML", icon: "devicon-html5-plain" },
  { name: "CSS", icon: "devicon-css3-plain" },
  { name: "Go", icon: "devicon-go-original-wordmark" },
  { name: "Dart", icon: "devicon-dart-plain" },
  { name: "Java", icon: "devicon-java-plain" },
  { name: "C", icon: "devicon-c-original" },
  { name: "Python", icon: "devicon-python-plain" },
  


]

const frameworks = [
  { name: "Vue", icon: "devicon-vuejs-plain" },
  { name: "Vite", icon: "devicon-vitejs-plain" },
  { name: "Node", icon: "devicon-nodejs-plain" },
  { name: "Express", icon: "devicon-express-original" },
    { name: "Flutter", icon: "devicon-flutter-plain" },
      { name: "Flask", icon: "devicon-flask-original" },

]

const databases = [
  { name: "Firebase", icon: "devicon-firebase-plain" },
  { name: "PostgreSQL", icon: "devicon-postgresql-plain" },
  { name: "MySQL", icon: "devicon-mysql-plain" },
    { name: "Supabase", icon: "devicon-supabase-plain" },
 
]
</script>

<template>
  <div class="about flex flex-col w-full overflow-x-hidden">
    <p class="roadmap-title ml-8 mt-8 mb-6 text-[38px] font-bold font-sans whitespace-nowrap">
      Skills
    </p>
    <p class="ml-8 mb-10 text-2xl text-gray-600 font-sans">
      Aqui estao algumas linguagens, frameworks e banco de dados que estou familiarizado e já
      realizei algum projeto.
    </p>

    <div class="space-y-10 pb-12">
      <SkillsList title="Linguagens" :items="languages" />
      <SkillsList title="Frameworks" :items="frameworks" />
      <SkillsList title="Banco de dados" :items="databases" />
    </div>
  </div>
</template>
