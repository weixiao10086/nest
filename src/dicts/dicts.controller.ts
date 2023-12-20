import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, UseInterceptors, Inject, Res } from '@nestjs/common';
import { DictsService } from './dicts.service';
import { CreateDictsDto } from './dto/create-dicts.dto';
import { UpdateDictsDto } from './dto/update-dicts.dto';
import R from 'src/utils/R';
import { Response, query } from 'express'
import { CacheTTL } from '@nestjs/cache-manager';

@Controller('dicts')
export class DictsController {
  constructor(
    private readonly DictsService: DictsService) { }

  @Post()
  create(@Body() createDictsDto: CreateDictsDto | Array<CreateDictsDto>) {
    return R(this.DictsService.create(createDictsDto));
  }

  @CacheTTL(50000)
  @Get()
  async findAll() {
    return R(this.DictsService.findAll());
  }

  @Get('list')
  findList(@Query() params) {
    return R(this.DictsService.findList(params), params);
  }

  @Get('export-excel')
  async exportExcel(@Res() res: Response): Promise<void> {
    const data = await this.DictsService.findAll();
    const fileName = 'dicts.xlsx';
    const buffer = await this.DictsService.exportExcel(data, fileName);
    res.set({
      'Content-Disposition': `attachment; filename=${fileName}`,
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    res.send(buffer);
  }

  @Get('key')
  findKey(@Query('key') key: string) {
    return R(this.DictsService.findKey(key));
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return R(this.DictsService.findOne(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateDictsDto) {
    return R(this.DictsService.update(id, updateDto));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return R(this.DictsService.remove(id));
  }
}
