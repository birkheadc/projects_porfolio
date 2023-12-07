import { DeleteObjectCommand, DeleteObjectsCommand, ListObjectsCommand, PutObjectCommand, PutObjectCommandInput, S3Client } from '@aws-sdk/client-s3';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { UploadConfig } from './upload.config';

@Injectable()
export class UploadService {
  constructor(private readonly config: UploadConfig, private readonly client: S3Client) { }

  async uploadImages(folderName: string, files: Express.Multer.File[]): Promise<string[]> {
    const uploadedFileNames: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const newName = this.generateNewNameForFile(file.originalname);
      const command = new PutObjectCommand({
        Bucket: this.config.bucketName,
        Key: `${folderName}/${newName}`,
        Body: file.buffer
      });
      const response = await this.client.send(command);
      if (response.$metadata.httpStatusCode?.toString()[0] === '2') {
        uploadedFileNames.push(`https://${this.config.bucketName}.s3.${this.config.region}.amazonaws.com/${folderName}/${newName}`);
      }
    }
    return uploadedFileNames;
  }

  async removeImage(folderName: string, imageName: string): Promise<void> {
    throw new HttpException('Not Implemented', HttpStatus.NOT_IMPLEMENTED);
  }

  async removeFolder(folderName: string): Promise<void> {
    await this.deleteFolderContents(folderName);
    const command = new DeleteObjectCommand({
      Bucket: this.config.bucketName,
      Key: folderName
    });
    const response = await this.client.send(command);
    if (response.$metadata.httpStatusCode?.toString()[0] !== '2') throw new HttpException('Error while attempting to delete folder', HttpStatus.INTERNAL_SERVER_ERROR);
  }

  async deleteFolderContents(folderName: string): Promise<void> {
    const listCommand = new ListObjectsCommand({
      Bucket: this.config.bucketName,
      Prefix: folderName + '/'
    });
    const list = (await this.client.send(listCommand)).Contents;
    if (list != null) {
      const deleteCommand = new DeleteObjectsCommand({
        Bucket: this.config.bucketName,
        Delete: {
          Objects: list.map(o => ({ Key: o.Key }))
        }
      })
      await this.client.send(deleteCommand);
    }
  }

  generateNewNameForFile(oldName: string): string {
    const parts = oldName.split('.');
    const newName = randomUUID();
    return `${newName}.${parts[parts.length - 1]}`;
  }
}
