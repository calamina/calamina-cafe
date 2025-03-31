<script setup lang="ts">
import Ascii from './ascii.vue';
import Icon from './Icon.vue';
import IconCC from './Icons/IconCC.vue';
import LinkContact from './LinkContact.vue';
import SocialsList from './SocialsList.vue';
</script>

<template>
    <footer>
        <!-- <div class="sep"></div> -->
        <Ascii class="ascii" />
        <SocialsList class="socials" />
        <div class="info">
            <!-- <Icon :icon=IconCC /> -->
            <a target="_blank" href="https://github.com/calamina">calamina</a>
            <span>~ 2024</span>
        </div>
        <LinkContact class="contact" />
    </footer>
</template>

<style lang="css" scoped>
footer {
    max-width: var(--app-width);
    background-color: var(--bg-darker0);
    width: 100%;
    display: grid;
    grid-template-columns: auto auto 1fr;
    /* display: flex; */
    /* flex-flow: column; */
    padding: 2rem 4rem;
    margin-top: 1rem;
    gap: 2rem;
    align-items: end;
}

.contact {
    width: fit-content;
    justify-self: end;
}

.socials {
    width: fit-content;
    justify-self: center;
    justify-self: end;
    padding-right: 2rem;
    grid-row: span 2;
}

.ascii {
    grid-column: span 2;
    align-self: start;
    justify-self: start;
    height: 100%;
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

@media (max-width: 1280px) {
    footer {
        display: flex;
        flex-flow: column;
        align-items: center;
        padding: 0.5rem 0 1rem;
    }

    .ascii {
        font-size: 0.25rem;
        line-height: 0.25rem;
        align-items: center;
        justify-content: center;
    }
}
</style>