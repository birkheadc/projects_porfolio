import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProjectsRepository } from './projects.repository';
import { PutProjectDto } from './dto/put-project.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(private readonly repository: ProjectsRepository) {
    
  }

  async createOrUpdate(dto: PutProjectDto): Promise<boolean> {
    const project: Project = Project.fromPutProjectDto(dto);
    const wasSuccess = await this.repository.put(project);
    return wasSuccess;
  }

  async findAll(): Promise<Project[]> {
    return await this.repository.getAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  async remove(id: string): Promise<void> {
    const wasSuccess: boolean = await this.repository.delete(id);
    if (wasSuccess) return;
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }
}
