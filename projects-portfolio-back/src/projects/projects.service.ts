import { Injectable } from '@nestjs/common';
import { ProjectsRepository } from './projects.repository';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(private readonly repository: ProjectsRepository) { }

  async findAll(): Promise<Project[]> {
    return await this.repository.getAll();
  }

  async getCacheStatus(): Promise<string> {
    return await this.repository.getCacheStatus();
  }
}
