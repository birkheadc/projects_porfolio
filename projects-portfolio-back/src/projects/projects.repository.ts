import { Injectable } from "@nestjs/common";
import { Project } from "./entities/project.entity";
import { ProjectsConfig } from "./projects.config";
import { GithubRepoParser } from '@birkheadc/github-repo-parser';

@Injectable()
export class ProjectsRepository {
  constructor(private readonly config: ProjectsConfig) { }

  async getAll(): Promise<Project[]> {
    const projects: Project[] = [];

    const githubParser = new GithubRepoParser({ username: this.config.username });
    const data = await githubParser.getAllData([ 'images' ]);

    if (data == null) return projects;

    data.forEach(result => {
      projects.push(Project.fromGithubRepoParserResult(result));
    });

    return projects;
  }
}