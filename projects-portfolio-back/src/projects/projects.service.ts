import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProjectsRepository } from './projects.repository';
import { PutProjectDto } from './dto/put-project.dto';
import { Project } from './entities/project.entity';
import { UploadService } from '../upload/upload.service';

@Injectable()
export class ProjectsService {
  constructor(private readonly repository: ProjectsRepository, private readonly uploadService: UploadService) {
    
  }

  async createOrUpdate(dto: PutProjectDto, files: Express.Multer.File[]): Promise<void> {
    const project: Project = Project.fromPutProjectDto(dto);
    const fileNames: string[] = await this.uploadService.uploadImages(project.id, files);
    project.imageUrls = fileNames;
    await this.repository.put(project);
  }

  async findAll(): Promise<Project[]> {
    return await this.repository.getAll();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} project`;
  // }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
    await this.uploadService.removeFolder(id);
  }
}
