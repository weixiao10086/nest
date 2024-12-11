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
  UploadedFiles,
  Response,
  StreamableFile,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { UpdateUploadDto } from './dto/update-upload.dto';
import R from 'src/utils/R';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { User } from '../utils/user.decorator';
import { NoCache } from '../cache/my-cache.interceptor';
import { Page } from '../utils/page';
import { Uploads } from './entities/upload.entity';
import { ExcelService } from '../excel/excel.service';
import { Roles } from '../roles/roles.decorator';
import { UserInfo } from '../users/entities/user.entity';
import { excelResponse } from '../excel/excel';
import { Router } from '../router/entities/router.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('文件oss')
@Controller('upload')
export class UploadController {
  constructor(
    private readonly UploadService: UploadService,
    private readonly excelService: ExcelService,
  ) {}

  @Get('all')
  @Roles('upload/all')
  findAll() {
    return R(this.UploadService.findAll());
  }

  @Get('list')
  @Roles('upload/list')
  findList(@Query() query, @User() user) {
    return R(this.UploadService.findList(query), query);
  }

  @Get('export-excel')
  @Roles('upload/export')
  async exportExcel(
    @Query() query,
    @Response({ passthrough: true }) res,
    @User() user: UserInfo,
  ): Promise<StreamableFile | string> {
    res.set(excelResponse('文件管理.xlsx'));
    const data = await this.UploadService.findList(
      { ... query,page: null, size: null },
      // user,
    );
    if (data[1] === 0) return '内容为空';
    let buffer = await this.excelService.exportExcel(data[0], Uploads);
    return new StreamableFile(buffer);
  }

  @Get('info/:id')
  @Roles('upload/list')
  findOne(@Param('id') id: string) {
    return R(this.UploadService.findOne(id));
  }

  @Patch('update')
  @Roles('upload/update')
  update(@Body() updateDto: UpdateUploadDto, @User() user: UserInfo) {
    updateDto.updateBy = user.id;
    return R(this.UploadService.update(updateDto));
  }

  @Delete('remove')
  @Roles('upload/remove')
  remove(@Body('id') id: string) {
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
