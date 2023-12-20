import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, UseInterceptors, Inject, Res } from '@nestjs/common';
import { XxxService } from './xxx.service';
import { CreateXxxDto } from './dto/create-xxx.dto';
import { UpdateXxxDto } from './dto/update-xxx.dto';
import R from 'src/utils/R';
import { Response } from 'express'
import { NoCache } from 'src/cache/my-cache.interceptor';

@Controller('xxx')
export class XxxController {
  constructor(
    private readonly xxxService: XxxService) { }

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
  async exportExcel(@Res() res: Response): Promise<void> {
    const data = await this.xxxService.findAll();
    const fileName = 'xxx.xlsx';
    const buffer = await this.xxxService.exportExcel(data, fileName);
    res.set({
      'Content-Disposition': `attachment; filename=${fileName}`,
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    res.send(buffer);
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
