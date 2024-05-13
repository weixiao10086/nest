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

@Controller('Params')
export class ParamsController {
  constructor(
    private readonly ParamsService: ParamsService,
    private readonly excelService: ExcelService,
  ) {}

  @Post()
  @Roles('Params/add')
  create(@Body() createParamsDto: CreateParamsDto | Array<CreateParamsDto>) {
    return R(this.ParamsService.create(createParamsDto));
  }

  @Get()
  @Roles('Params/all')
  @NoCache()
  async findAll(@User() user) {
    return R(this.ParamsService.findAll(user));
  }

  @Get('list')
  @Roles('Params/list')
  @NoCache()
  findList(@Query() params, @User() user) {
    return R(this.ParamsService.findList(params, user), params);
  }

  @Get('export-excel')
  @NoCache()
  // @Roles('Params/export')
  async exportExcel(
    @Query() params: Page & Params,
    @Response({ passthrough: true }) res,
    @User() user,
  ): Promise<StreamableFile | string> {
    const fileName = 'params.xlsx';
    res.set({
      'Content-Disposition': `attachment; filename=${fileName}`,
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const data = await this.ParamsService.findList(
      { ...params, page: null, size: null },
      user,
    );
    if (data[1] === 0) {
      return '内容为空';
    }
    let buffer = await this.excelService.exportExcel(data[0], Params);
    return new StreamableFile(buffer);
  }

  @Get('key')
  @Roles('Params/list')
  findKey(@Query('key') key: string) {
    return R(this.ParamsService.findKey(key));
  }

  @Get(':id')
  @Roles('Params/list')
  findOne(@Param('id') id: string) {
    return R(this.ParamsService.findOne(id));
  }

  @Patch(':id')
  @Roles('Params/update')
  update(@Param('id') id: string, @Body() updateDto: UpdateParamsDto) {
    return R(this.ParamsService.update(id, updateDto));
  }

  @Delete(':id')
  @Roles('Params/delete')
  remove(@Param('id') id: string) {
    return R(this.ParamsService.remove(id));
  }
}
