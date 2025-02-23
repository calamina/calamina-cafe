import { getCollection, type CollectionEntry, type CollectionKey } from "astro:content";

export const query = async (collection: CollectionKey) =>
  await getCollection(collection).then((medias) => get<CollectionKey>(medias));

export const get = <T extends CollectionKey>(query: CollectionEntry<T>[]) =>
  query.map((result: CollectionEntry<T>) => result.data);

