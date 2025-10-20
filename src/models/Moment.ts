import { z } from 'astro:content';

export const MomentSchema = z.object({
  name: z.string().optional(),
  start: z.date(),
  end: z.date().optional(),
  role: z.string().optional(),
  company: z.string().optional(),
  shortdesc: z.string().optional(),
  desc: z.string(),
  tools: z.array(z.string()).optional(),
  languages: z.array(z.string()).optional(),
  skills: z.array(z.string()).optional(),
  now: z.boolean().optional(),
  url: z.string().optional()
})

export type Moment = z.infer<typeof MomentSchema>
