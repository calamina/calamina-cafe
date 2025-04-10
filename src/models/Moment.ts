import { z } from 'astro:content';

export const MomentSchema = z.object({
  id: z.string(),
  date: z.number(),
  name: z.string(),
  desc: z.string(),
  start: z.number().optional(),
  tools: z.object({
    tools: z.array(z.string()).optional(),
    languages: z.array(z.string()).optional(),
  }).optional(),
  actual: z.boolean().optional(),
  url: z.string().optional()
})

export type Moment = z.infer<typeof MomentSchema>
