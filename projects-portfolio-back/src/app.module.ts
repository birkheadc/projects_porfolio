import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProjectsModule } from './projects/projects.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [ProjectsModule, ConfigModule.forRoot({
    load: [configuration],
    ignoreEnvFile: false,
    isGlobal: true
  })],
  controllers: [AppController],
})
export class AppModule {}
