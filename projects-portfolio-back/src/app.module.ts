import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProjectsModule } from './projects/projects.module';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [ProjectsModule, ConfigModule.forRoot({
    load: [configuration],
    ignoreEnvFile: true,
    isGlobal: true
  })],
  controllers: [AppController],
})
export class AppModule {}
