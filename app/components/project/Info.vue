<script setup lang="ts">
import type { ProjectTech } from '~/models/ProjectTech';

const { name, url = null, tech } = defineProps<{
  name: string
  tech: ProjectTech
  url?: string
}>()
</script>

<template>
  <div
    class="info tw-flex tw-flex-col tw-gap-1 xl:tw-col-start-1 xl:tw-col-end-5 xl:tw-sticky xl:tw-top-16 xl:tw-left-0">
    <div class="stars tw-flex tw-pb-4">
      <p class="star tw-text-3xl">✦</p>
      <p class="star tw-text-3xl">✦</p>
      <p class="star tw-text-3xl">✦</p>
    </div>
    <ProjectName :name />
    <ProjectLink v-if="url" :url="url" />
    <slot />
    <ProjectTech :tech />
  </div>
</template>

<style lang="scss" scoped>
.info {
  height: calc(100vh - 4.5rem);
}

:slotted(p) {
  padding: 1.5rem 0;
  text-justify: distribute;
  opacity: 1;
  transform: translateX(0);
  transition: opacity 0.3s 0.1s, transform 0.3s 0.1s;
}

.stars {
  opacity: 1;
  transform: translateX(0);
  transition: opacity 0.3s, transform 0.3s;
}

@starting-style {
  :slotted(p), .stars {
    opacity: 0;
    transform: translateX(-0.5rem)
  }
}

.star {
  display: flex;
  // align-items: center;
  justify-content: center;
  transform-origin: 50% 50%;
  width: fit-content;
  height: 20px;
  width: 20px;
  line-height: 26px;
}

.stars :nth-child(1) {
  animation: rotate 6s cubic-bezier(.68, -0.01, .37, 1);
  // animation: rotate 6s cubic-bezier(.68, -0.01, .37, 1) infinite;
}

.stars :nth-child(2) {
  animation: rotate 6s 0.1s cubic-bezier(.68, -0.01, .37, 1);
  // animation: rotate 6s 0.1s cubic-bezier(.68, -0.01, .37, 1) infinite;

}

.stars :nth-child(3) {
  animation: rotate 6s 0.2s cubic-bezier(.68, -0.01, .37, 1);
  // animation: rotate 6s 0.2s cubic-bezier(.68, -0.01, .37, 1) infinite;
}


@keyframes rotate {
  0% {
    transform: rotate(0);
  }

  20% {
    transform: rotate(360deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

// MEDIA QUERIES
@media (max-width: 1280px) {
  .star {
    height: 20px;
    width: 20px;
    line-height: 22px;
  }
  .info {
    height: fit-content;
  }
}
</style>