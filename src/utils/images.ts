import type { ImageMetadata } from "astro";
import { ProjectType } from "./enum";

export const isVerticalImage = (image: { default: ImageMetadata }) => image.default.width / image.default.height < 1;

export const getProjectImages = (type: ProjectType, project: string) => {
  return (type === ProjectType.WEB ? webImages : phoneImages)
    .filter((file) => file[0].includes(project))
    .map((file) => file[1]());
};

export const getImage = (name: string, type: ProjectType) => {
  return (type === ProjectType.WEB ? webCovers : phoneCovers)
    .find((file) => file[0].includes(name))
    ?.[1]() ?? new Promise(() => null);
}

// GLOBS
const webImages = Object.entries(
  import.meta.glob<{ default: ImageMetadata }>(
    "/src/assets/img/content/projects/web/**/*.avif",
  ),
);
const phoneImages = Object.entries(
  import.meta.glob<{ default: ImageMetadata }>(
    "/src/assets/img/content/projects/phone/**/*.avif",
  ),
);

const webCovers = Object.entries(
  import.meta.glob<{ default: ImageMetadata }>(
    "/src/assets/img/content/projects/web/*.avif",
  ))

const phoneCovers = Object.entries(
  import.meta.glob<{ default: ImageMetadata }>(
    "/src/assets/img/content/projects/phone/*.avif",
  ))