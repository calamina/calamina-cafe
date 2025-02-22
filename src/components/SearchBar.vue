<script setup lang="ts">
import { onClickOutside, onKeyStroke, useMagicKeys } from '@vueuse/core'
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'
import { ref, watch } from 'vue'
import IconImg from './IconImg.vue'
const search = ref('')
const searchbox = ref(null)

// const { data: query } = await useAsyncData(() => queryCollection('web').all())
// const results = computed(() => query.value?.filter(res => res.path?.includes(search.value) && search.value !== ''))

const { ctrl, k } = useMagicKeys({
  passive: false,
  onEventFired(e) {
    if (e.ctrlKey && e.key === 'k' && e.type === 'keydown') {
      e.preventDefault();
      (document.querySelector('#search') as HTMLInputElement).focus()
    }
  },
})

const emptySearch = () => search.value = "";
onClickOutside(searchbox, () => emptySearch())
onKeyStroke('Escape', () => emptySearch())

// const { activate, deactivate } = useFocusTrap(searchbox)
// watch(results, () => results.value?.length ? activate() : deactivate())
</script>

<template>
  <div class="search" ref="searchbox">
    <input type="search" v-model="search" id="search" placeholder="ctrl + k">
    <IconImg class="icon" name="tabler:search" />
    <!-- <transition name="appear">
      <div class="results" v-if="results?.length">
        <NuxtLink v-for="res in results" :to="'/projects/web/' + res.title.toLowerCase()" @click="search = ''">
          {{ res.title }}
        </NuxtLink>
      </div>
      <div class="results" v-else-if="search !== ''">
        <p>No results :(</p>
      </div>
    </transition> -->
  </div>
</template>

<style lang="scss" scoped>
.search {
  // display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
}

input[type="search"] {
  padding: 0.4rem 2rem 0.25rem 0.75rem;
  color: var(--color);
}

.icon {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}

.results {
  position: absolute;
  top: 3rem;
  padding: .75rem 1rem;
  display: flex;
  flex-flow: column;
  gap: 0.5rem;
  background-color: var(--bg-darker);
  border-radius: 0.5rem;
  width: 100%;
  z-index: 200;
  max-height: 20rem;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: thin;
  scrollbar-color: var(--scroll-color) transparent;
}
</style>