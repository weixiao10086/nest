import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, UseInterceptors, Inject, Res } from '@nestjs/common';
import { DictService } from './dict.service';
import { CreateDictDto } from './dto/create-dict.dto';
import { UpdateDictDto } from './dto/update-dict.dto';
import R from 'src/utils/R';
import { Response } from 'express'

@Controller('Dict')
export class DictController {
  constructor(
    private readonly DictService: DictService) { }

  @Post()
  create(@Body() createDictDto: CreateDictDto | Array<CreateDictDto>) {
    return R(this.DictService.create(createDictDto));
  }

  @Get()
  async findAll(@Req() req) {
    return R(this.DictService.findAll());
  }

  @Get('list')
  findList(@Query() params) {
    return R(this.DictService.findList(params), params);
  }

  @Get('export-excel')
  async exportExcel(@Res() res: Response): Promise<void> {
    const data = await this.DictService.findAll();
    const fileName = 'dict.xlsx';
    const buffer = await this.DictService.exportExcel(data, fileName);
    res.set({
      'Content-Disposition': `attachment; filename=${fileName}`,
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    res.send(buffer);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return R(this.DictService.findOne(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateDictDto) {
    return R(this.DictService.update(id, updateDto));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return R(this.DictService.remove(id));
  }
}
