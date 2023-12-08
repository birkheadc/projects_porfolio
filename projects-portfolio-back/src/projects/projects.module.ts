import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { ProjectsRepository } from './projects.repository';
import { AuthModule } from '../auth/auth.module';
import { UploadModule } from '../upload/upload.module';
import { ProjectsConfig } from './projects.config';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService, ProjectsRepository, ProjectsConfig]
})
export class ProjectsModule {}
