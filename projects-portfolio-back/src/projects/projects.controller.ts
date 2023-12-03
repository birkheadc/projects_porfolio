import { Controller, Get, Body, Param, Delete, Put } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { PutProjectDto } from './dto/put-project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Put()
  createOrUpdate(@Body() dto: PutProjectDto) {
    console.log('Received dto: ', dto);
    return this.projectsService.createOrUpdate(dto);
  }

  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }
}
