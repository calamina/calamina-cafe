import { z } from 'astro:content';

export const MomentSchema = z.object({
  id: z.string(),
  date: z.string(),
  name: z.string(),
  desc: z.string(),
  start: z.string().optional(),
  info: z.string().optional(),
  actual: z.boolean().optional()
})

export type Moment = z.infer<typeof MomentSchema>
