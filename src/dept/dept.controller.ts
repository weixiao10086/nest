import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
  Response,
  StreamableFile,
} from '@nestjs/common';
import { DeptService } from './dept.service';
import { CreateDeptDto } from './dto/create-dept.dto';
import { UpdateDeptDto } from './dto/update-dept.dto';
import R from 'src/utils/R';
import { Page } from 'src/utils/page';
import { Dept } from './entities/dept.entity';
import 'reflect-metadata';
import { ExcelService } from 'src/excel/excel.service';
import { NoCache } from '../cache/my-cache.interceptor';
import { User } from '../utils/user.decorator';
import { Roles } from '../roles/roles.decorator';
import { excelResponse } from '../excel/excel';
import { UserInfo } from 'src/users/entities/user.entity';

@Controller('dept')
export class DeptController {
  constructor(
    private readonly DeptService: DeptService,
    private readonly excelService: ExcelService,
  ) { }

  @Post('add')
  @Roles('dept/add')
  create(@Body() createDeptDto: CreateDeptDto, @User() user: UserInfo) {
    createDeptDto.createBy = user.id;
    createDeptDto.deptId = user.deptId;
    return R(this.DeptService.create(createDeptDto));
  }

  @Get('all')
  @Roles('dept/all')
  async findAll(@Req() req) {
    return R(this.DeptService.findAll());
  }
  @Get('tree')
  @Roles('dept/list')
  async findTree(@Req() req) {
    return R(this.DeptService.findTree());
  }
  @Get('children')
  @Roles('dept/list')
  async findChildrenId(@Query('id') id) {
    return R(this.DeptService.findChildrenId(id));
  }

  @Get('list')
  @Roles('dept/list')
  findList(@Query() query, @User() user) {
    return R(this.DeptService.findList(query, user), query);
  }

  @Get('export-excel')
  @Roles('dept/export')
  async exportExcel(
    @Query() query: Partial<Dept>,
    @Response({ passthrough: true }) res,
    @User() user,
  ): Promise<StreamableFile | string> {
    res.set(excelResponse('部门.xlsx'));
    const data = await this.DeptService.findList(
      {
        ...query,
        page: null,
        size: null,
      },
      user,
    );
    if (data[1] === 0) {
      return '内容为空';
    }
    let buffer = await this.excelService.exportExcel(data[0], Dept);
    return new StreamableFile(buffer);
  }

  @Get('info/:id')
  @Roles('dept/list')
  findOne(@Param('id') id: string) {
    return R(this.DeptService.findOne(id));
  }

  @Patch('update')
  @Roles('dept/update')
  update(@Body() updateDto: UpdateDeptDto, @User() user) {
    updateDto.updateBy = user.id;
    return R(this.DeptService.update(updateDto));
  }

  @Delete('remove')
  @Roles('dept/remove')
  remove(@Body('id') id: string) {
    return R(this.DeptService.remove(id));
  }
}
