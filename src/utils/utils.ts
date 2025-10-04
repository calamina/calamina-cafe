import { getCollection, type CollectionKey } from "astro:content";
import { ProjectCollection, ProjectType } from "./enum";
import { getGitData } from "./getGitData";
import type { TypedProject } from "../models/Types";

export const getSurroundingProjects = (index: number, projects: TypedProject[]): { prev: TypedProject; next: TypedProject } => ({
  prev: projects[index - 1] ?? null,
  next: projects[index + 1] ?? null,
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

// export const queryOne = async <T>(collection: CollectionKey, slug: string) =>
//   getEntry(collection, slug)?.then(results => results?.data as T);

// export const queryFilter = async <T>(collection: CollectionKey, filterFunction: Function) =>
//   getCollection(collection, filterFunction())?.then(results => results as T);

// Projects
export const queryWebProjects = async () => {
  const gitData = await getGitData()
  return getCollection("webProjects").then(results => results
    .map(result => result.data)
    .map(project => {
      const gitProject = gitData.find(git => git.name === project.name);
      return {
        type: ProjectType.WEB,
        ...project,
        ...(gitProject ?? null),
      }
    })
    .sort((a, b) => (b.updated_at?.getTime() ?? 0) - (a.updated_at?.getTime() ?? 0))
  )
}

export const queryLastProject = async () => (await queryWebProjects())[0]

export const queryProject = async (name: string) => (await queryWebProjects())?.find(res => res.name === name)