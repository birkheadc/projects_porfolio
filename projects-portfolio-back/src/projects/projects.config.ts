import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectableConfig } from "src/config/injectableConfig";

@Injectable()
export class ProjectsConfig extends InjectableConfig {
  username: string;
  constructor(configService: ConfigService) {
    super(configService, 'projects');
  }
}