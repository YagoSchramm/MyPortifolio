<script setup>
import { onMounted, onUnmounted, ref, nextTick } from 'vue';
import { gsap } from 'gsap';
import ProjectCard from './ProjectCard.vue';

const items = ref([
  { id: 1, img: 'https://picsum.photos/400/500?1', title: 'Deserto', desc: 'Areias infinitas.', language: 'Vue', githubUrl: 'https://github.com/', isOnline: true },
  { id: 2, img: 'https://picsum.photos/400/500?2', title: 'Floresta', desc: 'Verde profundo.', language: 'JavaScript', githubUrl: 'https://github.com/', isOnline: false },
  { id: 3, img: 'https://picsum.photos/400/500?3', title: 'Folha', desc: 'Detalhes da natureza.', language: 'TypeScript', githubUrl: 'https://github.com/', isOnline: true },
  { id: 4, img: 'https://picsum.photos/400/500?4', title: 'Neve', desc: 'Inverno rigoroso.', language: 'CSS', githubUrl: 'https://github.com/', isOnline: false },
  { id: 5, img: 'https://picsum.photos/400/500?5', title: 'Canyon', desc: 'Rochas antigas.', language: 'HTML', githubUrl: 'https://github.com/', isOnline: true },
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
  // Configuracao inicial de perspectiva igual para todos
  gsap.set('.card', {
    rotationY: -22, // inclinacao leve como a segunda imagem
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
    // Fecha o card ativo e volta a rodar
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

  // Troca o card ativo
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
