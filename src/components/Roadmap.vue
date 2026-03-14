<template>
  <div ref="containerRef" class="container py-20 items-center">
    <div class="relative max-w-2xl mx-auto">
      
      <div
        ref="connectorRef"
        class="connector absolute left-1/2 top-0 w-1 h-full bg-gray-200 -translate-x-1/2 z-0"
      >
        <div ref="progressBar" class="absolute left-0 top-0 w-full bg-black z-10"></div>
      </div>

      <RoadmapStep
        v-for="(item, index) in steps"
        :key="index"
        :index="index"
        :title="item.title"
        :description="item.description"
        :image-src="item.image"
        :image-alt="item.imageAlt"
        :side="index % 2 === 0 ? 'left' : 'right'"
        :set-dot-ref="setDotRef"
      />
    </div>
  </div>
</template>

<script setup>
import { nextTick, onBeforeUpdate, onBeforeUnmount, onMounted, ref } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RoadmapStep from './RoadmapStep.vue';

gsap.registerPlugin(ScrollTrigger);

const containerRef = ref(null);
const connectorRef = ref(null);
const progressBar = ref(null);
const dotRefs = ref([]);
const steps = [
{
    title: 'Fundamentos Tecnológicos: 2018',
    description: 'Início da trajetória técnica com foco em ferramentas de produtividade e design digital, estabelecendo as bases em Pacote Office, SketchUp e Gimp.',
    image: '/images/Cetelbras.png',
    imageAlt: 'Primeiros passos'
  },
  {
    title: 'Desenvolvimento Web: 2019',
    description: 'Criação do primeiro projeto web utilizando HTML e CSS, explorando estruturação de layouts e estilização através da biografia de grandes nomes da tecnologia.',
    image: '/images/Primeiro-site.png',
    imageAlt: 'Processamento iniciado'
  },
  {
    title: 'Iniciação à Programação: 2021',
    description: 'Primeiro contato com a linguagem Python, focando na sintaxe fundamental e resolução de problemas básicos de lógica de programação.',
    image: '/images/Curso-em-video.png',
    imageAlt: 'Finalizado com sucesso'
  },
  {
    title: 'Algoritmos e Lógica Estruturada: 2023',
    description: 'Ingresso no IFSC Câmpus Gaspar, aprofundando o conhecimento em algoritmos de baixo nível e estruturas de dados utilizando as linguagens Portugol e C.',
    image: '/images/IFSC.jpeg',
    imageAlt: 'Finalizado com sucesso'
  },
  {
    title: 'POO e Desenvolvimento Java: 2024',
    description: 'Evolução para o paradigma de Programação Orientada a Objetos (POO) em Java, aplicando conceitos de abstração, herança e encapsulamento em projetos autônomos.',
    image: '/images/POO.png',
    imageAlt: 'Finalizado com sucesso'
  },
  {
    title: 'Interfaces Gráficas (GUI): 2024',
    description: 'Desenvolvimento de interfaces desktop utilizando a biblioteca Swing e WindowBuilder, integrando lógica de backend com componentes visuais interativos.',
    image: '/images/Swing.png',
    imageAlt: 'Finalizado com sucesso'
  },
  {
    title: 'Mentoria e Liderança Técnica: 2025',
    description: 'Atuação como Monitor de Programação no IFSC, auxiliando alunos de fases anteriores e de ADS em temas complexos como manipulação de ponteiros e structs em linguagem C.',
    image: '/images/Monitoria.png',
    imageAlt: 'Finalizado com sucesso'
  },
  {
    title: 'Desenvolvimento Mobile Flutter: 2025',
    description: 'Liderança técnica no Projeto Integrador "Sprinter", utilizando Dart e Flutter. O projeto foi concluído antecipadamente e selecionado para apresentação na SNCT.',
    image: '/images/Sprinter.png',
    imageAlt: 'Finalizado com sucesso'
  },
  {
    title: 'Arquitetura de Backend e Go: 2026',
    description: 'Especialização em GoLang para o desenvolvimento de APIs robustas e escaláveis, focando na separação de responsabilidades e alta performance no backend.',
    image: '/images/Go.png',
    imageAlt: 'Finalizado com sucesso'
  }
];

const setDotRef = (el, index) => {
  if (el) dotRefs.value[index] = el;
};

onBeforeUpdate(() => {
  dotRefs.value = [];
});

let ctx = null;

onMounted(async () => {
  await nextTick();
  if (progressBar.value) {
    gsap.set(progressBar.value, { height: 0 });
  }

  const measureLine = () => {
    const dots = dotRefs.value;
    if (!connectorRef.value || dots.length === 0) return { start: 0, span: 0 };
    const connectorRect = connectorRef.value.getBoundingClientRect();
    const firstDot = dots[0]?.getBoundingClientRect();
    const lastDot = dots[dots.length - 1]?.getBoundingClientRect();
    if (!firstDot || !lastDot) return { start: 0, span: 0 };
    const start = firstDot.top + firstDot.height / 2 - connectorRect.top;
    const end = lastDot.top + lastDot.height / 2 - connectorRect.top;
    return { start, span: Math.max(0, end - start) };
  };

  let { start, span } = measureLine();
  gsap.set(progressBar.value, { y: start, height: 0 });

  ctx = gsap.context(() => {
    ScrollTrigger.create({
      trigger: containerRef.value,
      start: "top center+=50",
      end: () => `+=${connectorRef.value ? connectorRef.value.offsetHeight : 0}`,
      scrub: true,
      invalidateOnRefresh: true,
    onRefresh: () => {
      const measured = measureLine();
      start = measured.start;
      span = measured.span;
      gsap.set(progressBar.value, { y: start });
    },
    onUpdate: (self) => {
      const connectorRect = connectorRef.value.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2 + 50;
      const current = Math.min(span, Math.max(0, viewportCenter - connectorRect.top - start));
      const finalHeight = self.progress >= 0.98 ? span : current;
      gsap.set(progressBar.value, { y: start, height: finalHeight });

      const lineEnd = start + finalHeight;
      dotRefs.value.forEach((dot) => {
        if (!dot) return;
        const dotRect = dot.getBoundingClientRect();
        const dotCenter = dotRect.top + dotRect.height / 2 - connectorRect.top;
        dot.classList.toggle('is-active', lineEnd >= dotCenter - 1);
      });
    },
    });

    const items = gsap.utils.toArray('.step-item');
  
  items.forEach((item) => {
    const dot = item.querySelector('.dot');
    const card = item.querySelector('.content-card');
    const connector = item.querySelector('.line');
    const text = item.querySelector('.text-block');
    const side = card?.dataset?.side || 'left';
    const targetX = side === 'right' ? 300 : -300;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: dot,
        start: "center center",
        end: "+=120",
        scrub: true,
        toggleActions: "play reverse play reverse",
      }
    });

    tl.to(dot, {
      opacity: 1,
      duration: 0.1
    })
      .to(connector, {
        opacity: 1,
        backgroundColor: "#000",
        duration: 0.2
      }, 0)
      .to(card, {
        opacity: 1,
        x: targetX,
        duration: 0.5,
        ease: "back.out(1.7)"
      }, 0.1);

    if (text) {
      tl.to(text, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out"
      }, 1.1);
    }
  });

  });

  requestAnimationFrame(() => ScrollTrigger.refresh());
});

onBeforeUnmount(() => {
  if (ctx) {
    ctx.revert();
  }
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
});
</script>

<style scoped>
.container {
    margin-top: 150px;
    margin-bottom: 200px;
    min-height: 260vh; }
</style>

