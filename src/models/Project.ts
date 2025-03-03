import { z } from 'astro:content';

export const ProjectSchema = z.object({
    num: z.number(),
    created: z.date().optional(),
    updated: z.date().optional(),
    name: z.string(),
    url: z.string().optional(),
    online: z.boolean().optional().default(true),
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
