import { getCollection, getEntry, type CollectionEntry, type CollectionKey } from "astro:content";
import type { Project } from "../models/Project";
import type { ProjectCollection } from "./enum";

export const getSurroundingProjects = (index: number, projects: CollectionEntry<ProjectCollection>[]): { prev: Project; next: Project } => ({
  prev: projects[index - 1]?.data ?? null,
  next: projects[index + 1]?.data ?? null,
});

export const getPaths = async (collection: ProjectCollection): Promise<{ params: { project: string } }[]> => {
  const projects = await getCollection(collection);
  return projects.map((project) => ({
    params: { project: project.data.name },
  }));
}

// QUERIES
export const query = async <T>(collection: CollectionKey) =>
  getCollection(collection).then(results => results.map(result => result.data) as T[]);

export const queryOne = async <T>(collection: CollectionKey, slug: string) =>
  getEntry(collection, slug)?.then(results => results?.data as T);

export const queryLast = async <T>(collection: CollectionKey) =>
  getCollection(collection)?.then(results => results[0]?.data as T);

export const queryFilter = async <T>(collection: CollectionKey, filterFunction: Function) =>
  getCollection(collection, filterFunction())?.then(results => results as T);