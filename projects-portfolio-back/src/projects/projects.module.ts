import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { ProjectsRepository } from './projects.repository';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService, ProjectsRepository, {
    provide: DynamoDBClient,
    useFactory: () => {
      return new DynamoDBClient({ region: 'ap-southeast-2' });
    }
  }],
})
export class ProjectsModule {}
