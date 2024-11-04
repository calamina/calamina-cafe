<script setup lang="ts">
import IconComponent from '@/components/iconComponent.vue';
import IconGithub from '~/components/icons/Github.vue';
import IconLinkedin from '~/components/icons/Linkedin.vue';
import IconSenscritique from '~/components/icons/Senscritique.vue';
import IconWikipedia from '~/components/icons/Wikipedia.vue';
import IconYoutube from '~/components/icons/Youtube.vue';
import { useHead } from '@unhead/vue';

useHead({
  title: 'home ~ calamina cafe',
  meta: [
    {
      name: 'description',
      content: 'My page description',
    },
  ],
})

</script>

<template>
  <div class="center">
    <div class="content">
      <section>
        <h1>> calamina.cafe</h1>
      </section>
      <section>
        <p>Hello and welcome :) </p>
        <p>Personal space of Grégoire Belliere</p>
        <p>Work in progress !</p>
      </section>
      <section>
        <a href="mailto:gbelliere@gmail.com">gbelliere@gmail.com</a>
      </section>
      <nav>
        <a target=”_blank” href="https://github.com/calamina">
          <IconComponent>
            <IconGithub />
          </IconComponent>
          github
        </a>
        <a target=”_blank” href="https://linkedin.com">
          <IconComponent>
            <IconLinkedin />
          </IconComponent>
          linkedin
        </a>
        <a target=”_blank” href="https://en.wikipedia.org/wiki/User:Eveneit">
          <IconComponent>
            <IconWikipedia />
          </IconComponent>
          wikipedia
        </a>
        <a target=”_blank” href="https://www.youtube.com/@calamina">
          <IconComponent>
            <IconYoutube />
          </IconComponent>
          youtube
        </a>
        <a target=”_blank” href="https://www.senscritique.com/calamina">
          <IconComponent>
            <IconSenscritique />
          </IconComponent>
          senscritique
        </a>
      </nav>
    </div class="content">
  </div>
</template>

<style scoped lang="scss">
.content {
  display: flex;
  flex-flow: column;
  align-items: center;
  gap: 2rem;
}

nav {
  width: 100%;
  display: flex;
  flex-flow: column;
  gap: .5rem;
}

section {
  width: 100%;
}
</style>