<script setup lang="ts">
import IconImg from './IconImg.vue';

const { url, label, online = undefined } = defineProps<{
  url: string
  label?: string
  icon?: string
  online?: boolean
}>()

const disabled = online === undefined ? false : !online
console.log(online)
</script>

<template>
  <a :href="disabled ? undefined : url" target="_blank" :inert="disabled"
     :class="{ 'disabled': disabled }">
    {{ label ?? 'visit' }}
    <IconImg :name="icon ?? 'tabler:link'" :disabled="disabled" />
  </a>
</template>

<style lang="scss" scoped>
a {
  display: flex;
  align-content: center;
  border-radius: 0.5rem;
  align-items: center;
  width: fit-content;
  padding: 0.25rem 0.5rem 0.15rem;
  background-color: var(--bg-darker0);
  opacity: 1;
  transform: translateX(0);
  transition: opacity 0.3s 0.05s, transform 0.3s 0.05s;

  &:hover {
    background-color: var(--highlight);
  }

  &.disabled {
    // opacity: 0.2;
    color: var(--color-light);

    & IconImg {
      opacity: 0.5;
      color: var(--color-light);

    }
  }
}

.dark-mode a:hover {
  background-color: var(--bg-darker0);
  color: var(--highlight);
}

@starting-style {
  a {
    opacity: 0;
    transform: translateX(-0.5rem)
  }
}
</style>