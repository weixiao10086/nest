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
import { ParamsService } from './params.service';
import { CreateParamsDto } from './dto/create-params.dto';
import { UpdateParamsDto } from './dto/update-params.dto';
import R from 'src/utils/R';
import { NoCache } from 'src/cache/my-cache.interceptor';
import { Page } from 'src/utils/page';
import { Params } from './entities/params.entity';
import 'reflect-metadata';
import { ExcelService } from 'src/excel/excel.service';
import { Roles } from 'src/roles/roles.decorator';
import { User } from 'src/utils/user.decorator';
import { excelResponse } from '../excel/excel';
import { UserInfo } from '../users/entities/user.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('参数')
@Controller('params')
export class ParamsController {
  constructor(
    private readonly ParamsService: ParamsService,
    private readonly excelService: ExcelService,
  ) { }

  @Post('add')
  @Roles('params/add')
  create(@Body() createParamsDto: CreateParamsDto, @User() user: UserInfo) {
    createParamsDto.updateBy = user.id;
    return R(this.ParamsService.create(createParamsDto));
  }

  @Get('all')
  @Roles('params/all')
  @NoCache()
  async findAll(@User() user) {
    return R(this.ParamsService.findAll(user));
  }

  @Get('list')
  @Roles('params/list')
  @NoCache()
  findList(@Query() query) {
    return R(this.ParamsService.findList(query), query);
  }

  @Get('export-excel')
  @Roles('params/export')
  async exportExcel(
    @Query() query,
    @Response({ passthrough: true }) res,
    @User() user: UserInfo,
  ): Promise<StreamableFile | string> {
    res.set(excelResponse('参数管理.xlsx'));
    const data = await this.ParamsService.findList(
      { ...query, page: null, size: null },
    );
    if (data[1] === 0) {
      return '内容为空';
    }
    let buffer = await this.excelService.exportExcel(data[0], Params);
    return new StreamableFile(buffer);
  }

  @Get('key/:key')
  @Roles('params/list')
  findKey(@Param('key') key: string) {
    return R(this.ParamsService.findKey(key));
  }

  @Get('info/:id')
  @Roles('params/list')
  findOne(@Param('id') id: string) {
    console.log(id, 'id');

    return R(this.ParamsService.findOne(id));
  }

  @Patch('update')
  @Roles('params/update')
  update(@Body() updateDto: UpdateParamsDto, @User() user: UserInfo) {
    updateDto.updateBy = user.id;
    return R(this.ParamsService.update(updateDto));
  }

  @Delete('remove')
  @Roles('params/remove')
  remove(@Body('id') id: string) {
    return R(this.ParamsService.remove(id));
  }
}
