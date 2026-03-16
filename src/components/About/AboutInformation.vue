<template>
<div class="mt-8 ml-12">
       <span class="about-title text-center text-[25px] text-gray-500 mt-12 font-medium font-sans">
          Sobre mim
          <br>
        </span>
       <p class="name ml-2 text-[38px] font-bold font-sans whitespace-nowrap">
          Yago Schramm de Souza
       </p>
         <div class="mt-6 ml-5">
            <span class="about-description w-18 text-left text-2xl text-gray-600 font-sans">
      Desenvolvedor Full Stack com foco no ecossistema GoLang e Dart/Flutter. 
      Especialista na construção de APIs de alta performance e interfaces fluidas,
       aplico princípios de Clean Architecture para garantir código escalável e de fácil manutenção. 
       Tenho sólida experiência na modelagem de dados com bancos relacionais e NoSQL,
       focando na persistência eficiente e na integridade das regras de negócio. Movido por metodologias ágeis,
       busco entregar soluções que equilibrem rigor técnico e uma experiência de usuário excepcional em projetos reais 
       e desafiadores. 
          
        </span>
         </div>
</div>
</template>

<script>
import gsap from 'gsap';
export default {
name:"AboutInformation",
mounted:()=>{
const tl= gsap.timeline();
tl.from(".about-title",{
x:-25,
opacity:0,
duration:2,
})
tl.from(".name",{
x:-25,
opacity:0,
duration:1,
})
tl.from(".about-description",{
x:-25,
opacity:0,
duration:1,
})
}
}
</script>

<style>

</style>