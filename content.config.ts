import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    web: defineCollection({
      source: 'web/*.md',
      type: 'page',
      schema: z.object({
        num: z.number(),
        mini: z.string(),
        name: z.string(),
      })
    }),
    phone: defineCollection({
      source: 'phone/*.md',
      type: 'page',
      schema: z.object({
        num: z.number(),
        mini: z.string(),
        name: z.string(),
      })
    }),
    journal: defineCollection({
      source: 'journal/*.md',
      type: 'page',
      schema: z.object({
        num: z.number(),
        mini: z.string(),
        name: z.string(),
      })
    })
  }
})