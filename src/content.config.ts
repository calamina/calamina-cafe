import { defineCollection, z } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { LinkSchema } from './models/Link';
import { MediaSchema } from './models/Media';
import { MomentSchema } from './models/Moment';
import { ProjectSchema } from './models/Project';

// ABOUT
const nowLinks = defineCollection({
  loader: file("src/collections/about/now/links.yaml"),
  schema: LinkSchema,
});
const nowMedia = defineCollection({
  loader: file("src/collections/about/now/media.yaml"),
  schema: MediaSchema,
});

// FAVORITES
const favMovies = defineCollection({
  loader: file("src/collections/about/favorites/movies.yaml"),
  schema: MediaSchema,
});
const favMoviesAnimated = defineCollection({
  loader: file("src/collections/about/favorites/moviesAnimated.yaml"),
  schema: MediaSchema,
});
const favMoviesShort = defineCollection({
  loader: file("src/collections/about/favorites/moviesShort.yaml"),
  schema: MediaSchema,
});
const favSeries = defineCollection({
  loader: file("src/collections/about/favorites/series.yaml"),
  schema: MediaSchema,
});
const favSeriesAnimated = defineCollection({
  loader: file("src/collections/about/favorites/seriesAnimated.yaml"),
  schema: MediaSchema,
});
const favBooks = defineCollection({
  loader: file("src/collections/about/favorites/books.yaml"),
  schema: MediaSchema,
});
const favBooksVisual = defineCollection({
  loader: file("src/collections/about/favorites/booksVisual.yaml"),
  schema: MediaSchema,
});
const favGames = defineCollection({
  loader: file("src/collections/about/favorites/games.yaml"),
  schema: MediaSchema,
});

// RESUME
const jobs = defineCollection({
  // loader: file("src/collections/about/resume/jobs.yaml"),
  loader: glob({ pattern: "**/*.toml", base: "./src/collections/about/resume/" }),
  schema: MomentSchema,
});

// PROJECT
const webProjects = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/collections/projects/web/" }),
  schema: ProjectSchema
});
const phoneProjects = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/collections/projects/phone/" }),
  schema: ProjectSchema
});

export const collections = { nowLinks, nowMedia, favMovies, favMoviesAnimated, favMoviesShort, favSeries, favSeriesAnimated, favBooks, favBooksVisual, favGames, jobs, webProjects, phoneProjects };