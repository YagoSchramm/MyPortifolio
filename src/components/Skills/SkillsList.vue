<script setup>
import SkillCard from "./SkillCard.vue"

defineProps({
  title: String,
  items: Array
})
</script>

<template>
  <section class="space-y-6">

    <p class="text-2xl font-semibold">
      {{ title }}
    </p>

    <div class="grid grid-cols-2 md:grid-cols-3 gap-5">
      <SkillCard
        v-for="item in items"
        :key="item.name"
        :name="item.name"
        :icon="item.icon"
      />
    </div>

  </section>
</template>