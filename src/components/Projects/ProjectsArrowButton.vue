<script setup>
import useLucide from '../../composables/useLucide';

const props = defineProps({
  icon: { type: String, required: true },
  onClick: { type: Function, required: true },
  label: { type: String, default: '' },
});

useLucide();
</script>

<template>
  <button
    type="button"
    class="arrow-button"
    :aria-label="label || icon"
    @click="onClick"
  >
    <i :data-lucide="icon" class="icon"></i>
  </button>
</template>

<style scoped>
.arrow-button {
  width: 48px;
  height: 48px;
  border-radius: 999px;
  border: none;
  background: #0b0b0b;
  color: #ffffff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.arrow-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 28px rgba(0, 0, 0, 0.25);
}

.icon {
  width: 22px;
  height: 22px;
}
</style>
