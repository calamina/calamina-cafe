import { ArticleSchema } from '@models/Article';
import { ProjectSchema } from '@models/Project';
import { glob } from 'astro/loaders';
import { defineCollection } from 'astro:content';

// PROJECT
const projects = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/collections/projects/web/" }),
  schema: ProjectSchema
});

// ARTICLES
const articles = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/collections/articles/" }),
  schema: ArticleSchema
});

// NOTES
const notes = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/collections/notes/" }),
  schema: ArticleSchema
});

export const collections = { projects, articles, notes };