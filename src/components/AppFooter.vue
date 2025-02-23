<script setup lang="ts">
// import LinkContact from './LinkContact.vue';
// import SocialsList from './SocialsList.vue';
// const home = false
</script>

<template>
    <!-- <footer v-if="!project"> -->
    <footer>
        <div class="sep"></div>
        <div class="info">
            <span>©</span>
            <a target=”_blank” href="https://github.com/calamina">calamina</a>
            <span>~ 2024</span>
        </div>
        <!-- <p class=" tw-w-6/12">This website is being made with accessibility in mind (very early stage RN), don't hesitate to contact me for any improvement that
        could be made or for anything you feel is lacking !</p>
      <LinkContact v-if="!home" />
      <SocialsList v-if="!home" /> -->
    </footer>
</template>

<style lang="css" scoped>
footer {
    max-width: 70rem;
    width: 100%;
    display: flex;
    flex-flow: column;
    padding: 0.5rem 0 2.5rem;
    gap: 2rem;
}

.sep {
    height: 2px;
    width: 2rem;
    background-color: var(--bg-darker);
}

.info {
    display: flex;
    gap: 0.5rem;
}

a {
    text-decoration: underline;
}
</style>