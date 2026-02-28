import { z } from "astro/zod"

export const ProjectSchema = z.object({
    name: z.string(),
    description: z.array(z.string()),
    tech: z.object({
        tools: z.array(z.string()).optional(),
        languages: z.array(z.string()).optional(),
        colors: z.array(z.string()).optional(),
        fonts: z.array(z.string()).optional(),
        icons: z.array(z.string()).optional(),
    }).optional(),
})

export type Project = z.infer<typeof ProjectSchema>