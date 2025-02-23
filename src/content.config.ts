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

export const collections = { aboutLinks, aboutMedia, favMovies, favMoviesAnimated, favMoviesShort, favSeries, favSeriesAnimated, favBooks, favBooksVisual, favGames };