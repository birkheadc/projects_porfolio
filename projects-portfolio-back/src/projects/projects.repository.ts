import { Injectable } from "@nestjs/common";
import { Project } from "./entities/project.entity";
import { ProjectsConfig } from "./projects.config";
import { GithubRepoParser } from '@birkheadc/github-repo-parser';

@Injectable()
export class ProjectsRepository {
  private cache: { data: any, expires: number } | undefined = undefined;
  constructor(private readonly config: ProjectsConfig) { }

  async getAll(): Promise<Project[]> {
    console.log('Get all...');
    if (this.cache == undefined) {
      console.log("Cache was undefined. Populating cache.");
      const data = await this.fetchFromGithub();
      const expires = Date.now() + (1000 * 60 * 15);
      this.cache = { data, expires }
    }
    if (Date.now() > this.cache.expires) {
      console.log("Cache has expired. Populating cache.");
      const data = this.fetchFromGithub();
      const expires = Date.now() + (1000 * 60 * 15);
      this.cache = { data, expires };
    } else {
      console.log("Cache was present and still valid. Sending cached data.");
    }

    return this.cache.data;
    
  }

  private async fetchFromGithub(): Promise<Project[]> {
    console.log('Fetching from github...');
    const projects: Project[] = [];

    const githubParser = new GithubRepoParser({ username: this.config.username, apiToken:  });
    const data = await githubParser.getAllData([ 'images' ]);

    console.log(`Got data: ${JSON.stringify(data)}`);

    if (data == null) return projects;

    data.forEach(result => {
      projects.push(Project.fromGithubRepoParserResult(result));
    });

    return projects;
  }

  async getCacheStatus(): Promise<string> {
    if (this.cache == null) return 'The cache is empty.';
    const now = Date.now();
    if (this.cache.expires > now) return `The cache expires at ${this.cache.expires}. It is currently ${now}. It will expire in ${(((this.cache.expires - now) / 1000) / 60).toString().substring(0, 5)} minutes.`;
    return `The cache expired at ${this.cache.expires}. It is currently ${now}. It expired ${(((now - this.cache.expires) / 1000) / 60).toString().substring(0, 5)} minutes ago.`;
  }
}