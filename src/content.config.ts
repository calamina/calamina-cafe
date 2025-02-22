import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';
import { LinkSchema } from './models/Link';
import { MediaSchema } from './models/Media';

// ABOUT
const aboutLinks = defineCollection({
  loader: file("src/collections/about/links.yaml"),
  schema: LinkSchema,
});
const aboutMedia = defineCollection({
  loader: file("src/collections/about/media.yaml"),
  schema: MediaSchema,
});

export const collections = { aboutLinks, aboutMedia };