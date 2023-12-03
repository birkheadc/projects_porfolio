import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProjectsModule } from './projects/projects.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ProjectsModule, AuthModule],
  controllers: [AppController],
})
export class AppModule {}
