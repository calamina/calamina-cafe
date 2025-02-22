import { z } from 'astro:content';

export const LinkSchema = z.object({
  id: z.string(),
  url: z.string(),
  label: z.string(),
  icon: z.string()
})

export type Link = z.infer<typeof LinkSchema>
