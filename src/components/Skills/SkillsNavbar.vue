<script setup>
import { RouterLink, useRoute } from "vue-router"
const route= useRoute()
</script>

<template>

<div class="px-8 mb-10">

  <div class="flex gap-2 bg-gray-100 p-1 rounded-xl w-fit">

    <RouterLink
      to="/skills/frameworks"
      class="px-4 py-2 rounded-lg transition"
      active-class="bg-black text-white"
    >
       Frameworks
    </RouterLink>

    <RouterLink
      to="/skills/languages"
      class="px-4 py-2 rounded-lg transition"
      active-class="bg-black text-white"
    >
 Linguagens
    </RouterLink>

    <RouterLink
      to="/skills/tools"
      class="px-4 py-2 rounded-lg transition"
      active-class="bg-black text-white"
    >
     Ferramentas
    </RouterLink>

  </div>

</div>

</template>