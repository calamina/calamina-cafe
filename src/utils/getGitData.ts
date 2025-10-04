import type { GitProject } from "../models/Types";

export const getGitData = async () => {
  const url = `http://72.60.190.120:3000/api/github.getGithubRepositories?githubId=${import.meta.env.GIT_ID}`;
  const headers = {
    "Content-Type": "application/json",
    "X-API-KEY": import.meta.env.HOST_API,
  };

  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(`Error fetching git projects. Response status: ${response.status}`);
  }
  const data = await response.json()?.then((projects: GitProject[]) =>
    projects?.map((project: GitProject) => ({
      id: project.id,
      name: project.name,
      git_url: project.html_url,
      created_at: new Date(project.created_at),
      updated_at: new Date(project.pushed_at),
      homepage: project.homepage,
      default_branch: project.default_branch,
      language: project.language,
    }))
  );

  return data
}