import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, Response, StreamableFile, ExecutionContext } from '@nestjs/common';
import { XxxService } from './xxx.service';
import { CreateXxxDto } from './dto/create-xxx.dto';
import { UpdateXxxDto } from './dto/update-xxx.dto';
import R from 'src/utils/R';
import { NoCache } from 'src/cache/my-cache.interceptor';
import { Page } from 'src/utils/page';
import { Xxx } from './entities/xxx.entity';
import 'reflect-metadata';
import { ExcelService } from 'src/excel/excel.service';
const xlsx = require('node-xlsx');


@Controller('xxx')
export class XxxController {
  constructor(
    private readonly xxxService: XxxService,
    private readonly xxcelService: ExcelService,
  ) { }

  @Post()
  create(@Body() createXxxDto: CreateXxxDto | Array<CreateXxxDto>) {
    return R(this.xxxService.create(createXxxDto));
  }

  @Get()
  async findAll(@Req() req) {
    return R(this.xxxService.findAll());
  }

  @Get('list')
  findList(@Query() params) {
    return R(this.xxxService.findList(params), params);
  }

  @Get('export-excel')
  @NoCache()
  async exportExcel(@Query() params: Page & Xxx, @Response({ passthrough: true }) res): Promise<StreamableFile> {
    console.log(Reflect.getMetadata(`excel-ceshi`, Xxx), 'result');
    const data = await this.xxxService.findList({ ...params, page: null, size: null });
    const fileName = 'xxx.xlsx';
    const buffer = await this.xxxService.exportExcel(data[0], fileName);
    res.set({
      'Content-Disposition': `attachment; filename=${fileName}`,
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    return new StreamableFile(buffer);
  }
  @Get('export-excel2')
  @NoCache()
  async exportExcel2(@Query() params: Page & Xxx, @Response({ passthrough: true }) res): Promise<StreamableFile> {
    const data = await this.xxxService.findList({ ...params, page: null, size: null });
    let buffer = this.xxcelService.exportExcel(Xxx, data[0])
    const fileName = 'xxx.xlsx';
    res.set({
      'Content-Disposition': `attachment; filename=${fileName}`,
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    return new StreamableFile(buffer);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return R(this.xxxService.findOne(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateXxxDto) {
    return R(this.xxxService.update(id, updateDto));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return R(this.xxxService.remove(id));
  }
}
