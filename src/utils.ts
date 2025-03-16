import { getCollection, getEntry, type CollectionKey } from "astro:content";

export const query = async <T>(collection: CollectionKey) =>
  getCollection(collection).then(results => results.map(result => result.data) as T[]);

export const queryOne = async <T>(collection: CollectionKey, slug: string) =>
  getEntry(collection, slug)?.then(results => results?.data as T);

export const queryFilter = async <T>(collection: CollectionKey, filterFunction: Function) =>
  getCollection(collection, filterFunction())?.then(results => results as T);

export const getPaths = async (collection: "webProjects" | "phoneProjects") => {
  const projects = await getCollection(collection);
  return projects.map((project) => ({
    params: { project: project.data.name },
  }));
}
