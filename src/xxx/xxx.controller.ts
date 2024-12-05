import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Response,
  StreamableFile,
} from '@nestjs/common';
import { XxxService } from './xxx.service';
import { CreateXxxDto } from './dto/create-xxx.dto';
import { UpdateXxxDto } from './dto/update-xxx.dto';
import R from 'src/utils/R';
import { NoCache } from 'src/cache/my-cache.interceptor';
import { Xxx } from './entities/xxx.entity';
import 'reflect-metadata';
import { ExcelService } from 'src/excel/excel.service';
import { Roles } from 'src/roles/roles.decorator';
import { User } from 'src/utils/user.decorator';
import { excelResponse } from '../excel/excel';
import { UserInfo } from '../users/entities/user.entity';

@Controller('xxx')
export class XxxController {
  constructor(
    private readonly xxxService: XxxService,
    private readonly excelService: ExcelService,
  ) { }

  @Post('add')
  @Roles('xxx/add')
  create(@Body() createXxxDto: CreateXxxDto, @User() user: UserInfo) {
    createXxxDto.createBy = user.id;
    createXxxDto.deptId=user.deptId;
    return R(this.xxxService.create(createXxxDto));
  }

  @Get('all')
  @Roles('xxx/all')
  @NoCache()
  async findAll(@User() user) {
    return R(this.xxxService.findAll(user));
  }

  @Get('list')
  @Roles('xxx/list')
  @NoCache()
  findList(@Query() query, @User() user) {
    return R(this.xxxService.findList(query, user), query);
  }

  @Get('export-excel')
  @Roles('xxx/export')
  async exportExcel(
    @Query() query,
    @Response({ passthrough: true }) res,
    @User() user: UserInfo,
  ): Promise<StreamableFile | string> {
    res.set(excelResponse('xxx.xlsx'));
    const data = await this.xxxService.findList(
      { ...query, page: null, size: null },
      user,
    );
    if (data[1] === 0) return '内容为空';
    let buffer = await this.excelService.exportExcel(data[0], Xxx);
    return new StreamableFile(buffer);
  }
  @Get('info/:id')
  @Roles('xxx/list')
  findOne(@Param('id') id: string) {
    return R(this.xxxService.findOne(id));
  }

  @Patch('update')
  @Roles('xxx/update')
  update(@Body() updateDto: UpdateXxxDto, @User() user) {
    updateDto.updateBy = user.id;
    return R(this.xxxService.update(updateDto));
  }

  @Delete('remove')
  @Roles('xxx/remove')
  remove(@Body('id') id: string) {
    return R(this.xxxService.remove(id));
  }
}
