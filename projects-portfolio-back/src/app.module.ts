import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProjectsModule } from './projects/projects.module';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [ProjectsModule, AuthModule, UploadModule],
  controllers: [AppController],
})
export class AppModule {}
