<script setup lang="ts">
import LinkIcon from '@components/atomic/LinkIcon.vue';


const { url, label, src } = defineProps<{
  label: string;
  url: string;
  src: string;
}>()
</script>

<template>
  <div class="fave">
    <img :src :alt="label + ' cover'" width=75 height=75 format="avif" />
    <div class="info">
      <p>{{ label }}</p>
      <LinkIcon :url label="check" />
      <!-- <a :href="url">visit</a> -->
    </div>
    <!-- <LinkImageLabel :url :label>
    </LinkImageLabel> -->
  </div>
</template>

<style scoped>
.fave {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  height: fit-content;
  /* &:hover img {
    filter: grayscale(0);
  } */
}

img {
  flex-shrink: 0;
  border-radius: 0.5rem;
  transition: filter 0.2s;
  object-fit: cover;
  /* filter: grayscale(1); */
}

.info {
  display: flex;
  flex-flow: column;
  height: 100%;
  gap: 0.25rem;
}

p {
  line-height: 1.25rem;
}
</style>
