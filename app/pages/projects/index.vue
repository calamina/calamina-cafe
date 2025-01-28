<script setup lang="ts">
definePageMeta({
  middleware: 'routing',
  pageTransition: transitionConfig,
});

const { data: weblist } = await useAsyncData(() => queryCollection(WEB).order('num', 'ASC').all())
const { data: phonelist } = await useAsyncData(() => queryCollection(PHONE).order('num', 'ASC').all())

const web = useTemplateRef('web')
const isWebVisible = useElementVisibility(web)
const phone = useTemplateRef('phone')
const isPhoneVisible = useElementVisibility(phone)
</script>

<template>
  <div class="tw-grid tw-w-full tw-relative tw-grid-cols-12 tw-gap-4">
    <div class="tw-sticky tw-h-fit tw-top-16 tw-left-4 tw-w-full tw-flex tw-flex-col tw-gap-8 tw-col-span-2">
      <div class="list" :class="{ 'active': isWebVisible && !isPhoneVisible }">
        <NuxtLink to="#web"><Icon name="tabler:folder" size="1.3rem" />web</NuxtLink>
        <div class="tw-flex tw-flex-col">
          <div v-for="web in weblist" class="item tw-flex tw-items-center tw-gap-2 tw-w-fit">
            <p>{{ web.num !== weblist?.length ? '├─' : '└─' }}</p>
            <!-- <p>{{ web.num !== weblist?.length ? '├─' : '└─' }}</p> -->
            <NuxtLink :to="'#' + web.name"> {{ web.name }}</NuxtLink>
          </div>
        </div>
      </div>
      <div class="list" :class="{ 'active': isPhoneVisible }">
        <NuxtLink to="#phone"><Icon name="tabler:folder" size="1.3rem" />phone</NuxtLink>
        <div class="tw-flex tw-flex-col">
          <div v-for="phone in phonelist" class="item tw-flex tw-items-center tw-gap-2 tw-w-fit">
            <p>{{ phone.num !== phonelist?.length ? '├─' : '└─' }}</p>
            <NuxtLink :to="'#' + phone.name">{{ phone.name }} </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <div class="tw-flex tw-flex-col tw-gap-4 tw-w-full tw-col-start-3 tw-col-end-13">
      <ProjectsGrid ref="web" :projects="weblist" :type="WEB" />
      <ProjectsGrid ref="phone" :projects="phonelist" :type="PHONE" />
    </div>
  </div>
</template>


<style lang="scss" scoped>
.list {
  opacity: 0.4;

  &.active {
  opacity: 1;
}
}

.item {
  height: 1.16rem;
}

// TRANSITIONS ?
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>