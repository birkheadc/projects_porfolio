import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  async uploadImages(files: Express.Multer.File[]) {
    console.log("Upload these: ", files);
  }
}
