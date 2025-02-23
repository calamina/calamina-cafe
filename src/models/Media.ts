import { z } from 'astro:content';

export const MediaSchema = z.object({
  id: z.string(),
  url: z.string(),
  label: z.string(),
  src: z.string(),
  type: z.string().optional()
})

export type Media = z.infer<typeof MediaSchema>
