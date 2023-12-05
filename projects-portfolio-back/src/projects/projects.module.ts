import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { ProjectsRepository } from './projects.repository';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService, ProjectsRepository, {
    provide: DynamoDBClient,
    useFactory: () => {
      return new DynamoDBClient({ region: 'ap-southeast-2' });
    }
  }],
  imports: [AuthModule]
})
export class ProjectsModule {}
