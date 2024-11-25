<script setup lang="ts">
import type { ProjectTech } from '../../../models/ProjectTech';

const { name, url = null, tech } = defineProps<{
  name: string
  tech: ProjectTech
  url?: string
}>()
</script>

<template>
  <div
    class="tw-flex tw-flex-col tw-gap-1 xl:tw-w-1/3 xl:tw-fixed tw-px-4 xl:tw-px-8  xl:tw-pt-16 tw-pb-4 xl:tw-top-0 xl:tw-h-full xl:tw-left-0">
    <!-- <div class="tw-flex tw-pt-8 tw-pb-8">
      <p class="lel">✦</p>
      <p class="lel">✦</p>
      <p class="lel">✦</p>
    </div> -->
    <div class="stars tw-flex tw-pt-6 tw-pb-6">
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
// .lel {
//   display: flex;
//   background-color: var(--bg-darker);
//   padding: 1rem;
//   width: fit-content;
//   border-radius: 100%;
//   font-size: 2rem;
//   line-height: 6rem;
//   width: 4rem;
//   height: 4rem;
//   align-items: center;
//   justify-content: center;
// }

:slotted(p) {
  padding: 1.5rem 0;
  text-justify: distribute;
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
  animation: rotate 6s cubic-bezier(.68, -0.01, .37, 1) infinite;
}

.stars :nth-child(2) {
  animation: rotate 6s 0.1s cubic-bezier(.68, -0.01, .37, 1) infinite;

}

.stars :nth-child(3) {
  animation: rotate 6s 0.2s cubic-bezier(.68, -0.01, .37, 1) infinite;

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
@media (max-width: 1250px) {
  .star {
    height: 20px;
    width: 20px;
    line-height: 22px;
  }
}
</style>