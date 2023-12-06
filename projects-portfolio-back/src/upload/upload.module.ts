import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { S3Client } from '@aws-sdk/client-s3';

@Module({
  providers: [UploadService, {
    provide: S3Client,
    useFactory: () => {
      return new S3Client({ region: 'ap-southeast-2' });
    }
  }],
  exports: [UploadService]
})
export class UploadModule {}
