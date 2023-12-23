import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, Response, StreamableFile } from '@nestjs/common';
import { XxxService } from './xxx.service';
import { CreateXxxDto } from './dto/create-xxx.dto';
import { UpdateXxxDto } from './dto/update-xxx.dto';
import R from 'src/utils/R';
import { NoCache } from 'src/cache/my-cache.interceptor';
import { Page } from 'src/utils/page';
import { Xxx } from './entities/xxx.entity';
import 'reflect-metadata';
import { ExcelService } from 'src/excel/excel.service';

@Controller('xxx')
export class XxxController {
  constructor(
    private readonly xxxService: XxxService,
    private readonly excelService: ExcelService,
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
    const data = await this.xxxService.findList({ ...params, page: null, size: null });
    const fileName = 'xxx.xlsx';
    const buffer = await this.excelService.exportExcel(data[0], fileName, Xxx);
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
