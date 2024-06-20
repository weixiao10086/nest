import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  HttpStatus,
  Res,
  HttpException,
  UseInterceptors,
} from '@nestjs/common';
import { MinioService } from './minio.service';
import { Response } from 'express';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';

@Controller('minio')
export class MinioController {
  constructor(private readonly minioService: MinioService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async create(@UploadedFile() file: Express.Multer.File) {
    return await this.minioService.upload(file);
  }

  @Get('list')
  async findList() {
    return await this.minioService.list();
  }

  @Get('download/:fileName')
  async download(@Param('fileName') fileName: string, @Res() res: Response) {
    const readerStream = await this.minioService.download(fileName);
    readerStream.on('data', (chunk) => {
      res.write(chunk, 'binary');
    });
    res.set({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': 'attachment; filename=' + fileName,
    });
    readerStream.on('end', () => {
      res.end();
    });
    readerStream.on('error', () => {
      throw new HttpException(
        '下载失败，请重试',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    });
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.minioService.remove(+id);
  // }
}
