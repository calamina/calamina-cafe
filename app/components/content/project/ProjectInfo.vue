<script setup lang="ts">
import type { ProjectTech } from '../../../models/ProjectTech';

const { name, url = null, tech } = defineProps<{
  name: string
  tech: ProjectTech
  url?: string
}>()
</script>

<template>
  <div class="tw-flex tw-flex-col tw-gap-1 xl:tw-w-1/3 xl:tw-fixed tw-px-4 xl:tw-px-8  xl:tw-pt-16 tw-pb-4 xl:tw-top-0 xl:tw-h-full xl:tw-left-0">
    <div class="tw-flex tw-pt-8 tw-pb-8">
      <p class="lel">✦</p>
      <p class="lel">✦</p>
      <p class="lel">✦</p>
    </div>
    <ProjectName :name />
    <ProjectLink v-if="url":url="url" />
    <slot />
    <ProjectTech :tech />
  </div>
</template>

<style lang="scss" scoped>
.lel {
  display: flex;
  background-color: var(--bg-darker);
  padding: 1rem;
  width: fit-content;
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