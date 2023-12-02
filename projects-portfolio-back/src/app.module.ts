import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [ProjectsModule],
  controllers: [AppController],
})
export class AppModule {}
