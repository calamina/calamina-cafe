<script setup lang='ts'>
import Icon from './Icon.vue';
import IconBookmark from './Icons/IconBookmark.vue';
import IconGithub from './Icons/IconGithub.vue';
import IconLinkedin from './Icons/IconLinkedin.vue';
import IconWikipedia from './Icons/IconWikipedia.vue';
import IconYoutube from './Icons/IconYoutube.vue';
</script>

<template>
  <nav>
    <a target="”_blank”" href="https://github.com/calamina">
      <Icon :icon="IconGithub" />
      github
    </a>
    <a target="”_blank”" href="https://www.linkedin.com/in/gregoire-belliere/">
      <Icon :icon="IconLinkedin" />
      linkedin
    </a>
    <a target="”_blank”" href="https://en.wikipedia.org/wiki/User:Calamina *">
      <Icon :icon="IconWikipedia" />
      wikipedia
    </a>
    <a target="”_blank”" href="https://www.youtube.com/@calamina">
      <Icon :icon="IconYoutube" />
      youtube
    </a>
    <a target="”_blank”" href="https://www.senscritique.com/calamina">
      <Icon :icon="IconBookmark" />
      senscritique
    </a>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  flex-flow: column;
  width: 100%;
  gap: 0.5rem;
  gap: 0.25rem;
}
</style>
