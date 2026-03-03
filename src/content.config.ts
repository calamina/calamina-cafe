import { ArticleSchema } from '@models/Article';
import { ProjectSchema } from '@models/Project';
import { glob } from 'astro/loaders';
import { defineCollection } from 'astro:content';

// PROJECT
const webProjects = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/collections/projects/web/" }),
  schema: ProjectSchema
});
const phoneProjects = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/collections/projects/phone/" }),
  schema: ProjectSchema
});

// ARTICLES
const articles = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/collections/articles/" }),
  schema: ArticleSchema
});

// Notes
const notes = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/collections/notes/" }),
  schema: ArticleSchema
});


export const collections = { webProjects, phoneProjects, articles, notes };