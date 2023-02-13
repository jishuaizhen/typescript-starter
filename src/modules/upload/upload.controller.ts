import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';

@Controller('upload')
@ApiTags('文件上传')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({
    summary: '文件上传summary',
    description: '文件上传 description',
  })
  @ApiParam({ name: 'file', description: '文件', required: true })
  uploadFile(@UploadedFile() file) {
    return this.uploadService.upload(file);
  }
}
