<script setup lang="ts">
const { direction } = defineProps<{
    direction?: string
}>()
</script>

<template>
  <nav class="tw-flex tw-w-full tw-gap-12" :class="{'tw-flex-col' : direction === 'col'}">
    <a target=”_blank” href="https://github.com/calamina">
      <Icon name="tabler:brand-github" />
      github
    </a>
    <a target=”_blank” href="https://linkedin.com">
      <Icon name="tabler:brand-linkedin" />
      linkedin
    </a>
    <a target=”_blank” href="https://en.wikipedia.org/wiki/User:Eveneit">
      <Icon name="tabler:notebook" />
      wikipedia
    </a>
    <a target=”_blank” href="https://www.youtube.com/@calamina">
      <Icon name="tabler:brand-youtube" />
      youtube
    </a>
    <a target=”_blank” href="https://www.senscritique.com/calamina">
      <Icon name="tabler:bookmark" />
      senscritique
    </a>
  </nav>
</template>