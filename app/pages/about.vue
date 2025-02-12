<script setup lang="ts">
// definePageMeta({
//   middleware: 'routing',
//   pageTransition: transitionConfig,
// })
definePageMeta({ pageTransition: { name: 'appear', mode: 'out-in' } })
</script>

<template>
  <div class="tw-flex tw-flex-col tw-gap-4 tw-items-center xl:tw-flex-row">
    <div class="content tw-w-96">
      <h1>about</h1>
      <p>
        Currently employed full time at
        <NuxtLink to="https://fr.linkedin.com/company/akuiteo" target="_blank">Akuiteo</NuxtLink>.
      </p>
      <p>CV : web + <NuxtLink to="https://google.com">pdf</NuxtLink>
      </p>
      <p>contact :)</p>
      <!-- useTimeAgo etc. -->
    </div>
    <div class="loader">
      <div class="disc" v-for="_i in 25"></div>
    </div>
    <!-- <ClientOnly>
      <Ascii />
      <template #fallback>
        <div class="loader">
          <p>Loading ascii ...</p>
        </div>
      </template>
</ClientOnly> -->
  </div>
</template>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-flow: column;
  opacity: 1;
  transform: translateY(0);
  transition: transform 0.3s;
}

.loader {
  // border: 2px solid var(--bg-darker0);
  border-radius: 0.5rem;
  width: 30rem;
  height: 30rem;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  align-items: center;
  justify-content: center;

}
.disc {
  width: 6rem;
  height: 6rem;
  background-color: var(--bg-darker);
  border-radius: 100%;
  animation: rotate 6s cubic-bezier(0.55, 0.055, 0.675, 0.19) infinite;
  // animation: rotate 6s cubic-bezier(0.55, 0.055, 0.675, 0.19) infinite alternate-reverse;
  backface-visibility: hidden;
}

@for $i from 0 through 25 {
    .disc:nth-of-type(#{$i}) {
        animation-delay: 0.2s + 0.05s * $i;
    }
}


@keyframes rotate {
  0% {transform: rotateY(0deg)}
  100% {transform: rotateY(360deg) rotateX(360deg)}
  // 100% {transform: rotateY(360deg) rotateX(360deg)}
}
// @keyframes rotate {
//   0% {transform: rotateY(0deg)}
//   100% {transform: rotateY(360deg)}
// }

@starting-style {
  .content {
    transform: translateY(-1rem);
  }
}

h1 {
  padding-bottom: 2rem;
}

p a {
  text-decoration: underline;
}
</style>
