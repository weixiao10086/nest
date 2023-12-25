import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, Response, StreamableFile } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRolesDto } from './dto/create-roles.dto';
import { UpdateRolesDto } from './dto/update-roles.dto';
import R from 'src/utils/R';
import { NoCache } from 'src/cache/my-cache.interceptor';
import { Page } from 'src/utils/page';
import { Role } from './entities/role.entity';
import 'reflect-metadata';
import { ExcelService } from 'src/excel/excel.service';

@Controller('Roles')
export class RolesController {
  constructor(
    private readonly RolesService: RolesService,
    private readonly excelService: ExcelService,
  ) { }

  @Post()
  create(@Body() createRolesDto: CreateRolesDto | Array<CreateRolesDto>) {
    return R(this.RolesService.create(createRolesDto));
  }

  @Get()
  async findAll(@Req() req) {
    return R(this.RolesService.findAll());
  }

  @Get('list')
  findList(@Query() params) {
    return R(this.RolesService.findList(params), params);
  }

  @Get('export-excel')
  @NoCache()
  async exportExcel(@Query() params: Page & Role, @Response({ passthrough: true }) res): Promise<StreamableFile> {
    const data = await this.RolesService.findList({ ...params, page: null, size: null });
    const fileName = 'roles.xlsx';
    const buffer = await this.excelService.exportExcel(data[0], fileName, Role);
    res.set({
      'Content-Disposition': `attachment; filename=${fileName}`,
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    return new StreamableFile(buffer);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return R(this.RolesService.findOne(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateRolesDto) {
    return R(this.RolesService.update(id, updateDto));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return R(this.RolesService.remove(id));
  }
}
