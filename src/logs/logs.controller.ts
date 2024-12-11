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
import { LogsService } from './logs.service';
import { CreateLogsDto } from './dto/create-logs.dto';
import { UpdateLogsDto } from './dto/update-logs.dto';
import R from 'src/utils/R';
import { NoCache } from 'src/cache/my-cache.interceptor';
import { Logs } from './entities/logs.entity';
import 'reflect-metadata';
import { ExcelService } from 'src/excel/excel.service';
import { Roles } from 'src/roles/roles.decorator';
import { User } from 'src/utils/user.decorator';
import { excelResponse } from '../excel/excel';
import { UserInfo } from '../users/entities/user.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('日志')
@Controller('logs')
export class LogsController {
  constructor(
    private readonly logsService: LogsService,
    private readonly excelService: ExcelService,
  ) { }

  @Post('add')
  @Roles('Logs/add')
  create(@Body() createLogsDto: CreateLogsDto, @User() user: UserInfo) {
    createLogsDto.createBy = user.id;
    return R(this.logsService.create(createLogsDto));
  }

  @Get('all')
  @Roles('Logs/all')
  @NoCache()
  async findAll(@User() user) {
    return R(this.logsService.findAll(user));
  }

  @Get('list')
  @Roles('Logs/list')
  @NoCache()
  findList(@Query() query, @User() user) {
    return R(this.logsService.findList(query, user), query);
  }

  @Get('export-excel')
  @Roles('Logs/export')
  async exportExcel(
    @Query() query,
    @Response({ passthrough: true }) res,
    @User() user: UserInfo,
  ): Promise<StreamableFile | string> {
    res.set(excelResponse('logs.xlsx'));
    const data = await this.logsService.findList(
      { ...query, page: null, size: null },
      user,
    );
    if (data[1] === 0) return '内容为空';
    let buffer = await this.excelService.exportExcel(data[0], Logs);
    return new StreamableFile(buffer);
  }
  @Get('info/:id')
  @Roles('Logs/list')
  findOne(@Param('id') id: string) {
    return R(this.logsService.findOne(id));
  }

  @Patch('update')
  @Roles('Logs/update')
  update(@Body() updateDto: UpdateLogsDto, @User() user) {
    updateDto.updateBy = user.id;
    return R(this.logsService.update(updateDto));
  }

  @Delete('remove')
  @Roles('Logs/remove')
  remove(@Body('id') id: string) {
    return R(this.logsService.remove(id));
  }
}
