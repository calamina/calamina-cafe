<script setup lang="ts">
// definePageMeta({
//   middleware: 'routing',
//   pageTransition: transitionConfig,
// });
definePageMeta({ pageTransition: { name: 'appear', mode: 'out-in' } })

</script>

<!-- .center {
  flex: 1;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
} -->

<template>
  <div class="tw-flex tw-flex-col tw-gap-4 tw-items-center xl:tw-flex-row">
    <!-- <div class="center"> -->
    <div class="content tw-w-96">
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
    </div>

    <ClientOnly>
      <Ascii />
      <template #fallback>
        <div class="loader">
          <p>Loading ascii ...</p>
        </div>
      </template>
    </ClientOnly>
  </div>
</template>

<style scoped lang="scss">
.content {
  display: flex;
  flex-flow: column;
  align-items: center;
  gap: 2rem;
  opacity: 1;
  transform: translateY(0);
  transition: transform 0.3s;
}

@starting-style {
  .content {
    transform: translateY(-1rem);
  }
}

.loader {
  border: 2px solid var(--bg-darker0);
  border-radius: 0.5rem;
  height: 80%;
  width: 30rem;
  height: 30rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

// h1 {
// font-size: 1rem;
//   line-height: 6.5rem;
//   letter-spacing: -6px;
// }

section {
  width: 100%;
}

@media (max-width: 1280px) {
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