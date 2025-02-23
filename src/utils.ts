import { getCollection, type CollectionKey } from "astro:content";

export const query = async <T>(collection: CollectionKey) =>
  getCollection(collection).then(results => results.map(result => result.data) as T[]);