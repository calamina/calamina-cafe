import { getCollection, getEntry, type CollectionKey } from "astro:content";
import type { Project } from "./models/Project";

export const query = async <T>(collection: CollectionKey) =>
  getCollection(collection).then(results => results.map(result => result.data) as T[]);

export const queryOne = async <T>(collection: CollectionKey, slug: string) =>
  getEntry(collection, slug)?.then(results => results?.data as T);

export const queryFilter = async <T>(collection: CollectionKey, filterFunction: Function) =>
  getCollection(collection, filterFunction())?.then(results => results as T);

export const queryPrevious = async (collection: CollectionKey, num: number) =>
  getCollection(collection, ({ data }) => (data as Project)?.num === (num - 1))?.then(results => results[0]?.data as Project);

export const queryNext = async (collection: CollectionKey, num: number) =>
  getCollection(collection, ({ data }) => (data as Project)?.num === (num + 1))?.then(results => results[0]?.data as Project);
