<script setup lang="ts">
// definePageMeta({
//   middleware: 'routing',
//   pageTransition: transitionConfig,
// })
definePageMeta({ pageTransition: { name: 'appear', mode: 'out-in' } })

// onMounted(() => {
//   document.querySelectorAll('.disc').forEach(disc => {
//     disc.addEventListener('mouseover', function () {
//       disc.classList.add('rotate')
//       disc.addEventListener("transitionend", () => disc.classList.remove('rotate'));
//     })
//   })
// })
</script>

<template>
  <div class="tw-flex tw-flex-col tw-gap-4 tw-items-center xl:tw-flex-row">
    <div class="content">
      <div class="info tw-pt-12 tw-pb-28">
        <h2 class="tw-pb-6">Now</h2>
        <section>
          <p>Working on solo projects :)</p>
          <p>Mainly focusing on / learning about these tools at the moment</p>
          <div class="tw-flex tw-items-baseline tw-gap-4 tw-py-2">
            <NuxtLink target="blank" to="https://vuejs.org/" class="techlink tw-flex tw-items-center tw-gap-1">
              <p>vue/nuxt</p>
              <Icon name="tabler:brand-vue" />
            </NuxtLink>
            <NuxtLink target="blank" to="https://astro.build/" class="techlink tw-flex tw-items-center tw-gap-1">
              <p>astro</p>
              <Icon name="tabler:brand-astro" />
            </NuxtLink>
            <NuxtLink target="blank" to="https://threejs.org/" class="techlink tw-flex tw-items-center tw-gap-1">
              <p>threejs</p>
              <Icon name="tabler:brand-threejs" />
            </NuxtLink>
            <NuxtLink target="blank" to="https://gsap.com/" class="techlink tw-flex tw-items-center tw-gap-1">
              <p>gsap</p>
              <Icon name="tabler:clover" />
            </NuxtLink>
            <NuxtLink target="blank" to="https://p5js.org/" class="techlink tw-flex tw-items-center tw-gap-1">
              <p>p5js</p>
              <Icon name="tabler:asterisk-simple" />
            </NuxtLink>
          </div>
        </section>
        <section class="tw-pt-6">
          <p>Last media experienced - but maybe not liked :^)</p>
          <div class="tw-grid tw-grid-cols-[auto_auto_auto] tw-w-fit tw-gap-y-0 tw-gap-x-4">
            <p class="tw-py-[2px]">Series</p>
            <p class="tw-py-[2px]">Movie</p>
            <p class="tw-py-[2px]">Comics</p>
            <NuxtLink to="https://en.wikipedia.org/wiki/Severance_(TV_series)" class="techlink">Severance</NuxtLink>
            <NuxtLink to="https://en.wikipedia.org/wiki/Flow_(2024_film)" class="techlink">Flow (it was not that great)
            </NuxtLink>
            <NuxtLink to="http://www.brechtevens.com/comics" class="techlink">Le Roi Méduse</NuxtLink>
          </div>
        </section>
        <!-- <p>
          Currently employed full time at
          <NuxtLink to="https://fr.linkedin.com/company/akuiteo" target="_blank">Akuiteo</NuxtLink>.
        </p>
        <p>CV : web + <NuxtLink to="https://google.com">pdf</NuxtLink>
        </p>
        <p>contact :)</p> -->
      </div>
      <h2 class="tw-pb-4">Resume</h2>
      <div class="grid tw-grid tw-gap-8 tw-gap-y-10 tw-mb-24">
        <h2>Jobs & Internships</h2>
        <div class=" spacer tw-h-full" />
        <div class="tw-flex tw-flex-col tw-gap-6">
          <AboutMoment>
            <template #date>
              <p>now</p>
              <p class="!tw-text-[var(--color-light]">↑</p>
              <p>2022</p>
            </template>
            <template #name>Akuiteo</template>
            <template #desc>Full stack developpement, angular 18 and java spring </template>
            <template #lang>html / ts / css / java</template>
          </AboutMoment>
          <AboutMoment>
            <template #date>2022</template>
            <template #name>SQLI</template>
            <template #desc>Full stack developpement, angular 13 and java spring </template>
            <template #lang>html / ts / css / java</template>
          </AboutMoment>
          <AboutMoment>
            <template #date>2021</template>
            <template #name>Kweerty</template>
            <template #desc>UI/UX design and Front-end developpement</template>
            <template #lang>html / ts / css / figma</template>
          </AboutMoment>
          <AboutMoment>
            <template #date>2020</template>
            <template #name>Yesouicom</template>
            <template #desc>UI/UX design and Front-end developpement</template>
            <template #lang>html / ts / css / figma</template>
          </AboutMoment>
          <AboutMoment>
            <template #date>2018</template>
            <template #name>SDIS Moselle</template>
            <template #desc>IT support and management</template>
            <!-- <template #lang>html / ts / css / figma</template> -->
          </AboutMoment>
        </div>
        <h2>Studies</h2>
        <div class="spacer tw-h-full" />
        <div class="tw-flex tw-flex-col tw-gap-4">
          <AboutMoment>
            <template #date>2022</template>
            <template #name>Lyon2 University</template>
            <template #desc>CIM (multimedia conception & integration) Master degree</template>
            <template #lang>html / ts / css / java</template>
          </AboutMoment>
          <AboutMoment>
            <!-- <template #date>2019 - 2021</template> -->
            <template #date>2021</template>
            <template #name>DUCCI</template>
            <template #desc>Frontend developpement & UI/UX Design</template>
            <template #lang>html / ts / css / java / adobe suite / figma</template>
          </AboutMoment>
          <AboutMoment>
            <template #date>2022</template>
            <template #name>IT DUT</template>
            <template #desc>Full stack developpement formation</template>
            <template #lang>html / javascript / css / java / cobol / Ocaml / ... </template>
          </AboutMoment>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-flow: column;
  opacity: 1;
  transform: translateY(0);
  transition: transform 0.3s;
}

.grid {
  grid-template-columns: repeat(3, auto);
}

.spacer {
  width: 2px;
  background-color: var(--bg-darker0);
}

.techlink {
  background-color: var(--bg-darker);
  padding: 0.15rem 0.75rem;
  border-radius: 0.5rem;

  &:hover {
    background-color: hsl(288, 50%, 77%);
  }
}

.dark-mode .techlink:hover {
  background-color: var(--bg-darker0);
  color: var(--highlight);
}

// .loader {
//   border: 2px solid var(--bg-darker0);
//   border-radius: 0.5rem;
//   width: 30rem;
//   height: 30rem;
//   display: grid;
//   grid-template-columns: repeat(5, 1fr);
//   align-items: center;
//   justify-content: center;
//   overflow: hidden;
// }

// .disc {
//   width: 6rem;
//   height: 6rem;
//   transition: border-radius 0.8s;
//   border-radius: 0.05rem;
// }

// .disc:hover, .rotate {
//   background-color: var(--bg-darker0);
//   border-radius: 0rem;
//   // animation: rotate 0.6s cubic-bezier(0.55, 0.055, 0.675, 0.19);
// }

// @keyframes rotate {
//   0% {
//     transform: rotateY(0deg)
//   }

//   100% {
//     transform: rotateY(180deg) rotateX(180deg)
//   }
// }

// @starting-style {
//   .content {
//     transform: translateY(-1rem);
//   }
// }

h1 {
  padding-bottom: 2rem;
}

p a {
  text-decoration: underline;
}
</style>
