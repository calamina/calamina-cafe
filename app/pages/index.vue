<script setup lang="ts">
definePageMeta({
  middleware: 'routing',
  pageTransition: transitionConfig,
});

// definePageMeta({
//   middleware: 'routing',
//   pageTransition: {
//     name: 'appear',
//     mode: 'out-in',
//   }
// })
const test = ref(false)
</script>

<template>
  <div class="center">
    <div class="content">
      <section>
        <h1>calamina.cafe</h1>
      </section>
      <section>
        <p>Hello and welcome :) </p>
        <p>Personal space of Grégoire Belliere</p>
        <p>Work in progress !</p>
      </section>
      <Contact />
      <Socials />
      <Ascii v-if="test" />
      <button @click="test = true">test</button>
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

// h1 {
// font-size: 1rem;
//   line-height: 6.5rem;
//   letter-spacing: -6px;
// }

section {
  width: 100%;
}

@media (max-width: 1250px) {
  // h1 {
  //   font-size: 4rem;
  //   line-height: 4.25;
  // }

  nav {
    flex-flow: column;
    gap: 1rem;
  }
}
</style>