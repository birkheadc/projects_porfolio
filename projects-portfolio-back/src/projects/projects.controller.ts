import { Controller, Get, Body, Param, Delete, Put, UseGuards, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { PutProjectDto } from './dto/put-project.dto';
import { AuthGuard } from '../auth/auth.guard';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from '../upload/upload.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Put()
  @UseGuards(AuthGuard)
  @UseInterceptors(FilesInterceptor('images'))
  async createOrUpdate(@UploadedFiles() files: Express.Multer.File[], @Body() formData: any) {
    const dto = PutProjectDto.fromFormData(formData);
    await this.projectsService.createOrUpdate(dto, files);
  }

  @Get()
  async findAll() {
    return await this.projectsService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.projectsService.findOne(+id);
  // }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: string) {
    await this.projectsService.remove(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  async testAuth() {
    return "Authorized!"
  }
}
