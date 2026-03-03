import { z } from "astro/zod"

export const ArticleSchema = z.object({
    name: z.string(),
    title: z.string(),
    description: z.string(),
    category: z.string().optional(),
    created: z.date().optional(),
    updated: z.date().optional(),
})

export type Article = z.infer<typeof ArticleSchema>