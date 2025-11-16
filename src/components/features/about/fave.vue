<script setup lang="ts">
import LinkImageLabel from "@components/atomic/LinkImageLabel.vue";

const { url, label, src } = defineProps<{
  label: string;
  url: string;
  src: string;
}>()
</script>

<template>
  <div class="media">
    <img :src :alt="label + ' cover'" width=60 height=60 format="avif" />
    <p>{{ label }}</p>
    <!-- <a :href="url">visit</a> -->
    <!-- <LinkImageLabel :url :label>
    </LinkImageLabel> -->
  </div>
</template>

<style scoped>
.media {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;

  /* &:hover img {
    filter: grayscale(0);
  } */
}

img {
  border-radius: 0.5rem;
  transition: filter 0.2s;
  object-fit: cover;
  /* filter: grayscale(1); */
}
</style>
