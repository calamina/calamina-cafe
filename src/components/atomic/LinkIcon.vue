<script setup lang="ts">
import Icon from '@components/icons/Icon.vue';
import IconAsterisk from '@components/icons/IconAsterisk.vue';
import IconAstro from '@components/icons/IconAstro.vue';
import IconClover from '@components/icons/IconClover.vue';
import IconLink from '@components/icons/IconLink.vue';
import IconLinkBroken from '@components/icons/IconLinkBroken.vue';
import IconThree from '@components/icons/IconThree.vue';
import IconVue from '@components/icons/IconVue.vue';

const { url, label, online = undefined, icon } = defineProps<{
  url: string
  label?: string
  icon?: string
  online?: boolean
}>()

const disabled = online === undefined ? false : !online

const icons = [IconVue, IconAsterisk, IconThree, IconClover, IconAstro]
const iconComponent = icons.find(iconComponent => icon && iconComponent.__file?.slice(0, -4).toLowerCase().includes(icon))
</script>

<template>
  <a v-if="!disabled" :href="url" target="_blank">
    {{ label ?? 'visit' }}
    <Icon v-if="iconComponent" :icon="iconComponent" />
    <Icon v-else :icon="IconLink" />
  </a>
  <p v-else inert class="disabled">
    offline (for now!)
    <Icon :icon="IconLinkBroken" />
  </p>
</template>

<style scoped>
a,
p {
  display: flex;
  align-content: center;
  border-radius: 0.5rem;
  gap: 0.5rem;
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
    color: var(--color-light);
    opacity: 0.8;

    svg {
      opacity: 0.3;
    }
  }
}

html.dark a:hover {
  background-color: var(--bg-darker0);
  color: var(--highlight);
}
</style>