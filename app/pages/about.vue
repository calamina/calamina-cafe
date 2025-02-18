<script setup lang="ts">
definePageMeta({ pageTransition: { name: 'appear', mode: 'out-in' } })
</script>

<template>
  <div class="tw-flex tw-flex-col tw-gap-4 tw-items-center xl:tw-flex-row tw-w-full">
    <div class="content tw-w-full">
      <section class="tw-pt-12 tw-pb-28">
        <h2 class="tw-pb-6 tw-flex tw-items-center tw-gap-2">
          Now
          <Icon name="tabler:mood-smile" />
        </h2>
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
          <div class="tw-grid tw-grid-cols-[auto_auto_auto_auto] tw-w-fit tw-gap-y-0 tw-gap-x-2">
            <div class="tw-flex tw-flex-col">
              <p class="tw-py-[2px]">Series</p>
              <LinkLabelImage url="https://en.wikipedia.org/wiki/Severance_(TV_series)"
                              label="Severance"
                              src="https://media.senscritique.com/media/000020547893/0/severance.png"
                              alt="severance series" />
            </div>
            <div class="tw-flex tw-flex-col">
              <p class="tw-py-[2px]">Movie</p>
              <LinkLabelImage url="https://en.wikipedia.org/wiki/Flow_(2024_film)"
                              label="Flow (not that great)"
                              src="https://media.senscritique.com/media/000022302763/0/flow_le_chat_qui_navait_plus_peur_de_leau.png"
                              alt="flow movie" />
            </div>
            <div class="tw-flex tw-flex-col">
              <p class="tw-py-[2px]">Comics</p>
              <LinkLabelImage url="http://www.brechtevens.com/comics"
                              label="Le Roi Méduse"
                              src="https://media.senscritique.com/media/000021828238/0/le_roi_meduse.jpg"
                              alt="le roi méduse comics" />
            </div>
            <div class="tw-flex tw-flex-col">
              <p class="tw-py-[2px]">Animated Series</p>
              <LinkLabelImage url="https://www.senscritique.com/serie/time_shadows/45584027"
                              label="Summertime Rendering"
                              src="https://media.senscritique.com/media/000021203484/0/time_shadows.jpg"
                              alt="Summertime Rendering comics" />
            </div>
          </div>
        </article>
      </section>

      <section class="tw-pb-28 tw-w-full">
        <h2 class="tw-pb-6 tw-flex tw-items-center tw-gap-2">Favorites
          <Icon name="tabler:heart" />
        </h2>
        <div class="tw-grid tw-grid-cols-3 tw-gap-8 tw-w-full tw-pb-8">
          <article>
            <h3 class="tw-mb-2">Movies</h3>
            <div class="tw-flex tw-flex-col tw-gap-1 tw-w-full ">
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
              <LinkImageLabel url="https://www.senscritique.com/film/les_nibelungen/408946"
                              label="Les Nibelungen"
                              src="https://media.senscritique.com/media/000022358379/0/les_nibelungen.jpg"
                              alt="Les Nibelungen movie" />
            </div>
          </article>
          <article>
            <h3 class="tw-mb-2">Animated Movies</h3>
            <div class="tw-flex tw-flex-col tw-gap-1 tw-w-full">
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
            <div class="tw-grid tw-items-stretch tw-gap-1 tw-w-full">
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
              <!-- <LinkImageLabel url=""
                              label="The Old Mill"
                              src="https://media.senscritique.com/media/000008120062/0/le_vieux_moulin.jpg"
                              alt="The Old Mill movie" /> -->
              <LinkImageLabel url=""
                              label="Ginga no Uo URSA minor BLUE"
                              src="https://media.senscritique.com/media/000007033921/0/ginga_no_uo_ursa_minor_blue.jpg"
                              alt="Ginga no Uo URSA minor BLUE movie" />
            </div>
          </article>
        </div>
        <div class="tw-grid tw-grid-cols-3 tw-gap-8 tw-w-full  tw-pb-8">
          <article>
            <h3 class="tw-mb-2">Series</h3>
            <div class="tw-flex tw-flex-col tw-gap-1 tw-w-full ">
              <LinkImageLabel url="https://www.senscritique.com/serie/twin_peaks/75730"
                              label="Twin Peaks"
                              src="https://media.senscritique.com/media/000019930054/0/twin_peaks.jpg"
                              alt="Twin Peaks series" />
              <LinkImageLabel url="https://www.senscritique.com/serie/oz/198281"
                              label="Oz"
                              src="https://media.senscritique.com/media/000019276536/0/oz.jpg"
                              alt="Oz series" />
              <LinkImageLabel url="https://www.senscritique.com/serie/predateurs/17840276"
                              label="The Hunt"
                              src="https://media.senscritique.com/media/000012382643/0/predateurs.jpg"
                              alt="The Hunt series" />
              <LinkImageLabel url="https://www.senscritique.com/serie/planete_terre/417261"
                              label="Planet Earth"
                              src="https://media.senscritique.com/media/000006507385/0/planete_terre.jpg"
                              alt="Planet Earth series" />
              <LinkImageLabel url="https://www.senscritique.com/serie/severance/40631247"
                              label="Severance"
                              src="https://media.senscritique.com/media/000020547893/0/severance.png"
                              alt="Severance series" />
            </div>
          </article>
          <article class=" tw-col-span-2">
            <h3 class="tw-mb-2">Animated Series</h3>
            <div class="tw-grid tw-grid-cols-[1fr_1fr] tw-gap-1 tw-w-full ">
              <LinkImageLabel url="https://www.senscritique.com/serie/mononoke/487023"
                              label="Mononoke"
                              src="https://media.senscritique.com/media/000000071700/0/mononoke.jpg"
                              alt="Mononoke series"
                              date="1926" />
              <LinkImageLabel url="https://www.senscritique.com/serie/mushishi/487652"
                              label="Mushishi"
                              src="https://media.senscritique.com/media/000004349370/0/mushishi.jpg"
                              alt="Mushishi series" />
              <LinkImageLabel url="https://www.senscritique.com/serie/l_odyssee_de_kino/19393"
                              label="Kino no Tabi"
                              src="https://media.senscritique.com/media/000000099034/0/l_odyssee_de_kino.jpg"
                              alt="Kino no Tabi series" />
              <LinkImageLabel url="https://www.senscritique.com/serie/revolutionary_girl_utena/140680"
                              label="Revolutionary Girl Utena"
                              src="https://media.senscritique.com/media/000006512922/0/revolutionary_girl_utena.jpg"
                              alt="Revolutionary Girl Utena series" />
              <LinkImageLabel url="https://www.senscritique.com/serie/silly_symphonies/208184"
                              label="Silly Symphonies"
                              src="https://media.senscritique.com/media/000017601843/0/silly_symphonies.jpg"
                              alt="Silly Symphonies series" />
              <LinkImageLabel url="https://www.senscritique.com/serie/ping_pong/21525566"
                              label="Ping Pong The Animation"
                              src="https://media.senscritique.com/media/000021132321/0/ping_pong.jpg"
                              alt="Ping Pong The Animation series" />
              <LinkImageLabel url="https://www.senscritique.com/serie/xavier_renegade_angel/431563"
                              label="Xavier: Renegade Angel"
                              src="https://media.senscritique.com/media/000006564731/0/xavier_renegade_angel.jpg"
                              alt="Xavier: Renegade Angel series" />
              <LinkImageLabel url="https://www.senscritique.com/serie/kaiba/402696"
                              label="Kaiba"
                              src="https://media.senscritique.com/media/000006507591/0/kaiba.jpg"
                              alt="Kaiba series" />
              <LinkImageLabel url="https://www.senscritique.com/serie/ranking_of_kings/43399233"
                              label="Ranking of Kings"
                              src="https://media.senscritique.com/media/000020709494/0/ranking_of_kings.jpg"
                              alt="Ranking of Kings series" />
              <LinkImageLabel url="https://www.senscritique.com/serie/scavengers_reign/48034502"
                              label="Scavengers Reign"
                              src="https://media.senscritique.com/media/000021643755/0/scavengers_reign.jpg"
                              alt="Scavengers Reign series" />
            </div>
          </article>
        </div>
        <div class="tw-grid tw-grid-cols-3 tw-gap-8 tw-w-full tw-pb-8">
          <article>
            <h3 class="tw-mb-2">Books</h3>
            <div class="tw-flex tw-flex-col tw-gap-1 tw-w-full ">
              <LinkImageLabel url="https://www.senscritique.com/livre/Gilgamesh/10837390"
                              label="Gilgamesh"
                              src="https://media.senscritique.com/media/000006287297/0/Gilgamesh.jpg"
                              alt="Gilgamesh book" />
              <LinkImageLabel url="https://www.senscritique.com/livre/moumine_le_troll/197"
                              label="Moumine le troll"
                              src="https://media.senscritique.com/media/000000067836/0/moumine_le_troll.jpg"
                              alt="Moumine le troll book" />
              <LinkImageLabel url="https://www.senscritique.com/livre/l_homme_qui_prenait_sa_femme_pour_un_chapeau/429018"
                              label="The Man Who Mistook His Wife for a Hat"
                              src="https://media.senscritique.com/media/000017620684/0/l_homme_qui_prenait_sa_femme_pour_un_chapeau.jpg"
                              alt="The Man Who Mistook His Wife for a Hat book" />
              <LinkImageLabel url="https://www.senscritique.com/livre/la_maison_des_feuilles/367357"
                              label="House of Leaves"
                              src="https://media.senscritique.com/media/000009176874/0/la_maison_des_feuilles.jpg"
                              alt="House of Leaves book" />
              <LinkImageLabel url="https://www.senscritique.com/livre/la_nuit_des_temps/209456"
                              label="La Nuit des temps"
                              src="https://media.senscritique.com/media/000016623783/0/la_nuit_des_temps.jpg"
                              alt="La Nuit des temps book" />
            </div>
          </article>
          <article class="tw-col-span-2">
            <h3 class="tw-mb-2">Comics / Graphic novels / Manga</h3>
            <div class="tw-grid tw-grid-cols-[1fr_1fr] tw-gap-1 tw-w-full">
              <LinkImageLabel url="https://www.senscritique.com/bd/l_ere_des_cristaux/18263943"
                              label="Hōseki no Kuni"
                              src="https://media.senscritique.com/media/000022095222/0/l_ere_des_cristaux.jpg"
                              alt="Hōseki no Kuni book"
                              date="1926" />
              <LinkImageLabel url="https://www.senscritique.com/bd/nausicaa_de_la_vallee_du_vent_tome_1/35714"
                              label="Kaze no Tani no Nausicaa"
                              src="https://media.senscritique.com/media/000016348293/0/nausicaa_de_la_vallee_du_vent_tome_1.jpg"
                              alt="Kaze no Tani no Nausicaa book"
                              date="1926" />
              <LinkImageLabel url="https://www.senscritique.com/bd/calvin_et_hobbes/150545"
                              label="Calvin and Hobbes"
                              src="https://media.senscritique.com/media/000021565432/0/calvin_et_hobbes.jpg"
                              alt="Calvin and Hobbes book"
                              date="1926" />
              <LinkImageLabel url="https://www.senscritique.com/bd/berserk/267858"
                              label="Berserk"
                              src="https://media.senscritique.com/media/000005359259/0/berserk.jpg"
                              alt="Berserk book"
                              date="1926" />
              <LinkImageLabel url="https://www.senscritique.com/bd/donjon/25201904"
                              label="Donjon"
                              src="https://media.senscritique.com/media/000016942749/0/donjon.jpg"
                              alt="Donjon book"
                              date="1926" />
              <LinkImageLabel url="https://www.senscritique.com/bd/asterios_polyp/394538"
                              label="Asterios Polyp"
                              src="https://media.senscritique.com/media/000015521652/0/asterios_polyp.jpg"
                              alt="Asterios Polyp book"
                              date="1926" />
              <LinkImageLabel url="https://www.senscritique.com/bd/le_roi_meduse/71387155"
                              label="Le Roi Méduse"
                              src="https://media.senscritique.com/media/000021828238/0/le_roi_meduse.jpg"
                              alt="Le Roi Méduse book"
                              date="1926" />
              <LinkImageLabel url="https://www.senscritique.com/bd/in_humus/32107144"
                              label="In-Humus"
                              src="https://media.senscritique.com/media/000017726535/0/in_humus.jpg"
                              alt="In-Humus book"
                              date="1926" />
              <LinkImageLabel url="https://www.senscritique.com/bd/le_discours_de_la_panthere/43155964"
                              label="Le Discours de la panthère"
                              src="https://media.senscritique.com/media/000020079829/0/le_discours_de_la_panthere.jpg"
                              alt="Le Discours de la panthère book"
                              date="1926" />
              <LinkImageLabel url="https://www.senscritique.com/bd/planetes_l_integrale/125931"
                              label="Planetes : L'Intégrale"
                              src="https://media.senscritique.com/media/000013193365/0/planetes_l_integrale.jpg"
                              alt="Planetes : L'Intégrale book"
                              date="1926" />
            </div>
          </article>
        </div>
        <article class="tw-col-span-2">
          <h3 class="tw-mb-2">Games</h3>
          <div class="tw-grid tw-grid-cols-3 tw-gap-1 tw-w-full">
            <LinkImageLabel url="https://www.senscritique.com/jeuvideo/shadow_of_the_colossus/165670"
                            label="Shadow of the colossus"
                            src="https://media.senscritique.com/media/000018540519/0/shadow_of_the_colossus.png"
                            alt="Shadow of the colossus game"
                            date="1926" />
            <LinkImageLabel url="https://www.senscritique.com/jeuvideo/persona_5_royal/39346665"
                            label="Persona 5: The Royal"
                            src="https://media.senscritique.com/media/000020767418/0/persona_5_royal.png"
                            alt="Persona 5: The Royal game"
                            date="1926" />
            <LinkImageLabel url="https://www.senscritique.com/jeuvideo/final_fantasy_xii_international/47369"
                            label="Final Fantasy XII International Zodiac Job System"
                            src="https://media.senscritique.com/media/000004263658/0/final_fantasy_xii.jpg"
                            alt="Final Fantasy XII International Zodiac Job System game"
                            date="1926" />
            <LinkImageLabel url="https://www.senscritique.com/jeuvideo/ghost_trick_detective_fantome/408183"
                            label="Ghost Trick"
                            src="https://media.senscritique.com/media/000021997616/0/ghost_trick_detective_fantome.png"
                            alt="Ghost Trick game"
                            date="1926" />
            <LinkImageLabel url="https://www.senscritique.com/jeuvideo/pokemon_cristal/46087"
                            label="Pokémon Cristal"
                            src="https://media.senscritique.com/media/000017577771/0/pokemon_cristal.png"
                            alt="Pokémon Cristal game"
                            date="1926" />
            <LinkImageLabel url="https://www.senscritique.com/jeuvideo/dark_souls/376047"
                            label="Dark Souls"
                            src="https://media.senscritique.com/media/000020995819/0/dark_souls.png"
                            alt="Dark Souls game"
                            date="1926" />
          </div>
        </article>
      </section>

      <div>
        <h2 class="tw-pb-6 tw-flex tw-items-center tw-gap-2">
          Resume
          <Icon name="tabler:database" />
        </h2>
        <div class="tw-grid tw-grid-cols-[auto_2px_1fr] tw-gap-8 tw-gap-y-10 tw-mb-24">
          <h3 class="tw-py-2 tw-w-fit">Jobs & Internships</h3>
          <div class="tw-h-full tw-bg-[var(--bg-darker0)] tw-w-[2px]" />
          <div class="tw-flex tw-flex-col tw-gap-6 tw-flex-w-full">
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
          <h3 class="tw-py-2 tw-w-fit">Studies</h3>
          <div class="tw-h-full tw-bg-[var(--bg-darker0)] tw-w-[2px]" />
          <div class="tw-flex tw-flex-col tw-gap-4 tw-w-full">
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
