import { Injectable } from "@nestjs/common";
import { Project } from "./entities/project.entity";
import { ProjectsConfig } from "./projects.config";
import { GithubRepoParser } from '@birkheadc/github-repo-parser';

@Injectable()
export class ProjectsRepository {
  private cache: { data: any, expires: number } | undefined = undefined;
  constructor(private readonly config: ProjectsConfig) { }

  async getAll(): Promise<Project[]> {
    if (this.cache == undefined) {
      console.log("Cache was undefined. Populating cache.");
      const data = this.fetchFromGithub();
      const expires = Date.now() + (1000 * 60 * 10);
      this.cache = { data, expires }
    }
    if (Date.now() > this.cache.expires) {
      console.log("Cache has expired. Populating cache.");
      const data = this.fetchFromGithub();
      const expires = Date.now() + (1000 * 60 * 10);
      this.cache = { data, expires };
    } else {
      console.log("Cache was present and still valid. Sending cached data.");
    }

    return this.cache.data;
    
  }

  async fetchFromGithub(): Promise<Project[]> {
    console.log('Fetching from github...');
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