<script setup>
import { onMounted, onUnmounted, ref, nextTick } from 'vue';
import { gsap } from 'gsap';
import ProjectCard from './ProjectCard.vue';

const baseUrl = import.meta.env.BASE_URL;

const items = ref([
  { id: 1, img: `${baseUrl}images/Sprinter.png`, title: 'Sprinter', desc: 'Um aplicativo de monitoramento de atividades físicas focado na sustentabilidade, onde você pode realizar atividades, e com os pontos adiquiridos pelas atividades e comprar ingressos', language: 'Flutter, Dart, Firebase', githubUrl: 'https://github.com/Yago3108/Sprinter', isOnline: false },
  { id: 2, img: `${baseUrl}images/GoApi.png`, title: 'GO CRUD', desc: 'Uma API REST básica com um CRUD de produtos e com deploy via Docker.', language: 'GO, Gin, PostgreSQL', githubUrl: 'https://github.com/YagoSchramm/BasicGoApi', isOnline: true },
  { id: 3, img: `${baseUrl}images/NodeApi.png`, title: 'Node.js CRUD', desc: 'Uma API REST básica com um CRUD de clientes e com front-end em pug e bootstrap.', language: 'TypeScript, Node, Express, Pug', githubUrl: 'https://github.com/YagoSchramm/NodeBasicApi', isOnline: false},
  { id: 4, img: `${baseUrl}images/MakeYourBurguer.png`, title: 'Make Your Burguer', desc: 'Uma aplicação de monitoramento de pedidos de uma hambúrgueria que permite a criação de um hamburguer ao estilo do cliente.', language: 'Vue, GSAP, JSON server', githubUrl: 'https://github.com/YagoSchramm/MakeYourBurguer', isOnline: false },
  { id: 5, img: `${baseUrl}images/MyChat.png`, title: 'MyChat', desc: 'Um aplicativo de mensagens focado em criar novas conexões e uma experiência de usuário aprimorada.', language: 'Flutter, Dart', githubUrl: 'https://github.com/YagoSchramm/MyChat', isOnline: false },
  { id: 5, img: `${baseUrl}images/MyChatApi.png`, title: 'API MyChat', desc: 'Uma API com websocket desenvolvida para melhor experiência de usuário do aplicativo MyChat.', language: 'Go, Gin, PostgreSQL, Supabase', githubUrl: 'https://github.com/YagoSchramm/ApiMyChat', isOnline: false },
]);
const doubledItems = ref([...items.value, ...items.value]);

const isPaused = ref(false);
const activeKey = ref(null);
const activeItem = ref(null);
const carouselTimeline = ref(null);
const trackRef = ref(null);
const loopWidthRef = ref(0);
const wrapXRef = ref(null);
const infoRefs = new Map();
let activeCardEl = null;
let resizeHandler = null;
let loadHandler = null;

const resumeCarousel = () => {
  const track = trackRef.value;
  if (!track) {
    return;
  }

  if (!carouselTimeline.value || !carouselTimeline.value.isActive()) {
    initCarousel();
  }

  if (carouselTimeline.value) {
    carouselTimeline.value.timeScale(1);
    carouselTimeline.value.play();
  }
};

const initCarousel = () => {
  const track = trackRef.value;
  if (!track) {
    return;
  }

  carouselTimeline.value?.kill();
  gsap.killTweensOf(track);

  const totalWidth = track.scrollWidth;
  const loopWidth = totalWidth / 2;
  loopWidthRef.value = loopWidth;
  wrapXRef.value = loopWidth > 0 ? gsap.utils.wrap(-loopWidth, 0) : null;

  if (loopWidth > 0) {
    const wrapX = wrapXRef.value;
    carouselTimeline.value = gsap.to(track, {
      x: `-=${loopWidth}`,
      duration: 12,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => wrapX(parseFloat(x))),
      },
    });
  }
};

const setInfoRef = (id, el) => {
  if (el) {
    infoRefs.set(id, el);
  } else {
    infoRefs.delete(id);
  }
};

onMounted(() => {

  gsap.set('.card', {
    rotationY: -22, 
    transformPerspective: 1000,
    force3D: true,
  });

  initCarousel();
  resizeHandler = () => initCarousel();
  loadHandler = () => initCarousel();
  window.addEventListener('resize', resizeHandler);
  window.addEventListener('load', loadHandler);
});

onUnmounted(() => {
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler);
  }
  if (loadHandler) {
    window.removeEventListener('load', loadHandler);
  }
  carouselTimeline.value?.kill();
});

const handleCardClick = async (item, key, event) => {
  const cardEl = event.currentTarget.querySelector('.card');
  const wrapEl = event.currentTarget;
  const trackEl = trackRef.value;
  const focusLeftOffset = 24;
  const wrapX = wrapXRef.value;

  if (activeKey.value === key) {
    activeKey.value = null;
    activeItem.value = null;
    isPaused.value = false;
    if (trackEl && wrapX) {
      const currentX = Number(gsap.getProperty(trackEl, 'x')) || 0;
      gsap.set(trackEl, { x: wrapX(currentX) });
    }
    resumeCarousel();
    if (cardEl) {
      gsap.to(cardEl, { rotationY: -22, scale: 1, z: 0, duration: 0.5 });
    }
    activeCardEl = null;
    return;
  }
  if (activeCardEl) {
    gsap.to(activeCardEl, { rotationY: -22, scale: 1, z: 0, duration: 0.4 });
  }

  isPaused.value = true;
  carouselTimeline.value?.pause();

  activeKey.value = key;
  activeItem.value = item;
  activeCardEl = cardEl;

  await nextTick();
  if (trackEl) {
    const stageEl = trackEl.closest('.stage');
    const stageRect = stageEl ? stageEl.getBoundingClientRect() : null;
    const wrapRect = wrapEl.getBoundingClientRect();
    if (stageRect) {
      const desiredLeft = stageRect.left + focusLeftOffset;
      const delta = desiredLeft - wrapRect.left;
      const currentX = Number(gsap.getProperty(trackEl, 'x')) || 0;
      const targetX = currentX + delta;
      gsap.killTweensOf(trackEl);
      gsap.to(trackEl, {
        x: targetX,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  }

  if (cardEl) {
    gsap.to(cardEl, {
      rotationY: 0,
      scale: 1.1,
      z: 100,
      duration: 0.6,
      ease: 'power2.out',
    });
  }

  const infoEl = infoRefs.get(key);
  if (infoEl) {
    gsap.fromTo(
      infoEl,
      { x: -25, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.45, ease: 'power2.out' }
    );
  }
};
</script>

<template>
  <div class="stage">
    <div class="carousel-track" ref="trackRef">
      <div
        v-for="(item, index) in doubledItems"
        :key="`${item.id}-${index}`"
        class="card-wrap"
        @click="handleCardClick(item, `${item.id}-${index}`, $event)"
      >
        <div class="card">
          <img :src="item.img" alt="" />
        </div>
        <div
          v-if="activeKey === `${item.id}-${index}`"
          class="info"
          :ref="(el) => setInfoRef(`${item.id}-${index}`, el)"
        >
          <ProjectCard
            :title="item.title"
            :description="item.desc"
            :language="item.language"
            :github-url="item.githubUrl"
            :is-online="item.isOnline"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stage {
  width: 100%;
  box-sizing: border-box;
  padding: 120px 24px 60px;
  display: flex;
  justify-content: center;
  overflow: hidden;
  --card-w: clamp(340px, 26vw, 420px);
  --card-h: calc(var(--card-w) * 4 / 3);
}

.carousel-track {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 56px;
  width: min(calc(var(--card-w) * 3 + 112px), 100%);
  padding-left: 36px;
}

:global(body) {
  overflow-x: hidden;
}

.card-wrap {
  display: flex;
  align-items: flex-start;
  gap: 32px;
  cursor: pointer;
  margin: 0 8px;
}

.card {
  position: relative;
  width: var(--card-w);
  height: var(--card-h);
  overflow: hidden;
  transform-style: preserve-3d;
  box-shadow: 0 24px 40px rgba(0, 0, 0, 0.2);
  will-change: transform;
  transition: transform 0.3s ease;
}

.card-wrap:hover .card {
  transform: translateY(-18px);
}

.card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 60%,
    rgba(255, 255, 255, 0.9) 100%
  );
  pointer-events: none;
}

.info {
  width: var(--card-w);
  height: var(--card-h);
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  color: #0b0b0b;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.6);
  padding-top: 4px;
}

@media (max-width: 900px) {
  .carousel-track {
    justify-content: flex-start;
    gap: 20px;
    overflow-x: auto;
    padding-bottom: 16px;
    padding-left: 16px;
    scroll-snap-type: x mandatory;
  }

  .card-wrap {
    scroll-snap-align: center;
    gap: 24px;
    margin: 0 4px;
  }
}
</style>

