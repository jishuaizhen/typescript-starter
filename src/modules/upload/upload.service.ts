import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  upload(file) {
    return {
      url: `http://localhost:3000/images/${file.filename}`,
    };
  }
}
