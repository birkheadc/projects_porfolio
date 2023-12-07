import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { S3Client } from '@aws-sdk/client-s3';
import { UploadConfig } from './upload.config';

@Module({
  providers: [UploadService, UploadConfig, {
    provide: S3Client,
    useFactory: () => {
      return new S3Client({ region: 'ap-southeast-2' });
    }
  }],
  exports: [UploadService]
})
export class UploadModule {}
