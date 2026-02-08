import { z } from "astro/zod"

export const ArticleSchema = z.object({
    name: z.string(),
    description: z.string(),
})

export type Article = z.infer<typeof ArticleSchema>