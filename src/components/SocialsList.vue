<script setup lang="ts">
import IconImg from "./IconImg.vue";
const { direction } = defineProps<{
  direction?: string
}>()
</script>

<template>
  <nav class="tw-flex tw-flex-col tw-w-full tw-gap-2" :class="{ 'tw-flex-col': direction === 'col' }">
    <a target=”_blank” href="https://github.com/calamina">
      <IconImg name="tabler:brand-github" />
      github
    </a>
    <a target=”_blank” href="https://www.linkedin.com/in/gregoire-belliere/">
      <IconImg name="tabler:brand-linkedin" />
      linkedin
    </a>
    <a target=”_blank” href="https://en.wikipedia.org/wiki/User:Calamina *">
      <IconImg name="tabler:notebook" />
      wikipedia
    </a>
    <a target=”_blank” href="https://www.youtube.com/@calamina">
      <IconImg name="tabler:brand-youtube" />
      youtube
    </a>
    <a target=”_blank” href="https://www.senscritique.com/calamina">
      <IconImg name="tabler:bookmark" />
      senscritique
    </a>
  </nav>
</template>