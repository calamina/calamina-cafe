<script setup lang="ts">
import { NuxtLink } from '#components';

const { direction } = defineProps<{
    direction?: string
}>()
</script>

<template>
  <nav class="tw-flex tw-flex-col tw-w-full tw-gap-2" :class="{'tw-flex-col' : direction === 'col'}">
  <!-- <nav class="tw-flex tw-w-full tw-gap-12" :class="{'tw-flex-col' : direction === 'col'}"> -->
    <NuxtLink target=”_blank” href="https://github.com/calamina">
      <Icon name="tabler:brand-github" />
      github
    </NuxtLink>
    <NuxtLink target=”_blank” href="https://www.linkedin.com/in/gregoire-belliere/">
      <Icon name="tabler:brand-linkedin" />
      linkedin
    </NuxtLink>
    <NuxtLink target=”_blank” href="https://en.wikipedia.org/wiki/User:Calamina *">
      <Icon name="tabler:notebook" />
      wikipedia
    </NuxtLink>
    <NuxtLink target=”_blank” href="https://www.youtube.com/@calamina">
      <Icon name="tabler:brand-youtube" />
      youtube
    </NuxtLink>
    <NuxtLink target=”_blank” href="https://www.senscritique.com/calamina">
      <Icon name="tabler:bookmark" />
      senscritique
    </NuxtLink>
  </nav>
</template>