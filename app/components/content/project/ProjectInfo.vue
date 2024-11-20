<script setup lang="ts">
import type { ProjectTech } from '~/app/models/ProjectTech';


const { name, url, tech } = defineProps<{
  name: string
  url: string
  tech: ProjectTech
}>()
</script>

<template>
  <div class="tw-flex tw-flex-col tw-gap-4 tw-max-w-3xl">
    <ProjectName :name />
    <ProjectLink :url />
    <slot />
    <ProjectTech :tech/>
  </div>
</template>

<style lang="scss" scoped>
:slotted(p) {
  padding: 1.5rem 0;
}
</style>