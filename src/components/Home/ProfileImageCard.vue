<template>
  <div class="card relative w-full h-[520px] rounded-[28px] overflow-hidden shadow-lg">
    <img src="/public/images/Foto_perfil.png" class="w-full h-full object-cover" alt="Foto do desenvolvedor">
    <div class="absolute bg-white bottom-4 right-4 flex items-center gap-2 px-3.5 py-1.5 rounded-full shadow">
      <span class="w-2.5 h-2.5 bg-emerald-500 rounded-full"></span>
      <span class="text-gray-700 text-sm font-medium">Disponível para projetos</span>
    </div>
  </div>
</template>
<script>
import gsap from 'gsap';
export default {
name:"ProfileImageCard",
mounted(){
  gsap.from(".card",{
    opacity:0,
    right:-25,
    duration:1,
  })
}
}
</script>

<style>

</style>
