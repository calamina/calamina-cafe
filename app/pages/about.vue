<script setup lang="ts">
// definePageMeta({
//   middleware: 'routing',
//   pageTransition: transitionConfig,
// })
</script>

<template>
  <div class="center">
    <div class="content">
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
  </div>
</template>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-flow: column;
}

h1 {
  padding-bottom: 2rem;
}

p a {
  text-decoration: underline;
}
</style>
