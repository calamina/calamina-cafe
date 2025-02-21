<template>
  <button class="lookin">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
button {
  display: flex;
  justify-content: center;
  background-color: var(--bg-darker0);
  outline-offset: -1px;
  max-height: 85vh;
  border-radius: 0.5rem;
  overflow: hidden;

  &:focus,
  &:hover {
    outline: 1px solid var(--Grey-800)
  }
}
</style>