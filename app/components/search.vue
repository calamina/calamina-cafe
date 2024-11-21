<script setup lang="ts">
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'
const search = ref('')
const searchbox = ref(null)

const query = await useAsyncData('web', () => queryContent('/web').find())
const results = computed(() => query.data.value?.filter(res => res._path?.includes(search.value) && search.value !== ''))

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

const { activate, deactivate } = useFocusTrap(searchbox)
watch(results, () => results.value?.length ? activate() : deactivate())
</script>

<template>
  <div class="search tw-hidden xl:tw-flex" ref="searchbox">
    <input type="search" v-model="search" id="search" placeholder="ctrl + k">
    <Icon name="tabler:search" />
    <transition name="appear">
      <div class="results" v-if="results?.length">
        <NuxtLink v-for="res in results" :to="'/projects/web/' + res.name" @click="search = ''">
          {{ res.name }}
        </NuxtLink>
      </div>
      <div class="results" v-else-if="search !== ''">
        <p>No results :(</p>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
input[type="search"] {
  padding-right: 2rem;
  padding-left: 0.75rem;
}

.icon {
  position: absolute;
  right: 0.5rem;
}

.search {
  // display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
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