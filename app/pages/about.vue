<script setup lang="ts">
definePageMeta({
  middleware: 'routing',
  pageTransition: transitionConfig,
  // pageTransition: {
  //   name: 'appear',
  //   mode: 'out-in',
  // }
})
</script>

<template>
  <div class="center">
    <div class="content">
      <h1>about</h1>
      <hr>
      <p>
        Currently employed full time at
        <NuxtLink to="https://fr.linkedin.com/company/akuiteo" target="_blank">Akuiteo</NuxtLink>.
      </p>
      <hr>
      <p>CV : web + <NuxtLink to="https://google.com">pdf</NuxtLink>
      </p>
      <hr>
      <p>contact :)</p>
      <hr>
      <!-- useTimeAgo etc. -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-flow: column;
  gap: 1rem;
}

h1 {
  font-size: 6rem;
  line-height: 6.5rem;
  letter-spacing: -6px;
}

p a {
  text-decoration: underline;
}
</style>
