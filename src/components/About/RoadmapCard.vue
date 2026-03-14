<template>
  <div class="card relative w-[275px] min-w-[250px] max-w-[275px] h-[320px] flex-none rounded-[24px] ml-20 overflow-hidden">
    <img :src="src" class="w-full h-full object-cover" :alt="alt">
  </div>
</template>

<script>
import gsap from 'gsap';
export default {
name:"RoadmapCard",
props: {
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: 'Imagem do roadmap'
  }
},
mounted(){
gsap.from(".card",{
x:-25,
opacity:0.6,
}
)
}
}
</script>

<style scope>

</style>
