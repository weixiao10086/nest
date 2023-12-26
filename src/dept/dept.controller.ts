import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, Response, StreamableFile } from '@nestjs/common';
import { DeptService } from './dept.service';
import { CreateDeptDto } from './dto/create-dept.dto';
import { UpdateDeptDto } from './dto/update-dept.dto';
import R from 'src/utils/R';
import { NoCache } from 'src/cache/my-cache.interceptor';
import { Page } from 'src/utils/page';
import { Dept } from './entities/dept.entity';
import 'reflect-metadata';
import { ExcelService } from 'src/excel/excel.service';

@Controller('Dept')
export class DeptController {
  constructor(
    private readonly DeptService: DeptService,
    private readonly excelService: ExcelService,
  ) { }

  @Post()
  create(@Body() createDeptDto: CreateDeptDto | Array<CreateDeptDto>) {
    return R(this.DeptService.create(createDeptDto));
  }

  @Get()
  async findAll(@Req() req) {
    return R(this.DeptService.findAll());
  }
  @Get('tree')
  async findTree(@Req() req) {
    return R(this.DeptService.findTree());
  }
  @Get('children')
  async findchildrenId(@Query("id") id) {
    return R(this.DeptService.findchildrenId(id));
  }

  @Get('list')
  findList(@Query() params) {
    return R(this.DeptService.findList(params), params);
  }

  @Get('export-excel')
  @NoCache()
  async exportExcel(@Query() params: Page & Dept, @Response({ passthrough: true }) res): Promise<StreamableFile> {
    const data = await this.DeptService.findList({ ...params, page: null, size: null });
    const fileName = 'dept.xlsx';
    const buffer = await this.excelService.exportExcel(data[0], fileName, Dept);
    res.set({
      'Content-Disposition': `attachment; filename=${fileName}`,
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    return new StreamableFile(buffer);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return R(this.DeptService.findOne(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateDeptDto) {
    return R(this.DeptService.update(id, updateDto));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return R(this.DeptService.remove(id));
  }
}
