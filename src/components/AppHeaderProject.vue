<script setup lang="ts">
import BaseTag from './atomic/tag/BaseTag.vue';

const { project = undefined } = defineProps<{
  project: string | undefined
}>()
</script>

<template>
  <transition name="sublink" mode="out-in">
    <div class="project" v-if="project" :key="project">
      <p>:</p>
      <BaseTag pad0>{{ project }}</BaseTag>
    </div>
  </transition>
</template>

<style scoped>
.project {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.subtype {
  color: var(--color-light);
}

/* TRANSITIONS */
.sublink-enter-active,
.sublink-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.sublink-enter-from {
  opacity: 0;
  transform: translateX(-0.25rem);
}

.sublink-leave-to {
  opacity: 0;
  transform: translateX(0.25rem);
}

@media (min-width: 1280px) {
  header {
    padding: 0.5rem 0;
  }
}
</style>