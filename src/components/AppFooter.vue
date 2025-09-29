<script setup lang="ts">
import Ascii from './ascii.vue';
import LinkContact from './LinkContact.vue';
import SocialsList from './SocialsList.vue';
</script>

<template>
    <footer>
        <div class="info">
            <div class="thanks">
                <p>Thanks</p>
                <p>for</p>
                <p>visiting <span></span></p>
            </div>
            <div class="rights">
                <a target="_blank" href="https://github.com/calamina">calamina</a>
                <span>~ {{ (new Date()).getFullYear() }}</span>
            </div>
        </div>
        <div class="center">
            <Ascii class="ascii" />
            <LinkContact class="contact" />
        </div>
        <SocialsList class="socials" />
    </footer>
</template>

<style scoped>
footer {
    max-width: var(--app-width);
    background-color: var(--bg-darker0);
    width: 100%;
    display: grid;
    grid-template-columns: 18ch 1fr 18ch;
    padding: 2rem 4rem;
    margin-top: 1rem;
    gap: 2rem;
    align-items: end;
}

.thanks {
    justify-self: end;

    p {
        line-height: 1.25rem;
        grid-column: 2;
        display: flex;
        gap: 0.5rem;
        align-items: center;
    }

    span {
        background-color: var(--highlight);
        height: 0.5rem;
        width: 0.5rem;
        min-height: 0.5rem;
        min-width: 0.5rem;
        border-radius: 0.5rem;
    }

}

.center {
    height: 100%;
    justify-content: space-between;
}

.contact {
    width: fit-content;
    justify-self: center;
}

.socials {
    width: fit-content;
    justify-self: center;
    justify-self: end;
}

.ascii {
    grid-column: 2 / 3;
    align-self: start;
    justify-self: center;
    height: 100%;
}

.info {
    height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: space-between;
}

.rights {
    display: flex;
    gap: 1ch;
    align-items: center;

    & a {
        text-decoration: underline;
    }
}

@media (max-width: 1280px) {
    footer {
        display: flex;
        flex-flow: column;
        align-items: center;
        padding: 3rem 1rem;
    }

    .info {
        gap: 0.5rem;
        align-items: center;
    }

    .thanks {
        display: flex;
        gap: 1ch;

        p {
            width: fit-content;
        }
    }

    .center {
        gap: 1rem;
        padding: 1rem;
    }

    .ascii {
        /* font-size: 0.25rem; */
        /* line-height: 0.25rem; */
        font-size: 1vw;
        line-height: 1vw;
        align-items: center;
        justify-content: center;
    }
}
</style>