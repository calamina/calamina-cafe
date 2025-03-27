<script setup lang="ts">
import Ascii from './ascii.vue';
import Icon from './Icon.vue';
import IconCC from './Icons/IconCC.vue';
</script>

<template>
    <footer>
        <div class="sep"></div>
        <div class="info">
            <!-- <Icon :icon=IconCC /> -->
            <a target="_blank" href="https://github.com/calamina">calamina</a>
            <span>~ 2024</span>
        </div>
        <!-- <Ascii /> -->
    </footer>
</template>

<style lang="css" scoped>
footer {
    max-width: var(--app-width);
    /* background-color: var(--bg-darker0); */
    width: 100%;
    display: flex;
    flex-flow: column;
    padding: 1rem;
    margin-top: 1rem;
    gap: 1rem;
}

.sep {
    height: 2px;
    width: 4rem;
    background-color: var(--bg-darker0);
    margin-bottom: 1rem;
}

.info {
    display: flex;
    gap: 0.5rem;
    align-items: center;
}

a {
    text-decoration: underline;
}

/* @media (max-width: 1280px) {
    footer {
        padding: 0.5rem 0 1rem;
    }
} */
</style>