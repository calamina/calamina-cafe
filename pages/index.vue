<script setup lang="ts">
definePageMeta({
  pageTransition: transitionConfig,
});
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