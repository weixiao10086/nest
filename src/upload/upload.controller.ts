import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UploadService } from './upload.service';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import R from 'src/utils/R';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('Upload')
export class UploadController {
  constructor(private readonly UploadService: UploadService) { }

  @Get()
  findAll() {
    return R(this.UploadService.findAll());
  }

  @Get('list')
  findList(@Query() params) {
    return R(this.UploadService.findList(params), params);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return R(this.UploadService.findOne(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateUploadDto) {
    return R(this.UploadService.update(id, updateDto));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return R(this.UploadService.remove(id));
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return file
  }
}
