import type { Article } from "@models/Article";
import type { Project } from "@models/Project";
import { getCollection } from "astro:content";
import { ProjectCollection } from "./enum";

export const getPaths = async (collection: ProjectCollection): Promise<{ params: { project: string } }[]> => {
  const projects = await getCollection(collection);
  return projects.map((project) => ({
    params: { project: project.data.name },
  }));
}

export const queryWebProjects = async () =>
  getCollection("webProjects").then(results => results
    .map(result => result.data as Project)
  )

export const queryArticles = async () =>
  getCollection("articles").then(results => results
    .map(result => result.data as Article)
  )


export const queryLastProject = async () => (await queryWebProjects())[0]
export const queryLastArticle = async () => (await queryArticles())[0]

export const queryProject = async (name: string) => (await queryWebProjects())?.find(res => res.name === name)