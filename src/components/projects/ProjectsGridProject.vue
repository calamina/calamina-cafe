<script setup lang='ts'>
import type { Project } from '../../models/Project';
import Icon from '../Icon.vue';
import IconDotsDiagonal from '../Icons/IconDotsDiagonal.vue';

const { project, type } = defineProps<{
  project: Project
  type: string
}>()

const url = "/projects/" + type.toLowerCase() + "/";
</script>

<template>
  <a class="project" :href="url + project.name">
    <slot></slot>
    <div class="tags">
      <p v-for="tag in project.tech?.tools" class="tag">
        {{ tag }}</p>
    </div>
    <div class="info">
      <p class="name">
        {{ project.name }}
        <span v-if="project.online" class="status" :class="{ 'online': project.online }" />
      </p>
      <button aria-label="go to project page">
        <Icon :icon=IconDotsDiagonal size="1.25rem" />
      </button>
    </div>
  </a>
</template>
<style lang="scss" scoped>
.project {
  position: relative;
  display: flex;
  flex-flow: column;
  width: 100%;
  gap: 0.5rem;
  overflow: hidden;
  border-radius: 0.5rem;
  text-transform: capitalize;
  align-items: start;

  &:hover {
    background-color: inherit;

    button {
      background-color: var(--highlight);
    }

    button>* {
      transform: rotate(180deg);
      transition: transform 0.3s;
    }
  }
}

html.dark a:hover {
  background-color: transparent;

  p {
    color: var(--highlight);
  }

  button {
    background-color: var(--bg-darker);
    color: var(--highlight);
  }
}

.iconImg {
  transition: transform 0.3s;
}

.info {
  width: 100%;
  display: flex;
  gap: 0.5rem;
}

button {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  width: 2.5rem;
  height: auto;
  background-color: var(--bg-darker0);
}

.name {
  padding: 0.25rem 0.5rem;
  display: block;
  width: 100%;
  background-color: var(--bg-darker0);
  border-radius: 0.5rem;
  position: relative;
}

.tags {
  display: flex;
  display: none;
  right: 0;
  background-color: var(--bg-darker0);
  border-radius: 0.5rem;
}

.data {
  width: 100%;
  display: flex;
  align-items: end;
  gap: 0.25rem;
}

.status {
  position: absolute;
  right: 0.25rem;
  top: 0.25rem;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 0.5rem;
  background-color: var(--bg-darker);

  &.online {
    background-color: var(--highlight);
  }
}

@media (max-width: 1280px) {

  .project,
  .info {
    gap: 0.5rem;
  }

  .status {
    top: 0.75rem;
    right: 0.75rem;
  }
}
</style>
