import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  HttpCode,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import R from 'src/utils/R';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { User } from '../utils/user.decorator';

@Controller('Upload')
export class UploadController {
  constructor(private readonly UploadService: UploadService) {}

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
  // @UseInterceptors(FileInterceptor('file'))
  // uploadFile(@UploadedFile() file: Express.Multer.File) {
  // return file
  @UseInterceptors(AnyFilesInterceptor())
  uploadFile(@UploadedFiles() files: Array<Express.Multer.File>, @User() user) {
    console.log(files, 'files');
    this.UploadService.create(files, user);
    if (files?.length) {
      return R({ data: files, msg: '上传成功' });
    } else {
      return R.error({ msg: '上传失败', data: null, code: 415 });
    }
  }
}
