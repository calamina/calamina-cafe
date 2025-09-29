<script setup lang="ts">
import { ref } from 'vue';

const { items } = defineProps<{
    items: string[]
}>()

const toggled = ref(false)
const toggle = () => toggled.value = !toggled.value
</script>

<template>
    <div class="wrapper">
        <div class="list" :class="{ 'short': !toggled }">
            <p v-for="item in items">{{ item }}</p>
        </div>
        <button @click="toggle()">{{ toggled ? "- hide" : "+ show" }} activities</button>
    </div>
</template>

<style scoped>
.wrapper {
    border: 1px solid var(--bg-darker);
    border-left: none;
    border-right: none;
    display: flex;
    flex-flow: column;
    padding: 0.4rem 0 0.75rem;
    gap: 0.4rem;
}

button {
    display: grid;
    place-content: center;
    border: 1px solid var(--bg-darker);
    background-color: var(--bg-darker0);
    width: fit-content;
    padding: 0 2rem;
    height: 1.5rem;
    border-radius: 0.5rem;
    margin-left: 2.25rem;
    margin-left: 0.5rem;
}

.list {
    display: flex;
    flex-flow: column;
    gap: 0rem;
    padding: 0 0.5rem 0;
    max-height: 15rem;
    overflow: hidden;
    transition: max-height 0.2s ease-out;

    &.short {
        max-height: 3.25rem;
        max-height: 0rem;
    }
}

p {
    display: inline-block;
    position: relative;
    color: var(--color-dim);
    padding: 0.25rem 0.5rem 0.1rem;
    border-radius: 0.5rem;
    padding-left: 1.75rem;
    font-size: 0.9rem;
    line-height: 1.25rem;

    &::before {
        position: absolute;
        left: 0.5rem;
        font-size: 1.25rem;
        line-height: 1.4rem;
        content: "— ";
        opacity: 0.15;
    }
}
</style>