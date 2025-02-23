<script lang="ts" setup>
import LinkImageLabel from '../LinkImageLabel.vue';
import type { Media } from '../../models/Media';

const { medias, title, size } = defineProps<{
  title: string
  medias: Media[]
  size?: 'large' | 'full'
}>()

const span = size && (size === 'large' ? 'large' : 'full')
const display = size && (size === 'large' ? 'gridtwo' : 'gridthree')
</script>

<template>
  <div :class="span">
    <h3>{{ title }}</h3>
    <div class="medias" :class="display">
      <LinkImageLabel v-for="media in medias" :url="media.url" :label="media.label" :src="media.src" />
    </div>
  </div>
</template>

<style scoped lang="scss">
h3 {
  margin-bottom: 0.5rem;
}

.medias {
  display: flex;
  flex-flow: column;
  gap: 0.5rem;
  width: 100%;

  &.gridtwo {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  &.gridthree {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.large {
  grid-column: span 2;
}

.full {
  grid-column: span 3;
}
</style>