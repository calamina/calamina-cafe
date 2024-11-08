<script setup lang="ts">
import type { NuxtError } from '#app'

const { error } = defineProps<{
  error: NuxtError
}>()
</script>

<template>
  <div class="wrapper">
    <h1>[<span>{{ error.statusCode }} error</span>]</h1>
    <p>
      Woopsi, you shouldn't be here !
      <br>
      That may be my fault, or that may be yours :^)
    </p>
    <NuxtLink to="/">Go back home !</NuxtLink>
    <!-- todo :: extract to component :) -->
    <pre>
                                ....
                            ,;;'''';;,                    ,;;;;,
                  ,        ;;'      `;;,               .,;;;'   ;
              ,;;;       ;;          `;;,';;;,.     ,%;;'     '
            ,;;,;;       ;;         ,;`;;;, `;::.  %%;'
            ;;;,;;;       `'       ,;;; ;;,;;, `::,%%;'
            ;;;,;;;,          .,%%%%%'% ;;;;,;;   %;;;
  ,%,.      `;;;,;;;,    .,%%%%%%%%%'%; ;;;;;,;;  %;;;
;,`%%%%%%%%%%`;;,;;'%%%%%%%%%%%%%'%%'  `;;;;;,;, %;;;
;;;,`%%%%%%%%%%%,; ..`%%%%%%%%;'%%%'    `;;;;,;; %%;;
  `;;;;;,`%%%%%,;;/, .. `"""'',%%%%%      `;;;;;; %%;;,
    `;;;;;;;,;;/////,.    ,;%%%%%%%        `;;;;,`%%;;
            ;;;/%%%%,%///;;;';%%%%%%,          `;;;%%;;,
          ;;;/%%%,%%%%%/;;;';;'%%%%%,             `%%;;
          .;;/%%,%%%%%//;;'  ;;;'%%%%%,             %%;;,
          ;;//%,%%%%//;;;'   `;;;;'%%%%             `%;;;
          ;;//%,%//;;;;'      `;;;;'%%%              %;;;,
          `;;//,/;;;'          `;;;'%%'              `%;;;
            `;;;;'               `;'%'                `;;;;
                                  '      .,,,.        `;;;;
                                      ,;;;;;;;;;;,     `;;;;
                                      ;;;'    ;;;,;;,    `;;;;
                                      ;;;      ;;;;,;;.   `;;;;
                                      `;;      ;;;;;,;;   ;;;;
                                        `'      `;;;;,;;  ;;;;
                                                    `;;,;, ;;;;
                                                      ;;, ;;;;
                                                        ';;;;;
                                                          ;;;;;
                                                        .;;;;'
                                                        .;;;;'
                                                      ;;;;;'
                                                      ,;;;;'
</pre>
    <p>Art by <span>Susie Oviatt</span></p>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-flow: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  // color: #960843;
}

a {
  text-decoration: underline;
  color: #960843;
}

pre {
  background-color: #eaeaea;
  // color: #666;
  color: #960843;
  // border: 1px solid #000;
  padding: 1rem;
  letter-spacing: -2px;
  line-height: 0.95rem;
  font-size: 0.8rem;
}

span {
  color: #960843;
}

p {
  text-align: center;
}
</style>