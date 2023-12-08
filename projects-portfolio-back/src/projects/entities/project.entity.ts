import { BulletPoint } from "./bulletPoint";
import { ProjectDescription } from "./projectDescription";
import { GithubRepoParserResult } from "@birkheadc/github-repo-parser";

export class Project {
  id: string;
  title: string;
  site: string;
  source: string;
  favoriteLevel: number;
  descriptions: {
    bulletPoints: BulletPoint[],
    shortDescriptions: ProjectDescription[],
    longDescriptions: ProjectDescription[]
  };
  technologies: string[];
  imageUrls: string[];

  static fromGithubRepoParserResult(result: GithubRepoParserResult): Project {
    const project = new Project();

    console.log("Turn this into a project: ", result.json);
    const json = result.json;

    project.id = json.id ?? '';
    project.title = json.title ?? '';
    project.site = json.title ?? '';
    project.source = json.source ?? '';
    project.favoriteLevel = parseInt(json.favoriteLevel ?? '0');
    project.descriptions = json.descriptions ?? {
      bulletPoints: [],
      shortDescriptions: [],
      longDescriptions: []
    }
    project.technologies = json.technologies ?? [];
    project.imageUrls = result.files.images ?? [];

    return project;
  }
}