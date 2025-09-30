import { z } from 'zod';
import { MediaSchema } from './Media';

export const MediaListSchema = z.object({
  title: z.string(),
  medias: z.array(MediaSchema),
  toggled: z.boolean().optional(),
  size: z.enum(["large", "full"]).optional(),
})

export type MediaList = z.infer<typeof MediaListSchema>
