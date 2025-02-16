<script setup lang="ts">
definePageMeta({ pageTransition: { name: 'appear', mode: 'out-in' } })
</script>

<template>
  <div class="tw-flex tw-flex-col tw-gap-4 tw-items-center xl:tw-flex-row">
    <div class="content tw-max-w-5xl">
      <section class="tw-pt-12 tw-pb-28">
        <h2 class="tw-pb-6">Now</h2>
        <article>
          <p>Working on solo projects :)</p>
          <p>Mainly focusing on / learning about these tools at the moment</p>
          <div class="tw-flex tw-items-baseline tw-gap-2 tw-py-2">
            <LinkIcon url="https://vuejs.org/" label="vue/nuxt" icon="tabler:brand-vue" />
            <LinkIcon url="https://astro.build/" label="astro" icon="tabler:brand-astro" />
            <LinkIcon url="https://threejs.org/" label="threejs" icon="tabler:brand-threejs" />
            <LinkIcon url="https://gsap.com/" label="gsap" icon="tabler:clover" />
            <LinkIcon url="https://p5js.org/" label="p5js" icon="tabler:asterisk-simple" />
          </div>
        </article>
        <article class="tw-pt-6">
          <div class="tw-grid tw-grid-cols-[auto_auto_auto] tw-w-fit tw-gap-y-0 tw-gap-x-2">
            <p class="tw-py-[2px]">Series</p>
            <p class="tw-py-[2px]">Movie</p>
            <p class="tw-py-[2px]">Comics</p>
            <LinkLabelImage url="https://en.wikipedia.org/wiki/Severance_(TV_series)"
                            label="Severance"
                            src="https://media.senscritique.com/media/000020547893/0/severance.png"
                            alt="severance series" />
            <LinkLabelImage url="https://en.wikipedia.org/wiki/Flow_(2024_film)"
                            label="Flow (not that great)"
                            src="https://media.senscritique.com/media/000022302763/0/flow_le_chat_qui_navait_plus_peur_de_leau.png"
                            alt="flow movie" />
            <LinkLabelImage url="http://www.brechtevens.com/comics"
                            label="Le Roi Méduse"
                            src="https://media.senscritique.com/media/000021828238/0/le_roi_meduse.jpg"
                            alt="le roi méduse comics" />
          </div>
        </article>
      </section>

      <section class="tw-pb-28">
        <h2 class="tw-pb-6">Favorites</h2>
        <div class="tw-grid tw-grid-cols-2 tw-gap-8 tw-w-fit">
          <article>
            <h3 class="tw-mb-2">Movies</h3>
            <div class="tw-flex tw-flex-col tw-gap-2 tw-w-full ">
              <LinkImageLabel url=""
                              label="In the Mood for Love"
                              src="https://media.senscritique.com/media/000020197781/0/in_the_mood_for_love.jpg"
                              alt="In the Mood for Love movie" />
              <LinkImageLabel url=""
                              label="Lost in Translation"
                              src="https://media.senscritique.com/media/000006098072/0/lost_in_translation.jpg"
                              alt="Lost in Translation movie" />
              <LinkImageLabel url=""
                              label="Vertigo"
                              src="https://media.senscritique.com/media/000004888043/0/sueurs_froides.jpg"
                              alt="Vertigo movie" />
              <LinkImageLabel url=""
                              label="One Flew Over the Cuckoo's Nest"
                              src="https://media.senscritique.com/media/000016145216/0/vol_au_dessus_d_un_nid_de_coucou.jpg"
                              alt="One Flew Over the Cuckoo's Nest movie" />
              <LinkImageLabel url=""
                              label="Le Trou"
                              src="https://media.senscritique.com/media/000006297048/0/le_trou.jpg"
                              alt="Le Trou movie" />
            </div>
          </article>
          <article>
            <h3 class="tw-mb-2">Animated Movies</h3>
            <div class="tw-flex tw-flex-col tw-gap-2 tw-w-full">
              <LinkImageLabel url=""
                              label="Les Aventures du prince Ahmed"
                              src="https://media.senscritique.com/media/000018487296/0/les_aventures_du_prince_ahmed.jpg"
                              alt="Les Aventures du prince Ahmed movie"
                              date="1926" />
              <LinkImageLabel url=""
                              label="The Thief and the Cobbler"
                              src="https://media.senscritique.com/media/000017024040/0/le_voleur_et_le_cordonnier.jpg"
                              alt="The Thief and the Cobbler movie" />
              <LinkImageLabel url=""
                              label="Fehérlófia"
                              src="https://media.senscritique.com/media/000017261406/0/le_fils_de_la_jument_blanche.jpg"
                              alt="Fehérlófia movie" />
              <LinkImageLabel url=""
                              label="Belladonna"
                              src="https://media.senscritique.com/media/000019795881/0/belladonna.jpg"
                              alt="Belladonna movie" />
              <LinkImageLabel url=""
                              label="Le Roi et l'Oiseau"
                              src="https://media.senscritique.com/media/000012351309/0/le_roi_et_l_oiseau.jpg"
                              alt="Le Roi et l'Oiseau movie" />
            </div>
          </article>
          <article>
            <h3 class="tw-mb-2">Short Movies</h3>
            <div class="tw-grid tw-items-stretch tw-gap-2 tw-w-full">
              <LinkImageLabel url=""
                              label="World of Tomorrow"
                              src="https://media.senscritique.com/media/000017015428/0/world_of_tomorrow.jpg"
                              alt="World of Tomorrow movie"
                              date="1926" />
              <LinkImageLabel url=""
                              label="Magnetic Rose"
                              src="https://media.senscritique.com/media/000017903909/0/magnetic_rose.jpg"
                              alt="Magnetic Rose movie" />
              <LinkImageLabel url=""
                              label="Sabina"
                              src="https://media.senscritique.com/media/000009077928/0/sabina.jpg"
                              alt="Sabina movie" />
              <LinkImageLabel url=""
                              label="L'Homme qui plantait des arbres"
                              src="https://media.senscritique.com/media/000017328335/0/l_homme_qui_plantait_des_arbres.jpg"
                              alt="L'Homme qui plantait des arbres movie" />
              <LinkImageLabel url=""
                              label="Airy Me"
                              src="https://media.senscritique.com/media/000016846321/0/airy_me.jpg"
                              alt="Airy Me movie" />
              <LinkImageLabel url=""
                              label="The Old Mill"
                              src="https://media.senscritique.com/media/000008120062/0/le_vieux_moulin.jpg"
                              alt="The Old Mill movie" />
              <LinkImageLabel url=""
                              label="Ginga no Uo URSA minor BLUE"
                              src="https://media.senscritique.com/media/000007033921/0/ginga_no_uo_ursa_minor_blue.jpg"
                              alt="Ginga no Uo URSA minor BLUE movie" />
              <LinkImageLabel url=""
                              label="Bam"
                              src="https://media.senscritique.com/media/000019524120/0/bam.jpg"
                              alt="Bam movie" />
            </div>
          </article>
        </div>
      </section>

      <div>
        <h2 class="tw-pb-6">Resume</h2>
        <div class="tw-grid tw-grid-cols-[auto_2px_auto] tw-gap-8 tw-gap-y-10 tw-mb-24">
          <h3 class="tw-py-2">Jobs & Internships</h3>
          <div class="tw-h-full tw-bg-[var(--bg-darker0)] tw-w-[2px]" />
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
            </AboutMoment>
          </div>
          <h3 class="tw-py-2">Studies</h3>
          <div class="tw-h-full tw-bg-[var(--bg-darker0)] tw-w-[2px]" />
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
              <template #date>2017</template>
              <template #name>IT DUT</template>
              <template #desc>Full stack developpement formation</template>
              <template #lang>html / javascript / css / java / cobol / Ocaml / ... </template>
            </AboutMoment>
          </div>
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

h2 {
  font-size: 1.5rem;
  // font-family: 'Apercu Light', monospace;
}
</style>
