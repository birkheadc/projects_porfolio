import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectableConfig } from "src/config/injectableConfig";

@Injectable()
export class UploadConfig extends InjectableConfig {
  region: string;
  bucketName: string;
  constructor(configService: ConfigService) {
    super(configService, 'upload');
  }
}