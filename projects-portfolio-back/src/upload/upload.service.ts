import { PutObjectCommand, PutObjectCommandInput, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class UploadService {
  constructor(private readonly client: S3Client) { }

  async uploadImages(folderName: string, files: Express.Multer.File[]): Promise<string[]> {
    const bucketName = 'projects-portfolio-images';
    const uploadedFileNames: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const newName = this.generateNewNameForFile(file.originalname);
      const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: `${folderName}/${newName}`,
        Body: file.buffer
      });
      const response = await this.client.send(command);
      if (response.$metadata.httpStatusCode?.toString()[0] === '2') {
        console.log(response);
        uploadedFileNames.push(`https://${bucketName}.s3.${await this.client.config.region()}.amazonaws.com/${folderName}/${newName}`);
      }
    }
    return uploadedFileNames;
  }

  async createFolderIfNotExists(folderName: string) {

  }

  generateNewNameForFile(oldName: string): string {
    const parts = oldName.split('.');
    const newName = randomUUID();
    return `${newName}.${parts[parts.length - 1]}`;
  }
}
