import { Controller, Get, Body, Param, Delete, Put, HttpException, HttpStatus, UseGuards, Post } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { PutProjectDto } from './dto/put-project.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Put()
  @UseGuards(AuthGuard)
  createOrUpdate(@Body() dto: PutProjectDto) {
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
