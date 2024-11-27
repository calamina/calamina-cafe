<script setup lang="ts">
const { size, button } = defineProps<{
    size?: number
    button?: boolean
}>()

const bracketsSize = computed(() => { return { '--size': size ?? 20 + 'px' } })
</script>

<template>
    <NuxtLink v-if="!button" class="bracketWrap">
        <slot class="content"></slot>
        <div class="overlay" aria-hidden="true">
            <div class="select" :style="bracketsSize">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div class="mask"></div>
        </div>
    </NuxtLink>
    <button v-else>
        <slot class="content"></slot>
    </button>
    <!-- <button v-else class="bracketWrap">
        <slot class="content"></slot>
        <div class="overlay" aria-hidden="true">
            <div class="select" :style="bracketsSize">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div class="mask"></div>
        </div>
    </button> -->
</template>
<style scoped lang="scss">
a {
  position: relative;
//   padding: 0.5rem;
  width: 100%;
  height: 100%;

  &:focus {
    outline: none;

    .wrapper {
      opacity: 1;
      transform: scale(1);
    }
  }

  &:hover {
    .wrapper {
      opacity: 1;
      transform: scale(1);
    }
  }
}

// button, a {
button {
    // padding: 0.5rem;
    border-radius: 0.5rem;
    overflow: hidden;
    // border: 6px solid transparent;

    &:focus, &:hover {
        outline: 1px solid var(--Grey-800)
    }
    // &:focus, &:hover {
    //     border: 1px solid var(--bg-darkest);
    // }


}

.bracketWrap {
    position: relative;
    // border: 1px solid transparent;
    // padding: 0.5rem;

    &:hover .overlay,
    &:focus .overlay {
        opacity: 1;
        transform: scale(1);
    }

    // TODO: replace once all buttons focus has been set
    &:focus {
        outline: none;
    }
}

.content:focus+.overlay {
    opacity: 1;
    transform: scale(1);
}

.overlay {
    z-index: -1;
    position: absolute;
    top: -0.5rem;
    left: -0.5rem;
    bottom: -0.5rem;
    right: -0.5rem;
    opacity: 0;
    transform: scale(1.05);
    transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transition-delay: 0.025s;
}

.mask {
    position: absolute;
    top: 1px;
    left: 1px;
    right: 1px;
    bottom: 1px;
    background-color: var(--bg);
    border-radius: 0.25rem;
}

.select {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: grid;
    grid-template-columns: var(--size) var(--size);
    grid-template-rows: var(--size) var(--size);
    gap: calc(100% - (var(--size) * 2));
    background-color: var(--bg-darker);
    border-radius: calc(0.25rem + 1px);
    overflow: hidden;

    span {
        display: block;
        width: var(--size);
        height: var(--size);
        background-color: var(--bg-darkest);
    }
}
</style>