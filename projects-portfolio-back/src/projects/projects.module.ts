import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { ProjectsRepository } from './projects.repository';
import { AuthModule } from '../auth/auth.module';
import { UploadModule } from '../upload/upload.module';
import { ProjectsConfig } from './projects.config';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService, ProjectsRepository, ProjectsConfig, {
    provide: DynamoDBClient,
    inject: [ProjectsConfig],
    useFactory: (config: ProjectsConfig) => {
      return new DynamoDBClient(config.region);
    }
  } ],
  imports: [AuthModule, UploadModule]
})
export class ProjectsModule {}
