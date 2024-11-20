<script setup lang="ts">
import type { ProjectTech } from '../../../models/ProjectTech';
// import type { ProjectTech } from '~/app/models/ProjectTech';

const { name, url, tech } = defineProps<{
  name: string
  url: string
  tech: ProjectTech
}>()
</script>

<template>
  <div class="tw-flex tw-flex-col tw-gap-1 tw-w-1/3 tw-fixed tw-px-4 tw-pt-16 tw-pb-4 tw-top-0 tw-h-full tw-left-0">
    <div class="tw-flex tw-pt-8 tw-pb-8">
      <p class="lel">🟂</p>
      <p class="lel">✦</p>
      <p class="lel">🟒</p>
      <!-- <p class="lel">🟆</p> -->
    </div>
    <!-- <p class="lel">🟆</p> -->
    <!-- <p class="lel">🟎</p> -->
    <!-- <p class="lel">1 / 18</p> -->
    <ProjectName :name />
    <ProjectLink :url />
    <slot />
    <ProjectTech :tech />
    <!-- <ProjectNavigation :small=true /> -->
  </div>
</template>

<style lang="scss" scoped>
.lel {
  display: flex;
  background-color: var(--bg-darker);
  padding: 1rem;
  width: fit-content;
  // margin-top: 3rem;
  // margin-bottom: 2rem;
  // border-radius: 0.5rem;
  border-radius: 100%;
  font-size: 2rem;
  line-height: 6rem;
  width: 4rem;
  height: 4rem;
  align-items: center;
  justify-content: center;
}

:slotted(p) {
  padding: 1.5rem 0;
  text-justify: distribute;
}
</style>